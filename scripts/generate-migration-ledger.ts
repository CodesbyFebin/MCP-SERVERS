/**
 * Generate reports/milestone-7-migration-ledger.csv from the GSC cohort + redirect map
 * + content/server registries.
 *
 * Schema matches handoff spec:
 *   columns: family_slug, canonical_url, gsc_clicks, gsc_impressions,
 *            decision, evidence, redirect_target
 *   decision enum: KEEP_INDEXED | REDIRECT_301 | DEFER_NOINDEX | DROP_NOINDEX
 *
 * Decision rules (applied in this order):
 *   - Path is a redirect source                → REDIRECT_301
 *   - Path is GSC Coverage-Valid               → KEEP_INDEXED
 *   - Path matches numeric-suffix glossary     → DROP_NOINDEX
 *   - Path is a published registry path, not in GSC → DEFER_NOINDEX
 *
 * Never fabricates metrics. Missing values → empty cell.
 *
 * Run from repo root: npx tsx scripts/generate-migration-ledger.ts
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

const CANONICAL_ORIGIN = "https://www.mcpserver.in";
function strip(p: string): string {
  return p.endsWith("/") ? p.slice(0, -1) : p;
}
function resolveDestination(d: string): string {
  if (d === "/glossary/mcp-server/") return "/glossary/";
  if (d === "/directory/") return "/servers";
  return d;
}

// Build path -> GSC row map (no-slash key).
const gscByPath = new Map<string, { clicks: number; impressions: number }>();
for (const row of gsc) {
  const key = strip(row.path) || "/";
  if (!gscByPath.has(key)) gscByPath.set(key, { clicks: row.clicks, impressions: row.impressions });
}

// Build no-slash -> destination map.
const redirectMap = new Map<string, string>();
for (const r of redirects) {
  const src = strip(r.source);
  if (!redirectMap.has(src)) redirectMap.set(src, resolveDestination(r.destination));
}

const NUMERIC_SUFFIX = /^[\w-]+-\d+$/;
function deriveSlug(p: string): string {
  const segs = p.split("/").filter(Boolean);
  return segs[segs.length - 1] ?? p;
}

interface Row {
  family_slug: string;
  canonical_url: string;
  gsc_clicks: string;
  gsc_impressions: string;
  decision: string;
  evidence: string;
  redirect_target: string;
}

const rows: Row[] = [];
const seen = new Set<string>();

function addRow(normPath: string, slug: string, gscRow: { clicks: number; impressions: number } | null, redirectDest: string | null): void {
  if (seen.has(normPath)) return;
  seen.add(normPath);

  let decision: string;
  let evidence: string;
  let redirectTarget = "";

  if (redirectDest) {
    // Path is a redirect source — REDIRECT_301 wins, even if the path is also in GSC
    // (Google will drop the source from Coverage-Valid once the 301 propagates).
    decision = "REDIRECT_301";
    evidence = "handoff_redirect_map";
    redirectTarget = redirectDest;
  } else if (gscRow) {
    decision = "KEEP_INDEXED";
    evidence = "gsc_coverage_valid";
  } else if (NUMERIC_SUFFIX.test(slug)) {
    decision = "DROP_NOINDEX";
    evidence = "gsc_absent_and_no_redirect";
  } else {
    decision = "DEFER_NOINDEX";
    evidence = "gsc_absent";
  }

  rows.push({
    family_slug: slug,
    canonical_url: `${CANONICAL_ORIGIN}${normPath}`,
    gsc_clicks: gscRow ? String(gscRow.clicks) : "",
    gsc_impressions: gscRow ? String(gscRow.impressions) : "",
    decision,
    evidence,
    redirect_target: redirectTarget,
  });
}

// 1) Process every GSC URL (676 base rows).
for (const row of gsc) {
  const norm = strip(row.path) || "/";
  const slug = deriveSlug(norm);
  const gscRow = gscByPath.get(norm) ?? null;
  const dest = redirectMap.get(norm) ?? null;
  addRow(norm, slug, gscRow, dest);
}

// 2) Add every current registry path — these are REDIRECT/DEFER/DROP if not in GSC.
for (const entry of Object.values(contentRegistry)) {
  if (entry.status !== "published" || entry.noindex) continue;
  const norm = strip(entry.indexPath);
  const slug = deriveSlug(norm);
  const gscRow = gscByPath.get(norm) ?? null;
  const dest = redirectMap.get(norm) ?? null;
  addRow(norm, slug, gscRow, dest);
}

for (const server of Object.values(serverRegistry)) {
  if (!isServerIndexableEntry(server)) continue;
  const norm = strip(server.indexPath);
  const slug = deriveSlug(norm);
  const gscRow = gscByPath.get(norm) ?? null;
  const dest = redirectMap.get(norm) ?? null;
  addRow(norm, slug, gscRow, dest);
}

// --- Write CSV ---
const COLUMNS = [
  "family_slug",
  "canonical_url",
  "gsc_clicks",
  "gsc_impressions",
  "decision",
  "evidence",
  "redirect_target",
];
function csvEscape(v: string): string {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}
const csv = [
  COLUMNS.join(","),
  ...rows.map((r) => COLUMNS.map((c) => csvEscape(r[c as keyof Row] ?? "")).join(",")),
].join("\n") + "\n";

const outPath = path.join(REPORTS_DIR, "milestone-7-migration-ledger.csv");
fs.writeFileSync(outPath, csv);

console.log(`Wrote ${rows.length} rows to ${outPath}`);
const counts: Record<string, number> = {};
for (const r of rows) counts[r.decision] = (counts[r.decision] ?? 0) + 1;
console.log("Decisions:", JSON.stringify(counts));
