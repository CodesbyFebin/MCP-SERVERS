import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema, getFAQSchema } from "../../../src/lib/schema";
import { computeReadTime } from "../../../src/lib/readTime";
import { blogPosts } from "../../../src/data/blogPosts";
import UGCOrchestrator from "../../../src/components/ugc/UGCOrchestrator";

export const dynamic = "force-static";

type BlogPostPageParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: BlogPostPageParams }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | MCPserver.in Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: BlogPostPageParams }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  const unifiedSchema = getUnifiedGraphSchema({
    pageUrl: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: post.title, item: `/blog/${slug}` }
    ],
    article: {
      title: post.title,
      description: post.excerpt,
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: post.date,
      dateModified: post.date
    }
  });
  const faqSchema = post.faqs && post.faqs.length > 0 ? getFAQSchema(post.faqs) : null;

  return (
    <div id={`blog-${slug}`} className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      {faqSchema && <SchemaJsonLd schema={faqSchema} />}
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` }
        ]} />

        <article className="py-10">
          <header>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-white/45">
              <span className="rounded-md bg-violet-500/15 px-2 py-1 text-violet-200">{post.category}</span>
              <span>{post.date}</span>
              <span>{computeReadTime(post.content)}</span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-white/58">{post.excerpt}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.ugcElements.map((ugc) => (
                <span key={ugc} className="text-xs rounded-full bg-cyan-500/10 px-2 py-1 text-cyan-200">
                  {ugc}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.internalLinks.map((link) => {
                const linkedPost = blogPosts.find(p => p.slug === link);
                return linkedPost ? (
                  <Link key={link} href={`/blog/${link}`} className="text-xs rounded-full bg-gray-800/50 px-2 py-1 text-white/60 hover:bg-gray-700/50">
                    {linkedPost.title}
                  </Link>
                ) : null;
              })}
            </div>
          </header>

          <div
            className="prose prose-invert mt-10 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <section className="mt-14 border-t border-white/10 pt-10">
            <h2 className="text-xl font-black text-white">Join the Discussion</h2>
            <div className="mt-6 space-y-8">
              <UGCOrchestrator
                postId={post.slug}
                postCategory={post.category}
                ugcElements={post.ugcElements}
              />
            </div>
          </section>

          <footer className="mt-12 border-t border-white/10 pt-8">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/10 bg-gradient-to-br from-cyan-300 to-violet-500 text-sm font-black text-white">
                MCP
              </div>
              <div>
                <div className="text-sm font-black text-white">MCPserver.in Engineering</div>
                <div className="text-xs text-white/45">Platform Team</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300">
                ← All articles
              </Link>
              <Link href="/learn" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300">
                Read more guides →
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
