export interface Pillar {
  slug: string;
  title: string;
  subtitle: string;
  shortAnswer: string;
  description: string;
  primaryKeyword: string;
  faqCluster: string;
  related: string[];
}

export const pillars: Pillar[] = [
  {
    slug: "what-is-mcp",
    title: "What is MCP? — The Protocol Layer",
    subtitle: "Understanding the Model Context Protocol as the standardization layer for AI-tool interaction.",
    shortAnswer: "MCP is an open protocol that standardizes how applications provide context to language models. APIs connect machines; MCP connects intelligence to machines.",
    description: "MCP does not replace REST/gRPC — it is the layer that lets LLM agents discover and use tools. MCP client (AI agent) sends requests; MCP server exposes tools/data. MCP is an open protocol that standardizes how applications provide context to LLMs.",
    primaryKeyword: "model context protocol",
    faqCluster: "mcp-protocol",
    related: ["official-mcp-servers", "mcp-vs-api", "mcp-clients"]
  },
  {
    slug: "official-mcp-servers",
    title: "Official MCP Servers & Reference Implementations",
    subtitle: "Servers maintained by the MCP steering group and official company integrations.",
    shortAnswer: "The modelcontextprotocol/servers repo houses reference implementations and community submissions maintained by the MCP steering group.",
    description: "The MCP Servers Repository lists servers maintained by companies in the Official Integrations section and community implementations in the Community section. Browse published servers at registry.modelcontextprotocol.io.",
    primaryKeyword: "official mcp servers",
    faqCluster: "mcp-official",
    related: ["what-is-mcp", "mcp-marketplaces", "mcp-categories"]
  },
  {
    slug: "mcp-marketplaces",
    title: "MCP Server Marketplaces & Directories",
    subtitle: "Where to find, discover, and list MCP servers.",
    shortAnswer: "Smithery.ai is the primary MCP server marketplace with 2,211+ servers. Glama.ai, MCP.so, PulseMCP, and Docker MCP Catalog are other key discovery platforms.",
    description: "A server listed on Glama is often also on MCP.so and PulseMCP. Smithery supports npm packages, GitHub repos, and Docker images. Browse published servers at registry.modelcontextprotocol.io.",
    primaryKeyword: "mcp marketplace",
    faqCluster: "mcp-marketplaces",
    related: ["official-mcp-servers", "mcp-categories", "mcp-installation"]
  },
  {
    slug: "mcp-categories",
    title: "MCP Server Categories & Use Cases",
    subtitle: "The diverse applications of MCP servers across industries and functions.",
    shortAnswer: "MCP servers span development tools, databases, design, ITSM, cloud infrastructure, browser automation, knowledge management, DevOps, and cryptocurrency.",
    description: "MCP is the open standard for connecting AI assistants to external tools. Categories include Developer Tools, Database & Analytics, Design & Creative, ITSM & Enterprise, Cloud Infrastructure, Browser Automation, Knowledge Management, DevOps, and Cryptocurrency.",
    primaryKeyword: "mcp server categories",
    faqCluster: "mcp-categories",
    related: ["official-mcp-servers", "mcp-marketplaces", "enterprise-mcp"]
  },
  {
    slug: "mcp-vs-api",
    title: "MCP Server vs API — The Comparison Deep-Dive",
    subtitle: "Understanding when to use MCP servers vs traditional APIs.",
    shortAnswer: "APIs are resource-based; MCP servers are task-based. An MCP server sits above APIs, packaging them into workflows with sequencing, validation, and guardrails.",
    description: "An API is a human-oriented interface for software-to-software communication; MCP is an AI-oriented protocol. APIs are not simply converted into MCP servers; API functionality is exposed through an MCP server.",
    primaryKeyword: "mcp vs api",
    faqCluster: "mcp-comparisons",
    related: ["what-is-mcp", "mcp-development", "mcp-trends"]
  },
  {
    slug: "mcp-clients",
    title: "MCP Server Clients & Integrations",
    subtitle: "Which AI tools and IDEs support MCP servers.",
    shortAnswer: "VS Code is a full MCP client supporting tools, resources, prompts, sampling, and OAuth. Cursor supports remote MCP servers over Streamable HTTP natively.",
    description: "Claude Desktop provides native MCP support via Developer settings. VS Code is a full Model Context Protocol client. Cursor supports remote MCP servers over Streamable HTTP natively.",
    primaryKeyword: "mcp clients",
    faqCluster: "mcp-clients",
    related: ["what-is-mcp", "enterprise-mcp", "mcp-installation"]
  },
  {
    slug: "enterprise-mcp",
    title: "Enterprise MCP Servers",
    subtitle: "MCP servers for enterprise-grade platforms and workflows.",
    shortAnswer: "ServiceNow's Zurich release introduces a native MCP Server Console for publishing MCP Tools. The remote Power BI MCP server enables AI agents to query Power BI semantic models using natural language.",
    description: "Enterprise MCP servers include ServiceNow, Power BI, Azure, AWS, Salesforce, SAP, and Workday integrations with OAuth-based authentication and native MCP support.",
    primaryKeyword: "enterprise mcp servers",
    faqCluster: "enterprise-mcp",
    related: ["mcp-categories", "mcp-clients", "mcp-hosting"]
  },
  {
    slug: "mcp-hosting",
    title: "MCP Server Hosting & Deployment",
    subtitle: "Where and how to host MCP servers.",
    shortAnswer: "The best free hosting for an MCP server in 2026 is CreateOS — $0 tier with native MCP auto-discovery. AWS Lambda works well for lightweight, stateless tool endpoints with bursty traffic patterns.",
    description: "Azure Container Apps supports two hosting models for MCP servers. Docker enables containerized MCP server deployment. Remote MCP servers are hosted endpoints accessible via HTTP.",
    primaryKeyword: "mcp server hosting",
    faqCluster: "mcp-hosting",
    related: ["enterprise-mcp", "mcp-security", "mcp-development"]
  },
  {
    slug: "mcp-security",
    title: "MCP Server Security",
    subtitle: "Best practices for securing MCP server deployments.",
    shortAnswer: "Never expose MCP over the public internet without mTLS or equivalent. Replace .env files with runtime secret injection. Containerize your MCP servers and run them outside of your corporate/private network.",
    description: "Security best practices include mTLS, least privilege, input validation, credential management, containerization, logging & monitoring, and comprehensive security checklists.",
    primaryKeyword: "mcp security",
    faqCluster: "mcp-security",
    related: ["mcp-vs-api", "mcp-hosting", "mcp-development"]
  },
  {
    slug: "mcp-development",
    title: "MCP Server Development",
    subtitle: "How to build, test, and deploy MCP servers.",
    shortAnswer: "Python, TypeScript, and .NET SDKs are available for building MCP servers. MCP Archetypes demonstrates implementations using different frameworks, transports, and authorization methods.",
    description: "The project shows how to define tools (@tool) that can be consumed by LLMs. ServiceNow MCP server uses Server-Sent Events (SSE) for communication.",
    primaryKeyword: "build mcp server",
    faqCluster: "mcp-development",
    related: ["mcp-vs-api", "mcp-hosting", "mcp-security"]
  },
  {
    slug: "mcp-installation",
    title: "MCP Server Installation & Management",
    subtitle: "How to install, configure, and manage MCP servers.",
    shortAnswer: "Smithery's CLI (npx @smithery/cli install) handles config automatically. mcp-forge is a cross-platform CLI to install, run, and manage MCP servers.",
    description: "Smithery CLI handles config automatically. mcp-forge provides cross-platform CLI for install, run, and manage. mcp-bin runs prebuilt binaries from GitHub/GitLab releases.",
    primaryKeyword: "install mcp server",
    faqCluster: "mcp-installation",
    related: ["mcp-marketplaces", "mcp-hosting", "mcp-development"]
  },
  {
    slug: "mcp-trends",
    title: "MCP Server Trends & Ecosystem Growth",
    subtitle: "The expanding MCP ecosystem and future trends.",
    shortAnswer: "The broader MCP Ecosystem has 300K+ stars (servers, clients, etc.). 7,260 MCP servers as of May 30, 2025. MCP is being adopted rapidly — security guidance is lagging behind.",
    description: "300K+ stars across MCP ecosystem, 155K+ stars across 30+ official repos, 7,260+ MCP servers as of May 2025. Paid MCP servers and marketplace models are emerging.",
    primaryKeyword: "mcp ecosystem",
    faqCluster: "mcp-trends",
    related: ["what-is-mcp", "mcp-marketplaces", "mcp-categories"]
  }
];
