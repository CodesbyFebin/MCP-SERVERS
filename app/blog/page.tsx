import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper, Filter } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import { computeReadTime } from "../../src/lib/readTime";
import { blogPosts, clusters } from "../../src/data/blogPosts";

export const metadata: Metadata = {
  title: "MCPserver.in Blog - MCP Infrastructure, Security and India AI Agents",
  description:
    "Read MCPserver.in updates, technical guides, and India-first AI infrastructure articles on MCP latency, DPDP, security, and hosted servers.",
  alternates: {
    canonical: "/blog",
  },
};

const postsByCluster = clusters.map(cluster => ({
  ...cluster,
  posts: blogPosts.filter(p => p.cluster === cluster.slug)
}));

export default function BlogPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/blog",
    title: "MCPserver.in Blog",
    description: "Technical content hub for MCP infrastructure, security, latency, and hosted server operations.",
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
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">MCP Infrastructure Notes</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            Product updates, deep technical guides, and India-first operating lessons for teams deploying Model Context Protocol servers.
          </p>
        </section>

        <section className="pb-10">
          <Link
            href="/complete-guide-mcp-servers"
            className="group flex flex-col gap-4 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/30 to-violet-950/30 p-6 transition hover:border-cyan-300/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="text-[11px] font-black uppercase tracking-wide text-cyan-300">Start here</div>
              <h2 className="mt-1 text-xl font-black text-white">The Complete Guide to MCP Servers in 2025-2026</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/58">
                The pillar guide tying together every cluster on this blog — architecture, security, deployment, platforms, integrations, and where MCP is headed next.
              </p>
            </div>
            <div className="inline-flex shrink-0 items-center gap-1 text-sm font-black text-cyan-300">
              Read the guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        </section>

        <section className="space-y-8">
          {postsByCluster.map((cluster) => (
            <div key={cluster.slug}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-black text-white">
                  {cluster.title} ({cluster.posts.length} posts)
                </h2>
                <Link 
                  href={`/blog/cluster/${cluster.slug}`} 
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-cyan-200"
                >
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              
              {cluster.posts.length > 0 ? (
                <div className="grid gap-4">
                  {cluster.posts.slice(0, 3).map((post) => (
                    <article key={post.slug} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-white/45">
                        <span className="rounded-md bg-violet-500/15 px-2 py-1 text-violet-200">{post.category}</span>
                        <span>{post.date}</span>
                         <span>{computeReadTime(post.content)}</span>
                      </div>
                      <h3 className="mt-4 text-lg font-black text-white">
                        <Link href={`/blog/${post.slug}`} className="hover:text-cyan-300">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.ugcElements.slice(0, 2).map((ugc) => (
                          <span key={ugc} className="text-xs rounded-full bg-cyan-500/10 px-2 py-1 text-cyan-200">
                            {ugc}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                  
                  {cluster.posts.length > 3 && (
                    <div className="text-center pt-4">
                      <Link 
                        href={`/blog/cluster/${cluster.slug}`} 
                        className="inline-flex items-center gap-2 rounded-md bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-200 hover:bg-cyan-500/20 transition-colors"
                      >
                        View all {cluster.posts.length} posts in {cluster.title}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center py-8">
                  <p className="text-white/45">This cluster is being populated. Check back soon!</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}