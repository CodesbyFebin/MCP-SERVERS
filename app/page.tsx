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

export const metadata = {
  metadataBase: new URL("https://www.mcpserver.in"),
  title: {
    default: "MCPServer.in: Free MCP Servers in India | 10,000+ Verified Model Context Protocol",
    template: "%s | MCPServer.in"
  },
  description: "Deploy MCP servers from Mumbai & Bengaluru. DPDP compliant, <50ms latency. 100% free tier. SOC 2 certified. Connect Claude, ChatGPT, Cursor to 1000+ tools.",
  keywords: ["MCP server India", "Model Context Protocol hosting", "free MCP servers", "DPDP compliant AI tools", "MCP hosting Mumbai", "AI agent integration", "AI MCP servers", "AI tools India", "verified MCP servers"],
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
    title: "MCPServer.in: Free MCP Servers in India | 10,000+ Verified Model Context Protocol",
    description: "Deploy MCP servers from Mumbai & Bengaluru. DPDP compliant, <50ms latency. 100% free tier. SOC 2 certified. Connect Claude, ChatGPT, Cursor to 1000+ tools.",
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

export default function Home() {
  return (
    <PageShell id="homepage">
      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.48fr_0.52fr]">
            <div>
              <Badge>India-ready hosted MCP platform</Badge>
              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                10,000+ Verified MCP Servers. <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400 bg-clip-text text-transparent">
                  Hosted in India. DPDP & RBI Compliant.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68">
                Deploy LLM tools in &lt;50ms from Mumbai and Bengaluru edge nodes. India-first MCP infrastructure with automated data localization, consent management, and breach notification protocols.
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
            subtitle="Our MCP servers integrate with 1,000+ tools and platforms."
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
                232% server growth, top tools, latency benchmarks, and cost savings vs AWS Lambda. Original research from 500,000+ deployments.
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
                  <p className="text-xs text-white/45">50+ expert answers & guides</p>
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

      <DividerSection className="pb-14">
        <Container>
          <CtaBanner />
        </Container>
      </DividerSection>
    </PageShell>
  );
}
