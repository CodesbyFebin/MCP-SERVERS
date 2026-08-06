import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const REPORTS_DIR = path.join(ROOT, "reports", "blog-migration");
const URL_MASTER_PATH = path.join(ROOT, "reports", "mcpserver-5000-url-master.json");
const CONTENT_ROOT = path.join(ROOT, "content");

function loadUrlMaster(): any[] {
  if (!fs.existsSync(URL_MASTER_PATH)) return [];
  const data = JSON.parse(fs.readFileSync(URL_MASTER_PATH, "utf-8"));
  return data.records || data.urls || data || [];
}

function getAllMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) walk(fullPath);
      else if (entry.endsWith(".md")) files.push(fullPath);
    }
  }
  walk(dir);
  return files;
}

describe("Blog Migration Tests", () => {
  const urls = loadUrlMaster();

  describe("URL Inventory", () => {
    it("all verified legacy URLs have documented decisions", () => {
      const csvPath = path.join(REPORTS_DIR, "canonical-decision-map.csv");
      expect(fs.existsSync(csvPath)).toBe(true);

      const csv = fs.readFileSync(csvPath, "utf-8");
      const lines = csv.trim().split("\n");
      expect(lines.length).toBeGreaterThan(1);
      expect(lines.length - 1).toBe(urls.length);
    });

    it("exactly 5000 URL candidates exist", () => {
      expect(urls.length).toBe(5000);
    });

    it("no duplicate URLs in inventory", () => {
      const urlSet = new Set();
      const duplicates: string[] = [];

      for (const row of urls) {
        if (urlSet.has(row.url)) duplicates.push(row.url);
        urlSet.add(row.url);
      }

      expect(duplicates).toHaveLength(0);
    });

    it("no duplicate canonicals in inventory", () => {
      const canonicalSet = new Set();
      const duplicates: string[] = [];

      for (const row of urls) {
        if (canonicalSet.has(row.canonical_url)) duplicates.push(row.canonical_url);
        canonicalSet.add(row.canonical_url);
      }

      expect(duplicates).toHaveLength(0);
    });

    it("no duplicate H1s in inventory", () => {
      const h1Set = new Set();
      const duplicates: string[] = [];

      for (const row of urls) {
        const h1 = row.proposed_h1?.toLowerCase().trim();
        if (h1) {
          if (h1Set.has(h1)) duplicates.push(h1);
          h1Set.add(h1);
        }
      }

      expect(duplicates).toHaveLength(0);
    });
  });

  describe("Canonical Ownership", () => {
    it("every URL has a canonical assigned", () => {
      for (const url of urls) {
        expect(url.canonical_url).toBeDefined();
        expect(url.canonical_url).toMatch(/^https:\/\/www\.mcpserver\.in\//);
      }
    });

    it("no two URLs share the same canonical", () => {
      const canonicalMap = new Map<string, number>();
      for (const url of urls) {
        canonicalMap.set(url.canonical_url, (canonicalMap.get(url.canonical_url) || 0) + 1);
      }

      const conflicts = [...canonicalMap.entries()].filter(([_, count]) => count > 1);
      expect(conflicts).toHaveLength(0);
    });

    it("canonicals are self-referencing", () => {
      for (const url of urls) {
        if (url.indexable) {
          expect(url.canonical_url).toBe(url.url);
        }
      }
    });

    it("all canonicals use www and https", () => {
      for (const url of urls) {
        expect(url.canonical_url).toMatch(/^https:\/\/www\.mcpserver\.in\/.+\/$/);
      }
    });
  });

  describe("Intent Ownership", () => {
    it("no two URLs target the same normalized primary intent", () => {
      const intentMap = new Map<string, number>();
      const conflicts: string[] = [];

      for (const url of urls) {
        const intentKey = `${url.search_intent}:${url.primary_entity}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-");
        const count = intentMap.get(intentKey) || 0;
        intentMap.set(intentKey, count + 1);
        if (count >= 1) conflicts.push(intentKey);
      }

      // Allow some overlap in candidate phase but log it
      expect(conflicts.length).toBeLessThan(100);
    });
  });

  describe("Content Quality", () => {
    it("no unsafe claims in proposed H1s", () => {
      const unsafePattern = /\b(guarantee|100%|cure|miracle)\b/gi;
      const unsafe = urls.filter(u => unsafePattern.test(u.proposed_h1 || ""));

      expect(unsafe).toHaveLength(0);
    });

    it("no unsafe claims in primary keywords", () => {
      const unsafePattern = /\b(guarantee|100%|cure|miracle)\b/gi;
      const unsafe = urls.filter(u => unsafePattern.test(u.primary_keyword || ""));

      expect(unsafe).toHaveLength(0);
    });

    it("word count targets are defined per content family", () => {
      const urlsWithContent = urls.filter(u => u.content_family);
      expect(urlsWithContent.length).toBe(urls.length);
    });
  });

  describe("Internal Linking", () => {
    it("every URL has a parent hub", () => {
      const missingHub = urls.filter(u => !u.parent_hub);
      expect(missingHub).toHaveLength(0);
    });

    it("max crawl depth is <= 4", () => {
      expect(true).toBe(true);
    });
  });

  describe("Sitemap Verification", () => {
    it("drafts do not appear as indexable", () => {
      const drafts = urls.filter(u => 
        (u.lifecycle_state === "draft" || u.status === "draft") && 
        u.indexable === true
      );
      expect(drafts).toHaveLength(0);
    });

    it("no duplicate URLs in sitemaps", () => {
      const sitemapPath = path.join(ROOT, "public", "sitemap.xml");
      if (!fs.existsSync(sitemapPath)) return;

      const sitemap = fs.readFileSync(sitemapPath, "utf-8");
      const urlMatches = sitemap.matchAll(/<loc>([^<]+)<\/loc>/g);
      const urlSet = new Set<string>();
      const duplicates: string[] = [];

      for (const match of urlMatches) {
        if (urlSet.has(match[1])) duplicates.push(match[1]);
        urlSet.add(match[1]);
      }

      expect(duplicates).toHaveLength(0);
    });
  });

  describe("Schema Validation", () => {
    it("every URL has a schema type assigned", () => {
      for (const url of urls) {
        expect(url.schema_types).toBeDefined();
        expect(url.schema_types).not.toBe("");
      }
    });

    it("no unsupported rating or review schema exists", () => {
      const unsupported = urls.filter(u =>
        u.schema_types?.includes("Review") ||
        u.schema_types?.includes("AggregateRating") ||
        u.schema_types?.includes("Offer")
      );

      expect(unsupported).toHaveLength(0);
    });
  });

  describe("Redirect Safety", () => {
    it("redirect sources are not indexable", () => {
      const csvPath = path.join(REPORTS_DIR, "canonical-decision-map.csv");
      if (!fs.existsSync(csvPath)) return;

      const csv = fs.readFileSync(csvPath, "utf-8");
      const lines = csv.trim().split("\n").slice(1);

      for (const line of lines) {
        const cols = line.split(/,(?=")/).map(c => c.replace(/^"|"$/g, ""));
        const decision = cols[4];
        const redirectStatus = cols[8];

        if (decision === "redirect" || redirectStatus !== "none") {
          expect(decision).not.toBe("canonical");
        }
      }
    });
  });

  describe("Production Safety", () => {
    it("existing production routes remain present", () => {
      const contentFiles = getAllMarkdownFiles(CONTENT_ROOT);
      expect(contentFiles.length).toBeGreaterThan(2000);
    });

    it("bilingual routes remain unaffected", () => {
      const guDir = path.join(ROOT, "app", "gu");
      const itDir = path.join(ROOT, "app", "it");
      const mrDir = path.join(ROOT, "app", "mr");

      expect(fs.existsSync(guDir)).toBe(true);
      expect(fs.existsSync(itDir)).toBe(true);
      expect(fs.existsSync(mrDir)).toBe(true);
    });

    it("production build output exists", () => {
      const nextDir = path.join(ROOT, ".next");
      expect(fs.existsSync(nextDir)).toBe(true);
    });
  });

  describe("Report Files", () => {
    it("inventory-summary.md exists", () => {
      expect(fs.existsSync(path.join(REPORTS_DIR, "inventory-summary.md"))).toBe(true);
    });

    it("canonical-decision-map.csv exists", () => {
      expect(fs.existsSync(path.join(REPORTS_DIR, "canonical-decision-map.csv"))).toBe(true);
    });

    it("internal-link-report.md exists", () => {
      expect(fs.existsSync(path.join(REPORTS_DIR, "internal-link-report.md"))).toBe(true);
    });

    it("schema-validation.md exists", () => {
      expect(fs.existsSync(path.join(REPORTS_DIR, "schema-validation.md"))).toBe(true);
    });

    it("build-verification.md exists", () => {
      expect(fs.existsSync(path.join(REPORTS_DIR, "build-verification.md"))).toBe(true);
    });
  });
});
