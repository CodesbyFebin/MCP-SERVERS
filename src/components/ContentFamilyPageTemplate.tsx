"use client";

/**
 * ContentFamilyPageTemplate
 *
 * Generic layout shell for every content family page. Handles the dark/light
 * theme, breadcrumbs, the hero H1 block, sidebar, FAQ accordion, and the
 * author/sources box. Each family passes its own body content as children.
 *
 * This keeps family-specific page components small: they only need to supply
 * metadata, the canonical H1, body JSX, sidebar items, and FAQs.
 */

import Link from "next/link";
import { type ReactNode } from "react";
import { useTheme } from "./ThemeAndAuthProvider";
import Breadcrumbs, { type BreadcrumbItem } from "./Breadcrumbs";
import FAQ, { type FAQItem } from "./FAQ";
import SchemaJsonLd from "./SchemaJsonLd";
import AuthorBox from "./AuthorBox";
import { Badge, ExternalLink } from "lucide-react";

export interface SidebarItem {
  label: string;
  value: ReactNode;
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface ContentFamilyPageProps {
  /** The single H1 for this page. */
  h1: string;
  /** 40–80 word opening answer block shown directly under the H1. */
  answerBlock: string;
  /** Breadcrumb trail. Home is prepended automatically. */
  breadcrumbs: BreadcrumbItem[];
  /** Right-hand quick-facts panel items. */
  sidebarItems?: SidebarItem[];
  /** Links shown in the related-guides panel. */
  relatedLinks?: RelatedLink[];
  /** FAQ items at the bottom of the page. */
  faqs?: FAQItem[];
  /** Author name for the attribution box. */
  author?: string;
  /** ISO date string for published date. */
  publishedAt?: string;
  /** ISO date string for last verified date. */
  updatedAt?: string;
  /** Source citations for E-E-A-T box. */
  citations?: { label: string; url: string }[];
  /** The JSON-LD schema graph to inject. */
  schema?: object;
  /** Badge label shown under the H1 (e.g. "Integration Guide"). */
  badge?: string;
  /** Main body content. */
  children: ReactNode;
}

export default function ContentFamilyPageTemplate({
  h1,
  answerBlock,
  breadcrumbs,
  sidebarItems = [],
  relatedLinks = [],
  faqs = [],
  author = "MCPServer.in Editorial",
  publishedAt,
  updatedAt,
  citations = [],
  schema,
  badge,
  children,
}: ContentFamilyPageProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const base = isDark ? "bg-[#050508] text-white" : "bg-slate-50 text-slate-800";
  const card = isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200";
  const muted = isDark ? "text-white/55" : "text-slate-500";
  const heading = isDark ? "text-white" : "text-slate-900";

  return (
    <div className={`min-h-screen py-6 pb-20 transition-colors duration-200 ${base}`}>
      {schema && <SchemaJsonLd schema={schema} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header className={`py-8 border-b ${isDark ? "border-white/5" : "border-slate-200"}`}>
          {badge && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${
              isDark
                ? "bg-cyan-950/20 text-cyan-400 border-cyan-900/30"
                : "bg-cyan-50 text-cyan-700 border-cyan-100"
            }`}>
              <Badge className="w-3.5 h-3.5" />
              {badge}
            </div>
          )}
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight ${heading}`}>
            {h1}
          </h1>
          <p className={`mt-4 text-sm sm:text-base max-w-3xl leading-relaxed ${muted}`}>
            {answerBlock}
          </p>
        </header>

        {/* ── Two-column layout ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">

          {/* Main content */}
          <article className="lg:col-span-8 space-y-10">
            {children}

            {/* Author + Citations */}
            <AuthorBox
              authorName={author}
              authorRole="Editorial Team"
              publishedDate={publishedAt ?? new Date().toISOString().split("T")[0]}
              updatedDate={updatedAt ?? new Date().toISOString().split("T")[0]}
              reviewLabel="Editorial record"
              citations={citations}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Quick-facts panel */}
            {sidebarItems.length > 0 && (
              <div className={`p-5 rounded-2xl border ${card}`}>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${muted}`}>
                  Quick Facts
                </h3>
                <dl className="space-y-3">
                  {sidebarItems.map(({ label, value }, i) => (
                    <div key={i} className="flex justify-between gap-2 text-xs">
                      <dt className={muted}>{label}</dt>
                      <dd className={`font-medium text-right ${isDark ? "text-white/80" : "text-slate-800"}`}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Related links panel */}
            {relatedLinks.length > 0 && (
              <div className={`p-5 rounded-2xl border ${card}`}>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${muted}`}>
                  Related Guides
                </h3>
                <ul className="space-y-2">
                  {relatedLinks.map(({ label, href }, i) => (
                    <li key={i}>
                      <Link
                        href={href}
                        className="flex items-center gap-1.5 text-xs text-cyan-500 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <div className={`mt-16 pt-8 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
            <FAQ items={faqs} />
          </div>
        )}
      </div>
    </div>
  );
}
