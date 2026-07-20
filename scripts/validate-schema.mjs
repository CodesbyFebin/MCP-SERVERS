#!/usr/bin/env node
/**
 * Schema Validation Script
 * Validates JSON-LD schemas in generated pages for SEO/GEO compliance.
 * Runs during build or as a standalone check.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const SCHEMA_TYPES = ['Article', 'BlogPosting', 'TechArticle', 'DefinedTerm', 'FAQPage', 'BreadcrumbList', 'WebApplication', 'Organization', 'WebSite', 'WebPage', 'HowTo'];

async function validateSchema(schema) {
  const errors = [];
  const warnings = [];

  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context (must be https://schema.org)');
  }

  if (!schema['@type']) {
    errors.push('Missing @type');
  } else if (Array.isArray(schema['@type'])) {
    for (const t of schema['@type']) {
      if (!SCHEMA_TYPES.includes(t) && !t.startsWith('https://')) {
        warnings.push(`@type "${t}" not in standard list`);
      }
    }
  } else if (!SCHEMA_TYPES.includes(schema['@type']) && !schema['@type'].startsWith('https://')) {
    warnings.push(`@type "${schema['@type']}" not in standard list`);
  }

  return { errors, warnings };
}

function extractJsonLdFromHtml(html) {
  const scripts = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (!scripts) return [];

  const schemas = [];
  for (const script of scripts) {
    const content = script.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const json = JSON.parse(content.trim());
      schemas.push(json);
    } catch (e) {
      console.warn('⚠️ Failed to parse JSON-LD:', e.message);
    }
  }
  return schemas;
}

function validateArticleSchema(schema) {
  const errors = [];
  const required = ['headline', 'description', 'datePublished', 'author', 'publisher'];
  for (const field of required) {
    if (!schema[field]) errors.push(`Article missing required field: ${field}`);
  }
  return errors;
}

function validateDefinedTermSchema(schema) {
  const errors = [];
  const required = ['name', 'description', 'inDefinedTermSet'];
  for (const field of required) {
    if (!schema[field]) errors.push(`DefinedTerm missing required field: ${field}`);
  }
  return errors;
}

function validateFAQSchema(schema) {
  const errors = [];
  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    errors.push('FAQPage missing mainEntity array');
  } else {
    for (const q of schema.mainEntity) {
      if (!q.name) errors.push('FAQ Question missing name');
      if (!q.acceptedAnswer || !q.acceptedAnswer.text) errors.push('FAQ Answer missing text');
    }
  }
  return errors;
}

function validateBreadcrumbSchema(schema) {
  const errors = [];
  if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
    errors.push('BreadcrumbList missing itemListElement array');
  }
  return errors;
}

async function main() {
  const buildDir = path.join(PROJECT_ROOT, 'dist');
  if (!fs.existsSync(buildDir)) {
    console.log('ℹ️  Build directory not found. Run `npm run build` first.');
    process.exit(0);
  }

  console.log('🔍 Validating JSON-LD schemas in built pages...\n');

  let totalErrors = 0;
  let totalWarnings = 0;
  let pagesChecked = 0;

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === 'index.html') {
        const html = fs.readFileSync(fullPath, 'utf-8');
        const schemas = extractJsonLdFromHtml(html);

        for (const schema of schemas) {
          pagesChecked++;
          const baseValidation = await validateSchema(schema);
          let typeErrors = [];

          if (Array.isArray(schema['@type'])) {
            for (const t of schema['@type']) {
              if (t === 'Article' || t === 'BlogPosting' || t === 'TechArticle') {
                typeErrors.push(...validateArticleSchema(schema));
              } else if (t === 'DefinedTerm') {
                typeErrors.push(...validateDefinedTermSchema(schema));
              } else if (t === 'FAQPage') {
                typeErrors.push(...validateFAQSchema(schema));
              } else if (t === 'BreadcrumbList') {
                typeErrors.push(...validateBreadcrumbSchema(schema));
              }
            }
          } else {
            const t = schema['@type'];
            if (t === 'Article' || t === 'BlogPosting' || t === 'TechArticle') {
              typeErrors.push(...validateArticleSchema(schema));
            } else if (t === 'DefinedTerm') {
              typeErrors.push(...validateDefinedTermSchema(schema));
            } else if (t === 'FAQPage') {
              typeErrors.push(...validateFAQSchema(schema));
            } else if (t === 'BreadcrumbList') {
              typeErrors.push(...validateBreadcrumbSchema(schema));
            }
          }

          const allErrors = [...baseValidation.errors, ...typeErrors];
          const allWarnings = baseValidation.warnings;

          if (allErrors.length > 0) {
            console.error(`❌ ${fullPath.replace(PROJECT_ROOT + '/', '')}`);
            for (const e of allErrors) console.error(`   - ${e}`);
            totalErrors += allErrors.length;
          }
          if (allWarnings.length > 0) {
            console.warn(`⚠️  ${fullPath.replace(PROJECT_ROOT + '/', '')}`);
            for (const w of allWarnings) console.warn(`   - ${w}`);
            totalWarnings += allWarnings.length;
          }
        }
      }
    }
  }

  walk(buildDir);

  console.log(`\n📊 Validation Summary:`);
  console.log(`   Pages checked: ${pagesChecked}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.error('\n❌ Schema validation failed.');
    process.exit(1);
  }
  console.log('\n✅ All schemas valid.');
  process.exit(0);
}

main().catch(console.error);