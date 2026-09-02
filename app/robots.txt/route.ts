import { NextResponse } from "next/server";

export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /drafts/
Disallow: /internal/
Disallow: /admin/
Disallow: /profile/
Disallow: /register/
Disallow: /login/

User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: https://www.mcpserver.in/sitemap.xml
`;
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
