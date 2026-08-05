import type { Metadata } from "next";
import Link from "next/link";
import { integrations } from "../../src/data/entities";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCP Server Integration Guides",
  description: "Step-by-step integration guides for connecting GitHub, Slack, PostgreSQL, AWS, Notion, and 1,000+ platforms to AI clients using MCP servers.",
  alternates: { canonical: "https://www.mcpserver.in/integrations/" },
};

const schema = getUnifiedGraphSchema({
  pageUrl: "/integrations/",
  title: "MCP Server Integration Guides",
  description: "Step-by-step integration guides for connecting every major platform to AI clients via Model Context Protocol servers.",
  breadcrumbs: [{ name: "Integrations", item: "/integrations" }],
  itemList: integrations.map((e) => ({
    name: `${e.name} MCP Server`,
    url: e.route,
    description: e.metaDescription,
  })),
});

export default function IntegrationsIndexPage() {
  const published = integrations.filter((e) => e.status === "published");
  const candidates = integrations.filter((e) => e.status === "candidate");

  return (
    <div className="min-h-screen py-6 pb-20 bg-[#050508] text-white">
      <SchemaJsonLd schema={schema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Integrations", href: "/integrations" }]} />

        <header className="py-8 border-b border-white/5">
          <h1 className="text-4xl font-display font-bold text-white">MCP Server Integration Guides</h1>
          <p className="mt-3 text-white/60 max-w-2xl text-sm leading-relaxed">
            Step-by-step guides for connecting GitHub, Slack, PostgreSQL, AWS, and every major platform to AI clients using Model Context Protocol servers.
          </p>
        </header>

        {published.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-white mb-4">Published Guides ({published.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {published.map((e) => (
                <Link key={e.id} href={e.route} className="block p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 transition-all">
                  <div className="text-xs text-cyan-400 font-semibold mb-1">{e.platformCategory}</div>
                  <div className="text-sm font-bold text-white">{e.name} MCP Server</div>
                  <p className="text-xs text-white/55 mt-1 leading-relaxed line-clamp-2">{e.metaDescription}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {e.transports.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[10px] border border-white/10 text-white/40">{t}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {candidates.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-white mb-4">Coming Soon ({candidates.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {candidates.map((e) => (
                <div key={e.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] opacity-60">
                  <div className="text-xs font-semibold text-white/60">{e.name}</div>
                  <div className="text-[10px] text-white/30 mt-0.5">In progress</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
