#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glossaryTerms } from '../src/data/glossary.js';
import { pillars } from '../src/data/pillars.js';
import { topics } from '../src/data/topics.js';
import { servers } from '../src/data/servers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRAFTS_DIR = path.join(__dirname, '..', 'drafts');
const MIN_WORDS = 1000;
const TARGET_WORDS = 2000;

function wordCount(text) {
  if (!text) return 0;
  return text.split(/\s+/).length;
}

function buildPrompt(item, type) {
  const title = item.title || item.term || item.name || 'Untitled';
  const existing = item.content || item.detailedExplanation || item.description || item.shortAnswer || '';
  const tags = item.keyTakeaways || item.features || item.useCases || [];
  const tagStr = Array.isArray(tags) ? tags.join(', ') : '';

  return `You are an expert technical writer. Write a comprehensive, 2000+ word article titled "${title}".

**Context:**
- Type: ${type}
- Existing summary: "${String(existing).substring(0, 200)}..."
- Tags: ${tagStr}

**Required structure (use Markdown headings):**
1. **Introduction** (150+ words): Hook the reader, explain why this topic matters.
2. **What is ${title}?** (200+ words): Clear definition, background, and origin.
3. **Why It Matters** (150+ words): Relevance to developers, AI agents, or the Indian ecosystem.
4. **Core Architecture / How It Works** (300+ words): Technical deep-dive.
5. **Step-by-Step Guide** (300+ words): Actionable steps, code examples.
6. **Best Practices** (150+ words): Do's and don'ts.
7. **Common Pitfalls & Solutions** (150+ words): Troubleshooting.
8. **FAQ** (5+ questions): Answer common search queries.
9. **Community Insights** (100+ words): Placeholder for user contributions.
10. **Conclusion & Next Steps** (50+ words): Call to action.

**Additional requirements:**
- Use **##** for H2 and **###** for H3.
- Include at least one code block.
- Use internal links to other pages on this site when relevant.
- Keep tone professional yet approachable.
- Do NOT mention you are an AI.
- Do NOT include fake statistics or unverified claims.

Output **only** the Markdown content.`;
}

async function generateContent(prompt) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2:latest',
      prompt,
      stream: false,
      options: { temperature: 0.7, top_p: 0.9, max_tokens: 3000 },
    }),
  });

  if (!response.ok) throw new Error(`Ollama error: ${response.status}`);
  return response.json().then(data => data.response);
}

async function main() {
  if (!fs.existsSync(DRAFTS_DIR)) fs.mkdirSync(DRAFTS_DIR, { recursive: true });

  const pages = [
    ...glossaryTerms.map(item => ({ ...item, type: 'glossary', id: item.slug })),
    ...pillars.map(item => ({ ...item, type: 'pillar', id: item.slug })),
    ...topics.map(item => ({ ...item, type: 'topic', id: item.slug })),
    ...servers.map(item => ({ ...item, type: 'server', id: item.slug })),
  ];

  const lowPages = pages.filter(item => {
    const content = item.content || item.detailedExplanation || item.description || item.shortAnswer || '';
    return wordCount(content) < MIN_WORDS;
  });

  console.log(`Found ${lowPages.length} pages with < ${MIN_WORDS} words.`);

  let generated = 0;
  const report = [];

  for (const item of lowPages.slice(0, 50)) {
    const slug = item.slug || item.id || '';
    if (!slug) continue;

    const title = item.title || item.term || item.name || 'Untitled';
    console.log(`Generating draft for: ${title}`);

    try {
      const prompt = buildPrompt(item, item.type);
      const draft = await generateContent(prompt);
      const ugcPlaceholder = `\n\n## 💬 Community Insights\n\nWe'd love to hear from you! Have you used **${title}** in your projects? Share your experiences, tips, or questions below.\n`;
      const finalDraft = draft.includes('Community Insights') ? draft : draft + ugcPlaceholder;

      const filePath = path.join(DRAFTS_DIR, `${slug}.md`);
      fs.writeFileSync(filePath, finalDraft, 'utf-8');
      generated++;
      report.push({ slug, title, words: wordCount(finalDraft) });
    } catch (error) {
      console.error(`Failed for ${title}:`, error.message);
      report.push({ slug, title, error: error.message });
    }
  }

  fs.writeFileSync(path.join(DRAFTS_DIR, 'generation-report.json'), JSON.stringify(report, null, 2), 'utf-8');
  console.log(`Generated ${generated} drafts. Report saved to generation-report.json`);
}

main().catch(console.error);