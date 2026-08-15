import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getEvidenceSources,
  getPublishedServerProfiles,
  getServerPublicationProfile,
  isServerIndexable,
} from "../../../src/data/publishing";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ORIGIN = "https://www.mcpserver.in";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPublishedServerProfiles().map((profile) => ({ slug: profile.server.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getServerPublicationProfile(slug);
  if (!profile || !isServerIndexable(profile)) {
    return {
      title: "MCP Server Profile Not Found | MCPserver.in",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `${ORIGIN}/servers/${slug}/`;
  const title = `${profile.server.name} MCP Server — Evidence & Sources | MCPserver.in`;
  const description = profile.server.description;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "MCPserver.in",
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServerPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getServerPublicationProfile(slug);
  if (!profile || !isServerIndexable(profile)) notFound();

  const canonical = `${ORIGIN}/servers/${slug}/`;
  const sources = getEvidenceSources(profile.evidence).filter((source) => source.url.startsWith("http"));
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: `${profile.server.name} MCP Server — Evidence & Sources`,
        description: profile.server.description,
        isPartOf: { "@id": `${ORIGIN}/#website` },
        about: { "@id": `${canonical}#entity` },
      },
      {
        "@type": "Thing",
        "@id": `${canonical}#entity`,
        name: `${profile.server.name} MCP Server`,
        description: profile.server.description,
        sameAs: sources.map((source) => source.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "MCP Servers", item: `${ORIGIN}/servers/` },
          { "@type": "ListItem", position: 3, name: profile.server.name, item: canonical },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050712] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
        <Link href="/servers/" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          ← Evidence-backed registry
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-violet-300/20 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,.18),transparent_42%),linear-gradient(145deg,rgba(15,23,42,.94),rgba(8,11,25,.96))] p-7 shadow-2xl shadow-black/35 sm:p-10">
            <div className="inline-flex rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
              Evidence reviewed
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">{profile.server.name} MCP Server</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/68">{profile.server.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <LedgerField label="Verification" value="Verified" />
              <LedgerField label="Evidence passages" value={String(profile.evidence.length)} />
              <LedgerField label="Last reviewed" value={profile.provenance.lastReviewed || "Unknown"} />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-lg font-bold">Provenance</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <LedgerRow label="Category" value={profile.server.category} />
              <LedgerRow label="Authentication" value={profile.server.auth || "Unknown"} />
              <LedgerRow label="Version" value={profile.latestVerifiedVersion || "Unknown"} />
              <LedgerRow label="Repository" value={profile.repositoryUrl ? "Primary source linked" : "Unknown"} />
            </dl>
            {profile.repositoryUrl && (
              <a className="mt-6 inline-flex text-sm font-bold text-cyan-300 hover:text-cyan-200" href={profile.repositoryUrl} rel="noopener noreferrer" target="_blank">
                Open official source ↗
              </a>
            )}
          </aside>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <h2 className="text-2xl font-black">Evidence ledger</h2>
            <div className="mt-5 space-y-4">
              {profile.evidence.map((item) => {
                const source = sources.find((source) => source.id === item.sourceId);
                return (
                  <article key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">Verified evidence</div>
                    <p className="mt-2 text-sm leading-6 text-white/65">{item.text}</p>
                    {source && (
                      <a href={source.url} rel="noopener noreferrer" target="_blank" className="mt-3 inline-flex text-xs font-bold text-cyan-300 hover:text-cyan-200">
                        {source.publisher}: {source.title} ↗
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <h2 className="text-2xl font-black">Traceable claims</h2>
            <div className="mt-5 space-y-4">
              {profile.claims.map((claim) => (
                <article key={claim.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm leading-6 text-white/68">{claim.text}</p>
                  <div className="mt-3 text-xs text-white/40">Evidence refs: {claim.evidenceIds.length}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {profile.capabilities.length > 0 && (
          <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <h2 className="text-2xl font-black">Documented capabilities</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.capabilities.map((capability) => (
                <span key={capability} className="rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-3 py-1.5 text-sm text-cyan-100">
                  {capability}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function LedgerField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <dt className="text-xs uppercase tracking-[0.13em] text-white/38">{label}</dt>
      <dd className="mt-2 text-base font-bold text-white/85">{value}</dd>
    </div>
  );
}

function LedgerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-4 last:border-0 last:pb-0">
      <dt className="text-white/42">{label}</dt>
      <dd className="max-w-[60%] text-right font-semibold text-white/78">{value}</dd>
    </div>
  );
}
