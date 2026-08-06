import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const baseUrl = "https://www.mcpserver.in";
const generatedAt = new Date().toISOString();
const verifyOnly = process.argv.includes("--verify-only");
const checkArg = process.argv.find((arg) => arg.startsWith("--check="))?.split("=")[1] || "all";

const lifecycle = [
  "candidate",
  "intent_validated",
  "evidence_complete",
  "blueprint_approved",
  "generated_draft",
  "automated_validation",
  "human_review",
  "publish_approved",
  "published",
  "indexed",
];

const targets = {
  "mcp-server-profile": 700,
  "integration-guide": 700,
  "client-integration-guide": 400,
  "tutorial": 350,
  "troubleshooting": 350,
  "comparison": 250,
  "best-list": 120,
  "category-hub": 100,
  "glossary": 350,
  "enterprise-guide": 170,
  "sdk-framework-guide": 220,
  "client-guide": 120,
  "deployment-guide": 170,
  "database-guide": 170,
  "security-guide": 170,
  "template": 120,
  "example-project": 170,
  "registry-guide": 80,
  "india-guide": 200,
  "news-release": 90,
};

const sourcePromptAllocationSum = 5750;

const capacityTargets = {
  "MCP Servers": 1200,
  "Integration Guides": 1000,
  Tutorials: 800,
  Troubleshooting: 700,
  Comparisons: 500,
  Glossary: 600,
  "SDK & Frameworks": 500,
  "AI Clients": 300,
  Deployment: 400,
  Security: 300,
  Enterprise: 300,
  Templates: 250,
  "Example Projects": 300,
  "Registry & Publishing": 200,
  "News & Releases": 300,
  "Category Hubs": 150,
  "Authority Pillars": 200,
};

const existingRoutes = new Set([
  "/",
  "/mcp-server-directory/",
  "/servers/",
  "/clients/",
  "/integrations/",
  "/guides/",
  "/tutorials/",
  "/troubleshooting/",
  "/compare/",
  "/best/",
  "/categories/",
  "/glossary/",
  "/enterprise/",
  "/sdk/",
  "/frameworks/",
  "/deployment/",
  "/databases/",
  "/security/",
  "/templates/",
  "/projects/",
  "/registry/",
  "/india/",
  "/news/",
  "/benchmarks/",
]);

const globalSchemas = ["WebPage", "BreadcrumbList", "Organization"];
const schemaByFamily = {
  "mcp-server-profile": ["SoftwareApplication", "TechArticle"],
  "integration-guide": ["TechArticle", "SoftwareApplication"],
  "client-integration-guide": ["HowTo", "TechArticle"],
  tutorial: ["HowTo", "TechArticle", "FAQPage"],
  troubleshooting: ["TechArticle", "FAQPage"],
  comparison: ["TechArticle", "ItemList"],
  "best-list": ["CollectionPage", "ItemList"],
  "category-hub": ["CollectionPage", "ItemList"],
  glossary: ["DefinedTerm"],
  "enterprise-guide": ["TechArticle", "FAQPage"],
  "sdk-framework-guide": ["TechArticle", "SoftwareApplication"],
  "client-guide": ["TechArticle", "SoftwareApplication"],
  "deployment-guide": ["HowTo", "TechArticle"],
  "database-guide": ["TechArticle", "SoftwareApplication"],
  "security-guide": ["TechArticle", "FAQPage"],
  template: ["TechArticle", "SoftwareApplication"],
  "example-project": ["TechArticle", "SoftwareApplication"],
  "registry-guide": ["TechArticle", "FAQPage"],
  "india-guide": ["TechArticle", "FAQPage"],
  "news-release": ["TechArticle", "Dataset", "Report"],
};

const blueprintByFamily = {
  "mcp-server-profile": "mcp-server-profile",
  "integration-guide": "integration-guide",
  "client-integration-guide": "client-integration-guide",
  tutorial: "implementation-guide",
  troubleshooting: "troubleshooting-guide",
  comparison: "comparison-page",
  "best-list": "best-list",
  "category-hub": "category-landing",
  glossary: "glossary-term",
  "enterprise-guide": "enterprise-guide",
  "sdk-framework-guide": "sdk-framework-guide",
  "client-guide": "mcp-client-guide",
  "deployment-guide": "deployment-guide",
  "database-guide": "database-guide",
  "security-guide": "security-guide",
  template: "template-page",
  "example-project": "example-project",
  "registry-guide": "registry-guide",
  "india-guide": "india-guide",
  "news-release": "news-release",
};

const minimumWordsByFamily = {
  "mcp-server-profile": 2400,
  "integration-guide": 2400,
  "client-integration-guide": 2200,
  tutorial: 2800,
  troubleshooting: 1800,
  comparison: 3200,
  "best-list": 2400,
  "category-hub": 3000,
  glossary: 1200,
  "enterprise-guide": 3000,
  "sdk-framework-guide": 2400,
  "client-guide": 2200,
  "deployment-guide": 2600,
  "database-guide": 2400,
  "security-guide": 2800,
  template: 1600,
  "example-project": 2200,
  "registry-guide": 2200,
  "india-guide": 2400,
  "news-release": 1400,
};

const qualityTargetByFamily = {
  "mcp-server-profile": 94,
  "integration-guide": 93,
  "client-integration-guide": 92,
  tutorial: 93,
  troubleshooting: 93,
  comparison: 95,
  "best-list": 94,
  "category-hub": 94,
  glossary: 90,
  "enterprise-guide": 96,
  "sdk-framework-guide": 92,
  "client-guide": 92,
  "deployment-guide": 94,
  "database-guide": 93,
  "security-guide": 96,
  template: 90,
  "example-project": 92,
  "registry-guide": 93,
  "india-guide": 94,
  "news-release": 88,
};

function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/#/g, " sharp ")
    .replace(/\.js\b/gi, " js")
    .replace(/\.io\b/gi, " io")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

function titleCase(value) {
  const upper = new Set(["api", "aws", "gcp", "idp", "jwt", "mcp", "mtls", "oidc", "oauth", "rbac", "abac", "sdk", "sse", "tls", "ui", "url", "json", "rpc", "sql", "ci", "cd", "crm", "erp", "cdn", "iam", "kpi", "upi", "gst", "pan"]);
  return String(value)
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (upper.has(lower)) return lower.toUpperCase();
      if (lower === "github") return "GitHub";
      if (lower === "gitlab") return "GitLab";
      if (lower === "servicenow") return "ServiceNow";
      if (lower === "openai") return "OpenAI";
      if (lower === "postgresql") return "PostgreSQL";
      if (lower === "mysql") return "MySQL";
      if (lower === "mongodb") return "MongoDB";
      if (lower === "bigquery") return "BigQuery";
      if (lower === "cloudflare") return "Cloudflare";
      if (lower === "fastmcp") return "FastMCP";
      if (lower === "llamaindex") return "LlamaIndex";
      if (lower === "chromadb") return "ChromaDB";
      if (lower === "phonepe") return "PhonePe";
      if (lower === "paytm") return "Paytm";
      if (lower === "cleartax") return "ClearTax";
      if (lower === "digilocker") return "DigiLocker";
      if (lower === "zerotrust" || lower === "zero") return word.charAt(0).toUpperCase() + word.slice(1);
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function stripMcpServer(slug) {
  return slug.replace(/-mcp-server$/, "");
}

function route(pathname) {
  return pathname.startsWith("/") ? `${pathname.replace(/\/?$/, "/")}` : `/${pathname.replace(/\/?$/, "/")}`;
}

function canonical(pathname) {
  return `${baseUrl}${route(pathname)}`;
}

function uniq(items) {
  return [...new Set(items.filter(Boolean))];
}

function rotate(items, offset, count) {
  const out = [];
  for (let i = 0; i < count; i += 1) out.push(items[(offset + i) % items.length]);
  return out;
}

const categories = [
  "developer-tools", "databases", "vector-databases", "communication", "productivity",
  "project-management", "cloud", "deployment", "security", "identity",
  "observability", "analytics", "finance", "payments", "ecommerce",
  "crm", "support", "erp", "marketing", "storage",
  "file-systems", "browser-automation", "knowledge-management", "search", "ai-ml",
  "data-engineering", "devops", "infrastructure", "monitoring", "testing",
  "documentation", "design", "automation", "workflow", "registry",
  "governance", "enterprise", "compliance", "india", "education",
].map((slug) => ({ slug, name: titleCase(slug) }));

const categoryModifiers = [
  "overview", "servers", "integrations", "tutorials", "security",
  "deployment", "troubleshooting", "templates", "examples", "comparisons",
  "clients", "sdk", "registry", "enterprise", "benchmarks",
];

const clients = [
  "claude-desktop", "claude-code", "cursor", "vscode", "cline", "roo-code", "continue", "windsurf",
  "github-copilot", "chatgpt", "gemini-cli", "open-webui", "librechat", "zed", "jetbrains",
  "visual-studio", "neovim", "emacs", "aider", "sourcegraph-cody", "amazon-q-developer",
  "google-gemini-code-assist", "ollama", "lm-studio", "jan", "anythingllm", "dify", "flowise",
  "langgraph-studio", "copilot-workspace",
];

const platforms = [
  "github", "gitlab", "bitbucket", "jira", "confluence", "linear", "slack", "discord", "microsoft-teams",
  "notion", "google-drive", "gmail", "google-calendar", "google-sheets", "google-docs", "airtable",
  "asana", "trello", "clickup", "monday", "basecamp", "figma", "miro", "canva", "loom",
  "sentry", "datadog", "new-relic", "grafana", "prometheus", "splunk", "elastic", "logtail",
  "stripe", "paypal", "adyen", "shopify", "woocommerce", "magento", "salesforce", "hubspot",
  "zendesk", "intercom", "freshdesk", "servicenow", "workday", "netsuite", "sap", "oracle-cloud",
  "aws", "azure", "google-cloud", "cloudflare", "vercel", "railway", "render", "fly", "digitalocean",
  "heroku", "kubernetes", "docker", "terraform", "pulumi", "ansible", "jenkins", "circleci",
  "github-actions", "gitlab-ci", "buildkite", "argocd", "fluxcd", "postman", "openapi", "swagger",
  "sonarqube", "semgrep", "snyk", "trivy", "vault", "auth0", "okta", "keycloak", "clerk",
  "supabase", "firebase", "neon", "turso", "planetscale", "postgresql", "mysql", "mongodb", "redis",
  "sqlite", "oracle-database", "sql-server", "snowflake", "bigquery", "clickhouse", "duckdb",
  "elasticsearch", "opensearch", "qdrant", "pinecone", "weaviate", "milvus", "chromadb", "pgvector",
  "s3", "r2", "gcs", "azure-blob-storage", "dropbox", "box", "onedrive", "sharepoint",
  "browserbase", "playwright", "puppeteer", "selenium", "firecrawl", "brave-search", "serpapi",
  "perplexity", "openai", "anthropic", "hugging-face", "cohere", "mistral", "ollama", "langsmith",
  "pipedrive", "zoho-crm", "mailchimp", "sendgrid", "resend", "twilio", "segment", "mixpanel",
  "amplitude", "posthog", "looker", "metabase", "power-bi", "tableau", "dbt", "airbyte",
  "fivetran", "dagster", "prefect", "temporal", "n8n", "zapier", "make", "wordpress",
  "contentful", "sanity", "strapi", "ghost", "webflow", "wix", "squarespace", "reddit",
  "x-twitter", "linkedin", "youtube", "google-analytics", "google-search-console",
  "razorpay", "cashfree", "payu", "phonepe-business", "paytm-business", "bharatpe", "upi",
  "gst-e-invoicing", "e-way-bill", "cleartax", "tally", "zoho-books", "shiprocket", "delhivery",
  "digilocker", "aadhaar-kyc", "pan-verification", "indian-banking-apis",
];

const serverScopes = ["", "read-only", "admin", "analytics", "automation", "search", "audit", "workflow", "security", "deployment"];
const integrationScopes = ["", "issues", "pull-requests", "files", "messages", "calendar", "records", "reports", "workflows", "alerts", "billing", "users", "search", "analytics", "admin", "automation"];
const tutorialActions = ["build", "deploy", "configure", "secure", "test", "debug", "monitor", "publish", "migrate", "scale"];
const tutorialSubjects = [
  "mcp-server-python", "mcp-server-typescript", "mcp-server-java", "mcp-server-go", "mcp-server-rust",
  "mcp-tools", "mcp-resources", "mcp-prompts", "streamable-http-mcp-server", "stdio-mcp-server",
  "oauth-mcp-server", "postgresql-mcp-server", "github-mcp-server", "slack-mcp-server", "kubernetes-mcp-server",
  "docker-mcp-server", "fastmcp-server", "official-sdk-server", "remote-mcp-server", "local-mcp-server",
  "multi-tenant-mcp-server", "read-only-database-mcp-server", "browser-automation-mcp-server", "rag-mcp-server",
  "production-mcp-server", "mcp-server-observability", "mcp-server-rate-limiting", "mcp-server-audit-logging",
  "mcp-server-secret-management", "mcp-server-error-handling", "mcp-server-testing", "mcp-server-registry-publishing",
  "mcp-server-json", "mcp-server-docker-image", "mcp-client-configuration", "mcp-host-integration",
  "mcp-tool-schema", "mcp-resource-uri", "mcp-prompt-template", "mcp-security-policy",
];
const troubleshootingSymptoms = [
  "mcp-tools-not-appearing", "mcp-server-not-connecting", "mcp-server-not-starting", "mcp-server-timeout",
  "mcp-authentication-failed", "mcp-oauth-token-expired", "mcp-oauth-redirect-uri-mismatch", "mcp-stdio-broken-pipe",
  "mcp-stdio-invalid-json", "mcp-streamable-http-error", "mcp-cors-error", "mcp-tls-certificate-error",
  "mcp-permission-denied", "mcp-tool-call-failed", "mcp-resource-not-found", "mcp-prompt-not-loading",
  "mcp-server-crashes-on-startup", "mcp-config-file-not-found", "mcp-env-var-missing", "mcp-rate-limit-error",
  "mcp-json-rpc-parse-error", "mcp-capability-negotiation-failed", "mcp-client-hangs", "mcp-server-returns-empty-tools",
  "mcp-database-connection-refused", "mcp-kubernetes-auth-error", "mcp-docker-socket-denied", "mcp-cloudflare-worker-timeout",
  "mcp-vercel-function-timeout", "mcp-github-token-scope-error", "mcp-slack-bot-scope-error", "mcp-postgresql-read-only-error",
];
const environments = [...clients.slice(0, 16), "stdio", "streamable-http", "docker", "kubernetes", "aws", "vercel", "cloudflare", "postgresql", "redis", "oauth", "api-keys", "windows", "macos", "linux"];
const securityControls = [
  "oauth", "rbac", "zero-trust", "openid-connect", "jwt", "api-keys", "mtls", "abac", "secrets-management",
  "origin-validation", "csrf-protection", "prompt-injection", "tool-poisoning", "sandboxing", "rate-limiting",
  "tenant-isolation", "audit-logging", "supply-chain-security", "network-policies", "least-privilege",
  "token-rotation", "session-management", "approval-workflows", "egress-control", "policy-as-code",
];
const securityIntents = ["", "implementation", "checklist", "troubleshooting", "architecture", "testing", "threat-model", "monitoring"];
const databases = [
  "postgresql", "mysql", "mongodb", "redis", "sqlite", "oracle", "sql-server", "snowflake", "bigquery", "clickhouse",
  "elasticsearch", "opensearch", "duckdb", "supabase", "firebase", "neon", "turso", "planetscale",
  "qdrant", "pinecone", "chromadb", "milvus", "weaviate", "pgvector", "cassandra", "dynamodb", "couchbase",
  "mariadb", "timescale", "influxdb",
];
const databaseIntents = ["setup", "read-only-access", "authentication", "performance", "troubleshooting", "schema-discovery", "destructive-query-prevention", "query-sandboxing"];
const languages = ["python", "typescript", "javascript", "java", "kotlin", "go", "rust", "c-sharp", "swift", "php", "ruby", "scala", "dart", "elixir", "clojure"];
const frameworks = ["fastmcp", "spring-ai-mcp", "langchain-mcp", "llamaindex-mcp", "semantic-kernel-mcp", "mastra-mcp", "crewai-mcp", "autogen-mcp", "pydanticai-mcp", "langgraph-mcp", "haystack-mcp", "dify-mcp"];
const sdkTopics = ["", "setup", "tools", "resources", "prompts", "stdio", "streamable-http", "oauth", "testing", "deployment", "error-handling", "schema-validation", "registry-publishing", "observability"];
const cloudPlatforms = ["aws", "azure", "google-cloud", "cloudflare", "vercel", "railway", "render", "fly", "digitalocean", "kubernetes", "docker-compose", "coolify", "heroku", "openshift", "bare-metal", "homelab", "oracle-cloud", "ibm-cloud", "linode", "netlify"];
const deploymentModels = ["", "deploy", "secure", "monitor", "scale", "troubleshoot", "cost", "tls", "secrets", "blue-green", "private-networking"];
const enterpriseTopics = [
  "multi-tenancy", "governance", "audit-logging", "zero-trust", "high-availability", "disaster-recovery",
  "compliance-support", "observability", "cost-control", "approval-workflows", "private-deployment",
  "secrets-management", "policy-enforcement", "workspace-isolation", "tenant-routing", "central-registry",
  "server-catalog", "risk-management", "change-management", "platform-engineering", "developer-enablement",
  "data-residency", "vendor-management", "identity-federation", "incident-response",
];
const enterpriseIntents = ["", "architecture", "checklist", "implementation", "operating-model", "controls", "migration", "metrics", "playbook"];
const registryTopics = [
  "publisher", "server-json", "discovery", "official-mcp-registry", "publisher-cli", "namespace-ownership",
  "oidc-publishing", "dns-verification", "http-verification", "npm-metadata", "registry-api",
  "package-publication", "server-signing", "versioning", "deprecation", "metadata-validation", "schema-linting",
  "security-review", "publisher-troubleshooting", "registry-webhooks",
];
const registryIntents = ["", "setup", "checklist", "troubleshooting", "automation", "governance"];
const indiaEntities = [
  "razorpay", "cashfree", "payu", "phonepe-business", "paytm-business", "bharatpe", "upi",
  "gst-e-invoicing", "e-way-bill", "cleartax", "tally", "zoho-books", "shiprocket", "delhivery",
  "digilocker", "aadhaar-kyc", "pan-verification", "indian-banking-apis", "india-cloud-regions",
  "ondc", "bbps", "account-aggregator", "gst-portal", "mca-portal", "income-tax-portal",
];
const indiaIntents = ["mcp-server", "workflow", "integration", "security", "audit", "automation", "reconciliation", "developer-guide", "compliance-checklist", "troubleshooting"];
const glossaryBases = [
  "model-context-protocol", "json-rpc", "mcp-server", "mcp-client", "mcp-host", "mcp-tool", "mcp-resource", "mcp-prompt",
  "stdio-transport", "streamable-http", "server-sent-events", "capability-negotiation", "tool-schema", "resource-uri",
  "prompt-template", "sampling", "roots", "elicitation", "oauth", "openid-connect", "pkce", "bearer-token",
  "api-key", "mtls", "rbac", "abac", "zero-trust", "prompt-injection", "tool-poisoning", "sandboxing",
  "audit-log", "least-privilege", "tenant-isolation", "rate-limit", "origin-validation", "json-schema",
  "zod-schema", "webhook", "callback-url", "reverse-proxy", "edge-function", "serverless-function", "container",
  "sidecar", "service-account", "kubeconfig", "connection-string", "read-only-user", "query-sandbox", "vector-index",
  "embedding", "retrieval-augmented-generation", "agent", "tool-calling", "function-calling", "registry", "server-json",
  "publisher", "namespace", "package-signing", "semantic-versioning", "deprecation-policy", "schema-registry",
];
const glossaryQualifiers = ["", "for-mcp", "in-mcp-servers", "for-ai-agents", "security", "deployment", "troubleshooting", "registry"];
const templateBases = ["python", "typescript", "java", "go", "rust", "docker", "kubernetes", "oauth", "postgresql", "mysql", "mongodb", "redis", "sqlite", "github", "slack", "notion", "browser-automation", "rag", "streamable-http", "stdio", "fastmcp", "official-sdk", "terraform", "cloudflare-worker", "vercel", "aws-lambda", "azure-functions", "google-cloud-run", "rbac", "audit-logging"];
const projectBases = ["github-mcp-server", "browser-automation", "pdf-reader-mcp-server", "calendar-mcp-server", "slack-bot-mcp-server", "postgresql-analytics-mcp-server", "notion-knowledge-base", "jira-triage-agent", "stripe-billing-assistant", "shopify-catalog-agent", "sentry-debug-agent", "kubernetes-incident-response", "docker-log-reader", "google-drive-research-agent", "gmail-support-agent", "figma-design-review", "qdrant-rag-server", "pinecone-search-agent", "supabase-dashboard-agent", "redis-cache-auditor"];
const projectQualifiers = ["", "starter", "production", "dockerized", "oauth", "read-only", "multi-client", "cloud-deployed", "test-suite", "observability"];
const newsEvents = ["mcp-registry-updates", "mcp-specification-update", "typescript-sdk-release", "python-sdk-release", "java-sdk-release", "go-sdk-release", "rust-sdk-release", "claude-desktop-mcp-update", "cursor-mcp-update", "vscode-mcp-update", "official-server-release", "security-advisory", "ecosystem-adoption", "registry-api-change", "publisher-cli-release", "streamable-http-update", "oauth-guidance-update", "server-json-schema-update", "benchmark-results", "client-compatibility-update"];
const newsEntities = ["", "github", "postgresql", "slack", "fastmcp", "official-sdk", "python-sdk", "typescript-sdk", "claude-desktop", "cursor", "registry", "security", "deployment", "enterprise", "india"];
const bestTopics = [
  "mcp-servers", "open-source-mcp-servers", "mcp-servers-for-developers", "mcp-servers-for-databases", "mcp-clients-for-enterprises",
  "mcp-hosting-platforms", "mcp-security-tools", "mcp-frameworks", "mcp-sdk-languages", "mcp-servers-for-analytics",
  "mcp-servers-for-productivity", "mcp-servers-for-devops", "mcp-servers-for-observability", "mcp-servers-for-finance",
  "mcp-templates-for-python", "mcp-templates-for-typescript", "mcp-projects-for-learning", "mcp-tools-for-ai-agents",
  "mcp-database-connectors", "mcp-vector-database-connectors", "mcp-registry-tools", "mcp-deployment-options",
  "mcp-clients-for-coding", "mcp-clients-for-local-agents", "mcp-servers-for-indian-startups",
];
const bestQualifiers = ["", "for-startups", "for-enterprise", "for-local-development", "for-production", "with-oauth", "with-docker"];

const records = [];
const routeOwners = new Map();
let nextId = 1;

function familySpecificEvidence(family, entity) {
  const base = ["official MCP specification", "visible implementation or official product documentation"];
  if (family === "news-release") return ["primary source announcement", "release notes or advisory", "publication date verification"];
  if (family === "india-guide") return [...base, "official India service documentation", "regulatory claim qualification"];
  if (family === "security-guide") return [...base, "security control documentation", "threat model notes"];
  if (family === "template" || family === "example-project") return [...base, "executable repository or test fixture"];
  if (family === "comparison" || family === "best-list") return [...base, "transparent evaluation methodology"];
  if (family === "glossary") return ["official MCP specification or protocol documentation", "term relationship to MCP"];
  return base;
}

function priorityFor(family, cluster, index) {
  let score = 70;
  if (["mcp-server-profile", "integration-guide", "tutorial", "security-guide"].includes(family)) score += 12;
  if (["developer-tools", "databases", "security", "deployment", "cloud", "india"].includes(cluster)) score += 5;
  if (index < 50) score += 5;
  if (family === "news-release") score -= 8;
  if (family === "glossary") score -= 2;
  score = Math.max(62, Math.min(96, score));
  if (score >= 90) return { score, priority: "P0" };
  if (score >= 80) return { score, priority: "P1" };
  if (score >= 70) return { score, priority: "P2" };
  return { score, priority: "P3" };
}

function pickCluster(slug) {
  if (databases.some((db) => slug.includes(db))) return "databases";
  if (["qdrant", "pinecone", "weaviate", "milvus", "chromadb", "pgvector"].some((item) => slug.includes(item))) return "vector-databases";
  if (["aws", "azure", "google-cloud", "cloudflare", "vercel", "railway", "render", "fly", "digitalocean", "kubernetes", "docker"].some((item) => slug.includes(item))) return "cloud";
  if (["oauth", "rbac", "zero-trust", "security", "jwt", "mtls", "sandbox", "audit", "policy"].some((item) => slug.includes(item))) return "security";
  if (indiaEntities.some((item) => slug.includes(item))) return "india";
  if (["slack", "discord", "teams", "gmail", "calendar"].some((item) => slug.includes(item))) return "communication";
  if (["stripe", "paypal", "razorpay", "cashfree", "payu", "upi"].some((item) => slug.includes(item))) return "payments";
  if (["salesforce", "hubspot", "pipedrive", "zoho"].some((item) => slug.includes(item))) return "crm";
  if (["sentry", "datadog", "grafana", "prometheus", "new-relic"].some((item) => slug.includes(item))) return "observability";
  return "developer-tools";
}

function makeRecord({ pathname, family, cluster, subcluster, primaryEntity, secondaryEntities = [], primaryKeyword, secondaryKeywords = [], intent = "implementation", audience = ["developers", "AI engineers"], h1, title, description, parentHub, siblingPaths = [], blueprint, evidenceClass = "technical", freshness = "90-days", pageSpecificSchemas, crawlDepth = 3, implementationStatus = "candidate_not_verified" }) {
  const canonicalPath = route(pathname);
  if (routeOwners.has(canonicalPath)) return null;
  const allSchemas = uniq([...globalSchemas, ...(pageSpecificSchemas || schemaByFamily[family] || ["TechArticle"])]);
  const { score, priority } = priorityFor(family, cluster, records.length);
  const id = `url-candidate-${String(nextId).padStart(4, "0")}`;
  nextId += 1;
  const slug = canonicalPath.split("/").filter(Boolean).at(-1) || "home";
  const selectedParentHub = route(parentHub || `/categories/${cluster}/`);
  const selectedBlueprint = blueprint || blueprintByFamily[family];
  const canonicalUrl = canonical(canonicalPath);
  const record = {
    id,
    manifest_id: "mcpserver-master-manifest-v2",
    graph_node_id: `node:${family}:${slugify(canonicalPath)}`,
    entity_uid: `${family}:${slugify(primaryEntity)}:${slug}`,
    url: canonicalUrl,
    route: canonicalPath,
    canonical_path: canonicalPath,
    slug,
    content_family: family,
    entity_type: family.replace(/-/g, "_"),
    category: cluster,
    cluster,
    subcluster: subcluster || cluster,
    primary_entity: primaryEntity,
    secondary_entities: secondaryEntities,
    primary_keyword: primaryKeyword,
    secondary_keywords: secondaryKeywords,
    search_intent: intent,
    audience,
    proposed_h1: h1,
    seo_title: title,
    meta_description: description,
    canonical_url: canonicalUrl,
    parent_hub: canonical(selectedParentHub),
    parent_hub_path: selectedParentHub,
    sibling_urls: siblingPaths.map((item) => canonical(item)),
    sibling_paths: siblingPaths.map(route),
    schema_types: allSchemas,
    blueprint: selectedBlueprint,
    evidence_class: evidenceClass,
    evidence_requirements: familySpecificEvidence(family, primaryEntity),
    evidence_status: "required_not_collected",
    freshness_class: freshness,
    priority,
    priority_score: score,
    competition_hypothesis: priority === "P0" || priority === "P1" ? "low-to-medium" : "medium",
    traffic_potential: priority === "P0" || priority === "P1" ? "high" : "medium",
    commercial_value: ["integration-guide", "mcp-server-profile", "deployment-guide", "security-guide", "enterprise-guide", "india-guide"].includes(family) ? "high" : "medium",
    difficulty_basis: "long-tail entity plus implementation intent; requires evidence validation before publication",
    quality_threshold: qualityTargetByFamily[family] || 90,
    minimum_words: minimumWordsByFamily[family] || 1800,
    quality_gates: ["intent", "evidence", "blueprint", "draft", "validation", "human_review", "publication_approval"],
    lifecycle_state: "candidate",
    status: "candidate",
    publish_approved: false,
    indexable: false,
    implementation_status: implementationStatus,
    canonical_owner: id,
    primary_intent_owner: `${family}:${slugify(primaryKeyword)}`,
    crawl_depth: crawlDepth,
    breadcrumbs: [
      { name: "Home", path: "/", url: canonical("/") },
      { name: titleCase(cluster), path: selectedParentHub, url: canonical(selectedParentHub) },
      { name: primaryEntity, path: canonicalPath, url: canonicalUrl },
    ],
    required_internal_link_slots: [
      "parent_hub",
      "sibling_pages",
      "related_tutorials",
      "related_troubleshooting",
      "related_security",
      "related_sdk",
      "related_framework",
      "related_server",
      "related_client",
      "related_deployment",
      "related_glossary",
    ],
  };
  records.push(record);
  routeOwners.set(canonicalPath, record);
  return record;
}

function fillFromCombos({ family, target, pathFor, entityFor, keywordFor, h1For, clusterFor, subclusterFor, secondaryFor, intent = "implementation", parentFor, titleFor, descriptionFor, itemsA, itemsB = [""], itemsC = [""] }) {
  for (const a of itemsA) {
    for (const b of itemsB) {
      for (const c of itemsC) {
        if (records.filter((record) => record.content_family === family).length >= target) return;
        const pathname = pathFor(a, b, c);
        const primaryEntity = entityFor(a, b, c);
        const cluster = clusterFor ? clusterFor(a, b, c) : pickCluster(pathname);
        makeRecord({
          pathname,
          family,
          cluster,
          subcluster: subclusterFor ? subclusterFor(a, b, c) : slugify(primaryEntity),
          primaryEntity,
          secondaryEntities: secondaryFor ? secondaryFor(a, b, c) : ["Model Context Protocol"],
          primaryKeyword: keywordFor(a, b, c),
          secondaryKeywords: [
            `${keywordFor(a, b, c)} guide`,
            `${keywordFor(a, b, c)} setup`,
            `${keywordFor(a, b, c)} MCP`,
          ],
          intent,
          h1: h1For(a, b, c),
          title: titleFor ? titleFor(a, b, c) : `${h1For(a, b, c)} | MCPServer.in`,
          description: descriptionFor ? descriptionFor(a, b, c) : `Candidate guide for ${keywordFor(a, b, c)}. Evidence, implementation details, and human review are required before publication approval.`,
          parentHub: parentFor ? parentFor(a, b, c) : `/categories/${cluster}/`,
        });
      }
    }
  }
}

function currentFamilyCount(family) {
  return records.filter((record) => record.content_family === family).length;
}

// Category hubs are generated first so all other records can resolve parent hubs.
for (const category of categories) {
  if (currentFamilyCount("category-hub") >= targets["category-hub"]) break;
  makeRecord({
    pathname: `/categories/${category.slug}/`,
    family: "category-hub",
    cluster: category.slug,
    primaryEntity: category.name,
    primaryKeyword: `${category.name} MCP servers`,
    secondaryKeywords: [`${category.name} MCP integrations`, `${category.name} MCP tutorials`],
    intent: "navigation",
    h1: `${category.name} MCP Servers and Guides`,
    title: `${category.name} MCP Servers and Guides | MCPServer.in`,
    description: `Candidate category hub for ${category.name.toLowerCase()} MCP servers, integrations, tutorials, troubleshooting, and security guidance.`,
    parentHub: "/mcp-server-directory/",
    crawlDepth: 2,
  });
}
for (const category of categories) {
  for (const modifier of categoryModifiers) {
    if (currentFamilyCount("category-hub") >= targets["category-hub"]) break;
    const subject = modifier === "overview" ? category.slug : `${category.slug}-${modifier}`;
    makeRecord({
      pathname: `/categories/${subject}/`,
      family: "category-hub",
      cluster: category.slug,
      subcluster: modifier,
      primaryEntity: `${category.name} ${titleCase(modifier)}`,
      primaryKeyword: `${category.name} ${modifier} MCP`,
      secondaryKeywords: [`${category.name} ${modifier} MCP pages`, `${category.name} ${modifier} MCP directory`],
      intent: "navigation",
      h1: `${category.name} ${titleCase(modifier)} MCP Hub`,
      title: `${category.name} ${titleCase(modifier)} MCP Hub | MCPServer.in`,
      description: `Candidate subcategory hub for ${category.name.toLowerCase()} ${modifier.replace(/-/g, " ")} pages.`,
      parentHub: `/categories/${category.slug}/`,
      crawlDepth: 3,
    });
  }
}

const requiredExampleSeeds = [
  {
    pathname: "/servers/github-mcp-server/",
    family: "mcp-server-profile",
    cluster: "developer-tools",
    primaryEntity: "GitHub MCP Server",
    primaryKeyword: "GitHub MCP server",
    h1: "GitHub MCP Server",
    parentHub: "/categories/developer-tools/",
  },
  {
    pathname: "/servers/postgresql-mcp-server/",
    family: "mcp-server-profile",
    cluster: "databases",
    primaryEntity: "PostgreSQL MCP Server",
    primaryKeyword: "PostgreSQL MCP server",
    h1: "PostgreSQL MCP Server",
    parentHub: "/categories/databases/",
  },
  {
    pathname: "/clients/claude-desktop/",
    family: "client-guide",
    cluster: "ai-ml",
    primaryEntity: "Claude Desktop",
    primaryKeyword: "Claude Desktop MCP",
    h1: "Claude Desktop MCP",
    parentHub: "/clients/",
  },
  {
    pathname: "/clients/cursor/",
    family: "client-guide",
    cluster: "ai-ml",
    primaryEntity: "Cursor",
    primaryKeyword: "Cursor MCP",
    h1: "Cursor MCP",
    parentHub: "/clients/",
  },
  {
    pathname: "/integrations/github/",
    family: "integration-guide",
    cluster: "developer-tools",
    primaryEntity: "GitHub",
    primaryKeyword: "GitHub MCP integration",
    h1: "GitHub MCP Integration Guide",
    parentHub: "/categories/developer-tools/",
  },
  {
    pathname: "/integrations/slack/",
    family: "integration-guide",
    cluster: "communication",
    primaryEntity: "Slack",
    primaryKeyword: "Slack MCP integration",
    h1: "Slack MCP Integration Guide",
    parentHub: "/categories/communication/",
  },
  {
    pathname: "/tutorials/build-mcp-server-python/",
    family: "tutorial",
    cluster: "developer-tools",
    primaryEntity: "Build MCP Server Python",
    primaryKeyword: "build MCP server Python",
    h1: "Build MCP Server Python",
    parentHub: "/categories/developer-tools/",
  },
  {
    pathname: "/tutorials/build-mcp-server-typescript/",
    family: "tutorial",
    cluster: "developer-tools",
    primaryEntity: "Build MCP Server TypeScript",
    primaryKeyword: "build MCP server TypeScript",
    h1: "Build MCP Server TypeScript",
    parentHub: "/categories/developer-tools/",
  },
  {
    pathname: "/tutorials/deploy-mcp-server-kubernetes/",
    family: "tutorial",
    cluster: "deployment",
    primaryEntity: "Deploy MCP Server Kubernetes",
    primaryKeyword: "deploy MCP server Kubernetes",
    h1: "Deploy MCP Server Kubernetes",
    parentHub: "/categories/deployment/",
  },
  {
    pathname: "/tutorials/secure-mcp-server/",
    family: "tutorial",
    cluster: "security",
    primaryEntity: "Secure MCP Server",
    primaryKeyword: "secure MCP server",
    h1: "Secure MCP Server",
    parentHub: "/categories/security/",
  },
  {
    pathname: "/compare/fastmcp-vs-official-sdk/",
    family: "comparison",
    cluster: "developer-tools",
    primaryEntity: "FastMCP vs Official SDK",
    primaryKeyword: "FastMCP vs official SDK",
    h1: "FastMCP vs Official SDK for MCP",
    parentHub: "/compare/",
  },
  {
    pathname: "/compare/claude-desktop-vs-cursor/",
    family: "comparison",
    cluster: "ai-ml",
    primaryEntity: "Claude Desktop vs Cursor",
    primaryKeyword: "Claude Desktop vs Cursor",
    h1: "Claude Desktop vs Cursor for MCP",
    parentHub: "/compare/",
  },
  {
    pathname: "/benchmarks/python-sdk-performance/",
    family: "news-release",
    cluster: "analytics",
    primaryEntity: "Python SDK Performance",
    primaryKeyword: "Python SDK performance benchmark",
    h1: "Python SDK Performance Benchmark",
    parentHub: "/benchmarks/",
  },
];

for (const seed of requiredExampleSeeds) {
  makeRecord({
    ...seed,
    subcluster: seed.cluster,
    secondaryEntities: ["Model Context Protocol"],
    secondaryKeywords: [`${seed.primaryKeyword} guide`, `${seed.primaryKeyword} setup`],
    intent: seed.family === "comparison" ? "comparison" : seed.family === "news-release" ? "news" : "implementation",
    title: `${seed.h1} | MCPServer.in`,
    description: `Canonical candidate for ${seed.primaryKeyword}. Evidence, implementation details, and human review are required before publication approval.`,
  });
}

fillFromCombos({
  family: "mcp-server-profile",
  target: targets["mcp-server-profile"],
  itemsA: platforms,
  itemsB: serverScopes,
  pathFor: (platform, scope) => `/servers/${scope ? `${platform}-${scope}` : platform}-mcp-server/`,
  entityFor: (platform, scope) => `${titleCase(platform)}${scope ? ` ${titleCase(scope)}` : ""} MCP Server`,
  keywordFor: (platform, scope) => `${titleCase(platform)}${scope ? ` ${titleCase(scope)}` : ""} MCP server`,
  h1For: (platform, scope) => `${titleCase(platform)}${scope ? ` ${titleCase(scope)}` : ""} MCP Server`,
  clusterFor: (platform) => pickCluster(platform),
  secondaryFor: () => ["MCP Server", "AI Agent", "MCP Client"],
  parentFor: (platform) => `/categories/${pickCluster(platform)}/`,
});

fillFromCombos({
  family: "integration-guide",
  target: targets["integration-guide"],
  itemsA: platforms,
  itemsB: integrationScopes,
  pathFor: (platform, scope) => `/integrations/${scope ? `${platform}-${scope}` : platform}/`,
  entityFor: (platform, scope) => `${titleCase(platform)}${scope ? ` ${titleCase(scope)}` : ""}`,
  keywordFor: (platform, scope) => `${titleCase(platform)}${scope ? ` ${titleCase(scope)}` : ""} MCP integration`,
  h1For: (platform, scope) => `${titleCase(platform)}${scope ? ` ${titleCase(scope)}` : ""} MCP Integration Guide`,
  clusterFor: (platform) => pickCluster(platform),
  secondaryFor: () => ["MCP Server", "Claude Desktop", "Cursor"],
  parentFor: (platform) => `/categories/${pickCluster(platform)}/`,
});

fillFromCombos({
  family: "client-integration-guide",
  target: targets["client-integration-guide"],
  itemsA: platforms.slice(0, 60),
  itemsB: clients,
  pathFor: (platform, client) => `/guides/connect-${platform}-mcp-server-to-${client}/`,
  entityFor: (platform, client) => `${titleCase(platform)} to ${titleCase(client)}`,
  keywordFor: (platform, client) => `connect ${titleCase(platform)} MCP server to ${titleCase(client)}`,
  h1For: (platform, client) => `Connect ${titleCase(platform)} MCP Server to ${titleCase(client)}`,
  clusterFor: (platform) => pickCluster(platform),
  secondaryFor: (platform, client) => [titleCase(platform), titleCase(client), "MCP Server"],
  parentFor: (platform) => `/categories/${pickCluster(platform)}/`,
});

fillFromCombos({
  family: "tutorial",
  target: targets.tutorial,
  itemsA: tutorialActions,
  itemsB: tutorialSubjects,
  pathFor: (action, subject) => `/tutorials/${action}-${subject}/`,
  entityFor: (action, subject) => `${titleCase(action)} ${titleCase(subject)}`,
  keywordFor: (action, subject) => `${action} ${subject.replace(/-/g, " ")}`,
  h1For: (action, subject) => `${titleCase(action)} ${titleCase(subject)}`,
  clusterFor: (action, subject) => pickCluster(subject),
  secondaryFor: () => ["MCP Server", "Implementation Tutorial"],
  parentFor: (action, subject) => `/categories/${pickCluster(subject)}/`,
});

fillFromCombos({
  family: "troubleshooting",
  target: targets.troubleshooting,
  itemsA: troubleshootingSymptoms,
  itemsB: environments,
  pathFor: (symptom, env) => `/troubleshooting/${symptom}-in-${env}/`,
  entityFor: (symptom, env) => `${titleCase(symptom)} in ${titleCase(env)}`,
  keywordFor: (symptom, env) => `${symptom.replace(/-/g, " ")} in ${env.replace(/-/g, " ")}`,
  h1For: (symptom, env) => `Fix ${titleCase(symptom)} in ${titleCase(env)}`,
  clusterFor: (symptom, env) => pickCluster(`${symptom}-${env}`),
  secondaryFor: (symptom, env) => [titleCase(env), "MCP Troubleshooting", "MCP Server"],
  parentFor: (symptom, env) => `/categories/${pickCluster(`${symptom}-${env}`)}/`,
});

const comparisonGroups = [
  ["fastmcp", "official-sdk", "langchain-mcp", "llamaindex-mcp", "spring-ai-mcp", "semantic-kernel-mcp"],
  ["claude-desktop", "cursor", "vscode", "cline", "continue", "windsurf", "github-copilot", "chatgpt"],
  ["stdio", "streamable-http", "http-sse", "websocket", "local-mcp-server", "remote-mcp-server"],
  ["python-sdk", "typescript-sdk", "java-sdk", "go-sdk", "rust-sdk", "c-sharp-sdk"],
  ["aws", "azure", "google-cloud", "cloudflare", "vercel", "railway", "render", "fly"],
  ["postgresql", "mysql", "mongodb", "redis", "sqlite", "supabase", "qdrant", "pinecone"],
  ["oauth", "api-keys", "mtls", "rbac", "abac", "zero-trust", "sandboxing", "audit-logging"],
  ["mcp", "rest-api", "openapi", "function-calling", "plugins", "langchain-tools", "agent-protocol"],
];
for (const group of comparisonGroups) {
  for (let i = 0; i < group.length; i += 1) {
    for (let j = i + 1; j < group.length; j += 1) {
      if (currentFamilyCount("comparison") >= targets.comparison) break;
      const a = group[i];
      const b = group[j];
      makeRecord({
        pathname: `/compare/${a}-vs-${b}/`,
        family: "comparison",
        cluster: pickCluster(`${a}-${b}`),
        subcluster: "decision",
        primaryEntity: `${titleCase(a)} vs ${titleCase(b)}`,
        secondaryEntities: [titleCase(a), titleCase(b), "Model Context Protocol"],
        primaryKeyword: `${titleCase(a)} vs ${titleCase(b)}`,
        secondaryKeywords: [`${titleCase(a)} compared with ${titleCase(b)}`, `${titleCase(a)} or ${titleCase(b)} for MCP`],
        intent: "comparison",
        h1: `${titleCase(a)} vs ${titleCase(b)} for MCP`,
        title: `${titleCase(a)} vs ${titleCase(b)} for MCP | MCPServer.in`,
        description: `Candidate decision page comparing ${titleCase(a)} and ${titleCase(b)} for MCP implementation, deployment, or governance workflows.`,
        parentHub: "/compare/",
      });
    }
  }
}
fillFromCombos({
  family: "comparison",
  target: targets.comparison,
  itemsA: platforms.slice(0, 80),
  itemsB: platforms.slice(1, 81),
  pathFor: (a, b) => a === b ? `/compare/${a}-mcp-server-vs-official-sdk/` : `/compare/${a}-vs-${b}/`,
  entityFor: (a, b) => `${titleCase(a)} vs ${titleCase(b)}`,
  keywordFor: (a, b) => `${titleCase(a)} vs ${titleCase(b)} MCP`,
  h1For: (a, b) => `${titleCase(a)} vs ${titleCase(b)} for MCP`,
  clusterFor: (a, b) => pickCluster(`${a}-${b}`),
  parentFor: () => "/compare/",
  intent: "comparison",
});

fillFromCombos({
  family: "best-list",
  target: targets["best-list"],
  itemsA: bestTopics,
  itemsB: bestQualifiers,
  pathFor: (topic, qualifier) => `/best/${qualifier ? `${topic}-${qualifier}` : topic}/`,
  entityFor: (topic, qualifier) => `${titleCase(topic)}${qualifier ? ` ${titleCase(qualifier)}` : ""}`,
  keywordFor: (topic, qualifier) => `best ${topic.replace(/-/g, " ")}${qualifier ? ` ${qualifier.replace(/-/g, " ")}` : ""}`,
  h1For: (topic, qualifier) => `Best ${titleCase(topic)}${qualifier ? ` ${titleCase(qualifier)}` : ""}`,
  clusterFor: (topic, qualifier) => pickCluster(`${topic}-${qualifier}`),
  parentFor: () => "/best/",
  intent: "commercial-investigation",
});

fillFromCombos({
  family: "glossary",
  target: targets.glossary,
  itemsA: glossaryBases,
  itemsB: glossaryQualifiers,
  pathFor: (term, qualifier) => `/glossary/${qualifier ? `${term}-${qualifier}` : term}/`,
  entityFor: (term, qualifier) => `${titleCase(term)}${qualifier ? ` ${titleCase(qualifier)}` : ""}`,
  keywordFor: (term, qualifier) => `${term.replace(/-/g, " ")}${qualifier ? ` ${qualifier.replace(/-/g, " ")}` : ""}`,
  h1For: (term, qualifier) => `${titleCase(term)}${qualifier ? ` ${titleCase(qualifier)}` : ""}`,
  clusterFor: (term) => pickCluster(term),
  parentFor: () => "/glossary/",
  intent: "definition",
});

fillFromCombos({
  family: "enterprise-guide",
  target: targets["enterprise-guide"],
  itemsA: enterpriseTopics,
  itemsB: enterpriseIntents,
  pathFor: (topic, intent) => `/enterprise/${intent ? `${topic}-${intent}` : topic}/`,
  entityFor: (topic, intent) => `${titleCase(topic)}${intent ? ` ${titleCase(intent)}` : ""}`,
  keywordFor: (topic, intent) => `enterprise MCP ${topic.replace(/-/g, " ")}${intent ? ` ${intent.replace(/-/g, " ")}` : ""}`,
  h1For: (topic, intent) => `Enterprise MCP ${titleCase(topic)}${intent ? ` ${titleCase(intent)}` : ""}`,
  clusterFor: () => "enterprise",
  parentFor: () => "/enterprise/",
});

fillFromCombos({
  family: "sdk-framework-guide",
  target: targets["sdk-framework-guide"],
  itemsA: [...languages.map((item) => `sdk-${item}`), ...frameworks.map((item) => `framework-${item}`)],
  itemsB: sdkTopics,
  pathFor: (item, topic) => {
    const [kind, ...rest] = item.split("-");
    const slug = rest.join("-");
    const base = kind === "sdk" ? `/sdk/${slug}/` : `/frameworks/${slug}/`;
    return topic ? `${base.replace(/\/$/, "")}/${topic}/` : base;
  },
  entityFor: (item, topic) => {
    const [kind, ...rest] = item.split("-");
    return `${titleCase(rest.join("-"))} ${kind.toUpperCase()}${topic ? ` ${titleCase(topic)}` : ""}`;
  },
  keywordFor: (item, topic) => {
    const [kind, ...rest] = item.split("-");
    return `${titleCase(rest.join("-"))} MCP ${kind}${topic ? ` ${topic.replace(/-/g, " ")}` : ""}`;
  },
  h1For: (item, topic) => {
    const [kind, ...rest] = item.split("-");
    return `${titleCase(rest.join("-"))} MCP ${kind === "sdk" ? "SDK" : "Framework"}${topic ? ` ${titleCase(topic)}` : ""}`;
  },
  clusterFor: () => "developer-tools",
  parentFor: (item) => item.startsWith("sdk-") ? "/sdk/" : "/frameworks/",
});

fillFromCombos({
  family: "client-guide",
  target: targets["client-guide"],
  itemsA: clients,
  itemsB: ["", "setup", "configuration", "security", "troubleshooting", "best-servers", "transport-support", "authentication", "remote-server-support", "oauth", "stdio", "streamable-http"],
  pathFor: (client, topic) => topic ? `/clients/${client}/${topic}/` : `/clients/${client}/`,
  entityFor: (client, topic) => `${titleCase(client)}${topic ? ` ${titleCase(topic)}` : ""}`,
  keywordFor: (client, topic) => `${titleCase(client)} MCP${topic ? ` ${topic.replace(/-/g, " ")}` : ""}`,
  h1For: (client, topic) => `${titleCase(client)} MCP${topic ? ` ${titleCase(topic)}` : ""}`,
  clusterFor: () => "ai-ml",
  parentFor: () => "/clients/",
});

fillFromCombos({
  family: "deployment-guide",
  target: targets["deployment-guide"],
  itemsA: cloudPlatforms,
  itemsB: deploymentModels,
  pathFor: (platform, model) => model ? `/deployment/${platform}/${model}/` : `/deployment/${platform}/`,
  entityFor: (platform, model) => `${titleCase(platform)}${model ? ` ${titleCase(model)}` : ""}`,
  keywordFor: (platform, model) => `deploy MCP server on ${titleCase(platform)}${model ? ` ${model.replace(/-/g, " ")}` : ""}`,
  h1For: (platform, model) => `${titleCase(platform)} MCP Server Deployment${model ? ` ${titleCase(model)}` : ""}`,
  clusterFor: () => "deployment",
  parentFor: () => "/deployment/",
});

fillFromCombos({
  family: "database-guide",
  target: targets["database-guide"],
  itemsA: databases,
  itemsB: databaseIntents,
  pathFor: (database, intent) => `/databases/${database}/${intent}/`,
  entityFor: (database, intent) => `${titleCase(database)} ${titleCase(intent)}`,
  keywordFor: (database, intent) => `${titleCase(database)} MCP server ${intent.replace(/-/g, " ")}`,
  h1For: (database, intent) => `${titleCase(database)} MCP Server ${titleCase(intent)}`,
  clusterFor: (database) => pickCluster(database),
  parentFor: () => "/categories/databases/",
});

fillFromCombos({
  family: "security-guide",
  target: targets["security-guide"],
  itemsA: securityControls,
  itemsB: securityIntents,
  pathFor: (control, intent) => intent ? `/security/${control}/${intent}/` : `/security/${control}/`,
  entityFor: (control, intent) => `${titleCase(control)}${intent ? ` ${titleCase(intent)}` : ""}`,
  keywordFor: (control, intent) => `MCP ${control.replace(/-/g, " ")}${intent ? ` ${intent.replace(/-/g, " ")}` : ""}`,
  h1For: (control, intent) => `MCP ${titleCase(control)}${intent ? ` ${titleCase(intent)}` : ""}`,
  clusterFor: () => "security",
  parentFor: () => "/security/",
});

fillFromCombos({
  family: "template",
  target: targets.template,
  itemsA: templateBases,
  itemsB: ["", "starter", "docker", "oauth", "testing", "production"],
  pathFor: (base, variant) => `/templates/${variant ? `${base}-${variant}` : base}/`,
  entityFor: (base, variant) => `${titleCase(base)}${variant ? ` ${titleCase(variant)}` : ""} Template`,
  keywordFor: (base, variant) => `${base.replace(/-/g, " ")} MCP server template${variant ? ` ${variant}` : ""}`,
  h1For: (base, variant) => `${titleCase(base)}${variant ? ` ${titleCase(variant)}` : ""} MCP Template`,
  clusterFor: (base) => pickCluster(base),
  parentFor: () => "/templates/",
});

fillFromCombos({
  family: "example-project",
  target: targets["example-project"],
  itemsA: projectBases,
  itemsB: projectQualifiers,
  pathFor: (project, qualifier) => `/projects/${qualifier ? `${project}-${qualifier}` : project}/`,
  entityFor: (project, qualifier) => `${titleCase(project)}${qualifier ? ` ${titleCase(qualifier)}` : ""}`,
  keywordFor: (project, qualifier) => `${project.replace(/-/g, " ")} example project${qualifier ? ` ${qualifier.replace(/-/g, " ")}` : ""}`,
  h1For: (project, qualifier) => `${titleCase(project)}${qualifier ? ` ${titleCase(qualifier)}` : ""} Project`,
  clusterFor: (project) => pickCluster(project),
  parentFor: () => "/projects/",
});

fillFromCombos({
  family: "registry-guide",
  target: targets["registry-guide"],
  itemsA: registryTopics,
  itemsB: registryIntents,
  pathFor: (topic, intent) => intent ? `/registry/${topic}/${intent}/` : `/registry/${topic}/`,
  entityFor: (topic, intent) => `${titleCase(topic)}${intent ? ` ${titleCase(intent)}` : ""}`,
  keywordFor: (topic, intent) => `MCP registry ${topic.replace(/-/g, " ")}${intent ? ` ${intent.replace(/-/g, " ")}` : ""}`,
  h1For: (topic, intent) => `MCP Registry ${titleCase(topic)}${intent ? ` ${titleCase(intent)}` : ""}`,
  clusterFor: () => "registry",
  parentFor: () => "/registry/",
});

fillFromCombos({
  family: "india-guide",
  target: targets["india-guide"],
  itemsA: indiaEntities,
  itemsB: indiaIntents,
  pathFor: (entity, intent) => {
    if (intent === "mcp-server") return `/integrations/${entity}-mcp-server/`;
    if (intent === "workflow") return `/guides/${entity}-mcp-workflow/`;
    return `/india/${entity}-${intent}/`;
  },
  entityFor: (entity, intent) => `${titleCase(entity)} ${titleCase(intent)}`,
  keywordFor: (entity, intent) => `${titleCase(entity)} MCP ${intent.replace(/-/g, " ")}`,
  h1For: (entity, intent) => `${titleCase(entity)} MCP ${titleCase(intent)}`,
  clusterFor: () => "india",
  parentFor: () => "/categories/india/",
});

fillFromCombos({
  family: "news-release",
  target: targets["news-release"],
  itemsA: newsEvents,
  itemsB: newsEntities,
  pathFor: (event, entity) => {
    if (event === "benchmark-results" && entity) return `/benchmarks/${entity}-performance/`;
    return `/news/${entity ? `${entity}-${event}` : event}/`;
  },
  entityFor: (event, entity) => `${entity ? `${titleCase(entity)} ` : ""}${titleCase(event)}`,
  keywordFor: (event, entity) => `${entity ? `${titleCase(entity)} ` : ""}${event.replace(/-/g, " ")}`,
  h1For: (event, entity) => `${entity ? `${titleCase(entity)} ` : ""}${titleCase(event)}`,
  clusterFor: (event) => event.includes("benchmark") ? "analytics" : "news",
  parentFor: (event) => event.includes("benchmark") ? "/benchmarks/" : "/news/",
  intent: "news",
});

const expectedTotal = Object.values(targets).reduce((sum, count) => sum + count, 0);
if (records.length !== expectedTotal) {
  throw new Error(`Generated ${records.length} records; expected ${expectedTotal}`);
}

const allCandidatePaths = new Set(records.map((record) => record.route));
const knownPaths = new Set([...existingRoutes, ...allCandidatePaths]);

function relatedFor(record, index) {
  const sameFamily = records.filter((item) => item.content_family === record.content_family && item.route !== record.route);
  const sameCluster = records.filter((item) => item.cluster === record.cluster && item.route !== record.route);
  const findFamily = (family) => records.find((item) => item.content_family === family && (item.cluster === record.cluster || item.route !== record.route));
  const links = {
    parent_hub: [record.parent_hub_path],
    sibling_pages: rotate(sameFamily.map((item) => item.route), index, 3),
    related_tutorials: rotate(records.filter((item) => item.content_family === "tutorial" && item.cluster === record.cluster).map((item) => item.route), index, 2),
    related_troubleshooting: rotate(records.filter((item) => item.content_family === "troubleshooting" && item.cluster === record.cluster).map((item) => item.route), index, 2),
    related_security: rotate(records.filter((item) => item.content_family === "security-guide").map((item) => item.route), index, 2),
    related_sdk: rotate(records.filter((item) => item.content_family === "sdk-framework-guide").map((item) => item.route), index, 2),
    related_framework: rotate(records.filter((item) => item.content_family === "sdk-framework-guide" && item.route.startsWith("/frameworks/")).map((item) => item.route), index, 1),
    related_server: rotate(records.filter((item) => item.content_family === "mcp-server-profile" && item.cluster === record.cluster).map((item) => item.route), index, 2),
    related_client: rotate(records.filter((item) => item.content_family === "client-guide").map((item) => item.route), index, 2),
    related_deployment: rotate(records.filter((item) => item.content_family === "deployment-guide").map((item) => item.route), index, 2),
    related_glossary: rotate(records.filter((item) => item.content_family === "glossary").map((item) => item.route), index, 3),
  };
  for (const [slot, paths] of Object.entries(links)) {
    if (paths.length === 0) {
      const fallback = findFamily(slot.includes("tutorial") ? "tutorial" : "category-hub")?.route;
      if (fallback) links[slot] = [fallback];
    }
  }
  const flattened = uniq(Object.values(links).flat()).filter((item) => item !== record.route);
  if (flattened.length < 8) {
    links.sibling_pages = uniq([...links.sibling_pages, ...rotate(sameCluster.map((item) => item.route), index, 8 - flattened.length)]);
  }
  return links;
}

const internalLinkGraph = {};
records.forEach((record, index) => {
  const slots = relatedFor(record, index);
  record.internal_link_slots = Object.fromEntries(
    Object.entries(slots).map(([key, values]) => [key, uniq(values).filter((item) => item && item !== record.route)])
  );
  record.internal_links = uniq(Object.values(record.internal_link_slots).flat()).map((pathname) => canonical(pathname));
  internalLinkGraph[record.route] = {
    url: record.url,
    parent_hub: record.parent_hub,
    slots: Object.fromEntries(Object.entries(record.internal_link_slots).map(([key, values]) => [key, values.map((item) => canonical(item))])),
    outlinks: record.internal_links,
    crawl_depth: record.crawl_depth,
    orphan: false,
  };
});

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates].sort();
}

function validate(recordsToValidate) {
  const countByFamily = {};
  for (const record of recordsToValidate) countByFamily[record.content_family] = (countByFamily[record.content_family] || 0) + 1;
  const validation = {
    generatedAt,
    expected_total: expectedTotal,
    actual_total: recordsToValidate.length,
    target_counts: targets,
    actual_counts: countByFamily,
    duplicate_urls: duplicateValues(recordsToValidate.map((record) => record.url)),
    duplicate_canonical_urls: duplicateValues(recordsToValidate.map((record) => record.canonical_url)),
    duplicate_h1s: duplicateValues(recordsToValidate.map((record) => record.proposed_h1)),
    duplicate_primary_intents: duplicateValues(recordsToValidate.map((record) => record.primary_intent_owner)),
    duplicate_entities: duplicateValues(recordsToValidate.map((record) => record.entity_uid)),
    unresolved_entities: recordsToValidate.filter((record) => !record.primary_entity || !record.entity_uid).map((record) => record.id),
    unresolved_parent_hubs: recordsToValidate.filter((record) => !knownPaths.has(record.parent_hub_path)).map((record) => ({ id: record.id, parent_hub_path: record.parent_hub_path })),
    missing_evidence_requirements: recordsToValidate.filter((record) => !Array.isArray(record.evidence_requirements) || record.evidence_requirements.length === 0).map((record) => record.id),
    missing_schemas: recordsToValidate.filter((record) => !globalSchemas.every((schema) => record.schema_types.includes(schema)) || record.schema_types.length <= globalSchemas.length).map((record) => record.id),
    missing_breadcrumbs: recordsToValidate.filter((record) => !Array.isArray(record.breadcrumbs) || record.breadcrumbs.length < 2).map((record) => record.id),
    missing_blueprint: recordsToValidate.filter((record) => !record.blueprint || !Object.values(blueprintByFamily).includes(record.blueprint)).map((record) => record.id),
    missing_quality_gates: recordsToValidate.filter((record) => !Array.isArray(record.quality_gates) || record.quality_gates.length < 7 || !record.quality_threshold).map((record) => record.id),
    placeholder_routes: recordsToValidate.filter((record) => /\/(?:topic|tool|guide|platform|term)-\d+\//.test(record.route)).map((record) => record.route),
    non_candidate_records: recordsToValidate.filter((record) => record.status !== "candidate" || record.lifecycle_state !== "candidate" || record.publish_approved !== false || record.indexable !== false).map((record) => record.id),
    numeric_suffix_routes: recordsToValidate.filter((record) => !record.route.startsWith("/news/") && /-\d+\/$/.test(record.route)).map((record) => record.route),
    invalid_canonical_format: recordsToValidate.filter((record) => !record.canonical_url.startsWith(`${baseUrl}/`) || !record.canonical_url.endsWith("/") || /[A-Z]/.test(new URL(record.canonical_url).pathname)).map((record) => record.canonical_url),
    broken_internal_links: [],
    orphan_pages: [],
    max_crawl_depth: Math.max(...recordsToValidate.map((record) => record.crawl_depth)),
  };
  const incoming = new Map(recordsToValidate.map((record) => [record.route, 0]));
  for (const record of recordsToValidate) {
    const paths = uniq(Object.values(record.internal_link_slots || {}).flat());
    if (paths.length === 0) validation.orphan_pages.push(record.route);
    for (const pathname of paths) {
      if (!knownPaths.has(pathname)) validation.broken_internal_links.push({ source: record.route, target: pathname });
      if (incoming.has(pathname)) incoming.set(pathname, incoming.get(pathname) + 1);
    }
  }
  for (const [pathname, count] of incoming) {
    const record = routeOwners.get(pathname);
    if (count === 0 && record?.content_family !== "category-hub") validation.orphan_pages.push(pathname);
  }
  validation.errors = [
    validation.actual_total === validation.expected_total ? null : `Expected ${validation.expected_total} records, found ${validation.actual_total}`,
    ...Object.entries(targets).filter(([family, count]) => countByFamily[family] !== count).map(([family, count]) => `Expected ${count} ${family}, found ${countByFamily[family] || 0}`),
    validation.duplicate_urls.length ? "duplicate URLs" : null,
    validation.duplicate_canonical_urls.length ? "duplicate canonical URLs" : null,
    validation.duplicate_h1s.length ? "duplicate H1s" : null,
    validation.duplicate_primary_intents.length ? "duplicate primary intents" : null,
    validation.duplicate_entities.length ? "duplicate entities" : null,
    validation.unresolved_entities.length ? "unresolved entities" : null,
    validation.unresolved_parent_hubs.length ? "unresolved parent hubs" : null,
    validation.missing_evidence_requirements.length ? "missing evidence requirements" : null,
    validation.missing_schemas.length ? "missing schemas" : null,
    validation.missing_breadcrumbs.length ? "missing breadcrumbs" : null,
    validation.missing_blueprint.length ? "missing blueprint" : null,
    validation.missing_quality_gates.length ? "missing quality gates" : null,
    validation.placeholder_routes.length ? "placeholder routes" : null,
    validation.non_candidate_records.length ? "non-candidate lifecycle defaults" : null,
    validation.numeric_suffix_routes.length ? "numeric suffix routes" : null,
    validation.invalid_canonical_format.length ? "invalid canonical format" : null,
    validation.broken_internal_links.length ? "broken internal links" : null,
    validation.orphan_pages.length ? "orphan pages" : null,
    validation.max_crawl_depth > 4 ? `crawl depth exceeds 4: ${validation.max_crawl_depth}` : null,
  ].filter(Boolean);
  validation.passed = validation.errors.length === 0;
  return validation;
}

const validation = validate(records);

const entityGraph = {
  generatedAt,
  canonical_base: baseUrl,
  lifecycle,
  nodes: records.map((record) => ({
    id: record.graph_node_id,
    candidate_id: record.id,
    type: record.entity_type,
    name: record.primary_entity,
    canonical_url: record.canonical_url,
    route: record.route,
    cluster: record.cluster,
    status: record.status,
    publish_approved: false,
    indexable: false,
    evidence_status: record.evidence_status,
  })),
  edges: records.flatMap((record) => uniq(Object.values(record.internal_link_slots).flat()).map((target) => ({
    from: record.graph_node_id,
    to_route: target,
    to_url: canonical(target),
    relationship: target === record.parent_hub_path ? "parent_hub" : "internal_link",
  }))),
};

const routeRegistry = {
  generatedAt,
  canonical_base: baseUrl,
  route_architecture: {
    canonical_only: true,
    placeholder_routes_allowed: false,
    lowercase: true,
    trailing_slash: true,
    indexed_candidates: 0,
  },
  known_existing_hubs: [...existingRoutes].sort().map((pathname) => ({ route: pathname, url: canonical(pathname), source: "existing-site-hub" })),
  routes: records.map((record) => ({
    id: record.id,
    route: record.route,
    url: record.url,
    canonical_url: record.canonical_url,
    content_family: record.content_family,
    status: record.status,
    publish_approved: false,
    indexable: false,
    parent_hub: record.parent_hub,
    blueprint: record.blueprint,
  })),
};

const sitemapRegistry = {
  generatedAt,
  canonical_base: baseUrl,
  active_indexable_urls: [],
  candidate_urls_excluded_from_sitemaps: records.length,
  reason: "All generated master manifest records start as SAFE-DEEP candidates with indexable=false.",
  future_sitemap_partitions: Object.fromEntries(Object.keys(targets).map((family) => [family, {
    candidate_count: records.filter((record) => record.content_family === family).length,
    sitemap_enabled_when: "publish_approved && published && indexable",
  }])),
};

const searchIndex = {
  generatedAt,
  active_index_size: 0,
  candidate_index_size: records.length,
  note: "Candidate records are stored for editorial discovery but must not power public indexable search surfaces until published.",
  documents: records.map((record) => ({
    id: record.id,
    url: record.url,
    route: record.route,
    title: record.proposed_h1,
    content_family: record.content_family,
    cluster: record.cluster,
    primary_entity: record.primary_entity,
    primary_keyword: record.primary_keyword,
    secondary_keywords: record.secondary_keywords,
    indexable: false,
    lifecycle_state: "candidate",
  })),
};

const publicationQueue = {
  generatedAt,
  lifecycle,
  buckets: {
    candidate: records.map((record) => record.id),
    intent_validated: [],
    evidence_complete: [],
    blueprint_approved: [],
    generated_draft: [],
    automated_validation: [],
    human_review: [],
    publish_approved: [],
    published: [],
    indexed: [],
  },
  records: records.map((record) => ({
    id: record.id,
    url: record.url,
    content_family: record.content_family,
    priority: record.priority,
    lifecycle_state: record.lifecycle_state,
    publish_approved: false,
    indexable: false,
    next_required_step: "intent_validation",
  })),
};

const editorialQueue = {
  generatedAt,
  records: records.map((record) => ({
    id: record.id,
    url: record.url,
    h1: record.proposed_h1,
    content_family: record.content_family,
    priority: record.priority,
    assignee_role: record.content_family === "security-guide" ? "security editor" : record.content_family === "news-release" ? "ecosystem researcher" : "technical editor",
    editorial_status: "needs_intent_validation",
    required_review: ["intent owner", "evidence owner", "schema reviewer", "human editor"],
  })),
};

const qualityQueue = {
  generatedAt,
  records: records.map((record) => ({
    id: record.id,
    url: record.url,
    content_family: record.content_family,
    quality_threshold: record.quality_threshold,
    current_state: "candidate",
    blocking_gates: ["intent_validation", "evidence_collection", "blueprint_completion", "draft_validation", "human_review"],
    publish_approved: false,
    indexable: false,
  })),
};

const contentBatches = {
  generatedAt,
  batches: [
    { name: "foundation", size: 100, candidate_ids: records.slice(0, 100).map((record) => record.id), purpose: "Validate templates, evidence, links, and production rendering." },
    { name: "core-ecosystem", size: 500, candidate_ids: records.slice(100, 600).map((record) => record.id), purpose: "Cover major MCP clients, servers, SDKs, integrations, deployment, and security." },
    { name: "entity-clusters", size: 1500, candidate_ids: records.slice(600, 2100).map((record) => record.id), purpose: "Complete major topical and entity relationships." },
    { name: "long-tail-expansion", size: 2900, candidate_ids: records.slice(2100, 5000).map((record) => record.id), purpose: "Fill validated implementation, troubleshooting, glossary, India, registry, and news gaps." },
  ],
  cumulative_total: records.length,
};

const breadcrumbRegistry = {
  generatedAt,
  breadcrumbs: Object.fromEntries(records.map((record) => [record.route, record.breadcrumbs])),
};

const canonicalRegistry = {
  generatedAt,
  canonical_base: baseUrl,
  canonical_count: records.length,
  records: records.map((record) => ({
    id: record.id,
    route: record.route,
    canonical_url: record.canonical_url,
    primary_intent_owner: record.primary_intent_owner,
    canonical_owner: record.canonical_owner,
    indexable: false,
    publish_approved: false,
  })),
};

const schemaRegistry = {
  generatedAt,
  global_required_schemas: globalSchemas,
  family_schema_map: Object.fromEntries(Object.entries(schemaByFamily).map(([family, schemas]) => [family, uniq([...globalSchemas, ...schemas])])),
  records: records.map((record) => ({
    id: record.id,
    route: record.route,
    schemas: record.schema_types,
    schema_status: "declared_pending_visible_content_validation",
  })),
};

const evidenceManifest = {
  generatedAt,
  records: records.map((record) => ({
    id: record.id,
    url: record.url,
    evidence_class: record.evidence_class,
    evidence_status: record.evidence_status,
    evidence_requirements: record.evidence_requirements,
    freshness_class: record.freshness_class,
  })),
};

const safeDeepLedger = {
  generatedAt,
  status: validation.passed ? "passed" : "failed",
  governance: {
    default_status: "candidate",
    default_publish_approved: false,
    default_indexable: false,
    lifecycle,
  },
  validation,
  events: [
    { timestamp: generatedAt, event: "MASTER_CANONICAL_ARCHITECTURE_GENERATED", status: validation.passed ? "passed" : "failed", summary: `Generated ${records.length} canonical candidate routes with placeholder routes excluded.` },
    { timestamp: generatedAt, event: "SAFE_DEEP_DEFAULTS_APPLIED", status: "passed", summary: "Every record starts as candidate, publish_approved=false, indexable=false." },
    { timestamp: generatedAt, event: "INTERNAL_LINK_GRAPH_GENERATED", status: validation.broken_internal_links.length === 0 ? "passed" : "failed", summary: "Generated parent, sibling, tutorial, troubleshooting, security, SDK, framework, server, client, deployment, and glossary link slots." },
  ],
};

const masterManifest = {
  generatedAt,
  manifest_version: "2.0.0-candidate-canonical",
  canonical_base: baseUrl,
  source_prompt: "MCPServer.in master content manifest replacement architecture",
  total_candidates: records.length,
  allocation: targets,
  allocation_note: `The source prompt requested exactly 5,000 records, but its detailed family table sums to ${sourcePromptAllocationSum}. This manifest normalizes the family counts to exactly 5,000 while preserving every requested content family.`,
  capacity_targets: capacityTargets,
  lifecycle,
  governance: {
    all_records_status: "candidate",
    publish_approved: false,
    indexable: false,
    placeholder_routes_replaced: true,
    canonical_route_rules: ["https", "www host", "lowercase", "trailing slash", "no tracking parameters", "no arbitrary numeric suffixes"],
  },
  records,
};

const duplicateReport = {
  generatedAt,
  ...validation,
};

const intentMap = {
  generatedAt,
  intents: records.map((record) => ({
    id: record.id,
    url: record.url,
    primary_intent_owner: record.primary_intent_owner,
    search_intent: record.search_intent,
    primary_keyword: record.primary_keyword,
    content_family: record.content_family,
  })),
};

const entityMap = {
  generatedAt,
  entities: records.map((record) => ({
    id: record.id,
    entity_uid: record.entity_uid,
    primary_entity: record.primary_entity,
    secondary_entities: record.secondary_entities,
    canonical_url: record.canonical_url,
    content_family: record.content_family,
    cluster: record.cluster,
  })),
};

function csvEscape(value) {
  if (Array.isArray(value)) return csvEscape(value.join("|"));
  const string = String(value ?? "");
  return /[",\n]/.test(string) ? `"${string.replace(/"/g, '""')}"` : string;
}

function toCsv(rows) {
  const headers = [
    "id", "url", "route", "content_family", "cluster", "subcluster", "primary_entity",
    "primary_keyword", "search_intent", "proposed_h1", "canonical_url", "parent_hub",
    "schema_types", "blueprint", "priority", "priority_score", "quality_threshold",
    "lifecycle_state", "publish_approved", "indexable",
  ];
  return [headers.join(","), ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(","))].join("\n") + "\n";
}

function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function writeMinimalXlsx(filePath, rows) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mcpserver-xlsx-"));
  fs.mkdirSync(path.join(tmp, "_rels"), { recursive: true });
  fs.mkdirSync(path.join(tmp, "xl", "_rels"), { recursive: true });
  fs.mkdirSync(path.join(tmp, "xl", "worksheets"), { recursive: true });
  const headers = ["id", "url", "content_family", "cluster", "primary_entity", "primary_keyword", "proposed_h1", "priority", "lifecycle_state", "publish_approved", "indexable"];
  const sheetRows = [headers, ...rows.map((row) => headers.map((header) => row[header]))];
  const sheetData = sheetRows.map((row, rIdx) => {
    const cells = row.map((value, cIdx) => {
      const col = String.fromCharCode(65 + cIdx);
      return `<c r="${col}${rIdx + 1}" t="inlineStr"><is><t>${xmlEscape(Array.isArray(value) ? value.join("|") : value)}</t></is></c>`;
    }).join("");
    return `<row r="${rIdx + 1}">${cells}</row>`;
  }).join("");
  fs.writeFileSync(path.join(tmp, "[Content_Types].xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`);
  fs.writeFileSync(path.join(tmp, "_rels", ".rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`);
  fs.writeFileSync(path.join(tmp, "xl", "workbook.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="URL Candidates" sheetId="1" r:id="rId1"/></sheets></workbook>`);
  fs.writeFileSync(path.join(tmp, "xl", "_rels", "workbook.xml.rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`);
  fs.writeFileSync(path.join(tmp, "xl", "worksheets", "sheet1.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetData}</sheetData></worksheet>`);
  fs.rmSync(filePath, { force: true });
  execFileSync("zip", ["-qr", filePath, "."], { cwd: tmp });
  fs.rmSync(tmp, { recursive: true, force: true });
}

function treeMarkdown() {
  const lines = ["# MCPServer.in 5,000 Canonical URL Tree", "", `Generated: ${generatedAt}`, ""];
  for (const family of Object.keys(targets)) {
    const familyRecords = records.filter((record) => record.content_family === family);
    lines.push(`## ${titleCase(family)} (${familyRecords.length})`, "");
    const byCluster = {};
    for (const record of familyRecords) {
      byCluster[record.cluster] ||= [];
      byCluster[record.cluster].push(record);
    }
    for (const [cluster, clusterRecords] of Object.entries(byCluster)) {
      lines.push(`### ${titleCase(cluster)} (${clusterRecords.length})`);
      for (const record of clusterRecords.slice(0, 20)) lines.push(`- ${record.route} — ${record.proposed_h1}`);
      if (clusterRecords.length > 20) lines.push(`- ... ${clusterRecords.length - 20} more`);
      lines.push("");
    }
  }
  return lines.join("\n");
}

function clusterSummaryMarkdown() {
  const lines = ["# MCPServer.in 5,000 Candidate Cluster Summary", "", `Generated: ${generatedAt}`, ""];
  lines.push("| Content family | Count | P0 | P1 | P2 | P3 |");
  lines.push("|---|---:|---:|---:|---:|---:|");
  for (const family of Object.keys(targets)) {
    const familyRecords = records.filter((record) => record.content_family === family);
    const counts = Object.fromEntries(["P0", "P1", "P2", "P3"].map((priority) => [priority, familyRecords.filter((record) => record.priority === priority).length]));
    lines.push(`| ${family} | ${familyRecords.length} | ${counts.P0} | ${counts.P1} | ${counts.P2} | ${counts.P3} |`);
  }
  lines.push("", "## Governance", "", "- All records are candidates.", "- No records are publication-approved.", "- No records are indexable.", "- Placeholder-style routes are excluded from the generated canonical architecture.");
  return lines.join("\n");
}

function publicationPlanMarkdown() {
  return `# MCPServer.in 5,000 Candidate Publication Plan

Generated: ${generatedAt}

## Lifecycle

${lifecycle.map((state, index) => `${index + 1}. ${state}`).join("\n")}

## Batch Plan

| Batch | Size | Purpose |
|---|---:|---|
${contentBatches.batches.map((batch) => `| ${batch.name} | ${batch.size} | ${batch.purpose} |`).join("\n")}

## Publication Rule

No record can be indexed until it passes intent validation, evidence collection, blueprint approval, draft generation, automated validation, human review, and publication approval.

## Current State

- Candidate records: ${records.length}
- Publish approved: 0
- Indexable: 0
- SAFE-DEEP validation: ${validation.passed ? "passed" : "failed"}
`;
}

function blueprintFiles() {
  return Object.entries(blueprintByFamily).map(([family, blueprint]) => ({
    file: path.join("PAGE_BLUEPRINTS", `${blueprint}.json`),
    data: {
      generatedAt,
      blueprint,
      content_family: family,
      minimum_words: minimumWordsByFamily[family],
      quality_target: qualityTargetByFamily[family],
      required_schemas: uniq([...globalSchemas, ...(schemaByFamily[family] || [])]),
      required_sections: [
        "direct_answer",
        "entity_overview",
        "implementation_context",
        "configuration_or_workflow",
        "security_considerations",
        "validation_steps",
        "related_links",
        "evidence_and_sources",
        "faq",
      ],
      required_governance: {
        status: "candidate",
        publish_approved: false,
        indexable: false,
      },
    },
  }));
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function writeJson(file, data) {
  fs.writeFileSync(path.join(root, file), `${JSON.stringify(data, null, 2)}\n`);
}

function readGeneratedRecords() {
  const manifestPath = path.join(root, "MCPSERVER_CONTENT_MANIFEST.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error("MCPSERVER_CONTENT_MANIFEST.json does not exist. Run npm run generate:5000-url-candidates first.");
  }
  return JSON.parse(fs.readFileSync(manifestPath, "utf8")).records;
}

if (verifyOnly) {
  const existingRecords = readGeneratedRecords();
  const existingValidation = validate(existingRecords);
  const checkMap = {
    count: existingValidation.actual_total === existingValidation.expected_total && Object.entries(targets).every(([family, count]) => existingValidation.actual_counts[family] === count),
    url: existingValidation.duplicate_urls.length === 0 && existingValidation.placeholder_routes.length === 0 && existingValidation.numeric_suffix_routes.length === 0,
    canonical: existingValidation.duplicate_canonical_urls.length === 0 && existingValidation.invalid_canonical_format.length === 0,
    intent: existingValidation.duplicate_primary_intents.length === 0,
    entity: existingValidation.duplicate_entities.length === 0 && existingValidation.unresolved_entities.length === 0 && existingValidation.unresolved_parent_hubs.length === 0,
    all: existingValidation.passed,
  };
  const ok = checkMap[checkArg] ?? existingValidation.passed;
  console.log(JSON.stringify({ check: checkArg, ok, validation: existingValidation }, null, 2));
  if (!ok) process.exit(1);
  process.exit(0);
}

fs.mkdirSync(path.join(root, "reports"), { recursive: true });
fs.rmSync(path.join(root, "PAGE_BLUEPRINTS"), { recursive: true, force: true });
fs.mkdirSync(path.join(root, "PAGE_BLUEPRINTS"), { recursive: true });

writeJson("MCPSERVER_CONTENT_MANIFEST.json", masterManifest);
writeJson("ENTITY_GRAPH.json", entityGraph);
writeJson("ROUTE_REGISTRY.json", routeRegistry);
writeJson("SITEMAP_REGISTRY.json", sitemapRegistry);
writeJson("SEARCH_INDEX.json", searchIndex);
writeJson("SAFE_DEEP_LEDGER.json", safeDeepLedger);
writeJson("PUBLICATION_QUEUE.json", publicationQueue);
writeJson("EDITORIAL_QUEUE.json", editorialQueue);
writeJson("INTERNAL_LINK_GRAPH.json", internalLinkGraph);
writeJson("QUALITY_QUEUE.json", qualityQueue);
writeJson("CONTENT_BATCHES.json", contentBatches);
writeJson("BREADCRUMB_REGISTRY.json", breadcrumbRegistry);
writeJson("CANONICAL_REGISTRY.json", canonicalRegistry);
writeJson("SCHEMA_REGISTRY.json", schemaRegistry);
writeJson("EVIDENCE_MANIFEST.json", evidenceManifest);
writeJson("reports/mcpserver-5000-url-master.json", { generatedAt, total: records.length, records });
fs.writeFileSync(path.join(root, "reports/mcpserver-5000-url-master.csv"), toCsv(records));
writeMinimalXlsx(path.join(root, "reports/mcpserver-5000-url-master.xlsx"), records);
fs.writeFileSync(path.join(root, "reports/mcpserver-5000-url-tree.md"), treeMarkdown());
writeJson("reports/mcpserver-5000-intent-map.json", intentMap);
writeJson("reports/mcpserver-5000-entity-map.json", entityMap);
fs.writeFileSync(path.join(root, "reports/mcpserver-5000-cluster-summary.md"), clusterSummaryMarkdown());
writeJson("reports/mcpserver-5000-duplicate-report.json", duplicateReport);
fs.writeFileSync(path.join(root, "reports/mcpserver-5000-publication-plan.md"), publicationPlanMarkdown());

for (const blueprint of blueprintFiles()) {
  writeJson(blueprint.file, blueprint.data);
}

const checksumFiles = [
  "MCPSERVER_CONTENT_MANIFEST.json",
  "ENTITY_GRAPH.json",
  "ROUTE_REGISTRY.json",
  "SITEMAP_REGISTRY.json",
  "SEARCH_INDEX.json",
  "SAFE_DEEP_LEDGER.json",
  "PUBLICATION_QUEUE.json",
  "EDITORIAL_QUEUE.json",
  "INTERNAL_LINK_GRAPH.json",
  "QUALITY_QUEUE.json",
  "CONTENT_BATCHES.json",
  "BREADCRUMB_REGISTRY.json",
  "CANONICAL_REGISTRY.json",
  "SCHEMA_REGISTRY.json",
  "EVIDENCE_MANIFEST.json",
  "reports/mcpserver-5000-url-master.json",
  "reports/mcpserver-5000-url-master.csv",
  "reports/mcpserver-5000-url-master.xlsx",
  "reports/mcpserver-5000-url-tree.md",
  "reports/mcpserver-5000-intent-map.json",
  "reports/mcpserver-5000-entity-map.json",
  "reports/mcpserver-5000-cluster-summary.md",
  "reports/mcpserver-5000-duplicate-report.json",
  "reports/mcpserver-5000-publication-plan.md",
  ...blueprintFiles().map((blueprint) => blueprint.file),
].sort();
const checksums = checksumFiles.map((file) => `${sha256(fs.readFileSync(path.join(root, file)))}  ${file}`).join("\n") + "\n";
fs.writeFileSync(path.join(root, "CHECKSUMS.sha256"), checksums);

if (!validation.passed) {
  console.error(JSON.stringify(validation, null, 2));
  process.exit(1);
}

console.log(`Generated ${records.length} canonical URL candidates.`);
console.log("SAFE-DEEP validation passed.");
console.log("Wrote registries, queues, blueprints, reports, and CHECKSUMS.sha256.");
