import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "angel-broking-mcp-india";
const TITLE = "Angel One MCP Server: Options and Risks";
const DESCRIPTION =
  "Angel One has no official MCP server. Community servers wrap its SmartAPI so an AI assistant can read your portfolio and place real orders. Setup, credentials and safety.";
const REVIEWED = "2026-09-23";
const AMEER = "https://github.com/ameernoufil/angel-one-mcp";
const BHAVESH = "https://github.com/bhavesh0009/angel-one-mcp-server";
const PYALGO = "https://mcpservers.org/servers/pyalgobot/angelone-mcp.git";

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
      h1="Angel One (Angel Broking) MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="Angel One, formerly Angel Broking, has not published an official MCP server. Several community MCP servers wrap Angel One's SmartAPI so an AI assistant can read your holdings, positions and funds, fetch market data, and place real orders. Connecting one gives it the same access to your trading account as your SmartAPI credentials."
      sections={[
        {
          id: "options",
          heading: "Community servers",
          body: (
            <>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <Ext href={AMEER}>ameernoufil/angel-one-mcp</Ext>. TypeScript, published on npm
                  as <code>angel-one-mcp</code>. Covered in detail below.
                </li>
                <li>
                  <Ext href={BHAVESH}>bhavesh0009/angel-one-mcp-server</Ext>. Python; described as
                  providing trading and market-data functions through SmartAPI.
                </li>
                <li>
                  <Ext href={PYALGO}>pyalgobot/angelone-mcp</Ext>. Described as covering trading,
                  portfolio, market data, GTT rules, and margin and brokerage.
                </li>
              </ul>
              <P>
                None claims to be affiliated with Angel One. They all use Angel One&apos;s public
                developer API, <Ext href="https://smartapi.angelbroking.com/">SmartAPI</Ext>.
              </P>
            </>
          ),
        },
        {
          id: "tools",
          heading: "What angel-one-mcp can do",
          body: (
            <ul className="list-inside list-disc space-y-1 text-slate-700 dark:text-slate-300">
              <li>Auth: login, logout</li>
              <li>Portfolio: holdings, positions, funds, position conversion</li>
              <li>Orders: place, modify, cancel, order book, trade book</li>
              <li>Market: search, LTP, quotes, candles, open interest, Greeks, movers, PCR</li>
              <li>GTT: create, modify, cancel, list, inspect</li>
              <li>Calculators: margin and brokerage estimates</li>
              <li>User: profile</li>
            </ul>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <P>Run it straight from npm:</P>
              <Code>npx -y angel-one-mcp</Code>
              <P>
                It needs four SmartAPI values as environment variables: <code>ANGEL_API_KEY</code>,{" "}
                <code>ANGEL_CLIENT_ID</code>, <code>ANGEL_PASSWORD</code> (your MPIN) and{" "}
                <code>ANGEL_TOTP_SECRET</code>. The README&apos;s Claude Desktop config:
              </P>
              <Code>{`{
  "mcpServers": {
    "angel-one": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "angel-one-mcp"],
      "env": {
        "ANGEL_API_KEY": "your_smartapi_key",
        "ANGEL_CLIENT_ID": "your_client_id",
        "ANGEL_PASSWORD": "your_mpin",
        "ANGEL_TOTP_SECRET": "your_base32_totp_secret"
      }
    }
  }
}`}</Code>
            </>
          ),
        },
        {
          id: "credentials",
          heading: "The credential problem",
          body: (
            <>
              <P>
                That config stores your client ID, MPIN and TOTP secret in a plain-text file. The
                TOTP secret is what generates your two-factor codes, so anyone or anything that can
                read <code>claude_desktop_config.json</code> can log in to your trading account
                without your phone.
              </P>
              <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>Never commit that file to git or sync it to a shared folder.</li>
                <li>Keep it readable only by your user account.</li>
                <li>
                  If the file is ever exposed, change your MPIN and your SmartAPI credentials
                  straight away.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "guards",
          heading: "Built-in order guards",
          body: (
            <P>
              angel-one-mcp guards the operations that change your account: placing and modifying
              orders, creating and modifying GTT rules, and converting positions. Soft limits block
              by default but can be overridden with <code>force: true</code>. Hard limits cannot be
              bypassed without changing the environment and restarting the server. Guards reduce
              mistakes; they do not replace checking each order yourself.
            </P>
          ),
        },
        {
          id: "before",
          heading: "Before an AI places a trade",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>A filled order cannot be undone. Test with the smallest quantity first.</li>
              <li>
                Ask the assistant to state the symbol, exchange, side, quantity, order type and
                price, and confirm each one before it calls the order tool.
              </li>
              <li>Language models can misread instructions. Treat every order as yours to verify.</li>
              <li>This page explains software setup. It is not investment advice.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "ameernoufil/angel-one-mcp README",
          url: AMEER,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "TypeScript MCP server for Angel One SmartAPI; npm package angel-one-mcp; tool groups for auth, portfolio, orders, market data, GTT, calculators and profile; env vars ANGEL_API_KEY, ANGEL_CLIENT_ID, ANGEL_PASSWORD, ANGEL_TOTP_SECRET; guarded trading mutations with soft and hard limits. No claim of affiliation with Angel One.",
          limitations: "Community project; not reviewed or endorsed by Angel One.",
        },
        {
          source: "bhavesh0009/angel-one-mcp-server",
          url: BHAVESH,
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Python MCP server described as providing trading and market-data functions through SmartAPI.",
          limitations: "Based on the project description; code not reviewed.",
        },
        {
          source: "pyalgobot/angelone-mcp listing",
          url: PYALGO,
          type: "registry",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding:
            "Listed as wrapping SmartAPI for trading, portfolio, market data, GTT rules, and margin and brokerage.",
          limitations: "Based on the directory listing; not tested.",
        },
      ]}
      faqs={[
        {
          question: "Does Angel One have an official MCP server?",
          answer:
            "No official MCP server from Angel One was found as of the review date. The available servers are community projects built on Angel One's SmartAPI.",
        },
        {
          question: "Is Angel Broking the same as Angel One?",
          answer: "Yes. Angel Broking rebranded as Angel One. SmartAPI is its developer API.",
        },
        {
          question: "Can an AI assistant place real trades through these servers?",
          answer:
            "Yes. angel-one-mcp and the other listed servers can place, modify and cancel real orders on your account.",
        },
        {
          question: "Is it safe to put my TOTP secret in the config file?",
          answer:
            "It is a real risk. Anyone who can read the file can generate your two-factor codes and log in. Keep the file private, never commit it, and change your credentials if it is exposed.",
        },
        {
          question: "Can I undo an order the assistant placed by mistake?",
          answer:
            "Not once it is filled. You can modify or cancel an open order, but a filled order cannot be reversed. Test with small quantities and confirm every order.",
        },
      ]}
      related={[
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/clients/claude-desktop", label: "Using MCP servers in Claude Desktop" },
        { href: "/learn/mcp-server", label: "What is an MCP server?" },
        { href: "/blog/phonepe-mcp-server-india", label: "PhonePe's official MCP server" },
      ]}
    />
  );
}
