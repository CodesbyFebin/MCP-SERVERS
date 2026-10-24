import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "firebase-mcp-server";
const PATH = "/databases/firebase-mcp-server";
const TITLE = "Firebase MCP Server: Official CLI Setup";
const DESCRIPTION =
  "Firebase's official MCP server ships in the Firebase CLI. Run it with npx firebase-tools mcp to give Claude, Cursor or Copilot tools for Firestore, Auth, Storage, Functions and more.";
const REVIEWED = "2026-09-23";
const DOCS = "https://firebase.google.com/docs/ai-assistance/mcp-server";
const SRC = "https://github.com/firebase/firebase-tools/tree/main/src/mcp";

const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

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
      section={{ label: "Servers", href: "/servers" }}
      title={TITLE}
      h1="Firebase MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Firebase's official MCP server is built into the Firebase CLI and runs locally with npx -y firebase-tools@latest mcp. It uses the same credentials as your Firebase CLI login (or Application Default Credentials) and gives AI tools access to Firestore, Authentication, Cloud Storage, Cloud Functions, Realtime Database, Cloud Messaging, Crashlytics, Remote Config, App Hosting and more."
      sections={[
        {
          id: "config",
          heading: "Configure",
          body: (
            <>
              <P>Add this to your client&apos;s MCP config:</P>
              <Code>{`{
  "mcpServers": {
    "firebase": {
      "command": "npx",
      "args": ["-y", "firebase-tools@latest", "mcp"]
    }
  }
}`}</Code>
              <P>Two useful flags:</P>
              <ul className={UL}>
                <li><code>--dir ABSOLUTE_DIR_PATH</code>: the project directory to use</li>
                <li><code>--only FEATURE_1,FEATURE_2</code>: expose tools for only those features</li>
              </ul>
              <P>
                Run <code>firebase login</code> first. Firebase lists Antigravity, Claude Code,
                Claude Desktop, Cline, Cursor, VS Code Copilot and Windsurf as compatible clients.
              </P>
            </>
          ),
        },
        {
          id: "tools",
          heading: "Example tools",
          body: (
            <P>
              <code>auth_get_users</code>, <code>firestore_query_collection</code>,{" "}
              <code>storage_get_object_download_url</code>, <code>functions_get_logs</code>,{" "}
              <code>messaging_send_message</code>, <code>crashlytics_get_issue</code> and{" "}
              <code>firebase_deploy</code>. The full list is in the{" "}
              <Ext href={DOCS}>Firebase docs</Ext> and the <Ext href={SRC}>source</Ext>.
            </P>
          ),
        },
        {
          id: "care",
          heading: "Be careful with production",
          body: (
            <ul className={UL}>
              <li>
                Tool calls run with your CLI credentials, so the assistant can do what you can:
                deploy, send push messages, read user records.
              </li>
              <li>Use <code>--only</code> to limit tools, and point it at a development project where possible.</li>
              <li>Review <code>firebase_deploy</code> and <code>messaging_send_message</code> calls before approving.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Firebase docs: Firebase MCP server",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Local server via npx -y firebase-tools@latest mcp; CLI login or ADC credentials; --dir and --only flags; feature groups; example tool names; compatible clients.",
        },
        {
          source: "firebase/firebase-tools src/mcp",
          url: SRC,
          type: "official",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Source of the MCP server within the Firebase CLI repository.",
          limitations: "Code not reviewed.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Firebase MCP server?",
          answer: "Yes. It is part of the Firebase CLI (firebase-tools) and runs with the mcp command.",
        },
        {
          question: "How does it authenticate?",
          answer: "With the credentials from your Firebase CLI login or Application Default Credentials.",
        },
        {
          question: "Can I limit which tools it exposes?",
          answer: "Yes, with --only followed by a comma-separated list of features.",
        },
        {
          question: "Can it deploy my app?",
          answer: "Yes, firebase_deploy is one of its tools, so review deploy calls before approving.",
        },
        {
          question: "Which Firebase services does it cover?",
          answer: "Authentication, Firestore, Cloud Storage, Cloud Functions, Realtime Database, Cloud Messaging, Crashlytics, Remote Config, App Hosting and more.",
        },
      ]}
      related={[
        { href: "/directory/databases", label: "Database MCP servers" },
        { href: "/servers/mcp-server-postgres", label: "PostgreSQL MCP server" },
        { href: "/servers/google-calendar-mcp-server", label: "Google Calendar MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
