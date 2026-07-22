import {
  Badge,
  CodeDemo,
  ComparisonTable,
  ComplianceSection,
  Container,
  CtaBanner,
  DividerSection,
  EcosystemVisual,
  FeatureGrid,
  HeroTrustBadges,
  IntegrationRail,
  LogoCloud,
  PageShell,
  PrimaryButton,
  SearchPanel,
  SecondaryButton,
  SectionTitle,
  SecurityBand,
  StatStrip,
  Testimonials,
  UseCaseGrid
} from "../src/components/ReferenceLanding";
import { BarChart3, BookOpen, ArrowRight, Briefcase, Code2, CreditCard, Database, FileText, Library } from "lucide-react";
import Link from "next/link";
import { getUnifiedGraphSchema } from "../src/lib/schema";
import { getContentDates } from "../src/lib/contentDates";
import { categories } from "../src/data/categories";
import { pricingPlans } from "../src/data/pricing";
import SchemaJsonLd from "../src/components/SchemaJsonLd";
import AnswerBox from "../src/components/AnswerBox";
import FAQ from "../src/components/FAQ";
import MermaidDiagram from "../src/components/MermaidDiagram";

const categoryIcons = { Code: Code2, Database, Briefcase, CreditCard } as const;

export const metadata = {
  metadataBase: new URL("https://www.mcpserver.in"),
  title: {
    default: "MCPServer.in: Curated Model Context Protocol Directory & Hosting",
    template: "%s | MCPServer.in"
  },
  description: "Discover and deploy MCP servers. Hosted infrastructure for AI agents with India-region hosting and compliance features.",
  keywords: ["MCP server India", "Model Context Protocol hosting", "free MCP servers", "DPDP compliant AI tools", "MCP hosting Mumbai", "AI agent integration", "AI MCP servers", "AI tools India", "MCP deployment India"],
  authors: [{ name: "MCPserver.in Engineering" }],
  creator: "MCPserver.in",
  publisher: "MCPserver.in",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "en": "/",
        }
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico"
  },
  openGraph: {
    type: "website",
    url: "https://www.mcpserver.in",
    siteName: "MCPserver.in",
    title: "MCPServer.in: Curated Model Context Protocol Directory & Hosting",
    description: "Discover, test, and deploy Model Context Protocol servers. India-ready infrastructure with DPDP-aligned data controls and low-latency edge hosting.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mcpserver_in",
    creator: "@mcpserver_in"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const homeFaqs = [
  {
    question: "What is MCPserver.in?",
    answer: "MCPserver.in is an India-focused Model Context Protocol (MCP) platform. We provide a curated directory of MCP servers and free/paid hosting with DPDP-aligned data controls from Mumbai and Bengaluru edge nodes."
  },
  {
    question: "Is MCP hosting really free?",
    answer: "Yes. Our Developer tier is free for local stdio MCP servers and lightweight remote servers. Paid SSE hosting starts at ₹999/month for production workloads requiring persistent connections and higher throughput."
  },
  {
    question: "What does DPDP compliant mean?",
    answer: "DPDP compliance means our platform follows India's Digital Personal Data Protection Act. This includes data localization in Indian regions (ap-south-1/ap-south-2), immutable audit logs, consent-aware routing, and breach-notification workflows."
  },
  {
    question: "How fast are MCP servers on MCPServer.in?",
    answer: "Latency depends on where you deploy and where your data lives. Hosting close to your users and data source — Mumbai or Bengaluru for Indian traffic — reduces round-trip time versus routing through a distant global region. Enterprise plans include a negotiated uptime SLA."
  },
  {
    question: "Do I need to manage infrastructure?",
    answer: "No. MCPServer.in handles deployment, scaling, TLS, monitoring, and regional failover. You configure your MCP server, and we run it on India-first infrastructure."
  },
  {
    question: "Which AI clients support MCP?",
    answer: "Any client implementing the Model Context Protocol specification can connect — this includes Claude Desktop, Cursor, VS Code extensions, and a growing list of MCP-compatible agents. Because MCP is an open standard, a server you deploy once works across every compatible client without per-client integration work."
  },
  {
    question: "Can I build and deploy my own MCP server?",
    answer: "Yes. Use the open-source MCP SDKs to build a server exposing your own tools, data, or APIs, then deploy it through MCPServer.in's hosting to get TLS, monitoring, and India-region placement without managing infrastructure yourself."
  },
  {
    question: "How is my data handled?",
    answer: "Data for hosted servers stays in Indian regions (ap-south-1/ap-south-2) by default. We maintain audit logs of server activity and follow DPDP-aligned data-handling practices. We don't claim third-party compliance certifications we haven't obtained — ask our support team for current documentation if you need it for a vendor review."
  }
];

const { datePublished: homeDatePublished, dateModified: homeDateModified } = getContentDates("page:home");

const unifiedGraphSchema = getUnifiedGraphSchema({
  pageUrl: "/",
  title: "MCPServer.in: Free Hosted MCP Servers in India",
  description: "Curated Model Context Protocol directory and hosting with DPDP-aligned compliance and Mumbai/Bengaluru edge hosting.",
  breadcrumbs: [{ name: "Home", item: "/" }],
  speakable: ["#homepage"],
  faq: homeFaqs,
  article: {
    title: "MCPServer.in: Free Hosted MCP Servers in India",
    description: "Curated Model Context Protocol directory and hosting with DPDP-aligned compliance and Mumbai/Bengaluru edge hosting.",
    authorName: "MCPserver.in Engineering",
    authorRole: "Platform Team",
    datePublished: homeDatePublished,
    dateModified: homeDateModified
  },
  mentions: [
    { name: "Model Context Protocol", url: "https://spec.modelcontextprotocol.io" },
    { name: "AI Agents" },
    { name: "Data Localization" },
    { name: "Digital Personal Data Protection Act" },
    { name: "JSON-RPC 2.0" }
  ],
  sameAs: [
    "https://spec.modelcontextprotocol.io",
    "https://github.com/modelcontextprotocol"
  ]
});

export default function Home() {
  return (
    <PageShell id="homepage">
      <SchemaJsonLd schema={unifiedGraphSchema} />
      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.48fr_0.52fr]">
            <div>
              <Badge>India-ready hosted MCP platform</Badge>
              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                 Curated MCP Server Directory. <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400 bg-clip-text text-transparent">
                  Hosted in India. DPDP-aligned Infrastructure.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68">
                Deploy LLM tools from India-first edge infrastructure with DPDP-aligned data controls. Explore a curated directory of MCP servers and integrations.
              </p>
              <div className="mt-6 max-w-2xl">
                <HeroTrustBadges />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/mcp-server-directory">Explore MCP Servers</PrimaryButton>
                <SecondaryButton href="/pricing">Deploy Your Own MCP</SecondaryButton>
              </div>
            </div>
            <EcosystemVisual />
          </div>
        </Container>
      </section>

      <Container>
        <AnswerBox
          question="What is MCPserver.in?"
          answer="MCPserver.in is a curated directory and hosting platform for Model Context Protocol (MCP) servers, built for AI agents that need to connect to tools, databases, and APIs. Browse verified servers, deploy your own with one click, and host from India-region edge infrastructure with DPDP-aligned data controls."
          keyTakeaways={[
            "Curated directory of MCP servers across developer tools, databases, productivity, and finance",
            "One-click hosting from Mumbai and Bengaluru regions",
            "Free tier for local stdio servers; paid tiers for hosted SSE servers"
          ]}
        />
      </Container>

      <DividerSection className="pt-0">
        <Container>
          <SearchPanel />
        </Container>
      </DividerSection>

      <section className="bg-gradient-to-b from-[#030711] to-[#0a0a1a] py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">What is Model Context Protocol (MCP)?</h2>
            <p className="mt-4 text-lg text-white/70">
              Model Context Protocol (MCP) is an open standard that transforms how AI systems interact with tools, data, and services. Unlike traditional REST APIs that require complex authentication and data transformation, MCP provides a unified interface for models to access external capabilities seamlessly.
            </p>
            
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-white">How MCP Works</h3>
                <div className="mt-3 space-y-3 text-white/60">
                  <p>MCP consists of two core components:</p>
                  <ul className="list-space-y-2 pl-4">
                    <li><strong className="text-cyan-300">MCP Host</strong> - The AI model or application that requests tools</li>
                    <li><strong className="text-cyan-300">MCP Client</strong> - The tool or server being accessed</li>
                  </ul>
                  <p>The protocol enables secure, real-time communication with automatic schema validation and consent management.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">Why MCP Matters</h3>
                <div className="mt-3 space-y-3 text-white/60">
                  <p>MCP eliminates vendor lock-in by providing:</p>
                  <ul className="list-space-y-2 pl-4">
                    <li><strong className="text-cyan-300">Interoperability</strong> - Connect any model to any tool</li>
                    <li><strong className="text-cyan-300">Extensibility</strong> - Build custom tools without modifying models</li>
                    <li><strong className="text-cyan-300">Security</strong> - Fine-grained permissions and audit trails</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-xl font-semibold text-white">MCP Architecture at a Glance</h3>
              <p className="mt-2 text-sm text-white/60">
                An AI client (Claude Desktop, Cursor, or a custom agent) connects to an MCP server over stdio or HTTP/SSE, discovers its tools and resources, then invokes them through standardized JSON-RPC 2.0 messages.
              </p>
              <MermaidDiagram
                chart={`graph LR
  A[AI Client] -->|initialize + discover| B[MCP Server]
  B -->|tools/list, resources/list| A
  A -->|tools/call| B
  B -->|invoke| C[Tool / Database / API]
  C -->|result| B
  B -->|JSON-RPC response| A`}
              />
            </div>

            <div className="mt-12 rounded-xl bg-white/5 p-6">
              <h3 className="text-2xl font-semibold text-white">MCP vs Traditional APIs</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-white/10 p-4">
                  <h4 className="font-semibold text-white">Traditional API</h4>
                  <p className="mt-2 text-sm text-white/60">Separate auth, manual schema mapping, no model awareness</p>
                </div>
                <div className="rounded-lg bg-cyan-500/20 p-4">
                  <h4 className="font-semibold text-cyan-300">MCP</h4>
                  <p className="mt-2 text-sm">Unified protocol, automatic discovery, native model integration</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <h4 className="font-semibold text-white">MCP Server India</h4>
                  <p className="mt-2 text-sm">DPDP-aligned controls, low-latency edge hosting, and a curated directory of MCP servers.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DividerSection>
        <Container>
          <SectionTitle
            title={<>Browse by <span className="text-cyan-300">Category</span></>}
            subtitle="Every server in the directory is organized by what it connects your AI agent to."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category.iconName as keyof typeof categoryIcons] ?? Database;
              return (
                <Link
                  key={category.slug}
                  href={`/directory/${category.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-cyan-300/30"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                    <Icon className="h-5 w-5 text-cyan-200" />
                  </div>
                  <h3 className="mt-4 text-base font-black text-white group-hover:text-cyan-200">{category.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{category.description}</p>
                  <div className="mt-3 text-xs font-bold text-white/40">{category.count} servers</div>
                </Link>
              );
            })}
          </div>
        </Container>
      </DividerSection>

      <DividerSection className="pt-0">
        <Container>
          <StatStrip />
        </Container>
      </DividerSection>

      <Container>
        <LogoCloud />
      </Container>

      <DividerSection>
        <Container>
          <SectionTitle
            title={<>Why MCP <span className="text-violet-300">SERVER?</span></>}
            subtitle="The infrastructure layer for AI. Built for developers. Loved by AI agents."
          />
          <FeatureGrid />
        </Container>
      </DividerSection>

      <DividerSection className="pt-8">
        <Container>
          <SectionTitle
            title={<>Connect to Anything. <span className="text-cyan-300">Automate Everything.</span></>}
            subtitle="Directory of MCP servers across databases, dev tools, and popular SaaS platforms."
          />
          <IntegrationRail />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <CodeDemo />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle
            title={<>Built for Every <span className="text-violet-300">Use Case</span></>}
            subtitle="From simple automations to complex enterprise workflows."
          />
          <UseCaseGrid />
        </Container>
      </DividerSection>

      <DividerSection className="pt-8">
        <Container>
          <SecurityBand />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <ComplianceSection />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title="Loved by Builders Worldwide" />
          <Testimonials />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle
            title={<>Why Host on <span className="text-cyan-300">MCPserver.in?</span></>}
            subtitle="How we compare to self-hosting your own servers or using a generic cloud provider."
          />
          <ComparisonTable />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle
            title={<>Simple, <span className="text-emerald-300">Transparent Pricing</span></>}
            subtitle="Start free with local stdio servers. Upgrade when you need hosted, always-on SSE servers."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {pricingPlans.slice(0, 3).map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 ${
                  plan.badge ? "border-cyan-300/40 bg-cyan-500/5" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-6 rounded-full bg-cyan-400 px-3 py-1 text-[10px] font-black text-black">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-lg font-black text-white">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-white/45">/{plan.period}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/55">{plan.description}</p>
                <ul className="mt-4 space-y-1.5 text-xs text-white/60">
                  {plan.features.slice(0, 3).map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/pricing" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">
              Compare all plans, including Team, Business, and Enterprise →
            </Link>
          </div>
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title="Explore Resources" />
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/state-of-mcp" className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-cyan-300/30">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-500/10">
                  <BarChart3 className="h-5 w-5 text-emerald-200" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-200">State of MCP in India 2026</h3>
                  <p className="text-xs text-white/45">Market data, benchmarks & trends</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/58">
                Community research on MCP server growth, tooling trends, and architectural considerations for edge deployments. Illustrative examples for planning purposes.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-300">
                Read the report <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
            <Link href="/learn" className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-violet-300/30">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                  <BookOpen className="h-5 w-5 text-violet-200" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-violet-200">MCP Knowledge Hub</h3>
                  <p className="text-xs text-white/45">Guides on hosting, security, and deployment</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/58">
                Expert answers on hosting, latency, DPDP compliance, pricing in India, and enterprise MCP deployment. Optimized for voice search and AI retrieval.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-violet-300">
                Start learning <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
            <Link href="/docs" className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-amber-300/30">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-400/20 bg-amber-500/10">
                  <FileText className="h-5 w-5 text-amber-200" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-200">Documentation</h3>
                  <p className="text-xs text-white/45">Protocol, security, and deployment guides</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/58">
                Technical reference for building, hosting, and securing MCP servers — from your first stdio server to production HTTP/SSE deployments.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                Read the docs <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
            <Link href="/glossary" className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-pink-300/30">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-pink-400/20 bg-pink-500/10">
                  <Library className="h-5 w-5 text-pink-200" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-pink-200">Glossary</h3>
                  <p className="text-xs text-white/45">MCP and AI agent terminology explained</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/58">
                From "JSON-RPC" to "vector database" — clear definitions for every term you'll run into building with MCP.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-pink-300">
                Browse the glossary <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <FAQ items={homeFaqs} title="Frequently Asked Questions" />
        </Container>
      </DividerSection>

      <DividerSection className="pb-14">
        <Container>
          <CtaBanner />
        </Container>
      </DividerSection>
    </PageShell>
  );
}
