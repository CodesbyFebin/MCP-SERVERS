import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "phonepe-mcp-server-india";
const TITLE = "PhonePe MCP Server: Official PG Docs MCP";
const DESCRIPTION =
  "PhonePe's official MCP server gives AI coding assistants read-only access to PhonePe Payment Gateway docs. Its 10 tools, install commands, and Claude Desktop and Cursor config.";
const REVIEWED = "2026-09-23";
const REPO = "https://github.com/phonepe/phonepe-pg-docs-mcp";

const TOOLS: [string, string][] = [
  ["ask_knowledge_base", "Any product, feature, API or error question in natural language"],
  ["list_products", "All live PhonePe PG products, and which need special permission"],
  ["get_feature_support", "Whether PhonePe supports a feature (refunds, recurring, international, EMI and others)"],
  ["get_error_code_info", "HTTP status, cause and resolution for a PhonePe error code"],
  ["search_docs", "Keyword search across all 241 documentation sections"],
  ["list_doc_sections", "Browse the list of available documentation sections"],
  ["get_section_content", "Fetch the full content of one documentation section"],
  ["get_api_endpoints", "The API endpoint reference table"],
  ["get_prerequisites", "Setup checklist for each integration type"],
  ["get_environments", "Sandbox and production base URLs"],
];

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in/blog/${SLUG}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      title={TITLE}
      h1="PhonePe MCP Server (Payment Gateway Docs)"
      description={DESCRIPTION}
      status="official-docs-only"
      reviewedAt={REVIEWED}
      directAnswer="PhonePe publishes an official MCP server, phonepe-pg-docs-mcp, but it is a documentation server, not a payments server. It gives an AI coding assistant read-only access to the PhonePe Payment Gateway developer docs and a curated knowledge base. It needs no PhonePe credentials and does not connect to any merchant account."
      sections={[
        {
          id: "what",
          heading: "What it is for",
          body: (
            <>
              <P>
                PhonePe publishes the server on GitHub at{" "}
                <Ext href={REPO}>phonepe/phonepe-pg-docs-mcp</Ext> under the Apache License 2.0.
                It helps developers integrating PhonePe Payment Gateway get answers from the
                official docs without leaving their editor. Ask your assistant which products
                need special permission, what an error code means, or which base URL to use in
                sandbox, and it looks the answer up through the server.
              </P>
              <P>
                It does not create payments, read transactions, or touch any merchant account.
                To take payments you still integrate the PhonePe PG APIs yourself.
              </P>
            </>
          ),
        },
        {
          id: "tools",
          heading: "The 10 tools it exposes",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      Tool
                    </th>
                    <th className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      What it returns
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {TOOLS.map(([name, what]) => (
                    <tr key={name}>
                      <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">{name}</td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "install",
          heading: "Install and run",
          body: (
            <>
              <P>
                Requirements: Python 3.10 or later. No API keys. It runs locally over stdio.
                Run it with <code>uvx</code>:
              </P>
              <Code>uvx --from phonepe-pg-docs-mcp phonepe-pg-docs</Code>
              <P>Or install it with pip:</P>
              <Code>{`pip install phonepe-pg-docs-mcp
phonepe-pg-docs`}</Code>
            </>
          ),
        },
        {
          id: "config",
          heading: "Claude Desktop and Cursor config",
          body: (
            <>
              <P>The same block works for both clients:</P>
              <Code>{`{
  "mcpServers": {
    "phonepe-pg-docs": {
      "command": "uvx",
      "args": ["--from", "phonepe-pg-docs-mcp", "phonepe-pg-docs"]
    }
  }
}`}</Code>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  Claude Desktop on macOS:{" "}
                  <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>
                </li>
                <li>
                  Claude Desktop on Windows: <code>%APPDATA%\Claude\claude_desktop_config.json</code>
                </li>
                <li>
                  Cursor: <code>~/.cursor/mcp.json</code> (all projects) or{" "}
                  <code>.cursor/mcp.json</code> (one project)
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "how",
          heading: "How it answers",
          body: (
            <>
              <P>Lookups go through three tiers, fastest first:</P>
              <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
                <li>Curated YAML answers for common questions</li>
                <li>SQLite full-text search (FTS5) over 241 indexed doc sections</li>
                <li>A live fetch of the docs site as a fallback</li>
              </ol>
              <P>
                Pages fetched live are cached. The <code>PHONEPE_DOCS_CACHE_TTL_SECONDS</code>{" "}
                environment variable sets the cache lifetime; the default is 3600 seconds.
              </P>
            </>
          ),
        },
      ]}
      evidence={[
        {
          source: "phonepe/phonepe-pg-docs-mcp (GitHub)",
          url: REPO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Official PhonePe repository. 10 tools listed; stdio transport; no credentials; read-only; Python 3.10+; Apache License 2.0; Claude Desktop and Cursor config documented.",
          limitations:
            "Covers documentation only. The 241 indexed sections are a snapshot; live fetch is a fallback.",
        },
      ]}
      faqs={[
        {
          question: "Can the PhonePe MCP server make or check payments?",
          answer:
            "No. It is read-only and only answers questions from PhonePe Payment Gateway documentation. It does not connect to a merchant account.",
        },
        {
          question: "Do I need a PhonePe API key or merchant ID?",
          answer: "No. The repository states that no credentials are required.",
        },
        {
          question: "Is it official?",
          answer:
            "Yes. It is published by PhonePe at github.com/phonepe/phonepe-pg-docs-mcp under the Apache License 2.0.",
        },
        {
          question: "Which AI clients does it work with?",
          answer:
            "Any MCP client that can launch a local stdio server. The repository documents setup for Claude Desktop and Cursor.",
        },
        {
          question: "How current is the documentation it uses?",
          answer:
            "It searches a pre-indexed snapshot of 241 doc sections first and falls back to fetching the live docs. Live results are cached for PHONEPE_DOCS_CACHE_TTL_SECONDS, 3600 seconds by default.",
        },
      ]}
      related={[
        { href: "/clients/claude-desktop", label: "Using MCP servers in Claude Desktop" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/blog/zomato-mcp-india", label: "Zomato's official MCP server" },
        { href: "/learn/mcp-server", label: "What is an MCP server?" },
      ]}
    />
  );
}
