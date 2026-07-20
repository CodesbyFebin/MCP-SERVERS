#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const SCHEMA_TYPES = ['Article', 'BlogPosting', 'TechArticle', 'DefinedTerm', 'FAQPage', 'BreadcrumbList', 'WebApplication', 'Organization', 'WebSite', 'WebPage', 'HowTo'];

let totalErrors = 0;
let totalWarnings = 0;
let pagesWithSchema = 0;
let totalPages = 0;

function validateSchema(schema) {
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
  const schemas = [];
  
  // Pattern: dangerouslySetInnerHTML: {"__html":"{...JSON...}"}
  const dangerPattern = /dangerouslySetInnerHTML\s*:\s*\{\s*__html\s*:\s*"((?:[^"\\]|\\.)*)"\s*\}/g;
  let match;
  
  while ((match = dangerPattern.exec(html)) !== null) {
    try {
      let jsonStr = match[1];
      // Unescape: \\" -> ", \\\\ -> \
      jsonStr = jsonStr.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      const json = JSON.parse(jsonStr);
      schemas.push(json);
    } catch (e) {
      // Skip malformed
    }
  }
  
  return schemas;
}

function validateArticleSchema(schema) {
  const errors = [];
  const required = ['headline', 'description', 'author', 'publisher'];
  for (const field of required) {
    if (!schema[field]) errors.push(`Article missing required field: ${field}`);
  }
  return errors;
}

function validateDefinedTermSchema(schema) {
  const errors = [];
  if (!schema.name || !schema.description) {
    errors.push('DefinedTerm missing name or description');
  }
  return errors;
}

function validateFAQSchema(schema) {
  const errors = [];
  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    errors.push('FAQPage missing mainEntity array');
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

function processFile(fullPath) {
  totalPages++;
  
  try {
    const html = fs.readFileSync(fullPath, 'utf-8');
    const schemas = extractJsonLdFromHtml(html);

    if (schemas.length === 0) return;

    pagesWithSchema++;

    for (const schema of schemas) {
      const baseValidation = validateSchema(schema);
      let typeErrors = [];

      if (schema['@type']) {
        const types = Array.isArray(schema['@type']) ? schema['@type'] : [schema['@type']];
        for (const t of types) {
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
      }

      const allErrors = [...baseValidation.errors, ...typeErrors];
      const allWarnings = baseValidation.warnings;

      if (allErrors.length > 0) {
        totalErrors++;
      }
      if (allWarnings.length > 0) {
        totalWarnings += allWarnings.length;
      }
    }
  } catch (error) {
    console.warn(`⚠️ Error processing ${fullPath}: ${error.message}`);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

function main() {
  const buildDir = path.join(PROJECT_ROOT, 'dist');
  if (!fs.existsSync(buildDir)) {
    console.log('ℹ️  Build directory not found. Run `npm run build` first.');
    process.exit(0);
  }

  console.log('🔍 Validating JSON-LD schemas in built pages...\n');

  walk(buildDir);

  console.log(`\n📊 Validation Summary:`);
  console.log(`   Total pages scanned: ${totalPages}`);
  console.log(`   Pages with JSON-LD: ${pagesWithSchema}`);
  console.log(`   Pages with schema errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.error('\n❌ Schema validation has issues.');
    process.exit(1);
  }
  console.log('\n✅ All schemas valid.');
  process.exit(0);
}

main();