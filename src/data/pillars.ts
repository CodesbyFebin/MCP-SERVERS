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
    slug: "mcp-server",
    title: "MCP Server",
    subtitle: "The Universal Connector for AI Agents",
    shortAnswer: "An MCP server is a JSON-RPC 2.0 service that exposes tools, resources, and prompts to AI clients, enabling dynamic integration without custom code.",
    description: "Complete guide to Model Context Protocol servers – architecture, transport, security, and deployment.",
    primaryKeyword: "MCP server",
    faqCluster: "mcp-server",
    related: ["mcp-protocol", "mcp-api", "mcp-tools"]
  },
  {
    slug: "mcp-hosting",
    title: "MCP Hosting",
    subtitle: "Deploy MCP Servers for Production Workloads",
    shortAnswer: "Host MCP servers on cloud instances, container platforms, or local development environments – balancing latency, cost, and security.",
    description: "Best practices for hosting MCP servers, including India-specific latency considerations and DPDP alignment.",
    primaryKeyword: "MCP hosting",
    faqCluster: "mcp-hosting",
    related: ["mcp-deployment", "mcp-cloud", "mcp-docker"]
  },
  {
    slug: "mcp-tutorial",
    title: "MCP Tutorial",
    subtitle: "Build Your First MCP Server in 10 Minutes",
    shortAnswer: "A hands-on tutorial to create a simple MCP server with TypeScript or Python, connect it to Claude Desktop, and execute a custom tool.",
    description: "Step-by-step guide for absolute beginners – from installation to debugging.",
    primaryKeyword: "MCP tutorial",
    faqCluster: "mcp-tutorial",
    related: ["mcp-install", "mcp-setup", "mcp-examples"]
  },
  {
    slug: "mcp-tools",
    title: "MCP Tools",
    subtitle: "Discover and Use MCP Community Tools",
    shortAnswer: "MCP tools are executable functions exposed by an MCP server, allowing AI agents to perform actions like file access, database queries, and API calls.",
    description: "Explore categories of tools – data extraction, productivity, development, finance – and learn how to integrate them.",
    primaryKeyword: "MCP tools",
    faqCluster: "mcp-tools",
    related: ["mcp-list", "mcp-marketplace", "mcp-reddit"]
  },
  {
    slug: "mcp-reddit",
    title: "MCP Reddit",
    subtitle: "Extract and Analyze Reddit Data with AI",
    shortAnswer: "The MCP Reddit server provides tools to search posts, monitor subreddits, and perform sentiment analysis on Reddit data.",
    description: "Integrate Reddit into your AI workflows – market research, brand monitoring, and trend detection.",
    primaryKeyword: "MCP Reddit",
    faqCluster: "mcp-reddit",
    related: ["mcp-reddit-scraper", "mcp-data-extraction", "mcp-sentiment-analysis"]
  },
  {
    slug: "mcp-deployment",
    title: "MCP Deployment",
    subtitle: "CI/CD, Containerization, and Rollback Strategies",
    shortAnswer: "Deploy MCP servers reliably using Docker, Kubernetes, or serverless platforms, with attention to environment variables and secret management.",
    description: "Production deployment patterns – blue-green, rolling updates, and monitoring.",
    primaryKeyword: "MCP deployment",
    faqCluster: "mcp-deployment",
    related: ["mcp-production", "mcp-kubernetes", "mcp-docker"]
  },
  {
    slug: "mcp-integration",
    title: "MCP Integration",
    subtitle: "Connect MCP to Your Existing Tech Stack",
    shortAnswer: "MCP integrates with services like GitHub, Slack, Notion, and Salesforce via purpose-built servers that translate between AI intents and external APIs.",
    description: "Patterns for building and using MCP integrations – OAuth, webhooks, and error handling.",
    primaryKeyword: "MCP integration",
    faqCluster: "mcp-integration",
    related: ["mcp-client", "mcp-api", "mcp-automation"]
  },
  {
    slug: "mcp-claude",
    title: "MCP Claude",
    subtitle: "Supercharge Claude Desktop with MCP",
    shortAnswer: "Claude Desktop supports MCP via a local configuration file, allowing Claude to access files, databases, and web APIs.",
    description: "Step-by-step setup and usage guide for Claude Desktop users.",
    primaryKeyword: "MCP Claude",
    faqCluster: "mcp-claude",
    related: ["mcp-cursor", "mcp-chatgpt", "mcp-local"]
  },
  {
    slug: "mcp-chatgpt",
    title: "MCP ChatGPT",
    subtitle: "Extend ChatGPT with MCP Tools",
    shortAnswer: "While ChatGPT has its own function-calling mechanism, you can use a proxy layer to bridge MCP servers and OpenAI's API.",
    description: "Integration strategies for using MCP servers with the OpenAI API.",
    primaryKeyword: "MCP ChatGPT",
    faqCluster: "mcp-chatgpt",
    related: ["mcp-agent", "mcp-automation"]
  },
  {
    slug: "mcp-security",
    title: "MCP Security",
    subtitle: "Secure Your MCP Servers Against Common Threats",
    shortAnswer: "Security for MCP servers includes authentication, transport encryption, least-privilege execution, and input validation to prevent injection attacks.",
    description: "Risk assessment, hardening measures, and compliance alignment for MCP deployments.",
    primaryKeyword: "MCP security",
    faqCluster: "mcp-security",
    related: ["mcp-authentication", "mcp-dpdp", "mcp-enterprise"]
  },
  {
    slug: "mcp-authentication",
    title: "MCP Authentication",
    subtitle: "Authenticate Clients and Users in MCP",
    shortAnswer: "MCP servers can implement various authentication strategies: API keys, OAuth 2.0, JWT, or client certificate authentication.",
    description: "Guide to choosing and implementing authentication for different deployment scenarios.",
    primaryKeyword: "MCP authentication",
    faqCluster: "mcp-authentication",
    related: ["mcp-security", "mcp-enterprise"]
  },
  {
    slug: "mcp-database",
    title: "MCP Database",
    subtitle: "Query and Manage Databases with AI",
    shortAnswer: "MCP database servers allow AI agents to execute SQL queries, inspect schemas, and generate reports from relational and NoSQL databases.",
    description: "Database integration patterns – read-only access, connection pooling, and schema caching.",
    primaryKeyword: "MCP database",
    faqCluster: "mcp-database",
    related: ["mcp-filesystem", "mcp-security"]
  },
  {
    slug: "mcp-filesystem",
    title: "MCP Filesystem",
    subtitle: "Let AI Read and Write Files Securely",
    shortAnswer: "The filesystem MCP server provides tools for file listing, reading, writing, and directory operations, with configurable allowed paths.",
    description: "Securely expose file operations to AI agents – whitelist directories, control permissions.",
    primaryKeyword: "MCP filesystem",
    faqCluster: "mcp-filesystem",
    related: ["mcp-security", "mcp-local"]
  },
  {
    slug: "mcp-vs-api",
    title: "MCP vs API",
    subtitle: "Comparing MCP with Traditional REST APIs",
    shortAnswer: "MCP is a dynamic, self-describing protocol that enables AI to discover and use tools, while REST APIs are static and require prior knowledge of endpoints.",
    description: "A detailed comparison of MCP and REST/GraphQL, with use-case recommendations.",
    primaryKeyword: "MCP vs API",
    faqCluster: "mcp-vs-api",
    related: ["mcp-protocol", "mcp-api"]
  },
  {
    slug: "mcp-cursor",
    title: "MCP Cursor",
    subtitle: "Use MCP from Your Code Editor (Cursor)",
    shortAnswer: "Cursor, the AI-powered code editor, supports MCP servers, enabling you to run tools directly from your development environment.",
    description: "Setup guide for connecting Cursor to MCP servers.",
    primaryKeyword: "MCP Cursor",
    faqCluster: "mcp-cursor",
    related: ["mcp-claude", "mcp-chatgpt"]
  },
  {
    slug: "mcp-list",
    title: "MCP List",
    subtitle: "Curated List of Essential MCP Servers",
    shortAnswer: "A curated directory of the most popular and useful MCP servers, categorised by function and quality.",
    description: "Discover servers for productivity, data, development, and more.",
    primaryKeyword: "MCP list",
    faqCluster: "mcp-list",
    related: ["mcp-tools", "mcp-marketplace"]
  },
  {
    slug: "mcp-marketplace",
    title: "MCP Marketplace",
    subtitle: "Find and Share MCP Servers",
    shortAnswer: "The MCP marketplace is a platform where developers can list, discover, and rate MCP servers for various use cases.",
    description: "Overview of the marketplace ecosystem, including hosting and monetisation options.",
    primaryKeyword: "MCP marketplace",
    faqCluster: "mcp-marketplace",
    related: ["mcp-list", "mcp-tools"]
  },
  {
    slug: "mcp-docker",
    title: "MCP Docker",
    subtitle: "Containerize MCP Servers for Portability",
    shortAnswer: "Packaging MCP servers in Docker ensures consistent runtime environments and simplifies deployment on any platform.",
    description: "Dockerfile patterns, image management, and orchestration for MCP servers.",
    primaryKeyword: "MCP Docker",
    faqCluster: "mcp-docker",
    related: ["mcp-kubernetes", "mcp-deployment"]
  },
  {
    slug: "mcp-kubernetes",
    title: "MCP Kubernetes",
    subtitle: "Scale MCP Servers with Kubernetes",
    shortAnswer: "Kubernetes provides auto-scaling, self-healing, and service discovery for MCP servers in production environments.",
    description: "Kubernetes manifests, ingress, and monitoring for MCP deployments.",
    primaryKeyword: "MCP Kubernetes",
    faqCluster: "mcp-kubernetes",
    related: ["mcp-docker", "mcp-deployment"]
  },
  {
    slug: "mcp-production",
    title: "MCP Production",
    subtitle: "Run MCP Servers in Production with Confidence",
    shortAnswer: "Production-ready MCP servers require logging, monitoring, health checks, and graceful shutdown handling.",
    description: "Essential production practices – observability, alerting, and disaster recovery.",
    primaryKeyword: "MCP production",
    faqCluster: "mcp-production",
    related: ["mcp-deployment", "mcp-server-monitoring"]
  },
  {
    slug: "mcp-reddit-scraper",
    title: "MCP Reddit Scraper",
    subtitle: "Scrape Reddit Posts and Comments with MCP",
    shortAnswer: "The Reddit scraper MCP server provides tools to search, filter, and extract structured data from Reddit for analysis.",
    description: "Advanced scraping patterns – pagination, rate limiting, and data normalisation.",
    primaryKeyword: "MCP Reddit scraper",
    faqCluster: "mcp-reddit-scraper",
    related: ["mcp-reddit", "mcp-data-extraction"]
  },
  {
    slug: "mcp-data-extraction",
    title: "MCP Data Extraction",
    subtitle: "Extract Structured Data from Websites and APIs",
    shortAnswer: "MCP data extraction servers can scrape web pages, parse HTML, and convert unstructured content into structured data for LLMs.",
    description: "Techniques for extracting data from various sources using MCP tools.",
    primaryKeyword: "MCP data extraction",
    faqCluster: "mcp-data-extraction",
    related: ["mcp-reddit", "mcp-automation"]
  },
  {
    slug: "mcp-sentiment-analysis",
    title: "MCP Sentiment Analysis",
    subtitle: "Analyse Sentiment from Text Data",
    shortAnswer: "MCP sentiment analysis tools use NLP models to classify text as positive, negative, or neutral, often applied to social media and reviews.",
    description: "Integrate sentiment analysis into your AI workflows for brand monitoring and market research.",
    primaryKeyword: "MCP sentiment analysis",
    faqCluster: "mcp-sentiment-analysis",
    related: ["mcp-reddit", "mcp-automation"]
  },
  {
    slug: "mcp-server-monitoring",
    title: "MCP Monitoring",
    subtitle: "Monitor MCP Servers for Performance and Errors",
    shortAnswer: "MCP monitoring involves collecting logs, metrics, and traces to ensure servers are healthy and performant.",
    description: "Tools and practices for observability – Prometheus, Grafana, and logging aggregators.",
    primaryKeyword: "MCP monitoring",
    faqCluster: "mcp-server-monitoring",
    related: ["mcp-grafana", "mcp-production"]
  },
  {
    slug: "mcp-validator",
    title: "MCP Validator",
    subtitle: "Validate MCP Servers and Tool Schemas",
    shortAnswer: "MCP validators check the conformance of a server implementation against the MCP specification, ensuring compatibility.",
    description: "Use the validator to test your server's list_tools, call_tool, and error handling.",
    primaryKeyword: "MCP validator",
    faqCluster: "mcp-validator",
    related: ["mcp-testing", "mcp-debugging"]
  },
  {
    slug: "mcp-python",
    title: "MCP Python",
    subtitle: "Build MCP Servers with Python",
    shortAnswer: "Python is a popular language for MCP server development, with official SDK support via the mcp package.",
    description: "Getting started with Python MCP servers – installation, tool definition, and running.",
    primaryKeyword: "MCP Python",
    faqCluster: "mcp-python",
    related: ["mcp-typescript", "mcp-tutorial"]
  },
  {
    slug: "mcp-typescript",
    title: "MCP TypeScript",
    subtitle: "Build MCP Servers with TypeScript",
    shortAnswer: "TypeScript is the primary language for the official MCP SDK, offering type safety and a rich ecosystem.",
    description: "Use TypeScript to build robust, maintainable MCP servers.",
    primaryKeyword: "MCP TypeScript",
    faqCluster: "mcp-typescript",
    related: ["mcp-python", "mcp-tutorial"]
  },
  {
    slug: "mcp-india",
    title: "MCP India",
    subtitle: "MCP Ecosystem and Use Cases in India",
    shortAnswer: "India has a growing MCP community, with a focus on local compliance (DPDP, RBI) and latency-optimised hosting in Mumbai and Bengaluru.",
    description: "Exploring MCP adoption in India – use cases, hosting, and regulatory considerations.",
    primaryKeyword: "MCP India",
    faqCluster: "mcp-india",
    related: ["mcp-dpdp", "mcp-zerodha"]
  },
  {
    slug: "mcp-dpdp",
    title: "MCP DPDP",
    subtitle: "Aligning MCP with India's DPDP Act",
    shortAnswer: "The Digital Personal Data Protection Act (DPDP) requires data localisation and consent management; MCP servers can be designed to meet these requirements.",
    description: "A guide to building DPDP-aware MCP servers – data residency, consent, and audit trails.",
    primaryKeyword: "MCP DPDP",
    faqCluster: "mcp-dpdp",
    related: ["mcp-security", "mcp-india"]
  },
  {
    slug: "mcp-zerodha",
    title: "MCP Zerodha",
    subtitle: "Connect Zerodha's Kite API to AI",
    shortAnswer: "A Zerodha MCP server allows AI agents to access market data, place orders, and analyze portfolio holdings via the Kite Connect API.",
    description: "Integrate Zerodha with AI for algorithmic trading and market analysis.",
    primaryKeyword: "MCP Zerodha",
    faqCluster: "mcp-zerodha",
    related: ["mcp-india"]
  },
  {
    slug: "mcp-grafana",
    title: "MCP Grafana",
    subtitle: "Query and Visualise Metrics with MCP",
    shortAnswer: "A Grafana MCP server enables AI agents to query Grafana dashboards, fetch metrics, and generate anomaly reports.",
    description: "Use MCP to monitor infrastructure and applications through Grafana.",
    primaryKeyword: "MCP Grafana",
    faqCluster: "mcp-grafana",
    related: ["mcp-server-monitoring"]
  },
  {
    slug: "mcp-agent",
    title: "MCP Agent",
    subtitle: "Build Multi-Agent Systems with MCP",
    shortAnswer: "MCP enables the development of agentic systems where multiple AI agents coordinate and use shared tools via MCP servers.",
    description: "Agent architectures, communication patterns, and orchestration with MCP.",
    primaryKeyword: "MCP agent",
    faqCluster: "mcp-agent",
    related: ["mcp-automation", "mcp-workflow"]
  },
  {
    slug: "mcp-automation",
    title: "MCP Automation",
    subtitle: "Automate Repetitive Tasks with AI",
    shortAnswer: "MCP servers can automate data extraction, monitoring, and reporting by responding to AI instructions.",
    description: "Automation patterns – triggers, event-driven execution, and workflow automation.",
    primaryKeyword: "MCP automation",
    faqCluster: "mcp-automation",
    related: ["mcp-agent", "mcp-workflow"]
  },
  {
    slug: "mcp-workflow",
    title: "MCP Workflow",
    subtitle: "Orchestrate Complex Workflows with MCP",
    shortAnswer: "MCP servers can be chained to perform multi-step workflows, where the output of one tool becomes the input of another.",
    description: "Designing and executing workflows using MCP tools.",
    primaryKeyword: "MCP workflow",
    faqCluster: "mcp-workflow",
    related: ["mcp-automation", "mcp-agent"]
  },
  {
    slug: "mcp-enterprise",
    title: "MCP Enterprise",
    subtitle: "Enterprise-Grade MCP Deployments",
    shortAnswer: "Enterprise MCP deployments require SSO, RBAC, audit logging, and high availability to meet corporate governance standards.",
    description: "Architecting MCP for large organisations – identity management, compliance, and service level agreements.",
    primaryKeyword: "MCP enterprise",
    faqCluster: "mcp-enterprise",
    related: ["mcp-security", "mcp-authentication"]
  },
  {
    slug: "mcp-cloud",
    title: "MCP Cloud",
    subtitle: "Deploy MCP on Cloud Platforms",
    shortAnswer: "MCP servers can run on major cloud providers like AWS, Azure, and GCP, using services like EC2, ECS, or Cloud Run.",
    description: "Cloud-specific considerations – networking, IAM, and cost optimisation.",
    primaryKeyword: "MCP cloud",
    faqCluster: "mcp-cloud",
    related: ["mcp-hosting", "mcp-deployment"]
  },
  {
    slug: "mcp-local",
    title: "MCP Local",
    subtitle: "Run MCP Servers on Your Own Machine",
    shortAnswer: "Local MCP servers use stdio transport and are ideal for development, testing, and personal use with desktop AI clients.",
    description: "Setting up and debugging local MCP servers.",
    primaryKeyword: "MCP local",
    faqCluster: "mcp-local",
    related: ["mcp-install", "mcp-setup"]
  },
  {
    slug: "mcp-remote",
    title: "MCP Remote",
    subtitle: "Connect to MCP Servers Over the Network",
    shortAnswer: "Remote MCP servers use SSE or HTTP transport, allowing AI clients to access tools hosted elsewhere.",
    description: "Best practices for remote MCP – HTTPS, authentication, and firewall configuration.",
    primaryKeyword: "MCP remote",
    faqCluster: "mcp-remote",
    related: ["mcp-cloud", "mcp-security"]
  },
  {
    slug: "mcp-api",
    title: "MCP API",
    subtitle: "Understanding the MCP JSON-RPC API",
    shortAnswer: "The MCP API is a JSON-RPC 2.0 interface with specific methods for initialization, tool discovery, tool invocation, resources, and prompts.",
    description: "Detailed reference for MCP API methods and request/response formats.",
    primaryKeyword: "MCP API",
    faqCluster: "mcp-api",
    related: ["mcp-protocol", "mcp-server"]
  },
  {
    slug: "mcp-protocol",
    title: "MCP Protocol",
    subtitle: "The Model Context Protocol Specification",
    shortAnswer: "MCP is an open protocol that standardises how AI clients and tool servers communicate, enabling plug-and-play tool integration.",
    description: "Deep dive into the MCP specification – transport, message structure, and lifecycle.",
    primaryKeyword: "MCP protocol",
    faqCluster: "mcp-protocol",
    related: ["mcp-api", "mcp-server"]
  },
  {
    slug: "mcp-client",
    title: "MCP Client",
    subtitle: "Implementing an MCP Client",
    shortAnswer: "An MCP client is any application that can connect to MCP servers, discover tools, and invoke them – e.g., Claude Desktop, Cursor, or a custom app.",
    description: "How to build an MCP client – connecting, initialising, and handling tool calls.",
    primaryKeyword: "MCP client",
    faqCluster: "mcp-client",
    related: ["mcp-server", "mcp-api"]
  },
  {
    slug: "mcp-config",
    title: "MCP Config",
    subtitle: "Configure MCP Servers and Clients",
    shortAnswer: "MCP configuration involves setting environment variables, JSON config files, and command-line arguments to control server behaviour.",
    description: "Guide to configuration options for common MCP servers and clients.",
    primaryKeyword: "MCP config",
    faqCluster: "mcp-config",
    related: ["mcp-setup", "mcp-install"]
  },
  {
    slug: "mcp-install",
    title: "MCP Install",
    subtitle: "Install MCP Servers and Tools",
    shortAnswer: "MCP servers are typically installed via npm, pip, or as standalone binaries, and then configured in the client's config file.",
    description: "Installation instructions for popular MCP servers.",
    primaryKeyword: "MCP install",
    faqCluster: "mcp-install",
    related: ["mcp-setup", "mcp-tutorial"]
  },
  {
    slug: "mcp-setup",
    title: "MCP Setup",
    subtitle: "Get Started with MCP in Minutes",
    shortAnswer: "Setting up MCP involves installing the server, configuring the client, and testing the connection.",
    description: "Quick start guide for MCP on various operating systems.",
    primaryKeyword: "MCP setup",
    faqCluster: "mcp-setup",
    related: ["mcp-install", "mcp-tutorial"]
  },
  {
    slug: "mcp-examples",
    title: "MCP Examples",
    subtitle: "Code Examples for MCP Servers",
    shortAnswer: "A collection of example MCP servers covering common use cases – filesystem, database, web search, and more.",
    description: "Learn by example with ready-to-run code snippets.",
    primaryKeyword: "MCP examples",
    faqCluster: "mcp-examples",
    related: ["mcp-tutorial", "mcp-boilerplate"]
  },
  {
    slug: "mcp-boilerplate",
    title: "MCP Boilerplate",
    subtitle: "Starter Templates for MCP Servers",
    shortAnswer: "Boilerplate projects for quickly scaffolding new MCP servers, including testing and configuration.",
    description: "Use these templates to avoid repetitive setup work.",
    primaryKeyword: "MCP boilerplate",
    faqCluster: "mcp-boilerplate",
    related: ["mcp-tutorial", "mcp-examples"]
  },
  {
    slug: "mcp-testing",
    title: "MCP Testing",
    subtitle: "Test MCP Servers and Tool Implementations",
    shortAnswer: "Testing MCP servers involves unit tests for individual tools and integration tests with a mock client.",
    description: "Best practices for writing tests – using the MCP test harness, mocking, and coverage.",
    primaryKeyword: "MCP testing",
    faqCluster: "mcp-testing",
    related: ["mcp-validator", "mcp-debugging"]
  },
  {
    slug: "mcp-debugging",
    title: "MCP Debugging",
    subtitle: "Debug MCP Servers Like a Pro",
    shortAnswer: "Debugging MCP servers involves examining logs, using the MCP Inspector, and tracing messages between client and server.",
    description: "Tools and techniques for diagnosing issues in MCP servers.",
    primaryKeyword: "MCP debugging",
    faqCluster: "mcp-debugging",
    related: ["mcp-testing", "mcp-server-monitoring"]
  },
  {
    slug: "mcp-performance",
    title: "MCP Performance",
    subtitle: "Optimise MCP Server Performance",
    shortAnswer: "Performance tuning for MCP servers includes connection pooling, caching, efficient serialization, and resource management.",
    description: "Identify bottlenecks and apply optimizations to reduce latency and increase throughput.",
    primaryKeyword: "MCP performance",
    faqCluster: "mcp-performance",
    related: ["mcp-scaling", "mcp-server-monitoring"]
  },
  {
    slug: "mcp-scaling",
    title: "MCP Scaling",
    subtitle: "Scale MCP Servers Horizontally and Vertically",
    shortAnswer: "Scaling MCP servers involves adding replicas, distributing load, and managing state to handle increased request volume.",
    description: "Strategies for scaling – using a load balancer, autoscaling groups, and stateful vs stateless designs.",
    primaryKeyword: "MCP scaling",
    faqCluster: "mcp-scaling",
    related: ["mcp-performance", "mcp-deployment"]
  },

  // ---- Existing pillars kept: no colliding slug with the 50 above, and
  // referenced by src/data/topics.ts `pillar` field or their own dedicated route ----
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
