import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-progress";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP Progress Notifications";
const DESCRIPTION =
  "How progress notifications work in the Model Context Protocol: the progressToken, the notifications/progress message, the rules on increasing values, and how progress interacts with timeouts.";
const REVIEWED = "2026-09-23";
const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/progress";
const CANCEL = "https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation";
const HTTP = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";

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
      h1="Progress Notifications (MCP)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Progress notifications let an MCP server report how far a long-running request has got. The client opts in by putting a progressToken in the request's _meta; the server may then send notifications/progress messages with that token, a progress value that must increase each time, and optionally a total and a human-readable message. Sending them is optional for the server."
      sections={[
        {
          id: "flow",
          heading: "The flow",
          body: (
            <>
              <P>The client adds a token, unique among its active requests:</P>
              <Code>{`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_report",
    "arguments": {},
    "_meta": { "progressToken": "abc123" }
  }
}`}</Code>
              <P>The server may then send, before the final result:</P>
              <Code>{`{
  "jsonrpc": "2.0",
  "method": "notifications/progress",
  "params": {
    "progressToken": "abc123",
    "progress": 50,
    "total": 100,
    "message": "Fetched 50 of 100 records"
  }
}`}</Code>
            </>
          ),
        },
        {
          id: "rules",
          heading: "Rules",
          body: (
            <ul className={UL}>
              <li>Tokens MUST be a string or integer and unique across active requests.</li>
              <li><code>progress</code> MUST increase with every notification, even when <code>total</code> is unknown.</li>
              <li><code>progress</code> and <code>total</code> MAY be floating point.</li>
              <li><code>message</code> SHOULD be useful to a human.</li>
              <li>Notifications MUST only reference tokens from active, in-progress requests, and MUST stop after completion.</li>
              <li>Servers MAY send none at all, send at any frequency, or omit <code>total</code>.</li>
              <li>Both sides SHOULD rate-limit to avoid flooding.</li>
            </ul>
          ),
        },
        {
          id: "transport",
          heading: "Where they travel",
          body: (
            <P>
              On Streamable HTTP, the server answers the request with an SSE stream and sends
              progress notifications on that stream before the final response; the{" "}
              <Ext href={HTTP}>transport spec</Ext> says they must relate to the originating
              request. On stdio they share stdout with every other message and are matched by
              token.
            </P>
          ),
        },
        {
          id: "timeouts",
          heading: "Progress and timeouts",
          body: (
            <P>
              The <Ext href={CANCEL}>timeouts section</Ext> lets clients reset their timeout clock
              when progress arrives for a request, since it shows work is happening, but says they
              should still enforce a maximum. For slow tools, sending regular progress is the
              simplest way to avoid being cut off early.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Progress",
          url: SPEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "progressToken in _meta, string or integer, unique; notifications/progress with progress, optional total and message; progress MUST increase; MAY be floating point; servers MAY choose not to send; rate limiting; MUST stop after completion.",
        },
        {
          source: "MCP specification 2026-07-28: Cancellation (Timeouts)",
          url: CANCEL,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Implementations MAY reset timeouts on progress and SHOULD enforce a maximum timeout.",
        },
        {
          source: "MCP specification 2026-07-28: Streamable HTTP",
          url: HTTP,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Progress notifications are sent on the request's SSE response stream before the final response.",
        },
      ]}
      faqs={[
        {
          question: "How does a client ask for progress updates?",
          answer: "By including a progressToken in the request's _meta.",
        },
        {
          question: "Must a server send progress notifications?",
          answer: "No. It MAY send them, at any frequency, or not at all.",
        },
        {
          question: "Can progress go backwards?",
          answer: "No. The progress value MUST increase with each notification.",
        },
        {
          question: "Is total required?",
          answer: "No. total is optional and can be omitted when the amount of work is unknown.",
        },
        {
          question: "Do progress notifications prevent timeouts?",
          answer:
            "They can, if the client resets its timeout on progress, which the spec allows. A maximum timeout should still apply.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-timeout", label: "MCP timeouts" },
        { href: "/glossary/mcp-elicitation", label: "MCP elicitation" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
