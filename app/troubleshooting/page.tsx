import type { Metadata } from "next";
import Link from "next/link";
import { troubleshootingGuides } from "../../src/data/entities";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Server Troubleshooting Guides",
  description: "Diagnose and fix MCP server connection failures, tool visibility problems, authentication errors, and timeout issues.",
  alternates: { canonical: "https://www.mcpserver.in/troubleshooting/" },
};

export default function TroubleshootingIndexPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/troubleshooting/",
    title: "MCP Server Troubleshooting Guides",
    description: "Diagnose and fix common MCP server errors.",
    breadcrumbs: [{ name: "Troubleshooting", item: "/troubleshooting" }],
    itemList: troubleshootingGuides.map((e) => ({
      name: e.errorTitle,
      url: e.route,
      description: e.metaDescription,
    })),
  });

  return (
    <div className="min-h-screen py-6 pb-20 bg-[#050508] text-white">
      <SchemaJsonLd schema={schema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Troubleshooting", href: "/troubleshooting" }]} />
        <header className="py-8 border-b border-white/5">
          <h1 className="text-4xl font-display font-bold text-white">MCP Server Troubleshooting</h1>
          <p className="mt-3 text-white/60 max-w-2xl text-sm">
            Step-by-step diagnosis for common MCP server errors, connection failures, and client configuration issues.
          </p>
        </header>
        <section className="mt-10 space-y-3">
          {troubleshootingGuides.map((e) => (
            <Link key={e.id} href={e.route} className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-amber-500/30 transition-all">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">{e.errorTitle}</div>
                <p className="text-xs text-white/55 mt-1 leading-relaxed">{e.metaDescription}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {e.affectedClients.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-full text-[10px] border border-white/10 text-white/40">{c}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
