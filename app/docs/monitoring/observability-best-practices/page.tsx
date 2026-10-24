import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "observability-best-practices";
const PATH = "/docs/monitoring/observability-best-practices";
const TITLE = "MCP Server Observability Best Practices";
const DESCRIPTION =
  "How to observe MCP servers in 2026: stderr logs for stdio, OpenTelemetry for HTTP, why protocol logging is deprecated, labelling by method and tool, key metrics, and what not to log.";
const REVIEWED = "2026-09-23";
const DEBUG = "https://modelcontextprotocol.io/docs/tools/debugging";
const ARCH = "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture";
const HTTP = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";
const CANCEL = "https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation";

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
      section={{ label: "Docs", href: "/docs" }}
      title={TITLE}
      h1="MCP Observability Best Practices"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="For stdio MCP servers, write structured logs to stderr, which the host captures. For Streamable HTTP servers, use your own log aggregation and OpenTelemetry, since stderr never reaches the client. Protocol-level logging (notifications/message) is deprecated as of 2026-07-28. Track per-tool call counts, error rates, latency percentiles and cancellations, and never log secrets."
      sections={[
        {
          id: "logs",
          heading: "Where logs go",
          body: (
            <ul className={UL}>
              <li>
                <strong>stdio:</strong> everything on stderr is captured by the host. Claude Desktop
                writes it to <code>mcp-server-NAME.log</code>. Never write logs to stdout; it
                carries protocol messages.
              </li>
              <li>
                <strong>Streamable HTTP:</strong> the <Ext href={DEBUG}>debugging guide</Ext> notes
                stderr is not captured by the client, so use server-side aggregation or
                OpenTelemetry.
              </li>
              <li>
                <strong>Protocol logging:</strong> <code>notifications/message</code> is deprecated
                as of 2026-07-28; the <Ext href={ARCH}>architecture overview</Ext> says new
                implementations should log to stderr or use OpenTelemetry.
              </li>
            </ul>
          ),
        },
        {
          id: "label",
          heading: "Label everything by method and tool",
          body: (
            <>
              <P>
                On Streamable HTTP, every POST carries <code>Mcp-Method</code> and, for tool calls,{" "}
                <code>Mcp-Name</code>. The <Ext href={HTTP}>transport spec</Ext> mirrors them into
                headers precisely so observability tooling can label requests without parsing the
                body. A structured log line might look like:
              </P>
              <Code>{`{"ts":"2026-09-23T10:15:02Z","method":"tools/call","tool":"search_orders",
 "duration_ms":184,"is_error":false,"status":200,"request_id":"a1b2c3"}`}</Code>
            </>
          ),
        },
        {
          id: "metrics",
          heading: "Metrics worth tracking",
          body: (
            <ul className={UL}>
              <li>Calls per tool, and the share returning <code>isError: true</code></li>
              <li>
                Latency per tool at <Link href="/glossary/mcp-p95-latency" className={L}>p95</Link>{" "}
                and p99, not just the average
              </li>
              <li>
                Cancellations and timeouts; on HTTP, a closed response stream is a cancellation per
                the <Ext href={CANCEL}>spec</Ext>
              </li>
              <li>401 and 403 responses, which reveal auth misconfiguration or scope gaps</li>
              <li>Upstream dependency latency and errors behind each tool</li>
            </ul>
          ),
        },
        {
          id: "privacy",
          heading: "What not to log",
          body: (
            <ul className={UL}>
              <li>Access tokens, API keys, passwords and OTPs, including in request headers.</li>
              <li>Full tool arguments or results that contain personal data; log IDs and sizes instead.</li>
              <li>The debugging guide&apos;s advice: sanitise logs, protect credentials, mask personal information.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP docs: Debugging",
          url: DEBUG,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "stdio servers log to stderr, captured by the host; Streamable HTTP stderr not captured, use aggregation or OpenTelemetry; notifications/message deprecated as of 2026-07-28; sanitise logs, protect credentials, mask personal information.",
        },
        {
          source: "MCP docs: Architecture overview",
          url: ARCH,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Logging client primitive deprecated in 2026-07-28; log to stderr or use OpenTelemetry.",
        },
        {
          source: "MCP specification 2026-07-28: Streamable HTTP",
          url: HTTP,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Mcp-Method and Mcp-Name headers let observability tooling inspect requests without parsing the body.",
        },
        {
          source: "MCP specification 2026-07-28: Cancellation",
          url: CANCEL,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Closing the SSE response stream is cancellation on Streamable HTTP.",
        },
      ]}
      faqs={[
        {
          question: "Where should an MCP server write logs?",
          answer: "stderr for stdio servers; your own aggregation or OpenTelemetry for HTTP servers.",
        },
        {
          question: "Should I use notifications/message for logging?",
          answer: "No. It is deprecated as of the 2026-07-28 protocol version.",
        },
        {
          question: "How do I tell which tool a request is for without parsing JSON?",
          answer: "Read the Mcp-Name header, which Streamable HTTP clients send for tool calls.",
        },
        {
          question: "Which latency metric matters most?",
          answer: "Per-tool p95 and p99, because averages hide slow calls.",
        },
        {
          question: "Can I log tool arguments?",
          answer: "Only non-sensitive ones. Mask personal data and never log credentials.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-p95-latency", label: "p95 latency for MCP tools" },
        { href: "/glossary/mcp-timeout", label: "MCP timeouts" },
        { href: "/directory/monitoring", label: "Monitoring MCP servers" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
      ]}
    />
  );
}
