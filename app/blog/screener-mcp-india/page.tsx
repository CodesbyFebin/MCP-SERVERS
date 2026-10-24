import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "screener-mcp-india";
const TITLE = "Screener.in MCP Server: Community Options";
const DESCRIPTION =
  "Screener.in has no official MCP server. How the community Screener MCP servers get company financials, how to set one up in Claude Desktop, and the scraping caveats.";
const REVIEWED = "2026-09-23";
const RONYV = "https://github.com/ronyv89/screener-mcp";
const MINHAJ = "https://github.com/minhaj3/screener.in-MCP-server";

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
      h1="Screener.in MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="Screener.in has not published an official MCP server. Community MCP servers fill the gap by scraping Screener.in's public company pages, so an AI assistant can search for a listed Indian company and read its financials. They are read-only, need no login for most data, and can break whenever Screener.in changes its pages."
      sections={[
        {
          id: "options",
          heading: "Community servers",
          body: (
            <>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <Ext href={RONYV}>ronyv89/screener-mcp</Ext>. TypeScript. Two tools; covered
                  below.
                </li>
                <li>
                  <Ext href={MINHAJ}>minhaj3/screener.in-MCP-server</Ext>. Another community
                  implementation.
                </li>
              </ul>
              <P>
                Neither is published by Screener.in. Other variants exist on GitHub and in
                scraping marketplaces; the same caveats apply to all of them.
              </P>
            </>
          ),
        },
        {
          id: "how",
          heading: "How ronyv89/screener-mcp works",
          body: (
            <>
              <P>
                Its README describes it as a server that &ldquo;provides financial data for Indian
                listed companies from screener.in.&rdquo; It fetches Screener.in&apos;s public HTML
                pages and parses them with cheerio. It exposes two tools:
              </P>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <code>search_company</code>: find a company by name or ticker
                </li>
                <li>
                  <code>get_company_data</code>: financial data for a company, with an optional{" "}
                  <code>fields</code> parameter to narrow what comes back
                </li>
              </ul>
              <P>
                The README says no login is required for most data and no API key is needed. It
                notes that the underlying numbers are BSE and NSE filings as aggregated by
                Screener.in.
              </P>
            </>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <Code>{`git clone https://github.com/ronyv89/screener-mcp
cd screener-mcp
npm install
npm run build`}</Code>
              <P>Then point Claude Desktop at the built file with an absolute path:</P>
              <Code>{`{
  "mcpServers": {
    "screener": {
      "command": "node",
      "args": ["/absolute/path/to/screener-mcp/dist/index.js"]
    }
  }
}`}</Code>
              <P>Fully quit and reopen Claude Desktop after saving the config.</P>
            </>
          ),
        },
        {
          id: "caveats",
          heading: "Caveats",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Scraping can break.</strong> Any layout change on Screener.in can stop the
                parser from finding the numbers, sometimes silently.
              </li>
              <li>
                <strong>Terms of use.</strong> Automated access may not be permitted by
                Screener.in&apos;s terms. Read them, and keep request volumes low.
              </li>
              <li>
                <strong>No licence stated.</strong> We did not find a licence in the ronyv89
                repository; check before reusing its code.
              </li>
              <li>
                <strong>Verify numbers.</strong> Cross-check anything you act on against the
                company&apos;s filings or Screener.in itself. This is not investment advice.
              </li>
            </ul>
          ),
        },
        {
          id: "broker",
          heading: "If you want your own portfolio data",
          body: (
            <P>
              Screener servers give company fundamentals, not your holdings. For your portfolio,
              use a broker&apos;s official MCP server: Zerodha, Upstox, Dhan and Groww all publish
              one.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "ronyv89/screener-mcp README",
          url: RONYV,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "TypeScript MCP server scraping screener.in public pages with cheerio and native fetch; tools search_company and get_company_data; no API key; no login for most data; clone/npm install/npm run build; Claude Desktop config using node and dist/index.js.",
          limitations: "Community project; no licence or affiliation statement found.",
        },
        {
          source: "minhaj3/screener.in-MCP-server",
          url: MINHAJ,
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Community Screener.in MCP server.",
          limitations: "Not reviewed.",
        },
      ]}
      faqs={[
        {
          question: "Does Screener.in have an official MCP server?",
          answer: "No official MCP server from Screener.in was found as of the review date.",
        },
        {
          question: "Do I need a Screener.in login?",
          answer:
            "Not for most data, according to the ronyv89/screener-mcp README, which reads Screener.in's public pages.",
        },
        {
          question: "Can it read my Screener.in watchlists or screens?",
          answer:
            "The ronyv89 server's two tools cover company search and company data only. Watchlists and saved screens are not among them.",
        },
        {
          question: "Is scraping Screener.in allowed?",
          answer:
            "Check Screener.in's terms of use. Automated access may be restricted, and the risk sits with the user.",
        },
        {
          question: "Where does the data come from?",
          answer: "The README says it is BSE and NSE filing data as aggregated by Screener.in.",
        },
      ]}
      related={[
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/blog/upstox-mcp-trading", label: "Upstox MCP server" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
