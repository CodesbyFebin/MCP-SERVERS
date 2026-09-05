import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Sentry SDK needs to load its bundle from sentry.io and submit beacons.
      "script-src 'self' 'unsafe-inline' https://browser.sentry-cdn.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.sentry.io https://*.ingest.sentry.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Required for the Docker self-host build (Phase 19). The standalone output
  // bundles only the runtime files Next.js needs in production, enabling the
  // multi-stage Dockerfile to ship a small image.
  output: "standalone",
  // Trailing-slash policy: false = paths are non-slash canonical; middleware
  // enforces 308 from slash variants to non-slash.
  trailingSlash: false,
  // Legacy directory alias migration (P1): /directory and /mcp-server-directory
  // converge to /servers as ONE 301 hop. Declared at the routing layer so the
  // slashed variants are caught before Next's own trailing-slash 308 (which
  // would otherwise create a 308 + 301 chain). Exact paths only — topical
  // /directory/* subpaths are EVIDENCE_REVIEW per G8 and must NOT match.
  // Middleware carries the same map as defense in depth for self-host.
  async redirects() {
    return [
      { source: "/directory", destination: "/servers", permanent: true },
      { source: "/mcp-server-directory", destination: "/servers", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Build-time source-map upload. Required for readable stack traces.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Hides source maps from the deployed bundle.
  hideSourceMaps: true,
  // Allow the browser to upload larger files (e.g. source context).
  widenClientFileUpload: true,

  // Silence build logs unless CI is watching.
  silent: !process.env.CI,

  // Non-deprecated v10 location for auto-instrumentation settings.
  webpack: {
    // Auto-instruments server functions (RSC, route handlers).
    autoInstrumentServerFunctions: true,
  },
});
