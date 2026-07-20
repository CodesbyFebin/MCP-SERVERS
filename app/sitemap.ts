import { MetadataRoute } from "next";
import { pillars } from "../src/data/pillars";
import { topics } from "../src/data/topics";
import { servers } from "../src/data/servers";
import { glossaryTerms } from "../src/data/glossary";
import { comparisons } from "../src/data/comparisons";
import { categories } from "../src/data/categories";
import { docsPages, getDocsPath } from "../src/data/docs";
import { blogPosts, clusters } from "../src/data/blogPosts";

export const dynamic = "force-static";

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.mcpserver.in").replace(/\/$/, "");

const popularComparisonSlugs = [
  "github-mcp-server-vs-gitlab-mcp-server",
  "postgres-mcp-server-vs-sqlite-mcp-server",
  "slack-mcp-server-vs-discord-mcp-server",
  "github-mcp-server-vs-postgres-mcp-server",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  // Static site pages (indexable)
  const staticPaths = [
    { url: "", changeFrequency: "daily" as const, priority: 1.0 },
    { url: "/complete-guide-mcp-servers", changeFrequency: "weekly" as const, priority: 0.95 },
    { url: "/servers", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/categories", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/mcp-server-directory", changeFrequency: "daily" as const, priority: 0.9 },
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
  ];

  const staticEntries = staticPaths.map((p) => ({
    url: `${baseUrl}${p.url}/`,
    lastModified: today,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Pillars (includes timestamps if available)
  const pillarEntries = pillars.map((p) => ({
    url: `${baseUrl}/${p.slug}/`,
    lastModified: (p as any).updatedAt || (p as any).publishedAt || today,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Topics
  const topicEntries = topics.map((t) => ({
    url: `${baseUrl}/topics/${t.slug}/`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Servers
  const serverEntries = servers.map((s) => ({
    url: `${baseUrl}/servers/${s.slug}/`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Glossary Detail pages (includes timestamps if available)
  const glossaryEntries = glossaryTerms.map((g) => ({
    url: `${baseUrl}/glossary/${g.slug}/`,
    lastModified: (g as any).updatedAt || (g as any).publishedAt || today,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Technical comparisons
  const comparisonSlugs = [
    ...comparisons.map((c) => c.slug),
    ...popularComparisonSlugs,
  ];

  const comparisonEntries = comparisonSlugs.map((slug) => ({
    url: `${baseUrl}/compare/${slug}/`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Directory Categories
  const categoryEntries = categories.map((c) => ({
    url: `${baseUrl}/directory/${c.slug}/`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Documentation knowledge base
  const docsEntries = docsPages.map((doc) => ({
    url: `${baseUrl}${getDocsPath(doc)}/`,
    lastModified: today,
    changeFrequency: doc.changefreq,
    priority: doc.priority,
  }));

  // Developer Tools
  const toolSlugs = [
    "mcp-playground",
    "mcp-server-checker",
    "mcp-schema-viewer",
    "mcp-config-validator",
    "mcp-endpoint-tester",
  ];
  const toolEntries = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}/`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog clusters
  const clusterEntries = clusters.map((cluster) => ({
    url: `${baseUrl}/blog/cluster/${cluster.slug}/`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog posts (includes timestamps if available)
  const blogPostEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: (post as any).updatedAt || (post as any).publishedAt || new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
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
  ];
}
