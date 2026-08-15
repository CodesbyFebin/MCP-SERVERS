import { MetadataRoute } from "next";
import { pillars } from "../src/data/pillars";
import { topics } from "../src/data/topics";
import { servers } from "../src/data/servers";
import { glossaryTerms } from "../src/data/glossary";
import { comparisons } from "../src/data/comparisons";
import { categories } from "../src/data/categories";
import { docsPages, getDocsPath } from "../src/data/docs";
import { blogPosts, clusters } from "../src/data/blogPosts";
import { getPublishedCategorySlugs } from "../src/data/publishing";
import { getPublishedGeneratedPages } from "../src/lib/content/publication-registry";
import { SITE_ORIGIN } from "../src/lib/canonical-urls";

export const dynamic = "force-static";

const baseUrl = SITE_ORIGIN;

const popularComparisonSlugs = [
  "github-mcp-server-vs-gitlab-mcp-server",
  "postgres-mcp-server-vs-sqlite-mcp-server",
  "slack-mcp-server-vs-discord-mcp-server",
  "github-mcp-server-vs-postgres-mcp-server",
];

const NON_INDEXABLE_PATH_PREFIXES = [
  "/admin/",
  "/api/",
  "/login/",
  "/register/",
  "/search/",
  "/candidate/",
  "/mcp-server-directory/",
];

function normalizePath(path: string): string {
  const collapsed = path.replace(/\/{2,}/g, "/");
  if (collapsed === "/") return "/";
  return collapsed.endsWith("/") ? collapsed : `${collapsed}/`;
}

function toEntry(path: string, options: Omit<MetadataRoute.Sitemap[number], "url"> = {}): MetadataRoute.Sitemap[number] {
  const normalizedPath = normalizePath(path);
  return { url: `${baseUrl}${normalizedPath}`, ...options };
}

function isAllowedSitemapUrl(url: string): boolean {
  if (!url.startsWith(`${baseUrl}/`) && url !== `${baseUrl}/`) return false;
  const pathname = new URL(url).pathname;
  return !NON_INDEXABLE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function dedupeAndValidate(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const output: MetadataRoute.Sitemap = [];

  for (const entry of entries) {
    const normalizedUrl = `${baseUrl}${normalizePath(new URL(entry.url).pathname)}`;
    if (seen.has(normalizedUrl) || !isAllowedSitemapUrl(normalizedUrl)) continue;
    seen.add(normalizedUrl);
    output.push({ ...entry, url: normalizedUrl });
  }

  return output;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  const staticPaths = [
    { url: "", changeFrequency: "daily" as const, priority: 1.0 },
    { url: "/complete-guide-mcp-servers", changeFrequency: "weekly" as const, priority: 0.95 },
    { url: "/servers", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/categories", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/integrations", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/clients", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/mcp-monitoring", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/status", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/p99", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/glossary", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "/pricing", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/docs", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/api", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/features", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/enterprise", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "/faq", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "/learn", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/learn/mcp-production-deployment", changeFrequency: "weekly" as const, priority: 0.75 },
    { url: "/learn/dpdp-compliance-guide", changeFrequency: "weekly" as const, priority: 0.75 },
    { url: "/learn/india-mcp-benchmarks", changeFrequency: "weekly" as const, priority: 0.75 },
    { url: "/learn/india-services", changeFrequency: "weekly" as const, priority: 0.75 },
    { url: "/learn/indic-nlp-guide", changeFrequency: "weekly" as const, priority: 0.75 },
    { url: "/state-of-mcp", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/security", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/privacy", changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "/terms", changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "/compare", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/sitemap", changeFrequency: "monthly" as const, priority: 0.4 },
    { url: "/hi", changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "/compliance/matrix", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/authors", changeFrequency: "weekly" as const, priority: 0.6 },
    { url: "/community", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "/editorial-policy", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "/what-is-mcp", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/transports/streamable-http", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/security/mcp-guardrails", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/performance/mcp-server-latency", changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  const staticEntries = staticPaths.map((p) => toEntry(p.url, {
    ...(p.url ? { lastModified: today } : {}),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const publishedCategorySlugs = new Set(getPublishedCategorySlugs());

  const pillarEntries = pillars.map((p) => toEntry(`/${p.slug}`, {
    lastModified: (p as any).updatedAt || (p as any).publishedAt || today,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  const topicEntries = topics.map((t) => toEntry(`/topics/${t.slug}`, { changeFrequency: "weekly" as const, priority: 0.8 }));
  const serverEntries = servers.map((server) => toEntry(`/servers/${server.slug}`, { changeFrequency: "weekly" as const, priority: 0.8 }));
  const glossaryEntries = glossaryTerms.map((g) => toEntry(`/glossary/${g.slug}`, {
    lastModified: (g as any).updatedAt || (g as any).publishedAt || today,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const comparisonSlugs = Array.from(new Set([...comparisons.map((c) => c.slug), ...popularComparisonSlugs]));
  const comparisonEntries = comparisonSlugs.map((slug) => toEntry(`/compare/${slug}`, { changeFrequency: "weekly" as const, priority: 0.8 }));
  const categoryEntries = categories.filter((category) => publishedCategorySlugs.has(category.slug)).map((category) => toEntry(`/directory/${category.slug}`, { changeFrequency: "weekly" as const, priority: 0.8 }));
  const docsEntries = docsPages.map((doc) => toEntry(getDocsPath(doc), { changeFrequency: doc.changefreq, priority: doc.priority }));
  const toolSlugs = ["mcp-playground", "mcp-server-checker", "mcp-schema-viewer", "mcp-config-validator", "mcp-endpoint-tester", "mcp-sdk-workbench", "mcp-benchmark", "server-selector"];
  const toolEntries = toolSlugs.map((slug) => toEntry(`/tools/${slug}`, { changeFrequency: "weekly" as const, priority: 0.8 }));
  const clusterEntries = clusters.map((cluster) => toEntry(`/blog/cluster/${cluster.slug}`, { changeFrequency: "weekly" as const, priority: 0.7 }));
  const blogPostEntries = blogPosts.map((post) => toEntry(`/blog/${post.slug}`, {
    lastModified: (post as any).updatedAt || (post as any).publishedAt || new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const generatedEntries = getPublishedGeneratedPages().map((page) => toEntry(page.route, {
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return dedupeAndValidate([
    ...staticEntries,
    ...pillarEntries,
    ...topicEntries,
    ...serverEntries,
    ...glossaryEntries,
    ...comparisonEntries,
    ...categoryEntries,
    ...docsEntries,
    ...toolEntries,
    ...clusterEntries,
    ...blogPostEntries,
    ...generatedEntries,
  ]);
}
