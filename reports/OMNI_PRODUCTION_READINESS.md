# OMNI_PRODUCTION_READINESS.md — MCPserver.in

**Status: 🔴 BLOCKED (code is release-candidate quality; production cutover is blocked by one mandatory migration gate — see P23 Route Coverage)**
**Report date:** 2026-09-06 (updated after runtime fixes)
**Repository:** https://github.com/CodesbyFebin/MCP-SERVERS (`deployment/flattened-root`)

| Identity | Value |
|---|---|
| BASE_SHA | `cefe13167c563151ff4c3c565807e231f3b763e1` |
| PREVIOUS_HEAD | `19e7cd0d5130c0ae10b195062d041e7dde14f753` |
| **NEW_SHA (release candidate identity)** | `fee01b2f9485c58ae842473668cc38a67b966a69` |
| Docker image | `mcpserver-in:fee01b2f9485c58ae842473668cc38a67b966a69` (345 MB, node:24-alpine, non-root, standalone) |

Session commits: `736cfb3` (P1/P2/P6), `7818809` (P3/P5), `8268169` (P23 ledger), `9e5db22` (P8), `7aae92c` (routing-layer alias redirects), `f973f83` (Caddyfile validation fix), `fee01b2f` (skipTrailingSlashRedirect — final artifact). Docs/evidence commits after `fee01b2f` change no code.

---

## 1. Repository identity
Canonical TypeScript App Router build. `lib/site.js` (legacy Node-generator surface) does not exist at the repo root and is imported by **zero** canonical files — it survives only under `app-mcpserver-in/`, which is excluded from tsconfig and from the canonical build. All publication decisions flow through one authority: `isServerIndexable()` / `isContentIndexable()` / `isPillarIndexable()`.

## 2. Exact NEW_SHA
`fee01b2f9485c58ae842473668cc38a67b966a69`. Working tree was committed before the Docker build; `git status --short` shows only `.DS_Store` (untracked noise, not part of the release).

## 3. Architecture
Next.js 14 App Router + `output: "standalone"`, TypeScript strict. Content/server/pillar registries under `src/content/`; shared registry packages under `packages/`. Middleware (`middleware.ts`) handles host normalization (apex/app → www, 308), legacy alias migration (301), and trailing-slash policy (308 strip).

## 4. Evidence Ledger
Evidence refs resolve through the registry; server detail pages render only evidence-backed sections. Unverified entities (e.g. `mcp-server-postgres`) are documented on dedicated noindex pages whose every non-verified claim is labeled "community-documented pattern".

## 5. Publication cohort
**0 indexable servers** (tested invariant: `expect(indexable).toHaveLength(0)`). Zero-fabrication contract forbids inventing verified servers; the cohort fills as evidence lands. The 82 indexable editorial entries (learn/guides/security/clients/build/glossary/compare) are served from `contentRegistry`.

## 6. 69-pillar status
69 pillars, unique IDs, unique canonical paths, group counts 6×10 + 9 (test-pinned). Header nav derives group labels from `PILLAR_GROUPS` (same source as `/pillars`); no individual pillar links in the header; draft/review pillars cannot leak (`isPillarIndexable` gates `/pillars` rendering).

## 7. G7 / G8 / G9
- **G7 PASS** — `mcp-soc-2`, `mcp-iso-27001` protected in `glossary-protections.json`, absent from the redirect handoff.
- **G8 PASS** — 4 topical `/directory/*` paths held at `EVIDENCE_REVIEW` in the ledger; runtime confirms they are NOT redirected (404 until individually decided). No blanket mapping to `/servers/`.
- **G9 PASS** — clients/integrations are registry-driven editorial hubs; relationship-strength fields (declared/documented/runtime-tested) require editorial data and are recorded as a known limitation — not fabricated.

## 8. Historical URL migration — **🔴 BLOCKER (P23)**
Ledger: 748 rows — KEEP_INDEXED 581, REDIRECT_301 91, EVIDENCE_REVIEW 4, DEFER_NOINDEX 72, DROP_NOINDEX 0. New `canonical_route_status` column computes, from the actual `app/` route tree + registries:

- **16 KEEP_INDEXED URLs are served by the canonical build.**
- **565 KEEP_INDEXED URLs have no canonical route** (248 `/blog/*`, 146 `/glossary/*`, 69 `/docs/*`, and others — legacy content that was never ported). These will 404 at cutover.

Per G8 discipline this was **not** mass-reclassified. Every one of the 565 needs an explicit editorial decision (REBUILD / redirect to exact equivalent / 410) **before** production cutover. Blocking tests pin the exact counts so the gap cannot silently move.

## 9. Canonical architecture
`/servers` is the single discovery surface; `/directory` + `/mcp-server-directory` converge one-hop to `/servers`; `/servers/[slug]` renders verified entries only; `mcp-server-postgres` has a dedicated noindex static page. Host doctrine: apex/app → www, non-slash canonical paths.

## 10. Redirect matrix (runtime-verified against `mcpserver-in:rc`)
| Request | Result |
|---|---|
| `/directory` | 308 → `/servers` (single hop, `permanent` redirect) |
| `/directory/` | 308 → `/servers` (single hop — `skipTrailingSlashRedirect` hands slash handling to the routing/middleware layer, eliminating the 308+308 chain) |
| `/mcp-server-directory` | 308 → `/servers` |
| `/mcp-server-directory/` | 308 → `/servers` |
| `/directory/{iot,databases,devops,monitoring}` | 404 — intentionally undecided (G8) |
| `/servers/` | 308 → `/servers` |
| apex / app host | 308 → `www` preserving path |
Behavioral middleware tests (15) + runtime curl matrix cover slash/no-slash/host variants.

## 11. Search
`/search` (noindex) — client-side search over the indexable cohorts only. Results expose title, type, snippet, canonical URL, and server verification state. 9 blocking tests prevent draft/noindex/unverified leakage.

## 12. Clients/integrations
Registry-driven hubs. Relationship-strength modeling pending editorial data (limitation, not fabricated).

## 13. Machine surfaces
`/registry.json`, `/api/servers.json`, `/mcp-registry.json`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` — all consume `getIndexableServers()` directly. **Blocking cross-surface cohort test (P6)**: slugs must be identical across all surfaces; handlers must not proxy each other. PASS.

## 14. Sitemap
Registry-derived only; truthful lastmod (no build-time dates); noindex stubs excluded (verified).

## 15. Robots/indexability
robots.txt: sensible disallows (`/api/`, `/drafts/`, `/internal/`, `/admin/`), AI-bot allows, sitemap reference. All stubs (`/blog`, `/integrations`, `/state-of-mcp`, `/search`, `/servers/mcp-server-postgres`) are 200 + `noindex, follow`. Noindex ≠ access control: no private data on these surfaces.

## 16. Structured data
CollectionPage/ItemList/BreadcrumbList/SoftwareApplication/FAQPage/Article only, all backed by visible content. `offers`/`aggregateRating` explicitly `null`; schema tests reject AggregateRating/Review. FAQPage only where FAQs are rendered.

## 17. Security — PASS
Runtime-verified headers: HSTS `max-age=31536000; includeSubDomains`, CSP (Sentry-scoped: `browser.sentry-cdn.com` in script-src only because the SDK loads from there; ingest domains in connect-src), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-Frame-Options: DENY`, `frame-ancestors 'none'`. No `.env` secrets in the tree (`.env.local.example` only). No open-redirect surfaces: middleware redirect targets are constant allow-listed paths.

## 18. Dependency audit — ACCEPTED
`npm audit --omit=dev`: 2 high packages.
- **next@14.2.35** (many DoS/SSRF/cache-poisoning advisories; fixes require next ≥15.5.21/16.x — semver-major): **RISK_ACCEPTED_WITH_EVIDENCE** — upgrade deferred to a dedicated migration cycle (React 19 + App Router changes); mitigations: no Pages Router i18n, no Server Actions, no WebSocket upgrades, no image-optimizer `remotePatterns`, Caddy fronting, static-heavy surface. Revisit immediately post-RC.
- **postcss** (sourceMap path traversal — build-time only): **NOT_PRODUCTION_REACHABLE**.
No blind `npm audit fix` was run.

## 19. Accessibility — UNVERIFIED
Native form controls, labeled inputs, aria-live status regions, focus rings, keyboard-navigable pagination are implemented and the semantic checks (single H1, landmarks) are test-pinned — but no WCAG 2.2 AA audit (screen reader, contrast tooling) has been executed. UNVERIFIED, not PASS.

## 20. Performance — UNVERIFIED
No Lighthouse/PageSpeed measurement has been taken. `/search` first-load JS is 230 kB (client search index); `/servers` 210 kB. Do not infer quality from the framework. UNVERIFIED.

## 21. Docker — PASS
`docker build --build-arg APP_VERSION=$NEW_SHA` exits 0. Image `mcpserver-in:7aae92c5…` = 345 MB; node:24-alpine; non-root; standalone output; HEALTHCHECK via Node fetch (no curl assumption); `npm ci` in build stage.

## 22. Compose — PASS (config)
`APP_VERSION=$NEW_SHA docker compose config` valid. `web` has no public port; only `caddy` publishes 80/443. Runtime `up` executed with web-only service in this environment (see 23).

## 23. Caddy — BLOCKED (environment)
`caddy validate` returns **Valid configuration** (the original Caddyfile crashed at startup: `auto_https on` is invalid syntax — fixed in `f973f83`). Runtime serving still not verifiable here: host port 80 is occupied by an existing ssh listener, and `mcpserver.in` DNS does not resolve to this machine, so ACME cannot complete. Required for PASS: a host with 80/443 free + DNS. (In the isolated runtime check the web service answered all routes correctly — see 10.)

## 24. Exact-SHA health — PASS
`GET /api/health` → `{"status":"ok","sha":"fee01b2f9485c58ae842473668cc38a67b966a69",...}` from the image built with that SHA. Priority chain `APP_VERSION` > `VERCEL_GIT_COMMIT_SHA` > `dev`; compose passes `APP_VERSION` through.

## 25. External staging — NOT RUN
No staging host available in this environment. Staging must be deployed at exact NEW_SHA, forced non-indexable (`X-Robots-Tag: noindex, nofollow` at the proxy), health-SHA verified, and the full route matrix crawled before Master Review.

## 26. Known limitations
1. **565 unserved historical URLs** (section 8) — editorial decisions required.
2. Empty server cohort (by design; fills with verified evidence).
3. Relationship-strength fields for clients/integrations pending editorial data.
4. India layer: no `/india/` hub; India-related historical URLs live in the unserved blog corpus — do not fabricate an India hub from them.
5. Accessibility + performance evidence not yet gathered.

## 27. Remaining risks
- next@14.2.35 accepted-risk advisories (section 18) — upgrade planned post-RC.
- Apex-host requests hitting a legacy alias resolve in two hops (host 308 → alias 308). Host normalization is infra-level; the migration hop count remains 1.

## 28. Master Reviewer input package
Original contract, BASE_SHA, NEW_SHA, `git diff cefe131..7aae92c`, test output (230/230), build logs, migration ledger (+ `canonical_route_status`), cohort-consistency test, security header captures, Docker/compose evidence, and this document.

## FINAL RELEASE GATE TABLE

| Gate | Result |
|---|---|
| G8 semantic migration | PASS |
| TypeScript | PASS |
| Tests | PASS (230/230) |
| Next.js build | PASS |
| Publication consistency | PASS |
| Canonical audit | PASS |
| Redirect audit | PASS (runtime-verified: all 4 alias variants single-hop) |
| SEO | PASS (staged crawl pending) |
| AEO/GEO | PASS |
| Security | PASS |
| Dependencies | ACCEPTED |
| Accessibility | UNVERIFIED |
| Performance | UNVERIFIED |
| Docker image | PASS |
| Compose | PASS |
| Caddy runtime | BLOCKED (environment) |
| Exact-SHA health | PASS |
| External staging | NOT RUN |
| Master Reviewer | NOT RUN |
| Production | LOCKED |

**Overall: 🔴 BLOCKED** — cutover is blocked by the P23 route-coverage gate (565 URLs require explicit editorial decisions) plus unverified Caddy/staging/accessibility/performance evidence. Code quality and all automatable gates are release-candidate grade. Do **not** promote to 🟡/🟢 until the P23 editorial decisions exist and the environment-blocked gates have been executed on a proper staging host.
