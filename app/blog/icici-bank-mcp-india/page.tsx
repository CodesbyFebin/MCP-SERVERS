import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "icici-bank-mcp-india";
const TITLE = "ICICI MCP Server: Bank vs ICICI Direct";
const DESCRIPTION =
  "ICICI Bank has no MCP server. For ICICI Direct trading accounts, community servers wrap the Breeze API to read and place orders. What they do, setup, and the credential risks.";
const REVIEWED = "2026-09-23";
const ICICI_MCP = "https://github.com/aranjan/icici-mcp";
const BREEZE = "https://api.icicidirect.com/";

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
      h1="ICICI MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="ICICI Bank has not published an MCP server, and we found no MCP server for ICICI Bank accounts. ICICI Direct, the ICICI group's trading platform, has a developer API called Breeze, and community MCP servers such as aranjan/icici-mcp wrap it so an AI assistant can check quotes, funds and orders and place real trades. None is official."
      sections={[
        {
          id: "bank",
          heading: "ICICI Bank accounts",
          body: (
            <P>
              We found no official or community MCP server that connects to ICICI Bank savings,
              current or credit card accounts. Be wary of any tool that asks for your net banking
              password to &ldquo;connect&rdquo; an AI assistant.
            </P>
          ),
        },
        {
          id: "direct",
          heading: "ICICI Direct: aranjan/icici-mcp",
          body: (
            <>
              <P>
                <Ext href={ICICI_MCP}>aranjan/icici-mcp</Ext> (Python, MIT) connects an MCP client
                to your ICICI Direct account through the <Ext href={BREEZE}>Breeze API</Ext>. Its
                README lists 14 tools, including <code>icici_login</code>, <code>get_orders</code>,{" "}
                <code>place_order</code>, <code>modify_order</code> and <code>cancel_order</code>,
                and support for equity, futures, options, margin and BTST orders.
              </P>
              <Code>{`pip install icici-mcp
playwright install chromium`}</Code>
              <P>
                You need a Breeze API app (API key and secret). The server reads{" "}
                <code>ICICI_API_KEY</code> and <code>ICICI_PASSWORD</code>, and optionally{" "}
                <code>ICICI_TOTP_SECRET</code> for automatic daily login through a headless
                browser, or <code>ICICI_SESSION_TOKEN</code> if you log in manually.
              </P>
            </>
          ),
        },
        {
          id: "risks",
          heading: "The credential problem",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                Storing your login password and TOTP secret together lets anything that reads them
                log in and trade without your phone. Prefer the manual session token if you are
                unsure.
              </li>
              <li>
                Orders placed by the assistant are real. Confirm the symbol, exchange, quantity,
                order type and price before approving.
              </li>
              <li>This is a community project, not affiliated with ICICI Securities or ICICI Bank. Review the code first.</li>
              <li>This page explains software setup. It is not investment advice.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "aranjan/icici-mcp README",
          url: ICICI_MCP,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Community MCP server for ICICI Direct via Breeze API; 14 tools including icici_login, get_orders, place_order, modify_order, cancel_order; equity, F&O, margin, BTST; pip install icici-mcp and playwright install chromium; ICICI_API_KEY, ICICI_PASSWORD, optional ICICI_TOTP_SECRET or ICICI_SESSION_TOKEN; Python; MIT.",
          limitations: "Community project; not tested.",
        },
      ]}
      faqs={[
        {
          question: "Does ICICI Bank have an MCP server?",
          answer: "No. We found no official or community MCP server for ICICI Bank accounts as of the review date.",
        },
        {
          question: "Is there an ICICI Direct MCP server?",
          answer: "Not an official one. Community servers such as aranjan/icici-mcp wrap ICICI Direct's Breeze API.",
        },
        {
          question: "Can it place trades?",
          answer: "Yes. aranjan/icici-mcp includes place_order, modify_order and cancel_order.",
        },
        {
          question: "What credentials does it need?",
          answer: "A Breeze API key and secret, your ICICI Direct password, and either a TOTP secret for automatic login or a manual session token.",
        },
        {
          question: "Is it safe to store my TOTP secret?",
          answer: "It carries real risk: together with your password, it allows login without your phone. Use the manual session token if you prefer not to store it.",
        },
      ]}
      related={[
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/blog/angel-broking-mcp-india", label: "Angel One MCP options" },
        { href: "/blog/hdfc-bank-mcp-india", label: "HDFC Bank MCP status" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
