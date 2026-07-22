import type { Metadata } from "next";
import { LockKeyhole, Network, ShieldCheck, Zap } from "lucide-react";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { Container, DividerSection, FeatureGrid, PageShell, SectionTitle, StatStrip } from "../../src/components/ReferenceLanding";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCPserver.in Features - Hosted MCP Infrastructure",
  description:
    "Explore MCPserver.in features for server discovery, managed hosting, zero-trust security, observability, India edge latency, and enterprise governance.",
  alternates: {
    canonical: "/features",
    languages: {
    "en-IN": "/features",
    "en": "/features",
        },
  },
};

export default function FeaturesPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/features",
    title: "MCPserver.in Features",
    description: "Explore MCPserver.in features for server discovery, managed hosting, zero-trust security, observability, India edge latency, and enterprise governance.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Features", item: "/features" }
    ],
    softwareApplication: {
      name: "MCPserver.in Hosted MCP Infrastructure",
      description: "Hosted infrastructure for MCP server discovery, deployment, security, observability, and governance."
    }
  });

  return (
    <PageShell id="features-page">
      <SchemaJsonLd schema={schema} />
      <section className="py-14">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-bold text-violet-200">
              <Zap className="h-3.5 w-3.5" />
              Platform Capabilities
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Everything needed to run MCP in production.</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/58">
              Discovery, deployment, gateway security, logs, latency dashboards, compliance controls, and India-first infrastructure in one operating surface.
            </p>
          </div>
          <div className="mt-8">
            <StatStrip items={[["Growing", "Server directory"], ["Expanding", "Guides & tutorials"], ["59", "Protocol pillars"], ["25", "Glossary terms"]]} />
          </div>
        </Container>
      </section>

      <DividerSection>
        <Container>
          <SectionTitle title="Core feature set" subtitle="Built for developers first, with enough control for enterprise platform teams." />
          <FeatureGrid
            items={[
              { title: "Server Directory", body: "Search verified MCP servers by category, auth model, and use case.", icon: "Boxes", accent: "cyan" },
              { title: "Hosted Runtime", body: "Deploy stdio and SSE servers behind managed HTTPS endpoints.", icon: "Rocket", accent: "violet" },
              { title: "Zero-Trust Gateway", body: "Validate auth, payloads, scopes, and tool policies before execution.", icon: "ShieldCheck", accent: "green" },
              { title: "India Edge", body: "Route traffic through Mumbai and Bengaluru for lower regional latency.", icon: "Globe2", accent: "amber" },
              { title: "Observability", body: "Track latency percentiles, errors, logs, traces, and audit events.", icon: "Activity", accent: "blue" },
              { title: "Workflows", body: "Compose server calls into governed multi-agent workflows.", icon: "Workflow", accent: "pink" },
            ]}
          />
        </Container>
      </DividerSection>

      <DividerSection className="pb-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Developer", "CLI install, config generation, local emulator, OpenAPI explorer.", Network],
              ["Security", "Secret isolation, CVE scans, redaction, audit logging, gVisor/Kata-ready runtime.", LockKeyhole],
              ["Enterprise", "RBAC, SSO/SAML, VPC peering, SLA reporting, DPDP/RBI evidence packs.", ShieldCheck],
            ].map(([title, body, Icon]) => (
              <div key={title as string} className="rounded-xl border border-white/10 bg-white/[0.035] p-6">
                <Icon className="h-6 w-6 text-cyan-300" />
                <h2 className="mt-5 text-lg font-black text-white">{title as string}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/58">{body as string}</p>
              </div>
            ))}
          </div>
        </Container>
      </DividerSection>
    </PageShell>
  );
}
