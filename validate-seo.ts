import * as fs from "fs";
import * as path from "path";

// 1. Gather live entities to compile the list of valid dynamic routes
import { servers } from "./src/data/servers";
import { pillars } from "./src/data/pillars";
import { topics } from "./src/data/topics";
import { glossaryTerms } from "./src/data/glossary";
import { comparisons } from "./src/data/comparisons";
import { categories } from "./src/data/categories";

console.log("--------------------------------------------------");
console.log("🔍 STARTING STRICT METADATA, SCHEMA & SEO AUDIT");
console.log("--------------------------------------------------");

// Compile master list of absolute valid paths (Trailing slash consistent with Next.js export config)
const validPaths = new Set<string>([
  "/",
  "/sitemap/",
  "/mcp-server-directory/",
  "/mcp-monitoring/",
  "/status/",
  "/glossary/",
  "/pricing/",
  "/docs/",
  "/security/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/compare/",
]);

// Register dynamic route entities with trailing slash
servers.forEach((s) => validPaths.add(`/servers/${s.slug}/`));
pillars.forEach((p) => validPaths.add(`/${p.slug}/`));
topics.forEach((t) => validPaths.add(`/topics/${t.slug}/`));
glossaryTerms.forEach((g) => validPaths.add(`/glossary/${g.slug}/`));
comparisons.forEach((c) => validPaths.add(`/compare/${c.slug}/`));
categories.forEach((cat) => validPaths.add(`/directory/${cat.slug}/`));

const popularPairings = [
  "github-mcp-server-vs-gitlab-mcp-server",
  "postgres-mcp-server-vs-sqlite-mcp-server",
  "slack-mcp-server-vs-discord-mcp-server",
  "github-mcp-server-vs-postgres-mcp-server"
];
popularPairings.forEach((p) => validPaths.add(`/compare/${p}/`));

const toolSlugs = [
  "mcp-playground",
  "mcp-server-checker",
  "mcp-schema-viewer",
  "mcp-config-validator",
  "mcp-endpoint-tester",
];
toolSlugs.forEach((ts) => validPaths.add(`/tools/${ts}/`));

console.log(`✅ Loaded ${validPaths.size} highly structured canonical paths from Knowledge Graph data lists.`);

let errorsCount = 0;
let warningsCount = 0;

// Blacklisted Authority Claims check list
const blacklistedClaims = [
  "10,000+ servers",
  "500,000+ deployments",
  "1M+ requests",
  "150+ countries",
  "99.99% uptime",
  "50,000+ developers",
  "India's #1",
  "largest MCP directory",
  "most trusted MCP platform",
  "MCPserver Technologies Pvt Ltd",
  "U72200KA2026PTC210847",
  "HSR Layout",
];

// Helper to recursively list files
function walkDir(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePat = path.join(dir, file);
    if (fs.statSync(filePat).isDirectory()) {
      if (!["node_modules", ".git", "dist", ".next"].includes(file)) {
        walkDir(filePat, fileList);
      }
    } else {
      if (
        filePat.endsWith(".tsx") ||
        filePat.endsWith(".ts") ||
        filePat.endsWith(".json") ||
        filePat.endsWith(".txt")
      ) {
        fileList.push(filePat);
      }
    }
  }
  return fileList;
}

const allSourceFiles = [...walkDir("./src"), ...walkDir("./app"), ...walkDir("./public")];
console.log(`📂 Scanning ${allSourceFiles.length} files in the codebase for issues...`);

// Core Data validation checks
const uniqueServerSlugs = new Set<string>();
const uniquePillarSlugs = new Set<string>();
const uniqueTopicSlugs = new Set<string>();
const uniqueGlossarySlugs = new Set<string>();
const uniqueTitles = new Set<string>();
const uniqueDescriptions = new Set<string>();

// Validate servers unique slugs and metadata properties
servers.forEach((s) => {
  if (uniqueServerSlugs.has(s.slug)) {
    console.error(`❌ [ERROR] Duplicate server slug found: "${s.slug}"`);
    errorsCount++;
  }
  uniqueServerSlugs.add(s.slug);

  if (!s.name || !s.description || s.useCases.length === 0) {
    console.error(`❌ [ERROR] Thin or invalid Server Integration metadata: "${s.slug}"`);
    errorsCount++;
  }
});

// Validate pillars unique slugs and metadata
pillars.forEach((p) => {
  if (uniquePillarSlugs.has(p.slug)) {
    console.error(`❌ [ERROR] Duplicate pillar slug found: "${p.slug}"`);
    errorsCount++;
  }
  uniquePillarSlugs.add(p.slug);

  if (!p.title || !p.shortAnswer || !p.description) {
    console.error(`❌ [ERROR] Thin or invalid Pillar page metadata: "${p.slug}"`);
    errorsCount++;
  }
});

// Validate topics unique slugs, metadata and related links
topics.forEach((t) => {
  if (uniqueTopicSlugs.has(t.slug)) {
    console.error(`❌ [ERROR] Duplicate topic slug found: "${t.slug}"`);
    errorsCount++;
  }
  uniqueTopicSlugs.add(t.slug);

  if (!t.title || !t.shortAnswer || !t.explanation) {
    console.error(`❌ [ERROR] Thin or invalid Topic page metadata: "${t.slug}"`);
    errorsCount++;
  }
});

// Validate Glossary unique slugs and metadata
glossaryTerms.forEach((g) => {
  if (uniqueGlossarySlugs.has(g.slug)) {
    console.error(`❌ [ERROR] Duplicate glossary slug found: "${g.slug}"`);
    errorsCount++;
  }
  uniqueGlossarySlugs.add(g.slug);

  if (!g.term || !g.definition) {
    console.error(`❌ [ERROR] Thin or invalid Glossary term: "${g.slug}"`);
    errorsCount++;
  }
});

// File content scans
allSourceFiles.forEach((filePath) => {
  const content = fs.readFileSync(filePath, "utf-8");
  const fileName = path.basename(filePath);

  // Skip self-scans or dependency locks
  if (fileName === "validate-seo.ts" || fileName === "package-lock.json") {
    return;
  }

  // Check 1: Blacklisted Authority Claims
  blacklistedClaims.forEach((claim) => {
    if (content.includes(claim)) {
      console.error(
        `❌ [ERROR] Blacklisted fake claim/stat "${claim}" found inside: ${filePath}`
      );
      errorsCount++;
    }
  });

  // Check 2: Invalid schemas (no fake reviews/aggregateRating allowed)
  if (content.includes('"Review"') || content.includes('"AggregateRating"') || content.includes('"ratingValue"')) {
    console.error(
      `❌ [ERROR] Unverified/fake Review or AggregateRating schema found in file: ${filePath}`
    );
    errorsCount++;
  }

  // Check 3: Check internal link targets are canonically mapped
  const linkRegex = /(?:href|to)=["'](\/[^"']*)["']/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const rawTarget = match[1];
    const pathOnly = rawTarget.split(/[?#]/)[0];

    // Skip general parameterized variables or relative targets
    if (
      pathOnly.includes("$") ||
      pathOnly.includes("{") ||
      pathOnly.includes(":") ||
      pathOnly === ""
    ) {
      continue;
    }

    // Convert links to include trailing slash for unified canonical consistency if missing
    const canonicalLink = pathOnly.endsWith("/") ? pathOnly : `${pathOnly}/`;

    // Ensure we exclude auth pages from link validation but do not enforce them in valid indexable SEO paths
    if (
      canonicalLink !== "/profile/" &&
      canonicalLink !== "/login/" &&
      canonicalLink !== "/register/" &&
      !validPaths.has(canonicalLink)
    ) {
      console.error(
        `❌ [ERROR] Broken internal link or non-canonical path found in ${filePath}: "${rawTarget}"`
      );
      errorsCount++;
    }
  }
});

console.log("--------------------------------------------------");
console.log(`📊 Static Audit Finished: Found ${errorsCount} Errors, ${warningsCount} Warnings.`);
console.log("--------------------------------------------------");

if (errorsCount > 0) {
  console.error(
    "⛔ [FATAL] Audit failed. Production build halted because critical SEO/Routing validation errors were detected."
  );
  process.exit(1);
} else {
  // Generate public XML sitemaps
  console.log("--------------------------------------------------");
  console.log("🌐 GENERATING ENTERPRISE SEGMENTED XML SITEMAPS...");
  console.log("--------------------------------------------------");

  const siteUrl = "https://www.mcpserver.in";
  const today = new Date().toISOString().split("T")[0];

  const buildUrlNode = (loc: string, lastmod: string, changefreq: string, priority: string) => `  <url>
    <loc>${siteUrl}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

  // 1. sitemap-pages.xml (EXCLUDE login, register, profile!)
  const sitemapPagesContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${buildUrlNode("/", today, "daily", "1.0")}
${buildUrlNode("/mcp-server-directory/", today, "daily", "0.9")}
${buildUrlNode("/mcp-monitoring/", today, "weekly", "0.8")}
${buildUrlNode("/status/", today, "daily", "0.9")}
${buildUrlNode("/glossary/", today, "weekly", "0.7")}
${buildUrlNode("/pricing/", today, "weekly", "0.9")}
${buildUrlNode("/docs/", today, "weekly", "0.8")}
${buildUrlNode("/security/", today, "weekly", "0.9")}
${buildUrlNode("/about/", today, "monthly", "0.6")}
${buildUrlNode("/contact/", today, "monthly", "0.6")}
${buildUrlNode("/privacy/", today, "monthly", "0.3")}
${buildUrlNode("/terms/", today, "monthly", "0.3")}
${buildUrlNode("/sitemap/", today, "monthly", "0.4")}
${toolSlugs.map((ts) => buildUrlNode(`/tools/${ts}/`, today, "weekly", "0.8")).join("\n")}
</urlset>`;
  fs.writeFileSync("./public/sitemap-pages.xml", sitemapPagesContent);

  // 2. sitemap-pillars.xml
  const sitemapPillarsContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(pillars)
  .map((p) => buildUrlNode(`/${p.slug}/`, today, "weekly", "0.9"))
  .join("\n")}
</urlset>`;
  fs.writeFileSync("./public/sitemap-pillars.xml", sitemapPillarsContent);

  // 3. sitemap-topics.xml
  const sitemapTopicsContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(topics)
  .map((t) => buildUrlNode(`/topics/${t.slug}/`, today, "weekly", "0.8"))
  .join("\n")}
</urlset>`;
  fs.writeFileSync("./public/sitemap-topics.xml", sitemapTopicsContent);

  // 4. sitemap-integrations.xml
  const sitemapIntegrationsContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(servers)
  .map((s) => buildUrlNode(`/servers/${s.slug}/`, today, "weekly", "0.8"))
  .join("\n")}
</urlset>`;
  fs.writeFileSync("./public/sitemap-integrations.xml", sitemapIntegrationsContent);

  // 5. sitemap-glossary.xml
  const sitemapGlossaryContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(glossaryTerms)
  .map((g) => buildUrlNode(`/glossary/${g.slug}/`, today, "weekly", "0.7"))
  .join("\n")}
</urlset>`;
  fs.writeFileSync("./public/sitemap-glossary.xml", sitemapGlossaryContent);

  // 6. sitemap-comparisons.xml
  const sitemapComparisonsContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(comparisons)
  .map((c) => buildUrlNode(`/compare/${c.slug}/`, today, "weekly", "0.8"))
  .join("\n")}
</urlset>`;
  fs.writeFileSync("./public/sitemap-comparisons.xml", sitemapComparisonsContent);

  // 7. sitemap-categories.xml
  const sitemapCategoriesContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(categories)
  .map((cat) => buildUrlNode(`/directory/${cat.slug}/`, today, "weekly", "0.8"))
  .join("\n")}
</urlset>`;
  fs.writeFileSync("./public/sitemap-categories.xml", sitemapCategoriesContent);

  // 8. sitemap-images.xml
  const sitemapImagesContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <image:image>
      <image:loc>${siteUrl}/logo.svg</image:loc>
      <image:title>MCPserver Brand Logo</image:title>
    </image:image>
  </url>
</urlset>`;
  fs.writeFileSync("./public/sitemap-images.xml", sitemapImagesContent);

  // 9. sitemap.xml Index (Unified index including categories)
  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-pillars.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-topics.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-integrations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-glossary.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-comparisons.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-categories.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
  fs.writeFileSync("./public/sitemap.xml", sitemapIndexContent);

  console.log("🌟 Enterprise XML sitemaps built and stored successfully.");
  console.log("🌟 [SUCCESS] All SEO, Claims and Link validation checks passed successfully. Build safe to deploy.");
  process.exit(0);
}
