import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - MCPserver.in",
  description: "Examine the privacy rules, encryption guarantees, and data collection standards for MCPserver.in.",
  alternates: {
    canonical: "/privacy",
    languages: {
      "en-IN": "/privacy",
      "en": "/privacy",
    }
  },

};

export default function PrivacyPage() {
  const breadcrumbSteps = [
    { name: "Legal", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" }
  ];

  return (
    <div id="legal-page-privacy" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        <div className="py-6 border-b border-gray-900/40">
          <Scale className="w-8 h-8 text-cyan-400 mb-3" />
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 mt-1">Last Updated: June 15, 2026</p>
        </div>

        {/* Legal copy */}
        <div className="mt-8 space-y-6 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl font-sans">
          <p>
            At MCPserver.in, accessible from https://mcpserver.in, one of our main priorities is the privacy of our visitors and developer clients. This Privacy Policy document contains types of information that is collected and recorded by MCPserver and how we use it.
          </p>
          
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Information We Collect</h3>
          <p>
            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number. We do NOT store full-text database passwords or raw write payloads on our disk — all processed credentials are encrypted end-to-end.
          </p>

          <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. How We Use Your Information</h3>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
            <li>Provide, operate, and maintain our dynamic gateway proxy server.</li>
            <li>Improve, personalize, and expand our educational pillars resources.</li>
            <li>Analyze token usage metrics to safeguard container bounds.</li>
            <li>Develop new products, services, features, and functionality.</li>
          </ul>

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
