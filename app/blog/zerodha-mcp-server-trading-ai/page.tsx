import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "zerodha-mcp-server-trading-ai";
const TITLE = "Zerodha Kite MCP Server: Setup and Tools";
const DESCRIPTION =
  "Zerodha's official Kite MCP server lets Claude, Cursor and VS Code read your holdings, positions, margins and market data. Hosted endpoint, setup, the tool list, and what it cannot do.";
const REVIEWED = "2026-09-23";
const PRODUCT = "https://zerodha.com/products/mcp/";
const REPO = "https://github.com/zerodha/kite-mcp-server";
const ENDPOINT = "https://mcp.kite.trade/mcp";

const READ_TOOLS = [
  "login",
  "get_profile",
  "get_margins",
  "get_holdings",
  "get_positions",
  "get_mf_holdings",
  "get_orders",
  "get_trades",
  "get_order_history",
  "get_order_trades",
  "get_gtts",
  "get_quotes",
  "get_ltp",
  "get_ohlc",
  "get_historical_data",
  "search_instruments",
];
const WRITE_TOOLS = [
  "place_order",
  "modify_order",
  "cancel_order",
  "place_gtt_order",
  "modify_gtt_order",
  "delete_gtt_order",
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
      h1="Zerodha Kite MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Yes. Zerodha publishes an official MCP server, Kite MCP, with a hosted endpoint at ${ENDPOINT}. You log in with your Kite account, and an AI assistant can then read your portfolio, P&L, positions, margins and market data. Zerodha describes the hosted service as read-only: it excludes order placement, and you can revoke access at any time.`}
      sections={[
        {
          id: "what",
          heading: "What Kite MCP does",
          body: (
            <>
              <P>
                Zerodha&apos;s <Ext href={PRODUCT}>Kite MCP product page</Ext> says it lets you
                &ldquo;access your portfolio, P&amp;L, positions, margins, and market data in
                real-time&rdquo; from an AI assistant. It is built on the Kite Connect APIs.
              </P>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>Login is through Kite. You do not give your password to the AI tool.</li>
                <li>Access is read-only and can be revoked at any time.</li>
                <li>
                  Listed clients: Claude Desktop (macOS and Windows), Cursor, VS Code (with Copilot
                  Chat or Claude), Windsurf and Claude on Linux.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "setup",
          heading: "Set up the hosted server",
          body: (
            <>
              <P>The endpoint is:</P>
              <Code>{ENDPOINT}</Code>
              <P>
                For Claude Desktop, the{" "}
                <Ext href={REPO}>kite-mcp-server README</Ext> gives this config, which bridges the
                remote server through <code>mcp-remote</code> (Node.js required):
              </P>
              <Code>{`{
  "mcpServers": {
    "kite": {
      "command": "npx",
      "args": ["mcp-remote", "${ENDPOINT}"]
    }
  }
}`}</Code>
              <P>
                Save it in <code>claude_desktop_config.json</code>, fully quit and reopen Claude
                Desktop, then ask it to log you in to Kite (the server has a <code>login</code>{" "}
                tool) and complete sign-in on Kite&apos;s page in your browser. Clients that accept
                a remote MCP URL directly can use the endpoint as-is.
              </P>
            </>
          ),
        },
        {
          id: "tools",
          heading: "Tools",
          body: (
            <>
              <P>The open-source server defines these read tools:</P>
              <P>
                {READ_TOOLS.map((t, i) => (
                  <span key={t}>
                    <code>{t}</code>
                    {i < READ_TOOLS.length - 1 ? ", " : ""}
                  </span>
                ))}
              </P>
              <P>It also defines order tools:</P>
              <P>
                {WRITE_TOOLS.map((t, i) => (
                  <span key={t}>
                    <code>{t}</code>
                    {i < WRITE_TOOLS.length - 1 ? ", " : ""}
                  </span>
                ))}
              </P>
              <P>
                The README states that the hosted version at <code>mcp.kite.trade</code>{" "}
                &ldquo;excludes potentially destructive trading operations for security.&rdquo; So
                on the hosted endpoint, the assistant can analyse but cannot place, modify or cancel
                orders.
              </P>
            </>
          ),
        },
        {
          id: "self-host",
          heading: "Self-hosting (advanced)",
          body: (
            <>
              <P>
                The server is written in Go and released under the MIT License. To run it yourself
                you need your own Kite Connect app credentials:
              </P>
              <Code>{`git clone https://github.com/zerodha/kite-mcp-server
cd kite-mcp-server
go build -o kite-mcp-server
./kite-mcp-server`}</Code>
              <P>
                It reads <code>KITE_API_KEY</code>, <code>KITE_API_SECRET</code>,{" "}
                <code>APP_MODE</code>, <code>APP_PORT</code>, <code>APP_HOST</code> and{" "}
                <code>PUBLIC_BASE_URL</code> from the environment. A self-hosted build can expose the
                order tools listed above. If you enable them, every order the assistant proposes is
                a real order on your account; confirm each one yourself.
              </P>
            </>
          ),
        },
        {
          id: "use",
          heading: "Things it is useful for",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Summarising holdings, sector split and day P&amp;L in plain language</li>
              <li>Checking available margin before you plan a trade</li>
              <li>Pulling historical candles for an instrument into an analysis</li>
              <li>Reviewing today&apos;s orders and trades</li>
            </ul>
          ),
        },
        {
          id: "caution",
          heading: "Before you rely on it",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                A language model can misread numbers or pick the wrong instrument. Check anything
                important in Kite itself.
              </li>
              <li>Revoke access from your Kite account when you no longer need it.</li>
              <li>This page explains software setup. It is not investment advice.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Zerodha: Kite MCP product page",
          url: PRODUCT,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Official Zerodha product. Portfolio, P&L, positions, margins and market data; login via Kite with no credential sharing; read-only; revocable; lists Claude Desktop, Cursor, VS Code, Windsurf and Claude on Linux.",
          limitations: "The product page does not document per-client setup steps or session expiry.",
        },
        {
          source: "zerodha/kite-mcp-server (GitHub)",
          url: REPO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "MIT-licensed Go server; hosted endpoint https://mcp.kite.trade/mcp (also /sse); Claude Desktop config via npx mcp-remote; 16 read tools and 6 order/GTT tools; hosted version excludes destructive trading operations; self-host env vars listed.",
          limitations: "Tool list reflects the repository on the review date.",
        },
      ]}
      faqs={[
        {
          question: "Is Kite MCP official?",
          answer:
            "Yes. Zerodha lists it as a product at zerodha.com/products/mcp and publishes the source at github.com/zerodha/kite-mcp-server.",
        },
        {
          question: "Can Kite MCP place trades?",
          answer:
            "Not on the hosted endpoint. Zerodha describes it as read-only, and the README says the hosted version excludes destructive trading operations. The open-source code includes order tools that a self-hosted build can expose.",
        },
        {
          question: "Do I have to share my Zerodha password with Claude?",
          answer:
            "No. You log in through Kite's own login page. The AI tool never receives your password.",
        },
        {
          question: "Do I need a Kite Connect subscription?",
          answer:
            "Zerodha's product page does not say one is required for the hosted service. Self-hosting needs your own Kite Connect API key and secret.",
        },
        {
          question: "Which AI apps work with it?",
          answer:
            "Zerodha lists Claude Desktop, Cursor, VS Code with Copilot Chat or Claude, Windsurf, and Claude on Linux. Any MCP client that can connect to a remote server should work.",
        },
      ]}
      related={[
        { href: "/blog/upstox-mcp-trading", label: "Upstox MCP server" },
        { href: "/blog/dhan-mcp-fo-trading", label: "Dhan MCP server" },
        { href: "/blog/groww-mcp-investments", label: "Groww MCP server" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
      ]}
    />
  );
}
