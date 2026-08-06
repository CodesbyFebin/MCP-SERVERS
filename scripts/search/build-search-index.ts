#!/usr/bin/env node
/**
 * Enhanced search index builder.
 * Builds search index including generated content from topics, pillars, and comparisons.
 *
 * Usage:
 *   npx tsx scripts/search/build-search-index.ts
 *   npx tsx scripts/search/build-search-index.ts --validate
 */

import fs from "fs"
import path from "path"
import { validatePublishingGraph, getPublishedServerProfiles } from "../../src/data/publishing"
import { servers } from "../../src/data/servers"
import { topics } from "../../src/data/topics"
import { pillars } from "../../src/data/pillars"
import { comparisons } from "../../src/data/comparisons"

interface SearchIndexOptions {
  validate?: boolean
}

function parseArgs(argv: string[]): SearchIndexOptions {
  const options: SearchIndexOptions = {}
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--validate") {
      options.validate = true
    }
  }
  return options
}

function buildSearchIndex(options: SearchIndexOptions) {
  console.log("[search] Building enhanced search index")

  const profiles = getPublishedServerProfiles()
  const validation = validatePublishingGraph()

  if (!validation.ok) {
    console.warn("[search] Publishing graph validation failed:", validation.errors)
  }

  const outputDir = path.join(process.cwd(), "public", "search")
  fs.mkdirSync(outputDir, { recursive: true })

  const entityIndex: any[] = []
  const contentIndex: any[] = []
  const relationshipIndex: any[] = []

  profiles.forEach((p) => {
    entityIndex.push({
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
    })

    contentIndex.push({
      route: p.contract.route,
      entityId: p.entityId,
      title: `${p.server.name} MCP Server`,
      description: p.server.description,
      locale: "en",
      status: p.status,
      qualityScore: p.quality.total,
      updatedAt: new Date().toISOString(),
    })

    p.relationships.forEach((r) => {
      relationshipIndex.push({
        sourceId: r.fromEntityId,
        targetId: r.toEntityId,
        type: r.relationshipType,
        confidence: 1,
      })
    })
  })

  topics.forEach((topic) => {
    const id = `topic-${topic.slug}`
    entityIndex.push({
      id,
      type: "topic",
      slug: topic.slug,
      name: topic.title,
      aliases: [topic.primaryKeyword, ...topic.bestPractices.slice(0, 3)],
      summary: topic.shortAnswer,
      status: "published",
      metadata: {
        pillar: topic.pillar,
        primaryKeyword: topic.primaryKeyword,
      },
    })

    contentIndex.push({
      route: `/topics/${topic.slug}`,
      entityId: id,
      title: topic.title,
      description: topic.shortAnswer,
      locale: "en",
      status: "published",
      qualityScore: 95,
      updatedAt: new Date().toISOString(),
    })
  })

  pillars.forEach((pillar) => {
    const id = `pillar-${pillar.slug}`
    entityIndex.push({
      id,
      type: "pillar",
      slug: pillar.slug,
      name: pillar.title,
      aliases: [pillar.primaryKeyword, pillar.subtitle],
      summary: pillar.shortAnswer,
      status: "published",
      metadata: {
        subtitle: pillar.subtitle,
        primaryKeyword: pillar.primaryKeyword,
      },
    })

    contentIndex.push({
      route: `/${pillar.slug}`,
      entityId: id,
      title: pillar.title,
      description: pillar.shortAnswer,
      locale: "en",
      status: "published",
      qualityScore: 95,
      updatedAt: new Date().toISOString(),
    })
  })

  comparisons.forEach((comparison) => {
    const id = `comparison-${comparison.slug}`
    entityIndex.push({
      id,
      type: "comparison",
      slug: comparison.slug,
      name: comparison.title,
      aliases: [`MCP vs ${comparison.vs}`, comparison.vs],
      summary: comparison.shortAnswer,
      status: "published",
      metadata: {
        vs: comparison.vs,
        verdict: comparison.verdict,
      },
    })

    contentIndex.push({
      route: `/compare/${comparison.slug}`,
      entityId: id,
      title: comparison.title,
      description: comparison.shortAnswer,
      locale: "en",
      status: "published",
      qualityScore: 95,
      updatedAt: new Date().toISOString(),
    })
  })

  servers.forEach((server) => {
    const relatedTopics = topics.filter((t) => t.primaryKeyword.toLowerCase().includes(server.category.toLowerCase())).slice(0, 3)
    relatedTopics.forEach((topic) => {
      relationshipIndex.push({
        sourceId: `server-${server.slug}`,
        targetId: `topic-${topic.slug}`,
        type: "related-to",
        confidence: 0.8,
      })
    })

    const relatedPillars = pillars.filter((p) => p.primaryKeyword.toLowerCase().includes(server.category.toLowerCase())).slice(0, 2)
    relatedPillars.forEach((pillar) => {
      relationshipIndex.push({
        sourceId: `server-${server.slug}`,
        targetId: `pillar-${pillar.slug}`,
        type: "related-to",
        confidence: 0.8,
      })
    })
  })

  topics.forEach((topic) => {
    const relatedServers = servers.filter((s) => s.category.toLowerCase().includes(topic.primaryKeyword.toLowerCase())).slice(0, 5)
    relatedServers.forEach((server) => {
      relationshipIndex.push({
        sourceId: `topic-${topic.slug}`,
        targetId: `server-${server.slug}`,
        type: "references",
        confidence: 0.9,
      })
    })

    const relatedPillars = pillars.filter((p) => p.primaryKeyword.toLowerCase().includes(topic.primaryKeyword.toLowerCase()) || topic.primaryKeyword.toLowerCase().includes(p.primaryKeyword.toLowerCase())).slice(0, 2)
    relatedPillars.forEach((pillar) => {
      relationshipIndex.push({
        sourceId: `topic-${topic.slug}`,
        targetId: `pillar-${pillar.slug}`,
        type: "related-to",
        confidence: 0.8,
      })
    })
  })

  pillars.forEach((pillar) => {
    const relatedTopics = topics.filter((t) => pillar.primaryKeyword.toLowerCase().includes(t.primaryKeyword.toLowerCase()) || t.primaryKeyword.toLowerCase().includes(pillar.primaryKeyword.toLowerCase())).slice(0, 5)
    relatedTopics.forEach((topic) => {
      relationshipIndex.push({
        sourceId: `pillar-${pillar.slug}`,
        targetId: `topic-${topic.slug}`,
        type: "contains",
        confidence: 0.9,
      })
    })

    const relatedServers = servers.filter((s) => s.category.toLowerCase().includes(pillar.primaryKeyword.toLowerCase()) || pillar.primaryKeyword.toLowerCase().includes(s.category.toLowerCase())).slice(0, 5)
    relatedServers.forEach((server) => {
      relationshipIndex.push({
        sourceId: `pillar-${pillar.slug}`,
        targetId: `server-${server.slug}`,
        type: "references",
        confidence: 0.8,
      })
    })
  })

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

  const topicIndex = topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    primaryKeyword: topic.primaryKeyword,
    pillar: topic.pillar,
    route: `/topics/${topic.slug}`,
    status: "published",
    qualityScore: 95,
  }))

  const pillarIndex = pillars.map((pillar) => ({
    slug: pillar.slug,
    title: pillar.title,
    primaryKeyword: pillar.primaryKeyword,
    subtitle: pillar.subtitle,
    route: `/${pillar.slug}`,
    status: "published",
    qualityScore: 95,
  }))

  const comparisonIndex = comparisons.map((comparison) => ({
    slug: comparison.slug,
    title: comparison.title,
    vs: comparison.vs,
    route: `/compare/${comparison.slug}`,
    status: "published",
    qualityScore: 95,
  }))

  fs.writeFileSync(path.join(outputDir, "entity-index.json"), JSON.stringify(entityIndex, null, 2))
  fs.writeFileSync(path.join(outputDir, "content-index.json"), JSON.stringify(contentIndex, null, 2))
  fs.writeFileSync(path.join(outputDir, "relationship-index.json"), JSON.stringify(relationshipIndex, null, 2))
  fs.writeFileSync(path.join(outputDir, "server-index.json"), JSON.stringify(serverIndex, null, 2))
  fs.writeFileSync(path.join(outputDir, "glossary-index.json"), JSON.stringify([], null, 2))
  fs.writeFileSync(path.join(outputDir, "topic-index.json"), JSON.stringify(topicIndex, null, 2))
  fs.writeFileSync(path.join(outputDir, "pillar-index.json"), JSON.stringify(pillarIndex, null, 2))
  fs.writeFileSync(path.join(outputDir, "comparison-index.json"), JSON.stringify(comparisonIndex, null, 2))

  console.log(`✅ Search index built: ${entityIndex.length} entities, ${relationshipIndex.length} relationships, ${contentIndex.length} pages`)
  console.log(`   Validation: ${validation.ok ? "PASS" : "FAIL"}`)
  console.log(`   Published servers: ${profiles.length}`)
  console.log(`   Topics: ${topics.length}`)
  console.log(`   Pillars: ${pillars.length}`)
  console.log(`   Comparisons: ${comparisons.length}`)

  if (options.validate) {
    console.log("[search] Validating search index...")
    const entityIndexContent = fs.readFileSync(path.join(outputDir, "entity-index.json"), "utf-8")
    const entityIndexParsed = JSON.parse(entityIndexContent)

    const valid = entityIndexParsed.every((entity: any) => entity.id && entity.type && entity.slug && entity.name)

    if (!valid) {
      console.error("[search] ❌ Search index validation failed")
      process.exit(1)
    }

    console.log("[search] ✅ Search index validation passed")
  }
}

const options = parseArgs(process.argv)
try {
  buildSearchIndex(options)
} catch (error) {
  console.error("[search] Failed:", error)
  process.exit(1)
}
