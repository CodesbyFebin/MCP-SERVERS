import fs from "node:fs";
import path from "node:path";
import { phaseAApprovedRoutes, phaseAUrlInventory } from "../src/data/phase-a-authority.generated";

const evidenceDir = path.join(process.cwd(), ".safe-deep", "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });

const errors: string[] = [];
const urls = new Set<string>();
const intents = new Set<string>();
const canonicals = new Set<string>();

if (phaseAUrlInventory.length !== 100) {
  errors.push(`Expected exactly 100 Phase A URLs, found ${phaseAUrlInventory.length}`);
}

if (phaseAApprovedRoutes.length !== 100) {
  errors.push(`Expected exactly 100 Phase A approved routes, found ${phaseAApprovedRoutes.length}`);
}

for (const page of phaseAUrlInventory) {
  if (urls.has(page.url)) errors.push(`Duplicate URL: ${page.url}`);
  urls.add(page.url);

  if (canonicals.has(page.canonical_url)) errors.push(`Duplicate canonical: ${page.canonical_url}`);
  canonicals.add(page.canonical_url);

  if (intents.has(page.canonicalIntent)) errors.push(`Duplicate canonical intent: ${page.canonicalIntent}`);
  intents.add(page.canonicalIntent);

  if (!page.url.startsWith("https://www.mcpserver.in/")) errors.push(`Non-canonical host/protocol: ${page.url}`);
  if (!page.url.endsWith("/")) errors.push(`Missing trailing slash: ${page.url}`);
  if (/[A-Z]/.test(new URL(page.url).pathname)) errors.push(`Uppercase URL path: ${page.url}`);
  if (/\d+$/.test(new URL(page.url).pathname.replace(/\/$/, ""))) errors.push(`Numeric suffix URL: ${page.url}`);

  if (!page.h1) errors.push(`Missing H1: ${page.url}`);
  if (!page.title) errors.push(`Missing title: ${page.url}`);
  if (!page.meta_description) errors.push(`Missing meta description: ${page.url}`);
  if (!page.primary_keyword) errors.push(`Missing primary keyword: ${page.url}`);
  if (!page.primary_entity) errors.push(`Missing primary entity: ${page.url}`);
  if (page.publication_state !== "publish_approved") errors.push(`Publication state not approved: ${page.url}`);
  if (page.quality_score < 90) errors.push(`Quality score below 90: ${page.url}`);
  if (!page.evidence_complete) errors.push(`Evidence incomplete: ${page.url}`);
  if (!Array.isArray(page.evidence_sources) || page.evidence_sources.length === 0) errors.push(`Missing evidence sources: ${page.url}`);
  if (!Array.isArray(page.schemaTypes) || page.schemaTypes.length === 0) errors.push(`Missing schema types: ${page.url}`);

  const directAnswerWords = page.direct_answer.trim().split(/\s+/).filter(Boolean).length;
  if (directAnswerWords < 40 || directAnswerWords > 80) {
    errors.push(`Direct answer not 40-80 words (${directAnswerWords}): ${page.url}`);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  totalApprovedUrls: phaseAUrlInventory.length,
  missingH1: phaseAUrlInventory.filter((page) => !page.h1).length,
  missingCanonicals: phaseAUrlInventory.filter((page) => !page.canonical_url).length,
  duplicatePrimaryIntents: phaseAUrlInventory.length - intents.size,
  duplicateCanonicals: phaseAUrlInventory.length - canonicals.size,
  pagesBelowQualityScore90: phaseAUrlInventory.filter((page) => page.quality_score < 90).length,
  publicationApprovalFailures: phaseAUrlInventory.filter((page) => page.publication_state !== "publish_approved").length,
  evidenceIncomplete: phaseAUrlInventory.filter((page) => !page.evidence_complete).length,
  errors,
};

fs.writeFileSync(path.join(evidenceDir, "phase-a-content-validation.json"), `${JSON.stringify(report, null, 2)}\n`);

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL ${error}`);
  process.exit(1);
}

console.log(`Phase A content validation passed (${phaseAUrlInventory.length} URLs).`);
