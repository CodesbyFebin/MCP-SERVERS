"use client";

import Link from "next/link";
import { useTheme } from "./ThemeAndAuthProvider";
import { getFaqsForPage } from "../data/faqs";
import { getRelatedLinks } from "../lib/internalLinks";
import { getUnifiedGraphSchema } from "../lib/schema";
import { getContentDates } from "../lib/contentDates";
import Breadcrumbs from "./Breadcrumbs";
import FAQ from "./FAQ";
import SchemaJsonLd from "./SchemaJsonLd";
import RelatedPages from "./RelatedPages";
import AnswerBox from "./AnswerBox";
import AuthorBox from "./AuthorBox";
import { 
  FileText, ShieldCheck, Zap, BookOpen, AlertCircle, CheckCircle, Lock 
} from "lucide-react";

export interface TopicPageTemplateProps {
  slug: string;
  title: string;
  pillar: string;
  shortAnswer: string;
  explanation: string;
  bestPractices: string[];
  primaryKeyword: string;
}

export default function TopicPageTemplate({
  slug,
  title,
  pillar,
  shortAnswer,
  explanation,
  bestPractices,
  primaryKeyword
}: TopicPageTemplateProps) {
  const { theme } = useTheme();
  const faqs = getFaqsForPage(slug);
  const relatedLinks = getRelatedLinks(slug, "topic");
  const { datePublished, dateModified } = getContentDates(`topic:${slug}`);

  const breadcrumbSteps = [
    { name: "Pillars Hub", href: `/${pillar}` },
    { name: title, href: `/topics/${slug}` }
  ];

  const unifiedGraphSchema = getUnifiedGraphSchema({
    pageUrl: `/topics/${slug}`,
    title: `${title} - Model Context Protocol Guide`,
    description: shortAnswer,
    breadcrumbs: breadcrumbSteps.map(step => ({ name: step.name, item: step.href })),
    faq: faqs,
    article: {
      title: title,
      description: shortAnswer,
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished,
      dateModified
    }
  });

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-6 pb-16 transition-colors duration-200 ${
      isDark ? "bg-[#050508] text-white" : "bg-slate-50 text-slate-800"
    }`}>
      {/* Unified JSON-LD Connected Graph Schema */}
      <SchemaJsonLd schema={unifiedGraphSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Header Heading */}
        <div className={`py-6 border-b ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 border ${
            isDark 
              ? "bg-blue-950/20 text-blue-400 border-blue-900/30" 
              : "bg-blue-50 text-blue-700 border-blue-100"
          }`}>
            <Zap className="w-3 h-3" />
            Developer Topic Guide
          </div>
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight leading-snug ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            {title}
          </h1>
        </div>

        {/* Main Content Sections */}
        <div className="mt-8 space-y-8 text-xs sm:text-sm leading-relaxed">
          
          {/* 1. Direct Answer (AEO / GEO optimized) */}
          <AnswerBox
            question={`What is the core concept of ${title}?`}
            answer={shortAnswer}
            keyTakeaways={bestPractices.slice(0, 4)}
          />

          {/* 1. Explanation */}
          <section id="explanation" className="space-y-3">
            <h2 className={`text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              1. Detailed Explanation
            </h2>
            <p className={isDark ? "text-white/75" : "text-slate-650"}>
              {explanation}
            </p>
            <p className={isDark ? "text-white/60" : "text-slate-500"}>
              Exposing capabilities systematically via standard JSON-RPC protocol messages lets LLMs discover and invoke developer scripts with maximum reliability.
            </p>
          </section>

          {/* 2. Use Cases */}
          <section id="use-cases" className="space-y-3">
            <h2 className={`text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              2. Core Use Cases
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"}`}>
                <h4 className={`text-xs font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Automated Script Exposer</h4>
                <p className={`text-[11px] ${isDark ? "text-white/50" : "text-slate-500"}`}>Instantly map command-line or internal tools to custom chat interface functions.</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"}`}>
                <h4 className={`text-xs font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Dynamic Context Injection</h4>
                <p className={`text-[11px] ${isDark ? "text-white/50" : "text-slate-500"}`}>Keep your databases and secure APIs in context, feeding them only when matched.</p>
              </div>
            </div>
          </section>

          {/* 3. Setup Overview */}
          <section id="setup-overview" className="space-y-3">
            <h2 className={`text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              3. Technical Setup Overview
            </h2>
            <div className={`p-6 rounded-2xl border space-y-3 ${
              isDark ? "bg-black/20 border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className={`text-xs font-display font-bold flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-800"}`}>
                <BookOpen className="w-4 h-4 text-blue-400" />
                Technical Implementation Checklist
              </h3>
              <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
                Applying {primaryKeyword} to your local dev sandbox environment follows this structure:
              </p>
              <ul className={`list-disc pl-5 space-y-2 text-xs ${isDark ? "text-white/60" : "text-slate-600"}`}>
                <li>Create your project workspace and install the standard development SDKs.</li>
                <li>Write clear and deterministic JSON schemas explaining expected model parameters.</li>
                <li>Integrate runtime logging variables to capture handshakes and data-stream errors.</li>
              </ul>
            </div>
          </section>

          {/* 4. Security Considerations */}
          <section id="security-considerations" className={`p-5 rounded-2xl border ${
            isDark ? "bg-red-950/10 border-red-900/20 text-red-400" : "bg-red-50 border-red-100 text-slate-800"
          }`}>
            <h3 className="font-display font-bold mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-red-500">
              <Lock className="w-4 h-4 text-red-500" />
              4. Security Considerations
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? "text-white/70" : "text-slate-650"}`}>
              When constructing connections, safeguard sensitive credentials. Do not inject hardcoded API tokens directly into the codebase. Ensure you enforce strict read-only parameters where appropriate.
            </p>
          </section>

          {/* Engineering Best Practices */}
          <div>
            <h2 className={`text-base sm:text-lg font-display font-bold mb-3 flex items-center gap-1.5 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
              Engineering Best Practices
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestPractices.map((bp, i) => (
                <div key={i} className={`p-3.5 rounded-xl border flex items-start gap-2 text-xs ${
                  isDark ? "bg-white/[0.01] border-white/5 text-white/60" : "bg-white border-slate-200 text-slate-600"
                }`}>
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className={`p-4 rounded-xl border flex gap-2.5 ${
            isDark ? "bg-amber-950/10 border-amber-900/20 text-amber-300" : "bg-amber-50 border-amber-100 text-amber-800"
          }`}>
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block mb-0.5">Common Configuration Pitfall</strong>
              Avoid piping debugging statements to standard output (Stdout). Doing so disrupts standard JSON-RPC data streams.
            </div>
          </div>

          {/* Conversion CTA Block */}
          <div className={`mt-8 p-6 rounded-2xl border text-center ${
            isDark ? "bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-white/5" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <h3 className={`text-sm font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              Deploy Secure Cloud Containers for Your Nodes
            </h3>
            <p className={`text-xs mt-2 ${isDark ? "text-white/55" : "text-slate-500"}`}>
              Easily package and host your custom Model Context Protocol codebases on low-latency infrastructure inside India.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link
                href="/pricing"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-[11px] font-bold text-black rounded-lg transition-all"
              >
                View Plans
              </Link>
              <Link
                href="/tools/mcp-playground"
                className={`px-4 py-2 text-[11px] font-bold rounded-lg border transition-all ${
                  isDark ? "bg-transparent border-white/10 hover:bg-white/5 text-white/80" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                Open Simulator
              </Link>
            </div>
          </div>

          {/* Author Attribution & Sources (EEAT) */}
          <AuthorBox
            authorName="MCPserver.in Engineering"
            authorRole="Platform Team"
            publishedDate={datePublished}
            updatedDate={dateModified}
            citations={[
              { label: "Anthropic Model Context Protocol SDK Reference", url: "https://spec.modelcontextprotocol.io" },
              { label: "Standard JSON-RPC 2.0 Specification", url: "https://www.jsonrpc.org/specification" }
            ]}
          />

        </div>

        {/* Dynamic FAQ */}
        <div className={`mt-12 pt-8 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <FAQ items={faqs} title={`${title} - FAQ`} />
        </div>

        {/* Contextual Related Links */}
        <RelatedPages links={relatedLinks} />

      </div>
    </div>
  );
}
