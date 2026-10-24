import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "groww-mcp-investments";
const TITLE = "Groww MCP Server: Official Setup Guide";
const DESCRIPTION =
  "Groww's official MCP server lets Claude, Cursor, VS Code and Windsurf analyse your Groww stocks and F&O and place orders. Endpoint, setup, DDPI, and current limits.";
const REVIEWED = "2026-09-23";
const UPDATE = "https://groww.in/updates/groww-mcp";
const ENDPOINT = "https://mcp.groww.in/mcp";

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
      h1="Groww MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Yes. Groww publishes an official MCP server at ${ENDPOINT}. After you allow access through a browser sign-in, an AI assistant can analyse your Groww portfolio and place stock and F&O orders. Order placement needs DDPI authorisation. Groww says it currently covers stocks and F&O only; mutual funds, IPOs and bonds are not supported yet.`}
      sections={[
        {
          id: "what",
          heading: "What it can do",
          body: (
            <>
              <P>
                Groww&apos;s <Ext href={UPDATE}>announcement</Ext> shows two kinds of request:
              </P>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>Analysis</strong>: top performers this quarter, share of the portfolio
                  in large caps, positions and market moves.
                </li>
                <li>
                  <strong>Orders</strong>: buy a rupee amount of a stock at a set price, place limit
                  orders, place stop-loss orders relative to your purchase price.
                </li>
              </ul>
              <P>
                Groww states there is &ldquo;no background syncing&rdquo; and &ldquo;no data storage
                on AI servers&rdquo;. It also calls the product &ldquo;very early-stage
                tech&rdquo; and warns that occasional hiccups may happen.
              </P>
            </>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <h3 className="mb-2 mt-4 font-semibold text-slate-900 dark:text-slate-100">Claude (custom connector)</h3>
              <P>
                Groww lists Claude Pro through custom connectors. Add a custom connector with this
                URL and allow Claude to access your Groww account when the browser opens:
              </P>
              <Code>{ENDPOINT}</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">Cursor, VS Code and Windsurf</h3>
              <P>Groww&apos;s config uses its own npm bridge package:</P>
              <Code>{`{
  "mcpServers": {
    "growwmcp": {
      "command": "npx",
      "args": ["@groww/mcp@latest", "${ENDPOINT}", "52155"]
    }
  }
}`}</Code>
              <P>
                This needs Node.js. The last argument is a local port used during sign-in; keep it
                as Groww gives it unless it clashes with something already running.
              </P>
            </>
          ),
        },
        {
          id: "ddpi",
          heading: "DDPI and order placement",
          body: (
            <>
              <P>
                Reading your portfolio needs only the sign-in. Placing orders also needs DDPI (Demat
                Debit and Pledge Instruction) authorisation on your Groww account, according to
                Groww.
              </P>
              <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  Orders are real. Ask the assistant to repeat the stock, quantity or amount, order
                  type and price before it places anything.
                </li>
                <li>
                  Relative instructions such as &ldquo;5% below my purchase price&rdquo; depend on
                  the model computing the right number. Check the price it sends.
                </li>
                <li>This page explains software setup. It is not investment advice.</li>
              </ul>
            </>
          ),
        },
        {
          id: "limits",
          heading: "Current limits",
          body: (
            <P>
              As of {REVIEWED}, Groww says the MCP supports stocks and F&amp;O only, and that
              &ldquo;Fundamental analysis, Mutual funds, IPOs, bonds, etc. will be added&rdquo;.
              If you mainly hold mutual funds on Groww, it will not see them yet.
            </P>
          ),
        },
        {
          id: "community",
          heading: "Community Groww MCP projects",
          body: (
            <P>
              GitHub also has unofficial Groww MCP servers, for example{" "}
              <Ext href="https://github.com/arkapravasinha/groww-mcp-server">arkapravasinha/groww-mcp-server</Ext>.
              They are not affiliated with Groww. With an official server available, use Groww&apos;s
              own unless you have a specific reason not to.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Groww: Groww MCP update",
          url: UPDATE,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://mcp.groww.in/mcp; analysis and order placement; browser-based sign-in; DDPI required for orders; Claude Pro via custom connectors, Cursor, VS Code, Windsurf; npx @groww/mcp@latest config; no background syncing and no data storage on AI servers; stocks and F&O only; early-stage.",
          limitations: "Groww does not publish a tool list on this page.",
        },
        {
          source: "arkapravasinha/groww-mcp-server",
          url: "https://github.com/arkapravasinha/groww-mcp-server",
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Community Groww MCP server.",
          limitations: "Not reviewed; not affiliated with Groww.",
        },
      ]}
      faqs={[
        {
          question: "Is the Groww MCP server official?",
          answer: "Yes. Groww announced it on groww.in/updates/groww-mcp with the endpoint https://mcp.groww.in/mcp.",
        },
        {
          question: "Can it place orders on Groww?",
          answer:
            "Yes, for stocks and F&O. Groww says order placement requires DDPI authorisation on your account.",
        },
        {
          question: "Does it support mutual funds?",
          answer:
            "Not yet. Groww lists mutual funds, IPOs, bonds and fundamental analysis as coming later.",
        },
        {
          question: "Does Groww store my data on the AI provider's servers?",
          answer:
            "Groww states there is no background syncing and no data storage on AI servers. What the AI client itself keeps depends on that client's own policies.",
        },
        {
          question: "Which apps can I use it with?",
          answer: "Groww lists Claude Pro (custom connectors), Cursor, VS Code and Windsurf.",
        },
      ]}
      related={[
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/blog/upstox-mcp-trading", label: "Upstox MCP server" },
        { href: "/blog/dhan-mcp-fo-trading", label: "Dhan MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
