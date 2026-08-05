#!/usr/bin/env node
/**
 * Phase 3 — H1 and Heading Hierarchy Repair
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

function generateH1(filePath: string, fm: Record<string, any>, body: string): string {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const parts = relPath.split("/");
  
  if (parts[1] === "servers") {
    const name = fm.title || parts[2].replace(/-/g, " ").replace(/-ugc$/, "");
    return `${name} — MCP Server Overview, Setup, and Usage`;
  }
  if (parts[1] === "topics") {
    const name = fm.title || parts[2].replace(/-/g, " ");
    return `${name} — MCP Topic Guide`;
  }
  if (parts[1] === "pillars") {
    const name = fm.title || parts[2].replace(/-/g, " ");
    return `${name} — MCP Pillar Overview`;
  }
  if (parts[1] === "compare") {
    const name = fm.title || parts[2].replace(/-/g, " ").replace(/-ugc$/, "");
    return `${name} — MCP Comparison`;
  }
  if (parts[1] === "blog") {
    const name = fm.title || parts[2].replace(/-/g, " ");
    return `${name} — MCP Blog`;
  }
  if (parts[1] === "ugc") {
    const name = fm.title || parts[3]?.replace(/-/g, " ") || parts[2];
    return `${name} — Community Insights`;
  }
  if (parts[1] === "parasite-seo") {
    return fm.title || parts[2].replace(/-/g, " ");
  }
  if (parts[1] === "glossary") {
    return fm.title || parts[2].replace(/-/g, " ");
  }
  if (parts[1] === "pages") {
    return fm.title || parts[2]?.replace(/-/g, " ") || "MCP Guide";
  }
  
  return fm.title || "MCP Guide";
}

function repairH1s() {
  console.log("[phase3] Repairing H1 and heading hierarchy...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  let fixed = 0;
  let skipped = 0;
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const parsedFm = parseFrontmatterObject(frontmatter);
    
    // Skip noindex pages
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    if (parsedFm.robots === "noindex" || parsedFm.noindex === true) {
      skipped++;
      continue;
    }
    
    // Check if H1 exists
    const hasH1 = /^#\s+.+$/m.test(body);
    
    if (!hasH1) {
      const h1 = generateH1(file, parsedFm, body);
      const newBody = `# ${h1}\n\n${body}`;
      const newContent = `---\n${frontmatter}\n---\n${newBody}`;
      fs.writeFileSync(file, newContent);
      fixed++;
    }
    
    // Ensure exactly one H1 (remove extra H1s)
    const h1Matches = body.match(/^#\s+.+$/gm) || [];
    if (h1Matches.length > 1) {
      const lines = body.split("\n");
      const newLines: string[] = [];
      let h1Count = 0;
      
      for (const line of lines) {
        if (/^#\s/.test(line)) {
          h1Count++;
          if (h1Count === 1) {
            newLines.push(line);
          } else {
            newLines.push(line.replace(/^#\s/, "## "));
          }
        } else {
          newLines.push(line);
        }
      }
      
      const newBody = newLines.join("\n");
      const newContent = `---\n${frontmatter}\n---\n${newBody}`;
      fs.writeFileSync(file, newContent);
    }
  }
  
  console.log(`[phase3] Fixed ${fixed} pages with missing H1s`);
  console.log(`[phase3] Skipped ${skipped} noindex pages`);
  
  // Verify results
  const verifyFiles = getAllMarkdownFiles(CONTENT_ROOT);
  let stillMissing = 0;
  let multipleH1 = 0;
  
  for (const file of verifyFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const parsedFm = parseFrontmatterObject(frontmatter);
    
    if (parsedFm.robots === "noindex" || parsedFm.noindex === true) continue;
    
    const h1Matches = body.match(/^#\s+.+$/gm) || [];
    if (h1Matches.length === 0) stillMissing++;
    if (h1Matches.length > 1) multipleH1++;
  }
  
  console.log(`[phase3] Verification: ${stillMissing} still missing H1, ${multipleH1} with multiple H1s`);
}

function main() {
  repairH1s();
}

main();
