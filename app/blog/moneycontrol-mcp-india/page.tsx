import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "moneycontrol-mcp-india";
const TITLE = "Moneycontrol MCP Server: Community Option";
const DESCRIPTION =
  "Moneycontrol has no official MCP server or public API. What the community moneycontrol-mcp server provides, how it gets data, setup, and the caveats of unofficial endpoints.";
const REVIEWED = "2026-09-23";
const REPO = "https://github.com/pramodhapple504-arch/moneycontrol-mcp";

const TOOLS = [
  "moneycontrol_search",
  "moneycontrol_get_quote",
  "moneycontrol_get_fundamentals",
  "moneycontrol_get_index",
  "moneycontrol_fii_dii",
  "moneycontrol_get_news",
  "moneycontrol_get_technicals",
  "moneycontrol_get_history",
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
      h1="Moneycontrol MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="Moneycontrol has not published an MCP server or a public API. The community project moneycontrol-mcp gives an AI assistant eight read-only tools for Indian market data: search, quotes, fundamentals, index levels, FII/DII flows, news, technical levels and price history. It calls the same public endpoints Moneycontrol's website and app use, so it can break without notice."
      sections={[
        {
          id: "tools",
          heading: "Tools",
          body: (
            <>
              <P>
                <Ext href={REPO}>moneycontrol-mcp</Ext> exposes:
              </P>
              <P>
                {TOOLS.map((t, i) => (
                  <span key={t}>
                    <code>{t}</code>
                    {i < TOOLS.length - 1 ? ", " : ""}
                  </span>
                ))}
              </P>
              <P>All of them read data; none trade or touch an account.</P>
            </>
          ),
        },
        {
          id: "source",
          heading: "Where the data comes from",
          body: (
            <P>
              The project states: &ldquo;Moneycontrol has no official public API. This server talks
              to the same public endpoints the Moneycontrol website and app use&rdquo;, including{" "}
              <code>priceapi.moneycontrol.com</code>, the autosuggest service, embedded FII/DII
              page data and RSS feeds. It asks users to respect Moneycontrol&apos;s terms of
              service and avoid hammering the endpoints.
            </P>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <P>Python 3.10 or later. From a clone of the repository:</P>
              <Code>{`uv venv --python 3.11
uv pip install -e .`}</Code>
              <P>
                Then add it to your MCP client following the README&apos;s configuration, using
                absolute paths.
              </P>
            </>
          ),
        },
        {
          id: "caveats",
          heading: "Caveats",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Undocumented endpoints can change or block automated access at any time.</li>
              <li>Using them may conflict with Moneycontrol&apos;s terms; keep usage personal and light.</li>
              <li>Verify prices and fundamentals before acting on them. This is not investment advice.</li>
              <li>
                For your own holdings and orders, use a broker&apos;s official MCP server instead,
                such as Zerodha, Upstox, Dhan or Groww.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "pramodhapple504-arch/moneycontrol-mcp",
          url: REPO,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Eight read-only tools; uses the public endpoints of Moneycontrol's website and app (priceapi.moneycontrol.com, autosuggest, FII/DII page data, RSS); states Moneycontrol has no official public API; Python 3.10+; uv install; personal/informational use.",
          limitations: "Community project, not affiliated with Moneycontrol; details taken from its listing and README summary.",
        },
      ]}
      faqs={[
        {
          question: "Does Moneycontrol have an official MCP server?",
          answer: "No official MCP server from Moneycontrol was found as of the review date.",
        },
        {
          question: "Does Moneycontrol have a public API?",
          answer: "The moneycontrol-mcp project states that Moneycontrol has no official public API.",
        },
        {
          question: "Can the Moneycontrol MCP server place trades?",
          answer: "No. All eight tools are read-only market data tools.",
        },
        {
          question: "Does it need a Moneycontrol login?",
          answer: "It uses public endpoints; the project does not describe a login step.",
        },
        {
          question: "What market data can it fetch?",
          answer: "Search, live quotes, fundamentals and ratios, index levels, FII/DII activity, news, technical pivot levels and history.",
        },
      ]}
      related={[
        { href: "/blog/screener-mcp-india", label: "Screener.in MCP options" },
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/blog/upstox-mcp-trading", label: "Upstox MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
