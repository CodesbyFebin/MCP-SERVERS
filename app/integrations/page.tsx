import type { Metadata } from "next";
import {
  Badge,
  ApiConsole,
  Container,
  CtaBanner,
  DividerSection,
  EcosystemVisual,
  FeatureGrid,
  IntegrationCards,
  IntegrationRail,
  LogoCloud,
  PageShell,
  PrimaryButton,
  SearchPanel,
  SectionTitle,
  StatStrip
} from "../../src/components/ReferenceLanding";
import { ArrowRight, CheckCircle2, KeyRound, PlugZap, Settings2 } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Integrations - Connect Apps, APIs and Databases",
  description: "Browse MCP SERVER integrations for apps, APIs, databases, cloud platforms and developer tools.",
};

export default function IntegrationsPage() {
  return (
    <PageShell id="integrations-page">
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.43fr_0.57fr]">
            <div>
              <div className="text-xs font-bold text-violet-300">Home / Integrations</div>
              <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
                Integrate Anything. <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">Power Everything.</span>
              </h1>
               <p className="mt-6 max-w-xl text-base leading-relaxed text-white/68">
                 Connect apps, APIs, databases and services to MCP. Explore integrations across categories and use cases.
               </p>
              <div className="mt-7 grid grid-cols-4 gap-4 text-sm">
                {[
                   ["Growing", "Integrations"],
                   ["Multiple", "Categories"],
                   ["Several", "Enterprise Ready"],
                   ["Targeting", "High Uptime"]
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="font-black text-emerald-300">{value}</div>
                    <div className="mt-1 text-xs text-white/45">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <SearchPanel showTitle={false} />
              </div>
            </div>
            <EcosystemVisual variant="integrations" />
          </div>
        </Container>
      </section>

      <DividerSection>
        <Container>
          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-7">
            <SectionTitle title="How Integrations Work" subtitle="Connect your favorite tools in minutes." />
            <div className="grid gap-6 md:grid-cols-4">
              {[
                ["Choose Integration", "Browse from 1,000+ pre-built integrations.", PlugZap],
                ["Authenticate", "Securely connect your account in one click.", KeyRound],
                ["Configure", "Set permissions, map data and customize settings.", Settings2],
                ["Activate", "Start using the integration with your AI agents.", CheckCircle2]
              ].map(([title, body, Icon], index) => (
                <div key={title as string} className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-600 text-lg font-black text-white">{index + 1}</span>
                    {index < 3 && <ArrowRight className="hidden h-6 w-6 text-violet-300 md:block" />}
                  </div>
                  <Icon className="mb-3 h-7 w-7 text-cyan-300" />
                  <h3 className="text-sm font-black text-white">{title as string}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{body as string}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title="Browse by Category" />
          <IntegrationRail />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-white">Popular Integrations</h2>
            <a className="text-xs font-bold text-violet-300">View all integrations {"->"}</a>
          </div>
          <IntegrationCards />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <div className="grid gap-8 rounded-xl border border-white/10 bg-white/[0.025] p-7 lg:grid-cols-[0.46fr_0.54fr]">
            <div>
              <h2 className="text-2xl font-black text-white">Powerful Integration Capabilities</h2>
              <FeatureGrid
                items={[
                  { title: "Secure & OAuth 2.0", body: "Enterprise-grade security with OAuth 2.0, API keys and role-based access.", icon: KeyRound, accent: "cyan" },
                  { title: "Real-time Sync", body: "Bi-directional sync and real-time data updates.", icon: PlugZap, accent: "cyan" },
                  { title: "No-Code Connectors", body: "Connect your tools without writing a single line of code.", icon: Settings2, accent: "blue" },
                  { title: "Custom Workflows", body: "Build custom automation and workflows across integrations.", icon: CheckCircle2, accent: "violet" },
                  { title: "Data Mapping", body: "Map fields, transform data and create powerful pipelines.", icon: ArrowRight, accent: "pink" },
                  { title: "Monitoring & Logs", body: "Track usage, monitor health and debug with detailed logs.", icon: CheckCircle2, accent: "pink" }
                ]}
              />
            </div>
            <EcosystemVisual variant="compact" />
          </div>
        </Container>
      </DividerSection>

      <Container>
        <LogoCloud client />
      </Container>

      <DividerSection>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.32fr_0.48fr_0.2fr]">
            <div>
              <h2 className="text-2xl font-black text-white">For Developers</h2>
              <p className="mt-2 text-sm text-white/55">Integrate anything. Build everything.</p>
              <div className="mt-5 space-y-4 text-sm text-white/65">
                <div><span className="font-black text-white">Unified API</span><br />One API to connect all your tools and services.</div>
                <div><span className="font-black text-white">SDKs & Libraries</span><br />Official SDKs for Python, Node.js, Go and more.</div>
                <div><span className="font-black text-white">Webhooks</span><br />Real-time event notifications and webhooks.</div>
              </div>
            </div>
            <ApiConsole />
            <div className="grid gap-3">
              <StatStrip items={[                   ["Growing", "API Requests/Day"], ["Targeting", "API Uptime"], ["Multiple", "Regions"], ["Low", "Response Time"]]} />
              <PrimaryButton href="/docs">View API Documentation</PrimaryButton>
            </div>
          </div>
        </Container>
      </DividerSection>

      <DividerSection className="pb-14">
        <Container>
          <CtaBanner title="Can't find the integration you need?" subtitle="Request a new integration and we'll build it for you." primaryHref="/contact" primaryLabel="Request Integration" />
        </Container>
      </DividerSection>
    </PageShell>
  );
}
