import type { Metadata } from "next";
import Link from "next/link";
import { P } from "@/src/components/content/BrandMcpArticle";
import { ServerDirectory, directoryMetadata } from "@/src/components/content/ServerDirectory";

export const dynamic = "force-static";

const SLUG = "monitoring";
const TITLE = "Monitoring MCP Servers: Sentry, Datadog, Grafana";
const DESCRIPTION =
  "Official MCP servers for monitoring and observability: Sentry, Datadog and Grafana. What they give an AI assistant, and how to keep incident data safe.";

export function generateMetadata(): Metadata {
  return directoryMetadata(SLUG, TITLE, DESCRIPTION);
}

export default function Page() {
  return (
    <ServerDirectory
      category="Monitoring"
      slug={SLUG}
      title={TITLE}
      description={DESCRIPTION}
      reviewedAt="2026-09-23"
      directAnswer="Sentry, Datadog and Grafana publish official MCP servers that let an AI assistant read errors, logs, traces, dashboards and incident context while you debug. Sentry and Datadog offer hosted remote servers; Grafana's is open source. Connect them with read-focused access, and remember that logs and traces can contain personal data."
      entries={[
        { name: "Sentry MCP", publisher: "Sentry", url: "https://github.com/getsentry/sentry-mcp", note: "MCP server for interacting with Sentry; the MCP architecture docs cite Sentry's server as a remote server running on the Sentry platform over Streamable HTTP." },
        { name: "Datadog MCP Server", publisher: "Datadog", url: "https://docs.datadoghq.com/mcp_server/", note: "Remote server for retrieving logs, traces and incident context; site-specific endpoints such as mcp.datadoghq.com and mcp.datadoghq.eu." },
        { name: "Grafana MCP", publisher: "Grafana Labs", url: "https://github.com/grafana/mcp-grafana", note: "MCP server for Grafana. Apache-2.0." },
      ]}
      choosing={
        <>
          <P>
            Use the server for the platform that already holds your telemetry. When debugging with
            an assistant:
          </P>
          <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
            <li>Prefer read access; creating monitors or muting alerts should need approval.</li>
            <li>Logs and error payloads can include user data and secrets; check what leaves your tenant.</li>
            <li>Datadog notes it collects usage information about its remote MCP server under its privacy policy.</li>
          </ul>
          <P>
            For monitoring your own MCP servers, see{" "}
            <Link href="/docs/monitoring/observability-best-practices" className="text-blue-600 hover:underline dark:text-blue-400">
              MCP observability best practices
            </Link>
            .
          </P>
        </>
      }
      faqs={[
        { question: "Does Datadog have an official MCP server?", answer: "Yes, a remote MCP server documented at docs.datadoghq.com/mcp_server." },
        { question: "Is Sentry's MCP server remote?", answer: "Yes. The MCP architecture docs describe it as running on the Sentry platform over Streamable HTTP." },
        { question: "Is there a Grafana MCP server?", answer: "Yes, grafana/mcp-grafana, published by Grafana Labs." },
        { question: "Can these servers change my alerts?", answer: "Check each server's tool list and grant only the access you want the assistant to have." },
        { question: "Is it safe to send logs to an AI assistant?", answer: "Only after considering personal data and secrets in them, and your AI provider's data terms." },
      ]}
      related={[
        { href: "/docs/monitoring/observability-best-practices", label: "MCP observability best practices" },
        { href: "/glossary/mcp-p95-latency", label: "p95 latency for MCP tools" },
        { href: "/directory/devops", label: "DevOps MCP servers" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
