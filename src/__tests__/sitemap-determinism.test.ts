import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Sitemap determinism invariant tests (source-level).
 *
 * We cannot import app/sitemap.ts directly because it is a Next.js MetadataRoute
 * handler that depends on the Next.js runtime. Instead we inspect the source.
 *
 * Invariant: two sitemap generations from identical content must produce identical
 * timestamps (or identical absences of timestamps). If the sitemap ever used
 * `new Date()` as a content lastmod, this invariant would be violated.
 */
const ROOT = resolve(__dirname, "../..");

function readSource(relPath: string): string {
  return readFileSync(resolve(ROOT, relPath), "utf-8");
}

describe("sitemap determinism", () => {
  const sitemapSource = readSource("app/sitemap.ts");

  it("no `const now = new Date()` in sitemap — would produce non-deterministic lastmod", () => {
    expect(sitemapSource).not.toMatch(/const now = new Date\(\)/);
  });

  it("no `lastModified: now` for static hub pages — avoids build-time timestamps", () => {
    expect(sitemapSource).not.toMatch(/lastModified:\s*now/);
  });

  it("editorial lastmod uses `reviewedAt` from registry", () => {
    expect(sitemapSource).toContain("entry.reviewedAt");
  });

  it("server lastmod uses `updatedAt` from registry", () => {
    expect(sitemapSource).toContain("entry.updatedAt");
  });

  it("static hub pages omit lastmod (not undefined with no fallback)", () => {
    // Confirm staticUrls array has no lastModified field at all.
    const staticSection = sitemapSource.match(/const staticUrls[\s\S]*?\];/);
    expect(staticSection?.[0]).not.toContain("lastModified");
  });

  it("editorial entries filter to status=published only", () => {
    // getIndexableEntries() does the status=published filter
    expect(sitemapSource).toContain("getIndexableEntries()");
  });

  it("server entries use getIndexableServers (isServerIndexable gate)", () => {
    expect(sitemapSource).toContain("getIndexableServers()");
  });

  it("sitemap does not include app.mcpserver.in or apex URLs", () => {
    expect(sitemapSource).not.toContain("app.mcpserver.in");
    expect(sitemapSource).not.toContain('"mcpserver.in"');
    // CANONICAL_ORIGIN is the www URL — used as the baseUrl
    expect(sitemapSource).toContain("CANONICAL_ORIGIN");
  });

  it("sitemap deduplicates by URL to prevent duplicate entries", () => {
    expect(sitemapSource).toContain("uniqueUrls");
    expect(sitemapSource).toContain("!uniqueUrls.has");
  });
});
