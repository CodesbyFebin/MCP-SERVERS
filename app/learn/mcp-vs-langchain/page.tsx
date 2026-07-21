import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GitBranch, Layers, Zap } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import FAQ from "../../../src/components/FAQ";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";

const title = "MCP vs LangChain: An Honest Technical Comparison";
const description =
  "MCP is a communication protocol for tool discovery and invocation; LangChain is an orchestration framework for agent workflows and memory. They solve different problems and are often used together.";

export const metadata: Metadata = {
  title,
  description,  alternates: {
    canonical: "/learn/mcp-vs-langchain",
    languages: {
      "en-IN": "/learn/mcp-vs-langchain",
      "en": "/learn/mcp-vs-langchain",
    }
  },

};

const comparisonRows: [string, string, string][] = [
  ["What it is", "A protocol — a standardized wire format for how a client discovers and calls tools, resources, and prompts", "A framework — a library of abstractions for chains, agents, memory, and orchestration"],
  ["Tool discovery", "Built into the protocol: tools/list is a standard method every MCP server implements", "Tools are defined and registered in code; discovery is whatever your application builds"],
  ["State / memory", "Stateless by design — a server doesn't remember previous calls unless you build that yourself", "Has first-class memory abstractions (buffer, summary, vector-store-backed) for multi-turn agents"],
  ["Vendor lock-in", "None by design — any MCP client can talk to any MCP server", "Some — LangChain's chain/agent abstractions are LangChain-specific, though it can call MCP servers as tools"],
  ["Learning curve", "Small surface area: transports, tools, resources, prompts", "Larger surface area: chains, agents, memory, retrievers, callbacks"],
  ["Best fit", "Standardizing how AI clients connect to external systems (databases, SaaS, internal APIs)", "Building the agent's reasoning loop: planning, multi-step tasks, tool selection logic"],
];

export default function McpVsLangchainPage() {
  const faqs = [
    { question: "Is MCP replacing LangChain?", answer: "No. They solve different layers of the problem. MCP standardizes how a client talks to tools; LangChain (or any agent framework) decides which tools to call and in what order. Many teams use LangChain as the orchestration layer and MCP as the tool-connection layer underneath it." },
    { question: "Can I use MCP with AutoGen or CrewAI instead of LangChain?", answer: "Yes. Because MCP is a protocol, not a LangChain-specific feature, any agent framework that implements an MCP client — AutoGen, CrewAI, or a custom orchestrator — can discover and call the same MCP servers." },
    { question: "Do I need LangChain to build an MCP server?", answer: "No. Building an MCP server only requires the MCP SDK (or a direct JSON-RPC 2.0 implementation). LangChain is relevant on the client/orchestration side, not the server side." },
    { question: "Which one should a small team start with?", answer: "If the immediate need is connecting an AI client to a database or internal API, start with MCP — it's the smaller surface area. Reach for LangChain (or similar) once you need multi-step planning, memory across turns, or complex agent orchestration." },
  ];

  const unifiedGraphSchema = getUnifiedGraphSchema({
    pageUrl: "/learn/mcp-vs-langchain",
    title,
    description,
    breadcrumbs: [
      { name: "Learn", item: "/learn" },
      { name: "MCP vs LangChain", item: "/learn/mcp-vs-langchain" },
    ],
    article: {
      title,
      description,
      authorName: "MCPserver.in Engineering",
      authorRole: "Infrastructure & Platform Team",
      datePublished: "2026-07-21",
      dateModified: "2026-07-21",
    },
    faq: faqs,
  });

  return (
    <div id="mcp-vs-langchain-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedGraphSchema} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Learn", href: "/learn" },
            { name: "MCP vs LangChain", href: "/learn/mcp-vs-langchain" },
          ]}
        />

        <section className="py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10">
            <GitBranch className="h-6 w-6 text-cyan-200" />
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">MCP vs LangChain: An Honest Comparison</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            They get compared constantly, but they answer different questions. Here&apos;s the actual distinction, not a sales pitch for either one.
          </p>
        </section>

        <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-cyan-300">Direct answer</p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Use <strong>LangChain</strong> (or a similar framework) for complex, multi-step agentic workflows and memory management — it is an
            orchestration framework that manages the agent&apos;s reasoning. Use <strong>MCP</strong> for standardized, secure, dynamic tool
            discovery between an AI client and external systems — it is a communication protocol that manages the agent&apos;s hands. They are
            not mutually exclusive: LangChain can act as an MCP client.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="h-5 w-5 text-cyan-300" />
            <h2 className="text-2xl font-black text-white">The core difference</h2>
          </div>
          <p className="text-sm leading-relaxed text-white/65">
            LangChain is an <strong>orchestration framework</strong> — chains, agents, memory, retrievers, and callbacks for building the logic
            that decides what an AI system does next. MCP is a <strong>communication protocol</strong> — a standardized way for a client to ask
            &quot;what tools do you have?&quot; and call one, regardless of who wrote the server or what language it&apos;s in. One is about
            deciding; the other is about connecting.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-black text-white mb-4">Feature comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-left text-xs sm:text-sm">
              <thead className="bg-white/[0.04] text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-bold">Feature</th>
                  <th className="px-4 py-3 font-bold">MCP</th>
                  <th className="px-4 py-3 font-bold">LangChain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comparisonRows.map(([feature, mcp, lc]) => (
                  <tr key={feature} className="text-slate-400">
                    <td className="px-4 py-3 font-semibold text-white/80">{feature}</td>
                    <td className="px-4 py-3">{mcp}</td>
                    <td className="px-4 py-3">{lc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-5 w-5 text-cyan-300" />
            <h2 className="text-2xl font-black text-white">The hybrid approach: LangChain as an MCP client</h2>
          </div>
          <p className="text-sm leading-relaxed text-white/65">
            LangChain can act as an MCP client, discovering and invoking tools exposed by any MCP server at runtime instead of hardcoding a
            tool list in your agent code. This means a single MCP server — say, a PostgreSQL connector — becomes usable by a LangChain agent,
            a CrewAI agent, and Claude Desktop simultaneously, without writing three separate integrations. In practice: build the tool
            connection once as an MCP server, then let whichever orchestration framework you choose discover it dynamically.
          </p>
        </section>

        <FAQ items={faqs} title="MCP vs LangChain: FAQs" subtitle="Common questions when choosing between the two." />

        <section className="mt-4 grid gap-6 sm:grid-cols-2">
          <Link href="/mcp-agent" className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-black text-white group-hover:text-cyan-200">MCP for AI Agents</h3>
            </div>
            <p className="text-xs text-white/55">Architecture patterns for connecting agent frameworks to MCP servers.</p>
          </Link>
          <Link href="/docs/advanced/multi-agent-orchestration" className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-black text-white group-hover:text-cyan-200">Multi-Agent Orchestration</h3>
            </div>
            <p className="text-xs text-white/55">Supervisor patterns for coordinating multiple MCP-backed agents.</p>
          </Link>
        </section>

        <div className="mt-12">
          <Link href="/learn" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors">
            <BookOpen className="h-3.5 w-3.5" /> Back to MCP Knowledge Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
