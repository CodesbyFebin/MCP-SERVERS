import fs from "node:fs";
import path from "node:path";
import sitemap from "../app/sitemap";
import { canonicalIntentList } from "../src/data/canonical-intents";
import { isLowValueGlossarySlug } from "../src/lib/glossarySeo";
import { glossaryTerms } from "../src/data/glossary";

const errors: string[] = [];
const urls = sitemap().map((entry) => entry.url);
const urlSet = new Set(urls);

for (const url of urls) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:") errors.push(`Non-HTTPS sitemap URL: ${url}`);
  if (parsed.hostname !== "www.mcpserver.in") errors.push(`Non-www sitemap URL: ${url}`);
  if (parsed.pathname !== "/" && !parsed.pathname.endsWith("/")) errors.push(`Sitemap URL missing trailing slash: ${url}`);
}

for (const intent of canonicalIntentList.filter((item) => item.status === "active")) {
  const url = `https://www.mcpserver.in${intent.canonicalPath}`;
  if (!urlSet.has(url)) errors.push(`Canonical intent missing from sitemap: ${intent.id} (${url})`);
}

for (const term of glossaryTerms) {
  const url = `https://www.mcpserver.in/glossary/${term.slug}/`;
  if (isLowValueGlossarySlug(term.slug) && urlSet.has(url)) {
    errors.push(`Low-value glossary URL present in sitemap: ${url}`);
  }
}

const evidenceDir = path.join(process.cwd(), ".safe-deep", "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });
fs.writeFileSync(path.join(evidenceDir, "canonicals.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), checkedUrls: urls.length, errors }, null, 2)}\n`);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Canonical verification passed (${urls.length} sitemap URLs).`);
