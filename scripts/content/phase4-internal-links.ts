#!/usr/bin/env node
/**
 * Phase 4 — Rebuild Internal-Link Graph
 * Fixes broken links and dead-end pages after canonical ownership is stable.
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

function getRoute(filePath: string, fm: Record<string, any>): string {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const parts = relPath.split("/");
  
  if (parts[0] === "content") {
    if (parts[1] === "servers") return `/servers/${fm.slug || path.basename(filePath, ".md")}`;
    if (parts[1] === "topics") return `/topics/${fm.slug || path.basename(filePath, ".md")}`;
    if (parts[1] === "pillars") return `/pillars/${fm.slug || path.basename(filePath, ".md")}`;
    if (parts[1] === "compare") return `/compare/${fm.slug || path.basename(filePath, ".md")}`;
    if (parts[1] === "blog") return `/blog/${fm.slug || path.basename(filePath, ".md")}`;
    if (parts[1] === "ugc") {
      if (parts[2] === "topics") return `/ugc/topics/${fm.slug || path.basename(filePath, ".md")}`;
      if (parts[2] === "pillars") return `/ugc/pillars/${fm.slug || path.basename(filePath, ".md")}`;
      if (parts[2] === "compare") return `/ugc/compare/${fm.slug || path.basename(filePath, ".md")}`;
      if (parts[2] === "blog") return `/ugc/blog/${fm.slug || path.basename(filePath, ".md")}`;
    }
    if (parts[1] === "parasite-seo") return `/parasite-seo/${path.basename(filePath, ".md")}`;
    if (parts[1] === "glossary") return `/glossary/${path.basename(filePath, ".md")}`;
    if (parts[1] === "pages") return `/${parts.slice(2).join("/")}`;
  }
  
  return `/${path.basename(filePath, ".md")}`;
}

function buildLinkGraph() {
  console.log("[phase4] Building internal link graph...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const linkGraph = new Map<string, Set<string>>();
  const allLinks: Array<{ source: string; target: string }> = [];
  
  // Build link graph
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { body } = extractFrontmatter(content);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    const linkMatches = body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
    const outgoingLinks = new Set<string>();
    
    for (const match of linkMatches) {
      const href = match[2];
      if (href.startsWith("/") && !href.startsWith("//")) {
        outgoingLinks.add(href);
        allLinks.push({ source: relPath, target: href });
      }
    }
    
    linkGraph.set(relPath, outgoingLinks);
  }
  
  // Find valid targets
  const validTargets = new Set<string>();
  for (const file of contentFiles) {
    const route = getRoute(file, parseFrontmatterObject(extractFrontmatter(fs.readFileSync(file, "utf-8")).frontmatter));
    validTargets.add(route);
    validTargets.add(route + "/");
  }
  
  // Find broken links
  const brokenLinks: Array<{ source: string; target: string }> = [];
  for (const link of allLinks) {
    if (!validTargets.has(link.target) && !link.target.includes("http")) {
      brokenLinks.push(link);
    }
  }
  
  // Find dead ends
  const deadEnds: string[] = [];
  for (const [source, targets] of linkGraph.entries()) {
    if (targets.size === 0) {
      deadEnds.push(source);
    }
  }
  
  // Find weak hubs
  const incomingLinks = new Map<string, number>();
  for (const [source, targets] of linkGraph.entries()) {
    for (const target of targets) {
      incomingLinks.set(target, (incomingLinks.get(target) || 0) + 1);
    }
  }
  
  const weakHubs: string[] = [];
  for (const [source, targets] of linkGraph.entries()) {
    const incoming = incomingLinks.get(source) || 0;
    if (incoming < 2 && targets.size > 0) {
      weakHubs.push(`${source} (${incoming} incoming)`);
    }
  }
  
  return {
    linkGraph,
    brokenLinks,
    deadEnds,
    weakHubs,
    validTargets: Array.from(validTargets),
  };
}

function fixBrokenLinks(brokenLinks: Array<{ source: string; target: string }>, validTargets: string[]) {
  console.log(`[phase4] Fixing ${brokenLinks.length} broken links...\n`);
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  let fixed = 0;
  
  for (const file of contentFiles) {
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    const brokenForSource = brokenLinks.filter(l => l.source === relPath);
    if (brokenForSource.length === 0) continue;
    
    let content = fs.readFileSync(file, "utf-8");
    let modified = false;
    
    for (const broken of brokenForSource) {
      const brokenTarget = broken.target;
      
      // Try to find a valid target
      const targetSlug = brokenTarget.replace(/^\//, "").replace(/\/$/, "").replace(/\.md$/, "");
      
      // Check if there's a similar valid target
      const similarTarget = validTargets.find(t => 
        t.includes(targetSlug) || 
        t.replace(/\/$/, "").includes(targetSlug) ||
        targetSlug.includes(t.replace(/\/$/, "").replace(/^\//, ""))
      );
      
      if (similarTarget) {
        content = content.replace(
          new RegExp(`\\[([^\\]]+)\\]\\(${brokenTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, "g"),
          `[$1](${similarTarget})`
        );
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(file, content);
      fixed++;
    }
  }
  
  console.log(`[phase4] Fixed broken links in ${fixed} files`);
}

function fixDeadEnds(deadEnds: string[], validTargets: string[]) {
  console.log(`[phase4] Fixing ${deadEnds.length} dead-end pages...\n`);
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const hubPages = validTargets.slice(0, 20); // Use first 20 valid targets as hubs
  
  let fixed = 0;
  
  for (const file of contentFiles) {
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    if (!deadEnds.includes(relPath)) continue;
    
    let content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    
    // Add links to hub pages at the end
    const hubLinks = hubPages
      .filter(h => !body.includes(h))
      .slice(0, 3)
      .map(h => `- [${h.replace(/^\//, "").replace(/-/g, " ").replace(/\//g, " — ")}](${h})`)
      .join("\n");
    
    if (hubLinks) {
      const newBody = `${body}\n\n## Related\n\n${hubLinks}\n`;
      const newContent = `---\n${frontmatter}\n---\n${newBody}`;
      fs.writeFileSync(file, newContent);
      fixed++;
    }
  }
  
  console.log(`[phase4] Fixed ${fixed} dead-end pages`);
}

function main() {
  console.log("[phase4] Starting internal-link graph rebuild...\n");
  
  const { brokenLinks, deadEnds, validTargets } = buildLinkGraph();
  
  console.log(`Found ${brokenLinks.length} broken links`);
  console.log(`Found ${deadEnds.length} dead-end pages`);
  
  fixBrokenLinks(brokenLinks, validTargets);
  fixDeadEnds(deadEnds, validTargets);
  
  console.log("\n[phase4] Internal-link graph rebuild complete.");
  console.log("[phase4] Next: Phase 5 — Entity deduplication");
}

main();
