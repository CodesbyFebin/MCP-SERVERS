import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,

  turbopack: {
    root: __dirname,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  devIndicators: false,

  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  skipProxyUrlNormalize: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/data/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, s-maxage=31536000, immutable" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
        ],
      },
      {
        source: "/((?!_next/static|_next/image|images|favicon|logo).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=60, stale-while-revalidate=300" },
        ],
      },
    ];
  },

  async redirects() {
    // ── Glossary numeric-suffix handling ─────────────────────────────────────
    // Auto-generated glossary slugs carry a numeric suffix (e.g. -0, -64).
    // They are already prevented from causing duplicate indexation WITHOUT
    // any redirect, because isLowValueGlossarySlug() makes them render
    // `noindex, follow` and excludes them from every sitemap.
    //
    // They are deliberately NOT redirected to a "clean" slug. A previous
    // revision of this file declared 115 permanent redirects to clean slugs
    // such as /glossary/mcp-auto-scaling/. 114 of those destinations do not
    // exist in src/data/glossary.ts and return 404 in production, so shipping
    // them would have turned 114 crawlable pages into permanent redirects
    // pointing at 404s — strictly worse than leaving them noindexed.
    //
    // A numeric slug may only be redirected once its clean replacement exists
    // as a real, quality-reviewed page. verify:redirects now asserts that every
    // destination declared here resolves, so this cannot regress silently.
    return [
      // Valid: destination exists in src/data/glossary.ts and returns 200.
      {
        source: "/glossary/mcp-readiness-probe-44/",
        destination: "/glossary/mcp-readiness-probe/",
        permanent: true,
      },

      // ── Duplicate-intent consolidation (2026-08-05) ────────────────────────
      // Each source below was a live, self-canonicalising `index, follow` page
      // competing with the destination for an identical primary search intent.
      // The destination is in every case the sitemap-declared canonical and the
      // taxonomy-consistent URL. Permanent redirects preserve link equity.
      {
        // 78% identical body copy; both targeted "MCP tools not appearing".
        source: "/troubleshooting/tools-not-appearing/",
        destination: "/troubleshooting/mcp-tools-not-appearing/",
        permanent: true,
      },
      {
        // Identical <title> and <h1>; both targeted "best MCP servers".
        source: "/best/best-mcp-servers/",
        destination: "/best/mcp-servers/",
        permanent: true,
      },
      {
        // /integrations/ holds SaaS apps; datastores belong under /databases/.
        source: "/integrations/postgresql-mcp-server/",
        destination: "/databases/postgresql-mcp-server/",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap-index.xml",
      },
      {
        source: "/glossary/mcp-host/",
        destination: "/pages/glossary/mcp-host/",
      },
      {
        source: "/mcp-architecture/",
        destination: "/pages/mcp-architecture/",
      },
      {
        source: "/tutorials/",
        destination: "/pages/tutorials/",
      },
      {
        source: "/clients/claude-desktop/",
        destination: "/pages/clients/claude-desktop/",
      },
      {
        source: "/clients/cursor/",
        destination: "/pages/clients/cursor/",
      },
      {
        source: "/security/prompt-injection/",
        destination: "/pages/security/prompt-injection/",
      },
      {
        source: "/security/authentication/",
        destination: "/pages/security/authentication/",
      },
      {
        source: "/troubleshooting/mcp-server-not-connecting/",
        destination: "/pages/troubleshooting/mcp-server-not-connecting/",
      },
      {
        source: "/deployment/docker/",
        destination: "/pages/deployment/docker/",
      },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
    optimizePackageImports: ["lucide-react", "recharts"],
  },
};

export default nextConfig;
