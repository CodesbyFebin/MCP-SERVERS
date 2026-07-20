import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/api/v1/billing', '/api/v1/servers'];
const ALLOWED_COUNTRIES = ['IN'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const geo = (request as any).geo;
    const country = geo?.country as string | undefined;
    const host = request.headers.get('host') || '';
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');

    if (!isLocalhost && country && !ALLOWED_COUNTRIES.includes(country)) {
      console.warn(`[DPDP Geo-Block] Blocked access from ${country} to ${pathname}`);
      
      return new NextResponse(
        JSON.stringify({ 
          error: 'Access Denied (403)', 
          message: 'To comply with the DPDP Act 2023, this management interface is restricted to Indian IP addresses.' 
        }),
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    if (isLocalhost) {
      console.log(`[DPDP Geo-Check] Localhost detected. Allowing access. Country would be: ${country || 'UNKNOWN'}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/v1/:path*'],
};