import { MetadataRoute } from "next";
import { pillars } from "../src/data/pillars";
import { topics } from "../src/data/topics";
import { publishedServers } from "../src/data/publishing";
import { glossaryTerms } from "../src/data/glossary";
import { comparisons } from "../src/data/comparisons";
import { categories } from "../src/data/categories";
import { docsPages, getDocsPath } from "../src/data/docs";
import { blogPosts, clusters } from "../src/data/blogPosts";
import { isLowValueGlossarySlug } from "../src/lib/glossarySeo";
import { phaseAApprovedRoutes } from "../src/data/phase-a-authority.generated";

export const dynamic = "force-static";

const canonicalHost = "https://www.mcpserver.in";
const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || canonicalHost)
  .replace(/^http:\/\/(?:www\.)?mcpserver\.in/i, canonicalHost)
  .replace(/^https:\/\/mcpserver\.in/i, canonicalHost)
  .replace(/\/$/, "");

const popularComparisonSlugs = [
  "github-mcp-server-vs-gitlab-mcp-server",
  "postgres-mcp-server-vs-sqlite-mcp-server",
  "slack-mcp-server-vs-discord-mcp-server",
  "github-mcp-server-vs-postgres-mcp-server",
];
const redirectedBlogSlugs = new Set(["how-to-build-mcp-server-from-scratch"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  // Static site pages (indexable)
  const staticPaths = [
    { url: "", changeFrequency: "daily" as const, priority: 1.0 },
    { url: "/complete-guide-mcp-servers", changeFrequency: "weekly" as const, priority: 0.95 },
    { url: "/how-to-build-mcp-server", changeFrequency: "weekly" as const, priority: 0.95 },
    { url: "/mcp-server-hosting", changeFrequency: "weekly" as const, priority: 0.95 },
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
    { url: "/hi", changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "/compliance/matrix", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/authors", changeFrequency: "weekly" as const, priority: 0.6 },
    { url: "/community", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "/editorial-policy", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "/what-is-mcp", changeFrequency: "weekly" as const, priority: 0.9 },
    // Indexable pages that are not produced by any of the generated blocks
    // below and were previously orphaned from the sitemap while still
    // returning 200 with `index, follow`.
    // /glossary/mcp-host/ is served from content/pages (via a rewrite) rather
    // than src/data/glossary.ts, so the glossary block does not emit it.
    { url: "/glossary/mcp-host", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/best/best-mcp-servers-for-databases", changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const staticEntries = staticPaths.map((p) => {
    const mod = p.url === "/" ? undefined : today;
    return {
      url: `${baseUrl}${p.url}/`,
      ...(mod ? { lastModified: mod } : {}),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    };
  });

  const redirectedPillarSlugs = new Set(["mcp-hosting", "mcp-tutorial"]);
  const pillarEntries = pillars.filter((p) => !redirectedPillarSlugs.has(p.slug)).map((p) => {
    const mod = (p as any).updatedAt || (p as any).publishedAt;
    return {
      url: `${baseUrl}/${p.slug}/`,
      ...(mod ? { lastModified: mod } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    };
  });

  const topicEntries = topics.map((t) => ({
    url: `${baseUrl}/topics/${t.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const serverEntries = publishedServers.map((s) => ({
    url: `${baseUrl}/servers/${s.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const glossaryEntries = glossaryTerms.filter((g) => !isLowValueGlossarySlug(g.slug)).map((g) => {
    const mod = (g as any).updatedAt || (g as any).publishedAt;
    return {
      url: `${baseUrl}/glossary/${g.slug}/`,
      ...(mod ? { lastModified: mod } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  const comparisonSlugs = [
    ...comparisons.map((c) => c.slug),
    ...popularComparisonSlugs,
  ];

  const comparisonEntries = comparisonSlugs.map((slug) => ({
    url: `${baseUrl}/compare/${slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryEntries = categories.map((c) => ({
    url: `${baseUrl}/directory/${c.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const docsEntries = docsPages.map((doc) => ({
    url: `${baseUrl}${getDocsPath(doc)}/`,
    changeFrequency: doc.changefreq,
    priority: doc.priority,
  }));

  const toolSlugs = [
    "mcp-playground",
    "mcp-server-checker",
    "mcp-schema-viewer",
    "mcp-config-validator",
    "mcp-endpoint-tester",
    "mcp-sdk-workbench",
    "mcp-benchmark",
    "server-selector",
  ];
  const toolEntries = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const clusterEntries = clusters.map((cluster) => ({
    url: `${baseUrl}/blog/cluster/${cluster.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPostEntries = blogPosts.filter((post) => !redirectedBlogSlugs.has(post.slug)).map((post) => {
    const mod = (post as any).updatedAt || (post as any).publishedAt || new Date(post.date);
    return {
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: mod,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  const existingUrls = new Set([
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
  ].map((entry) => entry.url));

  const phaseAEntries = phaseAApprovedRoutes
    .map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    }))
    .filter((entry) => !existingUrls.has(entry.url));

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
    ...phaseAEntries,
  ];
}
