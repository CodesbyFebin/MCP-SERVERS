import * as fs from "fs";
import * as path from "path";

const DATA_PATH = path.join(process.cwd(), "public", "data", "seo-rankings.json");

// Import pillar slugs
const pillarsPath = path.join(process.cwd(), "src", "data", "pillars.ts");
const glossaryPath = path.join(process.cwd(), "src", "data", "glossary.ts");

// Extract pillar slugs from pillars.ts (simple regex parsing)
const pillarsContent = fs.readFileSync(pillarsPath, "utf8");
const pillarSlugs = Array.from(new Set(pillarsContent.matchAll(/slug:\s*"([^"]+)"/g)), m => m[1]);

// Extract glossary terms from glossary.ts
const glossaryContent = fs.readFileSync(glossaryPath, "utf8");
const glossaryTerms = Array.from(new Set(glossaryContent.matchAll(/term:\s*"([^"]+)"/g)), m => m[1].toLowerCase());

// Primary keywords to track (50 pillars)
const pillarKeywords = pillarSlugs.map(slug => ({
  keyword: slug.replace(/-/g, " "),
  url: `https://www.mcpserver.in/${slug}`
}));

// Glossary terms to track
const glossaryKeywords = glossaryTerms.slice(0, 25).map(term => ({
  keyword: term,
  url: `https://www.mcpserver.in/glossary/${glossaryContent.match(new RegExp(`slug:.*"[^"]*"[^}]*term:.*"${term}"`))?.[1] || "unknown"}`
}));

const trackedKeywords = [
  ...pillarKeywords,
  ...glossaryKeywords,
  { keyword: "mcp server india", url: "https://www.mcpserver.in" },
  { keyword: "model context protocol", url: "https://www.mcpserver.in/what-is-mcp" },
  { keyword: "mcp hosting", url: "https://www.mcpserver.in/pricing" },
  { keyword: "dpdp compliance", url: "https://www.mcpserver.in/learn/dpdp-compliance-guide" },
  { keyword: "rbi compliance", url: "https://www.mcpserver.in/learn/dpdp-compliance-guide" },
  { keyword: "mcp server directory", url: "https://www.mcpserver.in/servers" },
  { keyword: "mcp production deployment", url: "https://www.mcpserver.in/learn/mcp-production-deployment" },
  { keyword: "mcp monitoring", url: "https://www.mcpserver.in/mcp-monitoring" },
  { keyword: "india mcp servers", url: "https://www.mcpserver.in" }
];

function loadExisting() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(entries, null, 2), "utf8");
}

function buildEntry(keyword, url) {
  return {
    url,
    keyword,
    rank: -1,
    checkedAt: new Date().toISOString()
  };
}

function main() {
  const existing = loadExisting();
  const snapshot = trackedKeywords.map(({ keyword, url }) => buildEntry(keyword, url));
  const updated = [...existing, ...snapshot];
  saveEntries(updated);
  console.log(`✅ Recorded ${snapshot.length} SEO ranking entries to ${DATA_PATH}`);
  console.log(`📊 Total history entries: ${updated.length}`);
}

main();
