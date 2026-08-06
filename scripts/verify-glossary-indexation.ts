import fs from "node:fs";
import path from "node:path";
import { glossaryTerms } from "../src/data/glossary";
import { isLowValueGlossarySlug, hasGenerationCounterSuffix } from "../src/lib/glossarySeo";
import sitemap from "../app/sitemap";

const root = process.cwd();
const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
const errors: string[] = [];

for (const term of glossaryTerms) {
  const url = `https://www.mcpserver.in/glossary/${term.slug}/`;
  const isLowValue = isLowValueGlossarySlug(term.slug);
  if (isLowValue && sitemapUrls.has(url)) {
    errors.push(`Low-value glossary URL appears in sitemap: ${url}`);
  }
  // Assert against the shared allowlist-aware helper. Re-implementing the
  // `/-\d+$/` rule here would falsely flag standard names such as
  // mcp-iso-27001 and mcp-soc-2, whose digits are part of the official term.
  if (hasGenerationCounterSuffix(term.slug) && !isLowValue) {
    errors.push(`Generation-counter glossary slug is not marked low-value: ${term.slug}`);
  }
  if (!isLowValue && !sitemapUrls.has(url)) {
    errors.push(`KEEP glossary URL missing from sitemap: ${url}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Glossary indexation rules valid.");
