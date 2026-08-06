# Branch Consolidation — Final Report

## Baseline SHAs
| Ref                                          | SHA                                         |
|----------------------------------------------|---------------------------------------------|
| `origin/master`                              | `2445fb32ea710ad86dcc5186ab2c8fce9141b698`  |
| `origin/main`                                | `d690caef7fdb7b98fc672356fc67447e555e552c`  |
| `origin/mesquite-sloth`                      | `dfc107e438cb205f721365208370b786e4c56ced`  |
| Safety snapshot (WIP)                        | `6d2997db1c24e025400f8b21ccf8b90571613ad3`  |
| `consolidation/single-master` (this branch)  | *see commit log below*                       |

## Merge bases
- `origin/master ∩ origin/main` = `d690caef` (main is a subset of master)
- `origin/master ∩ origin/mesquite-sloth` = `997591f1`
- `origin/master ∩ blog-migration-5000` = *(no common ancestor — disjoint histories)*

## Unique commit counts
- `origin/main` — **0 ahead** of master → `RETIRE_WITHOUT_MERGE`
- `origin/mesquite-sloth` — 1 ahead (`dfc107e4`) → split-rejected (all substantive features already on master/blog-mig in newer form; only unique file `public/robots.txt` is dead code)
- `blog-migration-5000` — 10 unique commits + safety commit, disjoint history

## Per-branch decisions
| Branch                    | Decision                        |
|---------------------------|---------------------------------|
| `origin/main`             | `RETIRE_WITHOUT_MERGE`          |
| `origin/mesquite-sloth`   | Split-reject (nothing ported)   |
| `blog-migration-5000`     | File-level port (details below) |

## PR #1 disposition
Will be closed with a supersession comment after the consolidation PR merges. Every substantive change from `dfc107e4` is already on master or was reimplemented in newer form on `blog-migration-5000`, so PR #1 has no unique work to preserve. Backup ref `backup/mesquite-sloth-pre-consolidation` retained.

## Integration method
**File-level port** into a new branch `consolidation/single-master` created from `origin/master`. Ports done via `git checkout backup/pre-consolidation-blog-migration-5000 -- <scoped-path>` per logical directory group. No branch-level merge. No `--allow-unrelated-histories`. No force push. No history rewrite.

## Conflicts resolved
Only one substantive conflict:
- **`middleware.ts` vs `proxy.ts`.** Next.js 16.3 (blog-mig's target) renamed `middleware.ts` → `proxy.ts` and errors at build time if both are present. `proxy.ts` on blog-mig is a strict superset of master's `middleware.ts` (same PROTECTED_ROUTES, same DPDP `ALLOWED_COUNTRIES=['IN']` geo-block, same `verifySessionToken` + `SESSION_COOKIE_NAME` auth check, plus canonical-host / apex→www / trailing-slash / legacy-path redirects). Master's `middleware.ts` deleted, `proxy.ts` retained. Auth boundary preserved in full.

Also resolved without conflict, by explicit preservation of master file blobs:
- `content/pillars/mcp-server-architecture.md` — preserved from master (absent from blog-mig)
- `content/pillars/mcp-server-security.md` — preserved from master (absent from blog-mig)
- `vercel.json` — preserved from master (retains apex `mcpserver.in → www.mcpserver.in` permanent edge redirect as defense-in-depth alongside proxy.ts)

## Files changed on consolidation branch (vs origin/master)
- **8,056 files changed, +6,890,929 / −8,829**
- Breakdown by top-level directory:
  - `content/` — 7,442 (of which 5,000 are gated `content/generated/**` candidates)
  - `app/` — 219
  - `src/` — 88
  - `scripts/` — 75
  - `reports/` — 59
  - `.remediation/` — 38
  - `public/` — 27
  - `PAGE_BLUEPRINTS/` — 20
  - `tests/` — 15
  - `.safe-deep/` — 11
  - `docs/` — 5, `db/` — 4, `.github/` — 1
  - Root: `package.json`, `package-lock.json`, `next.config.js`, `tsconfig.json`, `next-env.d.ts`, `vitest.config.ts`, `validate-seo.ts`, `proxy.ts` (added), `middleware.ts` (deleted), 30+ top-level `*_REGISTRY.json` / `*_MANIFEST.json` / `*.md` docs

## Commits created
```
e2ff6336 chore: refresh next-env.d.ts to Next 16.3 auto-generated version
ba1ca429 fix(build): remove middleware.ts (superseded by proxy.ts in Next.js 16.3) + refresh verify evidence
43e87fbf chore(deps): regenerate package-lock.json against unified package.json
773e5d70 test: port tests/, .remediation/, PAGE_BLUEPRINTS/, reports/ + add consolidation report
7afa8f7a feat(content): port content/ tree (5000 generated candidate pages + refreshed glossary/pillars)
c8e3d5ba feat(gating): port SAFE-DEEP registries and top-level publication manifests
1ec017bc feat(seo): port public/, scripts/, and .github/workflows/ from blog-migration-5000
25d650cd feat(runtime): port app/, src/, docs/, db/ from blog-migration-5000
c203036c chore(config): unify root configs from blog-migration-5000
```

## Dependency / lockfile decision
- `package.json` taken from blog-mig (adds `vitest`, `@vitest/ui`, verify:* suite, content pipeline, db workflow, `verify:release` orchestrator, `start` script, `build --webpack`).
- `package-lock.json` **regenerated** via `npm install` against the unified `package.json`. Not copied from either branch. 372 packages resolved cleanly on Node v26.4.0 / npm 11.17.0.

## Publication-gating verification (Phase 9)
Single gated accessor at `src/lib/content/publication-registry.ts::getPublishedGeneratedPages()`, filtering:
```typescript
entry.gates?.publish_approved && entry.gates?.indexable
```
- `publish_approved` guard-count across app/src: **278**
- `indexable` guard-count across app/src: **10**
- Direct references to raw `content/generated/**` from app/src: **0 non-registry references** (only the registry itself and a comment)
- `content/generated` URLs in `public/sitemap-pages.xml`: **0**

## Verification suite results
| Check                                | Result                        |
|--------------------------------------|-------------------------------|
| `npm run typecheck`                  | ✅ Pass (0 errors)             |
| `npm run format:check`               | ✅ Pass                        |
| `npm test` (vitest)                  | ✅ 96/96 tests pass, 15 files  |
| `npm run seo:audit`                  | ✅ 0 errors, 0 warnings        |
| `npm run verify:content`             | ✅ 100 URLs pass               |
| `npm run verify:links`               | ✅ 100 URLs pass               |
| `npm run verify:intents`             | ✅ 7 intents valid             |
| `npm run verify:entities`            | ✅ 81 entities, 81 routes, 77 indexable |
| `npm run verify:robots`              | ✅ 2 groups, 1 sitemap ref     |
| `npm run verify:schema`              | ✅ All schema types pass       |
| `npm run verify:canonicals`          | ✅ 1071 sitemap URLs           |
| `npm run verify:glossary-indexation` | ✅ Rules valid                 |
| `npm run verify:redirects`           | ✅ 9 scenarios, 50 destinations resolve |
| `npm run verify:claims`              | ✅ 7869 files scanned          |
| `npm run verify:sitemaps`            | ✅ 1179 URLs, all 200 OK       |
| `npm run verify:publication-cohort`  | ⚠️ Pre-existing threshold report (see risks) |
| `npm run build`                      | ✅ Success — full prerender + SSG, Proxy middleware registered |

## Excluded files and reasons
- `public/robots.txt` (from mesquite) — **DROPPED**. Superseded by dynamic `app/robots.ts` in Next.js; static file is dead code.
- `middleware.ts` (from master) — **REMOVED** at build-fix stage. Superseded by `proxy.ts` in Next.js 16.3; keeping both is a build error. Full DPDP + auth logic preserved inside `proxy.ts`.
- `dfc107e4` from `origin/mesquite-sloth` — **NOT cherry-picked as a whole**. All user-facing features already exist elsewhere in newer form.
- No `node_modules/` was in any tree (confirmed) — nothing to exclude there.
- No `.env` beyond `.env.example` was in any tree.
- No files > 25 MB introduced by this port.

## Remaining risks
1. **`verify:publication-cohort` reports 200 pages below quality threshold and 200 near-duplicate approved pages.** These are pre-existing conditions on `blog-migration-5000` (confirmed by re-running the same check inside a worktree of the safety branch — identical 200/200 result). The script exit code is 0, so this is informational, not a hard failure. Content-quality remediation is out of scope for this consolidation and should be handled in a follow-up.
2. **`vercel.json` intentionally retained from master.** Blog-mig's version removed the apex→www edge redirect. That redirect is now duplicated at the app layer inside `proxy.ts`, so functionality is preserved even without the vercel.json rule, but keeping both is defense-in-depth against a proxy misconfig.
3. **CI has not yet run.** `npm run build` succeeded locally against Node v26.4.0; GitHub Actions may use a different Node version and needs to confirm.
4. **`gh auth login` was not completed autonomously.** Requires user interaction before the draft PR can be opened programmatically. The push itself may or may not need credential input depending on the user's git credential helper.
5. **Local `main` and local `blog-migration-5000` remain unpushed** on a disjoint history line. They are preserved indefinitely via `backup/pre-consolidation-blog-migration-5000` and `backup/main-pre-consolidation`. Deletion of these local branches should wait until after production verification + rollback window closes.
6. **`origin/main` and `origin/mesquite-sloth` retention.** Both should remain on GitHub until the consolidation PR is merged, master CI passes, and production is verified. Deletion happens in Phase 17 with `git push origin --delete`.

## Deletion readiness
Not yet. Deletion is gated on:
- ✅ Consolidation branch verifies locally
- ⏸ Consolidation branch pushed
- ⏸ Draft PR opened + reviewed
- ⏸ CI passes
- ⏸ Merged into master
- ⏸ Production deployment verified
- ⏸ PR #1 reconciled/closed
- Then and only then: `git push origin --delete main mesquite-sloth`
