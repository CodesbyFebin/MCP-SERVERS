#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Generate from inline data instead of requiring TS imports
function generateLlmsFull() {
  const baseUrl = "https://www.mcpserver.in";
  const today = new Date().toISOString().split('T')[0];

  let output = `# ${baseUrl} — Model Context Protocol Knowledge Base for AI Agents

## About
MCPserver.in is India's first MCP-focused knowledge hub, providing educational resources, tools, and a curated directory of MCP servers.

## Key Pages
- Home: ${baseUrl}/
- Docs: ${baseUrl}/docs
- Pricing: ${baseUrl}/pricing
- Blog: ${baseUrl}/blog
- MCP Server Directory: ${baseUrl}/mcp-server-directory
- Security: ${baseUrl}/security
- State of MCP in India 2026: ${baseUrl}/state-of-mcp
- MCP Knowledge Hub: ${baseUrl}/learn

## Why MCPserver.in?
- Growing MCP Server Directory: Curated servers from GitHub, npm, and Docker Hub with schema validation
- DPDP & RBI Aligned: India-focused hosting with compliance controls
- India Edge Network: Low-latency hosting from Mumbai and Bengaluru
- Enterprise Security: Audit logs, rate-limiting, and secure credential management

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

## Documentation Clusters
- [/docs/getting-started](${baseUrl}/docs/getting-started): MCP concepts, local installation, Claude and Cursor configuration, managed edge hosting.
- [/docs/protocol](${baseUrl}/docs/protocol): Tools, resources, prompts, events, JSON-RPC, stdio, and SSE concepts for MCP builders.
- [/docs/pricing](${baseUrl}/docs/pricing): India-aware hosting costs, free vs paid, hidden operational costs, enterprise security and VAPT planning.
- [/docs/performance](${baseUrl}/docs/performance): Bengaluru vs Mumbai placement, global vs India hosting, payload optimization, latency benchmarking.
- [/docs/compliance](${baseUrl}/docs/compliance): DPDP-aware implementation, PII redaction, audit logs, RBI-aware fintech controls, secure tool design.
- [/docs/comparisons](${baseUrl}/docs/comparisons): MCP vs REST, GraphQL, API gateways, and when-to-use-MCP decision guides.
- [/docs/deployment](${baseUrl}/docs/deployment): Railway, AWS EC2, Google Cloud Run, Vercel, Kubernetes, environment variables, health checks, rollout patterns.
- [/docs/industry](${baseUrl}/docs/industry): Indian startup, fintech, ecommerce, government, healthcare, and education workflows with sector-specific safety controls.
- [/docs/monitoring](${baseUrl}/docs/monitoring): Grafana dashboards, MCP Pulse-style checks, logs, traces, redaction metrics, and incident workflows.

---

*This document is dynamically generated and contains educational content about MCP. Last updated: ${today}*
`;

  return output;
}

async function main() {
  console.log('📦 Generating LLMs.txt...');
  const content = generateLlmsFull();

  const outputPath = path.join(__dirname, '..', 'public', 'llms-full.txt');
  fs.writeFileSync(outputPath, content, 'utf-8');

  // Also generate short version
  const shortPath = path.join(__dirname, '..', 'public', 'llms.txt');
  fs.writeFileSync(shortPath, content, 'utf-8');

  console.log(`✅ llms-full.txt generated (${content.length} chars) at ${outputPath}`);
  console.log(`✅ llms.txt generated at ${shortPath}`);
}

main().catch(console.error);