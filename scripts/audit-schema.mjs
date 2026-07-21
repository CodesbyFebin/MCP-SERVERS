#!/usr/bin/env node
/**
 * Validates src/data/docs.ts and src/data/glossary.ts against their real
 * TypeScript interfaces (see the DocsPage / GlossaryTerm interfaces in
 * those files - this script is a plain-JS mirror of them, kept in sync
 * by hand since it needs to run without a TS compiler step).
 *
 * Usage: npx tsx scripts/audit-schema.mjs
 */

import { docsPages } from "../src/data/docs.js";
import { glossaryTerms } from "../src/data/glossary.js";

let totalErrors = 0;

function logError(context, message) {
  console.error(`ERROR ${context}: ${message}`);
  totalErrors++;
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateKebabCase(str, context) {
  if (typeof str !== "string" || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(str)) {
    logError(context, `expected lowercase-kebab-case, got "${str}"`);
  }
}

function validateDocs() {
  console.log("\nAuditing docs.ts...");
  if (!Array.isArray(docsPages)) {
    logError("docs.ts", "docsPages is not an array");
    return;
  }

  const validSchemaTypes = ["TechArticle", "HowTo", "FAQPage", "DefinedTerm", "ComparisonPage", "SoftwareApplication"];
  const validChangefreqs = ["daily", "weekly", "monthly"];
  const slugSet = new Set();

  docsPages.forEach((doc, index) => {
    const ctx = `docs[${index}] (${doc.title ?? "untitled"})`;

    if (!Array.isArray(doc.slug) || doc.slug.length === 0 || doc.slug.some((s) => typeof s !== "string" || !s)) {
      logError(ctx, "slug must be a non-empty string[]");
    } else {
      const fullSlug = doc.slug.join("/");
      if (slugSet.has(fullSlug)) logError(ctx, `duplicate slug: ${fullSlug}`);
      slugSet.add(fullSlug);
    }

    if (!doc.title || typeof doc.title !== "string") logError(ctx, "title missing or invalid");
    if (!doc.description || typeof doc.description !== "string") logError(ctx, "description missing or invalid");
    if (!doc.directAnswer || typeof doc.directAnswer !== "string") logError(ctx, "directAnswer missing or invalid");

    validateKebabCase(doc.category, `${ctx}.category`);
    validateKebabCase(doc.cluster, `${ctx}.cluster`);

    if (!Array.isArray(doc.tags)) logError(ctx, "tags must be an array");
    if (!Array.isArray(doc.targetKeywords)) logError(ctx, "targetKeywords must be an array");
    if (!Array.isArray(doc.keyTakeaways) || doc.keyTakeaways.length === 0) {
      logError(ctx, "keyTakeaways must be a non-empty string[]");
    }

    if (!Array.isArray(doc.sections) || doc.sections.length === 0) {
      logError(ctx, "sections must be a non-empty array");
    } else {
      doc.sections.forEach((sec, sIdx) => {
        const secCtx = `${ctx}.sections[${sIdx}]`;
        if (!sec.heading || typeof sec.heading !== "string") logError(secCtx, "heading missing");
        if (!Array.isArray(sec.body) || sec.body.length === 0 || sec.body.some((b) => typeof b !== "string")) {
          logError(secCtx, "body must be a non-empty string[]");
        }
        if (sec.code !== undefined && typeof sec.code !== "string") logError(secCtx, "code must be a string if present");
        if (sec.table !== undefined) {
          if (!Array.isArray(sec.table.headers) || !Array.isArray(sec.table.rows)) {
            logError(secCtx, "table must have headers: string[] and rows: string[][]");
          }
        }
      });
    }

    if (!Array.isArray(doc.faqs)) {
      logError(ctx, "faqs must be an array");
    } else {
      doc.faqs.forEach((faq, fIdx) => {
        if (!faq.question || typeof faq.question !== "string") logError(`${ctx}.faqs[${fIdx}]`, "question missing");
        if (!faq.answer || typeof faq.answer !== "string") logError(`${ctx}.faqs[${fIdx}]`, "answer missing");
      });
    }

    if (!Array.isArray(doc.citations) || doc.citations.some((c) => typeof c !== "string")) {
      logError(ctx, "citations must be a string[]");
    }

    if (!Array.isArray(doc.related)) {
      logError(ctx, "related must be an array");
    } else {
      doc.related.forEach((rel, rIdx) => {
        if (typeof rel !== "string" || !rel.startsWith("/")) {
          logError(`${ctx}.related[${rIdx}]`, `must be a full path starting with "/", got "${rel}"`);
        }
      });
    }

    if (!validSchemaTypes.includes(doc.schemaType)) {
      logError(ctx, `schemaType must be one of ${validSchemaTypes.join(", ")}, got "${doc.schemaType}"`);
    }
    if (typeof doc.priority !== "number" || doc.priority < 0 || doc.priority > 1) {
      logError(ctx, "priority must be a number between 0 and 1");
    }
    if (!validChangefreqs.includes(doc.changefreq)) {
      logError(ctx, `changefreq must be one of ${validChangefreqs.join(", ")}, got "${doc.changefreq}"`);
    }
  });

  console.log(`docs.ts: ${docsPages.length} entries checked`);
}

function validateGlossary() {
  console.log("\nAuditing glossary.ts...");
  if (!Array.isArray(glossaryTerms)) {
    logError("glossary.ts", "glossaryTerms is not an array");
    return;
  }

  const slugSet = new Set();

  glossaryTerms.forEach((term, index) => {
    const ctx = `glossary[${index}] (${term.term ?? "untitled"})`;

    if (!term.slug || typeof term.slug !== "string") {
      logError(ctx, "slug must be a string");
    } else {
      if (slugSet.has(term.slug)) logError(ctx, `duplicate slug: ${term.slug}`);
      slugSet.add(term.slug);
    }

    if (!term.term || typeof term.term !== "string") logError(ctx, "term missing");
    if (!term.definition || typeof term.definition !== "string") logError(ctx, "definition missing");
    if (!term.detailedExplanation || typeof term.detailedExplanation !== "string") logError(ctx, "detailedExplanation missing");
    if (!Array.isArray(term.keyTakeaways) || term.keyTakeaways.length === 0) {
      logError(ctx, "keyTakeaways must be a non-empty string[]");
    }
    if (!term.useCase || typeof term.useCase !== "string") logError(ctx, "useCase missing");

    // technicalDetails is an object ({ protocolLayer?, format?, latencyProfile?, ... }),
    // never a string - this is the opposite of what an earlier draft of this script checked.
    if (!isPlainObject(term.technicalDetails)) {
      logError(ctx, "technicalDetails must be an object");
    }

    if (!Array.isArray(term.references)) {
      logError(ctx, "references must be an array");
    }

    if (term.faqs !== undefined) {
      if (!Array.isArray(term.faqs)) {
        logError(ctx, "faqs must be an array if present");
      } else {
        term.faqs.forEach((faq, fIdx) => {
          if (!faq.question || typeof faq.question !== "string") logError(`${ctx}.faqs[${fIdx}]`, "question missing");
          if (!faq.answer || typeof faq.answer !== "string") logError(`${ctx}.faqs[${fIdx}]`, "answer missing");
        });
      }
    }
  });

  console.log(`glossary.ts: ${glossaryTerms.length} entries checked`);
}

console.log("Data schema audit\n" + "=".repeat(50));
validateDocs();
validateGlossary();
console.log("\n" + "=".repeat(50));

if (totalErrors === 0) {
  console.log("All checks passed.");
  process.exit(0);
} else {
  console.log(`${totalErrors} error(s) found.`);
  process.exit(1);
}
