import type { Metadata } from "next";
import Link from "next/link";
import { Search, Server, ShieldCheck, Zap } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import ServerCard from "../../src/components/ServerCard";
import { categories } from "../../src/data/categories";
import { servers } from "../../src/data/servers";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCP Servers Directory - Curated Model Context Protocol Integrations",
  description:
    "Browse verified Model Context Protocol servers by category, authentication model, and production use case. Deploy MCP integrations on India-first edge infrastructure.",
  alternates: {
    canonical: "/servers",
  },
};

export default function ServersPage() {
  const featuredServers = servers.slice(0, 24);
  const schema = getUnifiedGraphSchema({
    pageUrl: "/servers",
    title: "MCP Servers Directory",
    description: "Browse verified Model Context Protocol servers by category, authentication model, and production use case.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Servers", item: "/servers" }
    ],
    softwareApplication: {
      name: "MCPserver.in Server Directory",
      description: "Directory and deployment surface for production-ready Model Context Protocol integrations."
    }
  });

  return (
    <div id="servers-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={schema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Servers", href: "/servers" }]} />

        <section className="py-10">
          <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200">
                <Server className="h-3.5 w-3.5" />
                Public MCP Server Directory
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Discover production-ready MCP servers.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
                Search verified connectors for developer tools, databases, SaaS platforms, finance workflows, and agent automation. Each listing includes setup guidance, auth notes, use cases, and secure deployment paths.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center overflow-hidden rounded-lg border border-white/10 bg-white">
                <Search className="ml-4 h-4 w-4 text-slate-500" />
                <input
                  className="min-h-12 min-w-0 flex-1 px-3 text-sm text-slate-800 outline-none"
                  placeholder="Search GitHub, Postgres, Slack, Razorpay..."
                />
                <button className="m-1 rounded-md bg-violet-600 px-4 text-xs font-black text-white">Search</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/directory/${category.slug}`}
                    className="rounded-md border border-white/8 bg-white/[0.04] px-2.5 py-1 font-semibold text-white/65 hover:border-cyan-300/30 hover:text-cyan-200"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Curated", "MCP server directory", Server],
              ["Low", "Edge latency", Zap],
              ["Zero-trust", "Credential isolation", ShieldCheck],
            ].map(([value, label, Icon]) => (
              <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <Icon className="h-5 w-5 text-cyan-300" />
                <div className="mt-3 text-2xl font-black text-white">{value as string}</div>
                <div className="text-xs text-white/50">{label as string}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/6 pt-10">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-white">Featured integrations</h2>
              <p className="mt-1 text-xs text-white/45">A curated slice of the active registry. Use category pages for deeper browsing.</p>
            </div>
            <Link href="/mcp-server-directory" className="text-xs font-bold text-cyan-300 hover:text-cyan-200">
              Open advanced directory -&gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredServers.map((server) => (
              <ServerCard key={server.slug} server={server} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
