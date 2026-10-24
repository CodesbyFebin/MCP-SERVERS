import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-transport-methods";
const TITLE = "MCP Transports: stdio vs Streamable HTTP";
const DESCRIPTION =
  "How MCP's two standard transports work in the 2026-07-28 spec: stdio framing and shutdown, Streamable HTTP POSTs, SSE, required headers, security rules, and what changed from older revisions.";
const REVIEWED = "2026-09-23";
const OVERVIEW = "https://modelcontextprotocol.io/specification/latest/basic/transports";
const STDIO = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio";
const HTTP = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";

const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";
const TD = "px-4 py-2 align-top";
const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

const ROWS: [string, string, string][] = [
  ["Who starts the server", "The client launches it as a subprocess", "Runs independently; many clients connect"],
  ["Framing", "One JSON-RPC message per line on stdin/stdout", "One JSON-RPC message per HTTP POST"],
  ["Replies", "On stdout, correlated by id", "A JSON object, or an SSE stream scoped to that request"],
  ["Metadata", "Only in the message body (_meta)", "Body, mirrored into MCP-Protocol-Version, Mcp-Method and Mcp-Name headers"],
  ["Cancel a request", "Send notifications/cancelled", "Close that request's response stream"],
  ["Logging", "stderr", "Your own server-side logging"],
  ["Typical use", "Local tools in Claude Desktop, IDEs, CLIs", "Remote and hosted servers, shared services"],
];

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
      h1="MCP Transport Methods: stdio and Streamable HTTP"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="The MCP specification defines two standard transports. stdio runs the server as a local subprocess and exchanges newline-delimited JSON-RPC over stdin and stdout. Streamable HTTP exposes one HTTP endpoint that takes each message as a POST and replies with JSON or a request-scoped Server-Sent Events stream. The older HTTP+SSE transport from 2024-11-05 is deprecated. Custom transports are allowed if they keep MCP's message format."
      sections={[
        {
          id: "compare",
          heading: "stdio vs Streamable HTTP at a glance",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className={TH}></th>
                    <th className={TH}>stdio</th>
                    <th className={TH}>Streamable HTTP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  {ROWS.map(([k, a, b]) => (
                    <tr key={k}>
                      <td className={`${TD} font-medium`}>{k}</td>
                      <td className={TD}>{a}</td>
                      <td className={TD}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "stdio",
          heading: "stdio",
          body: (
            <>
              <P>
                The client starts the server as a child process. The{" "}
                <Ext href={STDIO}>stdio binding</Ext> sets these rules:
              </P>
              <ul className={UL}>
                <li>Each message is a single JSON-RPC request, notification or response.</li>
                <li>Messages are delimited by newlines and MUST NOT contain embedded newlines.</li>
                <li>
                  The server MUST NOT write anything to stdout that is not a valid MCP message. It
                  MAY write UTF-8 logs to stderr, and clients SHOULD NOT assume stderr output means
                  an error.
                </li>
                <li>To cancel a request, the client sends <code>notifications/cancelled</code>.</li>
              </ul>
              <P>
                <strong>Shutdown:</strong> the client closes the server&apos;s stdin, waits for it to
                exit, and force-terminates it if it does not (on POSIX, typically SIGTERM then
                SIGKILL). Servers SHOULD exit promptly when stdin closes. If a server dies
                unexpectedly, the client SHOULD restart it; because the protocol is stateless,
                in-flight requests are simply retried.
              </P>
              <P>
                The same newline-delimited framing works over Unix sockets or TCP, and the spec
                recommends custom stream transports reuse it.
              </P>
            </>
          ),
        },
        {
          id: "http",
          heading: "Streamable HTTP",
          body: (
            <>
              <P>
                The server exposes a single <strong>MCP endpoint</strong>, for example{" "}
                <code>https://example.com/mcp</code>, that accepts POST. Per the{" "}
                <Ext href={HTTP}>Streamable HTTP binding</Ext>:
              </P>
              <ul className={UL}>
                <li>Every client message is a new HTTP POST with a single JSON-RPC request or notification.</li>
                <li>
                  The client MUST send <code>Accept: application/json, text/event-stream</code>.
                </li>
                <li>
                  For a request, the server replies with <code>application/json</code> (one object)
                  or <code>text/event-stream</code> (an SSE stream that can carry progress
                  notifications before the final response). Clients must handle both.
                </li>
                <li>An accepted notification gets <code>202 Accepted</code> with no body.</li>
                <li>Closing the SSE response stream cancels that request.</li>
                <li>
                  Servers SHOULD send <code>X-Accel-Buffering: no</code> on SSE responses so
                  proxies such as nginx do not buffer events.
                </li>
              </ul>
              <P>Each POST carries headers that mirror the body, so gateways can route without parsing JSON:</P>
              <Code>{`POST /mcp HTTP/1.1
Content-Type: application/json
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: get_weather`}</Code>
              <P>
                If a header does not match the body, the server rejects the request with{" "}
                <code>400 Bad Request</code> and JSON-RPC error <code>-32020</code>{" "}
                (<code>HeaderMismatch</code>).
              </P>
            </>
          ),
        },
        {
          id: "security",
          heading: "Security rules for HTTP servers",
          body: (
            <>
              <P>The spec lists three, to stop DNS-rebinding attacks on local servers:</P>
              <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  Servers MUST validate the <code>Origin</code> header, and reply 403 if it is
                  present and invalid.
                </li>
                <li>Local servers SHOULD bind to 127.0.0.1, not 0.0.0.0.</li>
                <li>Servers SHOULD authenticate all connections.</li>
              </ol>
            </>
          ),
        },
        {
          id: "changes",
          heading: "What changed in 2026-07-28",
          body: (
            <>
              <P>
                Streamable HTTP arrived in protocol version 2025-03-26. Revisions up to 2025-11-25
                had sessions (<code>Mcp-Session-Id</code>), a standalone GET stream, server-sent
                requests over SSE, and resumable streams with <code>Last-Event-ID</code>. The
                2026-07-28 revision removes all four:
              </P>
              <ul className={UL}>
                <li>No protocol-level sessions. Metadata travels with every request in <code>_meta</code>.</li>
                <li>No GET endpoint. Change notifications come through a <code>subscriptions/listen</code> request instead.</li>
                <li>
                  Servers no longer send their own requests. Sampling, elicitation and roots are
                  returned inside results as input requests (multi round-trip requests).
                </li>
                <li>SSE streams are not resumable.</li>
              </ul>
              <P>
                A server that speaks only 2026-07-28 SHOULD answer GET or DELETE with 405, and
                ignore <code>Mcp-Session-Id</code> and <code>Last-Event-ID</code>. Clients that
                need older servers probe first and fall back to the <code>initialize</code>{" "}
                handshake.
              </P>
            </>
          ),
        },
        {
          id: "sse",
          heading: "The deprecated HTTP+SSE transport",
          body: (
            <P>
              The 2024-11-05 HTTP+SSE transport used separate SSE and POST endpoints. It has been
              deprecated since 2025-03-26: new implementations SHOULD NOT adopt it and existing
              ones SHOULD migrate. If a client connects to an old server, it detects it by
              trying a POST and, on a 400, 404 or 405 without a modern JSON-RPC error body, opening
              a GET stream and waiting for an <code>endpoint</code> event.
            </P>
          ),
        },
        {
          id: "choose",
          heading: "Which one to use",
          body: (
            <ul className={UL}>
              <li>
                <strong>stdio</strong> for a tool that runs on the user&apos;s own machine and is
                used by one client: file access, local git, a CLI wrapper. No network exposure, no
                auth to build.
              </li>
              <li>
                <strong>Streamable HTTP</strong> for anything shared or hosted: a company API, a
                SaaS integration, a server many users sign in to. Add authentication and Origin
                checks.
              </li>
              <li>
                <strong>A bridge</strong> such as <code>mcp-remote</code> when a client only
                supports stdio but the server is remote.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification (latest): Transports overview",
          url: OVERVIEW,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Two standard bindings, stdio and Streamable HTTP; UTF-8 JSON-RPC; metadata in _meta, optionally mirrored; custom transports allowed if they preserve message format and patterns; custom byte-stream transports SHOULD reuse stdio framing.",
        },
        {
          source: "MCP specification 2026-07-28: stdio",
          url: STDIO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Newline-delimited messages without embedded newlines; stderr for logs; nothing but MCP messages on stdout; notifications/cancelled; shutdown by closing stdin then force-terminating; restart on unexpected exit.",
        },
        {
          source: "MCP specification 2026-07-28: Streamable HTTP",
          url: HTTP,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Single POST endpoint; Accept header; JSON or request-scoped SSE; 202 for notifications; cancellation by closing stream; MCP-Protocol-Version, Mcp-Method, Mcp-Name headers; -32020 HeaderMismatch; Origin validation, localhost binding, auth; removal of GET stream and sessions; HTTP+SSE deprecated since 2025-03-26.",
          limitations: "Clients and SDKs adopt new revisions at different speeds; check which versions yours supports.",
        },
      ]}
      faqs={[
        {
          question: "What transports does MCP support?",
          answer:
            "Two standard ones, stdio and Streamable HTTP. Custom transports are allowed if they keep MCP's JSON-RPC message format and patterns.",
        },
        {
          question: "Is SSE still used in MCP?",
          answer:
            "Yes, as a response format inside Streamable HTTP: a server can answer a POST with a request-scoped SSE stream. The separate 2024-11-05 HTTP+SSE transport is deprecated.",
        },
        {
          question: "Does Streamable HTTP still use Mcp-Session-Id?",
          answer:
            "Not in the 2026-07-28 revision, which removed protocol-level sessions. Revisions 2025-03-26 through 2025-11-25 used it.",
        },
        {
          question: "Why does my stdio server break when I add a print statement?",
          answer:
            "stdout is the protocol channel. The spec forbids writing anything to stdout that is not a valid MCP message. Log to stderr instead.",
        },
        {
          question: "Should a local HTTP MCP server listen on 0.0.0.0?",
          answer:
            "No. The spec says local servers SHOULD bind to 127.0.0.1 and MUST validate the Origin header to prevent DNS-rebinding attacks.",
        },
      ]}
      related={[
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
        { href: "/glossary/mcp-timeout", label: "MCP timeouts" },
        { href: "/glossary/mcp-p95-latency", label: "p95 latency for MCP tools" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
