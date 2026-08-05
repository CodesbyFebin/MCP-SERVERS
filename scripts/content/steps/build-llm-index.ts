#!/usr/bin/env node
/**
 * Build LLM index files: llms.txt and llms-full.txt.
 */

import fs from "fs"
import path from "path"
import { getPublishedServerProfiles, getPublishedCategorySlugs } from "../../../src/data/publishing"
import { categories } from "../../../src/data/categories"

const outputDir = path.join(process.cwd(), "public")
fs.mkdirSync(outputDir, { recursive: true })

const profiles = getPublishedServerProfiles()
const categorySlugs = getPublishedCategorySlugs()

const llmsTxtLines = [
  "# MCPServer.in",
  "",
  "The global knowledge, discovery, deployment and intelligence platform for the Model Context Protocol ecosystem.",
  "",
  "## Authority Hubs",
  "",
  "- /servers - MCP Server Directory",
  "- /tutorials - Tutorials",
  "- /database - Protocol Database",
  "- /marketplace - Marketplace",
  "- /guides - Enterprise Guides",
  "- /intelligence - Intelligence and Benchmarking",
  "- /security - Security and Compliance",
  "- /technology - MCP Technology Reference",
  "- /knowledge - Knowledge Hub",
  "- /compare - Comparisons",
  "- /best - Best Lists and Collections",
  "",
  "## Published Servers",
  "",
  ...profiles.map((p) => `- ${p.server.name}: /servers/${p.server.slug}`),
  "",
  "## Categories",
  "",
  ...categorySlugs.map((slug) => {
    const category = categories.find((c) => c.slug === slug)
    return `- ${category?.name ?? slug}: /servers/category/${slug}`
  }),
  "",
  `Last updated: ${new Date().toISOString().split("T")[0]}`,
]

fs.writeFileSync(path.join(outputDir, "llms.txt"), llmsTxtLines.join("\n"))

const llmsFullLines = [
  "# MCPServer.in Full Index",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Servers",
  "",
  ...profiles.map((p) => `- ${p.server.name}: /servers/${p.server.slug}`),
  "",
  "## Categories",
  "",
  ...categorySlugs.map((slug) => {
    const category = categories.find((c) => c.slug === slug)
    return `- ${category?.name ?? slug}: /servers/category/${slug}`
  }),
  "",
  `Total published pages: ${profiles.length}`,
]

fs.writeFileSync(path.join(outputDir, "llms-full.txt"), llmsFullLines.join("\n"))

console.log(`✅ LLM index built: ${profiles.length} pages indexed`)
