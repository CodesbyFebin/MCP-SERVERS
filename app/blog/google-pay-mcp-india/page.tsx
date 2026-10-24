import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "google-pay-mcp-india";
const TITLE = "Google Pay MCP Server: Developer Tools Only";
const DESCRIPTION =
  "Google's official Google Pay & Wallet Developer MCP server helps developers search docs, manage merchant integrations and check error metrics. It does not make UPI payments. Details and setup.";
const REVIEWED = "2026-09-23";
const GUIDE = "https://developers.google.com/pay/api/web/guides/use-pay-wallet-mcp";
const REF = "https://developers.google.com/pay/api/web/reference/mcp";
const ENDPOINT = "https://paydeveloper.googleapis.com/mcp";

const TOOLS: [string, string][] = [
  ["search_documentation", "Search Google Pay and Wallet developer docs and samples"],
  ["list_merchants", "List merchants on your account"],
  ["create_merchant", "Create a merchant"],
  ["update_merchant", "Update merchant fields"],
  ["list_google_pay_integrations", "Integration status for a merchant ID"],
  ["query_merchant_performance", "Aggregated performance metrics"],
  ["query_merchant_error_metrics", "Detailed error metrics"],
  ["list_principals", "Users with access to a merchant"],
  ["set_principal_role", "Add a user or change their role"],
  ["delete_principal", "Remove a user's access"],
  ["list_pass_issuers", "Google Wallet pass issuers"],
  ["list_pass_classes", "Google Wallet pass classes"],
  ["validate_pass_jwt", "Validate a Wallet pass JWT"],
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
      h1="Google Pay MCP Server"
      description={DESCRIPTION}
      status="official-docs-only"
      reviewedAt={REVIEWED}
      directAnswer={`Google publishes an official Google Pay & Wallet Developer MCP server at ${ENDPOINT}, in pre-GA. It is for developers integrating the Google Pay API and Google Wallet: it searches the docs, manages merchant integrations and users, reports performance and error metrics, and validates Wallet passes. It does not send money or make UPI payments from the Google Pay app in India.`}
      sections={[
        {
          id: "who",
          heading: "Who it is for",
          body: (
            <P>
              Developers and merchants integrating the Google Pay API or Google Wallet. It works on
              your Google Pay &amp; Wallet merchant and issuer data through a Google Cloud project.
              It has no tools for a consumer&apos;s Google Pay UPI account: no balance, no
              transactions, no payments.
            </P>
          ),
        },
        {
          id: "tools",
          heading: "The 13 tools",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">Tool</th>
                    <th className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {TOOLS.map(([n, d]) => (
                    <tr key={n}>
                      <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">{n}</td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>A Google Cloud project with the Pay &amp; Wallet Developer API enabled and the right IAM roles.</li>
                <li>
                  OAuth 2.0 with IAM; API keys are not accepted. Scopes:{" "}
                  <code>paydeveloper.merchant</code> for merchant data and{" "}
                  <code>paydeveloper.issuer.readonly</code> for read-only issuer access.
                </li>
                <li>
                  Google documents configuration for VS Code, Cursor, Claude Code, Claude.ai,
                  ChatGPT and Antigravity, each using your own OAuth client credentials.
                </li>
              </ul>
              <P>
                Follow <Ext href={GUIDE}>Google&apos;s connection guide</Ext> for each client; the
                full tool reference is in the <Ext href={REF}>MCP reference</Ext>.
              </P>
            </>
          ),
        },
        {
          id: "care",
          heading: "Be careful with",
          body: (
            <P>
              <code>set_principal_role</code> and <code>delete_principal</code> change who can
              access your merchant account, and <code>update_merchant</code> changes its settings.
              Review those calls before approving them. As a pre-GA product, Google says it is
              provided &ldquo;as is&rdquo; with possibly limited support.
            </P>
          ),
        },
        {
          id: "upi",
          heading: "Looking for UPI or payment operations?",
          body: (
            <P>
              For merchant payment operations in India, Paytm publishes an{" "}
              <Link href="/blog/paytm-mcp-server-india-payments" className="text-blue-600 hover:underline dark:text-blue-400">
                official MCP server
              </Link>{" "}
              for payment links, refunds and settlements, and PhonePe publishes one for its{" "}
              <Link href="/blog/phonepe-mcp-server-india" className="text-blue-600 hover:underline dark:text-blue-400">
                Payment Gateway docs
              </Link>
              .
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Google for Developers: Connect to the Google Pay & Wallet Developer MCP server",
          url: GUIDE,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://paydeveloper.googleapis.com/mcp; pre-GA; search docs, manage integrations, monitor performance, manage passes; OAuth 2.0 with IAM, no API keys; scopes paydeveloper.merchant and paydeveloper.issuer.readonly; clients VS Code, Cursor, Claude Code, Claude.ai, ChatGPT, Antigravity; requires a Google Cloud project with the API enabled.",
        },
        {
          source: "Google for Developers: MCP reference (paydeveloper.googleapis.com)",
          url: REF,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "13 tools from search_documentation to delete_principal, with descriptions.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Google Pay MCP server?",
          answer: "Yes, for developers: the Google Pay & Wallet Developer MCP server at paydeveloper.googleapis.com/mcp, in pre-GA.",
        },
        {
          question: "Can it make UPI payments from my Google Pay app?",
          answer: "No. It has no tools for consumer accounts or payments.",
        },
        {
          question: "How does it authenticate?",
          answer: "OAuth 2.0 with Google Cloud IAM. API keys are not accepted.",
        },
        {
          question: "Which AI clients does Google document?",
          answer: "VS Code, Cursor, Claude Code, Claude.ai, ChatGPT and Antigravity.",
        },
        {
          question: "Can it change who has access to my merchant account?",
          answer: "Yes. set_principal_role and delete_principal manage merchant users, so review those calls before approving.",
        },
      ]}
      related={[
        { href: "/blog/paytm-mcp-server-india-payments", label: "Paytm's official MCP server" },
        { href: "/blog/phonepe-mcp-server-india", label: "PhonePe's official MCP server" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
