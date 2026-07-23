#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pillars } from "../src/data/pillars";
import { topics } from "../src/data/topics";
import { servers } from "../src/data/servers";
import { glossaryTerms } from "../src/data/glossary";
import { comparisons } from "../src/data/comparisons";
import { categories } from "../src/data/categories";
import { docsPages, getDocsPath } from "../src/data/docs";
import { blogPosts, clusters } from "../src/data/blogPosts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const reportsDir = path.join(root, "reports");

if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const baseUrl = "https://www.mcpserver.in";
const today = new Date().toISOString().split("T")[0];

const rows: any[] = [];

function add(path: string, type: string, title: string) {
  rows.push({
    route: path,
    contentType: type,
    status: "200",
    canonical: `${baseUrl}${path}`,
    indexability: "indexable",
    sitemap: "sitemap-pages.xml",
    title,
    primaryIntentId: type,
    wordCount: null,
    inboundLinks: null,
    outboundLinks: null,
    schemaTypes: [],
    updatedAt: today,
  });
}

pillars.forEach((p: any) => add(`/${p.slug}/`, "pillar", p.title || p.slug));
topics.forEach((t: any) => add(`/topics/${t.slug}/`, "topic", t.title || t.slug));
servers.forEach((s: any) => add(`/servers/${s.slug}/`, "server", s.name || s.slug));
glossaryTerms.forEach((g: any) => add(`/glossary/${g.slug}/`, "glossary", g.term || g.slug));
comparisons.forEach((c: any) => add(`/compare/${c.slug}/`, "comparison", c.title || c.slug));
categories.forEach((c: any) => add(`/directory/${c.slug}/`, "category", c.name || c.slug));
docsPages.forEach((d: any) => add(getDocsPath(d) + "/", "docs", d.title || getDocsPath(d)));
clusters.forEach((c: any) => add(`/blog/cluster/${c.slug}/`, "blog-cluster", c.title || c.slug));
blogPosts.forEach((p: any) => add(`/blog/${p.slug}/`, "blog", p.title || p.slug));

const csvRows = ["route,contentType,status,canonical,indexability,sitemap,title,primaryIntentId,wordCount,updatedAt"];
for (const r of rows) {
  csvRows.push(
    [
      r.route,
      r.contentType,
      r.status,
      r.canonical,
      r.indexability,
      r.sitemap,
      `"${r.title.replace(/"/g, '""')}"`,
      r.primaryIntentId,
      r.wordCount ?? "",
      r.updatedAt,
    ].join(",")
  );
}

fs.writeFileSync(path.join(reportsDir, "url-inventory.json"), JSON.stringify(rows, null, 2), "utf-8");
fs.writeFileSync(path.join(reportsDir, "url-inventory.csv"), csvRows.join("\n"), "utf-8");

const summary = `# URL Inventory Summary\n\nGenerated: ${new Date().toISOString()}\nTotal routes: ${rows.length}\n\n` + rows.reduce(
  (acc, r) => {
    acc[r.contentType] = (acc[r.contentType] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

fs.writeFileSync(path.join(reportsDir, "url-summary.md"), summary, "utf-8");
console.log(`Generated ${rows.length} route records in reports/`);
