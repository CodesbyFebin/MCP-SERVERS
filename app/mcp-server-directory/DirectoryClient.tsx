import {
  Badge,
  Container,
  CtaBanner,
  DeployShowcase,
  DividerSection,
  EcosystemVisual,
  FeatureGrid,
  IntegrationRail,
  PageShell,
  PrimaryButton,
  SearchPanel,
  SecondaryButton,
  SectionTitle,
  StatStrip,
  Testimonials
} from "../../src/components/ReferenceLanding";
import { Cloud, Code2, Database, Layers3, MessageSquare, Rocket, Search, Server, ShieldCheck, ShoppingCart, Zap } from "lucide-react";

const categories = [
  ["AI Models", "356 Servers", Zap],
  ["Development", "1,234 Servers", Code2],
  ["Productivity", "1,876 Servers", ShoppingCart],
  ["Data & DB", "987 Servers", Database],
  ["DevOps", "765 Servers", Server],
  ["Cloud", "1,234 Servers", Cloud],
  ["Communication", "543 Servers", MessageSquare],
  ["Finance", "654 Servers", Layers3]
];

export default function DirectoryClient() {
  return (
    <PageShell id="directory-page">
      <section className="py-14 lg:py-18">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <Badge>The World's Largest MCP Ecosystem</Badge>
              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                Discover. Deploy. Scale. <br />
                <span className="bg-gradient-to-r from-blue-300 to-violet-400 bg-clip-text text-transparent">Everything MCP.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/68">
                Connect any AI agent to 10,000+ MCP servers. One API. Zero infrastructure. Infinite possibilities.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-4">
                {[
                  ["10,000+", "MCP Servers", Server],
                  ["One Click", "Deploy", Rocket],
                  ["Global", "Edge Network", ShieldCheck]
                ].map(([value, label, Icon]) => (
                  <div key={label as string} className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-cyan-300" />
                    <div>
                      <div className="text-sm font-black text-white">{value as string}</div>
                      <div className="text-xs text-white/45">{label as string}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/mcp-server-directory">Browse MCP Servers</PrimaryButton>
                <SecondaryButton href="/pricing">Deploy Your Server</SecondaryButton>
              </div>
            </div>
            <EcosystemVisual variant="compact" />
          </div>
        </Container>
      </section>

      <DividerSection className="bg-violet-950/10">
        <Container>
          <SearchPanel />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Explore by Category</h2>
            <a className="text-xs font-bold text-violet-300">View all categories {"->"}</a>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {categories.map(([title, count, Icon]) => (
              <div key={title as string} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-violet-500/12">
                  <Icon className="h-6 w-6 text-violet-300" />
                </div>
                <h3 className="mt-4 text-sm font-black text-white">{title as string}</h3>
                <p className="mt-1 text-xs text-white/45">{count as string}</p>
              </div>
            ))}
          </div>
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <DeployShowcase />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title={<>Connect with <span className="text-violet-300">1,000+ Integrations</span></>} subtitle="MCP servers for all your favorite tools and platforms." />
          <IntegrationRail />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title="The Complete MCP Platform" subtitle="Everything you need to discover, deploy and manage MCP servers at scale." />
          <FeatureGrid
            items={[
              { title: "Largest Registry", body: "10,000+ verified MCP servers across 100+ categories.", icon: Server, accent: "violet" },
              { title: "One API Gateway", body: "One endpoint to access thousands of MCP servers.", icon: Zap, accent: "cyan" },
              { title: "Hosted Infrastructure", body: "Global edge network with 99.9% uptime guarantee.", icon: Cloud, accent: "amber" },
              { title: "Enterprise Ready", body: "Advanced security, compliance and access controls.", icon: ShieldCheck, accent: "blue" },
              { title: "Developer First", body: "Open source friendly with SDKs and extensive docs.", icon: Code2, accent: "pink" },
              { title: "Marketplace", body: "Publish, monetize and discover premium MCP servers.", icon: Layers3, accent: "amber" }
            ]}
          />
          <div className="mt-10">
            <StatStrip items={[["10,000+", "MCP Servers"], ["50,000+", "Developers"], ["1M+", "API Requests/Day"], ["99.9%", "Uptime SLA"], ["100+", "Countries"]]} />
          </div>
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle eyebrow="How it works" title="Deploy in 4 Simple Steps" />
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Choose Server", "Browse or search from 10,000+ MCP servers in our registry.", Search],
              ["Configure", "Add your credentials and configure the server settings.", Zap],
              ["Deploy", "One click and we handle the infrastructure, scaling and security.", Cloud],
              ["Connect & Use", "Get your endpoint and start using with your AI agents.", Rocket]
            ].map(([title, body, Icon], index) => (
              <div key={title as string} className="rounded-xl border border-white/10 bg-white/[0.035] p-6">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-violet-600 text-sm font-black text-white">{index + 1}</div>
                <h3 className="mt-5 text-sm font-black text-white">{title as string}</h3>
                <p className="mt-2 min-h-16 text-xs leading-relaxed text-white/55">{body as string}</p>
                <Icon className="ml-auto h-12 w-12 text-white/35" />
              </div>
            ))}
          </div>
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title="Loved by Developers" subtitle="Join thousands of developers building with MCP." />
          <Testimonials />
        </Container>
      </DividerSection>

      <DividerSection className="pb-14">
        <Container>
          <CtaBanner title="Ready to Supercharge Your AI?" subtitle="Join the world's largest MCP ecosystem today." primaryHref="/register" primaryLabel="Get Started for Free" />
        </Container>
      </DividerSection>
    </PageShell>
  );
}
