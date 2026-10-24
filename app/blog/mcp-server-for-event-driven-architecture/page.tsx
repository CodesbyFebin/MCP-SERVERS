import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-server-for-event-driven-architecture";
const TITLE = "MCP in Event-Driven Architectures";
const DESCRIPTION =
  "How MCP handles events in the 2026-07-28 spec: subscriptions/listen for change notifications, resource update streams, best-effort delivery, and bridging Kafka-style events to AI agents.";
const REVIEWED = "2026-09-23";
const SUBS = "https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions";
const ARCH = "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture";

const L = "text-blue-600 hover:underline dark:text-blue-400";
const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

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
      h1="MCP in Event-Driven Architectures"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="MCP is request-driven, with one event mechanism: a client opens a subscriptions/listen stream and the server pushes notifications, such as a tool list changing or a watched resource updating. Delivery is best effort, so clients should also poll. To connect a Kafka or queue-based system, expose events as resources the client can watch, or as tools that read recent events, rather than streaming raw events to the model."
      sections={[
        {
          id: "listen",
          heading: "subscriptions/listen",
          body: (
            <>
              <P>From the <Ext href={SUBS}>subscriptions spec</Ext>, a client asks for exactly what it wants:</P>
              <Code>{`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscriptions/listen",
  "params": {
    "notifications": {
      "toolsListChanged": true,
      "resourceSubscriptions": ["orders://recent"]
    }
  }
}`}</Code>
              <ul className={UL}>
                <li>The server MUST NOT send notification types the client didn&apos;t request.</li>
                <li>It first sends <code>notifications/subscriptions/acknowledged</code> with the subset it will honour.</li>
                <li>Every notification carries the subscription ID so clients can tell streams apart.</li>
                <li>Filters: <code>toolsListChanged</code>, <code>promptsListChanged</code>, <code>resourcesListChanged</code>, <code>resourceSubscriptions</code>.</li>
              </ul>
            </>
          ),
        },
        {
          id: "delivery",
          heading: "Delivery is best effort",
          body: (
            <P>
              The <Ext href={ARCH}>architecture overview</Ext> is explicit: there are no guarantees
              that every notification is sent or received, particularly across reconnects, and
              clients should also poll. On stdio, a reconnecting client MUST re-send{" "}
              <code>subscriptions/listen</code>; the server keeps no subscription state. Don&apos;t
              use MCP notifications as your system of record for events.
            </P>
          ),
        },
        {
          id: "bridge",
          heading: "Bridging a message bus to agents",
          body: (
            <ul className={UL}>
              <li>
                <strong>Resource view:</strong> expose a resource such as <code>orders://recent</code>{" "}
                backed by your consumer, and send <code>notifications/resources/updated</code> when it
                changes. The client re-reads it.
              </li>
              <li>
                <strong>Query tool:</strong> a tool like <code>get_events(since, type)</code> reads
                from your event store with paging. Reliable, and the model asks for what it needs.
              </li>
              <li>
                <strong>Actions:</strong> tools that publish events (for example{" "}
                <code>request_refund</code>) should write to your bus through the same validation as
                any producer, and be idempotent.
              </li>
              <li>
                <strong>Long work:</strong> for jobs triggered by events, send{" "}
                <Link href="/glossary/mcp-progress" className={L}>progress</Link> or use the Tasks
                extension&apos;s durable handles.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        { source: "MCP specification 2026-07-28: Subscriptions", url: SUBS, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "subscriptions/listen replaces resources/subscribe and HTTP GET; filters; MUST NOT send unrequested types; acknowledgment first; subscriptionId correlation; stdio clients MUST re-send after reconnect." },
        { source: "MCP docs: Architecture overview", url: ARCH, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Notifications are best effort with no delivery guarantees; clients should also poll; Tasks extension for durable handles." },
      ]}
      faqs={[
        { question: "Can an MCP server push events to the client?", answer: "Yes, on a subscriptions/listen stream, but only the notification types the client requested." },
        { question: "Are MCP notifications guaranteed to arrive?", answer: "No. They are best effort; clients should also poll." },
        { question: "How do I connect Kafka to an AI agent via MCP?", answer: "Expose events through a resource the client watches or a paged query tool, rather than streaming raw events." },
        { question: "What replaced resources/subscribe?", answer: "subscriptions/listen with a resourceSubscriptions filter, in the 2026-07-28 revision." },
        { question: "Do subscriptions survive a reconnect?", answer: "Not on stdio: the client must re-send subscriptions/listen." },
      ]}
      related={[
        { href: "/blog/mcp-microservices-architecture", label: "MCP in a microservices architecture" },
        { href: "/glossary/mcp-uri-scheme", label: "MCP resource URI schemes" },
        { href: "/glossary/mcp-progress", label: "MCP progress notifications" },
        { href: "/blog/mcp-design-patterns-production", label: "MCP design patterns for production" },
      ]}
    />
  );
}
