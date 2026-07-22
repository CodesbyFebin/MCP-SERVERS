import type { Metadata } from "next";
import Link from "next/link";
import { Building2, FileText, KeyRound, Lock, Network, ShieldCheck } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "Enterprise MCP Platform - SSO, VPC Peering, DPDP and RBI Controls",
  description:
    "Enterprise MCPserver.in capabilities for private deployments, RBAC, SAML/SSO, VPC peering, audit logs, DPDP reporting, and India data localization.",
  alternates: {
    canonical: "/enterprise",
    languages: {
    "en-IN": "/enterprise",
    "en": "/enterprise",
        },
  },
};

export default function EnterprisePage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/enterprise",
    title: "Enterprise MCP Platform",
    description: "Enterprise MCPserver.in capabilities for private deployments, RBAC, SAML/SSO, VPC peering, audit logs, DPDP reporting, and India data localization.",
    speakable: ["#enterprise-page"],
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Enterprise", item: "/enterprise" }
    ],
    softwareApplication: {
      name: "MCPserver.in Enterprise",
      description: "Enterprise MCP governance surface for private deployments, identity, networking, audit logging, and compliance evidence."
    }
  });

  return (
    <div id="enterprise-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={schema} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Enterprise", href: "/enterprise" }]} />

        <section className="grid gap-8 py-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
              <Building2 className="h-3.5 w-3.5" />
              Business and Enterprise
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Governed MCP infrastructure for regulated teams.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
              Run private MCP servers with strong identity, isolated networking, long-retention audit logs, India data residency, and compliance evidence designed for DPDP and RBI-sensitive workflows.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex min-h-11 items-center rounded-md bg-violet-600 px-4 text-xs font-black text-white">
                Talk to enterprise sales
              </Link>
              <Link href="/security" className="inline-flex min-h-11 items-center rounded-md border border-white/10 bg-white/[0.04] px-4 text-xs font-black text-white">
                Review security controls
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-black text-white">Enterprise baseline</h2>
            <div className="mt-5 space-y-3">
              {["SAML/SSO with Okta and Azure AD", "Fine-grained RBAC and ABAC policies", "AWS PrivateLink and GCP Private Service Connect", "7-year audit retention exportable to SIEM", "Mumbai/Bengaluru data localization controls"].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-white/65">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Identity", "SAML, SCIM-ready provisioning, scoped API keys, and session policies.", KeyRound],
            ["Network", "Private connectivity, IP allowlists, egress restrictions, and region pinning.", Network],
            ["Audit", "Immutable execution logs with redaction, retention rules, and export jobs.", FileText],
            ["Isolation", "Dedicated workers, gVisor or Kata runtime profiles, and customer-owned secrets.", Lock],
          ].map(([title, body, Icon]) => (
            <div key={title as string} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <Icon className="h-5 w-5 text-cyan-300" />
              <h2 className="mt-4 text-sm font-black text-white">{title as string}</h2>
              <p className="mt-2 text-xs leading-relaxed text-white/55">{body as string}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
