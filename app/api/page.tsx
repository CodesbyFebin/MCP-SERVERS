import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Braces, KeyRound, PlayCircle, Server } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCPserver API Documentation - REST, MCP Gateway and P99 Stats",
  description:
    "Public API overview for MCPserver.in server discovery, categories, p99 latency stats, deployments, and secure MCP gateway access.",
  alternates: {
    canonical: "/api",
  },
};

const endpoints = [
  ["GET", "/api/v1/servers", "List verified MCP servers with category, auth, transport, and security metadata."],
  ["POST", "/api/v1/servers", "Create a private hosted MCP server deployment from a registry package or Git repository."],
  ["GET", "/api/v1/categories", "Return server category counts and canonical directory links."],
  ["GET", "/api/v1/stats/p99", "Return p50, p90, p99, error rate, and sample count by region and service."],
  ["POST", "/api/v1/executions", "Invoke an MCP tool through the zero-trust gateway with audit logging."],
];

const sample = `curl https://mcpserver.in/api/v1/stats/p99?region=in-mumbai \\
  -H "Authorization: Bearer $MCP_API_KEY" \\
  -H "Accept: application/json"`;

export default function ApiDocsPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/api",
    title: "MCPserver API Documentation",
    description: "Public API overview for MCPserver.in server discovery, categories, p99 latency stats, deployments, and secure MCP gateway access.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "API", item: "/api" }
    ]
  });

  return (
    <div id="api-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={schema} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "API", href: "/api" }]} />

        <section className="grid gap-8 py-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200">
              <Braces className="h-3.5 w-3.5" />
              REST + MCP Gateway
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">API documentation</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
              Build discovery, deployment, analytics, and tool execution workflows against one authenticated control plane.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/docs" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-violet-600 px-4 text-xs font-black text-white">
                <BookOpen className="h-4 w-4" />
                Read docs
              </Link>
              <Link href="/p99" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 text-xs font-black text-white">
                <PlayCircle className="h-4 w-4" />
                View p99 dashboard
              </Link>
            </div>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#08111f] p-5 text-xs leading-relaxed text-cyan-100">
            <code>{sample}</code>
          </pre>
        </section>

        <section className="grid gap-4">
          {endpoints.map(([method, path, description]) => (
            <div key={path} className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[110px_240px_1fr] md:items-center">
              <span className={`w-fit rounded-md px-2.5 py-1 text-[11px] font-black ${method === "GET" ? "bg-emerald-500/15 text-emerald-200" : "bg-violet-500/15 text-violet-200"}`}>
                {method}
              </span>
              <code className="text-sm font-bold text-white">{path}</code>
              <p className="text-xs leading-relaxed text-white/55">{description}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["API keys", "Scoped keys, rotation windows, and per-server execution limits.", KeyRound],
            ["Server registry", "Verified metadata, package provenance, and category search.", Server],
            ["Live explorer", "Swagger/OpenAPI explorer with signed trial requests.", PlayCircle],
          ].map(([title, body, Icon]) => (
            <div key={title as string} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <Icon className="h-5 w-5 text-cyan-300" />
              <h2 className="mt-4 text-sm font-black text-white">{title as string}</h2>
              <p className="mt-2 text-xs leading-relaxed text-white/55">{body as string}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
