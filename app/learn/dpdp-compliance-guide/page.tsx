import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, ArrowRight } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";
import { getContentDates } from "../../../src/lib/contentDates";

export const metadata: Metadata = {
  title: "DPDP Compliance Checklist for MCP Servers | MCPserver.in",
  description:
    "A practical educational checklist for aligning MCP server deployments with India's Digital Personal Data Protection Act (DPDP) 2023 — data localization, consent, and audit logging.",
  alternates: {
    canonical: "/learn/dpdp-compliance-guide",
    languages: {
    "en-IN": "/learn/dpdp-compliance-guide",
    "en": "/learn/dpdp-compliance-guide",
        },
  },
};

const sections = [
  {
    title: "Data Localization",
    body: "DPDP requires that sensitive personal data of Indian citizens be handled with India-specific safeguards in mind. For MCP servers, that means:",
    items: [
      "Deploy MCP servers on Indian cloud regions (Mumbai, Bengaluru, Hyderabad) where the workload touches personal data.",
      "Keep vector databases and cache layers co-located with the primary data store rather than split across regions.",
      "Document your data residency policy prominently in your server's README or API docs.",
    ],
  },
  {
    title: "Consent Management",
    body: "Agents should only process data for purposes a user has actually consented to.",
    items: [
      "Surface a clear consent step before a tool that touches personal data executes for the first time.",
      "Log the scope of consent alongside each relevant MCP tool call, not just at account creation.",
      "Provide a straightforward way for users to withdraw consent — as easy as it was to give it.",
    ],
  },
  {
    title: "Audit & Retention",
    body: "Financial-sector guidance (RBI) commonly cited alongside DPDP calls for audit logs retained for extended periods — often cited as 7 years for regulated data categories.",
    items: [
      "Expose an internal audit or logging mechanism that records who called which tool, and when.",
      "Capture enough detail in logs to reconstruct what data a given tool call touched.",
      "Store logs immutably where feasible (write-once storage or an append-only log).",
    ],
  },
  {
    title: "RBI Payment Data Controls",
    body: "For MCP servers handling payment data, RBI's data localization requirements apply in addition to DPDP.",
    items: [
      "Never cache payment card numbers or UPI transaction IDs in plain text.",
      "Use vault-compliant storage or tokenization for any payment-related identifiers.",
      "Ensure payment gateway integrations use Indian-registered acquiring banks.",
    ],
  },
];

export default function DPDPGuidePage() {
  const dates = getContentDates("learn:dpdp-compliance-guide");
  const unifiedSchema = getUnifiedGraphSchema({
    speakable: ["#dpdpComplianceGuide"],
    pageUrl: "/learn/dpdp-compliance-guide",
    title: "DPDP Compliance Checklist for MCP Servers",
    description:
      "A practical educational checklist for aligning MCP server deployments with India's Digital Personal Data Protection Act (DPDP) 2023.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Learn", item: "/learn" },
      { name: "DPDP Compliance Guide", item: "/learn/dpdp-compliance-guide" },
    ],
    article: {
      title: "DPDP Compliance Checklist for MCP Servers",
      description:
        "A practical educational checklist for aligning MCP server deployments with India's Digital Personal Data Protection Act (DPDP) 2023.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: dates.datePublished,
      dateModified: dates.dateModified,
    },
  });

  return (
    <div id="dpdp-compliance-guide" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Learn", href: "/learn" },
            { name: "DPDP Compliance Guide", href: "/learn/dpdp-compliance-guide" },
          ]}
        />

        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-200">
            <ShieldAlert className="h-3.5 w-3.5" />
            Educational resource
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            DPDP Compliance Checklist for MCP Servers
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            A practical checklist for architectural awareness when deploying MCP servers that touch personal data of Indian users under the Digital Personal Data Protection Act, 2023.
          </p>
          <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-amber-100/80">
            This is an educational resource for architectural awareness, not legal advice. Consult a qualified professional for your specific compliance obligations.
          </div>
        </section>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-black text-white">
                <span className="text-cyan-300">{i + 1}.</span> {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{section.body}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/60">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-cyan-300">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="rounded-2xl border border-red-400/20 bg-red-500/[0.04] p-6">
            <h2 className="text-2xl font-black text-white">
              <span className="text-red-400">5.</span> The Cost of Non-Compliance
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Under the DPDP Act's penalty schedule, monetary penalties for significant data breaches or failure to implement reasonable security safeguards can reach up to{" "}
              <strong className="text-red-300">₹250 crore</strong> depending on the nature and severity of the violation.
            </p>
            <p className="mt-3 text-xs italic text-white/40">
              Figures are based on the DPDP Act, 2023 penalty schedule and are illustrative — actual penalties depend on the specific provision violated and are subject to determination by the Data Protection Board of India.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 to-violet-950/30 p-8 text-center">
          <h3 className="text-xl font-black text-white">Ready to deploy?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/58">
            Review the full production deployment checklist for MCP servers.
          </p>
          <Link
            href="/learn/mcp-production-deployment"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-violet-600 px-5 py-2.5 text-xs font-black text-white"
          >
            View Deployment Guide <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
