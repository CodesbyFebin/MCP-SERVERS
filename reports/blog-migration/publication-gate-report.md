# Publication Gate Report — First 200-Page Cohort

Generated: 2026-08-05T02:27:52.212Z

## Cohort Selection

- **Cohort size**: 200
- **Distribution**:
  - category-hub: 15
  - mcp-server-profile: 30
  - integration-guide: 40
  - tutorial: 25
  - comparison: 10
  - troubleshooting: 20
  - sdk-framework-guide: 15
  - deployment-guide: 15
  - database-guide: 15
  - security-guide: 15

## Automated Gate Results (cohort)

| Gate | Result |
|------|--------|
| intent_validated | 200/200 |
| evidence_complete | 200/200 |
| schema_validated | 200/200 |
| code_verified | 200/200 |
| claim_integrity_passed | 200/200 |
| internal_links_validated | 200/200 |
| similarity_passed | 0/200 |
| manual_reviewed | 0/200 (requires human) |
| publish_approved | 0/200 (requires human) |
| indexable | 0/200 (requires human) |

## Hard-Thresholds Check

| Threshold | Required | Actual | Status |
|-----------|----------|--------|--------|
| duplicate canonicals | 0 | 0 | PASS |
| duplicate primary intents | 0 | 0 | PASS |
| unsupported claims | 0 | 0 | PASS |
| missing evidence bundles | 0 | 0 | PASS |
| unverified code examples | 0 | 0 | PASS |
| broken links | 0 | 0 | PASS |
| orphan approved pages | 0 | 0 | PASS |
| pages below quality threshold | 0 | 0 | FAIL |
| near-duplicate approved pages | 0 | 200 | BLOCK |

## State Machine Position

All 200 cohort pages are at `candidate` / `evidence_complete`. **None** are
`publish_approved` or `indexable`. The similarity gate is the sole blocker.

## Blocker: Near-Duplicate Content

Pairwise similarity across the cohort is ~0.96–1.00 (Jaccard on content tokens). The
generated pages share ~95% identical boilerplate; only the entity name, slug, and sibling
names differ. This is precisely the **scaled-content-abuse** risk the gate is designed to
catch, so the cohort is intentionally **NOT approved for publication**.

## Required Before First Publication

1. Author genuine, entity-specific content for each page (real tool lists, configs, examples)
   so per-page unique tokens dominate shared boilerplate.
2. Re-run `npm run verify:publication` until near-duplicate = 0.
3. Complete manual editorial review per page (`manual_reviewed = true`).
4. Flip `publish_approved` then `indexable` per page — never in bulk.
5. Wire approved routes via the registry-gated route layer and deploy to observe crawl/indexation.
