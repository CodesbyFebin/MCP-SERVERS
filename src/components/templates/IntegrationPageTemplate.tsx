"use client";

/**
 * IntegrationPageTemplate
 * Renders the full Integration Guide layout for /integrations/[slug]/
 * Sections match the spec: What Is, What You Can Do, How It Works, Prerequisites,
 * Installation, Client Configuration, Authentication, Available Tools,
 * Complete Example, Testing, Security, Common Errors, Alternatives, FAQ.
 */

import Link from "next/link";
import { useTheme } from "../ThemeAndAuthProvider";
import ContentFamilyPageTemplate from "../ContentFamilyPageTemplate";
import type { IntegrationEntity } from "../../data/entities";
import { getUnifiedGraphSchema } from "../../lib/schema";
import {
  CheckCircle, Terminal, Lock, Key, AlertTriangle,
  Zap, GitBranch, Package, Globe, ExternalLink,
} from "lucide-react";

const BASE = "https://www.mcpserver.in";

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <section id={id} className="space-y-4">
      <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({ code, lang = "json" }: { code: string; lang?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <pre className={`p-4 rounded-xl border font-mono text-[11px] overflow-x-auto leading-relaxed ${
      isDark ? "bg-black text-cyan-300 border-white/5" : "bg-slate-100 text-slate-800 border-slate-200"
    }`}>
      <code>{code}</code>
    </pre>
  );
}

function ErrorTable({ rows }: { rows: { error: string; cause: string; fix: string }[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cellCls = `px-3 py-2 text-xs ${isDark ? "text-white/70" : "text-slate-700"}`;
  const hdrCls = `px-3 py-2 text-xs font-semibold ${isDark ? "text-white/40" : "text-slate-500"}`;
  return (
    <div className="overflow-x-auto rounded-xl border border-white/5">
      <table className="w-full min-w-[560px]">
        <thead className={isDark ? "bg-white/[0.02]" : "bg-slate-50"}>
          <tr>
            <th className={hdrCls}>Error</th>
            <th className={hdrCls}>Likely Cause</th>
            <th className={hdrCls}>Fix</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={isDark ? "border-t border-white/5" : "border-t border-slate-100"}>
              <td className={`${cellCls} font-mono text-[10px] text-rose-400`}>{r.error}</td>
              <td className={cellCls}>{r.cause}</td>
              <td className={cellCls}>{r.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface IntegrationPageTemplateProps {
  entity: IntegrationEntity;
  faqItems?: { question: string; answer: string }[];
}

export default function IntegrationPageTemplate({ entity, faqItems = [] }: IntegrationPageTemplateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `${entity.name} MCP Server: Setup, Configuration and Examples`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "Integrations", item: "/integrations" },
      { name: `${entity.name} MCP Server`, item: entity.route },
    ],
    faq: faqItems,
    softwareApplication: {
      name: `${entity.name} MCP Server`,
      description: entity.metaDescription,
    },
    article: {
      title: `${entity.name} MCP Server: Complete Integration Guide`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  const sidebarItems = [
    { label: "Type", value: "MCP Integration" },
    { label: "Platform", value: entity.platform },
    { label: "Category", value: entity.platformCategory },
    { label: "Transport", value: entity.transports.join(", ") },
    { label: "Auth", value: entity.authMethods.join(", ") },
    { label: "Remote", value: entity.remoteSupport ? "Yes" : "Local only" },
    { label: "Maintenance", value: entity.maintenanceStatus },
    { label: "Last verified", value: entity.lastVerified },
  ];

  const relatedLinks = entity.relatedIntegrations.map((s) => ({
    label: `${s.replace(/-mcp-server$/, "").replace(/-/g, " ")} MCP Server`,
    href: `/integrations/${s}/`,
  }));

  relatedLinks.push(
    { label: "MCP Server Security", href: "/security/" },
    { label: "Troubleshoot MCP Connection", href: "/troubleshooting/mcp-server-not-connecting/" },
    { label: "What Is an MCP Server?", href: "/glossary/mcp-server/" },
  );

  const claudeConfigExample = `{
  "mcpServers": {
    "${entity.slug.replace(/-mcp-server$/, "")}": {
      "command": "node",
      "args": ["/absolute/path/to/${entity.slug}/server.js"],
      "env": {
        "${entity.platform.toUpperCase().replace(/ /g, "_")}_API_KEY": "YOUR_KEY_HERE"
      }
    }
  }
}`;

  const jsonRpcExample = `{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "${entity.tools[0] ?? "execute"}",
    "arguments": {}
  },
  "id": 1
}`;

  const commonErrors = [
    { error: "Server not found", cause: "Incorrect command or path", fix: "Verify the npx package name or executable path" },
    { error: "Connection failed", cause: "Transport mismatch", fix: `Confirm ${entity.transports[0]} transport is configured` },
    { error: "Tools not visible", cause: "Capability negotiation failed", fix: "Restart the client after adding the server config" },
    { error: "Authentication failed", cause: "Missing or invalid token", fix: "Check the environment variable name and token scope" },
    { error: "Timeout", cause: "Slow external service or network", fix: "Add timeout and retry handling in your config" },
  ];

  return (
    <ContentFamilyPageTemplate
      h1={`${entity.name} MCP Server: Complete Integration Guide`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "Integrations", href: "/integrations" },
        { name: `${entity.name} MCP Server`, href: entity.route },
      ]}
      badge="Integration Guide"
      sidebarItems={sidebarItems}
      relatedLinks={relatedLinks}
      faqs={faqItems}
      author="MCPServer.in Editorial"
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      citations={entity.officialDocs ? [{ label: `${entity.name} Official Documentation`, url: entity.officialDocs }] : []}
      schema={schema}
    >
      {/* 1. What Is */}
      <Section title={`What Is the ${entity.name} MCP Server?`} id="what-is">
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
          The {entity.name} MCP server is a{" "}
          <Link href="/glossary/mcp-server/" className="text-cyan-500 hover:underline">Model Context Protocol server</Link>{" "}
          that connects{" "}
          <Link href="/glossary/mcp-client/" className="text-cyan-500 hover:underline">MCP clients</Link>{" "}
          such as{" "}
          {entity.supportedClients.slice(0, 2).map((c, i) => (
            <span key={c}>
              <Link href={`/clients/${c.toLowerCase().replace(/ /g, "-")}/`} className="text-cyan-500 hover:underline">{c}</Link>
              {i < 1 && " and "}
            </span>
          ))}{" "}
          to {entity.platform}. It exposes {entity.tools.length} tools
          {entity.resources.length > 0 ? ` and ${entity.resources.length} resources` : ""} through the{" "}
          <Link href="/glossary/stdio/" className="text-cyan-500 hover:underline">{entity.transports[0]} transport</Link>.
        </p>
      </Section>

      {/* 2. What You Can Do */}
      <Section title="What You Can Do with This Integration" id="capabilities">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entity.tools.map((tool, i) => (
            <div key={i} className={`p-3 rounded-xl border flex items-start gap-2 ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"}`}>
              <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
              <span className={`text-xs ${isDark ? "text-white/70" : "text-slate-600"}`}>
                <code className="font-mono">{tool}</code>
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. How It Works */}
      <Section title="How the Integration Works" id="how-it-works">
        <div className={`p-5 rounded-xl border font-mono text-xs leading-loose ${isDark ? "bg-black border-white/5 text-white/60" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
          <p>User</p>
          <p className="ml-4">↓</p>
          <p className="ml-4"><Link href="/glossary/mcp-host/" className="text-cyan-500 hover:underline">MCP Host</Link> ({entity.supportedClients[0]})</p>
          <p className="ml-8">↓</p>
          <p className="ml-8"><Link href="/glossary/mcp-client/" className="text-cyan-500 hover:underline">MCP Client</Link></p>
          <p className="ml-12">↓</p>
          <p className="ml-12"><Link href={`/glossary/${entity.transports[0]}/`} className="text-cyan-500 hover:underline">{entity.transports[0]} Transport</Link></p>
          <p className="ml-16">↓</p>
          <p className="ml-16"><strong className="text-cyan-400">{entity.name} MCP Server</strong></p>
          <p className="ml-20">↓</p>
          <p className="ml-20">{entity.platform} API</p>
        </div>
      </Section>

      {/* 4. Prerequisites */}
      <Section title="Prerequisites" id="prerequisites">
        <ul className={`list-disc pl-5 space-y-1 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>Node.js 18+ or Python 3.12+</li>
          <li>A {entity.platform} account with API access</li>
          <li>One of: {entity.supportedClients.join(", ")}</li>
          <li>{entity.authMethods.includes("oauth2") ? "OAuth 2.0 credentials" : "An API key or Personal Access Token"}</li>
          {entity.remoteSupport && <li>A public HTTPS endpoint for remote Streamable HTTP deployment</li>}
        </ul>
      </Section>

      {/* 5. Installation */}
      <Section title="Installation" id="installation">
        <ol className={`list-decimal pl-5 space-y-3 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>Ensure Node.js 18+ is installed: <code className="font-mono text-[11px] bg-white/5 px-1 rounded">node --version</code></li>
          <li>Install the server from its official package or repository:
            <CodeBlock code={entity.officialRepo ? `git clone ${entity.officialRepo}` : "# Follow the maintainer's official installation instructions for this MCP server"} lang="bash" />
          </li>
          <li>Set your credentials as environment variables:
            <CodeBlock code={`export ${entity.platform.toUpperCase().replace(/ /g, "_")}_API_KEY="your-key-here"`} lang="bash" />
          </li>
          <li>Test the server starts correctly:
            <CodeBlock code={`node /absolute/path/to/${entity.slug}/server.js --help`} lang="bash" />
          </li>
        </ol>
      </Section>

      {/* 6. Client Configuration */}
      <Section title="Client Configuration" id="client-configuration">
        <p className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          Add the server to your{" "}
          <Link href="/clients/claude-desktop/" className="text-cyan-500 hover:underline">Claude Desktop</Link>{" "}
          or{" "}
          <Link href="/clients/cursor/" className="text-cyan-500 hover:underline">Cursor</Link>{" "}
          configuration file:
        </p>
        <CodeBlock code={claudeConfigExample} />
        <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
          Restart the client after saving. The {entity.name} tools should appear in the tool palette.
        </p>
      </Section>

      {/* 7. Authentication */}
      <Section title="Authentication" id="authentication">
        <div className={`p-4 rounded-xl border ${isDark ? "bg-amber-950/20 border-amber-900/30" : "bg-amber-50 border-amber-200"}`}>
          <div className="flex items-start gap-2">
            <Key className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className={`text-xs font-semibold mb-1 ${isDark ? "text-amber-300" : "text-amber-800"}`}>
                Auth method: {entity.authMethods.join(" / ")}
              </p>
              <p className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                {entity.authMethods.includes("oauth2")
                  ? `This server uses OAuth 2.0. The client initiates the flow and stores the refresh token securely. Never expose access tokens in config files.`
                  : `This server uses a ${entity.authMethods[0]}. Store it as an environment variable, never hardcode it in configuration files.`}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Available Tools */}
      <Section title="Available Tools" id="tools">
        <div className="space-y-2">
          {entity.tools.map((tool, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border text-xs ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"}`}>
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <code className={`font-mono flex-1 ${isDark ? "text-cyan-300" : "text-slate-700"}`}>{tool}</code>
            </div>
          ))}
          {entity.resources.map((res, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border text-xs ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"}`}>
              <Package className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <code className={`font-mono flex-1 ${isDark ? "text-violet-300" : "text-slate-700"}`}>{res}</code>
              <span className={`text-[10px] ${isDark ? "text-white/30" : "text-slate-400"}`}>resource</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 9. Complete Example */}
      <Section title="Complete Example" id="example">
        <CodeBlock code={jsonRpcExample} />
      </Section>

      {/* 10. Testing */}
      <Section title="Testing the Connection" id="testing">
        <ol className={`list-decimal pl-5 space-y-2 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>Start the server and check for no startup errors in your client logs.</li>
          <li>Open the MCP Inspector: <code className="font-mono text-[11px] bg-white/5 px-1 rounded">npx @modelcontextprotocol/inspector</code></li>
          <li>Connect to <code className="font-mono text-[11px]">stdio</code> and verify all listed tools appear.</li>
          <li>Call the first tool with minimal arguments and confirm a valid response.</li>
        </ol>
      </Section>

      {/* 11. Security */}
      <Section title="Security Considerations" id="security">
        <div className={`p-5 rounded-xl border space-y-3 ${isDark ? "bg-red-950/10 border-red-900/20" : "bg-red-50 border-red-100"}`}>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-500" />
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-red-400" : "text-red-700"}`}>Security Checklist</h3>
          </div>
          <ul className={`list-disc pl-5 space-y-1.5 text-xs ${isDark ? "text-white/60" : "text-slate-700"}`}>
            {entity.securityNotes.map((note, i) => <li key={i}>{note}</li>)}
            <li>Require human confirmation before any destructive tool call.</li>
            <li>Log all tool invocations with timestamps and user identity.</li>
            <li>Rotate credentials every 90 days or immediately after suspected exposure.</li>
          </ul>
        </div>
        <p className={`text-xs mt-2 ${isDark ? "text-white/50" : "text-slate-500"}`}>
          See the full{" "}
          <Link href="/security/prompt-injection/" className="text-cyan-500 hover:underline">MCP prompt injection guide</Link>
          {" "}and{" "}
          <Link href="/security/authentication/" className="text-cyan-500 hover:underline">authentication guide</Link>
          {" "}for detailed coverage.
        </p>
      </Section>

      {/* 12. Common Errors */}
      <Section title="Common Errors" id="common-errors">
        <ErrorTable rows={commonErrors} />
        <p className={`text-xs mt-2 ${isDark ? "text-white/50" : "text-slate-500"}`}>
          Full diagnostics:{" "}
          <Link href="/troubleshooting/mcp-server-not-connecting/" className="text-cyan-500 hover:underline">
            MCP server not connecting
          </Link>{" "}
          ·{" "}
          <Link href="/troubleshooting/mcp-tools-not-appearing/" className="text-cyan-500 hover:underline">
            tools not appearing
          </Link>
        </p>
      </Section>

      {/* 13. Alternatives */}
      <Section title="Alternatives" id="alternatives">
        <ul className={`space-y-2 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          {entity.relatedIntegrations.map((s, i) => (
            <li key={i}>
              <Link href={`/integrations/${s}/`} className="text-cyan-500 hover:underline">
                {s.replace(/-mcp-server$/, "").replace(/-/g, " ")} MCP Server
              </Link>
            </li>
          ))}
          <li>Direct {entity.platform} REST API — no MCP required but no AI-native discovery.</li>
        </ul>
      </Section>
    </ContentFamilyPageTemplate>
  );
}
