import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-tool-output-schema";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP Tool outputSchema and structuredContent";
const DESCRIPTION =
  "What a tool's outputSchema does in the Model Context Protocol, how it relates to structuredContent, the MUST and SHOULD rules, and a full example response.";
const REVIEWED = "2026-09-23";
const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";

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
      h1="Tool outputSchema (MCP)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="outputSchema is an optional JSON Schema on an MCP tool that describes the shape of its structured result. If a tool declares one, the server MUST return structuredContent that conforms to it, and clients SHOULD validate it. For backwards compatibility, a tool returning structured content should also include the same JSON as text in its content array."
      sections={[
        {
          id: "example",
          heading: "Example",
          body: (
            <>
              <P>A tool with an output schema:</P>
              <Code>{`{
  "name": "get_weather_data",
  "description": "Get current weather data for a location",
  "inputSchema": {
    "type": "object",
    "properties": { "location": { "type": "string" } },
    "required": ["location"]
  },
  "outputSchema": {
    "type": "object",
    "properties": {
      "temperature": { "type": "number", "description": "Temperature in celsius" },
      "conditions": { "type": "string" },
      "humidity": { "type": "number" }
    },
    "required": ["temperature", "conditions", "humidity"]
  }
}`}</Code>
              <P>A valid result:</P>
              <Code>{`{
  "resultType": "complete",
  "content": [
    { "type": "text", "text": "{\\"temperature\\": 22.5, \\"conditions\\": \\"Partly cloudy\\", \\"humidity\\": 65}" }
  ],
  "structuredContent": { "temperature": 22.5, "conditions": "Partly cloudy", "humidity": 65 }
}`}</Code>
            </>
          ),
        },
        {
          id: "rules",
          heading: "Rules from the specification",
          body: (
            <ul className={UL}>
              <li><code>outputSchema</code> is optional and defaults to JSON Schema 2020-12.</li>
              <li>If present, servers MUST return structured results that conform to it.</li>
              <li>Clients SHOULD validate structured results against it.</li>
              <li>
                <code>structuredContent</code> can be any JSON value (object, array, string,
                number, boolean or null), so an array output schema is allowed.
              </li>
              <li>
                A tool returning structured content SHOULD also return the serialised JSON in a text
                content block, for clients that only read <code>content</code>.
              </li>
              <li>
                <code>structuredContent</code> is data produced by the server. It is unrelated to
                LLM &ldquo;structured outputs&rdquo; (schema-constrained generation).
              </li>
            </ul>
          ),
        },
        {
          id: "when",
          heading: "When to add one",
          body: (
            <P>
              Add an output schema when another program, not just the model, will consume the
              result: a client that renders a table, a workflow that chains tools, or tests that
              check responses. It gives type information and lets clients reject malformed data.
              For free-form text answers, plain <code>content</code> is enough. Full details are in
              the <Ext href={SPEC}>tools specification</Ext>.
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
            "outputSchema optional, defaults to 2020-12; servers MUST provide conforming structured results; clients SHOULD validate; structuredContent can be any JSON value; SHOULD also return serialised JSON as TextContent; distinct from LLM structured outputs; weather example.",
        },
      ]}
      faqs={[
        {
          question: "Is outputSchema required?",
          answer: "No. It is optional. If you declare it, your structured results must conform.",
        },
        {
          question: "What is structuredContent?",
          answer: "The field in a tool result that carries machine-readable JSON matching the tool's outputSchema.",
        },
        {
          question: "Should I still return text content?",
          answer:
            "Yes. The spec says a tool returning structured content SHOULD also include the serialised JSON in a text block for backwards compatibility.",
        },
        {
          question: "Can the output be an array?",
          answer: "Yes. structuredContent can be any JSON value, and the spec includes an array output schema example.",
        },
        {
          question: "Who validates the output?",
          answer: "The server must produce conforming output, and clients should validate it against the schema.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-tool-input-schema", label: "Tool inputSchema" },
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/sdk/typescript", label: "MCP TypeScript SDK" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
