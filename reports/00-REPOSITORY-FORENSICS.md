# Repository Forensics Report (Phase-0 Provisional)

**Generated:** 2026-09-10  
**Workspace:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`  
**Status:** PHASE-0 PROVISIONAL - Awaiting GSC reconciliation + SHA mapping  

## Canonical Public-Site Repository
- **Name:** `CodesbyFebin/MCP-SERVERS`
- **Remote URL:** `https://github.com/CodesbyFebin/MCP-SERVERS`
- **Default Branch:** `master`
- **Pushed At:** `2026-08-04T21:48:46.123Z`
- **HEAD Commit SHA:** `e3f244f68a723b28175818c5f3921a9515621e9b`
- **Root Tree Entries:** 29 (0 submodules)
- **Repository Private:** false
- **Designation:** Canonical production authority for `www.mcpserver.in`

## Migration/Reference Repositories (Non-Canonical)

### MCP-SERVER
- **Name:** `CodesbyFebin/MCP-SERVER`
- **Remote URL:** `https://github.com/CodesbyFebin/MCP-SERVER`
- **Default Branch:** `main`
- **Branches:** `main`, `production`
- **Pushed At:** `2026-08-22T06:13:48.000Z`
- **HEAD Commit SHA (main):** `d58768f3e35c3a8713c57b09123e3635f408d82a`
- **Root Tree Entries:** 29 (0 submodules)
- **Designation:** Migration/reference source; **not** a competing production authority
- **Content Fate:** All content consolidated into `MCP-SERVERS` for `www.mcpserver.in` publication

### mcp-servers-master
- **Name:** `CodesbyFebin/mcp-servers-master`
- **Remote URL:** `https://github.com/CodesbyFebin/mcp-servers-master`
- **Default Branch:** `production`
- **Branches:** `production`, `master`, `main`, `qa`
- **Pushed At:** `2026-09-09T00:03:13.674Z`
- **HEAD Commit SHA (production):** `533e11e45a134778008259d72e4462296f531567`
- **Root Tree Entries:** 29 (0 submodules)
- **Contains:** `app-mcpserver-in/apps/web` directory
- **Designation:** Migration/reference source; contains the `app-mcpserver-in` structure that maps to `www.mcpserver.in` after consolidation
- **Content Fate:** `app-mcpserver-in` content consolidated into `MCP-SERVERS` canonical paths for `www.mcpserver.in`

## Critical: Live Deployment SHA Discrepancy (BLOCKER)
- **Live URL:** `https://www.mcpserver.in`
- **Health Endpoint SHA:** `d80c461505304679b12c1ce225b6d1d0dc501ff9` (timestamp: `2026-09-10T08:54:07.814Z`)
- **Status:** ❌ **UNRECONCILED** - This SHA does **not** match any recorded GitHub HEAD:
  - Does not match `MCP-SERVERS` master HEAD `e3f244f68a723b28175818c5f3921a9515621e9b`
  - Does not match `MCP-SERVER` main HEAD `d58768f3e35c3a8713c57b09123e3635f408d82a`
  - Does not match `mcp-servers-master` production HEAD `533e11e45a134778008259d72e4462296f531567`
- **Implication:** Live deployment provenance is **unknown**. This is a **genuine blocker** before any migration evidence can be considered authoritative. Deployment SHA must be mapped to exact Git commit/build artifact before deployment becomes migration evidence.
- **Required Action:** Run bounded Git operations to locate build artifacts, CI/CD pipeline records, or deployment templates that map `d80c461505304679b12c1ce225b6d1d0dc501ff9` to a source commit.

## Local Workspace Git State
- **Git Executable:** Not available in this session (no shell tool)
- **Workspace Status:** Cannot conclusively record remote, branch, or HEAD SHA
- **Note:** Previous attempts by delegated agents exceeded context limits; no actionable output produced

## Route Registry and Indexation Status
- **ROUTE_REGISTRY.json:** `canonical_base`: `https://www.mcpserver.in`, `trailing_slash`: `true`, `indexed_candidates`: `0`
- **Meaning:** All 5000 candidate URLs start with `indexable=false` and `publish_approved=false`; **zero** candidates currently indexed
- **SITEMAP_REGISTRY.json:** 5000 candidate URLs partitioned into 21 content families; sitemap enablement condition: `publish_approved && published && indexable`
- **INDEXATION_TRIAGE.json classifications:**
  - INDEXED: ~119 (approximate, per Search Console baseline - but GSC access not available, so this is uncertain)
  - SUBMITTED: 100 (via IndexNow)
  - DISCOVERED_NOT_INDEXED: 1006
  - NOINDEX: 120 (low-value glossary slugs)
  - DUPLICATE: 3 (consolidated intent pairs)
  - CANDIDATE_ONLY: 4880 (indexable=false, publish_approved=false by default)
- **Quality Gate Status:** `publish_approved=false` is a **legitimate fail-closed state**. Publication must remain evidence-driven; no mass publication until gates pass.

## Key Forensics Findings (Phase-0 Provisional)
1. **Canonical Repository Established:** `CodesbyFebin/MCP-SERVERS` (master branch) is the production authority for `www.mcpserver.in`
2. **Migration Sources Identified:** `MCP-SERVER` and `mcp-servers-master` are migration/reference repositories, **not** competing production authorities
3. **Live Deployment Gap:** SHA `d80c461505304679b12c1ce225b6d1d0dc501ff9` cannot be mapped to any source repository - **this is a genuine blocker**
4. **Local Git State:** Cannot be conclusively recorded due to tool limitations in this session
5. **Branch Structure:**
   - `MCP-SERVERS`: master only (canonical)
   - `MCP-SERVER`: main (default) with production as secondary (migration reference)
   - `mcp-servers-master`: production (default) with master/main/qa as additional branches (migration reference)
6. **Indexability Status:** All 5000 candidates start `indexable=false`; `publish_approved=false` is fail-closed; no candidates have `indexable: true` without gate passage
7. **GSC Evidence:** No GSC API token available; `search-console.json` shows `pending-external-access`; IndexNow used for submissions (1181 URLs, response 200) but **IndexNow ≠ Google indexing evidence**

## Critical Context (Phase-0 Provisional)
- **Workspace Path:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`
- **Local Package Versions:** next@16.2.10, react@19.0.1
- **Route Registry Indexed Candidates:** 0 (all require gate review)
- **Content Inventory Size:** 41,515 records
- **GSC Status:** Property not accessible; no indexing data from Google Search Console
- **Live Health:** Returns 200 with SHA `d80c461505304679b12c1ce225b6d1d0dc501ff9`; SHA unReconciled
- **robots.txt Discrepancy:** Live allows GPTBot/ClaudeBot/PerplexityBot; local workspace blocks these crawlers
- **Quality Score:** 86/100 overall; Content Quality: 5/10 (below threshold - remediation needed)
- **AEO/GEO Status:** Both "Improving" (not yet "Passing")

## Phase-0 Provisional Deliverables (Frozen)
The following 7 files are frozen as **Phase-0 provisional artifacts** pending the next gate:

1. `reports/01-GSC-VALID-URL-INVENTORY.csv` - Evidence-type categorized URL inventory (GSC_EXPORTED, HISTORICAL_SEARCH_EVIDENCE, LIVE_DISCOVERED, INFERRED)
2. `reports/02-URL-MIGRATION-LEDGER.csv` - Complete migration ledger with every known historical URL and explicit dispositions
3. `reports/03-CONTENT-SOURCE-MAP.csv` - Single publication authority mapping; other repos are migration sources
4. `reports/00-REPOSITORY-FORENSICS.md` - Repository analysis with SHA discrepancy highlighted as blocker
5. `reports/04-DUPLICATE-ROUTE-AUDIT.md` - Duplicate predicate result only (not semantic uniqueness proof)
6. `reports/05-TARGET-ARCHITECTURE.md` - Target architecture with corrected pipeline
7. `PROJECT-TRACKER.md` - Workstream tracker with corrected gates

## Next Gate (Do Not Proceed to Implementation)
> **GSC + historical URL reconciliation → complete migration ledger → content-source reconciliation → publication decisions → implementation.**

This gate protects existing search equity while allowing the strongest material from other repositories to be consolidated into `www.mcpserver.in`. Mass implementation must not occur until this gate passes.

## Recommendations (Phase-0)
1. **Resolve SHA discrepancy** before any migration evidence is considered authoritative
2. **Obtain GSC API token** or formally acknowledge IndexNow ≠ Google indexing evidence
3. **Complete content-quality remediation** (current average 54; target >90)
4. **Fix 1,360 broken internal links** before launch
5. **Harmonize robots.txt** between live and local workspace policies
6. **Advance AEO/GEO maturity** from "Improving" to "Passing"
7. **Validate publication predicate** across all surfaces (HTML, sitemap, registry, llms) derives from single canonical projection
8. **Do not publish** any candidates with `publish_approved=false`; this is a legitimate fail-closed state

## Frozen Artifact Status
These 7 files represent the **Phase-0 forensic baseline**. They are **not** to be treated as authoritative for migration yet. The next gate must be cleared:

```
GSC + historical URL reconciliation → complete migration ledger → 
content-source reconciliation → publication decisions → implementation
```

Until this gate passes, no code changes, no URL moves, and no deployment changes should be made to `www.mcpserver.in` or `app.mcpserver.in`.