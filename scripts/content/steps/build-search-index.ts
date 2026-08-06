#!/usr/bin/env node
/**
 * Build search index JSON files for public/search/.
 */

import fs from "fs"
import path from "path"
import { validatePublishingGraph, getPublishedServerProfiles, getPublishedCategorySlugs, categories } from "../../../src/data/publishing"

const outputDir = path.join(process.cwd(), "public", "search")
fs.mkdirSync(outputDir, { recursive: true })

const profiles = getPublishedServerProfiles()
const validation = validatePublishingGraph()
const categorySlugs = getPublishedCategorySlugs()

const entityIndex = profiles.map((p) => ({
  id: p.entityId,
  type: "server",
  slug: p.server.slug,
  name: p.server.name,
  aliases: [],
  summary: p.server.description,
  status: p.status,
  metadata: {
    category: p.server.category,
    auth: p.server.auth,
    officialStatus: "community",
  },
}))

const contentIndex = profiles.map((p) => ({
  route: p.contract.route,
  entityId: p.entityId,
  title: `${p.server.name} MCP Server`,
  description: p.server.description,
  locale: "en",
  status: p.status,
  qualityScore: p.quality.total,
  updatedAt: new Date().toISOString(),
}))

const relationshipIndex = profiles.flatMap((p) =>
  p.relationships.map((r) => ({
    sourceId: r.fromEntityId,
    targetId: r.toEntityId,
    type: r.relationshipType,
    confidence: 1,
  }))
)

const serverIndex = profiles.map((p) => ({
  slug: p.server.slug,
  name: p.server.name,
  category: p.server.category,
  auth: p.server.auth,
  description: p.server.description,
  route: p.contract.route,
  status: p.status,
  qualityScore: p.quality.total,
}))

const glossaryIndex = []

fs.writeFileSync(path.join(outputDir, "entity-index.json"), JSON.stringify(entityIndex, null, 2))
fs.writeFileSync(path.join(outputDir, "content-index.json"), JSON.stringify(contentIndex, null, 2))
fs.writeFileSync(path.join(outputDir, "relationship-index.json"), JSON.stringify(relationshipIndex, null, 2))
fs.writeFileSync(path.join(outputDir, "server-index.json"), JSON.stringify(serverIndex, null, 2))
fs.writeFileSync(path.join(outputDir, "glossary-index.json"), JSON.stringify(glossaryIndex, null, 2))

console.log(`✅ Search index built: ${entityIndex.length} entities, ${relationshipIndex.length} relationships, ${contentIndex.length} pages`)
console.log(`   Validation: ${validation.ok ? "PASS" : "FAIL"}`)
console.log(`   Published servers: ${profiles.length}`)
console.log(`   Active categories: ${categorySlugs.length}`)
