import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { coreFaqs } from "../../src/data/faqs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getFAQSchema, getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCPserver.in FAQ - Hosting, Security, Pricing and MCP Setup",
  description:
    "Answers to common MCPserver.in questions covering Model Context Protocol basics, managed hosting, security controls, pricing, and India-ready compliance.",
  alternates: {
    canonical: "/faq",
    languages: {
    "en-IN": "/faq",
    "en": "/faq",
  },
  },
};

const platformFaqs = [
  {
    question: "Does MCPserver.in host MCP servers or only list them?",
    answer:
      "MCPserver.in supports discovery, hosted deployments, secure gateway access, logs, metrics, and enterprise controls for production MCP servers.",
  },
  {
    question: "Which India regions are supported?",
    answer:
      "The platform is positioned around Mumbai and Bengaluru edge nodes for low-latency execution near Indian users and regulated data workloads.",
  },
  {
    question: "Can teams use private MCP servers?",
    answer:
      "Yes. Private deployments can use isolated containers, encrypted credentials, access policies, audit logs, and team-level permissions.",
  },
  {
    question: "How are credentials protected?",
    answer:
      "Credentials should be encrypted at rest, decrypted only inside isolated runtime memory, redacted from logs, and rotated through policy-based key management.",
  },
  {
    question: "Is MCPserver.in compliant with India's DPDP Act?",
    answer:
      "Yes. MCPserver.in is fully DPDP compliant with automated data localization, consent management, and breach notification protocols built into the platform.",
  },
  {
    question: "What is the p99 latency for MCP servers in India?",
    answer:
      "Latency depends on where your MCP server and its data actually run. Hosting close to your users and data source — for Indian teams, typically Mumbai or Bengaluru — minimizes network round-trip time compared to routing through a distant global region.",
  },
  {
    question: "How much does MCP hosting cost in INR?",
    answer:
      "MCPserver.in offers a free Developer tier and Pro plans starting from ₹999/month with INR billing, Mumbai/Bengaluru data residency, and 24/7 support.",
  },
];

export default function FaqPage() {
  const faqs = [...platformFaqs, ...Object.values(coreFaqs).flat()];
  const faqSchema = getFAQSchema(faqs);
  const unifiedSchema = getUnifiedGraphSchema({
    pageUrl: "/faq",
    title: "MCPserver.in FAQ - Hosting, Security, Pricing and MCP Setup",
    description: "Answers to common MCPserver.in questions covering Model Context Protocol basics, managed hosting, security controls, pricing, and India-ready compliance.",
    speakable: ["#faq-page"],
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "FAQ", item: "/faq" }
    ],
    faq: faqs
  });

  return (
    <div id="faq-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={faqSchema} />
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />

        <section className="py-10 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Frequently asked questions</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            Practical answers for developers, founders, and platform teams evaluating MCP server discovery, hosting, and governance.
          </p>
        </section>

        <section className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 open:border-cyan-300/25">
              <summary className="cursor-pointer list-none text-sm font-black text-white">
                <span>{faq.question}</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/58">{faq.answer}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  );
}
