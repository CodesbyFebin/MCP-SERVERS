// Derives real datePublished/dateModified values per content entry from git history.
// This replaces hardcoded, identical-across-every-page fake dates with dates
// that reflect when each entry's lines actually first appeared / were last touched.
//
// Output: src/data/contentDates.generated.json — { [slugKey]: { datePublished, dateModified } }
// Entries generated at runtime via .map() (no literal slug line in source) are not
// covered per-entry; callers should fall back to the file-level last-modified date
// for those (see src/lib/contentDates.ts).

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const TARGETS = [
  { file: "src/data/pillars.ts", pattern: /^\s*slug:\s*"([^"]+)"\s*,?\s*$/, keyPrefix: "pillar:" },
  { file: "src/data/servers.ts", pattern: /^\s*slug:\s*"([^"]+)"\s*,?\s*$/, keyPrefix: "server:" },
  { file: "src/data/glossary.ts", pattern: /^\s*slug:\s*"([^"]+)"\s*,?\s*$/, keyPrefix: "glossary:" },
  { file: "src/data/topics.ts", pattern: /^\s*slug:\s*"([^"]+)"\s*,?\s*$/, keyPrefix: "topic:" },
  { file: "src/data/blogPosts.ts", pattern: /^\s*slug:\s*"([^"]+)"\s*,?\s*$/, keyPrefix: "blog:" },
  {
    file: "src/data/docs.ts",
    pattern: /^\s*slug:\s*\[([^\]]+)\]\s*,?\s*$/,
    keyPrefix: "docs:",
    // Only accept slug arrays made entirely of string literals — skip generated
    // entries like `slug: [cluster.slug]` or `slug: ["servers", server.slug]`.
    transform: (inner) => {
      const parts = inner.split(",").map((s) => s.trim());
      if (parts.some((p) => !/^"[^"]*"$/.test(p))) return null;
      return parts.map((p) => p.slice(1, -1)).join("/");
    },
  },
];

function sh(cmd) {
  return execSync(cmd, { maxBuffer: 1024 * 1024 * 200 }).toString();
}

function findEntries(file, pattern, transform) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  const entries = [];
  lines.forEach((line, idx) => {
    const m = line.match(pattern);
    if (!m) return;
    // Quoted form as it literally appears in source, for precise pickaxe search.
    const pickaxeTerm = transform ? m[1] : `"${m[1]}"`;
    let slug = m[1];
    if (transform) {
      slug = transform(m[1]);
      if (slug === null) return;
    }
    entries.push({ slug, pickaxeTerm, line: idx + 1 });
  });
  // window each entry from its own line to just before the next entry's line
  for (let i = 0; i < entries.length; i++) {
    entries[i].start = entries[i].line;
    entries[i].end = i + 1 < entries.length ? entries[i + 1].line - 1 : lines.length;
  }
  return entries;
}

function fileLastModified(file) {
  const out = sh(`git log -1 --format=%aI -- "${file}"`).trim();
  return out ? out.slice(0, 10) : null;
}

function dateModifiedFor(file, start, end) {
  // git blame the exact current line range; the most recent commit among those
  // lines is a real, accurate "last touched" date for this entry.
  let out;
  try {
    out = sh(`git blame --porcelain -L ${start},${end} -- "${file}"`);
  } catch {
    return null;
  }
  const dates = [];
  for (const line of out.split("\n")) {
    const m = line.match(/^author-time (\d+)/);
    if (m) dates.push(parseInt(m[1], 10));
  }
  if (dates.length === 0) return null;
  return new Date(Math.max(...dates) * 1000).toISOString().slice(0, 10);
}

function datePublished(file, slugLiteral) {
  // Pickaxe search on the exact slug VALUE (not the whole line, which is
  // fragile to whitespace/comma/quote-style changes elsewhere on the line).
  // Oldest commit where the string's presence changed = when it was added.
  let out;
  try {
    out = sh(`git log --format=%aI --follow -S'${slugLiteral}' -- "${file}"`).trim();
  } catch {
    return null;
  }
  if (!out) return null;
  const lines = out.split("\n").filter(Boolean);
  return lines[lines.length - 1].slice(0, 10); // oldest is last (git log is newest-first)
}

// Standalone, hand-written pages that aren't array-driven — use the whole
// file's real git history (first commit / most recent commit) instead of a
// per-entry line range.
const STANDALONE_FILES = [
  { key: "page:home", file: "app/page.tsx" },
  { key: "page:what-is-mcp", file: "app/what-is-mcp/WhatIsMcpClient.tsx" },
];

const output = {};

for (const { key, file } of STANDALONE_FILES) {
  const log = sh(`git log --format="%aI" --follow -- "${file}"`).trim().split("\n").filter(Boolean);
  if (log.length === 0) continue;
  const dateModified = log[0].slice(0, 10); // newest first
  const datePublished = log[log.length - 1].slice(0, 10); // oldest last
  output[key] = { datePublished, dateModified };
}

for (const target of TARGETS) {
  console.log(`Processing ${target.file}...`);
  const entries = findEntries(target.file, target.pattern, target.transform);
  console.log(`  found ${entries.length} literal entries`);

  for (const entry of entries) {
    const dateModified = dateModifiedFor(target.file, entry.start, entry.end);
    let published = datePublished(target.file, entry.pickaxeTerm) || dateModified;
    // Defensive clamp: git history quirks (rebases, formatting-only commits)
    // could theoretically still produce published > modified — never show that.
    if (dateModified && published > dateModified) published = dateModified;
    output[target.keyPrefix + entry.slug] = { datePublished: published, dateModified };
  }

  output[target.keyPrefix + "__fileLastModified"] = { dateModified: fileLastModified(target.file) };
}

writeFileSync(
  "src/data/contentDates.generated.json",
  JSON.stringify(output, null, 2) + "\n"
);
console.log(`Wrote ${Object.keys(output).length} entries to src/data/contentDates.generated.json`);
