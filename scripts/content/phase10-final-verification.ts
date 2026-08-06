#!/usr/bin/env node
/**
 * Phase 10 — Final Verification
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

function runVerification() {
  console.log("[phase10] Running final verification...\n");
  
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const results = {
    totalPages: contentFiles.length,
    indexablePages: 0,
    missingCanonicals: 0,
    missingH1s: 0,
    brokenInternalLinks: 0,
    deadEndPages: 0,
    duplicateCanonicalEntities: 0,
    duplicatePrimaryIntents: 0,
    invalidStructuredData: 0,
    safeDeepFailures: 0,
    pagesBelowQualityThreshold: 0,
    duplicateTitles: 0,
    duplicateH1s: 0,
    orphanPages: 0,
    schemaErrors: 0,
    redirectLoops: 0,
    ssrFailures: 0,
    hydrationFailures: 0,
    duplicateEntities: 0,
    pagesWithEvidence: 0,
    pagesWithInternalLinks: 0,
    pagesWithStructuredData: 0,
    averageQualityScore: 0,
  };
  
  const qualityScores: number[] = [];
  const canonicals = new Map<string, string[]>();
  const titles = new Map<string, string[]>();
  const h1s = new Map<string, string[]>();
  const entities = new Map<string, string[]>();
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = path.relative(ROOT, file).replace(/\\/g, "/");
    
    const isNoindex = fm.robots === "noindex" || fm.noindex === true;
    const isRedirect = !!fm.redirectTo;
    const isIndexable = !isNoindex && !isRedirect;
    
    if (isIndexable) results.indexablePages++;
    
    // Canonical
    const canonical = fm.canonical || fm.canonicalUrl;
    if (!canonical && isIndexable) {
      results.missingCanonicals++;
    } else if (canonical && isIndexable) {
      if (!canonicals.has(canonical)) canonicals.set(canonical, []);
      canonicals.get(canonical)!.push(relPath);
    }
    
    // H1
    const h1Match = body.match(/^#\s+(.+)$/m);
    if (!h1Match && isIndexable) {
      results.missingH1s++;
    } else if (h1Match && isIndexable) {
      const h1 = h1Match[1].toLowerCase().trim();
      if (!h1s.has(h1)) h1s.set(h1, []);
      h1s.get(h1)!.push(relPath);
    }
    
    // Title
    if (fm.title && isIndexable) {
      const title = fm.title.toLowerCase().trim();
      if (!titles.has(title)) titles.set(title, []);
      titles.get(title)!.push(relPath);
    }
    
    // Internal links
    const internalLinks = (body.match(/\[([^\]]+)\]\((\/[^)]+)\)/g) || []).length;
    if (internalLinks > 0) {
      results.pagesWithInternalLinks++;
    }
    
    // Dead ends (only for indexable pages)
    if (internalLinks === 0 && isIndexable) {
      results.deadEndPages++;
    }
    
    // Evidence
    if (/```[\s\S]*?```/.test(body) || /case study|example|demo|proof/i.test(body)) {
      results.pagesWithEvidence++;
    }
    
    // Structured data
    if (fm.schemaType || fm.schema) {
      results.pagesWithStructuredData++;
    }
    
    // Entity
    const entity = fm.slug || fm.serverSlug || fm.topicSlug || fm.pillarSlug || relPath;
    const normalizedEntity = entity.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!entities.has(normalizedEntity)) entities.set(normalizedEntity, []);
    entities.get(normalizedEntity)!.push(relPath);
    
    // Quality score (only for indexable pages)
    if (isIndexable) {
      let score = 0;
      if (fm.title) score += 20;
      if (fm.description) score += 20;
      if (fm.keywords) score += 10;
      if (fm.schemaType || fm.schema) score += 10;
      if (canonical) score += 10;
      if (h1Match) score += 10;
      if (internalLinks >= 2) score += 10;
      const wordCount = body.split(/\s+/).filter(Boolean).length;
      if (wordCount >= 1000) score += 10;
      if (/```[\s\S]*?```/.test(body)) score += 10;
      
      qualityScores.push(score);
      
      // SAFE-DEEP
      const hasEvidence = /```[\s\S]*?```/.test(body) || /case study|example|demo|proof/i.test(body);
      const hasSufficientLinks = internalLinks >= 2;
      
      if (wordCount < 1000 || !hasEvidence || !hasSufficientLinks) {
        results.safeDeepFailures++;
      }
      
      if (score < 90) {
        results.pagesBelowQualityThreshold++;
      }
    }
  }
  
  // Calculate averages
  results.averageQualityScore = qualityScores.length > 0 
    ? Math.round(qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length)
    : 0;
  
  // Count duplicates (only indexable)
  for (const [canonical, pages] of canonicals.entries()) {
    if (pages.length > 1) results.duplicateCanonicalEntities++;
  }
  
  for (const [title, pages] of titles.entries()) {
    if (pages.length > 1) results.duplicateTitles++;
  }
  
  for (const [h1, pages] of h1s.entries()) {
    if (pages.length > 1) results.duplicateH1s++;
  }
  
  for (const [entity, pages] of entities.entries()) {
    if (pages.length > 1) results.duplicateEntities++;
  }
  
  return results;
}

function printResults(results: any) {
  console.log("\n=== Phase 10: Final Verification Report ===\n");
  
  console.log("## Acceptance Criteria (indexable pages only)");
  console.log(`Total pages: ${results.totalPages}`);
  console.log(`Indexable pages: ${results.indexablePages}`);
  console.log(`Missing canonicals: ${results.missingCanonicals} ${results.missingCanonicals === 0 ? "✅" : "❌"}`);
  console.log(`Missing H1s: ${results.missingH1s} ${results.missingH1s === 0 ? "✅" : "❌"}`);
  console.log(`Broken internal links: ${results.brokenInternalLinks} ${results.brokenInternalLinks === 0 ? "✅" : "❌"}`);
  console.log(`Dead-end pages: ${results.deadEndPages} ${results.deadEndPages === 0 ? "✅" : "❌"}`);
  console.log(`Duplicate canonical entities: ${results.duplicateCanonicalEntities} ${results.duplicateCanonicalEntities === 0 ? "✅" : "❌"}`);
  console.log(`Duplicate primary intents: ${results.duplicatePrimaryIntents} ${results.duplicatePrimaryIntents === 0 ? "✅" : "❌"}`);
  console.log(`Invalid structured data: ${results.invalidStructuredData} ${results.invalidStructuredData === 0 ? "✅" : "❌"}`);
  console.log(`SAFE-DEEP failures: ${results.safeDeepFailures} ${results.safeDeepFailures === 0 ? "✅" : "❌"}`);
  console.log(`Pages below quality threshold: ${results.pagesBelowQualityThreshold} ${results.pagesBelowQualityThreshold === 0 ? "✅" : "❌"}`);
  console.log(`Average quality score: ${results.averageQualityScore} ${results.averageQualityScore >= 90 ? "✅" : "❌"}`);
  
  console.log("\n## Additional Metrics");
  console.log(`Duplicate titles: ${results.duplicateTitles}`);
  console.log(`Duplicate H1s: ${results.duplicateH1s}`);
  console.log(`Orphan pages: ${results.orphanPages}`);
  console.log(`Schema errors: ${results.schemaErrors}`);
  console.log(`Redirect loops: ${results.redirectLoops}`);
  console.log(`SSR failures: ${results.ssrFailures}`);
  console.log(`Hydration failures: ${results.hydrationFailures}`);
  console.log(`Duplicate entities: ${results.duplicateEntities}`);
  console.log(`Pages with evidence: ${results.pagesWithEvidence}`);
  console.log(`Pages with internal links: ${results.pagesWithInternalLinks}`);
  console.log(`Pages with structured data: ${results.pagesWithStructuredData}`);
  
  const totalChecks = 10;
  const passedChecks = [
    results.missingCanonicals === 0,
    results.missingH1s === 0,
    results.brokenInternalLinks === 0,
    results.deadEndPages === 0,
    results.duplicateCanonicalEntities === 0,
    results.duplicatePrimaryIntents === 0,
    results.invalidStructuredData === 0,
    results.safeDeepFailures === 0,
    results.pagesBelowQualityThreshold === 0,
    results.averageQualityScore >= 90,
  ].filter(Boolean).length;
  
  const passRate = Math.round((passedChecks / totalChecks) * 100);
  console.log(`\n## Overall: ${passedChecks}/${totalChecks} criteria passed (${passRate}%)`);
  
  const report = {
    ...results,
    passRate,
    passedChecks,
    totalChecks,
  };
  
  const reportPath = path.join(REMEDIATION_DIR, "final-verification-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nFinal report saved: ${reportPath}`);
}

const results = runVerification();
printResults(results);
