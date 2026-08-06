import fs from "node:fs";
import path from "node:path";
import { phaseAUrlInventory } from "../src/data/phase-a-authority.generated";

const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://www.mcpserver.in").replace(/\/$/, "");
const evidenceDir = path.join(process.cwd(), ".safe-deep", "evidence");
const outputPath = path.join(evidenceDir, "phase-a-production-verification.json");
const concurrency = Number(process.env.PHASE_A_VERIFY_CONCURRENCY || 8);

fs.mkdirSync(evidenceDir, { recursive: true });

function stripTags(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1]?.trim() || null;
}

function schemaTypes(html: string) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = new Set<string>();

  for (const script of scripts) {
    try {
      const parsed = JSON.parse(script[1]);
      const nodes = Array.isArray(parsed?.["@graph"]) ? parsed["@graph"] : Array.isArray(parsed) ? parsed : [parsed];
      for (const node of nodes) {
        const type = node?.["@type"];
        if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
        else if (type) types.add(String(type));
      }
    } catch {
      types.add("INVALID_JSON_LD");
    }
  }

  return [...types].sort();
}

function internalLinkCount(html: string) {
  const links = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]);
  return links.filter((href) => href.startsWith("/") || href.startsWith(baseUrl)).length;
}

async function mapLimit<T, R>(items: T[], limit: number, worker: (item: T, index: number) => Promise<R>) {
  const results = new Array<R>(items.length);
  let next = 0;

  async function run() {
    for (;;) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap-phase-a.xml`, { redirect: "manual" });
const sitemapText = await sitemapResponse.text();

const pages = await mapLimit(phaseAUrlInventory, concurrency, async (page) => {
  const expectedUrl = `${baseUrl}${new URL(page.url).pathname}`;
  const response = await fetch(expectedUrl, { redirect: "manual" });
  const html = await response.text();
  const title = firstMatch(html, /<title>([\s\S]*?)(?:<\/title>|$)/i);
  const description = firstMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const h1 = stripTags(firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || "");
  const canonical = firstMatch(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const types = schemaTypes(html);
  const sitemapPresence = sitemapText.includes(`<loc>${expectedUrl}</loc>`);
  const links = internalLinkCount(html);

  const errors: string[] = [];
  if (response.status !== 200) errors.push(`Expected 200, got ${response.status}`);
  if (canonical !== expectedUrl) errors.push(`Canonical mismatch: ${canonical || "(missing)"}`);
  if (!title) errors.push("Missing title");
  if (!description) errors.push("Missing meta description");
  if (!h1) errors.push("Missing H1");
  if (h1 && h1 !== page.h1) errors.push(`H1 mismatch: ${h1}`);
  if (types.includes("INVALID_JSON_LD")) errors.push("Invalid JSON-LD");
  if (types.length === 0) errors.push("Missing JSON-LD");
  if (!sitemapPresence) errors.push("Missing from sitemap-phase-a.xml");
  if (links < 8) errors.push(`Internal link count below 8: ${links}`);

  return {
    url: expectedUrl,
    expectedH1: page.h1,
    status: response.status,
    title,
    metaDescription: description,
    h1,
    canonical,
    jsonLdTypes: types,
    sitemapPresence,
    internalLinkCount: links,
    ok: errors.length === 0,
    errors,
  };
});

const failures = pages.filter((page) => !page.ok);
const evidence = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  total: pages.length,
  ok: pages.length - failures.length,
  failed: failures.length,
  sitemap: {
    url: `${baseUrl}/sitemap-phase-a.xml`,
    status: sitemapResponse.status,
    urlCount: (sitemapText.match(/<loc>/g) || []).length,
  },
  pages,
};

fs.writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`);

for (const page of pages) {
  console.log(`${page.ok ? "OK" : "FAIL"} ${page.url}`);
  for (const error of page.errors) console.log(`  ${error}`);
}

if (sitemapResponse.status !== 200) {
  console.error(`Phase A sitemap check failed: expected 200, got ${sitemapResponse.status}`);
  process.exit(1);
}

if (failures.length > 0) {
  console.error(`Phase A production verification failed: ${failures.length} URL(s) failed.`);
  process.exit(1);
}

console.log(`Phase A production verification passed for ${pages.length} URLs. Evidence: ${outputPath}`);
