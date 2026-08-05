"use client";

import Link from "next/link";
import { useTheme } from "../ThemeAndAuthProvider";
import ContentFamilyPageTemplate from "../ContentFamilyPageTemplate";
import type { SecurityEntity } from "../../data/entities";
import { getUnifiedGraphSchema } from "../../lib/schema";
import { ShieldAlert, Shield, Lock, AlertTriangle } from "lucide-react";

const SEVERITY_STYLES: Record<string, { label: string; darkCls: string; lightCls: string }> = {
  critical: { label: "Critical", darkCls: "bg-red-950/20 border-red-900/30 text-red-400", lightCls: "bg-red-50 border-red-200 text-red-700" },
  high:     { label: "High",     darkCls: "bg-orange-950/20 border-orange-900/30 text-orange-400", lightCls: "bg-orange-50 border-orange-200 text-orange-700" },
  medium:   { label: "Medium",   darkCls: "bg-amber-950/20 border-amber-900/30 text-amber-400", lightCls: "bg-amber-50 border-amber-200 text-amber-700" },
  informational: { label: "Info", darkCls: "bg-blue-950/20 border-blue-900/30 text-blue-400", lightCls: "bg-blue-50 border-blue-200 text-blue-700" },
};

export interface SecurityPageTemplateProps {
  entity: SecurityEntity;
  faqItems?: { question: string; answer: string }[];
}

export default function SecurityPageTemplate({ entity, faqItems = [] }: SecurityPageTemplateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sev = SEVERITY_STYLES[entity.severity] ?? SEVERITY_STYLES.informational;
  const sevCls = isDark ? sev.darkCls : sev.lightCls;

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `MCP Server Security: ${entity.topic} Guide`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "Security", item: "/security" },
      { name: entity.topic, item: entity.route },
    ],
    faq: faqItems,
    article: {
      title: `MCP Server Security: ${entity.topic} Guide`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  const relatedLinks = entity.relatedTopics.map((t) => ({
    label: t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: `/security/${t}/`,
  }));
  relatedLinks.push({ label: "MCP Authentication Guide", href: "/security/authentication/" });
  relatedLinks.push({ label: "What Is MCP Server?", href: "/glossary/mcp-server/" });

  return (
    <ContentFamilyPageTemplate
      h1={`MCP Server Security: ${entity.topic} Guide`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "Security", href: "/security" },
        { name: entity.topic, href: entity.route },
      ]}
      badge="Security Guide"
      sidebarItems={[
        { label: "Topic", value: entity.topic },
        { label: "Category", value: entity.threatCategory },
        { label: "Severity", value: <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${sevCls}`}>{sev.label}</span> },
      ]}
      relatedLinks={relatedLinks}
      faqs={faqItems}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      citations={[
        { label: "MCP Specification — Security Considerations", url: "https://modelcontextprotocol.io/specification/security" },
      ]}
      schema={schema}
    >
      {/* Severity banner */}
      <section id="severity" className={`p-4 rounded-xl border ${sevCls}`}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">Severity: {sev.label}</span>
        </div>
        <p className={`mt-2 text-xs leading-relaxed ${isDark ? "text-white/70" : "text-slate-700"}`}>
          This guide covers a <strong>{entity.threatCategory}</strong> class vulnerability. Review and apply mitigations before deploying any MCP server to production.
        </p>
      </section>

      {/* Threat overview */}
      <section id="threat" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Threat Overview</h2>
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
          The {entity.topic} threat affects{" "}
          <Link href="/glossary/mcp-server/" className="text-cyan-500 hover:underline">MCP servers</Link>{" "}
          at the {entity.threatCategory} layer. Because MCP servers can execute tools with access to external systems, APIs, and file systems, this class of attack can have significant blast radius if not mitigated.
        </p>
      </section>

      {/* Attack surface */}
      <section id="attack-surface" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Attack Surface</h2>
        <ul className={`list-disc pl-5 space-y-2 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>Tool call arguments received from the model layer without validation.</li>
          <li>Resource data returned from external APIs that may contain injected instructions.</li>
          <li>Environment variables and credential files accessible to the server process.</li>
          <li>Network access from the server process to internal services.</li>
        </ul>
      </section>

      {/* Mitigations */}
      <section id="mitigations" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Mitigations</h2>
        <div className="space-y-2">
          {[
            "Validate all tool arguments against strict input schemas before execution.",
            "Sanitise all external data before including it in model context.",
            "Require human-in-the-loop approval for any destructive or privileged tool call.",
            "Run the server in a sandboxed process with minimal filesystem and network access.",
            "Log every tool invocation with full arguments, timestamps, and user identity.",
            "Apply least-privilege credentials — never use admin tokens for read-only operations.",
            "Rotate all credentials on a documented schedule or immediately after a suspected incident.",
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-2 p-3 rounded-lg border text-xs ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"}`}>
              <Shield className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
              <span className={isDark ? "text-white/70" : "text-slate-600"}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related threats */}
      {entity.relatedTopics.length > 0 && (
        <section id="related-threats" className="space-y-3">
          <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Related Security Topics</h2>
          <div className="flex flex-wrap gap-2">
            {entity.relatedTopics.map((t, i) => (
              <Link key={i} href={`/security/${t}/`}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${isDark ? "border-white/10 text-white/60 hover:border-cyan-500/40 hover:text-cyan-400" : "border-slate-200 text-slate-600 hover:border-cyan-300"}`}>
                {t.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </section>
      )}
    </ContentFamilyPageTemplate>
  );
}
