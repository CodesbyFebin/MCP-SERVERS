import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-timeout";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP Timeouts: What the Spec Requires";
const DESCRIPTION =
  "How timeouts work in the Model Context Protocol: why every request should have one, how to cancel on stdio and Streamable HTTP, resetting on progress, and the maximum timeout rule.";
const REVIEWED = "2026-09-23";
const CANCEL = "https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation";
const TOOLS = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";

const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";
const L = "text-blue-600 hover:underline dark:text-blue-400";

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
      h1="Timeout (MCP)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="An MCP timeout is the time a sender waits for a response before giving up. The specification says implementations SHOULD set a timeout on every request they send, and when it expires SHOULD cancel the request: on stdio by sending notifications/cancelled, on Streamable HTTP by closing the response stream. Progress notifications may reset the clock, but a maximum timeout should always apply."
      sections={[
        {
          id: "rules",
          heading: "The rules",
          body: (
            <>
              <P>From the <Ext href={CANCEL}>cancellation and timeouts section</Ext> of the 2026-07-28 spec:</P>
              <ul className={UL}>
                <li>Implementations SHOULD establish timeouts for all sent requests, to prevent hung connections and resource exhaustion.</li>
                <li>On timeout, the sender SHOULD cancel the request and stop waiting.</li>
                <li>SDKs and middleware SHOULD let timeouts be configured per request.</li>
                <li>
                  Implementations MAY reset the clock when a progress notification arrives for the
                  request, since that shows work is happening.
                </li>
                <li>
                  They SHOULD still enforce a maximum timeout regardless of progress, to limit the
                  damage from a misbehaving peer.
                </li>
              </ul>
              <P>
                The <Ext href={TOOLS}>tools section</Ext> also lists &ldquo;implement timeouts for
                tool calls&rdquo; among client security considerations.
              </P>
            </>
          ),
        },
        {
          id: "cancel",
          heading: "How cancelling works per transport",
          body: (
            <ul className={UL}>
              <li>
                <strong>stdio</strong>: send <code>notifications/cancelled</code> with the request
                ID and an optional reason.
              </li>
              <li>
                <strong>Streamable HTTP</strong>: close that request&apos;s SSE response stream. The
                server MUST treat the disconnect as cancellation; no notification is sent.
              </li>
              <li>
                A response can still arrive after you cancel, because of network timing. The client
                SHOULD ignore it.
              </li>
            </ul>
          ),
        },
        {
          id: "choosing",
          heading: "Choosing a value",
          body: (
            <>
              <P>
                The spec sets no number. A sensible approach is to measure each tool&apos;s latency
                distribution and set the timeout above its high percentiles, with headroom, rather
                than above the average. See{" "}
                <Link href="/glossary/mcp-p95-latency" className={L}>
                  p95 latency
                </Link>
                .
              </P>
              <P>
                For work that genuinely takes minutes, have the server send{" "}
                <Link href="/glossary/mcp-progress" className={L}>
                  progress notifications
                </Link>{" "}
                so a client that resets on progress keeps waiting, and keep a hard ceiling.
              </P>
            </>
          ),
        },
        {
          id: "server",
          heading: "On the server side",
          body: (
            <P>
              When a request is cancelled, the server SHOULD stop processing it, free its resources
              and not send a response. Put your own timeouts on calls to upstream APIs and
              databases too, so one slow dependency cannot hold a request open until the
              client&apos;s ceiling.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Cancellation (Timeouts)",
          url: CANCEL,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "SHOULD establish timeouts for all sent requests; SHOULD cancel on timeout; per-transport cancellation (notifications/cancelled on stdio, closing the stream on Streamable HTTP); per-request configurable timeouts; MAY reset on progress; SHOULD enforce a maximum timeout; servers SHOULD stop processing and not respond; clients SHOULD ignore late responses.",
        },
        {
          source: "MCP specification 2026-07-28: Tools",
          url: TOOLS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Client security considerations include implementing timeouts for tool calls.",
        },
      ]}
      faqs={[
        {
          question: "What is the default MCP timeout?",
          answer:
            "The specification does not define one. Each client and SDK chooses its own default; check its documentation.",
        },
        {
          question: "Does a progress notification extend the timeout?",
          answer:
            "It may. The spec lets implementations reset the clock on progress but says they should still enforce a maximum timeout.",
        },
        {
          question: "How do I cancel a request on Streamable HTTP?",
          answer: "Close the SSE response stream for that request. The server must treat the disconnect as cancellation.",
        },
        {
          question: "How do I cancel on stdio?",
          answer: "Send a notifications/cancelled notification with the request's ID.",
        },
        {
          question: "What should a server do when a request is cancelled?",
          answer: "Stop processing it, free associated resources, and not send a response.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-progress", label: "MCP progress notifications" },
        { href: "/glossary/mcp-p95-latency", label: "p95 latency for MCP tools" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
      ]}
    />
  );
}
