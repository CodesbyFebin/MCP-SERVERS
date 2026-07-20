export interface FAQItem {
  question: string;
  answer: string;
}

export const coreFaqs: Record<string, FAQItem[]> = {
  "what-is-mcp": [
    {
      question: "What is Model Context Protocol (MCP)?",
      answer: "The Model Context Protocol (MCP) is an open-source standard designed by Anthropic to bridge the gap between Large Language Models (LLMs) and local or remote data sources. It allows AI clients like Claude Desktop, Cursor, or custom tools to safely connect with resources, tools, and prompts provided by independent servers."
    },
    {
      question: "Is Model Context Protocol open-source?",
      answer: "Yes, MCP is entirely open-source. The specification, client SDKs (for TypeScript, Python, Go, and more), and a large range of reference servers are licensed under permissive open-source licenses and hosted on GitHub for public contributions."
    },
    {
      question: "Why do we need MCP when we have REST APIs?",
      answer: "REST APIs are designed for humans and custom programmatic clients, requiring distinct orchestration code. MCP translates these services into standard schemas (prompts, resources, and tools) that LLMs can understand directly, enabling dynamic function calling without custom glue-code."
    },
    {
      question: "Which LLM clients support MCP today?",
      answer: "MCP is natively supported by Anthropic's Claude Desktop, Cursor IDE, Windsurf IDE, Zed Editor, Cline, and several custom command-line interfaces. Support is rapidly expanding to other platforms like ChatGPT, LibreChat, and LangChain."
    },
    {
      question: "How does MCP secure private server connections?",
      answer: "MCP utilizes secure local transports like standard input/output (Stdio) which never expose ports to the web, or encrypted remote transport protocols like Server-Sent Events (SSE) with standard token auth and custom proxy layers."
    }
  ],
  "mcp-server": [
    {
      question: "What is an MCP Server?",
      answer: "An MCP Server is an executable background process or microservice that registers with an MCP client and exposes capabilities (tools, prompts, resources) via JSON-RPC 2.0 messages."
    },
    {
      question: "Can I run an MCP server locally?",
      answer: "Yes! Most developers run MCP servers locally on their laptops via standard Stdio to let IDE extensions (like Cursor or Windsurf) inspect files, write scripts, or query local database folders instantly."
    },
    {
      question: "What languages can I use to write an MCP server?",
      answer: "The most popular languages for MCP development are TypeScript (Node.js) and Python, which have official SDKs. However, you can write an MCP server in Go, Rust, Java, or C++ using community-contributed libraries."
    }
  ],
  "mcp-server-hosting": [
    {
      question: "How does managed MCP hosting work?",
      answer: "Our managed platform automates container building from your Git repos, configures secure Server-Sent Events (SSE) gateways, provisions permanent HTTPS SSL certificates, and handles auto-scaling."
    },
    {
      question: "Is there a free tier for hosting MCP servers?",
      answer: "Yes, MCPserver.in offers a free-forever Developer tier that supports up to 3 active local/SSE connections with standard cold-boot latency — perfect for testing custom integrations."
    }
  ],
  "mcp-hosting": [
    { question: "What are the latency considerations for MCP hosting?", answer: "For Indian users, hosting closer to users and data sources — such as Mumbai or Bengaluru — typically yields lower round-trip times compared to distant global regions." },
    { question: "Can I host an MCP server on a serverless platform?", answer: "Yes, but cold starts may introduce latency; consider using provisioned concurrency for latency-sensitive workloads." }
  ],
  "mcp-tutorial": [
    { question: "Which languages are supported for MCP server development?", answer: "The official SDKs are available for TypeScript and Python." },
    { question: "How do I debug an MCP server?", answer: "Enable verbose logging and use the MCP Inspector tool to simulate client requests." }
  ],
  "mcp-tools": [
    { question: "How do I find a specific MCP tool?", answer: "Search the MCPserver.in directory or the official registry; many tools are open-source and hosted on GitHub." },
    { question: "Is it safe to use any MCP tool?", answer: "Always review the tool's source code and permission requirements before running it in a production environment." }
  ],
  "mcp-reddit": [
    { question: "Do I need a Reddit API key?", answer: "Yes, you must register an app with Reddit and provide a client ID and secret." },
    { question: "What are the rate limits?", answer: "Reddit enforces per-app rate limits; a well-built MCP server handles backoff and retry logic for you." }
  ],
  "mcp-deployment": [
    { question: "What are the key security considerations for deployment?", answer: "Never embed secrets in code; use vaults or environment variables. Restrict network access to authorised clients." },
    { question: "How do I handle configuration per environment?", answer: "Use separate config files or environment-specific variables, and keep them out of version control." }
  ],
  "mcp-integration": [
    { question: "Do I need to write code to integrate with a service?", answer: "Many popular services already have community-built MCP servers; you just need to configure them." },
    { question: "How do I handle authentication for integrated services?", answer: "Use OAuth 2.0 flows where available; otherwise, use API keys stored securely." }
  ],
  "mcp-claude": [
    { question: "Where is the Claude Desktop config file located?", answer: "On macOS: ~/Library/Application Support/Claude/claude_desktop_config.json; on Windows: %APPDATA%\\Claude\\claude_desktop_config.json." },
    { question: "Can Claude call multiple MCP servers simultaneously?", answer: "Yes, the config supports multiple server entries; Claude discovers tools from all of them." }
  ],
  "mcp-chatgpt": [
    { question: "Is MCP natively supported by ChatGPT?", answer: "Not directly — a proxy layer can translate MCP tool definitions into OpenAI's function-calling schema." },
    { question: "What are the limitations of this approach?", answer: "The proxy adds a small amount of overhead and may not support every MCP feature, such as resources." }
  ],
  "mcp-security": [
    { question: "What are the most common vulnerabilities in MCP servers?", answer: "Insufficient input validation, exposure of secrets in logs or configs, and lack of rate limiting are frequent issues." },
    { question: "Does MCP support mutual TLS (mTLS)?", answer: "Yes — when using an HTTP-based transport, you can configure mTLS for two-way authentication between client and server." }
  ],
  "mcp-authentication": [
    { question: "What is the simplest authentication method for MCP?", answer: "API keys are the simplest, but they must be kept secret and rotated regularly." },
    { question: "Can I use existing enterprise SSO with MCP?", answer: "Yes, you can integrate OAuth 2.0 with your identity provider (e.g., Okta, Azure AD)." }
  ],
  "mcp-database": [
    { question: "Which databases are supported?", answer: "PostgreSQL, MySQL, SQLite, MongoDB, and many more via community-built servers." },
    { question: "Is it safe to let AI execute arbitrary SQL?", answer: "Restrict the database user to read-only and limit which tables and columns are exposed as a matter of default policy." }
  ],
  "mcp-filesystem": [
    { question: "Can the filesystem server delete files?", answer: "Yes, if configured with write permissions; it's recommended to restrict it to a sandboxed directory." },
    { question: "How do I prevent path traversal attacks?", answer: "A well-built server validates that every resolved path stays within the allowed base directory before touching disk." }
  ],
  "mcp-vs-api": [
    { question: "Can MCP replace all my APIs?", answer: "No — MCP is best for exposing tools to AI agents; standard APIs are still needed for other client types." },
    { question: "Is MCP just JSON-RPC?", answer: "MCP is built on JSON-RPC 2.0 but adds specific semantics for tool discovery, resources, and prompts." }
  ],
  "mcp-cursor": [
    { question: "How do I configure MCP in Cursor?", answer: "Cursor uses a similar configuration pattern to Claude Desktop; add the server definition to Cursor's MCP settings file." },
    { question: "Can I use Cursor's AI to execute MCP tools?", answer: "Yes — once the server is configured, you can invoke its tools through Cursor's AI chat." }
  ],
  "mcp-list": [
    { question: "How are servers on a curated list selected?", answer: "Typically based on community adoption, maintenance activity, and a basic security review." },
    { question: "Can I suggest a server for a curated list?", answer: "Most community-maintained lists accept contributions via GitHub issues or pull requests." }
  ],
  "mcp-marketplace": [
    { question: "Are there paid MCP servers?", answer: "Some commercial servers require a subscription or charge based on API usage." },
    { question: "Is it safe to use servers from a marketplace?", answer: "Look for verified publishers and check the source code before running anything with real credentials." }
  ],
  "mcp-docker": [
    { question: "Which base image should I use for an MCP server?", answer: "Official Node.js images for TypeScript servers, or a Python slim image for Python servers." },
    { question: "How do I handle environment variables in Docker?", answer: "Pass them with -e flags, or use a .env file together with Docker Compose." }
  ],
  "mcp-kubernetes": [
    { question: "Can I use a Horizontal Pod Autoscaler with MCP?", answer: "Yes — you can scale based on CPU, memory, or a custom metric like request count." },
    { question: "How do I expose an MCP server outside the cluster?", answer: "Use an Ingress controller that supports WebSocket/SSE upgrades for streaming transports." }
  ],
  "mcp-production": [
    { question: "What metrics should I monitor for MCP servers?", answer: "Request rate, error rate, latency (p50/p95), and connection pool usage." },
    { question: "How do I perform a rolling update without downtime?", answer: "Use a Kubernetes rolling update or a blue-green deployment strategy." }
  ],
  "mcp-reddit-scraper": [
    { question: "Can I scrape Reddit without an API key?", answer: "No — the official Reddit API requires authentication; use registered client credentials." },
    { question: "What is a reasonable scraping rate?", answer: "Follow Reddit's published rate limits; a well-built server implements backoff and retry to stay within them." }
  ],
  "mcp-data-extraction": [
    { question: "Can MCP extract data from dynamic JavaScript sites?", answer: "Yes, if the server uses a headless browser like Puppeteer or Playwright." },
    { question: "Is it legal to scrape publicly available data?", answer: "Respect robots.txt and each site's terms of service; only extract data for legitimate purposes." }
  ],
  "mcp-sentiment-analysis": [
    { question: "Which models are used for sentiment analysis?", answer: "Commonly used models include BERT, RoBERTa, and task-specific fine-tuned variants." },
    { question: "Can I run sentiment analysis locally?", answer: "Yes — some MCP servers run lightweight sentiment models on-device rather than calling an external API." }
  ],
  "mcp-server-monitoring": [
    { question: "What metrics are most important to track?", answer: "Request latency, error rate, active connections, and resource utilisation." },
    { question: "How can I set up alerts?", answer: "Define thresholds in your monitoring tool of choice and route alerts to Slack, email, or PagerDuty." }
  ],
  "mcp-validator": [
    { question: "Is there an official MCP validator?", answer: "The MCP SDK includes a test harness; several community validators also exist." },
    { question: "What does a validation report typically include?", answer: "Method implementation coverage, schema compliance, and response-time measurements." }
  ],
  "mcp-python": [
    { question: "Which Python version is required?", answer: "Python 3.11 or higher is recommended for the official SDK." },
    { question: "Can I use async patterns in Python MCP?", answer: "Yes — the Python SDK supports async event loops for concurrent request handling." }
  ],
  "mcp-typescript": [
    { question: "Do I need to compile TypeScript before running?", answer: "Yes, transpile to JavaScript with tsc or a bundler before running the server." },
    { question: "Is there a starter template?", answer: "The official SDK ecosystem includes generator tooling for scaffolding a new server." }
  ],
  "mcp-india": [
    { question: "Which cloud regions are best for MCP in India?", answer: "Mumbai (ap-south-1) and Bengaluru are the primary options for low latency to Indian users." },
    { question: "Does MCP help with DPDP compliance?", answer: "MCP servers can be designed to enforce data localisation and consent logging, which supports DPDP obligations — but the protocol itself doesn't guarantee compliance automatically." }
  ],
  "mcp-dpdp": [
    { question: "What DPDP provisions are most relevant to an MCP server?", answer: "Data localisation, consent collection, and breach notification are the ones that most directly affect server design." },
    { question: "Can MCP servers retain audit logs long-term?", answer: "Yes, with appropriate storage and a defined retention policy — this is an implementation choice, not something MCP provides by default." }
  ],
  "mcp-zerodha": [
    { question: "Is there an official MCP server for Zerodha?", answer: "Community-built servers exist that wrap the Kite Connect API; you'll need your own API credentials." },
    { question: "What security measures are recommended?", answer: "Enable two-factor authentication on the trading account and keep API keys in a secure secret store, not in code." }
  ],
  "mcp-grafana": [
    { question: "Which Grafana API version is supported?", answer: "Most community Grafana MCP servers target Grafana v9 and above via its HTTP API." },
    { question: "Can I create dashboards via MCP?", answer: "Some servers expose tools to create or update dashboards programmatically, in addition to querying existing ones." }
  ],
  "mcp-agent": [
    { question: "Can two agents use the same MCP server?", answer: "Yes, as long as the server supports concurrent connections and scopes state correctly per session." },
    { question: "What are the main challenges in multi-agent MCP?", answer: "State management, conflict resolution between agents, and controlling which agent can access which tools." }
  ],
  "mcp-automation": [
    { question: "Can MCP servers run on a schedule?", answer: "Yes — wrap the server with a scheduler like cron, or trigger it from a serverless scheduled function." },
    { question: "How do I handle errors in automated workflows?", answer: "Implement retry logic with backoff, and log every failure with enough context to debug it later." }
  ],
  "mcp-workflow": [
    { question: "Is there a workflow engine built for MCP?", answer: "Some agent frameworks support chaining MCP tool calls into multi-step workflows." },
    { question: "How do I pass data between tool calls in a workflow?", answer: "The client (or orchestrating agent) manages context and forwards results from one tool call into the next." }
  ],
  "mcp-enterprise": [
    { question: "Does MCP support role-based access control natively?", answer: "No — MCP itself doesn't define RBAC; you implement it at the server or gateway level." },
    { question: "Can I integrate MCP with a corporate identity provider?", answer: "Yes, typically through an OAuth 2.0 or SAML proxy in front of the MCP server." }
  ],
  "mcp-cloud": [
    { question: "Which cloud provider is best for MCP?", answer: "It depends on your latency and compliance requirements — AWS and Azure both have a strong presence in India." },
    { question: "How do I manage cloud costs for MCP servers?", answer: "Use spot/preemptible instances for non-critical workloads and autoscaling to handle traffic peaks without over-provisioning." }
  ],
  "mcp-local": [
    { question: "Can I run multiple local MCP servers at once?", answer: "Yes — each runs as a separate process; a client like Claude Desktop can manage several simultaneously." },
    { question: "How do I restart a local server?", answer: "Restart the parent client, or manage the server process directly with a process manager." }
  ],
  "mcp-remote": [
    { question: "What are the security risks of remote MCP?", answer: "Exposure to the public internet increases risk; always use TLS and real authentication, not just network obscurity." },
    { question: "Can I host a remote MCP server on a small single-board computer?", answer: "Yes, as long as it can run Node.js or Python and is reachable via a public IP or tunnel." }
  ],
  "mcp-api": [
    { question: "What is the difference between a resource and a tool in the MCP API?", answer: "Resources represent readable data (like a file); tools are executable functions that perform an action." },
    { question: "How does error handling work in MCP?", answer: "Errors are returned as standard JSON-RPC error objects with a code and message." }
  ],
  "mcp-protocol": [
    { question: "Who maintains the MCP specification?", answer: "The Model Context Protocol specification is maintained as an open standard with public contribution." },
    { question: "Is MCP versioned?", answer: "Yes — clients and servers negotiate a protocol version during the initialize handshake." }
  ],
  "mcp-client": [
    { question: "Which clients support MCP natively?", answer: "Claude Desktop, Cursor, VS Code, and several open-source client implementations." },
    { question: "Can I build my own MCP client?", answer: "Yes, using the official TypeScript or Python SDK to handle the protocol mechanics." }
  ],
  "mcp-config": [
    { question: "Where is the Claude Desktop config typically stored?", answer: "~/Library/Application Support/Claude/claude_desktop_config.json on macOS, with an equivalent path on Windows." },
    { question: "Can I use a format other than JSON for config?", answer: "The standard client configs are JSON; you can generate them from another format with a build step if you prefer." }
  ],
  "mcp-install": [
    { question: "Do I need administrative privileges to install an MCP server?", answer: "Usually not, if you're installing locally via npm install or pip install." },
    { question: "What if a server isn't published to a package registry?", answer: "Clone the repository and run it directly, or build and run it as a Docker image." }
  ],
  "mcp-setup": [
    { question: "What are the prerequisites for MCP setup?", answer: "Node.js (for TypeScript servers) or Python (for Python servers), and a compatible client like Claude Desktop." },
    { question: "How do I verify my setup actually works?", answer: "Use an MCP Inspector-style tool to send a test request directly to your server before wiring it into a real client." }
  ],
  "mcp-examples": [
    { question: "Where can I find working MCP server examples?", answer: "The official MCP GitHub organization and various community repositories maintain example servers." },
    { question: "Can I use these examples directly in production?", answer: "Treat them as learning material — adapt them to your needs and add the security controls a production deployment requires." }
  ],
  "mcp-boilerplate": [
    { question: "Are there boilerplates for both TypeScript and Python?", answer: "Yes, generator tooling exists for both languages in the official SDK ecosystem." },
    { question: "Can I customise a boilerplate?", answer: "Yes — boilerplates are meant to be modified to fit your specific tools and requirements." }
  ],
  "mcp-testing": [
    { question: "Is there a dedicated testing framework for MCP?", answer: "The MCP SDK includes test utilities; you can also use a general-purpose framework like Vitest or pytest." },
    { question: "How do I test error handling specifically?", answer: "Make a tool throw deliberately and verify the server returns a well-formed JSON-RPC error object." }
  ],
  "mcp-debugging": [
    { question: "How do I enable debug logging?", answer: "Set a DEBUG environment variable to a relevant namespace, or your SDK's equivalent verbose-logging flag." },
    { question: "What is an MCP Inspector?", answer: "A tool that simulates an MCP client, letting you send requests and inspect responses interactively during development." }
  ],
  "mcp-performance": [
    { question: "What is a reasonable latency target for an MCP tool call?", answer: "For interactive use, sub-500ms is a common target; batch operations can tolerate longer." },
    { question: "How can I reduce cold-start latency?", answer: "Use keep-alive connections, pre-warm instances, or run a long-lived server rather than a cold serverless function." }
  ],
  "mcp-scaling": [
    { question: "Can MCP servers be stateless?", answer: "Yes, if they don't maintain per-client state in memory — this makes horizontal scaling considerably simpler." },
    { question: "How do I share state across replicas?", answer: "Use an external store like Redis for shared state, or design the server to be fully stateless in the first place." }
  ]
};

// Programmatic contextual generator for 500+ contextually embedded FAQs
export function getFaqsForPage(slug: string, title: string, category?: string): FAQItem[] {
  // If we have manual FAQs, return them
  if (coreFaqs[slug]) {
    return coreFaqs[slug];
  }

  // Generate high-fidelity contextual FAQs programmatically
  const isServer = slug.endsWith("-mcp-server");
  const entityName = title.replace(" MCP Server", "").replace("Understanding ", "").replace("Guide", "").trim();

  if (isServer) {
    return [
      {
        question: `How do I connect the ${entityName} MCP Server to my AI client?`,
        answer: `To connect ${entityName} to your client (like Claude Desktop or Cursor), add the server command to your configuration file (e.g., 'claude_desktop_config.json'). You can run it locally using npx or deploy it to our secure managed cloud at MCPserver.in with one-click.`
      },
      {
        question: `What security controls are available on the ${entityName} integration?`,
        answer: `The ${entityName} MCP server keeps your API credentials secured in environment variables on your host or deployed cluster. It executes tools in a sandboxed runtime, requiring user confirmation for write, delete, or external publishing actions.`
      },
      {
        question: `Does the ${entityName} MCP Server support real-time data lookups?`,
        answer: `Yes! By utilizing Model Context Protocol Resources, the ${entityName} server queries active API endpoints on-demand, returning live context directly to the LLM context window without relying on outdated web caches.`
      },
      {
        question: `What are the typical use cases for the ${entityName} AI connector?`,
        answer: `Common use cases include automating ${entityName} data lookups, pulling active report profiles, updating statuses directly from chat inputs, and synchronizing project files with development environments.`
      },
      {
        question: `What is the cost of running the ${entityName} MCP integration?`,
        answer: `Running the server locally on your machine is 100% free. If you deploy it to our fully-managed hosting in India for team access, it is covered under the Developer tier (₹999/mo) or our Pro plan with low-latency edge scaling.`
      }
    ];
  }

  // Default topic FAQs
  return [
    {
      question: `What is the primary objective of ${title}?`,
      answer: `The goal of ${title} is to streamline how developers construct, deploy, or secure Model Context Protocol endpoints, ensuring autonomous AI models have safe, structured access to essential tools.`
    },
    {
      question: `What are the industry best practices for ${title}?`,
      answer: `Best practices include keeping schemas simple and explicit, handling transport errors gracefully, validating inputs using schemas like Zod, and securing environment secrets inside isolated secure layers.`
    },
    {
      question: `Can I implement ${title} inside an enterprise network?`,
      answer: `Absolutely. You can implement ${title} inside private networks or coordinate access through a central Gateway (like our enterprise server at MCPserver.in) to guarantee compliance with SOC2, GDPR, and Indian data security directives.`
    },
    {
      question: `What are the common mistakes when configuring ${title}?`,
      answer: `Common mistakes include hardcoding credentials, polluting standard output (which breaks Stdio protocol execution), exposing unfiltered database ports to the public internet, and using vague tool descriptors that confuse LLM models.`
    },
    {
      question: `Where can I find sample boilerplates for ${title}?`,
      answer: `You can access free starters and templates directly in our official Docs tab, or leverage our interactive MCP Playground tool to test and validate your live schemas in seconds.`
    }
  ];
}
