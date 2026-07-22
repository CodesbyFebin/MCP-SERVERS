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
        userAgent: ["Googlebot", "Googlebot-Image", "Googlebot-News", "Googlebot-Video"],
        allow: "/",
      },
      {
        userAgent: ["Bingbot"],
        allow: "/",
      },
      {
        userAgent: ["Applebot", "Applebot-Extended"],
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Img",
          "PerplexityBot",
          "Perplexity-User",
          "Perplexity-Skimen",
          "Google-Extended",
          "cohere-ai",
          "cohere-training-crawler",
          "Meta-ExternalAgent",
          "MetaBot",
          "Amazonbot",
          "OAI-SearchBot",
          "Diffbot",
          "YouBot",
        ],
        allow: "/",
      },
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
    sitemap: `${baseUrl}/sitemap-index.xml`,
    host: baseUrl,
  };
}
