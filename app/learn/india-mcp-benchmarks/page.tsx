import type { Metadata } from "next";
import { Gauge } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";
import { getContentDates } from "../../../src/lib/contentDates";

export const metadata: Metadata = {
  title: "India MCP Infrastructure Benchmarks | MCPserver.in",
  description:
    "Illustrative architecture estimates for MCP server latency and throughput when deploying from Indian cloud regions versus international ones.",
  alternates: {
    canonical: "/learn/india-mcp-benchmarks",
    languages: {
    "en-IN": "/learn/india-mcp-benchmarks",
    "en": "/learn/india-mcp-benchmarks",
  },
  },
};

const regionalComparison = [
  { region: "Mumbai (ap-south-1)", flag: "🇮🇳", p50: "9ms", p99: "15ms", cost: "Baseline" },
  { region: "Bengaluru (asia-south2)", flag: "🇮🇳", p50: "11ms", p99: "18ms", cost: "Baseline" },
  { region: "Singapore", flag: "🇸🇬", p50: "28ms", p99: "45ms", cost: "+10%" },
  { region: "US East", flag: "🇺🇸", p50: "42ms", p99: "78ms", cost: "+20%" },
  { region: "EU (Frankfurt)", flag: "🇪🇺", p50: "55ms", p99: "102ms", cost: "+25%" },
];

export default function IndiaBenchmarksPage() {
  const dates = getContentDates("learn:india-mcp-benchmarks");
  const unifiedSchema = getUnifiedGraphSchema({
    speakable: ["#indiaMcpBenchmarks"],
    pageUrl: "/learn/india-mcp-benchmarks",
    title: "India MCP Infrastructure Benchmarks",
    description:
      "Illustrative architecture estimates for MCP server latency and throughput when deploying from Indian cloud regions versus international ones.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Learn", item: "/learn" },
      { name: "India MCP Benchmarks", item: "/learn/india-mcp-benchmarks" },
    ],
  });

  return (
    <div id="india-mcp-benchmarks" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Learn", href: "/learn" },
            { name: "India MCP Benchmarks", href: "/learn/india-mcp-benchmarks" },
          ]}
        />

        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200">
            <Gauge className="h-3.5 w-3.5" />
            Architecture reference
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            India Infrastructure Benchmarks
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Illustrative architecture estimates for AI agents and MCP servers deployed in the Indian subcontinent, useful for reasoning about region selection before you benchmark your own workload.
          </p>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/50">
            <strong className="text-white/70">Data label:</strong> the numbers below are simulated architecture examples based on typical network round-trip times and standard cloud instance overhead — not live measured telemetry from real servers. Always benchmark your specific workload before making a deployment decision.
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-3xl font-black text-emerald-300">~15ms</div>
            <div className="mt-1 text-xs text-white/45">p99 latency, Mumbai region (illustrative)</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-3xl font-black text-cyan-300">1,500</div>
            <div className="mt-1 text-xs text-white/45">req/sec per node (illustrative)</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-3xl font-black text-violet-300">~₹4K/mo</div>
            <div className="mt-1 text-xs text-white/45">compute cost, single node (illustrative)</div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-black text-white">Regional Comparison</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-white/50">
                <tr>
                  <th className="px-4 py-3 font-bold">Region</th>
                  <th className="px-4 py-3 text-right font-bold">Sim. p50</th>
                  <th className="px-4 py-3 text-right font-bold">Sim. p99</th>
                  <th className="px-4 py-3 text-right font-bold">Sim. Cost</th>
                </tr>
              </thead>
              <tbody className="text-white/65">
                {regionalComparison.map((row) => (
                  <tr key={row.region} className="border-t border-white/8">
                    <td className="px-4 py-3 font-medium">
                      {row.flag} {row.region}
                    </td>
                    <td className="px-4 py-3 text-right">{row.p50}</td>
                    <td className="px-4 py-3 text-right">{row.p99}</td>
                    <td className="px-4 py-3 text-right text-white/45">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-right text-xs text-white/35">
            * Illustrative values derived from typical network round-trip times and compute overhead — not measured from live servers.
          </p>
        </section>

        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 to-violet-950/30 p-8">
          <h3 className="text-xl font-black text-white">Designing for India</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/58">
            These estimates suggest Mumbai and Bengaluru are reasonable anchor regions for latency-sensitive MCP servers serving Indian users. For production deployments, always benchmark your specific workload rather than relying on generic estimates.
          </p>
        </div>
      </div>
    </div>
  );
}
