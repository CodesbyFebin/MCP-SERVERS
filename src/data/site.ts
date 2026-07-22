export interface KnowledgeDomain {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  shortAnswer: string;
  description: string;
  primaryKeyword: string;
  relatedDomains: number[];
  subtopics: {
    name: string;
    contentAngle: string;
    targetKeywords: string[];
  }[];
  keyCitations: string[];
  deepDiveArticles?: {
    title: string;
    tier: "foundational" | "practical" | "platform" | "client" | "trends";
    keywords: string[];
  }[];
}

export const knowledgeGraph = {
  stats: {
    servers: "7,260+",
    stars: "300K+",
    deployments: "Growing",
    requests: "Growing",
    uptime: "Targeting high availability",
    domains: "12"
  },
  marketplaces: [
    { name: "Smithery", servers: "2,211+", keyFeature: "One-click install, editorial review" },
    { name: "Glama", servers: "1,617+", keyFeature: "Algorithmic quality scoring" },
    { name: "GitHub Registry", servers: "44", keyFeature: "Official integrations" },
    { name: "Archestra", servers: "879+", keyFeature: "Implementation quality ranking" }
  ],
  domains: [
    {
      id: 1,
      slug: "what-is-mcp",
      title: "What is MCP? — The Protocol Layer",
      subtitle: "Understanding the Model Context Protocol as the standardization layer for AI-tool interaction.",
      shortAnswer: "MCP is an open protocol that standardizes how applications provide context to language models. APIs connect machines; MCP connects intelligence to machines.",
      description: "MCP does not replace REST/gRPC — it is the layer that lets LLM agents discover and use tools. MCP client (AI agent) sends requests; MCP server exposes tools/data.",
      primaryKeyword: "model context protocol",
      relatedDomains: [2, 5, 6],
      subtopics: [
        { name: "MCP Architecture", contentAngle: "How MCP enables AI agents to securely connect to external tools and data sources", targetKeywords: ["MCP protocol", "Model Context Protocol", "MCP architecture"] },
        { name: "MCP vs API", contentAngle: "APIs are resource-based; MCP servers are task-based. MCP is purpose-built for AI context.", targetKeywords: ["MCP vs API", "API to MCP", "MCP vs REST API"] },
        { name: "MCP vs A2A", contentAngle: "MCP servers can operate as both MCP and A2A (Agent-to-Agent) servers", targetKeywords: ["MCP vs A2A", "Agent-to-Agent protocol"] },
        { name: "MCP Clients", contentAngle: "VS Code is a full MCP client supporting tools, resources, prompts, sampling, and OAuth", targetKeywords: ["MCP clients", "MCP in VSCode", "MCP client list"] },
        { name: "How MCP Works", contentAngle: "MCP client (AI agent) sends requests; MCP server exposes tools/data", targetKeywords: ["how MCP works", "MCP explained"] }
      ],
      keyCitations: [
        "MCP is an open protocol that standardizes how applications provide context to language models",
        "APIs connect machines; MCP connects intelligence to machines",
        "MCP does not replace REST/gRPC — it's the layer that lets LLM agents discover and use tools"
      ],
      deepDiveArticles: [
        { title: "What is MCP? The Model Context Protocol Explained", tier: "foundational", keywords: ["model context protocol", "mcp explained", "what is mcp"] },
        { title: "MCP vs API: Understanding the Difference", tier: "foundational", keywords: ["mcp vs api", "api to mcp", "mcp vs rest api"] },
        { title: "The Complete Guide to MCP Clients", tier: "foundational", keywords: ["mcp clients", "mcp in vscode", "cursor mcp"] }
      ]
    },
    {
      id: 2,
      slug: "official-mcp-servers",
      title: "Official MCP Servers & Reference Implementations",
      subtitle: "Servers maintained by the MCP steering group and official company integrations.",
      shortAnswer: "The modelcontextprotocol/servers repo houses reference implementations and community submissions maintained by the MCP steering group.",
      description: "The MCP Servers Repository lists servers maintained by companies in the Official Integrations section and community implementations in the Community section.",
      primaryKeyword: "official mcp servers",
      relatedDomains: [1, 3, 4],
      subtopics: [
        { name: "Official MCP Repository", contentAngle: "The modelcontextprotocol/servers repo houses reference implementations and community submissions", targetKeywords: ["official MCP servers", "MCP reference servers"] },
        { name: "Official Integrations", contentAngle: "Servers maintained by companies for their platforms", targetKeywords: ["MCP official integrations", "company MCP servers"] },
        { name: "MCP Registry", contentAngle: "Browse published servers at registry.modelcontextprotocol.io", targetKeywords: ["MCP registry", "MCP server registry"] },
        { name: "MCP Steering Group", contentAngle: "The small number of reference servers maintained by the steering group", targetKeywords: ["MCP steering group", "MCP reference implementations"] }
      ],
      keyCitations: [
        "The MCP Servers Repository (Official Integrations section) lists servers maintained by companies",
        "Community implementations are listed in the MCP Servers Repository (Community section)",
        "The repository is dedicated to reference servers maintained by the MCP steering group"
      ]
    },
    {
      id: 3,
      slug: "mcp-marketplaces",
      title: "MCP Server Marketplaces & Directories",
      subtitle: "Where to find, discover, and list MCP servers.",
      shortAnswer: "Smithery.ai is the primary MCP server marketplace with 2,211+ servers. Glama.ai, MCP.so, PulseMCP, and Docker MCP Catalog are other key discovery platforms.",
      description: "A server listed on Glama is often also on MCP.so and PulseMCP. Smithery supports npm packages, GitHub repos, and Docker images.",
      primaryKeyword: "mcp marketplace",
      relatedDomains: [1, 2, 4],
      subtopics: [
        { name: "Smithery.ai", contentAngle: "The primary MCP server marketplace with 2,211+ servers, one-click installable", targetKeywords: ["Smithery", "Smithery AI", "MCP marketplace Smithery"] },
        { name: "Glama.ai", contentAngle: "Algorithmic quality scores based on GitHub activity, stars, and maintenance signals", targetKeywords: ["Glama MCP", "MCP marketplace Glama"] },
        { name: "MCP.so", contentAngle: "A popular free directory for MCP servers", targetKeywords: ["MCP.so", "MCP server directory"] },
        { name: "PulseMCP", contentAngle: "Another free directory for MCP server discovery", targetKeywords: ["PulseMCP", "MCP server list"] },
        { name: "GitHub MCP Registry", contentAngle: "44 MCP servers including Playwright, GitHub MCP, Context7, MarkItDown, Terraform", targetKeywords: ["GitHub MCP registry", "MCP GitHub"] },
        { name: "Docker MCP Catalog", contentAngle: "Browse MCP servers at hub.docker.com/mcp or in Docker Desktop", targetKeywords: ["Docker MCP", "MCP Docker catalog"] },
        { name: "Awesome MCP Registries", contentAngle: "AI-curated, self-updating directories analyzing and ranking servers weekly", targetKeywords: ["awesome MCP servers", "MCP curated list"] },
        { name: "MCP Server Catalog (Archestra)", contentAngle: "879+ MCP servers ranked by implementation quality", targetKeywords: ["MCP server catalog", "MCP server rankings"] }
      ],
      keyCitations: [
        "Smithery supports npm packages, GitHub repos, and Docker images",
        "A server listed on Glama is often also on MCP.so and PulseMCP",
        "The GitHub MCP Registry currently has 44 MCP servers"
      ]
    },
    {
      id: 4,
      slug: "mcp-categories",
      title: "MCP Server Categories & Use Cases",
      subtitle: "The diverse applications of MCP servers across industries and functions.",
      shortAnswer: "MCP servers span development tools, databases, design, ITSM, cloud infrastructure, browser automation, knowledge management, DevOps, and cryptocurrency.",
      description: "MCP is the open standard for connecting AI assistants to external tools. Categories include Developer Tools, Database & Analytics, Design & Creative, ITSM & Enterprise, Cloud Infrastructure, Browser Automation, Knowledge Management, DevOps, and Cryptocurrency.",
      primaryKeyword: "mcp server categories",
      relatedDomains: [2, 3, 7],
      subtopics: [
        { name: "Development Tools", contentAngle: "GitHub MCP (100+ tools), GitLab MCP, Cursor integration", targetKeywords: ["MCP for developers", "GitHub MCP server"] },
        { name: "Database & Analytics", contentAngle: "Power BI MCP, MongoDB MCP, Universal Database MCP", targetKeywords: ["Power BI MCP", "MCP database", "MCP analytics"] },
        { name: "Design & Creative", contentAngle: "Figma MCP (Dev Mode)", targetKeywords: ["Figma MCP", "MCP design tools"] },
        { name: "ITSM & Enterprise", contentAngle: "ServiceNow MCP", targetKeywords: ["ServiceNow MCP", "MCP enterprise"] },
        { name: "Cloud Infrastructure", contentAngle: "Azure MCP, Terraform MCP", targetKeywords: ["Azure MCP", "Terraform MCP", "MCP cloud"] },
        { name: "Browser Automation", contentAngle: "Playwright MCP", targetKeywords: ["Playwright MCP", "MCP browser automation"] },
        { name: "Knowledge Management", contentAngle: "Notion MCP, Obsidian MCP", targetKeywords: ["Notion MCP", "Obsidian MCP"] },
        { name: "DevOps", contentAngle: "DevOps-focused MCP servers for cloud infrastructure, CLI operations, version control, security scanning", targetKeywords: ["DevOps MCP", "MCP infrastructure"] },
        { name: "Cryptocurrency", contentAngle: "CoinGecko MCP (200+ blockchain networks, 8M+ tokens)", targetKeywords: ["CoinGecko MCP", "crypto MCP"] }
      ],
      keyCitations: [
        "MCP is the open standard for connecting AI assistants to external tools",
        "The Figma MCP server brings design decisions into tools where code gets written",
        "ServiceNow's Zurich release introduces a native MCP Server Console"
      ]
    },
    {
      id: 5,
      slug: "mcp-vs-api",
      title: "MCP Server vs API — The Comparison Deep-Dive",
      subtitle: "Understanding when to use MCP servers vs traditional APIs.",
      shortAnswer: "APIs are resource-based; MCP servers are task-based. An MCP server sits above APIs, packaging them into workflows with sequencing, validation, and guardrails.",
      description: "An API is a human-oriented interface for software-to-software communication; MCP is an AI-oriented protocol. APIs are not simply converted into MCP servers; API functionality is exposed through an MCP server.",
      primaryKeyword: "mcp vs api",
      relatedDomains: [1, 10, 12],
      subtopics: [
        { name: "Architectural Difference", contentAngle: "APIs are human-oriented; MCP is AI-oriented", targetKeywords: ["MCP vs API architecture"] },
        { name: "Task-Based vs Resource-Based", contentAngle: "APIs are resource-based; MCP servers are task-based", targetKeywords: ["MCP task-based", "API resource-based"] },
        { name: "The MCP Layer", contentAngle: "An MCP server sits above APIs, packaging them into workflows with sequencing, validation, and guardrails", targetKeywords: ["MCP as control layer", "API to MCP"] },
        { name: "When to Use MCP", contentAngle: "Use MCP when your primary consumer is an AI system", targetKeywords: ["when to use MCP", "MCP use cases"] },
        { name: "API Transformation", contentAngle: "APIs are not simply converted into MCP servers; API functionality is exposed through an MCP server", targetKeywords: ["transform API to MCP", "MCP API wrapper"] }
      ],
      keyCitations: [
        "An API is a human-oriented interface for software-to-software communication; MCP is an AI-oriented protocol",
        "MCP is built for AI models that reason with text but cannot safely execute code",
        "An MCP server is a control layer that turns APIs into repeatable, context-aware workflows"
      ]
    },
    {
      id: 6,
      slug: "mcp-clients",
      title: "MCP Server Clients & Integrations",
      subtitle: "Which AI tools and IDEs support MCP servers.",
      shortAnswer: "VS Code is a full MCP client supporting tools, resources, prompts, sampling, and OAuth. Cursor supports remote MCP servers over Streamable HTTP natively.",
      description: "Claude Desktop provides native MCP support via Developer settings. VS Code is a full Model Context Protocol client. Cursor supports remote MCP servers over Streamable HTTP natively.",
      primaryKeyword: "mcp clients",
      relatedDomains: [1, 7, 13],
      subtopics: [
        { name: "Claude Desktop", contentAngle: "Native MCP support via Developer settings", targetKeywords: ["Claude Desktop MCP", "MCP Claude integration"] },
        { name: "VS Code", contentAngle: "Full MCP client supporting tools, resources, prompts, sampling, OAuth", targetKeywords: ["MCP in VSCode", "VS Code MCP"] },
        { name: "Cursor IDE", contentAngle: "Native remote MCP support over Streamable HTTP", targetKeywords: ["Cursor MCP", "MCP Cursor integration"] },
        { name: "GitHub Copilot", contentAngle: "GitHub MCP Server integration", targetKeywords: ["GitHub Copilot MCP", "Copilot MCP"] },
        { name: "Azure AI Agents", contentAngle: "Dynamic tool catalog connection to MCP servers", targetKeywords: ["Azure AI MCP", "MCP Azure agents"] },
        { name: "Gemini", contentAngle: "MCP configuration support", targetKeywords: ["Gemini MCP"] }
      ],
      keyCitations: [
        "VS Code is a full Model Context Protocol client",
        "Cursor supports remote MCP servers over Streamable HTTP natively",
        "Claude Desktop provides a native desktop experience with full MCP support"
      ]
    },
    {
      id: 7,
      slug: "enterprise-mcp",
      title: "Enterprise MCP Servers",
      subtitle: "MCP servers for enterprise-grade platforms and workflows.",
      shortAnswer: "ServiceNow's Zurich release introduces a native MCP Server Console for publishing MCP Tools. The remote Power BI MCP server enables AI agents to query Power BI semantic models using natural language.",
      description: "Enterprise MCP servers include ServiceNow, Power BI, Azure, AWS, Salesforce, SAP, and Workday integrations with OAuth-based authentication and native MCP support.",
      primaryKeyword: "enterprise mcp servers",
      relatedDomains: [4, 6, 8],
      subtopics: [
        { name: "ServiceNow", contentAngle: "Native MCP Server Console in Zurich release; OAuth-based authentication", targetKeywords: ["ServiceNow MCP", "MCP ServiceNow integration"] },
        { name: "Power BI", contentAngle: "Remote MCP server for natural language queries via DAX", targetKeywords: ["Power BI MCP", "MCP Power BI"] },
        { name: "Azure", contentAngle: "Multiple hosting options: Container Apps, Functions, Dynamic Sessions", targetKeywords: ["Azure MCP", "MCP Azure hosting"] },
        { name: "AWS", contentAngle: "Hosting options: Lambda, ECS on Fargate, Bedrock AgentCore", targetKeywords: ["AWS MCP", "MCP AWS hosting"] },
        { name: "Salesforce", contentAngle: "MCP server for enterprise CRM integration", targetKeywords: ["Salesforce MCP"] },
        { name: "SAP", contentAngle: "MCP server for enterprise resource planning", targetKeywords: ["SAP MCP"] },
        { name: "Workday", contentAngle: "MCP server for HR and financial management", targetKeywords: ["Workday MCP"] }
      ],
      keyCitations: [
        "ServiceNow's Zurich release introduces a native MCP Server Console for publishing MCP Tools",
        "The remote Power BI MCP server enables AI agents to query Power BI semantic models using natural language",
        "Azure provides five ways to host an MCP server"
      ]
    },
    {
      id: 8,
      slug: "mcp-hosting",
      title: "MCP Server Hosting & Deployment",
      subtitle: "Where and how to host MCP servers.",
      shortAnswer: "The best free hosting for an MCP server in 2026 is CreateOS — $0 tier with native MCP auto-discovery. AWS Lambda works well for lightweight, stateless tool endpoints with bursty traffic patterns.",
      description: "Azure Container Apps supports two hosting models for MCP servers. Docker enables containerized MCP server deployment. Remote MCP servers are hosted endpoints accessible via HTTP.",
      primaryKeyword: "mcp server hosting",
      relatedDomains: [7, 9, 10],
      subtopics: [
        { name: "Local Development", contentAngle: "Testing, development, personal use", targetKeywords: ["local MCP server", "MCP localhost"] },
        { name: "Azure Container Apps", contentAngle: "Flexible, scalable hosting", targetKeywords: ["Azure Container Apps MCP", "MCP hosting Azure"] },
        { name: "Azure Functions", contentAngle: "Lightweight, stateless tool endpoints", targetKeywords: ["Azure Functions MCP", "serverless MCP"] },
        { name: "AWS Lambda", contentAngle: "Lightweight, stateless tool endpoints with bursty traffic", targetKeywords: ["AWS Lambda MCP", "serverless MCP AWS"] },
        { name: "AWS ECS on Fargate", contentAngle: "More control over runtime and networking", targetKeywords: ["AWS ECS MCP", "container MCP"] },
        { name: "CreateOS", contentAngle: "Free tier with native MCP auto-discovery", targetKeywords: ["free MCP hosting", "CreateOS MCP"] },
        { name: "Remote MCP Servers", contentAngle: "Hosted endpoints accessible via HTTP", targetKeywords: ["remote MCP server", "hosted MCP"] },
        { name: "Docker", contentAngle: "Containerized MCP server deployment", targetKeywords: ["Docker MCP", "MCP container"] }
      ],
      keyCitations: [
        "The best free hosting for an MCP server in 2026 is CreateOS — $0 tier with native MCP auto-discovery",
        "AWS Lambda works well for lightweight, stateless tool endpoints with bursty traffic patterns",
        "Azure Container Apps supports two hosting models for MCP servers"
      ]
    },
    {
      id: 9,
      slug: "mcp-security",
      title: "MCP Server Security",
      subtitle: "Best practices for securing MCP server deployments.",
      shortAnswer: "Never expose MCP over the public internet without mTLS or equivalent. Replace .env files with runtime secret injection. Containerize your MCP servers and run them outside of your corporate/private network.",
      description: "Security best practices include mTLS, least privilege, input validation, credential management, containerization, logging & monitoring, and comprehensive security checklists.",
      primaryKeyword: "mcp security",
      relatedDomains: [5, 8, 10],
      subtopics: [
        { name: "Authentication", contentAngle: "Never expose MCP over public internet without mTLS or equivalent", targetKeywords: ["MCP security", "MCP authentication"] },
        { name: "Least Privilege", contentAngle: "Scope every tool to minimum necessary permissions", targetKeywords: ["MCP least privilege", "MCP tool scoping"] },
        { name: "Input Validation", contentAngle: "Validate and sanitize all inputs before they reach tool execution", targetKeywords: ["MCP input validation", "MCP sanitization"] },
        { name: "Credential Management", contentAngle: "Replace .env files with runtime secret injection; implement per-server credentials", targetKeywords: ["MCP credentials", "MCP secret management"] },
        { name: "Containerization", contentAngle: "Containerize MCP servers and run them outside corporate/private networks", targetKeywords: ["MCP containerization", "MCP sandboxing"] },
        { name: "Logging & Monitoring", contentAngle: "Log every request, tool invocation, and significant action", targetKeywords: ["MCP logging", "MCP monitoring"] },
        { name: "Security Checklist", contentAngle: "Comprehensive checklist for MCP server deployments", targetKeywords: ["MCP security checklist", "MCP audit"] }
      ],
      keyCitations: [
        "Never expose MCP over the public internet without mTLS or equivalent",
        "Replace .env files with runtime secret injection",
        "Containerize your MCP servers and run them outside of your corporate/private network"
      ]
    },
    {
      id: 10,
      slug: "mcp-development",
      title: "MCP Server Development",
      subtitle: "How to build, test, and deploy MCP servers.",
      shortAnswer: "Python, TypeScript, and .NET SDKs are available for building MCP servers. MCP Archetypes demonstrates implementations using different frameworks, transports, and authorization methods.",
      description: "The project shows how to define tools (@tool) that can be consumed by LLMs. ServiceNow MCP server uses Server-Sent Events (SSE) for communication.",
      primaryKeyword: "build mcp server",
      relatedDomains: [5, 8, 9],
      subtopics: [
        { name: "MCP SDKs", contentAngle: "Python, TypeScript, .NET SDKs for building MCP servers", targetKeywords: ["MCP SDK", "MCP Python", "MCP TypeScript"] },
        { name: "MCP Server Examples", contentAngle: "Reference implementations and starter projects", targetKeywords: ["MCP server example", "MCP tutorial"] },
        { name: "Testing MCP Servers", contentAngle: "How to validate MCP server implementations", targetKeywords: ["test MCP server", "MCP testing"] },
        { name: "MCP Server Architecture", contentAngle: "Different frameworks, transports, and authorization methods", targetKeywords: ["MCP architecture", "MCP server design"] },
        { name: "MCP Tools", contentAngle: "Defining tools with @tool decorators for LLM consumption", targetKeywords: ["MCP tools", "MCP tool definition"] },
        { name: "STDIO vs SSE Transport", contentAngle: "Understanding MCP transport mechanisms", targetKeywords: ["MCP STDIO", "MCP SSE", "MCP transport"] }
      ],
      keyCitations: [
        "MCP Archetypes demonstrates implementations using different frameworks, transports, and authorization methods",
        "The project shows how to define tools (@tool) that can be consumed by LLMs",
        "ServiceNow MCP server uses Server-Sent Events (SSE) for communication"
      ]
    },
    {
      id: 11,
      slug: "mcp-installation",
      title: "MCP Server Installation & Management",
      subtitle: "How to install, configure, and manage MCP servers.",
      shortAnswer: "Smithery's CLI (npx @smithery/cli install) handles config automatically. mcp-forge is a cross-platform CLI to install, run, and manage MCP servers.",
      description: "Smithery CLI handles config automatically. mcp-forge provides cross-platform CLI for install, run, and manage. mcp-bin runs prebuilt binaries from GitHub/GitLab releases.",
      primaryKeyword: "install mcp server",
      relatedDomains: [3, 8, 10],
      subtopics: [
        { name: "Smithery CLI", contentAngle: "One-click installation of MCP servers", targetKeywords: ["install MCP server", "Smithery install"] },
        { name: "mcp-forge", contentAngle: "Cross-platform CLI to install, run, and manage MCP servers", targetKeywords: ["mcp-forge", "MCP management"] },
        { name: "mcp-bin", contentAngle: "Run prebuilt MCP server binaries from GitHub/GitLab releases", targetKeywords: ["mcp-bin", "MCP binary"] },
        { name: "Manual Configuration", contentAngle: "JSON config updates and path discovery for MCP clients", targetKeywords: ["MCP configuration", "MCP JSON config"] },
        { name: "MCP Installer", contentAngle: "CLI-first workflow for installing MCP server configurations", targetKeywords: ["MCP installer", "setup MCP"] }
      ],
      keyCitations: [
        "Smithery's CLI (npx @smithery/cli install) handles config automatically",
        "mcp-forge: Install, run and manage MCP servers from one cross-platform CLI",
        "mcp-bin: Run a prebuilt MCP server binary straight from its GitHub or GitLab releases"
      ]
    },
    {
      id: 12,
      slug: "mcp-trends",
      title: "MCP Server Trends & Ecosystem Growth",
      subtitle: "The expanding MCP ecosystem and future trends.",
      shortAnswer: "The broader MCP Ecosystem has 300K+ stars (servers, clients, etc.). 7,260 MCP servers as of May 30, 2025. MCP is being adopted rapidly — security guidance is lagging behind.",
      description: "300K+ stars across MCP ecosystem, 155K+ stars across 30+ official repos, 7,260+ MCP servers as of May 2025. Paid MCP servers and marketplace models are emerging.",
      primaryKeyword: "mcp ecosystem",
      relatedDomains: [1, 3, 4],
      subtopics: [
        { name: "Ecosystem Growth", contentAngle: "300K+ stars across MCP ecosystem", targetKeywords: ["MCP ecosystem", "MCP growth"] },
        { name: "Official Organization", contentAngle: "155K+ stars across 30+ repos", targetKeywords: ["MCP official", "MCP adoption"] },
        { name: "Server Count", contentAngle: "7,260+ MCP servers as of May 2025", targetKeywords: ["MCP server count", "MCP popularity"] },
        { name: "Monetization", contentAngle: "Paid MCP servers and marketplace models emerging", targetKeywords: ["paid MCP servers", "MCP monetization"] },
        { name: "Enterprise Adoption", contentAngle: "Growing enterprise use across ServiceNow, Power BI, Azure", targetKeywords: ["enterprise MCP", "MCP adoption trends"] },
        { name: "Remote MCP", contentAngle: "Shift toward remote/hosted MCP servers", targetKeywords: ["remote MCP server", "hosted MCP"] }
      ],
      keyCitations: [
        "The broader MCP Ecosystem has 300K+ stars (servers, clients, etc.)",
        "7,260 MCP servers as of May 30, 2025",
        "MCP is being adopted rapidly — security guidance is lagging behind"
      ]
    }
  ]
};

export const siteConfig = {
  name: "MCPserver.in",
  brand: "MCPserver",
  tagline: "India-first MCP Infrastructure Platform",
  title: "MCPserver.in - Discover, Build and Deploy MCP Servers",
  description: "Discover trusted Model Context Protocol (MCP) integrations, test in-browser, and deploy production-ready MCP servers on secure, low-latency infrastructure.",
  url: "https://www.mcpserver.in",
  indexNow: {
    key: "0a49fa0dab0d446fafceb070d7ea05c5",
    keyLocation: "https://www.mcpserver.in/0a49fa0dab0d446fafceb070d7ea05c5.txt",
    host: "www.mcpserver.in"
  },
  company: {
    name: "MCPserver.in",
    address: "Bengaluru, Karnataka, India",
    email: "support@mcpserver.in",
    founded: 2025
  },
  socials: {
    github: "https://github.com/CodesbyFebin/MCP-SERVERS",
    twitter: "https://twitter.com/mcpserver_in",
    discord: "https://discord.gg/mcpserver"
  },
  founder: {
    name: "Febin Francis",
    handle: "CodesbyFebin",
    role: "Founder & Developer",
    bio: "Febin Francis (CodesbyFebin) is the founder and developer of MCPserver.in, a curated, India-focused directory and hosting platform for Model Context Protocol servers, built to make it easier for developers to discover, deploy, and integrate AI tools.",
    socials: {
      github: "https://github.com/codesbyfebin",
      twitter: "https://x.com/codesbyfebin",
      linkedin: "https://linkedin.com/in/codesbyfebin"
    }
  },
  stats: {
    servers: "Growing",
    deployments: "Growing",
    requests: "Growing",
    uptime: "Targeting high availability",
    developers: "Growing"
  }
};
