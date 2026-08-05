"use client";

import Link from "next/link";
import { useTheme } from "../ThemeAndAuthProvider";
import ContentFamilyPageTemplate from "../ContentFamilyPageTemplate";
import type { TroubleshootEntity } from "../../data/entities";
import { getUnifiedGraphSchema } from "../../lib/schema";
import { AlertTriangle, CheckCircle, Terminal, Search } from "lucide-react";

export interface TroubleshootPageTemplateProps {
  entity: TroubleshootEntity;
  faqItems?: { question: string; answer: string }[];
}

export default function TroubleshootPageTemplate({ entity, faqItems = [] }: TroubleshootPageTemplateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `How to Fix "${entity.errorTitle}" in an MCP Server`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "Troubleshooting", item: "/troubleshooting" },
      { name: entity.errorTitle, item: entity.route },
    ],
    faq: faqItems,
    article: {
      title: `How to Fix "${entity.errorTitle}" in an MCP Server`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  const relatedLinks = entity.relatedIssues.map((s) => ({
    label: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: `/troubleshooting/${s}/`,
  }));
  relatedLinks.push({ label: "MCP Security Guide", href: "/security/" });
  relatedLinks.push({ label: "What Is stdio Transport?", href: "/glossary/stdio/" });

  return (
    <ContentFamilyPageTemplate
      h1={`How to Fix "${entity.errorTitle}" in an MCP Server`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "Troubleshooting", href: "/troubleshooting" },
        { name: entity.errorTitle, href: entity.route },
      ]}
      badge="Troubleshooting"
      sidebarItems={[
        { label: "Affected clients", value: entity.affectedClients.join(", ") },
        { label: "Transports", value: entity.affectedTransports.join(", ") },
        { label: "Common causes", value: `${entity.commonCauses.length} documented` },
      ]}
      relatedLinks={relatedLinks}
      faqs={faqItems}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      schema={schema}
    >
      {/* Quick answer */}
      <section id="quick-answer" className={`p-5 rounded-2xl border ${isDark ? "bg-amber-950/15 border-amber-900/25" : "bg-amber-50 border-amber-200"}`}>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-amber-300" : "text-amber-700"}`}>Quick Answer</span>
        </div>
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/75" : "text-slate-700"}`}>
          {entity.errorTitle} is most commonly caused by {entity.commonCauses[0].toLowerCase()}.
          Check the steps below in order to isolate and fix the issue.
        </p>
      </section>

      {/* Affected context */}
      <section id="context" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Affected Clients and Transports</h2>
        <div className="flex flex-wrap gap-2">
          {entity.affectedClients.map((c, i) => (
            <Link key={i} href={`/clients/${c.toLowerCase().replace(/ /g, "-")}/`}
              className={`px-2.5 py-1 rounded-full text-xs border ${isDark ? "border-white/10 text-white/70 hover:border-cyan-500/40" : "border-slate-200 text-slate-600 hover:border-cyan-300"}`}>
              {c}
            </Link>
          ))}
          {entity.affectedTransports.map((t, i) => (
            <Link key={i} href={`/glossary/${t}/`}
              className={`px-2.5 py-1 rounded-full text-xs border ${isDark ? "border-cyan-900/40 text-cyan-400" : "border-cyan-200 text-cyan-700"}`}>
              {t}
            </Link>
          ))}
        </div>
      </section>

      {/* Common causes */}
      <section id="causes" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Common Causes</h2>
        <ol className={`list-decimal pl-5 space-y-2 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          {entity.commonCauses.map((cause, i) => <li key={i}>{cause}</li>)}
        </ol>
      </section>

      {/* Step-by-step diagnosis */}
      <section id="diagnosis" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Step-by-Step Diagnosis</h2>
        <ol className={`list-decimal pl-5 space-y-4 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Check the client logs.</strong>{" "}
            Open the client dev tools or log file and look for startup errors or JSON parse failures.
          </li>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Verify the server starts manually.</strong>{" "}
            Run the server command in a terminal and confirm it prints no errors before waiting for input.
          </li>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Use MCP Inspector.</strong>{" "}
            Run <code className="font-mono text-[11px] bg-white/5 px-1 rounded">npx @modelcontextprotocol/inspector</code> and connect to the server to inspect capabilities.
          </li>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Validate credentials.</strong>{" "}
            Check that every required environment variable is set and has a valid value.
          </li>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Restart the client.</strong>{" "}
            Config changes only take effect after a full client restart — not just a reload.
          </li>
        </ol>
      </section>

      {/* Resolution checklist */}
      <section id="resolution" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Resolution Checklist</h2>
        <div className="space-y-2">
          {[
            "Config file syntax is valid JSON/JSONC",
            "Executable path or npx package name is correct",
            "All required environment variables are set",
            "Credentials have the required permissions/scopes",
            "Client has been fully restarted",
            "Server process has no port conflicts",
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-lg text-xs ${isDark ? "bg-white/[0.01] border border-white/5" : "bg-white border border-slate-200"}`}>
              <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span className={isDark ? "text-white/70" : "text-slate-600"}>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </ContentFamilyPageTemplate>
  );
}
