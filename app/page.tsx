import {
  Badge,
  CodeDemo,
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
  SecondaryButton,
  SectionTitle,
  SecurityBand,
  StatStrip,
  Testimonials,
  UseCaseGrid
} from "../src/components/ReferenceLanding";
import { BarChart3, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Star } from "lucide-react";
import { getUnifiedGraphSchema } from "../src/lib/schema";
import SchemaJsonLd from "../src/components/SchemaJsonLd";
import FAQ from "../src/components/FAQ";

export const metadata = {
  metadataBase: new URL("https://www.mcpserver.in"),
  title: {
    default: "MCPServer.in: Free Hosted MCP Servers in India | 10,000+ Verified",
    template: "%s | MCPServer.in"
  },
  description: "India's largest MCP server platform. Host 10,000+ verified Model Context Protocol servers free. DPDP compliant, Mumbai/Bengaluru edge nodes. Deploy AI tools in <50ms.",
  keywords: ["MCP server India", "Model Context Protocol hosting", "free MCP servers", "DPDP compliant AI tools", "MCP hosting Mumbai", "AI agent integration", "AI MCP servers", "AI tools India", "verified MCP servers", "MCP deployment India", "low latency MCP hosting", "RBI compliant AI"],
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
    title: "MCPServer.in: Free Hosted MCP Servers in India | 10,000+ Verified",
    description: "India's largest MCP server platform. Host 10,000+ verified Model Context Protocol servers free. DPDP compliant, Mumbai/Bengaluru edge nodes. Deploy AI tools in <50ms.",
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
    answer: "MCPserver.in is India's first Model Context Protocol (MCP) platform. We provide a curated directory of 10,000+ verified MCP servers and free/paid hosting with DPDP-aligned data controls from Mumbai and Bengaluru edge nodes."
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
    answer: "Our Mumbai and Bengaluru edge nodes deliver median latencies under 50ms for regional traffic. Enterprise plans include dedicated nodes with SLA-backed uptime and zero cold starts."
  },
  {
    question: "Do I need to manage infrastructure?",
    answer: "No. MCPServer.in handles deployment, scaling, TLS, monitoring, and regional failover. You configure your MCP server, and we run it on India-first infrastructure."
  }
];

const unifiedGraphSchema = getUnifiedGraphSchema({
  pageUrl: "/",
  title: "MCPServer.in: Free Hosted MCP Servers in India",
  description: "India's largest MCP server platform with 10,000+ verified servers, DPDP compliance, and Mumbai/Bengaluru edge hosting.",
  breadcrumbs: [{ name: "Home", item: "/" }],
  faq: homeFaqs,
  article: {
    title: "MCPServer.in: Free Hosted MCP Servers in India",
    description: "India's largest MCP server platform with 10,000+ verified servers, DPDP compliance, and Mumbai/Bengaluru edge hosting.",
    authorName: "MCPserver.in Engineering",
    authorRole: "Platform Team",
    datePublished: "2025-11-05",
    dateModified: "2026-07-09"
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
              <div className="mt-6 flex items-center gap-4 text-xs text-white/55">
                <div className="flex -space-x-2">
                  {["R", "P", "A", "S", "D"].map((avatar) => (
                    <span key={avatar} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#030711] bg-gradient-to-br from-amber-300 to-violet-500 text-[10px] font-black text-white">
                      {avatar}
                    </span>
                  ))}
                </div>
                <div>
                  <div>Loved by developers and AI builders worldwide</div>
                  <div className="mt-1 flex items-center gap-1 text-amber-400">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-current" />
                    ))}
                    <span className="ml-1 text-white/70">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
            <EcosystemVisual />
          </div>
        </Container>
      </section>

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
                <p className="mt-3 space-y-3 text-white/60">
                  <p>MCP consists of two core components:</p>
                  <ul className="list-space-y-2 pl-4">
                    <li><strong className="text-cyan-300">MCP Host</strong> - The AI model or application that requests tools</li>
                    <li><strong className="text-cyan-300">MCP Client</strong> - The tool or server being accessed</li>
                  </ul>
                  <p>The protocol enables secure, real-time communication with automatic schema validation and consent management.</p>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white">Why MCP Matters</h3>
                <p className="mt-3 space-y-3 text-white/60">
                  <p>MCP eliminates vendor lock-in by providing:</p>
                  <ul className="list-space-y-2 pl-4">
                    <li><strong className="text-cyan-300">Interoperability</strong> - Connect any model to any tool</li>
                    <li><strong className="text-cyan-300">Extensibility</strong> - Build custom tools without modifying models</li>
                    <li><strong className="text-cyan-300">Security</strong> - Fine-grained permissions and audit trails</li>
                  </ul>
                </p>
              </div>
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
          <SectionTitle title="Loved by Builders Worldwide" />
          <Testimonials />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
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
