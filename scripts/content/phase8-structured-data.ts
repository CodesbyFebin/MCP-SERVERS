#!/usr/bin/env node
/**
 * Phase 8 — Structured Data
 * Adds schema only after page content is valid.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");

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

function getSchemaType(filePath: string, fm: Record<string, any>): string {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const parts = relPath.split("/");
  
  if (parts[1] === "servers") return "SoftwareApplication";
  if (parts[1] === "compare") return "Article";
  if (parts[1] === "topics" || parts[1] === "pillars") return "TechArticle";
  if (parts[1] === "glossary") return "DefinedTerm";
  if (parts[1] === "blog") return "BlogPosting";
  if (parts[1] === "pages") return "WebPage";
  
  return "WebPage";
}

function main() {
  console.log("[phase8] Adding structured data...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  let updated = 0;
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    
    // Skip if already has schemaType
    if (fm.schemaType || fm.schema) continue;
    
    const schemaType = getSchemaType(file, fm);
    const newFrontmatter = frontmatter + `\nschemaType: "${schemaType}"\n`;
    const newContent = `---\n${newFrontmatter}\n---\n${body}`;
    
    fs.writeFileSync(file, newContent);
    updated++;
  }
  
  console.log(`[phase8] Added structured data to ${updated} pages`);
  console.log(`[phase8] Total pages with schema: ${contentFiles.length}`);
  
  console.log("\n[phase8] Structured data addition complete.");
  console.log("[phase8] Next: Phase 9 — Strengthen SAFE-DEEP gates");
}

main();
