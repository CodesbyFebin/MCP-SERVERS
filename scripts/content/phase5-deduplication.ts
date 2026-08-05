#!/usr/bin/env node
/**
 * Phase 5 — Deduplicate entities, headings, and keyword ownership
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");
const REMEDIATION_DIR = path.join(ROOT, ".remediation");

function getAllMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) walk(fullPath);
      else if (entry.endsWith(".md")) files.push(fullPath);
    }
  }
  walk(dir);
  return files;
}

function extractFrontmatter(content: string): { frontmatter: string; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: "", body: content };
  return { frontmatter: match[1], body: match[2] };
}

function parseYamlValue(value: string): any {
  value = value.trim();
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
  if (value.startsWith('[') && value.endsWith(']')) return value.slice(1, -1).split(",").map(v => v.trim().replace(/^["']|["']$/g, ""));
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
    if (match) result[match[1]] = parseYamlValue(match[2]);
  }
  return result;
}

function deduplicateEntities() {
  console.log("[phase5] Deduplicating entities...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const entityMap = new Map<string, string[]>(); // normalized entity -> [pageIds]
  const duplicates: Array<{ entity: string; pages: string[] }> = [];
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    const entity = (fm.slug || fm.serverSlug || fm.topicSlug || fm.pillarSlug || relPath)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    if (!entityMap.has(entity)) entityMap.set(entity, []);
    entityMap.get(entity)!.push(relPath);
  }
  
  for (const [entity, pages] of entityMap.entries()) {
    if (pages.length > 1) {
      duplicates.push({ entity, pages });
    }
  }
  
  console.log(`Found ${duplicates.length} duplicate entities`);
  
  // Create canonical-intent registry
  const registry = duplicates.map(d => ({
    entity_id: d.entity,
    primary_intent: "informational",
    canonical_route: d.pages[0],
    supporting_queries: d.pages.slice(1),
    content_family: "unknown",
    status: "active",
    conflicts: d.pages.length - 1,
  }));
  
  const registryPath = path.join(REMEDIATION_DIR, "canonical-intent-registry.json");
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  console.log(`Canonical-intent registry saved: ${registryPath}`);
  
  return duplicates;
}

function deduplicateHeadings() {
  console.log("[phase5] Deduplicating headings...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const headingMap = new Map<string, string[]>();
  const duplicates: Array<{ heading: string; pages: string[] }> = [];
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { body } = extractFrontmatter(content);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    const headingMatches = body.matchAll(/^#{1,3}\s+(.+)$/gm);
    for (const match of headingMatches) {
      const heading = match[1].toLowerCase().trim();
      if (!headingMap.has(heading)) headingMap.set(heading, []);
      headingMap.get(heading)!.push(relPath);
    }
  }
  
  for (const [heading, pages] of headingMap.entries()) {
    if (pages.length > 1) {
      duplicates.push({ heading, pages });
    }
  }
  
  console.log(`Found ${duplicates.length} duplicate headings`);
  
  const reportPath = path.join(REMEDIATION_DIR, "heading-duplicates.json");
  fs.writeFileSync(reportPath, JSON.stringify(duplicates.slice(0, 100), null, 2));
  console.log(`Heading duplicates report saved: ${reportPath}`);
  
  return duplicates;
}

function deduplicateKeywords() {
  console.log("[phase5] Deduplicating keyword ownership...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const keywordMap = new Map<string, string[]>();
  const duplicates: Array<{ keyword: string; pages: string[] }> = [];
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    const keywords = Array.isArray(fm.keywords) ? fm.keywords : (typeof fm.keywords === "string" ? [fm.keywords] : []);
    for (const keyword of keywords) {
      const normalized = keyword.toLowerCase().trim();
      if (!keywordMap.has(normalized)) keywordMap.set(normalized, []);
      keywordMap.get(normalized)!.push(relPath);
    }
  }
  
  for (const [keyword, pages] of keywordMap.entries()) {
    if (pages.length > 1) {
      duplicates.push({ keyword, pages });
    }
  }
  
  console.log(`Found ${duplicates.length} duplicate keyword assignments`);
  
  const reportPath = path.join(REMEDIATION_DIR, "keyword-duplicates.json");
  fs.writeFileSync(reportPath, JSON.stringify(duplicates.slice(0, 100), null, 2));
  console.log(`Keyword duplicates report saved: ${reportPath}`);
  
  return duplicates;
}

function main() {
  console.log("[phase5] Starting deduplication...\n");
  
  const entityDuplicates = deduplicateEntities();
  const headingDuplicates = deduplicateHeadings();
  const keywordDuplicates = deduplicateKeywords();
  
  console.log("\n=== Phase 5: Deduplication Summary ===");
  console.log(`Duplicate entities: ${entityDuplicates.length}`);
  console.log(`Duplicate headings: ${headingDuplicates.length}`);
  console.log(`Duplicate keywords: ${keywordDuplicates.length}`);
  
  console.log("\n[phase5] Deduplication complete.");
  console.log("[phase5] Next: Phase 6 — Page reclassification");
}

main();
