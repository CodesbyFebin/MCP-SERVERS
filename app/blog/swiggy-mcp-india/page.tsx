import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "swiggy-mcp-india";
const TITLE = "Swiggy MCP Servers: Food, Instamart, Dineout";
const DESCRIPTION =
  "Swiggy publishes three official MCP servers for Food, Instamart and Dineout. Endpoints, what each can do, how to add them to Claude, Cursor and VS Code, and the COD and no-cancel limits.";
const REVIEWED = "2026-09-23";
const MANIFEST = "https://github.com/Swiggy/swiggy-mcp-server-manifest";

const SERVERS: [string, string, string][] = [
  ["Food", "https://mcp.swiggy.com/food", "Restaurant search, menu browsing, cart, food ordering"],
  ["Instamart", "https://mcp.swiggy.com/im", "Product search, cart, order placement"],
  ["Dineout", "https://mcp.swiggy.com/dineout", "Restaurant discovery and details, slot availability, table booking"],
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
      h1="Swiggy MCP Servers"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Yes. Swiggy publishes three official MCP servers: Food (mcp.swiggy.com/food), Instamart (mcp.swiggy.com/im) and Dineout (mcp.swiggy.com/dineout). After OAuth sign-in, an AI assistant can search, build a cart and place a real order. Swiggy says orders are cash on delivery only, placed orders cannot be cancelled, and Dineout supports free bookings only."
      sections={[
        {
          id: "servers",
          heading: "The three servers",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    {["Server", "Endpoint", "Capabilities"].map((h) => (
                      <th key={h} className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  {SERVERS.map(([name, url, what]) => (
                    <tr key={name}>
                      <td className="px-4 py-2 font-medium">{name}</td>
                      <td className="px-4 py-2 font-mono text-xs">{url}</td>
                      <td className="px-4 py-2">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "connect",
          heading: "How to connect",
          body: (
            <>
              <h3 className="mb-2 mt-4 font-semibold text-slate-900 dark:text-slate-100">Claude Desktop</h3>
              <P>
                Settings → Connectors → Add custom connector, and enter one of the URLs above. Add
                each service you want as its own connector. Sign-in is OAuth.
              </P>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">Cursor and VS Code</h3>
              <P>
                The <Ext href={MANIFEST}>Swiggy manifest</Ext> has one-click install badges for both.
                To do it by hand, add the servers to <code>~/.cursor/mcp.json</code> or your VS Code{" "}
                <code>mcp.json</code>. In Cursor, a remote server entry looks like this:
              </P>
              <Code>{`{
  "mcpServers": {
    "swiggy-food": { "url": "https://mcp.swiggy.com/food" },
    "swiggy-instamart": { "url": "https://mcp.swiggy.com/im" },
    "swiggy-dineout": { "url": "https://mcp.swiggy.com/dineout" }
  }
}`}</Code>
              <P>
                Check the manifest for the exact JSON Swiggy currently publishes for each client, as
                key names differ between Cursor and VS Code.
              </P>
            </>
          ),
        },
        {
          id: "limits",
          heading: "Rules Swiggy sets",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Cash on delivery only.</strong> The manifest says it &ldquo;currently
                supports COD only&rdquo;.
              </li>
              <li>
                <strong>No cancellation.</strong> &ldquo;Orders placed cannot be cancelled.&rdquo;
                Check the cart, address and total before the assistant places an order.
              </li>
              <li>
                <strong>Dineout</strong> supports free bookings only.
              </li>
              <li>
                <strong>Don&apos;t use the app at the same time.</strong> Swiggy warns: &ldquo;Do
                not open the Swiggy app while using these MCP integrations.&rdquo;
              </li>
            </ul>
          ),
        },
        {
          id: "compare",
          heading: "Swiggy vs Zomato MCP",
          body: (
            <P>
              Zomato also publishes an{" "}
              <Link href="/blog/zomato-mcp-india" className="text-blue-600 hover:underline dark:text-blue-400">
                official MCP server
              </Link>{" "}
              for food ordering, with QR code payment and a personal-use-only restriction. Swiggy
              splits food, groceries and table booking into three servers and supports COD only.
              For groceries, Blinkit has no official server; see our{" "}
              <Link href="/blog/blinkit-mcp-india" className="text-blue-600 hover:underline dark:text-blue-400">
                Blinkit MCP page
              </Link>
              .
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Swiggy MCP server manifest (GitHub)",
          url: MANIFEST,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoints for Food (/food), Instamart (/im) and Dineout (/dineout) on mcp.swiggy.com; capabilities per server; Claude Desktop via Settings → Connectors → Add custom connector; Cursor and VS Code badges and mcp.json; OAuth redirect URIs for Claude; COD only; orders cannot be cancelled; Dineout free bookings only; do not open the Swiggy app while using the integrations.",
          limitations: "Terms and capabilities can change; the manifest does not list individual tool names.",
        },
      ]}
      faqs={[
        {
          question: "Does Swiggy have an official MCP server?",
          answer:
            "Yes, three: Food, Instamart and Dineout, published in the Swiggy/swiggy-mcp-server-manifest repository on GitHub.",
        },
        {
          question: "Can I pay online through Swiggy MCP?",
          answer: "No. Swiggy says the MCP integrations currently support cash on delivery only.",
        },
        {
          question: "Can I cancel an order the assistant placed?",
          answer: "No. Swiggy states that orders placed through the MCP cannot be cancelled.",
        },
        {
          question: "Can it order from Instamart?",
          answer: "Yes. The Instamart server at mcp.swiggy.com/im supports product search, cart and order placement.",
        },
        {
          question: "Why should I close the Swiggy app?",
          answer:
            "Swiggy's manifest tells users not to open the Swiggy app while using the MCP integrations. It does not say why, but following it avoids conflicting sessions or carts.",
        },
      ]}
      related={[
        { href: "/blog/zomato-mcp-india", label: "Zomato's official MCP server" },
        { href: "/blog/blinkit-mcp-india", label: "Blinkit MCP server status" },
        { href: "/clients/claude-desktop", label: "Using MCP servers in Claude Desktop" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
