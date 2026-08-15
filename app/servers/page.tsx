import type { Metadata } from "next";
import Link from "next/link";
import {
  getEvidenceLedgerStats,
  getEvidenceSources,
  getPublishedServerProfiles,
} from "../../src/data/publishing";

export const metadata: Metadata = {
  title: "Evidence-Backed MCP Server Registry | MCPserver.in",
  description: "Browse MCP server profiles that have passed MCPserver.in's evidence review. Tracked inventory is kept separate from publication-qualified profiles.",
  alternates: { canonical: "https://www.mcpserver.in/servers/" },
  openGraph: {
    type: "website",
    url: "https://www.mcpserver.in/servers/",
    title: "Evidence-Backed MCP Server Registry | MCPserver.in",
    description: "A provenance-aware MCP server registry where public profiles require traceable evidence.",
    siteName: "MCPserver.in",
  },
};

export default function ServersPage() {
  const stats = getEvidenceLedgerStats();
  const profiles = getPublishedServerProfiles();

  return (
    <main className="min-h-screen bg-[#050712] text-white">
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,.18),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
              Evidence-backed registry
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              MCP server discovery with <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">provenance built in.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">
              Inventory is not the same as publication. MCPserver.in tracks candidate entities, then publishes a profile only after server-specific primary evidence is attached and reviewed.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <LedgerMetric value={stats.totalEntities} label="Known entities" detail="Tracked inventory" />
            <LedgerMetric value={stats.publishedProfiles} label="Evidence-reviewed" detail="Public profiles" />
            <LedgerMetric value={stats.needsEvidence} label="Awaiting evidence" detail="Noindex inventory" />
            <LedgerMetric value={stats.syntheticProfilesPublished} label="Synthetic profiles" detail="Published" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Published cohort</div>
            <h2 className="mt-2 text-3xl font-black">Evidence-reviewed MCP server profiles</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              These profiles are the only server entities included in the public server feed and server-page sitemap surface. Pending entities remain discoverable to editors but are not presented as verified facts.
            </p>
          </div>
          <Link href="/editorial-policy/" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">
            Read publication policy →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {profiles.map((profile) => {
            const sources = getEvidenceSources(profile.evidence).filter((source) => source.url.startsWith("http"));
            return (
              <article key={profile.server.slug} className="group rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,.86),rgba(8,11,24,.94))] p-6 transition hover:border-violet-300/30 hover:bg-white/[0.045]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-200">
                    Evidence reviewed
                  </span>
                  <span className="text-xs text-white/35">{profile.server.category}</span>
                </div>
                <h3 className="mt-5 text-2xl font-black">{profile.server.name}</h3>
                <p className="mt-3 min-h-24 text-sm leading-6 text-white/58">{profile.server.description}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-white/8 bg-black/20 p-3">
                    <dt className="text-white/35">Evidence</dt>
                    <dd className="mt-1 font-bold text-white/80">{profile.evidence.length} passages</dd>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/20 p-3">
                    <dt className="text-white/35">Reviewed</dt>
                    <dd className="mt-1 font-bold text-white/80">{profile.provenance.lastReviewed || "Unknown"}</dd>
                  </div>
                </dl>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <Link href={`/servers/${profile.server.slug}/`} className="font-bold text-cyan-300 group-hover:text-cyan-200">
                    View evidence →
                  </Link>
                  {sources[0] && (
                    <a href={sources[0].url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white/45 hover:text-white/70">
                      Primary source ↗
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-amber-300/15 bg-amber-400/[0.045] p-7 sm:p-8">
          <h2 className="text-2xl font-black">Why are most tracked entities not listed here?</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/58">
            The production seed contains candidate server identities and editorial descriptions, but those fields are not accepted as proof of authentication, capabilities, versions, security properties, or runtime behavior. Each pending entity stays out of the indexable public cohort until primary evidence is attached.
          </p>
        </div>
      </section>
    </main>
  );
}

function LedgerMetric({ value, label, detail }: { value: number; label: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur-sm">
      <div className="text-4xl font-black tracking-tight text-white">{value}</div>
      <div className="mt-2 text-sm font-bold text-white/80">{label}</div>
      <div className="mt-1 text-xs text-white/38">{detail}</div>
    </div>
  );
}
