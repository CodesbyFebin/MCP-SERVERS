import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "python-vs-typescript-mcp";
const PATH = "/compare/python-vs-typescript-mcp";
const TITLE = "Python vs TypeScript for MCP Servers";
const DESCRIPTION =
  "Comparing the official MCP Python and TypeScript SDKs (v2): install, a first tool side by side, schemas from type hints vs zod, testing, and how to choose.";
const REVIEWED = "2026-09-23";
const PY = "https://github.com/modelcontextprotocol/python-sdk";
const TS = "https://github.com/modelcontextprotocol/typescript-sdk";

const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";

const ROWS: [string, string, string][] = [
  ["Install", 'uv add "mcp[cli]" (or pip)', "npm install @modelcontextprotocol/server"],
  ["Server class", "MCPServer", "McpServer"],
  ["Define a tool", "@mcp.tool() decorator on a function", "server.registerTool(name, config, handler)"],
  ["Input schema from", "Python type hints", "zod schema"],
  ["Test locally", "uv run mcp dev server.py", "npx @modelcontextprotocol/inspector node dist/server.js"],
  ["Current major", "v2 (v1.x on its own branch)", "v2, implementing 2026-07-28"],
];

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
      section={{ label: "Compare", href: "/compare" }}
      title={TITLE}
      h1="Python vs TypeScript for MCP Servers"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Both official SDKs are first-class and at version 2. Python builds the tool schema from type hints with a decorator; TypeScript uses registerTool with a zod schema and separate server and client packages. Pick the language your team and your dependencies already use: Python for data and ML libraries, TypeScript for Node services and web stacks."
      sections={[
        {
          id: "table",
          heading: "Side by side",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className={TH}></th>
                    <th className={TH}>Python SDK</th>
                    <th className={TH}>TypeScript SDK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  {ROWS.map(([k, a, b]) => (
                    <tr key={k}>
                      <td className="px-4 py-2 font-medium">{k}</td>
                      <td className="px-4 py-2 font-mono text-xs">{a}</td>
                      <td className="px-4 py-2 font-mono text-xs">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "python",
          heading: "The same tool in Python",
          body: (
            <>
              <P>From the <Ext href={PY}>Python SDK README</Ext>:</P>
              <Code>{`from mcp.server import MCPServer

mcp = MCPServer("Demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b`}</Code>
            </>
          ),
        },
        {
          id: "typescript",
          heading: "And in TypeScript",
          body: (
            <>
              <P>Adapted from the <Ext href={TS}>TypeScript SDK README</Ext> quickstart:</P>
              <Code>{`import { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';

const server = new McpServer({ name: 'demo', version: '1.0.0' });

server.registerTool(
    'add',
    {
        description: 'Add two numbers',
        inputSchema: z.object({ a: z.number(), b: z.number() })
    },
    async ({ a, b }) => ({
        content: [{ type: 'text', text: String(a + b) }]
    })
);`}</Code>
            </>
          ),
        },
        {
          id: "choose",
          heading: "How to choose",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Python</strong> when the tool wraps pandas, NumPy, ML models or other Python-only libraries.</li>
              <li><strong>TypeScript</strong> when it lives in a Node service, needs Express, Fastify or Hono middleware, or ships via npx.</li>
              <li>
                <strong>Distribution:</strong> TypeScript servers are commonly run with{" "}
                <code>npx</code>; Python servers with <code>uvx</code>. Both need the runtime on the
                user&apos;s machine for local use.
              </li>
              <li><strong>Either way:</strong> check tutorials target v2; many still show v1 imports.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "modelcontextprotocol/python-sdk README",
          url: PY,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: 'v2; uv add "mcp[cli]"; MCPServer with @mcp.tool(); type hints as schema; uv run mcp dev server.py.',
        },
        {
          source: "modelcontextprotocol/typescript-sdk README",
          url: TS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "v2 for 2026-07-28; @modelcontextprotocol/server and client packages; McpServer.registerTool with zod; middleware packages for Express, Fastify, Hono, Node HTTP.",
        },
      ]}
      faqs={[
        {
          question: "Is Python or TypeScript better for MCP?",
          answer: "Neither is better overall. Both official SDKs are at v2. Choose the language of your existing code and libraries.",
        },
        {
          question: "How are tool schemas defined in each?",
          answer: "Python generates them from type hints; TypeScript from a zod schema.",
        },
        {
          question: "Can a Python client use a TypeScript server?",
          answer: "Yes. MCP is a wire protocol, so any conforming client and server interoperate.",
        },
        {
          question: "Which is faster?",
          answer: "We have not benchmarked them. For most servers, latency is dominated by the APIs and databases the tools call.",
        },
        {
          question: "What about Java?",
          answer: "There is an official Java SDK too, maintained with Spring AI.",
        },
      ]}
      related={[
        { href: "/sdk/typescript", label: "MCP TypeScript SDK" },
        { href: "/sdk/java", label: "MCP Java SDK" },
        { href: "/glossary/mcp-tool-input-schema", label: "Tool inputSchema" },
        { href: "/complete-guide-mcp-servers", label: "The complete guide to MCP servers" },
      ]}
    />
  );
}
