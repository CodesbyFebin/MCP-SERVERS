#!/usr/bin/env node
/**
 * Phase 3 — Entity Graph
 * Builds one canonical entity graph from content and data sources.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");
const SRC_DATA_DIR = path.join(ROOT, "src", "data");

interface Entity {
  id: string;
  type: "server" | "client" | "sdk" | "database" | "language" | "framework" | "cloud" | "company" | "protocol" | "security" | "architecture" | "standard" | "tool" | "resource" | "prompt";
  name: string;
  description: string;
  aliases: string[];
  related: string[];
  sources: string[];
  canonicalUrl: string;
}

interface EntityGraph {
  entities: Entity[];
  relationships: Array<{ source: string; target: string; type: string }>;
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

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildEntityGraph(): EntityGraph {
  console.log("[phase3] Building entity graph...");
  
  const entities = new Map<string, Entity>();
  const relationships: Array<{ source: string; target: string; type: string }> = [];
  
  // Load servers data
  const serversDataPath = path.join(SRC_DATA_DIR, "servers.ts");
  if (fs.existsSync(serversDataPath)) {
    const content = fs.readFileSync(serversDataPath, "utf-8");
    const serverMatches = content.matchAll(/name:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*description:\s*"([^"]+)"/g);
    
    for (const match of serverMatches) {
      const name = match[1];
      const slug = match[2];
      const category = match[3];
      const description = match[4];
      
      entities.set(`server-${slug}`, {
        id: `server-${slug}`,
        type: "server",
        name,
        description,
        aliases: [name.toLowerCase(), category.toLowerCase()],
        related: [],
        sources: [`src/data/servers.ts`],
        canonicalUrl: `/servers/${slug}`,
      });
    }
  }
  
  // Load categories
  const categoriesPath = path.join(SRC_DATA_DIR, "categories.ts");
  if (fs.existsSync(categoriesPath)) {
    const content = fs.readFileSync(categoriesPath, "utf-8");
    const categoryMatches = content.matchAll(/slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)"/g);
    
    for (const match of categoryMatches) {
      const slug = match[1];
      const name = match[2];
      const description = match[3];
      
      entities.set(`category-${slug}`, {
        id: `category-${slug}`,
        type: "category",
        name,
        description,
        aliases: [name.toLowerCase()],
        related: [],
        sources: [`src/data/categories.ts`],
        canonicalUrl: `/servers/category/${slug}`,
      });
    }
  }
  
  // Load topics
  const topicsDir = path.join(CONTENT_ROOT, "topics");
  const topicFiles = getAllMarkdownFiles(topicsDir);
  
  for (const file of topicFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    
    const name = fm.title || path.basename(file, ".md").replace(/-/g, " ");
    const slug = fm.slug || path.basename(file, ".md");
    
    entities.set(`topic-${slug}`, {
      id: `topic-${slug}`,
      type: "topic",
      name,
      description: fm.description || "",
      aliases: [name.toLowerCase()],
      related: [],
      sources: [file],
      canonicalUrl: `/topics/${slug}`,
    });
  }
  
  // Load pillars
  const pillarsDir = path.join(CONTENT_ROOT, "pillars");
  const pillarFiles = getAllMarkdownFiles(pillarsDir);
  
  for (const file of pillarFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    
    const name = fm.title || path.basename(file, ".md").replace(/-/g, " ");
    const slug = fm.slug || path.basename(file, ".md");
    
    entities.set(`pillar-${slug}`, {
      id: `pillar-${slug}`,
      type: "pillar",
      name,
      description: fm.description || "",
      aliases: [name.toLowerCase()],
      related: [],
      sources: [file],
      canonicalUrl: `/pillars/${slug}`,
    });
  }
  
  // Build relationships from content links
  const allContentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  
  for (const file of allContentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { body } = extractFrontmatter(content);
    
    const linkMatches = body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
    for (const match of linkMatches) {
      const text = match[1];
      const href = match[2];
      
      if (href.startsWith("/") && !href.startsWith("//")) {
        const targetSlug = href.replace(/^\//, "").replace(/\.md$/, "");
        
        // Try to match to existing entities
        for (const [entityId, entity] of entities.entries()) {
          if (entity.canonicalUrl === href || entity.id === targetSlug || entity.name.toLowerCase() === text.toLowerCase()) {
            relationships.push({
              source: path.relative(ROOT, file).replace(/\\/g, "/"),
              target: entity.id,
              type: "links-to",
            });
            break;
          }
        }
      }
    }
  }
  
  return {
    entities: Array.from(entities.values()),
    relationships,
  };
}

function printEntityGraphStats(graph: EntityGraph) {
  console.log("\n=== Phase 3: Entity Graph Stats ===\n");
  console.log(`Total entities: ${graph.entities.length}`);
  
  const byType = new Map<string, number>();
  for (const entity of graph.entities) {
    byType.set(entity.type, (byType.get(entity.type) || 0) + 1);
  }
  
  console.log("\nBy type:");
  for (const [type, count] of [...byType.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${type}: ${count}`);
  }
  
  console.log(`\nTotal relationships: ${graph.relationships.length}`);
  console.log(`Entities with relationships: ${new Set(graph.relationships.flatMap(r => [r.source, r.target])).size}`);
}

const graph = buildEntityGraph();
printEntityGraphStats(graph);

const outputPath = path.join(ROOT, "ENTITY_GRAPH.json");
fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2));
console.log(`\nEntity graph saved to: ${outputPath}`);
