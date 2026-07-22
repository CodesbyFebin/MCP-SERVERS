import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, ArrowRight, Receipt, FileText } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";
import { getContentDates } from "../../../src/lib/contentDates";

export const metadata: Metadata = {
  title: "GST Integration Guide for MCP Servers | MCPserver.in",
  description:
    "How to build GST-compliant MCP servers for Indian businesses — invoice fetching, reconciliation APIs, and tax-tech integrations.",
  alternates: {
    canonical: "/learn/gst-integration",
    languages: {
      "en-IN": "/learn/gst-integration",
      "en": "/learn/gst-integration",
    },
  },
};

const sections = [
  {
    title: "GST API Architecture",
    body: "India's GST Network (GSTN) provides RESTful APIs for invoice management, return filing, and taxpayer lookup. An MCP server can wrap these APIs for AI clients.",
    items: [
      "Use the GSTN Authentication API to obtain a session token using PAN-based credentials.",
      "Call the Invoice API to fetch B2B/B2C invoices for a given GSTIN and period.",
      "Expose a reconcile tool that compares downloaded invoice data against your local books.",
      "Cache token responses for their validity window (usually 6 hours) to reduce auth calls.",
    ],
  },
  {
    title: "Authentication & Security",
    body: "GST APIs require OAuth 2.0 with client credentials, plus IP whitelisting at the GSTN portal.",
    items: [
      "Store the client secret and GSTN password in a secrets manager, never in source code.",
      "Rotate credentials on the GSTN-mandated schedule (typically quarterly).",
      "Mask GSTINs and invoice numbers in logs unless explicitly required for debugging.",
      "Enforce mTLS when calling GSTN endpoints from your MCP server runtime.",
    ],
  },
  {
    title: "Tool Design Patterns",
    body: "Wrap GST operations as discrete MCP tools with clear input schemas.",
    items: [
      "tool_get_gst_invoices(gstin: string, month: string, year: string) -> invoice[]",
      "tool_reconcile_invoice(invoice_number: string, local_amount: number) -> diff",
      "tool_file_gstr1(period: string, invoices: invoice[]) -> acknowledgment",
      "tool_lookup_gstin(gstin: string) -> taxpayer_details",
    ],
  },
  {
    title: "Error Handling & Rate Limits",
    body: "GSTN enforces per-minute rate limits and returns structured error codes.",
    items: [
      "Implement exponential backoff for 429 and 503 responses from GSTN.",
      "Return human-readable error messages through the MCP tool response, not raw GSTN codes.",
      "Log rate-limit headroom so your orchestrator knows when to pause batch jobs.",
      "Test with the GSTN sandbox before moving to the production environment.",
    ],
  },
];

export default function GstIntegrationPage() {
  const dates = getContentDates("learn:gst-integration");
  const unifiedSchema = getUnifiedGraphSchema({
    speakable: ["#gstIntegration"],
    pageUrl: "/learn/gst-integration",
    title: "GST Integration Guide for MCP Servers",
    description:
      "How to build GST-compliant MCP servers for Indian businesses — invoice fetching, reconciliation APIs, and tax-tech integrations.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Learn", item: "/learn" },
      { name: "GST Integration", item: "/learn/gst-integration" },
    ],
    article: {
      title: "GST Integration Guide for MCP Servers",
      description:
        "How to build GST-compliant MCP servers for Indian businesses — invoice fetching, reconciliation APIs, and tax-tech integrations.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: dates.datePublished,
      dateModified: dates.dateModified,
    },
  });

  return (
    <div id="gst-integration" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Learn", href: "/learn" },
            { name: "GST Integration", href: "/learn/gst-integration" },
          ]}
        />

        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-200">
            <Receipt className="h-3.5 w-3.5" />
            India compliance pillar
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            GST Integration Guide for MCP Servers
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Practical architecture and tool patterns for building MCP servers that safely interact with GSTN APIs, invoice data, and tax-tech workflows for Indian businesses.
          </p>
          <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-amber-100/80">
            This is an educational resource for architectural awareness, not legal or tax advice. Consult a qualified professional for your specific compliance obligations.
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
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 to-violet-950/30 p-8 text-center">
          <h3 className="text-xl font-black text-white">Ready to explore?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/58">
            Review India-focused compliance signals with the DPDP Compliance Scanner before wiring production tax APIs.
          </p>
          <Link
            href="/tools/dpdp-compliance-scanner"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-violet-600 px-5 py-2.5 text-xs font-black text-white"
          >
            Run Compliance Scanner <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
