import type { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms } from "../../src/data/entities";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Glossary — Model Context Protocol Terms Defined",
  description: "Definitions for every Model Context Protocol term: MCP server, MCP client, MCP host, stdio, Streamable HTTP, tools, resources, and prompts.",
  alternates: { canonical: "https://www.mcpserver.in/glossary/" },
};

export default function GlossaryIndexPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/glossary/",
    title: "MCP Glossary",
    description: "Definitions for every Model Context Protocol term.",
    breadcrumbs: [{ name: "Glossary", item: "/glossary" }],
    itemList: glossaryTerms.map((e) => ({
      name: e.term,
      url: e.route,
      description: e.shortDefinition,
    })),
  });

  // Group terms alphabetically
  const grouped: Record<string, typeof glossaryTerms> = {};
  for (const term of glossaryTerms) {
    const letter = term.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(term);
  }
  const sortedLetters = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen py-6 pb-20 bg-[#050508] text-white">
      <SchemaJsonLd schema={schema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Glossary", href: "/glossary" }]} />
        <header className="py-8 border-b border-white/5">
          <h1 className="text-4xl font-display font-bold text-white">MCP Glossary</h1>
          <p className="mt-3 text-white/60 max-w-2xl text-sm">
            Definitions for every Model Context Protocol term: servers, clients, hosts, transports, primitives, and protocol concepts.
          </p>
        </header>
        <div className="mt-10 space-y-8">
          {sortedLetters.map((letter) => (
            <section key={letter}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3 border-b border-white/5 pb-1">{letter}</h2>
              <div className="space-y-3">
                {grouped[letter].map((e) => (
                  <Link key={e.id} href={e.route} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 transition-all">
                    <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-white">{e.term}</span>
                      <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{e.shortDefinition}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
