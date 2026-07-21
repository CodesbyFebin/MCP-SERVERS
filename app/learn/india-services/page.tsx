import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";
import { getContentDates } from "../../../src/lib/contentDates";
import { indiaServices } from "../../../src/data/india-services";

export const metadata: Metadata = {
  title: "India Services Integration Hub: Razorpay, Zoho CRM MCP Servers | MCPserver.in",
  description:
    "Real, working MCP server examples for Indian SaaS and payment platforms — Razorpay and Zoho CRM — using the official SDKs and MCP TypeScript SDK.",
  alternates: {
    canonical: "/learn/india-services",
    languages: {
    "en-IN": "/learn/india-services",
    "en": "/learn/india-services",
  },
  },
};

export default function IndiaServicesPage() {
  const dates = getContentDates("learn:india-services");
  const unifiedSchema = getUnifiedGraphSchema({
    speakable: ["#indiaServices"],
    pageUrl: "/learn/india-services",
    title: "India Services Integration Hub",
    description:
      "Real, working MCP server examples for Indian SaaS and payment platforms, using official SDKs.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Learn", item: "/learn" },
      { name: "India Services Hub", item: "/learn/india-services" },
    ],
    article: {
      title: "India Services Integration Hub",
      description: "Real, working MCP server examples for Razorpay and Zoho CRM.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: dates.datePublished,
      dateModified: dates.dateModified,
    },
  });

  return (
    <div id="india-services" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Learn", href: "/learn" },
            { name: "India Services Hub", href: "/learn/india-services" },
          ]}
        />

        <section className="py-10">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            India Services Integration Hub
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Working MCP server examples for platforms Indian teams actually use day to day — built against the official Razorpay and Zoho SDKs/APIs, using the real{" "}
            <code>@modelcontextprotocol/sdk</code>. Every code sample on this page is a complete, runnable server, not a stub.
          </p>
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-amber-100/80">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            These are integration patterns to adapt, not hosted services. Use test/sandbox credentials while developing, and review any third-party community package before pointing it at live payment or CRM credentials.
          </div>
        </section>

        <div className="space-y-10">
          {indiaServices.map((service) => (
            <section key={service.slug} id={service.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-black text-white">{service.name}</h2>
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-bold text-cyan-200">
                  {service.category}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{service.summary}</p>

              <h3 className="mt-5 text-xs font-black uppercase tracking-wide text-white/45">Authentication</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/60">{service.authPattern}</p>

              <h3 className="mt-5 text-xs font-black uppercase tracking-wide text-white/45">Server Code</h3>
              <pre className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs leading-relaxed text-cyan-200">
                <code>{service.serverCode}</code>
              </pre>

              {service.communityPackage && (
                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-relaxed text-white/55">
                  <strong className="text-white/75">Community alternative:</strong>{" "}
                  <a href={service.communityPackage.npmUrl} className="text-cyan-300" target="_blank" rel="noopener noreferrer">
                    {service.communityPackage.name}
                  </a>{" "}
                  — {service.communityPackage.note}
                </div>
              )}

              <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/[0.04] p-4 text-xs leading-relaxed text-red-200/80">
                {service.disclaimer}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
