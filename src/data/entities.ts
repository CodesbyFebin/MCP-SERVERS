import {
  phaseABestLists,
  phaseAClients,
  phaseADeploymentGuides,
  phaseAFrameworks,
  phaseAIntegrations,
  phaseASdks,
  phaseASecurityGuides,
  phaseATroubleshootingGuides,
} from "./phase-a-authority.generated";

/**
 * MCPServer.in — Extended Entity Model
 *
 * Defines typed entity registries for all 15+ content families specified in
 * the SEO content template. Each family has its own interface, a seed registry
 * export, and helper functions for publication workflow lookups.
 *
 * Families covered:
 *   servers · integrations · clients · sdk · frameworks · deployment ·
 *   security · troubleshooting · glossary · best-lists · enterprise ·
 *   examples · templates · news
 */

// ─────────────────────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────────────────────

export type ContentFamily =
  | "servers"
  | "integrations"
  | "tutorials"
  | "compare"
  | "best"
  | "glossary"
  | "troubleshoot"
  | "security"
  | "sdk"
  | "frameworks"
  | "clients"
  | "deployment"
  | "enterprise"
  | "examples"
  | "templates"
  | "news";

export type PublicationStatus =
  | "candidate"
  | "intent_validated"
  | "evidence_complete"
  | "blueprint_approved"
  | "generated_draft"
  | "automated_validation"
  | "human_review"
  | "publish_approved"
  | "published"
  | "indexed"
  | "rejected"
  | "archived";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Transport = "stdio" | "streamable-http" | "http-sse";

export type AuthMethod =
  | "api-key"
  | "oauth2"
  | "pat"
  | "basic"
  | "none"
  | "kubeconfig"
  | "service-account";

export interface BaseEntity {
  /** Stable machine ID: e.g. "server:github-mcp-server" */
  id: string;
  slug: string;
  family: ContentFamily;
  name: string;
  status: PublicationStatus;
  route: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: "informational" | "navigational" | "commercial" | "transactional";
  metaDescription: string;
  updatedAt: string;
}

function mergeBySlug<T extends { slug: string }>(base: T[], overrides: T[]): T[] {
  const bySlug = new Map(base.map((item) => [item.slug, item]));
  for (const item of overrides) {
    bySlug.set(item.slug, item);
  }
  return [...bySlug.values()];
}

// ─────────────────────────────────────────────────────────────────────────────
// Integration Guide entity  (/integrations/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface IntegrationEntity extends BaseEntity {
  family: "integrations";
  platform: string;
  platformCategory: string;
  /** e.g. ["Claude Desktop", "Cursor", "VS Code"] */
  supportedClients: string[];
  transports: Transport[];
  authMethods: AuthMethod[];
  tools: string[];
  resources: string[];
  prompts: string[];
  officialRepo?: string;
  officialDocs?: string;
  licence?: string;
  remoteSupport: boolean;
  deploymentOptions: string[];
  lastRelease?: string;
  lastVerified: string;
  securityNotes: string[];
  maintenanceStatus: "active" | "maintenance" | "archived" | "unknown";
  relatedIntegrations: string[];
}

const baseIntegrations: IntegrationEntity[] = [
  {
    id: "integration:github-mcp-server",
    slug: "github-mcp-server",
    family: "integrations",
    name: "GitHub",
    status: "published",
    route: "/integrations/github-mcp-server/",
    primaryKeyword: "GitHub MCP server",
    secondaryKeywords: ["connect GitHub to Claude", "GitHub MCP integration", "GitHub MCP setup"],
    searchIntent: "informational",
    metaDescription:
      "Learn how to install and configure the GitHub MCP server, connect it to Claude Desktop and Cursor, secure credentials, test tools, and troubleshoot errors.",
    platform: "GitHub",
    platformCategory: "Developer Tools",
    supportedClients: ["Claude Desktop", "Claude Code", "Cursor", "VS Code", "Cline"],
    transports: ["stdio"],
    authMethods: ["pat", "oauth2"],
    tools: ["create_repository", "search_code", "create_pull_request", "create_issue", "push_files"],
    resources: ["repository_contents", "pull_request_diff"],
    prompts: [],
    officialRepo: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
    officialDocs: "https://modelcontextprotocol.io",
    licence: "MIT",
    remoteSupport: false,
    deploymentOptions: ["local", "docker"],
    lastVerified: "2026-07-29",
    securityNotes: ["Use minimal PAT scopes", "Never commit tokens to source control"],
    maintenanceStatus: "active",
    relatedIntegrations: ["gitlab-mcp-server", "bitbucket-mcp-server", "jira-mcp-server"],
    updatedAt: "2026-07-29",
  },
  // Consolidated 2026-08-05: /integrations/postgresql-mcp-server/ duplicated the
  // "PostgreSQL MCP server" intent already owned by /databases/postgresql-mcp-server/,
  // which is the sitemap-declared canonical and matches the family taxonomy
  // (/integrations/ = SaaS apps, /databases/ = datastores). The old route now
  // 301s to the databases canonical; see next.config.js.
  {
    id: "integration:slack-mcp-server",
    slug: "slack-mcp-server",
    family: "integrations",
    name: "Slack",
    status: "candidate",
    route: "/integrations/slack-mcp-server/",
    primaryKeyword: "Slack MCP server",
    secondaryKeywords: ["connect Slack to Claude", "Slack MCP integration", "Slack MCP setup"],
    searchIntent: "informational",
    metaDescription:
      "Configure the Slack MCP server to read channels, send messages, and manage workspaces from Claude Desktop or Cursor.",
    platform: "Slack",
    platformCategory: "Communication",
    supportedClients: ["Claude Desktop", "Cursor"],
    transports: ["stdio"],
    authMethods: ["oauth2"],
    tools: ["send_message", "list_channels", "get_channel_history", "search_messages"],
    resources: ["channel_list"],
    prompts: [],
    remoteSupport: false,
    deploymentOptions: ["local"],
    lastVerified: "2026-07-29",
    securityNotes: ["Use bot tokens with minimal scopes", "Audit channel access regularly"],
    maintenanceStatus: "active",
    relatedIntegrations: ["notion-mcp-server", "jira-mcp-server", "linear-mcp-server"],
    updatedAt: "2026-07-29",
  },
];

export const integrations: IntegrationEntity[] = mergeBySlug(baseIntegrations, phaseAIntegrations);

// ─────────────────────────────────────────────────────────────────────────────
// AI Client Guide entity  (/clients/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface ClientEntity extends BaseEntity {
  family: "clients";
  clientName: string;
  vendor: string;
  clientType: "desktop-app" | "ide" | "cli" | "web-app" | "framework";
  supportedTransports: Transport[];
  mcpFeatures: string[];
  configFormat: "json" | "jsonc" | "yaml" | "ui";
  configPath?: string;
  docsUrl?: string;
  latestVersion?: string;
  relatedClients: string[];
}

const baseClients: ClientEntity[] = [
  {
    id: "client:claude-desktop",
    slug: "claude-desktop",
    family: "clients",
    name: "Claude Desktop",
    status: "published",
    route: "/clients/claude-desktop/",
    primaryKeyword: "Claude Desktop MCP",
    secondaryKeywords: ["Claude Desktop MCP setup", "add MCP server to Claude Desktop", "configure MCP in Claude Desktop"],
    searchIntent: "informational",
    metaDescription:
      "Configure MCP servers in Claude Desktop. Complete guide to adding servers, setting credentials, and testing tools with the claude_desktop_config.json file.",
    clientName: "Claude Desktop",
    vendor: "Anthropic",
    clientType: "desktop-app",
    supportedTransports: ["stdio", "streamable-http"],
    mcpFeatures: ["tools", "resources", "prompts"],
    configFormat: "json",
    configPath: "~/Library/Application Support/Claude/claude_desktop_config.json",
    docsUrl: "https://docs.anthropic.com/claude/docs/mcp",
    relatedClients: ["claude-code", "cursor", "vscode"],
    updatedAt: "2026-07-29",
  },
  {
    id: "client:cursor",
    slug: "cursor",
    family: "clients",
    name: "Cursor",
    status: "published",
    route: "/clients/cursor/",
    primaryKeyword: "Cursor MCP server",
    secondaryKeywords: ["Cursor MCP setup", "add MCP to Cursor", "configure MCP in Cursor"],
    searchIntent: "informational",
    metaDescription:
      "Add and configure MCP servers in Cursor IDE. Includes global and project-level configuration, transport selection, and troubleshooting.",
    clientName: "Cursor",
    vendor: "Anysphere",
    clientType: "ide",
    supportedTransports: ["stdio", "streamable-http"],
    mcpFeatures: ["tools", "resources"],
    configFormat: "json",
    configPath: "~/.cursor/mcp.json",
    docsUrl: "https://docs.cursor.com/advanced/model-context-protocol",
    relatedClients: ["claude-desktop", "vscode", "cline"],
    updatedAt: "2026-07-29",
  },
  {
    id: "client:vscode",
    slug: "vscode",
    family: "clients",
    name: "Visual Studio Code",
    status: "published",
    route: "/clients/vscode/",
    primaryKeyword: "VS Code MCP server",
    secondaryKeywords: ["VS Code MCP setup", "configure MCP in VS Code", "VS Code MCP extension"],
    searchIntent: "informational",
    metaDescription:
      "Set up and configure MCP servers in Visual Studio Code. Covers settings.json configuration, supported transports, OAuth, and GitHub Copilot integration.",
    clientName: "Visual Studio Code",
    vendor: "Microsoft",
    clientType: "ide",
    supportedTransports: ["stdio", "streamable-http"],
    mcpFeatures: ["tools", "resources", "prompts", "sampling", "oauth"],
    configFormat: "jsonc",
    configPath: ".vscode/mcp.json",
    docsUrl: "https://code.visualstudio.com/docs/copilot/chat/mcp-servers",
    relatedClients: ["cursor", "claude-desktop", "cline"],
    updatedAt: "2026-07-29",
  },
  {
    id: "client:claude-code",
    slug: "claude-code",
    family: "clients",
    name: "Claude Code",
    status: "published",
    route: "/clients/claude-code/",
    primaryKeyword: "Claude Code MCP",
    secondaryKeywords: ["Claude Code MCP setup", "add MCP to Claude Code", "Claude Code MCP configuration"],
    searchIntent: "informational",
    metaDescription:
      "Configure MCP servers in Claude Code (CLI). Covers adding servers, setting environment variables, and using the --mcp flag.",
    clientName: "Claude Code",
    vendor: "Anthropic",
    clientType: "cli",
    supportedTransports: ["stdio", "streamable-http"],
    mcpFeatures: ["tools", "resources", "prompts"],
    configFormat: "json",
    docsUrl: "https://docs.anthropic.com/claude/docs/claude-code",
    relatedClients: ["claude-desktop", "cursor", "gemini-cli"],
    updatedAt: "2026-07-29",
  },
];

export const clients: ClientEntity[] = mergeBySlug(baseClients, phaseAClients);

// ─────────────────────────────────────────────────────────────────────────────
// SDK Guide entity  (/sdk/[language])
// ─────────────────────────────────────────────────────────────────────────────

export interface SdkEntity extends BaseEntity {
  family: "sdk";
  language: string;
  languageSlug: string;
  packageName: string;
  installCommand: string;
  officialRepo: string;
  officialDocs: string;
  latestVersion?: string;
  supportedTransports: Transport[];
  authSupport: AuthMethod[];
  features: string[];
  relatedSdks: string[];
}

const baseSdks: SdkEntity[] = [
  {
    id: "sdk:typescript",
    slug: "typescript",
    family: "sdk",
    name: "TypeScript MCP SDK",
    status: "published",
    route: "/sdk/typescript/",
    primaryKeyword: "TypeScript MCP SDK",
    secondaryKeywords: ["MCP SDK for TypeScript", "build MCP server TypeScript", "Node.js MCP SDK"],
    searchIntent: "informational",
    metaDescription:
      "Complete developer guide for the TypeScript MCP SDK. Covers installation, server creation, tools, resources, prompts, authentication, and testing.",
    language: "TypeScript",
    languageSlug: "typescript",
    packageName: "@modelcontextprotocol/sdk",
    installCommand: "npm install @modelcontextprotocol/sdk",
    officialRepo: "https://github.com/modelcontextprotocol/typescript-sdk",
    officialDocs: "https://modelcontextprotocol.io/sdks/typescript",
    supportedTransports: ["stdio", "streamable-http"],
    authSupport: ["oauth2", "api-key"],
    features: ["tools", "resources", "prompts", "sampling", "roots", "logging"],
    relatedSdks: ["python", "java", "go"],
    updatedAt: "2026-07-29",
  },
  {
    id: "sdk:python",
    slug: "python",
    family: "sdk",
    name: "Python MCP SDK",
    status: "published",
    route: "/sdk/python/",
    primaryKeyword: "Python MCP SDK",
    secondaryKeywords: ["MCP SDK for Python", "build MCP server Python", "mcp Python library"],
    searchIntent: "informational",
    metaDescription:
      "Complete developer guide for the Python MCP SDK. Covers pip installation, FastMCP decorator syntax, tools, resources, prompts, and deployment.",
    language: "Python",
    languageSlug: "python",
    packageName: "mcp",
    installCommand: "pip install mcp",
    officialRepo: "https://github.com/modelcontextprotocol/python-sdk",
    officialDocs: "https://modelcontextprotocol.io/sdks/python",
    supportedTransports: ["stdio", "streamable-http"],
    authSupport: ["oauth2", "api-key"],
    features: ["tools", "resources", "prompts", "sampling", "fastmcp-decorator"],
    relatedSdks: ["typescript", "java", "rust"],
    updatedAt: "2026-07-29",
  },
  {
    id: "sdk:java",
    slug: "java",
    family: "sdk",
    name: "Java MCP SDK",
    status: "candidate",
    route: "/sdk/java/",
    primaryKeyword: "Java MCP SDK",
    secondaryKeywords: ["MCP SDK for Java", "build MCP server Java", "Spring AI MCP SDK"],
    searchIntent: "informational",
    metaDescription:
      "Developer guide for the Java MCP SDK. Covers Maven/Gradle setup, server creation, Spring AI integration, and Streamable HTTP transport.",
    language: "Java",
    languageSlug: "java",
    packageName: "io.modelcontextprotocol:sdk",
    installCommand: "implementation 'io.modelcontextprotocol:sdk:latest'",
    officialRepo: "https://github.com/modelcontextprotocol/java-sdk",
    officialDocs: "https://modelcontextprotocol.io/sdks/java",
    supportedTransports: ["stdio", "streamable-http"],
    authSupport: ["oauth2", "api-key"],
    features: ["tools", "resources", "prompts", "spring-integration"],
    relatedSdks: ["kotlin", "typescript", "python"],
    updatedAt: "2026-07-29",
  },
  {
    id: "sdk:go",
    slug: "go",
    family: "sdk",
    name: "Go MCP SDK",
    status: "candidate",
    route: "/sdk/go/",
    primaryKeyword: "Go MCP SDK",
    secondaryKeywords: ["MCP SDK for Go", "build MCP server Go", "Golang MCP"],
    searchIntent: "informational",
    metaDescription:
      "Developer guide for the Go MCP SDK. Covers go get, server structs, tool registration, and stdio/Streamable HTTP configuration.",
    language: "Go",
    languageSlug: "go",
    packageName: "github.com/modelcontextprotocol/go-sdk",
    installCommand: "go get github.com/modelcontextprotocol/go-sdk",
    officialRepo: "https://github.com/modelcontextprotocol/go-sdk",
    officialDocs: "https://modelcontextprotocol.io/sdks/go",
    supportedTransports: ["stdio", "streamable-http"],
    authSupport: ["api-key"],
    features: ["tools", "resources", "prompts"],
    relatedSdks: ["rust", "typescript", "python"],
    updatedAt: "2026-07-29",
  },
];

export const sdks: SdkEntity[] = mergeBySlug(baseSdks, phaseASdks);

// ─────────────────────────────────────────────────────────────────────────────
// Framework Guide entity  (/frameworks/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface FrameworkEntity extends BaseEntity {
  family: "frameworks";
  frameworkName: string;
  languages: string[];
  packageName: string;
  installCommand: string;
  officialRepo?: string;
  officialDocs?: string;
  builtOnSdk?: string;
  keyFeatures: string[];
  relatedFrameworks: string[];
}

const baseFrameworks: FrameworkEntity[] = [
  {
    id: "framework:fastmcp",
    slug: "fastmcp",
    family: "frameworks",
    name: "FastMCP",
    status: "published",
    route: "/frameworks/fastmcp/",
    primaryKeyword: "FastMCP",
    secondaryKeywords: ["FastMCP Python", "build MCP server FastMCP", "FastMCP framework"],
    searchIntent: "informational",
    metaDescription:
      "Complete guide to FastMCP: the high-level Python framework for building MCP servers with decorator syntax. Covers installation, tools, resources, and deployment.",
    frameworkName: "FastMCP",
    languages: ["Python"],
    packageName: "fastmcp",
    installCommand: "pip install fastmcp",
    officialRepo: "https://github.com/jlowin/fastmcp",
    officialDocs: "https://gofastmcp.com",
    builtOnSdk: "sdk:python",
    keyFeatures: ["@mcp.tool decorator", "context injection", "proxy servers", "image support"],
    relatedFrameworks: ["langchain-mcp", "spring-ai-mcp"],
    updatedAt: "2026-07-29",
  },
  {
    id: "framework:langchain-mcp",
    slug: "langchain-mcp",
    family: "frameworks",
    name: "LangChain MCP Adapters",
    status: "candidate",
    route: "/frameworks/langchain-mcp/",
    primaryKeyword: "LangChain MCP",
    secondaryKeywords: ["LangChain MCP integration", "LangChain MCP adapter", "LangChain MCP tools"],
    searchIntent: "informational",
    metaDescription:
      "Use LangChain with MCP servers. Covers the langchain-mcp-adapters package, tool conversion, and integration with LangGraph agents.",
    frameworkName: "LangChain MCP Adapters",
    languages: ["Python"],
    packageName: "langchain-mcp-adapters",
    installCommand: "pip install langchain-mcp-adapters",
    officialRepo: "https://github.com/langchain-ai/langchain-mcp-adapters",
    officialDocs: "https://python.langchain.com/docs/integrations/mcp",
    builtOnSdk: "sdk:python",
    keyFeatures: ["MCP to LangChain tool conversion", "multi-server support", "LangGraph integration"],
    relatedFrameworks: ["fastmcp", "llamaindex-mcp"],
    updatedAt: "2026-07-29",
  },
  {
    id: "framework:spring-ai-mcp",
    slug: "spring-ai-mcp",
    family: "frameworks",
    name: "Spring AI MCP",
    status: "candidate",
    route: "/frameworks/spring-ai-mcp/",
    primaryKeyword: "Spring AI MCP",
    secondaryKeywords: ["Spring AI MCP server", "Spring Boot MCP", "Java MCP Spring"],
    searchIntent: "informational",
    metaDescription:
      "Build MCP servers with Spring AI. Covers Maven/Gradle setup, auto-configuration, tool registration, and Streamable HTTP deployment.",
    frameworkName: "Spring AI MCP",
    languages: ["Java"],
    packageName: "org.springframework.ai:spring-ai-mcp-server",
    installCommand: "implementation 'org.springframework.ai:spring-ai-mcp-server'",
    officialRepo: "https://github.com/spring-projects/spring-ai",
    officialDocs: "https://docs.spring.io/spring-ai/reference/api/mcp.html",
    builtOnSdk: "sdk:java",
    keyFeatures: ["auto-configuration", "Bean-based tool registration", "Spring Boot integration"],
    relatedFrameworks: ["langchain-mcp", "fastmcp"],
    updatedAt: "2026-07-29",
  },
];

export const frameworks: FrameworkEntity[] = mergeBySlug(baseFrameworks, phaseAFrameworks);

// ─────────────────────────────────────────────────────────────────────────────
// Deployment Guide entity  (/deployment/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface DeploymentEntity extends BaseEntity {
  family: "deployment";
  platform: string;
  platformType: "container" | "cloud" | "serverless" | "paas" | "self-hosted";
  supportedTransports: Transport[];
  authRequired: boolean;
  freeTierAvailable: boolean;
  difficultyLevel: Difficulty;
  prerequisites: string[];
  relatedPlatforms: string[];
}

const baseDeploymentGuides: DeploymentEntity[] = [
  {
    id: "deployment:docker",
    slug: "docker",
    family: "deployment",
    name: "Docker",
    status: "published",
    route: "/deployment/docker/",
    primaryKeyword: "deploy MCP server Docker",
    secondaryKeywords: ["MCP server Docker deployment", "MCP Docker container", "Dockerise MCP server"],
    searchIntent: "informational",
    metaDescription:
      "Deploy an MCP server with Docker. Covers Dockerfile authoring, environment variables, volume mounts, and running with stdio and Streamable HTTP.",
    platform: "Docker",
    platformType: "container",
    supportedTransports: ["stdio", "streamable-http"],
    authRequired: false,
    freeTierAvailable: true,
    difficultyLevel: "intermediate",
    prerequisites: ["Docker 24+", "MCP server source code"],
    relatedPlatforms: ["kubernetes", "aws", "vercel"],
    updatedAt: "2026-07-29",
  },
  {
    id: "deployment:kubernetes",
    slug: "kubernetes",
    family: "deployment",
    name: "Kubernetes",
    status: "candidate",
    route: "/deployment/kubernetes/",
    primaryKeyword: "deploy MCP server Kubernetes",
    secondaryKeywords: ["MCP server Kubernetes", "MCP Kubernetes deployment", "Kubernetes MCP server"],
    searchIntent: "informational",
    metaDescription:
      "Deploy and scale MCP servers on Kubernetes. Covers Deployment manifests, ConfigMaps, Secrets, Ingress, and horizontal scaling.",
    platform: "Kubernetes",
    platformType: "container",
    supportedTransports: ["streamable-http"],
    authRequired: true,
    freeTierAvailable: false,
    difficultyLevel: "advanced",
    prerequisites: ["kubectl", "cluster access", "Docker image of MCP server"],
    relatedPlatforms: ["docker", "aws", "google-cloud"],
    updatedAt: "2026-07-29",
  },
  {
    id: "deployment:vercel",
    slug: "vercel",
    family: "deployment",
    name: "Vercel",
    status: "published",
    route: "/deployment/vercel/",
    primaryKeyword: "deploy MCP server Vercel",
    secondaryKeywords: ["MCP server Vercel", "Vercel MCP server deployment", "host MCP on Vercel"],
    searchIntent: "informational",
    metaDescription:
      "Host a remote MCP server on Vercel using Streamable HTTP. Covers Next.js API routes, environment variables, and OAuth configuration.",
    platform: "Vercel",
    platformType: "serverless",
    supportedTransports: ["streamable-http"],
    authRequired: true,
    freeTierAvailable: true,
    difficultyLevel: "intermediate",
    prerequisites: ["Vercel account", "Next.js project"],
    relatedPlatforms: ["cloudflare-workers", "aws", "railway"],
    updatedAt: "2026-07-29",
  },
  {
    id: "deployment:cloudflare-workers",
    slug: "cloudflare-workers",
    family: "deployment",
    name: "Cloudflare Workers",
    status: "candidate",
    route: "/deployment/cloudflare-workers/",
    primaryKeyword: "MCP server Cloudflare Workers",
    secondaryKeywords: ["deploy MCP server Cloudflare", "Cloudflare MCP server", "Cloudflare Workers MCP"],
    searchIntent: "informational",
    metaDescription:
      "Deploy a remote MCP server on Cloudflare Workers. Covers Workers configuration, Durable Objects, and Streamable HTTP transport.",
    platform: "Cloudflare Workers",
    platformType: "serverless",
    supportedTransports: ["streamable-http"],
    authRequired: true,
    freeTierAvailable: true,
    difficultyLevel: "advanced",
    prerequisites: ["Cloudflare account", "Wrangler CLI"],
    relatedPlatforms: ["vercel", "docker", "aws"],
    updatedAt: "2026-07-29",
  },
];

export const deploymentGuides: DeploymentEntity[] = mergeBySlug(baseDeploymentGuides, phaseADeploymentGuides);

// ─────────────────────────────────────────────────────────────────────────────
// Security Guide entity  (/security/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface SecurityEntity extends BaseEntity {
  family: "security";
  topic: string;
  threatCategory: "authentication" | "authorisation" | "injection" | "supply-chain" | "secrets" | "network" | "audit" | "sandboxing";
  severity: "critical" | "high" | "medium" | "informational";
  relatedTopics: string[];
}

const baseSecurityGuides: SecurityEntity[] = [
  {
    id: "security:prompt-injection",
    slug: "prompt-injection",
    family: "security",
    name: "MCP Prompt Injection",
    status: "published",
    route: "/security/prompt-injection/",
    primaryKeyword: "MCP prompt injection",
    secondaryKeywords: ["MCP tool poisoning", "MCP security", "prompt injection attack MCP"],
    searchIntent: "informational",
    metaDescription:
      "Understanding MCP prompt injection and tool poisoning attacks. Covers detection, mitigation, sandboxing, and human-in-the-loop controls.",
    topic: "Prompt Injection and Tool Poisoning",
    threatCategory: "injection",
    severity: "critical",
    relatedTopics: ["authentication", "secrets-management", "sandboxing"],
    updatedAt: "2026-07-29",
  },
  {
    id: "security:authentication",
    slug: "authentication",
    family: "security",
    name: "MCP Server Authentication",
    status: "published",
    route: "/security/authentication/",
    primaryKeyword: "MCP authentication",
    secondaryKeywords: ["MCP server auth", "MCP OAuth", "secure MCP server"],
    searchIntent: "informational",
    metaDescription:
      "Configure authentication for MCP servers. Covers OAuth 2.0, API keys, PATs, environment variables, and token rotation best practices.",
    topic: "Authentication and Authorisation",
    threatCategory: "authentication",
    severity: "critical",
    relatedTopics: ["oauth", "secrets-management", "prompt-injection"],
    updatedAt: "2026-07-29",
  },
  {
    id: "security:secrets-management",
    slug: "secrets-management",
    family: "security",
    name: "MCP Secrets Management",
    status: "candidate",
    route: "/security/secrets-management/",
    primaryKeyword: "MCP secrets management",
    secondaryKeywords: ["MCP secret storage", "MCP environment variables security", "MCP credentials"],
    searchIntent: "informational",
    metaDescription:
      "Best practices for managing secrets in MCP servers. Covers environment variables, secret vaults, rotation, and avoiding credential exposure.",
    topic: "Secrets Management",
    threatCategory: "secrets",
    severity: "high",
    relatedTopics: ["authentication", "prompt-injection", "audit-logging"],
    updatedAt: "2026-07-29",
  },
];

export const securityGuides: SecurityEntity[] = mergeBySlug(baseSecurityGuides, phaseASecurityGuides);

// ─────────────────────────────────────────────────────────────────────────────
// Troubleshooting Guide entity  (/troubleshooting/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface TroubleshootEntity extends BaseEntity {
  family: "troubleshoot";
  errorTitle: string;
  errorCode?: string;
  affectedClients: string[];
  affectedTransports: Transport[];
  commonCauses: string[];
  relatedIssues: string[];
}

const baseTroubleshootingGuides: TroubleshootEntity[] = [
  {
    id: "troubleshoot:mcp-server-not-connecting",
    slug: "mcp-server-not-connecting",
    family: "troubleshoot",
    name: "MCP Server Not Connecting",
    status: "published",
    route: "/troubleshooting/mcp-server-not-connecting/",
    primaryKeyword: "MCP server not connecting",
    secondaryKeywords: ["MCP connection failed", "MCP server not starting", "fix MCP server"],
    searchIntent: "informational",
    metaDescription:
      "Fix MCP server connection failures. Covers incorrect paths, missing credentials, transport mismatches, and client configuration errors.",
    errorTitle: "MCP Server Not Connecting",
    affectedClients: ["Claude Desktop", "Cursor", "VS Code"],
    affectedTransports: ["stdio", "streamable-http"],
    commonCauses: ["Incorrect server path", "Missing credentials", "Transport mismatch", "Node/Python not in PATH"],
    relatedIssues: ["mcp-tools-not-appearing", "stdio-error", "authentication-failed"],
    updatedAt: "2026-07-29",
  },
  // Consolidated 2026-08-05: /troubleshooting/tools-not-appearing/ duplicated the
  // "MCP tools not appearing" intent (78% identical body copy, same meta intent)
  // already owned by /troubleshooting/mcp-tools-not-appearing/, which is the
  // sitemap-declared canonical and matches the /troubleshooting/mcp-<symptom>/
  // taxonomy. Its FAQ block was migrated to the canonical slug and the old
  // route now 301s there; see next.config.js.
  {
    id: "troubleshoot:claude-desktop-mcp-not-working",
    slug: "claude-desktop-mcp-not-working",
    family: "troubleshoot",
    name: "Claude Desktop MCP Not Working",
    status: "published",
    route: "/troubleshooting/claude-desktop-mcp-not-working/",
    primaryKeyword: "Claude Desktop MCP not working",
    secondaryKeywords: ["Claude Desktop MCP error", "Claude MCP server not loading", "fix Claude MCP"],
    searchIntent: "informational",
    metaDescription:
      "Fix MCP server issues in Claude Desktop. Step-by-step diagnostics for config file errors, server startup failures, and tool visibility problems.",
    errorTitle: "MCP Not Working in Claude Desktop",
    affectedClients: ["Claude Desktop"],
    affectedTransports: ["stdio"],
    commonCauses: ["Invalid claude_desktop_config.json", "Wrong executable path", "Missing environment variables", "Server crash on startup"],
    relatedIssues: ["mcp-server-not-connecting", "mcp-tools-not-appearing", "authentication-failed"],
    updatedAt: "2026-07-29",
  },
];

export const troubleshootingGuides: TroubleshootEntity[] = mergeBySlug(baseTroubleshootingGuides, phaseATroubleshootingGuides);

// ─────────────────────────────────────────────────────────────────────────────
// Glossary term entity  (/glossary/[term])
// ─────────────────────────────────────────────────────────────────────────────

export interface GlossaryEntity extends BaseEntity {
  family: "glossary";
  term: string;
  shortDefinition: string;
  fullDefinition: string;
  protocolSection?: string;
  aliases: string[];
  relatedTerms: string[];
}

export const glossaryTerms: GlossaryEntity[] = [
  {
    id: "glossary:mcp-host",
    slug: "mcp-host",
    family: "glossary",
    name: "MCP Host",
    status: "published",
    route: "/glossary/mcp-host/",
    primaryKeyword: "MCP host",
    secondaryKeywords: ["what is an MCP host", "MCP host vs client", "host in Model Context Protocol"],
    searchIntent: "informational",
    metaDescription:
      "Definition of MCP Host: the application that contains and manages MCP clients, such as Claude Desktop or VS Code. Explains the host's role in lifecycle management.",
    term: "MCP Host",
    shortDefinition:
      "An application that creates and manages one or more MCP clients, and controls the overall interaction lifecycle.",
    fullDefinition:
      "In the Model Context Protocol architecture, a host is the user-facing application (such as Claude Desktop, Cursor, or VS Code) that embeds an MCP client, manages its lifecycle, enforces security policies, and presents the results to the user.",
    protocolSection: "Architecture",
    aliases: ["host application", "MCP host process"],
    relatedTerms: ["mcp-client", "mcp-server", "mcp-transport"],
    updatedAt: "2026-07-29",
  },
  {
    id: "glossary:mcp-client",
    slug: "mcp-client",
    family: "glossary",
    name: "MCP Client",
    status: "published",
    route: "/glossary/mcp-client/",
    primaryKeyword: "MCP client",
    secondaryKeywords: ["what is an MCP client", "MCP client definition", "MCP client vs server"],
    searchIntent: "informational",
    metaDescription:
      "Definition of MCP Client: the protocol layer embedded inside a host that maintains a one-to-one connection with each MCP server.",
    term: "MCP Client",
    shortDefinition:
      "A protocol connector embedded in a host application that maintains a 1:1 connection with a single MCP server.",
    fullDefinition:
      "An MCP client is the component inside the host that speaks the Model Context Protocol. It negotiates capabilities with the server, sends requests (tools/call, resources/read, prompts/get), and returns responses to the host. Each client holds one persistent connection to one server.",
    protocolSection: "Architecture",
    aliases: ["client connector"],
    relatedTerms: ["mcp-host", "mcp-server", "capability-negotiation"],
    updatedAt: "2026-07-29",
  },
  {
    id: "glossary:mcp-server",
    slug: "mcp-server",
    family: "glossary",
    name: "MCP Server",
    status: "published",
    route: "/glossary/mcp-server/",
    primaryKeyword: "MCP server",
    secondaryKeywords: ["what is an MCP server", "MCP server definition", "Model Context Protocol server"],
    searchIntent: "informational",
    metaDescription:
      "Definition of MCP Server: a program that exposes tools, resources, and prompts to AI applications through the Model Context Protocol.",
    term: "MCP Server",
    shortDefinition:
      "A program that exposes tools, resources, or prompts to an AI application through the Model Context Protocol.",
    fullDefinition:
      "An MCP server is a lightweight service that responds to requests from an MCP client. It can expose tools (executable functions), resources (data sources the model can read), and prompts (parameterised interaction templates). Servers connect to clients over stdio or Streamable HTTP.",
    protocolSection: "Architecture",
    aliases: ["Model Context Protocol server", "MCP connector"],
    relatedTerms: ["mcp-client", "mcp-host", "stdio", "streamable-http", "mcp-tools"],
    updatedAt: "2026-07-29",
  },
  {
    id: "glossary:stdio",
    slug: "stdio",
    family: "glossary",
    name: "stdio Transport",
    status: "published",
    route: "/glossary/stdio/",
    primaryKeyword: "MCP stdio",
    secondaryKeywords: ["stdio transport MCP", "MCP stdio vs HTTP", "what is stdio in MCP"],
    searchIntent: "informational",
    metaDescription:
      "Definition of stdio transport in MCP: how local servers communicate with clients via standard input and output streams.",
    term: "stdio",
    shortDefinition:
      "A local transport where the MCP server runs as a subprocess and communicates via stdin and stdout.",
    fullDefinition:
      "The stdio transport starts the MCP server as a child process of the host. JSON-RPC messages are exchanged over standard input and output. It is the simplest transport, requires no network configuration, and is the default for local integrations such as Claude Desktop and Cursor.",
    protocolSection: "Transport",
    aliases: ["standard I/O transport", "subprocess transport"],
    relatedTerms: ["streamable-http", "mcp-server", "json-rpc"],
    updatedAt: "2026-07-29",
  },
  {
    id: "glossary:streamable-http",
    slug: "streamable-http",
    family: "glossary",
    name: "Streamable HTTP Transport",
    status: "published",
    route: "/glossary/streamable-http/",
    primaryKeyword: "MCP Streamable HTTP",
    secondaryKeywords: ["MCP HTTP transport", "remote MCP server transport", "Streamable HTTP vs stdio"],
    searchIntent: "informational",
    metaDescription:
      "Definition of Streamable HTTP transport in MCP: the standard transport for remote servers supporting multiple clients and OAuth authentication.",
    term: "Streamable HTTP",
    shortDefinition:
      "An HTTP-based transport enabling remote MCP servers to serve multiple clients with streaming responses.",
    fullDefinition:
      "Streamable HTTP is the standard transport for deploying MCP servers remotely. It uses HTTP POST for client requests and supports streaming responses. It replaced the earlier HTTP+SSE approach and is required for OAuth-authenticated, multi-client, cloud-hosted deployments.",
    protocolSection: "Transport",
    aliases: ["HTTP transport", "remote MCP transport"],
    relatedTerms: ["stdio", "mcp-server", "json-rpc", "mcp-oauth"],
    updatedAt: "2026-07-29",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Best-of List entity  (/best/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface BestListEntity extends BaseEntity {
  family: "best";
  useCase: string;
  methodology: string;
  itemCount: number;
  year: number;
  serverSlugs: string[];
  relatedLists: string[];
}

const baseBestLists: BestListEntity[] = [
  // Consolidated 2026-08-05: /best/best-mcp-servers/ duplicated the
  // "best MCP servers" intent already owned by /best/mcp-servers/ — identical
  // <title> and <h1>, 76% identical body copy. /best/mcp-servers/ is the
  // sitemap-declared canonical and matches the /best/<subject>/ taxonomy used
  // by every sibling. The old route now 301s there; see next.config.js.
  {
    id: "best:best-mcp-servers-for-databases",
    slug: "best-mcp-servers-for-databases",
    family: "best",
    name: "Best MCP Servers for Databases",
    status: "published",
    route: "/best/best-mcp-servers-for-databases/",
    primaryKeyword: "best MCP servers for databases",
    secondaryKeywords: ["database MCP servers", "SQL MCP server", "best database MCP"],
    searchIntent: "commercial",
    metaDescription:
      "The best database MCP servers of 2026. Covers PostgreSQL, MySQL, MongoDB, Redis, Supabase, and SQLite with setup guides and security notes.",
    useCase: "Databases",
    methodology: "Evaluated on schema exploration depth, query safety, read-only mode support, and connection pooling.",
    itemCount: 8,
    year: 2026,
    serverSlugs: [
      "postgresql-mcp-server", "mysql-mcp-server", "mongodb-mcp-server",
      "redis-mcp-server", "supabase-mcp-server", "sqlite-mcp-server",
      "bigquery-mcp-server", "snowflake-mcp-server",
    ],
    relatedLists: ["mcp-servers", "best-mcp-servers-for-developers"],
    updatedAt: "2026-07-29",
  },
];

export const bestLists: BestListEntity[] = mergeBySlug(baseBestLists, phaseABestLists);

// ─────────────────────────────────────────────────────────────────────────────
// News entity  (/news/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface NewsEntity extends BaseEntity {
  family: "news";
  headline: string;
  summary: string;
  coverageType: "release" | "protocol-update" | "security-advisory" | "ecosystem" | "analysis";
  eventDate: string;
  sources: string[];
}

export const newsEntries: NewsEntity[] = [];

// ─────────────────────────────────────────────────────────────────────────────
// Enterprise Guide entity  (/enterprise/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface EnterpriseEntity extends BaseEntity {
  family: "enterprise";
  topic: string;
  industryVerticals: string[];
  governanceFrameworks: string[];
  relatedTopics: string[];
}

export const enterpriseGuides: EnterpriseEntity[] = [
  {
    id: "enterprise:production-mcp-architecture",
    slug: "production-mcp-architecture",
    family: "enterprise",
    name: "Production MCP Architecture",
    status: "candidate",
    route: "/enterprise/production-mcp-architecture/",
    primaryKeyword: "enterprise MCP architecture",
    secondaryKeywords: ["production MCP server", "enterprise MCP deployment", "MCP at scale"],
    searchIntent: "informational",
    metaDescription:
      "Design MCP server architectures for production enterprise environments. Covers multi-tenant deployment, access control, audit logging, and governance.",
    topic: "Production Architecture",
    industryVerticals: ["fintech", "saas", "enterprise-software"],
    governanceFrameworks: ["SOC 2", "ISO 27001"],
    relatedTopics: ["security-model", "access-control", "audit-logging"],
    updatedAt: "2026-07-29",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Example Project entity  (/examples/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface ExampleEntity extends BaseEntity {
  family: "examples";
  projectName: string;
  language: string;
  sdk: string;
  repoUrl?: string;
  demoUrl?: string;
  tags: string[];
}

export const examples: ExampleEntity[] = [
  {
    id: "example:weather-mcp-server-python",
    slug: "weather-mcp-server-python",
    family: "examples",
    name: "Weather MCP Server (Python)",
    status: "candidate",
    route: "/examples/weather-mcp-server-python/",
    primaryKeyword: "Python MCP server example",
    secondaryKeywords: ["weather MCP server Python", "MCP server tutorial example", "build MCP server Python example"],
    searchIntent: "informational",
    metaDescription:
      "A complete example of a Python MCP server that exposes weather data as tools. Includes source code, tests, and Docker deployment.",
    projectName: "Weather MCP Server",
    language: "Python",
    sdk: "sdk:python",
    tags: ["beginner", "tools", "api-integration", "fastmcp"],
    updatedAt: "2026-07-29",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Template entity  (/templates/[slug])
// ─────────────────────────────────────────────────────────────────────────────

export interface TemplateEntity extends BaseEntity {
  family: "templates";
  templateName: string;
  language: string;
  sdk: string;
  repoUrl?: string;
  includesTests: boolean;
  includesDocker: boolean;
  tags: string[];
}

export const boilerplates: TemplateEntity[] = [
  {
    id: "template:typescript-mcp-starter",
    slug: "typescript-mcp-starter",
    family: "templates",
    name: "TypeScript MCP Server Starter",
    status: "candidate",
    route: "/templates/typescript-mcp-starter/",
    primaryKeyword: "TypeScript MCP server template",
    secondaryKeywords: ["MCP server boilerplate TypeScript", "MCP starter template", "TypeScript MCP starter"],
    searchIntent: "transactional",
    metaDescription:
      "A production-ready TypeScript MCP server starter template with tools, resources, tests, Docker, and GitHub Actions CI.",
    templateName: "TypeScript MCP Server Starter",
    language: "TypeScript",
    sdk: "sdk:typescript",
    includesTests: true,
    includesDocker: true,
    tags: ["typescript", "starter", "tools", "docker", "ci"],
    updatedAt: "2026-07-29",
  },
  {
    id: "template:python-mcp-starter",
    slug: "python-mcp-starter",
    family: "templates",
    name: "Python MCP Server Starter",
    status: "candidate",
    route: "/templates/python-mcp-starter/",
    primaryKeyword: "Python MCP server template",
    secondaryKeywords: ["MCP server boilerplate Python", "Python MCP starter", "FastMCP template"],
    searchIntent: "transactional",
    metaDescription:
      "A production-ready Python MCP server starter using FastMCP with tools, resources, pytest tests, and Docker.",
    templateName: "Python MCP Server Starter",
    language: "Python",
    sdk: "sdk:python",
    includesTests: true,
    includesDocker: true,
    tags: ["python", "fastmcp", "starter", "tools", "docker"],
    updatedAt: "2026-07-29",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Unified entity registry + helper functions
// ─────────────────────────────────────────────────────────────────────────────

export type AnyEntity =
  | IntegrationEntity
  | ClientEntity
  | SdkEntity
  | FrameworkEntity
  | DeploymentEntity
  | SecurityEntity
  | TroubleshootEntity
  | GlossaryEntity
  | BestListEntity
  | NewsEntity
  | EnterpriseEntity
  | ExampleEntity
  | TemplateEntity;

/** All seeded entities across every content family. */
export const allEntities: AnyEntity[] = [
  ...integrations,
  ...clients,
  ...sdks,
  ...frameworks,
  ...deploymentGuides,
  ...securityGuides,
  ...troubleshootingGuides,
  ...glossaryTerms,
  ...bestLists,
  ...newsEntries,
  ...enterpriseGuides,
  ...examples,
  ...boilerplates,
];

/** Look up any entity by its stable ID. */
export function getEntityById(id: string): AnyEntity | undefined {
  return allEntities.find((e) => e.id === id);
}

/** Look up any entity by family + slug. */
export function getEntityBySlug(family: ContentFamily, slug: string): AnyEntity | undefined {
  return allEntities.find((e) => e.family === family && e.slug === slug);
}

/** Return all entities for a given content family. */
export function getEntitiesByFamily(family: ContentFamily): AnyEntity[] {
  return allEntities.filter((e) => e.family === family);
}

/** Return all published entities across all families. */
export function getPublishedEntities(): AnyEntity[] {
  return allEntities.filter((e) => e.status === "published" || e.status === "publish_approved");
}

/** Return all entities in a given workflow state. */
export function getEntitiesByStatus(status: PublicationStatus): AnyEntity[] {
  return allEntities.filter((e) => e.status === status);
}

/**
 * Content family metadata: url prefix, schema types, word target, refresh days.
 * Mirrors the data in db/schema-content-families.sql.
 */
export const CONTENT_FAMILY_META: Record<
  ContentFamily,
  {
    name: string;
    urlPrefix: string;
    schemaTypes: string[];
    wordTarget: number;
    refreshDays: number;
  }
> = {
  servers:      { name: "MCP Server Profiles",       urlPrefix: "/servers",        schemaTypes: ["WebPage", "SoftwareApplication", "BreadcrumbList"],    wordTarget: 2000, refreshDays: 90  },
  integrations: { name: "Integration Guides",         urlPrefix: "/integrations",   schemaTypes: ["TechArticle", "BreadcrumbList"],                       wordTarget: 2500, refreshDays: 90  },
  tutorials:    { name: "Tutorials",                  urlPrefix: "/tutorials",      schemaTypes: ["TechArticle", "BreadcrumbList"],                       wordTarget: 2500, refreshDays: 90  },
  compare:      { name: "Comparison Pages",           urlPrefix: "/compare",        schemaTypes: ["Article", "BreadcrumbList"],                           wordTarget: 2000, refreshDays: 90  },
  best:         { name: "Best-of Lists",              urlPrefix: "/best",           schemaTypes: ["ItemList", "Article", "BreadcrumbList"],               wordTarget: 1500, refreshDays: 60  },
  glossary:     { name: "Glossary",                   urlPrefix: "/glossary",       schemaTypes: ["DefinedTerm", "WebPage", "BreadcrumbList"],             wordTarget: 800,  refreshDays: 180 },
  troubleshoot: { name: "Troubleshooting Guides",     urlPrefix: "/troubleshooting",schemaTypes: ["TechArticle", "BreadcrumbList"],                       wordTarget: 1500, refreshDays: 60  },
  security:     { name: "Security Guides",            urlPrefix: "/security",       schemaTypes: ["TechArticle", "BreadcrumbList"],                       wordTarget: 2000, refreshDays: 60  },
  sdk:          { name: "SDK Guides",                 urlPrefix: "/sdk",            schemaTypes: ["TechArticle", "SoftwareSourceCode", "BreadcrumbList"], wordTarget: 3000, refreshDays: 90  },
  frameworks:   { name: "Framework Guides",           urlPrefix: "/frameworks",     schemaTypes: ["TechArticle", "SoftwareSourceCode", "BreadcrumbList"], wordTarget: 2500, refreshDays: 90  },
  clients:      { name: "AI Client Guides",           urlPrefix: "/clients",        schemaTypes: ["TechArticle", "BreadcrumbList"],                       wordTarget: 2000, refreshDays: 90  },
  deployment:   { name: "Deployment Guides",          urlPrefix: "/deployment",     schemaTypes: ["TechArticle", "BreadcrumbList"],                       wordTarget: 2500, refreshDays: 90  },
  enterprise:   { name: "Enterprise Guides",          urlPrefix: "/enterprise",     schemaTypes: ["TechArticle", "BreadcrumbList"],                       wordTarget: 3000, refreshDays: 180 },
  examples:     { name: "Example Projects",           urlPrefix: "/examples",       schemaTypes: ["SoftwareSourceCode", "CreativeWork", "BreadcrumbList"],wordTarget: 2000, refreshDays: 90  },
  templates:    { name: "Boilerplate Templates",      urlPrefix: "/templates",      schemaTypes: ["SoftwareSourceCode", "CreativeWork", "BreadcrumbList"],wordTarget: 1500, refreshDays: 180 },
  news:         { name: "News and Release Coverage",  urlPrefix: "/news",           schemaTypes: ["NewsArticle", "BreadcrumbList"],                       wordTarget: 800,  refreshDays: 30  },
};

/**
 * Workflow stage ordering. Use to validate forward/backward transitions.
 */
export const WORKFLOW_STAGES: PublicationStatus[] = [
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

export function isForwardTransition(from: PublicationStatus, to: PublicationStatus): boolean {
  const fi = WORKFLOW_STAGES.indexOf(from);
  const ti = WORKFLOW_STAGES.indexOf(to);
  return ti > fi;
}
