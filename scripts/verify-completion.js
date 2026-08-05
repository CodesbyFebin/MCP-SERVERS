#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('=== 100% COMPLETION VERIFICATION ===\n');

let totalChecks = 0;
let passedChecks = 0;

function check(name, condition, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`✓ ${name}${details ? ' - ' + details : ''}`);
  } else {
    console.log(`✗ ${name}${details ? ' - ' + details : ''}`);
  }
}

// 1. SEO Foundation
console.log('--- SEO Foundation ---');
check('robots.txt exists', fs.existsSync('robots.txt'));
check('AI crawler config (OAI-SearchBot)', fs.readFileSync('robots.txt', 'utf-8').includes('OAI-SearchBot'));
check('AI crawler config (PerplexityBot)', fs.readFileSync('robots.txt', 'utf-8').includes('PerplexityBot'));
check('AI crawler config (ClaudeBot)', fs.readFileSync('robots.txt', 'utf-8').includes('ClaudeBot'));
check('Sitemap index exists', fs.existsSync('public/sitemap.xml'));
check('Core Web Vitals data', fs.existsSync('public/data/lighthouse-baseline.json'));
check('SEO rankings data', fs.existsSync('public/data/seo-rankings.json'));

// 2. AEO Implementation
console.log('\n--- AEO Implementation ---');
check('llms.txt exists', fs.existsSync('public/llms.txt'));
check('SchemaJsonLd component', fs.existsSync('src/components/SchemaJsonLd.tsx'));
check('Schema generation library', fs.existsSync('src/lib/schema.ts'));
check('Pilot server schema generator', fs.existsSync('src/lib/schema-pilot.ts'));

// 3. GEO Implementation
console.log('\n--- GEO Implementation ---');
check('MCP stats data (citation source)', fs.existsSync('public/data/mcp-stats-2026.json'));
check('India compliance data', fs.existsSync('public/data/mcp-india-stats-2026.csv'));
const llms = fs.readFileSync('public/llms.txt', 'utf-8');
check('PILOT COHORT in llms.txt', llms.includes('Pilot Cohort'));
check('Cluster endpoints documented', llms.includes('Generated Content Distribution'));

// 4. Publication Infrastructure
console.log('\n--- Publication Infrastructure ---');
check('PUBLICATION_REGISTRY exists', fs.existsSync('PUBLICATION_REGISTRY.json'));
check('5000 entries created', JSON.parse(fs.readFileSync('PUBLICATION_REGISTRY.json')).total === 5000);
check('Pilot cohort approved', JSON.parse(fs.readFileSync('PUBLICATION_REGISTRY.json')).entries.slice(0,50).every(e => e.gates.similarity_passed));
check('Generated content directories', fs.existsSync('generated/clusters'));
check('Verification script exists', fs.existsSync('scripts/content/verify-publication.ts'));

// 5. Quality Gates
console.log('\n--- Quality Gates ---');
const registry = JSON.parse(fs.readFileSync('PUBLICATION_REGISTRY.json'));
const pilot = registry.entries.slice(0, 50);
check('Pilot: all similarity_passed', pilot.every(e => e.gates.similarity_passed === true));
check('Pilot: all publish_approved', pilot.every(e => e.gates.publish_approved === true));
check('Pilot: all indexable', pilot.every(e => e.gates.indexable === true));
check('Pilot: all gates validated', pilot.every(e => e.gates.intent_validated && e.gates.evidence_complete && e.gates.schema_validated));

// 6. Build Output
console.log('\n--- Build Artifacts ---');
check('Next.js build directory', fs.existsSync('.next'));
const sitemapContent = fs.readFileSync('public/sitemap-index.xml', 'utf-8');
check('Sitemap index has entries', sitemapContent.includes('<sitemap>') && sitemapContent.includes('</sitemap>'));

// Summary
console.log('\n=== VERIFICATION SUMMARY ===');
console.log(`Completed: ${passedChecks}/${totalChecks} checks passed`);

if (passedChecks === totalChecks) {
  console.log('\n✅ 100% COMPLETE - All checklist items verified');
  process.exit(0);
} else {
  console.log('\n⚠️  Completion: ' + Math.round((passedChecks/totalChecks)*100) + '%');
  process.exit(1);
}