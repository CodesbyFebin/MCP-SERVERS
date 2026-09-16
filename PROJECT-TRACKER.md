# PROJECT-TRACKER.md

**Phase:** 4 (IN_PROGRESS)  
**Last Updated:** 2026-09-10  
**Workspace:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`  

## Implementation Tracker

| # | Task | Status | Priority | Notes |
|---|------|--------|----------|-------|
| 1 | Create 01-GSC-VALID-URL-INVENTORY.csv | ✅ COMPLETE | High | Based on available data; no real GSC export found |
| 2 | Create 02-URL-MIGRATION-LEDGER.csv | ✅ COMPLETE | High | URL dispositions and canonical mappings |
| 3 | Create 03-CONTENT-SOURCE-MAP.csv | ✅ COMPLETE | High | Source repository and generation provenance mapping |
| 4 | Create 00-REPOSITORY-FORENSICS.md | ✅ COMPLETE | High | Repository analysis, git metadata, live provenance |
| 5 | Create 04-DUPLICATE-ROUTE-AUDIT.md | ✅ COMPLETE | High | 5000 candidates audited; no duplicates found |
| 6 | Create 05-TARGET-ARCHITECTURE.md | ✅ COMPLETE | High | Full architecture specification with publication predicate |
| 7 | Locate and import GSC export | ❌ BLOCKED | High | No GSC API token; search-console.json shows pending-external-access |
| 8 | Record local git remote, branch, HEAD SHA | ❌ BLOCKED | High | No shell tool available in this session |
| 9 | Map live deployment SHA to source repository | ❌ BLOCKED | High | Health SHA `d80c461505304679b12c1ce225b6d1d0dc501ff9` does not match any GitHub HEAD |
| 10 | Complete internal linking optimization (1,360 broken links) | ⏳ IN_PROGRESS | Medium | Quality gate remediation needed |
| 11 | Advance AEO/GEO maturity (currently improving) | ⏳ IN_PROGRESS | Medium | Quality score: 86/100 overall; content quality 5/10 |
| 12 | Resolve robots.txt discrepancy (live vs local) | ⏳ IN_PROGRESS | Medium | Live allows GPTBot/ClaudeBot/PerplexityBot; local blocks them |
| 13 | Phase gate: publish_approved && published && indexable | ⏳ IN_PROGRESS | High | ROUTE_REGISTRY.json indexed_candidates: 0; live has 82 editorial entries |
| 14 | Crawl live sitemap and llms route families | ⏳ IN_PROGRESS | Medium | Live sitemap has 1101 URLs; llms.txt and llms-full.txt verified |
| 15 | Create required reports for launch gate | ⏳ IN_PROGRESS | High | All 7 required reports now generated |
| 16 | Validate publication predicates across all surfaces | ⏳ IN_PROGRESS | High | Canonical consolidation, sitemap, registry, llms surfaces |
| 17 | Block implementation until URL preservation gates pass | 🟡 PENDING | Critical | KEEP_INDEXED_UNSERVED = 0 required before launch |

## Phase Progression

| Phase | Status | Deliverables | Next Phase |
|-------|--------|-------------|------------|
| 1 | COMPLETE | Initial audit, data collection | 2 |
| 2 | COMPLETE | Route registry, content inventory generation | 3 |
| 3 | COMPLETE | Repository forensics, duplicate audit, target architecture | 4 |
| 4 | IN_PROGRESS | Report creation, gap analysis, GSC/git provenance | 5 |
| 5 | PENDING | All gates pass, implementation launch | - |

## Blocked Gates (Must Resolve Before Launch)

| Gate | Current Status | Required Action |
|------|----------------|-----------------|
| GSC export located and imported | BLOCKED | Obtain GSC API token or use IndexNow data exclusively |
| Local git remote/branch/HEAD recorded | BLOCKED | Run `git remote -v`, `git branch --show-current`, `git rev-parse HEAD` |
| Live deployment SHA provenance | BLOCKED | Map `d80c461505304679b12c1ce225b6d1d0dc501ff9` to source commit |
| KEEP_INDEXED_UNSERVED = 0 | PENDING | Ensure all indexed URLs have publish_approved && published && indexable |
| Content quality > 90 average | PENDING | Remediate from current 54 average |
| Internal linking > 0 broken links | PENDING | Fix 1,360 identified broken links |
| AEO/GEO maturity "Passing" | PENDING | Advance from "Improving" status |
| robots.txt policy consistency | PENDING | Harmonize live vs local crawler directives |

## Completed Deliverables (as of 2026-09-10)

- [x] `reports/01-GSC-VALID-URL-INVENTORY.csv` - GSC-valid URL inventory
- [x] `reports/02-URL-MIGRATION-LEDGER.csv` - URL migration ledger with dispositions
- [x] `reports/03-CONTENT-SOURCE-MAP.csv` - Content source mapping
- [x] `reports/00-REPOSITORY-FORENSICS.md` - Repository forensics report
- [x] `reports/04-DUPLICATE-ROUTE-AUDIT.md` - Duplicate route audit (5000 candidates, 0 duplicates)
- [x] `reports/05-TARGET-ARCHITECTURE.md` - Target architecture specification
- [x] `PROJECT-TRACKER.md` - Project workstream tracker

## Remaining Workstreams

| Workstream | Priority | Estimate | Blocked By |
|------------|----------|----------|------------|
| GSC property setup and data import | High | 1-2 days | No GSC API token |
| Local git metadata recording | High | <1 day | No shell tool |
| Live deployment SHA provenance mapping | High | 1-2 days | SHA mismatch with GitHub |
| Content quality improvement | Medium | 5-10 days | None (in progress) |
| Internal linking optimization | Medium | 3-5 days | None (1,360 broken) |
| AEO/GEO maturity advancement | Medium | 3-5 days | None (currently improving) |
| robots.txt policy harmonization | Medium | 1 day | Live vs local discrepancy |
| Phase gate validation and launch | Critical | Depends on above | All blocked gates |

## Key Decisions Preserved

- `CodesbyFebin/MCP-SERVERS` = canonical public-site repository (master branch)
- `CodesbyFebin/Indian-MCP-Server` = reserved for `app.mcpserver.in` (currently 404)
- `MCP-SERVER` and `mcp-servers-master` = migration/reference sources, not competing authorities
- `https://www.mcpserver.in/` = canonical host with trailing slash enforcement
- Single publication predicate across all surfaces (HTML, sitemap, registry, LLM)
- Claim-specific evidence only; unknown remains unknown
- Verification does not imply safety, compliance, approval, or regulatory status
- `www.mcpserver.in` focused on discovery, evidence, knowledge, SEO/AEO/GEO, public registries
- `app.mcpserver.in` (when active) focused on approvals, deployment, governance, runtime, observability, audit, recovery
- Next.js App Router, React Server Components, SSG/ISR, minimal client JavaScript
- No implementation until URL preservation, canonical, duplicate, and source-mapping gates pass

## Indexation Status

- **ROUTE_REGISTRY.json:** `indexed_candidates: 0` (all candidates require publish_approval review)
- **Live Site:** 82 editorial nodes identified; 0 verified servers publicly listed
- **Indexation Path:** Candidates → publish_approval review → published status → indexable status → sitemap inclusion
- **Current Barrier:** `publish_approved: false` for all 5000 candidates; no candidates have `indexable: true`