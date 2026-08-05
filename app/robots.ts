import { MetadataRoute } from "next";

export const dynamic = "force-static";

// Always point at the canonical HTTPS www origin regardless of deployment URL.
// Canonical host consolidation is handled by redirects and <link rel="canonical">,
// not by the unsupported robots.txt `Host` directive.
const sitemapUrl = "https://www.mcpserver.in/sitemap-index.xml";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── All crawlers (including Googlebot, Bingbot, Applebot, AI crawlers) ──
      // Google picks the most-specific matching group and does NOT merge it with
      // the wildcard. Keeping Googlebot and other well-behaved crawlers inside
      // the wildcard group means they inherit all the disallow rules below.
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/drafts/",
          "/internal/",
          "/login/",
          "/register/",
          "/profile/",
          "/dashboard/",
          "/admin/",
          "/search/",
        ],
      },
      // ── SEO scrapers — full block ────────────────────────────────────────────
      // These crawlers add no value and inflate server load.
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "BLEXBot",
          "DataForSeoBot",
        ],
        disallow: "/",
      },
    ],
    // Note: robots.txt does not provide access control. /admin/, /internal/,
    // and /dashboard/ are also protected by JWT session verification in
    // middleware.ts. Disallowing crawling here only prevents indexing.
    sitemap: sitemapUrl,
    // `host` is not a valid robots.txt directive recognised by Google.
    // Removed to eliminate the Search Console "unsupported directive" warning.
  };
}
