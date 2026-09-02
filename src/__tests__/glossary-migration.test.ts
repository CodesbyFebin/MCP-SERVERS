import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { contentRegistry } from "@/content/content-registry";
import { serverRegistry } from "@/content/server-registry";

const DATA_DIR = path.join(process.cwd(), "data/migration/source");

/** 94 redirects: 92 numeric-suffix glossary + 2 mcp-server-directory. */
const redirects = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "glossary-and-legacy-redirects.json"), "utf-8")
) as { source: string; destination: string; permanent: boolean }[];

/** 676 GSC Coverage-Valid rows. */
const gscIndexed = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "gsc-indexed-urls.json"), "utf-8")
) as { url: string; path: string; bucket: string; clicks: number; impressions: number }[];

function stripTrailingSlash(p: string): string {
  return p.endsWith("/") ? p.slice(0, -1) : p;
}

describe("glossary-migration — numeric suffix reconciliation (94 redirects)", () => {
  it("redirect map has 94 entries", () => {
    expect(redirects).toHaveLength(94);
  });

  it("92 of 94 redirects target /glossary/ or /glossary/mcp-server/", () => {
    const glossaryRedirects = redirects.filter(
      (r) => r.destination === "/glossary/" || r.destination === "/glossary/mcp-server/"
    );
    expect(glossaryRedirects).toHaveLength(92);
  });

  it("2 of 94 redirects are the /mcp-server-directory pair", () => {
    // /directory/ is not a published page in this build (see milestone-7-server-reconciliation.csv:
    // legacy /directory/* → /servers). These 2 redirects will be remapped to /servers at merge time.
    const dirRedirects = redirects.filter((r) => r.destination === "/directory/");
    expect(dirRedirects).toHaveLength(2);
    const sources = dirRedirects.map((r) => r.source).sort();
    expect(sources).toEqual(["/mcp-server-directory", "/mcp-server-directory/"]);
  });

  it("all redirect sources start with /", () => {
    for (const r of redirects) {
      expect(r.source).toMatch(/^\//);
    }
  });

  it("all redirect destinations are canonical relative paths", () => {
    for (const r of redirects) {
      expect(r.destination).toMatch(/^\//);
      expect(r.destination).not.toMatch(/^https?:\/\//);
    }
  });

  it("all redirects are permanent (301)", () => {
    for (const r of redirects) {
      expect(r.permanent).toBe(true);
    }
  });

  it("redirect sources are unique (counting both /mcp-server-directory variants as one logical source)", () => {
    // The data has 94 raw sources, but the 2 /mcp-server-directory variants
    // (with and without trailing slash) represent one logical redirect pair.
    // Both must be kept in vercel.json so each variant 301s correctly.
    const sources = redirects.map((r) => stripTrailingSlash(r.source));
    const uniqueSources = new Set(sources);
    expect(sources.length).toBe(94);        // raw
    expect(uniqueSources.size).toBe(93);    // 92 glossary + 1 mcp-server-directory
  });

  it("every numeric-suffix glossary path in GSC is in the redirect map", () => {
    // GSC paths carry trailing slashes; redirect sources do not — normalise both.
    const numericGlossary = gscIndexed.filter(
      (r) => r.bucket === "glossary" && /-\d+\/?$/.test(r.path)
    );
    expect(numericGlossary).toHaveLength(92);
    const redirectSources = new Set(redirects.map((r) => stripTrailingSlash(r.source)));
    for (const row of numericGlossary) {
      expect(redirectSources.has(stripTrailingSlash(row.path))).toBe(true);
    }
  });

  it("92 numeric-suffix glossary sources match /glossary/mcp-*-<digit>/?", () => {
    const glossaryRedirects = redirects.filter(
      (r) => r.destination === "/glossary/" || r.destination === "/glossary/mcp-server/"
    );
    for (const r of glossaryRedirects) {
      expect(stripTrailingSlash(r.source)).toMatch(/^\/glossary\/mcp-.+-\d+$/);
    }
  });
});

describe("glossary-migration — destination pages exist in the editorial registry", () => {
  it("/glossary/ is published in the editorial registry", () => {
    // Registry paths have no trailing slash.
    const glossaryEntry = Object.values(contentRegistry).find(
      (e) => e.indexPath === "/glossary"
    );
    expect(glossaryEntry).toBeDefined();
    expect(glossaryEntry?.status).toBe("published");
    expect(glossaryEntry?.noindex).not.toBe(true);
  });

  it("/glossary/mcp-server/ is not in the editorial registry (only the /glossary hub is)", () => {
    // The /glossary registry currently contains the hub only; individual term
    // pages are dynamic. The 1 redirect with destination /glossary/mcp-server/
    // will fall back to /glossary/ at merge time if no matching entry exists.
    const entry = Object.values(contentRegistry).find(
      (e) => e.indexPath === "/glossary/mcp-server"
    );
    expect(entry).toBeUndefined();
  });

  it("/servers aggregate page is reachable (mcp-server-directory redirect target)", () => {
    // /directory/ is not a published page — per milestone-7-server-reconciliation.csv,
    // legacy /directory/* redirects to /servers. The mcp-server-directory redirect
    // targets /directory/ in the raw data and will be remapped to /servers at merge time.
    // Verify the server registry and the /servers page exist; the redirect source is
    // a legacy URL, not a registry path.
    expect(Object.keys(serverRegistry).length).toBeGreaterThan(0);
    const fsCheck = require("fs") as typeof import("fs");
    const p = require("path") as typeof import("path");
    expect(fsCheck.existsSync(p.join(process.cwd(), "app/servers/page.tsx"))).toBe(true);
  });
});
