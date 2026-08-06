import type { Metadata } from "next";
import Link from "next/link";
import { sdks } from "../../src/data/entities";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCP SDK Developer Guides",
  description: "Complete developer guides for every MCP SDK: TypeScript, Python, Java, Go, Rust, Kotlin, Swift, and more.",
  alternates: { canonical: "https://www.mcpserver.in/sdk/" },
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "text-blue-400 border-blue-900/30 bg-blue-950/20",
  Python: "text-yellow-400 border-yellow-900/30 bg-yellow-950/20",
  Java: "text-orange-400 border-orange-900/30 bg-orange-950/20",
  Go: "text-cyan-400 border-cyan-900/30 bg-cyan-950/20",
  Rust: "text-red-400 border-red-900/30 bg-red-950/20",
};

export default function SdkIndexPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/sdk/",
    title: "MCP SDK Developer Guides",
    description: "Complete guides for every official MCP SDK.",
    breadcrumbs: [{ name: "SDK Guides", item: "/sdk" }],
    itemList: sdks.map((e) => ({
      name: e.name,
      url: e.route,
      description: e.metaDescription,
    })),
  });

  const published = sdks.filter((e) => e.status === "published");
  const candidates = sdks.filter((e) => e.status !== "published");

  return (
    <div className="min-h-screen py-6 pb-20 bg-[#050508] text-white">
      <SchemaJsonLd schema={schema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "SDK Guides", href: "/sdk" }]} />
        <header className="py-8 border-b border-white/5">
          <h1 className="text-4xl font-display font-bold text-white">MCP SDK Developer Guides</h1>
          <p className="mt-3 text-white/60 max-w-2xl text-sm leading-relaxed">
            Complete developer guides for building MCP servers in TypeScript, Python, Java, Go, Rust, and more.
          </p>
        </header>
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {published.map((e) => {
            const colorCls = LANG_COLORS[e.language] ?? "text-white/60 border-white/10 bg-white/[0.02]";
            return (
              <Link key={e.id} href={e.route} className="block p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 transition-all">
                <div className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${colorCls} mb-2`}>{e.language}</div>
                <div className="text-sm font-bold text-white">{e.name}</div>
                <p className="text-xs text-white/55 mt-1 leading-relaxed line-clamp-2">{e.metaDescription}</p>
                <code className="text-[10px] font-mono text-white/30 mt-2 block">{e.installCommand}</code>
              </Link>
            );
          })}
          {candidates.map((e) => (
            <div key={e.id} className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] opacity-50">
              <div className="text-sm font-bold text-white/60">{e.language} SDK</div>
              <div className="text-[10px] text-white/30 mt-1">Guide coming soon</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
