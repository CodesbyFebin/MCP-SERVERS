import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-microservices-architecture";
const TITLE = "MCP in a Microservices Architecture";
const DESCRIPTION =
  "How to fit MCP servers into a microservices system: one server per domain or a gateway, stateless scaling under the 2026-07-28 spec, auth between services, and naming across servers.";
const REVIEWED = "2026-09-23";
const ARCH = "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture";
const TOOLS = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";
const AUTH = "https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization";

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
      h1="MCP in a Microservices Architecture"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="In a microservices system, MCP servers are the AI-facing edge of your services. Common layouts are one MCP server per domain (orders, payments, support), each owned by that service's team, or a gateway that exposes several services' APIs as tools. The 2026-07-28 spec is stateless, so MCP servers scale horizontally like other HTTP services, and each must validate tokens issued for it."
      sections={[
        {
          id: "layouts",
          heading: "Two layouts",
          body: (
            <ul className={UL}>
              <li>
                <strong>Server per domain.</strong> The orders team runs an orders MCP server next to
                the orders service. Clear ownership and permissions; the host connects to several
                servers. The <Ext href={ARCH}>architecture</Ext> already expects this: the host
                creates one client per server.
              </li>
              <li>
                <strong>Gateway.</strong> A{" "}
                <Link href="/glossary/gateway" className={L}>gateway</Link> exposes selected service
                APIs as tools behind one endpoint, with central auth, rate limits and logging.
                Simpler for clients; the gateway team becomes a bottleneck for tool changes.
              </li>
            </ul>
          ),
        },
        {
          id: "stateless",
          heading: "Scaling",
          body: (
            <P>
              With no protocol sessions in 2026-07-28, any replica can serve any request, so standard
              load balancing works. Keep cross-call state in explicit handles stored in your
              existing data stores, not in process memory. Tool lists must not vary per connection,
              which also keeps replicas consistent.
            </P>
          ),
        },
        {
          id: "names",
          heading: "Tool naming across services",
          body: (
            <P>
              Tool names only need to be unique within a server, and the{" "}
              <Ext href={TOOLS}>tools spec</Ext> notes hosts combining servers may meet collisions
              (two services each with a <code>search</code> tool). Prefix by domain,
              such as <code>orders_search</code> and <code>tickets_search</code>, and describe when
              to use each.
            </P>
          ),
        },
        {
          id: "auth",
          heading: "Auth between services",
          body: (
            <ul className={UL}>
              <li>Each MCP server is its own OAuth resource server and MUST only accept tokens issued for it, per the <Ext href={AUTH}>authorization spec</Ext>.</li>
              <li>An MCP server calling downstream services should use its own credentials, not forward the user&apos;s MCP token (token passthrough is forbidden).</li>
              <li>Propagate user identity to downstream services through your existing service-to-service auth.</li>
            </ul>
          ),
        },
        {
          id: "ops",
          heading: "Operations",
          body: (
            <P>
              Treat MCP servers like any service: health checks, per-tool metrics, tracing through to
              the downstream calls, and versioned deploys. See{" "}
              <Link href="/docs/monitoring/observability-best-practices" className={L}>observability best practices</Link>{" "}
              and <Link href="/blog/mcp-design-patterns-production" className={L}>production design patterns</Link>.
            </P>
          ),
        },
      ]}
      evidence={[
        { source: "MCP docs: Architecture overview", url: ARCH, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Host creates one client per server; remote servers serve many clients; stateless requests." },
        { source: "MCP specification 2026-07-28: Tools", url: TOOLS, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Tool names unique per server; hosts aggregating servers SHOULD disambiguate; lists MUST NOT vary per connection; explicit state handles." },
        { source: "MCP specification 2026-07-28: Authorization", url: AUTH, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "MCP servers MUST only accept tokens issued for them and MUST NOT accept or transit other tokens." },
      ]}
      faqs={[
        { question: "Should each microservice have its own MCP server?", answer: "Often, one per domain works well for ownership. A gateway is an alternative when you want one endpoint." },
        { question: "Can MCP servers scale horizontally?", answer: "Yes. The 2026-07-28 protocol is stateless, so any replica can handle any request." },
        { question: "How do I avoid tool name clashes?", answer: "Prefix tools by domain and describe when each should be used." },
        { question: "Can an MCP server forward the user's token to other services?", answer: "No. Token passthrough is forbidden; use the server's own credentials downstream." },
        { question: "Where should cross-call state live?", answer: "In your data stores, referenced by explicit handles, not in process memory." },
      ]}
      related={[
        { href: "/blog/mcp-server-for-event-driven-architecture", label: "MCP in event-driven systems" },
        { href: "/glossary/gateway", label: "MCP gateway" },
        { href: "/blog/mcp-design-patterns-production", label: "MCP design patterns for production" },
        { href: "/blog/mcp-cloud-deployment-comparison", label: "Hosting MCP servers: cloud comparison" },
      ]}
    />
  );
}
