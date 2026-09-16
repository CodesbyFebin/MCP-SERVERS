# PROJECT-TRACKER.md (Phase-0 Provisional)

**Phase:** 0 (PROVISIONAL - Awaiting Gate Passage)  
**Last Updated:** 2026-09-10  
**Workspace:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`  
**Gate Status:** Before Gate 1 - GSC + historical URL reconciliation  

## Implementation Tracker (Phase-0 Provisional)

| # | Task | Status | Priority | Notes |
|---|------|--------|----------|-------|
| 1 | **GSC + historical URL reconciliation** | ❌ BLOCKED | Critical | No GSC API token available; IndexNow ≠ Google indexing evidence. Must reconcile ALL historical URL evidence (GSC export, phase-a-inventory 100 URLs, live probed routes, 3 repository inventories) before any migration decisions. **This is the first gate - do not bypass.** |
| 2 | Complete migration ledger (02-URL-MIGRATION-LEDGER.csv) | ⏳ PENDING | Critical | Must contain EVERY known historical URL with explicit disposition (KEEP / REBUILD / 301 / NOINDEX / 410 / REVIEW), source evidence, and destination evidence. Cannot proceed until Gate 1 passes. |
| 3 | Content-source reconciliation (03-CONTENT-SOURCE-MAP.csv) | ⏳ PENDING | Critical | Must map strongest content from all source repositories while maintaining SINGLE publication authority. MCP-SERVERS = canonical; MCP-SERVER and mcp-servers-master = migration sources only. Cannot proceed until Gate 2 passes. |
| 4 | Publication decisions | ⏳ PENDING | Critical | Each URL from migration ledger assigned one disposition: KEEP / REBUILD / 301 / NOINDEX / 410 / REVIEW. publish_approved=false is fail-closed; no mass publication. Cannot proceed until Gate 3 passes. |
| 5 | SHA discrepancy resolution | ❌ BLOCKED | Critical | Live `/api/health` SHA `d80c461505304679b12c1ce225b6d1d0dc501ff9` must be mapped to exact Git commit/build artifact before deployment becomes migration evidence. This is a separate but related blocker. |
| 6 | Content quality improvement (54 → 90+) | ⏳ IN_PROGRESS | Medium | Current average 54; target >90. Blocked by Gate 1; remediation work can begin independently but cannot affect publication until gates pass. |
| 7 | Internal linking optimization (1,360 broken links) | ⏳ IN_PROGRESS | Medium | Must be fixed before launch but blocked by Gate 1. Work can continue independently. |
| 8 | AEO/GEO maturity advancement (Improving → Passing) | ⏳ IN_PROGRESS | Medium | Both currently "Improving"; target "Passing". Blocked by Gate 1; work can continue independently. |
| 9 | robots.txt policy harmonization (live vs local) | ⏳ IN_PROGRESS | Medium | Live allows GPTBot/ClaudeBot/PerplexityBot; local blocks them. Must harmonize before launch but blocked by Gate 1. |
| 10 | Duplicate route verification (predicate result clarification) | ⏳ COMPLETE | Low | 0 duplicates among 5000 candidates - predicate result only (exact-string matches). Does not prove semantic/content uniqueness or lower publication gate. Documented in 04-DUPLICATE-ROUTE-AUDIT.md. |
| 11 | Implementation (code changes, URL moves, deployment) | ❌ BLOCKED | Critical | **Do not proceed until Gate 4 passes.** Mass publication of 5000 candidates with publish_approved=false is prohibited. Pipeline order: GSC → ledger → content-source → publication decisions → implementation. |

## Phase Gate Progression

| Gate | Name | Status | Must Pass Before |
|------|------|--------|------------------|
| Gate 1 | GSC + historical URL reconciliation | ❌ BLOCKED | Start of pipeline |
| Gate 2 | Complete migration ledger | ⏳ PENDING | Gate 1 passes |
| Gate 3 | Content-source reconciliation | ⏳ PENDING | Gate 2 passes |
| Gate 4 | Publication decisions | ⏳ PENDING | Gate 3 passes |
| Gate 5 | Implementation | ❌ BLOCKED | Gate 4 passes |

## Completed Phase-0 Provisional Artifacts

The following 7 files are frozen as **Phase-0 provisional artifacts** (not yet authoritative):

- [x] `reports/01-GSC-VALID-URL-INVENTORY.csv` - Evidence-type categorized URL inventory (GSC_EXPORTED, HISTORICAL_SEARCH_EVIDENCE, LIVE_DISCOVERED, INFERRED)
- [x] `reports/02-URL-MIGRATION-LEDGER.csv` - Migration ledger skeleton (to be populated with all historical URLs after Gate 1)
- [x] `reports/03-CONTENT-SOURCE-MAP.csv` - Single publication authority mapping (MCP-SERVERS canonical; other repos migration sources)
- [x] `reports/00-REPOSITORY-FORENSICS.md` - Repository forensics with SHA discrepancy blocker highlighted
- [x] `reports/04-DUPLICATE-ROUTE-AUDIT.md` - Predicate result only (0 duplicates among 5000; exact-string matches only)
- [x] `reports/05-TARGET-ARCHITECTURE.md` - Target architecture with corrected pipeline (user-specified order)
- [x] `PROJECT-TRACKER.md` - Workstream tracker with corrected gates

## Blocked Gates (Must Not Bypass)

| Gate | Current Status | Consequence of Bypassing |
|------|----------------|-------------------------|
| Gate 1 (GSC + historical URL reconciliation) | BLOCKED - No GSC token; IndexNow ≠ Google indexing evidence | False sense of search equity; unprincipled migration; potential ranking loss |
| Gate 2 (Complete migration ledger) | PENDING - Waiting for Gate 1 | Incomplete ledger; missing URLs; arbitrary dispositions |
| Gate 3 (Content-source reconciliation) | PENDING - Waiting for Gate 2 | Multiple publication authorities; canonical dilution; inconsistent projection across surfaces |
| Gate 4 (Publication decisions) | PENDING - Waiting for Gate 3 | Mass publication of unpublshed candidates; violate fail-closed publish_approved=false state |
| Gate 5 (Implementation) | BLOCKED - Gates 1-4 not complete | Implementation without evidence-driven foundation; risk to search equity; potential regulatory/compliance issues |

## Key Principles Preserved (From User Constraints)

1. **`CodesbyFebin/MCP-SERVERS`** = canonical public-site repository (master branch); production authority for `www.mcpserver.in`
2. **`CodesbyFebin/Indian-MCP-Server`** = reserved for `app.mcpserver.in` (currently 404; future deployment after migration)
3. **`MCP-SERVER`** and **`mcp-servers-master`** = migration/reference sources; **not** competing production authorities; content consolidated into MCP-SERVERS for www.mcpserver.in publication
4. **`https://www.mcpserver.in/`** = canonical host with trailing slash enforcement; one-hop redirect from apex, HTTP, and non-www variants
5. **Single publication predicate** across all surfaces (HTML, sitemap, registry, LLM llms.txt/llms-full.txt)
6. **Claim-specific evidence only** - unknown claims remain unknown; verification does not imply safety, compliance, approval, or regulatory status
7. **`www.mcpserver.in`** focused on discovery, evidence, knowledge, SEO/AEO/GEO, and public registries
8. **`app.mcpserver.in`** (when active) focused on approvals, deployment, governance, runtime, observability, audit, and recovery
9. **Next.js App Router, React Server Components, SSG/ISR, useful raw HTML, client JavaScript only for interactive controls**
10. **`publish_approved=false` is a legitimate fail-closed state** - does not mean "content is bad" but means "not yet reviewed for publication"; publication must remain evidence-driven
11. **Do not optimize toward publishing all 5,000 candidates** - the 5000-candidate inventory is a master candidate list; each must pass gates individually
12. **Duplicate-route audit "0 duplicates" = predicate result only** (exact-string matches); does not prove semantic/content uniqueness or lower the publication gate

## Pipeline Order (Must Follow)

```
GSC + historical URL reconciliation
    ↓
complete migration ledger (all historical URLs, explicit dispositions)
    ↓
content-source reconciliation (single publication authority)
    ↓
publication decisions (each URL: KEEP/REBUILD/301/NOINDEX/410/REVIEW)
    ↓
implementation (code changes, URL moves, deployment)
```

**Do not bypass any gate.** Implementation must not occur until Gate 4 (publication decisions) passes.

## Next Immediate Action

**Gate 1: GSC + historical URL reconciliation**

Required actions:
1. Obtain Google Search Console API token for property `https://www.mcpserver.in/` and export valid-URL evidence
2. OR formally document that IndexNow submission (1181 URLs, response 200) is NOT Google indexing evidence
3. Reconcile all historical URL evidence sources:
   - GSC exported URLs (if token obtained)
   - Phase-a inventory (100 URLs from `phase-a-url-inventory.csv`)
   - Live probed routes (from web crawl of `www.mcpserver.in`)
   - All three repository URL inventories (MCP-SERVERS master, MCP-SERVER main/production, mcp-servers-master production)
   - Live site current inventory (200+ routes probed)
4. Populate `02-URL-MIGRATION-LEDGER.csv` with every known historical URL and explicit disposition
5. After Gate 1 passes, proceed to Gate 2

**No other workstreams should take priority over Gate 1 completion.**

## Phase-0 Status Summary

- **Gate 1 (GSC + historical URL reconciliation):** BLOCKED - No GSC API token; evidence reconciliation in progress
- **Gate 2 (Complete migration ledger):** PENDING - Waiting for Gate 1
- **Gate 3 (Content-source reconciliation):** PENDING - Waiting for Gate 2
- **Gate 4 (Publication decisions):** PENDING - Waiting for Gate 3
- **Gate 5 (Implementation):** BLOCKED - Gates 1-4 not complete

All 7 provisional artifacts are frozen and should be treated as working documents subject to revision after each gate passes. The priority order is strict: Gate 1 → Gate 2 → Gate 3 → Gate 4 → Gate 5. No implementation until Gate 4 passes.