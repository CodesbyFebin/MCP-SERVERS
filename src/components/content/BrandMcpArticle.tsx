import Link from "next/link";
import type { ReactNode } from "react";
import { ContentFaq } from "@/src/content/content-registry";
import { articleJsonLd, breadcrumbListJsonLd } from "@/src/seo/schema";
import { absoluteUrl } from "@/src/seo/breadcrumbs";
import { Breadcrumbs } from "@/src/components/content/Breadcrumbs";
import { DirectAnswer } from "@/src/components/content/DirectAnswer";
import { EvidencePanel, EvidenceItem } from "@/src/components/content/EvidencePanel";
import { FAQ } from "@/src/components/content/FAQ";

export type OfficialStatus = "official" | "official-docs-only" | "no-official";

const STATUS_BANNER: Record<OfficialStatus, { label: string; className: string }> = {
  official: {
    label: "Official MCP server published by the company",
    className:
      "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200",
  },
  "official-docs-only": {
    label: "Official MCP server, documentation only (read-only)",
    className:
      "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-700 dark:bg-sky-900/20 dark:text-sky-200",
  },
  "no-official": {
    label: "No official MCP server. Community projects only",
    className:
      "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200",
  },
};

export interface ArticleSection {
  id: string;
  heading: string;
  body: ReactNode;
}

export interface BrandMcpArticleProps {
  slug: string;
  h1: string;
  title: string;
  description: string;
  /** Brand pages only: whether the company publishes an official MCP server. */
  status?: OfficialStatus;
  /** Full URL path; defaults to /blog/{slug}. */
  path?: string;
  /** Parent breadcrumb; defaults to Blog. */
  section?: { label: string; href: string };
  directAnswer: string;
  reviewedAt: string;
  sections: ArticleSection[];
  evidence: EvidenceItem[];
  faqs: ContentFaq[];
  related: { href: string; label: string }[];
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="my-4 overflow-x-auto rounded border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <code>{children}</code>
    </pre>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">{children}</p>;
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline dark:text-blue-400"
    >
      {children}
    </a>
  );
}

export function BrandMcpArticle(props: BrandMcpArticleProps) {
  const path = props.path ?? `/blog/${props.slug}`;
  const section = props.section ?? { label: "Blog", href: "/blog" };
  const banner = props.status ? STATUS_BANNER[props.status] : null;
  const crumbs = [
    { label: "Home", href: "/" },
    section,
    { label: props.h1, href: path },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <Breadcrumbs crumbs={crumbs} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              articleJsonLd({
                slug: props.slug,
                title: props.title,
                h1: props.h1,
                description: props.description,
                schemaType: "article",
                indexableUrl: path,
                reviewedAt: props.reviewedAt,
              }),
              breadcrumbListJsonLd([
                { name: "Home", item: absoluteUrl("/") },
                { name: section.label, item: absoluteUrl(section.href) },
                { name: props.h1, item: absoluteUrl(path) },
              ]),
            ]),
          }}
        />

        {banner && (
          <div className={`mb-4 rounded border p-3 text-sm font-medium ${banner.className}`}>
            {banner.label} · status checked {props.reviewedAt}
          </div>
        )}

        <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">{props.h1}</h1>

        <DirectAnswer text={props.directAnswer} />

        {props.sections.map((s) => (
          <section key={s.id} aria-labelledby={`${s.id}-heading`} className="my-10">
            <h2
              id={`${s.id}-heading`}
              className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100"
            >
              {s.heading}
            </h2>
            {s.body}
          </section>
        ))}

        <EvidencePanel items={props.evidence} />

        <FAQ faqs={props.faqs} />

        <section aria-labelledby="related-heading" className="my-10">
          <h2
            id="related-heading"
            className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100"
          >
            Related
          </h2>
          <ul className="space-y-2 text-sm">
            {props.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-blue-600 hover:underline dark:text-blue-400">
                  {r.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800">
          Sources last checked: <strong>{props.reviewedAt}</strong>. MCP servers change often;
          re-check the linked sources before relying on setup steps.
        </footer>
      </article>
    </main>
  );
}
