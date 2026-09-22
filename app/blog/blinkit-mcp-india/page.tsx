import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "blinkit-mcp-india";
const TITLE = "Blinkit MCP Server: Is There an Official One?";
const DESCRIPTION =
  "Blinkit has no official MCP server. What the community Blinkit MCP projects do, how they work, how to set one up, and the risks of letting an AI order and pay on your account.";
const REVIEWED = "2026-09-23";
const SWAPNIL = "https://github.com/hereisSwapnil/blinkit-mcp";
const YNIKS = "https://github.com/yniks/blinkit-mcp";
const APIFY = "https://apify.com/mindcase/blinkit-scraper/api/mcp";

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
      h1="Blinkit MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="No. Blinkit has not published an official MCP server. The Blinkit MCP servers you will find are community projects that are not affiliated with Blinkit. They work by automating the Blinkit website or calling Blinkit's private app API, and some can place real orders and UPI payments from your account."
      sections={[
        {
          id: "exists",
          heading: "What exists today",
          body: (
            <>
              <div className="mb-4 overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left dark:bg-slate-900">
                      {["Project", "How it works", "Can order and pay?"].map((h) => (
                        <th
                          key={h}
                          className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                    <tr>
                      <td className="px-4 py-2"><Ext href={SWAPNIL}>hereisSwapnil/blinkit-mcp</Ext></td>
                      <td className="px-4 py-2">Automates the Blinkit website in a browser (Playwright)</td>
                      <td className="px-4 py-2">Yes: cart, checkout and UPI payment tools</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><Ext href={YNIKS}>yniks/blinkit-mcp</Ext></td>
                      <td className="px-4 py-2">Calls a reverse-engineered Blinkit mobile API and bypasses Cloudflare&apos;s bot checks</td>
                      <td className="px-4 py-2">Described as supporting cart, checkout and UPI flows</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><Ext href={APIFY}>Apify Blinkit Scraper MCP</Ext></td>
                      <td className="px-4 py-2">Hosted scraper that returns product data from Blinkit search</td>
                      <td className="px-4 py-2">No. Data only (prices, discounts, stock, images)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <P>
                None of these is endorsed by Blinkit. The first project&apos;s README says it
                &ldquo;is an experimental proof of concept and is not affiliated, associated,
                authorized, endorsed by, or in any way officially connected with Blinkit (Grofers
                India Private Limited).&rdquo;
              </P>
            </>
          ),
        },
        {
          id: "how",
          heading: "How the browser-automation server works",
          body: (
            <>
              <P>
                <Ext href={SWAPNIL}>hereisSwapnil/blinkit-mcp</Ext> drives a real Chromium browser
                with Playwright. You log in with your phone number and an OTP, and the assistant
                then uses these tools:
              </P>
              <ul className="mb-4 list-inside list-disc space-y-1 text-slate-700 dark:text-slate-300">
                <li>Login: <code>check_login</code>, <code>login</code>, <code>enter_otp</code></li>
                <li>
                  Shopping: <code>set_location</code>, <code>search</code>, <code>add_to_cart</code>,{" "}
                  <code>remove_from_cart</code>, <code>check_cart</code>
                </li>
                <li>
                  Checkout: <code>checkout</code>, <code>get_addresses</code>,{" "}
                  <code>select_address</code>, <code>proceed_to_pay</code>
                </li>
                <li>
                  Payment: <code>get_upi_ids</code>, <code>select_upi_id</code>, <code>pay_now</code>
                </li>
              </ul>
              <P>Requirements: Python 3.12+, the uv package manager, and Playwright&apos;s Chromium. Manual install:</P>
              <Code>{`curl -LsSf https://astral.sh/uv/install.sh | sh
git clone https://github.com/hereisSwapnil/blinkit-mcp.git
cd blinkit-mcp
uv sync
uv run playwright install chromium
uv run main.py`}</Code>
              <P>Claude Desktop config from the README (replace the path with your clone&apos;s location):</P>
              <Code>{`{
  "mcpServers": {
    "blinkit-mcp": {
      "command": "/usr/local/bin/uv",
      "args": ["run", "main.py"],
      "cwd": "/absolute/path/to/blinkit-mcp",
      "env": {"HEADLESS": "false"}
    }
  }
}`}</Code>
              <P>
                The README also offers a one-click <code>blinkit-mcp.mcpb</code> bundle for Claude
                Desktop.
              </P>
            </>
          ),
        },
        {
          id: "risks",
          heading: "Risks to weigh first",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Real money.</strong> The <code>pay_now</code> tool completes a UPI payment.
                Always ask the assistant to show the cart, address and total before any payment
                step.
              </li>
              <li>
                <strong>Terms of use.</strong> Automating login and bypassing bot protection can
                conflict with Blinkit&apos;s terms. Read them before connecting your main account.
              </li>
              <li>
                <strong>Breakage.</strong> Unofficial servers depend on Blinkit&apos;s website or
                private API staying the same. An update on Blinkit&apos;s side can break them without
                warning.
              </li>
              <li>
                <strong>Code you run locally.</strong> You are running third-party code that
                handles your login. Read it, or at least check who maintains it, before you run it.
              </li>
            </ul>
          ),
        },
        {
          id: "official-alt",
          heading: "If you want an official option",
          body: (
            <P>
              For food delivery, Zomato publishes an{" "}
              <Link href="/blog/zomato-mcp-india" className="text-blue-600 hover:underline dark:text-blue-400">
                official MCP server
              </Link>{" "}
              with OAuth sign-in. It does not cover Blinkit groceries.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "hereisSwapnil/blinkit-mcp README",
          url: SWAPNIL,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Community project using Playwright browser automation; tools for login, search, cart, checkout and UPI payment; Python 3.12+; explicit statement that it is not affiliated with or endorsed by Blinkit.",
          limitations: "Unofficial and experimental; behaviour depends on Blinkit's website.",
        },
        {
          source: "yniks/blinkit-mcp repository description",
          url: YNIKS,
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding:
            "Described as an API-only server using a reverse-engineered Blinkit mobile API with Cloudflare TLS-fingerprint bypass, headless OTP auth, and cart/checkout/UPI flows; not affiliated with Blinkit or Zomato.",
          limitations: "Based on the repository's own description; code not reviewed.",
        },
        {
          source: "Apify Blinkit Scraper MCP listing",
          url: APIFY,
          type: "registry",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Hosted scraper exposing Blinkit product data (prices, discounts, stock, images, categories) over MCP.",
          limitations: "Based on the listing description; not tested.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Blinkit MCP server?",
          answer:
            "No. Blinkit has not published an official MCP server. The Blinkit MCP servers on GitHub and in MCP directories are community projects not affiliated with Blinkit.",
        },
        {
          question: "Can a Blinkit MCP server pay for my order?",
          answer:
            "Some can. hereisSwapnil/blinkit-mcp includes tools that select a UPI ID and complete payment. Review the cart and total yourself before letting the assistant pay.",
        },
        {
          question: "Will Blinkit block my account for using one?",
          answer:
            "We have no evidence either way. Automated access and bot-protection bypass can conflict with Blinkit's terms, so the risk sits with you.",
        },
        {
          question: "Does Zomato's official MCP server include Blinkit?",
          answer:
            "No. Zomato's MCP manifest describes restaurant food ordering only.",
        },
        {
          question: "How do I get Blinkit product and price data without ordering?",
          answer:
            "The Apify Blinkit Scraper MCP is listed as returning product data only: prices, discounts, stock status, images and categories. Check Apify's pricing and Blinkit's terms before using it.",
        },
      ]}
      related={[
        { href: "/blog/zomato-mcp-india", label: "Zomato's official MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/clients/claude-desktop", label: "Using MCP servers in Claude Desktop" },
        { href: "/learn/mcp-server", label: "What is an MCP server?" },
      ]}
    />
  );
}
