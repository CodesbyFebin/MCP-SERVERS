/**
 * MCPServer.in — Route Registry
 *
 * Single function generateAllRoutes() that produces the complete flat list of
 * every URL the site targets, with the metadata the sitemap, pipeline, and
 * admin dashboard need.
 *
 * Design constraints:
 *  - Pure TypeScript, zero I/O — safe to import in Server Components.
 *  - Generates seed routes from SEED_SLUGS immediately; full expansion comes
 *    from the content pipeline as new pages are approved.
 *  - All multilingual variants are derived from their EN counterpart.
 */

import {
  CONTENT_SECTIONS,
  SEED_SLUGS,
  LANGUAGES,
  SEO_TEMPLATES,
  type SectionId,
  type ContentSection,
} from "./content-architecture";
import { servers as serverData } from "./servers";
import { categories } from "./categories";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type RouteStatus =
  | "published"      // live, indexed
  | "candidate"      // queued for pipeline
  | "in_progress"    // being generated
  | "draft"          // generated, awaiting review
  | "pending_review" // human review required
  | "approved"       // approved, build pending
  | "rejected"       // rejected, will not publish
  | "archived";      // no longer maintained

export interface RouteEntry {
  /** Canonical path, no trailing slash, e.g. "/servers/postgres" */
  path: string;
  /** Full canonical URL */
  url: string;
  /** Language code */
  lang: string;
  /** Content section this route belongs to */
  sectionId: SectionId;
  /** Stable entity / slug identifier */
  slug: string;
  /** SEO title */
  title: string;
  /** Meta description */
  description: string;
  /** Publication status */
  status: RouteStatus;
  /** Sitemap priority 0.0–1.0 */
  priority: number;
  /** Sitemap change frequency */
  changeFrequency: "daily" | "weekly" | "monthly";
  /** ISO date of last modification */
  lastModified: string;
  /** True when this is a pillar/hub page (not a leaf) */
  isPillar: boolean;
  /** True when this is a category index page */
  isCategory: boolean;
}

const BASE_URL = "https://www.mcpserver.in";
const TODAY = new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────────────────────
// Private helpers
// ─────────────────────────────────────────────────────────────────────────────

function entry(
  path: string,
  lang: string,
  sectionId: SectionId,
  slug: string,
  title: string,
  description: string,
  status: RouteStatus,
  priority: number,
  changeFrequency: "daily" | "weekly" | "monthly",
  flags: { isPillar?: boolean; isCategory?: boolean } = {}
): RouteEntry {
  const langPrefix = lang === "en" ? "" : `/${lang}`;
  const fullPath = `${langPrefix}${path}`;
  return {
    path: fullPath,
    url: `${BASE_URL}${fullPath}`,
    lang,
    sectionId,
    slug,
    title,
    description,
    status,
    priority,
    changeFrequency,
    lastModified: TODAY,
    isPillar: flags.isPillar ?? false,
    isCategory: flags.isCategory ?? false,
  };
}

function multilingual(en: RouteEntry, lang: string): RouteEntry {
  return {
    ...en,
    path: `/${lang}${en.path}`,
    url: `${BASE_URL}/${lang}${en.path}`,
    lang,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Section builders
// ─────────────────────────────────────────────────────────────────────────────

function buildServerRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];
  const section = CONTENT_SECTIONS.find((s) => s.id === "servers")!;

  // Pillar
  routes.push(entry(
    "/servers", "en", "servers", "servers-hub",
    section.pillarTitle, section.pillarDescription,
    "published", 0.9, "daily", { isPillar: true }
  ));

  // Category pages (from existing categories data)
  for (const cat of categories) {
    routes.push(entry(
      `/servers/category/${cat.slug}`, "en", "servers", `cat:${cat.slug}`,
      `${cat.name} MCP Servers | MCPServer.in`,
      cat.description,
      "published", 0.8, "weekly", { isCategory: true }
    ));
  }

  // Individual server pages (from existing servers data)
  for (const s of serverData) {
    routes.push(entry(
      `/servers/${s.slug}`, "en", "servers", s.slug,
      SEO_TEMPLATES.server.title(s.name),
      SEO_TEMPLATES.server.description(s.name),
      "published", 0.8, "weekly"
    ));
  }

  // Official/verified/trending/recent/popular sub-pages
  for (const sub of ["official", "community", "popular", "trending", "recent", "verified"]) {
    routes.push(entry(
      `/servers/${sub}`, "en", "servers", `servers-${sub}`,
      `${sub.charAt(0).toUpperCase() + sub.slice(1)} MCP Servers | MCPServer.in`,
      `Browse ${sub} MCP servers.`,
      "published", 0.7, "weekly", { isCategory: true }
    ));
  }

  return routes;
}

function buildSeedRoutes(sectionId: SectionId): RouteEntry[] {
  const section = CONTENT_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return [];
  const seeds = SEED_SLUGS[sectionId] ?? [];
  const routes: RouteEntry[] = [];

  // Pillar
  routes.push(entry(
    section.pillarUrl, "en", sectionId, `${sectionId}-hub`,
    section.pillarTitle, section.pillarDescription,
    "published", section.priority + 0.05, section.changeFrequency,
    { isPillar: true }
  ));

  // Category index pages
  for (const cat of section.categories) {
    routes.push(entry(
      cat.url, "en", sectionId, `cat:${cat.slug}`,
      `${cat.name} | ${section.name} | MCPServer.in`,
      cat.description,
      "published", section.priority, section.changeFrequency,
      { isCategory: true }
    ));
  }

  // Leaf pages from seeds
  for (const seed of seeds) {
    const urlPath = section.urlPattern
      .replace("{slug}", seed)
      .replace("{type}/{slug}", seed)
      .replace("{category}/{slug}", seed)
      .replace("{a}-vs-{b}", seed)
      .replace("{category}", seed);

    const [titlePart] = seed.split("/").reverse();
    const humanName = titlePart.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    routes.push(entry(
      urlPath, "en", sectionId, seed,
      `${humanName} | MCPServer.in`,
      `Complete guide to ${humanName} in the MCP ecosystem.`,
      "candidate", section.priority, section.changeFrequency
    ));
  }

  return routes;
}

// ─────────────────────────────────────────────────────────────────────────────
// Static pillar / structural pages
// ─────────────────────────────────────────────────────────────────────────────

function buildStaticRoutes(): RouteEntry[] {
  const statics: Array<[string, string, string, number, "daily" | "weekly" | "monthly"]> = [
    ["/",                         "MCPserver.in — The MCP Authority Platform",            "Discover, build, deploy and manage MCP servers.",                              1.0, "daily"],
    ["/complete-guide-mcp-servers","The Complete Guide to MCP Servers",                   "Everything you need to know about Model Context Protocol servers.",             0.95,"weekly"],
    ["/what-is-mcp",              "What Is MCP? Model Context Protocol Explained",        "Plain-language explanation of the Model Context Protocol.",                    0.9, "weekly"],
    ["/mcp-architecture",         "MCP Architecture: Host, Client, Server Explained",     "How MCP hosts, clients, and servers fit together.",                            0.9, "weekly"],
    ["/mcp-server",               "What Is an MCP Server?",                               "Definition, purpose, and setup of an MCP server.",                             0.9, "weekly"],
    ["/mcp-server-directory",     "MCP Server Directory",                                  "Browse all MCP servers by category.",                                          0.9, "daily"],
    ["/integrations",             "MCP Integration Guides",                                "Step-by-step guides for 1,000+ platform integrations.",                       0.8, "weekly"],
    ["/clients",                  "MCP Client Configuration Guides",                       "Set up MCP in Claude Desktop, Cursor, VS Code, and more.",                    0.8, "weekly"],
    ["/sdk",                      "MCP SDK Developer Guides",                              "Build MCP servers in TypeScript, Python, Java, Go, Rust, and more.",          0.8, "weekly"],
    ["/frameworks",               "MCP Framework Guides",                                  "FastMCP, LangChain, Spring AI, and other MCP frameworks.",                    0.8, "weekly"],
    ["/deployment",               "MCP Server Deployment Guides",                          "Deploy on Docker, Kubernetes, Vercel, Cloudflare, AWS, and more.",            0.8, "weekly"],
    ["/troubleshooting",          "MCP Server Troubleshooting",                            "Fix MCP connection errors, tool visibility issues, and auth failures.",        0.8, "weekly"],
    ["/glossary",                 "MCP Glossary",                                          "Definitions for every Model Context Protocol term.",                           0.7, "monthly"],
    ["/best",                     "Best MCP Servers",                                      "Curated, ranked lists of the best MCP servers by use case.",                  0.8, "weekly"],
    ["/compare",                  "MCP Comparisons",                                       "Side-by-side comparisons of MCP servers, clients, and approaches.",           0.8, "weekly"],
    ["/security",                 "MCP Security Center",                                   "Authentication, authorisation, and threat model guides for MCP.",             0.8, "weekly"],
    ["/enterprise",               "MCP Enterprise",                                        "Enterprise MCP architecture, governance, and compliance.",                    0.8, "weekly"],
    ["/examples",                 "MCP Example Projects",                                  "Runnable MCP example projects with source code.",                             0.7, "weekly"],
    ["/templates",                "MCP Server Templates",                                  "Production-ready MCP server starter templates.",                              0.7, "weekly"],
    ["/news",                     "MCP News",                                              "Latest MCP protocol updates, SDK releases, and ecosystem news.",               0.7, "weekly"],
    ["/state-of-mcp",             "State of MCP",                                         "Annual report on MCP ecosystem adoption, trends, and benchmarks.",            0.9, "weekly"],
    ["/pricing",                  "MCPServer.in Pricing",                                  "Hosted MCP platform pricing.",                                                 0.9, "weekly"],
    ["/docs",                     "MCPServer.in Documentation",                            "Platform documentation for MCPServer.in.",                                    0.8, "weekly"],
    ["/blog",                     "MCPServer.in Blog",                                     "Articles on MCP, AI integration, and developer tooling.",                     0.7, "weekly"],
    ["/about",                    "About MCPServer.in",                                    "The team behind MCPServer.in.",                                               0.6, "monthly"],
    ["/contact",                  "Contact MCPServer.in",                                  "Get in touch with the MCPServer.in team.",                                    0.6, "monthly"],
  ];

  return statics.map(([path, title, description, priority, cf]) =>
    entry(path, "en", "servers", path.replace(/\//g, "-").slice(1) || "home",
      title, description, "published", priority, cf, { isPillar: true })
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export interface RouteRegistryResult {
  routes: RouteEntry[];
  bySection: Map<SectionId, RouteEntry[]>;
  byStatus: Map<RouteStatus, RouteEntry[]>;
  stats: RouteRegistryStats;
}

export interface RouteRegistryStats {
  total: number;
  published: number;
  candidates: number;
  drafts: number;
  bySection: Record<string, number>;
  pillarPages: number;
  categoryPages: number;
  leafPages: number;
  englishPages: number;
  multilingualPages: number;
}

/**
 * Generate the full route registry from all content sources.
 *
 * @param includeCandidates  Include candidate (not yet published) routes.
 *                           Default true — needed for sitemap generation and
 *                           admin dashboard. Set false when only published
 *                           routes are needed (e.g. robots.txt).
 * @param includeMultilingual Include hreflang variant routes. Expensive for
 *                            full corpus; default false for most callers.
 */
export function generateAllRoutes(
  includeCandidates = true,
  includeMultilingual = false
): RouteRegistryResult {
  const allRoutes: RouteEntry[] = [
    ...buildStaticRoutes(),
    ...buildServerRoutes(),
    ...buildSeedRoutes("tutorials"),
    ...buildSeedRoutes("database"),
    ...buildSeedRoutes("marketplace"),
    ...buildSeedRoutes("guides"),
    ...buildSeedRoutes("intelligence"),
    ...buildSeedRoutes("security"),
    ...buildSeedRoutes("technology"),
    ...buildSeedRoutes("knowledge"),
    ...buildSeedRoutes("compare"),
    ...buildSeedRoutes("best"),
  ];

  // Deduplicate by path
  const seen = new Set<string>();
  const deduplicated: RouteEntry[] = [];
  for (const r of allRoutes) {
    if (!seen.has(r.path)) {
      seen.add(r.path);
      deduplicated.push(r);
    }
  }

  // Filter by status
  const filtered = includeCandidates
    ? deduplicated
    : deduplicated.filter((r) => r.status === "published" || r.status === "approved");

  // Add multilingual variants
  const withLangs: RouteEntry[] = [...filtered];
  if (includeMultilingual) {
    const enabledLangs = LANGUAGES.filter((l) => l.code !== "en");
    for (const route of filtered) {
      if (route.status !== "published" && route.status !== "approved") continue;
      for (const lang of enabledLangs) {
        withLangs.push(multilingual(route, lang.code));
      }
    }
  }

  // Index by section
  const bySection = new Map<SectionId, RouteEntry[]>();
  for (const section of CONTENT_SECTIONS) {
    bySection.set(section.id, withLangs.filter((r) => r.sectionId === section.id));
  }

  // Index by status
  const byStatus = new Map<RouteStatus, RouteEntry[]>();
  const statuses: RouteStatus[] = ["published","candidate","in_progress","draft","pending_review","approved","rejected","archived"];
  for (const st of statuses) {
    byStatus.set(st, withLangs.filter((r) => r.status === st));
  }

  // Stats
  const bySectionCounts: Record<string, number> = {};
  for (const [id, routes] of bySection) {
    bySectionCounts[id] = routes.length;
  }
  const stats: RouteRegistryStats = {
    total: withLangs.length,
    published: (byStatus.get("published")?.length ?? 0) + (byStatus.get("approved")?.length ?? 0),
    candidates: byStatus.get("candidate")?.length ?? 0,
    drafts: byStatus.get("draft")?.length ?? 0,
    bySection: bySectionCounts,
    pillarPages: withLangs.filter((r) => r.isPillar).length,
    categoryPages: withLangs.filter((r) => r.isCategory).length,
    leafPages: withLangs.filter((r) => !r.isPillar && !r.isCategory).length,
    englishPages: withLangs.filter((r) => r.lang === "en").length,
    multilingualPages: withLangs.filter((r) => r.lang !== "en").length,
  };

  return { routes: withLangs, bySection, byStatus, stats };
}

/** Convenience: only published English routes, for sitemap.ts */
export function getPublishedEnglishRoutes(): RouteEntry[] {
  const { routes } = generateAllRoutes(false, false);
  return routes.filter((r) => r.lang === "en");
}

/** Convenience: candidate routes ready for pipeline processing */
export function getCandidateRoutes(): RouteEntry[] {
  const { routes } = generateAllRoutes(true, false);
  return routes.filter((r) => r.status === "candidate" && r.lang === "en");
}

/** Lookup a single route by its exact path */
export function getRouteByPath(path: string): RouteEntry | undefined {
  const { routes } = generateAllRoutes(true, false);
  return routes.find((r) => r.path === path);
}
