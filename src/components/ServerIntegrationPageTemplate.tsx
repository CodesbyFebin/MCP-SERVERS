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
  Cpu, Terminal, Key, CheckCircle, Lock, FileText, BadgeCheck, GitBranch
} from "lucide-react";

export interface ServerIntegrationPageTemplateProps {
  name: string;
  slug: string;
  category: string;
  description: string;
  auth: string;
  useCases: string[];
  features: string[];
  publicationStatus: string;
  verificationState: string;
  contentHash: string;
  qualityScore: number;
  qualityNotes: string[];
  claims: { id: string; text: string; expiresAt?: string }[];
  evidence: { id: string; text: string; sourceId: string; expiresAt?: string }[];
  sources: { id: string; title: string; url: string; publisher: string; credibility: string }[];
}

export default function ServerIntegrationPageTemplate({
  name,
  slug,
  category,
  description,
  auth,
  useCases,
  features,
  publicationStatus,
  verificationState,
  contentHash,
  qualityScore,
  qualityNotes,
  claims,
  evidence,
  sources,
}: ServerIntegrationPageTemplateProps) {
  const { theme } = useTheme();
  const faqs = getFaqsForPage(slug);
  const relatedLinks = getRelatedLinks(slug, "server");
  const { datePublished, dateModified } = getContentDates(`server:${slug}`);

  const breadcrumbSteps = [
    { name: "Directory", href: "/mcp-server-directory" },
    { name: `${name} Integration`, href: `/servers/${slug}` }
  ];

  const unifiedGraphSchema = getUnifiedGraphSchema({
    pageUrl: `/servers/${slug}`,
    title: `${name} MCP Server Integration Guide`,
    description,
    breadcrumbs: breadcrumbSteps.map(step => ({ name: step.name, item: step.href })),
    faq: faqs,
    softwareApplication: {
      name: `${name} MCP Server Integration`,
      description
    }
  });

  const isDark = theme === "dark";
  const publicSources = sources.filter((source) => source.url.startsWith("http"));

  return (
    <div className={`min-h-screen py-6 pb-16 transition-colors duration-200 ${
      isDark ? "bg-[#050508] text-white" : "bg-slate-50 text-slate-800"
    }`}>
      {/* Unified JSON-LD Connected Graph Schema */}
      <SchemaJsonLd schema={unifiedGraphSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Hero Section */}
        <div className={`py-8 border-b ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${
            isDark 
              ? "bg-cyan-950/20 text-cyan-400 border-cyan-900/30" 
              : "bg-cyan-50 text-cyan-700 border-cyan-100"
          }`}>
            <Cpu className="w-3.5 h-3.5" />
            {verificationState === "verified" ? "Verified MCP Connector" : "Seeded Directory Profile"}
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            {name} MCP Server
          </h1>
          <p className={`mt-4 text-sm sm:text-base max-w-3xl leading-relaxed ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}>
            {description}
          </p>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Direct Answer (AEO / GEO optimized) */}
            <AnswerBox
              question={`How does the ${name} Model Context Protocol (MCP) Server integration work?`}
              answer={`The ${name} MCP server profile describes how an MCP-compatible connector can expose ${name} capabilities to clients through documented tools, resources, prompts, and authentication boundaries. This page is a seeded directory profile, not a vendor certification or independent security audit.`}
              keyTakeaways={useCases.slice(0, 4)}
            />

            <section id="evidence-state" className={`rounded-2xl border p-5 ${
              isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200"
            }`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className={`flex items-center gap-2 text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    <BadgeCheck className="h-5 w-5 text-cyan-400" />
                    Publication State
                  </h2>
                  <p className={`mt-2 text-xs leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                    Status: <strong>{publicationStatus}</strong>. Verification state: <strong>{verificationState}</strong>. Quality score: <strong>{qualityScore}/100</strong>.
                  </p>
                  <p className={`mt-2 text-[11px] leading-relaxed ${isDark ? "text-white/45" : "text-slate-500"}`}>
                    Content hash: {contentHash}
                  </p>
                </div>
                <div className={`rounded-xl border px-3 py-2 text-[11px] ${
                  isDark ? "border-amber-400/25 bg-amber-500/10 text-amber-100" : "border-amber-200 bg-amber-50 text-amber-800"
                }`}>
                  Not labelled official unless source evidence supports it.
                </div>
              </div>
              {qualityNotes.length > 0 && (
                <ul className={`mt-4 space-y-1.5 text-xs ${isDark ? "text-white/55" : "text-slate-600"}`}>
                  {qualityNotes.map((note) => (
                    <li key={note}>- {note}</li>
                  ))}
                </ul>
              )}
            </section>

            {/* 2. Explanation */}
            <section id="explanation" className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Core Integration Concept
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-white/75" : "text-slate-650"}`}>
                Connecting the model to {name} bypasses complex setup. The LLM can auto-discover what endpoints are active, what input variables are expected, and how answers will be delivered.
              </p>
            </section>

            {/* 3. Use Cases */}
            <section id="use-cases" className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Recorded Use Cases
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {useCases.map((uc, i) => (
                  <div key={i} className={`p-4 rounded-xl border flex items-start gap-2.5 ${
                    isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"
                  }`}>
                    <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span className={`text-xs ${isDark ? "text-white/75" : "text-slate-600"}`}>{uc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Setup Overview */}
            <section id="setup-overview" className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Setup Overview
              </h2>
              <div className={`p-6 rounded-2xl border ${
                isDark ? "bg-black/20 border-white/5" : "bg-white border-slate-200"
              }`}>
                <h3 className={`text-xs font-display font-bold mb-3 flex items-center gap-2 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}>
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Connection Setup Checklist
                </h3>
                <ol className={`space-y-4 list-decimal pl-5 text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
                  <li>
                    <strong className={isDark ? "text-white/80" : "text-slate-700"}>Prepare Credentials:</strong> Obtain your {auth} credentials directly from your {name} settings.
                  </li>
                  <li>
                    <strong className={isDark ? "text-white/80" : "text-slate-700"}>Update Config:</strong> Add the executable tool command structure directly to your Claude config file.
                  </li>
                  <li>
                    <strong className={isDark ? "text-white/80" : "text-slate-700"}>Restart & Confirm:</strong> Reload the desktop model client to complete the connection handshake sequence.
                  </li>
                </ol>
              </div>

              {/* Sample Payload (JSON-RPC) */}
              <div className="mt-4">
                <h3 className={`text-xs font-display font-bold mb-2 ${isDark ? "text-white/60" : "text-slate-700"}`}>
                  Sample Connection Schema
                </h3>
                <pre className={`p-4 rounded-xl border font-mono text-[11px] overflow-x-auto ${
                  isDark ? "bg-black text-cyan-300 border-white/5" : "bg-slate-100 text-slate-800 border-slate-200"
                }`}>
                  {`{\n  "jsonrpc": "2.0",\n  "method": "tools/call",\n  "params": {\n    "name": "execute_${slug.replace("-mcp-server", "")}",\n    "arguments": {\n      "query": "status_check"\n    }\n  },\n  "id": 1\n}`}
                </pre>
              </div>
            </section>

            {/* 5. Security Considerations */}
            <section id="security-considerations" className={`p-5 rounded-2xl border ${
              isDark ? "bg-red-950/10 border-red-900/20" : "bg-red-50 border-red-100"
            }`}>
              <h3 className="font-display font-bold mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-red-500">
                <Lock className="w-4 h-4" />
                Security Considerations
              </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-slate-650"}`}>
                Treat the {auth} credentials as sensitive production secrets. Prefer read-only scopes where possible, isolate the runtime, log tool calls, and require human confirmation before any destructive action.
              </p>
            </section>

            {/* 6. Best Practices */}
            <section id="best-practices" className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Best Practices
              </h2>
              <ul className={`list-disc pl-5 space-y-2 text-xs ${isDark ? "text-white/60" : "text-slate-500"}`}>
                {features.map((feat, i) => (
                  <li key={i}>
                    Configure exact resource boundaries for the <strong className={isDark ? "text-white/80" : "text-slate-700"}>{feat}</strong> feature.
                  </li>
                ))}
              </ul>
            </section>

            <section id="claims" className="space-y-3">
              <h2 className={`flex items-center gap-2 text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                <FileText className="h-5 w-5 text-cyan-400" />
                Traceable Claims
              </h2>
              <div className="space-y-3">
                {claims.map((claim) => (
                  <div key={claim.id} className={`rounded-xl border p-4 ${
                    isDark ? "bg-white/[0.015] border-white/5" : "bg-white border-slate-200"
                  }`}>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-white/70" : "text-slate-650"}`}>{claim.text}</p>
                    {claim.expiresAt && (
                      <p className={`mt-2 text-[11px] ${isDark ? "text-white/35" : "text-slate-450"}`}>
                        Refresh by {claim.expiresAt}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="evidence" className="space-y-3">
              <h2 className={`flex items-center gap-2 text-lg sm:text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                <GitBranch className="h-5 w-5 text-cyan-400" />
                Evidence Passages
              </h2>
              <div className="space-y-3">
                {evidence.map((item) => {
                  const source = sources.find((entry) => entry.id === item.sourceId);
                  return (
                    <div key={item.id} className={`rounded-xl border p-4 ${
                      isDark ? "bg-white/[0.015] border-white/5" : "bg-white border-slate-200"
                    }`}>
                      <p className={`text-xs leading-relaxed ${isDark ? "text-white/65" : "text-slate-600"}`}>{item.text}</p>
                      <p className={`mt-2 text-[11px] ${isDark ? "text-white/35" : "text-slate-450"}`}>
                        Source: {source?.title || item.sourceId}
                        {item.expiresAt ? ` | Refresh by ${item.expiresAt}` : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Author Attribution & Sources (EEAT) */}
            <AuthorBox
              authorName="MCPserver.in Engineering"
              authorRole="Platform Team"
              publishedDate={datePublished}
              updatedDate={dateModified}
              reviewLabel="Editorial record"
              citations={publicSources.map((source) => ({
                label: `${source.title} (${source.publisher})`,
                url: source.url,
              }))}
            />

          </div>

          {/* Sidebar / CTA Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Required Keys */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className={`font-display font-bold text-xs mb-1.5 flex items-center gap-1.5 ${
                isDark ? "text-white/80" : "text-slate-950"
              }`}>
                <Key className="w-4 h-4 text-cyan-500" />
                Required Auth Keys
              </h3>
              <p className={`text-xs ${isDark ? "text-white/55" : "text-slate-550"}`}>{auth}</p>
            </div>

            {/* Product CTA */}
            <div id="product-cta" className={`p-6 rounded-2xl border text-center transition-all ${
              isDark 
                ? "bg-gradient-to-b from-gray-900 to-cyan-950/20 border-cyan-500/25" 
                : "bg-white border-cyan-200 shadow-md"
            }`}>
              <h4 className={`font-display font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                Review {name} Profile
              </h4>
              <p className={`text-[11px] mt-2 mb-4 leading-normal ${isDark ? "text-white/50" : "text-slate-500"}`}>
                Compare this directory profile with related connectors before choosing an implementation path.
              </p>
              <div className="space-y-2">
                <Link
                  href="/mcp-server-directory"
                  className="block text-center w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-black rounded-lg shadow-md transition-all"
                >
                  Browse Directory
                </Link>
                <Link
                  href={`/compare?servers=${slug}`}
                  className={`block text-center w-full py-2 border text-[11px] font-semibold rounded-lg transition-all ${
                    isDark 
                      ? "border-white/10 hover:bg-white/5 text-gray-300" 
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  Compare side-by-side
                </Link>
              </div>
            </div>

            {/* Related Connectors list */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                isDark ? "text-white/40" : "text-slate-400"
              }`}>
                Related Connectors
              </h4>
              <div className="space-y-1.5 text-xs">
                {relatedLinks.map((link, i) => (
                  <Link 
                    key={i} 
                    href={link.href} 
                    className="block py-1 hover:underline text-cyan-500 truncate"
                  >
                    → {link.title}
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* FAQ section */}
        <div className={`mt-16 pt-8 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <FAQ items={faqs} title={`${name} - FAQ`} />
        </div>

        {/* Related Pages Section */}
        <RelatedPages links={relatedLinks} />

      </div>
    </div>
  );
}
