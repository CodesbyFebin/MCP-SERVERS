"use client";

import Link from "next/link";
import { useTheme } from "../ThemeAndAuthProvider";
import ContentFamilyPageTemplate from "../ContentFamilyPageTemplate";
import type { GlossaryEntity } from "../../data/entities";
import { getUnifiedGraphSchema } from "../../lib/schema";
import { BookOpen, Hash } from "lucide-react";

export interface GlossaryPageTemplateProps {
  entity: GlossaryEntity;
  faqItems?: { question: string; answer: string }[];
}

export default function GlossaryPageTemplate({ entity, faqItems = [] }: GlossaryPageTemplateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `https://www.mcpserver.in${entity.route}#term`,
        "name": entity.term,
        "description": entity.fullDefinition,
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": "MCP Glossary",
          "url": "https://www.mcpserver.in/glossary/",
        },
      },
      {
        "@type": "WebPage",
        "@id": `https://www.mcpserver.in${entity.route}#webpage`,
        "url": `https://www.mcpserver.in${entity.route}`,
        "name": `What Is ${entity.term}?`,
        "description": entity.metaDescription,
        "about": { "@id": `https://www.mcpserver.in${entity.route}#term` },
      },
    ],
  };

  const relatedLinks = entity.relatedTerms.map((t) => ({
    label: `What Is ${t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}?`,
    href: `/glossary/${t}/`,
  }));

  return (
    <ContentFamilyPageTemplate
      h1={`What Is ${entity.term}?`}
      answerBlock={entity.shortDefinition}
      breadcrumbs={[
        { name: "Glossary", href: "/glossary" },
        { name: entity.term, href: entity.route },
      ]}
      badge="Glossary"
      relatedLinks={relatedLinks}
      faqs={faqItems}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      citations={[{ label: "Model Context Protocol Specification", url: "https://modelcontextprotocol.io/specification" }]}
      schema={schema}
    >
      {/* Definition block — AEO/GEO optimised */}
      <section id="definition" className={`p-6 rounded-2xl border ${isDark ? "bg-cyan-950/10 border-cyan-900/20" : "bg-cyan-50 border-cyan-100"}`}>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className={`w-4 h-4 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} />
          <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-cyan-400" : "text-cyan-700"}`}>Definition</span>
        </div>
        <p className={`text-base font-medium leading-relaxed ${isDark ? "text-white" : "text-slate-900"}`}>
          {entity.fullDefinition}
        </p>
        {entity.aliases.length > 0 && (
          <p className={`mt-3 text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
            Also known as: {entity.aliases.join(", ")}
          </p>
        )}
        {entity.protocolSection && (
          <p className={`mt-1 text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Protocol section: {entity.protocolSection}
          </p>
        )}
      </section>

      {/* Role in MCP */}
      <section id="role" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Role in MCP
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
          The {entity.term} is a core concept in the{" "}
          <Link href="/mcp-architecture/" className="text-cyan-500 hover:underline">MCP architecture</Link>.
          Understanding it is essential for{" "}
          <Link href="/tutorials/" className="text-cyan-500 hover:underline">building MCP servers</Link>{" "}
          and configuring{" "}
          <Link href="/clients/" className="text-cyan-500 hover:underline">MCP clients</Link>.
        </p>
      </section>

      {/* Related terms */}
      {entity.relatedTerms.length > 0 && (
        <section id="related-terms" className="space-y-3">
          <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            Related Terms
          </h2>
          <div className="flex flex-wrap gap-2">
            {entity.relatedTerms.map((t, i) => (
              <Link
                key={i}
                href={`/glossary/${t}/`}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  isDark
                    ? "bg-white/[0.03] border-white/10 text-white/70 hover:border-cyan-500/50 hover:text-cyan-400"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                }`}
              >
                <Hash className="w-3 h-3" />
                {t.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </section>
      )}
    </ContentFamilyPageTemplate>
  );
}
