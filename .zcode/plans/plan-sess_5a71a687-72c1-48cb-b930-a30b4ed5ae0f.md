# MCPserver.in — Server Entity Graph + Milestone 7 Completion

## Current Architecture Assessment

**What exists:**
- Web app server registry (`apps/web/src/content/server-registry.ts`) — contains 1 hardcoded entry (`mcp-server-postgres`)
- `/servers` aggregate page — correctly uses `getIndexableServers()` from registry helpers
- Static `/servers/mcp-server-postgres/page.tsx` — fully hardcoded, does NOT read from registry
- No dynamic route for server detail pages (`app/servers/[slug]/` does not exist)
- Shared packages provide types and `isServerIndexable()` but NO server data

**Critical issue:** The `mcp-server-postgres` entity in `server-registry.ts` has unsupported fields (version="none", empty capabilities[], tags without evidence, no repository/documentation URLs, no transports/auth) that lack evidence backing.

## Implementation Plan

### Phase 1: Refactor Server Registry to Adapter Pattern (apps/web/src/content/server-registry.ts)
- Convert from hardcoded data to thin web adapter
- Import shared types from `@mcp/servers-registry` 
- Source evidence from shared `@mcp/servers-evidence` where possible
- Keep `getIndexableServers()` using `isServerIndexable()` from registry package
- Remove duplicated entity data; keep only projection logic

### Phase 2: Create Dynamic Server Detail Route
- Create `apps/web/app/servers/[slug]/page.tsx` 
- Use `generateStaticParams()` from `getIndexableServers()`
- `notFound()` for non-indexable slugs
- Reusable `ServerDetailPage` component with evidence-backed fields only
- JSON-LD: `WebPage` + `SoftwareApplication` + `BreadcrumbList` (no fake ratings/offers)

### Phase 3: Audit & Fix Postgres Entity
- Null/remove unsupported fields: `version`, `capabilities`, `transports`, `authentication`, unsupported `tags`
- Keep only: `name`, `description`, `evidenceRefs`, `repository`, `documentationUrl`, `lastVerifiedAt`, `slug`
- Evidence items must map to `EvidencePanel` component

### Phase 4: Categories & Capabilities Pages
- `apps/web/app/categories/page.tsx` — derives from `getIndexableServers()`, groups by `tags`/`categories`
- `apps/web/app/capabilities/page.tsx` — derives from `getIndexableServers()`, groups by `capabilities`/`transports`
- Only count public indexable servers

### Phase 5: Cross-System Linking
- Add `getRelatedPublicServers(entry)` to `route-helpers.ts`
- Editorial pages: `relatedServerSlugs` → resolves through `getServerEntry` + `isServerIndexable`
- Server pages: reverse-link to editorial content via `categories`/`capabilities`/`explicit relations`

### Phase 6: Sitemap & LLMS Generation
- `apps/web/app/sitemap.ts` — combines editorial (`contentRegistry.filter(isContentIndexable)`) + server (`serverRegistry.filter(isServerIndexable)`) cohorts
- `apps/web/app/llms.txt/route.ts` — same public cohorts
- Exclude: draft, noindex, quarantine, unverified, retired

### Phase 7: Milestone 7 Server Reconciliation
- Create `reports/milestone-7-server-reconciliation.csv` structure
- Document legacy indexed server URL handling

### Phase 8: Tests & Gates
- Add tests for publication predicate enforcement
- Run: `npm run typecheck`, `npm run build` (with pipefail)

---

## Key Design Decisions

1. **Adapter over duplicate**: `server-registry.ts` becomes a projection layer, not a data source
2. **Single publication predicate**: `isServerIndexable()` from `@mcp/servers-registry` is the ONLY authority
3. **Evidence-backed only**: Server pages render only fields with evidence (null/omit unknown)
4. **Dynamic routing**: Only indexable servers get static pages via `generateStaticParams()`
5. **No fake data**: No AggregateRating, Review, Offer, price, downloadCount, certification without evidence

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `apps/web/src/content/server-registry.ts` | Refactor to adapter |
| `apps/web/app/servers/[slug]/page.tsx` | Create dynamic route |
| `apps/web/app/categories/page.tsx` | Create |
| `apps/web/app/capabilities/page.tsx` | Create |
| `apps/web/app/sitemap.ts` | Create |
| `apps/web/app/llms.txt/route.ts` | Create |
| `apps/web/src/content/route-helpers.ts` | Add `getRelatedPublicServers` |
| `apps/web/app/servers/page.tsx` | Verify quality |

Ready to implement.