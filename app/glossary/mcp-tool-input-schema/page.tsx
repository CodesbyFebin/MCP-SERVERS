import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-tool-input-schema";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP Tool inputSchema Explained";
const DESCRIPTION =
  "What a tool's inputSchema is in the Model Context Protocol: required JSON Schema rules, the 2020-12 default, how to declare a tool with no parameters, x-mcp-header, and tips for schemas models use well.";
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
      h1="Tool inputSchema (MCP)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="inputSchema is the JSON Schema that describes the arguments an MCP tool accepts. Every tool must have one, and it must be a valid JSON Schema object, never null. It defaults to JSON Schema 2020-12 unless $schema says otherwise. Clients show it to the model so it knows which arguments to send, and servers must still validate every input they receive."
      sections={[
        {
          id: "example",
          heading: "Example",
          body: (
            <Code>{`{
  "name": "get_weather",
  "description": "Get current weather information for a location",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City name or zip code"
      }
    },
    "required": ["location"]
  }
}`}</Code>
          ),
        },
        {
          id: "rules",
          heading: "Rules from the specification",
          body: (
            <ul className={UL}>
              <li>It MUST be a valid JSON Schema object, not <code>null</code>.</li>
              <li>It defaults to JSON Schema 2020-12 when no <code>$schema</code> is given. You can declare another dialect, such as draft-07.</li>
              <li>
                For a tool with no parameters, the spec recommends{" "}
                <code>{`{ "type": "object", "additionalProperties": false }`}</code>, which accepts
                only an empty object. <code>{`{ "type": "object" }`}</code> also works but accepts any object.
              </li>
              <li>
                Properties MAY carry <code>x-mcp-header</code> so their value is mirrored into an{" "}
                <code>Mcp-Param-*</code> HTTP header on Streamable HTTP. Only primitive
                (string, integer, boolean) properties reachable through plain{" "}
                <code>properties</code> keys qualify. Do not mark secrets or personal data this
                way: headers are visible to proxies.
              </li>
              <li>Servers MUST validate all tool inputs, whatever the schema says.</li>
            </ul>
          ),
        },
        {
          id: "tips",
          heading: "Writing schemas models use well",
          body: (
            <ul className={UL}>
              <li>Give every property a <code>description</code>; it is the model&apos;s main guide.</li>
              <li>Use <code>enum</code> for fixed choices instead of free text.</li>
              <li>List truly required fields in <code>required</code> and give the rest sensible defaults in code.</li>
              <li>State formats in the description too (&ldquo;ISO 8601 date, e.g. 2026-09-23&rdquo;).</li>
              <li>
                When validation fails, return a tool result with <code>isError: true</code> and a
                message that says what to fix. The spec treats input validation errors as tool
                execution errors that models can use to self-correct.
              </li>
            </ul>
          ),
        },
        {
          id: "sdks",
          heading: "In the SDKs",
          body: (
            <P>
              You rarely write this JSON by hand. The TypeScript SDK builds it from a zod schema,
              the Python SDK from type hints, and Spring AI from the method signature. Check the
              generated schema in the MCP Inspector to see exactly what the model receives. See the{" "}
              <Ext href={SPEC}>tools specification</Ext> for the full rules.
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
            "inputSchema MUST be a valid JSON Schema object (not null); defaults to 2020-12; recommended no-parameter schema; x-mcp-header constraints and warning against sensitive parameters; servers MUST validate all tool inputs; input validation errors reported with isError: true.",
        },
      ]}
      faqs={[
        {
          question: "Is inputSchema required for every MCP tool?",
          answer: "Yes. It must be a valid JSON Schema object, not null, even for tools with no parameters.",
        },
        {
          question: "Which JSON Schema version does MCP use?",
          answer: "2020-12 by default. A schema can declare another dialect with $schema.",
        },
        {
          question: "How do I define a tool with no arguments?",
          answer: "Use { \"type\": \"object\", \"additionalProperties\": false }, which the spec recommends.",
        },
        {
          question: "Does the schema replace input validation on the server?",
          answer: "No. The spec says servers MUST validate all tool inputs.",
        },
        {
          question: "What is x-mcp-header?",
          answer:
            "An annotation on a primitive property that tells Streamable HTTP clients to copy its value into an Mcp-Param-{name} header, so gateways can route on it.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-tool-output-schema", label: "Tool outputSchema" },
        { href: "/sdk/typescript", label: "MCP TypeScript SDK" },
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
