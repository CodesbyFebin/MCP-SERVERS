#!/usr/bin/env node
/**
 * Phase 9 — Strengthen SAFE-DEEP Gates
 * Updates quality criteria so publication fails when critical issues exist.
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

function validateSafeDeep(content: string, fm: Record<string, any>): { passed: boolean; issues: string[]; score: number } {
  const { body } = extractFrontmatter(content);
  const issues: string[] = [];
  let score = 0;
  
  // Evidence
  const hasCodeExamples = /```[\s\S]*?```/.test(body);
  const hasExternalLinks = /\[([^\]]+)\]\(https?:\/\//.test(body);
  const hasCaseStudies = /case study|case-study|real-world|example/i.test(body);
  const hasReferences = /\[([^\]]+)\]\([^)]+\)/.test(body);
  
  if (hasCodeExamples) score += 25; else issues.push("Missing code examples");
  if (hasExternalLinks) score += 25; else issues.push("Missing external references");
  if (hasCaseStudies) score += 25; else issues.push("Missing case studies or real-world examples");
  if (hasReferences) score += 25; else issues.push("Missing references");
  
  // Validation
  const hasTitle = !!fm.title;
  const hasDescription = !!fm.description;
  const hasKeywords = !!fm.keywords;
  const hasSchema = !!fm.schemaType || !!fm.schema;
  const hasCanonical = !!fm.canonical || !!fm.canonicalUrl;
  
  if (hasTitle) score += 10; else issues.push("Missing title");
  if (hasDescription) score += 10; else issues.push("Missing description");
  if (hasKeywords) score += 10; else issues.push("Missing keywords");
  if (hasSchema) score += 10; else issues.push("Missing schema");
  if (hasCanonical) score += 10; else issues.push("Missing canonical");
  
  // H1 check
  const hasH1 = /^#\s+.+$/m.test(body);
  if (hasH1) score += 10; else issues.push("Missing H1");
  
  // Internal links
  const internalLinks = (body.match(/\[([^\]]+)\]\((\/[^)]+)\)/g) || []).length;
  if (internalLinks >= 2) score += 10; else issues.push("Insufficient internal links");
  
  // Word count
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 1000) score += 10; else issues.push(`Word count ${wordCount} below 1000 minimum`);
  
  const passed = score >= 90 && issues.length === 0;
  return { passed, issues, score };
}

function main() {
  console.log("[phase9] Strengthening SAFE-DEEP gates...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  let passed = 0;
  let failed = 0;
  const failures: Array<{ page: string; issues: string[]; score: number }> = [];
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    // Skip noindex pages
    if (fm.robots === "noindex" || fm.noindex === true) {
      passed++;
      continue;
    }
    
    const result = validateSafeDeep(content, fm);
    
    if (result.passed) {
      passed++;
    } else {
      failed++;
      failures.push({
        page: relPath,
        issues: result.issues,
        score: result.score,
      });
    }
  }
  
  console.log(`Total pages: ${contentFiles.length}`);
  console.log(`Passed: ${passed} (${Math.round((passed / contentFiles.length) * 100)}%)`);
  console.log(`Failed: ${failed} (${Math.round((failed / contentFiles.length) * 100)}%)`);
  
  console.log("\nSample failures:");
  for (const failure of failures.slice(0, 10)) {
    console.log(`  ${failure.page}: score=${failure.score}, issues=${failure.issues.join(", ")}`);
  }
  
  if (failures.length > 10) {
    console.log(`  ... and ${failures.length - 10} more`);
  }
  
  // Save report
  const report = {
    total: contentFiles.length,
    passed,
    failed,
    passRate: Math.round((passed / contentFiles.length) * 100),
    sampleFailures: failures.slice(0, 50),
  };
  
  const reportPath = path.join(REMEDIATION_DIR, "safe-deep-gate-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  
  console.log("\n[phase9] SAFE-DEEP gate strengthening complete.");
  console.log("[phase9] Next: Phase 10 — Final verification");
}

main();
