import type { Metadata } from "next";
import PillarPageTemplate from "../../src/components/PillarPageTemplate";
import GeneratedContent from "../../src/components/GeneratedContent";
import { loadPillarContent } from "../../src/lib/content/content-loader";
import { pillars } from "../../src/data/pillars";

const sourceSlug = "mcp-hosting";
const canonicalSlug = "mcp-server-hosting";
const pillar = pillars.find((p) => p.slug === sourceSlug);

export const metadata: Metadata = {
  title: "MCP Server Hosting - Model Context Protocol Hub",
  description: pillar?.shortAnswer || "Best practices for hosting MCP servers, including India-specific latency considerations and DPDP-aware controls.",
  alternates: {
    canonical: `/${canonicalSlug}/`,
    languages: {
      "en-IN": `/${canonicalSlug}/`,
      en: `/${canonicalSlug}/`,
    },
  },
};

export default function McpServerHostingPage() {
  if (!pillar) {
    return null;
  }

  const generatedContent = loadPillarContent(sourceSlug);
  const sections = [
    ["What Is MCP Server Hosting?", "Hosting means running an MCP server somewhere an MCP client can reach it, either as a local stdio process or as a remote authenticated service."],
    ["Local vs Remote MCP Servers", "Local stdio is best for single-user desktop workflows. Remote Streamable HTTP is better for shared, hosted, or multi-client deployments."],
    ["Streamable HTTP Architecture", "Remote MCP servers expose an MCP endpoint over HTTP. Servers can return JSON directly or stream server messages with SSE when needed."],
    ["Hosting Requirements", "Plan runtime, environment variables, secrets, persistent storage, health checks, logs, and deployment rollback before exposing a server."],
    ["Authentication and Authorisation", "Require authentication for remote servers and scope tokens per tenant, tool, and downstream API."],
    ["DNS, TLS and Origin Validation", "Use HTTPS, validate Origin headers, and bind local development servers to localhost to reduce DNS rebinding risk."],
    ["Deployment Options", "Use a VM, container service, Kubernetes, or managed serverless platform based on connection lifetime and state requirements."],
    ["Docker and Kubernetes", "Containers simplify rollout but still need readiness probes, graceful shutdown, resource limits, and secret injection."],
    ["Monitoring and Logging", "Capture per-tool latency, errors, auth failures, audit events, and redacted request metadata."],
    ["Scaling and Availability", "Scale stateless handlers horizontally; externalize session or tenant state when connections can move between instances."],
    ["Security Checklist", "Validate inputs, redact outputs, rotate credentials, enforce least privilege, and gate destructive tools with explicit approval."],
    ["Hosting Costs", "Costs depend on compute, always-on connections, logs, egress, secret storage, monitoring, and support requirements."],
    ["Frequently Asked Questions", "Confirm which capabilities are implemented today versus roadmap before vendor, compliance, or enterprise rollout."],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Verified August 2026</p>
          <p className="mt-2 text-3xl font-black text-slate-950">MCP Server Hosting</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Host MCP servers with clear transport choices, authentication, TLS, origin validation, monitoring,
            and a documented distinction between implemented service controls and roadmap items.
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
          title="MCP Server Hosting"
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
