import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCPserver.in Blog - MCP Infrastructure, Security and India AI Agents",
  description:
    "Read MCPserver.in updates, technical guides, and India-first AI infrastructure articles on MCP latency, DPDP, security, and hosted servers.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  ["MCP p99 latency in India: why Mumbai and Bengaluru edge routing matters", "Performance", "2026-07-19"],
  ["DPDP-compliant LLM tools: audit logging patterns for MCP servers", "Compliance", "2026-07-19"],
  ["How to evaluate MCP server security before connecting an AI agent", "Security", "2026-07-19"],
  ["From REST API to MCP connector: a practical migration path", "Developer", "2026-07-19"],
  ["The India-first MCP stack for fintech and SaaS teams", "India", "2026-07-19"],
  ["What enterprise buyers should ask before adopting hosted MCP", "Enterprise", "2026-07-19"],
];

export default function BlogPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/blog",
    title: "MCPserver.in Blog",
    description: "Read MCPserver.in updates, technical guides, and India-first AI infrastructure articles on MCP latency, DPDP, security, and hosted servers.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" }
    ],
    article: {
      title: "MCPserver.in Blog",
      description: "Technical content hub for MCP infrastructure, security, latency, and hosted server operations.",
      authorName: "MCPserver.in Engineering",
      datePublished: "2026-07-19",
      dateModified: "2026-07-19"
    }
  });

  return (
    <div id="blog-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={schema} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />

        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200">
            <Newspaper className="h-3.5 w-3.5" />
            Technical content hub
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">MCP infrastructure notes</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            Product updates, deep technical guides, and India-first operating lessons for teams deploying Model Context Protocol servers.
          </p>
        </section>

        <section className="grid gap-4">
          {posts.map(([title, category, date]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-white/45">
                <span className="rounded-md bg-violet-500/15 px-2 py-1 text-violet-200">{category}</span>
                <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {date}</span>
              </div>
              <h2 className="mt-4 text-lg font-black text-white">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Draft article queued from the 90-day GTM roadmap. Publish with benchmark screenshots, code snippets, and implementation checklists.
              </p>
              <Link href="/docs" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-300">
                Read related docs <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
