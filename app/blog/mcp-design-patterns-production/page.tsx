import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-design-patterns-production";
const TITLE = "MCP Server Design Patterns for Production";
const DESCRIPTION =
  "Production patterns for MCP servers from the 2026-07-28 spec: explicit state handles, actionable tool errors, structured output, caching hints, pagination, progress, and least privilege.";
const REVIEWED = "2026-09-23";
const TOOLS = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";
const ARCH = "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture";
const SEC = "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices";

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
      h1="MCP Design Patterns for Production"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Production MCP servers follow a few patterns that come straight from the 2026-07-28 spec: keep state in explicit handles because the protocol has no sessions; return tool failures as isError results the model can act on; declare output schemas when programs consume results; use caching hints, pagination and progress; and grant the least privilege possible."
      sections={[
        {
          id: "handles",
          heading: "1. Explicit state handles",
          body: (
            <>
              <P>
                MCP is stateless. The <Ext href={TOOLS}>tools spec</Ext> recommends returning a
                handle from a creation tool and accepting it as an argument afterwards:
              </P>
              <Code>{`// → tools/call  { "name": "create_basket", "arguments": {} }
// ← { "structuredContent": { "basket_id": "bsk_a1b2c3" } }
// → tools/call  { "name": "add_item", "arguments": { "basket_id": "bsk_a1b2c3", "sku": "..." } }`}</Code>
              <ul className={UL}>
                <li>Make handles opaque and random; authorise the caller against the handle on every call.</li>
                <li>State the lifetime in the creation tool&apos;s description (&ldquo;expires after 24 hours of inactivity&rdquo;).</li>
                <li>Return a clear tool error for an expired handle so the model can create a new one.</li>
              </ul>
            </>
          ),
        },
        {
          id: "errors",
          heading: "2. Errors the model can fix",
          body: (
            <P>
              Return business and validation failures as results with <code>isError: true</code>{" "}
              and a message that says what to change (&ldquo;date must be in the future; today is
              …&rdquo;). Reserve JSON-RPC errors for protocol problems such as an unknown tool.
            </P>
          ),
        },
        {
          id: "output",
          heading: "3. Structured output where programs read it",
          body: (
            <P>
              Declare an <Link href="/glossary/mcp-tool-output-schema" className={L}>outputSchema</Link>{" "}
              and return <code>structuredContent</code> when another program consumes the result,
              plus the same JSON as text for older clients.
            </P>
          ),
        },
        {
          id: "lists",
          heading: "4. Deterministic, cacheable lists",
          body: (
            <ul className={UL}>
              <li>Return tools in a deterministic order; the spec notes it helps client caching and model prompt-cache hit rates.</li>
              <li>Use <code>ttlMs</code> and <code>cacheScope</code> on list results so clients can cache them.</li>
              <li>Paginate long lists with cursors.</li>
              <li>Keep <code>tools/list</code> identical for the same authorization; it must not vary per connection.</li>
            </ul>
          ),
        },
        {
          id: "long",
          heading: "5. Long-running work",
          body: (
            <P>
              Send <Link href="/glossary/mcp-progress" className={L}>progress notifications</Link> so
              clients that reset their timeout on progress keep waiting, and stop work promptly on
              cancellation. For work that outlives a request, the <Ext href={ARCH}>architecture
              overview</Ext> points to the optional Tasks extension, which returns a durable handle
              to poll.
            </P>
          ),
        },
        {
          id: "names",
          heading: "6. Clear names and descriptions",
          body: (
            <P>
              Use specific tool names (<code>calculator_arithmetic</code> rather than{" "}
              <code>calculate</code>), describe when to use each tool, and document every input
              property. Hosts combine tools from many servers, so generic names collide.
            </P>
          ),
        },
        {
          id: "security",
          heading: "7. Least privilege by default",
          body: (
            <P>
              Validate inputs, rate-limit calls and sanitise outputs, as the spec requires; split
              read and write scopes; and follow the <Ext href={SEC}>security best practices</Ext> on
              token audience, handles and local server safety. See{" "}
              <Link href="/blog/mcp-role-based-access-control" className={L}>access control for MCP</Link>.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Tools",
          url: TOOLS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Stateful tools via explicit handles with authorization, opacity, lifetime and expiry guidance; isError vs protocol errors; outputSchema/structuredContent; deterministic ordering; list must not vary per connection; security MUSTs.",
        },
        {
          source: "MCP docs: Architecture overview",
          url: ARCH,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "ttlMs and cacheScope caching fields; naming example calculator_arithmetic; Tasks extension for durable handles.",
        },
        {
          source: "MCP docs: Security best practices",
          url: SEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "State handle hijacking mitigations; scope minimization.",
        },
      ]}
      faqs={[
        {
          question: "How do I keep state between tool calls without sessions?",
          answer: "Return an explicit handle from a creation tool and accept it as an argument on later calls, authorising the caller each time.",
        },
        {
          question: "Should a failed API call be a JSON-RPC error?",
          answer: "No. Return it as a tool result with isError: true so the model can react.",
        },
        {
          question: "Why does tool order matter?",
          answer: "Deterministic ordering lets clients cache the list and improves prompt-cache hit rates, per the spec.",
        },
        {
          question: "How do I handle jobs that take minutes?",
          answer: "Send progress notifications, honour cancellation, and consider the Tasks extension for durable handles.",
        },
        {
          question: "Do I need an output schema for every tool?",
          answer: "Only where programs consume the result. Free-text answers are fine as plain content.",
        },
      ]}
      related={[
        { href: "/blog/mcp-microservices-architecture", label: "MCP in a microservices architecture" },
        { href: "/glossary/mcp-p95-latency", label: "p95 latency for MCP tools" },
        { href: "/docs/monitoring/observability-best-practices", label: "MCP observability" },
        { href: "/complete-guide-mcp-servers", label: "The complete guide to MCP servers" },
      ]}
    />
  );
}
