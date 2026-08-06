import type { Metadata } from "next";
import Link from "next/link";
import { deploymentGuides } from "../../src/data/entities";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import { Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Server Deployment Guides",
  description: "Deploy MCP servers on Docker, Kubernetes, Vercel, Cloudflare Workers, AWS, and more. Platform-specific guides with configuration examples.",
  alternates: { canonical: "https://www.mcpserver.in/deployment/" },
};

const DIFFICULTY_CLS: Record<string, string> = {
  beginner: "bg-emerald-950/20 text-emerald-400 border-emerald-900/30",
  intermediate: "bg-amber-950/20 text-amber-400 border-amber-900/30",
  advanced: "bg-red-950/20 text-red-400 border-red-900/30",
};

export default function DeploymentIndexPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/deployment/",
    title: "MCP Server Deployment Guides",
    description: "Platform-specific MCP server deployment guides.",
    breadcrumbs: [{ name: "Deployment", item: "/deployment" }],
    itemList: deploymentGuides.map((e) => ({
      name: `Deploy MCP Server on ${e.platform}`,
      url: e.route,
      description: e.metaDescription,
    })),
  });

  return (
    <div className="min-h-screen py-6 pb-20 bg-[#050508] text-white">
      <SchemaJsonLd schema={schema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Deployment", href: "/deployment" }]} />
        <header className="py-8 border-b border-white/5">
          <h1 className="text-4xl font-display font-bold text-white">MCP Server Deployment Guides</h1>
          <p className="mt-3 text-white/60 max-w-2xl text-sm">
            Step-by-step guides for deploying MCP servers on Docker, Kubernetes, Vercel, Cloudflare, AWS, and more.
          </p>
        </header>
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {deploymentGuides.map((e) => {
            const diffCls = DIFFICULTY_CLS[e.difficultyLevel] ?? DIFFICULTY_CLS.intermediate;
            return (
              <Link key={e.id} href={e.route} className="block p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="w-4 h-4 text-cyan-400" />
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${diffCls}`}>{e.difficultyLevel}</span>
                  {e.freeTierAvailable && <span className="ml-auto text-[10px] text-emerald-400">Free tier</span>}
                </div>
                <div className="text-sm font-bold text-white">{e.platform}</div>
                <p className="text-xs text-white/55 mt-1 leading-relaxed line-clamp-2">{e.metaDescription}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {e.supportedTransports.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] border border-white/10 text-white/40">{t}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
}
