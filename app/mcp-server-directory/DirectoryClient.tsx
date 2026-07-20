"use client";

import { useMemo, useState } from "react";
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
  SecondaryButton,
  SectionTitle,
  Testimonials
} from "../../src/components/ReferenceLanding";
import {
  BarChart3,
  Boxes,
  Cloud,
  Code2,
  Database,
  Globe2,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Zap
} from "lucide-react";
import ServerCard from "../../src/components/ServerCard";
import { servers } from "../../src/data/servers";

const categoryIcons: Record<string, typeof Boxes> = {
  "Developer Tools": Code2,
  Databases: Database,
  Productivity: Boxes,
  Finance: Zap,
  "AI Models": Server,
  Observability: BarChart3,
  Cloud: Cloud,
  "Web Tools": Globe2
};

const categoryCounts = servers.reduce<Record<string, number>>((acc, server) => {
  acc[server.category] = (acc[server.category] || 0) + 1;
  return acc;
}, {});

const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

export default function DirectoryClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return servers.filter((server) => {
      const matchesCategory = !activeCategory || server.category === activeCategory;
      const matchesQuery =
        !q ||
        server.name.toLowerCase().includes(q) ||
        server.category.toLowerCase().includes(q) ||
        server.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <PageShell id="directory-page">
      <section className="py-14 lg:py-18">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <Badge>Curated MCP Server Directory</Badge>
              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                Discover. Deploy. Scale. <br />
                <span className="bg-gradient-to-r from-blue-300 to-violet-400 bg-clip-text text-transparent">Everything MCP.</span>
              </h1>
               <p className="mt-6 max-w-xl text-base leading-relaxed text-white/68">
                 Connect any AI agent to MCP servers. One API. Growing directory of {servers.length} integrations across {categories.length} categories.
               </p>
              <div className="mt-7 grid grid-cols-3 gap-4">
               {[
                   ["Curated", "MCP Servers", Server],
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
                <PrimaryButton href="#browse">Browse MCP Servers</PrimaryButton>
                <SecondaryButton href="/pricing">Deploy Your Server</SecondaryButton>
              </div>
            </div>
            <EcosystemVisual variant="compact" />
          </div>
        </Container>
      </section>

      <DividerSection className="bg-violet-950/10" id="browse">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-5 text-center text-2xl font-black text-white">
              Search <span className="text-violet-300">MCP</span> Servers
            </h2>
            <div className="flex items-center overflow-hidden rounded-lg border border-white/15 bg-white shadow-lg shadow-violet-950/20">
              <Search className="ml-4 h-4 w-4 shrink-0 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-12 min-w-0 flex-1 px-3 text-sm text-slate-800 outline-none"
                placeholder="Search for MCP servers, tools, apps..."
              />
            </div>
          </div>
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Browse by Category</h2>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-xs font-bold text-violet-300 hover:text-violet-200"
              >
                Clear filter (&times;)
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {categories.map(([name, count]) => {
              const Icon = categoryIcons[name] ?? Boxes;
              const isActive = activeCategory === name;
              return (
                <button
                  key={name}
                  onClick={() => setActiveCategory(isActive ? null : name)}
                  className={`rounded-xl border p-5 text-center transition ${
                    isActive
                      ? "border-cyan-300/50 bg-cyan-500/10"
                      : "border-white/10 bg-white/[0.035] hover:border-violet-300/30"
                  }`}
                >
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-violet-500/12">
                    <Icon className="h-6 w-6 text-violet-300" />
                  </div>
                  <h3 className="mt-4 text-sm font-black text-white">{name}</h3>
                  <p className="mt-1 text-xs text-white/45">{count} servers</p>
                </button>
              );
            })}
          </div>
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-white">
              {activeCategory || query ? `${filtered.length} result${filtered.length === 1 ? "" : "s"}` : `All ${servers.length} servers`}
            </h2>
          </div>
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/50">
              No servers match &quot;{query}&quot;. Try a different search term or clear the category filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((server) => (
                <ServerCard key={server.slug} server={server} />
              ))}
            </div>
          )}
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <DeployShowcase />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title={<>Connect with <span className="text-violet-300">Real Integrations</span></>} subtitle="MCP servers for all your favorite tools and platforms." />
          <IntegrationRail />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle title="The Complete MCP Platform" subtitle="Everything you need to discover, deploy and manage MCP servers at scale." />
          <FeatureGrid
            items={[
               { title: "Curated Registry", body: `A curated set of ${servers.length} MCP servers across ${categories.length} categories.`, icon: "Server", accent: "violet" },
              { title: "One API Gateway", body: "One endpoint to access a growing set of MCP servers.", icon: "Zap", accent: "cyan" },
               { title: "Hosted Infrastructure", body: "Managed edge hosting for MCP server workloads.", icon: "Cloud", accent: "amber" },
              { title: "Enterprise Ready", body: "Advanced security, compliance and access controls.", icon: "ShieldCheck", accent: "blue" },
              { title: "Developer First", body: "Open source friendly with SDKs and extensive docs.", icon: "Code2", accent: "pink" },
              { title: "Marketplace", body: "Publish, monetize and discover premium MCP servers.", icon: "Layers3", accent: "amber" }
            ]}
          />
        </Container>
      </DividerSection>

      <DividerSection>
        <Container>
          <SectionTitle eyebrow="How it works" title="Deploy in 4 Simple Steps" />
          <div className="grid gap-4 md:grid-cols-4">
            {[
               ["Choose Server", "Browse or search from our curated set of MCP servers.", Search],
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
          <SectionTitle title="Loved by Developers" subtitle="Feedback from developers building with MCP." />
          <Testimonials />
        </Container>
      </DividerSection>

      <DividerSection className="pb-14">
        <Container>
          <CtaBanner title="Ready to Supercharge Your AI?" subtitle="Join the MCP directory today." primaryHref="/register" primaryLabel="Get Started for Free" />
        </Container>
      </DividerSection>
    </PageShell>
  );
}
