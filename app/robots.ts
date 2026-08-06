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
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Img",
          "PerplexityBot",
          "Perplexity-Skimen",
          "Google-Extended",
          "Bytespider",
          "Applebot-Extended",
          "cohere-ai",
          "cohere-training-crawler",
        ],
        allow: "/",
      },
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
        ],
        disallow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap-index.xml`,
    host: baseUrl,
  };
}
