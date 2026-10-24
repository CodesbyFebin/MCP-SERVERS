import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-servers";
const PATH = "/best/mcp-servers";
const TITLE = "Best MCP Servers: Where to Start";
const DESCRIPTION =
  "Where to start with MCP servers: the official reference servers, official servers from Indian companies, where to find more, and a checklist for judging any server before you connect it.";
const REVIEWED = "2026-09-23";
const REFERENCE = "https://github.com/modelcontextprotocol/servers";
const REGISTRY = "https://registry.modelcontextprotocol.io/";

const L = "text-blue-600 hover:underline dark:text-blue-400";
const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";

const REFERENCE_SERVERS: [string, string][] = [
  ["Everything", "Reference and test server with prompts, resources and tools"],
  ["Fetch", "Fetches web content and converts it for LLM use"],
  ["Filesystem", "File operations with configurable access controls"],
  ["Git", "Read, search and manipulate Git repositories"],
  ["Memory", "Persistent memory as a knowledge graph"],
  ["Sequential Thinking", "Structured, step-by-step problem solving"],
  ["Time", "Time and timezone conversion"],
];

const INDIA: [string, string, string, string][] = [
  ["Zerodha Kite", "/blog/zerodha-mcp-server-trading-ai", "Portfolio, positions, margins, market data", "Read-only (hosted)"],
  ["Upstox", "/blog/upstox-mcp-trading", "Account data for research", "Read-only"],
  ["Dhan", "/blog/dhan-mcp-fo-trading", "Portfolio, market data, margin, alerts, orders", "Can place orders"],
  ["Groww", "/blog/groww-mcp-investments", "Stocks and F&O analysis and orders", "Can place orders (DDPI)"],
  ["Swiggy", "/blog/swiggy-mcp-india", "Food, Instamart, Dineout", "Places COD orders"],
  ["Zomato", "/blog/zomato-mcp-india", "Restaurant search, cart, ordering", "Places orders"],
  ["PhonePe PG docs", "/blog/phonepe-mcp-server-india", "Payment Gateway documentation", "Read-only docs"],
];

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
      section={{ label: "Servers", href: "/servers" }}
      title={TITLE}
      h1="Best MCP Servers: Where to Start"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="There is no single best MCP server; the right one depends on the system you want your AI assistant to reach. Start with the official reference servers to learn how MCP works, prefer servers published by the company that owns the data, and look up others in the official MCP Registry. Before connecting any server, check who publishes it, what it can change, and how it signs in."
      sections={[
        {
          id: "note",
          heading: "How this list is built",
          body: (
            <P>
              This is not a ranking and nothing here is paid placement. Every server below is
              either maintained by the MCP project or published by the company whose service it
              connects to, and each links to a page on this site with sources. We have not run
              benchmarks, so we make no speed or quality claims.
            </P>
          ),
        },
        {
          id: "reference",
          heading: "Official reference servers",
          body: (
            <>
              <P>
                The MCP project maintains these in{" "}
                <Ext href={REFERENCE}>modelcontextprotocol/servers</Ext>. The repository says they
                are &ldquo;intended as reference implementations to demonstrate MCP features and SDK
                usage&rdquo;, which makes them good for learning and testing, not necessarily for
                production.
              </P>
              <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left dark:bg-slate-900">
                      <th className={TH}>Server</th>
                      <th className={TH}>What it does</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                    {REFERENCE_SERVERS.map(([n, d]) => (
                      <tr key={n}>
                        <td className="px-4 py-2 font-medium">{n}</td>
                        <td className="px-4 py-2">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>
                Several servers that used to live there, including GitHub, GitLab, PostgreSQL,
                Slack, SQLite, Puppeteer and Brave Search, have been archived. For those services,
                look for a server published by the vendor itself. Our{" "}
                <Link href="/servers/mcp-server-postgres" className={L}>
                  PostgreSQL MCP page
                </Link>{" "}
                covers the Postgres options.
              </P>
            </>
          ),
        },
        {
          id: "india",
          heading: "Official servers from Indian companies",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className={TH}>Company</th>
                    <th className={TH}>Covers</th>
                    <th className={TH}>Can it act?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  {INDIA.map(([n, href, what, act]) => (
                    <tr key={n}>
                      <td className="px-4 py-2 font-medium">
                        <Link href={href} className={L}>
                          {n}
                        </Link>
                      </td>
                      <td className="px-4 py-2">{what}</td>
                      <td className="px-4 py-2">{act}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "find",
          heading: "Where to find more",
          body: (
            <P>
              The MCP project points to the <Ext href={REGISTRY}>official MCP Registry</Ext> for a
              list of published servers. Treat any listing, including ours, as a starting point:
              a directory entry says a server exists, not that it is safe or maintained.
            </P>
          ),
        },
        {
          id: "checklist",
          heading: "Checklist before you connect a server",
          body: (
            <ol className="list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Who publishes it?</strong> The company that owns the service, the MCP
                project, or an individual? Community servers can be excellent, but you are trusting
                that person&apos;s code.
              </li>
              <li>
                <strong>What can it change?</strong> Reading data is low risk. Placing orders,
                sending messages, deleting files or paying are not. Prefer read-only when that is
                all you need.
              </li>
              <li>
                <strong>How does it sign in?</strong> OAuth in your browser is better than pasting
                passwords, API keys or TOTP secrets into a config file.
              </li>
              <li>
                <strong>Where does it run?</strong> A local stdio server runs with your user&apos;s
                permissions. A remote server sees whatever you send it.
              </li>
              <li>
                <strong>Is it maintained?</strong> Check recent commits, open issues and whether it
                documents its tools.
              </li>
              <li>
                <strong>What else is connected?</strong> Text returned by one server can influence
                how the model uses another. Keep servers that can spend money or delete data
                separate from ones that read untrusted content.
              </li>
            </ol>
          ),
        },
      ]}
      evidence={[
        {
          source: "modelcontextprotocol/servers (GitHub)",
          url: REFERENCE,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Current reference servers: Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, Time; archived servers include GitHub, GitLab, PostgreSQL, Slack, SQLite, Puppeteer, Brave Search and others; reference servers are intended to demonstrate MCP features and SDK usage; points to the MCP Registry for published servers.",
        },
        {
          source: "Individual company pages on this site",
          url: "https://www.mcpserver.in/blog/zerodha-mcp-server-trading-ai",
          type: "editorial",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Each company row links to a page citing that company's own documentation or repository for endpoint, capabilities and whether it can act on the account.",
        },
      ]}
      faqs={[
        {
          question: "What is the best MCP server?",
          answer:
            "It depends on what you want the assistant to reach. For learning, start with the official Filesystem or Fetch reference servers. For a specific service, prefer the server that service publishes.",
        },
        {
          question: "Are the official reference servers production-ready?",
          answer:
            "The MCP project describes them as reference implementations that demonstrate MCP features and SDK usage. Review them as you would any code before relying on them in production.",
        },
        {
          question: "Where is the official list of MCP servers?",
          answer: "The MCP project points to the MCP Registry at registry.modelcontextprotocol.io.",
        },
        {
          question: "Which Indian companies publish MCP servers?",
          answer:
            "As of the review date, Zerodha, Upstox, Dhan, Groww, Swiggy and Zomato publish servers for their services, and PhonePe publishes one for its Payment Gateway documentation.",
        },
        {
          question: "Is a community MCP server safe to use?",
          answer:
            "It can be, but you are running someone else's code with access to your accounts. Check who maintains it, what it can change, and how it handles credentials.",
        },
      ]}
      related={[
        { href: "/servers", label: "Browse MCP servers" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
      ]}
    />
  );
}
