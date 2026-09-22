import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "paytm-mcp-server-india-payments";
const TITLE = "Paytm MCP Server: Official Merchant Setup";
const DESCRIPTION =
  "Paytm's official MCP server lets merchants use Claude, ChatGPT, Cursor and VS Code to create payment links, check orders, issue refunds, track settlements and manage subscriptions.";
const REVIEWED = "2026-09-23";
const DOCS = "https://www.paytmpayments.com/docs/mcp-server-overview";
const ENDPOINT = "https://mcp.paytmpayments.com/mcp";

const GROUPS: [string, string[]][] = [
  ["Payment links", ["fetch_payment_links", "create_payment_link", "update_payment_link", "fetch_transactions_by_link_id"]],
  ["Payments and orders", ["fetch_all_orders", "fetch_payment_options", "fetch_order_status", "initiate_transaction", "process_transaction", "fetch_order_by_transaction_id", "export_orders_xlsx"]],
  ["Refunds", ["fetch_refund_list", "initiate_refund", "fetch_refund_status"]],
  ["Settlements", ["fetch_settlement_orders", "fetch_settlements_by_date"]],
  ["Subscriptions", ["fetch_subscription_status", "initiate_subscription", "cancel_subscription", "update_subscription_status"]],
  ["Other", ["create_qr_code", "validate_vpa", "fetch_card_bin_details", "fetch_payment_convenience_fee"]],
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
      h1="Paytm MCP Server (Payments)"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Yes. Paytm Payments runs an official MCP server for merchants at ${ENDPOINT}. After you sign in to your Paytm merchant dashboard through OAuth, an AI assistant can create and update payment links, look up orders and transactions, start and track refunds, read settlements, manage subscriptions and generate QR codes. It is for merchant accounts, not the Paytm consumer wallet.`}
      sections={[
        {
          id: "who",
          heading: "Who it is for",
          body: (
            <P>
              Paytm&apos;s <Ext href={DOCS}>MCP documentation</Ext> names merchants, developers, AI
              engineers and bot builders. You need a Paytm merchant account: sign-in goes through
              the merchant dashboard with email, password and OTP. It does not act on a personal
              Paytm app or wallet.
            </P>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <h3 className="mb-2 mt-4 font-semibold text-slate-900 dark:text-slate-100">Claude</h3>
              <P>
                Settings → Connectors → + → Browse connectors, search for <strong>Paytm MCP</strong>{" "}
                and click Connect. Log in to the merchant dashboard, enter the OTP and click
                Authorize.
              </P>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">Cursor and VS Code (Copilot)</h3>
              <P>Add this to <code>mcp.json</code>, then Connect (Cursor) or Start (VS Code):</P>
              <Code>{`{
  "mcpServers": {
    "paytmpayments-mcp-server": {
      "url": "${ENDPOINT}"
    }
  }
}`}</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">ChatGPT</h3>
              <P>Settings → Apps → Create App, enter a name and the URL above, then complete the Paytm sign-in.</P>
            </>
          ),
        },
        {
          id: "tools",
          heading: "Tools",
          body: (
            <>
              {GROUPS.map(([g, tools]) => (
                <P key={g}>
                  <strong>{g}:</strong>{" "}
                  {tools.map((t, i) => (
                    <span key={t}>
                      <code>{t}</code>
                      {i < tools.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </P>
              ))}
              <P>
                Order and refund listings cover a date range of up to 30 days per request,
                according to the tool descriptions.
              </P>
            </>
          ),
        },
        {
          id: "auth",
          heading: "Authentication",
          body: (
            <P>
              Paytm uses OAuth 2.0 with Dynamic Client Registration, so clients register
              themselves on first connect and you never paste API keys into the AI tool. Paytm says
              tokens are temporary and expire automatically, permissions are granular, and you can
              disconnect a client at any time.
            </P>
          ),
        },
        {
          id: "care",
          heading: "Before you let an assistant move money",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <code>initiate_refund</code>, <code>process_transaction</code> and{" "}
                <code>cancel_subscription</code> change real money and customer relationships.
                Confirm the order ID and amount yourself before approving.
              </li>
              <li>Grant only the tools you need on the authorisation screen.</li>
              <li>
                Keep payment servers out of chats that also read untrusted content, such as
                customer emails, where injected instructions could trigger a refund.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Paytm Payments developer docs: Paytm MCP Server",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://mcp.paytmpayments.com/mcp; setup for Cursor, VS Code, Claude (listed connector) and ChatGPT; merchant dashboard login with OTP; 24 tools across payment links, payments, refunds, settlements, subscriptions, QR and utilities; OAuth 2.0 with Dynamic Client Registration; temporary tokens; revocable.",
          limitations:
            "An earlier GitHub repository (paytm/payment-mcp-server) referenced in directories returned 404 on the review date; this page relies on the hosted service docs.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Paytm MCP server?",
          answer: "Yes. Paytm Payments documents it at paytmpayments.com/docs/mcp-server-overview, hosted at https://mcp.paytmpayments.com/mcp.",
        },
        {
          question: "Can I use it with my personal Paytm wallet?",
          answer: "No. It connects to a Paytm merchant account through the merchant dashboard login.",
        },
        {
          question: "Can it issue refunds?",
          answer: "Yes. initiate_refund starts a refund, and fetch_refund_status and fetch_refund_list track them.",
        },
        {
          question: "Do I need to give the AI my Paytm API key?",
          answer: "No. Access is granted through OAuth 2.0; Paytm says API keys and secrets are never shared with the client.",
        },
        {
          question: "Which AI tools does it support?",
          answer: "Paytm documents Claude, ChatGPT, Cursor and VS Code with GitHub Copilot, and mentions n8n.",
        },
      ]}
      related={[
        { href: "/blog/phonepe-mcp-server-india", label: "PhonePe's official MCP server" },
        { href: "/blog/google-pay-mcp-india", label: "Google Pay MCP status" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
