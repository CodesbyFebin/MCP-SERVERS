import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { ShieldAlert, Lock, Server, Users, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Security, Compliance & Trust - MCPserver.in",
  description: "Learn about secure hosting practices, credential handling, Docker sandboxes, and DPDP-aligned data handling for Model Context Protocol servers.",
  alternates: {
    canonical: "/security",
    languages: {
      "en-IN": "/security",
      "en": "/security",
    }
  },

};

export default function Security() {
  const breadcrumbSteps = [{ name: "Security & Trust", href: "/security" }];

  return (
    <div id="security-page" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Security Header */}
        <div className="text-center py-10 relative">
          <ShieldAlert className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
          <h1 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
            Security, Compliance & Trust
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Examine our high-security hosting infrastructure, Docker sandbox isolation layers, token rotations, and encryption guarantees.
          </p>
        </div>

        {/* Core Security Elements (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          
          <div className="p-6 rounded-xl bg-gray-900/20 border border-gray-900">
            <h3 className="text-sm font-sans font-bold text-white mb-3 flex items-center gap-2">
              <Lock className="w-4.5 h-4.5 text-cyan-400" />
              1. Zero-Knowledge Key Storage
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We encrypt and store all credentials (like database connection strings, GITHUB_PERSONAL_ACCESS_TOKENs) with AES-256-GCM. Your keys are decrypted only in memory at runtime inside isolated container pods, preventing unauthorized disk access.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-900/20 border border-gray-900">
            <h3 className="text-sm font-sans font-bold text-white mb-3 flex items-center gap-2">
              <Server className="w-4.5 h-4.5 text-cyan-400" />
              2. Isolated Docker Sandboxing
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every deployed server runs within its own secure, single-tenant container containerized layer. This completely isolates code executions, filesystem access, and system calls, guaranteeing your server cannot leak or access adjacent pods.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-900/20 border border-gray-900">
            <h3 className="text-sm font-sans font-bold text-white mb-3 flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-cyan-400" />
              3. Human-in-the-Loop Permission Filters
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Filter and approve write tools (such as database edits, filesystem deletions, or social posts) dynamically. Choose to receive approval notifications on Discord or Slack, giving your human operators final say before model executions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-900/20 border border-gray-900">
            <h3 className="text-sm font-sans font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-cyan-400" />
              4. Fully Audited Handshake Logs
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Examine every single JSON-RPC packet transmitted between your models and your server. Audit timestamps, roundtrip latencies, command parameters, and execution outcomes live on our dashboard or stream logs to external SIEMs.
            </p>
          </div>

        </div>

        {/* Compliance and Indian Standards Section */}
        <div className="mt-16 bg-gray-900/10 border border-gray-900 rounded-2xl p-6 sm:p-8">
          <h3 className="font-sans font-bold text-sm text-white mb-4 text-center">
            Regulatory Compliance and Standards
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed text-center max-w-2xl mx-auto mb-8">
            MCPserver.in's infrastructure and data-handling practices are designed with international security benchmarks and India's data localization requirements in mind.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-lg bg-gray-950/40 border border-gray-900">
              <span className="text-xs font-bold text-white block mb-1">DPDP-Aligned Data Handling</span>
              <p className="text-[10px] text-gray-500">Data localization and consent-handling practices designed around India's Digital Personal Data Protection (DPDP) Act.</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-950/40 border border-gray-900">
              <span className="text-xs font-bold text-white block mb-1">Security-First Architecture</span>
              <p className="text-[10px] text-gray-500">Least-privilege access, encrypted secrets, and audit logging built into the platform design.</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-950/40 border border-gray-900">
              <span className="text-xs font-bold text-white block mb-1">India Hosting Regions</span>
              <p className="text-[10px] text-gray-500">Infrastructure options in Bengaluru and Mumbai for teams with India data-residency requirements.</p>
            </div>
          </div>
        </div>

        {/* DPDP Compliance Scanner CTA */}
        <div className="mt-8 bg-cyan-950/10 border border-cyan-900/30 rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="font-sans font-bold text-sm text-white mb-2">
            Check Any MCP Server's Compliance Signals
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto mb-5">
            Run our free DPDP Compliance Scanner against a GitHub repository or a live server endpoint — real, live checks for license, security policy, data-handling disclosure, HTTPS, and access control. No mock data, no certification claims — just verifiable technical signals with a full breakdown.
          </p>
          <a
            href="/tools/dpdp-compliance-scanner"
            className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-5 py-2.5 text-xs font-black text-black"
          >
            Run the DPDP Compliance Scanner
          </a>
        </div>

      </div>
    </div>
  );
}
