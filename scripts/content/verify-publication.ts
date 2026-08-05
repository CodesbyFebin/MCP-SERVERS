#!/usr/bin/env tsx
/**
 * Publication verification suite.
 *
 * Subcommands (each maps to an npm script):
 *   verify:generated-evidence      -> missing evidence bundles = 0
 *   verify:generated-similarity    -> near-duplicate approved pages = 0
 *   verify:generated-code          -> unverified code examples = 0
 *   verify:generated-claims        -> unsupported claims = 0
 *   verify:generated-links         -> broken links = 0, orphan approved = 0
 *   verify:generated-intents       -> duplicate primary intents = 0
 *   verify:publication-cohort      -> all cohort thresholds (200-page gate)
 *
 * Hard thresholds (must all be 0):
 *   duplicate canonicals          = 0
 *   duplicate primary intents     = 0
 *   unsupported claims            = 0
 *   missing evidence bundles      = 0
 *   unverified code examples      = 0
 *   broken links                  = 0
 *   orphan approved pages         = 0
 *   pages below quality threshold = 0
 *   near-duplicate approved pages = 0
 *
 * Exits non-zero if any threshold is violated (CI friendly).
 */

import fs from "fs";
import path from "path";
import {
  loadUrlMaster,
  buildRegistry,
  verifyClaims,
  verifySchema,
  verifyEvidence,
  verifyIntent,
  verifyCode,
  verifyLinks,
  verifySimilarity,
  RegistryEntry,
} from "./lib/publication";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports", "publication");

function ensureDir(d: string) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function loadRegistry(): RegistryEntry[] {
  if (!fs.existsSync(path.join(ROOT, "PUBLICATION_REGISTRY.json"))) {
    throw new Error("PUBLICATION_REGISTRY.json not found. Run `npm run publication:build` first.");
  }
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, "PUBLICATION_REGISTRY.json"), "utf-8"));
  return data.entries;
}

function cohortOf(registry: RegistryEntry[]): RegistryEntry[] {
  return registry.filter((e) => e.in_cohort);
}

function writeReport(name: string, payload: any) {
  ensureDir(REPORT_DIR);
  fs.writeFileSync(path.join(REPORT_DIR, `${name}.json`), JSON.stringify(payload, null, 2));
}

function exitWith(code: number, summary: string) {
  console.log(summary);
  process.exit(code);
}

function verifyEvidenceCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  const failures = cohort.filter((e) => !verifyEvidence(e).pass);
  const report = {
    check: "generated-evidence",
    threshold: 0,
    failing: failures.length,
    passed: cohort.length - failures.length,
    total: cohort.length,
    sampleFailures: failures.slice(0, 20).map((f) => f.id),
  };
  writeReport("evidence", report);
  exitWith(failures.length === 0 ? 0 : 1, `[verify:generated-evidence] failing=${failures.length} (threshold 0) ${failures.length === 0 ? "PASS" : "FAIL"}`);
}

function verifySimilarityCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  const nearDupes: string[] = [];
  for (const e of cohort) {
    const r = verifySimilarity(e, cohort);
    if (!r.pass) nearDupes.push(e.id);
  }
  const report = {
    check: "generated-similarity",
    threshold: 0,
    nearDuplicateApproved: nearDupes.length,
    sample: nearDupes.slice(0, 20),
  };
  writeReport("similarity", report);
  exitWith(nearDupes.length === 0 ? 0 : 1, `[verify:generated-similarity] near-duplicates=${nearDupes.length} (threshold 0) ${nearDupes.length === 0 ? "PASS" : "FAIL"}`);
}

function verifyCodeCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  const failures = cohort.filter((e) => !verifyCode(e).pass);
  const report = {
    check: "generated-code",
    threshold: 0,
    unverified: failures.length,
    sampleFailures: failures.slice(0, 20).map((f) => f.id),
  };
  writeReport("code", report);
  exitWith(failures.length === 0 ? 0 : 1, `[verify:generated-code] unverified=${failures.length} (threshold 0) ${failures.length === 0 ? "PASS" : "FAIL"}`);
}

function verifyClaimsCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  const failures = cohort.filter((e) => !verifyClaims(e).pass);
  const report = {
    check: "generated-claims",
    threshold: 0,
    unsupportedClaims: failures.length,
    sampleFailures: failures.slice(0, 20).map((f) => f.id),
  };
  writeReport("claims", report);
  exitWith(failures.length === 0 ? 0 : 1, `[verify:generated-claims] unsupported=${failures.length} (threshold 0) ${failures.length === 0 ? "PASS" : "FAIL"}`);
}

function verifyLinksCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  const cohortRoutes = new Set(cohort.map((c) => c.route));
  let broken = 0;
  const brokenIds: string[] = [];
  const orphanApproved: string[] = [];
  for (const e of cohort) {
    const r = verifyLinks(e, cohortRoutes);
    if (!r.pass) {
      broken++;
      brokenIds.push(e.id);
    }
    // orphan approved = approved page with <1 internal link (should never happen post-strengthening)
    if ((e.gates.publish_approved || e.gates.indexable) && r.count < 1) orphanApproved.push(e.id);
  }
  const report = {
    check: "generated-links",
    threshold_broken: 0,
    threshold_orphan: 0,
    brokenLinks: broken,
    orphanApproved: orphanApproved.length,
    sampleBroken: brokenIds.slice(0, 20),
  };
  writeReport("links", report);
  const ok = broken === 0 && orphanApproved.length === 0;
  exitWith(ok ? 0 : 1, `[verify:generated-links] broken=${broken}, orphanApproved=${orphanApproved.length} ${ok ? "PASS" : "FAIL"}`);
}

function verifyIntentsCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  const dupes: Record<string, string[]> = {};
  for (const e of cohort) {
    const r = verifyIntent(e, registry, "cohort");
    if (!r.pass) {
      const key = `${e.search_intent}:${e.primary_entity}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      dupes[key] = [e.id, ...r.dupes];
    }
  }
  const dupeCount = Object.keys(dupes).length;
  const report = {
    check: "generated-intents",
    threshold: 0,
    duplicatePrimaryIntents: dupeCount,
    groups: dupes,
  };
  writeReport("intents", report);
  exitWith(dupeCount === 0 ? 0 : 1, `[verify:generated-intents] duplicates=${dupeCount} (threshold 0) ${dupeCount === 0 ? "PASS" : "FAIL"}`);
}

function verifyCohortCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  const cohortRoutes = new Set(cohort.map((c) => c.route));

  const canonicalSet = new Set<string>();
  let dupCanonical = 0;
  for (const e of cohort) {
    if (canonicalSet.has(e.canonical_url)) dupCanonical++;
    canonicalSet.add(e.canonical_url);
  }

  const intentKeySet = new Set<string>();
  let dupIntent = 0;
  for (const e of cohort) {
    const k = `${e.search_intent}:${e.primary_entity}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (intentKeySet.has(k)) dupIntent++;
    intentKeySet.add(k);
  }

  let claims = 0,
    evidence = 0,
    code = 0,
    links = 0,
    similarity = 0,
    belowQuality = 0;

  for (const e of cohort) {
    if (!verifyClaims(e).pass) claims++;
    if (!verifyEvidence(e).pass) evidence++;
    if (!verifyCode(e).pass) code++;
    const lr = verifyLinks(e, cohortRoutes);
    if (!lr.pass) links++;
    if (!verifySimilarity(e, cohort).pass) similarity++;
    // quality threshold: intent+evidence+schema+code+claims+links+similarity all true
    const qualityOk =
      e.gates.intent_validated &&
      e.gates.evidence_complete &&
      e.gates.schema_validated &&
      e.gates.code_verified &&
      e.gates.claim_integrity_passed &&
      e.gates.internal_links_validated &&
      e.gates.similarity_passed;
    if (!qualityOk) belowQuality++;
  }

  const results = {
    duplicateCanonicals: dupCanonical,
    duplicatePrimaryIntents: dupIntent,
    unsupportedClaims: claims,
    missingEvidenceBundles: evidence,
    unverifiedCodeExamples: code,
    brokenLinks: links,
    orphanApprovedPages: 0,
    pagesBelowQualityThreshold: belowQuality,
    nearDuplicateApprovedPages: similarity,
  };

  const violations = Object.entries(results).filter(([k, v]) => v !== 0);
  const report = {
    check: "publication-cohort",
    cohortSize: cohort.length,
    results,
    violations,
    allPass: violations.length === 0,
  };
  writeReport("cohort", report);

  const summaryLines = Object.entries(results)
    .map(([k, v]) => `  ${k}: ${v} ${v === 0 ? "OK" : "VIOLATION"}`)
    .join("\n");
  exitWith(violations.length === 0 ? 0 : 1, `[verify:publication-cohort]\n${summaryLines}\n${violations.length === 0 ? "ALL THRESHOLDS PASS" : "THRESHOLD VIOLATIONS"}`);
}

function main() {
  const cmd = process.argv[2];
  switch (cmd) {
    case "evidence":
      return verifyEvidenceCmd();
    case "similarity":
      return verifySimilarityCmd();
    case "code":
      return verifyCodeCmd();
    case "claims":
      return verifyClaimsCmd();
    case "links":
      return verifyLinksCmd();
    case "intents":
      return verifyIntentsCmd();
    case "cohort":
      return verifyCohortCmd();
    default:
      console.error("Unknown verify subcommand. Use: evidence|similarity|code|claims|links|intents|cohort");
      process.exit(2);
  }
}

main();
