# MCPserver.in Evidence Ledger v2 — Upgrade Baseline

Date: 2026-08-15

## Production boundary

- Repository: `CodesbyFebin/MCP-SERVERS`
- Authoritative branch: `master`
- Baseline commit: `1cb9564f7d00213db666897b7fdfe1729ab526f5`
- Framework: Next.js 16 / React 19
- Package manager: npm (`package-lock.json` present)
- Vercel project: `projects555/mcp-servers` (`prj_tVVi1uLaX8ZDxkHM00DVYwuQo304`)
- Production domains: `mcpserver.in`, `www.mcpserver.in`
- Vercel Node runtime: 24.x
- Experimental/reference repository explicitly excluded: `CodesbyFebin/MCP-SERVER`
- Draft release-gate PR: `#6` (`codex/evidence-ledger-v2` → `master`)

## Baseline build/release commands

- Typecheck: `npm run typecheck`
- Tests: `npm test`
- Build: `npm run build`
- Security: `npm run verify:security`
- Internal links: `npm run verify:links`
- Runtime sitemap health: `npm run verify:sitemap`
- Production verification: `npm run verify:production`

## Baseline evidence findings

1. `src/data/servers.ts` is the production seed inventory. Its category comments describe 76 raw seed records.
2. `vector-database-mcp-server` is a generic multi-provider concept rather than one resolvable server entity; Evidence Ledger v2 retires it from tracked entity counts, leaving 75 entity candidates.
3. `src/data/publishing.ts` previously treated the site's own editorial seed record as evidence for authentication, use cases, features, and relationships. This is circular self-evidence and can create false-positive `published` states.
4. Root `EVIDENCE_MANIFEST.json` is empty at the baseline commit.
5. Root `SAFE_DEEP_REPORT.json` is a generated-content quality report, not the 75-server evidence dataset. It must not be used as server provenance.
6. `/servers/` is a placeholder route at baseline.
7. The GitHub server article contains generated installation/runtime/capability assertions that are not backed by the empty root evidence manifest. Existing long-form content is therefore not grandfathered into verified publication.
8. `scripts/generate-llms-txt.mjs` and `scripts/generate-llms-full.mjs` contain unsupported authority, hosting, compliance, regional-infrastructure and server-count claims.
9. The homepage and shared marketing components contain unsupported hosting, pricing, uptime, regional, deployment and compliance positioning.
10. Global structured data includes a Bengaluru postal-address assertion and a hosted WebApplication description that are not evidence-qualified by the current ledger.

## Initial evidence-reviewed cohort

The first cohort is intentionally small and based on primary sources checked during this upgrade:

- `github-mcp-server` — GitHub's `github/github-mcp-server` repository.
- `stripe-mcp-server` — Stripe's `stripe/ai` repository documenting remote/local MCP usage.
- `postgres-mcp-server` — Model Context Protocol reference-server repository documenting `@modelcontextprotocol/server-postgres`.

Versions and properties not directly established by those sources remain `null`, empty, or unknown.

## Publication invariant

A server is indexable only when:

1. publication state is `published`;
2. verification state is `verified`; and
3. at least one attached evidence passage is explicitly `verified`.

The same predicate must drive server pages, sitemap server entries, public directory lists, LLM indexes, JSON feeds, JSON-LD, related-server surfaces, search and derived counts.

## Preview release blockers found and fixed on the feature branch

1. Vercel Linux install failed because `fsevents` had been accidentally promoted into `devDependencies`. It was removed from dependencies.
2. `.vercelignore` used unanchored `drafts/`, which caused Vercel to delete `src/lib/content/drafts/*` even though production TypeScript imports those modules. Ignore rules are now root-anchored.
3. The repository used `distDir: "dist"` with `output: "standalone"`. Next compiled successfully, but Vercel packaging then failed with `ENOENT` for `dist/next-server.js.nft.json`. The feature branch returns to Vercel-native Next.js output conventions instead of custom standalone packaging.

These fixes remain preview-only until a clean branch build and rendered-output crawl pass.

## Branch strategy

Implementation branch: `codex/evidence-ledger-v2`.

Do not update `master` until the branch build, Evidence Ledger tests, canonical/indexability checks, machine-feed checks, accessibility/security/performance gates, and representative preview crawl pass. Production verification must be performed against `www.mcpserver.in` after an approved merge/deployment.