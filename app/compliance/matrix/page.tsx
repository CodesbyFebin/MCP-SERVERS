import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Compliance Matrix — MCPserver.in",
  description:
    "Framework-by-framework compliance matrix for hosting MCP servers in India: DPDP Act 2023, RBI guidelines, GDPR, SOC 2, and practical control mappings.",
  alternates: {
    canonical: "/compliance/matrix",
    languages: {
      "en-IN": "/compliance/matrix",
      "en": "/compliance/matrix",
    },
  },
};

const rows = [
  {
    control: "Data localization in India",
    dpdp: "Required for personal data under DPDP",
    rbi: "Relevant for regulated financial data",
    gdpr: "Not explicit, but transfer impact can matter",
    soc2: "Covered under CC6/CC7 depending on architecture",
  },
  {
    control: "Consent management",
    dpdp: "Explicit consent required for processing",
    rbi: "Consent frameworks depend on product category",
    gdpr: "Lawful basis + consent options required",
    soc2: "Privacy notice availability and evidence matter",
  },
  {
    control: "Immutable audit logging",
    dpdp: "Required for security and breach response",
    rbi: "Expected for traceability in regulated stacks",
    gdpr: "Helps demonstrate accountability and access history",
    soc2: "Required under CC7",
  },
  {
    control: "Token and secret rotation",
    dpdp: "Supports data security obligations",
    rbi: "Expected for hosted integrations",
    gdpr: "Security of processing obligation",
    soc2: "Required under CC6",
  },
  {
    control: "Approval gating for high-risk tools",
    dpdp: "Useful control, especially for write/destructive actions",
    rbi: "Depends on customer and product risk classification",
    gdpr: "Supports purpose limitation and data minimization",
    soc2: "Mapped to change management and access control",
  },
  {
    control: "Breach notification",
    dpdp: "Required within prescribed timelines where applicable",
    rbi: "Applicable to regulated institutions",
    gdpr: "72-hour notification requirement in scope cases",
    soc2: "Incident response evidence expected",
  },
  {
    control: "PII minimization in tool output",
    dpdp: "Strongly aligned with data-fidelity obligations",
    rbi: "Recommended where customer records are exposed",
    gdpr: "Data minimization by design/default",
    soc2: "Evidence of data classification and redaction controls",
  },
  {
    control: "Right to erasure / deletion workflow",
    dpdp: "Supported by the Act's deletion-related provisions",
    rbi: "Depends on retention requirements for financial records",
    gdpr: "Right to erasure in scope",
    soc2: "Depends on retention policy and evidence of deletion",
  },
];

const status = (text: string) => {
  if (/Required|explicit|72-hour notification|Right to erasure/i.test(text)) {
    return { label: "Required", color: "text-emerald-300 border-emerald-400/25 bg-emerald-400/10", icon: CheckCircle2 };
  }
  if (/Depends|Expected|Recommended|Evidence of/i.test(text)) {
    return { label: "Context dependent", color: "text-amber-300 border-amber-400/25 bg-amber-400/10", icon: AlertTriangle };
  }
  return { label: "Reference", color: "text-white/70 border-white/10 bg-white/[0.03]", icon: XCircle };
};

export default function ComplianceMatrixPage() {
  const unifiedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://www.mcpserver.in/compliance/matrix#article",
        headline: metadata.title as string,
        description: metadata.description as string,
        mainEntityOfPage: "https://www.mcpserver.in/compliance/matrix",
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.mcpserver.in/compliance/matrix#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is DPDP compliance mandatory for MCP hosting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If your MCP deployment processes personal data of individuals in India, DPDP-related obligations can apply. This matrix maps common controls so you can compare obligations across frameworks.",
            },
          },
          {
            "@type": "Question",
            name: "Does SOC 2 cover every control below?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SOC 2 applicability depends on the Trust Services Criteria and your scope. Use this matrix as a starting point to identify evidence gaps, not as legal advice.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div id="compliance-matrix-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Compliance Matrix", href: "/compliance/matrix" }]} />

        <section className="py-10">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">MCP Compliance Matrix</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/68">
            This matrix maps common operational controls across frameworks relevant to hosted MCP deployments: DPDP Act, RBI guidelines, GDPR, and SOC 2. It is illustrative guidance, not legal advice.
          </p>
        </section>

        <section className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/55">
                <th className="px-4 py-3 font-bold">Control</th>
                <th className="px-4 py-3 font-bold">DPDP Act 2023</th>
                <th className="px-4 py-3 font-bold">RBI</th>
                <th className="px-4 py-3 font-bold">GDPR</th>
                <th className="px-4 py-3 font-bold">SOC 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row) => {
                const cells = [row.dpdp, row.rbi, row.gdpr, row.soc2];
                const cellStatuses = cells.map(status);
                return (
                  <tr key={row.control} className="text-white/75">
                    <td className="px-4 py-3 font-bold text-white">{row.control}</td>
                    {cellStatuses.map((item, idx) => (
                      <td key={idx} className="px-4 py-3">
                        <span className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-[11px] font-bold ${item.color}`}>
                          <item.icon className="h-3.5 w-3.5" />
                          {cells[idx]}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-white">How to use this matrix</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/65">
            <li>Use it to identify controls you already have evidence for.</li>
            <li>Use it to expose gaps before audits, not during them.</li>
            <li>Confirm applicability with legal or infosec counsel before procurement.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/docs/compliance/dpdp-compliance-guide" className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-4 py-2.5 text-xs font-black text-black">
              DPDP compliance guide
            </Link>
            <Link href="/docs/compliance/rbi-compliance" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-black text-white">
              RBI guidance
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
