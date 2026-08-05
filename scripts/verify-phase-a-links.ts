import fs from "node:fs";
import path from "node:path";
import sitemap from "../app/sitemap";
import { phaseAUrlInventory } from "../src/data/phase-a-authority.generated";

const baseUrl = "https://www.mcpserver.in";
const evidenceDir = path.join(process.cwd(), ".safe-deep", "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });

const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
const approvedUrls = new Set(phaseAUrlInventory.map((page) => page.url));
const knownRoutes = new Set<string>([
  ...phaseAUrlInventory.map((page) => new URL(page.url).pathname),
  "/",
  "/mcp-server-directory/",
  "/how-to-build-mcp-server/",
  "/mcp-server/",
  "/mcp-tools/",
  "/security/authentication/",
  "/troubleshooting/mcp-server-not-connecting/",
  "/glossary/mcp-server/",
  "/compare/mcp-vs-rest-api/",
]);

const errors: string[] = [];
const graph = phaseAUrlInventory.map((page) => {
  const related = page.related_pages ?? [];
  if (page.internal_links < 8 || page.internal_links > 20) {
    errors.push(`Internal link count out of range for ${page.url}: ${page.internal_links}`);
  }
  if (related.length < 8) {
    errors.push(`Too few related pages for ${page.url}: ${related.length}`);
  }
  for (const route of related) {
    if (!route.startsWith("/")) errors.push(`Non-internal related link on ${page.url}: ${route}`);
    if (!knownRoutes.has(route)) errors.push(`Unknown related link on ${page.url}: ${route}`);
  }
  if (!sitemapUrls.has(page.url)) errors.push(`Phase A URL missing from sitemap: ${page.url}`);

  return {
    url: page.url,
    relatedPages: related.map((route) => `${baseUrl}${route}`),
    sitemapPresence: sitemapUrls.has(page.url),
    internalLinks: page.internal_links,
  };
});

for (const url of approvedUrls) {
  if (!sitemapUrls.has(url)) errors.push(`Approved URL missing from sitemap: ${url}`);
}

const report = {
  generatedAt: new Date().toISOString(),
  total: phaseAUrlInventory.length,
  brokenInternalLinks: errors.filter((error) => error.includes("Unknown related link")).length,
  orphanPages: graph.filter((node) => node.relatedPages.length === 0).length,
  sitemapOmissions: graph.filter((node) => !node.sitemapPresence).length,
  graph,
  errors,
};

fs.writeFileSync(path.join(evidenceDir, "phase-a-link-validation.json"), `${JSON.stringify(report, null, 2)}\n`);

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL ${error}`);
  process.exit(1);
}

console.log(`Phase A link validation passed (${phaseAUrlInventory.length} URLs).`);
