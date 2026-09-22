import type { Metadata } from "next";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "hdfc-bank-mcp-india";
const TITLE = "HDFC MCP Server: HDFC SKY vs HDFC Bank";
const DESCRIPTION =
  "HDFC Bank has no MCP server for bank accounts, but HDFC Securities publishes HDFC SKY MCP for Claude Desktop: read-only access to holdings, watchlists and the order book. Setup and limits.";
const REVIEWED = "2026-09-23";
const SETUP = "https://hdfcsky.com/blogs/trading-strategies/how-to-setup-hdfc-sky-mcp-with-claude-desktop";
const ABOUT = "https://hdfcsky.com/blogs/share-market/hdfc-sky-mcp-your-personal-ai-trading-companion";

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
      h1="HDFC MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="HDFC Bank has not published an MCP server for bank accounts. HDFC Securities, the HDFC group's broking arm, publishes HDFC SKY MCP, which lets Claude Desktop read approved HDFC SKY data: holdings, watchlists, the order book and holding statements. It is read-only, and you sign in on HDFC SKY's own login page, so your password is not shared with the AI."
      sections={[
        {
          id: "bank",
          heading: "HDFC Bank accounts",
          body: (
            <P>
              We found no official MCP server for HDFC Bank savings, current or card accounts.
              Third-party automation platforms list HDFC payment-gateway integrations, but those
              are merchant tools from other companies, not HDFC Bank services for customers.
            </P>
          ),
        },
        {
          id: "sky",
          heading: "HDFC SKY MCP",
          body: (
            <>
              <P>
                HDFC Securities&apos; <Ext href={SETUP}>setup guide</Ext> (published 28 August 2026)
                describes HDFC SKY MCP as enabling &ldquo;Claude Desktop to securely access approved
                HDFC SKY data.&rdquo; Data you can approve includes:
              </P>
              <ul className="mb-4 list-inside list-disc space-y-1 text-slate-700 dark:text-slate-300">
                <li>Holdings</li>
                <li>Watchlists</li>
                <li>Order book</li>
                <li>Holding statements</li>
              </ul>
              <P>
                The guide mentions no order placement. It states &ldquo;the AI assistant can only
                access the information that you explicitly approve.&rdquo;
              </P>
            </>
          ),
        },
        {
          id: "setup",
          heading: "Setup in Claude Desktop",
          body: (
            <>
              <P>You need an active HDFC SKY account and the latest Claude Desktop.</P>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>macOS:</strong> download HDFC SKY&apos;s <code>.dxt</code> extension file,
                  double-click it, and click Install in Claude Desktop.
                </li>
                <li>
                  <strong>Windows:</strong> in Claude Desktop, go to Settings → Extensions →
                  Advanced and install the extension there.
                </li>
                <li>
                  <strong>Manual:</strong> add the HDFC SKY server to{" "}
                  <code>claude_desktop_config.json</code> (Node.js required). The guide does not
                  print the JSON; use the configuration HDFC SKY provides.
                </li>
              </ul>
              <P>
                Sign-in happens on the official HDFC SKY authentication page with your client ID,
                registered mobile number or email, plus two-factor authentication.
              </P>
            </>
          ),
        },
        {
          id: "care",
          heading: "Good to know",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Download the extension only from HDFC SKY&apos;s own site.</li>
              <li>Check numbers the assistant reports against the HDFC SKY app before acting on them.</li>
              <li>This page explains software setup. It is not investment advice.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "HDFC SKY: How to set up HDFC SKY MCP with Claude Desktop",
          url: SETUP,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Published by HDFC Securities (28 Aug 2026); Claude Desktop access to approved data (holdings, watchlists, order book, holding statements); no order placement mentioned; .dxt install on macOS, Settings > Extensions > Advanced on Windows, manual config with Node.js; login on official HDFC SKY page with 2FA; password not shared with the AI.",
          limitations: "The manual JSON configuration is not printed in the guide.",
        },
        {
          source: "HDFC SKY: HDFC SKY MCP overview",
          url: ABOUT,
          type: "official",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Describes HDFC SKY MCP as built within HDFC Securities' security framework.",
          limitations: "Seen in search summary; not read in full.",
        },
      ]}
      faqs={[
        {
          question: "Does HDFC Bank have an MCP server?",
          answer: "Not for bank accounts, as of the review date. HDFC Securities publishes HDFC SKY MCP for its trading platform.",
        },
        {
          question: "Can HDFC SKY MCP place trades?",
          answer: "HDFC Securities' setup guide describes read access to approved data only and does not mention order placement.",
        },
        {
          question: "Which AI app does HDFC SKY MCP support?",
          answer: "Claude Desktop, according to HDFC Securities' setup guide.",
        },
        {
          question: "Do I give Claude my HDFC SKY password?",
          answer: "No. You log in on HDFC SKY's official authentication page with two-factor authentication.",
        },
        {
          question: "What data can the assistant see?",
          answer: "Only what you approve: holdings, watchlists, order book and holding statements.",
        },
      ]}
      related={[
        { href: "/blog/icici-bank-mcp-india", label: "ICICI MCP: bank vs ICICI Direct" },
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/blog/sbi-mcp-server-india-banking", label: "SBI MCP status" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
