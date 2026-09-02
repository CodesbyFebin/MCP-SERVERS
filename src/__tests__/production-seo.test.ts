import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Production SEO correction pass tests (P0/P1).
 *
 * These tests inspect the actual source files to enforce the SEO invariants
 * because the failures are markup-level (HTML in JSX) and structural
 * (middleware behavior), not runtime data.
 */

const ROOT = resolve(__dirname, "../..");

function readSource(relPath: string): string {
  return readFileSync(resolve(ROOT, relPath), "utf-8");
}

describe("app.mcpserver.in host guard (middleware)", () => {
  const middlewareSource = readSource("middleware.ts");

  it("middleware file exists", () => {
    expect(middlewareSource).toBeTruthy();
  });

  it("redirects app.mcpserver.in to www.mcpserver.in", () => {
    expect(middlewareSource).toContain("app.mcpserver.in");
    expect(middlewareSource).toContain("www.mcpserver.in");
    expect(middlewareSource).toMatch(/308/);
  });

  it("redirects apex mcpserver.in to www.mcpserver.in", () => {
    expect(middlewareSource).toContain('APEX_HOST = "mcpserver.in"');
  });

  it("skips Vercel preview hosts", () => {
    expect(middlewareSource).toContain(".vercel.app");
  });

  it("preserves path and query (uses nextUrl.clone)", () => {
    expect(middlewareSource).toContain("request.nextUrl.clone()");
  });
});

describe("global layout: one H1 rule", () => {
  const layoutSource = readSource("app/layout.tsx");

  it("global layout does not render a top-level <h1>", () => {
    // The brand text should NOT be wrapped in an <h1> tag.
    expect(layoutSource).not.toMatch(/<h1[^>]*>[\s\S]*?MCPserver\.in/);
  });

  it("brand is a Link (semantic, non-heading)", () => {
    expect(layoutSource).toMatch(/<Link[^>]+>\s*MCPserver\.in\s*<\/Link>/);
  });

  it("layout metadata is not generic 'SEO/AEO/GEO' boilerplate", () => {
    expect(layoutSource).not.toMatch(/SEO\/AEO\/GEO/);
  });
});

describe("homepage content & metadata", () => {
  const pageSource = readSource("app/page.tsx");

  it("homepage exports canonical metadata pointing to www", () => {
    // Uses absoluteUrl("/") which resolves to https://www.mcpserver.in/
    expect(pageSource).toContain("absoluteUrl");
    expect(pageSource).toContain('alternates: { canonical: absoluteUrl("/") }');
  });

  it("homepage removes the literal /servers/[slug] link", () => {
    expect(pageSource).not.toMatch(/href=.*\/servers\/\[slug\]/);
  });

  it("homepage emits Organization JSON-LD with @id ending in #organization", () => {
    expect(pageSource).toMatch(/#organization/);
  });

  it("homepage emits WebSite JSON-LD with @id ending in #website", () => {
    expect(pageSource).toMatch(/#website/);
  });

  it("homepage emits WebPage JSON-LD with @id ending in #webpage", () => {
    expect(pageSource).toMatch(/#webpage/);
  });

  it("homepage does not emit AggregateRating or Offer schema", () => {
    expect(pageSource).not.toMatch(/AggregateRating/);
    expect(pageSource).not.toMatch(/"@type":\s*"Offer"/);
  });

  it("homepage does not expose SEO/AEO/GEO in user-facing copy", () => {
    expect(pageSource).not.toMatch(/SEO\/AEO\/GEO/);
  });

  it("homepage has exactly one <h1> (the page title)", () => {
    const h1Matches = pageSource.match(/<h1[\s>]/g) ?? [];
    expect(h1Matches.length).toBe(1);
  });

  it("homepage metadata title is the production-quality variant", () => {
    expect(pageSource).toMatch(/MCP Server Directory, Guides & Evidence/);
  });
});

describe("BreadcrumbList: no duplication", () => {
  it("Breadcrumbs component does NOT embed a JSON-LD script", () => {
    const breadcrumbsSource = readSource("src/components/content/Breadcrumbs.tsx");
    expect(breadcrumbsSource).not.toMatch(/application\/ld\+json/);
  });

  it("Breadcrumbs component is a single non-script render", () => {
    const breadcrumbsSource = readSource("src/components/content/Breadcrumbs.tsx");
    // After the fix, Breadcrumbs has no <script tag at all.
    expect(breadcrumbsSource).not.toMatch(/<script/);
  });
});

describe("sitemap: deterministic lastmod", () => {
  const sitemapSource = readSource("app/sitemap.ts");

  it("does NOT use `new Date()` for static hub lastmod", () => {
    // The new sitemap omits lastmod for static pages; no `now` variable.
    expect(sitemapSource).not.toMatch(/const now = new Date\(\)/);
  });

  it("uses registry reviewedAt for editorial lastmod", () => {
    expect(sitemapSource).toContain("entry.reviewedAt");
  });

  it("uses registry updatedAt for server lastmod", () => {
    expect(sitemapSource).toContain("entry.updatedAt");
  });

  it("static hub pages do not fabricate lastmod", () => {
    // No "lastModified: now" line for the static URLs.
    expect(sitemapSource).not.toMatch(/lastModified:\s*now/);
  });
});
