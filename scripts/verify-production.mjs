import fs from "node:fs";
import path from "node:path";

const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://www.mcpserver.in").replace(/\/$/, "");
const evidenceDir = path.join(process.cwd(), ".safe-deep", "evidence");
const outputPath = path.join(evidenceDir, "live-seo-verification.json");

const pages = [
  "/",
  "/mcp-server/",
  "/what-is-mcp/",
  "/mcp-server-directory/",
  "/how-to-build-mcp-server/",
  "/mcp-server-hosting/",
];

const redirectVariants = [
  { source: "http://mcpserver.in/", expected: `${baseUrl}/`, expectedMaxHops: 1 },
  { source: "https://mcpserver.in/", expected: `${baseUrl}/`, expectedMaxHops: 1 },
  { source: "http://www.mcpserver.in/", expected: `${baseUrl}/`, expectedMaxHops: 1 },
];

function stripTags(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || null;
}

function schemaTypes(html) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = new Set();

  for (const script of scripts) {
    try {
      const parsed = JSON.parse(script[1]);
      const nodes = Array.isArray(parsed?.["@graph"]) ? parsed["@graph"] : Array.isArray(parsed) ? parsed : [parsed];
      for (const node of nodes) {
        const type = node?.["@type"];
        if (Array.isArray(type)) type.forEach((item) => types.add(item));
        else if (type) types.add(type);
      }
    } catch {
      types.add("INVALID_JSON_LD");
    }
  }

  return [...types].sort();
}

function internalLinkCount(html) {
  const links = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]);
  return links.filter((href) => href.startsWith("/") || href.startsWith(baseUrl)).length;
}

async function resolveRedirect(source) {
  const hops = [];
  let current = source;

  for (let i = 0; i < 8; i += 1) {
    const response = await fetch(current, { redirect: "manual" });
    const location = response.headers.get("location");
    hops.push({ url: current, status: response.status, location });

    if (response.status >= 300 && response.status < 400 && location) {
      current = new URL(location, current).toString();
      continue;
    }

    return { source, finalUrl: current, finalStatus: response.status, redirectCount: hops.length - 1, hops };
  }

  return { source, finalUrl: current, finalStatus: 0, redirectCount: hops.length, hops, error: "Redirect loop guard exceeded" };
}

fs.mkdirSync(evidenceDir, { recursive: true });

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
const sitemap = await sitemapResponse.text();
const pageResults = [];
const redirectResults = [];
let failures = 0;

for (const page of pages) {
  const url = `${baseUrl}${page}`;
  const response = await fetch(url, { redirect: "manual" });
  const html = await response.text();
  const title = firstMatch(html, /<title>([\s\S]*?)(?:<\/title>|$)/i);
  const description = firstMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const h1 = stripTags(firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || "");
  const canonical = firstMatch(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const robots = firstMatch(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  const types = schemaTypes(html);
  const sitemapPresence = sitemap.includes(`<loc>${url}</loc>`);
  const headers = {
    contentSecurityPolicy: response.headers.get("content-security-policy"),
    strictTransportSecurity: response.headers.get("strict-transport-security"),
    xContentTypeOptions: response.headers.get("x-content-type-options"),
    xFrameOptions: response.headers.get("x-frame-options"),
  };

  const errors = [];
  if (response.status !== 200) errors.push(`Expected 200, got ${response.status}`);
  if (canonical !== url) errors.push(`Canonical mismatch: ${canonical || "(missing)"}`);
  if (!title) errors.push("Missing title");
  if (!description) errors.push("Missing meta description");
  if (!h1) errors.push("Missing H1");
  if (!sitemapPresence) errors.push("Missing from sitemap");
  if (!headers.contentSecurityPolicy || !headers.strictTransportSecurity || !headers.xContentTypeOptions || !headers.xFrameOptions) {
    errors.push("Missing required security header");
  }
  if (types.includes("INVALID_JSON_LD")) errors.push("Invalid JSON-LD");

  if (errors.length > 0) failures += 1;

  pageResults.push({
    url,
    status: response.status,
    redirectCount: 0,
    finalUrl: url,
    title,
    metaDescription: description,
    h1,
    canonical,
    metaRobots: robots,
    jsonLdTypes: types,
    sitemapPresence,
    internalLinkCount: internalLinkCount(html),
    securityHeaders: headers,
    ok: errors.length === 0,
    errors,
  });
}

for (const variant of redirectVariants) {
  const result = await resolveRedirect(variant.source);
  const platformHttpHop =
    variant.source.startsWith("http://") &&
    result.redirectCount === 2 &&
    result.hops[0]?.location?.startsWith("https://") &&
    result.finalUrl === variant.expected;
  const errors = [];

  if (result.finalUrl !== variant.expected) errors.push(`Expected final URL ${variant.expected}, got ${result.finalUrl}`);
  if (result.finalStatus !== 200) errors.push(`Expected final status 200, got ${result.finalStatus}`);
  if (result.redirectCount > variant.expectedMaxHops && !platformHttpHop) {
    errors.push(`Expected at most ${variant.expectedMaxHops} redirect, got ${result.redirectCount}`);
  }

  if (errors.length > 0) failures += 1;

  redirectResults.push({
    ...result,
    expectedFinalUrl: variant.expected,
    expectedMaxHops: variant.expectedMaxHops,
    platformHttpHop,
    ok: errors.length === 0,
    errors,
  });
}

const evidence = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  sitemapStatus: sitemapResponse.status,
  pages: pageResults,
  redirects: redirectResults,
  warnings: redirectResults
    .filter((result) => result.platformHttpHop)
    .map((result) => `${result.source} has a Vercel platform HTTP-to-HTTPS hop before app canonicalization.`),
};

fs.writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`);

for (const page of pageResults) {
  console.log(`${page.ok ? "OK" : "FAIL"} ${page.url}`);
}
for (const redirect of redirectResults) {
  console.log(`${redirect.ok ? "OK" : "FAIL"} ${redirect.source} => ${redirect.finalUrl} (${redirect.redirectCount} redirects)`);
}
if (evidence.warnings.length > 0) {
  for (const warning of evidence.warnings) console.warn(`WARN ${warning}`);
}
if (failures > 0) {
  console.error(`Production verification failed: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log(`Production verification passed. Evidence: ${outputPath}`);
