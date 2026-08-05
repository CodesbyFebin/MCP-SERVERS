"use client";

import Link from "next/link";
import { useTheme } from "../ThemeAndAuthProvider";
import ContentFamilyPageTemplate from "../ContentFamilyPageTemplate";
import type { ClientEntity } from "../../data/entities";
import { getUnifiedGraphSchema } from "../../lib/schema";
import { CheckCircle, Settings, Terminal, AlertTriangle } from "lucide-react";

function CodeBlock({ code }: { code: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <pre className={`p-4 rounded-xl border font-mono text-[11px] overflow-x-auto leading-relaxed ${
      isDark ? "bg-black text-cyan-300 border-white/5" : "bg-slate-100 text-slate-800 border-slate-200"
    }`}><code>{code}</code></pre>
  );
}

export interface ClientPageTemplateProps {
  entity: ClientEntity;
  faqItems?: { question: string; answer: string }[];
}

export default function ClientPageTemplate({ entity, faqItems = [] }: ClientPageTemplateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `How to Configure MCP Servers in ${entity.name}`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "Clients", item: "/clients" },
      { name: entity.name, item: entity.route },
    ],
    faq: faqItems,
    article: {
      title: `How to Configure MCP Servers in ${entity.name}`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  const configExample = entity.configFormat === "json"
    ? `{
  "mcpServers": {
    "example-server": {
      "command": "npx",
      "args": ["-y", "@mcp/example-server"],
      "env": {
        "API_KEY": "your-key-here"
      }
    }
  }
}`
    : `{
  // .vscode/mcp.json
  "servers": {
    "example-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@mcp/example-server"]
    }
  }
}`;

  const sidebarItems = [
    { label: "Vendor", value: entity.vendor },
    { label: "Client Type", value: entity.clientType },
    { label: "Transports", value: entity.supportedTransports.join(", ") },
    { label: "Config Format", value: entity.configFormat },
    ...(entity.configPath ? [{ label: "Config Path", value: <code className="text-[10px] font-mono">{entity.configPath}</code> }] : []),
    { label: "Features", value: entity.mcpFeatures.join(", ") },
  ];

  const relatedLinks = [
    ...entity.relatedClients.map((c) => ({
      label: `Configure MCP in ${c.replace(/-/g, " ")}`,
      href: `/clients/${c}/`,
    })),
    { label: "MCP Server Not Connecting", href: "/troubleshooting/mcp-server-not-connecting/" },
    { label: "MCP Tools Not Appearing", href: "/troubleshooting/mcp-tools-not-appearing/" },
  ];

  return (
    <ContentFamilyPageTemplate
      h1={`How to Configure MCP Servers in ${entity.name}`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "Clients", href: "/clients" },
        { name: entity.name, href: entity.route },
      ]}
      badge="AI Client Guide"
      sidebarItems={sidebarItems}
      relatedLinks={relatedLinks}
      faqs={faqItems}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      citations={entity.docsUrl ? [{ label: `${entity.name} Official MCP Documentation`, url: entity.docsUrl }] : []}
      schema={schema}
    >
      {/* Overview */}
      <section id="overview" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          MCP Support in {entity.name}
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
          {entity.name} is a <strong>{entity.clientType}</strong> built by {entity.vendor}. It acts as an{" "}
          <Link href="/glossary/mcp-host/" className="text-cyan-500 hover:underline">MCP host</Link>,
          embedding an <Link href="/glossary/mcp-client/" className="text-cyan-500 hover:underline">MCP client</Link>{" "}
          that can connect to any MCP-compatible server. It supports{" "}
          {entity.supportedTransports.map((t, i) => (
            <span key={t}>
              <Link href={`/glossary/${t}/`} className="text-cyan-500 hover:underline">{t}</Link>
              {i < entity.supportedTransports.length - 1 ? " and " : ""}
            </span>
          ))}{" "}
          transport.
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {entity.mcpFeatures.map((f, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs ${isDark ? "bg-white/[0.01] border-white/5 text-white/70" : "bg-white border-slate-200 text-slate-700"}`}>
              <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* Prerequisites */}
      <section id="prerequisites" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Prerequisites</h2>
        <ul className={`list-disc pl-5 space-y-1 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>{entity.name} installed ({entity.docsUrl ? <Link href={entity.docsUrl} className="text-cyan-500 hover:underline">download</Link> : "latest version"})</li>
          <li>Node.js 18+ or the runtime required by your target MCP server</li>
          <li>An MCP server package or source code to configure</li>
          <li>API credentials for your target integration</li>
        </ul>
      </section>

      {/* Configuration */}
      <section id="configuration" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Configuration
        </h2>
        <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
          <Settings className="w-4 h-4" />
          {entity.configPath && (
            <span>Config file: <code className="font-mono bg-white/5 px-1 rounded">{entity.configPath}</code></span>
          )}
        </div>
        <CodeBlock code={configExample} />
        <ul className={`list-disc pl-5 space-y-1 text-xs ${isDark ? "text-white/60" : "text-slate-500"}`}>
          <li><code className="font-mono">command</code> — the executable (npx, node, python, uvx)</li>
          <li><code className="font-mono">args</code> — arguments passed to the server process</li>
          <li><code className="font-mono">env</code> — environment variables injected at startup</li>
        </ul>
      </section>

      {/* Testing */}
      <section id="testing" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Verifying the Connection
        </h2>
        <ol className={`list-decimal pl-5 space-y-2 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>Save the config file and fully restart {entity.name}.</li>
          <li>Look for the MCP server indicator — a hammer icon or server status badge in {entity.name}.</li>
          <li>Send a message asking the model to list available tools.</li>
          <li>Confirm all expected tools appear and a test call returns a valid response.</li>
        </ol>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Troubleshooting
        </h2>
        <div className={`p-4 rounded-xl border ${isDark ? "bg-amber-950/10 border-amber-900/20" : "bg-amber-50 border-amber-100"}`}>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <ul className={`space-y-1 text-xs ${isDark ? "text-white/70" : "text-slate-600"}`}>
              <li>Server not visible → check logs, confirm the package name, restart {entity.name}.</li>
              <li>Tools missing → verify capability negotiation; the server must expose a <code className="font-mono">tools/list</code> handler.</li>
              <li>Auth failures → check env var names match exactly.</li>
            </ul>
          </div>
        </div>
        <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
          See{" "}
          <Link href="/troubleshooting/mcp-server-not-connecting/" className="text-cyan-500 hover:underline">
            MCP server not connecting
          </Link>{" "}and{" "}
          <Link href="/troubleshooting/mcp-tools-not-appearing/" className="text-cyan-500 hover:underline">
            MCP tools not appearing
          </Link>
        </p>
      </section>
    </ContentFamilyPageTemplate>
  );
}
