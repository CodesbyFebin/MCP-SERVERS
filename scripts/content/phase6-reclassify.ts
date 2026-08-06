#!/usr/bin/env node
/**
 * Phase 6 — Reclassify pages and create canonical-intent registry
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

function classifyPage(filePath: string, fm: Record<string, any>, body: string): {
  state: "high-value-recoverable" | "useful-overlapping" | "supporting" | "duplicate" | "thin" | "high-risk" | "production-ready";
  action: "rewrite-retain" | "merge" | "noindex" | "redirect" | "retire" | "quarantine" | "keep";
  reason: string;
} {
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const hasEvidence = /```[\s\S]*?```/.test(body) || /case study|example|demo|proof/i.test(body);
  const hasInternalLinks = /\[([^\]]+)\]\(([^)]+)\)/.test(body);
  const hasSchema = fm.schemaType || fm.schema;
  const hasCanonical = fm.canonical || fm.canonicalUrl;
  
  // High-risk unsupported claim
  if (/guarantee|100%|always|never|definitely|cure|miracle/i.test(body) && !hasEvidence) {
    return { state: "high-risk", action: "quarantine", reason: "Unsupported claims without evidence" };
  }
  
  // Duplicate
  if (fm.redirectTo) {
    return { state: "duplicate", action: "redirect", reason: "Marked as redirect" };
  }
  
  // Thin and unsupported
  if (wordCount < 500 && !hasEvidence && !hasInternalLinks) {
    return { state: "thin", action: "retire", reason: "Thin content without evidence or links" };
  }
  
  // High-value and recoverable
  if (wordCount >= 1000 && hasEvidence && hasInternalLinks && hasSchema && hasCanonical) {
    return { state: "production-ready", action: "keep", reason: "Meets all quality criteria" };
  }
  
  if (wordCount >= 1000 && (hasEvidence || hasInternalLinks)) {
    return { state: "high-value-recoverable", action: "rewrite-retain", reason: "Good foundation, needs improvement" };
  }
  
  // Useful but overlapping
  if (wordCount >= 500 && wordCount < 1000) {
    return { state: "useful-overlapping", action: "merge", reason: "Overlapping content, should be merged" };
  }
  
  // Supporting content
  if (wordCount >= 300 && wordCount < 500) {
    return { state: "supporting", action: "noindex", reason: "Supporting content, should be embedded" };
  }
  
  // Default
  return { state: "thin", action: "retire", reason: "Does not meet quality threshold" };
}

function main() {
  console.log("[phase6] Reclassifying pages...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const classifications: Array<{
    pageId: string;
    route: string;
    state: string;
    action: string;
    reason: string;
    wordCount: number;
    quality: number;
  }> = [];
  
  const stateCounts = new Map<string, number>();
  const actionCounts = new Map<string, number>();
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    const classification = classifyPage(file, fm, body);
    const wordCount = body.split(/\s+/).filter(Boolean).length;
    
    stateCounts.set(classification.state, (stateCounts.get(classification.state) || 0) + 1);
    actionCounts.set(classification.action, (actionCounts.get(classification.action) || 0) + 1);
    
    classifications.push({
      pageId: relPath,
      route: relPath.replace(/^content\//, "").replace(/\.md$/, "").replace(/\//g, "/"),
      state: classification.state,
      action: classification.action,
      reason: classification.reason,
      wordCount,
      quality: Math.min(100, wordCount > 2000 ? 80 : wordCount > 1000 ? 60 : 40),
    });
  }
  
  console.log("Page states:");
  for (const [state, count] of [...stateCounts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${state}: ${count}`);
  }
  
  console.log("\nActions:");
  for (const [action, count] of [...actionCounts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${action}: ${count}`);
  }
  
  // Save classification registry
  const registryPath = path.join(REMEDIATION_DIR, "page-classification-registry.json");
  fs.writeFileSync(registryPath, JSON.stringify(classifications, null, 2));
  console.log(`\nClassification registry saved: ${registryPath}`);
  
  // Generate action plan
  const actionPlan = {
    rewriteRetain: classifications.filter(c => c.action === "rewrite-retain"),
    merge: classifications.filter(c => c.action === "merge"),
    noindex: classifications.filter(c => c.action === "noindex"),
    redirect: classifications.filter(c => c.action === "redirect"),
    retire: classifications.filter(c => c.action === "retire"),
    quarantine: classifications.filter(c => c.action === "quarantine"),
    keep: classifications.filter(c => c.action === "keep"),
  };
  
  const actionPlanPath = path.join(REMEDIATION_DIR, "action-plan.json");
  fs.writeFileSync(actionPlanPath, JSON.stringify(actionPlan, null, 2));
  console.log(`Action plan saved: ${actionPlanPath}`);
  
  console.log("\n[phase6] Reclassification complete.");
  console.log("[phase6] Next: Phase 7 — Batch remediation");
}

main();
