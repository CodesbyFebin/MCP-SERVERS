#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glossaryTerms } from '../src/data/glossary.ts';
import { pillars } from '../src/data/pillars.ts';
import { servers } from '../src/data/servers.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'llms.txt');
const BASE_URL = 'https://mcpserver.in';

function generateLLMsTxt() {
  // Counting real array lengths directly (rather than regex-matching "slug:"
  // occurrences in the source text) so entries built programmatically -
  // e.g. servers.ts generates some entries via .map() over a template array,
  // which only appears once in the source text but produces many objects at
  // runtime - are counted correctly.
  const glossaryCount = glossaryTerms.length;
  const pillarsCount = pillars.length;
  const serversCount = servers.length;

  const topPillars = [
    { slug: 'what-is-mcp', title: 'What is MCP? (Protocol Specification)', description: 'Core protocol architecture, JSON-RPC 2.0 message format, and transport options.' },
    { slug: 'mcp-server', title: 'MCP Server — The Universal Connector', description: 'What an MCP server exposes (tools, resources, prompts) and how it is structured.' },
    { slug: 'mcp-protocol', title: 'MCP Protocol — JSON-RPC 2.0 & Transports', description: 'Message format, request/response lifecycle, and stdio/SSE/Streamable HTTP transports.' },
    { slug: 'mcp-hosting', title: 'MCP Hosting — India Edge Network', description: 'Deployment and hosting considerations for MCP servers, with an India-region focus.' },
    { slug: 'mcp-security', title: 'MCP Security & Compliance', description: 'Authentication, credential handling, and India-specific compliance considerations (DPDP).' }
  ];

  const indiaCompliance = [
    { slug: 'learn/dpdp-compliance-guide', title: 'DPDP Compliance for MCP', description: 'Data localization, consent management, and audit logging for Indian MCP servers.' },
    { slug: 'learn/india-services', title: 'India Services — MCP Routing', description: 'Regional infrastructure, Mumbai vs. Bengaluru placement, and latency benchmarks.' },
    { slug: 'data/mcp-india-stats-2026.csv', title: 'India Stats 2026 (CSV, illustrative)', description: 'Illustrative sample dataset for architecture planning — not measured production telemetry.' }
  ];

  const topServers = [
    { slug: 'github-mcp-server', title: 'GitHub MCP Server', description: 'Repository management, PR reviews, and issue tracking.' },
    { slug: 'postgres-mcp-server', title: 'PostgreSQL MCP Server', description: 'Read-only SQL queries with schema introspection.' },
    { slug: 'slack-mcp-server', title: 'Slack MCP Server', description: 'Channel messaging, search, and workspace context.' },
    { slug: 'filesystem-mcp-server', title: 'Filesystem MCP Server', description: 'Local file operations with root-boundary security.' },
    { slug: 'aws-mcp-server', title: 'AWS MCP Server', description: 'Cloud infrastructure management and deployment.' }
  ];

  let markdown = `# ${BASE_URL.replace('https://', '')} — Model Context Protocol Knowledge Base for AI Agents

## About
MCPserver.in is India's first MCP-focused knowledge hub, providing educational resources, tools, and a curated directory of MCP servers. It is the definitive, verifiable knowledge base for the Model Context Protocol (MCP), with specialized focus on Indian data compliance (DPDP, RBI), regional infrastructure, and open-source server integrations.

## Core Ontology
${topPillars.map(p => `- [${p.title}](${BASE_URL}/${p.slug}): ${p.description}`).join('\n')}

## India-Specific Authority
${indiaCompliance.map(p => `- [${p.title}](${BASE_URL}/${p.slug}): ${p.description}`).join('\n')}

## Top MCP Server Integrations
${topServers.map(s => `- [${s.title}](${BASE_URL}/servers/${s.slug}): ${s.description}`).join('\n')}

## Machine-Readable Data Endpoints (For RAG Ingestion)
- India Stats CSV (illustrative sample data, not measured production telemetry): ${BASE_URL}/data/mcp-india-stats-2026.csv
- Sitemap: ${BASE_URL}/sitemap.xml
- llms-full.txt: ${BASE_URL}/llms-full.txt

## Knowledge Graph Scale
- Glossary Terms: ${glossaryCount}+ technical definitions
- Pillar Pages: ${pillarsCount}+ comprehensive guides
- Server Integrations: ${serversCount}+ verified MCP servers

## Supported Integrations
- Claude Desktop
- VS Code
- Cursor IDE
- GitHub Copilot
- Azure AI Agents
- Any MCP-compliant client

## Key Concepts
- Model Context Protocol (MCP)
- MCP Tools & Resources
- STDIO & SSE Transports
- JSON-RPC 2.0 Communication
- OAuth & DPDP Compliance
- Data Localization (India)
- RAG & Vector Search

## Documentation Clusters
- Getting Started: /docs/getting-started
- Protocol Specification: /docs/protocol
- Server Development: /docs/servers
- Security & Compliance: /docs/security
- Deployment & Hosting: /docs/deployment
- Enterprise Integration: /docs/enterprise
`;

  fs.writeFileSync(OUTPUT_PATH, markdown, 'utf-8');
  console.log(`✅ Successfully generated ${OUTPUT_PATH}`);
  console.log(`   Glossary terms: ${glossaryCount}`);
  console.log(`   Pillars: ${pillarsCount}`);
  console.log(`   Servers: ${serversCount}`);
}

generateLLMsTxt();
