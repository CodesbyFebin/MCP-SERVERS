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
  diagram?: string;
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
  prometheus: "https://prometheus.io/docs/introduction/overview/",
  bigquery: "https://cloud.google.com/bigquery/docs",
  githubActions: "https://docs.github.com/en/actions",
  terraform: "https://developer.hashicorp.com/terraform/docs",
  datadog: "https://docs.datadoghq.com/",
  newrelic: "https://docs.newrelic.com/",
  splunk: "https://docs.splunk.com/",
  clickhouse: "https://clickhouse.com/docs",
  snowflake: "https://docs.snowflake.com/",
  elasticsearch: "https://www.elastic.co/docs",
  supabase: "https://supabase.com/docs",
  dynamodb: "https://docs.aws.amazon.com/dynamodb/",
  mcpReferenceServers: "https://github.com/modelcontextprotocol/servers",
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
      "/docs/protocol/webhooks",
      "/docs/protocol/json-rpc",
      "/docs/protocol/lifecycle",
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
      "/docs/pricing/cost-optimization",
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
      "/docs/compliance/rate-limiting",
      "/docs/compliance/output-sanitization",
      "/docs/compliance/secret-management",
      "/docs/compliance/audit-logging",
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
      "/docs/deployment/github-actions-cicd",
      "/docs/deployment/terraform-infrastructure",
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
      "/docs/industry/upi-integration",
      "/docs/industry/gst-integration",
      "/docs/industry/aadhaar-verification",
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
      "/docs/monitoring/prometheus-metrics",
      "/docs/monitoring/datadog-integration",
      "/docs/monitoring/newrelic-integration",
      "/docs/monitoring/splunk-search",
    ],
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Fixes for the most common MCP connection, authentication, tool-execution, and performance errors.",
    answer: "Most MCP issues trace back to three causes: an incorrect command path in the client config, a missing environment variable, or a network or firewall restriction. Check those first before deeper debugging.",
    links: ["/docs/troubleshooting/common-issues"],
  },
  {
    slug: "development",
    title: "Development Practices",
    description: "Testing strategies and error-handling patterns for building production-grade MCP servers.",
    answer: "Test MCP servers at three levels (unit, integration, and load), and handle every tool call with categorized error handling so validation, runtime, timeout, and network failures each return a clear, user-facing message instead of crashing the server.",
    links: ["/docs/development/testing-strategies", "/docs/development/error-handling", "/docs/development/publishing", "/docs/development/bigquery-integration", "/docs/development/clickhouse-integration", "/docs/development/snowflake-integration", "/docs/development/elasticsearch-integration", "/docs/development/supabase-integration", "/docs/development/dynamodb-integration"],
  },
  {
    slug: "advanced",
    title: "Advanced Patterns",
    description: "Multi-agent orchestration and real-time streaming patterns for production MCP architectures.",
    answer: "Advanced MCP deployments coordinate multiple specialized servers behind a supervisor agent and stream long-running tool progress over SSE instead of blocking on a single request-response cycle.",
    links: ["/docs/advanced/multi-agent-orchestration", "/docs/advanced/streaming"],
  },
  {
    slug: "internationalization",
    title: "Internationalization",
    description: "Serving MCP tools, errors, and content in Hindi, Tamil, Telugu, and other Indian languages.",
    answer: "Detect the user's language, translate at the edges of a tool call rather than inside business logic, and keep tool names in English while localizing descriptions and error messages.",
    links: ["/docs/internationalization/multi-language-support"],
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
      diagram: `graph LR
  A[AI Agent] -->|tools/call| B[MCP Server]
  B -->|Parameterized query| C[(PostgreSQL)]
  C -->|Result set| B
  B -->|Audit entry| D[(Audit log store)]
  B -->|JSON response| A`,
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
  "mysql-mcp-server": [
    {
      heading: "Read-only query tool with connection pooling",
      body: [
        "Use a connection pool rather than a single connection per call, block write keywords before executing, and always pass arguments as bind parameters rather than interpolating them into the SQL string.",
      ],
      code: `const pool = createPool({ host: process.env.MYSQL_HOST, connectionLimit: 10, waitForConnections: true });

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { sql, params } = QuerySchema.parse(request.params.arguments);
  if (/INSERT|UPDATE|DELETE|DROP|TRUNCATE/i.test(sql)) {
    throw new Error("Only SELECT queries are allowed");
  }
  const [rows] = await pool.execute(sql, params ?? []);
  return { content: [{ type: "text", text: JSON.stringify(rows, null, 2) }] };
});`,
    },
    {
      heading: "Caching repeated queries",
      body: [
        "Cache the result of identical, frequently-issued read queries in memory with a bounded size, so repeated agent questions do not each round-trip to the database.",
      ],
    },
  ],
  "redis-mcp-server": [
    {
      heading: "Scoped read/write tools per data type",
      body: [
        "Expose narrow tools per Redis data structure (get/set, hash, list) instead of a single generic command-passthrough tool, so each tool's input schema can constrain what the agent can actually do.",
      ],
      code: `server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "redis_get") {
    const { key } = request.params.arguments as { key: string };
    return { content: [{ type: "text", text: (await redis.get(key)) ?? "null" }] };
  }
  if (request.params.name === "redis_set") {
    const { key, value, ttl } = request.params.arguments as { key: string; value: string; ttl?: number };
    ttl ? await redis.setex(key, ttl, value) : await redis.set(key, value);
    return { content: [{ type: "text", text: "OK" }] };
  }
});`,
    },
    {
      heading: "Operational guardrails",
      body: [
        "Use SCAN instead of KEYS for pattern matching in production, since KEYS blocks the single-threaded server on large keyspaces. Set a TTL on anything the agent writes so a bug cannot silently fill memory.",
      ],
    },
  ],
  "dynamodb-mcp-server": [
    {
      heading: "Get and Query tools",
      body: [
        "Prefer Query over Scan wherever possible — Query uses an index and is efficient; Scan reads the whole table and is expensive at any real scale. Always cap results with a Limit.",
      ],
      code: `server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "dynamodb_query") {
    const { tableName, keyCondition, expressionValues } = request.params.arguments as Record<string, string>;
    const result = await docClient.send(new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyCondition,
      ExpressionAttributeValues: JSON.parse(expressionValues),
      Limit: 100,
    }));
    return { content: [{ type: "text", text: JSON.stringify(result.Items) }] };
  }
});`,
    },
    {
      heading: "Capacity mode",
      body: [
        "On-demand capacity suits unpredictable AI-agent traffic patterns; provisioned capacity with auto-scaling is cheaper once the workload is steady and well understood.",
      ],
    },
  ],
  "github-mcp-server": [
    {
      heading: "Issue and pull-request tools",
      body: [
        "Wrap specific GitHub operations (create an issue, list open pull requests) as individual tools rather than exposing the whole Octokit surface, so each tool's permissions can be scoped to what it actually needs.",
      ],
      code: `server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "github_create_issue") {
    const { owner, repo, title, body } = request.params.arguments as Record<string, string>;
    const issue = await octokit.issues.create({ owner, repo, title, body });
    return { content: [{ type: "text", text: \`Issue created: \${issue.data.html_url}\` }] };
  }
});`,
    },
    {
      heading: "Token scope and rate limits",
      body: [
        "Scope the GitHub token to the minimum permissions the exposed tools actually need (read-only tools should use a read-only token), and implement retry with backoff for the authenticated rate limit rather than failing immediately on a 403.",
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
    keyTakeaways: ["Use probes.", "Separate namespaces by environment.", "Centralize logs and policies.", "Externalize secrets rather than storing them in plain Kubernetes Secret manifests."],
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
      {
        heading: "Multi-stage Docker build",
        body: [
          "Build with a multi-stage Dockerfile so the production image ships only compiled output and production dependencies, not the TypeScript toolchain, and run the process as a non-root user.",
        ],
        code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]`,
      },
      {
        heading: "Autoscaling and externalized secrets",
        body: [
          "Scale on both CPU and memory utilization rather than CPU alone, since MCP tool handlers that buffer large tool outputs can be memory-bound before they are CPU-bound. Pull secrets from a manager such as AWS Secrets Manager or Vault instead of committing them as plain Kubernetes Secret manifests.",
        ],
        code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: mcp-server-hpa
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: mcp-server }
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
    - type: Resource
      resource: { name: memory, target: { type: Utilization, averageUtilization: 80 } }`,
      },
    ],
    faqs: [
      { question: "When is Kubernetes worth it?", answer: "When you need multi-service operations, scaling, policy, and existing platform expertise." },
      { question: "Can MCP scale horizontally?", answer: "Stateless HTTP servers can scale horizontally if sessions and streams are handled correctly." },
      { question: "Should each server get a namespace?", answer: "Sensitive environments often benefit from namespace separation and scoped secrets." },
      { question: "Should I scale on CPU or memory?", answer: "Both. Tools that buffer large outputs or hold open streaming connections can become memory-bound before CPU-bound, so a memory target catches scaling needs a CPU-only HPA would miss." },
      { question: "How should secrets reach the pod?", answer: "Prefer an external secrets operator syncing from a manager such as AWS Secrets Manager or Vault over hand-maintained Kubernetes Secret manifests, so rotation does not require a manual redeploy." },
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
  page({
    slug: ["advanced", "multi-agent-orchestration"],
    title: "Multi-Agent Orchestration with MCP",
    description: "Coordinate multiple specialized MCP servers behind a supervisor agent, with task delegation, parallel execution, and resilient error handling.",
    category: "advanced",
    cluster: "multi-agent-orchestration",
    tags: ["multi-agent", "orchestration", "supervisor"],
    targetKeywords: ["mcp multi-agent", "mcp orchestration", "ai agent workflow"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "Multi-agent MCP systems decompose a complex task into sub-tasks, route each to a specialized MCP-backed worker, run independent work in parallel, and let a supervisor synthesize the results. This avoids overloading a single agent's context window and isolates failures to one worker instead of the whole workflow.",
    keyTakeaways: [
      "A supervisor pattern routes sub-tasks to specialized workers by required tool, then synthesizes their results.",
      "Wrap cross-agent calls in a circuit breaker so one failing worker cannot cascade into the whole workflow.",
      "Start with two or three agents and clear single-responsibility boundaries before scaling further.",
    ],
    sections: [
      {
        heading: "Supervisor pattern",
        body: [
          "A central agent decomposes the incoming task, assigns each sub-task to the worker whose MCP tools match what it needs, executes independent sub-tasks in parallel, and synthesizes a final result from the worker outputs.",
        ],
        code: `class SupervisorAgent {
  private workers: Map<string, MCPClient> = new Map();

  async executeTask(task: string) {
    const subtasks = await this.decomposeTask(task);
    const results = await Promise.all(
      subtasks.map((subtask) => {
        const worker = this.selectWorker(subtask);
        return worker.callTool(subtask.tool, subtask.args);
      })
    );
    return this.synthesize(task, results);
  }

  private selectWorker(subtask: { requires: string[] }): MCPClient {
    if (subtask.requires.includes("database")) return this.workers.get("analysis-agent")!;
    if (subtask.requires.includes("web")) return this.workers.get("research-agent")!;
    throw new Error("No worker registered for this subtask");
  }
}`,
      },
      {
        heading: "Resilience: circuit breakers and retries",
        body: [
          "A worker agent going down should not take the whole workflow with it. A circuit breaker stops calling a consistently-failing worker for a cooldown window, and exponential backoff spaces out retries for transient failures such as a rate limit or a brief network blip.",
        ],
        code: `class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  constructor(private threshold = 5, private cooldownMs = 60000) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.failures >= this.threshold && Date.now() - this.lastFailure < this.cooldownMs) {
      throw new Error("Circuit breaker open");
    }
    try {
      const result = await fn();
      this.failures = 0;
      return result;
    } catch (error) {
      this.failures++;
      this.lastFailure = Date.now();
      throw error;
    }
  }
}`,
      },
    ],
    faqs: [
      { question: "How do agents share context?", answer: "Pass context through the supervisor, or use a shared resource such as a database or file store that every agent can reach via MCP resources." },
      { question: "What happens if one agent fails?", answer: "Wrap cross-agent calls in a circuit breaker and give the supervisor a fallback: retry, skip the sub-task, or route to an alternative worker." },
      { question: "Can agents run in different languages?", answer: "Yes. MCP is language-agnostic, so a Python agent, a Node.js agent, and a Go agent can all participate in the same workflow." },
    ],
    citations: [officialCitations.mcp],
    related: ["/mcp-agent", "/docs/advanced/streaming", "/docs/monitoring/observability-best-practices"],
  }),
  page({
    slug: ["advanced", "streaming"],
    title: "MCP Streaming and Real-Time Data",
    description: "Stream long-running MCP tool progress and live updates to clients over Server-Sent Events instead of blocking on a single request-response cycle.",
    category: "advanced",
    cluster: "streaming",
    tags: ["streaming", "sse", "real-time"],
    targetKeywords: ["mcp streaming", "mcp sse", "mcp real-time updates"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "MCP servers stream real-time updates over the HTTP/SSE transport: the client opens a persistent SSE connection, the server keeps a handle to that connection keyed by session, and long-running tools push incremental progress notifications through it instead of returning only a single final response.",
    keyTakeaways: [
      "SSE is the recommended streaming approach for MCP because it is plain HTTP and works through standard firewalls and load balancers.",
      "Track each client's transport by session ID so a long-running tool can find the right connection to push updates to.",
      "Clean up the session map when the connection closes to avoid leaking references to dead clients.",
    ],
    sections: [
      {
        heading: "Serving SSE connections",
        body: [
          "Each client opens a long-lived GET connection that the server upgrades to SSE, and posts subsequent messages to a companion endpoint. Track the transport per session so tool handlers can find the right connection later.",
        ],
        code: `const connections = new Map<string, SSEServerTransport>();

app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  const sessionId = crypto.randomUUID();
  connections.set(sessionId, transport);

  res.on("close", () => connections.delete(sessionId));
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  const transport = connections.get(req.query.sessionId as string);
  if (!transport) return res.status(404).json({ error: "Session not found" });
  await transport.handlePostMessage(req, res);
});`,
      },
      {
        heading: "When to stream versus return a single response",
        body: [
          "Use streaming for operations with meaningful intermediate progress, such as processing a large dataset or a multi-step agent workflow. For a fast, single-shot lookup, a normal request-response tool call is simpler and has less to break.",
        ],
      },
    ],
    faqs: [
      { question: "Is SSE better than WebSockets for MCP?", answer: "SSE is the recommended default because it is one-directional, plain HTTP, and needs no special proxy configuration. WebSockets add complexity that most MCP streaming use cases do not need." },
      { question: "What happens if the client disconnects mid-stream?", answer: "The server's close handler should remove the session from its connection map immediately so no tool handler tries to write to a dead connection." },
      { question: "Can stdio servers stream too?", answer: "Stdio can deliver notifications, but true concurrent multi-client streaming needs the HTTP/SSE transport since stdio is tied to a single client process." },
    ],
    citations: [officialCitations.mcp, officialCitations.sse],
    related: ["/docs/protocol/transports", "/docs/protocol/events", "/docs/advanced/multi-agent-orchestration"],
  }),
  page({
    slug: ["development", "testing-strategies"],
    title: "MCP Server Testing Strategies",
    description: "Test MCP servers at three levels: unit tests for individual tools, integration tests for the server-client lifecycle, and load tests for production readiness.",
    category: "development",
    cluster: "testing-strategies",
    tags: ["testing", "unit-tests", "integration-tests"],
    targetKeywords: ["mcp testing", "mcp unit tests", "mcp integration tests"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Test MCP servers at three levels: unit tests that exercise individual tool functions in isolation, integration tests that connect a real MCP client to the running server to verify tool listing and execution, and load tests that measure latency and error rate under concurrent traffic before a production launch.",
    keyTakeaways: [
      "Unit test tool logic directly; integration test the server through a real MCP client connection.",
      "Assert both the happy path and the schema-validation failure path for every tool.",
      "Run a load test before every major release, not only once before the first launch.",
    ],
    sections: [
      {
        heading: "Unit and integration tests",
        body: [
          "Unit tests call a tool's implementation function directly with valid and invalid input. Integration tests go through the protocol layer itself: connect a real MCP client over stdio to the built server, list its tools, and call one to confirm the full request-response cycle works end to end.",
        ],
        code: `import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

describe("MCP server integration", () => {
  it("lists tools and executes one", async () => {
    const transport = new StdioClientTransport({ command: "node", args: ["dist/index.js"] });
    const client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(transport);

    const { tools } = await client.listTools();
    expect(tools.length).toBeGreaterThan(0);

    const result = await client.callTool({ name: tools[0].name, arguments: {} });
    expect(result.content[0].type).toBe("text");
  });
});`,
      },
      {
        heading: "Load testing before production",
        body: [
          "Run several concurrent MCP clients against the server for a fixed duration, record success rate and latency percentiles, and compare against your target before rolling out to production traffic.",
        ],
        table: table(
          ["Metric", "What it tells you"],
          [
            ["P95 latency", "Typical worst-case response time"],
            ["Error rate", "Stability under concurrent load"],
            ["Requests per second", "Throughput ceiling for capacity planning"],
          ]
        ),
      },
    ],
    faqs: [
      { question: "How do I test tools that call external APIs?", answer: "Mock the external call (for example with a test double or a mocking library) so the test exercises your tool logic without depending on a real network call." },
      { question: "What is the difference between integration and load testing?", answer: "Integration tests confirm correctness of the server-client protocol exchange. Load tests confirm the server holds up under concurrent traffic and measure latency under that load." },
      { question: "How often should I run load tests?", answer: "Before every major release, and periodically in production to catch performance regressions introduced by new tools or dependencies." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/getting-started/quickstart", "/docs/development/error-handling", "/docs/troubleshooting/common-issues"],
  }),
  page({
    slug: ["development", "error-handling"],
    title: "MCP Error Handling Patterns",
    description: "Categorize and handle MCP tool errors so validation, runtime, timeout, and network failures each return a clear message instead of crashing the server.",
    category: "development",
    cluster: "error-handling",
    tags: ["error-handling", "resilience", "validation"],
    targetKeywords: ["mcp error handling", "mcp validation errors", "mcp graceful degradation"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Wrap every MCP tool call in a try-catch, classify the failure (input validation, runtime, timeout, or downstream network error), log the full error with context server-side, and return a short, user-facing message with isError set to true rather than surfacing a raw stack trace to the client.",
    keyTakeaways: [
      "Classify errors: validation, runtime, timeout, and network failures each need a different response.",
      "Never return a raw stack trace to the client; log it server-side and return a short message instead.",
      "For non-critical failures, fall back to cached or partial data instead of failing the whole call.",
    ],
    sections: [
      {
        heading: "Classifying and returning errors",
        body: [
          "Zod validation failures mean the client sent bad input; timeouts mean an operation ran too long; everything else that throws during execution is a runtime error. Each should produce a distinct, short message back to the client.",
        ],
        code: `server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    return await withTimeout(executeTool(request), 30000);
  } catch (error) {
    if (error instanceof ZodError) {
      return { content: [{ type: "text", text: \`Validation error: \${error.message}\` }], isError: true };
    }
    if (String(error).includes("timed out")) {
      return { content: [{ type: "text", text: "Operation timed out. Try a smaller request." }], isError: true };
    }
    console.error("Tool execution failed:", { tool: request.params.name, error });
    return { content: [{ type: "text", text: \`Tool execution failed: \${(error as Error).message}\` }], isError: true };
  }
});

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timed out")), ms)),
  ]);
}`,
      },
      {
        heading: "Graceful degradation",
        body: [
          "When a non-critical dependency fails, prefer returning cached or partial data with a flag over failing the whole tool call. Reserve hard failures for cases where a partial answer would be misleading or unsafe.",
        ],
        code: `try {
  return await fetchRealTimeAnalytics();
} catch (error) {
  console.warn("Falling back to cached analytics:", error);
  const cached = await getCachedAnalytics();
  return { ...cached, _cached: true };
}`,
      },
    ],
    faqs: [
      { question: "Should I return stack traces to the client?", answer: "No. Stack traces are for server-side debugging. Log the full error there and return a short, user-facing message to the client." },
      { question: "How do I handle partial failures across multiple data sources?", answer: "Return the results that succeeded along with a _partial: true flag rather than failing the whole request because one source was unavailable." },
      { question: "What is a good retry strategy for network errors?", answer: "Exponential backoff with a small random jitter added to each delay, so multiple retrying clients do not all retry at exactly the same moment." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/development/testing-strategies", "/docs/troubleshooting/common-issues", "/docs/monitoring/observability-best-practices"],
  }),
  page({
    slug: ["compliance", "rate-limiting"],
    title: "MCP Rate Limiting Guide",
    description: "Prevent abuse and ensure fair usage of MCP servers with token-bucket rate limiting, per-tier limits, and distributed limiting across multiple instances.",
    category: "compliance",
    cluster: "rate-limiting",
    tags: ["rate-limiting", "abuse-prevention", "throttling"],
    targetKeywords: ["mcp rate limiting", "mcp api throttling", "mcp abuse prevention"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Rate limit MCP servers with a token-bucket algorithm keyed by user or API key rather than IP address, since IP-based limits can be bypassed by proxies or unfairly affect multiple users behind the same NAT. Return HTTP 429 with a retry-after header, and use a shared store such as Redis once you run more than one server instance.",
    keyTakeaways: [
      "Token bucket allows short bursts while holding to an average rate, which fits real client behavior better than a fixed window.",
      "Key limits by authenticated user or API key, not raw IP, for fairness and to resist bypass through proxies.",
      "Once you run multiple instances, rate-limit state must live in a shared store such as Redis, not in local memory.",
    ],
    sections: [
      {
        heading: "Token bucket limiter",
        body: [
          "A token bucket refills at a constant rate up to a cap and spends one token per request. This allows short bursts while still enforcing a long-run average rate, which suits typical MCP client traffic better than a hard fixed-window counter.",
        ],
        code: `class TokenBucketLimiter {
  private buckets = new Map<string, { tokens: number; lastRefill: number }>();
  constructor(private maxTokens: number, private refillPerMs: number) {}

  isAllowed(key: string): boolean {
    const now = Date.now();
    const bucket = this.buckets.get(key) ?? { tokens: this.maxTokens, lastRefill: now };
    bucket.tokens = Math.min(this.maxTokens, bucket.tokens + (now - bucket.lastRefill) * this.refillPerMs);
    bucket.lastRefill = now;
    this.buckets.set(key, bucket);
    if (bucket.tokens < 1) return false;
    bucket.tokens -= 1;
    return true;
  }
}`,
      },
      {
        heading: "Per-tier limits and distributed limiting",
        body: [
          "Different plan tiers should get different bucket sizes. Once the MCP server runs as more than one instance behind a load balancer, move the counters to Redis so every instance enforces the same limit against the same key.",
        ],
        table: table(
          ["Tier", "Suggested limit"],
          [
            ["Free / readonly", "10 requests/sec"],
            ["Pro", "100 requests/sec"],
            ["Enterprise", "1000 requests/sec"],
          ]
        ),
      },
    ],
    faqs: [
      { question: "Should I rate-limit by IP or by user ID?", answer: "By authenticated user or API key. IP-based limiting can be bypassed with proxies and can unfairly throttle multiple legitimate users behind the same NAT." },
      { question: "What should a rate-limited response look like?", answer: "HTTP 429 with a Retry-After header, plus X-RateLimit-Limit and X-RateLimit-Remaining headers so well-behaved clients can back off correctly." },
      { question: "How do I rate limit across multiple server instances?", answer: "Move the counters into a shared store such as Redis so every instance checks and updates the same count for a given key." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/compliance/security-best-practices", "/docs/mcp-gateway", "/docs/monitoring/observability-best-practices"],
  }),
  page({
    slug: ["protocol", "webhooks"],
    title: "MCP Webhook Integration Guide",
    description: "React to external events in real time by pairing MCP servers with signed incoming webhooks and a retrying outgoing webhook sender.",
    category: "protocol",
    cluster: "webhooks",
    tags: ["webhooks", "events", "integrations"],
    targetKeywords: ["mcp webhooks", "mcp event processing", "mcp real-time integration"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "Webhooks turn an MCP server from purely request-response into event-driven: an incoming webhook lets an external service notify the server the moment something changes, while an outgoing webhook lets the server notify other systems after a tool executes. Always verify incoming webhook signatures and retry outgoing deliveries with backoff.",
    keyTakeaways: [
      "Verify every incoming webhook's signature with a timing-safe comparison before trusting its payload.",
      "Queue outgoing webhook deliveries and retry with backoff instead of sending them inline and dropping failures.",
      "Treat webhook payloads as untrusted input and validate them the same way you validate tool arguments.",
    ],
    sections: [
      {
        heading: "Incoming webhooks",
        body: [
          "Verify the provider's HMAC signature with a timing-safe comparison before processing the payload, so a forged request cannot trigger downstream MCP notifications.",
        ],
        code: `function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(\`sha256=\${expected}\`));
}

app.post("/webhook/github", async (req, res) => {
  const signature = req.headers["x-hub-signature-256"] as string;
  if (!verifySignature(JSON.stringify(req.body), signature, process.env.GITHUB_WEBHOOK_SECRET!)) {
    return res.status(401).json({ error: "Invalid signature" });
  }
  if (req.body.action === "push") {
    await notifyClients("github_push", { repo: req.body.repository.full_name });
  }
  res.status(200).json({ received: true });
});`,
      },
      {
        heading: "Outgoing webhooks",
        body: [
          "Queue deliveries rather than sending inline during a tool call, and retry failed deliveries with backoff so a slow or momentarily-down subscriber does not slow down or fail the original tool response.",
        ],
        code: `class WebhookSender {
  private queue: Array<{ url: string; payload: unknown }> = [];
  private sending = false;

  send(url: string, event: string, data: unknown) {
    this.queue.push({ url, payload: { event, data, timestamp: new Date().toISOString() } });
    if (!this.sending) this.drain();
  }

  private async drain() {
    this.sending = true;
    while (this.queue.length) {
      const { url, payload } = this.queue.shift()!;
      try {
        await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } catch {
        this.queue.push({ url, payload });
        await new Promise((r) => setTimeout(r, 5000));
      }
    }
    this.sending = false;
  }
}`,
      },
    ],
    faqs: [
      { question: "Do I need to verify webhook signatures?", answer: "Yes, always. Without signature verification, anyone who finds the endpoint URL can send forged events into your MCP server." },
      { question: "What happens if an outgoing webhook delivery fails?", answer: "Requeue it and retry with a delay. Track repeated failures per endpoint so a permanently dead subscriber does not retry forever." },
      { question: "Should webhook payloads be trusted as-is?", answer: "No. Validate them the same way you validate MCP tool arguments before acting on their contents." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/protocol/events", "/docs/compliance/security-best-practices", "/docs/mcp-integrations"],
  }),
  page({
    slug: ["pricing", "cost-optimization"],
    title: "MCP Server Cost Optimization Guide",
    description: "Concrete techniques to cut MCP infrastructure costs: connection pooling, query and response caching, auto-scaling, and right-sizing.",
    category: "pricing",
    cluster: "cost-optimization",
    tags: ["cost", "caching", "auto-scaling"],
    targetKeywords: ["mcp cost optimization", "reduce mcp costs", "mcp infrastructure costs"],
    schemaType: "HowTo",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "The three biggest cost levers for an MCP server are database connection pooling, caching repeated tool responses, and matching compute to actual demand with auto-scaling instead of static over-provisioning. Address those three before looking at reserved or spot instance pricing.",
    keyTakeaways: [
      "Connection pooling and response caching are the highest-leverage, lowest-effort cost cuts.",
      "Auto-scale to demand instead of statically provisioning for peak load.",
      "Reserved or spot instances only help after the workload itself is already efficient.",
    ],
    sections: [
      {
        heading: "Pooling and caching first",
        body: [
          "Opening a new database connection per request is one of the most common sources of avoidable cost and latency. Pool connections, and cache tool responses that are expensive to compute but do not change on every call.",
        ],
        code: `const pool = new Pool({ max: 20, idleTimeoutMillis: 30000 });
const responseCache = new Map<string, unknown>();

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const key = \`\${request.params.name}:\${JSON.stringify(request.params.arguments)}\`;
  if (responseCache.has(key)) return responseCache.get(key);
  const result = await executeTool(request);
  responseCache.set(key, result);
  return result;
});`,
      },
      {
        heading: "Right-sizing and scaling to demand",
        body: [
          "Static provisioning for peak load wastes money the rest of the time. Auto-scale compute to actual demand, and only commit to reserved or spot pricing once the workload itself is efficient, since discounting an over-provisioned baseline still leaves money on the table.",
        ],
        table: table(
          ["Lever", "Typical savings"],
          [
            ["Connection pooling", "Fewer wasted DB connections"],
            ["Response caching", "Cuts repeat compute for identical calls"],
            ["Auto-scaling vs static", "Avoids paying for idle peak capacity"],
            ["Reserved instances (1-3yr)", "Meaningful discount on a stable baseline"],
          ]
        ),
      },
    ],
    faqs: [
      { question: "What's the fastest way to cut MCP hosting costs?", answer: "Connection pooling and response caching first. Both are low-effort and address the most common sources of waste before touching infrastructure pricing." },
      { question: "Serverless or containers for cost?", answer: "Serverless suits sporadic, low-volume traffic since you pay only for actual invocations. Containers with auto-scaling suit steady, predictable traffic." },
      { question: "When do reserved or spot instances make sense?", answer: "Only after the workload itself is efficient. Discounting an over-provisioned or unoptimized baseline still wastes money relative to fixing the baseline first." },
    ],
    citations: [officialCitations.awsMumbai],
    related: ["/docs/pricing/hidden-costs", "/docs/performance/optimization-guide", "/docs/deployment/kubernetes-deployment"],
  }),
  page({
    slug: ["compliance", "output-sanitization"],
    title: "MCP Output Sanitization Guide",
    description: "Mask PII, escape unsafe HTML, and cap oversized payloads before an MCP tool response reaches an AI client.",
    category: "compliance",
    cluster: "output-sanitization",
    tags: ["sanitization", "pii", "xss"],
    targetKeywords: ["mcp output sanitization", "mcp pii masking", "mcp xss prevention"],
    schemaType: "HowTo",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "Never return a tool's raw output to the client. Mask likely PII patterns (emails, phone numbers, card numbers), escape any HTML before it can be rendered, and truncate oversized arrays so a single tool response cannot leak sensitive data or blow out the model's context window.",
    keyTakeaways: [
      "Sanitize on the server, always; never rely on the client to do it.",
      "Mask PII with pattern matching as a baseline, not a complete solution — pair it with schema-level data minimization.",
      "Truncate large arrays with an explicit _truncated flag so the model knows the data was cut, rather than silently dropping items.",
    ],
    sections: [
      {
        heading: "Masking likely PII patterns",
        body: [
          "Regex-based masking is a baseline safety net, not a substitute for only selecting the fields a tool actually needs. Apply it recursively across strings, arrays, and nested objects before the response leaves the server.",
        ],
        code: `function sanitizeOutput(data: unknown): unknown {
  if (typeof data === "string") {
    return data
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g, "[EMAIL_REDACTED]")
      .replace(/\\b\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}\\b/g, "[CARD_REDACTED]");
  }
  if (Array.isArray(data)) return data.map(sanitizeOutput);
  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, sanitizeOutput(v)]));
  }
  return data;
}`,
      },
      {
        heading: "Capping payload size",
        body: [
          "A tool that can return an unbounded array should truncate it and say so explicitly, rather than either failing or silently flooding the model's context window.",
        ],
        code: `if (Array.isArray(data) && data.length > 100) {
  return { _truncated: true, _original_length: data.length, _sample: data.slice(0, 100) };
}`,
      },
    ],
    faqs: [
      { question: "Should I sanitize on the client too?", answer: "No. Sanitize on the server before sending data; never trust a client to sanitize on your behalf." },
      { question: "Is regex-based PII masking enough by itself?", answer: "Treat it as a safety net, not the primary control. Data minimization at the query or schema level (only selecting fields a tool actually needs) is the stronger guarantee." },
      { question: "What's the performance cost of sanitizing every response?", answer: "Negligible for typical tool payload sizes. For very large datasets, sanitize while streaming rather than materializing the full response first." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/compliance/dpdp-checklist", "/docs/compliance/security-best-practices", "/docs/compliance/audit-logging"],
  }),
  page({
    slug: ["compliance", "secret-management"],
    title: "MCP Secret Management Best Practices",
    description: "Manage API keys, database credentials, and tokens for MCP servers with validated environment variables, a secret manager, and a rotation policy.",
    category: "compliance",
    cluster: "secret-management",
    tags: ["secrets", "credentials", "rotation"],
    targetKeywords: ["mcp secret management", "mcp api keys", "mcp credential rotation"],
    schemaType: "HowTo",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "Never hardcode secrets in source code. Load them from environment variables validated at startup, move production secrets into a manager such as AWS Secrets Manager or Vault instead of plain env vars, and rotate on a schedule (shorter for high-value credentials) rather than only when a leak is suspected.",
    keyTakeaways: [
      "Validate required environment variables at startup so a missing secret fails loudly, not deep inside a request handler.",
      "In production, prefer a secret manager over plain environment variables so rotation and access logging come for free.",
      "Different secrets per environment; a dev credential should never work against production.",
    ],
    sections: [
      {
        heading: "Validated environment variables",
        body: [
          "Parse and validate process.env at startup with a schema so a missing or malformed secret fails immediately with a clear error, instead of surfacing as a confusing runtime failure the first time a tool needs it.",
        ],
        code: `const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(10),
  JWT_SECRET: z.string().min(32),
});

const env = EnvSchema.parse(process.env);`,
      },
      {
        heading: "Secret managers for production",
        body: [
          "A secret manager adds access logging, fine-grained IAM policies, and rotation without redeploying, which plain environment variables cannot give you.",
        ],
        code: `const client = new SecretsManagerClient({ region: "ap-south-1" });

async function getSecret(secretName: string): Promise<string> {
  const { SecretString } = await client.send(new GetSecretValueCommand({ SecretId: secretName }));
  return SecretString ?? "";
}`,
      },
    ],
    faqs: [
      { question: "How often should secrets be rotated?", answer: "As a starting point: API keys around every 90 days, database passwords around every 180 days, and immediately for any credential known or suspected to be compromised." },
      { question: "Should dev and production share secrets?", answer: "No. Use entirely separate credentials per environment so a leaked development key cannot touch production data." },
      { question: "How do I respond to a leaked secret?", answer: "Rotate the compromised credential immediately, audit access logs for the window it was exposed, and notify affected users if the exposure could have touched their data." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/compliance/security-best-practices", "/docs/compliance/audit-logging", "/docs/deployment/kubernetes-deployment"],
  }),
  page({
    slug: ["compliance", "audit-logging"],
    title: "MCP Audit Logging Implementation",
    description: "Buffer, batch, and durably store immutable audit log entries for every MCP tool invocation, plus how to query and report on them.",
    category: "compliance",
    cluster: "audit-logging",
    tags: ["audit-logging", "compliance", "observability"],
    targetKeywords: ["mcp audit logging", "mcp compliance logging", "mcp security logs"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Log every tool invocation locally for immediate visibility, buffer entries in memory, and flush them in batches to durable, encrypted, append-only storage such as versioned S3. This guide covers the implementation architecture; see the DPDP checklist for what a compliant log entry needs to contain.",
    keyTakeaways: [
      "Buffer and batch-flush audit entries rather than writing one object per request, to control storage cost and I/O.",
      "Store audit logs in append-only, encrypted storage separate from application logs.",
      "Build a query and reporting path from day one — an audit log nobody can query does not satisfy an access or compliance request.",
    ],
    sections: [
      {
        heading: "Buffered, durable writes",
        body: [
          "Log locally for immediate operational visibility, but batch entries and flush them periodically to durable storage rather than writing one small object per tool call, which gets expensive and slow at volume.",
        ],
        code: `class AuditLogger {
  private buffer: AuditLogEntry[] = [];
  constructor(private flushEveryMs = 10000, private flushAt = 100) {
    setInterval(() => this.flush(), this.flushEveryMs);
  }

  log(entry: AuditLogEntry) {
    this.buffer.push(entry);
    if (this.buffer.length >= this.flushAt) this.flush();
  }

  private async flush() {
    if (!this.buffer.length) return;
    const batch = this.buffer.splice(0, this.buffer.length);
    const key = \`audit-logs/\${new Date().toISOString().slice(0, 10)}/\${Date.now()}.json\`;
    await s3.send(new PutObjectCommand({
      Bucket: "mcp-audit-logs", Key: key,
      Body: JSON.stringify(batch), ServerSideEncryption: "AES256",
    }));
  }
}`,
      },
      {
        heading: "Querying and reporting",
        body: [
          "An audit log that cannot be queried does not satisfy a data-access or compliance request. Build a report that at minimum answers: how many calls, by whom, with what success rate, and how many were flagged as errors or blocked.",
        ],
      },
    ],
    faqs: [
      { question: "How long should audit logs be retained?", answer: "It depends on the applicable framework and your own policy; check current DPDP, RBI, and any sector-specific retention requirements rather than assuming a fixed number, since retention rules change." },
      { question: "Should audit logs be encrypted?", answer: "Yes, both at rest and in transit, and ideally with separate keys from your general application data." },
      { question: "Can audit logs be edited?", answer: "No. Use append-only, versioned storage so an entry can be added but never silently altered or deleted." },
    ],
    citations: [officialCitations.mcp, officialCitations.dpdp],
    related: ["/docs/compliance/dpdp-checklist", "/docs/compliance/output-sanitization", "/docs/monitoring/observability-best-practices"],
  }),
  page({
    slug: ["development", "publishing"],
    title: "Publishing MCP Servers to npm and GitHub",
    description: "Package an MCP server with a proper package.json, README, and semantic versioning, then publish it to npm and cut a GitHub release.",
    category: "development",
    cluster: "publishing",
    tags: ["publishing", "npm", "versioning"],
    targetKeywords: ["mcp registry", "publish mcp server", "mcp npm package"],
    schemaType: "HowTo",
    priority: 0.65,
    changefreq: "weekly",
    directAnswer: "Publish an MCP server like any npm package: a bin entry pointing at the compiled output, a README documenting each tool's parameters, semantic versioning where a MAJOR bump means a removed tool or changed schema, and a GitHub release tagged to match the published npm version.",
    keyTakeaways: [
      "A MAJOR version bump means a removed tool or a breaking schema change; new tools are MINOR; fixes are PATCH.",
      "Document every tool's parameters and a request/response example in the README so integrators do not have to read the source.",
      "Automate publish-on-release in CI so a human never has to run npm publish by hand.",
    ],
    sections: [
      {
        heading: "Package metadata and versioning",
        body: [
          "Point the bin field at the compiled entry point, keep the MCP SDK as a dependency (not a devDependency), and follow semantic versioning: MAJOR for breaking tool or schema changes, MINOR for new tools, PATCH for fixes.",
        ],
        code: `{
  "name": "@yourorg/analytics-mcp-server",
  "version": "1.1.0",
  "main": "dist/index.js",
  "bin": { "analytics-mcp": "dist/index.js" },
  "scripts": { "build": "tsc", "prepublishOnly": "npm run build" },
  "engines": { "node": ">=18.0.0" }
}`,
      },
      {
        heading: "Automated publish on release",
        body: [
          "Trigger the publish step from a GitHub release rather than a manual local npm publish, so the published package always matches a tagged, reviewed commit.",
        ],
        code: `# .github/workflows/publish.yml
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", registry-url: "https://registry.npmjs.org" }
      - run: npm ci && npm run build && npm test
      - run: npm publish --access public
        env: { NODE_AUTH_TOKEN: "\${{ secrets.NPM_TOKEN }}" }`,
      },
    ],
    faqs: [
      { question: "Should I use a scoped package name?", answer: "Yes if publishing under an organization; use the @yourorg/package-name format so ownership is unambiguous." },
      { question: "How do I handle a breaking change?", answer: "Bump the MAJOR version and document the migration path in a changelog entry, since removing or renaming a tool breaks every existing integration silently otherwise." },
      { question: "Can I unpublish a package?", answer: "npm allows unpublishing only within a short window after publishing; after that, deprecate the version instead and publish a corrected one." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/getting-started/quickstart", "/docs/development/testing-strategies", "/docs/mcp-server-directory"],
  }),
  page({
    slug: ["internationalization", "multi-language-support"],
    title: "MCP Multi-Language Support for Indian Languages",
    description: "Detect the user's language, translate at the edges of a tool call, and localize error messages for Hindi, Tamil, Telugu, and other Indian languages.",
    category: "internationalization",
    cluster: "multi-language-support",
    tags: ["localization", "indian-languages", "i18n"],
    targetKeywords: ["mcp indian languages", "mcp hindi support", "mcp localization"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "weekly",
    directAnswer: "Detect the caller's language, translate the query to English at the boundary of a tool call so business logic stays language-agnostic, run the tool, then translate the result back — and keep tool names themselves in English for consistency across clients.",
    keyTakeaways: [
      "Translate at the edges of a tool call; keep the business logic itself language-agnostic.",
      "Keep tool names in English always; localize descriptions and error messages only.",
      "Normalize Unicode input to NFC form before processing to avoid subtle matching bugs.",
    ],
    sections: [
      {
        heading: "Detect, translate at the edge, translate back",
        body: [
          "Detect the language of the incoming query, translate it to English before it reaches tool logic, run the tool as normal, then translate the result back to the caller's language. This keeps every tool implementation language-agnostic instead of branching internally per language.",
        ],
        code: `server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { query, language } = request.params.arguments as { query: string; language?: string };
  const detected = language ?? detectLanguage(query);

  const englishQuery = detected !== "english" ? await translateText(query, "en") : query;
  const result = await executeTool({ ...request, query: englishQuery });

  if (detected !== "english") {
    return { content: [{ type: "text", text: await translateText(JSON.stringify(result), detected) }] };
  }
  return result;
});`,
      },
      {
        heading: "Localized error messages",
        body: [
          "Error messages are worth hand-translating rather than machine-translating on the fly, since they are a small, fixed set and users read them under frustration where clarity matters most.",
        ],
        code: `const ERROR_MESSAGES: Record<string, Record<string, string>> = {
  validation_error: {
    english: "Invalid input provided",
    hindi: "अमान्य इनपुट प्रदान किया गया",
    tamil: "தவறான உள்ளீடு வழங்கப்பட்டது",
  },
};`,
      },
    ],
    faqs: [
      { question: "Which Indian language should I support first?", answer: "Hindi has the widest reach nationally; after that, prioritize by your actual user base — Tamil, Telugu, Marathi, and Bengali are common next choices." },
      { question: "Should tool names be translated?", answer: "No. Keep tool names in English for consistency across clients and integrations; translate descriptions and error messages instead." },
      { question: "How do I handle mixed-language input?", answer: "Use a language detector that tolerates code-switching, and fall back to English processing when detection confidence is low rather than guessing." },
    ],
    citations: [officialCitations.mcp],
    related: ["/docs/compliance/dpdp-compliance-guide", "/docs/industry/startups", "/glossary/model-context-protocol"],
  }),
  page({
    slug: ["industry", "upi-integration"],
    title: "MCP UPI Payment Integration",
    description: "Initiate and verify UPI payments from an MCP server with masked logging and India-only data storage per RBI expectations.",
    category: "industry",
    cluster: "upi-integration",
    tags: ["upi", "payments", "fintech"],
    targetKeywords: ["mcp upi", "mcp payment integration", "mcp indian payments"],
    schemaType: "TechArticle",
    priority: 0.75,
    changefreq: "weekly",
    directAnswer: "Wrap a licensed Indian UPI gateway (such as Razorpay or a bank's own API) behind two narrow MCP tools — initiate and verify — rather than exposing the gateway's full API surface, mask the UPI ID in every log line, and keep all payment data in Indian infrastructure.",
    keyTakeaways: [
      "Expose narrow, purpose-built tools (initiate_payment, verify_payment) instead of a generic pass-through to the gateway API.",
      "Mask the UPI handle in logs and audit entries; never store it in full outside the gateway itself.",
      "Route through an Indian-licensed gateway — this is a hard requirement, not an optimization.",
    ],
    sections: [
      {
        heading: "Initiating a payment",
        body: [
          "Validate the amount and UPI handle format before calling the gateway, generate a traceable transaction ID, and log the attempt with the UPI handle masked rather than in full.",
        ],
        code: `const PaymentSchema = z.object({
  amount: z.number().positive(),
  upi_id: z.string().regex(/^[a-zA-Z0-9.\\-_]+@[a-zA-Z]+$/),
  purpose: z.string().max(100),
});

function maskUpiId(upiId: string): string {
  const [user, domain] = upiId.split("@");
  return \`\${user.slice(0, 2)}***@\${domain}\`;
}`,
      },
      {
        heading: "Verifying a payment",
        body: [
          "Poll or receive a callback for the transaction status, and log the verification event the same way as the initiation, recording only the fields actually needed (status, amount, timestamp).",
        ],
      },
    ],
    faqs: [
      { question: "Can I use a non-Indian payment gateway for UPI?", answer: "No. UPI is an Indian payment rail; route through a licensed Indian gateway such as Razorpay, and keep the resulting payment data in Indian infrastructure." },
      { question: "Should the AI agent see the full UPI handle?", answer: "Prefer masking it in anything that becomes part of the model's context or a stored log, and only surface the full handle where a human explicitly needs it." },
      { question: "Do I need my own payment license?", answer: "If you integrate through a licensed gateway, the gateway holds the relevant license; if you're processing payments more directly than that, get qualified legal and compliance advice specific to your setup." },
    ],
    citations: [officialCitations.rbi, officialCitations.dpdp],
    related: ["/docs/industry/fintech", "/docs/compliance/dpdp-checklist", "/docs/industry/gst-integration"],
  }),
  page({
    slug: ["industry", "gst-integration"],
    title: "MCP GST Verification Integration",
    description: "Verify GSTIN numbers and structure invoice data from an MCP server, wired to a licensed GSP rather than a raw scraped source.",
    category: "industry",
    cluster: "gst-integration",
    tags: ["gst", "tax", "invoicing"],
    targetKeywords: ["mcp gst", "mcp gstin verification", "mcp indian tax"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "weekly",
    directAnswer: "Expose GSTIN verification and invoice-data-structuring as narrow MCP tools backed by a licensed GST Suvidha Provider (GSP) API, validate the GSTIN format before calling out, and treat exact tax rates, due dates, and penalty amounts as values to fetch from the GSP or a current official source rather than hardcode, since tax rules change.",
    keyTakeaways: [
      "Validate the GSTIN format locally before making an API call, to fail fast on obviously malformed input.",
      "Source live rates and deadlines from your GSP integration rather than hardcoding them into the tool.",
      "Treat this as a read/verify and structure-generation tool, not a substitute for a qualified tax filing workflow.",
    ],
    sections: [
      {
        heading: "GSTIN verification",
        body: [
          "Validate the GSTIN's format locally first — it is a fixed 15-character pattern — before spending an API call on obviously invalid input.",
        ],
        code: `const GSTINSchema = z.object({
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "verify_gstin") {
    const { gstin } = GSTINSchema.parse(request.params.arguments);
    const result = await gspClient.verifyGSTIN(gstin);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
});`,
      },
      {
        heading: "Structuring invoice data",
        body: [
          "A tool that assembles invoice line items into the e-invoice schema is useful, but pull the applicable GST rate per item from your GSP or product master rather than hardcoding rate slabs, since they can change.",
        ],
      },
    ],
    faqs: [
      { question: "Do I need to register with GSTN directly?", answer: "Most integrations go through a licensed GST Suvidha Provider (GSP) rather than GSTN directly; the GSP holds the relevant API access." },
      { question: "Can this tool file GST returns automatically?", answer: "It can prepare and structure the data, but treat automated filing as something to route through your GSP's filing API with a human review step, not something to fully automate blind." },
      { question: "Are the tax rates and penalty amounts in this guide current?", answer: "Don't rely on any fixed figures from a guide for actual filing decisions — GST rates, due dates, and penalties change; pull current values from your GSP or an official source at filing time." },
    ],
    citations: [officialCitations.dpdp],
    related: ["/docs/industry/fintech", "/docs/industry/upi-integration", "/docs/industry/startups"],
  }),
  page({
    slug: ["industry", "aadhaar-verification"],
    title: "MCP Aadhaar Verification (Sandbox Patterns)",
    description: "Handle Aadhaar-based identity verification from an MCP server: explicit consent, masked logging, and no storage of raw Aadhaar numbers.",
    category: "industry",
    cluster: "aadhaar-verification",
    tags: ["aadhaar", "kyc", "identity"],
    targetKeywords: ["mcp aadhaar", "mcp kyc india", "mcp identity verification"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "weekly",
    directAnswer: "Aadhaar data is highly sensitive and tightly regulated: only integrate through an officially licensed KUA (KYC User Agency) or ASA, require explicit recorded consent before every verification call, mask the Aadhaar number in all logs down to the last four digits, and never persist the raw number.",
    keyTakeaways: [
      "Only a licensed KUA or ASA integration is appropriate for real Aadhaar verification — build and test against a sandbox first.",
      "Require and log explicit consent before every verification call; refuse the call without it.",
      "Never store a raw Aadhaar number anywhere, including logs; mask to the last four digits at most.",
    ],
    sections: [
      {
        heading: "Consent-gated verification",
        body: [
          "Reject the call outright if consent was not explicitly given, and mask the Aadhaar number in every log line — the audit trail should prove consent was checked without itself becoming a store of sensitive numbers.",
        ],
        code: `const AadhaarSchema = z.object({
  aadhaar_number: z.string().regex(/^\\d{12}$/),
  consent: z.literal(true),
});

function maskAadhaar(aadhaar: string): string {
  return \`XXXX-XXXX-\${aadhaar.slice(8)}\`;
}

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "verify_aadhaar") {
    const { aadhaar_number } = AadhaarSchema.parse(request.params.arguments);
    const verification = await kuaClient.verify(aadhaar_number);
    auditLogger.log({ event: "aadhaar_verification", aadhaar_masked: maskAadhaar(aadhaar_number) });
    return { content: [{ type: "text", text: JSON.stringify({ status: verification.status, name: verification.name }) }] };
  }
});`,
      },
    ],
    faqs: [
      { question: "Can I store Aadhaar numbers?", answer: "No — do not persist raw Aadhaar numbers anywhere, including logs. Store only a masked version or an internal reference ID." },
      { question: "Do I need a license to call Aadhaar verification APIs?", answer: "Yes, real verification requires working through a licensed KUA (KYC User Agency) or ASA; you cannot call UIDAI systems directly without that status." },
      { question: "What happens if I skip the consent check?", answer: "Treat this as a hard blocker, not a soft warning: the tool should refuse to run without recorded consent. Aadhaar misuse carries serious legal exposure under the Aadhaar Act 2016 — get qualified legal advice on your specific obligations rather than relying on any general guide for exact penalty figures." },
    ],
    citations: [officialCitations.dpdp],
    related: ["/docs/compliance/dpdp-checklist", "/docs/industry/upi-integration", "/docs/industry/fintech"],
  }),
  page({
    slug: ["protocol", "json-rpc"],
    title: "MCP JSON-RPC 2.0 Message Format",
    description: "The request, response, notification, and error message shapes MCP uses for every client-server exchange, and the standard error codes.",
    category: "protocol",
    cluster: "json-rpc",
    tags: ["json-rpc", "protocol", "messages"],
    targetKeywords: ["mcp json-rpc", "mcp message format", "json-rpc 2.0 mcp"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "weekly",
    directAnswer: "Every MCP message is JSON-RPC 2.0: a request carries an id, method, and params and expects a matching response; a notification has no id and expects no response; an error response uses a standard numeric code such as -32602 for invalid params. Getting this shape right is what makes a server interoperable with any MCP client.",
    keyTakeaways: [
      "Requests and responses are correlated by a shared id field; notifications omit id and get no response.",
      "Standard JSON-RPC error codes (-32700 to -32603) cover transport-level failures; tool-specific failures use isError: true in a normal result instead.",
      "Always include jsonrpc: \"2.0\" — a client can reject a message missing it.",
    ],
    sections: [
      {
        heading: "Request, response, and notification shapes",
        body: [
          "A request expects a response with a matching id. A notification is fire-and-forget: no id, and the server must not reply to it.",
        ],
        code: `// Request
{ "jsonrpc": "2.0", "id": 1, "method": "tools/call",
  "params": { "name": "get_weather", "arguments": { "location": "Mumbai" } } }

// Response
{ "jsonrpc": "2.0", "id": 1,
  "result": { "content": [{ "type": "text", "text": "28C, Partly Cloudy" }] } }

// Notification (no id, no response expected)
{ "jsonrpc": "2.0", "method": "notifications/initialized" }`,
      },
      {
        heading: "Standard error codes",
        body: [
          "Reserve these codes for transport and protocol-level failures. A tool that fails for a business reason (bad input, downstream API down) should usually return a normal result with isError: true and a clear text message instead, so the model sees it as content rather than a raw protocol error.",
        ],
        table: table(
          ["Code", "Meaning"],
          [
            ["-32700", "Parse error — malformed JSON"],
            ["-32600", "Invalid request — not a valid JSON-RPC object"],
            ["-32601", "Method not found"],
            ["-32602", "Invalid params"],
            ["-32603", "Internal error"],
          ]
        ),
      },
    ],
    faqs: [
      { question: "Can I batch multiple requests in one message?", answer: "JSON-RPC 2.0 supports batching, but most MCP clients and servers process requests one at a time in practice; do not rely on batch support being present." },
      { question: "Is there a maximum message size?", answer: "Not at the protocol level. Keep responses well under a few MB in practice so they don't blow out the model's context window or strain the transport." },
      { question: "Should a tool-level failure use a JSON-RPC error or isError: true?", answer: "Use isError: true on a normal result for business-logic failures (bad input, downstream failure) so the model can read and react to the message. Reserve JSON-RPC error codes for protocol-level problems." },
    ],
    citations: [officialCitations.jsonRpc, officialCitations.mcp],
    related: ["/docs/protocol/lifecycle", "/docs/protocol/tools", "/docs/development/error-handling"],
  }),
  page({
    slug: ["protocol", "lifecycle"],
    title: "MCP Connection Lifecycle",
    description: "The initialize, discover, invoke, and terminate phases every MCP connection goes through, and what breaks when a phase is skipped.",
    category: "protocol",
    cluster: "lifecycle",
    tags: ["lifecycle", "initialization", "handshake"],
    targetKeywords: ["mcp lifecycle", "mcp initialization", "mcp handshake"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "weekly",
    directAnswer: "Every MCP connection goes through four phases in order: initialize (client and server exchange protocol version and capabilities), discover (client lists the server's tools, resources, and prompts), invoke (client calls them), and terminate (the connection closes). Skipping initialize is the most common cause of a client that connects but sees no tools.",
    keyTakeaways: [
      "The client must send initialize before anything else, and the server must respond with its actual capabilities before the client sends the initialized notification.",
      "A server can add or remove capabilities mid-session by sending a listChanged notification; the client should re-list rather than caching the original discovery response forever.",
      "MCP is stateless by design — don't rely on a server remembering anything about earlier calls in the same connection unless you've deliberately built that yourself.",
    ],
    sections: [
      {
        heading: "Initialize and discover",
        body: [
          "The client opens with an initialize request declaring its protocol version and capabilities; the server responds with its own capabilities (which tool/resource/prompt types it actually supports) before the client confirms with an initialized notification. Only after that handshake should the client call tools/list, resources/list, or prompts/list.",
        ],
        code: `// Client -> Server
{ "jsonrpc": "2.0", "id": 1, "method": "initialize",
  "params": { "protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": { "name": "claude-desktop", "version": "1.0.0" } } }

// Server -> Client
{ "jsonrpc": "2.0", "id": 1,
  "result": { "protocolVersion": "2025-06-18",
    "capabilities": { "tools": { "listChanged": true } },
    "serverInfo": { "name": "my-server", "version": "1.0.0" } } }

// Client -> Server (notification, no response)
{ "jsonrpc": "2.0", "method": "notifications/initialized" }`,
      },
      {
        heading: "Invoke and terminate",
        body: [
          "Once initialized, the client can call tools, read resources, and fetch prompts freely and in any order. Termination differs by transport: a stdio server exits when its client process closes the pipe; an HTTP/SSE server closes the session on an explicit disconnect or a timeout.",
        ],
      },
    ],
    faqs: [
      { question: "Can I skip initialization to save a round trip?", answer: "No. A client that skips it will typically see zero tools or get a protocol error, since the server hasn't yet declared what it supports." },
      { question: "What happens if the server doesn't support a capability the client expected?", answer: "The server simply omits it from its initialize response. The client should check for a capability before relying on it rather than assuming it's present." },
      { question: "Can a server's capabilities change mid-session?", answer: "Yes, via a listChanged notification. The client should re-run the corresponding list call rather than trusting its first snapshot for the whole session." },
    ],
    citations: [officialCitations.mcp, officialCitations.jsonRpc],
    related: ["/docs/protocol/json-rpc", "/docs/getting-started/quickstart", "/docs/protocol/events"],
  }),
  page({
    slug: ["monitoring", "prometheus-metrics"],
    title: "Monitor MCP Servers with Prometheus",
    description: "Export MCP server metrics in Prometheus format and write PromQL queries for tool latency, error rate, and throughput.",
    category: "monitoring",
    cluster: "prometheus-metrics",
    tags: ["prometheus", "metrics", "observability"],
    targetKeywords: ["prometheus mcp", "mcp server metrics", "promql mcp"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "monthly",
    directAnswer: "Prometheus monitors MCP servers by scraping a /metrics endpoint that exposes counters and histograms for tool calls, then lets you query and alert on them with PromQL.",
    keyTakeaways: [
      "Expose a /metrics endpoint with the prom-client library rather than pushing metrics manually.",
      "Use a histogram for tool-call duration so you can derive p50/p95/p99, not just an average.",
      "Label by server and tool name, never by user ID, email, or request payload content.",
    ],
    sections: [
      {
        heading: "Instrumenting an MCP server",
        body: [
          "The prom-client package is the standard way to expose Prometheus-format metrics from a Node.js process. Wrap each tool handler so every call increments a counter and records its duration in a histogram, then serve the aggregated result on a /metrics HTTP endpoint for Prometheus to scrape on an interval.",
        ],
        code: `import { Counter, Histogram, register } from "prom-client";
import express from "express";

const toolCalls = new Counter({
  name: "mcp_tool_calls_total",
  help: "Total tool calls handled",
  labelNames: ["server", "tool", "status"],
});

const toolDuration = new Histogram({
  name: "mcp_tool_duration_seconds",
  help: "Tool call duration in seconds",
  labelNames: ["server", "tool"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

async function callTool(server: string, tool: string, handler: () => Promise<unknown>) {
  const end = toolDuration.startTimer({ server, tool });
  try {
    const result = await handler();
    toolCalls.inc({ server, tool, status: "success" });
    return result;
  } catch (err) {
    toolCalls.inc({ server, tool, status: "error" });
    throw err;
  } finally {
    end();
  }
}

const app = express();
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
app.listen(9464);`,
      },
      {
        heading: "Useful PromQL queries",
        body: [
          "Once Prometheus is scraping the endpoint, these queries cover the metrics that matter most for an MCP server: error rate, p95 latency, and per-tool call volume.",
        ],
        table: table(
          ["Question", "PromQL"],
          [
            ["Error rate over 5 minutes", 'sum(rate(mcp_tool_calls_total{status="error"}[5m])) / sum(rate(mcp_tool_calls_total[5m]))'],
            ["p95 tool latency", "histogram_quantile(0.95, sum(rate(mcp_tool_duration_seconds_bucket[5m])) by (le, tool))"],
            ["Calls per tool per minute", "sum(rate(mcp_tool_calls_total[1m])) by (tool)"],
          ],
        ),
      },
    ],
    faqs: [
      { question: "Does Prometheus replace Grafana?", answer: "No. Prometheus collects and stores the time-series data; Grafana (or Prometheus's own expression browser) is typically used to visualize it." },
      { question: "Should the /metrics endpoint require authentication?", answer: "Yes if it's reachable outside your own network - it can reveal server names, tool names, and call volume. Put it behind the same auth boundary as the rest of your infrastructure, not the public MCP endpoint." },
      { question: "How often should Prometheus scrape?", answer: "15-30 seconds is a common default. Faster scraping increases storage and CPU cost without meaningfully improving alerting latency for most MCP workloads." },
    ],
    citations: [officialCitations.prometheus, officialCitations.mcp],
    related: ["/docs/monitoring/grafana-dashboard", "/docs/monitoring/observability-best-practices", "/docs/monitoring"],
  }),
  page({
    slug: ["deployment", "github-actions-cicd"],
    title: "Deploy MCP Servers with GitHub Actions",
    description: "Build a GitHub Actions workflow that tests, builds, and deploys an MCP server on every push to main.",
    category: "deployment",
    cluster: "github-actions-cicd",
    tags: ["github-actions", "ci-cd", "deployment"],
    targetKeywords: ["github actions mcp", "mcp ci cd", "deploy mcp server github actions"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "monthly",
    directAnswer: "A GitHub Actions workflow can install dependencies, run tests, build the server, and deploy it automatically whenever changes are pushed to the main branch.",
    keyTakeaways: [
      "Keep the workflow's job order strict: install, typecheck, test, build, then deploy - fail fast before spending time deploying broken code.",
      "Store deployment credentials as encrypted GitHub secrets, never as plain workflow environment values.",
      "Run the MCP Inspector or an equivalent smoke test against the built server before promoting a deploy.",
    ],
    sections: [
      {
        heading: "A test-and-deploy workflow",
        body: [
          "This workflow runs on every push to main: install dependencies with a locked lockfile, typecheck, run the test suite, build, then deploy only if every prior step passed. Secrets referenced with ${{ secrets.NAME }} are pulled from the repository's encrypted GitHub secrets, never written into the YAML itself.",
        ],
        code: `name: Deploy MCP Server
on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm

      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run build

      - name: Deploy
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}
          MCP_API_KEY: \${{ secrets.MCP_API_KEY }}
        run: npm run deploy`,
      },
      {
        heading: "Gating on a smoke test",
        body: [
          "Before a workflow promotes a build to production, it's worth confirming the server actually starts and lists its tools correctly. The MCP Inspector can run headlessly in CI for exactly this check, catching a broken tool registration before it reaches real traffic.",
        ],
        code: `- name: Smoke test tool listing
  run: |
    npx @modelcontextprotocol/inspector --cli node dist/index.js \\
      --method tools/list`,
      },
    ],
    faqs: [
      { question: "Should every push to main deploy automatically?", answer: "For a single-maintainer or low-risk server, yes. For anything customer-facing, most teams add a required manual approval step (GitHub Environments support this) before the deploy job runs." },
      { question: "How are secrets kept out of logs?", answer: "GitHub Actions automatically masks any string that matches a configured secret's value in the workflow logs, but only if it's referenced through secrets. - never echo a secret into a shell variable and print that instead." },
      { question: "Can this workflow deploy to multiple regions?", answer: "Yes - add a matrix strategy over your target regions, or split the deploy step into parallel jobs, each with its own region-specific credentials." },
    ],
    citations: [officialCitations.githubActions, officialCitations.mcp],
    related: ["/docs/deployment", "/docs/development/testing-strategies", "/docs/deployment/aws-ec2-deployment"],
  }),
  page({
    slug: ["development", "bigquery-integration"],
    title: "Building a BigQuery MCP Server",
    description: "Let AI agents run parameterized BigQuery queries safely, with cost controls and partition-aware guidance.",
    category: "development",
    cluster: "bigquery-integration",
    tags: ["bigquery", "analytics", "google-cloud"],
    targetKeywords: ["bigquery mcp server", "mcp bigquery integration", "ai agent bigquery"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "monthly",
    directAnswer: "A BigQuery MCP server exposes a tool that runs parameterized SQL through the official @google-cloud/bigquery client, with query cost and row limits enforced before execution rather than trusted to the model.",
    keyTakeaways: [
      "Use parameterized queries (query_params), never string-interpolated SQL, to avoid injection through model-generated input.",
      "Set maximumBytesBilled to cap the cost of any single query the model can trigger.",
      "Favor partitioned and clustered tables - BigQuery bills by bytes scanned, not rows returned, so an unfiltered query on a large table is expensive even if the result set is small.",
    ],
    sections: [
      {
        heading: "Why not just copy a reference implementation?",
        body: [
          "The official MCP servers repository is explicit about its own scope: \"The servers in this repository are intended as reference implementations to demonstrate MCP features and SDK usage... not as production-ready solutions.\" That's a reasonable design choice for an educational repo, but it means a naive tool built by following the same pattern typically has no cost cap, no read-only enforcement, and no row limit - exactly the three things a BigQuery tool needs given its per-byte billing model.",
        ],
      },
      {
        heading: "A cost-bounded query tool",
        body: [
          "The official @google-cloud/bigquery client supports parameterized queries and a maximumBytesBilled cap, which turns an open-ended 'let the model query the warehouse' tool into one with a hard cost ceiling per call.",
        ],
        code: `import { BigQuery } from "@google-cloud/bigquery";
import { z } from "zod";

const bigquery = new BigQuery({
  projectId: process.env.GCP_PROJECT_ID,
});

const QuerySchema = z.object({
  sql: z.string(),
  params: z.record(z.any()).optional(),
});

async function runBigQueryTool(args: unknown) {
  const { sql, params } = QuerySchema.parse(args);

  if (/\\b(INSERT|UPDATE|DELETE|DROP|MERGE)\\b/i.test(sql)) {
    throw new Error("Only SELECT queries are permitted through this tool.");
  }

  const [job] = await bigquery.createQueryJob({
    query: sql,
    params,
    maximumBytesBilled: "1000000000", // 1 GB cap per query
    location: "asia-south1",
  });

  const [rows] = await job.getQueryResults({ maxResults: 200 });
  return rows;
}`,
      },
      {
        heading: "Partitioning and cost awareness",
        body: [
          "BigQuery's on-demand pricing bills per byte scanned. A time-partitioned table lets a WHERE clause on the partition column skip scanning irrelevant partitions entirely, which is usually the single biggest cost lever available - larger than query tuning elsewhere in the SQL.",
        ],
        table: table(
          ["Practice", "Effect"],
          [
            ["Filter on a partitioned date column", "Scans only matching partitions instead of the full table"],
            ["Cluster by frequently-filtered columns", "Prunes blocks within a partition, reducing bytes read further"],
            ["Cap maximumBytesBilled per call", "Query fails before running if it would exceed the cap, instead of billing silently"],
          ],
        ),
      },
    ],
    faqs: [
      { question: "Can the model write arbitrary SQL?", answer: "It can write SELECT statements, but the tool should reject any DDL/DML keywords before sending the query to BigQuery, since a model producing occasionally-wrong SQL is a normal failure mode, not an edge case." },
      { question: "Does query caching help with repeated model queries?", answer: "Yes - BigQuery caches identical query results for a period by default, so a model re-running the same exploratory query typically isn't billed twice." },
      { question: "What region should queries run in?", answer: "Run the query in the same region as the dataset. Cross-region queries either fail or require an explicit cross-region configuration, and add latency either way." },
    ],
    citations: [officialCitations.bigquery, officialCitations.mcp, officialCitations.mcpReferenceServers],
    related: ["/docs/servers/postgres-mcp-server", "/docs/development/testing-strategies", "/docs/monitoring/prometheus-metrics"],
  }),
  page({
    slug: ["deployment", "terraform-infrastructure"],
    title: "Managing Infrastructure with a Terraform MCP Server",
    description: "Let an AI agent propose Terraform plans for review, with apply gated behind explicit human approval and a working-directory allowlist.",
    category: "deployment",
    cluster: "terraform-infrastructure",
    tags: ["terraform", "infrastructure-as-code", "deployment"],
    targetKeywords: ["terraform mcp server", "mcp infrastructure as code", "ai terraform"],
    schemaType: "HowTo",
    priority: 0.75,
    changefreq: "monthly",
    directAnswer: "A Terraform MCP server should expose a read-only plan tool freely, but gate apply behind an explicit approval flag and a working-directory allowlist, since an AI agent proposing infrastructure changes is very different from one being allowed to apply them unsupervised.",
    keyTakeaways: [
      "Never let a tool call both plan and apply in one turn - the plan output needs a human to actually read it first.",
      "Wrap the Terraform CLI via a child process; there is no official Terraform Node.js SDK, so this is the standard integration pattern.",
      "Restrict which directories the server can operate in with an explicit allowlist, so a model can't be steered into running terraform against an unintended state file.",
    ],
    sections: [
      {
        heading: "A plan-then-apply tool pair",
        body: [
          "Terraform has no first-party SDK - the CLI itself is the interface, so the server wraps it with a child process. Keep plan and apply as two separate tools: plan is safe to call freely since it's read-only, while apply requires an explicit approved: true argument the model can only set after showing the plan output to the user and getting confirmation.",
        ],
        code: `import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);
const ALLOWED_DIRS = (process.env.TERRAFORM_ALLOWED_DIRS ?? "").split(",").filter(Boolean);

function assertAllowedDir(workingDir: string) {
  const resolved = path.resolve(workingDir);
  const ok = ALLOWED_DIRS.some((dir) => resolved.startsWith(path.resolve(dir)));
  if (!ok) throw new Error(\`\${workingDir} is not in TERRAFORM_ALLOWED_DIRS\`);
}

async function terraformPlan(workingDir: string) {
  assertAllowedDir(workingDir);
  const { stdout } = await execFileAsync("terraform", ["plan", "-no-color", "-input=false"], {
    cwd: workingDir,
    timeout: 120_000,
  });
  return stdout;
}

async function terraformApply(workingDir: string, approved: boolean) {
  assertAllowedDir(workingDir);
  if (!approved) {
    throw new Error("apply requires approved: true - show the plan to the user and get confirmation first.");
  }
  const { stdout } = await execFileAsync("terraform", ["apply", "-auto-approve", "-no-color", "-input=false"], {
    cwd: workingDir,
    timeout: 600_000,
  });
  return stdout;
}`,
      },
      {
        heading: "State locking and blast radius",
        body: [
          "Use a remote backend (S3 with a DynamoDB lock table, or Terraform Cloud) so concurrent applies fail loudly with a lock error instead of corrupting state. For an AI-proposed change, prefer -target to scope an apply to the specific resource under discussion rather than the whole configuration, keeping blast radius small if the model's reasoning about the change was wrong.",
        ],
      },
    ],
    faqs: [
      { question: "Should apply ever run without a human approving first?", answer: "Not for anything touching production. A non-production sandbox environment with its own isolated state file is the reasonable place to allow fully automated applies." },
      { question: "What stops the model from just editing the .tf files to remove restrictions?", answer: "Nothing at the Terraform layer - that has to be enforced by not giving the MCP server (or the model) filesystem write access to the .tf files themselves, only to running plan/apply against them." },
      { question: "Does this need the Terraform Cloud API instead of the CLI?", answer: "Not necessarily. Terraform Cloud has its own REST API for remote runs, which is an alternative to CLI-wrapping if you're already using it, but the CLI approach works with any backend." },
    ],
    citations: [officialCitations.terraform, officialCitations.mcp],
    related: ["/docs/deployment/kubernetes-deployment", "/docs/deployment", "/docs/development/error-handling"],
  }),
  page({
    slug: ["monitoring", "datadog-integration"],
    title: "Query Datadog Metrics and Logs from an MCP Server",
    description: "Expose Datadog metric queries and log search as MCP tools, with both an API key and an application key.",
    category: "monitoring",
    cluster: "datadog-integration",
    tags: ["datadog", "observability", "logs"],
    targetKeywords: ["datadog mcp", "mcp datadog integration", "ai datadog queries"],
    schemaType: "TechArticle",
    priority: 0.7,
    changefreq: "monthly",
    directAnswer: "A Datadog MCP server uses the official @datadog/datadog-api-client SDK, authenticated with both an API key and an application key, to expose metric queries and log search as read-only tools.",
    keyTakeaways: [
      "Datadog requires two credentials, not one: an API key identifies the account, an application key authorizes the specific API call.",
      "Metric and log-search endpoints are rate-limited separately from each other, so cache repeated queries within a session where possible.",
      "Keep the tool read-only - dashboard and monitor mutation endpoints exist in the same client and should not be wired up without a separate approval step.",
    ],
    sections: [
      {
        heading: "Querying metrics and logs",
        body: [
          "The v1.MetricsApi and v1.LogsApi clients from @datadog/datadog-api-client cover the two most common agent requests: a time-series metric query and a log search. Both need explicit from/to time bounds - an unbounded query is the easiest way to accidentally scan a huge amount of data.",
        ],
        code: `import { client, v1 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration({
  authMethods: {
    apiKeyAuth: process.env.DD_API_KEY!,
    appKeyAuth: process.env.DD_APP_KEY!,
  },
});

const metricsApi = new v1.MetricsApi(configuration);
const logsApi = new v1.LogsApi(configuration);

async function queryMetrics(query: string, fromSeconds: number, toSeconds: number) {
  return metricsApi.queryMetrics({ query, from: fromSeconds, to: toSeconds });
}

async function searchLogs(query: string, from: string, to: string, limit = 100) {
  return logsApi.listLogs({
    body: { filter: { query, from, to }, page: { limit }, sort: "-timestamp" },
  });
}`,
      },
    ],
    faqs: [
      { question: "What's the difference between the API key and the application key?", answer: "The API key identifies which Datadog account is being billed; the application key authorizes what that specific integration is allowed to call. Both are required together for most endpoints." },
      { question: "Can this tool trigger or acknowledge alerts?", answer: "The client supports it via v1.MonitorsApi, but that's a write operation and should be a separate, explicitly-approved tool rather than bundled with read-only queries." },
      { question: "Is there an India-region Datadog deployment?", answer: "Datadog's regions are US and EU; there is no dedicated India region as of this writing, which is worth factoring into a DPDP-sensitive monitoring setup." },
    ],
    citations: [officialCitations.datadog, officialCitations.mcp],
    related: ["/docs/monitoring/prometheus-metrics", "/docs/monitoring/grafana-dashboard", "/docs/monitoring"],
  }),
  page({
    slug: ["monitoring", "newrelic-integration"],
    title: "Query New Relic with NRQL from an MCP Server",
    description: "Run NRQL queries against New Relic's NerdGraph API from an MCP tool, for APM and infrastructure telemetry.",
    category: "monitoring",
    cluster: "newrelic-integration",
    tags: ["newrelic", "nrql", "apm"],
    targetKeywords: ["new relic mcp", "nrql mcp server", "mcp apm integration"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "monthly",
    directAnswer: "A New Relic MCP server sends NRQL queries through NerdGraph, New Relic's GraphQL API, authenticated with a User API key and scoped to a specific account ID.",
    keyTakeaways: [
      "NRQL is SQL-like but specific to New Relic's event data model - FACET for grouping and SINCE/UNTIL for time windows are the two clauses used most often.",
      "All access goes through one GraphQL endpoint (NerdGraph), not a REST API with multiple paths.",
      "Every query needs an account ID - a single API key can have access to multiple accounts.",
    ],
    sections: [
      {
        heading: "Sending an NRQL query through NerdGraph",
        body: [
          "There's no dedicated New Relic Node SDK for this - NerdGraph is just GraphQL over HTTPS, so a plain fetch with the query embedded in the GraphQL body is the standard approach.",
        ],
        code: `async function runNrql(accountId: number, nrql: string) {
  const response = await fetch("https://api.newrelic.com/graphql", {
    method: "POST",
    headers: {
      "Api-Key": process.env.NEW_RELIC_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: \`query($accountId: Int!, $nrql: Nrql!) {
        actor {
          account(id: $accountId) {
            nrql(query: $nrql) { results }
          }
        }
      }\`,
      variables: { accountId, nrql },
    }),
  });

  const { data, errors } = await response.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data.actor.account.nrql.results;
}

// Example: average transaction duration, last hour
await runNrql(accountId, "SELECT average(duration) FROM Transaction SINCE 1 hour ago");`,
      },
    ],
    faqs: [
      { question: "How is NRQL different from PromQL?", answer: "NRQL reads like SQL (SELECT ... FROM ... WHERE ... FACET ... SINCE) over New Relic's stored events, while PromQL is a functional expression language over Prometheus's in-memory time series. They aren't interchangeable syntax." },
      { question: "What permissions does the API key need?", answer: "A User API key with at least data-read access to the target account is enough for query-only tools." },
      { question: "Can one query span multiple accounts?", answer: "A single NRQL call is scoped to one account ID. Querying multiple accounts means multiple calls, one per account." },
    ],
    citations: [officialCitations.newrelic, officialCitations.mcp],
    related: ["/docs/monitoring/datadog-integration", "/docs/monitoring/prometheus-metrics", "/docs/monitoring"],
  }),
  page({
    slug: ["monitoring", "splunk-search"],
    title: "Run Splunk Searches from an MCP Server",
    description: "Execute SPL searches against Splunk's REST API as an MCP tool, handling the asynchronous create-poll-retrieve job lifecycle.",
    category: "monitoring",
    cluster: "splunk-search",
    tags: ["splunk", "spl", "log-search"],
    targetKeywords: ["splunk mcp", "mcp splunk integration", "spl search ai agent"],
    schemaType: "HowTo",
    priority: 0.65,
    changefreq: "monthly",
    directAnswer: "Splunk searches run as asynchronous jobs through the REST API: create the job, poll its status until it reports done, then fetch results - a single blocking HTTP call is not enough on its own.",
    keyTakeaways: [
      "Splunk search jobs are asynchronous by default; exec_mode=blocking simplifies this to one call but still has its own timeout to manage.",
      "SPL pipes commands together with |, starting from an index filter and narrowing down - always scope to a specific index rather than searching all indexes.",
      "Always pass an explicit earliest_time - an unscoped search over all time on a large index is expensive and slow.",
    ],
    sections: [
      {
        heading: "Creating and reading a search job",
        body: [
          "With exec_mode set to blocking, the create call itself waits for the search to finish (up to its own timeout), which avoids a manual poll loop for most queries short enough to run inline.",
        ],
        code: `async function splunkSearch(query: string, earliestTime = "-1h", maxResults = 100) {
  const base = process.env.SPLUNK_URL!; // e.g. https://splunk.example.com:8089
  const auth = { Authorization: \`Bearer \${process.env.SPLUNK_TOKEN}\` };

  const createRes = await fetch(\`\${base}/services/search/jobs?output_mode=json\`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      search: \`search \${query}\`,
      earliest_time: earliestTime,
      latest_time: "now",
      max_count: String(maxResults),
      exec_mode: "blocking",
    }),
  });
  const { sid } = await createRes.json();

  const resultsRes = await fetch(
    \`\${base}/services/search/jobs/\${sid}/results?output_mode=json\`,
    { headers: auth },
  );
  const { results } = await resultsRes.json();
  return results;
}

// Example: SPL scoped to one index with a time bound
await splunkSearch('index=web status=5* | stats count by uri_path', "-1h");`,
      },
    ],
    faqs: [
      { question: "What if a search takes longer than the HTTP timeout?", answer: "Fall back to exec_mode=normal: create the job, poll GET /services/search/jobs/{sid} until dispatchState is DONE, then fetch results separately." },
      { question: "Should the tool allow arbitrary SPL?", answer: "Reject searches that omit an index= filter and cap earliest_time to a reasonable maximum lookback, the same way an unscoped SQL query would be rejected by a database tool." },
      { question: "How is authentication set up?", answer: "Generate a token via Splunk's token-based auth (Settings > Tokens) rather than passing a username/password on every request." },
    ],
    citations: [officialCitations.splunk, officialCitations.mcp],
    related: ["/docs/monitoring/datadog-integration", "/docs/monitoring", "/docs/development/error-handling"],
  }),
  page({
    slug: ["development", "clickhouse-integration"],
    title: "Building a ClickHouse MCP Server",
    description: "Query a ClickHouse columnar warehouse from an MCP tool, with an enforced row limit and read-only guardrails.",
    category: "development",
    cluster: "clickhouse-integration",
    tags: ["clickhouse", "analytics", "olap"],
    targetKeywords: ["clickhouse mcp server", "mcp clickhouse integration", "ai olap queries"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "monthly",
    directAnswer: "A ClickHouse MCP server uses the official @clickhouse/client package to run read-only SQL over the HTTP interface, with an enforced LIMIT so a model-generated query can't return an unbounded result set.",
    keyTakeaways: [
      "ClickHouse is column-oriented - selecting only the columns actually needed matters far more for performance than in a row-oriented database.",
      "Append a LIMIT to any query that doesn't already have one before executing it, rather than trusting the model to include one.",
      "Reject INSERT/ALTER/DROP the same way a read-only Postgres tool would - ingestion belongs in a dedicated pipeline, not a query tool.",
    ],
    sections: [
      {
        heading: "Why not just copy a reference implementation?",
        body: [
          "The official MCP servers repository states its own scope plainly: \"The servers in this repository are intended as reference implementations to demonstrate MCP features and SDK usage... not as production-ready solutions.\" A tool built by following that same educational pattern against ClickHouse typically has no row cap and no rejection of write statements - both are added explicitly below, not inherited for free from the SDK.",
        ],
      },
      {
        heading: "A row-limited query tool",
        body: [
          "The @clickhouse/client package's query() method returns a stream-like result you resolve to JSON; wrapping every query with a LIMIT check before execution keeps a single bad query from returning millions of rows to the model.",
        ],
        code: `import { createClient } from "@clickhouse/client";

const client = createClient({
  url: process.env.CLICKHOUSE_URL ?? "http://localhost:8123",
  username: process.env.CLICKHOUSE_USER,
  password: process.env.CLICKHOUSE_PASSWORD,
});

async function runQuery(sql: string, maxRows = 500) {
  if (/\\b(INSERT|ALTER|DROP|TRUNCATE)\\b/i.test(sql)) {
    throw new Error("Only SELECT queries are permitted through this tool.");
  }
  const bounded = /LIMIT\\s+\\d+/i.test(sql) ? sql : \`\${sql} LIMIT \${maxRows}\`;

  const resultSet = await client.query({ query: bounded, format: "JSONEachRow" });
  return resultSet.json();
}`,
      },
    ],
    faqs: [
      { question: "Why not just use the Postgres pattern for this?", answer: "The safety pattern (parameterize, cap rows, reject writes) is the same, but ClickHouse's performance characteristics differ enough - column selection and partition filtering matter far more here - that it's worth documenting separately." },
      { question: "Does ClickHouse support parameterized queries?", answer: "Yes, via query_params in the client options, which should be used for any user- or model-supplied filter values instead of string-interpolating them into the SQL." },
      { question: "What's a reasonable default row limit?", answer: "A few hundred rows is usually enough context for a model; anything larger is better summarized with an aggregation query than returned raw." },
    ],
    citations: [officialCitations.clickhouse, officialCitations.mcp, officialCitations.mcpReferenceServers],
    related: ["/docs/development/bigquery-integration", "/docs/development/snowflake-integration", "/docs/development/testing-strategies"],
  }),
  page({
    slug: ["development", "snowflake-integration"],
    title: "Building a Snowflake MCP Server",
    description: "Query a Snowflake warehouse from an MCP tool, with a bounded row count and awareness of per-second compute billing.",
    category: "development",
    cluster: "snowflake-integration",
    tags: ["snowflake", "data-warehouse", "sql"],
    targetKeywords: ["snowflake mcp server", "mcp snowflake integration", "ai snowflake queries"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "monthly",
    directAnswer: "A Snowflake MCP server uses the official snowflake-sdk driver to run read-only SQL, with results capped after retrieval since Snowflake bills by warehouse compute time rather than bytes scanned like BigQuery.",
    keyTakeaways: [
      "Snowflake bills by warehouse size times time running, not by query - a small warehouse left running idle costs the same as one running a query.",
      "The Node driver uses a callback-based execute() API, not promises natively - wrap it once in a helper rather than repeating the callback pattern per tool.",
      "Use SHOW and DESCRIBE commands for schema discovery instead of querying INFORMATION_SCHEMA directly - they're the idiomatic Snowflake approach and avoid a full metadata scan.",
    ],
    sections: [
      {
        heading: "Why not just copy a reference implementation?",
        body: [
          "The official MCP servers repository is upfront about its purpose: \"The servers in this repository are intended as reference implementations to demonstrate MCP features and SDK usage... not as production-ready solutions.\" That pattern, applied to Snowflake, means no write-statement rejection and no bound on how many rows come back - both are handled explicitly in the helper below rather than assumed.",
        ],
      },
      {
        heading: "A promise-wrapped query helper",
        body: [
          "snowflake-sdk's connection.execute() takes a completion callback rather than returning a promise, so the first thing worth writing is a thin wrapper that turns it into one the rest of the tool code can await normally.",
        ],
        code: `import snowflake from "snowflake-sdk";

const connection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT!,
  username: process.env.SNOWFLAKE_USER!,
  password: process.env.SNOWFLAKE_PASSWORD!,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE ?? "COMPUTE_WH",
  database: process.env.SNOWFLAKE_DATABASE,
});

function execute(sqlText: string, binds: unknown[] = []): Promise<Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText,
      binds: binds as snowflake.Binds,
      complete: (err, _stmt, rows) => (err ? reject(err) : resolve(rows ?? [])),
    });
  });
}

async function queryTool(sql: string) {
  if (/\\b(INSERT|UPDATE|DELETE|DROP|MERGE)\\b/i.test(sql)) {
    throw new Error("Only SELECT queries are permitted through this tool.");
  }
  const rows = await execute(sql);
  return rows.slice(0, 200);
}`,
      },
    ],
    faqs: [
      { question: "Should the tool be able to switch warehouses?", answer: "Only within an explicit allowlist of non-production warehouse names - letting a model freely USE WAREHOUSE means it can pick an oversized one and drive up compute cost." },
      { question: "How does this differ from the BigQuery approach?", answer: "BigQuery bills per byte scanned regardless of how long the warehouse runs, so BigQuery's guardrail is a bytes cap. Snowflake bills per second the warehouse is active, so the guardrail is closer to a query timeout plus using the smallest workable warehouse size." },
      { question: "Does Snowflake support query result caching like BigQuery?", answer: "Yes - Snowflake caches identical query results for 24 hours by default, and a cached result doesn't consume warehouse compute time." },
    ],
    citations: [officialCitations.snowflake, officialCitations.mcp, officialCitations.mcpReferenceServers],
    related: ["/docs/development/bigquery-integration", "/docs/development/clickhouse-integration", "/docs/development/testing-strategies"],
  }),
  page({
    slug: ["development", "elasticsearch-integration"],
    title: "Building an Elasticsearch MCP Server",
    description: "Expose full-text search over Elasticsearch as an MCP tool, restricted to search-only queries against a fixed set of indices.",
    category: "development",
    cluster: "elasticsearch-integration",
    tags: ["elasticsearch", "full-text-search", "search"],
    targetKeywords: ["elasticsearch mcp server", "mcp elasticsearch integration", "ai full text search"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "monthly",
    directAnswer: "An Elasticsearch MCP server uses the official @elastic/elasticsearch client to run search queries via the Query DSL, restricted to a fixed list of indices and forbidding any query that would delete or modify documents.",
    keyTakeaways: [
      "Restrict the tool to a fixed, server-side list of allowed indices - never let a model-supplied index name reach the client unchecked.",
      "Use the _search endpoint exclusively; the client can also delete indices and documents, so those methods should never be wired into the tool at all.",
      "A match query is usually the right default for natural-language search; reserve term queries for exact-value filters like status codes or IDs.",
    ],
    sections: [
      {
        heading: "Why not just copy a reference implementation?",
        body: [
          "The official MCP servers repository says directly: \"The servers in this repository are intended as reference implementations to demonstrate MCP features and SDK usage... not as production-ready solutions.\" Applied naively to Elasticsearch, that pattern would wire up the full client - including delete and index-management methods - rather than the search-only surface used below.",
        ],
      },
      {
        heading: "A restricted search tool",
        body: [
          "The official client exposes the full Elasticsearch API, including destructive operations, so the safety boundary here is which client methods the tool code calls - only .search() - combined with validating the requested index against an allowlist before the call is made.",
        ],
        code: `import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env.ELASTICSEARCH_URL!,
  auth: { apiKey: process.env.ELASTICSEARCH_API_KEY! },
});

const ALLOWED_INDICES = (process.env.ELASTICSEARCH_ALLOWED_INDICES ?? "").split(",").filter(Boolean);

async function searchTool(index: string, query: string, size = 20) {
  if (!ALLOWED_INDICES.includes(index)) {
    throw new Error(\`Index "\${index}" is not in the allowed list.\`);
  }

  const result = await client.search({
    index,
    query: { match: { content: query } },
    size,
  });

  return result.hits.hits.map((hit) => ({ score: hit._score, ...hit._source as object }));
}`,
      },
    ],
    faqs: [
      { question: "Can this tool be used for log analysis like Splunk or Datadog?", answer: "Yes - Elasticsearch (often paired with Kibana as the ELK stack) is a common log-analytics backend. The pattern is the same: restrict to search, scope to specific indices, and add a time-range filter for log-style data." },
      { question: "What happens if the model asks for an index that doesn't exist?", answer: "The allowlist check happens before the search call, so an unlisted index is rejected with a clear error rather than reaching Elasticsearch and returning an ambiguous 404." },
      { question: "Should fuzzy matching be enabled by default?", answer: "It depends on the data - fuzzy matching helps with typos in natural-language queries but can also return lower-relevance false positives. Start with exact match and add fuzziness only if search results seem too narrow." },
    ],
    citations: [officialCitations.elasticsearch, officialCitations.mcp, officialCitations.mcpReferenceServers],
    related: ["/docs/development/clickhouse-integration", "/docs/monitoring/splunk-search", "/docs/development/testing-strategies"],
  }),
  page({
    slug: ["development", "supabase-integration"],
    title: "Building a Supabase MCP Server",
    description: "Query Supabase's hosted Postgres through its client library as an MCP tool, scoped with row-level security rather than the service-role key.",
    category: "development",
    cluster: "supabase-integration",
    tags: ["supabase", "postgres", "backend-as-a-service"],
    targetKeywords: ["supabase mcp server", "mcp supabase integration", "ai supabase queries"],
    schemaType: "TechArticle",
    priority: 0.65,
    changefreq: "monthly",
    directAnswer: "A Supabase MCP server should authenticate with the anon key and rely on the project's row-level security policies to scope what data is reachable, rather than using the service-role key, which bypasses RLS entirely.",
    keyTakeaways: [
      "Supabase is Postgres underneath - the same parameterized-query and read-only discipline that applies to a plain Postgres MCP server applies here too.",
      "The service-role key bypasses row-level security entirely - using it in an MCP tool means the model can see every row in every table, regardless of any RLS policy.",
      "Prefer the anon key plus RLS policies scoped to a dedicated read-only database role, so access control is enforced by Postgres itself, not just by the tool's application code.",
    ],
    sections: [
      {
        heading: "Why not just copy a reference implementation?",
        body: [
          "The official MCP servers repository states plainly: \"The servers in this repository are intended as reference implementations to demonstrate MCP features and SDK usage... not as production-ready solutions.\" The easiest way to build a Supabase tool the same way is to reach for the service-role key because it \"just works\" past RLS - which is exactly the shortcut avoided below.",
        ],
      },
      {
        heading: "Querying through the client, not raw SQL",
        body: [
          "The supabase-js client's query builder (.from().select().match()) is the idiomatic interface and composes cleanly with RLS. Reaching for supabase.rpc() to run arbitrary SQL should be avoided for the same reason string-interpolated SQL is avoided in a plain Postgres tool.",
        ],
        code: `import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!, // not the service-role key
);

async function queryTable(table: string, filters: Record<string, string>, limit = 100) {
  const ALLOWED_TABLES = ["products", "orders", "support_tickets"];
  if (!ALLOWED_TABLES.includes(table)) {
    throw new Error(\`Table "\${table}" is not exposed to this tool.\`);
  }

  let query = supabase.from(table).select("*").limit(limit);
  for (const [column, value] of Object.entries(filters)) {
    query = query.eq(column, value);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}`,
      },
    ],
    faqs: [
      { question: "Why avoid the service-role key entirely?", answer: "It's designed for trusted server-side code that intentionally needs to bypass RLS - an AI agent generating queries from user input is exactly the kind of untrusted caller RLS exists to constrain." },
      { question: "Does this tool need its own Postgres role, separate from the app's normal RLS policies?", answer: "It's worth considering a dedicated read-only role with its own narrower RLS policies specifically for the MCP tool, rather than reusing whatever policies were written for the main application's authenticated users." },
      { question: "Can this same approach reach Supabase's realtime or storage features?", answer: "The client also supports realtime subscriptions and file storage, but those are separate concerns from a query tool - a realtime feed doesn't fit the request-response shape of an MCP tool call well and would need a different pattern." },
    ],
    citations: [officialCitations.supabase, officialCitations.mcp, officialCitations.mcpReferenceServers],
    related: ["/docs/servers/postgres-mcp-server", "/docs/security/authentication", "/docs/development/testing-strategies"],
  }),
  page({
    slug: ["development", "dynamodb-integration"],
    title: "Building a DynamoDB MCP Server",
    description: "Read items from DynamoDB with GetCommand and QueryCommand as MCP tools, and understand why Scan should stay out of the tool surface.",
    category: "development",
    cluster: "dynamodb-integration",
    tags: ["dynamodb", "aws", "nosql"],
    targetKeywords: ["dynamodb mcp server", "mcp dynamodb integration", "ai dynamodb queries"],
    schemaType: "TechArticle",
    priority: 0.6,
    changefreq: "monthly",
    directAnswer: "A DynamoDB MCP server should expose GetItem and Query, which use indexes and stay fast and cheap at any table size, while leaving out Scan, which reads the entire table and is the easiest way for a model-generated request to become slow and expensive.",
    keyTakeaways: [
      "Query requires a partition key and uses an index; Scan reads every item in the table regardless of filters applied afterward - the cost difference at scale is enormous.",
      "DynamoDB bills read/write capacity separately from storage, so an unbounded Scan tool is a direct, uncapped cost risk in a way a Query tool isn't.",
      "The DynamoDBDocumentClient wrapper handles marshalling JS types to DynamoDB's attribute-value format automatically, which the lower-level DynamoDBClient does not.",
    ],
    sections: [
      {
        heading: "Why not just copy a reference implementation?",
        body: [
          "The official MCP servers repository is explicit about this: \"The servers in this repository are intended as reference implementations to demonstrate MCP features and SDK usage... not as production-ready solutions.\" The AWS SDK makes ScanCommand exactly as easy to call as QueryCommand, so a tool built by following the SDK docs alone has no reason to leave it out - it's an explicit choice made below, not a default.",
        ],
      },
      {
        heading: "Get and Query, deliberately without Scan",
        body: [
          "DynamoDBDocumentClient.from() wraps the base client so tool code works with plain JS objects instead of DynamoDB's { S: \"value\" }-style attribute maps. Only GetCommand and QueryCommand are wired into tools here - ScanCommand exists in the SDK but is intentionally left unused.",
        ],
        code: `import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-south-1" });
const docClient = DynamoDBDocumentClient.from(client);

async function getItem(tableName: string, key: Record<string, string>) {
  const result = await docClient.send(new GetCommand({ TableName: tableName, Key: key }));
  return result.Item ?? null;
}

async function queryItems(tableName: string, partitionKey: string, partitionValue: string, limit = 50) {
  const result = await docClient.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "#pk = :pkval",
    ExpressionAttributeNames: { "#pk": partitionKey },
    ExpressionAttributeValues: { ":pkval": partitionValue },
    Limit: limit,
  }));
  return result.Items ?? [];
}`,
      },
    ],
    faqs: [
      { question: "What if the model needs to search by a non-key attribute?", answer: "Add a Global Secondary Index (GSI) on that attribute and query the GSI - that keeps the request an efficient Query instead of reaching for Scan." },
      { question: "Is Query always cheap regardless of result size?", answer: "It's cheap relative to Scan, but a Query without a Limit can still return a large result set - keep an explicit Limit and pass LastEvaluatedKey-based pagination back to the caller rather than looping internally." },
      { question: "Why use the DocumentClient instead of the base DynamoDBClient?", answer: "The base client requires manually specifying DynamoDB's typed attribute format ({ S: ... }, { N: ... }) for every value, which is easy to get wrong; the DocumentClient marshals plain JS objects automatically." },
    ],
    citations: [officialCitations.dynamodb, officialCitations.mcp, officialCitations.mcpReferenceServers],
    related: ["/docs/development/supabase-integration", "/docs/deployment/aws-ec2-deployment", "/docs/development/testing-strategies"],
  }),
];

export function getDocsPath(page: DocsPage): string {
  return `/docs/${page.slug.join("/")}`;
}

export function findDocsPage(slug: string[]): DocsPage | undefined {
  return docsPages.find((page) => page.slug.join("/") === slug.join("/"));
}
import { servers } from "./servers";
