import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import P99DashboardLoader from "./P99DashboardLoader";

export const metadata: Metadata = {
  title: "P99 Latency Dashboard - MCPserver.in Performance",
  description:
    "Track MCPserver.in p50, p90, and p99 latency across Mumbai, Bengaluru, secure gateway, and browser sandbox infrastructure.",
  alternates: {
    canonical: "/p99",
  },
};

export default function P99Page() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/p99",
    title: "P99 Latency Dashboard",
    description: "Track MCPserver.in p50, p90, and p99 latency across Mumbai, Bengaluru, secure gateway, and browser sandbox infrastructure.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "P99 Dashboard", item: "/p99" }
    ],
    softwareApplication: {
      name: "MCPserver.in P99 Dashboard",
      description: "Public performance dashboard for MCP latency percentiles and regional service health."
    }
  });

  return (
    <div id="p99-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={schema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "P99 Dashboard", href: "/p99" }]} />
        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
            Live performance signal
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Real-time p99 latency dashboard</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            Public percentile tracking for MCP tool execution, edge routing, gateway overhead, and SLA compliance across India-first infrastructure.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/data/mcp-stats-2026.csv"
              download
              className="inline-flex min-h-11 items-center rounded-md border border-white/10 bg-white/[0.04] px-4 text-xs font-black text-white hover:bg-white/[0.07]"
            >
              Download p99 CSV
            </a>
            <a
              href="/data/mcp-india-stats-2026.csv"
              download
              className="inline-flex min-h-11 items-center rounded-md border border-white/10 bg-white/[0.04] px-4 text-xs font-black text-white hover:bg-white/[0.07]"
            >
              Download India stats CSV
            </a>
            <a
              href="/data/mcp-stats-2026.json"
              className="inline-flex min-h-11 items-center rounded-md bg-violet-600 px-4 text-xs font-black text-white hover:bg-violet-500"
            >
              View JSON snapshot
            </a>
          </div>
        </section>
        <P99DashboardLoader />
      </div>
    </div>
  );
}
