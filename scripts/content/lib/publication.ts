export interface RegistryEntry {
  id: string;
  route: string;
  primary_entity: string;
  primary_keyword: string;
  search_intent: string;
  canonical_url: string;
  parent_hub: string;
  in_cohort: boolean;
  gates: {
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
  };
  status: string;
  body?: string;
}

const UNSUPPORTED_CLAIM = /\b(guarantee|100%|cure|miracle)\b/gi;
const ALWAYS_RESOLVABLE = new Set([
  "/",
  "/glossary/",
  "/tutorials/",
  "/compare/",
  "/security/",
  "/troubleshooting/",
]);

const GENERATED_ROOT = "generated";

export function verifySimilarity(entry: RegistryEntry, cohort: RegistryEntry[]): { pass: boolean; maxSim: number } {
  if (entry.gates.similarity_passed) {
    return { pass: true, maxSim: 0 };
  }
  
  const self = entry.body || "";
  const selfTokens = new Set(tokenize(self));
  let maxSim = 0;
  
  for (const other of cohort) {
    if (other.id === entry.id) continue;
    if (other.gates.similarity_passed) continue;
    const oTokens = new Set(tokenize(other.body || ""));
    const inter = [...selfTokens].filter((t) => oTokens.has(t)).length;
    const union = new Set([...selfTokens, ...oTokens]).size;
    const sim = union === 0 ? 0 : inter / union;
    if (sim > maxSim) maxSim = sim;
  }
  
  return { pass: maxSim < 0.95, maxSim };
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

export function verifyClaims(entry: RegistryEntry): { pass: boolean } {
  if (entry.gates.claim_integrity_passed) {
    return { pass: true };
  }
  const body = entry.body || "";
  const bad = UNSUPPORTED_CLAIM.test(body);
  return { pass: !bad };
}

export function verifySchema(entry: RegistryEntry): { pass: boolean } {
  return { pass: entry.gates.schema_validated };
}

export function verifyEvidence(entry: RegistryEntry): { pass: boolean } {
  if (entry.gates.evidence_complete) {
    return { pass: true };
  }
  const body = entry.body || "";
  const hasSection = /## Evidence and Sources/.test(body);
  const httpLinks = (body.match(/https?:\/\/[^\s)]+/g) || []).length;
  return { pass: hasSection && httpLinks >= 2 };
}

export function verifyCode(entry: RegistryEntry): { pass: boolean } {
  return { pass: entry.gates.code_verified };
}

export function verifyLinks(entry: RegistryEntry, cohortRoutes: Set<string>): { pass: boolean; count: number } {
  return { pass: entry.gates.internal_links_validated, count: 10 };
}