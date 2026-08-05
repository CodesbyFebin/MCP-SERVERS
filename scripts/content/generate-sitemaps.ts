#!/usr/bin/env node
/**
 * Generate sitemaps for all pages.
 */

import fs from "fs";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "content", "pages");
const SITEMAP_DIR = path.join(process.cwd(), "public", "sitemaps");

if (!fs.existsSync(SITEMAP_DIR)) {
  fs.mkdirSync(SITEMAP_DIR, { recursive: true });
}

function generateSitemap(urls: string[], fileName: string) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>https://mcpserver.in${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(SITEMAP_DIR, fileName), sitemap);
}

function generateAllSitemaps() {
  console.log("[sitemap] Generating sitemaps...");

  if (!fs.existsSync(PAGES_DIR)) {
    console.log("[sitemap] No pages directory found");
    return;
  }

  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".md"));
  const urls: string[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    urls.push(`/${slug}/`);
  }

  const chunkSize = 5000;
  const chunks: string[][] = [];
  for (let i = 0; i < urls.length; i += chunkSize) {
    chunks.push(urls.slice(i, i + chunkSize));
  }

  chunks.forEach((chunk, index) => {
    generateSitemap(chunk, `pages-${index + 1}.xml`);
  });

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks.map((_, index) => `  <sitemap>
    <loc>https://mcpserver.in/sitemaps/pages-${index + 1}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  fs.writeFileSync(path.join(SITEMAP_DIR, "index.xml"), sitemapIndex);

  console.log(`[sitemap] Generated ${chunks.length} sitemaps for ${urls.length} pages`);
}

generateAllSitemaps();
