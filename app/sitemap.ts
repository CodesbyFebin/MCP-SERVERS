import { MetadataRoute } from "next";
import { pillars } from "../src/data/pillars";
import { topics } from "../src/data/topics";
import { servers } from "../src/data/servers";
import { glossaryTerms } from "../src/data/glossary";
import { comparisons } from "../src/data/comparisons";
import { categories } from "../src/data/categories";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mcpserver.in";
  const today = new Date();

  // Static site pages (indexable)
  const staticPaths = [
    { url: "", changeFrequency: "daily" as const, priority: 1.0 },
    { url: "/mcp-server-directory", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/mcp-monitoring", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/status", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/glossary", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "/pricing", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/docs", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/security", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/privacy", changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "/terms", changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "/sitemap", changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  const staticEntries = staticPaths.map((p) => ({
    url: `${baseUrl}${p.url}/`,
    lastModified: today,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Pillars
  const pillarEntries = pillars.map((p) => ({
    url: `${baseUrl}/${p.slug}/`,
    lastModified: today,
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

  // Glossary Detail pages
  const glossaryEntries = glossaryTerms.map((g) => ({
    url: `${baseUrl}/glossary/${g.slug}/`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Technical comparisons
  const comparisonEntries = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}/`,
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

  return [
    ...staticEntries,
    ...pillarEntries,
    ...topicEntries,
    ...serverEntries,
    ...glossaryEntries,
    ...comparisonEntries,
    ...categoryEntries,
    ...toolEntries,
  ];
}
