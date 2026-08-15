import Link from "next/link";
import { ArrowRight, BookOpen, FileCheck2, Network, ShieldCheck } from "lucide-react";
import { getEvidenceSources, getPublishedServerProfiles } from "../data/publishing";

/**
 * Evidence-led supplemental homepage content.
 * Server links, counts, descriptions, and provenance come from the same
 * publication-qualified profiles used by /servers, sitemap, feeds, and LLM
 * discovery surfaces.
 */
export default function HomepageComprehensiveContent() {
  const profiles = getPublishedServerProfiles();

  return (
    <div className="text-white/80">
      <section className="border-t border-white/10 bg-gradient-to-b from-[#030711] via-[#080d1e] to-[#040711] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300">
              <FileCheck2 className="h-4 w-4" /> Evidence before publication
            </span>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              A directory that distinguishes <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400 bg-clip-text text-transparent">inventory from verified profiles.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
              MCPserver.in records candidate entities for editorial review, but public server discovery is generated only from records that pass the shared Evidence Ledger policy. A source supports only the fields or claims it actually documents.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {profiles.map((profile) => {
              const sources = getEvidenceSources(profile.evidence).filter((source) => source.url.startsWith("http"));
              return (
                <article key={profile.server.slug} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-200">
                      <ShieldCheck className="h-3.5 w-3.5" /> Evidence reviewed
                    </span>
                    <span className="text-xs text-white/35">{profile.server.category}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-white">{profile.server.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{profile.server.description}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/8 bg-black/20 p-3">
                      <dt className="text-white/35">Verified evidence</dt>
                      <dd className="mt-1 font-bold text-white/80">{profile.evidence.filter((evidence) => evidence.status === "verified").length}</dd>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-black/20 p-3">
                      <dt className="text-white/35">Last reviewed</dt>
                      <dd className="mt-1 font-bold text-white/80">{profile.provenance.lastReviewed ?? "Unknown"}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link href={`/servers/${profile.server.slug}/`} className="inline-flex items-center gap-1 text-sm font-bold text-cyan-300 hover:text-cyan-200">
                      Inspect profile <ArrowRight className="h-4 w-4" />
                    </Link>
                    {sources[0] && (
                      <a href={sources[0].url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white/40 hover:text-white/65">
                        Source ↗
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#040814] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <Network className="h-5 w-5 text-cyan-300" />
            <h2 className="mt-4 text-xl font-black text-white">Protocol concepts stay separate from server evidence</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              General MCP documentation can explain protocol concepts, but it is not used as proof that a specific third-party server implements a capability.
            </p>
            <Link href="/what-is-mcp/" className="mt-5 inline-flex text-sm font-bold text-cyan-300">What is MCP? →</Link>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <BookOpen className="h-5 w-5 text-violet-300" />
            <h2 className="mt-4 text-xl font-black text-white">Evidence is claim-specific</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Repository identity, authentication, transport, version, compatibility, security, and measurements require appropriate supporting sources rather than record-wide assumptions.
            </p>
            <Link href="/editorial-policy/" className="mt-5 inline-flex text-sm font-bold text-violet-300">Publication methodology →</Link>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            <h2 className="mt-4 text-xl font-black text-white">Unknown stays unknown</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Missing versions, repositories, compatibility results, benchmarks, or operational properties are omitted or labelled unknown until evidence is available.
            </p>
            <Link href="/servers/" className="mt-5 inline-flex text-sm font-bold text-emerald-300">Open the registry →</Link>
          </article>
        </div>
      </section>
    </div>
  );
}
