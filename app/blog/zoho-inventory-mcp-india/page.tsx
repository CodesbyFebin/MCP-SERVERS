import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "zoho-inventory-mcp-india";
const TITLE = "Zoho Inventory MCP: Official Setup and Uses";
const DESCRIPTION =
  "Zoho Inventory works with Claude, ChatGPT, Cursor and Windsurf through Zoho's official MCP platform. What it can do, how to set it up at mcp.zoho.com, and third-party alternatives.";
const REVIEWED = "2026-09-23";
const BLOG = "https://www.zoho.com/blog/inventory/model-context-protocol-inventory-software.html";
const SERVICES = "https://www.zoho.com/mcp/services/zoho-services.html";
const STEPS = "https://www.zoho.com/mail/help/mcp/multiple-services-single-server.html";
const CDATA = "https://github.com/CDataSoftware/zoho-inventory-mcp-server-by-cdata";

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
      h1="Zoho Inventory MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Yes. Zoho announced Zoho Inventory MCP in July 2026. Zoho Inventory is also on the supported-services list of Zoho MCP, Zoho's official MCP platform. It lets AI tools such as Claude, ChatGPT, Cursor and Windsurf check stock, create purchase orders, allocate inventory, create shipments and analyse trends, within the permissions and approval rules you already use in Zoho Inventory."
      sections={[
        {
          id: "what",
          heading: "What it can do",
          body: (
            <>
              <P>Zoho&apos;s <Ext href={BLOG}>announcement</Ext> lists operations including:</P>
              <ul className="mb-4 list-inside list-disc space-y-1 text-slate-700 dark:text-slate-300">
                <li>Check stock availability and investigate stockouts</li>
                <li>Create purchase orders and transfer orders</li>
                <li>Allocate inventory and create shipments</li>
                <li>Generate invoices for shipped orders</li>
                <li>Review trends: turnover, return rates, demand spikes and vendor delays</li>
              </ul>
              <P>
                Zoho says it &ldquo;operates within the same permissions and approval structures
                you&apos;ve already established&rdquo;, and that sensitive actions can require
                approval before they run.
              </P>
            </>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <P>
                Zoho Inventory is on Zoho MCP&apos;s <Ext href={SERVICES}>supported services</Ext>{" "}
                list. The flow is the same as for other Zoho apps (<Ext href={STEPS}>Zoho&apos;s
                guide</Ext>):
              </P>
              <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
                <li>Sign in at <code>mcp.zoho.com</code>.</li>
                <li>Create a new MCP server or open an existing one.</li>
                <li>Add More Tools → select Zoho Inventory → choose tools → Add Now.</li>
                <li>Accept the OAuth scopes.</li>
                <li>Copy the MCP URL into your AI client and authenticate.</li>
              </ol>
            </>
          ),
        },
        {
          id: "alt",
          heading: "Third-party alternatives",
          body: (
            <>
              <P>
                Integration vendors also offer Zoho Inventory MCP
                access. For example, <Ext href={CDATA}>CData&apos;s Zoho Inventory MCP server</Ext>{" "}
                is read-only and works through CData&apos;s JDBC driver. Zapier, Pipedream and
                Composio also list Zoho Inventory MCP integrations.
              </P>
              <P>
                These add another company to your data path and usually their own pricing. With an
                official option now available, compare them on what they add, not just access.
              </P>
            </>
          ),
        },
        {
          id: "care",
          heading: "Before automating stock and orders",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Start with read-only tools until you trust the answers.</li>
              <li>Use Zoho Inventory&apos;s approval rules for purchase orders and shipments.</li>
              <li>
                Check totals and quantities the assistant proposes; a misread unit or SKU becomes a
                real order.
              </li>
            </ul>
          ),
        },
        {
          id: "desk",
          heading: "Combine with Zoho Desk",
          body: (
            <P>
              One Zoho MCP server can hold tools from several apps. Adding{" "}
              <Link href="/blog/zoho-desk-mcp-india" className="text-blue-600 hover:underline dark:text-blue-400">
                Zoho Desk
              </Link>{" "}
              lets a support agent check stock or shipment status while handling a ticket.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Zoho blog: Meet Zoho Inventory MCP (July 7, 2026)",
          url: BLOG,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Operations: purchase orders, stock checks, allocation, shipments, stockout investigation, trends, invoices, transfer orders, analytics; clients Claude, ChatGPT, Cursor, Windsurf; respects existing permissions and approvals.",
          limitations: "The post gives no setup steps; setup follows the general Zoho MCP flow.",
        },
        {
          source: "Zoho MCP: Supported Zoho services",
          url: SERVICES,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Zoho Inventory is listed among supported services.",
        },
        {
          source: "Zoho Mail help: Use multiple services in one MCP server",
          url: STEPS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Create server at mcp.zoho.com, add product tools, accept OAuth scopes, connect client.",
        },
        {
          source: "CData Zoho Inventory MCP server",
          url: CDATA,
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Read-only MCP server via CData JDBC drivers.",
          limitations: "Based on repository description; not tested.",
        },
      ]}
      faqs={[
        {
          question: "Does Zoho Inventory have an official MCP server?",
          answer: "Yes. Zoho announced Zoho Inventory MCP on its blog in July 2026, and lists Zoho Inventory among Zoho MCP's supported services.",
        },
        {
          question: "Can it create purchase orders?",
          answer: "Yes. Zoho lists creating purchase orders among its supported operations.",
        },
        {
          question: "Which AI tools are supported?",
          answer: "Zoho names Claude, ChatGPT, Cursor and Windsurf, among others.",
        },
        {
          question: "Will it bypass my approval workflow?",
          answer: "Zoho says it operates within your existing permissions and approval structures, and sensitive actions can require approval.",
        },
        {
          question: "Is the CData server official?",
          answer: "No. CData is a third-party vendor; its Zoho Inventory MCP server is read-only.",
        },
      ]}
      related={[
        { href: "/blog/zoho-desk-mcp-india", label: "Zoho Desk MCP" },
        { href: "/glossary/mcp-india-ecommerce", label: "MCP for Indian e-commerce" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
