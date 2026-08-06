# Branch Consolidation — Baseline (Phase 1–2)

**Repository:** `CodesbyFebin/MCP-SERVERS`
**Wired remote (added this session):** `https://github.com/CodesbyFebin/MCP-SERVERS.git`
**Working directory:** `/Users/cyberteck/Desktop/MCP-SERVERS-master`
**Default branch:** `master`

## Remote branch SHAs at start
| Ref                       | SHA                                         |
|---------------------------|---------------------------------------------|
| `origin/master`           | `2445fb32ea710ad86dcc5186ab2c8fce9141b698`  |
| `origin/main`             | `d690caef7fdb7b98fc672356fc67447e555e552c`  |
| `origin/mesquite-sloth`   | `dfc107e438cb205f721365208370b786e4c56ced`  |

## Local branch SHAs at start
| Ref                                              | SHA                                         |
|--------------------------------------------------|---------------------------------------------|
| `blog-migration-5000` (pre-safety)               | `9da658d41beffc6a77850a6f073e89ad73bce948`  |
| `main` (unrelated to `origin/main`)              | `a381a4b35ec7bed03f96455895a2edcda439cda7`  |

## Working tree state at start
- Branch checked out: `blog-migration-5000`
- Uncommitted: **211 files** already staged in index (208 modified + 3 new — `reports/publication-cohort.json`, `scripts/verify-entities.ts`, `scripts/verify-robots.ts`)
- No remote configured (`git remote -v` was empty)
- `gh` CLI absent

## Safety refs created (Phase 2)
Local backup branches (from remote tips):
- `backup/master-pre-consolidation`           → `2445fb32`
- `backup/main-pre-consolidation`             → `d690caef`
- `backup/mesquite-sloth-pre-consolidation`   → `dfc107e4`

Local safety commit for uncommitted WIP:
- `backup/pre-consolidation-blog-migration-5000` → `6d2997db` (parent `9da658d4`, adds the 211 staged files)

Tags (local only, not pushed):
- `backup-master-pre-consolidation`
- `backup-main-pre-consolidation`
- `backup-mesquite-sloth-pre-consolidation`

## Open PR references
- **#1** on `mesquite-sloth` — to be reconciled after consolidation merges

## No-secret / no-oversized-file confirmation
- **Secret scan (staged files only):** 0 high-confidence hits (sk-, ghp_, xoxb-, AKIA, AIza, JWT, PEM)
- **Broad keyword scan (`API_KEY|SECRET|TOKEN|PASSWORD|PRIVATE_KEY|VERCEL_TOKEN|GOOGLE_TOKEN`):** 41,118 hits, all documentation placeholders (`MCP_AUTH_TOKEN` in generated docs, `.env.example` placeholders, `MY_GEMINI_API_KEY` sample values). No real credentials.
- **`.env` files present:** only `.env.example` (allowlisted via `!.env.example` in `.gitignore`)
- **Files > 25 MB entering commit:** 0. Largest staged file was `public/sitemap-pages.xml` at 72 KB. Three files > 25 MB (`ENTITY_GRAPH.json`, `MCPSERVER_CONTENT_MANIFEST.json`, `reports/mcpserver-5000-url-master.json`) already tracked historically, none in this commit.
- **Gitignore posture:** current `.gitignore` covers `node_modules/`, `.next/`, `build/`, `dist/`, `coverage/`, `.env*` (`!.env.example`), `.vercel`, `*.log`, `git-history/`. No gitignored files leaked into index. No changes proposed.
