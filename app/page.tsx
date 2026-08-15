import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Database,
  FileCheck2,
  GitBranch,
  Network,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  getEvidenceLedgerStats,
  getEvidenceSources,
  getPublishedServerProfiles,
} from "../src/data/publishing";

const ORIGIN = "https://www.mcpserver.in";

export const metadata: Metadata = {
  title: "MCP Server Directory with Evidence & Provenance | MCPserver.in",
  description: "Discover MCP servers through an evidence-led directory that separates tracked inventory from source-reviewed public profiles.",
  alternates: { canonical: `${ORIGIN}/` },
  openGraph: {
    type: "website",
    url: `${ORIGIN}/`,
    siteName: "MCPserver.in",
    title: "Discover MCP servers backed by evidence",
    description: "A provenance-aware MCP server directory with explicit publication and verification states.",
  },
};

export default function Home() {
  const stats = getEvidenceLedgerStats();
  const profiles = getPublishedServerProfiles();

  const itemList = profiles.map((profile, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${ORIGIN}/servers/${profile.server.slug}/`,
    name: `${profile.server.name} MCP Server`,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ORIGIN}/#webpage`,
        url: `${ORIGIN}/`,
        name: "MCP Server Directory with Evidence & Provenance",
        description: "Discover MCP servers through an evidence-led directory that separates tracked inventory from source-reviewed public profiles.",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        mainEntity: { "@id": `${ORIGIN}/#published-servers` },
      },
      {
        "@type": "ItemList",
        "@id": `${ORIGIN}/#published-servers`,
        name: "Evidence-reviewed MCP server profiles",
        numberOfItems: itemList.length,
        itemListElement: itemList,
      },
    ],
  };

  return (
    <div className="relative isolate overflow-hidden bg-[#030711] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,.16),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(124,58,237,.22),transparent_34%),linear-gradient(180deg,#030711_0%,#050a18_65%,transparent_100%)]" />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.06] px-3 py-1.5 text-xs font-bold text-violet-100">
            <FileCheck2 className="h-3.5 w-3.5 text-cyan-300" /> Evidence Ledger · provenance before publication
          </div>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Discover MCP servers <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400 bg-clip-text text-transparent">backed by evidence.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">
            MCPserver.in tracks server candidates, checks primary sources, and publishes only profiles that pass a shared evidence and verification policy. Missing facts stay missing instead of being filled with synthetic copy.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/servers/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-6 text-sm font-black shadow-[0_0_34px_rgba(124,58,237,.35)] transition hover:brightness-110">
              Explore evidence-reviewed servers <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/editorial-policy/" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] px-6 text-sm font-bold text-white/80 transition hover:bg-white/[0.06]">
              Review methodology
            </Link>
          </div>
        </div>

        <EvidenceNetwork />
      </section>

      <section className="border-y border-white/8 bg-black/15">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="mb-5 flex items-end justify-between gap-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Evidence Ledger</div>
              <h2 className="mt-1 text-2xl font-black">Inventory and publication are different states.</h2>
            </div>
            <Link href="/servers/" className="hidden text-sm font-bold text-violet-300 hover:text-violet-200 sm:inline-flex">Open registry →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric value={stats.totalEntities} label="Known entities" sub="tracked inventory" />
            <Metric value={stats.publishedProfiles} label="Evidence-reviewed" sub="public profiles" />
            <Metric value={stats.needsEvidence} label="Awaiting evidence" sub="kept out of index" />
            <Metric value={stats.syntheticProfilesPublished} label="Synthetic profiles" sub="published" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro eyebrow="Published cohort" title="Server profiles with traceable primary sources" body="The public cohort is deliberately smaller than the tracked inventory. Each profile below exposes its current evidence and source trail." />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {profiles.map((profile) => {
            const source = getEvidenceSources(profile.evidence).find((item) => item.url.startsWith("http"));
            return (
              <article key={profile.server.slug} className="rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,.86),rgba(7,10,22,.94))] p-6 shadow-xl shadow-black/20">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-200">Verified evidence</span>
                  <span className="text-xs text-white/35">{profile.server.category}</span>
                </div>
                <h3 className="mt-5 text-2xl font-black">{profile.server.name}</h3>
                <p className="mt-3 min-h-24 text-sm leading-6 text-white/58">{profile.server.description}</p>
                <div className="mt-5 rounded-xl border border-white/8 bg-black/20 p-3 text-xs text-white/50">
                  {profile.evidence.length} evidence passage{profile.evidence.length === 1 ? "" : "s"} · reviewed {profile.provenance.lastReviewed || "date unknown"}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <Link href={`/servers/${profile.server.slug}/`} className="font-bold text-cyan-300 hover:text-cyan-200">Inspect evidence →</Link>
                  {source && <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white/40 hover:text-white/65">Source ↗</a>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro eyebrow="Publication pipeline" title="Entity → evidence → verification → publication" body="SEO and AI discovery happen after the evidence decision, not before it." />
          <div className="mt-9 grid gap-4 md:grid-cols-4">
            {[
              ["01", "Track entity", "Record a stable identity and category without treating editorial seed copy as proof.", Boxes],
              ["02", "Attach sources", "Prefer official repositories, documentation, package registries, or reproducible measurements.", Search],
              ["03", "Verify claims", "Link each public assertion to evidence and leave unsupported fields unknown.", ShieldCheck],
              ["04", "Publish once", "One indexability policy controls pages, sitemap, LLM indexes, feeds and public counts.", GitBranch],
            ].map(([num, title, body, Icon]) => (
              <article key={title as string} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between"><span className="text-xs font-black text-violet-300">{num as string}</span><Icon className="h-5 w-5 text-cyan-300" /></div>
                <h3 className="mt-5 text-lg font-black">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-white/52">{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">
        <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-8">
          <div className="flex items-center gap-3 text-cyan-300"><Network className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.18em]">Protocol layer</span></div>
          <h2 className="mt-4 text-3xl font-black">How MCP connects clients and capabilities</h2>
          <p className="mt-4 text-sm leading-7 text-white/58">
            Model Context Protocol uses a host-client-server architecture. An MCP client maintains a connection to a server, discovers exposed capabilities, and exchanges structured JSON-RPC messages over supported transports. MCPserver.in documents that ecosystem; it does not treat generic protocol behavior as proof that a specific server implements a feature.
          </p>
          <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex text-sm font-bold text-cyan-300 hover:text-cyan-200">Read primary MCP documentation ↗</a>
        </article>

        <article className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,.18),transparent_38%),rgba(255,255,255,.025)] p-7 sm:p-8">
          <div className="flex items-center gap-3 text-violet-300"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.18em]">Research & learning</span></div>
          <h2 className="mt-4 text-3xl font-black">Use the directory as a map, not a marketing scoreboard.</h2>
          <p className="mt-4 text-sm leading-7 text-white/58">
            Explore integrations, client compatibility, documentation, glossary concepts, and State of MCP research. Research pages should disclose methodology, sources, time period and limitations rather than mixing illustrative market numbers into the operational registry.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/integrations/" className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold">Integrations</Link>
            <Link href="/clients/" className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold">Clients</Link>
            <Link href="/state-of-mcp/" className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold">State of MCP</Link>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="overflow-hidden rounded-3xl border border-violet-300/20 bg-[linear-gradient(120deg,#101b49,#28136a_55%,#07172b)] p-8 sm:p-10">
          <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Transparent by design</div>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Inspect the evidence, not just the card.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/64">Public server profiles expose sources, review state and traceable claims. Pending inventory remains explicitly pending.</p>
            </div>
            <Link href="/servers/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950">Open Evidence Ledger <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function EvidenceNetwork() {
  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-3xl border border-violet-300/20 bg-[#071020]/80 p-6 shadow-[0_0_80px_rgba(88,28,135,.24)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,.28),transparent_37%),radial-gradient(circle_at_18%_24%,rgba(34,211,238,.12),transparent_24%)]" />
      <div className="relative flex min-h-[340px] items-center justify-center">
        <div className="absolute left-3 top-8 space-y-3 sm:left-7">
          <Node icon={<Search className="h-4 w-4" />} title="Sources" detail="official docs · repos" />
          <Node icon={<FileCheck2 className="h-4 w-4" />} title="Evidence" detail="claim-level support" />
          <Node icon={<Database className="h-4 w-4" />} title="Inventory" detail="known entities" />
        </div>
        <div className="absolute right-3 top-8 space-y-3 text-right sm:right-7">
          <Node icon={<ShieldCheck className="h-4 w-4" />} title="Verification" detail="review state" align="right" />
          <Node icon={<GitBranch className="h-4 w-4" />} title="Publication" detail="one policy" align="right" />
          <Node icon={<Network className="h-4 w-4" />} title="Discovery" detail="web · agents" align="right" />
        </div>
        <div className="absolute left-[24%] right-[24%] top-1/2 h-px bg-gradient-to-r from-cyan-400/20 via-violet-400/75 to-cyan-400/20" />
        <div className="relative grid h-40 w-40 place-items-center rounded-[2rem] border border-violet-300/50 bg-gradient-to-br from-blue-900 via-violet-700 to-fuchsia-950 shadow-[0_0_55px_rgba(168,85,247,.52)]">
          <div className="absolute -inset-9 -z-10 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="text-center"><div className="text-4xl font-black">MCP</div><div className="mt-1 text-sm font-bold tracking-[0.16em] text-violet-100">EVIDENCE LEDGER</div></div>
        </div>
      </div>
    </div>
  );
}

function Node({ icon, title, detail, align = "left" }: { icon: React.ReactNode; title: string; detail: string; align?: "left" | "right" }) {
  return (
    <div className={`flex w-36 items-center gap-2 rounded-xl border border-white/10 bg-black/35 p-3 backdrop-blur-sm ${align === "right" ? "flex-row-reverse" : ""}`}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-cyan-300/15 bg-cyan-400/[0.07] text-cyan-300">{icon}</span>
      <span className={align === "right" ? "text-right" : ""}><span className="block text-xs font-black">{title}</span><span className="block text-[10px] text-white/38">{detail}</span></span>
    </div>
  );
}

function Metric({ value, label, sub }: { value: number; label: string; sub: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><div className="text-4xl font-black tracking-tight">{value}</div><div className="mt-2 text-sm font-bold text-white/80">{label}</div><div className="mt-1 text-xs text-white/38">{sub}</div></div>;
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="max-w-3xl"><div className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">{eyebrow}</div><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2><p className="mt-3 text-sm leading-7 text-white/55">{body}</p></div>;
}
