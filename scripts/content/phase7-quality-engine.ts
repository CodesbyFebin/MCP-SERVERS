#!/usr/bin/env node
/**
 * Phase 7 — Quality Engine
 * Scores pages across multiple dimensions. Rejects < 90.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");

interface QualityScore {
  accuracy: number;
  uniqueness: number;
  coverage: number;
  readability: number;
  entityUsage: number;
  schema: number;
  seo: number;
  internalLinks: number;
  freshness: number;
  examples: number;
  technicalDepth: number;
  references: number;
  overall: number;
}

interface QualityReport {
  total: number;
  passed: number;
  failed: number;
  rejected: Array<{ page: string; score: number; reasons: string[] }>;
  averageScores: QualityScore;
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

function scoreAccuracy(body: string, fm: Record<string, any>): number {
  let score = 50;
  if (/```[\s\S]*?```/.test(body)) score += 20;
  if (/\[([^\]]+)\]\(https?:\/\//.test(body)) score += 15;
  if (/\d+%|\$\d+|\d+ (users|companies|teams)/i.test(body)) score += 15;
  return Math.min(100, score);
}

function scoreUniqueness(body: string, fm: Record<string, any>): number {
  let score = 50;
  const uniquePhrases = new Set(body.match(/[^.!?]+[.!?]/g) || []).size;
  if (uniquePhrases > 20) score += 30;
  if (uniquePhrases > 10) score += 20;
  return Math.min(100, score);
}

function scoreCoverage(body: string, fm: Record<string, any>): number {
  let score = 0;
  const headings = (body.match(/^#{1,3}\s/mg) || []).length;
  if (headings >= 8) score += 40;
  else if (headings >= 5) score += 30;
  else if (headings >= 3) score += 20;
  
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  if (wordCount > 2000) score += 40;
  else if (wordCount > 1000) score += 30;
  else if (wordCount > 500) score += 20;
  
  return Math.min(100, score);
}

function scoreReadability(body: string): number {
  const sentences = (body.match(/[^.!?]+[.!?]/g) || []).length;
  const words = body.split(/\s+/).filter(Boolean).length;
  
  if (sentences === 0) return 50;
  
  const avgSentenceLength = words / sentences;
  let score = 70;
  
  if (avgSentenceLength > 30) score -= 20;
  if (avgSentenceLength > 50) score -= 20;
  if (avgSentenceLength < 5) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

function scoreEntityUsage(body: string, fm: Record<string, any>): number {
  let score = 50;
  const entityMentions = (body.match(/\b(MCP|MCP Server|MCP Client|MCP SDK|Model Context Protocol)\b/g) || []).length;
  if (entityMentions >= 5) score += 30;
  if (entityMentions >= 10) score += 20;
  return Math.min(100, score);
}

function scoreSchema(fm: Record<string, any>): number {
  let score = 0;
  if (fm.schemaType || fm.schema) score += 50;
  if (fm.title) score += 20;
  if (fm.description) score += 20;
  if (fm.keywords) score += 10;
  return Math.min(100, score);
}

function scoreSEO(fm: Record<string, any>, body: string): number {
  let score = 0;
  if (fm.title) score += 25;
  if (fm.description) score += 25;
  if (fm.canonical || fm.canonicalUrl) score += 20;
  if (fm.keywords) score += 15;
  if (/^#\s/.test(body)) score += 15;
  return Math.min(100, score);
}

function scoreInternalLinks(body: string): number {
  const links = (body.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length;
  if (links >= 10) return 100;
  if (links >= 5) return 80;
  if (links >= 2) return 60;
  if (links >= 1) return 40;
  return 0;
}

function scoreFreshness(fm: Record<string, any>): number {
  const dateStr = fm.publishedAt || fm.date || fm.updatedAt;
  if (!dateStr) return 30;
  
  const date = new Date(dateStr);
  const now = new Date();
  const daysOld = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysOld < 30) return 100;
  if (daysOld < 90) return 80;
  if (daysOld < 180) return 60;
  if (daysOld < 365) return 40;
  return 20;
}

function scoreExamples(body: string): number {
  let score = 0;
  const codeBlocks = (body.match(/```[\s\S]*?```/g) || []).length;
  if (codeBlocks >= 3) score += 50;
  else if (codeBlocks >= 1) score += 30;
  
  if (/example|demo|sample|illustration/i.test(body)) score += 30;
  if (/step-by-step|walkthrough|tutorial/i.test(body)) score += 20;
  
  return Math.min(100, score);
}

function scoreTechnicalDepth(body: string): number {
  let score = 30;
  
  const technicalTerms = (body.match(/\b(API|SDK|CLI|HTTP|REST|GraphQL|gRPC|JSON|YAML|Docker|Kubernetes|Terraform|CI\/CD|OAuth|JWT|SSL|TLS)\b/g) || []).length;
  if (technicalTerms >= 10) score += 40;
  else if (technicalTerms >= 5) score += 30;
  else if (technicalTerms >= 2) score += 20;
  
  if (/architecture|design pattern|best practice|anti-pattern/i.test(body)) score += 20;
  if (/performance|optimization|scalability|reliability/i.test(body)) score += 10;
  
  return Math.min(100, score);
}

function scoreReferences(body: string, fm: Record<string, any>): number {
  let score = 0;
  const links = (body.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length;
  if (links >= 10) score += 50;
  else if (links >= 5) score += 40;
  else if (links >= 2) score += 30;
  else if (links >= 1) score += 20;
  
  const externalLinks = (body.match(/\[([^\]]+)\]\(https?:\/\//g) || []).length;
  if (externalLinks >= 3) score += 30;
  else if (externalLinks >= 1) score += 20;
  
  return Math.min(100, score);
}

function calculateQuality(body: string, fm: Record<string, any>): QualityScore {
  return {
    accuracy: scoreAccuracy(body, fm),
    uniqueness: scoreUniqueness(body, fm),
    coverage: scoreCoverage(body, fm),
    readability: scoreReadability(body),
    entityUsage: scoreEntityUsage(body, fm),
    schema: scoreSchema(fm),
    seo: scoreSEO(fm, body),
    internalLinks: scoreInternalLinks(body),
    freshness: scoreFreshness(fm),
    examples: scoreExamples(body),
    technicalDepth: scoreTechnicalDepth(body),
    references: scoreReferences(body, fm),
    overall: 0,
  };
}

function calculateOverall(scores: QualityScore): number {
  return Math.round(
    (scores.accuracy + scores.uniqueness + scores.coverage + scores.readability +
     scores.entityUsage + scores.schema + scores.seo + scores.internalLinks +
     scores.freshness + scores.examples + scores.technicalDepth + scores.references) / 12
  );
}

function runQualityEngine(): QualityReport {
  console.log("[phase7] Running quality engine...");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const report: QualityReport = {
    total: contentFiles.length,
    passed: 0,
    failed: 0,
    rejected: [],
    averageScores: {
      accuracy: 0,
      uniqueness: 0,
      coverage: 0,
      readability: 0,
      entityUsage: 0,
      schema: 0,
      seo: 0,
      internalLinks: 0,
      freshness: 0,
      examples: 0,
      technicalDepth: 0,
      references: 0,
      overall: 0,
    },
  };
  
  const scoreSum: QualityScore = {
    accuracy: 0,
    uniqueness: 0,
    coverage: 0,
    readability: 0,
    entityUsage: 0,
    schema: 0,
    seo: 0,
    internalLinks: 0,
    freshness: 0,
    examples: 0,
    technicalDepth: 0,
    references: 0,
    overall: 0,
  };
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    const scores = calculateQuality(body, fm);
    scores.overall = calculateOverall(scores);
    
    scoreSum.accuracy += scores.accuracy;
    scoreSum.uniqueness += scores.uniqueness;
    scoreSum.coverage += scores.coverage;
    scoreSum.readability += scores.readability;
    scoreSum.entityUsage += scores.entityUsage;
    scoreSum.schema += scores.schema;
    scoreSum.seo += scores.seo;
    scoreSum.internalLinks += scores.internalLinks;
    scoreSum.freshness += scores.freshness;
    scoreSum.examples += scores.examples;
    scoreSum.technicalDepth += scores.technicalDepth;
    scoreSum.references += scores.references;
    scoreSum.overall += scores.overall;
    
    const reasons: string[] = [];
    if (scores.accuracy < 80) reasons.push("Low accuracy");
    if (scores.uniqueness < 80) reasons.push("Low uniqueness");
    if (scores.coverage < 80) reasons.push("Insufficient coverage");
    if (scores.readability < 70) reasons.push("Poor readability");
    if (scores.entityUsage < 70) reasons.push("Weak entity usage");
    if (scores.schema < 80) reasons.push("Missing schema");
    if (scores.seo < 80) reasons.push("Poor SEO");
    if (scores.internalLinks < 50) reasons.push("Insufficient internal links");
    if (scores.freshness < 50) reasons.push("Stale content");
    if (scores.examples < 70) reasons.push("Missing examples");
    if (scores.technicalDepth < 70) reasons.push("Insufficient technical depth");
    if (scores.references < 50) reasons.push("Missing references");
    
    if (scores.overall >= 90 && reasons.length === 0) {
      report.passed++;
    } else {
      report.failed++;
      report.rejected.push({
        page: relPath,
        score: scores.overall,
        reasons: reasons.length > 0 ? reasons : [`Score ${scores.overall} below 90`],
      });
    }
  }
  
  const total = report.total || 1;
  report.averageScores = {
    accuracy: Math.round(scoreSum.accuracy / total),
    uniqueness: Math.round(scoreSum.uniqueness / total),
    coverage: Math.round(scoreSum.coverage / total),
    readability: Math.round(scoreSum.readability / total),
    entityUsage: Math.round(scoreSum.entityUsage / total),
    schema: Math.round(scoreSum.schema / total),
    seo: Math.round(scoreSum.seo / total),
    internalLinks: Math.round(scoreSum.internalLinks / total),
    freshness: Math.round(scoreSum.freshness / total),
    examples: Math.round(scoreSum.examples / total),
    technicalDepth: Math.round(scoreSum.technicalDepth / total),
    references: Math.round(scoreSum.references / total),
    overall: Math.round(scoreSum.overall / total),
  };
  
  return report;
}

function printReport(report: QualityReport) {
  console.log("\n=== Phase 7: Quality Engine Report ===\n");
  console.log(`Total pages: ${report.total}`);
  console.log(`Passed: ${report.passed} (${Math.round((report.passed / report.total) * 100)}%)`);
  console.log(`Failed: ${report.failed} (${Math.round((report.failed / report.total) * 100)}%)`);
  
  console.log("\nAverage Scores:");
  console.log(`  Accuracy: ${report.averageScores.accuracy}`);
  console.log(`  Uniqueness: ${report.averageScores.uniqueness}`);
  console.log(`  Coverage: ${report.averageScores.coverage}`);
  console.log(`  Readability: ${report.averageScores.readability}`);
  console.log(`  Entity Usage: ${report.averageScores.entityUsage}`);
  console.log(`  Schema: ${report.averageScores.schema}`);
  console.log(`  SEO: ${report.averageScores.seo}`);
  console.log(`  Internal Links: ${report.averageScores.internalLinks}`);
  console.log(`  Freshness: ${report.averageScores.freshness}`);
  console.log(`  Examples: ${report.averageScores.examples}`);
  console.log(`  Technical Depth: ${report.averageScores.technicalDepth}`);
  console.log(`  References: ${report.averageScores.references}`);
  console.log(`\nOverall Quality: ${report.averageScores.overall}`);
  
  console.log("\nSample failures:");
  for (const failure of report.rejected.slice(0, 10)) {
    console.log(`  ${failure.page}: score=${failure.score}, reasons=${failure.reasons.join(", ")}`);
  }
  
  if (report.rejected.length > 10) {
    console.log(`  ... and ${report.rejected.length - 10} more`);
  }
  
  const outputPath = path.join(ROOT, "QUALITY_REPORT.json");
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved to: ${outputPath}`);
}

const report = runQualityEngine();
printReport(report);
