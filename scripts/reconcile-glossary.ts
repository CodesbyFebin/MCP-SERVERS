import fs from "node:fs";
import path from "node:path";
import { glossaryTerms } from "../src/data/glossary";
import { isLowValueGlossarySlug } from "../src/lib/glossarySeo";

const root = process.cwd();
const reportsDir = path.join(root, "reports");
fs.mkdirSync(reportsDir, { recursive: true });

function actionFor(slug: string, references: string[], definition: string): string {
  if (isLowValueGlossarySlug(slug)) return "NOINDEX_FOLLOW";
  if (!references.length || definition.length < 80) return "REWRITE";
  return "KEEP";
}

const inventory = glossaryTerms.map((term) => {
  const action = actionFor(term.slug, term.references || [], term.definition || "");
  return {
    slug: term.slug,
    path: `/glossary/${term.slug}/`,
    term: term.term,
    action,
    indexable: action === "KEEP" || action === "REWRITE",
    hasNumericSuffix: /-\d+$/.test(term.slug),
    references: term.references?.length || 0,
    reason:
      action === "NOINDEX_FOLLOW"
        ? "Low standalone search value or generated numeric/generic slug; useful for navigation only."
        : action === "REWRITE"
          ? "Potentially valuable intent but needs stronger MCP-specific treatment."
          : "Clean MCP-specific term with references.",
  };
});

const csv = [
  "slug,path,term,state,indexable,reason",
  ...inventory.map((row) =>
    [row.slug, row.path, row.term, row.action, String(row.indexable), row.reason]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(","),
  ),
].join("\n");

fs.writeFileSync(path.join(reportsDir, "glossary-inventory.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), total: inventory.length, inventory }, null, 2)}\n`);
fs.writeFileSync(path.join(reportsDir, "glossary-actions.csv"), `${csv}\n`);
console.log(`Wrote glossary inventory for ${inventory.length} terms.`);
