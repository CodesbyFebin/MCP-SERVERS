import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-server-video-tutorials-youtube";
const TITLE = "MCP Video Tutorials: How to Pick Current Ones";
const DESCRIPTION =
  "Many MCP video tutorials teach code that no longer matches the 2026-07-28 spec or v2 SDKs. A checklist for spotting outdated videos, and where to find current, official material.";
const REVIEWED = "2026-09-23";
const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";

const L = "text-blue-600 hover:underline dark:text-blue-400";
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
      h1="Choosing MCP Video Tutorials"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Video tutorials are a quick way to see MCP in action, but many were recorded before the 2026-07-28 protocol revision and the v2 Python and TypeScript SDKs. Before following one, check its date, its SDK imports and whether it teaches sessions or a separate SSE endpoint. For code, prefer official courses and SDK READMEs; use videos for concepts."
      sections={[
        {
          id: "signs",
          heading: "Signs a video is out of date",
          body: (
            <ul className={UL}>
              <li>It imports <code>@modelcontextprotocol/sdk/...</code> (TypeScript v1) or <code>mcp.server.fastmcp</code> (the older Python SDK API; v2 uses <code>MCPServer</code> from <code>mcp.server</code>).</li>
              <li>It explains an <code>initialize</code> handshake or <code>Mcp-Session-Id</code> as required.</li>
              <li>It builds a server with separate <code>/sse</code> and <code>/messages</code> endpoints: the HTTP+SSE transport, deprecated since 2025-03-26.</li>
              <li>It uses sampling or <code>notifications/message</code> logging as core features; both are deprecated in 2026-07-28.</li>
              <li>It pastes API keys directly into a config file with no mention of OAuth for remote servers.</li>
            </ul>
          ),
        },
        {
          id: "still",
          heading: "What older videos still teach well",
          body: (
            <P>
              The concepts carry over: hosts, clients and servers; tools, resources and prompts;
              stdio for local servers; and why tool descriptions matter. Watch for the ideas, then
              write code from current docs.
            </P>
          ),
        },
        {
          id: "instead",
          heading: "Current material to pair with videos",
          body: (
            <ul className={UL}>
              <li><Link href="/blog/mcp-video-courses-ranked" className={L}>Free official courses</Link> from Anthropic Academy and Hugging Face</li>
              <li><Link href="/blog/mcp-server-code-snippets-community-library" className={L}>Verified code snippets</Link> from the v2 SDKs</li>
              <li><Link href="/blog/mcp-transport-methods" className={L}>What changed in the 2026-07-28 transports</Link></li>
            </ul>
          ),
        },
        {
          id: "note",
          heading: "Why we don't list individual videos",
          body: (
            <P>
              We only recommend material we can verify, and videos age quickly without visible
              changelogs. Rather than a list that goes stale, this page gives you a checklist that
              works on any tutorial.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Streamable HTTP",
          url: SPEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Sessions and GET stream removed in 2026-07-28; HTTP+SSE transport deprecated since 2025-03-26.",
        },
      ]}
      faqs={[
        { question: "Are YouTube MCP tutorials reliable?", answer: "Many are good for concepts but predate the 2026-07-28 spec and v2 SDKs. Check code against current docs." },
        { question: "How can I tell if a tutorial uses the old SDK?", answer: "TypeScript v1 imports from @modelcontextprotocol/sdk; older Python code imports FastMCP from mcp.server.fastmcp, while v2 uses MCPServer." },
        { question: "Is the SSE transport in older videos still valid?", answer: "The separate HTTP+SSE transport is deprecated. New servers should use Streamable HTTP." },
        { question: "Where should I learn MCP from scratch?", answer: "The free Anthropic Academy and Hugging Face courses, plus the official docs." },
        { question: "Why doesn't this page list videos?", answer: "Videos go out of date without notice; a checklist stays useful." },
      ]}
      related={[
        { href: "/blog/mcp-video-courses-ranked", label: "MCP courses compared" },
        { href: "/complete-guide-mcp-servers", label: "The complete guide to MCP servers" },
        { href: "/sdk/typescript", label: "MCP TypeScript SDK" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
      ]}
    />
  );
}
