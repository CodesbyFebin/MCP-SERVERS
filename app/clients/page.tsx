import type { Metadata } from "next";
import {
  Badge,
  ClientCaseStudies,
  clientStats,
  Container,
  CtaBanner,
  DividerSection,
  EcosystemVisual,
  FeatureGrid,
  LogoCloud,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  SectionTitle,
  StatStrip,
  Testimonials
} from "../../src/components/ReferenceLanding";
import {
  BadgeCheck,
  Cloud,
  Database,
  GraduationCap,
  HeartPulse,
  Plane,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Wrench
} from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Clients - Trusted by Innovators",
  description: "See companies, client stories and industries using MCP SERVER to power AI agents at scale.",
  alternates: {
    canonical: "/clients",
    languages: {
      "en-IN": "/clients",
      "en": "/clients",
        }
  },

};

export default function ClientsPage() {
  return (
    <PageShell id="clients-page">
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.45fr_0.55fr]">
            <div>
              <div className="text-xs font-bold text-violet-300">Home / Clients</div>
              <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
                Trusted by Innovators. <br />
                Powering <span className="bg-gradient-to-r from-blue-300 to-violet-400 bg-clip-text text-transparent">Real-World AI.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/68">
                Thousands of companies, startups and developers use MCP SERVER to connect, build and scale AI agents with confidence.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  ["Production Ready", "Enterprise grade infrastructure", BadgeCheck],
                  ["Secure & Compliant", "SOC 2, GDPR ready and encrypted", ShieldCheck],
                  ["Scalable & Reliable", "High uptime and global edge network", Cloud],
                   ["Loved by Developers", "A growing community of builders", Wrench]
                ].map(([title, body, Icon]) => (
                  <div key={title as string} className="flex gap-3">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                    <div>
                      <div className="text-xs font-black text-white">{title as string}</div>
                      <div className="mt-1 text-[11px] leading-relaxed text-white/45">{body as string}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/mcp-server-directory">Explore MCP Servers</PrimaryButton>
                <SecondaryButton href="/contact">Book a Demo</SecondaryButton>
              </div>
            </div>
            <EcosystemVisual variant="clients" />
          </div>
        </Container>
      </section>

      <DividerSection className="pt-0">
        <Container>
          <StatStrip items={clientStats} />
        </Container>
      </DividerSection>

      <Container>
        <LogoCloud client />
      </Container>

      <DividerSection>
        <Container>
          <ClientCaseStudies />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title="What Our Clients Love" subtitle="Real feedback from developers, engineers and founders." />
          <Testimonials client />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title="Why Clients Choose MCP SERVER" subtitle="Everything you need to build, connect and scale AI with confidence." />
          <FeatureGrid
            items={[
              { title: "Easy Integration", body: "One API. Connect to a growing directory of tools, apps and data sources.", icon: "Sparkles", accent: "cyan" },
              { title: "Enterprise Security", body: "SOC 2, GDPR ready with end-to-end encryption and access control.", icon: "ShieldCheck", accent: "violet" },
              { title: "Global Infrastructure", body: "Hosted on a global edge network for low latency and high availability.", icon: "Cloud", accent: "green" },
              { title: "Developer First", body: "Beautiful APIs, SDKs, docs and tools that developers love.", icon: "Code2", accent: "pink" },
              { title: "Scalable by Design", body: "From prototypes to millions of requests, we scale with you.", icon: "Database", accent: "cyan" },
              { title: "Active Support", body: "24/7 expert support from real engineers who care.", icon: "Zap", accent: "violet" }
            ]}
          />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-7">
            <SectionTitle title="Industries We Serve" />
            <div className="grid grid-cols-2 gap-5 text-center md:grid-cols-5 lg:grid-cols-10">
              {[
                ["Fintech", Database],
                ["EdTech", GraduationCap],
                ["Healthcare", HeartPulse],
                ["Retail & Ecommerce", ShoppingCart],
                ["Logistics", Truck],
                ["SaaS", Cloud],
                ["Media", Sparkles],
                ["Travel", Plane],
                ["Manufacturing", Wrench],
                ["Government", BadgeCheck]
              ].map(([label, Icon]) => (
                <div key={label as string}>
                  <Icon className="mx-auto h-7 w-7 text-violet-300" />
                  <div className="mt-3 text-xs font-semibold text-white/75">{label as string}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </DividerSection>

      <DividerSection className="pb-14">
        <Container>
          <CtaBanner title="Start Building With MCP" subtitle="Build smarter AI agents. Integrate anything. Scale everything." primaryHref="/integrations" primaryLabel="Start Integrating Now" />
        </Container>
      </DividerSection>
    </PageShell>
  );
}
