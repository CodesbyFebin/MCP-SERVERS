"use client";

import Link from "next/link";
import { useTheme } from "../ThemeAndAuthProvider";
import ContentFamilyPageTemplate from "../ContentFamilyPageTemplate";
import type { DeploymentEntity } from "../../data/entities";
import { getUnifiedGraphSchema } from "../../lib/schema";
import { Cloud, CheckCircle, Terminal, Lock } from "lucide-react";

const DIFFICULTY_BADGE: Record<string, string> = {
  beginner: "bg-emerald-950/20 text-emerald-400 border-emerald-900/30",
  intermediate: "bg-amber-950/20 text-amber-400 border-amber-900/30",
  advanced: "bg-red-950/20 text-red-400 border-red-900/30",
};

function CodeBlock({ code }: { code: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <pre className={`p-4 rounded-xl border font-mono text-[11px] overflow-x-auto leading-relaxed ${isDark ? "bg-black text-cyan-300 border-white/5" : "bg-slate-100 text-slate-800 border-slate-200"}`}>
      <code>{code}</code>
    </pre>
  );
}

export interface DeploymentPageTemplateProps {
  entity: DeploymentEntity;
  faqItems?: { question: string; answer: string }[];
}

export default function DeploymentPageTemplate({ entity, faqItems = [] }: DeploymentPageTemplateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `How to Deploy an MCP Server on ${entity.platform}`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "Deployment", item: "/deployment" },
      { name: entity.platform, item: entity.route },
    ],
    faq: faqItems,
    article: {
      title: `How to Deploy an MCP Server on ${entity.platform}`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  const dockerfileExample = entity.platform === "Docker" ? `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]` : `# Deploy to ${entity.platform}
# See full guide for platform-specific commands`;

  const relatedLinks = entity.relatedPlatforms.map((p) => ({
    label: `Deploy on ${p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
    href: `/deployment/${p}/`,
  }));
  relatedLinks.push({ label: "MCP Server Security", href: "/security/" });
  relatedLinks.push({ label: "Streamable HTTP Transport", href: "/glossary/streamable-http/" });

  return (
    <ContentFamilyPageTemplate
      h1={`How to Deploy an MCP Server on ${entity.platform}`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "Deployment", href: "/deployment" },
        { name: entity.platform, href: entity.route },
      ]}
      badge="Deployment Guide"
      sidebarItems={[
        { label: "Platform", value: entity.platform },
        { label: "Type", value: entity.platformType },
        { label: "Transports", value: entity.supportedTransports.join(", ") },
        { label: "Auth required", value: entity.authRequired ? "Yes" : "No" },
        { label: "Difficulty", value: <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${DIFFICULTY_BADGE[entity.difficultyLevel]}`}>{entity.difficultyLevel}</span> },
      ]}
      relatedLinks={relatedLinks}
      faqs={faqItems}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      schema={schema}
    >
      {/* Overview */}
      <section id="overview" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Deploying to {entity.platform}
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
          This guide covers deploying a{" "}
          <Link href="/glossary/mcp-server/" className="text-cyan-500 hover:underline">Model Context Protocol server</Link>{" "}
          on {entity.platform} using the{" "}
          {entity.supportedTransports.map((t, i) => (
            <span key={t}>
              <Link href={`/glossary/${t}/`} className="text-cyan-500 hover:underline">{t}</Link>
              {i < entity.supportedTransports.length - 1 ? " or " : ""}
            </span>
          ))}{" "}
          transport. This deployment model is <strong>{entity.difficultyLevel}</strong> difficulty.
        </p>
      </section>

      {/* Prerequisites */}
      <section id="prerequisites" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Prerequisites</h2>
        <ul className={`list-disc pl-5 space-y-1 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          {entity.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
          {entity.authRequired && <li>OAuth 2.0 credentials or an API key for the server</li>}
        </ul>
      </section>

      {/* Deployment steps */}
      <section id="deployment" className="space-y-4">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Deployment Steps</h2>
        <ol className={`list-decimal pl-5 space-y-4 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Prepare your server build.</strong>{" "}
            Ensure your MCP server builds cleanly: <code className="font-mono text-[11px] bg-white/5 px-1 rounded">npm run build</code>
          </li>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Write the configuration.</strong>
            <CodeBlock code={dockerfileExample} />
          </li>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Set environment variables.</strong>{" "}
            Never bake secrets into container images or deployment configs. Use the platform's secret management system.
          </li>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Deploy and verify.</strong>{" "}
            After deployment, test the{" "}
            <Link href="/glossary/streamable-http/" className="text-cyan-500 hover:underline">Streamable HTTP</Link>{" "}
            endpoint responds with a valid MCP response.
          </li>
          <li>
            <strong className={isDark ? "text-white/90" : "text-slate-800"}>Configure your client.</strong>{" "}
            Add the deployed server URL to your{" "}
            <Link href="/clients/claude-desktop/" className="text-cyan-500 hover:underline">client configuration</Link>.
          </li>
        </ol>
      </section>

      {/* Security */}
      <section id="security" className={`p-5 rounded-xl border space-y-2 ${isDark ? "bg-red-950/10 border-red-900/20" : "bg-red-50 border-red-100"}`}>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-red-500" />
          <h2 className={`text-sm font-bold ${isDark ? "text-red-400" : "text-red-700"}`}>Production Security Checklist</h2>
        </div>
        <ul className={`list-disc pl-5 space-y-1.5 text-xs ${isDark ? "text-white/60" : "text-slate-700"}`}>
          <li>Serve over HTTPS only — never expose MCP servers on plain HTTP.</li>
          {entity.authRequired && <li>Enforce authentication on every endpoint — no unauthenticated access.</li>}
          <li>Set <code className="font-mono">NODE_ENV=production</code> to disable debug output.</li>
          <li>Apply network egress rules to limit what the server can reach.</li>
          <li>Enable request logging and ship logs to a central SIEM.</li>
        </ul>
      </section>
    </ContentFamilyPageTemplate>
  );
}
