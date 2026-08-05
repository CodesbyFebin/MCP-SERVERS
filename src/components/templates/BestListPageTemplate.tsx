"use client";

import Link from "next/link";
import { useTheme } from "../ThemeAndAuthProvider";
import ContentFamilyPageTemplate from "../ContentFamilyPageTemplate";
import type { BestListEntity } from "../../data/entities";
import { getUnifiedGraphSchema } from "../../lib/schema";
import { Star, CheckCircle, Info } from "lucide-react";

export interface BestListPageTemplateProps {
  entity: BestListEntity;
  /** Server data for each slug — supplied by the page from the data layer. */
  items: Array<{
    slug: string;
    name: string;
    description: string;
    category: string;
    auth: string;
    features: string[];
  }>;
  faqItems?: { question: string; answer: string }[];
}

export default function BestListPageTemplate({ entity, items, faqItems = [] }: BestListPageTemplateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `${entity.name} in ${entity.year}`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "Best Lists", item: "/best" },
      { name: entity.name, item: entity.route },
    ],
    faq: faqItems,
    itemList: items.map((s) => ({
      name: `${s.name} MCP Server`,
      url: `/servers/${s.slug}/`,
      description: s.description,
    })),
    article: {
      title: `${entity.name} in ${entity.year}`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  const relatedLinks = entity.relatedLists.map((s) => ({
    label: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: `/best/${s}/`,
  }));
  relatedLinks.push({ label: "MCP Server Directory", href: "/servers/" });

  return (
    <ContentFamilyPageTemplate
      h1={`${entity.name} in ${entity.year}`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "Best Lists", href: "/best" },
        { name: entity.name, href: entity.route },
      ]}
      badge="Best List"
      sidebarItems={[
        { label: "Use case", value: entity.useCase },
        { label: "Servers listed", value: String(items.length) },
        { label: "Last updated", value: entity.updatedAt },
      ]}
      relatedLinks={relatedLinks}
      faqs={faqItems}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      schema={schema}
    >
      {/* Methodology */}
      <section id="methodology" className={`p-5 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"}`}>
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <h2 className={`text-sm font-bold ${isDark ? "text-white/80" : "text-slate-800"}`}>Selection Methodology</h2>
        </div>
        <p className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>{entity.methodology}</p>
      </section>

      {/* Ranked list */}
      <section id="ranked-list" className="space-y-4">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          {entity.name}
        </h2>
        <ol className="space-y-4">
          {items.map((server, i) => (
            <li key={server.slug}>
              <Link href={`/servers/${server.slug}/`} className={`block p-5 rounded-2xl border transition-all ${
                isDark
                  ? "bg-white/[0.02] border-white/5 hover:border-cyan-500/30"
                  : "bg-white border-slate-200 hover:border-cyan-300 shadow-sm hover:shadow"
              }`}>
                <div className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    i === 0
                      ? "bg-amber-400 text-black"
                      : isDark ? "bg-white/10 text-white/60" : "bg-slate-100 text-slate-500"
                  }`}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                        {server.name} MCP Server
                      </span>
                      {i === 0 && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isDark ? "bg-amber-500/20 text-amber-300" : "bg-amber-100 text-amber-700"}`}>
                          ★ Top Pick
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isDark ? "text-white/55" : "text-slate-500"}`}>
                      {server.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {server.features.slice(0, 3).map((f, j) => (
                        <span key={j} className={`px-2 py-0.5 rounded-full text-[10px] border ${isDark ? "border-white/10 text-white/50" : "border-slate-200 text-slate-500"}`}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* How to choose */}
      <section id="how-to-choose" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          How to Choose
        </h2>
        <div className="space-y-2">
          {[
            `Choose the top-ranked server when you need a well-maintained, documented option for ${entity.useCase.toLowerCase()}.`,
            "Consider your security requirements — prefer servers with read-only modes and explicit permission scopes.",
            "Check the transport: use stdio for local integrations, Streamable HTTP for remote/multi-user deployments.",
            "Evaluate maintenance status — archived or unmaintained servers should not be used in production.",
          ].map((tip, i) => (
            <div key={i} className={`flex items-start gap-2 p-3 rounded-lg text-xs ${isDark ? "bg-white/[0.01] border border-white/5" : "bg-white border border-slate-200"}`}>
              <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
              <span className={isDark ? "text-white/70" : "text-slate-600"}>{tip}</span>
            </div>
          ))}
        </div>
      </section>
    </ContentFamilyPageTemplate>
  );
}
