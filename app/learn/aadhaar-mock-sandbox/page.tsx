import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, ArrowRight, Fingerprint, FlaskConical } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";
import { getContentDates } from "../../../src/lib/contentDates";

export const metadata: Metadata = {
  title: "Aadhaar Mock Sandbox for MCP Servers | MCPserver.in",
  description:
    "Practice Aadhaar-aware MCP integration patterns in a safe sandbox — redaction, masking, consent flows, and audit logging without real identity data.",
  alternates: {
    canonical: "/learn/aadhaar-mock-sandbox",
    languages: {
      "en-IN": "/learn/aadhaar-mock-sandbox",
      "en": "/learn/aadhaar-mock-sandbox",
    },
  },
};

const sections = [
  {
    title: "Why a sandbox first",
    body: "Aadhaar data is among the most sensitive Indian regulated datasets. Use a mock sandbox to validate redaction, masking, and consent flows before touching real UIDAI endpoints.",
    items: [
      "Run a local mock Aadhaar service that returns fake demographic data with realistic formats.",
      "Exercise your MCP server's redaction pipeline against masked Aadhaar numbers (12-digit + checksum).",
      "Validate consent-capture tooling before integration with a real identity provider.",
      "Measure log leakage: confirm that neither full Aadhaar numbers nor VID appear in logs.",
    ],
  },
  {
    title: "Data redaction rules",
    body: "Even in a sandbox, apply the same redaction rules you will enforce in production.",
    items: [
      "Strip first 8 digits of an Aadhaar number, leaving only the last 4.",
      "Replace names with random tokens in any persistence or audit layer by default.",
      "Allow opt-in raw logging only under an explicit, time-bounded debug consent flag.",
      "Verify redaction at the MCP tool boundary, not just in the database layer.",
    ],
  },
  {
    title: "Consent & audit logging",
    body: "Record what the user allowed, when, and under what scope.",
    items: [
      "Create a tool_capture_consent(scope: string, ttl_hours: number) -> consent_id.",
      "Bind every subsequent Aadhaar-touching tool call to an existing valid consent_id.",
      "Emit append-only audit events: user, tool, consent_id, timestamp, redaction_mode.",
      "Reject tool calls with missing or expired consent IDs rather than degrading silently.",
    ],
  },
  {
    title: "Migration path to production",
    body: "The sandbox should mirror production architecture so switching is a config change.",
    items: [
      "Use feature flags to swap mock providers for real AUA/KUA endpoints.",
      "Keep the same redaction and audit schema in both environments.",
      "Run integration tests against both providers in CI before releasing.",
      "Require dual approval from security and compliance before enabling real Aadhaar flows.",
    ],
  },
];

export default function AadhaarSandboxPage() {
  const dates = getContentDates("learn:aadhaar-mock-sandbox");
  const unifiedSchema = getUnifiedGraphSchema({
    speakable: ["#aadhaarMockSandbox"],
    pageUrl: "/learn/aadhaar-mock-sandbox",
    title: "Aadhaar Mock Sandbox for MCP Servers",
    description:
      "Practice Aadhaar-aware MCP integration patterns in a safe sandbox — redaction, masking, consent flows, and audit logging without real identity data.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Learn", item: "/learn" },
      { name: "Aadhaar Mock Sandbox", item: "/learn/aadhaar-mock-sandbox" },
    ],
    article: {
      title: "Aadhaar Mock Sandbox for MCP Servers",
      description:
        "Practice Aadhaar-aware MCP integration patterns in a safe sandbox — redaction, masking, consent flows, and audit logging without real identity data.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: dates.datePublished,
      dateModified: dates.dateModified,
    },
  });

  return (
    <div id="aadhaar-mock-sandbox" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Learn", href: "/learn" },
            { name: "Aadhaar Mock Sandbox", href: "/learn/aadhaar-mock-sandbox" },
          ]}
        />

        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-200">
            <Fingerprint className="h-3.5 w-3.5" />
            India compliance pillar
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Aadhaar Mock Sandbox for MCP Servers
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Practice Aadhaar-aware MCP integration patterns in a safe sandbox — redaction, masking, consent flows, and audit logging without real identity data.
          </p>
          <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-amber-100/80">
            This page does not connect to UIDAI or any real identity provider. It describes a local mock service for engineering validation only.
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
            Review India-focused compliance architecture with the DPDP Compliance Scanner before wiring identity workflows.
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
