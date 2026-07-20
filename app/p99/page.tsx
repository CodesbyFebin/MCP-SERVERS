import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import P99DashboardLoader from "./P99DashboardLoader";

export const metadata: Metadata = {
  title: "P99 Latency Dashboard (Illustrative) - MCPserver.in",
  description:
    "An illustrative example of a p50/p90/p99 latency dashboard across Mumbai, Bengaluru, secure gateway, and browser sandbox infrastructure — sample data, not live telemetry.",
  alternates: {
    canonical: "/p99",
  },
};

export default function P99Page() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/p99",
    title: "P99 Latency Dashboard (Illustrative)",
    description: "An illustrative example p50/p90/p99 latency dashboard across Mumbai, Bengaluru, secure gateway, and browser sandbox infrastructure — sample data for planning, not live telemetry.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "P99 Dashboard", item: "/p99" }
    ],
    softwareApplication: {
      name: "MCPserver.in P99 Dashboard (Illustrative)",
      description: "Example performance dashboard UI for MCP latency percentiles and regional service health, populated with sample data."
    }
  });

  return (
    <div id="p99-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={schema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "P99 Dashboard", href: "/p99" }]} />
        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-200">
            Illustrative example — not live telemetry
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">P99 latency dashboard (illustrative)</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            A sample percentile dashboard showing what MCP tool execution, edge routing, and gateway overhead tracking could look like. The figures below are example data for architecture planning, not measured production telemetry.
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
