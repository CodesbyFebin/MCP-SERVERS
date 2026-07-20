import * as fs from "fs";
import * as path from "path";

interface RankEntry {
  url: string;
  keyword: string;
  rank: number;
  checkedAt: string;
}

const DATA_PATH = path.join(process.cwd(), "public", "data", "seo-rankings.json");

const trackedKeywords: Array<{ keyword: string; url: string }> = [
  { keyword: "mcp server india", url: "https://www.mcpserver.in" },
  { keyword: "model context protocol", url: "https://www.mcpserver.in/what-is-mcp" },
  { keyword: "mcp hosting", url: "https://www.mcpserver.in/pricing" },
  { keyword: "dpdp compliance", url: "https://www.mcpserver.in/learn/dpdp-compliance-guide" },
  { keyword: "mcp server directory", url: "https://www.mcpserver.in/servers" }
];

function loadExisting(): RankEntry[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: RankEntry[]) {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(entries, null, 2), "utf8");
}

function buildEntry(keyword: string, url: string): RankEntry {
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
