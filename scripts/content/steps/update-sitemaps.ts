#!/usr/bin/env node
/**
 * Generate sitemap index and segmented sitemaps.
 */

import fs from "fs"
import path from "path"
import { getPublishedServerProfiles, getPublishedCategorySlugs, categories } from "../../../src/data/publishing"

const outputDir = path.join(process.cwd(), "public")
fs.mkdirSync(outputDir, { recursive: true })

const profiles = getPublishedServerProfiles()
const categorySlugs = getPublishedCategorySlugs()
const siteUrl = "https://www.mcpserver.in"
const today = new Date().toISOString().split("T")[0]

function buildUrlNode(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${siteUrl}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const sitemapIntegrations = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${profiles.map((p) => buildUrlNode(p.contract.route, today, "weekly", "0.8")).join("\n")}
</urlset>`

const sitemapCategories = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categorySlugs.map((slug) => buildUrlNode(`/servers/category/${slug}/`, today, "weekly", "0.7")).join("\n")}
</urlset>`

fs.writeFileSync(path.join(outputDir, "sitemap-integrations.xml"), sitemapIntegrations)
fs.writeFileSync(path.join(outputDir, "sitemap-categories.xml"), sitemapCategories)

console.log(`✅ Sitemaps built: ${profiles.length} integration URLs, ${categorySlugs.length} category URLs`)
