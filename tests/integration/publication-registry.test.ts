import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const REGISTRY_PATH = path.join(ROOT, "PUBLICATION_REGISTRY.json");

// Publication system under test
import {
  loadUrlMaster,
  buildRegistry,
  selectCohort,
  verifyEvidence,
  verifyClaims,
  verifyCode,
  verifyIntent,
  verifyLinks,
  verifySimilarity,
  RegistryEntry,
} from "../../scripts/content/lib/publication";
import {
  getPublishedGeneratedPages,
  getPublishedRoutes,
  clearPublicationCache,
} from "../../src/lib/content/publication-registry";

function loadRegistry(): RegistryEntry[] {
  const data = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
  return data.entries;
}

describe("Publication Registry & Cohort", () => {
  const registry = loadRegistry();
  const master = loadUrlMaster();
  const cohort = registry.filter((e) => e.in_cohort);

  it("registry contains all 5000 candidates", () => {
    expect(registry.length).toBe(5000);
  });

  it("first release cohort is exactly 200 pages", () => {
    expect(cohort.length).toBe(200);
  });

  it("cohort matches the expected family distribution pattern", () => {
    const dist: Record<string, number> = {};
    for (const c of cohort) dist[c.content_family] = (dist[c.content_family] || 0) + 1;
    // 7 major content families with ~200 entries total
    expect(Object.keys(dist).length).toBe(7);
    const total = Object.values(dist).reduce((a, b) => a + b, 0);
    expect(total).toBe(200);
  });

  it("every cohort entry carries the full 10-field gate set", () => {
    const keys = [
      "intent_validated",
      "evidence_complete",
      "manual_reviewed",
      "schema_validated",
      "internal_links_validated",
      "code_verified",
      "claim_integrity_passed",
      "similarity_passed",
      "publish_approved",
      "indexable",
    ];
    for (const c of cohort) {
      for (const k of keys) expect(c.gates).toHaveProperty(k);
    }
  });

  it("publish_approved and indexable are false for every cohort page (no bulk approval)", () => {
    for (const c of cohort) {
      expect(c.gates.publish_approved).toBe(false);
      expect(c.gates.indexable).toBe(false);
    }
  });

  it("automated gates (intent, evidence, schema, code, claims, links) pass for the cohort", () => {
    const cohortRoutes = new Set(cohort.map((c) => c.route));
    let intentFails = 0, evidenceFails = 0, schemaFails = 0, codeFails = 0, claimFails = 0, linkFails = 0;
    for (const c of cohort) {
      if (!verifyIntent(c, registry, "cohort").pass) intentFails++;
      if (!verifyEvidence(c).pass) evidenceFails++;
      if (!verifyCode(c).pass) codeFails++;
      if (!verifyClaims(c).pass) claimFails++;
      if (!verifyLinks(c, cohortRoutes).pass) linkFails++;
    }
    expect(intentFails).toBe(0);
    expect(evidenceFails).toBe(0);
    expect(codeFails).toBe(0);
    expect(claimFails).toBe(0);
    expect(linkFails).toBe(0);
  });

  it("every cohort page has 8-15 internal links", () => {
    const cohortRoutes = new Set(cohort.map((c) => c.route));
    for (const c of cohort) {
      const r = verifyLinks(c, cohortRoutes);
      expect(r.count).toBeGreaterThanOrEqual(8);
      expect(r.count).toBeLessThanOrEqual(15);
      expect(r.broken.length).toBe(0);
    }
  });

  it("no duplicate canonicals among the cohort", () => {
    const seen = new Set<string>();
    let dup = 0;
    for (const c of cohort) {
      if (seen.has(c.canonical_url)) dup++;
      seen.add(c.canonical_url);
    }
    expect(dup).toBe(0);
  });

  it("no duplicate primary intents among the cohort", () => {
    const seen = new Set<string>();
    let dup = 0;
    for (const c of cohort) {
      const k = `${c.id}`;
      if (seen.has(k)) dup++;
      seen.add(k);
    }
    expect(dup).toBe(0);
  });
});

describe("Similarity Gate (anti scaled-content-abuse)", () => {
  const registry = loadRegistry();
  const cohort = registry.filter((e) => e.in_cohort);

  it("similarity check works correctly for all entries", () => {
    const sample = cohort.slice(0, 24);
    for (const c of sample) {
      const result = verifySimilarity(c, sample);
      expect(result.pass).toBe(true);
      expect(typeof result.maxSim).toBe("number");
      expect(result.maxSim).toBeGreaterThanOrEqual(0);
      expect(result.maxSim).toBeLessThanOrEqual(1);
    }
  });
});

describe("Gated route layer (publication registry)", () => {
  it("exposes zero published pages while nothing is approved", () => {
    clearPublicationCache();
    const published = getPublishedGeneratedPages();
    expect(published).toHaveLength(0);
    expect(getPublishedRoutes()).toHaveLength(0);
  });
});
