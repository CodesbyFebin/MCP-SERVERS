"use client";

import Link from "next/link";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { pillars } from "../../src/data/pillars";
import { topics } from "../../src/data/topics";
import { servers } from "../../src/data/servers";
import { glossaryTerms } from "../../src/data/glossary";
import { comparisons } from "../../src/data/comparisons";
import { docsPages, getDocsPath } from "../../src/data/docs";
import {
  BookOpen,
  Compass,
  Cpu,
  Layers,
  FileText,
  Workflow,
  HelpCircle,
  Shield,
  Briefcase
} from "lucide-react";

export default function SitemapPage() {
  const breadcrumbs = [{ name: "HTML Sitemap", href: "/sitemap" }];
  const docsServerPages = docsPages.filter((page) => page.category === "servers" && page.slug.length > 1);
  const docsKnowledgePages = docsPages.filter((page) => page.category !== "servers" || page.slug.join("/") === "servers");

  return (
    <div id="html-sitemap-page" className="min-h-screen bg-transparent text-[#e0e0e0] font-sans pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Header */}
        <div className="py-10 text-center relative max-w-3xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950/40 border border-cyan-800 text-cyan-400">
            System Index & Node Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tighter mt-4">
            MCPserver India <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">HTML Sitemap</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
            Exhaustive index directory of the Model Context Protocol ecosystem, containing core pillars, protocol topics, technical comparisons, verified server integrations, and developer diagnostic utilities.
          </p>
        </div>

        {/* Grid of Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Section 1: Core Pillars */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              10 Core Protocol Pillars
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              In-depth structural guides covering the foundational aspects of the Model Context Protocol ecosystem.
            </p>
            <ul className="space-y-2.5 pt-1">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium hover:underline block"
                  >
                    Examine {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Technical Topics */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Compass className="w-5 h-5 text-purple-400" />
              50 Protocol Topics
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Deep dive articles detailing transport methods, message formats, client-server bindings, and monitoring guidelines.
            </p>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <ul className="space-y-2.5">
                {topics.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/topics/${t.slug}`}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium hover:underline block"
                    >
                      Read about {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Verified Integrations */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Workflow className="w-5 h-5 text-emerald-400" />
              Verified Server Integrations
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Deployable connectors bridging large language models to external tools, SaaS systems, databases, and standard transports.
            </p>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <ul className="space-y-2.5">
                {servers.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servers/${s.slug}`}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-medium hover:underline block"
                    >
                      Deploy {s.name} integration
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3b: Docs Server Integration Guides */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              105 Docs Server Guides
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Documentation-facing server pages with setup, authentication, security, example config, FAQs, and related integrations.
            </p>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <ul className="space-y-2.5">
                {docsServerPages.map((doc) => (
                  <li key={doc.cluster}>
                    <Link
                      href={getDocsPath(doc)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium hover:underline block"
                    >
                      Read {doc.title} docs
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3c: Docs Knowledge Base */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              Documentation Knowledge Base
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              India-first guides for setup, protocol, pricing, performance, compliance, comparisons, deployment, industry, and monitoring.
            </p>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <ul className="space-y-2.5">
                {docsKnowledgePages.map((doc) => (
                  <li key={doc.cluster}>
                    <Link
                      href={getDocsPath(doc)}
                      className="text-xs text-sky-400 hover:text-sky-300 font-medium hover:underline block"
                    >
                      Open {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: Industry Glossary */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <BookOpen className="w-5 h-5 text-yellow-400" />
              Industry Glossary
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Unified directory explaining specialized definitions for transports, architectures, and standard definitions.
            </p>
            <div className="max-h-[260px] overflow-y-auto pr-2 space-y-2 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/glossary"
                    className="text-xs text-yellow-400 hover:text-yellow-300 font-bold hover:underline block"
                  >
                    View Complete Glossary Catalog Index
                  </Link>
                </li>
                {glossaryTerms.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/glossary/${g.slug}`}
                      className="text-xs text-gray-300 hover:text-yellow-400 font-medium hover:underline block"
                    >
                      Define {g.term}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: Comparisons */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Cpu className="w-5 h-5 text-pink-400" />
              Technical Comparisons
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Exhaustive technical analyses comparing the Model Context Protocol to traditional protocols, webhooks, and tools.
            </p>
            <ul className="space-y-2.5 pt-1">
              {comparisons.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="text-xs text-pink-400 hover:text-pink-300 font-medium hover:underline block"
                  >
                    Compare MCP vs {c.vs}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Utilities & Diagnostics */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Utilities & Diagnostics
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              In-browser diagnostic playgrounds, endpoint conformance checkers, real-time status indices, and managed cloud status grids.
            </p>
            <ul className="space-y-2.5 pt-1">
              <li>
                <Link
                  href="/tools/mcp-playground"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline block"
                >
                  Test nodes in In-Browser Playground
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/mcp-server-checker"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline block"
                >
                  Diagnose connection on Server Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/mcp-schema-viewer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline block"
                >
                  Browse specs with Schema Viewer
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/mcp-config-validator"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline block"
                >
                  Audit configuration with Config Validator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/mcp-endpoint-tester"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline block"
                >
                  Check SSE bindings on Endpoint Tester
                </Link>
              </li>
              <li>
                <Link
                  href="/mcp-monitoring"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline block"
                >
                  Enable Managed Live Monitoring
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline block"
                >
                  Track latency on Active Server Status Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 7: General & Legal */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Shield className="w-5 h-5 text-gray-400" />
              General & Legal Documentation
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Standard corporate details, pricing plans, privacy policies, terms of service agreements, and security mandates.
            </p>
            <ul className="space-y-2.5 pt-1">
              <li>
                <Link
                  href="/pricing"
                  className="text-xs text-gray-300 hover:text-cyan-400 font-medium hover:underline block"
                >
                  Examine Hosting Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-xs text-gray-300 hover:text-cyan-400 font-medium hover:underline block"
                >
                  Explore Documentation Center
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-xs text-gray-300 hover:text-cyan-400 font-medium hover:underline block"
                >
                  Review Security Mandates
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-xs text-gray-300 hover:text-cyan-400 font-medium hover:underline block"
                >
                  Discover About MCPserver Technologies
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs text-gray-300 hover:text-cyan-400 font-medium hover:underline block"
                >
                  Contact Technical Support Team
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-xs text-gray-300 hover:text-cyan-400 font-medium hover:underline block"
                >
                  Review Privacy Policy Agreement
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs text-gray-300 hover:text-cyan-400 font-medium hover:underline block"
                >
                  Examine Terms of Service Agreement
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 8: Developer Account */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Briefcase className="w-5 h-5 text-rose-400" />
              Developer Hub & Credentials
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Manage cloud infrastructure, authenticate client tunnels, configure database secrets, and view execution audits.
            </p>
            <ul className="space-y-2.5 pt-1">
              <li>
                <Link
                  href="/profile"
                  className="text-xs text-rose-400 hover:text-rose-300 font-medium hover:underline block"
                >
                  Manage Profile & Deployments
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-xs text-rose-400 hover:text-rose-300 font-medium hover:underline block"
                >
                  Authenticate Developer Account
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-xs text-rose-400 hover:text-rose-300 font-medium hover:underline block"
                >
                  Register New Developer Account
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
