#!/usr/bin/env node
/**
 * Phase 2 — Content Inventory
 * Generates content-inventory.json with Page, Entity, Cluster, Intent, Canonical, Status, Quality, Owner, Schema, Word Count, Internal Links, Evidence, Publication State, Last Updated, Hash
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");

interface ContentInventoryEntry {
  page: string;
  entity: string;
  cluster: string;
  intent: string;
  canonical: string;
  status: "draft" | "published" | "archived";
  quality: number;
  owner: string;
  schema: string;
  wordCount: number;
  internalLinks: number;
  evidence: boolean;
  publicationState: string;
  lastUpdated: string;
  hash: string;
}

function getAllMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  
  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

function extractFrontmatter(content: string): { frontmatter: string; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: "", body: content };
  }
  return { frontmatter: match[1], body: match[2] };
}

function parseYamlValue(value: string): any {
  value = value.trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  if (value.startsWith('[') && value.endsWith(']')) {
    return value.slice(1, -1).split(",").map(v => v.trim().replace(/^["']|["']$/g, ""));
  }
  if (value === "true") return true;
  if (value === "false") return false;
  if (!isNaN(Number(value))) return Number(value);
  return value;
}

function parseFrontmatterObject(frontmatter: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = frontmatter.split("\n");
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      result[match[1]] = parseYamlValue(match[2]);
    }
  }
  
  return result;
}

function inferCluster(filePath: string, fm: Record<string, any>): string {
  const rel = filePath.replace(/^.*content\//, "");
  const parts = rel.split("/");
  
  if (parts[0] === "servers") return "servers";
  if (parts[0] === "topics") return "topics";
  if (parts[0] === "pillars") return "pillars";
  if (parts[0] === "compare") return "comparisons";
  if (parts[0] === "blog") return "blog";
  if (parts[0] === "ugc") {
    if (parts[1] === "topics") return "topics-ugc";
    if (parts[1] === "pillars") return "pillars-ugc";
    if (parts[1] === "compare") return "comparisons-ugc";
    if (parts[1] === "blog") return "blog-ugc";
    return "ugc";
  }
  if (parts[0] === "parasite-seo") return "parasite-seo";
  if (parts[0] === "glossary") return "glossary";
  if (parts[0] === "pages") return "pages";
  if (parts[0] === "reports") return "reports";
  
  return "unknown";
}

function inferEntity(filePath: string, fm: Record<string, any>): string {
  const slug = fm.slug || fm.serverSlug || fm.topicSlug || fm.pillarSlug || fm.comparisonSlug || fm.blogSlug;
  if (slug) return slug;
  
  const rel = filePath.replace(/^.*content\//, "").replace(/\.md$/, "");
  return rel.replace(/\//g, "-");
}

function inferIntent(filePath: string, fm: Record<string, any>, body: string): string {
  const text = `${fm.title || ""} ${fm.description || ""} ${body}`.toLowerCase();
  
  if (text.includes("what is") || text.includes("definition")) return "informational";
  if (text.includes("how to") || text.includes("tutorial") || text.includes("guide")) return "how-to";
  if (text.includes("vs") || text.includes("versus") || text.includes("compare")) return "comparison";
  if (text.includes("review") || text.includes("rating") || text.includes("testimonial")) return "review";
  if (text.includes("best") || text.includes("top")) return "list";
  if (text.includes("troubleshoot") || text.includes("error") || text.includes("fix")) return "troubleshooting";
  if (text.includes("enterprise") || text.includes("business")) return "enterprise";
  if (text.includes("security") || text.includes("authentication")) return "security";
  if (text.includes("performance") || text.includes("optimization")) return "performance";
  if (text.includes("integration") || text.includes("connect")) return "integration";
  
  return "informational";
}

function calculateQuality(fm: Record<string, any>, body: string, wordCount: number): number {
  let score = 0;
  
  if (fm.title) score += 20;
  if (fm.description) score += 20;
  if (fm.keywords) score += 10;
  if (fm.schemaType || fm.schema) score += 10;
  if (wordCount > 2000) score += 20;
  else if (wordCount > 1000) score += 10;
  if (/```[\s\S]*?```/.test(body)) score += 10;
  if (/\[([^\]]+)\]\(([^)]+)\)/.test(body)) score += 10;
  if (/FAQ|Frequently Asked Questions/i.test(body)) score += 10;
  if (/## Community Insights/i.test(body)) score += 10;
  
  return Math.min(100, score);
}

function hasEvidence(body: string): boolean {
  return /```[\s\S]*?```/.test(body) || 
         /case study|example|demo|proof/i.test(body) ||
         /\[([^\]]+)\]\(([^)]+)\)/.test(body);
}

function generateInventory(): ContentInventoryEntry[] {
  console.log("[phase2] Generating content inventory...");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const inventory: ContentInventoryEntry[] = [];
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = getRelativePath(file);
    
    const wordCount = body.split(/\s+/).filter(Boolean).length;
    const canonical = (fm.canonical || fm.canonicalUrl || `/${relPath.replace(/^content\//, "").replace(/\.md$/, "").replace(/\//g, "/")}`) as string;
    const internalLinks = (body.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length;
    const hash = crypto.createHash("md5").update(content).digest("hex").substring(0, 16);
    
    inventory.push({
      page: relPath,
      entity: inferEntity(file, fm),
      cluster: inferCluster(file, fm),
      intent: inferIntent(file, fm, body),
      canonical,
      status: "published",
      quality: calculateQuality(fm, body, wordCount),
      owner: "content-team",
      schema: (fm.schemaType || fm.schema || "WebPage") as string,
      wordCount,
      internalLinks,
      evidence: hasEvidence(body),
      publicationState: "published",
      lastUpdated: new Date().toISOString().split("T")[0],
      hash,
    });
  }
  
  return inventory;
}

function printInventoryStats(inventory: ContentInventoryEntry[]) {
  console.log("\n=== Phase 2: Content Inventory Stats ===\n");
  console.log(`Total pages: ${inventory.length}`);
  
  const clusters = new Map<string, number>();
  const intents = new Map<string, number>();
  const schemas = new Map<string, number>();
  const qualities: number[] = [];
  
  for (const entry of inventory) {
    clusters.set(entry.cluster, (clusters.get(entry.cluster) || 0) + 1);
    intents.set(entry.intent, (intents.get(entry.intent) || 0) + 1);
    schemas.set(entry.schema, (schemas.get(entry.schema) || 0) + 1);
    qualities.push(entry.quality);
  }
  
  console.log("\nClusters:");
  for (const [cluster, count] of [...clusters.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cluster}: ${count}`);
  }
  
  console.log("\nIntents:");
  for (const [intent, count] of [...intents.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${intent}: ${count}`);
  }
  
  console.log("\nSchemas:");
  for (const [schema, count] of [...schemas.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${schema}: ${count}`);
  }
  
  const avgQuality = Math.round(qualities.reduce((a, b) => a + b, 0) / qualities.length);
  console.log(`\nAverage quality: ${avgQuality}`);
  console.log(`Pages with evidence: ${inventory.filter(e => e.evidence).length}`);
  console.log(`Pages with internal links: ${inventory.filter(e => e.internalLinks > 0).length}`);
}

function getRelativePath(filePath: string): string {
  return path.relative(ROOT, filePath).replace(/\\/g, "/");
}

const inventory = generateInventory();
printInventoryStats(inventory);

const outputPath = path.join(ROOT, "CONTENT_INVENTORY.json");
fs.writeFileSync(outputPath, JSON.stringify(inventory, null, 2));
console.log(`\nContent inventory saved to: ${outputPath}`);
