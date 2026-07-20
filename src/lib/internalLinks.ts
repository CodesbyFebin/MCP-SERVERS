import { GlossaryTerm } from '../data/glossary';

export interface RelatedLink {
  title: string;
  href: string;
}

export function getRelatedLinks(currentSlug: string, type: "pillar" | "topic" | "server"): RelatedLink[] {
  const links: RelatedLink[] = [];

  if (type === "pillar") {
    const relatedPillars = [];
    const { pillars } = require('../data/pillars');
    relatedPillars.push(...pillars.filter(p => p.slug !== currentSlug).slice(0, 3));
    relatedPillars.forEach(p => {
      links.push({ title: p.title, href: `/${p.slug}` });
    });
  } else if (type === "topic") {
    const { topics } = require('../data/topics');
    const currentTopic = topics.find(t => t.slug === currentSlug);
    if (currentTopic) {
      const related = topics.filter(t => t.pillar === currentTopic.pillar && t.slug !== currentSlug).slice(0, 3);
      related.forEach(t => {
        links.push({ title: t.title, href: `/topics/${t.slug}` });
      });
    }
  } else if (type === "server") {
    const { servers } = require('../data/servers');
    const currentServer = servers.find(s => s.slug === currentSlug);
    if (currentServer) {
      const related = servers.filter(s => s.category === currentServer.category && s.slug !== currentSlug).slice(0, 3);
      related.forEach(s => {
        links.push({ title: `${s.name} MCP Server`, href: `/servers/${s.slug}` });
      });
    }
  }

  if (links.length === 0) {
    return [
      { title: "MCP Server Pricing & Cost in India", href: "/mcp-server-pricing-india" },
      { title: "MCP Server Performance & Latency", href: "/mcp-server-performance-latency" },
      { title: "DPDP & Data Compliance", href: "/dppd-data-compliance" }
    ];
  }

  return links;
}
