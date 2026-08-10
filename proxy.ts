import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./src/lib/auth";

const PROTECTED_ROUTES = ["/dashboard", "/api/v1/billing", "/api/v1/servers"];
const ALLOWED_COUNTRIES = ["IN"];
const CANONICAL_HOST = "mcpserver.in";
const FUNCTIONAL_QUERY_PATHS = ["/search", "/api", "/tools", "/login", "/register"];
const PUBLIC_FILE_PATTERN = /\.[a-z0-9]+$/i;
const LEGACY_PATH_REDIRECTS: Record<string, string> = {
  "/mcp-hosting": "/mcp-server-hosting/",
  "/mcp-tutorial": "/how-to-build-mcp-server/",
  "/blog/how-to-build-mcp-server-from-scratch": "/how-to-build-mcp-server/",
  "/complete-mcp-guide": "/complete-guide-mcp-servers/",
  "/build-an-mcp-server": "/how-to-build-mcp-server/",
  "/host-mcp-server": "/mcp-server-hosting/",
};

function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

function shouldSkipCanonicalRedirect(pathname: string): boolean {
  return pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname.startsWith("/.well-known/") || pathname === "/favicon.ico" || PUBLIC_FILE_PATTERN.test(pathname);
}

function shouldStripQuery(pathname: string): boolean {
  return !FUNCTIONAL_QUERY_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function normalizePath(pathname: string): string {
  const collapsed = pathname.replace(/\/{2,}/g, "/");
  const pathWithoutTrailingSlash = collapsed === "/" ? collapsed : collapsed.replace(/\/$/, "");
  const legacyDestination = LEGACY_PATH_REDIRECTS[pathWithoutTrailingSlash];
  if (legacyDestination) return legacyDestination;
  if (collapsed !== "/" && !collapsed.endsWith("/")) return `${collapsed}/`;
  return collapsed;
}

function getCanonicalRedirect(request: NextRequest): string | null {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const isLocalhost = host === "localhost" || host === "127.0.0.1";
  if (isLocalhost || shouldSkipCanonicalRedirect(pathname)) return null;

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const normalizedPath = normalizePath(pathname);
  const keepSearch = search && !shouldStripQuery(pathname);
  const normalizedSearch = keepSearch ? search : "";
  const isCanonicalHost = host === CANONICAL_HOST;
  const isHttps = forwardedProto ? forwardedProto === "https" : request.nextUrl.protocol === "https:";
  const needsRedirect = !isCanonicalHost || !isHttps || normalizedPath !== pathname || normalizedSearch !== search;
  if (!needsRedirect) return null;
  return `https://${CANONICAL_HOST}${normalizedPath}${normalizedSearch}`;
}

export async function proxy(request: NextRequest) {
  const canonicalRedirect = getCanonicalRedirect(request);
  if (canonicalRedirect) {
    return new NextResponse(null, { status: 308, headers: { Location: canonicalRedirect } });
  }

  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const isLocalhost = host === "localhost" || host === "127.0.0.1";

  if (isProtectedRoute(pathname)) {
    const geo = (request as any).geo;
    const country = geo?.country as string | undefined;

    if (!isLocalhost && country && !ALLOWED_COUNTRIES.includes(country)) {
      console.warn(`[DPDP Geo-Block] Blocked access from ${country} to ${pathname}`);
      return new NextResponse(JSON.stringify({ error: "Access Denied (403)", message: "To comply with the DPDP Act 2023, this management interface is restricted to Indian IP addresses." }), { status: 403, headers: { "Content-Type": "application/json" } });
    }

    if (isLocalhost) {
      console.log(`[DPDP Geo-Check] Localhost detected. Allowing access. Country would be: ${country || "UNKNOWN"}`);
    }

    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      if (isApiRoute(pathname)) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
