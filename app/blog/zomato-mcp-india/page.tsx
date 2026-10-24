import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "zomato-mcp-india";
const TITLE = "Zomato MCP Server: Official Setup Guide";
const DESCRIPTION =
  "Zomato publishes an official MCP server for restaurant search, menus, cart, ordering and QR payment. Endpoint, OAuth setup, Claude Desktop config and current usage limits.";
const REVIEWED = "2026-09-23";
const MANIFEST = "https://github.com/Zomato/mcp-server-manifest";

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
      h1="Zomato MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Yes, Zomato publishes an official MCP server at https://mcp-server.zomato.com/mcp. After you sign in with OAuth, an AI assistant can search restaurants, browse menus, build a cart, place and track an order, and pay by QR code. Zomato currently limits it to personal use and does not allow third-party apps to be built on it."
      sections={[
        {
          id: "what",
          heading: "What the Zomato MCP server does",
          body: (
            <>
              <P>
                Zomato&apos;s{" "}
                <Ext href={MANIFEST}>official MCP server manifest on GitHub</Ext> lists these
                capabilities:
              </P>
              <ul className="mb-4 list-inside list-disc space-y-1 text-slate-700 dark:text-slate-300">
                <li>Restaurant discovery based on your location and preferences</li>
                <li>Menu browsing with prices, descriptions and ratings</li>
                <li>Creating a cart, including item customisation</li>
                <li>Placing an order and tracking it</li>
                <li>QR code payment</li>
              </ul>
              <P>
                These are real orders on your Zomato account. The server acts as you once you
                authorise it, so the assistant can spend money on your behalf.
              </P>
            </>
          ),
        },
        {
          id: "connect",
          heading: "How to connect it",
          body: (
            <>
              <P>The server endpoint is:</P>
              <Code>https://mcp-server.zomato.com/mcp</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">
                Claude Desktop: connector (paid Claude plans)
              </h3>
              <P>
                The manifest says this route requires a Claude subscription. In Claude, open
                Settings → Connectors → Add custom connector, then enter the endpoint URL above.
                Claude opens Zomato&apos;s OAuth sign-in when you first connect.
              </P>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">
                Claude Desktop: manual config (works on the free plan)
              </h3>
              <P>
                Add this to <code>claude_desktop_config.json</code>. It uses{" "}
                <code>mcp-remote</code> through <code>npx</code>, so Node.js must be installed.
              </P>
              <Code>{`{
  "mcpServers": {
    "zomato-mcp": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp-server.zomato.com/mcp"]
    }
  }
}`}</Code>
              <P>
                Fully quit and reopen Claude Desktop after saving the file so it reloads the
                config.
              </P>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">
                Other clients
              </h3>
              <P>
                The manifest lists OAuth redirect URIs whitelisted for Claude, ChatGPT, VS Code and
                Postman. Those clients can complete Zomato&apos;s sign-in flow. Follow each
                client&apos;s own instructions for adding a remote MCP server by URL.
              </P>
            </>
          ),
        },
        {
          id: "auth",
          heading: "Authentication",
          body: (
            <P>
              Sign-in is OAuth. You do not create or paste an API key. Access is granted to your
              own Zomato account through Zomato&apos;s login, and only the whitelisted client
              redirect URIs listed in the manifest can complete that flow.
            </P>
          ),
        },
        {
          id: "limits",
          heading: "Current limits",
          body: (
            <>
              <P>As of {REVIEWED}, the manifest states:</P>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  &ldquo;We are not allowing any third party apps to be built on top of Zomato MCP
                  right now.&rdquo;
                </li>
                <li>Access requires submitting a form, and it is for personal use.</li>
                <li>
                  It is offered for testing purposes, and Zomato disclaims liability for errors or
                  malfunctions.
                </li>
              </ul>
              <P>
                If you are planning a product on top of it, these terms rule that out for now.
                Check the manifest for changes before building anything.
              </P>
            </>
          ),
        },
        {
          id: "safety",
          heading: "Before you let an assistant order for you",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Ask the assistant to show the cart and delivery address before checkout.</li>
              <li>Confirm the total yourself before any payment step.</li>
              <li>
                Review which MCP servers are connected to the same client. A prompt from one tool
                should not be able to trigger orders through another.
              </li>
              <li>Disconnect the server when you are not using it.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Zomato MCP server manifest (GitHub)",
          url: MANIFEST,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://mcp-server.zomato.com/mcp; OAuth with whitelisted redirect URIs (Claude, ChatGPT, VS Code, Postman); capabilities: restaurant discovery, menus, cart, ordering with tracking, QR payment; personal use only, no third-party apps, testing purposes.",
          limitations:
            "The manifest does not list individual tool names. Terms and availability can change without notice.",
        },
      ]}
      faqs={[
        {
          question: "Is the Zomato MCP server official?",
          answer:
            "Yes. It is published by Zomato in the Zomato/mcp-server-manifest repository on GitHub, with the endpoint https://mcp-server.zomato.com/mcp.",
        },
        {
          question: "Do I need a Zomato API key?",
          answer:
            "No. The server uses OAuth, so you sign in with your Zomato account when the client first connects.",
        },
        {
          question: "Can I build an app or service on top of it?",
          answer:
            "Not at the moment. The manifest says Zomato is not allowing third-party apps to be built on top of the MCP server, and access is for personal use.",
        },
        {
          question: "Does it work without a paid Claude plan?",
          answer:
            "The connector route needs a Claude subscription according to the manifest. The manual claude_desktop_config.json route using npx mcp-remote is documented as working on the free plan.",
        },
        {
          question: "Does it cover Blinkit?",
          answer:
            "No. The manifest describes food ordering only. Blinkit has no official MCP server; see our Blinkit MCP page for the current status.",
        },
      ]}
      related={[
        { href: "/blog/blinkit-mcp-india", label: "Blinkit MCP server status" },
        { href: "/clients/claude-desktop", label: "Using MCP servers in Claude Desktop" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/learn/mcp-server", label: "What is an MCP server?" },
      ]}
    />
  );
}
