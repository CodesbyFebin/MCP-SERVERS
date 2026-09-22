import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "typescript";
const PATH = "/sdk/typescript";
const TITLE = "MCP TypeScript SDK: Install and First Server";
const DESCRIPTION =
  "The official MCP TypeScript SDK v2: package names, a working stdio server with registerTool and zod, Streamable HTTP, testing with MCP Inspector, and connecting it to Claude Desktop.";
const REVIEWED = "2026-09-23";
const REPO = "https://github.com/modelcontextprotocol/typescript-sdk";
const CONNECT = "https://modelcontextprotocol.io/docs/develop/connect-local-servers";

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
      section={{ label: "Developer", href: "/developer" }}
      title={TITLE}
      h1="MCP TypeScript SDK"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="The official MCP TypeScript SDK is maintained in the modelcontextprotocol/typescript-sdk repository. Version 2 implements the 2026-07-28 specification and ships separate packages: @modelcontextprotocol/server for building servers and @modelcontextprotocol/client for clients. You register tools with McpServer.registerTool, describe inputs with a zod schema, and connect a transport such as stdio or Streamable HTTP."
      sections={[
        {
          id: "install",
          heading: "Install",
          body: (
            <>
              <Code>{`npm install @modelcontextprotocol/server zod`}</Code>
              <P>
                For a client, install <code>@modelcontextprotocol/client</code> instead. The
                repository also offers optional middleware packages for Express, Fastify, Hono and
                the Node.js HTTP server when you serve over HTTP.
              </P>
            </>
          ),
        },
        {
          id: "server",
          heading: "A minimal stdio server",
          body: (
            <>
              <P>This is the quickstart from the SDK README, saved as <code>server.ts</code>:</P>
              <Code>{`import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';

const server = new McpServer({ name: 'greeting-server', version: '1.0.0' });

server.registerTool(
    'greet',
    {
        description: 'Greet someone by name',
        inputSchema: z.object({ name: z.string() })
    },
    async ({ name }) => ({
        content: [{ type: 'text', text: \`Hello, \${name}!\` }]
    })
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();`}</Code>
              <P>What each part does:</P>
              <ul className={UL}>
                <li>
                  <code>McpServer</code> holds your tools and answers <code>tools/list</code> and{" "}
                  <code>tools/call</code>.
                </li>
                <li>
                  <code>registerTool</code> takes a name, a description and a zod input schema. The
                  SDK turns the zod schema into the JSON Schema clients see as{" "}
                  <code>inputSchema</code>, and your handler receives the typed arguments.
                </li>
                <li>
                  The handler returns a result with a <code>content</code> array. Return{" "}
                  <code>isError: true</code> with a helpful message when the call fails for a
                  reason the model could fix.
                </li>
                <li>
                  <code>StdioServerTransport</code> reads and writes on stdin and stdout. Never{" "}
                  <code>console.log</code> in a stdio server; use <code>console.error</code>.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "run",
          heading: "Build, test and connect",
          body: (
            <>
              <P>Compile it, then open it in the MCP Inspector to list and call the tool:</P>
              <Code>{`npx tsc
npx @modelcontextprotocol/inspector node dist/server.js`}</Code>
              <P>
                To use it in Claude Desktop, add it to <code>claude_desktop_config.json</code> with
                an absolute path, then fully quit and reopen the app (see the{" "}
                <Ext href={CONNECT}>official guide</Ext> for file locations):
              </P>
              <Code>{`{
  "mcpServers": {
    "greeting": {
      "command": "node",
      "args": ["/absolute/path/to/dist/server.js"]
    }
  }
}`}</Code>
            </>
          ),
        },
        {
          id: "http",
          heading: "Serving over Streamable HTTP",
          body: (
            <P>
              For a remote server, swap the stdio transport for the SDK&apos;s Streamable HTTP
              support, optionally through one of the framework middleware packages. The 2026-07-28
              specification it implements has no protocol-level sessions and no GET stream, so each
              POST stands alone. Validate the <code>Origin</code> header, bind to 127.0.0.1 when
              running locally, and add authentication. The README has current examples for each
              framework.
            </P>
          ),
        },
        {
          id: "v1",
          heading: "Coming from v1",
          body: (
            <P>
              Earlier releases shipped as a single package, <code>@modelcontextprotocol/sdk</code>,
              and targeted earlier protocol revisions, which used sessions and an{" "}
              <code>initialize</code> handshake. Many tutorials still use that package and its
              import paths. If an example imports from <code>@modelcontextprotocol/sdk/...</code>,
              it is v1 code; check the v2 README before copying it.
            </P>
          ),
        },
        {
          id: "license",
          heading: "Licence",
          body: (
            <P>
              The repository states that new contributions are under the Apache License 2.0 and
              existing code remains under MIT.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "modelcontextprotocol/typescript-sdk README",
          url: REPO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "v2 implements the 2026-07-28 spec; packages @modelcontextprotocol/server and @modelcontextprotocol/client; quickstart with McpServer, registerTool, zod/v4 and StdioServerTransport; stdio and Streamable HTTP transports; middleware packages for Express, Fastify, Hono and Node.js HTTP; Apache-2.0 for new contributions, MIT for existing code.",
          limitations: "The README did not state a minimum Node.js version on the review date.",
        },
        {
          source: "MCP docs: Connect to local MCP servers",
          url: CONNECT,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "claude_desktop_config.json format and locations; absolute paths; restart after changes.",
        },
      ]}
      faqs={[
        {
          question: "What is the npm package for the MCP TypeScript SDK?",
          answer:
            "In v2, @modelcontextprotocol/server for servers and @modelcontextprotocol/client for clients. v1 used a single package, @modelcontextprotocol/sdk.",
        },
        {
          question: "Do I have to use zod?",
          answer:
            "The v2 quickstart defines tool inputs with zod (imported from zod/v4). The SDK converts it to the JSON Schema that clients receive.",
        },
        {
          question: "Which MCP spec version does the SDK support?",
          answer: "v2 implements the 2026-07-28 specification, according to the repository.",
        },
        {
          question: "Why does my server break when I log something?",
          answer:
            "With the stdio transport, stdout carries protocol messages. Use console.error for logs so they go to stderr.",
        },
        {
          question: "How do I test a server without Claude?",
          answer:
            "Run it under the MCP Inspector: npx @modelcontextprotocol/inspector node dist/server.js, then list and call tools in the browser UI.",
        },
      ]}
      related={[
        { href: "/sdk/java", label: "MCP Java SDK" },
        { href: "/compare/python-vs-typescript-mcp", label: "Python vs TypeScript for MCP" },
        { href: "/glossary/mcp-tool-input-schema", label: "Tool inputSchema" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
      ]}
    />
  );
}
