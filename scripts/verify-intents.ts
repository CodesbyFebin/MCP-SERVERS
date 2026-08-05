import fs from "node:fs";
import path from "node:path";
import { canonicalIntentList } from "../src/data/canonical-intents";
import { pillars } from "../src/data/pillars";

const root = process.cwd();
const evidenceDir = path.join(root, ".safe-deep", "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });

const errors: string[] = [];
const primaryQueries = new Map<string, string>();
const canonicalPaths = new Map<string, string>();
const pillarSlugs = new Set(pillars.map((pillar) => pillar.slug));

function routeExists(canonicalPath: string): boolean {
  if (canonicalPath === "/") return fs.existsSync(path.join(root, "app", "page.tsx"));
  const normalized = canonicalPath.replace(/^\/|\/$/g, "");
  if (fs.existsSync(path.join(root, "app", normalized, "page.tsx"))) return true;
  if (!normalized.includes("/") && pillarSlugs.has(normalized)) return true;
  return false;
}

for (const intent of canonicalIntentList) {
  const query = intent.primaryQuery.toLowerCase();
  if (primaryQueries.has(query)) {
    errors.push(`Duplicate primary query "${intent.primaryQuery}" owned by ${primaryQueries.get(query)} and ${intent.id}`);
  }
  primaryQueries.set(query, intent.id);

  if (canonicalPaths.has(intent.canonicalPath)) {
    errors.push(`Duplicate canonical path "${intent.canonicalPath}" owned by ${canonicalPaths.get(intent.canonicalPath)} and ${intent.id}`);
  }
  canonicalPaths.set(intent.canonicalPath, intent.id);

  if (intent.status === "active" && !routeExists(intent.canonicalPath)) {
    errors.push(`Active intent ${intent.id} points to missing route ${intent.canonicalPath}`);
  }

  for (const conflict of intent.conflictsWith || []) {
    if (canonicalPaths.has(conflict)) {
      errors.push(`Conflict path ${conflict} is also an active canonical path`);
    }
  }
}

const evidence = {
  generatedAt: new Date().toISOString(),
  totalIntents: canonicalIntentList.length,
  activeIntents: canonicalIntentList.filter((intent) => intent.status === "active").length,
  intents: canonicalIntentList,
  errors,
};

fs.writeFileSync(path.join(evidenceDir, "canonical-intents.json"), `${JSON.stringify(evidence, null, 2)}\n`);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Canonical intent registry valid (${canonicalIntentList.length} intents).`);
