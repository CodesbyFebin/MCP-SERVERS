import { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.mcpserver.in").replace(/\/$/, "");

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
