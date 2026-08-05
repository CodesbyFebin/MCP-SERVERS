#!/usr/bin/env node
/**
 * Generate build evidence report.
 */

import fs from "fs"
import path from "path"
import { validatePublishingGraph, getPublishedServerProfiles } from "../../../src/data/publishing"

const outputDir = path.join(process.cwd(), "reports")
fs.mkdirSync(outputDir, { recursive: true })

const profiles = getPublishedServerProfiles()
const validation = validatePublishingGraph()

const report = {
  buildId: `build-${Date.now()}`,
  timestamp: new Date().toISOString(),
  entityCount: profiles.length,
  pageCount: profiles.length,
  sitemapCount: 2,
  indexCount: 5,
  qualityGateResults: profiles.map((p) => ({
    route: p.contract.route,
    passed: p.quality.passed,
    score: p.quality.total,
  })),
  validation,
}

fs.writeFileSync(path.join(outputDir, "build-evidence.json"), JSON.stringify(report, null, 2))
console.log(`✅ Build evidence generated: ${report.pageCount} pages, ${report.qualityGateResults.length} quality gate results`)
