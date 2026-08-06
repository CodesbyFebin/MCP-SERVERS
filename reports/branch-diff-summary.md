# Branch Diff Summary (Phase 3)

## Tree topology
All three GitHub branches share root commit `cbe2dc50…`. Local `blog-migration-5000` and local `main` share a different root `a381a4b3…` — **they have no common ancestor with `origin/master`**. Branch-level `git merge` (with or without `--allow-unrelated-histories`) is therefore inappropriate; consolidation was done via **file-level port** onto `consolidation/single-master` created from `origin/master`.

## merge-base and left/right counts
```
git merge-base origin/master origin/main            → d690caef  (== origin/main; main is ancestor of master)
git merge-base origin/master origin/mesquite-sloth  → 997591f1
git merge-base origin/master main                   → (empty)   — DIFFERENT HISTORIES
git merge-base origin/master blog-migration-5000    → (empty)   — DIFFERENT HISTORIES

git rev-list --left-right --count origin/master...origin/main          → 20  0    (master 20 ahead, main 0 unique)
git rev-list --left-right --count origin/master...origin/mesquite-sloth → 73  1    (master 73 ahead, mesq 1 unique)
git rev-list --left-right --count origin/master...main                 → 94  1    (nominal — histories are disjoint)
git rev-list --left-right --count origin/master...blog-migration-5000  → 94  10   (nominal — histories are disjoint)
```

## Per-branch verdict
| Branch                    | Ahead of master | Verdict                 | Reason |
|---------------------------|-----------------|-------------------------|--------|
| `origin/main`             | 0               | `RETIRE_WITHOUT_MERGE`  | Fully contained in `origin/master`; nothing to preserve |
| `origin/mesquite-sloth`   | 1 (`dfc107e4`)  | Split-reject (not cherry-picked) | Every user-facing feature (llms.txt, glossary, pillars, workflows) already exists in newer form on `origin/master` AND `blog-migration-5000`. Only truly unique file is `public/robots.txt`, which is dead code because both master and blog-mig ship dynamic `app/robots.ts`. Package-lock churn discarded in favor of regeneration. |
| local `blog-migration-5000` | 10 commits + safety `6d2997db` | Selectively port  | Contains the SEO / publication-gating / SAFE-DEEP / 5000-page candidate work explicitly called out in the consolidation plan. Ported onto `consolidation/single-master` file-by-file, since branch-level merge is impossible. |

## Unique-commit inventory for `origin/mesquite-sloth`
`dfc107e4 chore: sync project dependencies and local node_modules for effect, zod, and auxiliary packages` (author: `openhands@all-hands.dev`, date `2026-07-20`).
Actual diff scope (misleading title):
- New: `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`, `app/glossary/[slug]/page.tsx`, content/glossary/*.md, content/pillars/*.md
- Rewrite: `app/learn/mcp-production-deployment/page.tsx` (+332), `app/api/telemetry/p99/route.ts`
- New workflows: `.github/workflows/content-update.yml`, `.github/workflows/refresh-data.yml`
- `public/.well-known/mcp-discovery` (new)
- `sitemap-glossary.xml`, `robots.ts` overhaul
- `next.config.js` +52
- `package.json` +3, `package-lock.json` +321
- New scripts: `add-india-glossary.mjs`, `generate-content.mjs`, `generate-llms-full.mjs`

Every one of those user-facing surfaces already exists in `origin/master` (a superset trunk) and in newer form on `blog-migration-5000`. See `reports/consolidation/DECISION-MATRIX.md` for the file-level matrix.
