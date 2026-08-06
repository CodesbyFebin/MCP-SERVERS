/**
 * MCPServer.in — Master Content Architecture
 *
 * Typed registry derived from the JSON export defining all 103,000+ English
 * pages and 5,150,000 multilingual pages. This is the single source of truth
 * for URL patterns, section configurations, category hierarchies, multilingual
 * config, sitemap structure, and content specifications.
 *
 * Nothing here writes files or hits a database. It is pure data consumed by:
 *   - src/data/route-registry.ts        (URL generation)
 *   - scripts/content/content-pipeline.ts  (candidate generation)
 *   - scripts/content/generate-content-families.ts  (AI generation)
 *   - app/sitemap.ts                    (sitemap XML)
 *   - app/admin/*                       (dashboard stats)
 */

// ─────────────────────────────────────────────────────────────────────────────
// Language configuration (50 languages, mirrors JSON export)
// ─────────────────────────────────────────────────────────────────────────────

export interface LanguageConfig {
  code: string;
  name: string;
  native: string;
  direction: "ltr" | "rtl";
  /** Pages from the EN corpus that should be translated into this language. */
  translationScope: "full" | "priority" | "top100";
}

export const LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English",    native: "English",            direction: "ltr", translationScope: "full" },
  { code: "hi", name: "Hindi",      native: "हिन्दी",               direction: "ltr", translationScope: "full" },
  { code: "ta", name: "Tamil",      native: "தமிழ்",               direction: "ltr", translationScope: "priority" },
  { code: "te", name: "Telugu",     native: "తెలుగు",              direction: "ltr", translationScope: "priority" },
  { code: "ml", name: "Malayalam",  native: "മലയാളം",             direction: "ltr", translationScope: "priority" },
  { code: "mr", name: "Marathi",    native: "मराठी",               direction: "ltr", translationScope: "priority" },
  { code: "bn", name: "Bengali",    native: "বাংলা",               direction: "ltr", translationScope: "priority" },
  { code: "gu", name: "Gujarati",   native: "ગુજરાતી",             direction: "ltr", translationScope: "priority" },
  { code: "kn", name: "Kannada",    native: "ಕನ್ನಡ",              direction: "ltr", translationScope: "priority" },
  { code: "pa", name: "Punjabi",    native: "ਪੰਜਾਬੀ",             direction: "ltr", translationScope: "priority" },
  { code: "ur", name: "Urdu",       native: "اردو",                direction: "rtl", translationScope: "priority" },
  { code: "as", name: "Assamese",   native: "অসমীয়া",             direction: "ltr", translationScope: "top100" },
  { code: "or", name: "Odia",       native: "ଓଡ଼ିଆ",              direction: "ltr", translationScope: "top100" },
  { code: "ne", name: "Nepali",     native: "नेपाली",              direction: "ltr", translationScope: "top100" },
  { code: "si", name: "Sinhala",    native: "සිංහල",               direction: "ltr", translationScope: "top100" },
  { code: "zh", name: "Chinese",    native: "中文",                 direction: "ltr", translationScope: "full" },
  { code: "ja", name: "Japanese",   native: "日本語",               direction: "ltr", translationScope: "full" },
  { code: "ko", name: "Korean",     native: "한국어",               direction: "ltr", translationScope: "full" },
  { code: "es", name: "Spanish",    native: "Español",             direction: "ltr", translationScope: "full" },
  { code: "de", name: "German",     native: "Deutsch",             direction: "ltr", translationScope: "full" },
  { code: "fr", name: "French",     native: "Français",            direction: "ltr", translationScope: "full" },
  { code: "pt", name: "Portuguese", native: "Português",           direction: "ltr", translationScope: "full" },
  { code: "it", name: "Italian",    native: "Italiano",            direction: "ltr", translationScope: "full" },
  { code: "ru", name: "Russian",    native: "Русский",             direction: "ltr", translationScope: "full" },
  { code: "nl", name: "Dutch",      native: "Nederlands",          direction: "ltr", translationScope: "full" },
  { code: "pl", name: "Polish",     native: "Polski",              direction: "ltr", translationScope: "full" },
  { code: "tr", name: "Turkish",    native: "Türkçe",              direction: "ltr", translationScope: "full" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt",          direction: "ltr", translationScope: "full" },
  { code: "th", name: "Thai",       native: "ไทย",                 direction: "ltr", translationScope: "full" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia",    direction: "ltr", translationScope: "full" },
  { code: "ar", name: "Arabic",     native: "العربية",             direction: "rtl", translationScope: "full" },
  { code: "he", name: "Hebrew",     native: "עברית",               direction: "rtl", translationScope: "full" },
  { code: "el", name: "Greek",      native: "Ελληνικά",            direction: "ltr", translationScope: "full" },
  { code: "sv", name: "Swedish",    native: "Svenska",             direction: "ltr", translationScope: "full" },
  { code: "no", name: "Norwegian",  native: "Norsk",               direction: "ltr", translationScope: "full" },
  { code: "da", name: "Danish",     native: "Dansk",               direction: "ltr", translationScope: "full" },
  { code: "fi", name: "Finnish",    native: "Suomi",               direction: "ltr", translationScope: "full" },
  { code: "cs", name: "Czech",      native: "Čeština",             direction: "ltr", translationScope: "full" },
  { code: "hu", name: "Hungarian",  native: "Magyar",              direction: "ltr", translationScope: "full" },
  { code: "ro", name: "Romanian",   native: "Română",              direction: "ltr", translationScope: "full" },
  { code: "bg", name: "Bulgarian",  native: "Български",           direction: "ltr", translationScope: "full" },
  { code: "hr", name: "Croatian",   native: "Hrvatski",            direction: "ltr", translationScope: "full" },
  { code: "sr", name: "Serbian",    native: "Српски",              direction: "ltr", translationScope: "full" },
  { code: "sk", name: "Slovak",     native: "Slovenčina",          direction: "ltr", translationScope: "full" },
  { code: "uk", name: "Ukrainian",  native: "Українська",          direction: "ltr", translationScope: "full" },
  { code: "lt", name: "Lithuanian", native: "Lietuvių",            direction: "ltr", translationScope: "full" },
  { code: "lv", name: "Latvian",    native: "Latviešu",            direction: "ltr", translationScope: "full" },
  { code: "et", name: "Estonian",   native: "Eesti",               direction: "ltr", translationScope: "full" },
  { code: "sl", name: "Slovenian",  native: "Slovenščina",         direction: "ltr", translationScope: "full" },
  { code: "ms", name: "Malay",      native: "Bahasa Melayu",       direction: "ltr", translationScope: "full" },
];

export const LANGUAGE_CODES = LANGUAGES.map((l) => l.code);
export const NON_ENGLISH_LANGUAGES = LANGUAGES.filter((l) => l.code !== "en");

// ─────────────────────────────────────────────────────────────────────────────
// Content section types
// ─────────────────────────────────────────────────────────────────────────────

export type SectionType =
  | "hero" | "overview" | "features" | "installation" | "configuration"
  | "authentication" | "example-prompts" | "tools" | "resources" | "limitations"
  | "alternatives" | "faq" | "schema" | "related-content" | "cta"
  | "prerequisites" | "step-by-step" | "code-examples" | "troubleshooting"
  | "next-steps" | "summary" | "feature-comparison" | "performance"
  | "use-cases" | "pricing" | "verdict" | "list-with-descriptions"
  | "comparison-table" | "how-to-choose" | "honorable-mentions";

export interface ContentSpecification {
  wordCount: number;
  sections: SectionType[];
  codeExamples?: number;
  hasVideo?: boolean;
}

export const CONTENT_SPECS: Record<string, ContentSpecification> = {
  server: {
    wordCount: 2000,
    sections: [
      "hero", "overview", "features", "installation", "configuration",
      "authentication", "example-prompts", "tools", "resources",
      "limitations", "alternatives", "faq", "related-content", "cta",
    ],
    codeExamples: 7,
  },
  tutorial: {
    wordCount: 2500,
    sections: [
      "overview", "prerequisites", "step-by-step", "code-examples",
      "troubleshooting", "next-steps",
    ],
    codeExamples: 8,
    hasVideo: false,
  },
  comparison: {
    wordCount: 2000,
    sections: [
      "summary", "feature-comparison", "performance", "use-cases",
      "pricing", "verdict",
    ],
    codeExamples: 2,
  },
  collection: {
    wordCount: 1500,
    sections: [
      "overview", "list-with-descriptions", "comparison-table",
      "how-to-choose", "honorable-mentions",
    ],
  },
  guide: { wordCount: 2500, sections: ["overview", "prerequisites", "step-by-step", "faq"] },
  glossary: { wordCount: 800, sections: ["overview", "related-content"] },
  knowledge: { wordCount: 1200, sections: ["overview", "use-cases", "faq"] },
  intelligence: { wordCount: 1500, sections: ["overview", "features", "related-content"] },
  security: { wordCount: 2000, sections: ["overview", "use-cases", "prerequisites", "step-by-step", "faq"] },
  technology: { wordCount: 1500, sections: ["overview", "features", "code-examples"] },
  marketplace: { wordCount: 1200, sections: ["overview", "features", "pricing", "faq"] },
  database_protocol: { wordCount: 1000, sections: ["overview", "code-examples", "related-content"] },
};

// ─────────────────────────────────────────────────────────────────────────────
// SEO metadata templates
// ─────────────────────────────────────────────────────────────────────────────

export const SEO_TEMPLATES = {
  server: {
    title: (name: string) => `${name} MCP Server | Complete Guide & Installation`,
    description: (name: string) =>
      `Connect AI assistants to ${name} with MCP. Installation guide, configuration, authentication, examples, and best practices.`,
    canonical: (slug: string) => `https://www.mcpserver.in/servers/${slug}`,
  },
  tutorial: {
    title: (title: string) => `${title} | MCP Tutorial`,
    description: (title: string) => `Step-by-step tutorial: ${title}. Code examples, testing, and deployment included.`,
    canonical: (slug: string) => `https://www.mcpserver.in/tutorials/${slug}`,
  },
  comparison: {
    title: (a: string, b: string) => `${a} vs ${b} | MCP Comparison`,
    description: (a: string, b: string) =>
      `Compare ${a} and ${b} side-by-side: features, performance, security, and use cases.`,
    canonical: (slug: string) => `https://www.mcpserver.in/compare/${slug}`,
  },
  collection: {
    // The root layout applies `template: "%s | MCPserver.in"`, so titles must
    // not embed the brand themselves or it renders twice.
    title: (name: string, year: number) => `${name} (${year})`,
    description: (name: string) => `Curated list: ${name}. Ranked by quality, maintenance, and community adoption.`,
    canonical: (slug: string) => `https://www.mcpserver.in/best/${slug}`,
  },
  guide: {
    title: (category: string, name: string) => `${name} | Enterprise MCP Guide`,
    description: (_c: string, name: string) => `Enterprise guide: ${name}. Architecture, security, and deployment patterns.`,
    canonical: (category: string, slug: string) => `https://www.mcpserver.in/guides/${category}/${slug}`,
  },
  glossary: {
    title: (term: string) => `What Is ${term}? | MCP Glossary`,
    description: (term: string) => `Definition of ${term} in the Model Context Protocol. Includes examples, related terms, and protocol context.`,
    canonical: (slug: string) => `https://www.mcpserver.in/knowledge/glossary/${slug}`,
  },
  intelligence: {
    title: (type: string, name: string) => `${name} | MCP ${type} Intelligence`,
    description: (_t: string, name: string) => `${name}. Data-backed intelligence for the MCP ecosystem.`,
    canonical: (type: string, slug: string) => `https://www.mcpserver.in/intelligence/${type}/${slug}`,
  },
  security_guide: {
    title: (name: string) => `${name} | MCP Security`,
    description: (name: string) => `${name}. Security controls, threat models, and compliance guidance for MCP deployments.`,
    canonical: (category: string, slug: string) => `https://www.mcpserver.in/security/${category}/${slug}`,
  },
  technology: {
    title: (name: string) => `${name} | MCP Technology Reference`,
    description: (name: string) => `Technical reference: ${name}. Protocol specification, SDK usage, and implementation examples.`,
    canonical: (category: string, slug: string) => `https://www.mcpserver.in/technology/${category}/${slug}`,
  },
  knowledge: {
    title: (name: string) => `${name} | MCP Knowledge Hub`,
    description: (name: string) => `${name}. Concepts, architecture patterns, and terminology for the Model Context Protocol.`,
    canonical: (type: string, slug: string) => `https://www.mcpserver.in/knowledge/${type}/${slug}`,
  },
  marketplace: {
    title: (name: string) => `${name} | MCP Marketplace`,
    description: (name: string) => `${name}. Hosted MCP servers, premium integrations, and enterprise solutions.`,
    canonical: (type: string, slug: string) => `https://www.mcpserver.in/marketplace/${type}/${slug}`,
  },
  database_protocol: {
    title: (type: string, name: string) => `${name} | MCP ${type} Reference`,
    description: (_t: string, name: string) => `Complete reference for ${name} in the Model Context Protocol ecosystem.`,
    canonical: (type: string, slug: string) => `https://www.mcpserver.in/database/${type}/${slug}`,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Section definitions — all 10 content sections with URL patterns + targets
// ─────────────────────────────────────────────────────────────────────────────

export type SectionId =
  | "servers" | "tutorials" | "database" | "marketplace"
  | "guides" | "intelligence" | "security" | "technology"
  | "knowledge" | "compare" | "best";

export interface SectionCategory {
  slug: string;
  name: string;
  url: string;
  targetPages: number;
  description: string;
}

export interface ContentSection {
  id: SectionId;
  name: string;
  targetPages: number;
  urlPattern: string;
  pillarUrl: string;
  pillarTitle: string;
  pillarDescription: string;
  categories: SectionCategory[];
  refreshDays: number;
  changeFrequency: "daily" | "weekly" | "monthly";
  sitemapFile: string;
  priority: number;
}

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "servers",
    name: "MCP Server Directory",
    targetPages: 20000,
    urlPattern: "/servers/{slug}",
    pillarUrl: "/servers",
    pillarTitle: "MCP Server Directory | 20,000+ Model Context Protocol Servers",
    pillarDescription: "Discover, compare, and install MCP servers for Claude, Cursor, and AI assistants.",
    refreshDays: 30,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-servers-en.xml",
    priority: 0.8,
    categories: [
      { slug: "database",      name: "Database",       url: "/servers/category/database",      targetPages: 1000, description: "MCP servers for SQL, NoSQL, and vector databases" },
      { slug: "filesystem",    name: "File System",    url: "/servers/category/filesystem",    targetPages: 500,  description: "MCP servers for file operations and cloud storage" },
      { slug: "communication", name: "Communication",  url: "/servers/category/communication", targetPages: 400,  description: "Slack, Discord, Teams, and email MCP servers" },
      { slug: "developer",     name: "Developer Tools",url: "/servers/category/developer",     targetPages: 800,  description: "GitHub, GitLab, CI/CD, and IDE MCP servers" },
      { slug: "cloud",         name: "Cloud Services", url: "/servers/category/cloud",         targetPages: 600,  description: "AWS, Azure, GCP, and multi-cloud MCP servers" },
      { slug: "productivity",  name: "Productivity",   url: "/servers/category/productivity",  targetPages: 400,  description: "Notion, Jira, Linear, and PM tool servers" },
      { slug: "ai-ml",         name: "AI / ML",        url: "/servers/category/ai-ml",         targetPages: 300,  description: "OpenAI, Anthropic, and model provider servers" },
      { slug: "security",      name: "Security",       url: "/servers/category/security",      targetPages: 200,  description: "Identity, secrets, and compliance MCP servers" },
      { slug: "monitoring",    name: "Monitoring",     url: "/servers/category/monitoring",    targetPages: 200,  description: "APM, logging, tracing, and metrics servers" },
      { slug: "payments",      name: "Payments",       url: "/servers/category/payments",      targetPages: 150,  description: "Stripe, PayPal, and payment gateway servers" },
    ],
  },
  {
    id: "tutorials",
    name: "Tutorials",
    targetPages: 25000,
    urlPattern: "/tutorials/{slug}",
    pillarUrl: "/tutorials",
    pillarTitle: "MCP Tutorials | Learn Model Context Protocol",
    pillarDescription: "Step-by-step tutorials for building, deploying, and using MCP servers. From beginner to advanced.",
    refreshDays: 90,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-tutorials-en.xml",
    priority: 0.8,
    categories: [
      { slug: "getting-started",   name: "Getting Started",    url: "/tutorials/category/getting-started",   targetPages: 3000, description: "First steps with MCP" },
      { slug: "building-servers",  name: "Building Servers",   url: "/tutorials/category/building-servers",  targetPages: 8000, description: "Build MCP servers in every language" },
      { slug: "integration",       name: "Integration",        url: "/tutorials/category/integration",       targetPages: 5000, description: "Connect platforms to AI clients" },
      { slug: "deployment",        name: "Deployment",         url: "/tutorials/category/deployment",        targetPages: 3000, description: "Docker, Kubernetes, cloud deployment" },
      { slug: "security-tutorials",name: "Security",           url: "/tutorials/category/security",          targetPages: 3000, description: "Secure MCP implementation patterns" },
      { slug: "advanced",          name: "Advanced",           url: "/tutorials/category/advanced",          targetPages: 3000, description: "Multi-server, sampling, and complex patterns" },
    ],
  },
  {
    id: "database",
    name: "MCP Protocol Database",
    targetPages: 20000,
    urlPattern: "/database/{type}/{slug}",
    pillarUrl: "/database",
    pillarTitle: "MCP Database | Protocol Objects Reference",
    pillarDescription: "Complete reference for MCP tools, resources, prompts, schemas, and SDKs.",
    refreshDays: 90,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-database-en.xml",
    priority: 0.7,
    categories: [
      { slug: "tools",          name: "Tools",          url: "/database/tools",          targetPages: 5000, description: "MCP tool definitions and input/output schemas" },
      { slug: "resources",      name: "Resources",      url: "/database/resources",      targetPages: 3000, description: "MCP resource URI schemes and content types" },
      { slug: "prompts",        name: "Prompts",        url: "/database/prompts",        targetPages: 2000, description: "MCP prompt templates and argument schemas" },
      { slug: "schemas",        name: "Schemas",        url: "/database/schemas",        targetPages: 2000, description: "JSON schemas for MCP protocol objects" },
      { slug: "sdks",           name: "SDKs",           url: "/database/sdks",           targetPages: 2000, description: "SDK reference pages per language" },
      { slug: "clients",        name: "Clients",        url: "/database/clients",        targetPages: 2000, description: "MCP client capability reference" },
      { slug: "transports",     name: "Transports",     url: "/database/transports",     targetPages: 1000, description: "stdio, Streamable HTTP, and legacy SSE" },
      { slug: "authentication", name: "Authentication", url: "/database/authentication", targetPages: 2000, description: "OAuth, API key, JWT, and service account patterns" },
      { slug: "errors",         name: "Error Codes",    url: "/database/errors",         targetPages: 1000, description: "JSON-RPC error codes and MCP-specific codes" },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    targetPages: 10000,
    urlPattern: "/marketplace/{type}/{slug}",
    pillarUrl: "/marketplace",
    pillarTitle: "MCP Marketplace | Hosted & Premium Servers",
    pillarDescription: "Discover hosted MCP servers, premium integrations, templates, and enterprise solutions.",
    refreshDays: 30,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-marketplace-en.xml",
    priority: 0.7,
    categories: [
      { slug: "hosted",    name: "Hosted Servers",  url: "/marketplace/hosted",    targetPages: 3000, description: "Cloud-hosted, zero-install MCP servers" },
      { slug: "premium",   name: "Premium",         url: "/marketplace/premium",   targetPages: 2000, description: "Enterprise-grade certified MCP servers" },
      { slug: "templates", name: "Templates",       url: "/marketplace/templates", targetPages: 2000, description: "Starter templates for every language" },
      { slug: "plugins",   name: "Plugins",         url: "/marketplace/plugins",   targetPages: 3000, description: "IDE plugins and client extensions" },
    ],
  },
  {
    id: "guides",
    name: "Enterprise Guides",
    targetPages: 10000,
    urlPattern: "/guides/{category}/{slug}",
    pillarUrl: "/guides",
    pillarTitle: "Enterprise MCP Guides | Architecture & Best Practices",
    pillarDescription: "Enterprise-grade guides for MCP deployment, security, scaling, and governance.",
    refreshDays: 180,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-guides-en.xml",
    priority: 0.8,
    categories: [
      { slug: "architecture",   name: "Architecture",   url: "/guides/architecture",   targetPages: 2000, description: "Enterprise MCP architecture patterns" },
      { slug: "security",       name: "Security",       url: "/guides/security",       targetPages: 2000, description: "Security hardening and compliance" },
      { slug: "compliance",     name: "Compliance",     url: "/guides/compliance",     targetPages: 2000, description: "SOC 2, ISO 27001, GDPR, DPDP" },
      { slug: "deployment",     name: "Deployment",     url: "/guides/deployment",     targetPages: 2000, description: "Production deployment patterns" },
      { slug: "scaling",        name: "Scaling",        url: "/guides/scaling",        targetPages: 1000, description: "Horizontal scaling and load balancing" },
      { slug: "observability",  name: "Observability",  url: "/guides/observability",  targetPages: 1000, description: "Monitoring, logging, and tracing" },
    ],
  },
  {
    id: "intelligence",
    name: "Intelligence Hub",
    targetPages: 5000,
    urlPattern: "/intelligence/{type}/{slug}",
    pillarUrl: "/intelligence",
    pillarTitle: "MCP Intelligence Hub | Benchmarks & Analytics",
    pillarDescription: "MCP ecosystem analytics, benchmarks, adoption trends, and compatibility data.",
    refreshDays: 30,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-intelligence-en.xml",
    priority: 0.7,
    categories: [
      { slug: "benchmarks",     name: "Benchmarks",    url: "/intelligence/benchmarks",    targetPages: 1000, description: "Performance and latency benchmarks" },
      { slug: "popularity",     name: "Popularity",    url: "/intelligence/popularity",    targetPages: 1000, description: "Most-used and fastest-growing servers" },
      { slug: "adoption",       name: "Adoption",      url: "/intelligence/adoption",      targetPages: 1000, description: "Industry and company-size adoption data" },
      { slug: "trends",         name: "Trends",        url: "/intelligence/trends",        targetPages: 1000, description: "Ecosystem trends and emerging patterns" },
      { slug: "compatibility",  name: "Compatibility", url: "/intelligence/compatibility", targetPages: 500,  description: "Client-server version compatibility matrix" },
      { slug: "releases",       name: "Releases",      url: "/intelligence/releases",      targetPages: 500,  description: "SDK and protocol release history" },
    ],
  },
  {
    id: "security",
    name: "Security & Compliance",
    targetPages: 5000,
    urlPattern: "/security/{category}/{slug}",
    pillarUrl: "/security",
    pillarTitle: "MCP Security Center | Authentication & Authorization",
    pillarDescription: "Security best practices, authentication methods, and compliance for MCP.",
    refreshDays: 60,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-security-en.xml",
    priority: 0.8,
    categories: [
      { slug: "authentication", name: "Authentication", url: "/security/authentication", targetPages: 1000, description: "OAuth, JWT, API key implementation guides" },
      { slug: "authorization",  name: "Authorization",  url: "/security/authorization",  targetPages: 1000, description: "RBAC, ABAC, and policy enforcement" },
      { slug: "encryption",     name: "Encryption",     url: "/security/encryption",     targetPages: 500,  description: "TLS, at-rest, and in-transit encryption" },
      { slug: "audit",          name: "Audit",          url: "/security/audit",          targetPages: 500,  description: "Audit logging and compliance reporting" },
      { slug: "compliance",     name: "Compliance",     url: "/security/compliance",     targetPages: 1000, description: "SOC 2, GDPR, DPDP compliance checklists" },
      { slug: "best-practices", name: "Best Practices", url: "/security/best-practices", targetPages: 1000, description: "Threat modelling and security checklists" },
    ],
  },
  {
    id: "technology",
    name: "MCP Technology Reference",
    targetPages: 3000,
    urlPattern: "/technology/{category}/{slug}",
    pillarUrl: "/technology",
    pillarTitle: "MCP Technology Reference | Protocol & SDKs",
    pillarDescription: "Technical reference for MCP protocol, transports, JSON-RPC, and SDKs.",
    refreshDays: 90,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-technology-en.xml",
    priority: 0.7,
    categories: [
      { slug: "protocol",   name: "Protocol",    url: "/technology/protocol",   targetPages: 500, description: "MCP specification and handshake" },
      { slug: "transport",  name: "Transport",   url: "/technology/transport",  targetPages: 500, description: "stdio, Streamable HTTP, SSE" },
      { slug: "json-rpc",   name: "JSON-RPC",    url: "/technology/json-rpc",   targetPages: 500, description: "JSON-RPC 2.0 in MCP context" },
      { slug: "streaming",  name: "Streaming",   url: "/technology/streaming",  targetPages: 300, description: "Server-sent events and streaming" },
      { slug: "sdk",        name: "SDK",         url: "/technology/sdk",        targetPages: 500, description: "SDK internals and extension" },
      { slug: "cli",        name: "CLI",         url: "/technology/cli",        targetPages: 300, description: "MCP CLI reference and commands" },
      { slug: "lifecycle",  name: "Lifecycle",   url: "/technology/lifecycle",  targetPages: 400, description: "Initialization, shutdown, and recovery" },
    ],
  },
  {
    id: "knowledge",
    name: "Knowledge Hub",
    targetPages: 5000,
    urlPattern: "/knowledge/{type}/{slug}",
    pillarUrl: "/knowledge",
    pillarTitle: "MCP Knowledge Hub | Glossary & Concepts",
    pillarDescription: "Learn MCP concepts, architecture patterns, and terminology.",
    refreshDays: 180,
    changeFrequency: "monthly",
    sitemapFile: "sitemap-knowledge-en.xml",
    priority: 0.7,
    categories: [
      { slug: "glossary",        name: "Glossary",        url: "/knowledge/glossary",        targetPages: 2000, description: "Canonical MCP term definitions" },
      { slug: "concepts",        name: "Concepts",        url: "/knowledge/concepts",        targetPages: 1000, description: "Core conceptual explanations" },
      { slug: "architecture",    name: "Architecture",    url: "/knowledge/architecture",    targetPages: 500,  description: "Architecture overview and design patterns" },
      { slug: "history",         name: "History",         url: "/knowledge/history",         targetPages: 200,  description: "MCP history and timeline" },
      { slug: "patterns",        name: "Patterns",        url: "/knowledge/patterns",        targetPages: 500,  description: "Adapter, proxy, and composite patterns" },
      { slug: "faq",             name: "FAQ",             url: "/knowledge/faq",             targetPages: 500,  description: "Beginner and advanced FAQ" },
      { slug: "learning-paths",  name: "Learning Paths",  url: "/knowledge/learning-paths",  targetPages: 300,  description: "Guided learning paths by level" },
    ],
  },
  {
    id: "compare",
    name: "Comparisons",
    targetPages: 5000,
    urlPattern: "/compare/{a}-vs-{b}",
    pillarUrl: "/compare",
    pillarTitle: "MCP Server Comparisons | Side-by-Side Analysis",
    pillarDescription: "Compare MCP servers, tools, and approaches side-by-side.",
    refreshDays: 90,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-compare-en.xml",
    priority: 0.8,
    categories: [
      { slug: "servers",     name: "Server Comparisons",    url: "/compare/servers",     targetPages: 2000, description: "Side-by-side server feature comparisons" },
      { slug: "clients",     name: "Client Comparisons",    url: "/compare/clients",     targetPages: 500,  description: "AI client MCP support comparisons" },
      { slug: "transports",  name: "Transport Comparisons", url: "/compare/transports",  targetPages: 200,  description: "stdio vs HTTP vs SSE" },
      { slug: "auth",        name: "Auth Comparisons",      url: "/compare/auth",        targetPages: 300,  description: "OAuth vs JWT vs API keys" },
      { slug: "paradigms",   name: "Paradigm Comparisons",  url: "/compare/paradigms",   targetPages: 500,  description: "MCP vs REST, MCP vs plugins" },
      { slug: "deployment",  name: "Deployment Comparisons",url: "/compare/deployment",  targetPages: 300,  description: "Local vs hosted, Docker vs Kubernetes" },
      { slug: "sdks",        name: "SDK Comparisons",       url: "/compare/sdks",        targetPages: 300,  description: "Python vs TypeScript vs Go SDKs" },
      { slug: "cloud",       name: "Cloud Comparisons",     url: "/compare/cloud",       targetPages: 400,  description: "AWS vs GCP vs Azure for MCP" },
      { slug: "ides",        name: "IDE Comparisons",       url: "/compare/ides",        targetPages: 500,  description: "Cursor vs VS Code vs Windsurf" },
    ],
  },
  {
    id: "best",
    name: "Collections / Best Lists",
    targetPages: 5000,
    urlPattern: "/best/{category}",
    pillarUrl: "/best",
    pillarTitle: "Best MCP Servers | Top Rated by Category",
    pillarDescription: "Curated lists of the best MCP servers by category, use case, and popularity.",
    refreshDays: 60,
    changeFrequency: "weekly",
    sitemapFile: "sitemap-best-en.xml",
    priority: 0.8,
    categories: [
      { slug: "by-platform",  name: "By Platform",   url: "/best/by-platform",  targetPages: 1000, description: "Best server for each platform" },
      { slug: "by-use-case",  name: "By Use Case",   url: "/best/by-use-case",  targetPages: 1500, description: "Best servers for specific workflows" },
      { slug: "by-language",  name: "By Language",   url: "/best/by-language",  targetPages: 500,  description: "Best servers per programming language" },
      { slug: "by-client",    name: "By Client",     url: "/best/by-client",    targetPages: 500,  description: "Best servers for each AI client" },
      { slug: "by-industry",  name: "By Industry",   url: "/best/by-industry",  targetPages: 500,  description: "Best servers for verticals" },
      { slug: "ranked",       name: "Ranked Lists",  url: "/best/ranked",       targetPages: 1000, description: "Top-N ranked lists by year" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Aggregate targets
// ─────────────────────────────────────────────────────────────────────────────

export const TOTAL_ENGLISH_PAGES = CONTENT_SECTIONS.reduce(
  (sum, s) => sum + s.targetPages, 0
); // 103,000

export const TOTAL_MULTILINGUAL_PAGES = NON_ENGLISH_LANGUAGES.reduce(
  (sum, lang) => {
    const scope = lang.translationScope;
    const factor = scope === "full" ? 1 : scope === "priority" ? 0.3 : 0.01;
    return sum + Math.round(TOTAL_ENGLISH_PAGES * factor);
  }, 0
);

export const TOTAL_PAGES = TOTAL_ENGLISH_PAGES + TOTAL_MULTILINGUAL_PAGES;

// ─────────────────────────────────────────────────────────────────────────────
// Sitemap file manifest (one file per section per language)
// ─────────────────────────────────────────────────────────────────────────────

export interface SitemapManifestEntry {
  file: string;
  language: string;
  sectionId: SectionId;
  targetPages: number;
  changeFrequency: "daily" | "weekly" | "monthly";
}

export function buildSitemapManifest(): SitemapManifestEntry[] {
  const entries: SitemapManifestEntry[] = [];
  for (const section of CONTENT_SECTIONS) {
    // English
    entries.push({
      file: section.sitemapFile,
      language: "en",
      sectionId: section.id,
      targetPages: section.targetPages,
      changeFrequency: section.changeFrequency,
    });
    // Non-English
    for (const lang of NON_ENGLISH_LANGUAGES) {
      const scope = lang.translationScope;
      const factor = scope === "full" ? 1 : scope === "priority" ? 0.3 : 0.01;
      const pages = Math.round(section.targetPages * factor);
      if (pages < 1) continue;
      entries.push({
        file: section.sitemapFile.replace("-en.xml", `-${lang.code}.xml`),
        language: lang.code,
        sectionId: section.id,
        targetPages: pages,
        changeFrequency: section.changeFrequency,
      });
    }
  }
  return entries;
}

// ─────────────────────────────────────────────────────────────────────────────
// Seed slugs for initial candidate generation
// These represent the highest-priority pages in each section.
// ─────────────────────────────────────────────────────────────────────────────

export const SEED_SLUGS: Record<SectionId, string[]> = {
  servers: [
    "postgres", "github", "slack", "filesystem", "sqlite", "google-drive",
    "mongodb", "redis", "notion", "stripe", "aws", "docker", "kubernetes",
    "jira", "linear", "figma", "shopify", "hubspot", "salesforce",
    "cloudflare", "vercel", "supabase", "elasticsearch", "mysql",
  ],
  tutorials: [
    "build-mcp-server-python", "build-mcp-server-typescript",
    "build-mcp-server-go", "deploy-mcp-server-docker",
    "mcp-quickstart", "what-is-mcp", "install-first-mcp-server",
    "mcp-server-best-practices", "build-remote-mcp-server",
    "add-oauth-to-mcp-server",
  ],
  database: [
    "tools/read-file", "tools/write-file", "tools/query-database",
    "resources/file-resource", "resources/database-table",
    "prompts/summarize-code", "schemas/tool-schema",
    "sdks/python-sdk", "sdks/typescript-sdk",
    "transports/stdio", "transports/http",
    "authentication/oauth-2", "authentication/api-key",
  ],
  marketplace: [
    "hosted/mcp-manager", "hosted/composio",
    "templates/python-server-template", "templates/typescript-server-template",
    "plugins/vscode-mcp", "plugins/jetbrains-mcp",
  ],
  guides: [
    "architecture/mcp-enterprise-architecture", "architecture/mcp-microservices",
    "security/mcp-security-guide", "security/mcp-zero-trust",
    "compliance/mcp-soc2", "compliance/mcp-gdpr",
    "deployment/mcp-blue-green", "deployment/mcp-kubernetes",
    "scaling/mcp-horizontal-scaling", "observability/mcp-monitoring",
  ],
  intelligence: [
    "benchmarks/mcp-performance-2026", "benchmarks/mcp-latency-comparison",
    "popularity/most-popular-mcp-servers", "trends/mcp-trends-2026",
    "adoption/mcp-adoption-by-industry", "releases/mcp-changelog",
    "compatibility/mcp-version-matrix",
  ],
  security: [
    "authentication/oauth-implementation", "authentication/jwt-implementation",
    "authorization/rbac-mcp", "encryption/tls-configuration",
    "audit/audit-logging", "compliance/soc2-checklist",
    "compliance/gdpr-checklist", "best-practices/mcp-security-checklist",
    "best-practices/threat-modeling",
  ],
  technology: [
    "protocol/mcp-specification", "protocol/mcp-handshake",
    "transport/stdio-transport", "transport/sse-transport",
    "json-rpc/json-rpc-2-0", "sdk/python-sdk-reference",
    "sdk/typescript-sdk-reference", "lifecycle/server-initialization",
    "lifecycle/server-shutdown",
  ],
  knowledge: [
    "glossary/model-context-protocol", "glossary/mcp-server",
    "glossary/mcp-client", "glossary/tool", "glossary/resource",
    "glossary/prompt", "glossary/transport", "glossary/json-rpc",
    "glossary/stdio", "concepts/what-is-mcp", "concepts/mcp-vs-api",
    "architecture/mcp-architecture-overview", "learning-paths/mcp-beginner-path",
  ],
  compare: [
    "postgres-vs-mysql", "github-vs-gitlab", "slack-vs-discord",
    "aws-vs-gcp", "claude-vs-chatgpt", "cursor-vs-windsurf",
    "stdio-vs-sse", "local-vs-hosted-mcp", "oauth-vs-jwt", "rest-vs-mcp",
  ],
  best: [
    "database-mcp-servers", "mcp-servers-2026", "mcp-servers-for-developers",
    "free-mcp-servers", "mcp-servers-for-claude", "mcp-servers-for-cursor",
    "python-mcp-servers", "enterprise-mcp-servers", "mcp-servers-for-beginners",
    "github-mcp-servers",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: get a section by ID
// ─────────────────────────────────────────────────────────────────────────────

export function getSectionById(id: SectionId): ContentSection | undefined {
  return CONTENT_SECTIONS.find((s) => s.id === id);
}

export function getSectionByUrlPrefix(prefix: string): ContentSection | undefined {
  return CONTENT_SECTIONS.find((s) => s.pillarUrl === prefix || s.urlPattern.startsWith(prefix));
}
