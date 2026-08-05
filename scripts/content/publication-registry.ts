#!/usr/bin/env tsx
/**
 * Build / refresh PUBLICATION_REGISTRY.json:
 *  - derives one entry per URL-master candidate
 *  - selects the first 200-page release cohort
 *  - strengthens internal linking for cohort pages (8-15 contextual links)
 *  - runs automated gate checks (intent, evidence, schema, code, claims, links, similarity)
 *  - advances page state machine up to editorial_review
 *
 * Crucially, publish_approved and indexable are NEVER set here.
 */

import fs from "fs";
import path from "path";
import {
  loadUrlMaster,
  buildRegistry,
  selectCohort,
  computeInternalLinks,
  injectRelatedResources,
  verifyClaims,
  verifySchema,
  verifyEvidence,
  verifyIntent,
  verifyCode,
  verifyLinks,
  verifySimilarity,
  saveRegistry,
  generatedFilePath,
  RegistryEntry,
} from "./lib/publication";

const ROOT = process.cwd();

function main() {
  console.log("[publication] Building publication registry...\n");

  const master = loadUrlMaster();
  let registry = buildRegistry(master);

  // Select cohort
  const cohort = selectCohort(registry, master);
  const cohortRoutes = new Set(cohort.map((c) => c.route));
  console.log(`[publication] Cohort selected: ${cohort.length} pages`);
  for (const [family, n] of Object.entries(
    cohort.reduce((acc: Record<string, number>, c) => {
      acc[c.content_family] = (acc[c.content_family] || 0) + 1;
      return acc;
    }, {})
  )) {
    console.log(`  - ${family}: ${n}`);
  }

  // Strengthen internal linking for cohort pages
  let linked = 0;
  for (const entry of cohort) {
    const links = computeInternalLinks(entry, master, cohort);
    if (injectRelatedResources(entry.route, links)) linked++;
  }
  console.log(`[publication] Strengthened internal links for ${linked} cohort pages`);

  // Run automated gate checks on the whole registry (focus cohort for similarity/intent)
  let intentFails = 0;
  let evidenceFails = 0;
  let schemaFails = 0;
  let codeFails = 0;
  let claimFails = 0;
  let linkFails = 0;
  let similarityFails = 0;

  for (const entry of registry) {
    // Only cohort pages get full automated validation + state advancement.
    if (!entry.in_cohort) {
      entry.status = "candidate";
      continue;
    }
    const claims = verifyClaims(entry);
    const schema = verifySchema(entry);
    const evidence = verifyEvidence(entry);
    const intent = verifyIntent(entry, registry, "cohort");
    const code = verifyCode(entry);
    const links = verifyLinks(entry, cohortRoutes);
    const sim = verifySimilarity(entry, cohort);

    entry.gates.claim_integrity_passed = claims.pass;
    entry.gates.schema_validated = schema.pass;
    entry.gates.evidence_complete = evidence.pass;
    entry.gates.intent_validated = intent.pass;
    entry.gates.code_verified = code.pass;
    entry.gates.internal_links_validated = links.pass;
    entry.gates.similarity_passed = sim.pass;

    if (!intent.pass) intentFails++;
    if (!evidence.pass) evidenceFails++;
    if (!schema.pass) schemaFails++;
    if (!code.pass) codeFails++;
    if (!claims.pass) claimFails++;
    if (!links.pass) linkFails++;
    if (!sim.pass) similarityFails++;

    entry.status = computeStateSafe(entry);
  }

  saveRegistry(registry);

  console.log("\n[publication] Automated gate results (cohort):");
  console.log(`  intent_validated:      ${cohort.length - intentFails}/${cohort.length}`);
  console.log(`  evidence_complete:     ${cohort.length - evidenceFails}/${cohort.length}`);
  console.log(`  schema_validated:      ${cohort.length - schemaFails}/${cohort.length}`);
  console.log(`  code_verified:         ${cohort.length - codeFails}/${cohort.length}`);
  console.log(`  claim_integrity:      ${cohort.length - claimFails}/${cohort.length}`);
  console.log(`  internal_links:        ${cohort.length - linkFails}/${cohort.length}`);
  console.log(`  similarity:            ${cohort.length - similarityFails}/${cohort.length}`);
  console.log(`  manual_reviewed:       0/${cohort.length} (requires human)`);
  console.log(`  publish_approved:      0/${cohort.length} (requires human)`);
  console.log(`  indexable:             0/${cohort.length} (requires human)`);

  const editorialReady = cohort.filter((c) => c.status === "editorial_review").length;
  console.log(`\n[publication] Pages at editorial_review gate: ${editorialReady}/${cohort.length}`);

  // Persist cohort manifest for downstream tooling
  fs.writeFileSync(
    path.join(ROOT, "reports", "publication-cohort.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        cohortSize: cohort.length,
        byFamily: cohort.reduce((acc: Record<string, number>, c) => {
          acc[c.content_family] = (acc[c.content_family] || 0) + 1;
          return acc;
        }, {}),
        editorialReady,
        gates: { intentFails, evidenceFails, schemaFails, codeFails, claimFails, linkFails, similarityFails },
        ids: cohort.map((c) => c.id),
      },
      null,
      2
    )
  );
  console.log("\n[publication] Wrote reports/publication-cohort.json");
}

function computeStateSafe(entry: RegistryEntry) {
  const g = entry.gates;
  if (g.indexable) return "indexable" as const;
  if (g.publish_approved) return "publish_approved" as const;
  if (
    g.manual_reviewed &&
    g.intent_validated &&
    g.evidence_complete &&
    g.schema_validated &&
    g.internal_links_validated &&
    g.code_verified &&
    g.claim_integrity_passed &&
    g.similarity_passed
  ) {
    return "editorial_review" as const;
  }
  if (g.intent_validated && g.evidence_complete) return "evidence_complete" as const;
  if (g.intent_validated) return "intent_validated" as const;
  return "candidate" as const;
}

main();
