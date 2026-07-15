import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - MCPserver.in",
  description: "Read the service terms and acceptable usage rules for our managed Model Context Protocol hosting.",
};

export default function TermsPage() {
  const breadcrumbSteps = [
    { name: "Legal", href: "/terms" },
    { name: "Terms of Service", href: "/terms" }
  ];

  return (
    <div id="legal-page-terms" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        <div className="py-6 border-b border-gray-900/40">
          <Scale className="w-8 h-8 text-cyan-400 mb-3" />
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-gray-500 mt-1">Last Updated: June 15, 2026</p>
        </div>

        {/* Legal copy */}
        <div className="mt-8 space-y-6 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl font-sans">
          <p>
            Welcome to MCPserver.in! These terms and conditions outline the rules and regulations for the use of MCPserver Technologies Private Limited's Website, located at https://mcpserver.in.
          </p>
          
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Terms & Accounts</h3>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use MCPserver.in if you do not agree to take all of the terms and conditions stated on this page. You are solely responsible for protecting your API keys and desktop JSON config parameters.
          </p>

          <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Fair Use Limits and SLAs</h3>
          <p>
            Unless explicitly agreed in custom Enterprise SLAs, free and entry-level tiers are limited to standard bandwidth and rate bounds. Abusing connection streams, sending malicious shell scripts, or attempting SQL injections on remote clusters will lead to instant account suspension.
          </p>

          <div className="p-4 rounded-xl bg-gray-900/20 border border-gray-900 mt-8 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-xs text-gray-500">
              Compliant with the Digital Personal Data Protection (DPDP) Act of India. For queries, contact legal@mcpserver.in.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
