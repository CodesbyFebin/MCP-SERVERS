/**
 * Generate reports/milestone-7-migration-ledger.csv from the GSC cohort + redirect map
 * + content/server registries. Run from repo root: npx tsx scripts/generate-migration-ledger.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { contentRegistry } from "@/content/content-registry";
import { serverRegistry, isServerIndexableEntry } from "@/content/server-registry";

const DATA_DIR = path.join(process.cwd(), "data/migration/source");
const REPORTS_DIR = path.join(process.cwd(), "reports");

const gsc = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "gsc-indexed-urls.json"), "utf-8")
) as { url: string; path: string; bucket: string; clicks: number; impressions: number }[];
const redirects = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "glossary-and-legacy-redirects.json"), "utf-8")
) as { source: string; destination: string; permanent: boolean }[];

const publishedEditorial = new Set(
  Object.values(contentRegistry)
    .filter((e) => e.status === "published" && !e.noindex)
    .map((e) => e.indexPath)
);
const publishedServers = new Set(
  Object.values(serverRegistry)
    .filter((e) => isServerIndexableEntry(e))
    .map((e) => e.indexPath)
);
const allPublished = new Set([...publishedEditorial, ...publishedServers]);

function strip(p: string): string {
  return p.endsWith("/") ? p.slice(0, -1) : p;
}
function resolveDestination(d: string): string {
  if (d === "/glossary/mcp-server/") return "/glossary/";
  if (d === "/directory/") return "/servers";
  return d;
}
const redirectMap = new Map<string, string>();
for (const r of redirects) {
  const src = strip(r.source);
  if (!redirectMap.has(src)) redirectMap.set(src, resolveDestination(r.destination));
}

const now = new Date("2026-09-02").toISOString();
const rows: string[][] = [
  ["url", "canonical_destination", "disposition", "evidence_status", "clicks", "impressions", "decided_at"],
];
const counts: Record<string, number> = { KEEP: 0, REDIRECT: 0, EVIDENCE_REVIEW: 0, NOINDEX: 0 };

for (const row of gsc) {
  const norm = strip(row.path);
  let disposition: string;
  let destination: string;
  let evidenceStatus = "n/a";

  if (redirectMap.has(norm)) {
    disposition = "REDIRECT";
    destination = redirectMap.get(norm)!;
  } else if (allPublished.has(norm)) {
    disposition = "KEEP";
    destination = norm;
    evidenceStatus = "published";
  } else if (row.clicks >= 1 || row.impressions >= 50) {
    disposition = "EVIDENCE_REVIEW";
    destination = norm;
  } else if (row.clicks === 0 && row.impressions < 10) {
    disposition = "NOINDEX";
    destination = norm;
  } else {
    // Borderline: 0 clicks, 10-49 impressions
    disposition = "EVIDENCE_REVIEW";
    destination = norm;
  }

  counts[disposition]++;
  rows.push([
    row.url,
    destination,
    disposition,
    evidenceStatus,
    String(row.clicks),
    String(row.impressions),
    now,
  ]);
}

const csv =
  rows
    .map((r) => r.map((c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(","))
    .join("\n") + "\n";

const outPath = path.join(REPORTS_DIR, "milestone-7-migration-ledger.csv");
fs.writeFileSync(outPath, csv);
console.log(`Wrote ${rows.length - 1} rows to ${outPath}`);
console.log("Dispositions:", JSON.stringify(counts));
