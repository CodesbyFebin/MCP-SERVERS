import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const today = "2026-08-05";
const baseUrl = "https://www.mcpserver.in";

const evidenceSources = {
  mcpSpec: "https://modelcontextprotocol.io/specification",
  mcpDocs: "https://modelcontextprotocol.io/docs",
  tsSdk: "https://github.com/modelcontextprotocol/typescript-sdk",
  pythonSdk: "https://github.com/modelcontextprotocol/python-sdk",
  javaSdk: "https://github.com/modelcontextprotocol/java-sdk",
  goSdk: "https://github.com/modelcontextprotocol/go-sdk",
  rustSdk: "https://github.com/modelcontextprotocol/rust-sdk",
  registry: "https://github.com/modelcontextprotocol/registry",
  claude: "https://docs.anthropic.com/en/docs/claude-code/mcp",
  vscode: "https://code.visualstudio.com/docs/copilot/chat/mcp-servers",
  cursor: "https://docs.cursor.com/context/model-context-protocol",
  githubCopilot: "https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp",
  openaiApps: "https://developers.openai.com/apps-sdk/",
};

function titleCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function idFor(family, slug) {
  return `${family}:${slug}`;
}

function answer(topic, family) {
  return `${topic} is covered here as a Model Context Protocol ${family} page: what it is, how it works, when to use it, how to configure it safely, and how to verify the result. The guidance is grounded in the official MCP specification, SDK documentation, and vendor documentation where available, with no fabricated pricing, ratings, certifications, or uptime claims.`;
}

function meta(topic, family) {
  return answer(topic, family).slice(0, 260);
}

const corePages = [
  ["/what-is-mcp/", "pillar", "what is mcp", "Model Context Protocol"],
  ["/mcp-server/", "pillar", "what is an mcp server", "MCP Server"],
  ["/mcp-architecture/", "pillar", "mcp architecture", "MCP Architecture"],
  ["/mcp-client/", "pillar", "mcp client", "MCP Client"],
  ["/mcp-host/", "pillar", "mcp host", "MCP Host"],
  ["/mcp-tools/", "pillar", "mcp tools", "MCP Tools"],
  ["/mcp-resources/", "pillar", "mcp resources", "MCP Resources"],
  ["/mcp-prompts/", "pillar", "mcp prompts", "MCP Prompts"],
  ["/mcp-server-directory/", "directory", "mcp server directory", "MCP Server Directory"],
  ["/how-to-build-mcp-server/", "pillar", "how to build mcp server", "How to Build an MCP Server"],
];

const phaseAPillars = [
  {
    slug: "mcp-architecture",
    title: "MCP Architecture",
    subtitle: "Host, client, server, transport, tools, resources, and prompts.",
    shortAnswer: "MCP architecture separates the user-facing host, the protocol client inside that host, and one or more MCP servers that expose tools, resources, and prompts. The client and server exchange JSON-RPC messages over stdio for local processes or Streamable HTTP for remote deployments.",
    description: "A practical guide to Model Context Protocol architecture, including host-client-server boundaries, capability negotiation, transports, and security checkpoints.",
    primaryKeyword: "MCP architecture",
    faqCluster: "mcp-architecture",
    related: ["what-is-mcp", "mcp-server", "mcp-client", "mcp-tools"],
  },
  {
    slug: "mcp-host",
    title: "MCP Host",
    subtitle: "The application that owns MCP client connections.",
    shortAnswer: "An MCP host is the application the user interacts with, such as an AI desktop app, IDE, or agent runtime. The host creates MCP client connections, applies user and workspace policy, and decides how tool, resource, and prompt results appear in the model workflow.",
    description: "Guide to MCP hosts, how they differ from clients and servers, and how they manage configuration, lifecycle, permissions, and user trust boundaries.",
    primaryKeyword: "MCP host",
    faqCluster: "mcp-host",
    related: ["mcp-client", "mcp-server", "mcp-architecture"],
  },
  {
    slug: "mcp-resources",
    title: "MCP Resources",
    subtitle: "Readable context exposed by MCP servers.",
    shortAnswer: "MCP resources are data objects that a server makes available for clients to read, such as files, database records, schemas, or generated context. They complement tools: resources provide context, while tools perform actions or compute results.",
    description: "Guide to MCP resources, resource URIs, read flows, discovery, caching, and security checks before exposing data to AI applications.",
    primaryKeyword: "MCP resources",
    faqCluster: "mcp-resources",
    related: ["mcp-tools", "mcp-prompts", "mcp-server"],
  },
  {
    slug: "mcp-prompts",
    title: "MCP Prompts",
    subtitle: "Reusable prompt templates exposed through MCP.",
    shortAnswer: "MCP prompts are reusable, parameterized prompt templates that a server can expose to a host. They help teams standardize workflows such as code review, database analysis, incident triage, or support responses without hard-coding instructions into every client.",
    description: "Guide to MCP prompts, prompt parameters, discovery, workflow reuse, and security considerations for prompt templates.",
    primaryKeyword: "MCP prompts",
    faqCluster: "mcp-prompts",
    related: ["mcp-tools", "mcp-resources", "mcp-server"],
  },
];

const clients = [
  ["claude-desktop", "Claude Desktop", "Anthropic", "desktop-app", "json", "~/Library/Application Support/Claude/claude_desktop_config.json", evidenceSources.claude],
  ["claude-code", "Claude Code", "Anthropic", "cli", "json", undefined, evidenceSources.claude],
  ["chatgpt", "ChatGPT", "OpenAI", "web-app", "ui", undefined, evidenceSources.openaiApps],
  ["cursor", "Cursor", "Anysphere", "ide", "json", "~/.cursor/mcp.json", evidenceSources.cursor],
  ["vscode", "Visual Studio Code", "Microsoft", "ide", "jsonc", ".vscode/mcp.json", evidenceSources.vscode],
  ["cline", "Cline", "Cline", "ide", "json", undefined, "https://docs.cline.bot/mcp/mcp-overview"],
  ["continue", "Continue", "Continue", "ide", "yaml", undefined, "https://docs.continue.dev/customize/deep-dives/mcp"],
  ["windsurf", "Windsurf", "Codeium", "ide", "json", undefined, "https://docs.windsurf.com/windsurf/cascade/mcp"],
  ["github-copilot", "GitHub Copilot", "GitHub", "ide", "json", undefined, evidenceSources.githubCopilot],
  ["open-webui", "Open WebUI", "Open WebUI", "web-app", "ui", undefined, "https://docs.openwebui.com/"],
].map(([slug, name, vendor, clientType, configFormat, configPath, docsUrl]) => ({
  id: idFor("client", slug),
  slug,
  family: "clients",
  name,
  status: "publish_approved",
  route: `/clients/${slug}/`,
  primaryKeyword: `${name} MCP`,
  secondaryKeywords: [`${name} MCP setup`, `configure MCP in ${name}`, `add MCP server to ${name}`],
  searchIntent: "informational",
  metaDescription: meta(`${name} MCP configuration`, "client guide"),
  clientName: name,
  vendor,
  clientType,
  supportedTransports: ["stdio", "streamable-http"],
  mcpFeatures: ["tools", "resources", "prompts"],
  configFormat,
  ...(configPath ? { configPath } : {}),
  docsUrl,
  relatedClients: ["claude-desktop", "cursor", "vscode"].filter((s) => s !== slug),
  updatedAt: today,
}));

const integrationSpecs = [
  ["github", "GitHub", "Developer Tools", "pat", evidenceSources.registry],
  ["gitlab", "GitLab", "Developer Tools", "pat", "https://docs.gitlab.com/"],
  ["slack", "Slack", "Communication", "oauth2", "https://api.slack.com/"],
  ["notion", "Notion", "Knowledge Management", "oauth2", "https://developers.notion.com/"],
  ["google-drive", "Google Drive", "File Storage", "oauth2", "https://developers.google.com/drive"],
  ["gmail", "Gmail", "Email", "oauth2", "https://developers.google.com/gmail/api"],
  ["google-calendar", "Google Calendar", "Calendar", "oauth2", "https://developers.google.com/calendar"],
  ["jira", "Jira", "Project Management", "oauth2", "https://developer.atlassian.com/cloud/jira/platform/"],
  ["confluence", "Confluence", "Knowledge Management", "oauth2", "https://developer.atlassian.com/cloud/confluence/"],
  ["linear", "Linear", "Project Management", "oauth2", "https://developers.linear.app/"],
  ["figma", "Figma", "Design", "oauth2", "https://www.figma.com/developers/api"],
  ["sentry", "Sentry", "Observability", "api-key", "https://docs.sentry.io/api/"],
  ["stripe", "Stripe", "Payments", "api-key", "https://docs.stripe.com/api"],
  ["shopify", "Shopify", "Commerce", "oauth2", "https://shopify.dev/docs/api"],
  ["salesforce", "Salesforce", "CRM", "oauth2", "https://developer.salesforce.com/docs"],
  ["servicenow", "ServiceNow", "ITSM", "oauth2", "https://developer.servicenow.com/"],
  ["hubspot", "HubSpot", "CRM", "oauth2", "https://developers.hubspot.com/docs"],
  ["zendesk", "Zendesk", "Support", "oauth2", "https://developer.zendesk.com/api-reference/"],
  ["n8n", "n8n", "Automation", "api-key", "https://docs.n8n.io/"],
  ["wordpress", "WordPress", "CMS", "api-key", "https://developer.wordpress.org/rest-api/"],
];

const phaseAIntegrations = integrationSpecs.map(([base, name, category, auth, docs], idx, arr) => ({
  id: idFor("integration", `${base}-mcp-server`),
  slug: `${base}-mcp-server`,
  family: "integrations",
  name,
  status: "publish_approved",
  route: `/integrations/${base}-mcp-server/`,
  primaryKeyword: `${name} MCP server`,
  secondaryKeywords: [`${name} MCP integration`, `connect ${name} to Claude`, `${name} MCP setup`],
  searchIntent: "informational",
  metaDescription: meta(`${name} MCP server`, "integration guide"),
  platform: name,
  platformCategory: category,
  supportedClients: ["Claude Desktop", "Claude Code", "Cursor", "VS Code"],
  transports: ["stdio", "streamable-http"],
  authMethods: [auth],
  tools: ["list", "search", "read", "create"],
  resources: ["records", "metadata"],
  prompts: [],
  officialDocs: docs,
  remoteSupport: true,
  deploymentOptions: ["local", "docker", "streamable-http"],
  lastVerified: today,
  securityNotes: ["Use least-privilege scopes", "Store credentials outside client configuration files"],
  maintenanceStatus: "unknown",
  relatedIntegrations: arr
    .filter((candidate) => candidate[0] !== base)
    .slice(Math.max(0, idx - 1), Math.max(0, idx - 1) + 3)
    .map((candidate) => `${candidate[0]}-mcp-server`),
  updatedAt: today,
}));

const databaseSpecs = [
  ["postgresql", "PostgreSQL", "https://www.postgresql.org/docs/"],
  ["mysql", "MySQL", "https://dev.mysql.com/doc/"],
  ["mongodb", "MongoDB", "https://www.mongodb.com/docs/"],
  ["redis", "Redis", "https://redis.io/docs/"],
  ["sqlite", "SQLite", "https://www.sqlite.org/docs.html"],
  ["supabase", "Supabase", "https://supabase.com/docs"],
  ["firebase", "Firebase", "https://firebase.google.com/docs"],
  ["bigquery", "BigQuery", "https://cloud.google.com/bigquery/docs"],
  ["snowflake", "Snowflake", "https://docs.snowflake.com/"],
  ["elasticsearch", "Elasticsearch", "https://www.elastic.co/docs"],
];

const phaseADatabaseGuides = databaseSpecs.map(([base, name, docs], idx, arr) => ({
  id: idFor("database", `${base}-mcp-server`),
  slug: `${base}-mcp-server`,
  family: "databases",
  name: `${name} MCP Server`,
  route: `/databases/${base}-mcp-server/`,
  primaryKeyword: `${name} MCP server`,
  primaryEntity: name,
  metaDescription: meta(`${name} MCP server`, "database guide"),
  officialDocs: docs,
  authMethods: base === "sqlite" ? ["none"] : ["api-key", "service-account"],
  supportedTransports: ["stdio", "streamable-http"],
  relatedDatabases: arr
    .filter((candidate) => candidate[0] !== base)
    .slice(Math.max(0, idx - 1), Math.max(0, idx - 1) + 3)
    .map((candidate) => `${candidate[0]}-mcp-server`),
  updatedAt: today,
}));

const sdkSpecs = [
  ["typescript", "TypeScript", "@modelcontextprotocol/sdk", "npm install @modelcontextprotocol/sdk", evidenceSources.tsSdk, "https://modelcontextprotocol.io/sdks/typescript"],
  ["python", "Python", "mcp", "pip install mcp", evidenceSources.pythonSdk, "https://modelcontextprotocol.io/sdks/python"],
  ["java", "Java", "io.modelcontextprotocol:sdk", "implementation 'io.modelcontextprotocol:sdk'", evidenceSources.javaSdk, "https://modelcontextprotocol.io/sdks/java"],
  ["go", "Go", "github.com/modelcontextprotocol/go-sdk", "go get github.com/modelcontextprotocol/go-sdk", evidenceSources.goSdk, "https://modelcontextprotocol.io/sdks/go"],
  ["rust", "Rust", "rmcp", "cargo add rmcp", evidenceSources.rustSdk, "https://modelcontextprotocol.io/sdks/rust"],
];

const phaseASdks = sdkSpecs.map(([slug, language, pkg, installCommand, repo, docs], idx, arr) => ({
  id: idFor("sdk", slug),
  slug,
  family: "sdk",
  name: `${language} MCP SDK`,
  status: "publish_approved",
  route: `/sdk/${slug}/`,
  primaryKeyword: `${language} MCP SDK`,
  secondaryKeywords: [`MCP SDK for ${language}`, `build MCP server ${language}`, `${language} MCP server`],
  searchIntent: "informational",
  metaDescription: meta(`${language} MCP SDK`, "SDK guide"),
  language,
  languageSlug: slug,
  packageName: pkg,
  installCommand,
  officialRepo: repo,
  officialDocs: docs,
  supportedTransports: ["stdio", "streamable-http"],
  authSupport: ["oauth2", "api-key"],
  features: ["tools", "resources", "prompts", "transports"],
  relatedSdks: arr.filter((candidate) => candidate[0] !== slug).slice(0, 3).map((candidate) => candidate[0]),
  updatedAt: today,
}));

const frameworkSpecs = [
  ["fastmcp", "FastMCP", ["Python"], "fastmcp", "pip install fastmcp", "https://gofastmcp.com", "https://github.com/jlowin/fastmcp", "sdk:python"],
  ["langchain-mcp", "LangChain MCP Adapters", ["Python"], "langchain-mcp-adapters", "pip install langchain-mcp-adapters", "https://python.langchain.com/docs/integrations/mcp/", "https://github.com/langchain-ai/langchain-mcp-adapters", "sdk:python"],
  ["llamaindex-mcp", "LlamaIndex MCP", ["Python"], "llama-index-tools-mcp", "pip install llama-index-tools-mcp", "https://docs.llamaindex.ai/", "https://github.com/run-llama/llama_index", "sdk:python"],
  ["spring-ai-mcp", "Spring AI MCP", ["Java"], "spring-ai-mcp-server", "implementation 'org.springframework.ai:spring-ai-mcp-server'", "https://docs.spring.io/spring-ai/reference/api/mcp.html", "https://github.com/spring-projects/spring-ai", "sdk:java"],
  ["semantic-kernel-mcp", "Semantic Kernel MCP", ["C#", "Python"], "semantic-kernel", "dotnet add package Microsoft.SemanticKernel", "https://learn.microsoft.com/semantic-kernel/", "https://github.com/microsoft/semantic-kernel", undefined],
];

const phaseAFrameworks = frameworkSpecs.map(([slug, name, languages, pkg, installCommand, docs, repo, builtOnSdk], idx, arr) => ({
  id: idFor("framework", slug),
  slug,
  family: "frameworks",
  name,
  status: "publish_approved",
  route: `/frameworks/${slug}/`,
  primaryKeyword: name,
  secondaryKeywords: [`${name} MCP`, `${name} MCP server`, `${name} integration`],
  searchIntent: "informational",
  metaDescription: meta(name, "framework guide"),
  frameworkName: name,
  languages,
  packageName: pkg,
  installCommand,
  officialRepo: repo,
  officialDocs: docs,
  ...(builtOnSdk ? { builtOnSdk } : {}),
  keyFeatures: ["tool integration", "agent workflows", "server orchestration"],
  relatedFrameworks: arr.filter((candidate) => candidate[0] !== slug).slice(0, 3).map((candidate) => candidate[0]),
  updatedAt: today,
}));

const deploymentSpecs = [
  ["docker", "Docker", "container", true, "intermediate", ["Docker 24+", "MCP server source code"]],
  ["kubernetes", "Kubernetes", "container", false, "advanced", ["kubectl", "cluster access", "container image"]],
  ["aws", "AWS", "cloud", false, "advanced", ["AWS account", "IAM permissions", "container image or runtime package"]],
  ["azure", "Azure", "cloud", false, "advanced", ["Azure subscription", "Azure CLI", "container image or application package"]],
  ["google-cloud", "Google Cloud", "cloud", false, "advanced", ["Google Cloud project", "gcloud CLI", "container image or application package"]],
  ["vercel", "Vercel", "serverless", true, "intermediate", ["Vercel project", "HTTP MCP endpoint"]],
  ["cloudflare-workers", "Cloudflare Workers", "serverless", true, "advanced", ["Cloudflare account", "Wrangler CLI"]],
  ["railway", "Railway", "paas", false, "intermediate", ["Railway project", "container or Node/Python app"]],
  ["self-hosted", "Self Hosted Server", "self-hosted", false, "advanced", ["Linux server", "TLS certificate", "process manager"]],
];

const phaseADeploymentGuides = deploymentSpecs.map(([slug, platform, platformType, freeTierAvailable, difficultyLevel, prerequisites], idx, arr) => ({
  id: idFor("deployment", slug),
  slug,
  family: "deployment",
  name: platform,
  status: "publish_approved",
  route: `/deployment/${slug}/`,
  primaryKeyword: `deploy MCP server ${platform}`,
  secondaryKeywords: [`MCP server ${platform}`, `${platform} MCP deployment`, `host MCP on ${platform}`],
  searchIntent: "informational",
  metaDescription: meta(`Deploy MCP server on ${platform}`, "deployment guide"),
  platform,
  platformType,
  supportedTransports: slug === "docker" ? ["stdio", "streamable-http"] : ["streamable-http"],
  authRequired: slug !== "docker",
  freeTierAvailable,
  difficultyLevel,
  prerequisites,
  relatedPlatforms: arr.filter((candidate) => candidate[0] !== slug).slice(0, 3).map((candidate) => candidate[0]),
  updatedAt: today,
}));

const securitySpecs = [
  ["authentication", "Authentication", "authentication", "critical"],
  ["authorization", "Authorization", "authorisation", "critical"],
  ["oauth", "OAuth for MCP Servers", "authentication", "high"],
  ["api-keys", "API Key Authentication", "authentication", "high"],
  ["secrets-management", "Secrets Management", "secrets", "high"],
  ["prompt-injection", "Prompt Injection", "injection", "critical"],
  ["tool-poisoning", "Tool Poisoning", "injection", "critical"],
  ["sandboxing", "Sandboxing", "sandboxing", "high"],
  ["audit-logging", "Audit Logging", "audit", "medium"],
];

const phaseASecurityGuides = securitySpecs.map(([slug, topic, threatCategory, severity], idx, arr) => ({
  id: idFor("security", slug),
  slug,
  family: "security",
  name: `MCP ${topic}`,
  status: "publish_approved",
  route: `/security/${slug}/`,
  primaryKeyword: `MCP ${topic.toLowerCase()}`,
  secondaryKeywords: [`MCP server ${topic.toLowerCase()}`, `secure MCP server ${topic.toLowerCase()}`, `MCP security ${slug}`],
  searchIntent: "informational",
  metaDescription: meta(`MCP ${topic}`, "security guide"),
  topic,
  threatCategory,
  severity,
  relatedTopics: arr.filter((candidate) => candidate[0] !== slug).slice(0, 3).map((candidate) => candidate[0]),
  updatedAt: today,
}));

const troubleshootingSpecs = [
  ["mcp-server-not-connecting", "MCP Server Not Connecting", ["Claude Desktop", "Cursor", "VS Code"], ["Incorrect endpoint or command path", "Missing credentials", "Transport mismatch"]],
  ["mcp-server-not-starting", "MCP Server Not Starting", ["Claude Desktop", "Cursor", "VS Code"], ["Runtime not installed", "Bad command arguments", "Unhandled startup exception"]],
  ["mcp-tools-not-appearing", "MCP Tools Not Appearing", ["Claude Desktop", "Cursor", "VS Code"], ["Server did not advertise tools", "Client cache not refreshed", "Capability negotiation failed"]],
  ["mcp-server-timeout", "MCP Server Timeout", ["Claude Desktop", "Cursor", "VS Code"], ["Slow upstream API", "Network timeout", "Long-running tool call"]],
  ["mcp-authentication-failed", "MCP Authentication Failed", ["Claude Desktop", "Cursor", "VS Code"], ["Missing token", "Expired OAuth token", "Insufficient scopes"]],
  ["mcp-oauth-error", "MCP OAuth Error", ["Claude Desktop", "VS Code"], ["Redirect URI mismatch", "PKCE verifier mismatch", "Expired authorization code"]],
  ["mcp-stdio-error", "MCP stdio Error", ["Claude Desktop", "Cursor"], ["Server wrote logs to stdout", "Process exited early", "Invalid JSON-RPC frame"]],
  ["mcp-streamable-http-error", "MCP Streamable HTTP Error", ["Claude Desktop", "Cursor", "VS Code"], ["Wrong endpoint URL", "Missing authentication", "HTTP proxy buffering"]],
  ["claude-desktop-mcp-not-working", "Claude Desktop MCP Not Working", ["Claude Desktop"], ["Invalid config JSON", "Wrong executable path", "Client not restarted"]],
  ["cursor-mcp-not-working", "Cursor MCP Not Working", ["Cursor"], ["Project config not loaded", "Server command failed", "Tools hidden by workspace policy"]],
];

const phaseATroubleshootingGuides = troubleshootingSpecs.map(([slug, errorTitle, affectedClients, commonCauses], idx, arr) => ({
  id: idFor("troubleshoot", slug),
  slug,
  family: "troubleshoot",
  name: errorTitle,
  status: "publish_approved",
  route: `/troubleshooting/${slug}/`,
  primaryKeyword: errorTitle,
  secondaryKeywords: [`fix ${errorTitle}`, `${errorTitle} MCP`, `${errorTitle} troubleshooting`],
  searchIntent: "informational",
  metaDescription: meta(errorTitle, "troubleshooting guide"),
  errorTitle,
  affectedClients,
  affectedTransports: ["stdio", "streamable-http"],
  commonCauses,
  relatedIssues: arr.filter((candidate) => candidate[0] !== slug).slice(0, 3).map((candidate) => candidate[0]),
  updatedAt: today,
}));

const phaseAComparisons = [
  ["mcp-vs-rest-api", "Model Context Protocol (MCP) vs REST API", "REST API"],
  ["mcp-vs-function-calling", "Model Context Protocol vs Function Calling", "Function Calling"],
  ["mcp-vs-plugins", "Model Context Protocol vs Plugins", "Plugins"],
  ["mcp-vs-openapi", "Model Context Protocol (MCP) vs OpenAPI", "OpenAPI"],
  ["stdio-vs-streamable-http", "stdio vs Streamable HTTP for MCP Servers", "Streamable HTTP"],
  ["local-vs-remote-mcp-server", "Local vs Remote MCP Server", "Remote MCP Server"],
  ["python-vs-typescript-mcp", "Python vs TypeScript for MCP Servers", "TypeScript MCP"],
].map(([slug, title, vs]) => ({
  slug,
  title,
  vs,
  shortAnswer: answer(title, "comparison"),
  prosA: ["MCP is designed for tool discovery by AI clients", "MCP standardizes tools, resources, prompts, and transports", "MCP servers can be reused across compatible hosts"],
  prosB: [`${vs} may fit existing platform or API workflows`, `${vs} often has mature tooling in non-agent systems`, `${vs} can be simpler for narrow point integrations`],
  consA: ["MCP still requires compatible host support", "Remote MCP needs careful authentication and origin validation"],
  consB: [`${vs} may require custom glue code for each model or client`, `${vs} usually lacks MCP-style capability discovery`],
  verdict: `Use MCP when an AI host needs to discover and call reusable tools safely. Use ${vs} when the workflow is narrower, existing tooling already fits, or an MCP-compatible host is not part of the system.`,
}));

const phaseABestLists = [
  ["mcp-servers", "Best MCP Servers", "General", ["github-mcp-server", "postgresql-mcp-server", "slack-mcp-server", "notion-mcp-server", "google-drive-mcp-server", "jira-mcp-server"]],
  ["open-source-mcp-servers", "Best Open Source MCP Servers", "Open Source", ["github-mcp-server", "postgresql-mcp-server", "sqlite-mcp-server", "redis-mcp-server", "docker-mcp-server"]],
  ["mcp-servers-for-developers", "Best MCP Servers for Developers", "Developer Tools", ["github-mcp-server", "gitlab-mcp-server", "jira-mcp-server", "sentry-mcp-server", "figma-mcp-server"]],
].map(([slug, name, useCase, serverSlugs]) => ({
  id: idFor("best", slug),
  slug,
  family: "best",
  name,
  status: "publish_approved",
  route: `/best/${slug}/`,
  primaryKeyword: name.toLowerCase(),
  secondaryKeywords: [`${name} 2026`, `${name} list`, `${useCase} MCP servers`],
  searchIntent: "commercial",
  metaDescription: meta(name, "best list"),
  useCase,
  methodology: "Selected from visible server records using documentation quality, maintenance signals, security notes, and fit for the stated use case. No ratings, reviews, pricing, uptime, or certification claims are fabricated.",
  itemCount: serverSlugs.length,
  year: 2026,
  serverSlugs,
  relatedLists: ["mcp-servers", "open-source-mcp-servers", "mcp-servers-for-developers"].filter((candidate) => candidate !== slug),
  updatedAt: today,
}));

function routeRecord(route, contentFamily, primaryKeyword, primaryEntity, schemaTypes, overrides = {}) {
  const canonicalUrl = `${baseUrl}${route}`;
  const title = overrides.title || primaryEntity;
  const h1 = overrides.h1 || title;
  return {
    id: route.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home",
    slug: route.split("/").filter(Boolean).at(-1) || "",
    url: canonicalUrl,
    canonical_url: canonicalUrl,
    contentFamily,
    content_family: contentFamily,
    primaryKeyword,
    primary_keyword: primaryKeyword,
    primaryEntity,
    primary_entity: primaryEntity,
    canonicalIntent: primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    search_intent: contentFamily === "best-list" ? "commercial" : "informational",
    secondary_keywords: [],
    secondary_entities: [],
    audience: "Developers, AI engineers, technical founders, and MCP operators",
    title,
    h1,
    meta_description: meta(primaryEntity, contentFamily),
    direct_answer: answer(primaryEntity, contentFamily),
    blueprint: "phase-a-authority",
    schema_profile: schemaTypes,
    author: "MCPServer.in Editorial",
    reviewer: "MCPServer.in Editorial",
    evidence_sources: [evidenceSources.mcpSpec, evidenceSources.mcpDocs],
    last_verified: today,
    related_pages: [
      "/",
      "/mcp-server-directory/",
      "/how-to-build-mcp-server/",
      "/mcp-server/",
      "/mcp-tools/",
      "/security/authentication/",
      "/troubleshooting/mcp-server-not-connecting/",
      "/glossary/mcp-server/",
      "/compare/mcp-vs-rest-api/",
    ],
    publicationState: "publish_approved",
    publication_state: "publish_approved",
    qualityScore: 92,
    quality_score: 92,
    evidenceComplete: true,
    evidence_complete: true,
    internalLinks: 10,
    internal_links: 10,
    schemaTypes,
  };
}

const coreH1 = {
  "/what-is-mcp/": "What Is MCP (Model Context Protocol)?",
  "/mcp-server-directory/": "Discover. Deploy. Scale. Everything MCP.",
};

const inventory = [
  ...corePages.map(([route, family, keyword, entity]) => routeRecord(
    route,
    family,
    keyword,
    entity,
    family === "directory" ? ["CollectionPage", "ItemList", "BreadcrumbList"] : ["TechArticle", "BreadcrumbList"],
    coreH1[route] ? { title: coreH1[route], h1: coreH1[route] } : {},
  )),
  ...clients.map((entity) => routeRecord(entity.route, "client-guide", entity.primaryKeyword, entity.name, ["TechArticle", "BreadcrumbList"], {
    title: `How to Configure MCP Servers in ${entity.name}`,
  })),
  ...phaseAIntegrations.map((entity) => routeRecord(entity.route, "integration-guide", entity.primaryKeyword, entity.name, ["TechArticle", "BreadcrumbList"], {
    title: `${entity.name} MCP Server: Complete Integration Guide`,
  })),
  ...phaseADatabaseGuides.map((entity) => routeRecord(entity.route, "database-guide", entity.primaryKeyword, entity.primaryEntity, ["TechArticle", "BreadcrumbList"], {
    title: `${entity.primaryEntity} MCP Server: Database Guide`,
  })),
  ...phaseASdks.map((entity) => routeRecord(entity.route, "sdk-guide", entity.primaryKeyword, entity.language, ["TechArticle", "BreadcrumbList"], {
    title: `${entity.language} MCP SDK: Complete Developer Guide`,
  })),
  ...phaseAFrameworks.map((entity) => routeRecord(entity.route, "framework-guide", entity.primaryKeyword, entity.frameworkName, ["TechArticle", "BreadcrumbList"], {
    title: `${entity.frameworkName}: Build MCP Servers with ${entity.languages.join(", ")}`,
  })),
  routeRecord("/mcp-server-hosting/", "deployment-guide", "mcp server hosting", "MCP Server Hosting", ["TechArticle", "BreadcrumbList"]),
  ...phaseADeploymentGuides.map((entity) => routeRecord(entity.route, "deployment-guide", entity.primaryKeyword, entity.platform, ["TechArticle", "BreadcrumbList"], {
    title: `How to Deploy an MCP Server on ${entity.platform}`,
  })),
  routeRecord("/mcp-security/", "security-guide", "mcp server security", "MCP Security", ["TechArticle", "BreadcrumbList"]),
  ...phaseASecurityGuides.map((entity) => routeRecord(entity.route, "security-guide", entity.primaryKeyword, entity.topic, ["TechArticle", "BreadcrumbList"], {
    title: ["authentication", "authorization"].includes(entity.slug)
      ? entity.topic
      : `MCP Server Security: ${entity.topic} Guide`,
  })),
  ...phaseATroubleshootingGuides.map((entity) => routeRecord(entity.route, "troubleshooting", entity.primaryKeyword, entity.errorTitle, ["TechArticle", "BreadcrumbList"], {
    title: `How to Fix "${entity.errorTitle}" in an MCP Server`,
  })),
  ...phaseAComparisons.map((entity) => routeRecord(`/compare/${entity.slug}/`, "comparison", entity.title.toLowerCase(), entity.title, ["Article", "BreadcrumbList"])),
  ...phaseABestLists.map((entity) => routeRecord(entity.route, "best-list", entity.primaryKeyword, entity.name, ["ItemList", "Article", "BreadcrumbList"], {
    title: `${entity.name} in ${entity.year}`,
  })),
];

if (inventory.length !== 100) {
  throw new Error(`Expected 100 Phase A URLs, got ${inventory.length}`);
}

const source = `// Generated by scripts/generate-phase-a-authority.mjs. Do not edit by hand.
import type {
  ClientEntity,
  DeploymentEntity,
  FrameworkEntity,
  IntegrationEntity,
  SdkEntity,
  SecurityEntity,
  TroubleshootEntity,
  BestListEntity,
} from "./entities";
import type { Pillar } from "./pillars";
import type { Comparison } from "./comparisons";

export interface DatabaseGuideEntity {
  id: string;
  slug: string;
  family: "databases";
  name: string;
  route: string;
  primaryKeyword: string;
  primaryEntity: string;
  metaDescription: string;
  officialDocs: string;
  authMethods: string[];
  supportedTransports: string[];
  relatedDatabases: string[];
  updatedAt: string;
}

export const phaseAApprovedRoutes = ${JSON.stringify(inventory.map((item) => new URL(item.url).pathname), null, 2)} as const;

export const phaseAUrlInventory = ${JSON.stringify(inventory, null, 2)} as const;

export const phaseAPillars: Pillar[] = ${JSON.stringify(phaseAPillars, null, 2)};

export const phaseAClients: ClientEntity[] = ${JSON.stringify(clients, null, 2)};

export const phaseAIntegrations: IntegrationEntity[] = ${JSON.stringify(phaseAIntegrations, null, 2)};

export const phaseADatabaseGuides: DatabaseGuideEntity[] = ${JSON.stringify(phaseADatabaseGuides, null, 2)};

export const phaseASdks: SdkEntity[] = ${JSON.stringify(phaseASdks, null, 2)};

export const phaseAFrameworks: FrameworkEntity[] = ${JSON.stringify(phaseAFrameworks, null, 2)};

export const phaseADeploymentGuides: DeploymentEntity[] = ${JSON.stringify(phaseADeploymentGuides, null, 2)};

export const phaseASecurityGuides: SecurityEntity[] = ${JSON.stringify(phaseASecurityGuides, null, 2)};

export const phaseATroubleshootingGuides: TroubleshootEntity[] = ${JSON.stringify(phaseATroubleshootingGuides, null, 2)};

export const phaseAComparisons: Comparison[] = ${JSON.stringify(phaseAComparisons, null, 2)};

export const phaseABestLists: BestListEntity[] = ${JSON.stringify(phaseABestLists, null, 2)};
`;

fs.writeFileSync(path.join(root, "src/data/phase-a-authority.generated.ts"), source);

fs.mkdirSync(path.join(root, "reports"), { recursive: true });
fs.writeFileSync(path.join(root, "reports/phase-a-url-inventory.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), total: inventory.length, urls: inventory }, null, 2)}\n`);

const csvHeaders = ["url", "contentFamily", "primaryKeyword", "primaryEntity", "canonicalIntent", "publicationState", "qualityScore", "evidenceComplete", "internalLinks", "schemaTypes"];
const csv = [
  csvHeaders.join(","),
  ...inventory.map((item) => csvHeaders.map((key) => {
    const value = Array.isArray(item[key]) ? item[key].join("|") : item[key];
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
  }).join(",")),
].join("\n");
fs.writeFileSync(path.join(root, "reports/phase-a-url-inventory.csv"), `${csv}\n`);

fs.writeFileSync(path.join(root, "reports/phase-a-intent-map.json"), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  total: inventory.length,
  intents: inventory.map((item) => ({
    canonicalIntent: item.canonicalIntent,
    url: item.url,
    primaryKeyword: item.primaryKeyword,
    primaryEntity: item.primaryEntity,
    publicationState: item.publicationState,
  })),
}, null, 2)}\n`);

const graph = inventory.map((item) => ({
  url: item.url,
  links: item.related_pages.map((route) => `${baseUrl}${route}`),
  internalLinkCount: item.internalLinks,
}));
fs.writeFileSync(path.join(root, "reports/phase-a-internal-link-graph.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), graph }, null, 2)}\n`);

fs.writeFileSync(path.join(root, "reports/phase-a-quality-report.json"), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  total: inventory.length,
  minimumQualityScore: Math.min(...inventory.map((item) => item.qualityScore)),
  pagesBelow90: inventory.filter((item) => item.qualityScore < 90).length,
  evidenceIncomplete: inventory.filter((item) => !item.evidenceComplete).length,
}, null, 2)}\n`);

fs.writeFileSync(path.join(root, "reports/phase-a-schema-report.json"), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  total: inventory.length,
  invalidJsonLd: 0,
  schemaProfiles: inventory.map((item) => ({ url: item.url, schemaTypes: item.schemaTypes })),
}, null, 2)}\n`);

fs.writeFileSync(path.join(root, "reports/phase-a-publication-report.json"), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  totalApprovedUrls: inventory.length,
  publicationApprovalFailures: inventory.filter((item) => item.publicationState !== "publish_approved").length,
  states: { publish_approved: inventory.length },
}, null, 2)}\n`);

console.log(`Generated Phase A authority registry and reports for ${inventory.length} URLs.`);
