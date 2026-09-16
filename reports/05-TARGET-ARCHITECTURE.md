# Target Architecture Report (Phase-0 Provisional)

**Generated:** 2026-09-10  
**Workspace:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`  
**Status:** PHASE-0 PROVISIONAL - Awaiting GSC + historical URL reconciliation → complete migration ledger → content-source reconciliation → publication decisions → implementation  

## Architecture Principle: Single Publication Predicate

All pages, search, sitemaps, registries, APIs, and LLM surfaces (`llms.txt`, `llms-full.txt`) must derive from **one publication projection**. No fragmented or competing predicates are allowed. This is the foundational constraint for the entire master website pipeline.

## Prohibited: Mass Publication of Unreviewed Candidates

`publish_approved=false` is a **legitimate fail-closed state**. Publication must remain evidence-driven. Do not optimize toward publishing all 5,000 candidates. The duplicate-route audit's "0 duplicates" result is a predicate finding only (exact-string matches) and does **not** prove semantic/content uniqueness or lower the publication gate.

## Pipeline Architecture (User-Specified Master Pipeline)

```text
ALL HISTORICAL GSC EVIDENCE
          +
ALL THREE REPOSITORY URL INVENTORIES
          +
CURRENT LIVE URL INVENTORY
          ↓
 NORMALIZED URL UNIVERSE
          ↓
 URL-MIGRATION-LEDGER.csv
          ↓
 KEEP / REBUILD / 301 / NOINDEX / 410 / REVIEW
          ↓
 CONTENT-SOURCE-MAP.csv
          ↓
 SINGLE PUBLICATION AUTHORITY
          ↓
 CodesbyFebin/MCP-SERVERS
          ↓
 www.mcpserver.in
          │
          └── verified deployment handoff
                    ↓
             app.mcpserver.in
             MCPServer OS
```

**This pipeline must be traversed in order.** The next gate is:

> **GSC + historical URL reconciliation → complete migration ledger → content-source reconciliation → publication decisions → implementation.**

Until this gate passes, no implementation, no URL moves, and no deployment changes should be made to `www.mcpserver.in` or `app.mcpserver.in`.

## Canonical Host Policy

- **Canonical:** `https://www.mcpserver.in/` with trailing slash
- **One-hop normalization:** Apex (`mcpserver.in`), HTTP (`http://`), and non-www (`http://mcpserver.in`) all redirect to `https://www.mcpserver.in/` in one hop (308)
- **Enforcement:** `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `registry.json` must all derive from this canonical projection

## Route Architecture (KEEP / REBUILD / 301 / NOINDEX / 410 / REVIEW)

### KEEP Indexed (have `publish_approved=true && published && indexable=true`)

| Route Family | Example | Disposition |
|-------------|---------|-------------|
| `/` | `https://www.mcpserver.in/` | KEEP_INDEXED - homepage, GSC_exported + live 200 |
| `/mcp-server/` | `https://www.mcpserver.in/mcp-server/` | KEEP_INDEXED - pillar page |
| `/mcp-architecture/` | `https://www.mcpserver.in/mcp-architecture/` | KEEP_INDEXED - pillar page |
| `/mcp-client/` | `https://www.mcpserver.in/mcp-client/` | KEEP_INDEXED - pillar page |
| `/mcp-server-directory/` | `https://www.mcpserver.in/mcp-server-directory/` | KEEP_INDEXED - directory hub |
| `/how-to-build-mcp-server/` | `https://www.mcpserver.in/how-to-build-mcp-server/` | KEEP_INDEXED - how-to guide |
| `/categories/` | `https://www.mcpserver.in/categories/` | KEEP_INDEXED - category hub |
| `/guides/` | `https://www.mcpserver.in/guides/` | KEEP_INDEXED - guide hub |
| `/glossary/` | `https://www.mcpserver.in/glossary/` | KEEP_INDEXED - glossary, live 200 |
| `/evidence/` | `https://www.mcpserver.in/evidence/` | KEEP_INDEXED - evidence ledger, live 200 |
| `/methodology/` | `https://www.mcpserver.in/methodology/` | KEEP_INDEXED - methodology, live 200 |
| `/capabilities/` | `https://www.mcpserver.in/capabilities/` | KEEP_INDEXED - capabilities, live 200 |
| `/pillars/` | `https://www.mcpserver.in/pillars/` | KEEP_INDEXED - pillars, live 200 |
| `/clients/` | `https://www.mcpserver.in/clients/` | KEEP_INDEXED - client hub, live 200 |
| `/integrations/` | `https://www.mcpserver.in/integrations/` | KEEP_INDEXED - integrations, live 200 |
| `/templates/` | `https://www.mcpserver.in/templates/` | KEEP_INDEXED - templates, live 200 |
| `/compare/` | `https://www.mcpserver.in/compare/` | KEEP_INDEXED - comparison, live 200 |
| `/learn/` | `https://www.mcpserver.in/learn/` | KEEP_INDEXED - learning paths, consolidated from blog |
| `/troubleshooting/` | `https://www.mcpserver.in/troubleshooting/` | KEEP_INDEXED - troubleshooting, live 200 |
| `/best/` | `https://www.mcpserver.in/best/` | KEEP_INDEXED - best servers list, live 200 |
| `/benchmarks/` | `https://www.mcpserver.in/benchmarks/` | KEEP_INDEXED - benchmarks, live 200 |
| `/deployment/` | `https://www.mcpserver.in/deployment/` | KEEP_INDEXED - deployment guide, live 200 |
| `/security/` | `https://www.mcpserver.in/security/` | KEEP_INDEXED - security page, live 200 |
| `/about/` | `https://www.mcpserver.in/about/` | KEEP_INDEXED - about page, live 200 |
| `/contact/` | `https://www.mcpserver.in/contact/` | KEEP (low priority) - live 200 |

### REVIEW (Topical Directory Paths - Requires Semantic Review Per User Constraint)

| Route | Disposition | Notes |
|-------|-------------|-------|
| `/directory/iot/` | REVIEW | Topical path - requires semantic review |
| `/directory/databases/` | REVIEW | Topical path - requires semantic review |
| `/directory/devops/` | REVIEW | Topical path - requires semantic review |
| `/directory/monitoring/` | REVIEW | Topical path - requires semantic review |
| `/directory/` (generic) | CONVERGE_ON `/servers` | Generic directory aliases can converge on `/servers` per canonical rule |

### NOINDEX (Crawlers, Drafts, Internal, Auth, Commerce)

| Route | Disposition | Notes |
|-------|-------------|-------|
| `/api/` | NOINDEX | Health endpoint exempt; other API routes noindex |
| `/drafts/` | NOINDEX | Draft content |
| `/internal/` | NOINDEX | Internal tooling |
| `/admin/` | NOINDEX | Administration |
| `/profile/` | NOINDEX | User profiles |
| `/register/` | NOINDEX | Registration flows |
| `/login/` | NOINDEX | Authentication flows |
| `/checkout/` | NOINDEX | Commerce/checkout processes |

### 404 / Not Found (Live Probes, Relocated Content)

| Route | Live Status | Disposition | Notes |
|-------|-------------|-------------|-------|
| `/server/model-context-protocol` | 404 | REMOVE | Legacy, not in current architecture |
| `/docs/mcp-server` | 404 | REMOVE | Docs section removed/restructured |
| `/docs/getting-started` | 404 | MERGE → `/learn/model-context-protocol/` | Relocated during architecture consolidation |
| `/blog/getting-started` | 404 | MERGE → `/learn/model-context-protocol/` | Relocated during architecture consolidation |
| `/servers/github-mcp-server` | 404 | NOINDEX | No indexable servers listed; publication authority not satisfied |
| `/blog/getting-started` | 404 | REVIEW | Content moved to `/learn` path |

## Publication Workflow (Gated)

The publication workflow is **evidence-driven** with three sequential gates. All three must pass before a candidate enters the sitemap and gains indexability.

### Gate 1: GSC + Historical URL Reconciliation

- **Requirement:** Google Search Console property verified with indexing data, OR historical search performance evidence documented and reconciled
- **Current Status:** ❌ BLOCKED - No GSC API token available; IndexNow ≠ Google indexing evidence
- **Required Before:** Any publication decisions

### Gate 2: Complete Migration Ledger

- **Requirement:** `URL-MIGRATION-LEDGER.csv` contains every known historical URL with explicit disposition (KEEP / REBUILD / 301 / NOINDEX / 410 / REVIEW), source evidence, and destination evidence
- **Current Status:** ⏳ IN_PROGRESS - being populated with all historical URLs from GSC, 3 repository inventories, and live probing
- **Required Before:** Content-source reconciliation

### Gate 3: Content-Source Reconciliation + Publication Decisions

- **Requirement:** `CONTENT-SOURCE-MAP.csv` maps strongest content from all source repositories while maintaining **one publication authority**. Other repositories (MCP-SERVER, mcp-servers-master) are migration sources, not independent canonical publishers. Publication authority: `CodesbyFebin/MCP-SERVERS` → `www.mcpserver.in`.
- **Current Status:** ⏳ IN_PROGRESS - being written with single-authority mapping
- **Required Before:** Publication decisions and implementation

### Gate 4: Publication Decisions

- **Requirement:** Each URL from the migration ledger assigned one disposition: KEEP / REBUILD / 301 / NOINDEX / 410 / REVIEW
- **Current Status:** ⏳ PENDING - Gates 1-3 must pass first
- **Key Principle:** `publish_approved=false` is fail-closed; no mass publication until all gates pass

### Gate 5: Implementation

- **Requirement:** All above gates passed; SHA discrepancy resolved; content quality >90 average; internal linking <broken links; AEO/GEO "Passing"; robots.txt harmonized
- **Current Status:** ❌ BLOCKED - Gates 1-4 not yet complete
- **Action:** Do not proceed to implementation until Gate 4 passes

## Sitemap Architecture (Gated by Publication Gates)

- **Sitemap Index:** `https://www.mcpserver.in/sitemap-index.xml`
- **Partitioned Sitemaps:** By content family, enablement condition: `publish_approved && published && indexable`
- **Current Status:** All 5000 candidates start `indexable=false`; sitemaps partitioned but **not populated** until gates pass
- **Partition Structure:** (from SITEMAP_REGISTRY.json)
  - mcp-server-profile: 700 candidates
  - integration-guide: 700 candidates
  - client-integration-guide: 400 candidates
  - tutorial: 350 candidates
  - troubleshooting: 350 candidates
  - comparison: 250 candidates
  - best-list: 120 candidates
  - category-hub: 100 candidates
  - glossary: 350 candidates
  - enterprise-guide: 170 candidates
  - sdk-framework-guide: 220 candidates
  - client-guide: 120 candidates
  - deployment-guide: 170 candidates
  - database-guide: 170 candidates
  - security-guide: 170 candidates
  - template: 120 candidates
  - example-project: 170 candidates
  - registry-guide: 80 candidates
  - india-guide: 200 candidates
  - news-release: 90 candidates

## LLM Surface Architecture

### llms.txt (Core Pages - Single Authority)

Lists essential authority pages derived from the single publication projection:
- `/servers`, `/pillars`, `/categories`, `/capabilities`
- `/clients`, `/clients/claude-code`
- `/evidence`, `/methodology`
- `/editorial-policy`, `/about`
- `/learn/model-context-protocol`, `/learn/mcp-server`, `/learn/mcp-client`, `/learn/mcp-architecture`

**Generated:** 2026-09-09T00:03:13.674Z  
**Feeds INTO:** Single publication authority for `www.mcpserver.in`

### llms-full.txt (Full Editorial Surface - Single Authority)

- **Generated:** `2026-09-09T00:03:13.648Z`
- **Editorial Entries:** 82
- **Verified Servers:** 0
- **Content:** Full editorial nodes and server directory entries
- **Feeds INTO:** Single publication authority; no verified servers currently

## Quality Gates and Thresholds (Publication Gates)

| Gate | Threshold | Status | Required Before |
|------|-----------|--------|-----------------|
| GSC + Historical URL Reconciliation | GSC property verified + indexing data | ❌ BLOCKED | Start of pipeline |
| Complete Migration Ledger | Every historical URL with explicit disposition | ⏳ IN_PROGRESS | Before content-source reconciliation |
| Content-Source Reconciliation | Single publication authority; other repos are migration sources | ⏳ IN_PROGRESS | Before publication decisions |
| Publication Decisions | Each URL: KEEP/REBUILD/301/NOINDEX/410/REVIEW | ⏳ PENDING | Before implementation |
| Content Quality | Average >90 (currently 54) | ❌ BLOCKED | Before implementation |
| Internal Linking | 0 broken links (currently 1,360) | ❌ BLOCKED | Before implementation |
| AEO/GEO Maturity | Both "Passing" (currently "Improving") | ❌ BLOCKED | Before implementation |
| SHA Discrepancy | `d80c461505304679b12c1ce225b6d1d0dc501ff9` mapped to source commit | ❌ BLOCKED | Before implementation |
| robots.txt Policy | Live vs local harmonized | ❌ BLOCKED | Before implementation |

## Critical Context (Phase-0 Provisional)

- **Canonical Host:** `https://www.mcpserver.in/` (one-hop redirect from apex, HTTP, non-www)
- **Trailing Slash Policy:** Enforced (`true`) across all canonical routes
- **Branch Structure:** `MCP-SERVERS` (master, canonical) → `MCP-SERVER` (main/production, migration reference) → `mcp-servers-master` (production/main/qa, migration reference)
- **Live Health SHA:** `d80c461505304679b12c1ce225b6d1d0dc501ff9` - **UNRECONCILED** (does not match any GitHub HEAD); blocker
- **GSC Status:** No API token available; IndexNow used (1181 URLs submitted, response 200) but **IndexNow ≠ Google indexing evidence**
- **Indexation Status:** `ROUTE_REGISTRY.json` has `indexed_candidates: 0`; all 5000 candidates start `publish_approved=false`, `indexable=false`
- **Quality Score:** 86/100 overall; Content Quality: 5/10 (below threshold - remediation needed)
- **AEO/GEO Status:** Both "Improving" (not yet "Passing")
- **Internal Linking:** 1,360 broken links identified; must be fixed before launch
- **robots.txt Discrepancy:** Live allows GPTBot/ClaudeBot/PerplexityBot; local workspace blocks them - must harmonize
- **Publication Authority:** Single - `CodesbyFebin/MCP-SERVERS` → `www.mcpserver.in`; `MCP-SERVER` and `mcp-servers-master` are migration sources only
- **app.mcpserver.in:** Currently returns 404; reserved for future deployment after migration completes and MCPServer OS handoff

## Phase-0 Provisional Deliverables (Frozen)

The following 7 files are frozen as **Phase-0 provisional artifacts**, pending the next gate:

1. `reports/01-GSC-VALID-URL-INVENTORY.csv` - Evidence-type categorized URL inventory
2. `reports/02-URL-MIGRATION-LEDGER.csv` - Complete migration ledger with all historical URLs
3. `reports/03-CONTENT-SOURCE-MAP.csv` - Single publication authority mapping
4. `reports/00-REPOSITORY-FORENSICS.md` - Repository analysis with SHA discrepancy blocker
5. `reports/04-DUPLICATE-ROUTE-AUDIT.md` - Predicate result only (not semantic uniqueness)
6. `reports/05-TARGET-ARCHITECTURE.md` - Target architecture with corrected pipeline
7. `PROJECT-TRACKER.md` - Workstream tracker with corrected gates

## Next Steps (Do Not Bypass)

The pipeline must be traversed in order. **Do not skip gates.**

```
GSC + historical URL reconciliation → complete migration ledger → 
content-source reconciliation → publication decisions → implementation
```

**Current Position:** Before Gate 1 (GSC + historical URL reconciliation). 

**Actions Before Gate 1:**
1. Obtain GSC API token or formally document that IndexNow ≠ Google indexing evidence
2. Reconcile historical URL evidence from all sources (GSC export, phase-a-inventory, live probing, repository inventories)
3. Complete the URL-MIGRATION-LEDGER.csv with every known historical URL
4. Resolve the SHA discrepancy `d80c461505304679b12c1ce225b6d1d0dc501ff9` → exact Git commit/build artifact

**After Gate 1 Passes:** Proceed to Gate 2 (complete migration ledger), then Gate 3 (content-source reconciliation), then Gate 4 (publication decisions), then Gate 5 (implementation).

**Implementation Must NOT Occur** until Gate 4 passes. Mass publication of 5000 candidates with `publish_approved=false` is prohibited.

## References (Phase-0)

- `mcpserver-5000-duplicate-report.json` - Duplicate predicate result (exact-string matches only)
- `INDEXATION_TRIAGE.json` - Indexation classifications (approximate; GSC not available)
- `phase-a-url-inventory.csv` - 100 authority URLs from Phase A
- `mcpserver-5000-url-master.csv` - 5000 candidate inventory (all indexable=false, publish_approved=false by default)
- `SITEMAP_REGISTRY.json` - Sitemap partitions and enablement conditions
- `ROUTE_REGISTRY.json` - Route architecture and canonical settings
- `PUBLICATION_REGISTRY.json` - Publication gates and review flow
- `search-console.json` - GSC access status: pending-external-access
- `llms-full.txt` - Live LLM full surface (82 editorial entries, 0 verified servers)
- `llms.txt` - Live LLM core surface (core page references)
- `robots.txt` - Live crawler policy (allows GPTBot/ClaudeBot/PerplexityBot)
- Local workspace `robots.txt` - Blocks GPTBot/Meta-ExternalFetcher