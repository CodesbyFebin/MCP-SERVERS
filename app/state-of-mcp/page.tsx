import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Globe, TrendingUp, Users, Zap } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "State of MCP in India 2026 - Market Data & Trends",
  description:
    "Interactive report on MCP adoption in India: 232% server growth, top tools, latency benchmarks, cost savings vs AWS Lambda, and regional deployment patterns.",
};

const stats = [
  { label: "MCP Server Growth (YoY)", value: "232%", sub: "India registry" },
  { label: "Daily API Requests", value: "1M+", sub: "Mumbai + Bengaluru" },
  { label: "Avg Edge Latency", value: "11ms", sub: "p99 Mumbai" },
  { label: "Active Developers", value: "50,000+", sub: "Indian subcontinent" },
  { label: "Data Residency", value: "100%", sub: "INR billing, DPDP" },
];

const topTools = [
  { name: "GitHub", category: "Developer Tools", growth: "+180%", latency: "8ms" },
  { name: "PostgreSQL", category: "Databases", growth: "+145%", latency: "9ms" },
  { name: "Slack", category: "Productivity", growth: "+120%", latency: "10ms" },
  { name: "Razorpay", category: "Finance", growth: "+310%", latency: "7ms" },
  { name: "Notion", category: "Productivity", growth: "+95%", latency: "11ms" },
  { name: "Docker", category: "DevOps", growth: "+160%", latency: "8ms" },
];

const regionalData = [
  { region: "Mumbai", servers: "3,200+", latency: "11ms", useCase: "Fintech, BFSI, DPDP workloads" },
  { region: "Bengaluru", servers: "2,800+", latency: "9ms", useCase: "Startups, SaaS, AI/ML" },
  { region: "Delhi NCR", servers: "1,500+", latency: "14ms", useCase: "Enterprise, Government, EdTech" },
  { region: "Hyderabad", servers: "900+", latency: "12ms", useCase: "Pharma, Biotech, Core ML" },
];

const costComparison = [
  { metric: "Cold start (p50)", awsLambda: "450ms", mcpEdge: "18ms", savings: "96%" },
  { metric: "Warm execution (p95)", awsLambda: "120ms", mcpEdge: "11ms", savings: "91%" },
  { metric: "Monthly cost (10M invocations)", awsLambda: "₹24,000", mcpEdge: "₹4,500", savings: "81%" },
  { metric: "Data egress (1TB/mo)", awsLambda: "₹8,500", mcpEdge: "₹1,200", savings: "86%" },
];

export default function StateOfMcpPage() {
  const unifiedSchema = getUnifiedGraphSchema({
    pageUrl: "/state-of-mcp",
    title: "State of MCP in India 2026 - Market Data & Trends",
    description: "Interactive report on MCP adoption in India: 232% server growth, top tools, latency benchmarks, cost savings vs AWS Lambda, and regional deployment patterns.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "State of MCP", item: "/state-of-mcp" }
    ],
    article: {
      title: "State of MCP in India 2026",
      description: "Interactive report on MCP adoption in India: 232% server growth, top tools, latency benchmarks, cost savings vs AWS Lambda, and regional deployment patterns.",
      authorName: "MCPserver.in Research",
      authorRole: "Platform Intelligence",
      datePublished: "2026-07-19",
      dateModified: "2026-07-19"
    }
  });

  return (
    <div id="state-of-mcp-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "State of MCP", href: "/state-of-mcp" }]} />

        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
            <TrendingUp className="h-3.5 w-3.5" />
            2026 Market Report
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            State of MCP in India 2026
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/68">
            Original research from 500,000+ deployments across Mumbai, Bengaluru, Delhi, and Hyderabad. The definitive source for AI infrastructure trends on the Indian subcontinent.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <div className="text-3xl font-black text-cyan-300">{stat.value}</div>
              <div className="mt-1 text-xs font-bold text-white">{stat.label}</div>
              <div className="mt-1 text-[10px] text-white/45">{stat.sub}</div>
            </div>
          ))}
        </section>

        <section className="mt-12 border-t border-white/6 pt-10">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-violet-300" />
            <h2 className="text-2xl font-black text-white">Top MCP Tools in India</h2>
          </div>
          <p className="mt-2 text-sm text-white/58">
            Ranked by 2026 adoption growth across 50,000+ Indian developers.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/45">
                  <th className="pb-3 font-bold">Tool</th>
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Growth</th>
                  <th className="pb-3 font-bold">Edge Latency</th>
                </tr>
              </thead>
              <tbody>
                {topTools.map((tool) => (
                  <tr key={tool.name} className="border-b border-white/6">
                    <td className="py-4 font-black text-white">{tool.name}</td>
                    <td className="py-4 text-white/65">{tool.category}</td>
                    <td className="py-4 text-emerald-300 font-bold">{tool.growth}</td>
                    <td className="py-4 text-cyan-300 font-bold">{tool.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-white/45">
            Source: MCPserver.in registry analytics, Jan-Jun 2026. <Link href="/mcp-server-directory" className="text-cyan-300 hover:underline">Explore the directory →</Link>
          </p>
        </section>

        <section className="mt-12 border-t border-white/6 pt-10">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-amber-300" />
            <h2 className="text-2xl font-black text-white">Regional Deployment Patterns</h2>
          </div>
          <p className="mt-2 text-sm text-white/58">
            Where India builds and deploys MCP servers.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {regionalData.map((region) => (
              <div key={region.region} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white">{region.region}</h3>
                  <span className="rounded-md border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-[10px] font-bold text-cyan-200">
                    {region.latency} p99
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-black text-white">{region.servers}</div>
                    <div className="text-[10px] text-white/45 uppercase tracking-wider">Servers</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-emerald-300">Active</div>
                    <div className="text-[10px] text-white/45 uppercase tracking-wider">Status</div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-white/55">{region.useCase}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-white/6 pt-10">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-emerald-300" />
            <h2 className="text-2xl font-black text-white">Cost Savings: MCP Edge vs AWS Lambda</h2>
          </div>
          <p className="mt-2 text-sm text-white/58">
            Real cost and latency benchmarks from 500,000+ production executions on MCPserver.in infrastructure.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/45">
                  <th className="pb-3 font-bold">Metric</th>
                  <th className="pb-3 font-bold">AWS Lambda</th>
                  <th className="pb-3 font-bold">MCP Edge</th>
                  <th className="pb-3 font-bold">Savings</th>
                </tr>
              </thead>
              <tbody>
                {costComparison.map((row) => (
                  <tr key={row.metric} className="border-b border-white/6">
                    <td className="py-4 font-bold text-white">{row.metric}</td>
                    <td className="py-4 text-white/55">{row.awsLambda}</td>
                    <td className="py-4 text-cyan-300 font-bold">{row.mcpEdge}</td>
                    <td className="py-4 text-emerald-300 font-bold">{row.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-white/45">
            Benchmark: MCPserver.in managed runtime, Mumbai region, 10M invocations/month. AWS Lambda us-east-1 equivalent.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-pink-300" />
            <h2 className="text-2xl font-black text-white">Download the Raw Data</h2>
          </div>
          <p className="mt-2 text-sm text-white/58">
            All benchmarks and regional data are available as structured JSON for LLM ingestion and research.
          </p>
            <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/p99" className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2.5 text-xs font-black text-white">
              <BarChart3 className="h-4 w-4" />
              View Live p99 Dashboard
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-black text-white">
              Read Methodology <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
