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
  HelpCircle, ArrowRight, Zap, Play, Globe, MessageSquare, Cloud,
  GitBranch, Boxes, Workflow, LockKeyhole, Server
} from "lucide-react";

export default function WhatIsMcpClient() {
  const { theme } = useTheme();
  const slug = "what-is-mcp";
  const title = "What Is MCP (Model Context Protocol)?";
  const subtitle = "The open standard for connecting AI models to data sources and tools securely.";
  const shortAnswer = "The Model Context Protocol (MCP) is an open-source standard created by Anthropic that allows Large Language Models (LLMs) to seamlessly connect to external systems, data sources, and developers' tools through a unified API. Instead of writing custom integration glue-code for every AI agent and API, MCP provides a standard client-server architecture.";
  const description = "Model Context Protocol solves the modern AI fragmentation problem. Today, building AI agents requires writing custom integrations for GitHub, Postgres, Slack, and other APIs. MCP replaces these custom connectors with a standardized client-server interface. AI clients (like Claude Desktop, Cursor, or ChatGPT) connect to MCP servers that expose tools, resources, and prompts in a structured, safe format.";

  const faqs = getFaqsForPage(slug);
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
      authorRole: "Lead Systems & Protocol Architect, MCPserver India",
      datePublished: "2025-11-05",
      dateModified: "2026-07-20"
    }
  });

  const isDark = theme === "dark";

  const relatedTopics = topics.filter(t => t.pillar === "what-is-mcp");

  const featuredServerSlugs = [
    "github-mcp-server",
    "postgres-mcp-server",
    "docker-mcp-server",
    "slack-mcp-server",
    "aws-mcp-server",
    "puppeteer-mcp-server"
  ];
  const supportedIntegrations = servers.filter(s => featuredServerSlugs.includes(s.slug));

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
      <SchemaJsonLd schema={unifiedGraphSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* 2. Core Explanation - EXPANDED */}
            <section id="how-it-works" className="space-y-6">
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
                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>3. Execution</h4>
                    <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      Servers run locally or remotely and pipe output safely back to models.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <div className="space-y-6">
                <h3 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  The Protocol Layer for AI-Tool Interaction
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  At its core, MCP is an open protocol that standardizes how applications provide context to language models. Think of it as the USB-C of AI integration: one universal port that replaces dozens of custom cables. Before MCP, every AI agent required bespoke connectors for every data source—GitHub needed one wrapper, Postgres another, Slack yet another. MCP eliminates this fragmentation by defining a single, consistent interface that any AI client can use to discover and invoke tools.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  The protocol operates over JSON-RPC 2.0, using either stdio (for local subprocess communication) or Server-Sent Events (SSE) for remote HTTP connections. This dual-transport design means MCP works equally well for a developer running Claude Desktop on a laptop and an enterprise deploying AI agents across Kubernetes clusters. The client initiates a handshake, the server advertises its capabilities—tools, resources, and prompts—and the LLM decides what to invoke based on user intent.
                </p>

                <div className={`p-6 rounded-2xl border ${isDark ? "bg-cyan-950/10 border-cyan-900/20" : "bg-cyan-50 border-cyan-100"}`}>
                  <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-cyan-300" : "text-cyan-900"}`}>
                    Why MCP Matters: The Numbers
                  </h4>
                  <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span><strong>300K+ stars</strong> across the MCP ecosystem (servers, clients, SDKs) as of 2026</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span><strong>7,260+ MCP servers</strong> published as of May 2025, with growth accelerating monthly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span><strong>Less integration code</strong> than maintaining custom REST wrappers per data source — the actual reduction depends on how many integrations you're consolidating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                       <span><strong>Low-latency handshakes</strong> are achievable with edge-deployed MCP servers in Mumbai and Bengaluru</span>
                    </li>
                  </ul>
                </div>

                <h3 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  MCP Architecture Deep Dive
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  MCP follows a client-host-server model. The <strong>host</strong> is the application that initiates connections (e.g., Claude Desktop, Cursor IDE). The <strong>client</strong> is the connection manager within the host that speaks the MCP protocol. The <strong>server</strong> is the external process that exposes tools, resources, and prompts. This separation of concerns is critical: the host manages user context and security consent, the client handles protocol negotiation, and the server focuses purely on domain logic.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  Servers expose three primitive types: <strong>Tools</strong> (executable functions the LLM can call), <strong>Resources</strong> (static or dynamic data context like files or database rows), and <strong>Prompts</strong> (pre-written templates the LLM can fill). This triad covers the full spectrum of AI-agent needs—doing, reading, and templating—without requiring protocol extensions.
                </p>

                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Tools</h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      Executable functions like &quot;create_issue&quot; or &quot;query_database&quot; that the LLM invokes with structured arguments.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-purple-400" />
                      <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Resources</h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      Context data exposed as URIs—files, database rows, API responses—that the LLM can read but not modify.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-pink-400" />
                      <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Prompts</h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      Pre-written templates that standardize recurring workflows, like &quot;review this PR&quot; or &quot;debug this error.&quot;
                    </p>
                  </div>
                </div>

                <h3 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  MCP vs. Traditional API Integration
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  The fundamental difference between MCP and traditional REST APIs is architectural intent. REST APIs are resource-based and human-oriented—designed for developers to fetch, create, update, and delete records. MCP is task-based and AI-oriented—designed for LLMs to complete workflows with context, validation, and guardrails built in.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  Consider a developer connecting an AI agent to GitHub. With REST, they write custom code for authentication, pagination, error handling, and response parsing—then repeat for every endpoint. With MCP, they install one server that exposes &quot;create_issue,&quot; &quot;list_pull_requests,&quot; and &quot;merge_pr&quot; as tools. The LLM discovers these automatically, the client enforces security consent, and the server handles the REST calls internally. The result is not just less code—it is a fundamentally safer, more maintainable integration pattern.
                </p>

                <h3 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Real-World Use Cases
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  MCP is already powering production workflows across development, analytics, design, and enterprise operations. At MCPserver.in, we see the highest adoption in four categories:
                </p>
                <div className="space-y-4">
                  <div className={`p-5 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200"}`}>
                    <h4 className={`text-sm font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      Developer Toolchains
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-slate-500"}`}>
                      GitHub MCP (100+ tools), GitLab MCP, and Docker MCP are among the most deployed servers. Developers use them to automate code reviews, CI/CD pipelines, and container management directly from their IDE. The GitHub MCP server alone has seen explosive growth, with thousands of weekly installations via Smithery and npm.
                    </p>
                  </div>
                  <div className={`p-5 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200"}`}>
                    <h4 className={`text-sm font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      Database & Analytics
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-slate-500"}`}>
                      Power BI MCP, MongoDB MCP, and Postgres MCP servers let AI agents query databases using natural language. Instead of writing SQL, a business analyst can ask, &quot;Show me last quarter&apos;s revenue by region&quot; and the MCP server translates that into a parameterized query. This democratizes data access while maintaining row-level security.
                    </p>
                  </div>
                  <div className={`p-5 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200"}`}>
                    <h4 className={`text-sm font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      Enterprise Integration
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-slate-500"}`}>
                      ServiceNow, Salesforce, and SAP MCP servers bring AI agents into enterprise workflows. ServiceNow&apos;s Zurich release introduced a native MCP Server Console, allowing admins to publish tools for incident management, change requests, and service catalog access. These servers use OAuth 2.0 and mTLS to satisfy corporate security requirements.
                    </p>
                  </div>
                  <div className={`p-5 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200"}`}>
                    <h4 className={`text-sm font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      Browser Automation & Testing
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-slate-500"}`}>
                      Playwright MCP and Puppeteer MCP enable AI agents to control browsers for testing, scraping, and workflow automation. QA teams use these to generate test cases from natural language requirements, while data teams use them for structured web extraction without maintaining brittle selectors.
                    </p>
                  </div>
                </div>

                <h3 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Security & Compliance Considerations
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  MCP&apos;s security model is built on user consent and least privilege. Before any tool executes a write operation—creating a GitHub issue, sending a Slack message, updating a database record—the client prompts the user for approval. This human-in-the-loop pattern prevents runaway agents from causing damage. For remote servers, MCP supports OAuth 2.0, mTLS, and API key authentication, ensuring that only authorized clients can invoke tools.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  In India, MCP deployments must also satisfy DPDP Act requirements for data localization, consent management, and breach notification. MCPserver.in&apos;s platform is designed from the ground up to meet these requirements, with data residency in Mumbai, Bengaluru, and Hyderabad, granular consent hooks for every tool invocation, and 72-hour breach notification protocols. For regulated industries like fintech and healthcare, this built-in compliance is a decisive advantage over self-hosted MCP implementations.
                </p>

                <h3 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Getting Started with MCP
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  Starting with MCP requires three steps: choose a client, install a server, and connect them. Claude Desktop, Cursor IDE, and VS Code all support MCP natively. Servers can be installed via Smithery CLI (<code className={`px-1.5 py-0.5 rounded text-xs ${isDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-900"}`}>npx @smithery/cli install</code>), npm, or Docker. Once installed, the client automatically discovers the server&apos;s tools and prompts, and the LLM begins invoking them based on conversation context.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                   For teams that want managed infrastructure, MCPserver.in provides hosted MCP servers with automated deployment, HTTPS, scaling, and monitoring. Our India-first edge network keeps latency low for domestic users, while our compliance stack handles DPDP and RBI requirements out of the box. Whether you are a solo developer experimenting with AI agents or an enterprise rolling out platform-wide automation, MCP provides the standardized, secure foundation that modern AI integration demands.
                </p>
              </div>
            </section>

            {/* Community Section */}
            <section id="community" className="space-y-6">
              <h2 className={`text-2xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                Join the MCP Community
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                Connect with other MCP builders, share code snippets, ask questions, and vote on best practices. Our community is growing rapidly—join the conversation and help shape the future of AI-tool integration.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/community" className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-5 py-2.5 text-xs font-black text-black">
                  Visit Community <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/learn" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-black text-white">
                  Browse Guides <BookOpen className="h-4 w-4" />
                </Link>
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
              updatedDate="2026-07-20"
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
                   Low-latency handshakes
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Secure isolated Sandbox
                </li>
                <li className="flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-cyan-400" />
                  Mumbai & Bengaluru edge
                </li>
                <li className="flex items-center gap-1.5">
                  <LockKeyhole className="w-3.5 h-3.5 text-cyan-400" />
                  DPDP & RBI compliant
                </li>
              </ul>
            </div>

            <div className={`p-5 rounded-2xl border ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"}`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-slate-400"}`}>
                Quick Links
              </h4>
              <ul className={`space-y-2 text-xs ${isDark ? "text-white/60" : "text-slate-600"}`}>
                <li><Link href="/topics/mcp-architecture" className="hover:text-cyan-400 transition-colors">MCP Architecture Guide</Link></li>
                <li><Link href="/topics/build-mcp-server" className="hover:text-cyan-400 transition-colors">Build Your First Server</Link></li>
                <li><Link href="/topics/mcp-security-best-practices" className="hover:text-cyan-400 transition-colors">Security Best Practices</Link></li>
                 <li><Link href="/mcp-server-directory" className="hover:text-cyan-400 transition-colors">Browse MCP Servers</Link></li>
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
