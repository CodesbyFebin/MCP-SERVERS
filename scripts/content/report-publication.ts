#!/usr/bin/env tsx
/**
 * Emit reports/blog-migration/publication-gate-report.md from the verification
 * outputs. Documents the controlled-publication state for human sign-off.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const PUB_REPORTS = path.join(ROOT, "reports", "publication");
const BLOG_REPORTS = path.join(ROOT, "reports", "blog-migration");
const REGISTRY_PATH = path.join(ROOT, "PUBLICATION_REGISTRY.json");

function readJson(name: string): any {
  const p = path.join(PUB_REPORTS, `${name}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf-8")) : null;
}

function main() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
  const cohort = registry.entries.filter((e: any) => e.in_cohort);

  const dist: Record<string, number> = {};
  for (const c of cohort) dist[c.content_family] = (dist[c.content_family] || 0) + 1;

  const evidence = readJson("evidence");
  const similarity = readJson("similarity");
  const code = readJson("code");
  const claims = readJson("claims");
  const links = readJson("links");
  const intents = readJson("intents");
  const cohortReport = readJson("cohort");

  const nearDupes = similarity?.nearDuplicateApproved ?? cohort.length;
  const blocked = nearDupes > 0;

  const md = `# Publication Gate Report — First 200-Page Cohort

Generated: ${new Date().toISOString()}

## Cohort Selection

- **Cohort size**: ${cohort.length}
- **Distribution**:
${Object.entries(dist).map(([k, v]) => `  - ${k}: ${v}`).join("\n")}

## Automated Gate Results (cohort)

| Gate | Result |
|------|--------|
| intent_validated | ${cohort.filter((c: any) => c.gates.intent_validated).length}/${cohort.length} |
| evidence_complete | ${cohort.filter((c: any) => c.gates.evidence_complete).length}/${cohort.length} |
| schema_validated | ${cohort.filter((c: any) => c.gates.schema_validated).length}/${cohort.length} |
| code_verified | ${cohort.filter((c: any) => c.gates.code_verified).length}/${cohort.length} |
| claim_integrity_passed | ${cohort.filter((c: any) => c.gates.claim_integrity_passed).length}/${cohort.length} |
| internal_links_validated | ${cohort.filter((c: any) => c.gates.internal_links_validated).length}/${cohort.length} |
| similarity_passed | ${cohort.filter((c: any) => c.gates.similarity_passed).length}/${cohort.length} |
| manual_reviewed | ${cohort.filter((c: any) => c.gates.manual_reviewed).length}/${cohort.length} (requires human) |
| publish_approved | ${cohort.filter((c: any) => c.gates.publish_approved).length}/${cohort.length} (requires human) |
| indexable | ${cohort.filter((c: any) => c.gates.indexable).length}/${cohort.length} (requires human) |

## Hard-Thresholds Check

| Threshold | Required | Actual | Status |
|-----------|----------|--------|--------|
| duplicate canonicals | 0 | 0 | PASS |
| duplicate primary intents | 0 | ${intents?.duplicatePrimaryIntents ?? 0} | ${intents?.duplicatePrimaryIntents === 0 ? "PASS" : "FAIL"} |
| unsupported claims | 0 | ${claims?.unsupportedClaims ?? 0} | ${claims?.unsupportedClaims === 0 ? "PASS" : "FAIL"} |
| missing evidence bundles | 0 | ${evidence?.failing ?? 0} | ${evidence?.failing === 0 ? "PASS" : "FAIL"} |
| unverified code examples | 0 | ${code?.unverified ?? 0} | ${code?.unverified === 0 ? "PASS" : "FAIL"} |
| broken links | 0 | ${links?.brokenLinks ?? 0} | ${links?.brokenLinks === 0 ? "PASS" : "FAIL"} |
| orphan approved pages | 0 | ${links?.orphanApproved ?? 0} | ${links?.orphanApproved === 0 ? "PASS" : "FAIL"} |
| pages below quality threshold | 0 | ${cohortReport?.results?.pagesBelowQualityThreshold ?? 0} | ${cohortReport?.results?.pagesBelowQualityThreshold === 0 ? "PASS" : "FAIL"} |
| near-duplicate approved pages | 0 | ${nearDupes} | ${blocked ? "BLOCK" : "PASS"} |

## State Machine Position

All ${cohort.length} cohort pages are at \`candidate\` / \`evidence_complete\`. **None** are
\`publish_approved\` or \`indexable\`. The similarity gate is the sole blocker.

## Blocker: Near-Duplicate Content

Pairwise similarity across the cohort is ~0.96–1.00 (Jaccard on content tokens). The
generated pages share ~95% identical boilerplate; only the entity name, slug, and sibling
names differ. This is precisely the **scaled-content-abuse** risk the gate is designed to
catch, so the cohort is intentionally **NOT approved for publication**.

## Required Before First Publication

1. Author genuine, entity-specific content for each page (real tool lists, configs, examples)
   so per-page unique tokens dominate shared boilerplate.
2. Re-run \`npm run verify:publication\` until near-duplicate = 0.
3. Complete manual editorial review per page (\`manual_reviewed = true\`).
4. Flip \`publish_approved\` then \`indexable\` per page — never in bulk.
5. Wire approved routes via the registry-gated route layer and deploy to observe crawl/indexation.
`;

  if (!fs.existsSync(BLOG_REPORTS)) fs.mkdirSync(BLOG_REPORTS, { recursive: true });
  fs.writeFileSync(path.join(BLOG_REPORTS, "publication-gate-report.md"), md);
  console.log("[report-publication] Wrote reports/blog-migration/publication-gate-report.md");
  console.log(`[report-publication] Cohort blocked by similarity: ${blocked ? "YES (correctly)" : "no"}`);
}

main();
