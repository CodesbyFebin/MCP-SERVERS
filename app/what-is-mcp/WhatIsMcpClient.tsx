"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../../src/components/ThemeAndAuthProvider";
import { topics } from "../../src/data/topics";
import { servers } from "../../src/data/servers";
import { getFaqsForPage } from "../../src/data/faqs";
import { getRelatedLinks } from "../../src/lib/internalLinks";
import { getUnifiedGraphSchema } from "../../src/lib/schema";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import FAQ from "../../src/components/FAQ";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import AnswerBox from "../../src/components/AnswerBox";
import AuthorBox from "../../src/components/AuthorBox";
import { 
  BookOpen, Layers, ShieldCheck, Terminal, Database, Cpu, 
  HelpCircle, ArrowRight, Zap, Play, Globe, MessageSquare, Cloud
} from "lucide-react";

export default function WhatIsMcpClient() {
  const { theme } = useTheme();
  const slug = "what-is-mcp";
  const title = "What Is MCP (Model Context Protocol)?";
  const subtitle = "The open standard for connecting AI models to data sources and tools securely.";
  const shortAnswer = "The Model Context Protocol (MCP) is an open-source standard created by Anthropic that allows Large Language Models (LLMs) to seamlessly connect to external systems, data sources, and developers' tools through a unified API. Instead of writing custom integration glue-code for every AI agent and API, MCP provides a standard client-server architecture.";
  const description = "Model Context Protocol solves the modern AI fragmentation problem. Today, building AI agents requires writing custom integrations for GitHub, Postgres, Slack, and other APIs. MCP replaces these custom connectors with a standardized client-server interface. AI clients (like Claude Desktop, Cursor, or ChatGPT) connect to MCP servers that expose tools, resources, and prompts in a structured, safe format.";

  const faqs = getFaqsForPage(slug, title);
  const relatedLinks = getRelatedLinks(slug, "pillar");

  const breadcrumbSteps = [{ name: "What Is MCP?", href: `/${slug}` }];
  
  const unifiedGraphSchema = getUnifiedGraphSchema({
    pageUrl: `/${slug}`,
    title: `${title} - Model Context Protocol Hub`,
    description: shortAnswer,
    breadcrumbs: breadcrumbSteps.map(step => ({ name: step.name, item: step.href })),
    faq: faqs,
    article: {
      title: title,
      description: shortAnswer,
      authorName: "Dr. Devashish Sen",
      authorRole: "Lead Systems & Protocol Architect",
      datePublished: "2025-11-05",
      dateModified: "2026-07-13"
    }
  });

  const isDark = theme === "dark";

  // Filter topics relevant to what-is-mcp
  const relatedTopics = topics.filter(t => t.pillar === "what-is-mcp");

  // Select 6 prominent servers representing different categories
  const featuredServerSlugs = [
    "github-mcp-server",
    "postgres-mcp-server",
    "docker-mcp-server",
    "slack-mcp-server",
    "aws-mcp-server",
    "puppeteer-mcp-server"
  ];
  const supportedIntegrations = servers.filter(s => featuredServerSlugs.includes(s.slug));

  // Helper to map category/slug to lucide icons
  const getServerIcon = (serverSlug: string) => {
    switch (serverSlug) {
      case "github-mcp-server":
        return <Terminal className="w-5 h-5 text-purple-400" />;
      case "postgres-mcp-server":
        return <Database className="w-5 h-5 text-blue-400" />;
      case "docker-mcp-server":
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case "slack-mcp-server":
        return <MessageSquare className="w-5 h-5 text-pink-400" />;
      case "aws-mcp-server":
        return <Cloud className="w-5 h-5 text-amber-400" />;
      case "puppeteer-mcp-server":
        return <Globe className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className={`min-h-screen py-6 pb-16 transition-colors duration-200 ${
      isDark ? "bg-[#050508] text-white" : "bg-slate-50 text-slate-800"
    }`}>
      {/* Unified JSON-LD Connected Graph Schema */}
      <SchemaJsonLd schema={unifiedGraphSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Hero Section */}
        <div className={`py-10 border-b ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${
            isDark 
              ? "bg-cyan-950/20 text-cyan-400 border-cyan-900/30" 
              : "bg-cyan-50 text-cyan-700 border-cyan-100"
          }`}>
            <BookOpen className="w-3.5 h-3.5" />
            MCP Pillar Resource Hub
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            {title}
          </h1>
          <p className={`mt-4 text-sm sm:text-base max-w-3xl leading-relaxed ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}>
            {subtitle}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Direct Answer (AEO / GEO optimized) */}
            <AnswerBox
              question={`What is the core meaning and value of Model Context Protocol?`}
              answer={shortAnswer}
              keyTakeaways={[
                "Sub-15ms connection latency inside India (Mumbai, Bengaluru edge regions)",
                "Standardized JSON-RPC 2.0 communication format",
                "Fully compatible with Claude Desktop, Cursor, and custom LLM routers",
                "Eliminates hardcoded custom translation codebases"
              ]}
            />

            {/* 2. Core Explanation */}
            <section id="how-it-works" className="space-y-4">
              <h2 className={`text-2xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                How Model Context Protocol Works
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                {description}
              </p>
              
              <div className={`p-6 rounded-2xl border ${
                isDark ? "bg-black/40 border-white/5" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>1. Client Discovery</h4>
                    <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      The AI client (IDE/Chatbot) discovers capabilities over standard handshakes.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>2. Security Consent</h4>
                    <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      Clients enforce user confirmation before triggering any write actions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>3. execution</h4>
                    <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      Servers run locally or remotely and pipe output safely back to models.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Topics Section */}
            <section id="related-topics" className="space-y-6">
              <h2 className={`text-2xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                Related Topics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTopics.map((topic) => (
                  <Link 
                    key={topic.slug}
                    href={`/topics/${topic.slug}/`}
                    className={`group block p-5 rounded-2xl border transition-all duration-300 ${
                      isDark 
                        ? "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                        : "bg-white border-slate-200 hover:border-cyan-500/40 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isDark ? "bg-cyan-950/40 text-cyan-400" : "bg-cyan-50 text-cyan-700"
                        }`}>
                          {topic.intent}
                        </span>
                        <h3 className={`text-sm font-semibold leading-tight group-hover:text-cyan-400 transition-colors ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}>
                          {topic.title}
                        </h3>
                        <p className={`text-xs line-clamp-2 ${isDark ? "text-white/50" : "text-slate-500"}`}>
                          {topic.shortAnswer}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0 mt-1 ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Supported Integrations Section */}
            <section id="supported-integrations" className="space-y-6">
              <h2 className={`text-2xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                Supported Integrations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supportedIntegrations.map((server) => (
                  <Link 
                    key={server.slug}
                    href={`/servers/${server.slug}/`}
                    className={`group block p-5 rounded-2xl border transition-all duration-300 ${
                      isDark 
                        ? "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                        : "bg-white border-slate-200 hover:border-cyan-500/40 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-xl border shrink-0 ${
                        isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
                      }`}>
                        {getServerIcon(server.slug)}
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm font-semibold truncate group-hover:text-cyan-400 transition-colors ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}>
                            {server.name}
                          </h3>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-400 transition-all shrink-0 ml-1" />
                        </div>
                        <span className={`inline-block text-[10px] font-medium text-gray-400`}>
                          {server.category}
                        </span>
                        <p className={`text-xs line-clamp-2 mt-1 leading-relaxed ${isDark ? "text-white/50" : "text-slate-500"}`}>
                          {server.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Author Attribution */}
            <AuthorBox
              authorName="Dr. Devashish Sen"
              authorRole="Lead Systems & Protocol Architect, MCPserver India"
              publishedDate="2025-11-05"
              updatedDate="2026-07-13"
              citations={[
                { label: "Model Context Protocol Specification v1.0", url: "https://spec.modelcontextprotocol.io" },
                { label: "Anthropic MCP Core Specification GitHub Docs", url: "https://github.com/modelcontextprotocol" }
              ]}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 rounded-2xl border ${
              isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className={`font-display font-bold text-sm mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                Deploy Node Globally
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${isDark ? "text-white/55" : "text-slate-500"}`}>
                Deploy ultra-low latency Model Context Protocol nodes to Mumbai / Bengaluru edge clusters with zero DevOps management.
              </p>
              <Link
                href="/pricing/"
                className="block text-center w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-black rounded-lg shadow-md transition-all"
              >
                Start Managed Hosting
              </Link>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-slate-400"}`}>
                Platform Features
              </h4>
              <ul className={`space-y-2 text-xs ${isDark ? "text-white/60" : "text-slate-600"}`}>
                <li className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Sub-50ms handshakes
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Secure isolated Sandbox
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Contextual FAQ */}
        <div className={`mt-16 pt-8 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <FAQ items={faqs} title={`${title} - FAQs`} />
        </div>
      </div>
    </div>
  );
}
