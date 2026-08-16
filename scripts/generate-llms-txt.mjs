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
  const glossaryCount = glossaryTerms.length;
  const pillarsCount = pillars.length;
  const serversCount = servers.length;
  const updated = new Date().toISOString().slice(0, 10);

  const topPillars = [
    { slug: 'what-is-mcp', title: 'What is MCP? (Protocol Specification)', description: 'Core protocol architecture, JSON-RPC 2.0 message format, and transport options.' },
    { slug: 'mcp-server', title: 'MCP Server — The Universal Connector', description: 'What an MCP server exposes: tools, resources, prompts, and secure client-server boundaries.' },
    { slug: 'mcp-protocol', title: 'MCP Protocol — JSON-RPC 2.0 & Transports', description: 'Message format, lifecycle, stdio, Server-Sent Events, and Streamable HTTP.' },
    { slug: 'mcp-hosting', title: 'MCP Hosting — India Edge Network', description: 'Deployment, observability, security, and regional hosting considerations for MCP servers.' },
    { slug: 'mcp-security', title: 'MCP Security & Compliance', description: 'Authentication, authorization, secret handling, auditability, and India-specific compliance.' },
  ];

  const indiaCompliance = [
    { slug: 'learn/dpdp-compliance-guide', title: 'DPDP Compliance for MCP', description: 'Data minimization, consent, retention, and audit logging for Indian MCP deployments.' },
    { slug: 'learn/india-services', title: 'India Services — MCP Routing', description: 'Regional infrastructure and India-first latency and data-handling considerations.' },
    { slug: 'data/mcp-india-stats-2026.csv', title: 'India Stats 2026 (CSV, illustrative)', description: 'Illustrative architecture-planning data, explicitly not measured production telemetry.' },
  ];

  const topServers = [
    { slug: 'github-mcp-server', title: 'GitHub MCP Server', description: 'Repository management, pull requests, and issue workflows.' },
    { slug: 'postgres-mcp-server', title: 'PostgreSQL MCP Server', description: 'Database access, schema inspection, and controlled SQL workflows.' },
    { slug: 'slack-mcp-server', title: 'Slack MCP Server', description: 'Workspace context, channel search, and messaging workflows.' },
    { slug: 'filesystem-mcp-server', title: 'Filesystem MCP Server', description: 'Root-bounded file operations with local security considerations.' },
    { slug: 'aws-mcp-server', title: 'AWS MCP Server', description: 'Cloud infrastructure workflows and deployment automation.' },
  ];

  const glossaryHighlights = glossaryTerms
    .slice(0, 40)
    .map((term) => `- [${term.term}](${BASE_URL}/glossary/${term.slug}): ${term.definition}`)
    .join('\n');

  const markdown = `# MCPserver.in — Model Context Protocol Knowledge Base for AI Agents

## Version
- Generated: ${updated}
- Canonical origin: ${BASE_URL}
- Machine-readable index: ${BASE_URL}/llms-full.txt

## About
MCPserver.in is an MCP-focused knowledge hub and server directory for developers and teams building AI-agent integrations. It covers Model Context Protocol architecture, JSON-RPC 2.0, tools, resources, prompts, transports, authentication, authorization, security, deployment, observability, and India-specific compliance considerations.

## Core Entities
- Model Context Protocol (MCP)
- MCP Server
- MCP Client
- AI Agent
- JSON-RPC 2.0
- Tools
- Resources
- Prompts
- stdio transport
- Server-Sent Events (SSE)
- Streamable HTTP
- Context window
- OAuth
- Authentication and authorization
- DPDP Act 2023
- RBI guidance where applicable to regulated workflows

## Core Ontology
${topPillars.map(p => `- [${p.title}](${BASE_URL}/${p.slug}/): ${p.description}`).join('\n')}

## India-Specific Authority
${indiaCompliance.map(p => `- [${p.title}](${BASE_URL}/${p.slug}): ${p.description}`).join('\n')}

## Top MCP Server Integrations
${topServers.map(s => `- [${s.title}](${BASE_URL}/servers/${s.slug}/): ${s.description}`).join('\n')}

## Knowledge Graph Scale
- Glossary terms: ${glossaryCount}
- Pillar pages: ${pillarsCount}
- Server integrations: ${serversCount}

## Glossary Highlights
${glossaryHighlights}

## Machine-Readable Endpoints
- Sitemap: ${BASE_URL}/sitemap.xml
- Full knowledge index: ${BASE_URL}/llms-full.txt
- LLM summary: ${BASE_URL}/llms.txt
- India stats CSV (illustrative): ${BASE_URL}/data/mcp-india-stats-2026.csv

## Supported Clients and Integrations
- Claude Desktop
- VS Code
- Cursor
- GitHub Copilot
- Azure AI Agents
- Other MCP-compliant clients

## Documentation Clusters
- Getting Started: ${BASE_URL}/docs/getting-started/
- Protocol: ${BASE_URL}/docs/protocol/
- Security & Compliance: ${BASE_URL}/docs/compliance/
- Deployment: ${BASE_URL}/docs/deployment/
- Performance: ${BASE_URL}/docs/performance/
- Comparisons: ${BASE_URL}/docs/comparisons/
- Industry: ${BASE_URL}/docs/industry/
- Monitoring: ${BASE_URL}/docs/monitoring/

## Trust and Legal
- About: ${BASE_URL}/about/
- Editorial Policy: ${BASE_URL}/editorial-policy/
- Security: ${BASE_URL}/security/
- Privacy: ${BASE_URL}/privacy/
- Terms: ${BASE_URL}/terms/
- Contact: ${BASE_URL}/contact/

## Update Policy
This file is generated during the production build from the repository's structured content sources. Counts and links are derived from actual published datasets; no synthetic page counts are asserted.

*Machine-readable for AI agents, RAG systems, answer engines, and search crawlers. Last updated: ${updated}.*
`;

  fs.writeFileSync(OUTPUT_PATH, markdown, 'utf-8');
  console.log(`✅ Successfully generated ${OUTPUT_PATH}`);
  console.log(`   Glossary terms: ${glossaryCount}`);
  console.log(`   Pillars: ${pillarsCount}`);
  console.log(`   Servers: ${serversCount}`);
}

generateLLMsTxt();
