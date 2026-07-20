import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Zap, Cloud, Server } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCP Production Deployment Guide - Step-by-Step",
  description: "Complete guide to deploying MCP servers in production. Covering hosting, security, monitoring, scaling, and compliance for enterprise MCP deployments.",
};

export default function McpProductionDeploymentPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.mcpserver.in";
  
  const unifiedGraphSchema = getUnifiedGraphSchema({
    pageUrl: "/learn/mcp-production-deployment",
    title: "MCP Production Deployment Guide - Step-by-Step",
    description: "Complete guide to deploying MCP servers in production. Covering hosting, security, monitoring, scaling, and compliance for enterprise MCP deployments.",
    breadcrumbs: [
      { name: "Learn", item: "/learn" },
      { name: "MCP Production Deployment", item: "/learn/mcp-production-deployment" }
    ],
    article: {
      title: "MCP Production Deployment Guide - Step-by-Step",
      description: "Complete guide to deploying MCP servers in production. Covering hosting, security, monitoring, scaling, and compliance for enterprise MCP deployments.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Infrastructure & Platform Team",
      datePublished: "2026-07-20",
      dateModified: "2026-07-20"
    }
  });

  const steps = [
    {
      step: "1",
      title: "Choose Your Hosting Model",
      description: "Select between local (stdio), remote (SSE), or containerized deployment based on your scale and security requirements.",
      details: [
        "Local stdio: Best for personal use, IDE integrations, and single-user scenarios. Zero network latency, but limited to one client.",
        "Remote SSE: Ideal for shared enterprise tools, multi-client access, and cloud-native deployments. Requires TLS 1.3 and authentication.",
        "Containerized: Docker or Kubernetes for reproducible deployments. Recommended for production with auto-scaling and health checks."
      ]
    },
    {
      step: "2",
      title: "Configure Authentication & Authorization",
      description: "Implement mTLS, OAuth 2.0, or API key authentication based on your threat model.",
      details: [
        "mTLS: Mutual TLS for service-to-service communication in zero-trust networks.",
        "OAuth 2.0 + PKCE: For user-facing applications requiring delegated access.",
        "API Keys: Simple but secure for machine-to-machine scenarios. Rotate keys every 90 days.",
        "Least privilege: Scope every tool to minimum necessary permissions. Separate read and write capabilities."
      ]
    },
    {
      step: "3",
      title: "Harden Security Posture",
      description: "Apply defense-in-depth security controls before exposing your MCP server.",
      details: [
        "Never expose MCP over public internet without mTLS or equivalent encryption.",
        "Containerize servers and run outside corporate/private networks to reduce blast radius.",
        "Replace .env files with runtime secret injection (Vault, AWS Secrets Manager, or Kubernetes Secrets).",
        "Validate and sanitize all inputs before they reach tool execution.",
        "Log every request, tool invocation, and significant action for audit trails."
      ]
    },
    {
      step: "4",
      title: "Set Up Monitoring & Observability",
      description: "Deploy monitoring, logging, and alerting to detect issues before users do.",
      details: [
        "Metrics: Track request latency, error rates, tool invocation counts, and connection pool utilization.",
        "Logs: Structured JSON logging with correlation IDs for tracing requests across services.",
        "Alerts: Page on-call for error rate spikes, latency degradation, or authentication failures.",
        "Dashboards: Grafana or Datadog dashboards showing real-time MCP server health."
      ]
    },
    {
      step: "5",
      title: "Implement CI/CD Pipeline",
      description: "Automate testing, building, and deployment to reduce human error.",
      details: [
        "Unit tests for tool schemas and validation logic.",
        "Integration tests against a staging MCP server with sample data.",
        "Container image scanning for vulnerabilities before deployment.",
        "Canary deployments with automatic rollback on error rate increase."
      ]
    },
    {
      step: "6",
      title: "Scale for Production Traffic",
      description: "Configure auto-scaling, load balancing, and graceful degradation.",
      details: [
        "Horizontal scaling: Run multiple server instances behind a load balancer.",
        "Connection pooling: Reuse database and API connections to reduce latency.",
        "Circuit breakers: Prevent cascade failures when downstream services degrade.",
        "Rate limiting: Protect against abuse and ensure fair resource allocation."
      ]
    },
    {
      step: "7",
      title: "Ensure Compliance & Documentation",
      description: "Meet regulatory requirements and document your deployment for audits.",
      details: [
        "Data localization: Store data in required jurisdictions (e.g., India for DPDP compliance).",
        "Consent management: Log user consent for every data access operation.",
        "Breach notification: Implement 72-hour alerting aligned with DPDP requirements.",
        "Documentation: Maintain runbooks, architecture diagrams, and incident response procedures."
      ]
    }
  ];

  return (
    <div id="mcp-production-deployment-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedGraphSchema} />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { name: "Learn", href: "/learn" },
          { name: "MCP Production Deployment", href: "/learn/mcp-production-deployment" }
        ]} />

        <section className="py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10">
            <Server className="h-6 w-6 text-cyan-200" />
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            MCP Production Deployment Guide
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            A step-by-step guide to deploying Model Context Protocol servers in production. Covering hosting, security, monitoring, scaling, and compliance for enterprise MCP deployments.
          </p>
        </section>

        <div className="mt-12 space-y-8">
          {steps.map((step) => (
            <section key={step.step} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan-500/10 text-cyan-300 font-black text-sm border border-cyan-400/20">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-black text-white">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{step.description}</p>
                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/60">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-2xl border border-violet-300/15 bg-gradient-to-r from-violet-950/60 via-[#112040] to-[#07111e] p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-500/10">
                  <ShieldCheck className="h-5 w-5 text-emerald-200" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">DPDP & RBI Compliant Hosting</h3>
                  <p className="text-[11px] text-white/50">India-first data governance built in</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/65">
                Skip the compliance overhead. MCPserver.in provides automated data localization, consent management, and breach notification protocols aligned with Indian digital regulations. Deploy from Mumbai and Bengaluru edge nodes designed for low latency.
              </p>
            </div>
            <div className="flex items-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-black text-black hover:bg-cyan-400 transition-colors"
              >
                Start Deploying <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/topics/mcp-security-best-practices" className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-black text-white group-hover:text-cyan-200">Security Best Practices</h3>
            </div>
            <p className="text-xs text-white/55">mTLS, least privilege, credential management, and audit logs for production MCP servers.</p>
          </Link>
          <Link href="/topics/free-mcp-hosting" className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-black text-white group-hover:text-cyan-200">Free MCP Hosting</h3>
            </div>
            <p className="text-xs text-white/55">CreateOS, Vercel, Railway, and serverless deployment options for MCP servers.</p>
          </Link>
          <Link href="/topics/mcp-architecture" className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-black text-white group-hover:text-cyan-200">MCP Architecture</h3>
            </div>
            <p className="text-xs text-white/55">JSON-RPC 2.0, STDIO vs SSE transports, and server design patterns for production.</p>
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
