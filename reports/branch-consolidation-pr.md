## Summary

Consolidates the three existing branches (`master`, `main`, `mesquite-sloth`) into a single production trunk by porting the newer publication-gating, SAFE-DEEP, and 5,000-page candidate work from a disjoint local history line onto `origin/master`. No force push, no history rewrite, no `--allow-unrelated-histories`. All work preserved on backup refs regardless of the outcome of this PR.

## Branch state before consolidation

| Ref                     | Ahead of master | Behind master | Verdict                       |
|-------------------------|-----------------|---------------|-------------------------------|
| `origin/master`         | —               | —             | **AUTHORITATIVE**             |
| `origin/main`           | 0               | 20            | `RETIRE_WITHOUT_MERGE`        |
| `origin/mesquite-sloth` | 1 (`dfc107e4`)  | 73            | Split-reject (no cherry-pick) |
| local `blog-migration-5000` | disjoint history | disjoint history | **File-level port** onto master (source of the newer work) |

## Why `main` requires no merge

`origin/main` = `d690caefdb7fdb7b98fc672356fc67447e555e552c`; the merge-base of `origin/master` and `origin/main` is `origin/main` itself. `git log origin/master..origin/main` returns nothing. `origin/main` is fully contained in `origin/master`.

## Why `mesquite-sloth`'s one unique commit was not cherry-picked

`dfc107e4` bills itself as a dep sync but is actually substantive AI-agent (`openhands@all-hands.dev`) feature work: new llms.txt/glossary/pillar/discovery routes, workflow files, telemetry+production-deployment rewrites, next.config.js expansion, and lockfile churn. **Every one of those user-facing surfaces already exists on `origin/master` and (in newer form) on `blog-migration-5000`.** The only file `mesquite-sloth` has that neither of the others has is `public/robots.txt`, which is dead code — both master and blog-mig ship a dynamic `app/robots.ts` that supersedes any static robots.txt in Next.js. See `reports/branch-diff-summary.md` for the full analysis.

## Integration method

**File-level port**, not branch merge. Local `blog-migration-5000` shares no ancestor with `origin/master` (both roots differ), so `git merge` is inappropriate even with `--allow-unrelated-histories`. Ports applied via path-scoped `git checkout backup/pre-consolidation-blog-migration-5000 -- <dir>/` in logical directory groups.

## Files changed

**8,056 files, +6,890,929 / −8,829.** Breakdown:
- `content/` — 7,442 (of which 5,000 are gated `content/generated/**` candidates that do NOT appear in any sitemap or public route)
- `app/` — 219
- `src/` — 88
- `scripts/` — 75
- `reports/` — 59
- `.remediation/` — 38
- `public/` — 27, `PAGE_BLUEPRINTS/` — 20, `tests/` — 15, `.safe-deep/` — 11
- `docs/`, `db/`, `.github/`, root configs (`package.json`, `next.config.js`, `tsconfig.json`, `vitest.config.ts`, `validate-seo.ts`, `proxy.ts` added, `middleware.ts` deleted, `next-env.d.ts`), and 30+ top-level `*_REGISTRY.json` / `*_MANIFEST.json` / `*.md` docs

Full decision matrix: `reports/consolidation/DECISION-MATRIX.md`.

## Preserved from master (explicit)

| File                                          | Reason |
|-----------------------------------------------|--------|
| `content/pillars/mcp-server-architecture.md`  | Absent from blog-mig |
| `content/pillars/mcp-server-security.md`      | Absent from blog-mig |
| `vercel.json`                                 | apex `mcpserver.in` → `www.mcpserver.in` edge-level permanent redirect (kept as defense-in-depth; proxy.ts also enforces it) |

## Conflicts resolved

- **`middleware.ts` vs `proxy.ts`.** Next.js 16.3 renamed `middleware.ts` → `proxy.ts` and refuses to build when both are present. Blog-mig's `proxy.ts` is a strict superset of master's `middleware.ts` — identical PROTECTED_ROUTES, identical DPDP `ALLOWED_COUNTRIES=['IN']` geo-block, identical `verifySessionToken` + `SESSION_COOKIE_NAME` auth path — plus canonical-host / apex→www / trailing-slash / legacy-path redirects. `middleware.ts` deleted; auth boundary preserved in full.

## Verification commands (all run locally)

| Command                                | Result |
|----------------------------------------|--------|
| `npm run typecheck`                    | ✅ 0 errors |
| `npm run format:check`                 | ✅ pass |
| `npm test`                             | ✅ 96/96 tests, 15 files |
| `npm run seo:audit`                    | ✅ 0 errors, 0 warnings |
| `npm run verify:content`               | ✅ 100 URLs |
| `npm run verify:links`                 | ✅ 100 URLs |
| `npm run verify:intents`               | ✅ 7 intents |
| `npm run verify:entities`              | ✅ 81 entities / 81 routes / 77 indexable |
| `npm run verify:robots`                | ✅ 2 groups |
| `npm run verify:schema`                | ✅ all schema types |
| `npm run verify:canonicals`            | ✅ 1071 URLs |
| `npm run verify:glossary-indexation`   | ✅ rules valid |
| `npm run verify:redirects`             | ✅ 9 scenarios, 50 destinations |
| `npm run verify:claims`                | ✅ 7869 files |
| `npm run verify:sitemaps`              | ✅ 1179 / 1179 200 OK |
| `npm run verify:publication-cohort`    | ⚠️ pre-existing 200/200 threshold report (see risks) |
| `npm run build`                        | ✅ success — SSG + prerender + Proxy registered |

## Publication-gating verification

The 5,000 generated candidate pages are surfaced through a **single** gated accessor `src/lib/content/publication-registry.ts::getPublishedGeneratedPages()`, which enforces:

```typescript
entry.gates?.publish_approved && entry.gates?.indexable
```

- 278 `publish_approved` guards across `app/`+`src/`
- 10 `indexable` guards across `app/`+`src/`
- 0 direct references to raw `content/generated/**` from routes or lib (only inside the registry itself and its docblock)
- 0 `content/generated` URLs in `public/sitemap-pages.xml`
- Fresh cohort report written to `reports/publication/cohort.json`

## Dependency / lockfile

- `package.json` taken from blog-mig (adds vitest, verify:*, content pipeline, db workflow, `verify:release` orchestrator).
- `package-lock.json` **regenerated** from unified `package.json` via `npm install`. Not copied from any branch. 372 packages, no peer-dep conflicts, only deprecation warnings for transitive `@vercel/postgres` and `node-domexception`.

## Production impact

- Public content surface unchanged relative to `blog-migration-5000`'s intended state (candidate pages remain gated; sitemap counts identical).
- `proxy.ts` replaces `middleware.ts`; auth boundary unchanged.
- New verify:* scripts wired into `package.json` for future CI/release gating.
- Edge-level apex→www redirect retained in `vercel.json`.

## Rollback references (all local, never pushed unless requested)

| Ref                                              | Points at                                              |
|--------------------------------------------------|--------------------------------------------------------|
| `backup/master-pre-consolidation`                | `2445fb32` (`origin/master` tip at start of session)   |
| `backup/main-pre-consolidation`                  | `d690caef` (`origin/main` tip at start of session)     |
| `backup/mesquite-sloth-pre-consolidation`        | `dfc107e4` (`origin/mesquite-sloth` tip)               |
| `backup/pre-consolidation-blog-migration-5000`   | `6d2997db` (safety commit of local WIP)                |
| Tags: `backup-master-pre-consolidation`, `backup-main-pre-consolidation`, `backup-mesquite-sloth-pre-consolidation` | same as above |

Rollback = `git push origin backup/master-pre-consolidation:master --force-with-lease` (only if truly needed).

## Branch deletion plan

Deletion is gated on:
1. This PR merges into `master`
2. GitHub Actions on `master` pass
3. Vercel production deployment is verified (homepage, robots.txt, sitemap index, key canonicals, security headers, no candidate-page leakage)
4. PR #1 reconciled + closed

Only then:
```bash
git push origin --delete main
git push origin --delete mesquite-sloth
```
Backups (`backup/*` local branches + tags) are retained through the rollback window.

## Remaining risks

1. **`verify:publication-cohort`** reports 200 pages below quality threshold and 200 near-duplicate approved pages. Pre-existing on blog-mig (confirmed via worktree re-run); exit-code 0 so informational, not blocking. Content quality remediation follows in a separate PR.
2. CI-side Node version may differ from local Node v26.4.0 used to regenerate the lockfile; monitor first CI run.
3. `verify:production` was NOT run pre-merge because it targets a deployed URL; run after the first Vercel deploy from master.

## Test plan (post-merge)

- [ ] Watch GitHub Actions CI on the merged commit; all required checks green
- [ ] Wait for Vercel to deploy master
- [ ] Curl `https://www.mcpserver.in/` — expect 200
- [ ] Curl `https://mcpserver.in/` — expect 308 → `https://www.mcpserver.in/`
- [ ] Curl `https://www.mcpserver.in/robots.txt` — expect dynamic robots.ts output with 1 sitemap reference
- [ ] Curl `https://www.mcpserver.in/sitemap.xml` — expect sitemap index with no `content/generated/**` URLs
- [ ] Curl `https://www.mcpserver.in/dashboard/` from non-IN IP — expect 403 DPDP block
- [ ] Curl `https://www.mcpserver.in/api/v1/servers` without session cookie — expect 401
- [ ] Run `npm run verify:production` against the live URL
- [ ] Close PR #1 with supersession comment
- [ ] `git push origin --delete main mesquite-sloth`
