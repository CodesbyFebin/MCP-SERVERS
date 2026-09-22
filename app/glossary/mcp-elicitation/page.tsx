import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-elicitation";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP Elicitation: Form and URL Modes";
const DESCRIPTION =
  "What elicitation is in the Model Context Protocol: how a server asks the user for input mid-task, form mode vs URL mode, the allowed schema, accept/decline/cancel, and the security rules.";
const REVIEWED = "2026-09-23";
const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation";

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
      h1="Elicitation (MCP)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Elicitation is how an MCP server asks the user for more information while handling a request. In form mode the client shows a simple form defined by a restricted JSON Schema; in URL mode it sends the user to a web page for sensitive steps such as entering an API key or completing an OAuth flow. The user can accept, decline or cancel. Servers must never use form mode for passwords, API keys, tokens or payment details."
      sections={[
        {
          id: "how",
          heading: "How it works in the 2026-07-28 spec",
          body: (
            <>
              <P>
                A client that supports elicitation declares it in each request&apos;s{" "}
                <code>_meta</code> client capabilities, listing <code>form</code>,{" "}
                <code>url</code> or both. When the server needs input, it does not send its own
                request. It returns an <code>InputRequiredResult</code> containing an{" "}
                <code>elicitation/create</code> input request. The client asks the user, then
                retries the original call with the answer in <code>inputResponses</code>.
              </P>
              <Code>{`{
  "method": "elicitation/create",
  "params": {
    "mode": "form",
    "message": "Please provide your GitHub username",
    "requestedSchema": {
      "type": "object",
      "properties": { "name": { "type": "string" } },
      "required": ["name"]
    }
  }
}`}</Code>
              <P>
                Servers must not use a mode the client did not declare. An empty{" "}
                <code>elicitation</code> capability means form mode only.
              </P>
            </>
          ),
        },
        {
          id: "form",
          heading: "Form mode",
          body: (
            <>
              <P>
                The <code>requestedSchema</code> is limited to a flat object whose properties are
                primitives, so any client can render it as a form:
              </P>
              <ul className={UL}>
                <li>
                  <strong>string</strong>, with optional <code>minLength</code>,{" "}
                  <code>maxLength</code> and <code>format</code> (<code>email</code>,{" "}
                  <code>uri</code>, <code>date</code>, <code>date-time</code>)
                </li>
                <li><strong>number</strong> or <strong>integer</strong>, with optional <code>minimum</code> and <code>maximum</code></li>
                <li><strong>boolean</strong></li>
                <li><strong>enum</strong>: single-select or multi-select, with or without display titles</li>
              </ul>
              <P>Nested objects and arrays of objects are deliberately not supported.</P>
            </>
          ),
        },
        {
          id: "url",
          heading: "URL mode",
          body: (
            <>
              <P>
                Introduced in the 2025-11-25 revision. The server sends a <code>url</code> and a{" "}
                <code>message</code>; the user completes the step in a browser, outside the MCP
                client. Nothing typed on that page passes through the client or the model. Use it
                for API keys, third-party OAuth and payments.
              </P>
              <P>
                An <code>accept</code> in URL mode only means the user agreed to open the page. The
                server works out, when the call is retried, whether the step actually finished.
              </P>
            </>
          ),
        },
        {
          id: "responses",
          heading: "Accept, decline, cancel",
          body: (
            <ul className={UL}>
              <li><code>accept</code>: the user submitted; in form mode <code>content</code> holds the data</li>
              <li><code>decline</code>: the user explicitly said no</li>
              <li><code>cancel</code>: the user dismissed it without choosing</li>
            </ul>
          ),
        },
        {
          id: "security",
          heading: "Security rules",
          body: (
            <ul className={UL}>
              <li>Servers MUST NOT use form mode for passwords, API keys, access tokens or payment credentials, and MUST use URL mode for them.</li>
              <li>Clients MUST show which server is asking and give clear decline and cancel options.</li>
              <li>
                For URL mode, clients MUST NOT pre-fetch or open the URL without consent, MUST show
                the full URL first, and SHOULD highlight its domain.
              </li>
              <li>
                Servers MUST NOT put user credentials or personal data in the URL, and MUST NOT send
                a pre-authenticated link.
              </li>
              <li>
                Servers MUST check that the person completing a URL flow is the same user who
                started it, to prevent phishing-style account takeover.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Elicitation",
          url: SPEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Form and URL modes; capability declared in _meta clientCapabilities; delivered via InputRequiredResult; restricted flat primitive schema with listed formats; URL mode introduced in 2025-11-25; accept/decline/cancel; MUST NOT use form mode for sensitive information; URL handling and phishing requirements.",
        },
      ]}
      faqs={[
        {
          question: "What is elicitation in MCP?",
          answer:
            "A way for a server to ask the user for extra information during a request, through the client, using either a simple form or a link to a web page.",
        },
        {
          question: "Can a server ask for my password through elicitation?",
          answer:
            "Not through a form. The spec forbids form mode for passwords, API keys, tokens and payment credentials. Those must go through URL mode, on a web page outside the client.",
        },
        {
          question: "What schema types can a form use?",
          answer:
            "A flat object with string, number, integer, boolean or enum properties. Nested objects are not allowed.",
        },
        {
          question: "What happens if I decline?",
          answer:
            "The client returns decline, and the server must handle it, for example by offering an alternative or stopping.",
        },
        {
          question: "Do all MCP clients support elicitation?",
          answer:
            "No. It is optional; servers must check the client's declared capabilities and only use the modes it supports.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-progress", label: "MCP progress notifications" },
        { href: "/glossary/mcp-tool-input-schema", label: "Tool inputSchema" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
