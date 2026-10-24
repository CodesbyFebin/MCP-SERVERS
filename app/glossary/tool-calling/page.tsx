import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "tool-calling";
const PATH = `/glossary/${SLUG}`;
const TITLE = "Tool Calling in MCP: How It Works";
const DESCRIPTION =
  "How tool calling works with MCP: tools/list and tools/call, tool names, results and isError, protocol vs execution errors, and the human-in-the-loop rules.";
const REVIEWED = "2026-09-23";
const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";

const L = "text-blue-600 hover:underline dark:text-blue-400";
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
      h1="Tool Calling (MCP)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Tool calling is how a language model asks an application to run a function and return the result. In MCP, the client discovers tools with tools/list, each described by a name, description and inputSchema, and runs one with tools/call. The model chooses the tool and arguments; the host sends the call to the right server and gives the result back to the model."
      sections={[
        {
          id: "flow",
          heading: "The flow",
          body: (
            <>
              <P>A call to a tool the server listed:</P>
              <Code>{`{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": { "location": "New York" }
  }
}`}</Code>
              <P>The result:</P>
              <Code>{`{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "resultType": "complete",
    "content": [{ "type": "text", "text": "Current weather in New York: ..." }],
    "isError": false
  }
}`}</Code>
              <P>
                Results can include text, images, audio, resource links and embedded resources, and
                optionally <Link href="/glossary/mcp-tool-output-schema" className={L}>structured content</Link>.
              </P>
            </>
          ),
        },
        {
          id: "names",
          heading: "Tool names",
          body: (
            <ul className={UL}>
              <li>SHOULD be 1 to 128 characters, case-sensitive, using only letters, digits, underscore, hyphen and dot.</li>
              <li>SHOULD be unique within a server. Two servers can both have a <code>search</code> tool, so hosts that combine servers SHOULD disambiguate, for example with a server prefix.</li>
            </ul>
          ),
        },
        {
          id: "errors",
          heading: "Two kinds of error",
          body: (
            <ul className={UL}>
              <li>
                <strong>Protocol errors</strong> (unknown tool, malformed request) are JSON-RPC
                errors. Models rarely fix these themselves.
              </li>
              <li>
                <strong>Tool execution errors</strong> (API failure, bad date format, business rule)
                are returned as a result with <code>isError: true</code> and a clear message, so the
                model can correct itself and retry. Clients SHOULD pass these to the model.
              </li>
            </ul>
          ),
        },
        {
          id: "human",
          heading: "Humans stay in charge",
          body: (
            <P>
              The <Ext href={SPEC}>tools specification</Ext> says there SHOULD always be a human in
              the loop who can deny a tool call. Hosts SHOULD show which tools are exposed, signal
              when one runs, and ask for confirmation on operations. Servers MUST validate inputs,
              apply access controls, rate-limit calls and sanitise outputs.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Tools",
          url: SPEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "tools/list and tools/call; tool definition fields; result content types; tool name rules and disambiguation; protocol errors vs isError tool execution errors; human-in-the-loop SHOULDs; server MUST validate inputs, apply access controls, rate limit and sanitize outputs.",
        },
      ]}
      faqs={[
        {
          question: "What is tool calling?",
          answer: "A model requesting that the application run a named function with arguments and return the result.",
        },
        {
          question: "How does a client find out which tools exist?",
          answer: "It sends tools/list to each server and passes the tool definitions to the model.",
        },
        {
          question: "What does isError mean?",
          answer: "The tool ran but failed in a way the model may be able to fix, such as invalid input. It differs from a protocol error.",
        },
        {
          question: "Can two servers have tools with the same name?",
          answer: "Yes. Names are unique only within a server, so hosts should disambiguate, for example by prefixing the server name.",
        },
        {
          question: "Should tools run without confirmation?",
          answer: "The spec recommends a human who can deny tool calls, and confirmation prompts for operations.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-tool-input-schema", label: "Tool inputSchema" },
        { href: "/glossary/mcp-tool-output-schema", label: "Tool outputSchema" },
        { href: "/glossary/agent", label: "AI agent" },
        { href: "/glossary/mcp-timeout", label: "MCP timeouts" },
      ]}
    />
  );
}
