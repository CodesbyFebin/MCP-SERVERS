import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import DocsSearch from "../../src/components/DocsSearch";
import { docsClusters, docsPages, getDocsPath } from "../../src/data/docs";
import { ArrowRight, BookOpen, FileText, Search, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Server Documentation India - MCPserver.in",
  description: "Explore India-first MCP docs for setup, pricing, compliance, deployment, performance, monitoring, and glossary topics.",
  alternates: {
    canonical: "https://www.mcpserver.in/docs/",
    languages: {
    "en-IN": "/https://www.mcpserver.in/docs/",
    "en": "/https://www.mcpserver.in/docs/",
  },
  },
};

export default function Docs() {
  const priorityGuides = [
    "/docs/pricing/india-pricing-comparison",
    "/docs/performance/latency-benchmarks-india",
    "/docs/compliance/dpdp-compliance-guide",
    "/docs/comparisons/mcp-vs-rest-2026",
    "/docs/deployment/railway-deployment",
  ];

  const guideLookup = new Map(docsPages.map((page) => [getDocsPath(page), page]));
  const searchItems = docsPages.map((page) => ({
    title: page.title,
    description: page.description,
    category: page.category,
    href: getDocsPath(page),
  }));
  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.mcpserver.in/docs/#collection",
    name: "MCP Server Documentation India",
    description: metadata.description,
    url: "https://www.mcpserver.in/docs/",
    hasPart: docsPages.map((page) => ({
      "@type": "TechArticle",
      name: page.title,
      url: `https://www.mcpserver.in${getDocsPath(page)}/`,
      about: page.targetKeywords,
    })),
  };

  return (
    <div id="docs-page" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <SchemaJsonLd schema={hubSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Documentation", href: "/docs" }]} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 sm:py-14 border-b border-white/10">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              <BookOpen className="h-3.5 w-3.5" />
              India-first MCP knowledge base
            </span>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                MCP Server Documentation for Builders in India
              </h1>
              <p className="max-w-3xl text-sm sm:text-base leading-7 text-slate-300">
                Practical guides for Model Context Protocol setup, pricing, low-latency hosting, DPDP-aware compliance, deployments, monitoring, and industry workflows.
              </p>
            </div>
            <div className="max-w-xl">
              <DocsSearch items={searchItems} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ["50+", "clustered docs paths"],
                ["3+", "internal links per guide"],
                ["India", "pricing and compliance context"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-xs text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-white/10 bg-[#07101d] p-5 shadow-2xl shadow-purple-950/20">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
              <Search className="h-4 w-4 text-cyan-300" />
              Priority Guides
            </div>
            <div className="space-y-3">
              {priorityGuides.map((href) => {
                const guide = guideLookup.get(href);
                if (!guide) return null;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="group block rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-bold text-white group-hover:text-cyan-200">{guide.title}</h2>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{guide.description}</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-500 group-hover:text-cyan-300" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">Documentation Clusters</h2>
              <p className="mt-1 text-sm text-slate-400">Browse by topic, then follow related guides through the semantic graph.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {docsClusters.map((cluster) => (
              <div key={cluster.slug} className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10">
                    {cluster.slug === "compliance" ? (
                      <ShieldCheck className="h-4 w-4 text-cyan-300" />
                    ) : cluster.slug === "performance" ? (
                      <Zap className="h-4 w-4 text-cyan-300" />
                    ) : (
                      <FileText className="h-4 w-4 text-cyan-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{cluster.title}</h3>
                    <p className="text-xs text-slate-500">{cluster.links.length} guides</p>
                  </div>
                </div>

                <p className="mb-4 text-xs leading-5 text-slate-400">{cluster.description}</p>
                <div className="space-y-2">
                  {cluster.links.slice(0, 5).map((href) => {
                    const page = guideLookup.get(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center justify-between rounded-md border border-white/5 bg-black/20 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
                      >
                        <span>{page?.title || href.replace("/docs/", "")}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

