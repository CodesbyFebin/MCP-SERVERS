import type { Metadata } from "next";
import PillarPageTemplate from "../../src/components/PillarPageTemplate";
import GeneratedContent from "../../src/components/GeneratedContent";
import { loadPillarContent } from "../../src/lib/content/content-loader";
import { pillars } from "../../src/data/pillars";

const sourceSlug = "mcp-tutorial";
const canonicalSlug = "how-to-build-mcp-server";
const pillar = pillars.find((p) => p.slug === sourceSlug);

export const metadata: Metadata = {
  title: "How to Build an MCP Server - Model Context Protocol Tutorial",
  description: pillar?.shortAnswer || "Build your first MCP server with TypeScript or Python, connect it to a client, and execute a custom tool.",
  alternates: {
    canonical: `/${canonicalSlug}/`,
    languages: {
      "en-IN": `/${canonicalSlug}/`,
      en: `/${canonicalSlug}/`,
    },
  },
};

export default function HowToBuildMcpServerPage() {
  if (!pillar) {
    return null;
  }

  const generatedContent = loadPillarContent(sourceSlug);
  const sections = [
    ["What You Will Build", "A minimal MCP server with one tool, one resource, and one reusable prompt that runs locally over stdio and can later move behind Streamable HTTP."],
    ["MCP Host-Client-Server Architecture", "The host application manages clients. Each client keeps an isolated connection to one server. The server exposes capabilities through JSON-RPC."],
    ["Choose TypeScript or Python", "Use the official SDK that best matches your runtime. TypeScript is common for Node deployments; Python is convenient for data and automation workflows."],
    ["Install the Official MCP SDK", "Install only the SDK and runtime dependencies you need. Keep secrets out of source control and pin versions for production builds."],
    ["Create Your First Tool", "Start with a read-only tool with a narrow JSON Schema input. Verify the expected output before adding write actions."],
    ["Add Resources and Prompts", "Expose read-only context as resources and repeatable instructions as prompts so clients do not need hard-coded workflow text."],
    ["Run the Server with stdio", "Use stdio for local development and desktop clients. The client launches the server process and exchanges JSON-RPC messages."],
    ["Expose It with Streamable HTTP", "Use Streamable HTTP for remote servers. Validate Origin headers, require authentication, and bind local development servers to localhost."],
    ["Connect Claude, Cursor or VS Code", "Add the server configuration to a compatible MCP host, restart the client, and confirm the tool list is visible."],
    ["Test with MCP Inspector", "Run the official MCP Inspector before connecting a full AI client. Confirm initialize, tools/list, tools/call, resources/list, and prompts/list."],
    ["Authentication and Security", "Use least-privilege credentials, redact secrets from logs and tool output, and require confirmation before destructive actions."],
    ["Docker and Production Deployment", "Containerize only after the local server works. Add health checks, structured logs, environment validation, and graceful shutdown handling."],
    ["Common Errors", "Most first-run failures come from wrong paths, stdout logging, missing environment variables, mismatched transports, or invalid JSON Schema."],
    ["Complete Source Code", "Keep a small working example in version control with expected command output and a tested Inspector transcript."],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Verified August 2026</p>
          <p className="mt-2 text-3xl font-black text-slate-950">How to Build an MCP Server</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Build a small Model Context Protocol server, run it locally with stdio, test it with MCP Inspector,
            and prepare it for authenticated Streamable HTTP deployment.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {sections.map(([heading, body]) => (
              <div key={heading} className="rounded-lg border border-slate-200 p-4">
                <h2 className="text-base font-bold text-slate-950">{heading}</h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </section>
        <PillarPageTemplate
          title="How to Build an MCP Server"
          subtitle={pillar.subtitle}
          shortAnswer={pillar.shortAnswer}
          description={pillar.description}
          slug={canonicalSlug}
          faqCluster={pillar.faqCluster}
        />

        <div className="mt-12">
          <GeneratedContent content={generatedContent} />
        </div>
      </div>
    </div>
  );
}
