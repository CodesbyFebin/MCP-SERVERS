import { NextRequest, NextResponse } from "next/server";

/**
 * Canonical host guard + trailing-slash policy.
 *
 * Product doctrine (locked):
 *   www.mcpserver.in — public search / evidence / knowledge authority
 *   app.mcpserver.in — application/workspace surface (not yet deployed)
 *   mcpserver.in     — apex; redirect to www
 *
 * Until the standalone app workspace exists, app.mcpserver.in must NOT serve
 * the public authority corpus. We issue a 308 to www preserving path and query.
 *
 * Trailing-slash policy: paths are non-slash canonical. Any non-root path with
 * a trailing slash is 308-redirected to the same path without the trailing slash.
 * The root path "/" is unchanged.
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

  // Host normalization: app + apex → www (308)
  if (hostname === APP_HOST || hostname === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  // Trailing-slash normalization: non-root paths ending in "/" → 308 to strip
  const { pathname, search } = request.nextUrl;
  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except static assets and Next internals.
  matcher: [
    // Skip static assets, Next.js internals, pre-rendered text surfaces,
    // and RFC 8615 /.well-known/ resources.
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt|\\.well-known/).*)",
  ],
};
