#!/usr/bin/env node
/**
 * Final comprehensive quality gates.
 * Runs all quality checks before deployment.
 *
 * Usage:
 *   npx tsx scripts/content/final-quality-gates.ts
 */

import { execSync } from "child_process"
import fs from "fs"
import path from "path"

const GATES = [
  { name: "TypeScript typecheck", command: "npm run typecheck", critical: true },
  { name: "Lint", command: "npm run lint", critical: true },
  { name: "Tests", command: "npm test", critical: true },
  { name: "SEO audit", command: "npm run seo:audit", critical: true },
  { name: "Build", command: "npm run build", critical: true },
  { name: "Content quality", command: "npm run content:quality", critical: false },
  { name: "Search index", command: "npx tsx scripts/search/build-search-index.ts --validate", critical: true },
]

interface GateResult {
  name: string
  passed: boolean
  critical: boolean
  durationMs: number
  output?: string
}

async function runGate(gate: typeof GATES[0]): Promise<GateResult> {
  const start = Date.now()
  try {
    const output = execSync(gate.command, {
      cwd: process.cwd(),
      encoding: "utf-8",
      timeout: 600000,
    })
    return {
      name: gate.name,
      passed: true,
      critical: gate.critical,
      durationMs: Date.now() - start,
      output: output.toString(),
    }
  } catch (error) {
    return {
      name: gate.name,
      passed: false,
      critical: gate.critical,
      durationMs: Date.now() - start,
      output: error instanceof Error ? error.message : String(error),
    }
  }
}

async function runQualityGates() {
  console.log("🚀 Running final comprehensive quality gates\n")
  console.log("=" .repeat(60))

  const results: GateResult[] = []

  for (const gate of GATES) {
    process.stdout.write(`\n[gate] ${gate.name}... `)
    const result = await runGate(gate)
    results.push(result)

    if (result.passed) {
      console.log(`✅ PASS (${result.durationMs}ms)`)
    } else {
      console.log(`❌ FAIL (${result.durationMs}ms)`)
      if (result.critical) {
        console.log(`   [critical] This gate must pass before deployment`)
      }
    }
  }

  console.log("\n" + "=".repeat(60))
  console.log("\n📊 Quality Gate Summary\n")

  const passed = results.filter((r) => r.passed).length
  const failed = results.filter((r) => !r.passed).length
  const criticalFailed = results.filter((r) => !r.passed && r.critical).length

  console.log(`Total gates: ${results.length}`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)
  console.log(`Critical failures: ${criticalFailed}`)

  console.log("\n--- Gate Details ---")
  for (const result of results) {
    const status = result.passed ? "✅" : "❌"
    const critical = result.critical ? " [CRITICAL]" : ""
    console.log(`  ${status} ${result.name}${critical} (${result.durationMs}ms)`)
  }

  if (criticalFailed > 0) {
    console.log("\n❌ Quality gates FAILED. Fix critical issues before deployment.")
    process.exit(1)
  } else if (failed > 0) {
    console.log("\n⚠️  Quality gates passed with warnings. Review non-critical failures.")
    process.exit(0)
  } else {
    console.log("\n✅ All quality gates PASSED. Ready for deployment.")
    process.exit(0)
  }
}

runQualityGates().catch((error) => {
  console.error("[quality-gates] Failed:", error)
  process.exit(1)
})
