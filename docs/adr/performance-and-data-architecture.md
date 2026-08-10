# ADR: Static-first performance and data architecture

## Status

Accepted

## Decision

MCPserver.in uses a **static-first Next.js architecture** for its public discovery, documentation, glossary, comparison, and editorial content. The repository currently does not use Prisma/RDS, BullMQ, or Redis as the source of truth for public server discovery.

Therefore we do **not** add RDS Proxy, BullMQ, or Redis merely to satisfy a generic infrastructure checklist. Those components should be introduced only when the product has a measured dynamic workload that benefits from them.

Public pages are optimized with:

- App Router static generation where content is known at build time.
- Vercel/CDN cache headers for public server, documentation, blog, and glossary routes.
- Stale-while-revalidate behavior for read-heavy content.
- Optimized AVIF/WebP image delivery through Next Image.
- No-store responses for API routes.
- A canonical, deduplicated sitemap containing only publishable URLs.

## Performance target

The realistic production objective is **low TTFB and high cache-hit rate**, not a universal public-internet p99 below 9 ms. Network distance alone makes that impossible for arbitrary users.

For future dynamic services, the preferred architecture is:

```text
Client
  -> Edge / CDN
  -> thin API validation layer
  -> durable queue (when asynchronous work is required)
  -> worker
  -> database/cache
```

Add Redis when repeated dynamic reads are measured as a bottleneck. Add a managed connection pool/proxy when a relational database is actually introduced. Add a dead-letter queue when durable asynchronous jobs exist.

## Why

Prematurely introducing RDS, Redis, or BullMQ would increase operational complexity and attack surface without improving the current static content workload. The correct optimization is to keep public content immutable/cacheable and move future mutable workloads behind explicit service boundaries.
