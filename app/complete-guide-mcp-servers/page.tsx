import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getFAQSchema, getUnifiedGraphSchema } from "../../src/lib/schema";
import { clusters } from "../../src/data/blogPosts";
import CommentSystem from "../../src/components/ugc/CommentSystem";
import VotingWidget from "../../src/components/ugc/VotingWidget";
import UserSubmissionForm from "../../src/components/ugc/UserSubmissionForm";

export const metadata: Metadata = {
  title: "The Complete Guide to MCP Servers in 2025-2026 | MCPserver.in",
  description:
    "Everything you need to know about Model Context Protocol: architecture, security, production deployment, platform support, integrations, and where MCP is headed in 2026. The pillar guide for every MCP server cluster on this site.",
  alternates: {
    canonical: "/complete-guide-mcp-servers",
    languages: {
    "en-IN": "/complete-guide-mcp-servers",
    "en": "/complete-guide-mcp-servers",
  },
  },
};

const tocSections = [
  { id: "what-is-mcp", label: "What is Model Context Protocol?" },
  { id: "mcp-vs-apis", label: "MCP vs Traditional APIs" },
  { id: "architecture", label: "MCP Server Architecture Explained" },
  { id: "getting-started", label: "Getting Started with MCP" },
  { id: "security", label: "MCP Security Considerations" },
  { id: "production", label: "Production Deployment Strategies" },
  { id: "platforms", label: "MCP Platform Support" },
  { id: "integrations", label: "Popular MCP Integrations" },
  { id: "community", label: "MCP Community Resources" },
  { id: "future", label: "Future of MCP: 2026 Predictions" },
];

const faqs = [
  {
    question: "What is Model Context Protocol (MCP) in one sentence?",
    answer:
      "MCP is an open protocol, originally released by Anthropic, that standardizes how AI applications discover and call external tools, read resources, and use prompts — replacing one-off API integrations with a single client-server interface every MCP-compatible model can speak.",
  },
  {
    question: "Do I need MCP if I already have a REST API?",
    answer:
      "Your REST API doesn't go away. An MCP server sits above it, translating your existing endpoints into tools an LLM can discover and call safely, with schema validation and structured error handling built in.",
  },
  {
    question: "Which transport should I use: stdio, SSE, or Streamable HTTP?",
    answer:
      "Use stdio for local development and desktop clients like Claude Desktop. Use SSE or Streamable HTTP once your server needs to run remotely, serve multiple clients, or sit behind OAuth.",
  },
  {
    question: "Is MCP secure enough for production and enterprise use?",
    answer:
      "It can be, but security isn't automatic. OAuth-based auth, least-privilege tool scoping, input validation, and containerized deployment are all things you add — see our security cluster for the full hardening checklist.",
  },
  {
    question: "What's the fastest way to get a working MCP server today?",
    answer:
      "Install the official Python or TypeScript SDK, define one or two tools with clear input schemas, run it over stdio, and connect it to Claude Desktop. Our Getting Started cluster walks through this in under 30 minutes.",
  },
];

export default function CompleteGuidePage() {
  const unifiedSchema = getUnifiedGraphSchema({
    pageUrl: "/complete-guide-mcp-servers",
    title: "The Complete Guide to MCP Servers in 2025-2026",
    description:
      "Everything you need to know about Model Context Protocol: architecture, security, production deployment, platform support, integrations, and where MCP is headed in 2026.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "The Complete Guide to MCP Servers", item: "/complete-guide-mcp-servers" },
    ],
    faq: faqs,
    article: {
      title: "The Complete Guide to MCP Servers in 2025-2026",
      description:
        "The pillar guide tying together every cluster on this blog — architecture, security, deployment, platforms, integrations, and where MCP is headed next.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: "2026-07-20",
      dateModified: "2026-07-20",
    },
  });
  const faqSchema = getFAQSchema(faqs);

  return (
    <div id="complete-guide-mcp-servers" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <SchemaJsonLd schema={faqSchema} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "The Complete Guide to MCP Servers", href: "/complete-guide-mcp-servers" }]} />

        {/* Hero */}
        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200">
            <BookOpen className="h-3.5 w-3.5" />
            Pillar Guide · 2025-2026
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            The Complete Guide to MCP Servers in 2025-2026
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Model Context Protocol (MCP) is the open standard that lets AI agents discover and call external tools instead of relying on one-off integrations. This guide is the hub for everything on this site — what MCP is, how it differs from a REST API, how to build and secure a server, where to deploy it, and what's coming in 2026. Every section links out to the deep-dive cluster that covers it in full.
          </p>
        </section>

        {/* Table of contents */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white/50">
            <Compass className="h-3.5 w-3.5" />
            On this page
          </div>
          <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {tocSections.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="text-sm text-white/65 hover:text-cyan-300">
                {i + 1}. {s.label}
              </a>
            ))}
          </div>
        </section>

        {/* Cluster grid */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-white">Explore the 7 Content Clusters</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/58">
            This pillar links out to every cluster below. Each one is a self-contained deep dive with its own set of posts.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {clusters.map((cluster) => (
              <Link
                key={cluster.slug}
                href={`/blog/cluster/${cluster.slug}`}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-cyan-300/30"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white group-hover:text-cyan-200">{cluster.title}</h3>
                  <span className="text-[11px] font-bold text-white/40">{cluster.postCount} posts</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">{cluster.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 1. What is MCP */}
        <section id="what-is-mcp" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">1. What is Model Context Protocol?</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Model Context Protocol is an open standard for connecting AI applications to external systems. Instead of every team writing custom glue code so an LLM can query a database, search a ticketing system, or send a Slack message, MCP defines one client-server interface that any compatible model can speak. A client — Claude Desktop, an IDE, or your own agent runtime — connects to one or more MCP servers, each of which exposes a set of <strong>tools</strong> the model can call, <strong>resources</strong> it can read, and <strong>prompts</strong> it can use as starting points.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Under the hood, MCP is built on JSON-RPC 2.0. Every tool call, resource read, and response follows the same structured message format, which is what makes a server built by one team immediately usable by a client built by another. That interoperability is the entire point: it turns integration work from an N×M problem (every model wired to every tool) into an N+M one (every model speaks MCP, every tool exposes an MCP server).
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            For a from-scratch walkthrough of the protocol itself — message formats, the initialization handshake, and how tool discovery works — start with our{" "}
            <Link href="/blog/model-context-protocol-beginner-guide" className="text-cyan-300">
              beginner's guide
            </Link>{" "}
            and the{" "}
            <Link href="/blog/how-mcp-servers-work" className="text-cyan-300">
              technical breakdown of how MCP servers work
            </Link>
            . If you want the shorter conceptual primer first, see{" "}
            <Link href="/what-is-mcp" className="text-cyan-300">
              What is MCP?
            </Link>
            .
          </p>
        </section>

        {/* 2. MCP vs APIs */}
        <section id="mcp-vs-apis" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">2. MCP vs Traditional APIs</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            MCP doesn't replace REST or GraphQL — it sits above them. A traditional API is a human-designed, resource-oriented interface: you read the docs, figure out the right endpoint, and hardcode the call. MCP is model-oriented: the server describes its tools in a schema the model reads at runtime and decides, dynamically, which one to call and with what arguments.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-white/50">
                <tr>
                  <th className="px-4 py-3 font-bold">Traditional API</th>
                  <th className="px-4 py-3 font-bold">MCP Server</th>
                </tr>
              </thead>
              <tbody className="text-white/65">
                <tr className="border-t border-white/8">
                  <td className="px-4 py-3">Human reads docs, writes integration code</td>
                  <td className="px-4 py-3">Model reads tool schema, calls it directly</td>
                </tr>
                <tr className="border-t border-white/8">
                  <td className="px-4 py-3">Request/response, client manages all state</td>
                  <td className="px-4 py-3">Server can hold context and drive multi-step tool calls</td>
                </tr>
                <tr className="border-t border-white/8">
                  <td className="px-4 py-3">One integration per consumer</td>
                  <td className="px-4 py-3">One server, usable by any MCP client</td>
                </tr>
                <tr className="border-t border-white/8">
                  <td className="px-4 py-3">Auth is whatever the API defines</td>
                  <td className="px-4 py-3">Standardized OAuth flows across the spec</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            For the full comparison, including when you genuinely still want a plain REST endpoint instead, read{" "}
            <Link href="/blog/mcp-server-vs-api-difference" className="text-cyan-300">
              MCP Server vs API: What's the Real Difference?
            </Link>
            .
          </p>
        </section>

        {/* 3. Architecture */}
        <section id="architecture" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">3. MCP Server Architecture Explained</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            An MCP server has three building blocks. <strong>Tools</strong> are functions the model can call — each with a name, a description written for the model (not a human), and a JSON Schema input definition. <strong>Resources</strong> are read-only data the server exposes, addressed by URI, that the model can pull into context on demand instead of receiving it all up front. <strong>Prompts</strong> are reusable, parameterized starting points a client can surface to the user.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Communication runs over JSON-RPC across one of several transports: <strong>stdio</strong> for local process communication (the default for desktop clients), <strong>SSE</strong> for server-to-client streaming over HTTP, and <strong>Streamable HTTP</strong> for full bidirectional remote servers. Picking the right one is mostly a question of where the server runs — see our{" "}
            <Link href="/blog/mcp-transport-methods" className="text-cyan-300">
              transport methods comparison
            </Link>
            .
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            For the exact message shapes exchanged during initialization, tool listing, and tool calls, read the{" "}
            <Link href="/blog/mcp-json-rpc-deep-dive" className="text-cyan-300">
              JSON-RPC deep dive
            </Link>
            , and for the architectural patterns that hold up once a server sees real traffic — coarse-grained tools, cursor pagination, confirmation gates before destructive actions — see{" "}
            <Link href="/blog/mcp-server-architecture-patterns" className="text-cyan-300">
              MCP Server Architecture Patterns Explained
            </Link>
            .
          </p>
        </section>

        {/* 4. Getting Started */}
        <section id="getting-started" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">4. Getting Started with MCP</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            The fastest path to a working server: install the official SDK for your language, define one tool with a clear input schema, run it over stdio, and point Claude Desktop (or another MCP client) at it. Most people have a working "hello world" server in under 30 minutes.
          </p>
          <ol className="mt-4 space-y-2 text-base leading-relaxed text-white/65">
            <li>1. Install the Python or TypeScript SDK.</li>
            <li>2. Define a tool with a name, description, and JSON Schema input.</li>
            <li>
              3. <Link href="/blog/install-configure-first-mcp-server" className="text-cyan-300">Configure the server</Link> and run it locally over stdio.
            </li>
            <li>
              4. <Link href="/blog/connect-claude-to-mcp-server" className="text-cyan-300">Connect it to Claude Desktop</Link> and test a tool call end-to-end.
            </li>
          </ol>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            The full{" "}
            <Link href="/blog/cluster/getting-started" className="text-cyan-300">
              Getting Started cluster
            </Link>{" "}
            covers SDKs, CLI tooling, configuration file reference, and where to find community tutorials and support.
          </p>
        </section>

        {/* 5. Security */}
        <section id="security" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">5. MCP Security Considerations</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Security is not automatic just because you're using a standard protocol. The most common gaps: no authentication at all on a server exposed beyond localhost, tools scoped with broader permissions than the task needs, and no confirmation step before a tool executes something irreversible — a delete, a refund, a production deploy.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Start with{" "}
            <Link href="/blog/mcp-authentication-methods-comparison" className="text-cyan-300">
              comparing authentication methods
            </Link>{" "}
            (OAuth 2.0 is the standardized answer for anything remote), scope every tool to least privilege, and run through the{" "}
            <Link href="/blog/mcp-server-security-checklist" className="text-cyan-300">
              security hardening checklist
            </Link>{" "}
            before anything goes to production. If you're assessing risk for an enterprise deployment, the{" "}
            <Link href="/blog/mcp-threat-model" className="text-cyan-300">
              MCP threat model
            </Link>{" "}
            breaks down what attackers actually look for.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            The full{" "}
            <Link href="/blog/cluster/security-production" className="text-cyan-300">
              Security & Production cluster
            </Link>{" "}
            covers CVE analysis, RBAC, compliance (GDPR, SOC 2), and governance frameworks for enterprise teams.
          </p>
        </section>

        {/* 6. Production */}
        <section id="production" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">6. Production Deployment Strategies</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Moving from a local stdio server to production means answering a different set of questions: how do you deploy without downtime, how do you know if it's healthy, and how do you debug a tool call that failed three hops into an agent's reasoning chain. Work through the{" "}
            <Link href="/blog/mcp-server-production-deployment-checklist" className="text-cyan-300">
              production deployment checklist
            </Link>{" "}
            before your first real launch, wire up a{" "}
            <Link href="/blog/mcp-server-ci-cd-with-github-actions" className="text-cyan-300">
              CI/CD pipeline
            </Link>{" "}
            so schema changes go through review, and set up{" "}
            <Link href="/blog/mcp-server-monitoring-setup" className="text-cyan-300">
              monitoring and observability
            </Link>{" "}
            from day one rather than after the first incident.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            If you're containerizing, the{" "}
            <Link href="/blog/mcp-server-docker-containerization" className="text-cyan-300">
              Docker
            </Link>{" "}
            and{" "}
            <Link href="/blog/mcp-server-kubernetes-deployment" className="text-cyan-300">
              Kubernetes
            </Link>{" "}
            guides cover the deployment patterns teams actually use in production, not just a bare-minimum Dockerfile.
          </p>
        </section>

        {/* 7. Platforms */}
        <section id="platforms" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">7. MCP Platform Support</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            MCP servers run on every major cloud and can be reached from every major MCP-compatible client. On the cloud side, see dedicated guides for{" "}
            <Link href="/blog/mcp-server-on-aws" className="text-cyan-300">AWS</Link>,{" "}
            <Link href="/blog/azure-mcp-server-functions-app-service" className="text-cyan-300">Azure</Link>, and{" "}
            <Link href="/blog/mcp-server-on-gcp" className="text-cyan-300">GCP</Link>, or the{" "}
            <Link href="/blog/mcp-cloud-deployment-comparison" className="text-cyan-300">
              side-by-side cloud comparison
            </Link>{" "}
            if you're still choosing.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            On the client side, Claude Desktop, Cursor, VS Code, and a growing list of IDEs and agent runtimes all speak MCP natively. The full{" "}
            <Link href="/blog/cluster/platform-specific" className="text-cyan-300">
              Platform Specific cluster
            </Link>{" "}
            covers operating-system setup, container orchestration, and IDE-specific configuration in depth.
          </p>
        </section>

        {/* 8. Integrations */}
        <section id="integrations" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">8. Popular MCP Integrations</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            The most common first integrations are the tools teams already live in: <Link href="/blog/mcp-server-for-slack" className="text-cyan-300">Slack</Link>, <Link href="/blog/how-to-create-mcp-server-for-github" className="text-cyan-300">GitHub</Link>, <Link href="/blog/mcp-server-for-jira" className="text-cyan-300">Jira</Link>, and <Link href="/blog/mcp-server-for-google-sheets" className="text-cyan-300">Google Sheets</Link> for productivity; <Link href="/blog/mcp-server-for-salesforce" className="text-cyan-300">Salesforce</Link> and <Link href="/blog/mcp-server-for-hubspot" className="text-cyan-300">HubSpot</Link> for CRM; and <Link href="/blog/mcp-server-for-stripe" className="text-cyan-300">Stripe</Link> for payments.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Two full clusters cover this ground:{" "}
            <Link href="/blog/cluster/integrations-tools" className="text-cyan-300">
              Integrations & Tools
            </Link>{" "}
            for productivity, project management, and automation platforms, and{" "}
            <Link href="/blog/cluster/advanced-architecture" className="text-cyan-300">
              Advanced Architecture
            </Link>{" "}
            for e-commerce, CRM, customer support, and multi-server orchestration patterns.
          </p>
        </section>

        {/* 9. Community */}
        <section id="community" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">9. MCP Community Resources</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            MCP moves fast enough that the spec, SDKs, and best practices shift month to month — the community is where you catch that in real time. Start with our{" "}
            <Link href="/blog/mcp-community-forums" className="text-cyan-300">
              community forums
            </Link>{" "}
            guide, browse{" "}
            <Link href="/blog/mcp-github-repositories" className="text-cyan-300">
              notable GitHub repositories
            </Link>{" "}
            worth forking, or jump straight into the{" "}
            <Link href="/blog/cluster/ugc-community-hub" className="text-cyan-300">
              UGC Community Hub
            </Link>{" "}
            for user-submitted case studies, Q&A, code snippets, and the running list of debates the community hasn't settled yet.
          </p>
        </section>

        {/* 10. Future */}
        <section id="future" className="mt-14 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">10. Future of MCP: 2026 Predictions</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Three shifts are already visible heading into 2026: remote, OAuth-first servers are becoming the default over stdio-only setups; multi-agent systems that orchestrate several MCP servers at once are moving from experiment to production pattern; and the marketplace layer is consolidating as a few directories absorb listings from smaller ones.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            For where the spec itself is headed, see the{" "}
            <Link href="/blog/mcp-2026-roadmap" className="text-cyan-300">
              2026 roadmap
            </Link>
            . For the architecture pattern most teams are experimenting with next, read{" "}
            <Link href="/blog/mcp-multi-agent-systems" className="text-cyan-300">
              MCP Multi-Agent Systems: Architecture Guide
            </Link>
            .
          </p>
        </section>

        {/* UGC: Community poll */}
        <section className="mt-16 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">Which MCP Server Are You Building First?</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/58">
            A running poll from readers of this guide — vote for the category you're working on, or building next.
          </p>
          <div className="mt-6">
            <VotingWidget
              postId="pillar-complete-guide-mcp-servers"
              title="Which MCP server are you building first?"
              variant="poll"
              options={[
                { id: "database", label: "A database server (Postgres, MongoDB, Redis...)", votes: 61 },
                { id: "saas-tool", label: "A SaaS tool integration (Slack, Jira, HubSpot...)", votes: 84 },
                { id: "internal", label: "A custom internal tool for my team", votes: 47 },
                { id: "vector-db", label: "A vector database / RAG server", votes: 39 },
                { id: "payments", label: "A payments or e-commerce integration", votes: 22 },
              ]}
            />
          </div>
        </section>

        {/* UGC: Use case submissions */}
        <section className="mt-12">
          <h2 className="text-2xl font-black text-white">Share Your MCP Use Case</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/58">
            Building something with MCP? Tell the community what you built and what it solved — useful submissions get featured across the relevant cluster pages.
          </p>
          <div className="mt-6">
            <UserSubmissionForm
              postId="pillar-complete-guide-mcp-servers"
              title="Submit Your MCP Use Case"
              type="story"
            />
          </div>
        </section>

        {/* UGC: Ask the Community */}
        <section className="mt-12">
          <h2 className="text-2xl font-black text-white">Ask the Community</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/58">
            Questions about anything in this guide — architecture, security, deployment — go here.
          </p>
          <div className="mt-6">
            <CommentSystem postId="pillar-complete-guide-mcp-servers" />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 border-t border-white/6 pt-10">
          <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((q) => (
              <details key={q.question} className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 open:border-cyan-300/25">
                <summary className="cursor-pointer list-none text-base font-black text-white">{q.question}</summary>
                <p className="mt-4 text-sm leading-relaxed text-white/65">{q.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 to-violet-950/30 p-8 text-center">
          <h3 className="text-xl font-black text-white">Ready to go deeper?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/58">
            Browse all 250+ posts across every cluster, or find a production-ready MCP server in the directory.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-5 py-2.5 text-xs font-black text-white">
              <BookOpen className="h-4 w-4" />
              Browse All Posts
            </Link>
            <Link href="/mcp-server-directory" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-black text-white">
              Browse Servers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
