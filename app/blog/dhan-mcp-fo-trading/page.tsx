import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "dhan-mcp-fo-trading";
const TITLE = "Dhan MCP Server: Official Setup and Tools";
const DESCRIPTION =
  "Dhan's official MCP server connects Claude, ChatGPT, Cursor and Codex to your Dhan account over OAuth. Endpoint, setup per client, the 9 tools, and what order placement means.";
const REVIEWED = "2026-09-23";
const ENDPOINT = "https://mcp.dhan.co/mcp";
const DOCS = "https://docs.dhanhq.co/mcp/";
const INSTALL = "https://docs.dhanhq.co/mcp/getting-started/installation";
const ARCH = "https://docs.dhanhq.co/mcp/overview/architecture";
const TOOLS_DOC = "https://docs.dhanhq.co/mcp/tools/orders";

const TOOLS: [string, string][] = [
  ["portfolio_agent_tool", "Funds, holdings, positions and today's trades"],
  ["orderbook_agent_tool", "Order book, order details and rejection reasons, super order book"],
  ["tradebook_agent_tool", "Executed trades and fills"],
  ["trading_agent_tool", "Place, modify and cancel orders, including super orders"],
  ["market_data_agent_tool", "LTP, full quotes with depth, option chains and expiries"],
  ["historical_data_agent_tool", "Intraday and daily OHLCV candles"],
  ["margin_agent_tool", "Margin for a single order or a basket"],
  ["alerts_agent_tool", "Create, list and delete price alerts, including alerts that place orders"],
  ["search_agent_tool", "Look up security IDs and derivatives by expiry"],
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
      h1="Dhan MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Yes. Dhan runs an official MCP server at ${ENDPOINT}. You connect it from Claude, ChatGPT, Cursor, Codex or another MCP client and sign in to Dhan with OAuth. It can read your portfolio and market data and can also place, modify and cancel real orders, including F&O orders, so treat every order it proposes as your own.`}
      sections={[
        {
          id: "what",
          heading: "What Dhan MCP does",
          body: (
            <>
              <P>
                Dhan&apos;s <Ext href={DOCS}>MCP documentation</Ext> describes it as a
                first-party server that connects &ldquo;your live Dhan account to any
                MCP-compatible client — trade, manage your portfolio, fetch market data, set alerts
                and calculate margins through natural language.&rdquo;
              </P>
              <P>
                Requests flow from your AI client to <code>mcp.dhan.co</code>, through Dhan&apos;s
                internal infrastructure, and on to NSE, BSE or MCX. Dhan&apos;s docs say sign-in
                uses a per-session permission model with explicit consent, and that your session
                stays on the server rather than as a token in a config file.
              </P>
            </>
          ),
        },
        {
          id: "prereq",
          heading: "What you need",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>An active Dhan account with trading access</li>
              <li>
                A Data API subscription only if you want live quotes and option chains; Dhan lists
                it as optional
              </li>
              <li>An MCP client that supports remote servers with OAuth</li>
            </ul>
          ),
        },
        {
          id: "setup",
          heading: "Setup by client",
          body: (
            <>
              <h3 className="mb-2 mt-4 font-semibold text-slate-900 dark:text-slate-100">Claude (web and Desktop)</h3>
              <P>
                In Claude, open Settings → Connectors, add a custom connector named Dhan with the
                URL below, click Connect and finish the Dhan login. Dhan notes the connector also
                syncs to Claude Desktop.
              </P>
              <Code>{ENDPOINT}</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">Claude Code</h3>
              <Code>{`claude mcp add --transport http dhan ${ENDPOINT}`}</Code>
              <P>
                Start <code>claude</code>, run <code>/mcp</code>, pick <strong>dhan</strong> and
                choose Authenticate to sign in through your browser.
              </P>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">Codex CLI</h3>
              <Code>{`codex mcp add dhan --url ${ENDPOINT}`}</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">Cursor</h3>
              <P>Settings → Tools &amp; MCPs → New MCP Server, then paste and click Connect:</P>
              <Code>{`{
  "mcpServers": {
    "dhan": {
      "url": "${ENDPOINT}"
    }
  }
}`}</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">ChatGPT</h3>
              <P>
                Dhan documents a manual route through developer mode: Settings → Apps → Advanced
                Settings → Developer Mode, then Create App with name Dhan, OAuth authentication and
                the MCP URL above.
              </P>
              <P>
                To check it worked, Dhan suggests asking: &ldquo;Check my holdings with Dhan
                MCP&rdquo;. Full per-client steps, including OpenCode, are on Dhan&apos;s{" "}
                <Ext href={INSTALL}>installation page</Ext>.
              </P>
            </>
          ),
        },
        {
          id: "tools",
          heading: "The 9 tools",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">Tool</th>
                    <th className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">Covers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {TOOLS.map(([name, what]) => (
                    <tr key={name}>
                      <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">{name}</td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "fo",
          heading: "F&O: what to watch",
          body: (
            <>
              <P>
                Dhan&apos;s examples include option chains for NIFTY, BANKNIFTY expiries, super
                orders with target, stop-loss and trailing values, and alerts that place a limit
                order when a price is crossed. These are real, leveraged orders.
              </P>
              <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  Ask the assistant to state the contract, expiry, strike, side, lot size, order
                  type and price, and confirm each one before it calls the trading tool.
                </li>
                <li>
                  An alert that places an order will fire later, when you may not be watching.
                  Review active alerts regularly.
                </li>
                <li>
                  Dhan&apos;s separate Agent Skills pack lists guardrails such as order
                  confirmation before every place, modify or cancel and LIMIT orders by default.
                  Those are documented for the skills, so do not assume the same checks exist in
                  every MCP client.
                </li>
                <li>This page explains software setup. It is not investment advice.</li>
              </ul>
            </>
          ),
        },
        {
          id: "community",
          heading: "Community alternatives",
          body: (
            <P>
              Before the official server, developers published community Dhan MCP servers, for
              example the <code>dhan-mcp-server</code> package on PyPI, which reads a{" "}
              <code>DHAN_ACCESS_TOKEN</code> from your config. The official server avoids storing a
              token in a local file, so prefer it unless you need something it does not offer.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "DhanHQ docs: Dhan MCP installation",
          url: INSTALL,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://mcp.dhan.co/mcp; OAuth; setup for Claude web/Desktop, Claude Code (claude mcp add --transport http), ChatGPT developer mode, Codex (codex mcp add --url), Cursor JSON, OpenCode and custom clients; prerequisites: active Dhan account with trading access, Data API subscription optional.",
        },
        {
          source: "DhanHQ docs: Dhan MCP tools",
          url: TOOLS_DOC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Tool pages list portfolio_agent_tool, orderbook_agent_tool, tradebook_agent_tool, trading_agent_tool, market_data_agent_tool, historical_data_agent_tool, margin_agent_tool, alerts_agent_tool and search_agent_tool with example prompts including order placement.",
          limitations: "Docs give example prompts, not full input schemas.",
        },
        {
          source: "DhanHQ docs: Dhan MCP architecture and overview",
          url: ARCH,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Flow: client → mcp.dhan.co → DEXT → NSE/BSE/MCX; per-session permission model with explicit consent; session stays on the server with no tokens in config files.",
        },
        {
          source: "dhan-mcp-server (PyPI)",
          url: "https://pypi.org/project/dhan-mcp-server/",
          type: "package-registry",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Community package configured with DHAN_CLIENT_ID and DHAN_ACCESS_TOKEN environment variables.",
          limitations: "Based on search summaries of the listing; code not reviewed.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Dhan MCP server?",
          answer: "Yes. Dhan documents it at docs.dhanhq.co/mcp, with the endpoint https://mcp.dhan.co/mcp.",
        },
        {
          question: "Can Dhan MCP place F&O orders?",
          answer:
            "Yes. Its trading tool can place, modify and cancel orders, including super orders, and its examples cover options. Confirm every order detail before the assistant submits it.",
        },
        {
          question: "Do I need to paste an access token into a config file?",
          answer:
            "Not with the official server. It uses OAuth sign-in, and Dhan says the session stays on its server.",
        },
        {
          question: "Do I need the Data API subscription?",
          answer:
            "Only for live quotes and option chains, according to Dhan's prerequisites. Portfolio and order tools need an active Dhan account with trading access.",
        },
        {
          question: "Does it work with ChatGPT?",
          answer:
            "Dhan documents a manual setup through ChatGPT's developer mode and says a native integration is on the way.",
        },
      ]}
      related={[
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/blog/upstox-mcp-trading", label: "Upstox MCP server" },
        { href: "/blog/groww-mcp-investments", label: "Groww MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
