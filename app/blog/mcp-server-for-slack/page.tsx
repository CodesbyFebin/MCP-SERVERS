import type { Metadata } from "next";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-server-for-slack";
const TITLE = "Slack MCP Server: Official Setup and Limits";
const DESCRIPTION =
  "Slack's official MCP server at mcp.slack.com lets approved AI clients search, read and post in Slack. Who can use it, admin approval, capabilities, and the archived reference server.";
const REVIEWED = "2026-09-23";
const DOCS = "https://docs.slack.dev/ai/slack-mcp-server/";
const ENDPOINT = "https://mcp.slack.com/mcp";
const REFERENCE = "https://github.com/modelcontextprotocol/servers";

const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

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
      h1="Slack MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Slack runs an official MCP server at ${ENDPOINT}. Through OAuth, an approved AI client can search messages, files, users and channels, read channels and threads, send and draft messages, add reactions, and work with canvases and lists. Only Slack directory-published apps or a workspace's internal apps may use it, and workspace admins approve each client.`}
      sections={[
        {
          id: "who",
          heading: "Who can connect",
          body: (
            <>
              <P>
                Slack&apos;s <Ext href={DOCS}>MCP docs</Ext> say &ldquo;only directory-published
                apps or internal apps may use MCP&rdquo;; unlisted apps are not allowed. Admins
                approve and manage MCP client integrations through Slack&apos;s normal app approval
                process.
              </P>
              <P>
                Slack lists partner-built clients that work without coding: Claude.ai, Claude Code,
                Perplexity and Cursor. To use another client, you build and install your own
                internal Slack app with confidential OAuth.
              </P>
            </>
          ),
        },
        {
          id: "can",
          heading: "What it can do",
          body: (
            <ul className={UL}>
              <li>Search messages and files, emoji, users and channels</li>
              <li>Read a channel, a thread, files and user profiles; list channel members and a user&apos;s channels</li>
              <li>Send and draft messages, add reactions, create channels, upload files</li>
              <li>Create, read and update canvases and lists</li>
            </ul>
          ),
        },
        {
          id: "care",
          heading: "Things to weigh",
          body: (
            <ul className={UL}>
              <li>
                Sending is a real post under your name. Ask the assistant to show the text and the
                channel before it sends.
              </li>
              <li>
                Slack messages come from many people. Instructions hidden in a message are data, not
                commands; be cautious when the same client also has tools that can act elsewhere.
              </li>
              <li>Search results can include private channels you belong to; mind where the output goes.</li>
            </ul>
          ),
        },
        {
          id: "reference",
          heading: "The old reference Slack server",
          body: (
            <P>
              The MCP project&apos;s early Slack server has been moved to the archived servers in{" "}
              <Ext href={REFERENCE}>modelcontextprotocol/servers</Ext>. For new setups, use
              Slack&apos;s official server.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Slack developer docs: Slack MCP server overview",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://mcp.slack.com/mcp; only directory-published or internal apps; admins approve MCP clients; confidential OAuth; capabilities list; partner clients Claude.ai, Claude Code, Perplexity and Cursor.",
          limitations: "Plan requirements for individual features (such as canvases) are not detailed on this page.",
        },
        {
          source: "modelcontextprotocol/servers",
          url: REFERENCE,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Slack is among the archived reference servers.",
        },
      ]}
      faqs={[
        {
          question: "Does Slack have an official MCP server?",
          answer: "Yes, at https://mcp.slack.com/mcp, documented on docs.slack.dev.",
        },
        {
          question: "Can any MCP client connect to Slack?",
          answer: "No. Only Slack directory-published apps or a workspace's internal apps may use it, with admin approval.",
        },
        {
          question: "Can the assistant post messages?",
          answer: "Yes. Sending and drafting messages are among its capabilities.",
        },
        {
          question: "Which clients work out of the box?",
          answer: "Slack lists Claude.ai, Claude Code, Perplexity and Cursor.",
        },
        {
          question: "Should I still use the MCP reference Slack server?",
          answer: "It has been archived. Use Slack's official server for new setups.",
        },
      ]}
      related={[
        { href: "/blog/mcp-server-for-jira", label: "Jira MCP server" },
        { href: "/blog/mcp-server-for-onedrive", label: "OneDrive MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
