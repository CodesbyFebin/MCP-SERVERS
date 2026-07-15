import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import AnswerBox from "../../../src/components/AnswerBox";
import AuthorBox from "../../../src/components/AuthorBox";
import FAQ from "../../../src/components/FAQ";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { docsPages, findDocsPage, getDocsPath } from "../../../src/data/docs";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ExternalLink } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return docsPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findDocsPage(slug);

  if (!page) {
    return {
      title: "Documentation Not Found",
    };
  }

  return {
    title: `${page.title} - MCPserver.in Docs`,
    description: page.description,
    keywords: page.targetKeywords,
    alternates: {
      canonical: `https://www.mcpserver.in${getDocsPath(page)}/`,
    },
  };
}

function buildSchema(page: NonNullable<ReturnType<typeof findDocsPage>>) {
  const url = `https://www.mcpserver.in${getDocsPath(page)}/`;
  const articleType = page.schemaType === "ComparisonPage" || page.schemaType === "SoftwareApplication" ? "TechArticle" : page.schemaType;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": articleType,
        "@id": `${url}#article`,
        headline: page.title,
        description: page.description,
        datePublished: page.publishedAt,
        dateModified: page.modifiedAt,
        author: {
          "@type": "Organization",
          name: "MCPserver Team",
          url: "https://www.mcpserver.in/",
        },
        publisher: {
          "@type": "Organization",
          name: "MCPserver.in",
          url: "https://www.mcpserver.in/",
        },
        keywords: page.targetKeywords.join(", "),
        mainEntityOfPage: url,
      },
      ...(page.schemaType === "SoftwareApplication"
        ? [
            {
              "@type": "SoftwareApplication",
              "@id": `${url}#software`,
              name: page.title,
              description: page.description,
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Local stdio and hosted MCP endpoints",
              url,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Documentation",
            item: "https://www.mcpserver.in/docs/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: url,
          },
        ],
      },
    ],
  };
}

export default async function DocsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findDocsPage(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Documentation", href: "/docs" },
    { name: page.category, href: `/docs/${page.category}` },
    { name: page.title, href: getDocsPath(page) },
  ];

  const relatedPages = page.related
    .map((href) => ({
      href,
      page: docsPages.find((candidate) => getDocsPath(candidate) === href),
    }))
    .filter((item) => item.page || item.href.startsWith("/glossary/") || item.href === "/status");

  return (
    <div id="docs-detail-page" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <SchemaJsonLd schema={buildSchema(page)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <Link href="/docs" className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to docs
              </Link>
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                  <BookOpen className="h-4 w-4 text-cyan-300" />
                  In This Guide
                </h2>
                <nav className="space-y-2">
                  {page.sections.map((section) => (
                    <a
                      key={section.heading}
                      href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                      className="block rounded-md px-2 py-1.5 text-xs text-slate-400 hover:bg-white/[0.04] hover:text-cyan-200"
                    >
                      {section.heading}
                    </a>
                  ))}
                  <a href="#faq-section" className="block rounded-md px-2 py-1.5 text-xs text-slate-400 hover:bg-white/[0.04] hover:text-cyan-200">
                    FAQs
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-6 space-y-8">
            <header className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {page.category}
                </span>
                <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs font-semibold text-purple-200">
                  {page.schemaType}
                </span>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">{page.title}</h1>
                <p className="text-sm sm:text-base leading-7 text-slate-300">{page.description}</p>
              </div>
            </header>

            <AnswerBox question={`What is the short answer for ${page.title}?`} answer={page.directAnswer} keyTakeaways={page.keyTakeaways} />

            {page.sections.map((section) => {
              const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <section key={section.heading} id={id} className="scroll-mt-24 rounded-xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
                  <h2 className="mb-4 text-2xl font-black text-white">{section.heading}</h2>
                  <div className="space-y-4 text-sm leading-7 text-slate-300">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.table && (
                    <div className="mt-5 overflow-x-auto rounded-lg border border-white/10">
                      <table className="min-w-full divide-y divide-white/10 text-left text-xs">
                        <thead className="bg-white/[0.04] text-slate-300">
                          <tr>
                            {section.table.headers.map((header) => (
                              <th key={header} className="px-4 py-3 font-bold">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {section.table.rows.map((row) => (
                            <tr key={row.join("-")} className="text-slate-400">
                              {row.map((cell) => (
                                <td key={cell} className="px-4 py-3">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.code && (
                    <pre className="mt-5 overflow-x-auto rounded-lg border border-cyan-400/15 bg-black/60 p-4 text-xs leading-6 text-cyan-100">
                      <code>{section.code}</code>
                    </pre>
                  )}
                </section>
              );
            })}

            <FAQ
              items={page.faqs}
              title={`${page.title} FAQs`}
              subtitle="Direct answers for developers, operators, and Indian teams evaluating MCP."
            />

            <AuthorBox
              authorName="MCPserver Team"
              authorRole="MCP documentation and protocol implementation team"
              publishedDate={page.publishedAt}
              updatedDate={page.modifiedAt}
              citations={page.citations.map((url) => ({ label: url.replace(/^https?:\/\//, ""), url }))}
            />
          </main>

          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                <h2 className="mb-3 text-sm font-bold text-white">Target Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {page.targetKeywords.map((keyword) => (
                    <span key={keyword} className="rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[11px] text-slate-300">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                <h2 className="mb-3 text-sm font-bold text-white">Related Docs</h2>
                <div className="space-y-2">
                  {relatedPages.map(({ href, page: related }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group block rounded-lg border border-white/10 bg-black/20 p-3 transition hover:border-cyan-400/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xs font-bold text-slate-200 group-hover:text-cyan-200">
                            {related?.title || href.replace(/^\/+/, "").split("/").join(" / ")}
                          </h3>
                          {related?.description && (
                            <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500">{related.description}</p>
                          )}
                        </div>
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500 group-hover:text-cyan-300" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-100">
                  <CheckCircle2 className="h-4 w-4" />
                  Build Notes
                </h2>
                <ul className="space-y-2 text-xs leading-5 text-emerald-100/80">
                  <li>Static App Router page</li>
                  <li>FAQ and article schema included</li>
                  <li>Internal links from knowledge graph</li>
                  <li>Last updated {page.modifiedAt}</li>
                </ul>
              </div>

              {page.citations.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                  <h2 className="mb-3 text-sm font-bold text-white">Sources</h2>
                  <div className="space-y-2">
                    {page.citations.map((url) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-cyan-300 hover:text-cyan-200"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {url.replace(/^https?:\/\//, "")}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
