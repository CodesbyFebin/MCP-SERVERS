"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "../src/components/Hero";
import ProductDemo from "../src/components/ProductDemo";
import ServerCard from "../src/components/ServerCard";
import FAQ from "../src/components/FAQ";
import PricingTable from "../src/components/PricingTable";
import { pillars } from "../src/data/pillars";
import { servers } from "../src/data/servers";
import { getFaqsForPage } from "../src/data/faqs";
import { categories } from "../src/data/categories";
import {
  Code,
  Layers,
  Cpu,
  GitBranch,
  Shield,
  Activity,
  ArrowRight,
  Database,
  ExternalLink,
  ChevronRight,
  Globe
} from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const popularServers = servers.filter(
    (s) =>
      s.slug === "github-mcp-server" ||
      s.slug === "postgres-mcp-server" ||
      s.slug === "slack-mcp-server" ||
      s.slug === "notion-mcp-server" ||
      s.slug === "google-drive-mcp-server" ||
      s.slug === "browser-automation-mcp-server" ||
      s.slug === "stripe-mcp-server" ||
      s.slug === "aws-mcp-server"
  );

  const homeFaqs = getFaqsForPage("what-is-mcp", "Model Context Protocol");

  return (
    <div id="homepage" className="min-h-screen bg-transparent text-[#e0e0e0] font-sans">
      
      {/* 1. Hero */}
      <Hero />

      {/* 2. Visual Platform Capabilities Highlights (Bento Grid) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white">
            Why Choose <span className="text-cyan-400">MCPserver</span>?
          </h2>
          <p className="text-xs sm:text-sm text-white/55 mt-2 max-w-xl mx-auto">
            The standard infrastructure layer for AI agent tooling and database context. Built for developers, loved by agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between backdrop-blur-sm group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/20">
                <Code className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-sans font-bold text-base text-white group-hover:text-cyan-400 transition-colors">Largest MCP Registry</h3>
              <p className="text-xs text-white/45 mt-2 leading-relaxed">
                Browse and integrate over 10,000+ official, open-source, and verified MCP connectors for filesystems, SQL, APIs, and SaaS.
              </p>
            </div>
            <Link href="/mcp-server-directory" className="mt-4 text-xs text-cyan-400 font-semibold inline-flex items-center gap-1 hover:underline">
              Browse Directory <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between backdrop-blur-sm group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-sans font-bold text-base text-white group-hover:text-purple-400 transition-colors">One API for Everything</h3>
              <p className="text-xs text-white/45 mt-2 leading-relaxed">
                Connect your AI clients once to our centralized gateway proxy to coordinate permissions and routing across dozens of active server nodes.
              </p>
            </div>
            <Link href="/mcp-gateway" className="mt-4 text-xs text-purple-400 font-semibold inline-flex items-center gap-1 hover:underline">
              Explore Gateway <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between backdrop-blur-sm group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-sans font-bold text-base text-white group-hover:text-cyan-400 transition-colors">Managed Edge Hosting</h3>
              <p className="text-xs text-white/45 mt-2 leading-relaxed">
                Deploy containerized remote servers directly on low-latency infrastructure in Bengaluru to achieve sub-50ms query rounds.
              </p>
            </div>
            <Link href="/mcp-server-hosting" className="mt-4 text-xs text-blue-400 font-semibold inline-flex items-center gap-1 hover:underline">
              Host Remote <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-pink-500/30 transition-all flex flex-col justify-between backdrop-blur-sm group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 border border-pink-500/20">
                <Shield className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="font-sans font-bold text-base text-white group-hover:text-pink-400 transition-colors">Enterprise Sandbox</h3>
              <p className="text-xs text-white/45 mt-2 leading-relaxed">
                Isolate file writing, shell executions, and private database edits with multi-stage authentication keys and live human-in-the-loop permission logs.
              </p>
            </div>
            <Link href="/mcp-security" className="mt-4 text-xs text-pink-400 font-semibold inline-flex items-center gap-1 hover:underline">
              Security Protocol <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between backdrop-blur-sm group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-sans font-bold text-base text-white group-hover:text-emerald-400 transition-colors">Interactive Playgrounds</h3>
              <p className="text-xs text-white/45 mt-2 leading-relaxed">
                Instantly audit your server schemas, invoke tools in our in-browser simulator, and monitor active JSON-RPC messages live.
              </p>
            </div>
            <Link href="/tools/mcp-playground" className="mt-4 text-xs text-emerald-400 font-semibold inline-flex items-center gap-1 hover:underline">
              Open Simulator <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all flex flex-col justify-between backdrop-blur-sm group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20">
                <Activity className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-sans font-bold text-base text-white group-hover:text-amber-400 transition-colors">Observability & Telemetry</h3>
              <p className="text-xs text-white/45 mt-2 leading-relaxed">
                Track client token consumption, view server query runtimes, search trace routes, and isolate failing API gateways instantly.
              </p>
            </div>
            <Link href="/docs" className="mt-4 text-xs text-amber-400 font-semibold inline-flex items-center gap-1 hover:underline">
              View Analytics Docs <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. Discover: 10 Pillar Hubs Navigation Panel */}
      <section className="py-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white">
              Model Context Protocol Knowledge Hubs
            </h2>
            <p className="text-xs text-white/50 mt-1">
              Select an educational pillar hub to access guides, integrations directory, hosting specs, and secure routing checklists.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                id={`pillar-hub-${pillar.slug}`}
                href={`/${pillar.slug}`}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all text-center group"
              >
                <h3 className="text-xs font-bold text-gray-200 group-hover:text-cyan-400 transition-colors truncate">
                  {pillar.title.replace(" (Model Context Protocol)", "")}
                </h3>
                <p className="text-[10px] text-white/40 mt-1 line-clamp-1">{pillar.subtitle}</p>
                <span className="text-[10px] text-cyan-500 font-semibold mt-3 inline-flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Hub <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular MCP Servers Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              Popular MCP Server Integrations
            </h2>
            <p className="text-xs text-white/50 mt-1">
              Expose secure, pre-configured connections directly to Claude Desktop, Cursor, or custom AI frameworks.
            </p>
          </div>
          <Link
            href="/mcp-server-directory"
            className="text-xs px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-450 hover:text-white font-semibold transition-all inline-flex items-center gap-1 shrink-0"
          >
            Browse All 100+ Guides
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServers.map((server) => (
            <ServerCard key={server.slug} server={server} />
          ))}
        </div>
      </section>

      {/* 5. How It Works - Interactive Product Demo (Code terminal & SSE) */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Connect to Anything. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Automate Everything.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-2 max-w-xl mx-auto">
              Our MCP servers run locally over standard I/O (Stdio) or execute as serverless SSE web endpoints inside secure containers.
            </p>
          </div>

          <ProductDemo />
        </div>
      </section>

      {/* 6. Pricing Preview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white">
            Simple, Transparent, <span className="text-cyan-400">INR Pricing</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/50 mt-2 max-w-lg mx-auto">
            Zero-risk trial. Deploy local connectors for free forever, or unlock production-grade SSE hosting on our Mumbai/Bengaluru hubs.
          </p>
        </div>

        <PricingTable />
        
        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="text-xs text-cyan-400 font-semibold inline-flex items-center gap-1.5 hover:underline"
          >
            Compare complete plans matrix & SLA variables <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 7. Contextual FAQ */}
      <section className="py-12 bg-transparent border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ items={homeFaqs} />
        </div>
      </section>

      {/* 8. Final Conversion CTA Card */}
      <section className="py-12 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950/10 via-white/[0.02] to-purple-950/10 border border-white/5 text-center relative overflow-hidden backdrop-blur-sm">
            <h2 className="font-display font-bold text-2xl text-white">Launch Your First MCP Server in 60 Seconds</h2>
            <p className="mt-3 text-xs text-white/55 max-w-lg mx-auto">
              Register, configure your connection keys, and expose tools dynamically to Cursor, Windsurf, or custom internal Claude Agents.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-black shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-200"
              >
                Start Hosted Server (₹999/mo)
              </Link>
              <Link
                href="/tools/mcp-playground"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all duration-200"
              >
                Test in Playground (Free)
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
