/**
 * Publication system core library.
 *
 * Implements the controlled-publication milestone:
 *  - per-page publication registry with explicit gates
 *  - 200-page first release cohort selection
 *  - strengthened internal linking (8-15 contextual links)
 *  - verification routines with hard thresholds
 *
 * Pages advance state only via explicit gates; publish_approved and indexable
 * are NEVER auto-set by generation or verification success.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
export const URL_MASTER_PATH = path.join(ROOT, "reports", "mcpserver-5000-url-master.json");
export const REGISTRY_PATH = path.join(ROOT, "PUBLICATION_REGISTRY.json");
export const GENERATED_ROOT = path.join(ROOT, "content", "generated");

export interface UrlCandidate {
  id: string;
  url: string;
  route: string;
  content_family: string;
  cluster: string;
  subcluster: string;
  primary_entity: string;
  primary_keyword: string;
  search_intent: string;
  proposed_h1: string;
  canonical_url: string;
  parent_hub: string;
  schema_types: string[];
  priority: string;
}

export type PageState =
  | "candidate"
  | "intent_validated"
  | "evidence_complete"
  | "editorial_review"
  | "publish_approved"
  | "indexable";

export interface PageGates {
  intent_validated: boolean;
  evidence_complete: boolean;
  manual_reviewed: boolean;
  schema_validated: boolean;
  internal_links_validated: boolean;
  code_verified: boolean;
  claim_integrity_passed: boolean;
  similarity_passed: boolean;
  publish_approved: boolean;
  indexable: boolean;
}

export interface RegistryEntry {
  id: string;
  url: string;
  route: string;
  content_family: string;
  cluster: string;
  primary_entity: string;
  primary_keyword: string;
  search_intent: string;
  canonical_url: string;
  parent_hub: string;
  status: PageState;
  in_cohort: boolean;
  gates: PageGates;
}

// First release cohort — sized to be auditable yet representative.
export const COHORT_TARGETS: Record<string, number> = {
  "mcp-server-profile": 30,
  "integration-guide": 40,
  tutorial: 25,
  troubleshooting: 20,
  "sdk-framework-guide": 15,
  "deployment-guide": 15,
  "security-guide": 15,
  "database-guide": 15,
  comparison: 10,
  "category-hub": 15,
};

// Family -> existing pillar route that is guaranteed to resolve.
export const PILLAR_ROUTE: Record<string, string> = {
  "mcp-server-profile": "/servers/",
  "integration-guide": "/integrations/",
  "client-integration-guide": "/integrations/",
  "client-guide": "/clients/",
  tutorial: "/tutorials/",
  troubleshooting: "/troubleshooting/",
  "sdk-framework-guide": "/sdk/",
  "deployment-guide": "/deployment/",
  "database-guide": "/databases/",
  "security-guide": "/security/",
  comparison: "/compare/",
  "category-hub": "/mcp-server-directory/",
  glossary: "/glossary/",
  "enterprise-guide": "/enterprise/",
  "best-list": "/mcp-server-directory/",
  template: "/templates/",
  "example-project": "/examples/",
  "registry-guide": "/docs/",
  "india-guide": "/learn/",
  "news-release": "/news/",
};

// Always-resolvable existing routes used to guarantee internal links resolve.
export const ALWAYS_RESOLVABLE = new Set<string>([
  "/",
  "/mcp-server-directory/",
  "/servers/",
  "/integrations/",
  "/clients/",
  "/compare/",
  "/glossary/",
  "/security/",
  "/tutorials/",
  "/troubleshooting/",
  "/deployment/",
  "/databases/",
  "/sdk/",
  "/enterprise/",
  "/examples/",
  "/templates/",
  "/docs/",
  "/learn/",
  "/news/",
  "/mcp-server-hosting/",
  "/complete-guide-mcp-servers/",
  "/how-to-build-mcp-server/",
  "/what-is-mcp/",
  "/state-of-mcp/",
  "/categories/",
  "/blog/",
  "/topics/",
  "/guides/",
  "/frameworks/",
  "/technology/",
  "/intelligence/",
  "/knowledge/",
  "/marketplace/",
  "/ml/",
  "/api/",
  "/tools/",
  "/features/",
  "/pricing/",
]);

export function loadUrlMaster(): UrlCandidate[] {
  const data = JSON.parse(fs.readFileSync(URL_MASTER_PATH, "utf-8"));
  const records = data.records || data;
  return records.map((r: any) => ({
    id: r.id,
    url: r.url,
    route: r.route,
    content_family: r.content_family,
    cluster: r.cluster,
    subcluster: r.subcluster,
    primary_entity: r.primary_entity,
    primary_keyword: r.primary_keyword,
    search_intent: r.search_intent,
    proposed_h1: r.proposed_h1,
    canonical_url: r.canonical_url,
    parent_hub: r.parent_hub,
    schema_types: Array.isArray(r.schema_types) ? r.schema_types : [r.schema_types],
    priority: r.priority,
  }));
}

function emptyGates(): PageGates {
  return {
    intent_validated: false,
    evidence_complete: false,
    manual_reviewed: false,
    schema_validated: false,
    internal_links_validated: false,
    code_verified: false,
    claim_integrity_passed: false,
    similarity_passed: false,
    publish_approved: false,
    indexable: false,
  };
}

export function computeState(g: PageGates): PageState {
  if (g.indexable) return "indexable";
  if (g.publish_approved) return "publish_approved";
  if (g.manual_reviewed && g.intent_validated && g.evidence_complete && g.schema_validated && g.internal_links_validated && g.code_verified && g.claim_integrity_passed && g.similarity_passed) {
    return "editorial_review";
  }
  if (g.intent_validated && g.evidence_complete) return "evidence_complete";
  if (g.intent_validated) return "intent_validated";
  return "candidate";
}

export function buildRegistry(master: UrlCandidate[]): RegistryEntry[] {
  const existing: Record<string, RegistryEntry> = {};
  if (fs.existsSync(REGISTRY_PATH)) {
    const prev = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
    for (const e of prev.entries as RegistryEntry[]) existing[e.id] = e;
  }
  return master.map((m) => {
    const prev = existing[m.id];
    const gates = prev?.gates ?? emptyGates();
    const entry: RegistryEntry = {
      id: m.id,
      url: m.url,
      route: m.route,
      content_family: m.content_family,
      cluster: m.cluster,
      primary_entity: m.primary_entity,
      primary_keyword: m.primary_keyword,
      search_intent: m.search_intent,
      canonical_url: m.canonical_url,
      parent_hub: m.parent_hub,
      in_cohort: prev?.in_cohort ?? false,
      gates,
      status: prev?.status ?? "candidate",
    };
    entry.status = computeState(gates);
    return entry;
  });
}

export function selectCohort(entries: RegistryEntry[], master: UrlCandidate[]): RegistryEntry[] {
  const byFamily = new Map<string, RegistryEntry[]>();
  for (const e of entries) {
    if (!byFamily.has(e.content_family)) byFamily.set(e.content_family, []);
    byFamily.get(e.content_family)!.push(e);
  }
  const selected: RegistryEntry[] = [];
  for (const [family, target] of Object.entries(COHORT_TARGETS)) {
    const list = (byFamily.get(family) || []).slice(0, target);
    for (const e of list) {
      e.in_cohort = true;
      selected.push(e);
    }
  }
  return selected;
}

export function generatedFilePath(route: string): string {
  const r = route.replace(/^\/|\/$/g, "");
  return path.join(GENERATED_ROOT, r, "index.md");
}

export function readGeneratedBody(route: string): { content: string; body: string; frontmatter: string } | null {
  const fp = generatedFilePath(route);
  if (!fs.existsSync(fp)) return null;
  const content = fs.readFileSync(fp, "utf-8");
  const m = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { content, body: content, frontmatter: "" };
  return { content, body: m[2], frontmatter: m[1] };
}

function slugFromRoute(route: string): string {
  const r = route.replace(/^\/|\/$/g, "").split("/").pop() || "";
  return r.replace(/-/g, " ");
}

/**
 * Compute 8-15 contextual internal links for a cohort page.
 * All targets resolve to either a COHORT route (wired together) or an existing
 * always-resolvable app route, so verification never flags broken links.
 * Targets: parent hub, pillar, 2-4 siblings, glossary, security, troubleshooting,
 * related tutorial, comparison/alternative, plus additional cohort links.
 */
export function computeInternalLinks(
  entry: RegistryEntry,
  master: UrlCandidate[],
  cohort: RegistryEntry[]
): Array<{ label: string; route: string }> {
  const links: Array<{ label: string; route: string }> = [];
  const seen = new Set<string>();

  const add = (label: string, route: string) => {
    const norm = route.replace(/\/$/, "") + "/";
    if (seen.has(norm)) return;
    if (route === entry.route) return;
    seen.add(norm);
    links.push({ label, route: norm });
  };

  const cohortByFamily = (family: string, excludeRoute: string, n: number): RegistryEntry[] =>
    cohort.filter((c) => c.content_family === family && c.route !== excludeRoute).slice(0, n);

  // 1. Parent hub (existing route)
  if (entry.parent_hub) add("Directory", entry.parent_hub.replace(/\/$/, "") + "/");

  // 2. Pillar (existing route)
  const pillar = PILLAR_ROUTE[entry.content_family] || "/mcp-server-directory/";
  add("Pillar guide", pillar);

  // 3. Siblings from cohort (same family)
  for (const s of cohortByFamily(entry.content_family, entry.route, 4)) {
    add(s.primary_entity, s.route);
  }

  // 4. Glossary (existing route)
  add("Glossary", "/glossary/");

  // 5. Security — prefer a cohort security page, else existing route
  const sec = cohortByFamily("security-guide", entry.route, 1)[0];
  if (sec) add("Security guide", sec.route);
  else add("Security", "/security/");

  // 6. Troubleshooting — prefer cohort, else existing route
  const ts = cohortByFamily("troubleshooting", entry.route, 1)[0];
  if (ts) add("Troubleshooting", ts.route);
  else add("Troubleshooting", "/troubleshooting/");

  // 7. Related tutorial — prefer same cluster in cohort, else any cohort tutorial, else existing
  const tutSame =
    cohort.filter((c) => c.content_family === "tutorial" && c.cluster === entry.cluster && c.route !== entry.route)[0] ||
    cohort.filter((c) => c.content_family === "tutorial" && c.route !== entry.route)[0];
  if (tutSame) add(tutSame.primary_entity + " tutorial", tutSame.route);
  else add("Tutorials", "/tutorials/");

  // 8. Comparison / alternative
  if (entry.content_family !== "comparison") {
    const cmp = cohortByFamily("comparison", entry.route, 1)[0];
    if (cmp) add("Compare options", cmp.route);
    else add("All comparisons", "/compare/");
  } else {
    add("All comparisons", "/compare/");
  }

  // 9. Additional cohort links (resolve after wiring) to reach 8-15
  for (const c of cohort) {
    if (links.length >= 12) break;
    if (c.route === entry.route || c.route === entry.parent_hub) continue;
    add(c.primary_entity + " guide", c.route);
  }

  return links.slice(0, 15);
}

export function injectRelatedResources(route: string, links: Array<{ label: string; route: string }>): boolean {
  const parsed = readGeneratedBody(route);
  if (!parsed) return false;
  const { body, frontmatter } = parsed;

  const list = links.map((l) => `- [${l.label}](${l.route})`).join("\n");
  const section = `## Related Resources\n\n${list}`;

  // Remove any existing related-resources section (heading + body up to the next H2 or script).
  let newBody = body.replace(/## Related Resources[^\n]*[\s\S]*?(?=\n## |\n<script)/, "");
  newBody = newBody.replace(/\n{3,}/g, "\n\n").trim();

  // Insert the section immediately before the JSON-LD script (or append).
  let newContent: string;
  if (newBody.includes('<script type="application/ld+json">')) {
    const jsonMatch = body.match(/<script type="application\/ld\+json">\n([\s\S]*?)\n<\/script>/);
    newContent = `---\n${frontmatter}\n---\n${newBody}\n\n${section}\n\n<script type="application/ld+json">\n${jsonMatch ? jsonMatch[1] : ""}\n</script>\n`;
  } else {
    newContent = `---\n${frontmatter}\n---\n${newBody}\n\n${section}\n`;
  }

  fs.writeFileSync(generatedFilePath(route), newContent);
  return true;
}

/**
 * Verification routines. Each returns a boolean pass and a set of offending ids.
 */
const UNSUPPORTED_CLAIM = /\b(guarantee|100%|cure|miracle)\b/gi;

export function verifyClaims(entry: RegistryEntry): { pass: boolean } {
  const parsed = readGeneratedBody(entry.route);
  if (!parsed) return { pass: false };
  const bad = UNSUPPORTED_CLAIM.test(parsed.body);
  return { pass: !bad };
}

export function verifySchema(entry: RegistryEntry): { pass: boolean } {
  const parsed = readGeneratedBody(entry.route);
  if (!parsed) return { pass: false };
  const m = parsed.body.match(/<script type="application\/ld\+json">\n([\s\S]*?)\n<\/script>/);
  if (!m) return { pass: false };
  try {
    const json = JSON.parse(m[1]);
    return { pass: !!json["@context"] && !!json["@type"] };
  } catch {
    return { pass: false };
  }
}

export function verifyEvidence(entry: RegistryEntry): { pass: boolean } {
  const parsed = readGeneratedBody(entry.route);
  if (!parsed) return { pass: false };
  const hasSection = /## Evidence and Sources/.test(parsed.body);
  const httpLinks = (parsed.body.match(/https?:\/\/[^\s)]+/g) || []).length;
  return { pass: hasSection && httpLinks >= 2 };
}

export function verifyIntent(entry: RegistryEntry, all: RegistryEntry[], scope: "cohort" | "all"): { pass: boolean; dupes: string[] } {
  const group = scope === "cohort" ? all.filter((e) => e.in_cohort) : all;
  const key = `${entry.search_intent}:${entry.primary_entity}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const dupes = group.filter((e) => {
    const k = `${e.search_intent}:${e.primary_entity}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return k === key && e.id !== entry.id;
  });
  return { pass: dupes.length === 0, dupes: dupes.map((d) => d.id) };
}

export function verifyCode(entry: RegistryEntry): { pass: boolean } {
  const parsed = readGeneratedBody(entry.route);
  if (!parsed) return { pass: false };
  const blocks = parsed.body.match(/```(\w+)?\n([\s\S]*?)```/g) || [];
  for (const b of blocks) {
    const langMatch = b.match(/```(\w+)?\n/);
    const lang = (langMatch?.[1] || "").toLowerCase();
    const code = b.replace(/```(\w+)?\n/, "").replace(/```$/, "");
    if (lang === "json") {
      try {
        JSON.parse(code);
      } catch {
        return { pass: false };
      }
    }
    // yaml/bash/node left to manual code_verified; non-empty required
    if (!code.trim()) return { pass: false };
  }
  return { pass: true };
}

export function verifyLinks(entry: RegistryEntry, cohortRoutes: Set<string>): { pass: boolean; broken: string[]; count: number } {
  const parsed = readGeneratedBody(entry.route);
  if (!parsed) return { pass: false, broken: [], count: 0 };
  const linkMatches = [...parsed.body.matchAll(/\[([^\]]+)\]\((\/[^)]+)\)/g)];
  const internal = linkMatches.map((m) => m[2]);
  const broken: string[] = [];
  for (const l of internal) {
    const norm = l.replace(/\/$/, "") + "/";
    if (cohortRoutes.has(norm) || ALWAYS_RESOLVABLE.has(norm)) continue;
    broken.push(l);
  }
  const count = internal.length;
  const pass = broken.length === 0 && count >= 8 && count <= 15;
  return { pass, broken, count };
}

export function verifySimilarity(entry: RegistryEntry, cohort: RegistryEntry[]): { pass: boolean; maxSim: number } {
  const self = readGeneratedBody(entry.route);
  if (!self) return { pass: false, maxSim: 1 };
  const selfTokens = new Set(tokenize(self.body));
  let maxSim = 0;
  for (const other of cohort) {
    if (other.id === entry.id) continue;
    const o = readGeneratedBody(other.route);
    if (!o) continue;
    const oTokens = new Set(tokenize(o.body));
    const inter = [...selfTokens].filter((t) => oTokens.has(t)).length;
    const union = new Set([...selfTokens, ...oTokens]).size;
    const sim = union === 0 ? 0 : inter / union;
    if (sim > maxSim) maxSim = sim;
  }
  return { pass: maxSim < 0.85, maxSim };
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .filter((w) => !["this", "that", "with", "from", "your", "have", "will", "they", "their", "what", "when", "then"].includes(w));
}

export function saveRegistry(entries: RegistryEntry[]) {
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), total: entries.length, entries }, null, 2));
}
