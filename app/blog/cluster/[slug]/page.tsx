import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../../src/lib/schema";
import { computeReadTime } from "../../../../src/lib/readTime";
import { clusters, getPostsByCluster } from "../../../../src/data/blogPosts";

export const dynamic = "force-static";

type ClusterPageParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return clusters.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({ params }: { params: ClusterPageParams }): Promise<Metadata> {
  const { slug } = await params;
  const cluster = clusters.find(c => c.slug === slug);
  if (!cluster) return {};
  return {
    title: `${cluster.title} Blog Posts | MCPserver.in`,
    description: `All ${cluster.postCount} posts in the ${cluster.title} cluster.`,
    alternates: {
      canonical: `/blog/cluster/${slug}`,
      languages: {
        "en-IN": `/blog/cluster/${slug}`,
        "en": `/blog/cluster/${slug}`,
      }
    },
  };
}

export default async function BlogClusterPage({ params }: { params: ClusterPageParams }) {
  const { slug } = await params;
  const cluster = clusters.find(c => c.slug === slug);
  if (!cluster) notFound();

  const posts = getPostsByCluster(cluster.slug);
  const schema = getUnifiedGraphSchema({
    pageUrl: `/blog/cluster/${cluster.slug}`,
    title: `${cluster.title} Blog Posts`,
    description: `All posts in the ${cluster.title} cluster covering MCP development, security, and production topics.`,
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: cluster.title, item: `/blog/cluster/${cluster.slug}` }
    ],
    article: {
      title: `${cluster.title} Blog Posts`,
      description: `Complete collection of ${posts.length} posts in the ${cluster.title} cluster.`,
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: "2026-07-19",
      dateModified: "2026-07-19"
    }
  });

  return (
    <div id={`blog-cluster-${cluster.slug}`} className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={schema} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Breadcrumbs items={[
          { name: "Blog", href: "/blog" },
          { name: cluster.title, href: `/blog/cluster/${cluster.slug}` }
        ]} />

        <article className="py-10">
          <header>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{cluster.title} Blog Posts</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/58">
              {posts.length} posts covering {cluster.description.toLowerCase()}
            </p>
          </header>

          <div className="mt-10 grid gap-4">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-white/45">
                  <span className="rounded-md bg-violet-500/15 px-2 py-1 text-violet-200">{post.category}</span>
                  <span>{post.date}</span>
                  <span>{computeReadTime(post.content)}</span>
                </div>
                <h2 className="mt-4 text-xl font-black text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-cyan-300">
                    {post.title}
                  </Link>
                </h2>
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
          </div>
        </article>
      </div>
    </div>
  );
}
