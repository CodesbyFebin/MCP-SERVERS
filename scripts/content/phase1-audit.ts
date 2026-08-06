#!/usr/bin/env node
/**
 * Phase 1 — Full Project Audit
 * Scans routes, SEO, content duplication, internal links, and search intent.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");
const APP_DIR = path.join(ROOT, "app");
const SRC_DIR = path.join(ROOT, "src");

interface AuditReport {
  routes: {
    total: number;
    duplicates: string[];
    orphans: string[];
    missing: string[];
    redirectLoops: string[];
    shadowRoutes: string[];
    ssrFailures: string[];
  };
  seo: {
    total: number;
    missingTitle: string[];
    missingH1: string[];
    missingDescription: string[];
    missingCanonical: string[];
    missingOpenGraph: string[];
    missingTwitter: string[];
    missingRobots: string[];
    missingJsonLd: string[];
    missingBreadcrumbs: string[];
    missingFaq: string[];
    missingItemList: string[];
    missingCollectionPage: string[];
    missingSoftwareApplication: string[];
    missingOrganization: string[];
    missingWebSite: string[];
  };
  content: {
    total: number;
    duplicateIntros: string[];
    duplicateParagraphs: string[];
    duplicateFaqs: string[];
    duplicateHeadings: string[];
    duplicateEntities: string[];
    duplicateKeywords: string[];
    duplicateCanonicals: string[];
    duplicateSlugs: string[];
    duplicateSchemas: string[];
  };
  internalLinks: {
    total: number;
    orphans: string[];
    deadEnds: string[];
    brokenLinks: string[];
    weakHubs: string[];
    missingHubLinks: string[];
  };
  searchIntent: {
    total: number;
    ambiguous: string[];
    competing: string[];
    missingIntent: string[];
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

function getRelativePath(filePath: string): string {
  return path.relative(ROOT, filePath).replace(/\\/g, "/");
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

function auditRoutes(): AuditReport["routes"] {
  const result: AuditReport["routes"] = {
    total: 0,
    duplicates: [],
    orphans: [],
    missing: [],
    redirectLoops: [],
    shadowRoutes: [],
    ssrFailures: [],
  };

  // Scan app directory for routes
  const appRoutes: string[] = [];
  
  function walkAppDir(dir: string, basePath: string = "") {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const newBase = basePath ? `${basePath}/${entry}` : entry;
        if (entry === "api" || entry.startsWith("(")) {
          continue;
        }
        walkAppDir(fullPath, newBase);
      } else if (entry === "page.tsx" || entry === "page.ts") {
        const routePath = basePath ? `/${basePath}` : "/";
        appRoutes.push(routePath);
        result.total++;
      }
    }
  }
  
  walkAppDir(APP_DIR);
  
  // Check for duplicates
  const routeCounts = new Map<string, number>();
  for (const route of appRoutes) {
    routeCounts.set(route, (routeCounts.get(route) || 0) + 1);
  }
  
  for (const [route, count] of routeCounts.entries()) {
    if (count > 1) {
      result.duplicates.push(route);
    }
  }
  
  // Check for orphan routes (routes without content)
  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const contentSlugs = contentFiles.map(f => {
    const rel = getRelativePath(f);
    return rel.replace(/^content\//, "").replace(/\.md$/, "").replace(/\//g, "/");
  });
  
  for (const route of appRoutes) {
    const slug = route.replace(/^\//, "").replace(/\/$/, "");
    if (slug && !contentSlugs.includes(slug)) {
      result.orphans.push(route);
    }
  }
  
  return result;
}

function auditSEO(): AuditReport["seo"] {
  const result: AuditReport["seo"] = {
    total: 0,
    missingTitle: [],
    missingH1: [],
    missingDescription: [],
    missingCanonical: [],
    missingOpenGraph: [],
    missingTwitter: [],
    missingRobots: [],
    missingJsonLd: [],
    missingBreadcrumbs: [],
    missingFaq: [],
    missingItemList: [],
    missingCollectionPage: [],
    missingSoftwareApplication: [],
    missingOrganization: [],
    missingWebSite: [],
  };

  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  result.total = contentFiles.length;
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = getRelativePath(file);
    
    if (!fm.title) result.missingTitle.push(relPath);
    if (!/^#\s/.test(body)) result.missingH1.push(relPath);
    if (!fm.description) result.missingDescription.push(relPath);
    if (!fm.canonical && !fm.canonicalUrl) result.missingCanonical.push(relPath);
    if (!fm.openGraph && !fm.og) result.missingOpenGraph.push(relPath);
    if (!fm.twitter) result.missingTwitter.push(relPath);
    if (!fm.robots) result.missingRobots.push(relPath);
    if (!/schemaType|jsonLd|structuredData|schema/.test(frontmatter)) result.missingJsonLd.push(relPath);
    if (!/breadcrumb|Breadcrumb/i.test(body) && !/breadcrumb/i.test(frontmatter)) result.missingBreadcrumbs.push(relPath);
    if (!/FAQ|Frequently Asked Questions/i.test(body)) result.missingFaq.push(relPath);
    if (!/ItemList|itemlist/i.test(frontmatter) && !/ItemList/i.test(body)) result.missingItemList.push(relPath);
    if (!/CollectionPage|collectionpage/i.test(frontmatter) && !/CollectionPage/i.test(body)) result.missingCollectionPage.push(relPath);
    if (!/SoftwareApplication|softwareapplication/i.test(frontmatter) && !/SoftwareApplication/i.test(body)) result.missingSoftwareApplication.push(relPath);
    if (!/Organization|organization/i.test(frontmatter) && !/Organization/i.test(body)) result.missingOrganization.push(relPath);
    if (!/WebSite|website/i.test(frontmatter) && !/WebSite/i.test(body)) result.missingWebSite.push(relPath);
  }
  
  return result;
}

function auditContent(): AuditReport["content"] {
  const result: AuditReport["content"] = {
    total: 0,
    duplicateIntros: [],
    duplicateParagraphs: [],
    duplicateFaqs: [],
    duplicateHeadings: [],
    duplicateEntities: [],
    duplicateKeywords: [],
    duplicateCanonicals: [],
    duplicateSlugs: [],
    duplicateSchemas: [],
  };

  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  result.total = contentFiles.length;
  
  const intros = new Map<string, string[]>();
  const paragraphs = new Map<string, string[]>();
  const headings = new Map<string, string[]>();
  const canonicals = new Map<string, string[]>();
  const slugs = new Map<string, string[]>();
  const schemas = new Map<string, string[]>();
  const entities = new Map<string, string[]>();
  const keywords = new Map<string, string[]>();
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = getRelativePath(file);
    
    // Check intros
    const introMatch = body.match(/^#\s.+?\n\n([\s\S]{100,500}?)(\n##|\n---)/);
    if (introMatch) {
      const intro = introMatch[1].trim().substring(0, 200);
      if (!intros.has(intro)) intros.set(intro, []);
      intros.get(intro)!.push(relPath);
    }
    
    // Check paragraphs
    const paraMatches = body.matchAll(/^[^\n#][^\n]{100,300}(?:\n[^\n#][^\n]{50,200}){2,}/gm);
    for (const match of paraMatches) {
      const para = match[0].trim().substring(0, 200);
      if (!paragraphs.has(para)) paragraphs.set(para, []);
      paragraphs.get(para)!.push(relPath);
    }
    
    // Check headings
    const headingMatches = body.matchAll(/^#{1,3}\s.+$/gm);
    for (const match of headingMatches) {
      const heading = match[0].trim();
      if (!headings.has(heading)) headings.set(heading, []);
      headings.get(heading)!.push(relPath);
    }
    
    // Check canonicals
    const canonical = fm.canonical || fm.canonicalUrl;
    if (canonical) {
      if (!canonicals.has(canonical)) canonicals.set(canonical, []);
      canonicals.get(canonical)!.push(relPath);
    }
    
    // Check slugs
    const slug = fm.slug || relPath.replace(/^content\//, "").replace(/\.md$/, "");
    if (!slugs.has(slug)) slugs.set(slug, []);
    slugs.get(slug)!.push(relPath);
    
    // Check schemas
    const schemaType = fm.schemaType || fm.schema;
    if (schemaType) {
      if (!schemas.has(schemaType)) schemas.set(schemaType, []);
      schemas.get(schemaType)!.push(relPath);
    }
    
    // Check entities
    const entity = fm.entity || fm.entitySlug || fm.serverSlug || fm.topicSlug || fm.pillarSlug || fm.comparisonSlug;
    if (entity) {
      if (!entities.has(entity)) entities.set(entity, []);
      entities.get(entity)!.push(relPath);
    }
    
    // Check keywords
    const keywordsList = Array.isArray(fm.keywords) ? fm.keywords : (typeof fm.keywords === "string" ? [fm.keywords] : []);
    for (const keyword of keywordsList) {
      if (!keywords.has(keyword)) keywords.set(keyword, []);
      keywords.get(keyword)!.push(relPath);
    }
  }
  
  // Find duplicates
  for (const [intro, files] of intros.entries()) {
    if (files.length > 1) result.duplicateIntros.push(`${intro.substring(0, 50)}... (${files.length} pages)`);
  }
  
  for (const [para, files] of paragraphs.entries()) {
    if (files.length > 1) result.duplicateParagraphs.push(`${para.substring(0, 50)}... (${files.length} pages)`);
  }
  
  for (const [heading, files] of headings.entries()) {
    if (files.length > 1) result.duplicateHeadings.push(`${heading} (${files.length} pages)`);
  }
  
  for (const [canonical, files] of canonicals.entries()) {
    if (files.length > 1) result.duplicateCanonicals.push(`${canonical} (${files.length} pages)`);
  }
  
  for (const [slug, files] of slugs.entries()) {
    if (files.length > 1) result.duplicateSlugs.push(`${slug} (${files.length} pages)`);
  }
  
  for (const [schema, files] of schemas.entries()) {
    if (files.length > 1) result.duplicateSchemas.push(`${schema} (${files.length} pages)`);
  }
  
  for (const [entity, files] of entities.entries()) {
    if (files.length > 1) result.duplicateEntities.push(`${entity} (${files.length} pages)`);
  }
  
  for (const [keyword, files] of keywords.entries()) {
    if (files.length > 1) result.duplicateKeywords.push(`${keyword} (${files.length} pages)`);
  }
  
  return result;
}

function auditInternalLinks(): AuditReport["internalLinks"] {
  const result: AuditReport["internalLinks"] = {
    total: 0,
    orphans: [],
    deadEnds: [],
    brokenLinks: [],
    weakHubs: [],
    missingHubLinks: [],
  };

  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  const linkGraph = new Map<string, Set<string>>();
  const allLinks: string[] = [];
  
  // Build link graph
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { body } = extractFrontmatter(content);
    const relPath = getRelativePath(file);
    
    const linkMatches = body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
    const outgoingLinks = new Set<string>();
    
    for (const match of linkMatches) {
      const href = match[2];
      if (href.startsWith("/") && !href.startsWith("//")) {
        const targetSlug = href.replace(/^\//, "").replace(/\.md$/, "");
        outgoingLinks.add(targetSlug);
        allLinks.push(`${relPath} -> ${href}`);
        result.total++;
      }
    }
    
    linkGraph.set(relPath, outgoingLinks);
  }
  
  // Find orphans (pages with no incoming links)
  const incomingLinks = new Map<string, number>();
  for (const [source, targets] of linkGraph.entries()) {
    for (const target of targets) {
      incomingLinks.set(target, (incomingLinks.get(target) || 0) + 1);
    }
  }
  
  for (const file of contentFiles) {
    const relPath = getRelativePath(file);
    const slug = relPath.replace(/^content\//, "").replace(/\.md$/, "");
    if (incomingLinks.get(slug) === 0) {
      result.orphans.push(relPath);
    }
  }
  
  // Find dead ends (pages with no outgoing links)
  for (const [source, targets] of linkGraph.entries()) {
    if (targets.size === 0) {
      result.deadEnds.push(source);
    }
  }
  
  // Find broken links
  for (const link of allLinks) {
    const [source, target] = link.split(" -> ");
    const targetFile = path.join(CONTENT_ROOT, target.replace(/^\//, "") + ".md");
    if (!fs.existsSync(targetFile)) {
      result.brokenLinks.push(`${source} -> ${target}`);
    }
  }
  
  // Find weak hubs (pages with few incoming links)
  for (const [source, targets] of linkGraph.entries()) {
    const incoming = incomingLinks.get(source.replace(/^content\//, "").replace(/\.md$/, "")) || 0;
    if (incoming < 2 && targets.size > 0) {
      result.weakHubs.push(`${source} (${incoming} incoming)`);
    }
  }
  
  // Find pages missing hub links (not linking to parent categories)
  const hubPages = new Set([...incomingLinks.entries()]
    .filter(([_, count]) => count >= 5)
    .map(([slug, _]) => slug));
  
  for (const [source, targets] of linkGraph.entries()) {
    const hasHubLink = [...targets].some(target => hubPages.has(target));
    if (!hasHubLink && targets.size > 0) {
      result.missingHubLinks.push(source);
    }
  }
  
  return result;
}

function auditSearchIntent(): AuditReport["searchIntent"] {
  const result: AuditReport["searchIntent"] = {
    total: 0,
    ambiguous: [],
    competing: [],
    missingIntent: [],
  };

  const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
  result.total = contentFiles.length;
  
  const intentKeywords: Record<string, string[]> = {
    "what-is": ["what is", "definition", "meaning", "explained"],
    "how-to": ["how to", "tutorial", "guide", "step by step", "setup", "install"],
    "comparison": ["vs", "versus", "compare", "comparison", "alternative"],
    "review": ["review", "rating", "testimonial", "experience", "feedback"],
    "list": ["list", "top", "best", "catalog", "directory"],
    "troubleshooting": ["troubleshoot", "error", "issue", "problem", "fix", "debug"],
    "enterprise": ["enterprise", "business", "organization", "company"],
    "security": ["security", "authentication", "authorization", "compliance", "encryption"],
    "performance": ["performance", "optimization", "speed", "benchmark", "latency"],
    "integration": ["integration", "connect", "api", "sdk", "plugin"],
  };
  
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);
    const fm = parseFrontmatterObject(frontmatter);
    const relPath = getRelativePath(file);
    
    const text = `${fm.title || ""} ${fm.description || ""} ${body}`.toLowerCase();
    
    // Check for explicit intent
    const hasExplicitIntent = fm.intent || fm.searchIntent || fm.type;
    if (!hasExplicitIntent) {
      result.missingIntent.push(relPath);
    }
    
    // Check for ambiguous intent (multiple competing intents)
    const matchedIntents: string[] = [];
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          matchedIntents.push(intent);
          break;
        }
      }
    }
    
    if (matchedIntents.length > 2) {
      result.ambiguous.push(`${relPath} (${matchedIntents.join(", ")})`);
    }
    
    // Check for competing intents on similar topics
    const title = (fm.title || "").toLowerCase();
    if (title.includes("what is") && title.includes("how to")) {
      result.competing.push(relPath);
    }
  }
  
  return result;
}

function runAudit(): AuditReport {
  console.log("[phase1] Starting full project audit...");
  
  const report: AuditReport = {
    routes: auditRoutes(),
    seo: auditSEO(),
    content: auditContent(),
    internalLinks: auditInternalLinks(),
    searchIntent: auditSearchIntent(),
  };
  
  return report;
}

function printReport(report: AuditReport) {
  console.log("\n=== Phase 1: Project Audit Report ===\n");
  
  console.log("## Routes");
  console.log(`Total: ${report.routes.total}`);
  console.log(`Duplicates: ${report.routes.duplicates.length}`);
  console.log(`Orphans: ${report.routes.orphans.length}`);
  console.log(`Missing: ${report.routes.missing.length}`);
  console.log(`Redirect Loops: ${report.routes.redirectLoops.length}`);
  console.log(`Shadow Routes: ${report.routes.shadowRoutes.length}`);
  console.log(`SSR Failures: ${report.routes.ssrFailures.length}`);
  
  console.log("\n## SEO");
  console.log(`Total pages: ${report.seo.total}`);
  console.log(`Missing Title: ${report.seo.missingTitle.length}`);
  console.log(`Missing H1: ${report.seo.missingH1.length}`);
  console.log(`Missing Description: ${report.seo.missingDescription.length}`);
  console.log(`Missing Canonical: ${report.seo.missingCanonical.length}`);
  console.log(`Missing OpenGraph: ${report.seo.missingOpenGraph.length}`);
  console.log(`Missing Twitter: ${report.seo.missingTwitter.length}`);
  console.log(`Missing JSON-LD: ${report.seo.missingJsonLd.length}`);
  console.log(`Missing Breadcrumbs: ${report.seo.missingBreadcrumbs.length}`);
  console.log(`Missing FAQ: ${report.seo.missingFaq.length}`);
  
  console.log("\n## Content");
  console.log(`Total pages: ${report.content.total}`);
  console.log(`Duplicate Intros: ${report.content.duplicateIntros.length}`);
  console.log(`Duplicate Paragraphs: ${report.content.duplicateParagraphs.length}`);
  console.log(`Duplicate Headings: ${report.content.duplicateHeadings.length}`);
  console.log(`Duplicate Canonicals: ${report.content.duplicateCanonicals.length}`);
  console.log(`Duplicate Slugs: ${report.content.duplicateSlugs.length}`);
  console.log(`Duplicate Schemas: ${report.content.duplicateSchemas.length}`);
  console.log(`Duplicate Entities: ${report.content.duplicateEntities.length}`);
  console.log(`Duplicate Keywords: ${report.content.duplicateKeywords.length}`);
  
  console.log("\n## Internal Links");
  console.log(`Total links: ${report.internalLinks.total}`);
  console.log(`Orphans: ${report.internalLinks.orphans.length}`);
  console.log(`Dead Ends: ${report.internalLinks.deadEnds.length}`);
  console.log(`Broken Links: ${report.internalLinks.brokenLinks.length}`);
  console.log(`Weak Hubs: ${report.internalLinks.weakHubs.length}`);
  console.log(`Missing Hub Links: ${report.internalLinks.missingHubLinks.length}`);
  
  console.log("\n## Search Intent");
  console.log(`Total pages: ${report.searchIntent.total}`);
  console.log(`Ambiguous: ${report.searchIntent.ambiguous.length}`);
  console.log(`Competing: ${report.searchIntent.competing.length}`);
  console.log(`Missing Intent: ${report.searchIntent.missingIntent.length}`);
  
  // Save report
  const reportPath = path.join(ROOT, "PHASE1_AUDIT_REPORT.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved to: ${reportPath}`);
}

const report = runAudit();
printReport(report);
