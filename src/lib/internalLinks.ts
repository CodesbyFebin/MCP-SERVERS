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

/**
 * Safely injects internal links from glossary terms into HTML content.
 * Uses a DOM parser to avoid regex injection into <pre>/<code> blocks.
 * Performs longest-match-first to prevent overlapping replacements.
 */
export function injectInternalLinks(html: string, glossary: GlossaryTerm[]): string {
  if (!html || !glossary || glossary.length === 0) return html;

  const termMap = new Map<string, string>();
  for (const term of glossary) {
    const lower = term.term.toLowerCase();
    termMap.set(lower, term.slug);
    if (term.technicalDetails?.alias) {
      for (const alias of term.technicalDetails.alias) {
        termMap.set(alias.toLowerCase(), term.slug);
      }
    }
  }

  const sortedTerms = Array.from(termMap.keys()).sort((a, b) => b.length - a.length);

  const $ = require('cheerio').load(html, { decodeEntities: false });

  $('body *')
    .contents()
    .each(function (this: any, i: number, el: any) {
      if (el.type !== 'text') return;

      const text = el.data;
      if (!text || text.trim().length === 0) return;

      const parent = $(el.parent);
      if (parent.is('a, code, pre, script, style, h1, h2, h3, h4, h5, h6')) return;

      let modifiedText = text;
      let changed = false;

      for (const term of sortedTerms) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        if (regex.test(modifiedText)) {
          const slug = termMap.get(term);
          if (slug) {
            modifiedText = modifiedText.replace(regex, (match: string) => {
              const link = `<a href="/glossary/${slug}" class="glossary-link">${match}</a>`;
              changed = true;
              return link;
            });
          }
        }
      }

      if (changed) {
        $(el).replaceWith(modifiedText);
      }
    });

  return $.html();
}