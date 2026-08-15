#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const roots = ["app", "src/components", "src/lib"];
const forbidden = [
  /from\s+["'][^"']*server-inventory["']/,
  /from\s+["'][^"']*internal\/servers["']/,
];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const violations = [];

function walk(current) {
  if (!fs.existsSync(current)) return;
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!extensions.has(path.extname(entry.name))) continue;
    const source = fs.readFileSync(full, "utf8");
    for (const pattern of forbidden) {
      if (pattern.test(source)) violations.push(`${full}: ${pattern}`);
    }
  }
}

for (const root of roots) walk(root);

if (violations.length) {
  console.error("❌ Publication-authority audit failed. Raw inventory imports are forbidden in public code:\n");
  for (const violation of violations) console.error(` - ${violation}`);
  process.exit(1);
}

console.log("✅ Publication-authority audit passed: public code does not import raw server inventory.");
