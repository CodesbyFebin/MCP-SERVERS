import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
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
      let v = mm[2].trim().replace(/^"|"$/g, "");
      if (v.startsWith("[") && v.endsWith("]")) {
        v = v.slice(1, -1).split(",").map(s => s.trim().replace(/^"|"$/g, "")).filter(Boolean).join(",");
      }
      fm[mm[1]] = v;
    }
  }
  return fm;
}

// Preload all file contents once to avoid repeated disk I/O across tests.
const FILES = getAllMarkdownFiles(CONTENT_ROOT);
const CONTENTS = FILES.map((f) => fs.readFileSync(f, "utf-8"));

describe("Generated 5000-URL Content Suite", () => {
  it("generates exactly 5000 content pages", () => {
    expect(FILES.length).toBe(5000);
  });

  it("every page has parseable frontmatter", () => {
    let bad = 0;
    for (const content of CONTENTS) {
      if (!parseFrontmatter(content)) bad++;
    }
    expect(bad).toBe(0);
  });

  it("every page meets the 2500-word minimum", () => {
    let below = 0;
    for (const content of CONTENTS) {
      const words = content.split(/\s+/).filter(Boolean).length;
      if (words < 2500) below++;
    }
    expect(below).toBe(0);
  });

  it("every page has a single H1", () => {
    let bad = 0;
    for (const content of CONTENTS) {
      const stripped = content.replace(/```[\s\S]*?```/g, "");
      const h1s = stripped.match(/^#\s+/gm) || [];
      if (h1s.length !== 1) bad++;
    }
    expect(bad).toBe(0);
  });

  it("every page contains a self-referencing canonical on www", () => {
    let bad = 0;
    for (const content of CONTENTS) {
      const fm = parseFrontmatter(content);
      if (!fm?.canonical || !/^https:\/\/www\.mcpserver\.in\/.+\/$/.test(fm.canonical)) bad++;
    }
    expect(bad).toBe(0);
  });

  it("every page has a valid JSON-LD block", () => {
    let bad = 0;
    for (const content of CONTENTS) {
      const m = content.match(/<script type="application\/ld\+json">\n([\s\S]*?)\n<\/script>/);
      if (!m) { bad++; continue; }
      try { JSON.parse(m[1]); } catch { bad++; }
    }
    expect(bad).toBe(0);
  });

  it("no page uses unsupported Review or AggregateRating schema", () => {
    const unsupported = CONTENTS.filter((content) =>
      /"Review"|"AggregateRating"|"ratingValue"/.test(content)
    );
    expect(unsupported).toHaveLength(0);
  });

  it("no page contains unsafe claims", () => {
    const unsafePattern = /\b(guarantee|100%|cure|miracle)\b/gi;
    const unsafe = CONTENTS.filter((content) => unsafePattern.test(content));
    expect(unsafe).toHaveLength(0);
  });

  it("all canonicals across generated pages are unique", () => {
    const canonicals = new Set<string>();
    const dups = new Set<string>();
    for (const content of CONTENTS) {
      const fm = parseFrontmatter(content);
      if (fm?.canonical) {
        if (canonicals.has(fm.canonical)) dups.add(fm.canonical);
        canonicals.add(fm.canonical);
      }
    }
    expect(dups.size).toBe(0);
    expect(canonicals.size).toBe(5000);
  });
}, 60000);
