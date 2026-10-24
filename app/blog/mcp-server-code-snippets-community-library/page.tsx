import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-server-code-snippets-community-library";
const TITLE = "MCP Code Snippets: Verified Starter Library";
const DESCRIPTION =
  "Copy-ready MCP snippets taken from official sources: minimal servers in Python, TypeScript and Java, client configs for Claude Desktop, Cursor and Claude Code, and remote-server bridges.";
const REVIEWED = "2026-09-23";
const PY = "https://github.com/modelcontextprotocol/python-sdk";
const TS = "https://github.com/modelcontextprotocol/typescript-sdk";
const JAVA = "https://java.sdk.modelcontextprotocol.io/latest/server/";
const CONNECT = "https://modelcontextprotocol.io/docs/develop/connect-local-servers";
const CURSOR = "https://cursor.com/docs/context/mcp";

const L = "text-blue-600 hover:underline dark:text-blue-400";

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
      h1="MCP Code Snippets Library"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="These are the snippets people copy most often, each taken from an official SDK README or vendor doc and linked to its source: a minimal server in Python, TypeScript and Java, and client configuration for Claude Desktop, Cursor and Claude Code. Check the linked source before use; SDKs change between versions."
      sections={[
        {
          id: "python",
          heading: "Minimal server: Python (SDK v2)",
          body: (
            <>
              <Code>{`from mcp.server import MCPServer

mcp = MCPServer("Demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b`}</Code>
              <P>Test it: <code>uv run mcp dev server.py</code>. Source: <Ext href={PY}>python-sdk README</Ext>.</P>
            </>
          ),
        },
        {
          id: "typescript",
          heading: "Minimal server: TypeScript (SDK v2)",
          body: (
            <>
              <Code>{`import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';

const server = new McpServer({ name: 'greeting-server', version: '1.0.0' });

server.registerTool(
    'greet',
    { description: 'Greet someone by name', inputSchema: z.object({ name: z.string() }) },
    async ({ name }) => ({ content: [{ type: 'text', text: \`Hello, \${name}!\` }] })
);

await server.connect(new StdioServerTransport());`}</Code>
              <P>Source: <Ext href={TS}>typescript-sdk README</Ext> (condensed).</P>
            </>
          ),
        },
        {
          id: "java",
          heading: "Minimal server: Java",
          body: (
            <>
              <Code>{`StdioServerTransportProvider transportProvider =
    new StdioServerTransportProvider(McpJsonDefaults.getMapper());

McpSyncServer server = McpServer.sync(transportProvider)
    .serverInfo("my-server", "1.0.0")
    .capabilities(ServerCapabilities.builder().tools(true).build())
    .toolCall(
        Tool.builder("echo", schema).description("Echoes input").build(),
        (exchange, request) -> CallToolResult.builder()
            .content(List.of(new McpSchema.TextContent(
                request.arguments().get("text").toString())))
            .build())
    .build();`}</Code>
              <P>Source: <Ext href={JAVA}>Java SDK server guide</Ext>.</P>
            </>
          ),
        },
        {
          id: "claude",
          heading: "Claude Desktop: local server",
          body: (
            <>
              <Code>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/Desktop"]
    }
  }
}`}</Code>
              <P>Source: <Ext href={CONNECT}>Connect to local MCP servers</Ext>. Use absolute paths and fully restart the app.</P>
            </>
          ),
        },
        {
          id: "remote",
          heading: "Remote server from a stdio-only client",
          body: (
            <>
              <Code>{`{
  "mcpServers": {
    "remote": {
      "command": "npx",
      "args": ["mcp-remote", "https://example.com/mcp"]
    }
  }
}`}</Code>
              <P>
                Pin a patched mcp-remote version (0.1.16 or later); see{" "}
                <Link href="/glossary/cve-management" className={L}>CVE management</Link>.
              </P>
            </>
          ),
        },
        {
          id: "cursor",
          heading: "Cursor: env from your shell",
          body: (
            <>
              <Code>{`{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "mcp-server"],
      "env": { "API_KEY": "\${env:API_KEY}" }
    }
  }
}`}</Code>
              <P>Source: <Ext href={CURSOR}>Cursor MCP docs</Ext>.</P>
            </>
          ),
        },
        {
          id: "cc",
          heading: "Claude Code: add a remote HTTP server",
          body: (
            <>
              <Code>{`claude mcp add --transport http dhan https://mcp.dhan.co/mcp`}</Code>
              <P>
                Example from Dhan&apos;s docs; see our{" "}
                <Link href="/blog/dhan-mcp-fo-trading" className={L}>Dhan MCP page</Link>.
              </P>
            </>
          ),
        },
      ]}
      evidence={[
        { source: "modelcontextprotocol/python-sdk README", url: PY, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "MCPServer quickstart and uv run mcp dev." },
        { source: "modelcontextprotocol/typescript-sdk README", url: TS, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "McpServer, registerTool, zod/v4, StdioServerTransport quickstart.", limitations: "Condensed here; top-level await requires an ES module setup." },
        { source: "MCP Java SDK: Server", url: JAVA, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Synchronous stdio server example." },
        { source: "MCP docs: Connect to local MCP servers", url: CONNECT, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Filesystem server Claude Desktop config." },
        { source: "Cursor docs: MCP", url: CURSOR, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "mcp.json with env interpolation." },
      ]}
      faqs={[
        { question: "Are these snippets official?", answer: "Each comes from an official SDK README or vendor doc, linked beside it. The TypeScript one is condensed." },
        { question: "Why does my copied snippet fail with import errors?", answer: "It may target a different SDK major version. These are v2 for Python and TypeScript." },
        { question: "Where does claude_desktop_config.json live?", answer: "~/Library/Application Support/Claude on macOS and %APPDATA%\\Claude on Windows." },
        { question: "How do I test a server without a client?", answer: "Use the MCP Inspector, for example uv run mcp dev server.py for Python." },
        { question: "Can I contribute snippets?", answer: "We only publish snippets we can trace to an official source. Send us the source link." },
      ]}
      related={[
        { href: "/compare/python-vs-typescript-mcp", label: "Python vs TypeScript for MCP" },
        { href: "/sdk/typescript", label: "MCP TypeScript SDK" },
        { href: "/glossary/mcp-cursor-editor", label: "MCP in Cursor" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
      ]}
    />
  );
}
