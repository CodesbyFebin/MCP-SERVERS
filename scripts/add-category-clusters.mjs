#!/usr/bin/env node
/**
 * Migration script: add 15+ category clusters to src/data/categories.ts
 * Idempotent, duplicate-safe, schema-validating.
 */
import { readFile, writeFile, copyFile } from 'fs/promises';
import { join } from 'path';

const categoriesPath = join(process.cwd(), 'src', 'data', 'categories.ts');
const backupPath = join(process.cwd(), 'src', 'data', 'categories.backup.ts');

const newCategories = [
  { slug: "communication", name: "Communication", description: "Connect to Slack, Discord, Teams, Email via MCP.", iconName: "MessageCircle", count: 0 },
  { slug: "devops", name: "DevOps", description: "CI/CD, Jenkins, Docker, Kubernetes, and pipeline automation.", iconName: "Settings", count: 0 },
  { slug: "cloud", name: "Cloud Services", description: "AWS, Azure, GCP, Cloudflare, and multi-cloud MCP servers.", iconName: "Cloud", count: 0 },
  { slug: "ai-ml", name: "AI/ML Services", description: "OpenAI, Anthropic, Hugging Face, and model provider servers.", iconName: "Brain", count: 0 },
  { slug: "infrastructure", name: "Infrastructure", description: "IaC, monitoring agents, and infrastructure MCP servers.", iconName: "Server", count: 0 },
  { slug: "payments", name: "Payments & Billing", description: "Stripe, PayPal, invoicing, and payment gateway servers.", iconName: "CreditCard", count: 0 },
  { slug: "iot", name: "Internet of Things", description: "IoT device management, sensor data, and edge MCP servers.", iconName: "Zap", count: 0 },
  { slug: "analytics", name: "Analytics & Data", description: "Analytics platforms, BI tools, and data visualization servers.", iconName: "BarChart3", count: 0 },
  { slug: "security", name: "Security & Compliance", description: "Identity, compliance, secrets management, and security servers.", iconName: "Shield", count: 0 },
  { slug: "storage", name: "Storage & CDN", description: "Object storage, file systems, backups, and CDN servers.", iconName: "HardDrive", count: 0 },
  { slug: "monitoring", name: "Monitoring & Observability", description: "APM, logging, tracing, and metrics MCP servers.", iconName: "Activity", count: 0 }
];

async function main() {
  await copyFile(categoriesPath, backupPath);
  const content = await readFile(categoriesPath, 'utf8');

  // Extract existing slugs
  const existingSlugs = new Set();
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    existingSlugs.add(match[1]);
  }

  // Filter out duplicates
  const toAdd = newCategories.filter(cat => !existingSlugs.has(cat.slug));
  if (toAdd.length === 0) {
    console.log('All categories already exist. No changes made.');
    return;
  }

  // Validate
  for (const cat of toAdd) {
    if (!cat.slug || !cat.name || !cat.description || !cat.iconName) {
      throw new Error(`Invalid category: ${JSON.stringify(cat)}`);
    }
  }

  // Insert before closing bracket
  const insertion = toAdd.map(cat =>
    `  {
    slug: "${cat.slug}",
    name: "${cat.name}",
    description: "${cat.description}",
    iconName: "${cat.iconName}",
    count: ${cat.count}
  }`
  ).join(',\n');

  const updated = content.replace(
    /(export const categories: DirectoryCategory\[\] = \[)([\s\S]*?)(\n\];)/,
    `$1$2,\n${insertion}$3`
  );

  await writeFile(categoriesPath, updated, 'utf8');
  console.log(`Added ${toAdd.length} new categories:`);
  toAdd.forEach(c => console.log(`  - ${c.name} (${c.slug})`));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
