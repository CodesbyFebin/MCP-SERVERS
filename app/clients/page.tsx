import type { Metadata } from "next";
import Link from "next/link";
import { clients } from "../../src/data/entities";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import { Monitor, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Client Configuration Guides",
  description: "Setup and configuration guides for every MCP-compatible AI client: Claude Desktop, Cursor, VS Code, Claude Code, and more.",
  alternates: { canonical: "https://www.mcpserver.in/clients/" },
};

const CLIENT_TYPE_LABELS: Record<string, string> = {
  "desktop-app": "Desktop App",
  "ide": "IDE / Editor",
  "cli": "CLI Tool",
  "web-app": "Web App",
  "framework": "AI Framework",
};

export default function ClientsIndexPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/clients/",
    title: "MCP Client Configuration Guides",
    description: "Setup and configuration guides for every MCP-compatible AI client.",
    breadcrumbs: [{ name: "Clients", item: "/clients" }],
    itemList: clients.map((e) => ({
      name: e.name,
      url: e.route,
      description: e.metaDescription,
    })),
  });

  return (
    <div className="min-h-screen py-6 pb-20 bg-[#050508] text-white">
      <SchemaJsonLd schema={schema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "AI Clients", href: "/clients" }]} />
        <header className="py-8 border-b border-white/5">
          <h1 className="text-4xl font-display font-bold text-white">MCP Client Configuration Guides</h1>
          <p className="mt-3 text-white/60 max-w-2xl text-sm leading-relaxed">
            Configure MCP servers in Claude Desktop, Cursor, VS Code, and every other MCP-compatible AI client.
          </p>
        </header>
        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clients.map((e) => (
              <Link key={e.id} href={e.route} className="block p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white/40">{CLIENT_TYPE_LABELS[e.clientType] ?? e.clientType}</span>
                  <span className="ml-auto text-[10px] text-white/30">{e.vendor}</span>
                </div>
                <div className="text-sm font-bold text-white">{e.name}</div>
                <p className="text-xs text-white/55 mt-1 leading-relaxed line-clamp-2">{e.metaDescription}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {e.mcpFeatures.slice(0, 3).map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-full text-[10px] border border-white/10 text-white/40">{f}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
