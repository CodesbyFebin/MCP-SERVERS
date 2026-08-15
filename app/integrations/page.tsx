import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2, KeyRound, Link2, ShieldCheck } from "lucide-react";
import {
  getEvidenceLedgerStats,
  getEvidenceSources,
  getPublishedServerProfiles,
} from "../../src/data/publishing";

const ORIGIN = "https://www.mcpserver.in";

export const metadata: Metadata = {
  title: "Evidence-Reviewed MCP Integrations | MCPserver.in",
  description: "Explore MCP integration profiles whose provider, authentication, capabilities and source trail have been reviewed against primary evidence.",
  alternates: { canonical: `${ORIGIN}/integrations/` },
  openGraph: {
    type: "website",
    url: `${ORIGIN}/integrations/`,
    title: "Evidence-Reviewed MCP Integrations",
    description: "Integration discovery with explicit source provenance and verification state.",
    siteName: "MCPserver.in",
  },
};

export default function IntegrationsPage() {
  const profiles = getPublishedServerProfiles();
  const stats = getEvidenceLedgerStats();
  const itemList = profiles.map((profile, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${profile.server.name} MCP integration`,
    url: `${ORIGIN}/servers/${profile.server.slug}/`,
  }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${ORIGIN}/integrations/#webpage`,
    url: `${ORIGIN}/integrations/`,
    name: "Evidence-Reviewed MCP Integrations",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: itemList.length,
      itemListElement: itemList,
    },
  };

  return (
    <div className="min-h-screen bg-[#030711] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="border-b border-white/8 bg-[radial-gradient(circle_at_72%_18%,rgba(124,58,237,.18),transparent_30%),radial-gradient(circle_at_12%_12%,rgba(34,211,238,.11),transparent_25%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.06] px-3 py-1.5 text-xs font-bold text-violet-100"><Link2 className="h-3.5 w-3.5 text-cyan-300" /> Integration evidence</div>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.045em] sm:text-6xl">Integrations whose claims can be traced.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
              An integration card is public only when the related MCP server profile passes the same Evidence Ledger publication gate used by the registry. Provider names, authentication, capabilities and documentation are not inferred from marketing seed data.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            <Metric value={profiles.length} label="Evidence-reviewed integrations" />
            <Metric value={stats.needsEvidence} label="Tracked server entities awaiting evidence" />
            <Metric value={stats.syntheticProfilesPublished} label="Synthetic profiles published" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {profiles.map((profile) => {
            const sources = getEvidenceSources(profile.evidence).filter((source) => source.url.startsWith("http"));
            return (
              <article key={profile.server.slug} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-200">Evidence reviewed</span>
                  <span className="text-xs text-white/35">{profile.server.category}</span>
                </div>
                <h2 className="mt-5 text-2xl font-black">{profile.server.name}</h2>
                <p className="mt-3 min-h-24 text-sm leading-6 text-white/56">{profile.server.description}</p>

                <div className="mt-5 space-y-3 text-sm">
                  <Fact icon={<KeyRound className="h-4 w-4" />} label="Authentication" value={profile.server.auth || "Unknown"} />
                  <Fact icon={<ShieldCheck className="h-4 w-4" />} label="Verification" value={profile.verificationState} />
                  <Fact icon={<FileCheck2 className="h-4 w-4" />} label="Evidence" value={`${profile.evidence.length} verified passage${profile.evidence.length === 1 ? "" : "s"}`} />
                </div>

                {profile.capabilities.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {profile.capabilities.map((capability) => <span key={capability} className="rounded-full border border-cyan-300/15 bg-cyan-400/[0.06] px-2.5 py-1 text-xs text-cyan-100">{capability}</span>)}
                  </div>
                ) : (
                  <div className="mt-5 text-xs text-white/38">Capabilities not asserted beyond the current evidence set.</div>
                )}

                <div className="mt-6 flex items-center justify-between gap-3">
                  <Link href={`/servers/${profile.server.slug}/`} className="font-bold text-cyan-300 hover:text-cyan-200">Inspect server evidence →</Link>
                  {sources[0] && <a href={sources[0].url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white/42 hover:text-white/65">Documentation ↗</a>}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-amber-300/15 bg-amber-400/[0.04] p-7 sm:p-8">
          <h2 className="text-2xl font-black">Why is the public integration catalog intentionally small?</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/56">
            The repository contains a broader editorial integration inventory, but its transport, authentication and capability fields are not automatically treated as primary evidence. Those records remain outside this public evidence-reviewed collection until sourced.
          </p>
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/20 p-5"><div className="text-3xl font-black">{value}</div><div className="mt-2 text-xs font-bold text-white/55">{label}</div></div>;
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-black/20 p-3"><span className="mt-0.5 text-violet-300">{icon}</span><span><span className="block text-[10px] uppercase tracking-[0.12em] text-white/32">{label}</span><span className="mt-1 block text-sm font-semibold text-white/72">{value}</span></span></div>;
}
