#!/usr/bin/env node
/**
 * Phase 6 — SAFE-DEEP Content Engine
 * Evidence, Claims, Blueprint, Draft, Validation, Publication, Reject pages that fail.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");

interface SafeDeepReport {
  total: number;
  passed: number;
  failed: number;
  rejected: Array<{ page: string; reason: string }>;
  scores: {
    evidence: number;
    claims: number;
    blueprint: number;
    draft: number;
    validation: number;
    publication: number;
  };
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

function evaluateEvidence(body: string, fm: Record<string, any>): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;
  
  const hasCodeExamples = /```[\s\S]*?```/.test(body);
  const hasExternalLinks = /\[([^\]]+)\]\(https?:\/\//.test(body);
  const hasCaseStudies = /case study|case-study|real-world|example/i.test(body);
  const hasReferences = /\[([^\]]+)\]\([^)]+\)/.test(body);
  const hasDataPoints = /\d+%|\$\d+|\d+ (users|companies|organizations|teams)/i.test(body);
  
  if (hasCodeExamples) score += 25;
  else issues.push("Missing code examples");
  
  if (hasExternalLinks) score += 25;
  else issues.push("Missing external references");
  
  if (hasCaseStudies) score += 25;
  else issues.push("Missing case studies or real-world examples");
  
  if (hasReferences) score += 15;
  else issues.push("Missing references");
  
  if (hasDataPoints) score += 10;
  else issues.push("Missing quantitative data");
  
  return { score: Math.min(100, score), issues };
}

function evaluateClaims(body: string, fm: Record<string, any>): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;
  
  const hasQuantifiedClaims = /\d+%|\$\d+|\d+ (percent|users|companies|teams|hours|days|weeks|months)/i.test(body);
  const hasCaveats = /depends on|varies|may|might|could|typically|usually|often/i.test(body);
  const hasSources = /according to|based on|study|research|report/i.test(body);
  const hasDates = /\d{4}|\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(body);
  
  if (hasQuantifiedClaims) score += 30;
  else issues.push("Claims not quantified");
  
  if (hasCaveats) score += 25;
  else issues.push("Missing caveats or conditions");
  
  if (hasSources) score += 25;
  else issues.push("Claims not backed by sources");
  
  if (hasDates) score += 20;
  else issues.push("Missing temporal context");
  
  return { score: Math.min(100, score), issues };
}

function evaluateBlueprint(body: string, fm: Record<string, any>): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;
  
  const hasOverview = /## Overview/i.test(body);
  const hasPrerequisites = /## Prerequisites|## Requirements/i.test(body);
  const hasSteps = /\d+\.\s+\*\*/i.test(body);
  const hasExamples = /## Example|## Examples/i.test(body);
  const hasOutcomes = /## Outcome|## Result|## Expected/i.test(body);
  
  if (hasOverview) score += 20;
  else issues.push("Missing overview");
  
  if (hasPrerequisites) score += 20;
  else issues.push("Missing prerequisites");
  
  if (hasSteps) score += 20;
  else issues.push("Missing step-by-step instructions");
  
  if (hasExamples) score += 20;
  else issues.push("Missing examples");
  
  if (hasOutcomes) score += 20;
  else issues.push("Missing expected outcomes");
  
  return { score: Math.min(100, score), issues };
}

function evaluateDraft(body: string, fm: Record<string, any>): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;
  
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const hasIntro = body.length > 200;
  const hasConclusion = /## Conclusion|## Summary|## Next Steps/i.test(body);
  const hasHeadings = (body.match(/^#{1,3}\s/mg) || []).length >= 3;
  const hasLists = /^[-*]\s/m.test(body) || /^\d+\.\s/m.test(body);
  
  if (wordCount >= 2000) score += 30;
  else if (wordCount >= 1000) score += 20;
  else issues.push(`Word count ${wordCount} below 2000 minimum`);
  
  if (hasIntro) score += 20;
  else issues.push("Missing introduction");
  
  if (hasConclusion) score += 20;
  else issues.push("Missing conclusion");
  
  if (hasHeadings) score += 15;
  else issues.push("Insufficient headings");
  
  if (hasLists) score += 15;
  else issues.push("Missing lists");
  
  return { score: Math.min(100, score), issues };
}

function evaluateValidation(body: string, fm: Record<string, any>): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;
  
  const hasTitle = !!fm.title;
  const hasDescription = !!fm.description;
  const hasKeywords = !!fm.keywords;
  const hasSchema = !!fm.schemaType || !!fm.schema;
  const hasCanonical = !!fm.canonical || !!fm.canonicalUrl;
  
  if (hasTitle) score += 20;
  else issues.push("Missing title");
  
  if (hasDescription) score += 20;
  else issues.push("Missing description");
  
  if (hasKeywords) score += 20;
  else issues.push("Missing keywords");
  
  if (hasSchema) score += 20;
  else issues.push("Missing schema");
  
  if (hasCanonical) score += 20;
  else issues.push("Missing canonical");
  
  return { score: Math.min(100, score), issues };
}

function evaluatePublication(body: string, fm: Record<string, any>): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;
  
  const hasAuthor = !!fm.author;
  const hasDate = !!fm.publishedAt || !!fm.date;
  const hasCategory = !!fm.category;
  const hasTags = !!fm.tags || !!fm.keywords;
  const hasStatus = fm.status === "published" || !fm.status;
  
  if (hasAuthor) score += 25;
  else issues.push("Missing author");
  
  if (hasDate) score += 25;
  else issues.push("Missing publication date");
  
  if (hasCategory) score += 20;
  else issues.push("Missing category");
  
  if (hasTags) score += 15;
  else issues.push("Missing tags");
  
  if (hasStatus) score += 15;
  else issues.push("Missing publication status");
  
  return { score: Math.min(100, score), issues };
}

function runSafeDeep(): SafeDeepReport {
  console.log("[phase6] Running SAFE-DEEP validation...");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const report: SafeDeepReport = {
    total: contentFiles.length,
    passed: 0,
    failed: 0,
    rejected: [],
    scores: {
      evidence: 0,
      claims: 0,
      blueprint: 0,
      draft: 0,
      validation: 0,
      publication: 0,
    },
  };
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    const evidence = evaluateEvidence(body, fm);
    const claims = evaluateClaims(body, fm);
    const blueprint = evaluateBlueprint(body, fm);
    const draft = evaluateDraft(body, fm);
    const validation = evaluateValidation(body, fm);
    const publication = evaluatePublication(body, fm);
    
    const allIssues = [
      ...evidence.issues,
      ...claims.issues,
      ...blueprint.issues,
      ...draft.issues,
      ...validation.issues,
      ...publication.issues,
    ];
    
    report.scores.evidence += evidence.score;
    report.scores.claims += claims.score;
    report.scores.blueprint += blueprint.score;
    report.scores.draft += draft.score;
    report.scores.validation += validation.score;
    report.scores.publication += publication.score;
    
    if (allIssues.length === 0) {
      report.passed++;
    } else {
      report.failed++;
      report.rejected.push({
        page: relPath,
        reason: allIssues[0],
      });
    }
  }
  
  // Average scores
  const total = report.total || 1;
  report.scores.evidence = Math.round(report.scores.evidence / total);
  report.scores.claims = Math.round(report.scores.claims / total);
  report.scores.blueprint = Math.round(report.scores.blueprint / total);
  report.scores.draft = Math.round(report.scores.draft / total);
  report.scores.validation = Math.round(report.scores.validation / total);
  report.scores.publication = Math.round(report.scores.publication / total);
  
  return report;
}

function printReport(report: SafeDeepReport) {
  console.log("\n=== Phase 6: SAFE-DEEP Validation Report ===\n");
  console.log(`Total pages: ${report.total}`);
  console.log(`Passed: ${report.passed} (${Math.round((report.passed / report.total) * 100)}%)`);
  console.log(`Failed: ${report.failed} (${Math.round((report.failed / report.total) * 100)}%)`);
  
  console.log("\nScores:");
  console.log(`  Evidence: ${report.scores.evidence}%`);
  console.log(`  Claims: ${report.scores.claims}%`);
  console.log(`  Blueprint: ${report.scores.blueprint}%`);
  console.log(`  Draft: ${report.scores.draft}%`);
  console.log(`  Validation: ${report.scores.validation}%`);
  console.log(`  Publication: ${report.scores.publication}%`);
  
  const overall = Math.round(
    (report.scores.evidence + report.scores.claims + report.scores.blueprint + 
     report.scores.draft + report.scores.validation + report.scores.publication) / 6
  );
  console.log(`\nOverall SAFE-DEEP score: ${overall}%`);
  
  console.log("\nSample rejections:");
  for (const rejection of report.rejected.slice(0, 10)) {
    console.log(`  ${rejection.page}: ${rejection.reason}`);
  }
  
  if (report.rejected.length > 10) {
    console.log(`  ... and ${report.rejected.length - 10} more`);
  }
  
  const outputPath = path.join(ROOT, "SAFE_DEEP_REPORT.json");
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved to: ${outputPath}`);
}

const report = runSafeDeep();
printReport(report);
