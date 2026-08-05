#!/usr/bin/env node
/**
 * Internal linking enhancer.
 * Adds internal links to generated content files.
 *
 * Usage:
 *   npx tsx scripts/content/enhance-internal-links.ts
 *   npx tsx scripts/content/enhance-internal-links.ts --dry-run
 */

import fs from "fs"
import path from "path"
import { servers } from "../../src/data/servers"
import { topics } from "../../src/data/topics"
import { pillars } from "../../src/data/pillars"
import { comparisons } from "../../src/data/comparisons"

const CONTENT_ROOT = path.join(process.cwd(), "content")

interface LinkSuggestion {
  targetSlug: string
  targetType: "server" | "topic" | "pillar" | "comparison"
  label: string
  keywords: string[]
}

const serverLinkMap = new Map<string, LinkSuggestion[]>()
const topicLinkMap = new Map<string, LinkSuggestion[]>()
const pillarLinkMap = new Map<string, LinkSuggestion[]>()
const comparisonLinkMap = new Map<string, LinkSuggestion[]>()

for (const server of servers) {
  const suggestions: LinkSuggestion[] = [
    { targetSlug: server.slug, targetType: "server", label: server.name, keywords: [server.name, server.category.toLowerCase()] },
  ]

  const relatedTopics = topics.filter((t) => server.category.toLowerCase().includes(t.primaryKeyword.toLowerCase()) || t.primaryKeyword.toLowerCase().includes(server.category.toLowerCase()))
  for (const topic of relatedTopics.slice(0, 3)) {
    suggestions.push({ targetSlug: topic.slug, targetType: "topic", label: topic.title, keywords: [topic.primaryKeyword.toLowerCase()] })
  }

  const relatedPillars = pillars.filter((p) => p.primaryKeyword.toLowerCase().includes(server.category.toLowerCase()) || server.category.toLowerCase().includes(p.primaryKeyword.toLowerCase()))
  for (const pillar of relatedPillars.slice(0, 2)) {
    suggestions.push({ targetSlug: pillar.slug, targetType: "pillar", label: pillar.title, keywords: [pillar.primaryKeyword.toLowerCase()] })
  }

  serverLinkMap.set(server.slug, suggestions)
}

for (const topic of topics) {
  const suggestions: LinkSuggestion[] = [
    { targetSlug: topic.slug, targetType: "topic", label: topic.title, keywords: [topic.primaryKeyword.toLowerCase()] },
  ]

  const relatedServers = servers.filter((s) => s.category.toLowerCase().includes(topic.primaryKeyword.toLowerCase()) || topic.primaryKeyword.toLowerCase().includes(s.category.toLowerCase()))
  for (const server of relatedServers.slice(0, 5)) {
    suggestions.push({ targetSlug: server.slug, targetType: "server", label: server.name, keywords: [server.name.toLowerCase()] })
  }

  const relatedPillars = pillars.filter((p) => p.primaryKeyword.toLowerCase().includes(topic.primaryKeyword.toLowerCase()) || topic.primaryKeyword.toLowerCase().includes(p.primaryKeyword.toLowerCase()))
  for (const pillar of relatedPillars.slice(0, 2)) {
    suggestions.push({ targetSlug: pillar.slug, targetType: "pillar", label: pillar.title, keywords: [pillar.primaryKeyword.toLowerCase()] })
  }

  topicLinkMap.set(topic.slug, suggestions)
}

for (const pillar of pillars) {
  const suggestions: LinkSuggestion[] = [
    { targetSlug: pillar.slug, targetType: "pillar", label: pillar.title, keywords: [pillar.primaryKeyword.toLowerCase()] },
  ]

  const relatedTopics = topics.filter((t) => pillar.primaryKeyword.toLowerCase().includes(t.primaryKeyword.toLowerCase()) || t.primaryKeyword.toLowerCase().includes(pillar.primaryKeyword.toLowerCase()))
  for (const topic of relatedTopics.slice(0, 5)) {
    suggestions.push({ targetSlug: topic.slug, targetType: "topic", label: topic.title, keywords: [topic.primaryKeyword.toLowerCase()] })
  }

  const relatedServers = servers.filter((s) => s.category.toLowerCase().includes(pillar.primaryKeyword.toLowerCase()) || pillar.primaryKeyword.toLowerCase().includes(s.category.toLowerCase()))
  for (const server of relatedServers.slice(0, 5)) {
    suggestions.push({ targetSlug: server.slug, targetType: "server", label: server.name, keywords: [server.name.toLowerCase()] })
  }

  pillarLinkMap.set(pillar.slug, suggestions)
}

for (const comparison of comparisons) {
  const suggestions: LinkSuggestion[] = [
    { targetSlug: comparison.slug, targetType: "comparison", label: comparison.title, keywords: [comparison.vs.toLowerCase()] },
  ]

  topicLinkMap.set(comparison.slug, suggestions)
}

function getInternalLinks(slug: string, type: "server" | "topic" | "pillar" | "comparison"): LinkSuggestion[] {
  switch (type) {
    case "server":
      return serverLinkMap.get(slug) || []
    case "topic":
      return topicLinkMap.get(slug) || []
    case "pillar":
      return pillarLinkMap.get(slug) || []
    case "comparison": {
      const predefined = comparisonLinkMap.get(slug)
      if (predefined) return predefined

      if (slug.includes("-vs-")) {
        const parts = slug.split("-vs-")
        if (parts.length === 2) {
          const serverA = servers.find((s) => s.slug === parts[0] || s.slug === `${parts[0]}-mcp-server`)
          const serverB = servers.find((s) => s.slug === parts[1] || s.slug === `${parts[1]}-mcp-server`)
          if (serverA && serverB) {
            return [
              { targetSlug: serverA.slug, targetType: "server", label: serverA.name, keywords: [serverA.name.toLowerCase(), serverA.slug] },
              { targetSlug: serverB.slug, targetType: "server", label: serverB.name, keywords: [serverB.name.toLowerCase(), serverB.slug] },
            ]
          }
        }
      }
      return []
    }
  }
}

function enhanceFile(slug: string, type: "server" | "topic" | "pillar" | "comparison", dryRun = false): { linksAdded: number; content: string } {
  const dir = type === "server" ? "servers" : type === "topic" ? "topics" : type === "pillar" ? "pillars" : "compare"
  const filePath = path.join(CONTENT_ROOT, dir, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return { linksAdded: 0, content: "" }
  }

  let content = fs.readFileSync(filePath, "utf-8")
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

  if (!frontmatterMatch) {
    return { linksAdded: 0, content }
  }

  const frontmatter = frontmatterMatch[1]
  let body = frontmatterMatch[2]

  const suggestions = getInternalLinks(slug, type)
  let linksAdded = 0

  for (const suggestion of suggestions) {
    const keyword = suggestion.keywords[0]
    if (!keyword) continue

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(`(?<!\\[)(${escapedKeyword})(?!\\]\\([^\\)]+\\))`, "gi")

    const existingLink = new RegExp(`\\[${escapedKeyword}\\]\\(/[a-z]+/${suggestion.targetSlug}\\)`, "gi")
    if (existingLink.test(body)) {
      continue
    }

    const targetPath = `/${suggestion.targetType === "server" ? "servers" : suggestion.targetType === "topic" ? "topics" : suggestion.targetType === "pillar" ? "" : "compare"}${suggestion.targetType === "pillar" ? "" : "/"}${suggestion.targetSlug}`
    const linkMarkdown = `[${suggestion.label}](${targetPath})`

    const matches = body.match(regex)
    if (matches && matches.length > 0 && linksAdded < 3) {
      const firstMatchIndex = body.search(regex)
      if (firstMatchIndex !== -1) {
        body = body.substring(0, firstMatchIndex) + linkMarkdown + body.substring(firstMatchIndex + keyword.length)
        linksAdded++
      }
    }
  }

  if (linksAdded > 0) {
    const newContent = `---\n${frontmatter}\n---\n${body}`
    if (!dryRun) {
      fs.writeFileSync(filePath, newContent)
    }
    content = newContent
  }

  return { linksAdded, content }
}

function enhanceAllContent(dryRun = false) {
  console.log(`[internal-links] ${dryRun ? "Dry run" : "Enhancing"} internal links...`)

  let totalLinksAdded = 0
  const stats = { servers: 0, topics: 0, pillars: 0, comparisons: 0 }

  for (const server of servers) {
    const result = enhanceFile(server.slug, "server", dryRun)
    totalLinksAdded += result.linksAdded
    stats.servers++
  }

  for (const topic of topics) {
    const result = enhanceFile(topic.slug, "topic", dryRun)
    totalLinksAdded += result.linksAdded
    stats.topics++
  }

  for (const pillar of pillars) {
    const result = enhanceFile(pillar.slug, "pillar", dryRun)
    totalLinksAdded += result.linksAdded
    stats.pillars++
  }

  for (const comparison of comparisons) {
    const result = enhanceFile(comparison.slug, "comparison", dryRun)
    totalLinksAdded += result.linksAdded
    stats.comparisons++
  }

  const comparisonDirPath = path.join(CONTENT_ROOT, "compare")
  if (fs.existsSync(comparisonDirPath)) {
    const comparisonFiles = fs.readdirSync(comparisonDirPath).filter((f) => f.endsWith(".md"))
    for (const file of comparisonFiles) {
      const slug = file.replace(/\.md$/, "")
      if (!comparisons.some((c) => c.slug === slug)) {
        const result = enhanceFile(slug, "comparison", dryRun)
        totalLinksAdded += result.linksAdded
        stats.comparisons++
      }
    }
  }

  console.log(`[internal-links] ${dryRun ? "Would add" : "Added"} ${totalLinksAdded} internal links`)
  console.log(`[internal-links] Servers: ${stats.servers}, Topics: ${stats.topics}, Pillars: ${stats.pillars}, Comparisons: ${stats.comparisons}`)
}

const dryRun = process.argv.includes("--dry-run")
enhanceAllContent(dryRun)
