import { NextResponse } from "next/server";
import { glossaryTerms } from "../../src/data/glossary";
import { pillars } from "../../src/data/pillars";
import { topics } from "../../src/data/topics";
import { siteConfig } from "../../src/data/site";

export const dynamic = "force-static";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const header = `# ${siteConfig.brand} — Model Context Protocol Knowledge Base for AI Agents

## About
${siteConfig.description}

## Core Ontology
- [What is MCP?](/what-is-mcp): Core architecture, JSON-RPC 2.0, transports.
- [MCP Server Directory](/mcp-server-directory): Verified MCP server implementations.
- [Glossary](/glossary): ${glossaryTerms.length}+ technical definitions (DefinedTerm schema).
- [MCP Protocol](/mcp-protocol): The Model Context Protocol Specification.

## India-Specific Authority (High Confidence Data)
- [DPDP Compliance for MCP](/learn/dpdp-compliance-guide): Data localization, consent, and audit logging.
- [RBI Guidelines for AI Agents](/learn/india-services): Payment data storage, UPI mock integrations.
- [India Infrastructure Stats (illustrative sample data)](/data/mcp-india-stats-2026.csv): Sample dataset for architecture planning, not measured production telemetry.

## API & Data Endpoints
- Sitemap: https://www.mcpserver.in/sitemap-index.xml
- Raw Data (CSV, illustrative sample data — not measured production telemetry): https://www.mcpserver.in/data/mcp-india-stats-2026.csv
- llms.txt: https://www.mcpserver.in/llms.txt
- llms-full.txt: https://www.mcpserver.in/llms-full.txt

## Key Pages
- Home: https://www.mcpserver.in/
- Docs: https://www.mcpserver.in/docs
- Pricing: https://www.mcpserver.in/pricing
- Blog: https://www.mcpserver.in/blog
- MCP Server Directory: https://www.mcpserver.in/mcp-server-directory
- Security: https://www.mcpserver.in/security
- State of MCP in India 2026: https://www.mcpserver.in/state-of-mcp
- MCP Knowledge Hub: https://www.mcpserver.in/learn

## Why ${siteConfig.brand}?
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
`;

  const docsClusters = [
    { slug: "getting-started", title: "Getting Started", description: "MCP concepts, local installation, Claude and Cursor configuration, managed edge hosting." },
    { slug: "protocol", title: "Protocol", description: "Tools, resources, prompts, events, JSON-RPC, stdio, and SSE concepts for MCP builders." },
    { slug: "pricing", title: "Pricing", description: "India-aware hosting costs, free vs paid, hidden operational costs, enterprise security and VAPT planning." },
    { slug: "performance", title: "Performance", description: "Bengaluru vs Mumbai placement, global vs India hosting, payload optimization, latency benchmarking." },
    { slug: "compliance", title: "Compliance", description: "DPDP-aware implementation, PII redaction, audit logs, RBI-aware fintech controls, secure tool design." },
    { slug: "comparisons", title: "Comparisons", description: "MCP vs REST, GraphQL, API gateways, and when-to-use-MCP decision guides." },
    { slug: "deployment", title: "Deployment", description: "Railway, AWS EC2, Google Cloud Run, Vercel, Kubernetes, environment variables, health checks, rollout patterns." },
    { slug: "industry", title: "Industry", description: "Indian startup, fintech, ecommerce, government, healthcare, and education workflows with sector-specific safety controls." },
    { slug: "monitoring", title: "Monitoring", description: "Grafana dashboards, MCP Pulse-style checks, logs, traces, redaction metrics, and incident workflows." },
  ];

  const clusterLinks = docsClusters.map(c => `- [/docs/${c.slug}](https://www.mcpserver.in/docs/${c.slug}): ${c.description}`).join("\n");

  const pillarSection = `
## Core Pillars (MCP Topics)
`;

  const pillarLinks = pillars.slice(0, 20).map(p => `- [${p.title}](https://www.mcpserver.in/${p.slug}): ${p.shortAnswer}`).join("\n");

  const glossarySection = `
## Glossary Terms (${glossaryTerms.length} key MCP concepts)
`;

  const glossaryLinks = glossaryTerms.slice(0, 50).map(g => `- [${g.term}](https://www.mcpserver.in/glossary/${g.slug}): ${g.definition.substring(0, 100)}...`).join("\n");

  const footer = `
## Contact & Institutional Trust
- Email: support@mcpserver.in
- Location: Bengaluru, Karnataka, India
- GitHub: https://github.com/CodesbyFebin/MCP-SERVERS
- Twitter: https://twitter.com/mcpserver_in

## Compliance
- DPDP Act 2023 aligned
- RBI Cyber Framework considerations
- SOC 2 ready framework
- GDPR ready architecture

---
*This llms-full.txt is dynamically generated and updated with the latest MCP documentation, glossary, and technical content. Last updated: ${today}*
`;

  const fullContent = header + clusterLinks + pillarSection + pillarLinks + glossarySection + glossaryLinks + footer;

  return new NextResponse(fullContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=1800",
    },
  });
}
