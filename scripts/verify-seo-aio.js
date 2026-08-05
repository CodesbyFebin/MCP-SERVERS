#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const checks = {
  'robots.txt exists': fs.existsSync('robots.txt'),
  'llms.txt exists': fs.existsSync('public/llms.txt'),
  'sitemap.xml exists': fs.existsSync('public/sitemap.xml'),
  'sitemap-index.xml exists': fs.existsSync('public/sitemap-index.xml'),
  'AI crawler config in robots.txt': fs.existsSync('robots.txt') && fs.readFileSync('robots.txt', 'utf-8').includes('OAI-SearchBot'),
  'Core Web Vitals data': fs.existsSync('public/data/lighthouse-baseline.json'),
  'SEO rankings data': fs.existsSync('public/data/seo-rankings.json'),
  'MCP stats data': fs.existsSync('public/data/mcp-stats-2026.json')
};

console.log('=== SEO/AIO VERIFICATION CHECK ===\n');

let passed = 0;
let failed = 0;

for (const [check, result] of Object.entries(checks)) {
  const status = result ? '✓' : '✗';
  console.log(`  ${status} ${check}`);
  if (result) passed++;
  else failed++;
}

console.log(`\nTotal: ${passed} passed, ${failed} failed`);

// Detailed check for robots.txt content
if (checks['robots.txt exists']) {
  console.log('\n=== ROBOTS.TXT ANALYSIS ===');
  const content = fs.readFileSync('robots.txt', 'utf-8');
  
  const aiCrawlers = ['OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'];
  const found = aiCrawlers.filter(c => content.includes(c));
  console.log(`AI crawlers configured: ${found.length}/${aiCrawlers.length}`);
  
  if (found.length > 0) {
    console.log('  Allows:', found.join(', '));
  }
}

process.exit(failed > 0 ? 1 : 0);