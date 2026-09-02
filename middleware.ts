import { NextRequest, NextResponse } from "next/server";

/**
 * Canonical host guard.
 *
 * Product doctrine (locked):
 *   www.mcpserver.in — public search / evidence / knowledge authority
 *   app.mcpserver.in — application/workspace surface (not yet deployed)
 *   mcpserver.in     — apex; redirect to www
 *
 * Until the standalone app workspace exists, app.mcpserver.in must NOT serve
 * the public authority corpus. We issue a 308 to www preserving path and query.
 */
const APP_HOST = "app.mcpserver.in";
const APEX_HOST = "mcpserver.in";
const CANONICAL_HOST = "www.mcpserver.in";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0].toLowerCase();

  // Skip Vercel preview / internal hosts entirely.
  if (
    hostname.endsWith(".vercel.app") ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  ) {
    return NextResponse.next();
  }

  // app.mcpserver.in → www.mcpserver.in (308, preserve path + query)
  if (hostname === APP_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  // mcpserver.in apex → www.mcpserver.in (308, preserve path + query)
  if (hostname === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except static assets and Next internals.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)"],
};
