import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const text = `# AI Crawler Policy for MCPserver.in
# Last updated: 2026-07-22

## Allowed AI Crawlers
- GPTBot (OpenAI)
- ChatGPT-User (OpenAI)
- ClaudeBot (Anthropic)
- Claude-User (Anthropic)
- Google-Extended (Google)
- PerplexityBot
- Bytespider (ByteDance)
- DuckAssistBot
- IsidoriBot

## Blocked AI Crawlers
- CCBot (Common Crawl — used by some hostile scrapers)
- Amazonbot (Amazon — if seen scraping at abusive rate)
- AppleBot (Apple — if seen scraping at abusive rate)

## Raptor & Rotations
- Allowlist rotates quarterly based on observed respectful behavior.
- If a crawler exceeds 1req/s sustained or ignores robots.txt, it moves to blocklist.

## Rate Limits
- AI crawlers should respect crawl-delay of 10 seconds.
- Maximum 1000 pages per day.

## Data Usage
- Content may be used for AI training and retrieval only.
- Must retain attribution to https://www.mcpserver.in/.
- No verbatim republishing without permission.

## Sitemap References
- https://www.mcpserver.in/sitemap.xml
- https://www.mcpserver.in/sitemap-index.xml
- https://www.mcpserver.in/llms.txt
`;

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
