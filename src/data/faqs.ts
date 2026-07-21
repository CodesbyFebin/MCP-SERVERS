export interface FAQ {
  question: string;
  answer: string;
  cluster: string;
  keywords: string[];
}

export const faqs: FAQ[] = [
  // Cluster 1: MCP Basics FAQ (50 entries)
  {
    question: "What is MCP?",
    answer: "MCP (Model Context Protocol) is an open, secure protocol that standardizes how artificial intelligence agents and large language models (LLMs) exchange context, tools, prompts, and data resources with external servers.",
    cluster: "mcp-basics",
    keywords: ["mcp", "model context protocol", "what is mcp"]
  },
  {
    question: "What is an MCP server?",
    answer: "An MCP server is a program that exposes tools, resources, and prompts to AI clients using the Model Context Protocol, enabling dynamic integration without custom code.",
    cluster: "mcp-basics",
    keywords: ["mcp server", "server"]
  },
  {
    question: "What is the Model Context Protocol?",
    answer: "The Model Context Protocol is a standardized protocol for AI agents to discover and invoke tools, resources, and prompts from external servers, built on JSON-RPC 2.0.",
    cluster: "mcp-basics",
    keywords: ["model context protocol", "mcp protocol"]
  },
  {
    question: "How does MCP work?",
    answer: "MCP works through a simple client-server handshake where the client launches the server and queries its capabilities via JSON-RPC 2.0. Once initialized, the client can list resources, invoke tools, or fill prompt templates.",
    cluster: "mcp-basics",
    keywords: ["how mcp works", "mcp workflow"]
  },
  {
    question: "Why is MCP important for AI agents?",
    answer: "MCP provides a unified standard that eliminates ad-hoc API integrations for individual models. It allows servers to announce their tools, resources, and prompts in a single format, enabling dynamic discovery and use.",
    cluster: "mcp-basics",
    keywords: ["mcp importance", "ai agents"]
  },
  {
    question: "What problem does MCP solve?",
    answer: "Before MCP, developers built custom, fragile pipelines for every new AI integration. MCP standardizes the client-to-server interaction interface, making integration plug-and-play.",
    cluster: "mcp-basics",
    keywords: ["mcp problem", "integration problem"]
  },
  {
    question: "Is MCP only for developers?",
    answer: "No, MCP can be used by anyone working with AI agents. While developers build MCP servers, end users benefit from the standardized integrations across tools like GitHub, Notion, and databases.",
    cluster: "mcp-basics",
    keywords: ["mcp users", "developers"]
  },
  {
    question: "What is the difference between MCP client and MCP server?",
    answer: "An MCP client is any application that can connect to MCP servers (like Claude Desktop, Cursor IDE, or custom apps). An MCP server exposes tools, resources, and prompts to those clients.",
    cluster: "mcp-basics",
    keywords: ["mcp client", "mcp server difference"]
  },
  {
    question: "What are MCP tools?",
    answer: "MCP tools are executable functions exposed by a server, with a defined name, description, and input schema (JSON Schema). They can perform arbitrary actions when invoked by an AI agent.",
    cluster: "mcp-basics",
    keywords: ["mcp tools", "tools"]
  },
  {
    question: "What are MCP resources?",
    answer: "MCP resources represent data that can be read by the client. They are similar to files or database records, with a URI and description for discovery.",
    cluster: "mcp-basics",
    keywords: ["mcp resources", "resources"]
  },
  {
    question: "What are MCP prompts?",
    answer: "MCP prompts are pre-defined templates that can be used by the client to generate messages for the AI, with optional arguments for dynamic content.",
    cluster: "mcp-basics",
    keywords: ["mcp prompts", "prompts"]
  },
  {
    question: "Who uses MCP servers?",
    answer: "MCP servers are used by AI developers, founders building AI-powered products, and enterprises integrating AI into their workflows. Popular clients include Claude Desktop, Cursor IDE, and custom applications.",
    cluster: "mcp-basics",
    keywords: ["mcp users", "who uses mcp"]
  },
  {
    question: "Why do AI agents need MCP?",
    answer: "AI agents need MCP to safely interact with external systems without custom code. MCP provides a standardized way to discover and use tools, with built-in security and validation.",
    cluster: "mcp-basics",
    keywords: ["ai agents", "mcp need"]
  },
  {
    question: "Is MCP an API?",
    answer: "MCP is not a traditional API. While APIs are resource-based and human-oriented, MCP is AI-oriented and task-based, designed specifically for language models to execute actions.",
    cluster: "mcp-basics",
    keywords: ["mcp api", "api"]
  },
  {
    question: "Is MCP open source?",
    answer: "Yes, MCP is an open protocol with open-source reference implementations available in the modelcontextprotocol/servers GitHub repository.",
    cluster: "mcp-basics",
    keywords: ["mcp open source", "open source"]
  },
  {
    question: "Is MCP a standard protocol?",
    answer: "MCP is an open standard protocol that follows JSON-RPC 2.0 specification. It is maintained by the MCP steering group and has growing industry adoption.",
    cluster: "mcp-basics",
    keywords: ["mcp standard", "standard protocol"]
  },
  {
    question: "Can MCP connect AI to databases?",
    answer: "Yes, MCP servers exist for PostgreSQL, MySQL, MongoDB, SQLite, and other databases, allowing AI agents to query and analyze data using natural language.",
    cluster: "mcp-basics",
    keywords: ["mcp database", "ai database"]
  },
  {
    question: "Can MCP connect AI to SaaS tools?",
    answer: "Yes, MCP servers exist for Slack, Notion, Gmail, GitHub, Stripe, and dozens of other SaaS tools, enabling AI agents to interact with them securely.",
    cluster: "mcp-basics",
    keywords: ["mcp saas", "saas integration"]
  },
  {
    question: "Can MCP connect AI to files?",
    answer: "Yes, the Filesystem MCP server allows AI agents to read, write, and list files within configured allowed directories on local systems.",
    cluster: "mcp-basics",
    keywords: ["mcp files", "filesystem mcp"]
  },
  {
    question: "Can MCP connect AI to internal APIs?",
    answer: "Yes, you can build custom MCP servers that wrap internal APIs, allowing AI agents to interact with proprietary systems safely.",
    cluster: "mcp-basics",
    keywords: ["internal apis", "custom mcp"]
  },
  {
    question: "What is an MCP endpoint?",
    answer: "An MCP endpoint is the URL or address where an MCP server listens for connections. For local servers, this is typically a stdio transport; for remote servers, it's an HTTP/SSE endpoint.",
    cluster: "mcp-basics",
    keywords: ["mcp endpoint", "endpoint"]
  },
  {
    question: "What is an MCP integration?",
    answer: "An MCP integration is a pre-built server that connects AI agents to a specific tool, service, or system, exposing its capabilities as MCP tools and resources.",
    cluster: "mcp-basics",
    keywords: ["mcp integration", "integration"]
  },
  {
    question: "What is an MCP registry?",
    answer: "An MCP registry is a catalog or directory where MCP servers are listed and discovered. Examples include the official registry at registry.modelcontextprotocol.io and Smithery.ai.",
    cluster: "mcp-basics",
    keywords: ["mcp registry", "registry"]
  },
  {
    question: "What is an MCP directory?",
    answer: "An MCP directory is a website or platform that lists available MCP servers, helping users discover and install tools for their AI agents.",
    cluster: "mcp-basics",
    keywords: ["mcp directory", "directory"]
  },
  {
    question: "What is an MCP gateway?",
    answer: "An MCP gateway is a centralized service that manages multiple MCP servers, handling authentication, routing, and access control for enterprise deployments.",
    cluster: "mcp-basics",
    keywords: ["mcp gateway", "gateway"]
  },
  {
    question: "What is an MCP host?",
    answer: "An MCP host refers to the infrastructure or platform where MCP servers run, such as cloud providers (AWS, GCP, Azure) or local machines.",
    cluster: "mcp-basics",
    keywords: ["mcp host", "host"]
  },
  {
    question: "What is an MCP runtime?",
    answer: "The MCP runtime is the execution environment for MCP servers, handling protocol communication, tool invocation, and resource management.",
    cluster: "mcp-basics",
    keywords: ["mcp runtime", "runtime"]
  },
  {
    question: "What is an MCP schema?",
    answer: "MCP schemas define the structure of tools and resources using JSON Schema, enabling AI agents to understand input parameters and output formats.",
    cluster: "mcp-basics",
    keywords: ["mcp schema", "schema"]
  },
  {
    question: "What is MCP authentication?",
    answer: "MCP authentication ensures only authorized clients can connect to servers. Common methods include API keys, OAuth 2.0, JWT, and mTLS.",
    cluster: "mcp-basics",
    keywords: ["mcp authentication", "authentication"]
  },
  {
    question: "What is MCP authorization?",
    answer: "MCP authorization determines what actions an authenticated client can perform, typically using role-based access control (RBAC) and tool-level permissions.",
    cluster: "mcp-basics",
    keywords: ["mcp authorization", "authorization"]
  },
  {
    question: "What is an MCP transport?",
    answer: "MCP transport defines how messages are exchanged between client and server. Stdio is used for local processes, while HTTP/SSE is used for remote servers.",
    cluster: "mcp-basics",
    keywords: ["mcp transport", "transport"]
  },
  {
    question: "What is MCP over HTTP?",
    answer: "MCP over HTTP uses HTTP POST requests for client-to-server communication and Server-Sent Events (SSE) for server-to-client streaming, ideal for remote deployments.",
    cluster: "mcp-basics",
    keywords: ["mcp http", "http transport"]
  },
  {
    question: "What is MCP over stdio?",
    answer: "MCP over stdio is a local-only transport mechanism where the AI client spawns the MCP server as a child process and communicates via standard input/output streams.",
    cluster: "mcp-basics",
    keywords: ["mcp stdio", "stdio transport"]
  },
  {
    question: "What is remote MCP?",
    answer: "Remote MCP refers to MCP servers hosted on cloud infrastructure, accessible over HTTP/SSE, enabling shared access and scalable deployments.",
    cluster: "mcp-basics",
    keywords: ["remote mcp", "mcp remote"]
  },
  {
    question: "What is local MCP?",
    answer: "Local MCP refers to MCP servers running on the user's machine, using stdio transport for low-latency, private access to tools and resources.",
    cluster: "mcp-basics",
    keywords: ["local mcp", "mcp local"]
  },
  {
    question: "What is a managed MCP server?",
    answer: "A managed MCP server is hosted and maintained by a third party, handling infrastructure, scaling, and updates so users can focus on integration.",
    cluster: "mcp-basics",
    keywords: ["managed mcp", "managed server"]
  },
  {
    question: "What is MCP hosting?",
    answer: "MCP hosting refers to the infrastructure and services needed to run MCP servers, including cloud platforms, containerization, and configuration management.",
    cluster: "mcp-basics",
    keywords: ["mcp hosting", "hosting"]
  },
  {
    question: "What is MCP deployment?",
    answer: "MCP deployment is the process of making MCP servers available to clients, including building, configuring, and exposing endpoints.",
    cluster: "mcp-basics",
    keywords: ["mcp deployment", "deployment"]
  },
  {
    question: "What is an MCP marketplace?",
    answer: "An MCP marketplace is a platform where developers can publish and monetize MCP servers, and users can discover and install tools for their AI agents.",
    cluster: "mcp-basics",
    keywords: ["mcp marketplace", "marketplace"]
  },
  {
    question: "What is an official MCP server?",
    answer: "Official MCP servers are maintained by the MCP steering group or by companies for their platforms, meeting quality and compliance standards.",
    cluster: "mcp-basics",
    keywords: ["official mcp server", "official server"]
  },
  {
    question: "What is a community MCP server?",
    answer: "Community MCP servers are built and maintained by the open-source community, offering innovative integrations that may not yet have official support.",
    cluster: "mcp-basics",
    keywords: ["community mcp server", "community server"]
  },
  {
    question: "What is a verified MCP server?",
    answer: "A verified MCP server has been reviewed for security, functionality, and compliance, typically by directory maintainers or the community.",
    cluster: "mcp-basics",
    keywords: ["verified mcp server", "verified server"]
  },
  {
    question: "Is MCP safe to use?",
    answer: "MCP can be safe when properly configured with authentication, authorization, and least-privilege principles. Always review server permissions and audit access.",
    cluster: "mcp-basics",
    keywords: ["mcp safety", "is mcp safe"]
  },
  {
    question: "Is MCP production ready?",
    answer: "Many MCP servers are production-ready, especially official ones. However, always evaluate security, reliability, and compliance requirements for your use case.",
    cluster: "mcp-basics",
    keywords: ["mcp production", "production ready"]
  },
  {
    question: "What are the benefits of MCP?",
    answer: "MCP offers unified integration, dynamic tool discovery, built-in security patterns, and eliminates the need for custom API glue code.",
    cluster: "mcp-basics",
    keywords: ["mcp benefits", "benefits"]
  },
  {
    question: "What are the risks of MCP?",
    answer: "Risks include unauthorized access to tools, data leakage, prompt injection, and dependency on third-party server maintenance.",
    cluster: "mcp-basics",
    keywords: ["mcp risks", "risks"]
  },
  {
    question: "What are common MCP use cases?",
    answer: "Common use cases include code assistance, database querying, file management, browser automation, and integrating with SaaS tools like Slack and Notion.",
    cluster: "mcp-basics",
    keywords: ["mcp use cases", "use cases"]
  },
  // Cluster 2: MCP Server Directory FAQ (50 entries)
  {
    question: "What is an MCP server directory?",
    answer: "An MCP server directory is a website or platform that catalogs available MCP servers, helping users discover, evaluate, and install integrations for their AI agents.",
    cluster: "mcp-server-directory",
    keywords: ["mcp server directory", "directory"]
  },
  {
    question: "Where can I find MCP servers?",
    answer: "MCP servers can be found at Smithery.ai (primary marketplace), Glama.ai, MCP.so, PulseMCP, and the official registry at registry.modelcontextprotocol.io.",
    cluster: "mcp-server-directory",
    keywords: ["find mcp servers", "where to find"]
  },
  {
    question: "What are the best MCP servers?",
    answer: "The best MCP servers depend on your needs, but popular choices include GitHub MCP, Filesystem MCP, PostgreSQL MCP, Slack MCP, and Notion MCP.",
    cluster: "mcp-server-directory",
    keywords: ["best mcp servers", "best servers"]
  },
  {
    question: "What are popular MCP servers?",
    answer: "Popular MCP servers include Filesystem, PostgreSQL, GitHub, Slack, Notion, Google Drive, and Ollama, based on adoption and community feedback.",
    cluster: "mcp-server-directory",
    keywords: ["popular mcp servers", "popular servers"]
  },
  {
    question: "What are official MCP servers?",
    answer: "Official MCP servers are maintained by the MCP steering group or by companies for their platforms. They follow naming patterns like filesystem-mcp, postgres-mcp, etc.",
    cluster: "mcp-server-directory",
    keywords: ["official mcp servers", "official servers"]
  },
  {
    question: "What are verified MCP servers?",
    answer: "Verified MCP servers have been audited for security and functionality by directory maintainers. Look for verification badges on platforms like Smithery.",
    cluster: "mcp-server-directory",
    keywords: ["verified mcp servers", "verified servers"]
  },
  {
    question: "What are open-source MCP servers?",
    answer: "Open-source MCP servers are publicly available on GitHub under permissive licenses. Examples include the official servers in the modelcontextprotocol/servers repo.",
    cluster: "mcp-server-directory",
    keywords: ["open source mcp servers", "open source servers"]
  },
  {
    question: "What are free MCP servers?",
    answer: "Most MCP servers are free to use. Some offer premium features or hosted versions. Check the documentation for each server's licensing model.",
    cluster: "mcp-server-directory",
    keywords: ["free mcp servers", "free servers"]
  },
  {
    question: "What are production-ready MCP servers?",
    answer: "Production-ready servers are actively maintained, have security reviews, and are used by enterprises. Look for official badges and active GitHub repositories.",
    cluster: "mcp-server-directory",
    keywords: ["production ready mcp servers", "production servers"]
  },
  {
    question: "How do I choose an MCP server?",
    answer: "Consider factors like security track record, maintenance activity, documentation quality, and whether it covers your required use cases.",
    cluster: "mcp-server-directory",
    keywords: ["choose mcp server", "selection"]
  },
  {
    question: "How do I compare MCP servers?",
    answer: "Compare servers based on features, security model, maintenance status, user reviews, and compatibility with your AI client.",
    cluster: "mcp-server-directory",
    keywords: ["compare mcp servers", "comparison"]
  },
  {
    question: "How do I know if an MCP server is safe?",
    answer: "Check for verification badges, review the source code on GitHub, verify the maintainer identity, and ensure it follows security best practices.",
    cluster: "mcp-server-directory",
    keywords: ["safe mcp server", "security check"]
  },
  {
    question: "How do I verify an MCP server?",
    answer: "Review the server's source code, check community feedback, verify the maintainer, and test in a sandboxed environment before production use.",
    cluster: "mcp-server-directory",
    keywords: ["verify mcp server", "verification"]
  },
  {
    question: "What information should an MCP listing include?",
    answer: "A good listing includes the server name, description, installation instructions, authentication method, example use cases, and security considerations.",
    cluster: "mcp-server-directory",
    keywords: ["mcp listing", "listing information"]
  },
  {
    question: "What categories should MCP servers be listed under?",
    answer: "Common categories include Developer Tools, Databases, Productivity, AI Models, Observability, Cloud, Finance, and Custom Integrations.",
    cluster: "mcp-server-directory",
    keywords: ["mcp categories", "categories"]
  },
  {
    question: "What are database MCP servers?",
    answer: "Database MCP servers connect AI agents to databases like PostgreSQL, MySQL, MongoDB, and Redis, enabling natural language querying and data analysis.",
    cluster: "mcp-server-directory",
    keywords: ["database mcp servers", "database servers"]
  },
  {
    question: "What are developer-tool MCP servers?",
    answer: "Developer-tool MCP servers integrate with tools like GitHub, GitLab, Docker, and Kubernetes, helping automate coding workflows.",
    cluster: "mcp-server-directory",
    keywords: ["developer mcp servers", "developer tools"]
  },
  {
    question: "What are browser automation MCP servers?",
    answer: "Browser automation servers like Playwright MCP allow AI agents to interact with web pages, scrape data, and automate browser tasks.",
    cluster: "mcp-server-directory",
    keywords: ["browser automation mcp", "automation servers"]
  },
  {
    question: "What are file system MCP servers?",
    answer: "File system MCP servers provide safe, controlled access to local files, enabling reading, writing, and searching within configured directories.",
    cluster: "mcp-server-directory",
    keywords: ["file system mcp", "filesystem servers"]
  },
  {
    question: "What are cloud MCP servers?",
    answer: "Cloud MCP servers connect to AWS, GCP, Azure, and other cloud platforms, allowing AI agents to manage infrastructure and services.",
    cluster: "mcp-server-directory",
    keywords: ["cloud mcp servers", "cloud servers"]
  },
  {
    question: "What are CRM MCP servers?",
    answer: "CRM MCP servers integrate with Salesforce, HubSpot, and other CRM platforms, enabling AI-powered customer relationship management.",
    cluster: "mcp-server-directory",
    keywords: ["crm mcp servers", "crm servers"]
  },
  {
    question: "What are analytics MCP servers?",
    answer: "Analytics MCP servers connect to tools like Google Analytics, Mixpanel, and data warehouses, enabling AI-driven insights and reporting.",
    cluster: "mcp-server-directory",
    keywords: ["analytics mcp servers", "analytics servers"]
  },
  {
    question: "What are search MCP servers?",
    answer: "Search MCP servers provide web search capabilities through engines like Google, Brave, and DuckDuckGo for AI agents to retrieve current information.",
    cluster: "mcp-server-directory",
    keywords: ["search mcp servers", "search servers"]
  },
  {
    question: "What are productivity MCP servers?",
    answer: "Productivity servers include Notion, Slack, Gmail, and calendar integrations, helping AI agents manage tasks and communications.",
    cluster: "mcp-server-directory",
    keywords: ["productivity mcp servers", "productivity servers"]
  },
  {
    question: "What are communication MCP servers?",
    answer: "Communication servers enable AI agents to send messages, manage channels, and interact with Slack, Discord, and Microsoft Teams.",
    cluster: "mcp-server-directory",
    keywords: ["communication mcp servers", "communication servers"]
  },
  {
    question: "What are security MCP servers?",
    answer: "Security servers integrate with tools like Sentry, SonarQube, and vulnerability scanners, helping AI agents identify and remediate security issues.",
    cluster: "mcp-server-directory",
    keywords: ["security mcp servers", "security servers"]
  },
  {
    question: "What are e-commerce MCP servers?",
    answer: "E-commerce servers connect to Shopify, WooCommerce, and payment processors, enabling AI agents to manage products and orders.",
    cluster: "mcp-server-directory",
    keywords: ["ecommerce mcp servers", "ecommerce servers"]
  },
  {
    question: "What are finance MCP servers?",
    answer: "Finance servers integrate with Stripe, Razorpay, PayPal, and accounting software for AI-powered financial operations.",
    cluster: "mcp-server-directory",
    keywords: ["finance mcp servers", "finance servers"]
  },
  {
    question: "What are Indian MCP servers?",
    answer: "Indian MCP servers are optimized for the Indian market, including integrations for UPI, GST, Aadhaar, and local SaaS tools like Zerodha.",
    cluster: "mcp-server-directory",
    keywords: ["indian mcp servers", "india servers"]
  },
  {
    question: "What are SaaS MCP servers?",
    answer: "SaaS servers cover tools like Notion, Slack, GitHub, and Google Workspace, with India-specific versions for local market tools.",
    cluster: "mcp-server-directory",
    keywords: ["saas mcp servers", "saas servers"]
  },
  {
    question: "Can I submit my MCP server?",
    answer: "Yes, most MCP directories allow submission. Requirements vary but typically include source code, documentation, and adherence to security standards.",
    cluster: "mcp-server-directory",
    keywords: ["submit mcp server", "submission"]
  },
  {
    question: "How do I publish an MCP server?",
    answer: "Publish by submitting to directories like Smithery.ai, following their guidelines for documentation, security, and functionality.",
    cluster: "mcp-server-directory",
    keywords: ["publish mcp server", "publishing"]
  },
  {
    question: "How do I claim an MCP server listing?",
    answer: "Contact the directory maintainers with proof of maintainer status to claim and manage your server listing.",
    cluster: "mcp-server-directory",
    keywords: ["claim mcp listing", "claim"]
  },
  {
    question: "How do I update an MCP server listing?",
    answer: "Update through the directory's submission interface or by contacting maintainers, providing updated documentation and version information.",
    cluster: "mcp-server-directory",
    keywords: ["update mcp listing", "update"]
  },
  {
    question: "How do MCP server ratings work?",
    answer: "Ratings are typically based on community votes, security scores, and usage statistics. Smithery and other directories use algorithmic quality scoring.",
    cluster: "mcp-server-directory",
    keywords: ["mcp server ratings", "ratings"]
  },
  {
    question: "Should MCP servers have reviews?",
    answer: "Yes, community reviews help users evaluate server quality, security, and reliability before integration.",
    cluster: "mcp-server-directory",
    keywords: ["mcp server reviews", "reviews"]
  },
  {
    question: "What is a trusted MCP server?",
    answer: "Trusted servers are verified by directories, maintained by reputable organizations, and have positive community feedback.",
    cluster: "mcp-server-directory",
    keywords: ["trusted mcp server", "trusted"]
  },
  {
    question: "What is a maintained MCP server?",
    answer: "Maintained servers have active development, recent commits, responsive maintainers, and regular security updates.",
    cluster: "mcp-server-directory",
    keywords: ["maintained mcp server", "maintained"]
  },
  {
    question: "How often should MCP listings be updated?",
    answer: "Listings should be updated with each new version, security patch, or major feature addition to keep users informed.",
    cluster: "mcp-server-directory",
    keywords: ["mcp listing updates", "updates"]
  },
  {
    question: "How do I find GitHub MCP servers?",
    answer: "Search GitHub topics with 'mcp-server' tag, browse the modelcontextprotocol/servers repository, or check MCP directories for GitHub integrations.",
    cluster: "mcp-server-directory",
    keywords: ["github mcp servers", "find github"]
  },
  {
    question: "How do I find Postgres MCP servers?",
    answer: "Check the official PostgreSQL MCP server in modelcontextprotocol/servers or search directories for database-related integrations.",
    cluster: "mcp-server-directory",
    keywords: ["postgres mcp servers", "find postgres"]
  },
  {
    question: "How do I find Slack MCP servers?",
    answer: "Search MCP directories or GitHub for Slack integrations. The official Slack MCP server provides comprehensive Slack API access.",
    cluster: "mcp-server-directory",
    keywords: ["slack mcp servers", "find slack"]
  },
  {
    question: "How do I find Notion MCP servers?",
    answer: "Notion MCP servers are available in official repositories and directories like Smithery. Search for 'notion-mcp-server'.",
    cluster: "mcp-server-directory",
    keywords: ["notion mcp servers", "find notion"]
  },
  {
    question: "How do I find Google Drive MCP servers?",
    answer: "Google Drive MCP is available in official repositories. Search directories for 'google-drive-mcp-server' or build your own integration.",
    cluster: "mcp-server-directory",
    keywords: ["google drive mcp", "find google drive"]
  },
  {
    question: "How do I find browser MCP servers?",
    answer: "Browser automation servers like Playwright MCP and Puppeteer MCP are available in official repositories and MCP directories.",
    cluster: "mcp-server-directory",
    keywords: ["browser mcp servers", "find browser"]
  },
  {
    question: "How do I find API MCP servers?",
    answer: "API MCP servers can be built using OpenAPI-to-MCP converters or found in directories for popular services like Stripe and GitHub.",
    cluster: "mcp-server-directory",
    keywords: ["api mcp servers", "find api"]
  },
  {
    question: "How do I find enterprise MCP servers?",
    answer: "Enterprise servers are typically maintained by vendors like Microsoft (Power BI), AWS, and ServiceNow. Check official documentation.",
    cluster: "mcp-server-directory",
    keywords: ["enterprise mcp servers", "find enterprise"]
  },
  {
    question: "How do I find MCP servers for AI agents?",
    answer: "All MCP servers are designed for AI agents. Choose based on your specific use case: databases for data, browser for scraping, productivity for tasks.",
    cluster: "mcp-server-directory",
    keywords: ["ai agent mcp servers", "find ai agent"]
  },
  {
    question: "How do I find MCP servers by use case?",
    answer: "Browse MCP directories by category: Developer Tools, Databases, Productivity, AI Models, Observability, Cloud, Finance, etc.",
    cluster: "mcp-server-directory",
    keywords: ["mcp servers by use case", "find by use case"]
  },
  {
    question: "Why use MCPserver.in as an MCP directory?",
    answer: "MCPserver.in focuses on India-specific MCP tools, compliance with DPDP/RBI regulations, and provides curated lists for Indian developers and startups.",
    cluster: "mcp-server-directory",
    keywords: ["mcpserver.in directory", "why mcpserver.in"]
  }
];

const coreFaqs: FAQ[] = faqs.slice(0, 50);

export function getFaqsForPage(pageSlug: string, maxFaqs: number = 10): FAQ[] {
  const clusterMap: Record<string, string> = {
    'what-is-mcp': 'mcp-basics',
    'mcp-server': 'mcp-server-directory',
    'mcp-security': 'mcp-security',
    'mcp-hosting': 'mcp-hosting',
    'mcp-for-ai-agents': 'mcp-ai-agents',
    'mcp-india': 'mcp-comparisons-india',
  };
  
  const targetCluster = clusterMap[pageSlug] || pageSlug;
  return faqs.filter(faq => faq.cluster === targetCluster).slice(0, maxFaqs);
}

export { coreFaqs };