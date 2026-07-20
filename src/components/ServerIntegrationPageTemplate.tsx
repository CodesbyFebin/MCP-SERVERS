"use client";

import Link from "next/link";
import { useTheme } from "./ThemeAndAuthProvider";
import { getFaqsForPage } from "../data/faqs";
import { getRelatedLinks } from "../lib/internalLinks";
import { getUnifiedGraphSchema } from "../lib/schema";
import Breadcrumbs from "./Breadcrumbs";
import FAQ from "./FAQ";
import SchemaJsonLd from "./SchemaJsonLd";
import RelatedPages from "./RelatedPages";
import AnswerBox from "./AnswerBox";
import AuthorBox from "./AuthorBox";
import { 
  Cpu, Terminal, Key, ShieldCheck, CheckCircle, ArrowRight, BookOpen, Lock, Settings
} from "lucide-react";

export interface ServerIntegrationPageTemplateProps {
  name: string;
  slug: string;
  category: string;
  description: string;
  auth: string;
  useCases: string[];
  features: string[];
}

export default function ServerIntegrationPageTemplate({
  name,
  slug,
  category,
  description,
  auth,
  useCases,
  features
}: ServerIntegrationPageTemplateProps) {
  const { theme } = useTheme();
  const faqs = getFaqsForPage(slug, `${name} MCP Server`, category);
  const relatedLinks = getRelatedLinks(slug, "server");

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
            Verified MCP Connector
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
              answer={`The ${name} MCP server establishes a secure, local or remote JSON-RPC 2.0 communication tunnel, allowing AI models (like Claude or Cursor) to automatically discover and execute capabilities (tools, prompts, and resources) within the ${name} ecosystem with extremely low latency.`}
              keyTakeaways={useCases.slice(0, 4)}
            />

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
                Verified Use Cases
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
                To guarantee perfect data isolation, safeguard the {auth} credentials. Always run integrations in sandboxed contexts to block unsolicited access.
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

            {/* Author Attribution & Sources (EEAT) */}
            <AuthorBox
              authorName="MCPserver.in Engineering"
              authorRole="Platform Team"
              publishedDate="2026-03-12"
              updatedDate="2026-07-09"
              citations={[
                { label: "Model Context Protocol Specification v1.0", url: "https://spec.modelcontextprotocol.io" },
                { label: `Verified ${name} Connector GitHub Repository`, url: `https://github.com/modelcontextprotocol/servers/tree/main/src/${slug.replace("-mcp-server", "")}` }
              ]}
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
                Deploy {name} Server
              </h4>
              <p className={`text-[11px] mt-2 mb-4 leading-normal ${isDark ? "text-white/50" : "text-slate-500"}`}>
                Deploy this {name} integration to our global edge container cluster. Zero DevOps, instant SSE.
              </p>
              <div className="space-y-2">
                <Link
                  href="/pricing"
                  className="block text-center w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-black rounded-lg shadow-md transition-all"
                >
                  Start Managed Hosting
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
