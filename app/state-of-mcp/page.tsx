import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Globe, TrendingUp, Users, Zap } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "State of MCP in India 2026 - Community Trends & Illustrative Estimates",
  description:
    "Community trends and illustrative examples for MCP adoption in India: regional considerations, tooling patterns, and sample cost comparisons for planning purposes.",
  alternates: {
    canonical: "/state-of-mcp",
    languages: {
      "en-IN": "/state-of-mcp",
      "en": "/state-of-mcp",
        }
  },

};

const stats = [
  { label: "Community Interest", value: "Growing", sub: "Developer surveys" },
  { label: "India Edge Adoption", value: "Expanding", sub: "Mumbai & Bengaluru" },
  { label: "Regional Latency", value: "Variable", sub: "Depends on deployment" },
  { label: "Developer Engagement", value: "Rising", sub: "Indian subcontinent" },
  { label: "Data Residency", value: "Available", sub: "INR billing, DPDP-aligned" },
];

const topTools = [
  { name: "GitHub", category: "Developer Tools", growth: "Growing", latency: "Varies" },
  { name: "PostgreSQL", category: "Databases", growth: "Growing", latency: "Varies" },
  { name: "Slack", category: "Productivity", growth: "Growing", latency: "Varies" },
  { name: "Razorpay", category: "Finance", growth: "Growing", latency: "Varies" },
  { name: "Notion", category: "Productivity", growth: "Growing", latency: "Varies" },
  { name: "Docker", category: "DevOps", growth: "Growing", latency: "Varies" },
];

const regionalData = [
  { region: "Mumbai", servers: "Active deployments", latency: "Varies", useCase: "Fintech, BFSI, regulated workloads" },
  { region: "Bengaluru", servers: "Active deployments", latency: "Varies", useCase: "Startups, SaaS, AI/ML" },
  { region: "Delhi NCR", servers: "Active deployments", latency: "Varies", useCase: "Enterprise, Government, EdTech" },
  { region: "Hyderabad", servers: "Active deployments", latency: "Varies", useCase: "Pharma, Biotech, ML workloads" },
];

export default function StateOfMcpPage() {
  const unifiedSchema = getUnifiedGraphSchema({
    pageUrl: "/state-of-mcp",
    title: "State of MCP in India 2026 - Community Trends & Illustrative Estimates",
    description: "Community trends and illustrative examples for MCP adoption in India: regional considerations, tooling patterns, and sample cost comparisons for planning purposes.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "State of MCP", item: "/state-of-mcp" }
    ],
    article: {
      title: "State of MCP in India 2026",
      description: "Community trends and illustrative examples for MCP adoption in India: regional considerations, tooling patterns, and sample cost comparisons for planning purposes.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: "2026-07-19",
      dateModified: "2026-07-20"
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
            Illustrative Community Trends
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            State of MCP in India 2026
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/68">
            Illustrative community examples for MCP adoption in India. Numbers shown are sample estimates for planning only and do not represent measured production telemetry.
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
            Illustrative regional examples for MCP deployment considerations across India.
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
            Illustrative ranking based on general category popularity, not measured registry analytics. <Link href="/mcp-server-directory" className="text-cyan-300 hover:underline">Explore the directory →</Link>
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
            <h2 className="text-2xl font-black text-white">Edge vs Traditional Serverless: What to Consider</h2>
          </div>
          <p className="mt-2 text-sm text-white/58">
            General architectural trade-offs worth weighing when comparing a colocated MCP deployment against a traditional serverless function — not a benchmark against any specific vendor.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-black text-white">Cold starts</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/55">
                Serverless functions typically pay a cold-start penalty on infrequent invocations. A persistently running MCP server avoids this at the cost of always-on compute.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-black text-white">Data egress</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/55">
                Hosting compute close to your primary data store reduces cross-region data transfer compared to a function running in a different region from your database.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-black text-white">Predictable cost</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/55">
                A fixed-capacity server has a predictable monthly cost; per-invocation serverless pricing can be cheaper at low volume and more expensive at sustained high volume.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-black text-white">Operational overhead</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/55">
                Serverless platforms handle scaling and patching for you; a self-managed server shifts that responsibility to your team in exchange for more control.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-white/45">
            The right choice depends on your traffic pattern, latency requirements, and operational capacity — always benchmark your own workload rather than relying on generic comparisons.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-pink-300" />
            <h2 className="text-2xl font-black text-white">Explore Further</h2>
          </div>
          <p className="mt-2 text-sm text-white/58">
            The illustrative estimates above are meant as planning references, not measured telemetry — see the architecture estimate dashboard for the same kind of directional data in more depth.
          </p>
            <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/p99" className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2.5 text-xs font-black text-white">
              <BarChart3 className="h-4 w-4" />
              View Architecture Estimate Dashboard
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
