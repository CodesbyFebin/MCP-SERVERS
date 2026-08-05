#!/usr/bin/env node
/**
 * Phase 1 — Freeze inventory and create remediation infrastructure
 */

import fs from "fs";
import path from "path";
import crypto from "fs";

const ROOT = process.cwd();
const REMEDIATION_DIR = path.join(ROOT, ".remediation");
const BASELINE_DIR = path.join(REMEDIATION_DIR, "baseline");
const LEDGER_PATH = path.join(REMEDIATION_DIR, "remediation-ledger.csv");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function hashFile(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return crypto.createHash("md5").update(content).digest("hex").substring(0, 16);
  } catch {
    return "missing";
  }
}

function freezeBaseline() {
  console.log("[phase1] Freezing baseline...");
  
  ensureDir(BASELINE_DIR);
  
  const filesToFreeze = [
    "CONTENT_INVENTORY.json",
    "URL_MAP.json",
    "ENTITY_GRAPH.json",
    "PRODUCTION_MANIFEST.json",
    "PHASE1_AUDIT_REPORT.json",
    "SAFE_DEEP_REPORT.json",
    "QUALITY_REPORT.json",
    "SEO_REPORT.md",
    "INTERNAL_LINK_GRAPH.json",
  ];
  
  const baselineManifest: Record<string, { hash: string; size: number; timestamp: string }> = {};
  
  for (const file of filesToFreeze) {
    const srcPath = path.join(ROOT, file);
    if (fs.existsSync(srcPath)) {
      const hash = hashFile(srcPath);
      const stats = fs.statSync(srcPath);
      baselineManifest[file] = {
        hash,
        size: stats.size,
        timestamp: stats.mtime.toISOString(),
      };
      
      const destPath = path.join(BASELINE_DIR, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`[phase1] Frozen: ${file} (${hash})`);
    }
  }
  
  const manifestPath = path.join(BASELINE_DIR, "baseline-manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(baselineManifest, null, 2));
  console.log(`[phase1] Baseline manifest saved: ${manifestPath}`);
}

function disableBulkGenerators() {
  console.log("[phase1] Disabling bulk content generators...");
  
  const scriptsToDisable = [
    "scripts/content/generate-500-blogs.ts",
    "scripts/content/generate-all-content.ts",
    "scripts/content/generate-ugc-pages.ts",
    "scripts/content/generate-extra-ugc.ts",
    "scripts/content/generate-more-pages.ts",
    "scripts/content/generate-next-500.ts",
    "scripts/content/generate-next-500-v2.ts",
    "scripts/content/generate-server-ugc.ts",
    "scripts/content/generate-server-ugc-v2.ts",
    "scripts/content/generate-server-ugc-v3.ts",
    "scripts/content/generate-server-ugc-v4.ts",
    "scripts/content/generate-server-ugc-v5.ts",
    "scripts/content/generate-server-ugc-final.ts",
    "scripts/content/generate-topic-ugc.ts",
    "scripts/content/generate-comparison-ugc.ts",
    "scripts/content/generate-blog-ugc.ts",
    "scripts/content/generate-pillar-ugc.ts",
  ];
  
  const disabledDir = path.join(REMEDIATION_DIR, "disabled-generators");
  ensureDir(disabledDir);
  
  for (const script of scriptsToDisable) {
    const srcPath = path.join(ROOT, script);
    if (fs.existsSync(srcPath)) {
      const disabledPath = path.join(disabledDir, path.basename(script));
      fs.renameSync(srcPath, disabledPath);
      console.log(`[phase1] Disabled: ${script}`);
    }
  }
}

function createRemediationLedger() {
  console.log("[phase1] Creating remediation ledger...");
  
  ensureDir(REMEDIATION_DIR);
  
  const ledgerHeader = `issue_id,page_id,route,failure_type,root_cause,action,files_changed,before_score,after_score,verification,timestamp,status\n`;
  
  fs.writeFileSync(LEDGER_PATH, ledgerHeader);
  console.log(`[phase1] Remediation ledger created: ${LEDGER_PATH}`);
}

function createRemediationConfig() {
  console.log("[phase1] Creating remediation configuration...");
  
  const config = {
    frozen: true,
    frozenAt: new Date().toISOString(),
    baseline: {
      contentInventory: "baseline/CONTENT_INVENTORY.json",
      urlMap: "baseline/URL_MAP.json",
      entityGraph: "baseline/ENTITY_GRAPH.json",
      productionManifest: "baseline/PRODUCTION_MANIFEST.json",
      phase1Audit: "baseline/PHASE1_AUDIT_REPORT.json",
      safeDeepReport: "baseline/SAFE_DEEP_REPORT.json",
      qualityReport: "baseline/QUALITY_REPORT.json",
      seoReport: "baseline/SEO_REPORT.md",
      internalLinkGraph: "baseline/INTERNAL_LINK_GRAPH.json",
    },
    disabledGenerators: ".remediation/disabled-generators/",
    ledger: ".remediation/remediation-ledger.csv",
    phases: {
      canonical: "pending",
      h1: "pending",
      internalLinks: "pending",
      deduplication: "pending",
      reclassification: "pending",
      contentQuality: "pending",
      structuredData: "pending",
      safeDeepGates: "pending",
    },
    acceptanceCriteria: {
      missingCanonicals: 2442,
      missingH1s: 1834,
      brokenInternalLinks: 1360,
      deadEndPages: 2131,
      duplicateEntities: 198,
      duplicateHeadings: 742,
      duplicateKeywords: 796,
      safeDeepFailures: 2442,
      averageQualityScore: 54,
    },
  };
  
  const configPath = path.join(REMEDIATION_DIR, "config.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`[phase1] Remediation config saved: ${configPath}`);
}

function recordBaselineMetrics() {
  console.log("[phase1] Recording baseline metrics...");
  
  const metrics = {
    timestamp: new Date().toISOString(),
    totalPages: 2442,
    missingCanonicals: 2442,
    missingH1s: 1834,
    brokenInternalLinks: 1360,
    deadEndPages: 2131,
    duplicateEntities: 198,
    duplicateHeadings: 742,
    duplicateKeywords: 796,
    safeDeepFailures: 2442,
    averageQualityScore: 54,
    entityCount: 220,
    relationshipCount: 1091,
  };
  
  const metricsPath = path.join(REMEDIATION_DIR, "baseline-metrics.json");
  fs.writeFileSync(metricsPath, JSON.stringify(metrics, null, 2));
  console.log(`[phase1] Baseline metrics saved: ${metricsPath}`);
}

function main() {
  console.log("[phase1] Starting remediation freeze...\n");
  
  freezeBaseline();
  disableBulkGenerators();
  createRemediationLedger();
  createRemediationConfig();
  recordBaselineMetrics();
  
  console.log("\n[phase1] Remediation freeze complete.");
  console.log("[phase1] Next: Phase 2 — Canonical ownership repair");
}

main();
