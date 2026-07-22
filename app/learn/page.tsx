import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GitBranch, Globe, Landmark, Server, ShieldCheck, TrendingUp } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getFAQSchema, getUnifiedGraphSchema } from "../../src/lib/schema";

const guides = [
  { title: "DPDP Compliance Guide", href: "/learn/dpdp-compliance-guide", description: "India's data protection law, applied to MCP server design.", icon: ShieldCheck },
  { title: "India Services", href: "/learn/india-services", description: "Razorpay, Zoho, and UPI integration patterns for Indian teams.", icon: Globe },
  { title: "Indic NLP Guide", href: "/learn/indic-nlp-guide", description: "Ollama and Hugging Face models for Indian-language workloads.", icon: BookOpen },
  { title: "Production Deployment", href: "/learn/mcp-production-deployment", description: "Step-by-step guide from hosting choice to compliance sign-off.", icon: Server },
  { title: "India MCP Benchmarks", href: "/learn/india-mcp-benchmarks", description: "Illustrative latency estimates across Indian hosting regions.", icon: TrendingUp },
  { title: "RBI AI Guidelines", href: "/learn/rbi-ai-guidelines", description: "Data localization, minimization, and audit trails for fintech MCP servers.", icon: Landmark },
  { title: "MCP vs LangChain", href: "/learn/mcp-vs-langchain", description: "An honest technical comparison — protocol vs. orchestration framework.", icon: GitBranch },
];

export const metadata: Metadata = {
  title: "MCPserver.in Learn - MCP Knowledge Hub & AI Infrastructure Guides",
  description:
    "Answers on Model Context Protocol hosting, latency, DPDP compliance, pricing in India, and enterprise MCP deployment strategies.",
  alternates: {
    canonical: "/learn",
    languages: {
      "en-IN": "/learn",
      "en": "/learn",
        }
  },

};

const learnSections = [
  {
    title: "MCP Basics",
    slug: "basics",
    questions: [
      {
        question: "What is Model Context Protocol (MCP)?",
        answer: "Model Context Protocol (MCP) is an open-source standard by Anthropic that connects AI agents to external tools, databases, and APIs using a standardized JSON-RPC interface. It eliminates custom integration code by exposing tools, resources, and prompts that LLMs can invoke directly."
      },
      {
        question: "Why is MCP better than custom API wrappers?",
        answer: "MCP provides a universal protocol so any MCP-compatible client can use your server without writing glue code. It handles authentication, schema discovery, and error recovery, reducing integration time from days to minutes."
      },
      {
        question: "Which LLM clients support MCP natively?",
        answer: "Claude Desktop, Cursor IDE, Windsurf, Zed Editor, Cline, LibreChat, and LangChain all support MCP natively. Support is expanding to ChatGPT and other platforms via plugins and gateways."
      }
    ]
  },
  {
    title: "Hosting & Performance",
    slug: "hosting",
    questions: [
      {
        question: "What is the p99 latency for MCP servers in India?",
        answer: "Latency depends on where your MCP server and its data actually run. Hosting close to your users and data source — for Indian teams, typically Mumbai or Bengaluru — minimizes network round-trip time compared to routing through a distant global region."
      },
      {
        question: "How does edge routing improve MCP performance?",
        answer: "Edge routing places MCP server containers closer to end-users. For India-based AI agents, hosting in Mumbai or Bengaluru reduces round-trip time compared to routing through US-East or EU-West deployments, since network distance is the dominant factor in latency."
      },
      {
        question: "Can MCP servers run offline or at the edge?",
        answer: "Yes. MCP servers support Stdio (local process) and SSE (remote HTTP) transports. Edge runtimes like Cloudflare Workers, Fly.io, and Vercel Edge Functions can host MCP servers with fast cold starts compared to traditional VM-based deployments — exact figures depend on the runtime and workload."
      }
    ]
  },
  {
    title: "Security & Compliance",
    slug: "security",
    questions: [
      {
        question: "Is MCPserver.in compliant with India's DPDP Act?",
        answer: "Yes. MCPserver.in is fully DPDP compliant with automated data localization, consent management, and breach notification protocols built into the platform."
      },
      {
        question: "How are credentials protected in hosted MCP?",
        answer: "Credentials are encrypted at rest using AES-256, decrypted only inside isolated runtime memory (gVisor/Kata containers), redacted from all logs, and rotated through policy-based key management with zero-knowledge architecture."
      },
      {
        question: "Does MCP comply with RBI guidelines for financial data?",
        answer: "MCPserver.in's enterprise tier includes VPC peering, PrivateLink, 7-year audit retention, and data residency controls in Mumbai and Bengaluru to satisfy RBI data localization and audit requirements for regulated financial workflows."
      }
    ]
  },
  {
    title: "Pricing & Business",
    slug: "pricing",
    questions: [
      {
        question: "How much does MCP hosting cost in INR?",
        answer: "MCPserver.in offers a free Developer tier (3 servers), Pro plans from ₹999/month, and Enterprise custom pricing. All plans include INR billing, Mumbai/Bengaluru hosting, and DPDP compliance features."
      },
      {
        question: "Is there a free tier for testing MCP servers?",
        answer: "Yes. The Developer tier is free forever with up to 3 active servers, standard cold-boot latency, and community support. No credit card required to start."
      },
      {
        question: "What payment methods are supported for Indian customers?",
        answer: "Indian customers can pay via UPI, credit/debit cards, net banking, and Razorpay. Enterprise customers receive INR invoices with TDS deduction support and GST compliance."
      }
    ]
  },
  {
    title: "Enterprise & Scale",
    slug: "enterprise",
    questions: [
      {
        question: "Can MCP servers handle 1M+ requests per day?",
        answer: "Managed runtimes can scale container replicas based on request volume, with load balancing, circuit breakers, and graceful degradation to handle traffic spikes."
      },
      {
        question: "What enterprise identity features are available?",
        answer: "Enterprise features include SAML/SSO (Okta, Azure AD), SCIM provisioning, fine-grained RBAC/ABAC policies, VPC peering, PrivateLink, and 7-year immutable audit logs exportable to SIEM."
      },
      {
        question: "How does MCP compare to REST APIs for enterprises?",
        answer: "MCP offers built-in context management, tool orchestration, and schema discovery that REST lacks. For AI-first enterprises, this typically means less custom integration code compared to maintaining bespoke REST wrappers for every data source — though the actual reduction depends on how many integrations you're consolidating."
      }
    ]
  }
];

export default function LearnPage() {
  const allFaqs = learnSections.flatMap(s => s.questions);
  const faqSchema = getFAQSchema(allFaqs);
  const unifiedSchema = getUnifiedGraphSchema({
    pageUrl: "/learn",
    title: "MCPserver.in Learn - MCP Knowledge Hub & AI Infrastructure Guides",
    description: "Answers on Model Context Protocol hosting, latency, DPDP compliance, pricing in India, and enterprise MCP deployment strategies.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Learn", item: "/learn" }
    ],
    faq: allFaqs
  });

  return (
    <div id="learn-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={faqSchema} />
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Learn", href: "/learn" }]} />

        <section className="py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10">
            <BookOpen className="h-6 w-6 text-cyan-200" />
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">MCP Knowledge Hub</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            Expert answers on hosting, latency, compliance, pricing, and enterprise deployment. Optimized for voice search and AI retrieval.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-2xl font-black text-white">In-Depth Guides</h2>
          <p className="mt-2 text-sm text-white/58">Longer, step-by-step guides beyond the quick answers below.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-cyan-300" />
                    <h3 className="text-sm font-black text-white group-hover:text-cyan-200">{guide.title}</h3>
                  </div>
                  <p className="text-xs text-white/55">{guide.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {learnSections.map((section) => (
          <section key={section.slug} className="mt-12 border-t border-white/6 pt-10">
            <h2 className="text-2xl font-black text-white">{section.title}</h2>
            <div className="mt-6 space-y-4">
              {section.questions.map((q) => (
                <details key={q.question} className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 open:border-cyan-300/25">
                  <summary className="cursor-pointer list-none text-base font-black text-white">
                    <span>{q.question}</span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">{q.answer}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["MCP", "hosting", "India", "latency", "DPDP"].map(tag => (
                      <span key={tag} className="rounded-md border border-white/8 bg-white/[0.04] px-2 py-1 text-[10px] font-bold text-white/45">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 to-violet-950/30 p-8 text-center">
          <h3 className="text-xl font-black text-white">Need deeper guidance?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/58">
            Explore our documentation, pillar guides, and server comparisons for step-by-step implementation patterns.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-5 py-2.5 text-xs font-black text-white">
              <BookOpen className="h-4 w-4" />
              Read Documentation
            </Link>
            <Link href="/mcp-server-directory" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-black text-white">
              Browse Servers <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/learn/indic-nlp-guide"
              className="inline-flex items-center gap-2 rounded-md border border-indigo-500/40 bg-indigo-500/10 px-5 py-2.5 text-xs font-black text-indigo-200"
            >
              🇮🇳 Indic NLP Guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
