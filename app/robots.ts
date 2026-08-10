import { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://mcpserver.in";
const sitemapUrl = `${baseUrl}/sitemap.xml`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
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
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: "/",
      },
    ],
    sitemap: sitemapUrl,
  };
}
