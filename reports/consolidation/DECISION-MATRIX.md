# File-level Decision Matrix — Consolidation of `master`, `origin/mesquite-sloth`, and local `blog-migration-5000`

## Baseline SHAs
- `origin/master`           `2445fb32ea710ad86dcc5186ab2c8fce9141b698`
- `origin/main`             `d690caef7fdb7b98fc672356fc67447e555e552c`
- `origin/mesquite-sloth`   `dfc107e438cb205f721365208370b786e4c56ced`
- local `blog-migration-5000` HEAD `9da658d41beffc6a77850a6f073e89ad73bce948`
- safety snapshot           `6d2997db1c24e025400f8b21ccf8b90571613ad3` (`backup/pre-consolidation-blog-migration-5000`)

## Tree topology
- `origin/master`, `origin/main`, `origin/mesquite-sloth` share root `cbe2dc50…`
- `origin/main` = zero commits ahead of master  → **RETIRE_WITHOUT_MERGE**
- `origin/mesquite-sloth` = 73 behind, 1 ahead. Unique commit `dfc107e4` looked like a dep sync, is really substantial feature work by an AI agent
- Local `main` + `blog-migration-5000` share root `a381a4b3…` (a SNAPSHOT of the GitHub tree taken at some past date). They have **no common ancestor** with `origin/master`, so branch-level merge cannot be used
- Consolidation is done as **file-level port** onto `consolidation/single-master` (created from `origin/master`)

## File inventory
| Tree                                            | Files |
|-------------------------------------------------|-------|
| `origin/master`                                 |   316 |
| `origin/mesquite-sloth`                         |   180 |
| `backup/pre-consolidation-blog-migration-5000`  | 8,190 |

| Set                                                                 | Count |
|---------------------------------------------------------------------|-------|
| In master, not in blog-mig                                          |     3 |
| In mesquite, not in master, not in blog-mig                         |     1 |
| In blog-mig, not in master                                          | 7,877 |
| Common master ∩ blog-mig                                            |   313 |
| Common but content-DIFFERENT (blog-mig has newer)                   |   169 |
| Common and byte-identical                                           |   144 |

## Files preserved from master
| File                                              | Reason                                                          | Verdict          |
|---------------------------------------------------|-----------------------------------------------------------------|------------------|
| `middleware.ts`                                   | DPDP geo-block + session-auth gate for /dashboard and /api/v1/* | **KEEP_MASTER**  |
| `content/pillars/mcp-server-architecture.md`      | Pillar page absent from blog-mig                                | **KEEP_MASTER**  |
| `content/pillars/mcp-server-security.md`          | Pillar page absent from blog-mig                                | **KEEP_MASTER**  |
| `vercel.json`                                     | apex `mcpserver.in` → `www.mcpserver.in` permanent redirect     | **KEEP_MASTER**  |

## Files ported from blog-migration-5000
All other overlapping files (169 changed common files) plus 7,877 new files.

| Category                          | Path                                     | Count | Verdict               |
|-----------------------------------|------------------------------------------|-------|-----------------------|
| Generated candidate pages         | `content/generated/**`                   | 5,000 | `PORT_BLOG_MIGRATION` |
| SAFE-DEEP registries + evidence   | `.safe-deep/**`                          |    11 | `PORT_BLOG_MIGRATION` |
| Remediation baseline              | `.remediation/**`                        |    38 | `PORT_BLOG_MIGRATION` |
| Regression tests                  | `tests/**`                               |    15 | `PORT_BLOG_MIGRATION` |
| Page blueprints                   | `PAGE_BLUEPRINTS/**`                     |    20 | `PORT_BLOG_MIGRATION` |
| App routes                        | `app/**`                                 |   256 | `PORT_BLOG_MIGRATION` |
| Source lib/components/data        | `src/**`                                 |   140 | `PORT_BLOG_MIGRATION` |
| Scripts (SEO/verify/content/db)   | `scripts/**`                             |    91 | `PORT_BLOG_MIGRATION` |
| Public assets + sitemaps          | `public/**`                              |    43 | `PORT_BLOG_MIGRATION` |
| Reports/evidence                  | `reports/**`                             |    46 | `PORT_BLOG_MIGRATION` |
| Content (glossary + rest)         | `content/**` (except two pillars above)  | 2,440 | `PORT_BLOG_MIGRATION` |
| Docs                              | `docs/**`                                |     8 | `PORT_BLOG_MIGRATION` |
| Root configs                      | `package.json`, `next.config.js`, `tsconfig.json`, `next-env.d.ts`, `postcss.config.mjs`, `vitest.config.ts`, `validate-seo.ts`, `proxy.ts` | 8 | `PORT_BLOG_MIGRATION` |
| CI workflows                      | `.github/workflows/**`                   |     5 | `PORT_BLOG_MIGRATION` |
| Db migrations/seed                | `db/**`                                  |     5 | `PORT_BLOG_MIGRATION` |
| Packages                          | `packages/**`                            |     6 | `PORT_BLOG_MIGRATION` |
| Research notes                    | `research`                               |     1 | `PORT_BLOG_MIGRATION` |
| Kilo config                       | `.kilo/**`                               |     1 | `PORT_BLOG_MIGRATION` |

## Dropped / rejected
| File / Change                                | Reason                                                                                                                     | Verdict                  |
|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|--------------------------|
| `public/robots.txt` (mesquite-only add)      | Superseded by dynamic `app/robots.ts` in both master and blog-mig; Next.js serves the dynamic route, static file dead code | `DROP_STALE`             |
| `dfc107e4` as a whole                        | Every user-facing feature it introduced (llms.txt routes, glossary, pillars, workflows) already exists in newer form on master and blog-mig | Split-reject (not cherry-picked) |
| `origin/main`                                | Zero unique commits vs master                                                                                              | `RETIRE_WITHOUT_MERGE`   |

## Dependency / lockfile decision
- `package.json` — take blog-mig version. It adds:
  - `vitest`, `@vitest/ui` (test framework)
  - test/format-check/typecheck orchestrators
  - full `verify:*` suite (content, links, intents, entities, robots, canonicals, schema, redirects, sitemaps, claims, generated-*, publication-cohort)
  - content/publication pipeline scripts (`content:build`, `publication:build`, `verify:publication`, `report:publication`, `generate:5000-content`)
  - db workflow scripts (`db:migrate`, `db:seed`, `db:setup`)
  - `verify:release` orchestrator that runs the whole gauntlet
  - `start` script; `build` switched to `next build --webpack`
- `package-lock.json` — **regenerate** with `npm install` from the final `package.json`. Do NOT copy the lockfile from blog-mig or mesquite unchanged.

## Publication-gating verification (Phase 9 pre-check)
Consumers of `content/generated/**` must filter:
```typescript
page.status === "publish_approved" &&
page.publish_approved === true &&
page.indexable === true
```
This condition is documented in `blog-migration-5000`'s gated route layer and verified via `verify:publication-cohort` and `verify:generated-*` scripts (all included in the port). Cohort report at `reports/publication-cohort.json` (from safety commit).

## Commit plan
The port lands on `consolidation/single-master` as the following logical commits:

1. `chore(config): unify root configs from blog-migration-5000; preserve master vercel.json` (package.json, next.config.js, tsconfig.json, next-env.d.ts, postcss.config.mjs, vitest.config.ts, validate-seo.ts, proxy.ts)
2. `feat(runtime): port app/ and src/ from blog-migration-5000; preserve master middleware.ts` (app/, src/, docs/, packages/, db/, research)
3. `feat(seo): port public/, scripts/, and .github/workflows/ from blog-migration-5000` (public/, scripts/, .github/)
4. `feat(gating): port .safe-deep/ registries and top-level publication/entity manifests` (.safe-deep/, PUBLICATION_REGISTRY.json, ENTITY_GRAPH.json, ROUTE_REGISTRY.json, INTERNAL_LINK_GRAPH.json, MCPSERVER_CONTENT_MANIFEST.json, etc.)
5. `feat(content): port content/generated/** (5000 candidate pages), glossary, and pillars from blog-migration-5000; preserve two master-only pillars` (content/, .kilo/)
6. `test: port tests/, .remediation/, PAGE_BLUEPRINTS/, and reports/ from blog-migration-5000`
7. `chore(deps): regenerate package-lock.json against unified package.json`
