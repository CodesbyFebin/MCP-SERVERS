export interface DocsFaq {
  question: string;
  answer: string;
}

export interface DocsTable {
  headers: string[];
  rows: string[][];
}

export interface DocsSection {
  heading: string;
  body: string[];
  code?: string;
  table?: DocsTable;
}

export interface DocsPage {
  slug: string[];
  title: string;
  description: string;
  category: string;
  cluster: string;
  tags: string[];
  targetKeywords: string[];
  schemaType: "TechArticle" | "HowTo" | "FAQPage" | "DefinedTerm" | "ComparisonPage" | "SoftwareApplication";
  priority: number;
  changefreq: "daily" | "weekly" | "monthly";
  directAnswer: string;
  keyTakeaways: string[];
  sections: DocsSection[];
  faqs: DocsFaq[];
  citations: string[];
  related: string[];
  publishedAt: string;
  modifiedAt: string;
}

export interface DocsCluster {
  slug: string;
  title: string;
  description: string;
  answer: string;
  links: string[];
}

const publishedAt = "2026-07-19";
const modifiedAt = "2026-07-19";

const officialCitations = {
  mcp: "https://modelcontextprotocol.io/specification/",
  jsonRpc: "https://www.jsonrpc.org/specification",
  railway: "https://docs.railway.com/",
  dpdp: "https://www.meity.gov.in/",
  rbi: "https://www.rbi.org.in/",
  awsMumbai: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
  cloudRun: "https://cloud.google.com/run/docs",
  sse: "https://html.spec.whatwg.org/multipage/server-sent-events.html",
};

const commonConfigCode = `{
  "mcpServers": {
    "india-edge-api": {
      "url": "https://mcpserver.in/v1/mcp",
      "headers": {
        "Authorization": "Bearer \${MCP_API_KEY}",
        "X-Data-Region": "in"
      }
    }
  }
}`;

const dockerCode = `FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
CMD ["node", "server.js"]`;

const observabilityCode = `{
  "service": "payments-mcp",
  "region": "ap-south-1",
  "redact": ["authorization", "x-api-key", "pan", "aadhaar"],
  "sampleRate": 0.25
}`;

function table(headers: string[], rows: string[][]): DocsTable {
  return { headers, rows };
}

function page(input: Omit<DocsPage, "publishedAt" | "modifiedAt">): DocsPage {
  return { ...input, publishedAt, modifiedAt };
}

export const docsClusters: DocsCluster[] = [
  {
    slug: "servers",
    title: "Server Integrations",
    description: "Docs-facing server guides for every verified MCP integration, with auth, setup, security, and related connectors.",
    answer: "Server integration docs explain how each MCP connector authenticates, what tools it exposes, how to configure it locally or remotely, and what security controls to apply.",
    links: [
      "/docs/servers/github-mcp-server",
      "/docs/servers/postgres-mcp-server",
      "/docs/servers/slack-mcp-server",
      "/docs/servers/stripe-mcp-server",
      "/docs/servers/kubernetes-mcp-server",
    ],
  },
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Quick start guides for MCP setup, local installs, Claude, Cursor, and managed edge hosting.",
    answer: "Start with the MCP concept, run a local server, connect Claude or Cursor, then move production workloads to an authenticated hosted endpoint.",
    links: [
      "/docs/getting-started/what-is-mcp",
      "/docs/getting-started/quickstart",
      "/docs/getting-started/local-installation",
      "/docs/getting-started/claude-cursor-config",
      "/docs/getting-started/managed-edge-hosting",
    ],
  },
  {
    slug: "protocol",
    title: "Protocol",
    description: "Tools, resources, prompts, events, JSON-RPC, stdio, and SSE concepts for MCP builders.",
    answer: "MCP uses JSON-RPC messages over local stdio or remote HTTP streaming, with tools for actions, resources for context, and prompts for reusable instructions.",
    links: [
      "/docs/protocol/tools",
      "/docs/protocol/resources",
      "/docs/protocol/prompts",
      "/docs/protocol/events",
      "/docs/protocol/transports",
    ],
  },
  {
    slug: "pricing",
    title: "Pricing",
    description: "India-first MCP hosting cost comparisons, hidden costs, free tiers, and enterprise pricing.",
    answer: "MCP pricing in India depends on hosting model: local open-source is cheapest, VPS is predictable, serverless is elastic, and enterprise deployments add compliance, monitoring, and VAPT.",
    links: [
      "/docs/pricing/india-pricing-comparison",
      "/docs/pricing/free-vs-paid",
      "/docs/pricing/hidden-costs",
      "/docs/pricing/enterprise-pricing",
    ],
  },
  {
    slug: "performance",
    title: "Performance",
    description: "Latency benchmarks, Bengaluru and Mumbai region choices, global comparisons, and optimization.",
    answer: "For Indian AI agents, place MCP servers near users and data. Mumbai regions suit national coverage, Bengaluru works well for developer-heavy teams, and caching lowers repeated tool latency.",
    links: [
      "/docs/performance/latency-benchmarks-india",
      "/docs/performance/bengaluru-vs-mumbai",
      "/docs/performance/global-vs-india",
      "/docs/performance/optimization-guide",
    ],
  },
  {
    slug: "compliance",
    title: "Compliance",
    description: "DPDP, RBI, audit logging, PII handling, access controls, and MCP security best practices.",
    answer: "Compliance-ready MCP servers minimize personal data exposure, log tool calls, redact sensitive fields, and use explicit consent or authorization before high-risk actions.",
    links: [
      "/docs/compliance/dpdp-compliance-guide",
      "/docs/compliance/dpdp-checklist",
      "/docs/compliance/rbi-compliance",
      "/docs/compliance/security-best-practices",
    ],
  },
  {
    slug: "comparisons",
    title: "Comparisons",
    description: "MCP vs REST, GraphQL, API gateways, and clear decision guides for AI agent architecture.",
    answer: "MCP complements existing APIs. REST and GraphQL expose application operations, while MCP lets AI clients discover and safely use those operations.",
    links: [
      "/docs/comparisons/mcp-vs-rest-2026",
      "/docs/comparisons/mcp-vs-graphql",
      "/docs/comparisons/mcp-vs-api-gateway",
      "/docs/comparisons/when-to-use-mcp",
    ],
  },
  {
    slug: "deployment",
    title: "Deployment",
    description: "Deploy MCP servers on Railway, AWS, Cloud Run, Vercel, and Kubernetes from India.",
    answer: "Production MCP deployment needs a container or serverless runtime, environment-scoped secrets, health checks, structured logs, and a client configuration URL.",
    links: [
      "/docs/deployment/railway-deployment",
      "/docs/deployment/aws-ec2-deployment",
      "/docs/deployment/google-cloud-run",
      "/docs/deployment/vercel-deployment",
      "/docs/deployment/kubernetes-deployment",
    ],
  },
  {
    slug: "industry",
    title: "Industry",
    description: "MCP patterns for Indian startups, banks, ecommerce, government, healthcare, and education.",
    answer: "Industry MCP implementations should start with the user journey, then bind only the approved tools, datasets, and audit policies each vertical needs.",
    links: [
      "/docs/industry/startups",
      "/docs/industry/fintech",
      "/docs/industry/ecommerce",
      "/docs/industry/government",
      "/docs/industry/healthcare",
      "/docs/industry/education",
    ],
  },
  {
    slug: "monitoring",
    title: "Monitoring",
    description: "Dashboards, MCP Pulse workflows, Grafana metrics, logs, traces, and operational controls.",
    answer: "Monitor MCP servers by tracking tool-call latency, error rates, auth failures, token usage, and redaction events per server and per connected client.",
    links: [
      "/docs/monitoring",
      "/docs/monitoring/grafana-dashboard",
      "/docs/monitoring/mcp-pulse-guide",
      "/docs/monitoring/observability-best-practices",
    ],
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Fixes for the most common MCP connection, authentication, tool-execution, and performance errors.",
    answer: "Most MCP issues trace back to three causes: an incorrect command path in the client config, a missing environment variable, or a network or firewall restriction. Check those first before deeper debugging.",
    links: ["/docs/troubleshooting/common-issues"],
  },
];

const hubSections = (cluster: DocsCluster): DocsSection[] => [
  {
    heading: `${cluster.title} documentation map`,
    body: [
      cluster.description,
      "Each guide in this cluster is written for teams building AI agent workflows in India, with practical routing, security, pricing, and deployment decisions called out explicitly.",
      "Use the table below to choose the correct page, then follow the related links at the bottom of every guide to continue through the knowledge graph.",
    ],
    table: table(
      ["Guide", "Primary use"],
      cluster.links.map((link) => [
        link.replace("/docs/", "").split("/").join(" / "),
        link.includes("comparison") ? "Compare tradeoffs and costs" : link.includes("checklist") ? "Operational readiness checklist" : "Implementation guide",
      ])
    ),
  },
  {
    heading: "Recommended implementation sequence",
    body: [
      "Start with a narrow use case, define the exact data the agent may access, and choose a transport that fits the user environment.",
      "For desktop-only workflows, stdio is usually enough. For shared teams, remote SSE or streamable HTTP endpoints are easier to monitor and govern.",
      "Before production, add request validation, secret isolation, structured logs, and a rollback path for each deployed MCP server.",
    ],
    code: commonConfigCode,
  },
];

const generatedHubPages: DocsPage[] = docsClusters
  .filter((cluster) => cluster.slug !== "monitoring")
  .map((cluster) =>
    page({
    slug: [cluster.slug],
    title: `${cluster.title} MCP Documentation`,
    description: cluster.description,
    category: cluster.slug,
    cluster: `${cluster.slug}-hub`,
    tags: [cluster.slug, "mcp", "india", "documentation"],
    targetKeywords: [`mcp ${cluster.slug} documentation`, `mcp server ${cluster.slug}`],
    schemaType: "TechArticle",
    priority: cluster.slug === "pricing" || cluster.slug === "deployment" ? 0.9 : 0.8,
    changefreq: "weekly",
    directAnswer: cluster.answer,
    keyTakeaways: [
      "Every page includes India-first deployment and compliance context.",
      "Internal links connect pricing, performance, compliance, and deployment decisions.",
      "Use the hub as the cluster index for search engines and AI answer engines.",
    ],
    sections: hubSections(cluster),
    faqs: [
      {
        question: `What does the ${cluster.title.toLowerCase()} docs cluster cover?`,
        answer: cluster.description,
      },
      {
        question: "Are these guides written for Indian MCP teams?",
        answer: "Yes. They include Indian regions, rupee-aware cost planning, DPDP-aware data handling, and common local integrations where relevant.",
      },
      {
        question: "Do these docs apply to Claude and Cursor?",
        answer: "Yes. The configuration patterns are suitable for Claude Desktop, Cursor, and custom MCP clients that support the protocol.",
      },
    ],
    citations: [officialCitations.mcp],
    related: cluster.links.slice(0, 5),
    })
  );

const serverSectionOverrides: Record<string, DocsSection[]> = {
  "postgres-mcp-server": [
    {
      heading: "Secure query tool with parameterized statements",
      body: [
        "Give the agent a single, tightly-scoped read tool rather than raw query execution. Validate the query with Zod, reject write keywords with a heuristic check (a production build should use a real SQL parser instead of string matching), and always execute through parameterized statements, never string concatenation.",
      ],
      code: `const QuerySchema = z.object({
  sql_query: z.string().describe("A read-only SELECT query."),
  parameters: z.array(z.any()).optional(),
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const parsed = QuerySchema.parse(request.params.arguments);
  const forbidden = ["UPDATE", "DELETE", "DROP", "INSERT", "TRUNCATE"];
  if (forbidden.some((k) => parsed.sql_query.toUpperCase().includes(k))) {
    throw new Error("Only read-only SELECT queries are permitted.");
  }

  const client = new Client({ /* PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE, ssl */ });
  await client.connect();
  const res = await client.query(parsed.sql_query, parsed.parameters ?? []);
  await client.end();
  return { content: [{ type: "text", text: JSON.stringify(res.rows, null, 2) }] };
});`,
    },
    {
      heading: "Schema introspection so the agent can write valid queries",
      body: [
        "An agent cannot write good queries without knowing the table structure. Expose a dedicated get_database_schema tool backed by information_schema rather than letting the agent guess column names.",
      ],
      code: `SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public';`,
    },
    {
      heading: "Production guardrails: pooling, timeouts, and row limits",
      body: [
        "Use a connection pool instead of opening a new client per request, or concurrent AI requests will exhaust database connections.",
        "Set a statement_timeout on the MCP database role so a malformed AI-generated query cannot lock up the database, and append a LIMIT automatically when the agent's query does not specify one, so a large result set cannot overwhelm the model's context window.",
      ],
    },
  ],
};

const generatedServerDocsPages: DocsPage[] = servers.map((server) =>
  page({
    slug: ["servers", server.slug],
    title: `${server.name} MCP Server`,
    description: `Deploy and configure the ${server.name} MCP server with authentication, use cases, security notes, and India-ready hosting guidance.`,
    category: "servers",
    cluster: `${server.slug}-integration`,
    tags: [
      "server-integration",
      server.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      "mcp",
      "india",
    ],
    targetKeywords: [
      `${server.name.toLowerCase()} mcp server`,
      `${server.name.toLowerCase()} mcp integration`,
      `connect claude to ${server.name.toLowerCase()}`,
    ],
    schemaType: "SoftwareApplication",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: `The ${server.name} MCP server exposes ${server.name} capabilities to AI clients through scoped tools, resources, and JSON-RPC calls, using ${server.auth} for authentication.`,
    keyTakeaways: [
      `Authentication: ${server.auth}.`,
      `Category: ${server.category}.`,
      `Best first use case: ${server.useCases[0] || `Connect AI agents to ${server.name}`}.`,
      "Use environment variables and least-privilege scopes for production.",
    ],
    sections: [
      {
        heading: "Integration overview",
        body: [
          server.description,
          `Use this connector when an AI assistant such as Claude, Cursor, or a custom agent needs a governed path into ${server.name}. Keep the server focused on the approved workflows instead of exposing a whole account or admin surface.`,
          "For Indian teams, deploy the connector near the users and the data source, then add request IDs, redaction, and audit logs before connecting production data.",
        ],
        table: table(
          ["Field", "Value"],
          [
            ["Connector", `${server.name} MCP Server`],
            ["Category", server.category],
            ["Authentication", server.auth],
            ["Production route", `/servers/${server.slug}/`],
          ]
        ),
      },
      {
        heading: "Features and use cases",
        body: [
          `${server.name} is most useful when the agent has a narrow job to complete and the server can validate every argument before execution.`,
          "Start with read-only or low-risk tools. Add write operations only after approval prompts, scoped credentials, and logging are working.",
        ],
        table: table(
          ["Capability", "Recommended guardrail"],
          server.features.slice(0, 5).map((feature) => [
            feature,
            feature.toLowerCase().includes("write") || feature.toLowerCase().includes("manage") || feature.toLowerCase().includes("control")
              ? "Require approval and audit logging"
              : "Allow with scoped read access",
          ])
        ),
      },
      {
        heading: "Local and hosted configuration",
        body: [
          `Configure ${server.name} with credentials stored in environment variables. Do not hardcode tokens in prompts, repositories, screenshots, or browser-visible code.`,
          "The local configuration pattern works for a single developer. Hosted deployments should add TLS, bearer-token authentication, health checks, and monitoring.",
        ],
        code: `{
  "mcpServers": {
    "${server.slug.replace("-mcp-server", "")}": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-${server.slug.replace("-mcp-server", "")}"],
      "env": {
        "${server.name.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}_TOKEN": "\${${server.name.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}_TOKEN}"
      }
    }
  }
}`,
      },
      {
        heading: "Security and permissions",
        body: [
          `Protect ${server.auth} credentials with least privilege, rotation, and separate environments for development, staging, and production.`,
          "Review every tool output for sensitive data before letting it enter model context. For regulated Indian workflows, add DPDP-aware redaction and retention controls.",
        ],
        code: `{
  "server": "${server.slug}",
  "auth": "${server.auth}",
  "policy": {
    "leastPrivilege": true,
    "redactSecrets": true,
    "requireApprovalForWrites": true,
    "auditToolCalls": true
  }
}`,
      },
      ...(serverSectionOverrides[server.slug] ?? []),
    ],
    faqs: [
      {
        question: `What is the ${server.name} MCP server used for?`,
        answer: `It connects AI agents to ${server.name} so they can perform approved workflows such as ${server.useCases.slice(0, 2).join(" and ")}.`,
      },
      {
        question: `How does ${server.name} MCP authentication work?`,
        answer: `This connector uses ${server.auth}. Store credentials in environment variables or a secret manager and scope them to the smallest useful permissions.`,
      },
      {
        question: `Can I deploy the ${server.name} MCP server for a team in India?`,
        answer: "Yes. Use hosted MCP deployment with TLS, access controls, Mumbai or Bengaluru latency testing, and structured audit logs.",
      },
      {
        question: `Is the ${server.name} MCP server safe for production?`,
        answer: "It can be production-ready when you validate inputs, scope credentials, redact sensitive output, monitor tool calls, and require approval for destructive actions.",
      },
      {
        question: `What should I connect next after ${server.name}?`,
        answer: `Related connectors include ${server.related.slice(0, 3).join(", ")}.`,
      },
    ],
    citations: [
      "https://modelcontextprotocol.io/specification/",
      `https://mcpserver.in/servers/${server.slug}/`,
    ],
    related: [
      `/servers/${server.slug}`,
      "/docs/servers",
      "/docs/compliance/security-best-practices",
      "/docs/deployment/railway-deployment",
      ...server.related.slice(0, 2).map((slug) => `/docs/servers/${slug}`),
    ],
  })
);

export const docsPages: DocsPage[] = [
  ...generatedHubPages,
  ...generatedServerDocsPages,
  page({
    slug: ["getting-started", "what-is-mcp"],
    title: "What Is MCP?",
    description: "Learn what Model Context Protocol is and how it connects AI agents to tools, resources, prompts, and APIs.",
    category: "getting-started",
    cluster: "what-is-mcp",
    tags: ["mcp", "tutorial", "setup"],
    targetKeywords: ["mcp server tutorial", "model context protocol documentation"],
    schemaType: "TechArticle",
    priority: 0.9,
    changefreq: "weekly",
    directAnswer: "Model Context Protocol is a standard way for AI clients to discover and call external tools, read resources, and use prompt templates without custom integration code for every app.",
    keyTakeaways: ["MCP separates AI clients from data providers.", "Tools perform actions while resources provide read-only context.", "Stdio is common locally; remote HTTP streaming is better for teams."],
    sections: [
      {
        heading: "Core architecture",
        body: [
          "An MCP client such as Claude Desktop, Cursor, or a custom agent opens a connection to one or more MCP servers. The server declares capabilities through machine-readable schemas, and the client chooses which tools or resources to expose to the model.",
          "This keeps the model interface consistent even when the backend is a database, file system, CRM, payment API, government dataset, or internal application.",
        ],
        table: table(
          ["Primitive", "Purpose", "Example"],
          [["Tool", "Execute an approved action", "Create a GitHub issue"], ["Resource", "Read context", "Load a Postgres schema"], ["Prompt", "Reuse instructions", "Run a code review prompt"]]
        ),
      },
      {
        heading: "India-first implementation note",
        body: [
          "Indian teams often combine SaaS connectors with local business systems such as UPI, GST, logistics, education, and healthcare datasets. MCP works well when those systems already expose APIs but need a safer model-facing orchestration layer.",
        ],
        code: commonConfigCode,
      },
    ],
    faqs: [
      { question: "Is MCP an API replacement?", answer: "No. MCP usually wraps existing APIs and databases so AI clients can discover and call them consistently." },
      { question: "Do I need a remote server?", answer: "Local stdio servers are enough for single-user desktop workflows; remote servers are better for teams and production." },
      { question: "Can MCP connect to Indian apps?", answer: "Yes. Any app with an API, database, queue, or file interface can be exposed through a scoped MCP server." },
    ],
    citations: [officialCitations.mcp, officialCitations.jsonRpc],
    related: ["/docs/getting-started/local-installation", "/docs/protocol/tools", "/docs/deployment/railway-deployment", "/glossary/model-context-protocol"],
  }),
  page({
    slug: ["getting-started", "quickstart"],
    title: "MCP Server Quickstart Guide",
    description: "Build, run, and connect your first Model Context Protocol server in Node.js and TypeScript in under five minutes.",
    category: "getting-started",
    cluster: "quickstart",
    tags: ["mcp", "quickstart", "typescript", "sdk"],
    targetKeywords: ["mcp quickstart", "build mcp server", "model context protocol tutorial", "mcp sdk nodejs"],
    schemaType: "HowTo",
    priority: 0.9,
    changefreq: "weekly",
    directAnswer: "The fastest way to connect a local AI agent such as Claude Desktop or Cursor to a custom tool is the stdio transport in the official Model Context Protocol SDK: define a tool schema, register list and call handlers, then point the client config at the compiled server.",
    keyTakeaways: [
      "A minimal MCP server needs only a tool schema and two request handlers: list tools and call tool.",
      "Validate every tool argument with a schema library such as Zod before executing it.",
      "Test locally with the MCP Inspector before wiring the server into Claude Desktop or Cursor.",
    ],
    sections: [
      {
        heading: "Prerequisites",
        body: [
          "Install Node.js 18 or higher, and have Claude Desktop or Cursor IDE available to test the finished server.",
          "Basic familiarity with TypeScript and npm is enough to follow this guide end to end.",
        ],
      },
      {
        heading: "Initialize the project",
        body: [
          "Create a new directory, initialize a Node.js project, and install the official SDK along with Zod for input validation.",
        ],
        code: `mkdir my-first-mcp-server
cd my-first-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
npx tsc --init`,
      },
      {
        heading: "Define the tool server",
        body: [
          "A minimal server declares its name and capabilities, registers a list-tools handler that describes each tool's JSON Schema, and registers a call-tool handler that validates arguments with Zod before executing.",
          "Always validate tool inputs with a schema library. The MCP SDK requires strict JSON Schema definitions for every tool to prevent malformed or malicious requests from reaching your execution logic.",
        ],
        code: `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const server = new Server(
  { name: "my-first-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const WeatherSchema = z.object({
  location: z.string().describe("The city and state, e.g., 'Mumbai, IN'"),
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_current_weather",
      description: "Get the current weather for a specific location.",
      inputSchema: {
        type: "object",
        properties: { location: { type: "string", description: "The city and state" } },
        required: ["location"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  if (name === "get_current_weather") {
    const parsed = WeatherSchema.parse(args);
    const mockWeather = { location: parsed.location, temperature: "28C", condition: "Partly Cloudy" };
    return { content: [{ type: "text", text: JSON.stringify(mockWeather, null, 2) }] };
  }
  throw new Error(\`Tool \${name} not found\`);
});

const transport = new StdioServerTransport();
await server.connect(transport);`,
      },
      {
        heading: "Compile, test, and connect to Claude Desktop",
        body: [
          "Compile the TypeScript output, then verify the server responds correctly with the MCP Inspector before wiring it into any client.",
          "To use the server in Claude Desktop, add it to claude_desktop_config.json (in Library/Application Support/Claude on Mac, or %APPDATA%/Claude on Windows) using an absolute path to the compiled entry point, then restart Claude Desktop.",
        ],
        code: `npx tsc
npx @modelcontextprotocol/inspector node dist/index.js`,
      },
    ],
    faqs: [
      { question: "Can I use Python instead of Node.js for MCP servers?", answer: "Yes. The official SDK has a Python equivalent. The protocol is language-agnostic as long as it adheres to the JSON-RPC 2.0 specification." },
      { question: "Why does Claude Desktop say the command was not found?", answer: "This almost always means the command path in claude_desktop_config.json is relative or incorrect. Always use absolute paths for local stdio servers." },
      { question: "Do I need to deploy anything to test a new tool?", answer: "No. Local stdio testing with the MCP Inspector is free and does not require any hosting; deploy only once the tool is ready for a team or production use." },
    ],
    citations: [officialCitations.mcp, officialCitations.jsonRpc],
    related: ["/docs/getting-started/local-installation", "/docs/getting-started/claude-cursor-config", "/docs/protocol/tools", "/servers"],
  }),
  page({
    slug: ["getting-started", "local-installation"],
    title: "Local MCP Installation",
    description: "Install and test a local MCP server with stdio, package managers, environment variables, and safe logs.",
    category: "getting-started",
    cluster: "local-installation",
    tags: ["setup", "stdio", "local"],
    targetKeywords: ["mcp server setup", "mcp local installation"],
    schemaType: "HowTo",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "A local MCP server runs as a child process and exchanges JSON-RPC messages over stdin and stdout. Keep logs on stderr and keep secrets in environment variables.",
    keyTakeaways: ["Use stdio for local testing.", "Do not print debug logs to stdout.", "Validate the server with one safe read-only tool first."],
    sections: [
      {
        heading: "Install and run",
        body: [
          "Local installation is the fastest way to learn MCP. Create a small TypeScript or Python server, expose one harmless tool, and point your client configuration at the command that starts it.",
          "The most common local failure is corrupting stdout with log output. The MCP stream expects JSON-RPC frames, so debugging output should go to stderr.",
        ],
        code: `npm init -y
npm install @modelcontextprotocol/sdk zod
node server.js`,
      },
      {
        heading: "Desktop client configuration",
        body: [
          "Claude Desktop and Cursor read server definitions from JSON configuration. Use absolute commands when possible and place secrets in the env block instead of source code.",
        ],
        code: `{
  "mcpServers": {
    "local-notes": {
      "command": "node",
      "args": ["/Users/me/mcp/local-notes/server.js"],
      "env": {
        "NOTES_DIR": "/Users/me/Documents/notes"
      }
    }
  }
}`,
      },
    ],
    faqs: [
      { question: "Can local MCP work offline?", answer: "Yes, if the tools and resources it exposes do not require remote APIs." },
      { question: "Where should secrets live?", answer: "Use environment variables or a secret manager, not hardcoded client-side code." },
      { question: "Why does stdio fail with random text?", answer: "Any stdout text that is not a JSON-RPC frame can break the protocol stream." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/getting-started/claude-cursor-config", "/docs/protocol/events", "/docs/compliance/security-best-practices"],
  }),
  page({
    slug: ["getting-started", "claude-cursor-config"],
    title: "Claude and Cursor MCP Config",
    description: "Configure Claude Desktop and Cursor for local and hosted MCP servers using safe headers and env variables.",
    category: "getting-started",
    cluster: "claude-cursor-config",
    tags: ["claude", "cursor", "configuration"],
    targetKeywords: ["mcp server configuration", "claude cursor mcp config"],
    schemaType: "HowTo",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "Claude and Cursor MCP configuration maps a server name to either a local command or remote endpoint, plus the arguments, environment variables, and headers required to authenticate safely.",
    keyTakeaways: ["Keep names stable for users.", "Use env variables for tokens.", "Scope each server to one job domain."],
    sections: [
      {
        heading: "Recommended config layout",
        body: [
          "A production client should avoid one giant server that can do everything. Split finance, source control, analytics, and internal APIs into separate MCP servers so permissions stay understandable.",
        ],
        code: commonConfigCode,
      },
      {
        heading: "Permission design",
        body: [
          "Give users readable names that describe the tool boundary. A server called payments-readonly is safer than a vague server called company-tools because the client can present clearer prompts before tool calls.",
        ],
        table: table(["Server name", "Permission boundary"], [["payments-readonly", "Read settlements and invoices only"], ["repo-review", "Read code and create review comments"], ["support-desk", "Search tickets and draft replies"]]),
      },
    ],
    faqs: [
      { question: "Should one MCP server hold all credentials?", answer: "No. Separate servers reduce blast radius and make approvals clearer." },
      { question: "Can remote servers use headers?", answer: "Yes. Hosted endpoints normally authenticate with bearer tokens or signed headers." },
      { question: "Does Cursor support local MCP servers?", answer: "Cursor supports MCP-style tool connections where configured through its MCP settings." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/compliance/security-best-practices", "/docs/deployment/railway-deployment", "/glossary/oauth"],
  }),
  page({
    slug: ["getting-started", "managed-edge-hosting"],
    title: "Managed Edge MCP Hosting",
    description: "Plan hosted MCP endpoints for Indian teams with regions, auth headers, logging, and rollback controls.",
    category: "getting-started",
    cluster: "managed-edge-hosting",
    tags: ["hosting", "edge", "india"],
    targetKeywords: ["mcp server hosting india", "managed mcp hosting"],
    schemaType: "TechArticle",
    priority: 0.9,
    changefreq: "weekly",
    directAnswer: "Managed edge hosting is best when multiple users or agents need the same MCP server with centralized authentication, observability, rate limits, and region-aware latency.",
    keyTakeaways: ["Host near users and data.", "Centralize audit logs.", "Keep rollbacks simple."],
    sections: [
      {
        heading: "When managed hosting is worth it",
        body: [
          "Local MCP works for experimentation, but production teams need consistent auth, shared endpoints, error monitoring, and deploy history. A hosted endpoint also lets mobile, web, and IDE clients reuse the same connector.",
          "Indian deployments should consider where the source system lives. A Mumbai-hosted database usually performs better through a nearby app region than through a distant global proxy.",
        ],
        table: table(["Need", "Local stdio", "Hosted edge"], [["Single developer", "Strong fit", "Optional"], ["Team access", "Hard to govern", "Strong fit"], ["Audit logs", "Manual", "Centralized"], ["Regional latency", "Device dependent", "Region selectable"]]),
      },
      {
        heading: "Baseline hosted configuration",
        body: ["A hosted server should require TLS, authenticated headers, request IDs, and clear data-region metadata for logs and incident response."],
        code: commonConfigCode,
      },
    ],
    faqs: [
      { question: "Is edge hosting mandatory?", answer: "No. It becomes useful when multiple users, centralized security, or low regional latency matter." },
      { question: "Which Indian region should I pick?", answer: "Choose the region closest to your users and data source, usually Mumbai or Bengaluru for Indian teams." },
      { question: "How do I roll back?", answer: "Keep immutable deploy versions and point clients at the last healthy endpoint if a release fails." },
    ],
    citations: [officialCitations.awsMumbai, officialCitations.cloudRun],
    related: ["/docs/pricing/india-pricing-comparison", "/docs/performance/latency-benchmarks-india", "/docs/monitoring"],
  }),
  page({
    slug: ["protocol", "tools"],
    title: "MCP Tool Schemas",
    description: "Design MCP tools with clear JSON schemas, safe arguments, validation, and user approval boundaries.",
    category: "protocol",
    cluster: "tools",
    tags: ["tools", "json-schema", "protocol"],
    targetKeywords: ["mcp server examples", "mcp tool schema"],
    schemaType: "TechArticle",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "MCP tools are executable functions exposed to AI clients. Good tools have short descriptions, shallow JSON schemas, strict validation, and clear safety boundaries.",
    keyTakeaways: ["Tools do actions.", "Schemas should be shallow.", "High-risk tools need explicit approval."],
    sections: [
      {
        heading: "Tool design rules",
        body: [
          "A tool should map to one business action, not an entire application. Narrow tools are easier for models to select and safer for humans to approve.",
          "Use enums, bounded strings, and explicit required fields. Avoid free-form command fields unless the server has a strong sandbox.",
        ],
        code: `{
  "name": "lookup_ifsc",
  "description": "Find Indian bank branch details from an IFSC code.",
  "inputSchema": {
    "type": "object",
    "required": ["ifsc"],
    "properties": {
      "ifsc": { "type": "string", "pattern": "^[A-Z]{4}0[A-Z0-9]{6}$" }
    }
  }
}`,
      },
    ],
    faqs: [
      { question: "What is a tool in MCP?", answer: "A tool is an approved function a client can call through the MCP server." },
      { question: "Should tools be broad or narrow?", answer: "Narrow tools are usually safer and easier for models to use correctly." },
      { question: "Can tools change data?", answer: "Yes, but write tools should require stronger validation and user approval." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/protocol/resources", "/docs/compliance/security-best-practices", "/glossary/tool"],
  }),
  page({
    slug: ["protocol", "resources"],
    title: "MCP Resource Templates",
    description: "Expose read-only context through MCP resources and resource templates without overloading prompts.",
    category: "protocol",
    cluster: "resources",
    tags: ["resources", "templates", "context"],
    targetKeywords: ["mcp resources", "mcp resource templates"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "MCP resources are read-only context feeds such as files, logs, schemas, or datasets. Resource templates let clients request scoped context by URI pattern.",
    keyTakeaways: ["Resources are read-only.", "Templates reduce token waste.", "Use stable URI schemes."],
    sections: [
      {
        heading: "Resource URI planning",
        body: [
          "Use human-readable URI schemes that reflect the source system. For Indian data workflows, examples include gst://returns/{period}, ifsc://bank/{code}, and logs://payments/{date}.",
        ],
        code: `{
  "uriTemplate": "ifsc://branch/{code}",
  "name": "IFSC branch lookup",
  "mimeType": "application/json"
}`,
      },
    ],
    faqs: [
      { question: "Can resources write data?", answer: "No. Resources should expose read-only context; use tools for actions." },
      { question: "Why use templates?", answer: "Templates let clients fetch only the context they need instead of loading entire datasets." },
      { question: "Are resources better than prompts?", answer: "They solve different problems. Resources provide data, prompts provide instructions." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/protocol/tools", "/docs/protocol/prompts", "/glossary/resource"],
  }),
  page({
    slug: ["protocol", "prompts"],
    title: "MCP Prompt Templates",
    description: "Use MCP prompt templates for reusable agent instructions, domain workflows, and safer task setup.",
    category: "protocol",
    cluster: "prompts",
    tags: ["prompts", "templates", "agents"],
    targetKeywords: ["mcp prompts", "mcp prompt templates"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "MCP prompts are reusable instructions served by an MCP server so clients can start consistent workflows with domain context and parameters.",
    keyTakeaways: ["Prompts standardize workflow setup.", "Parameters keep templates reusable.", "Server-owned prompts are easier to update."],
    sections: [
      {
        heading: "Template example",
        body: ["Use prompts when every agent run needs the same framing, such as compliance review, code review, or support triage."],
        code: `{
  "name": "dpdp-review",
  "arguments": [{ "name": "system", "required": true }],
  "template": "Review {{system}} for PII handling, consent, retention, and audit gaps."
}`,
      },
    ],
    faqs: [
      { question: "Are prompts required in every server?", answer: "No. They are useful when a repeatable workflow needs shared instructions." },
      { question: "Can prompts include parameters?", answer: "Yes. Parameters let the client customize a server-provided template." },
      { question: "Do prompts execute actions?", answer: "No. Tools execute actions; prompts configure the conversation." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/protocol/tools", "/docs/compliance/dpdp-compliance-guide", "/glossary/prompt"],
  }),
  page({
    slug: ["protocol", "events"],
    title: "MCP Events and Changes",
    description: "Understand MCP notifications, event-driven updates, resource changes, and stream-safe client behavior.",
    category: "protocol",
    cluster: "events",
    tags: ["events", "notifications", "streaming"],
    targetKeywords: ["mcp events", "mcp notifications"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "MCP event patterns use notifications and stream updates so clients can react when resources, server state, or long-running operations change.",
    keyTakeaways: ["Notifications do not require responses.", "Stream updates need retry handling.", "Clients should tolerate duplicate events."],
    sections: [
      {
        heading: "Event-safe design",
        body: ["Treat event streams as eventually consistent. Include request IDs and resource versions so clients can deduplicate updates after reconnects."],
        code: `{
  "jsonrpc": "2.0",
  "method": "notifications/resources/updated",
  "params": {
    "uri": "logs://payments/today",
    "version": "2026-07-19T09:00:00+05:30"
  }
}`,
      },
    ],
    faqs: [
      { question: "Do notifications have IDs?", answer: "JSON-RPC notifications do not include IDs because no response is expected." },
      { question: "Should clients retry streams?", answer: "Yes. Remote streaming clients should reconnect and deduplicate events." },
      { question: "Can resources emit changes?", answer: "Servers can notify clients when subscribed resources change." },
    ],
    citations: [officialCitations.mcp, officialCitations.jsonRpc],
    related: ["/docs/protocol/resources", "/docs/monitoring/observability-best-practices", "/glossary/json-rpc"],
  }),
  page({
    slug: ["protocol", "transports"],
    title: "MCP Transports: Stdio vs HTTP/SSE",
    description: "Choose between stdio and HTTP/SSE transports for Model Context Protocol servers, with tradeoffs for local development versus production cloud deployments.",
    category: "protocol",
    cluster: "transports",
    tags: ["transports", "stdio", "sse", "protocol"],
    targetKeywords: ["mcp transports", "mcp stdio", "mcp http sse", "mcp remote server"],
    schemaType: "TechArticle",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "MCP is transport-agnostic: the same JSON-RPC 2.0 messages flow over either channel. Use stdio for local development and single-user desktop clients such as Claude Desktop or Cursor; use HTTP with Server-Sent Events for production, multi-tenant, cloud-hosted servers that serve multiple clients at once.",
    keyTakeaways: [
      "Stdio ties the server to the client process and needs no network configuration or authentication.",
      "HTTP/SSE supports multiple concurrent clients and remote access, but requires TLS, auth, and rate limiting.",
      "Switching transports later does not require rewriting tool logic, only the transport initialization.",
    ],
    sections: [
      {
        heading: "Stdio transport (local)",
        body: [
          "The AI client spawns the MCP server as a child process and exchanges JSON-RPC frames over stdin and stdout, so the server's lifecycle is tied to the client. This gives zero network configuration, no authentication burden since the trust boundary is the local machine, and minimal latency.",
          "The tradeoff: only one client can connect at a time, the server cannot be reached remotely, and any stray text written to stdout (instead of stderr) corrupts the JSON-RPC stream.",
        ],
        code: `import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const transport = new StdioServerTransport();
await server.connect(transport);`,
      },
      {
        heading: "HTTP/SSE transport (remote)",
        body: [
          "HTTP POST carries client-to-server requests such as tools/call and resources/read, while Server-Sent Events stream server-to-client notifications and long-running operation updates. This is standard REST-like infrastructure carrying JSON-RPC payloads, so it works behind load balancers and supports OAuth or API-key authentication.",
          "The tradeoff: it needs TLS, CORS, and auth configured correctly, and carries more latency than a local pipe.",
        ],
        code: `import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.listen(3000);`,
      },
      {
        heading: "Decision matrix",
        body: ["Match the transport to the deployment shape rather than defaulting to one for every project."],
        table: table(
          ["Scenario", "Recommended transport"],
          [
            ["Local development", "Stdio"],
            ["Claude Desktop or Cursor integration", "Stdio"],
            ["Single-user desktop app", "Stdio"],
            ["Team collaboration tool", "HTTP/SSE"],
            ["Multi-tenant SaaS product", "HTTP/SSE"],
            ["Enterprise or mobile-app backend", "HTTP/SSE"],
          ]
        ),
      },
    ],
    faqs: [
      { question: "Can I switch from stdio to HTTP/SSE later?", answer: "Yes. The protocol layer is identical either way; only the transport initialization code changes, so tool definitions and business logic stay the same." },
      { question: "Does HTTP/SSE support streaming responses?", answer: "Yes. Server-Sent Events are designed for one-way server-to-client streaming, which suits long-running tool executions and real-time notifications." },
      { question: "Is stdio transport secure?", answer: "It is secure for local, single-user scenarios because the trust boundary is the local machine, but it should never be exposed directly over a network." },
    ],
    citations: [officialCitations.mcp, officialCitations.jsonRpc, officialCitations.sse],
    related: ["/docs/protocol/events", "/docs/compliance/security-best-practices", "/docs/getting-started/quickstart", "/docs/deployment/railway-deployment"],
  }),
  page({
    slug: ["pricing", "india-pricing-comparison"],
    title: "MCP Server India Pricing",
    description: "Compare MCP server costs in India across free local servers, VPS, serverless, cloud, and enterprise setups.",
    category: "pricing",
    cluster: "india-pricing-comparison",
    tags: ["pricing", "india", "cost"],
    targetKeywords: ["mcp server india pricing", "mcp server cost india", "affordable mcp hosting india"],
    schemaType: "HowTo",
    priority: 0.95,
    changefreq: "weekly",
    directAnswer: "MCP server costs in India range from free local open-source setups to paid VPS, serverless, cloud, and enterprise deployments with VAPT, compliance, monitoring, and support.",
    keyTakeaways: ["Local open-source is cheapest for development.", "VPS gives predictable monthly spend.", "Enterprise cost depends on security scope and audit requirements."],
    sections: [
      {
        heading: "Cost comparison in INR-aware planning",
        body: [
          "The cheapest MCP server is usually a local stdio server running on a developer laptop. The moment a team needs shared access, production uptime, logs, or compliance controls, hosting costs move into infrastructure and operations.",
          "For Indian startups, the practical decision is not only monthly compute cost. Include egress, log retention, secrets, monitoring, VAPT, support, and the engineering time required to maintain secure connectors.",
        ],
        table: table(
          ["Hosting option", "Cost pattern", "Best fit"],
          [["Local open-source", "No hosting bill", "Learning and one-person workflows"], ["VPS in India or nearby region", "Predictable monthly server cost", "Small teams with stable traffic"], ["Serverless", "Usage-based", "Bursty workloads and prototypes"], ["Enterprise managed", "Custom security and compliance scope", "Banks, fintech, health, and regulated teams"]]
        ),
      },
      {
        heading: "Budget configuration checklist",
        body: [
          "Track each server separately. A GitHub read-only server has different cost and risk from a payments write server. Tag environments by city or cloud region so bills map back to product teams.",
        ],
        code: observabilityCode,
      },
    ],
    faqs: [
      { question: "Which MCP hosting option is cheapest in India?", answer: "A local open-source stdio server is cheapest for development. For teams, a small VPS is often the most predictable starting point." },
      { question: "Do MCP servers accept INR billing?", answer: "Billing depends on the hosting provider. Indian vendors and some marketplaces may invoice in INR, while global cloud services may bill in USD or local tax-adjusted currency." },
      { question: "What hidden costs should I plan for?", answer: "Plan for egress, logs, metrics, secret management, uptime monitoring, backups, compliance reviews, and engineering maintenance." },
      { question: "When does managed hosting pay off?", answer: "Managed hosting helps when team access, audits, incident response, and secure credential rotation would otherwise consume engineering time." },
    ],
    citations: [officialCitations.awsMumbai, officialCitations.cloudRun],
    related: ["/docs/pricing/hidden-costs", "/docs/deployment/railway-deployment", "/docs/compliance/dpdp-compliance-guide", "/docs/performance/latency-benchmarks-india"],
  }),
  page({
    slug: ["pricing", "free-vs-paid"],
    title: "Free vs Paid MCP Hosting",
    description: "Choose between free local MCP servers and paid hosted endpoints for teams, monitoring, and production access.",
    category: "pricing",
    cluster: "free-vs-paid",
    tags: ["free", "paid", "hosting"],
    targetKeywords: ["free mcp server", "paid mcp hosting india"],
    schemaType: "TechArticle",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Use free local MCP for learning and personal workflows. Choose paid hosting when multiple users need reliable access, centralized security, monitoring, and audit trails.",
    keyTakeaways: ["Free is ideal for learning.", "Paid hosting buys operations, not just compute.", "Regulated data usually needs stronger controls."],
    sections: [
      {
        heading: "Decision table",
        body: ["Free and paid MCP hosting solve different stages of maturity. Start free, but move important workflows to monitored hosting before real customer data flows through tools."],
        table: table(["Criterion", "Free local", "Paid hosted"], [["Setup speed", "Fast", "Moderate"], ["Team sharing", "Weak", "Strong"], ["Audit logs", "Manual", "Built in"], ["DPDP review", "Your responsibility", "Shared controls possible"]]),
      },
    ],
    faqs: [
      { question: "Is free MCP safe?", answer: "It can be safe for local, low-risk use if secrets and permissions are handled correctly." },
      { question: "Why pay for MCP hosting?", answer: "Teams pay for uptime, monitoring, access controls, compliance support, and shared endpoints." },
      { question: "Can I migrate later?", answer: "Yes. Keep tool schemas and configuration portable so local servers can become hosted servers." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/pricing/india-pricing-comparison", "/docs/pricing/hidden-costs", "/docs/getting-started/local-installation"],
  }),
  page({
    slug: ["pricing", "hidden-costs"],
    title: "Hidden MCP Hosting Costs",
    description: "Plan for MCP hosting costs beyond compute, including logs, egress, monitoring, secrets, VAPT, and compliance.",
    category: "pricing",
    cluster: "hidden-costs",
    tags: ["cost", "monitoring", "security"],
    targetKeywords: ["mcp hidden costs", "mcp hosting cost india"],
    schemaType: "TechArticle",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Hidden MCP costs usually come from logs, egress, secrets, security reviews, backups, observability, incident response, and maintaining connectors as upstream APIs change.",
    keyTakeaways: ["Logs can grow quickly.", "Security reviews are real costs.", "Connector maintenance should be budgeted."],
    sections: [
      {
        heading: "Cost categories to include",
        body: ["A server that looks cheap in compute can become expensive if it produces noisy logs or calls external APIs frequently. Budget for operational costs from day one."],
        table: table(["Cost", "Why it appears"], [["Egress", "Large tool outputs and file resources"], ["Log retention", "Audit requirements and debugging"], ["Secrets", "Key rotation and encrypted storage"], ["VAPT", "Enterprise procurement and regulated customers"]]),
      },
    ],
    faqs: [
      { question: "Are tool outputs billable?", answer: "They can increase egress, storage, or downstream API usage depending on infrastructure." },
      { question: "Do logs need retention?", answer: "Production and regulated workflows often need retention policies for audit and incident response." },
      { question: "How do I control costs?", answer: "Limit output sizes, cache reads, sample logs, and set per-server budgets." },
    ],
    citations: [officialCitations.awsMumbai],
    related: ["/docs/pricing/india-pricing-comparison", "/docs/monitoring", "/docs/compliance/security-best-practices"],
  }),
  page({
    slug: ["pricing", "enterprise-pricing"],
    title: "Enterprise MCP Pricing",
    description: "Understand enterprise MCP pricing drivers for VAPT, DPDP controls, uptime, data isolation, and support.",
    category: "pricing",
    cluster: "enterprise-pricing",
    tags: ["enterprise", "vapt", "support"],
    targetKeywords: ["enterprise mcp pricing", "mcp vapt india"],
    schemaType: "TechArticle",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Enterprise MCP pricing is driven by isolation, VAPT scope, audit logging, data residency expectations, uptime support, connector complexity, and procurement requirements.",
    keyTakeaways: ["Security scope drives cost.", "Procurement needs evidence.", "Support SLAs affect pricing."],
    sections: [
      {
        heading: "Enterprise scope checklist",
        body: ["Before asking for a quote, define servers, users, regions, data categories, retention, uptime targets, and incident response expectations."],
        code: `{
  "scope": "enterprise-mcp",
  "regions": ["mumbai", "bengaluru"],
  "controls": ["sso", "audit-logs", "pii-redaction", "rate-limits"],
  "review": ["vapt", "dpdp", "rbi-if-financial"]
}`,
      },
    ],
    faqs: [
      { question: "Why is enterprise MCP custom priced?", answer: "The security, compliance, and support scope varies widely by organization." },
      { question: "Do banks need extra controls?", answer: "Financial workflows usually need stronger audit, access, retention, and vendor review controls." },
      { question: "What should procurement request?", answer: "Ask for architecture, data flow, security controls, incident process, and logging details." },
    ],
    citations: [officialCitations.dpdp, officialCitations.rbi],
    related: ["/docs/compliance/dpdp-compliance-guide", "/docs/compliance/rbi-compliance", "/docs/monitoring/observability-best-practices"],
  }),
  page({
    slug: ["performance", "latency-benchmarks-india"],
    title: "India MCP Latency Benchmarks",
    description: "Benchmark MCP latency from Bengaluru, Mumbai, and global regions with practical testing steps for AI agents.",
    category: "performance",
    cluster: "latency-benchmarks-india",
    tags: ["latency", "bengaluru", "mumbai"],
    targetKeywords: ["low latency mcp connector bengaluru", "mcp server speed mumbai", "mcp latency comparison"],
    schemaType: "HowTo",
    priority: 0.95,
    changefreq: "weekly",
    directAnswer: "Low-latency MCP in India starts with region placement, connection reuse, small tool payloads, and cached resources. Always benchmark from the client city and the data source region.",
    keyTakeaways: ["Measure from Indian user cities.", "Keep tool outputs compact.", "Cache repeated read-only resources."],
    sections: [
      {
        heading: "Benchmark methodology",
        body: [
          "Measure three timings separately: client-to-MCP handshake, tool dispatch overhead, and underlying API or database execution. This prevents blaming the MCP layer for a slow downstream system.",
          "Run tests from Bengaluru, Mumbai, Delhi NCR, and the region where your database or SaaS endpoint lives. For Indian developer teams, Bengaluru and Mumbai are usually the first two regions to compare.",
        ],
        code: `curl -w "@curl-format.txt" -o /dev/null -s \\
  -H "Authorization: Bearer $MCP_API_KEY" \\
  https://mcpserver.in/v1/health`,
        table: table(["Metric", "What it tells you"], [["Handshake", "Network and auth overhead"], ["Tool dispatch", "Protocol and queue overhead"], ["Downstream call", "API, database, or SaaS latency"], ["Payload size", "Serialization and egress impact"]]),
      },
    ],
    faqs: [
      { question: "Which Indian city has the lowest MCP latency?", answer: "It depends on user and data placement. Bengaluru may suit developer-heavy teams, while Mumbai often suits cloud-hosted production workloads." },
      { question: "How do I test MCP latency?", answer: "Measure health checks, simple read tools, and representative production tools from the cities your users occupy." },
      { question: "Does MCP add much overhead?", answer: "The protocol overhead is usually small compared with slow downstream APIs, large payloads, or cold starts." },
    ],
    citations: [officialCitations.awsMumbai, officialCitations.sse],
    related: ["/docs/performance/optimization-guide", "/docs/deployment/aws-ec2-deployment", "/docs/monitoring/grafana-dashboard"],
  }),
  page({
    slug: ["performance", "bengaluru-vs-mumbai"],
    title: "Bengaluru vs Mumbai MCP",
    description: "Compare Bengaluru and Mumbai region choices for MCP server placement, data locality, teams, and cloud access.",
    category: "performance",
    cluster: "bengaluru-vs-mumbai",
    tags: ["bengaluru", "mumbai", "latency"],
    targetKeywords: ["bengaluru mcp latency", "mumbai mcp server"],
    schemaType: "ComparisonPage",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "Choose Bengaluru when developer proximity and startup workflows dominate. Choose Mumbai when cloud regions, enterprise systems, or finance workloads are closer there.",
    keyTakeaways: ["Place compute near data.", "Measure before standardizing.", "Use separate regions for DR if needed."],
    sections: [
      {
        heading: "Region comparison",
        body: ["The best region is not universal. Test from client devices and from the downstream systems your tools call."],
        table: table(["Factor", "Bengaluru", "Mumbai"], [["Developer teams", "Often strong", "Strong"], ["Cloud region access", "Provider dependent", "Strong for many clouds"], ["Finance systems", "Depends on vendor", "Often strong"], ["DR pairing", "Useful with Mumbai", "Useful with Bengaluru"]]),
      },
    ],
    faqs: [
      { question: "Should I host in both cities?", answer: "For critical systems, active-passive or active-active regional design can improve resilience." },
      { question: "Does city matter for local stdio?", answer: "No. Local stdio runs on the client machine, so network city placement is not involved." },
      { question: "What should decide the region?", answer: "User location, data source region, compliance needs, and operations support should decide." },
    ],
    citations: [officialCitations.awsMumbai],
    related: ["/docs/performance/latency-benchmarks-india", "/docs/deployment/google-cloud-run", "/docs/monitoring"],
  }),
  page({
    slug: ["performance", "global-vs-india"],
    title: "Global vs India MCP Hosting",
    description: "Decide whether to host MCP servers in Indian regions or global edge networks for latency and compliance.",
    category: "performance",
    cluster: "global-vs-india",
    tags: ["global", "india", "edge"],
    targetKeywords: ["global vs india mcp", "mcp server india latency"],
    schemaType: "ComparisonPage",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Use India hosting when users, data, or regulatory expectations are India-centered. Use global edge when users are distributed and tools do not depend on India-local data.",
    keyTakeaways: ["Data locality matters.", "Global edge helps distributed users.", "Regulated workflows need review."],
    sections: [
      {
        heading: "Placement decision",
        body: ["A global edge endpoint can improve first-byte latency, but tool execution still depends on where the target API or database lives."],
        table: table(["Scenario", "Suggested placement"], [["Indian SaaS and users", "India region"], ["Global developer tool", "Global edge"], ["Banking data", "India region plus compliance review"], ["Public docs search", "Global edge acceptable"]]),
      },
    ],
    faqs: [
      { question: "Is global edge always faster?", answer: "No. If the downstream system is in India, a faraway edge can still add backhaul latency." },
      { question: "Does DPDP require India-only hosting?", answer: "Review current law, contracts, and data categories with counsel. Technical design should support localization when required." },
      { question: "Can I mix regions?", answer: "Yes. Route each server by data source and user need." },
    ],
    citations: [officialCitations.dpdp, officialCitations.awsMumbai],
    related: ["/docs/compliance/dpdp-compliance-guide", "/docs/performance/latency-benchmarks-india", "/docs/deployment/kubernetes-deployment"],
  }),
  page({
    slug: ["performance", "optimization-guide"],
    title: "MCP Performance Optimization",
    description: "Optimize MCP performance with smaller schemas, cached resources, streaming, batching, and better observability.",
    category: "performance",
    cluster: "optimization-guide",
    tags: ["optimization", "performance", "cache"],
    targetKeywords: ["mcp performance optimization", "mcp latency optimization"],
    schemaType: "HowTo",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "Optimize MCP by shrinking tool schemas, limiting output size, caching read-only resources, reusing connections, and tracing downstream API latency separately.",
    keyTakeaways: ["Keep payloads small.", "Cache stable resources.", "Trace every tool call."],
    sections: [
      {
        heading: "Practical optimizations",
        body: ["Most slow MCP experiences are caused by oversized outputs, cold starts, or slow downstream systems rather than JSON-RPC overhead."],
        code: `{
  "maxToolOutputBytes": 32768,
  "cacheResources": ["schema://*", "ifsc://*"],
  "timeoutMs": 8000,
  "traceDownstream": true
}`,
      },
    ],
    faqs: [
      { question: "Should I batch tool calls?", answer: "Batch only when the workflow needs related reads. Avoid batching unrelated privileged actions." },
      { question: "How large should outputs be?", answer: "Keep outputs as small as the model needs and provide pagination for large data." },
      { question: "Does caching risk stale data?", answer: "Use TTLs and versioned resource URIs for data that changes." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/monitoring/observability-best-practices", "/docs/performance/latency-benchmarks-india", "/docs/protocol/resources"],
  }),
  page({
    slug: ["compliance", "dpdp-compliance-guide"],
    title: "DPDP-Compliant MCP Server",
    description: "Build DPDP-aware MCP servers for Indian teams with PII handling, consent, logging, redaction, and breach workflows.",
    category: "compliance",
    cluster: "dpdp-compliance-guide",
    tags: ["dpdp", "privacy", "india"],
    targetKeywords: ["dpdp compliant mcp server", "data protection mcp server india", "dpdp act mcp compliance"],
    schemaType: "HowTo",
    priority: 0.95,
    changefreq: "weekly",
    directAnswer: "A DPDP-aware MCP server limits personal data access, records lawful purpose, redacts sensitive fields, logs tool calls, and requires explicit authorization for high-risk actions.",
    keyTakeaways: ["Map personal data flows.", "Redact before model exposure.", "Keep auditable consent and purpose metadata."],
    sections: [
      {
        heading: "Technical controls",
        body: [
          "MCP servers can expose personal data quickly because agents request context dynamically. Treat every tool and resource as a data-flow boundary, especially for customer support, lending, healthcare, education, and HR systems in India.",
          "This guide is engineering guidance, not legal advice. Use official DPDP materials and qualified counsel for final compliance decisions.",
        ],
        code: `{
  "privacy": {
    "purpose": "support-ticket-resolution",
    "piiRedaction": true,
    "allowedFields": ["ticket_id", "city", "issue_type"],
    "blockedFields": ["aadhaar", "pan", "card_number"]
  }
}`,
        table: table(["Control", "MCP implementation"], [["PII detection", "Scan tool inputs and outputs"], ["Consent/purpose", "Attach purpose metadata to requests"], ["Audit logging", "Store who called which tool and why"], ["Data minimization", "Expose only fields needed for the task"]]),
      },
    ],
    faqs: [
      { question: "Is an MCP server automatically DPDP compliant?", answer: "No. Compliance depends on the data, purpose, consent model, security controls, contracts, and operational process." },
      { question: "How do I make MCP DPDP-aware?", answer: "Map data flows, redact sensitive fields, log tool calls, enforce purpose limits, and review transfers and retention." },
      { question: "Should models see Aadhaar or PAN values?", answer: "Avoid exposing sensitive identifiers unless there is a clear lawful purpose and strong controls. Prefer masking or tokenization." },
      { question: "What penalties apply under DPDP?", answer: "The DPDP Act includes significant monetary penalties for certain failures. Confirm current rules and thresholds with official sources and legal counsel." },
    ],
    citations: [officialCitations.dpdp],
    related: ["/docs/compliance/dpdp-checklist", "/docs/pricing/enterprise-pricing", "/docs/industry/healthcare", "/glossary/dpdp"],
  }),
  page({
    slug: ["compliance", "dpdp-checklist"],
    title: "DPDP MCP Checklist",
    description: "Use this DPDP checklist for MCP server privacy design, PII minimization, consent, retention, and audit logs.",
    category: "compliance",
    cluster: "dpdp-checklist",
    tags: ["dpdp", "checklist", "privacy"],
    targetKeywords: ["dpdp mcp checklist", "mcp privacy checklist india"],
    schemaType: "HowTo",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "A DPDP MCP checklist should cover data mapping, purpose limitation, consent or notice, PII redaction, access control, audit logs, retention, breach process, and vendor review.",
    keyTakeaways: ["Start with data inventory.", "Use deny-by-default tools.", "Review logs for sensitive leakage."],
    sections: [
      {
        heading: "Checklist overview",
        body: ["Run this checklist before connecting an MCP server to customer, employee, healthcare, education, or financial data."],
        table: table(["Item", "Ready signal"], [["Data inventory", "Every tool lists fields accessed"], ["Purpose", "Each tool has a business purpose"], ["Redaction", "Sensitive identifiers masked"], ["Retention", "Logs have expiry policy"], ["Incident response", "Breach workflow documented"]]),
      },
      {
        heading: "Data localization (Section 18)",
        body: [
          "Host the MCP server and the databases it queries within Indian geographic boundaries, for example AWS Mumbai (ap-south-1), Azure Pune, or GCP Delhi.",
          "Make sure no fallback routing, third-party logging service, or CDN edge cache stores personal data outside India, and get written confirmation of Indian data residency from any managed MCP hosting provider you use.",
        ],
      },
      {
        heading: "Consent and purpose limitation (Sections 6 and 7)",
        body: [
          "The application invoking the MCP server should capture explicit, granular consent before an AI agent accesses personal data, and every tool should be scoped strictly to that consented purpose.",
          "For example, an agent consented to read transaction history should not also have access to a tool that updates a user's profile. Design tools to return only the minimum data needed and avoid unscoped select-all patterns.",
        ],
      },
      {
        heading: "Immutable audit logging (Sections 8 and 9)",
        body: [
          "Every tool invocation should generate an audit log entry that cannot be altered or deleted by the agent or a standard user. At minimum, capture a timestamp, agent identifier, hashed user identifier, tool name, action type, compliance status, and the data elements accessed.",
        ],
        code: `interface MCPAuditLog {
  timestamp: string;          // ISO 8601
  agent_id: string;
  user_id_hashed: string;     // hashed, never raw PII
  tool_name: string;
  action: "read" | "write";
  compliance_status: "approved" | "blocked";
  data_elements_accessed: string[];
}`,
      },
      {
        heading: "Security, access control, and data principal rights (Sections 11 to 13)",
        body: [
          "Require authentication such as mTLS, JWT, or API keys for any non-stdio connection, default database roles to read-only unless a specific audited write is required, and validate all tool arguments against strict schemas to block prompt injection or SQL injection.",
          "You must also be able to answer a data principal's right-to-access request by querying MCP audit logs, and be able to purge any cached data or temporary files the server generated upon a valid erasure request.",
        ],
        code: `server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const userId = request.params.metadata?.userId;

  if (name === "get_user_financial_data") {
    const hasConsent = await checkConsentRegistry(userId, "financial_access");
    if (!hasConsent) {
      return { content: [{ type: "text", text: "Error: consent not found." }], isError: true };
    }

    const data = await db.query(
      "SELECT account_type, last_login FROM users WHERE id = $1",
      [userId]
    );

    await auditLogger.log({ userIdHashed: hash(userId), tool_name: name, compliance_status: "approved" });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
});`,
      },
    ],
    faqs: [
      { question: "Who should own the checklist?", answer: "Engineering, security, legal, and product should jointly own it." },
      { question: "Do logs contain personal data?", answer: "They can. Redact tool inputs and outputs before log storage where possible." },
      { question: "How often should review happen?", answer: "Review before launch and whenever tools, data fields, or vendors change." },
      { question: "Does the MCP protocol itself handle DPDP compliance?", answer: "No. MCP is a transport and capability negotiation protocol. Compliance is the server implementer's responsibility, enforced through authentication, logging, and data-handling logic." },
      { question: "Can I use a US-based LLM API if my MCP server is hosted in India?", answer: "Yes, but no personal data should be sent in the prompt. Aggregate, anonymize, or summarize the data locally before sending context to a non-Indian LLM." },
    ],
    citations: [officialCitations.dpdp],
    related: ["/docs/compliance/dpdp-compliance-guide", "/docs/monitoring/observability-best-practices", "/glossary/dpdp"],
  }),
  page({
    slug: ["compliance", "rbi-compliance"],
    title: "RBI-Aware MCP for Fintech",
    description: "Plan MCP controls for Indian fintech and banking workflows with RBI-aware audit, access, and vendor review.",
    category: "compliance",
    cluster: "rbi-compliance",
    tags: ["rbi", "fintech", "banking"],
    targetKeywords: ["rbi mcp compliance", "mcp server for indian banks"],
    schemaType: "TechArticle",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Fintech MCP workflows should use least privilege, strong audit logs, vendor review, data minimization, incident response, and stricter approval for payment or lending actions.",
    keyTakeaways: ["Separate read and write tools.", "Log privileged access.", "Review third-party processors."],
    sections: [
      {
        heading: "Fintech control model",
        body: ["Banking and fintech tools often touch regulated data and financial actions. Build separate servers for read analytics, support, reconciliation, and write operations."],
        code: `{
  "toolPolicy": {
    "payments.refund": "human_approval_required",
    "settlements.read": "read_only",
    "customer.pan": "blocked"
  }
}`,
      },
    ],
    faqs: [
      { question: "Can MCP trigger payments?", answer: "Technically yes, but write actions should require strong authorization, approvals, and audit logs." },
      { question: "Should read and write tools be separate?", answer: "Yes. It simplifies access review and reduces blast radius." },
      { question: "Do RBI rules apply to all MCP servers?", answer: "Applicability depends on the business, data, and regulated activity. Use qualified compliance review." },
    ],
    citations: [officialCitations.rbi, officialCitations.dpdp],
    related: ["/docs/industry/fintech", "/docs/compliance/security-best-practices", "/docs/pricing/enterprise-pricing"],
  }),
  page({
    slug: ["compliance", "security-best-practices"],
    title: "MCP Security Best Practices",
    description: "Secure MCP servers with auth, least privilege, tool approval, sandboxing, rate limits, and safe logging.",
    category: "compliance",
    cluster: "security-best-practices",
    tags: ["security", "auth", "sandbox"],
    targetKeywords: ["mcp server security", "mcp server authentication"],
    schemaType: "HowTo",
    priority: 0.9,
    changefreq: "weekly",
    directAnswer: "Secure MCP by denying risky tools by default, validating schemas, isolating secrets, rate-limiting calls, logging safely, and requiring human approval for destructive actions. The protocol itself does not enforce authentication or authorization; that responsibility sits with whoever implements the server.",
    keyTakeaways: ["Least privilege first.", "Never trust tool arguments.", "Mask secrets in logs.", "Pick an auth method that matches deployment risk: API keys for internal tools, OAuth for multi-tenant apps, mTLS for zero-trust networks."],
    sections: [
      {
        heading: "Baseline policy",
        body: ["Security starts with a clear boundary. Every server should know which resources it may read, which actions it may perform, and which users or clients may invoke it."],
        code: `{
  "auth": "required",
  "rateLimit": "60/minute",
  "sandbox": true,
  "denyTools": ["shell.exec", "payments.refund"],
  "requireApproval": ["write", "delete", "send_money"]
}`,
      },
      {
        heading: "Choosing an authentication method",
        body: [
          "API keys are the simplest option and fit internal tools or single-tenant deployments: store the key in an environment variable, rotate it periodically, and reject any request whose header does not match.",
          "OAuth 2.0 suits multi-tenant SaaS and user-facing integrations, since it verifies a bearer token against an identity provider on every request. mTLS gives the strongest guarantee for zero-trust or regulated environments (finance, healthcare, government) because both client and server present certificates, removing passwords and tokens from the equation entirely.",
        ],
        table: table(
          ["Method", "Best fit", "Key requirement"],
          [
            ["API key", "Internal tools, dev/staging", "Rotate on a schedule, never hardcode"],
            ["OAuth 2.0", "Multi-tenant SaaS, user-facing apps", "Verify bearer token per request"],
            ["mTLS", "Zero-trust, regulated industries", "Client and server certificates"],
          ]
        ),
      },
      {
        heading: "Authorization with RBAC",
        body: [
          "Authentication answers who is connecting; authorization answers what they may do. Attach a role to each verified caller and check it before executing a tool, rather than trusting that authentication alone is sufficient.",
        ],
        code: `const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ["tools/call", "resources/read", "resources/write"],
  developer: ["tools/call", "resources/read"],
  readonly: ["resources/read"],
};

function authorize(role: string, method: string) {
  if (!ROLE_PERMISSIONS[role]?.includes(method)) {
    throw new Error(\`Unauthorized: \${role} cannot execute \${method}\`);
  }
}`,
      },
    ],
    faqs: [
      { question: "Is API key auth enough?", answer: "It is a start, but production should also use scopes, rotation, logging, and approval policies." },
      { question: "Can MCP leak secrets?", answer: "Yes if tools return secrets or logs store raw headers. Redact aggressively." },
      { question: "Should tools run in sandboxes?", answer: "Use sandboxing for file, shell, browser, or network-capable tools." },
      { question: "Does the MCP protocol enforce authentication?", answer: "No. MCP does not mandate a specific auth mechanism. Any server exposed over HTTP/SSE must add authentication and transport encryption itself." },
      { question: "How do I rotate API keys without downtime?", answer: "Accept both the old and new key for a transition window, move clients to the new key, then revoke the old one once nothing is using it." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/compliance/dpdp-compliance-guide", "/docs/getting-started/claude-cursor-config", "/docs/protocol/transports", "/glossary/oauth"],
  }),
  page({
    slug: ["comparisons", "mcp-vs-rest-2026"],
    title: "MCP vs REST API 2026",
    description: "Compare MCP and REST APIs for AI agents, CRUD apps, discovery, security, performance, and India deployments.",
    category: "comparisons",
    cluster: "mcp-vs-rest-2026",
    tags: ["comparison", "rest", "api"],
    targetKeywords: ["mcp vs rest api 2026", "rest api alternative mcp", "mcp vs api"],
    schemaType: "ComparisonPage",
    priority: 0.95,
    changefreq: "weekly",
    directAnswer: "MCP and REST are complementary. REST is excellent for deterministic application endpoints; MCP is better when AI clients need dynamic discovery, tools, resources, and prompt context.",
    keyTakeaways: ["REST remains useful.", "MCP sits above APIs for agents.", "Use MCP when discovery and model context matter."],
    sections: [
      {
        heading: "Architecture comparison",
        body: ["REST exposes resources through fixed URLs. MCP exposes tool and context capabilities through a protocol that AI clients can discover and call safely."],
        table: table(["Need", "REST", "MCP"], [["CRUD application", "Strong", "Optional wrapper"], ["AI tool discovery", "Custom code needed", "Native"], ["Prompt templates", "Not standard", "Native"], ["Human approval", "Application-specific", "Client workflow friendly"]]),
      },
      {
        heading: "Example wrapper",
        body: ["Many Indian teams keep REST APIs and expose only selected actions through MCP for agents."],
        code: `async function getSettlement({ id }) {
  const response = await fetch(\`https://api.example.in/settlements/\${id}\`, {
    headers: { Authorization: \`Bearer \${process.env.API_TOKEN}\` }
  });
  return response.json();
}`,
      },
    ],
    faqs: [
      { question: "Is MCP replacing REST?", answer: "No. MCP often wraps REST endpoints to make them safe and discoverable for AI clients." },
      { question: "Which is faster?", answer: "REST can be faster for simple fixed calls; MCP can reduce integration complexity and context assembly for agents." },
      { question: "Can I use both?", answer: "Yes. This is the recommended architecture for many teams." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/comparisons/when-to-use-mcp", "/docs/protocol/tools", "/docs/performance/optimization-guide"],
  }),
  page({
    slug: ["comparisons", "mcp-vs-graphql"],
    title: "MCP vs GraphQL",
    description: "Compare MCP and GraphQL for agent workflows, typed data graphs, tool calls, resources, and prompt context.",
    category: "comparisons",
    cluster: "mcp-vs-graphql",
    tags: ["graphql", "comparison", "api"],
    targetKeywords: ["mcp vs graphql", "graphql alternative mcp"],
    schemaType: "ComparisonPage",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "GraphQL is a strong typed query layer for application data. MCP is an agent context protocol that can expose GraphQL-backed tools and resources to AI clients.",
    keyTakeaways: ["GraphQL queries data.", "MCP orchestrates agent capabilities.", "They work well together."],
    sections: [
      {
        heading: "Decision table",
        body: ["Use GraphQL when frontend or service clients need flexible data querying. Use MCP when the consumer is an AI client needing tools, resources, and prompts."],
        table: table(["Capability", "GraphQL", "MCP"], [["Typed data selection", "Strong", "Via tools/resources"], ["AI prompt templates", "No", "Yes"], ["Tool approval", "Custom", "Client-friendly"], ["Schema discovery", "Strong for data", "Strong for agent capabilities"]]),
      },
    ],
    faqs: [
      { question: "Can MCP call GraphQL?", answer: "Yes. A tool can execute approved GraphQL operations behind the server." },
      { question: "Should models write GraphQL directly?", answer: "Usually no. Wrap approved operations in validated tools." },
      { question: "Which is better for dashboards?", answer: "GraphQL is often better for app dashboards; MCP is better for agent actions." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/comparisons/mcp-vs-rest-2026", "/docs/protocol/resources", "/docs/compliance/security-best-practices"],
  }),
  page({
    slug: ["comparisons", "mcp-vs-api-gateway"],
    title: "MCP vs API Gateway",
    description: "Compare MCP servers and API gateways for routing, governance, agent discovery, auth, and observability.",
    category: "comparisons",
    cluster: "mcp-vs-api-gateway",
    tags: ["gateway", "comparison", "architecture"],
    targetKeywords: ["mcp vs api gateway", "mcp gateway"],
    schemaType: "ComparisonPage",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "An API gateway manages HTTP APIs. An MCP server or gateway manages agent-facing tools, resources, prompts, permissions, and context assembly.",
    keyTakeaways: ["API gateways route APIs.", "MCP gateways route agent capabilities.", "Enterprises may need both."],
    sections: [
      {
        heading: "Where each fits",
        body: ["For production Indian enterprises, API gateways can remain at the service edge while MCP gateways sit closer to the AI client governance layer."],
        table: table(["Layer", "API Gateway", "MCP Gateway"], [["Auth", "HTTP/service auth", "Agent/tool auth"], ["Discovery", "API catalog", "Tools/resources/prompts"], ["Audience", "Apps and services", "AI clients and agents"]]),
      },
    ],
    faqs: [
      { question: "Do I still need an API gateway?", answer: "If your services already use one, keep it. MCP can call through it." },
      { question: "What does an MCP gateway add?", answer: "It adds agent-facing discovery, policy, and context routing." },
      { question: "Can gateways log tool calls?", answer: "Yes, MCP gateways should log tool calls and policy decisions." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/comparisons/when-to-use-mcp", "/docs/monitoring/observability-best-practices", "/glossary/gateway"],
  }),
  page({
    slug: ["comparisons", "when-to-use-mcp"],
    title: "When to Use MCP",
    description: "A practical decision guide for when to use MCP instead of direct APIs, scripts, plugins, or custom tools.",
    category: "comparisons",
    cluster: "when-to-use-mcp",
    tags: ["decision", "architecture", "agents"],
    targetKeywords: ["when to use mcp", "mcp use cases"],
    schemaType: "TechArticle",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Use MCP when an AI client needs to discover capabilities, retrieve context, call tools safely, and reuse prompts across systems without bespoke integration code.",
    keyTakeaways: ["Use MCP for agent workflows.", "Use direct APIs for simple deterministic app calls.", "Wrap high-risk actions carefully."],
    sections: [
      {
        heading: "Decision matrix",
        body: ["If the consumer is a human-facing app, a direct API is often enough. If the consumer is an AI agent, MCP provides a safer interface."],
        table: table(["Scenario", "Use MCP?"], [["Claude reads support tickets", "Yes"], ["Mobile app loads profile", "Usually no"], ["Cursor reviews repository", "Yes"], ["Cron job sends report", "Maybe not"]]),
      },
    ],
    faqs: [
      { question: "Is MCP only for Claude?", answer: "No. Any compatible client can use MCP-style servers." },
      { question: "Should every API become MCP?", answer: "No. Expose only agent-relevant capabilities." },
      { question: "What is a first good MCP use case?", answer: "A read-only internal knowledge or database lookup is a safe starting point." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/getting-started/what-is-mcp", "/docs/comparisons/mcp-vs-rest-2026", "/docs/protocol/tools"],
  }),
  page({
    slug: ["deployment", "railway-deployment"],
    title: "Deploy MCP on Railway",
    description: "Deploy an MCP server on Railway from GitHub with env vars, health checks, logs, and client configuration.",
    category: "deployment",
    cluster: "railway-deployment",
    tags: ["railway", "deployment", "hosting"],
    targetKeywords: ["deploy mcp server on railway india", "host mcp on railway", "railway mcp tutorial"],
    schemaType: "HowTo",
    priority: 0.95,
    changefreq: "weekly",
    directAnswer: "Deploy MCP on Railway by pushing the server to GitHub, creating a Railway project from the repo, setting environment variables, exposing an HTTP endpoint, and testing with a client config.",
    keyTakeaways: ["Containerize or use Railway buildpacks.", "Set secrets in Railway variables.", "Test a health route before client rollout."],
    sections: [
      {
        heading: "Step-by-step deployment",
        body: ["Railway is useful for small teams that want quick GitHub-based deployment, environment variables, logs, and restarts without managing servers directly."],
        code: dockerCode,
        table: table(["Step", "Action"], [["1", "Push MCP server to GitHub"], ["2", "Create Railway project from repo"], ["3", "Set MCP_API_KEY and downstream secrets"], ["4", "Expose health and MCP routes"], ["5", "Connect Claude, Cursor, or custom client"]]),
      },
      {
        heading: "Client endpoint",
        body: ["After deploy, configure the remote URL and token in the client. Rotate keys if the URL was shared during testing."],
        code: commonConfigCode,
      },
    ],
    faqs: [
      { question: "Does Railway support MCP servers?", answer: "Railway can host web services that implement MCP-compatible remote endpoints, provided your server exposes the required transport." },
      { question: "Can I deploy from India?", answer: "Yes. Indian teams can deploy from GitHub and then benchmark latency from their user cities." },
      { question: "Where do secrets go?", answer: "Store them as Railway environment variables, not in the repository." },
    ],
    citations: [officialCitations.railway],
    related: ["/docs/deployment/google-cloud-run", "/docs/pricing/india-pricing-comparison", "/docs/monitoring/mcp-pulse-guide"],
  }),
  page({
    slug: ["deployment", "aws-ec2-deployment"],
    title: "Deploy MCP on AWS EC2",
    description: "Deploy MCP servers on AWS EC2 with Docker, security groups, TLS, logs, and Mumbai-region planning.",
    category: "deployment",
    cluster: "aws-ec2-deployment",
    tags: ["aws", "ec2", "mumbai"],
    targetKeywords: ["aws ec2 mcp deployment", "mcp server aws mumbai"],
    schemaType: "HowTo",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Deploy MCP on EC2 by containerizing the server, restricting security groups, terminating TLS, storing secrets outside images, and shipping logs to a central system.",
    keyTakeaways: ["Use least-open security groups.", "Run behind TLS.", "Patch the host regularly."],
    sections: [
      {
        heading: "EC2 baseline",
        body: ["EC2 gives control over runtime and networking. That control also means you own patching, firewalling, process supervision, and log retention."],
        code: `docker build -t payments-mcp .
docker run -d --restart unless-stopped \\
  -e MCP_API_KEY=$MCP_API_KEY \\
  -p 127.0.0.1:8080:8080 payments-mcp`,
      },
    ],
    faqs: [
      { question: "Should I expose EC2 directly?", answer: "Prefer a reverse proxy or load balancer with TLS rather than exposing raw app ports." },
      { question: "Which AWS region for India?", answer: "Mumbai is commonly used for India-hosted workloads, but test against your users and data." },
      { question: "Do I need Docker?", answer: "Not mandatory, but containers make deployments and rollbacks easier." },
    ],
    citations: [officialCitations.awsMumbai],
    related: ["/docs/performance/bengaluru-vs-mumbai", "/docs/compliance/security-best-practices", "/docs/deployment/kubernetes-deployment"],
  }),
  page({
    slug: ["deployment", "google-cloud-run"],
    title: "Deploy MCP on Cloud Run",
    description: "Run MCP servers on Google Cloud Run with containers, env vars, concurrency, cold-start planning, and logs.",
    category: "deployment",
    cluster: "google-cloud-run",
    tags: ["cloud-run", "serverless", "deployment"],
    targetKeywords: ["google cloud run mcp", "deploy mcp cloud run"],
    schemaType: "HowTo",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Cloud Run works well for HTTP-based MCP endpoints when you package the server as a container, configure env vars, set concurrency, and account for cold starts.",
    keyTakeaways: ["Good for bursty traffic.", "Watch cold starts.", "Set timeouts and output limits."],
    sections: [
      {
        heading: "Cloud Run deployment",
        body: ["Serverless hosting is attractive for prototypes and variable demand. For latency-sensitive agents, keep instances warm or use minimum instances where budget allows."],
        code: `gcloud run deploy payments-mcp \\
  --image gcr.io/PROJECT/payments-mcp \\
  --region asia-south1 \\
  --set-env-vars MCP_API_KEY=$MCP_API_KEY`,
      },
    ],
    faqs: [
      { question: "Is Cloud Run good for MCP?", answer: "It is good for stateless HTTP-based servers, especially when usage is bursty." },
      { question: "Are cold starts a problem?", answer: "They can be for interactive agents. Use minimum instances for critical workflows." },
      { question: "Can Cloud Run store secrets?", answer: "Use environment variables or cloud secret integrations rather than baking secrets into images." },
    ],
    citations: [officialCitations.cloudRun],
    related: ["/docs/performance/optimization-guide", "/docs/pricing/free-vs-paid", "/docs/deployment/railway-deployment"],
  }),
  page({
    slug: ["deployment", "vercel-deployment"],
    title: "Deploy MCP on Vercel",
    description: "Understand when Vercel fits MCP endpoints, serverless constraints, env vars, route handlers, and edge tradeoffs.",
    category: "deployment",
    cluster: "vercel-deployment",
    tags: ["vercel", "serverless", "edge"],
    targetKeywords: ["vercel mcp deployment", "mcp server vercel"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Vercel can fit lightweight HTTP MCP helpers, but long-running streams, heavy tools, and private network access may require another runtime.",
    keyTakeaways: ["Great for lightweight endpoints.", "Check duration limits.", "Avoid heavy stateful workloads."],
    sections: [
      {
        heading: "Fit assessment",
        body: ["Use Vercel for thin API wrappers, docs, and lightweight tools. For long-running browser, database, or queue-heavy workloads, prefer containers or Kubernetes."],
        table: table(["Workload", "Vercel fit"], [["Docs search", "Strong"], ["Thin SaaS wrapper", "Good"], ["Long browser automation", "Weak"], ["Private VPC database", "Depends on setup"]]),
      },
    ],
    faqs: [
      { question: "Can Vercel host every MCP server?", answer: "No. Runtime limits and streaming needs determine fit." },
      { question: "Is edge faster?", answer: "Edge helps network latency, but tool execution may still call distant systems." },
      { question: "Where do env vars go?", answer: "Use Vercel project environment variables." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/deployment/google-cloud-run", "/docs/performance/global-vs-india", "/docs/pricing/hidden-costs"],
  }),
  page({
    slug: ["deployment", "kubernetes-deployment"],
    title: "Deploy MCP on Kubernetes",
    description: "Run MCP servers on Kubernetes with deployments, secrets, ingress, scaling, probes, and observability.",
    category: "deployment",
    cluster: "kubernetes-deployment",
    tags: ["kubernetes", "containers", "scaling"],
    targetKeywords: ["kubernetes mcp deployment", "scale mcp server"],
    schemaType: "HowTo",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Kubernetes fits MCP platforms that need multiple services, strict isolation, custom networking, autoscaling, secret management, and mature observability.",
    keyTakeaways: ["Use probes.", "Separate namespaces by environment.", "Centralize logs and policies."],
    sections: [
      {
        heading: "Minimal deployment",
        body: ["Kubernetes is powerful but operationally heavier. Use it when the organization already runs clusters or needs strong multi-service orchestration."],
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments-mcp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: payments-mcp
  template:
    metadata:
      labels:
        app: payments-mcp
    spec:
      containers:
        - name: server
          image: registry.example.in/payments-mcp:1.0.0
          ports:
            - containerPort: 8080`,
      },
    ],
    faqs: [
      { question: "When is Kubernetes worth it?", answer: "When you need multi-service operations, scaling, policy, and existing platform expertise." },
      { question: "Can MCP scale horizontally?", answer: "Stateless HTTP servers can scale horizontally if sessions and streams are handled correctly." },
      { question: "Should each server get a namespace?", answer: "Sensitive environments often benefit from namespace separation and scoped secrets." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/deployment/aws-ec2-deployment", "/docs/monitoring/grafana-dashboard", "/docs/compliance/security-best-practices"],
  }),
  page({
    slug: ["industry", "startups"],
    title: "MCP for Indian Startups",
    description: "Use MCP in Indian startups for rapid automation, support, payments, analytics, product ops, and founder workflows.",
    category: "industry",
    cluster: "startups",
    tags: ["startups", "india", "automation"],
    targetKeywords: ["mcp server for indian startups", "razorpay mcp", "startitup mcp"],
    schemaType: "TechArticle",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Indian startups should begin with low-risk read-only MCP servers for support, analytics, repositories, and payment reconciliation before adding write tools.",
    keyTakeaways: ["Start read-only.", "Connect founder workflows.", "Add approvals before money movement."],
    sections: [
      {
        heading: "Startup playbook",
        body: ["The first useful MCP server for many startups is not flashy: it reads tickets, analytics, docs, or payment settlement status and gives founders faster answers."],
        table: table(["Workflow", "MCP fit"], [["Support triage", "Strong"], ["Payment reconciliation", "Strong with controls"], ["Investor reporting", "Good"], ["Production writes", "Approval required"]]),
      },
    ],
    faqs: [
      { question: "What should a startup automate first?", answer: "Read-only support, analytics, docs, and repository workflows are good first choices." },
      { question: "Can MCP connect to Razorpay?", answer: "A scoped server can wrap approved Razorpay API operations if credentials and permissions are handled safely." },
      { question: "Is MCP expensive for startups?", answer: "It can start locally and move to paid hosting only when shared access is needed." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/pricing/india-pricing-comparison", "/docs/industry/fintech", "/docs/deployment/railway-deployment"],
  }),
  page({
    slug: ["industry", "fintech"],
    title: "MCP for Indian Banks",
    description: "Design MCP servers for Indian banks and fintech with UPI, reconciliation, lending APIs, and compliance controls.",
    category: "industry",
    cluster: "fintech",
    tags: ["fintech", "upi", "banks"],
    targetKeywords: ["mcp server for indian banks", "upi mcp", "zerodha kite mcp"],
    schemaType: "TechArticle",
    priority: 0.9,
    changefreq: "weekly",
    directAnswer: "Banking MCP servers should separate read-only analytics from financial actions, minimize sensitive identifiers, and require audit-friendly approval for write operations.",
    keyTakeaways: ["Separate read and write.", "Mask account identifiers.", "Log every privileged tool call."],
    sections: [
      {
        heading: "Fintech workflow map",
        body: ["Good fintech MCP use cases include reconciliation, fraud triage, support lookup, lending document checks, and portfolio analytics. Direct payment or trading actions need stronger controls."],
        table: table(["Use case", "Risk level"], [["UPI reconciliation", "Medium"], ["Settlement lookup", "Low to medium"], ["Refund initiation", "High"], ["Trading action", "High"]]),
      },
    ],
    faqs: [
      { question: "Can MCP work with UPI systems?", answer: "It can wrap approved APIs or internal services, subject to security and compliance review." },
      { question: "Should agents initiate refunds?", answer: "Only with explicit human approval and audit logs." },
      { question: "What about Zerodha Kite?", answer: "A server can expose carefully scoped portfolio or order workflows where API permissions allow." },
    ],
    citations: [officialCitations.rbi],
    related: ["/docs/compliance/rbi-compliance", "/docs/compliance/dpdp-compliance-guide", "/docs/pricing/enterprise-pricing"],
  }),
  page({
    slug: ["industry", "ecommerce"],
    title: "MCP for Indian Ecommerce",
    description: "Use MCP for Indian ecommerce operations including catalog, inventory, support, logistics, pricing, and marketplaces.",
    category: "industry",
    cluster: "ecommerce",
    tags: ["ecommerce", "marketplace", "india"],
    targetKeywords: ["mcp server for indian ecommerce", "amazon mcp india", "flipkart mcp"],
    schemaType: "TechArticle",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Ecommerce MCP servers can unify catalog, inventory, support, logistics, marketplace, and pricing data for agent-assisted operations.",
    keyTakeaways: ["Unify fragmented ops tools.", "Avoid unsafe bulk updates.", "Add approval for price and inventory changes."],
    sections: [
      {
        heading: "Operations map",
        body: ["Indian ecommerce teams often juggle marketplaces, logistics partners, payment systems, warehouse tools, and support desks. MCP can expose a consistent ops layer."],
        table: table(["Workflow", "Control"], [["Catalog lookup", "Read-only"], ["Inventory adjustment", "Approval"], ["Price comparison", "Read-only"], ["Refund or cancellation", "Approval"]]),
      },
    ],
    faqs: [
      { question: "Can MCP connect to marketplaces?", answer: "Yes, where marketplace APIs and credentials permit a scoped integration." },
      { question: "Should agents change prices?", answer: "Only with guardrails, limits, and human approval." },
      { question: "What is a safe first use case?", answer: "Catalog and support lookup are safer than write operations." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/compliance/security-best-practices", "/docs/monitoring", "/docs/performance/optimization-guide"],
  }),
  page({
    slug: ["industry", "government"],
    title: "MCP for Indian Government",
    description: "Plan MCP servers for Indian government datasets, citizen services, auditability, localization, and public data access.",
    category: "industry",
    cluster: "government",
    tags: ["government", "public-data", "india"],
    targetKeywords: ["mcp server for indian government", "nso mcp", "esankhyiki mcp"],
    schemaType: "TechArticle",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "Government MCP servers should prioritize public data access, auditability, accessibility, localization, and strict separation between public datasets and citizen personal data.",
    keyTakeaways: ["Separate public and personal data.", "Log access clearly.", "Support multilingual citizen workflows where needed."],
    sections: [
      {
        heading: "Public data pattern",
        body: ["For public statistics or scheme information, MCP resources can expose structured datasets while tools handle search, filtering, and citation formatting."],
        code: `{
  "resource": "public-data://nso/{dataset}",
  "access": "read_only",
  "citationRequired": true,
  "pii": false
}`,
      },
    ],
    faqs: [
      { question: "Can MCP expose public datasets?", answer: "Yes. Read-only resources are a good fit for public datasets." },
      { question: "What about citizen data?", answer: "Treat citizen data as sensitive and apply strong privacy and authorization controls." },
      { question: "Should outputs cite sources?", answer: "Yes. Government and public data tools should preserve source attribution." },
    ],
    citations: [officialCitations.dpdp],
    related: ["/docs/compliance/dpdp-compliance-guide", "/docs/protocol/resources", "/docs/monitoring/observability-best-practices"],
  }),
  page({
    slug: ["industry", "healthcare"],
    title: "MCP for Indian Healthcare",
    description: "Design healthcare MCP servers with consent, PII minimization, audit trails, patient data protection, and safe workflows.",
    category: "industry",
    cluster: "healthcare",
    tags: ["healthcare", "privacy", "india"],
    targetKeywords: ["mcp server for indian healthcare", "eka care mcp"],
    schemaType: "TechArticle",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Healthcare MCP servers need strict consent, minimum necessary data, redaction, audit logs, and human review before any clinical or patient-impacting action.",
    keyTakeaways: ["Use minimum necessary data.", "Audit every patient lookup.", "Do not let agents make clinical decisions alone."],
    sections: [
      {
        heading: "Healthcare controls",
        body: ["Use MCP for appointment support, document summarization, claims support, or provider workflow assistance, but keep patient identifiers masked where possible."],
        table: table(["Workflow", "Risk"], [["Appointment lookup", "Medium"], ["Clinical recommendation", "High"], ["Claims support", "Medium"], ["Patient record summary", "High"]]),
      },
    ],
    faqs: [
      { question: "Can MCP read patient records?", answer: "Only with strong authorization, consent, logging, and minimum necessary data controls." },
      { question: "Should agents make diagnoses?", answer: "No. Human clinical review is essential for clinical decisions." },
      { question: "What is a safer first use case?", answer: "Administrative support and appointment workflows are safer starting points." },
    ],
    citations: [officialCitations.dpdp],
    related: ["/docs/compliance/dpdp-compliance-guide", "/docs/compliance/security-best-practices", "/glossary/dpdp"],
  }),
  page({
    slug: ["industry", "education"],
    title: "MCP for Indian Education",
    description: "Use MCP for Indian education workflows such as student support, Skill India, UDISE-style data, and analytics.",
    category: "industry",
    cluster: "education",
    tags: ["education", "students", "india"],
    targetKeywords: ["mcp server for indian education", "udise mcp", "skill india integration"],
    schemaType: "TechArticle",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "Education MCP servers can support student queries, institutional analytics, training content, and administrative workflows while protecting student personal data.",
    keyTakeaways: ["Protect student data.", "Use read-only analytics first.", "Keep content sources cited."],
    sections: [
      {
        heading: "Education workflow map",
        body: ["Good first use cases include policy lookup, course recommendation with human oversight, timetable search, and institutional analytics."],
        table: table(["Use case", "MCP pattern"], [["Course content search", "Resource"], ["Student support ticket", "Tool"], ["Institution analytics", "Read-only tool"], ["Certificate update", "Approval required"]]),
      },
    ],
    faqs: [
      { question: "Can MCP use student data?", answer: "Only with proper authorization, minimization, and privacy controls." },
      { question: "Can it support multilingual education?", answer: "Yes. Prompt templates and resources can be localized." },
      { question: "What should be read-only?", answer: "Student records, analytics, and institutional reports should start read-only." },
    ],
    citations: [officialCitations.dpdp],
    related: ["/docs/compliance/dpdp-compliance-guide", "/docs/protocol/prompts", "/docs/monitoring"],
  }),
  page({
    slug: ["monitoring"],
    title: "MCP Monitoring Dashboard",
    description: "Build an MCP monitoring dashboard for tool-call latency, errors, auth failures, redaction, and uptime.",
    category: "monitoring",
    cluster: "monitoring-dashboard",
    tags: ["monitoring", "dashboard", "observability"],
    targetKeywords: ["mcp server monitoring dashboard", "mcp monitoring", "mcp pulse"],
    schemaType: "TechArticle",
    priority: 0.9,
    changefreq: "weekly",
    directAnswer: "An MCP monitoring dashboard should show tool-call latency, error rate, auth failures, redaction events, token-heavy outputs, uptime, and per-client usage.",
    keyTakeaways: ["Track tool latency.", "Alert on auth failures.", "Redaction metrics reveal privacy risk."],
    sections: [
      {
        heading: "Core dashboard panels",
        body: ["MCP observability should help operators answer three questions: is the server healthy, are tools safe, and where is latency coming from?"],
        table: table(["Panel", "Why it matters"], [["Tool latency p95", "User experience"], ["Error rate", "Reliability"], ["Auth failures", "Attack or config signal"], ["Redaction count", "Privacy exposure signal"], ["Output bytes", "Cost and token pressure"]]),
      },
      {
        heading: "Event payload",
        body: ["Log metadata, not raw secrets. Record request IDs so support and incident response can trace a tool call without exposing sensitive content."],
        code: observabilityCode,
      },
    ],
    faqs: [
      { question: "What should I alert on?", answer: "Alert on sustained errors, latency spikes, auth failures, redaction failures, and tool timeouts." },
      { question: "Should I log full tool outputs?", answer: "Avoid full raw outputs for sensitive tools. Store redacted summaries and request metadata." },
      { question: "Can Grafana monitor MCP?", answer: "Yes, if you export metrics in a compatible format." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/monitoring/grafana-dashboard", "/docs/monitoring/mcp-pulse-guide", "/docs/monitoring/observability-best-practices", "/docs/performance/optimization-guide"],
  }),
  page({
    slug: ["monitoring", "grafana-dashboard"],
    title: "Grafana MCP Dashboard",
    description: "Create a Grafana dashboard for MCP metrics, logs, traces, tool latency, errors, and auth events.",
    category: "monitoring",
    cluster: "grafana-dashboard",
    tags: ["grafana", "metrics", "logs"],
    targetKeywords: ["grafana mcp", "mcp grafana dashboard"],
    schemaType: "HowTo",
    priority: 0.8,
    changefreq: "weekly",
    directAnswer: "Grafana can monitor MCP servers by charting exported metrics such as requests, p95 latency, tool errors, auth failures, and redaction events.",
    keyTakeaways: ["Export consistent labels.", "Separate tool and downstream latency.", "Alert on policy failures."],
    sections: [
      {
        heading: "Metric labels",
        body: ["Use low-cardinality labels. Avoid putting user IDs, emails, request bodies, or customer identifiers into metrics labels."],
        code: `mcp_tool_latency_ms{server="payments",tool="settlements.read",region="mumbai"} 42
mcp_tool_errors_total{server="payments",tool="refund.create",reason="approval_required"} 3`,
      },
    ],
    faqs: [
      { question: "Can metrics leak data?", answer: "Yes if labels contain user or customer identifiers. Keep labels generic." },
      { question: "What latency should I chart?", answer: "Chart MCP dispatch, downstream API latency, and total request latency separately." },
      { question: "Do I need tracing?", answer: "Tracing is helpful for multi-step tools and remote downstream calls." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/monitoring", "/docs/performance/latency-benchmarks-india", "/docs/compliance/dpdp-checklist"],
  }),
  page({
    slug: ["monitoring", "mcp-pulse-guide"],
    title: "MCP Pulse Guide",
    description: "Use MCP Pulse-style health checks for endpoint status, tool availability, latency, and incident response.",
    category: "monitoring",
    cluster: "mcp-pulse-guide",
    tags: ["pulse", "health", "status"],
    targetKeywords: ["mcp pulse", "mcp health check"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "MCP Pulse-style monitoring checks health endpoints, tool availability, auth configuration, latency, and recent error signals to catch breakage early.",
    keyTakeaways: ["Health checks should exercise dependencies.", "Separate public status from private details.", "Incident notes should link to deploys."],
    sections: [
      {
        heading: "Health check response",
        body: ["A good health check reports readiness without leaking credentials, private URLs, or raw downstream error messages."],
        code: `{
  "status": "ok",
  "server": "payments-mcp",
  "region": "mumbai",
  "tools": 8,
  "checkedAt": "2026-07-19T09:00:00+05:30"
}`,
      },
    ],
    faqs: [
      { question: "Should health checks call real tools?", answer: "Use safe synthetic checks or read-only tools to verify dependencies." },
      { question: "Can status pages reveal incidents?", answer: "Public status should be clear but avoid sensitive operational details." },
      { question: "How often should checks run?", answer: "Critical production servers often need checks every minute or faster." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/monitoring", "/docs/deployment/railway-deployment", "/status"],
  }),
  page({
    slug: ["monitoring", "observability-best-practices"],
    title: "MCP Observability Practices",
    description: "Apply observability best practices to MCP servers with traces, logs, redaction, metrics, and incidents.",
    category: "monitoring",
    cluster: "observability-best-practices",
    tags: ["observability", "logs", "traces"],
    targetKeywords: ["mcp observability", "mcp server logs"],
    schemaType: "TechArticle",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "MCP observability should trace every tool call across auth, validation, protocol dispatch, downstream systems, redaction, and response delivery.",
    keyTakeaways: ["Trace full tool lifecycle.", "Redact logs.", "Use incident-friendly request IDs.", "Alert on error-rate and latency thresholds, not raw request counts."],
    sections: [
      {
        heading: "Lifecycle tracing",
        body: ["A tool call has several phases: authentication, schema validation, approval policy, execution, redaction, and response. Instrument each phase so incidents are diagnosable."],
        code: `{
  "requestId": "req_123",
  "tool": "settlements.read",
  "phase": "redaction",
  "durationMs": 4,
  "redactedFields": 2
}`,
      },
      {
        heading: "Instrumenting requests with Prometheus",
        body: [
          "Wrap the tool-call handler with a counter and a duration histogram, labeled by tool name and status, then expose them on a metrics endpoint for Prometheus to scrape.",
        ],
        code: `import { Counter, Histogram, Registry } from "prom-client";

const register = new Registry();
const requestDuration = new Histogram({
  name: "mcp_request_duration_seconds",
  help: "Duration of MCP tool calls in seconds",
  labelNames: ["tool"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [register],
});
const requestCounter = new Counter({
  name: "mcp_requests_total",
  help: "Total MCP tool calls",
  labelNames: ["tool", "status"],
  registers: [register],
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const end = requestDuration.startTimer({ tool: request.params.name });
  try {
    const result = await executeTool(request);
    requestCounter.inc({ tool: request.params.name, status: "success" });
    return result;
  } catch (error) {
    requestCounter.inc({ tool: request.params.name, status: "error" });
    throw error;
  } finally {
    end();
  }
});`,
      },
      {
        heading: "Alerting thresholds",
        body: [
          "Page immediately on sustained error-rate or latency spikes; only notify the team for softer warning-level thresholds so paging stays meaningful.",
        ],
        table: table(
          ["Severity", "Condition", "Window"],
          [
            ["Critical (page)", "Error rate above 5%", "5 minutes"],
            ["Critical (page)", "P99 latency above 10s", "5 minutes"],
            ["Warning (notify)", "Error rate above 1%", "15 minutes"],
            ["Warning (notify)", "P95 latency above 2s", "10 minutes"],
          ]
        ),
      },
    ],
    faqs: [
      { question: "Do I need request IDs?", answer: "Yes. Request IDs connect logs, traces, and support cases." },
      { question: "Can observability conflict with privacy?", answer: "It can. Redact sensitive content and keep retention policies clear." },
      { question: "What is the most useful metric?", answer: "Tool latency and error rate by tool name usually provide the fastest signal." },
      { question: "How do I monitor a stdio-only MCP server?", answer: "Stdio servers are harder to observe remotely. Expose a small metrics endpoint on a separate local HTTP port, or rely on the MCP Inspector for interactive debugging." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/monitoring/grafana-dashboard", "/docs/compliance/dpdp-checklist", "/docs/performance/optimization-guide"],
  }),
  page({
    slug: ["troubleshooting", "common-issues"],
    title: "MCP Troubleshooting: Common Issues and Fixes",
    description: "Fixes for the MCP errors developers hit most: command-not-found, connection refused, auth failures, tool-not-found, and out-of-memory crashes.",
    category: "troubleshooting",
    cluster: "common-issues",
    tags: ["troubleshooting", "debugging", "errors"],
    targetKeywords: ["mcp troubleshooting", "mcp not working", "mcp connection refused", "mcp debug"],
    schemaType: "HowTo",
    priority: 0.85,
    changefreq: "weekly",
    directAnswer: "Most MCP issues trace back to three causes: an incorrect or relative command path in the client configuration, a missing environment variable, or a network or firewall restriction blocking the connection. Check those first before deeper debugging.",
    keyTakeaways: [
      "Always use absolute paths in claude_desktop_config.json and similar client configs.",
      "Stdout must carry only JSON-RPC frames; send debug output to stderr instead.",
      "The MCP Inspector is the fastest way to test a server interactively before wiring it into a client.",
    ],
    sections: [
      {
        heading: "Connection issues",
        body: [
          "A 'command not found' error almost always means the command path in the client configuration is relative or wrong. Use an absolute path to the executable, confirm the file exists and is executable, and start the server manually from a terminal to surface the real error before blaming the client.",
          "'Connection refused' means nothing is listening on the expected port. Confirm the process is actually running, check what is bound to the port, and verify firewall rules if the server is remote. A timeout usually means the server is slow to respond rather than unreachable; increase the client timeout and check server logs for a slow downstream call before assuming the network is at fault.",
        ],
        code: `# Verify the executable and permissions
which node
ls -la /absolute/path/to/server/dist/index.js
chmod +x /absolute/path/to/server/dist/index.js

# Check what is listening on a port
lsof -i :3000`,
      },
      {
        heading: "Authentication and tool errors",
        body: [
          "A 401 usually means a missing or malformed credential; print the environment variable (without logging it anywhere persistent) to confirm it is set and has no stray whitespace. A 403 means the caller authenticated fine but the role attached to them does not permit the requested method; check the RBAC mapping rather than the credential itself.",
          "'Tool not found' is almost always a name mismatch: tool names are case-sensitive and must match exactly between the list-tools handler and the call-tool handler. 'Invalid input' means the arguments the client sent do not match the tool's declared schema; use the MCP Inspector to call the tool directly and see the exact validation failure.",
        ],
        code: `npx @modelcontextprotocol/inspector node server.js`,
      },
      {
        heading: "Performance and memory issues",
        body: [
          "A server that feels slow is usually blocked on a downstream call, most often an unindexed database query. Profile the specific tool, add the missing index, and add connection pooling and a response cache before assuming the protocol itself is the bottleneck.",
          "An out-of-memory crash usually means a tool is loading an entire result set into memory instead of streaming it. Raise the Node heap limit as a stopgap, but fix the root cause by streaming large datasets row by row instead of materializing them all at once.",
        ],
        code: `# Stopgap: raise the heap limit
node --max-old-space-size=4096 server.js

# Real fix: stream instead of loading everything
const stream = db.query("SELECT * FROM large_table").stream();
for await (const row of stream) {
  // process row by row
}`,
      },
    ],
    faqs: [
      { question: "How do I reset my MCP client configuration?", answer: "Delete the client's config file (for example claude_desktop_config.json) and restart the client; it will regenerate with defaults, and you can re-add servers one at a time." },
      { question: "Why does my server work locally but not in production?", answer: "The usual causes are a missing environment variable, a different Node.js version, a firewall rule, or a relative path that only resolved correctly on your machine. Check each one systematically rather than guessing." },
      { question: "How do I see the raw request and response for a failing tool call?", answer: "Run the server through the MCP Inspector and call the tool directly; it shows the exact JSON-RPC payload and the schema validation error, which is faster than reading server logs." },
    ],
    citations: [officialCitations.mcp, officialCitations.jsonRpc],
    related: ["/docs/getting-started/quickstart", "/docs/protocol/transports", "/docs/compliance/security-best-practices", "/docs/monitoring/observability-best-practices"],
  }),
];

export function getDocsPath(page: DocsPage): string {
  return `/docs/${page.slug.join("/")}`;
}

export function findDocsPage(slug: string[]): DocsPage | undefined {
  return docsPages.find((page) => page.slug.join("/") === slug.join("/"));
}
import { servers } from "./servers";
