#!/usr/bin/env node
/**
 * Seed database with initial evidence data.
 *
 * Usage:
 *   npx tsx scripts/db/seed.ts
 *   npx tsx scripts/db/seed.ts --file db/migrations/002_evidence_seed.sql
 */

import fs from "fs"
import path from "path"
import { sql } from "@vercel/postgres"

interface SeedOptions {
  file?: string
}

function parseArgs(argv: string[]): SeedOptions {
  const options: SeedOptions = {}
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--file" && argv[i + 1]) {
      options.file = argv[++i]
    }
  }
  return options
}

async function runSeed(options: SeedOptions) {
  const seedFile = options.file || path.join(process.cwd(), "db", "migrations", "002_evidence_seed.sql")

  if (!fs.existsSync(seedFile)) {
    console.error(`[seed] Seed file not found: ${seedFile}`)
    process.exit(1)
  }

  const sqlContent = fs.readFileSync(seedFile, "utf-8")

  console.log(`[seed] Running seed: ${path.basename(seedFile)}`)

  try {
    await sql.unsafe(sqlContent)
    console.log("[seed] ✅ Seed completed")
  } catch (error) {
    console.error("[seed] ❌ Seed failed:", error)
    throw error
  }
}

const options = parseArgs(process.argv)
runSeed(options).catch((error) => {
  console.error("[seed] Failed:", error)
  process.exit(1)
})
