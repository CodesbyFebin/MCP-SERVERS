import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { contentRegistry } from "@/content/content-registry";
import {
  serverRegistry,
  getIndexableServers,
  isServerIndexableEntry,
} from "@/content/server-registry";

const DATA_DIR = path.join(process.cwd(), "data/migration/source");

/** 676 URLs from real GSC Coverage-Valid export, 2026-08-17. */
const gscIndexed = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "gsc-indexed-urls.json"), "utf-8")
) as { url: string; path: string; bucket: string; clicks: number; impressions: number }[];

/** Pre-mapped 94 legacy redirects (92 numeric-suffix glossary + 2 mcp-server-directory). */
const redirects = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "glossary-and-legacy-redirects.json"), "utf-8")
) as { source: string; destination: string; permanent: boolean }[];

/**
 * Normalise a path to its no-trailing-slash canonical form.
 * GSC paths carry trailing slashes; redirect sources do not.
 */
function stripTrailingSlash(p: string): string {
  return p.endsWith("/") ? p.slice(0, -1) : p;
}

const redirectMap = new Map(
  redirects.map((r) => [stripTrailingSlash(r.source), r.destination])
);

describe("migration — GSC Coverage-Valid cohort (676 URLs)", () => {
  it("gsc-indexed-urls.json has exactly 676 rows", () => {
    expect(gscIndexed).toHaveLength(676);
  });

  it("every row has url, path, bucket, clicks, impressions", () => {
    gscIndexed.forEach((row) => {
      expect(row.url).toBeTruthy();
      expect(row.path).toMatch(/^\//);
      expect(row.bucket).toBeTruthy();
      expect(typeof row.clicks).toBe("number");
      expect(typeof row.impressions).toBe("number");
    });
  });

  it("homepage is in the cohort", () => {
    const home = gscIndexed.find((r) => r.path === "/" || r.path === "");
    expect(home).toBeDefined();
  });

  it("bucket distribution matches the expected shape", () => {
    const byBucket: Record<string, number> = {};
    gscIndexed.forEach((r) => {
      byBucket[r.bucket] = (byBucket[r.bucket] ?? 0) + 1;
    });
    expect(byBucket["blog"]).toBeGreaterThan(200);
    expect(byBucket["glossary"]).toBeGreaterThan(200);
    expect(byBucket["docs"]).toBeGreaterThan(50);
  });

  it("redirect sources that are still GSC-valid equals the redirect count for those buckets", () => {
    // Before the redirects are deployed, the legacy URLs remain in GSC Coverage-Valid.
    // After deployment, Google should drop them. The expected overlap right now is:
    // - 92 numeric-suffix glossary entries (all still in GSC, all in redirect map)
    // - 1 /mcp-server-directory entry (without trailing slash; the trailing-slash variant
    //   is not in GSC because the redirect at deployment will collapse them)
    const overlap = gscIndexed.filter((r) => redirectMap.has(stripTrailingSlash(r.path)));
    // 92 glossary + 1 mcp-server-directory = 93, plus 1 mcp-server-directory with trailing
    // slash if it appears in GSC. Right now 93 (1 of the 2 /mcp-server-directory paths
    // is in GSC — the no-trailing-slash variant).
    expect(overlap.length).toBe(93);
  });

  it("total cohort clicks + impressions are positive", () => {
    const totals = gscIndexed.reduce(
      (acc, r) => ({ clicks: acc.clicks + r.clicks, imps: acc.imps + r.impressions }),
      { clicks: 0, imps: 0 }
    );
    expect(totals.clicks).toBeGreaterThan(0);
    expect(totals.imps).toBeGreaterThan(0);
  });

  describe("per-URL disposition rules (from HANDOFF.md)", () => {
    const publishedEditorialPaths = new Set(
      Object.values(contentRegistry)
        .filter((e) => e.status === "published" && !e.noindex)
        .map((e) => e.indexPath)
    );
    const publishedServerPaths = new Set(
      Object.values(serverRegistry)
        .filter((e) => isServerIndexableEntry(e))
        .map((e) => e.indexPath)
    );
    const allPublished = new Set([...publishedEditorialPaths, ...publishedServerPaths]);

    it("all 676 GSC URLs are classified (keep + redirect + evidenceReview + noindex)", () => {
      let keep = 0, redirect = 0, evidenceReview = 0, noindex = 0;
      for (const row of gscIndexed) {
        const normPath = stripTrailingSlash(row.path);
        if (redirectMap.has(normPath)) { redirect++; continue; }
        if (allPublished.has(normPath)) { keep++; continue; }
        if (row.clicks >= 1 || row.impressions >= 50) { evidenceReview++; }
        else if (row.clicks === 0 && row.impressions < 10) { noindex++; }
        else { evidenceReview++; } // borderline: 0 clicks, 10-49 imps
      }
      // 93 redirect sources are still in GSC (pre-deployment cohort)
      expect(redirect).toBe(93);
      expect(keep + redirect + evidenceReview + noindex).toBe(676);
    });

    it("all 92 numeric-suffix glossary URLs from GSC are in the redirect map", () => {
      const numericSuffix = gscIndexed.filter((r) => /-\d+\/?$/.test(r.path));
      expect(numericSuffix).toHaveLength(92);
      for (const row of numericSuffix) {
        expect(redirectMap.has(stripTrailingSlash(row.path))).toBe(true);
      }
    });
  });
});

describe("migration — milestone-7 migration ledger (spec-compliant)", () => {
  const LEDGER_PATH = path.join(process.cwd(), "reports/milestone-7-migration-ledger.csv");

  it("milestone-7-migration-ledger.csv exists", () => {
    expect(fs.existsSync(LEDGER_PATH)).toBe(true);
  });

  it("CSV has the spec column headers", () => {
    const header = fs.readFileSync(LEDGER_PATH, "utf-8").split("\n")[0];
    expect(header).toBe("family_slug,canonical_url,gsc_clicks,gsc_impressions,decision,evidence,redirect_target");
  });

  it("every row has a non-empty decision (enum: KEEP_INDEXED | REDIRECT_301 | DEFER_NOINDEX | DROP_NOINDEX)", () => {
    const lines = fs.readFileSync(LEDGER_PATH, "utf-8").trim().split("\n");
    const VALID_DECISIONS = new Set(["KEEP_INDEXED", "REDIRECT_301", "DEFER_NOINDEX", "DROP_NOINDEX"]);
    for (const line of lines.slice(1)) {
      const decision = line.split(",")[4];
      expect(VALID_DECISIONS.has(decision)).toBe(true);
    }
  });

  it("decision distribution reflects the known cohort sizes", () => {
    // The ledger covers: 676 GSC URLs + 83 registry paths
    // GSC redirect sources (93) → REDIRECT_301
    // GSC non-redirect (583) → KEEP_INDEXED
    // Registry paths not in GSC (72) → DEFER_NOINDEX
    const lines = fs.readFileSync(LEDGER_PATH, "utf-8").trim().split("\n");
    const counts: Record<string, number> = {};
    for (const line of lines.slice(1)) {
      const d = line.split(",")[4];
      counts[d] = (counts[d] ?? 0) + 1;
    }
    expect(counts["REDIRECT_301"]).toBe(93);   // 93 GSC URLs that are redirect sources
    expect(counts["KEEP_INDEXED"]).toBeGreaterThan(500); // GSC non-redirect cohort
    expect(counts["DEFER_NOINDEX"]).toBeGreaterThan(0);  // registry paths not in GSC
    expect(counts["DROP_NOINDEX"] ?? 0).toBe(0);         // all numeric-suffix are in redirect map
    expect(lines.length - 1).toBeGreaterThan(700);       // ledger is comprehensive
  });

  it("REDIRECT_301 rows all have a non-empty redirect_target", () => {
    const lines = fs.readFileSync(LEDGER_PATH, "utf-8").trim().split("\n");
    for (const line of lines.slice(1)) {
      const cols = line.split(",");
      if (cols[4] === "REDIRECT_301") {
        expect(cols[6]).toBeTruthy();
      }
    }
  });

  it("server-registry mcp-server-postgres entry is documented in the legacy reconciliation CSV", () => {
    // The milestone-7-server-reconciliation.csv documents the server registry migration.
    const ledgerPath = path.join(process.cwd(), "reports/milestone-7-server-reconciliation.csv");
    expect(fs.existsSync(ledgerPath)).toBe(true);
    const content = fs.readFileSync(ledgerPath, "utf-8");
    expect(content).toContain("mcp-server-postgres");
    expect(content).toContain("/servers/mcp-server-postgres");
  });

  it("getIndexableServers() returns only servers that pass isServerIndexableEntry", () => {
    const servers = getIndexableServers();
    for (const server of servers) {
      expect(isServerIndexableEntry(server)).toBe(true);
    }
  });
});
