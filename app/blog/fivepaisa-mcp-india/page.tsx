import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "fivepaisa-mcp-india";
const TITLE = "5paisa MCP: Official Claude Trading Assistant";
const DESCRIPTION =
  "5paisa's official MCP connects Claude Desktop to your 5paisa account to read holdings, the order book and market data and to place orders. Requirements, credentials, and risks.";
const REVIEWED = "2026-09-23";
const PAGE = "https://www.5paisa.com/technology/mcp-ai-trading-assistant";
const FORUM = "https://tradebetter.5paisa.com/t/introducing-5paisa-mcp-your-ai-companion-for-smarter-portfolio-management/310";

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
      h1="5paisa MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Yes. 5paisa publishes an official MCP integration that connects Claude Desktop on Windows, macOS or Linux to your 5paisa account. It turns 5paisa API responses such as account details, live market data, the order book and holdings into a form the model can use, and it can place orders. It uses your own 5paisa API credentials and TOTP, which 5paisa says stay on your device."
      sections={[
        {
          id: "what",
          heading: "What it does",
          body: (
            <>
              <P>
                The <Ext href={PAGE}>5paisa MCP page</Ext> describes it as an interface that
                converts &ldquo;raw API responses (account details, live market data, order book,
                holdings) into a model-friendly format.&rdquo; Its examples include placing a buy
                order by name and quantity, so this is not a read-only integration.
              </P>
              <P>
                Without logging in, the assistant works only as a general research chatbot; account
                features need your credentials.
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
                5paisa provides separate setup guides for Windows, Mac and Linux, linked from its
                MCP page. You will need:
              </P>
              <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>Claude Desktop (currently the only supported client, per 5paisa)</li>
                <li>API credentials from your 5paisa account</li>
                <li>TOTP set up for your 5paisa login</li>
              </ul>
              <P>
                5paisa says &ldquo;your access keys always remain with you&rdquo;: they are stored
                locally rather than by 5paisa&apos;s MCP. Follow the official guide for your
                operating system, as it is the only source for the exact install steps.
              </P>
            </>
          ),
        },
        {
          id: "risks",
          heading: "Risks to manage",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Credentials on disk.</strong> Local API keys and TOTP details mean anyone
                with access to that file or machine could trade on your account. Keep the machine
                locked and the files private.
              </li>
              <li>
                <strong>Real orders.</strong> Ask the assistant to state the stock, exchange,
                quantity, order type and price, and confirm them before it places anything.
              </li>
              <li>
                <strong>Other connected tools.</strong> Don&apos;t run a trading server in the same
                chat as tools that read untrusted web pages or emails.
              </li>
              <li>This page explains software setup. It is not investment advice.</li>
            </ul>
          ),
        },
        {
          id: "others",
          heading: "Other Indian brokers",
          body: (
            <P>
              Zerodha and Upstox run hosted, read-only servers with browser sign-in; Dhan and Groww
              run hosted servers that can place orders. See{" "}
              <Link href="/blog/zerodha-mcp-server-trading-ai" className="text-blue-600 hover:underline dark:text-blue-400">
                Zerodha
              </Link>
              ,{" "}
              <Link href="/blog/upstox-mcp-trading" className="text-blue-600 hover:underline dark:text-blue-400">
                Upstox
              </Link>{" "}
              and{" "}
              <Link href="/blog/dhan-mcp-fo-trading" className="text-blue-600 hover:underline dark:text-blue-400">
                Dhan
              </Link>
              .
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "5paisa: MCP AI trading assistant",
          url: PAGE,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Official 5paisa product; Claude Desktop on Windows, Mac and Linux; converts account details, live market data, order book and holdings; order placement example; needs TOTP and API credentials; access keys remain with the user; restricted non-logged-in mode; Claude-only for now.",
          limitations: "Exact install commands are in per-OS guides linked from the page and were not reproduced here.",
        },
        {
          source: "5paisa community forum announcement",
          url: FORUM,
          type: "official",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "5paisa's product announcement thread for 5paisa MCP.",
          limitations: "Seen in search results; not read in full.",
        },
      ]}
      faqs={[
        {
          question: "Does 5paisa have an official MCP server?",
          answer: "Yes. 5paisa documents its MCP AI trading assistant at 5paisa.com/technology/mcp-ai-trading-assistant.",
        },
        {
          question: "Can 5paisa MCP place orders?",
          answer: "Yes. 5paisa's own examples include placing a buy order in natural language.",
        },
        {
          question: "Which AI apps does it work with?",
          answer: "Claude Desktop only, for now. 5paisa says support for more models is planned.",
        },
        {
          question: "What credentials does it need?",
          answer: "Your 5paisa API credentials and TOTP. 5paisa says the keys stay on your device.",
        },
        {
          question: "Is it a hosted server?",
          answer: "5paisa's page gives per-operating-system setup guides for Claude Desktop and says your keys stay with you. It does not document a hosted endpoint with browser sign-in.",
        },
      ]}
      related={[
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/blog/angel-broking-mcp-india", label: "Angel One MCP options" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
      ]}
    />
  );
}
