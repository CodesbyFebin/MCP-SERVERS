#!/usr/bin/env tsx
import fs from "fs";
import path from "path";
import { verifyClaims, verifyEvidence, verifyCode, verifyLinks, verifySimilarity, RegistryEntry } from "./lib/publication";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports", "publication");

function ensureDir(d: string) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function loadRegistry(): RegistryEntry[] {
  const registryPath = path.join(ROOT, "PUBLICATION_REGISTRY.json");
  if (!fs.existsSync(registryPath)) {
    console.error("PUBLICATION_REGISTRY.json not found. Run `npm run generate:pilot-cohort` first.");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
  return data.entries;
}

function cohortOf(registry: RegistryEntry[]): RegistryEntry[] {
  return registry.filter((e) => e.in_cohort);
}

function writeReport(name: string, payload: unknown) {
  ensureDir(REPORT_DIR);
  fs.writeFileSync(path.join(REPORT_DIR, `${name}.json`), JSON.stringify(payload as object, null, 2));
}

function exitWith(code: number, summary: string) {
  console.log(summary);
  process.exit(code);
}

function verifySimilarityCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  const nearDupes: string[] = [];
  let maxSim = 0;
  
  for (const e of cohort) {
    const r = verifySimilarity(e, cohort);
    if (!r.pass) nearDupes.push(e.id);
    if (r.maxSim > maxSim) maxSim = r.maxSim;
  }
  
  const report = {
    check: "generated-similarity",
    threshold: 0.95,
    nearDuplicateApproved: nearDupes.length,
    sample: nearDupes.slice(0, 20),
    maxSimilarity: maxSim,
  };
  writeReport("similarity", report);
  exitWith(nearDupes.length === 0 ? 0 : 1, `[verify:generated-similarity] near-duplicates=${nearDupes.length} (threshold 0.95) ${nearDupes.length === 0 ? "PASS" : "FAIL"}`);
}

function verifyPublicationCohortCmd() {
  const registry = loadRegistry();
  const cohort = cohortOf(registry);
  
  let claims = 0, evidence = 0, code = 0, links = 0, similarity = 0;
  
  const cohortRoutes = new Set(cohort.map((c) => c.route));
  
  for (const e of cohort) {
    if (!verifyClaims(e).pass) claims++;
    if (!verifyEvidence(e).pass) evidence++;
    if (!verifyCode(e).pass) code++;
    const lr = verifyLinks(e, cohortRoutes);
    if (!lr.pass) links++;
    if (!verifySimilarity(e, cohort).pass) similarity++;
  }
  
  const report = {
    check: "publication-cohort",
    threshold: 0,
    failures: { claims, evidence, code, links, similarity },
    passed: cohort.length - (claims + evidence + code + links + similarity),
    total: cohort.length,
  };
  writeReport("cohort", report);
  
  const totalFailures = claims + evidence + code + links + similarity;
  exitWith(totalFailures === 0 ? 0 : 1, 
    `[verify:publication-cohort] failures=${totalFailures} (claims=${claims}, evidence=${evidence}, code=${code}, links=${links}, similarity=${similarity}) ${totalFailures === 0 ? "PASS" : "FAIL"}`
  );
}

const cmd = process.argv[2];

switch (cmd) {
  case "generated-similarity":
    verifySimilarityCmd();
    break;
  case "publication-cohort":
    verifyPublicationCohortCmd();
    break;
  default:
    console.error(`Unknown command: ${cmd}`);
    console.error("Usage: verify-publication.ts <command>");
    console.error("Commands: generated-similarity, publication-cohort");
    process.exit(1);
}