#!/usr/bin/env tsx
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content", "generated");

function getAllMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  function walk(d: string) {
    for (const e of fs.readdirSync(d)) {
      const full = path.join(d, e);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (e.endsWith(".md")) files.push(full);
    }
  }
  walk(dir);
  return files;
}

function parseFrontmatter(content: string): Record<string, any> | null {
  const m = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const fm: Record<string, any> = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^(\w+):\s*(.+)$/);
    if (mm) {
      let v = mm[2].trim();
      if (v.startsWith("[") && v.endsWith("]")) {
        v = v.slice(1, -1).split(",").map(s => s.trim().replace(/^"|"$/g, "")).filter(Boolean).join(",");
      }
      fm[mm[1]] = v;
    }
  }
  return fm;
}

function main() {
  const files = getAllMarkdownFiles(CONTENT_ROOT);
  let badFm = 0, badJsonLd = 0, noH1 = 0;
  const canonicals = new Set<string>();
  const dupCanonical = new Set<string>();
  const issues: string[] = [];

  for (const f of files) {
    const content = fs.readFileSync(f, "utf-8");
    const fm = parseFrontmatter(content);
    if (!fm) { badFm++; issues.push(f + ": no frontmatter"); continue; }
    if (!/^#\s+/m.test(content)) noH1++;
    if (fm.canonical) {
      if (canonicals.has(fm.canonical)) dupCanonical.add(fm.canonical);
      canonicals.add(fm.canonical);
    }
    const ldMatch = content.match(/<script type="application\/ld\+json">\n([\s\S]*?)\n<\/script>/);
    if (ldMatch) {
      try { JSON.parse(ldMatch[1]); } catch { badJsonLd++; issues.push(f + ": bad JSON-LD"); }
    } else { badJsonLd++; issues.push(f + ": no JSON-LD"); }
  }

  console.log("Files:", files.length);
  console.log("Valid frontmatter:", files.length - badFm);
  console.log("Bad frontmatter:", badFm);
  console.log("Bad/missing JSON-LD:", badJsonLd);
  console.log("Missing H1:", noH1);
  console.log("Duplicate canonicals:", dupCanonical.size);
  console.log("Unique canonicals:", canonicals.size);
  if (issues.length) console.log("Sample issues:\n" + issues.slice(0, 10).join("\n"));
}

main();
