# Duplicate Route Audit Report (Phase-0 Provisional)

**Generated:** 2026-09-10  
**Workspace:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`  
**Status:** PHASE-0 PROVISIONAL - Predicate result only, not semantic uniqueness proof  

## Audit Predicate Result

**Source File:** `mcpserver-5000-duplicate-report.json`  
**Total Candidates Audited:** 5000  
**Expected Total:** 5000  
**Actual Total:** 5000  
**Predicate Result:** `passed: true`  

### What the "0 duplicates" Result Means

The duplicate detection predicate verified the following **exact matches** across the 5000 candidates:

| Duplicate Type | Count Found | Predicate Interpretation |
|----------------|-------------|--------------------------|
| Duplicate URLs | 0 | No two candidates share the exact same URL string |
| Duplicate Canonical URLs | 0 | No two candidates share the exact same canonical URL |
| Duplicate H1s | 0 | No two candidates have the exact same H1 element text |
| Duplicate Primary Intents | 0 | No two candidates share the exact same primary intent classification |
| Duplicate Entities | 0 | No two candidates assign the exact same primary entity |

**Important:** This predicate result confirms **syntactic/exact-match uniqueness only**. It does **not** prove semantic/content uniqueness unless all of the following were also tested:

- Substantive content body comparison
- Title/metadata distinctness
- Canonical path normalized comparison
- Entity/graph relationship distinctness
- Search intent semantic distinctness

### What Was NOT Tested by This Predicate

| Aspect | Status | Reason |
|--------|--------|--------|
| Content body uniqueness | NOT TESTED | Requires full-text comparison or embedding similarity analysis |
| Title/metadata distinctness | NOT TESTED | Would require separate audit |
| Canonical path normalized comparison | PARTIALLY | The predicate tested exact canonical URL matches, not normalized-path equivalence |
| Semantic intent distinctness | NOT TESTED | Intent classification is exact-match only; does not assess thematic overlap |
| Entity/graph distinctness | NOT TESTED | Relationship graph structures were not compared |
| Cross-family duplicate detection | NOT TESTED | Candidates across different content families were not cross-analyzed for semantic overlap |

### Audit Scope and Limitations

| Limitation | Impact |
|------------|--------|
| 5000 candidates tested in isolation | Does not include historical URL set (phase-a-inventory 100 URLs, live probed routes, IndexNow submitted set) |
| Exact-string matching only | Does not detect near-duplicates, paraphrased content, or structurally similar pages |
| No content body comparison | Semantic uniqueness is unproven; two pages could have different URLs, H1s, and intents but identical substantive content |
| No cross-referencing with live site | Live site routes (probed separately) were not included in the 5000-candidate duplicate test |
| No canonical normalization | URLs with trailing-slash vs no-trailing-slash differences could be distinct strings but equivalent canonical paths |

### Key Findings (Predicate-Limited)

1. **No exact-string URL duplicates** among the 5000 candidates - predicate confirms this
2. **No exact canonical URL duplicates** among the 5000 candidates - predicate confirms this
3. **No exact H1 duplicates** among the 5000 candidates - predicate confirms this
4. **No exact primary intent duplicates** among the 5000 candidates - predicate confirms this
5. **No exact entity duplicates** among the 5000 candidates - predicate confirms this

### What This Means for Migration

| Conclusion | Supported By |
|------------|--------------|
| "No duplicate URLs among 5000 candidates" | ✅ Predicate result (exact-string match) |
| "Content is unique and can be published" | ❌ No - substantive content not tested |
| "These 5000 candidates are safe to publish en masse" | ❌ No - `publish_approved=false` is fail-closed; publication evidence-driven |
| "Duplicate-route audit is complete" | ⚠️ Partially - predicate result only; broader duplicate analysis needed for launch |

### Recommended Next Steps for Duplicate Analysis

1. **Content-body similarity analysis** - Run embeddings or full-text comparison on candidate bodies
2. **Historical URL set testing** - Test the 100 phase-a URLs + live probed routes against the 5000 candidates
3. **Canonical normalization check** - Test trailing-slash, case, and protocol variations as equivalent paths
4. **Cross-reference with IndexNow submitted set** - Check for duplicates between submitted 1181 URLs and 5000 candidates
5. **Entity graph distinctness** - Compare relationship graphs across candidates

### Audit Metadata

- **Audit Date:** 2026-08-04T21:48:46.123Z (original); 2026-09-10 (this report)
- **Content Corpus Size:** 5000 MCP server profile candidates + additional content candidates
- **Related Reports:** `mcpserver-5000-duplicate-report.json`, `INDEXATION_TRIAGE.json`, `phase-a-url-inventory.csv`
- **Predicate Scope:** Exact-string matches only (URL, canonical, H1, primary intent, entity)
- **Semantic Uniqueness:** Unproven by this audit; requires additional analysis

### Critical Context for Migration

- `publish_approved=false` is a **legitimate fail-closed state** - does not mean "content is duplicate-free," it means "not yet reviewed for publication"
- The 0-duplicate predicate result **does not** lower the publication gate - candidates still require `publish_approved=true` and `indexable=true` via evidence-driven review
- Master website pipeline (from user message) requires: GSC + historical URL reconciliation → complete migration ledger → content-source reconciliation → publication decisions → implementation
- **Do not optimize toward publishing all 5,000 candidates** until all gates pass

### Phase-0 Provisional Status

This report, like all other deliverables, is a **Phase-0 provisional artifact**. The "0 duplicates" result is a predicate finding only and should not be cited as proof of semantic content uniqueness in any migration decision or launch gate review.