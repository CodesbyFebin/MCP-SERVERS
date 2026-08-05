#!/usr/bin/env node
/**
 * Bulk content generator.
 * Generates 2000+ word SEO/AEO/GEO-optimized pages for all entities.
 *
 * Usage:
 *   npx tsx scripts/content/generate-all-content.ts
 *   npx tsx scripts/content/generate-all-content.ts --type servers
 *   npx tsx scripts/content/generate-all-content.ts --type topics
 *   npx tsx scripts/content/generate-all-content.ts --type pillars
 *   npx tsx scripts/content/generate-all-content.ts --type comparisons
 *   npx tsx scripts/content/generate-all-content.ts --dry-run
 */

import fs from "fs"
import path from "path"
import { servers } from "../../src/data/servers"
import { topics } from "../../src/data/topics"
import { pillars } from "../../src/data/pillars"
import { comparisons } from "../../src/data/comparisons"
import { generateServerPage, generateServerMarkdown } from "./generators/server-page-generator"
import { generateTopicPage, generateTopicMarkdown } from "./generators/topic-page-generator"
import { generatePillarPage, generatePillarMarkdown } from "./generators/pillar-page-generator"
import { generateComparisonPage, generateComparisonMarkdown } from "./generators/comparison-page-generator"

interface GenerateOptions {
  type?: "servers" | "topics" | "pillars" | "comparisons" | "all"
  dryRun?: boolean
  outputDir?: string
}

function parseArgs(argv: string[]): GenerateOptions {
  const options: GenerateOptions = { type: "all" }
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--type" && argv[i + 1]) {
      options.type = argv[++i] as GenerateOptions["type"]
    } else if (arg === "--dry-run") {
      options.dryRun = true
    } else if (arg === "--output-dir" && argv[i + 1]) {
      options.outputDir = argv[++i]
    }
  }
  return options
}

async function generateContent(options: GenerateOptions) {
  const outputDir = options.outputDir || path.join(process.cwd(), "content")
  const dryRun = options.dryRun || false

  console.log("[generate] Starting content generation")
  console.log("[generate] Options:", options)

  const stats = {
    servers: 0,
    topics: 0,
    pillars: 0,
    comparisons: 0,
    totalWords: 0,
    errors: 0,
  }

  // Generate server pages
  if (options.type === "all" || options.type === "servers") {
    console.log(`[generate] Generating ${servers.length} server pages...`)
    const serverDir = path.join(outputDir, "servers")
    if (!dryRun) {
      fs.mkdirSync(serverDir, { recursive: true })
    }

    for (const server of servers) {
      try {
        const page = generateServerPage(server)
        const markdown = generateServerMarkdown(page)
        const filePath = path.join(serverDir, `${server.slug}.md`)

        if (!dryRun) {
          fs.writeFileSync(filePath, markdown)
        }

        stats.servers++
        stats.totalWords += page.wordCount
        console.log(`[generate] ✅ ${server.slug} (${page.wordCount} words)`)
      } catch (error) {
        console.error(`[generate] ❌ ${server.slug}:`, error)
        stats.errors++
      }
    }
  }

  // Generate topic pages
  if (options.type === "all" || options.type === "topics") {
    console.log(`[generate] Generating ${topics.length} topic pages...`)
    const topicDir = path.join(outputDir, "topics")
    if (!dryRun) {
      fs.mkdirSync(topicDir, { recursive: true })
    }

    for (const topic of topics) {
      try {
        const page = generateTopicPage(topic)
        const markdown = generateTopicMarkdown(page)
        const filePath = path.join(topicDir, `${topic.slug}.md`)

        if (!dryRun) {
          fs.writeFileSync(filePath, markdown)
        }

        stats.topics++
        stats.totalWords += page.wordCount
        console.log(`[generate] ✅ ${topic.slug} (${page.wordCount} words)`)
      } catch (error) {
        console.error(`[generate] ❌ ${topic.slug}:`, error)
        stats.errors++
      }
    }
  }

  // Generate pillar pages
  if (options.type === "all" || options.type === "pillars") {
    console.log(`[generate] Generating ${pillars.length} pillar pages...`)
    const pillarDir = path.join(outputDir, "pillars")
    if (!dryRun) {
      fs.mkdirSync(pillarDir, { recursive: true })
    }

    for (const pillar of pillars) {
      try {
        const page = generatePillarPage(pillar)
        const markdown = generatePillarMarkdown(page)
        const filePath = path.join(pillarDir, `${pillar.slug}.md`)

        if (!dryRun) {
          fs.writeFileSync(filePath, markdown)
        }

        stats.pillars++
        stats.totalWords += page.wordCount
        console.log(`[generate] ✅ ${pillar.slug} (${page.wordCount} words)`)
      } catch (error) {
        console.error(`[generate] ❌ ${pillar.slug}:`, error)
        stats.errors++
      }
    }
  }

  // Generate comparison pages
  if (options.type === "all" || options.type === "comparisons") {
    console.log(`[generate] Generating ${comparisons.length} comparison pages...`)
    const comparisonDir = path.join(outputDir, "compare")
    if (!dryRun) {
      fs.mkdirSync(comparisonDir, { recursive: true })
    }

    for (const comparison of comparisons) {
      try {
        const page = generateComparisonPage(comparison)
        const markdown = generateComparisonMarkdown(page)
        const filePath = path.join(comparisonDir, `${comparison.slug}.md`)

        if (!dryRun) {
          fs.writeFileSync(filePath, markdown)
        }

        stats.comparisons++
        stats.totalWords += page.wordCount
        console.log(`[generate] ✅ ${comparison.slug} (${page.wordCount} words)`)
      } catch (error) {
        console.error(`[generate] ❌ ${comparison.slug}:`, error)
        stats.errors++
      }
    }
  }

  console.log("\n[generate] Generation complete!")
  console.log(`[generate] Servers: ${stats.servers}`)
  console.log(`[generate] Topics: ${stats.topics}`)
  console.log(`[generate] Pillars: ${stats.pillars}`)
  console.log(`[generate] Comparisons: ${stats.comparisons}`)
  console.log(`[generate] Total words: ${stats.totalWords.toLocaleString()}`)
  console.log(`[generate] Errors: ${stats.errors}`)

  if (dryRun) {
    console.log("\n[generate] Dry run completed. No files were written.")
  }
}

const options = parseArgs(process.argv)
generateContent(options).catch((error) => {
  console.error("[generate] Failed:", error)
  process.exit(1)
})
