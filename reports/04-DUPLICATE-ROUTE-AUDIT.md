# Duplicate Route Audit Report

**Generated:** 2026-09-10  
**Workspace:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`  
**Status:** COMPLETE  

## Duplicate URL Report Summary

**Source File:** `mcpserver-5000-duplicate-report.json`  
**Total Candidates Audited:** 5000  
**Expected Total:** 5000  
**Actual Total:** 5000  
**Audit Result:** PASSED (`passed: true`)

## Duplicate Detection Results

| Duplicate Type | Count | Status |
|----------------|-------|--------|
| Duplicate URLs | 0 | None found |
| Duplicate Canonical URLs | 0 | None found |
| Duplicate H1s | 0 | None found |
| Duplicate Primary Intents | 0 | None found |
| Duplicate Entities | 0 | None found |

## Unresolved Items

| Category | Count | Notes |
|----------|-------|-------|
| Unresolved Entities | 0 | All entities have valid mappings |
| Unresolved Parent Hubs | 0 | All parent hubs properly assigned |
| Missing Evidence Requirements | 0 | All content has evidence completeness |
| Missing Schemas | 0 | All pages have valid Schema.org JSON-LD |
| Missing Breadcrumbs | 0 | All internal linking structures valid |
| Missing Blueprints | 0 | All routes have blueprint assignments |
| Missing Quality Gates | 0 | All pages pass quality thresholds |

## Numeric Suffix Routes

- **Count:** 0
- **Status:** No numeric suffix routes detected that could indicate pagination or versioning issues

## Invalid Canonical Format

- **Count:** 0
- **Status:** All canonical URLs follow the expected format (`https://www.mcpserver.in/<route>`)

## Broken Internal Links

- **Count:** 0
- **Status:** No broken internal links detected in the audit

## Orphan Pages

- **Count:** 0
- **Status:** No orphan pages detected; all routes have at least one internal inbound link

## Key Findings

1. **No Duplicate URLs:** The 5000 candidate URLs are all unique; no exact URL duplicates were found
2. **No Duplicate Canonicals:** All canonical URLs are unique; no two candidates share the same canonical URL
3. **No Duplicate H1 Headers:** All H1 elements are unique across the candidate set
4. **No Duplicate Primary Intents:** Each URL has a distinct primary intent classification
5. **No Duplicate Entities:** Each entity (MCP server, client, integration, etc.) appears only once

## Duplicate Canonical URL Pairs (Consolidated)

The earlier audit noted 3 duplicate intent pairs that were consolidated during Phase A processing. These have already been resolved:

- Intent pair 1: Resolved by merging overlapping content families
- Intent pair 2: Resolved by clarifying primary entity distinctions
- Intent pair 3: Resolved by updating primary keyword focus

## Quality Gate Status

- **Max Crawl Depth:** 3 (all routes reachable within 3 clicks from hub pages)
- **Errors:** 0
- **Passed:** true

## Recommendations

1. **Maintain Current State:** No duplicate-route remediation required at this time
2. **Monitor New Candidates:** Any new URL candidates should be checked for duplicates against the existing 5000
3. **Quality Gates:** All 5000 candidates currently pass the duplicate detection quality gates
4. **Regular Audits:** Schedule duplicate-route audits quarterly as the content corpus grows

## Critical Context

- **Duplicate Detection Threshold:** Exact URL match, canonical URL match, H1 match, primary intent match, and entity match
- **Audit Date:** 2026-08-04T21:48:46.123Z (original); 2026-09-10 (this report)
- **Content Corpus Size:** 5000 MCP server profile candidates + 5000 additional content candidates
- **Related Reports:** `mcpserver-5000-duplicate-report.json`, `INDEXATION_TRIAGE.json`, `phase-a-url-inventory.csv`