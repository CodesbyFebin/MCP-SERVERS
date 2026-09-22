import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "upstox-mcp-trading";
const TITLE = "Upstox MCP Server: Official Read-Only Setup";
const DESCRIPTION =
  "Upstox's official MCP server gives Claude, ChatGPT, Cursor and VS Code read-only access to your Upstox account. Endpoint, setup for each client, daily re-authorisation, and limits.";
const REVIEWED = "2026-09-23";
const DOCS = "https://upstox.com/developer/api-documentation/mcp-integration/";
const ENDPOINT = "https://mcp.upstox.com/mcp";

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
      h1="Upstox MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Yes. Upstox runs an official MCP server at ${ENDPOINT}. It is read-only: an AI assistant can look at your Upstox account data for research, but Upstox states you cannot place orders, modify positions or execute trades through it. Sign-in is OAuth in your browser and has to be renewed daily.`}
      sections={[
        {
          id: "what",
          heading: "What it is (and is not)",
          body: (
            <>
              <P>
                Upstox&apos;s <Ext href={DOCS}>MCP integration docs</Ext> are explicit:
                &ldquo;You cannot place orders, modify positions, or execute trades through the AI
                assistant.&rdquo; Use it to ask questions about your account and markets, then place
                any trade yourself in Upstox.
              </P>
              <P>
                Upstox also notes that AI-generated analysis &ldquo;serves as research support, not
                investment advice.&rdquo;
              </P>
            </>
          ),
        },
        {
          id: "prereq",
          heading: "What you need",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>An active (non-dormant) Upstox trading account</li>
              <li>Node.js, except for Claude Desktop and Claude Code</li>
              <li>One of the supported clients below</li>
            </ul>
          ),
        },
        {
          id: "setup",
          heading: "Setup by client",
          body: (
            <>
              <h3 className="mb-2 mt-4 font-semibold text-slate-900 dark:text-slate-100">Claude Code</h3>
              <Code>{`/plugin marketplace add upstox/upstox-plugin-marketplace
/plugin install upstox-mcp@upstox-plugins-official`}</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">Claude Desktop and claude.ai</h3>
              <P>
                Add the marketplace <code>upstox/upstox-plugin-marketplace</code>, install the{" "}
                <code>upstox-mcp</code> plugin, then connect the <code>upstox</code> connector from
                the plugin interface.
              </P>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">ChatGPT</h3>
              <P>
                Turn on Developer mode (Settings → Apps → Advanced settings), create a custom app
                with the endpoint below, then pick Upstox MCP from Connectors in a chat.
              </P>
              <Code>{ENDPOINT}</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">Cursor</h3>
              <P>Settings → Tools → MCP → Add custom MCP:</P>
              <Code>{`{
  "mcpServers": {
    "Upstox MCP": {
      "command": "npx",
      "args": ["mcp-remote", "${ENDPOINT}"]
    }
  }
}`}</Code>
              <h3 className="mb-2 mt-6 font-semibold text-slate-900 dark:text-slate-100">VS Code with GitHub Copilot</h3>
              <P>Add to <code>settings.json</code>:</P>
              <Code>{`{
  "mcp": {
    "servers": {
      "Upstox MCP": {
        "url": "${ENDPOINT}"
      }
    }
  }
}`}</Code>
            </>
          ),
        },
        {
          id: "auth",
          heading: "Daily re-authorisation",
          body: (
            <P>
              Sign-in is an OAuth flow in your browser. Upstox requires you to authorise again
              every day, so a connection that worked yesterday will ask you to sign in again. That
              is expected, not a fault.
            </P>
          ),
        },
        {
          id: "community",
          heading: "Community servers that can trade",
          body: (
            <P>
              Some unofficial Upstox MCP servers on GitHub, such as{" "}
              <Ext href="https://github.com/ravikant1918/mcp-server-upstox">ravikant1918/mcp-server-upstox</Ext>,
              are built on the Upstox developer API. They are not affiliated with Upstox. If a
              community server offers order tools, it acts with your API credentials, and every
              order it places is real. Read the code before trusting it with your account.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Upstox developer docs: MCP integration",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://mcp.upstox.com/mcp; read-only, cannot place orders, modify positions or execute trades; clients: Claude Desktop/web, Claude Code, ChatGPT developer mode, Cursor, VS Code with Copilot; exact setup commands and JSON; OAuth with daily re-authorisation; active non-dormant account; Node.js except for Claude Desktop/Code.",
          limitations: "The docs do not list individual tool names.",
        },
        {
          source: "ravikant1918/mcp-server-upstox",
          url: "https://github.com/ravikant1918/mcp-server-upstox",
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Community Upstox MCP server.",
          limitations: "Not reviewed; not affiliated with Upstox.",
        },
      ]}
      faqs={[
        {
          question: "Can the Upstox MCP server place trades?",
          answer:
            "No. Upstox states that you cannot place orders, modify positions or execute trades through the AI assistant.",
        },
        {
          question: "Why do I have to log in every day?",
          answer: "Upstox requires daily re-authorisation of the OAuth connection as a security measure.",
        },
        {
          question: "What is the Upstox MCP endpoint?",
          answer: "https://mcp.upstox.com/mcp",
        },
        {
          question: "Do I need Node.js?",
          answer:
            "For Cursor, VS Code and ChatGPT setups, Upstox lists Node.js as a prerequisite. Claude Desktop and Claude Code do not need it.",
        },
        {
          question: "Does a dormant Upstox account work?",
          answer: "No. Upstox requires an active, non-dormant trading account.",
        },
      ]}
      related={[
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/blog/dhan-mcp-fo-trading", label: "Dhan MCP server" },
        { href: "/blog/groww-mcp-investments", label: "Groww MCP server" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
      ]}
    />
  );
}
