import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-cursor-editor";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP in Cursor: mcp.json Setup Explained";
const DESCRIPTION =
  "How Cursor uses MCP: project and global mcp.json, stdio vs remote servers, env and header config, variable interpolation, OAuth redirect URLs, and tool approval.";
const REVIEWED = "2026-09-23";
const DOCS = "https://cursor.com/docs/context/mcp";

const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in${PATH}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      path={PATH}
      section={{ label: "Glossary", href: "/glossary" }}
      title={TITLE}
      h1="MCP in the Cursor Editor"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Cursor is an MCP client. You add servers in .cursor/mcp.json inside a project, or ~/.cursor/mcp.json for all projects. Local servers use command, args and env; remote servers use url and optional headers. Cursor supports stdio, SSE and Streamable HTTP, and by default asks for approval before it runs an MCP tool."
      sections={[
        {
          id: "files",
          heading: "Where the config lives",
          body: (
            <ul className={UL}>
              <li><code>.cursor/mcp.json</code> in a project: servers for that project only</li>
              <li><code>~/.cursor/mcp.json</code>: servers available in every project</li>
            </ul>
          ),
        },
        {
          id: "examples",
          heading: "Config examples",
          body: (
            <>
              <P>A local stdio server:</P>
              <Code>{`{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "mcp-server"],
      "env": { "API_KEY": "\${env:API_KEY}" }
    }
  }
}`}</Code>
              <P>A remote server:</P>
              <Code>{`{
  "mcpServers": {
    "server-name": {
      "url": "https://example.com/mcp",
      "headers": { "API_KEY": "value" }
    }
  }
}`}</Code>
              <P>
                Interpolation keeps secrets out of the file: <code>{"${env:NAME}"}</code>,{" "}
                <code>{"${userHome}"}</code>, <code>{"${workspaceFolder}"}</code>,{" "}
                <code>{"${workspaceFolderBasename}"}</code> and <code>{"${pathSeparator}"}</code>.
              </P>
            </>
          ),
        },
        {
          id: "oauth",
          heading: "OAuth",
          body: (
            <P>
              Remote servers that use OAuth work through dynamic client registration. For
              providers that need a fixed client ID and whitelisted redirect URL, you can put static
              OAuth client credentials in <code>mcp.json</code>. Cursor&apos;s redirect URLs are{" "}
              <code>http://localhost:8787/callback</code> for the desktop app and{" "}
              <code>https://www.cursor.com/agents/mcp/oauth/callback</code> for web and agents.
            </P>
          ),
        },
        {
          id: "approval",
          heading: "Approval and run modes",
          body: (
            <P>
              Per the <Ext href={DOCS}>Cursor docs</Ext>, Cursor asks before using MCP tools by
              default, and MCP tools follow the same run modes as terminal commands, where
              allowlisted tools can run without asking. Servers can be toggled off without deleting
              their config. Only allowlist read-only tools you trust.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Cursor docs: Model Context Protocol",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Project .cursor/mcp.json and global ~/.cursor/mcp.json; stdio, SSE and Streamable HTTP; command/args/env and url/headers examples; interpolation variables; static OAuth credentials and redirect URLs; approval by default and run modes; toggling servers.",
        },
      ]}
      faqs={[
        {
          question: "Where is Cursor's MCP config file?",
          answer: ".cursor/mcp.json in a project, or ~/.cursor/mcp.json for all projects.",
        },
        {
          question: "Does Cursor support remote MCP servers?",
          answer: "Yes, over SSE and Streamable HTTP, using a url entry.",
        },
        {
          question: "How do I avoid putting API keys in mcp.json?",
          answer: "Use interpolation such as ${env:API_KEY} to read them from your environment.",
        },
        {
          question: "Will Cursor run MCP tools without asking?",
          answer: "Not by default. It asks for approval unless a tool is allowlisted under your run mode.",
        },
        {
          question: "What OAuth redirect URL does Cursor use?",
          answer: "http://localhost:8787/callback for desktop and https://www.cursor.com/agents/mcp/oauth/callback for web and agents.",
        },
      ]}
      related={[
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
