#!/usr/bin/env node
/**
 * Database migration runner.
 *
 * Usage:
 *   npx tsx scripts/db/migrate.ts
 *   npx tsx scripts/db/migrate.ts --dry-run
 *   npx tsx scripts/db/migrate.ts --file db/migrations/001_evidence_schema.sql
 */

import fs from "fs"
import path from "path"
import { sql } from "@vercel/postgres"

interface MigrationOptions {
  dryRun?: boolean
  file?: string
}

function parseArgs(argv: string[]): MigrationOptions {
  const options: MigrationOptions = {}
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--dry-run") {
      options.dryRun = true
    } else if (arg === "--file" && argv[i + 1]) {
      options.file = argv[++i]
    }
  }
  return options
}

async function runMigrations(options: MigrationOptions) {
  const migrationsDir = path.join(process.cwd(), "db", "migrations")
  const files = options.file
    ? [options.file]
    : fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort()

  console.log(`[migrate] Found ${files.length} migration(s)`)

  for (const file of files) {
    const filePath = options.file ? file : path.join(migrationsDir, file)
    const sqlContent = fs.readFileSync(filePath, "utf-8")

    console.log(`[migrate] Running: ${file}`)

    if (options.dryRun) {
      console.log(`[migrate] Dry run - would execute:\n${sqlContent.substring(0, 200)}...`)
      continue
    }

    try {
      await sql.unsafe(sqlContent)
      console.log(`[migrate] ✅ ${file}`)
    } catch (error) {
      console.error(`[migrate] ❌ ${file}:`, error)
      throw error
    }
  }

  console.log("[migrate] All migrations completed")
}

const options = parseArgs(process.argv)
runMigrations(options).catch((error) => {
  console.error("[migrate] Failed:", error)
  process.exit(1)
})
