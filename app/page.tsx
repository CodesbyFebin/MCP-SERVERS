"use client";

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
import { Star } from "lucide-react";

export default function Home() {
  return (
    <PageShell id="homepage">
      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.48fr_0.52fr]">
            <div>
              <Badge>The World's Largest Hosted MCP Platform</Badge>
              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                10,000+ MCP Servers. <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400 bg-clip-text text-transparent">
                  One API. Infinite Possibilities.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68">
                Discover, deploy and connect to 10,000+ Model Context Protocol servers. Fully hosted. Zero setup. Built for AI agents and the future of automation.
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

      <DividerSection className="pb-14">
        <Container>
          <CtaBanner />
        </Container>
      </DividerSection>
    </PageShell>
  );
}
