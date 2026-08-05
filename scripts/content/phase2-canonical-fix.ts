#!/usr/bin/env node
/**
 * Phase 2 — Canonical Ownership Repair
 * Assigns exactly one canonical URL per indexable page, normalizes to https://www.mcpserver.in/<path>/,
 * detects duplicate ownership, and updates sitemap/canonical alignment.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");
const APP_DIR = path.join(ROOT, "app");
const REMEDIATION_DIR = path.join(ROOT, ".remediation");
const LEDGER_PATH = path.join(REMEDIATION_DIR, "remediation-ledger.csv");

const CANONICAL_BASE = "https://www.mcpserver.in";

interface CanonicalAssignment {
  pageId: string;
  route: string;
  canonical: string;
  intent: string;
  entity: string;
  status: "canonical" | "redirect" | "noindex" | "retire";
  conflict: boolean;
  duplicateOf?: string;
}

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

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
  }
  
  return `/${path.basename(filePath, ".md")}`;
}

function buildCanonicalAssignments(): CanonicalAssignment[] {
  console.log("[phase2] Building canonical assignments...");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const assignments: CanonicalAssignment[] = [];
  const canonicalMap = new Map<string, string[]>(); // canonical -> [pageIds]
  const intentMap = new Map<string, string[]>(); // intent -> [pageIds]
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    // Skip draft, UGC mirrors, benchmarks, noindex
    const isDraft = fm.status === "draft" || fm.draft === true;
    const isUgc = relPath.includes("/ugc/");
    const isBenchmark = relPath.includes("benchmark") || relPath.includes("baseline");
    const isNoindex = fm.noindex === true || fm.robots === "noindex";
    
    if (isDraft || isUgc || isBenchmark || isNoindex) {
      assignments.push({
        pageId: relPath,
        route: getRoute(file, fm),
        canonical: "",
        intent: inferIntent(file, fm, body),
        entity: fm.slug || fm.serverSlug || fm.topicSlug || fm.pillarSlug || relPath,
        status: "noindex",
        conflict: false,
      });
      continue;
    }
    
    const route = getRoute(file, fm);
    const canonical = `${CANONICAL_BASE}${route}/`;
    const intent = inferIntent(file, fm, body);
    const entity = fm.slug || fm.serverSlug || fm.topicSlug || fm.pillarSlug || relPath;
    
    // Track canonical ownership
    if (!canonicalMap.has(canonical)) canonicalMap.set(canonical, []);
    canonicalMap.get(canonical)!.push(relPath);
    
    // Track intent ownership
    const intentKey = `${intent}:${entity}`;
    if (!intentMap.has(intentKey)) intentMap.set(intentKey, []);
    intentMap.get(intentKey)!.push(relPath);
    
    assignments.push({
      pageId: relPath,
      route,
      canonical,
      intent,
      entity,
      status: "canonical",
      conflict: false,
    });
  }
  
  // Detect duplicate canonicals
  for (const assignment of assignments) {
    if (assignment.status === "noindex") continue;
    
    const owners = canonicalMap.get(assignment.canonical) || [];
    if (owners.length > 1) {
      assignment.conflict = true;
      assignment.status = "redirect";
      assignment.duplicateOf = owners[0];
    }
  }
  
  // Detect duplicate intents
  for (const assignment of assignments) {
    if (assignment.status === "noindex" || assignment.status === "redirect") continue;
    
    const intentKey = `${assignment.intent}:${assignment.entity}`;
    const owners = intentMap.get(intentKey) || [];
    if (owners.length > 1) {
      assignment.conflict = true;
      assignment.status = "redirect";
      assignment.duplicateOf = owners[0];
    }
  }
  
  return assignments;
}

function applyCanonicalAssignments(assignments: CanonicalAssignment[]) {
  console.log("[phase2] Applying canonical assignments...");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  let updated = 0;
  
  for (const file of contentFiles) {
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    const assignment = assignments.find(a => a.pageId === relPath);
    if (!assignment) continue;
    
    let content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    
    if (assignment.status === "noindex") {
      // Add noindex to frontmatter
      if (!/robots:\s*noindex/.test(frontmatter)) {
        const newFrontmatter = frontmatter + `\nrobots: "noindex"\n`;
        content = `---\n${newFrontmatter}\n---\n${body}`;
        fs.writeFileSync(file, content);
        updated++;
      }
      continue;
    }
    
    if (assignment.status === "redirect") {
      // Add redirect metadata
      if (!/redirectFrom:|redirectTo:/.test(frontmatter)) {
        const newFrontmatter = frontmatter + `\nredirectTo: "${assignment.duplicateOf}"\n`;
        content = `---\n${newFrontmatter}\n---\n${body}`;
        fs.writeFileSync(file, content);
        updated++;
      }
      continue;
    }
    
    if (assignment.status === "canonical") {
      // Add/update canonical
      if (!/canonical:\s*"/.test(frontmatter) && !/canonicalUrl:\s*"/.test(frontmatter)) {
        const newFrontmatter = frontmatter + `\ncanonical: "${assignment.canonical}"\n`;
        content = `---\n${newFrontmatter}\n---\n${body}`;
        fs.writeFileSync(file, content);
        updated++;
      }
    }
  }
  
  console.log(`[phase2] Updated ${updated} files with canonical assignments`);
}

function generateCanonicalRegistry(assignments: CanonicalAssignment[]) {
  console.log("[phase2] Generating canonical registry...");
  
  const registry = assignments.map(a => ({
    pageId: a.pageId,
    route: a.route,
    canonical: a.canonical,
    intent: a.intent,
    entity: a.entity,
    status: a.status,
    conflict: a.conflict,
    duplicateOf: a.duplicateOf,
  }));
  
  const outputPath = path.join(REMEDIATION_DIR, "canonical-registry.json");
  fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2));
  console.log(`[phase2] Canonical registry saved: ${outputPath}`);
}

function generateSitemap() {
  console.log("[phase2] Generating sitemap from canonicals...");
  
  const assignments = buildCanonicalAssignments();
  const canonicals = assignments
    .filter(a => a.status === "canonical" && a.canonical)
    .map(a => a.canonical);
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${canonicals.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n")}
</urlset>`;
  
  const publicDir = path.join(ROOT, "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  
  const sitemapPath = path.join(publicDir, "sitemap-canonical.xml");
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`[phase2] Sitemap saved: ${sitemapPath} (${canonicals.length} URLs)`);
}

function printPhase2Report(assignments: CanonicalAssignment[]) {
  console.log("\n=== Phase 2: Canonical Ownership Report ===\n");
  
  const total = assignments.length;
  const canonical = assignments.filter(a => a.status === "canonical").length;
  const redirect = assignments.filter(a => a.status === "redirect").length;
  const noindex = assignments.filter(a => a.status === "noindex").length;
  const conflicts = assignments.filter(a => a.conflict).length;
  
  console.log(`Total pages: ${total}`);
  console.log(`Canonical: ${canonical} (${Math.round((canonical / total) * 100)}%)`);
  console.log(`Redirect: ${redirect} (${Math.round((redirect / total) * 100)}%)`);
  console.log(`Noindex: ${noindex} (${Math.round((noindex / total) * 100)}%)`);
  console.log(`Conflicts: ${conflicts}`);
  
  const byIntent = new Map<string, number>();
  for (const a of assignments) {
    byIntent.set(a.intent, (byIntent.get(a.intent) || 0) + 1);
  }
  
  console.log("\nBy intent:");
  for (const [intent, count] of [...byIntent.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${intent}: ${count}`);
  }
  
  const outputPath = path.join(REMEDIATION_DIR, "phase2-report.json");
  fs.writeFileSync(outputPath, JSON.stringify({
    total,
    canonical,
    redirect,
    noindex,
    conflicts,
    byIntent: Object.fromEntries(byIntent),
  }, null, 2));
  console.log(`\nReport saved: ${outputPath}`);
}

function main() {
  console.log("[phase2] Starting canonical ownership repair...\n");
  
  const assignments = buildCanonicalAssignments();
  applyCanonicalAssignments(assignments);
  generateCanonicalRegistry(assignments);
  generateSitemap();
  printPhase2Report(assignments);
  
  console.log("\n[phase2] Canonical ownership repair complete.");
  console.log("[phase2] Next: Phase 3 — H1 and heading hierarchy repair");
}

main();
