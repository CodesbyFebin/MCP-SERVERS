import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-india-ecommerce";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP for Indian E-commerce: What Exists";
const DESCRIPTION =
  "Which Indian commerce, food, payments and logistics companies have official MCP servers (Swiggy, Zomato, Paytm, Delhivery, Amazon SP-API, Zoho) and which only have community options.";
const REVIEWED = "2026-09-23";

const L = "text-blue-600 hover:underline dark:text-blue-400";
const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";

const ROWS: [string, string, string, string][] = [
  ["Swiggy", "/blog/swiggy-mcp-india", "Official", "Food, Instamart and Dineout; COD only; orders can't be cancelled"],
  ["Zomato", "/blog/zomato-mcp-india", "Official", "Restaurant ordering; personal use only"],
  ["Paytm Payments", "/blog/paytm-mcp-server-india-payments", "Official", "Merchant payment links, refunds, settlements, subscriptions"],
  ["PhonePe", "/blog/phonepe-mcp-server-india", "Official (docs)", "Payment Gateway documentation, read-only"],
  ["Google Pay", "/blog/google-pay-mcp-india", "Official (developer)", "Integration and merchant management; no UPI payments"],
  ["Delhivery", "/blog/delhivery-mcp-india", "Official", "Maps: geocoding, address validation, routing, tolls"],
  ["Amazon", "/blog/amazon-india-mcp", "Official (sellers)", "SP-API developer tools; nothing for shoppers"],
  ["Zoho Inventory", "/blog/zoho-inventory-mcp-india", "Official", "Stock, purchase orders, shipments via Zoho MCP"],
  ["Flipkart", "/blog/flipkart-mcp-india", "Community only", "Seller API wrappers and product scrapers"],
  ["Blinkit", "/blog/blinkit-mcp-india", "Community only", "Browser automation and scrapers"],
];

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in${PATH}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      path={PATH}
      section={{ label: "Glossary", href: "/glossary" }}
      title={TITLE}
      h1="MCP for Indian E-commerce"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Several Indian commerce companies now publish official MCP servers: Swiggy and Zomato for ordering, Paytm for merchant payments, Delhivery for address and routing intelligence, Zoho for inventory, and Amazon for sellers through SP-API. Flipkart and Blinkit have only community projects. Each linked page below cites the company's own documentation."
      sections={[
        {
          id: "table",
          heading: "Who has what",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className={TH}>Company</th>
                    <th className={TH}>Status</th>
                    <th className={TH}>What it covers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  {ROWS.map(([n, href, s, w]) => (
                    <tr key={n}>
                      <td className="px-4 py-2 font-medium"><Link href={href} className={L}>{n}</Link></td>
                      <td className="px-4 py-2">{s}</td>
                      <td className="px-4 py-2">{w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "merchants",
          heading: "For merchants and sellers",
          body: (
            <P>
              A seller&apos;s stack can already be mostly MCP-connected: Paytm for payment links and
              refunds, Zoho Inventory for stock and purchase orders, Delhivery Maps for clean
              addresses, and Amazon&apos;s SP-API server for marketplace development. Keep refunds,
              cancellations and purchase orders behind human approval.
            </P>
          ),
        },
        {
          id: "shoppers",
          heading: "For shoppers",
          body: (
            <P>
              Ordering food through Swiggy or Zomato from an AI assistant is possible today, with the
              limits each company sets. For groceries beyond Instamart, and for Flipkart or Amazon
              shopping, there is no official option; community tools that log in as you carry real
              risk to your account and payment methods.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Company pages on this site",
          url: "https://www.mcpserver.in/best/mcp-servers",
          type: "editorial",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Each row links to a page citing the company's own documentation, manifest or repository for its status and capabilities.",
        },
      ]}
      faqs={[
        { question: "Which Indian e-commerce companies have official MCP servers?", answer: "Swiggy, Zomato, Paytm, Delhivery, Zoho and Amazon (for sellers), among others listed above." },
        { question: "Does Flipkart have an MCP server?", answer: "No official one. Community projects wrap the Seller APIs or scrape product data." },
        { question: "Can an AI order groceries in India?", answer: "Through Swiggy Instamart's official MCP server, yes, with cash on delivery only." },
        { question: "Can a merchant issue refunds through MCP?", answer: "Paytm's official MCP server has refund tools for Paytm merchant accounts." },
        { question: "Is there an MCP server for shipping?", answer: "Delhivery's official server covers maps and addresses, not shipment booking or tracking." },
      ]}
      related={[
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
        { href: "/blog/swiggy-mcp-india", label: "Swiggy MCP servers" },
        { href: "/blog/paytm-mcp-server-india-payments", label: "Paytm MCP server" },
        { href: "/glossary/mcp-rbi-guidelines", label: "RBI guidelines and MCP" },
      ]}
    />
  );
}
