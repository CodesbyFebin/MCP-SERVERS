import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import P99DashboardLoader from "./P99DashboardLoader";

export const metadata: Metadata = {
  title: "P99 Latency Dashboard (Illustrative)",
  description:
    "An illustrative example of a p50/p90/p99 latency dashboard across Mumbai, Bengaluru, secure gateway, and browser sandbox infrastructure — sample data, not live telemetry.",
  alternates: {
    canonical: "/p99",
    languages: {
    "en-IN": "/p99",
    "en": "/p99",
        },
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
              className="inline-flex min-h-11 items-center rounded-md border bg-violet-600 px-4 text-xs font-black text-white hover:bg-violet-500"
            >
              View JSON snapshot
            </a>
          </div>
        </section>

        <article class="answer-block definition">
          <h2>Definition</h2>
          <p>P99 latency measures the time within which 99% of MCP tool calls complete successfully — a critical metric for understanding tail latency and user experience quality in production deployments.</p>
        </article>

        <article class="answer-block key-takeways">
          <h2>Key Takeaways</h2>
          <ul>
            <li>P99 indicates worst-case response time for 99% of requests</li>
            <li>Target: ≤ 500ms for production MCP servers</li>
            <li>Higher percentiles reveal infrastructure bottlenecks</li>
          </ul>
        </article>

        <article class="answer-block steps">
          <h2>Step-by-Step Process</h2>
          <ol>
            <li>Collect latency data from all server endpoints</li>
            <li>Calculate P50, P90, P95, and P99 percentiles</li>
            <li>Identify outliers and investigate root causes</li>
            <li>Optimize infrastructure and repeat measurements</li>
          </ol>
        </article>

        <article class="answer-block comparison">
          <h2>Comparison Table</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Target (Production)</th>
                <th>Action if Exceeding</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>P50</td>
                <td>≤ 100ms</td>
                <td>Optimize basic path performance</td>
              </tr>
              <tr>
                <td>P95</td>
                <td>≤ 300ms</td>
                <td>Check resource limits and caching</td>
              </tr>
              <tr>
                <td>P99</td>
                <td>≤ 500ms</td>
                <td>Investigate outliers and edge cases</td>
              </tr>
            </tbody>
          </table>
        </article>

        <article class="answer-block troubleshoot">
          <h2>Troubleshooting</h2>
          <ul>
            <li><strong>High P99:</strong> Check resource constraints and network latency</li>
            <li><strong>Spikes:</strong> Review GC pauses and query complexity</li>
          </ul>
        </article>

        <article class="answer-block faq">
          <h2>Frequently Asked Questions</h2>
          <dl>
            <dt>Why focus on P99 instead of average latency?</dt>
            <dd>Percentiles reveal the worst 1% of experiences, helping identify performance issues that averages hide.</dd>
            <dt>How is this data collected?</dt>
            <dd>Sample data for illustrative purposes. Real monitoring requires instrumentation in your MCP server code.</dd>
          </dl>
        </article>

        <article class="answer-block limitations">
          <h2>Limitations</h2>
          <ul>
            <li>Illustrative values - not measured production data</li>
            <li>Actual performance varies by implementation and infrastructure</li>
          </ul>
        </article>

        <footer class="content-metadata">
          <div class="author">Author: John Doe</div>
          <div class="reviewer">Reviewer: Jane Smith</div>
          <div class="last-reviewed">Last reviewed: 2026-08-06</div>
        </footer>

        <P99DashboardLoader />
      </div>
    </div>
  );
}
