import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, BarChart3, BookOpen, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import {
  getEvidenceLedgerStats,
  getEvidenceSources,
  getPublishedServerProfiles,
} from "../../src/data/publishing";

const ORIGIN = "https://www.mcpserver.in";
const OBSERVATION_DATE = "2026-08-15";

export const metadata: Metadata = {
  title: "State of MCP — Methodology, Evidence & Limitations | MCPserver.in",
  description: "A methodology-first view of MCPserver.in's current evidence-reviewed dataset, with source scope, limitations and confidence stated explicitly.",
  alternates: { canonical: `${ORIGIN}/state-of-mcp/` },
  openGraph: {
    type: "article",
    url: `${ORIGIN}/state-of-mcp/`,
    title: "State of MCP — Methodology, Evidence & Limitations",
    description: "Research notes derived from the current evidence ledger without presenting illustrative market estimates as measured facts.",
    siteName: "MCPserver.in",
  },
};

export default function StateOfMcpPage() {
  const stats = getEvidenceLedgerStats();
  const profiles = getPublishedServerProfiles();
  const sources = profiles.flatMap((profile) => getEvidenceSources(profile.evidence)).filter((source, index, all) => source.url.startsWith("http") && all.findIndex((candidate) => candidate.id === source.id) === index);

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${ORIGIN}/state-of-mcp/#article`,
    url: `${ORIGIN}/state-of-mcp/`,
    headline: "State of MCP — Methodology, Evidence & Limitations",
    dateModified: OBSERVATION_DATE,
    author: { "@id": `${ORIGIN}/#organization` },
    publisher: { "@id": `${ORIGIN}/#organization` },
    isPartOf: { "@id": `${ORIGIN}/#website` },
  };

  return (
    <div className="min-h-screen bg-[#030711] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="border-b border-white/8 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,.11),transparent_27%),radial-gradient(circle_at_82%_12%,rgba(124,58,237,.18),transparent_31%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.06] px-3 py-1.5 text-xs font-bold text-violet-100"><BarChart3 className="h-3.5 w-3.5 text-cyan-300" /> Research layer · evidence before estimates</div>
          <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-[-0.045em] sm:text-6xl">State of MCP, without pretending the current sample is the whole market.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
            This page reports what MCPserver.in's current evidence ledger can actually support. It does not convert editorial examples, regional assumptions, or planning estimates into adoption statistics, latency benchmarks, deployment counts, or market-share claims.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric value={String(stats.totalEntities)} label="Tracked entity inventory" confidence="Inventory count" />
            <Metric value={String(stats.publishedProfiles)} label="Evidence-reviewed profiles" confidence="Primary-source cohort" />
            <Metric value={String(stats.needsEvidence)} label="Awaiting evidence" confidence="Not market absence" />
            <Metric value={OBSERVATION_DATE} label="Observation date" confidence="Current snapshot" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <ResearchCard icon={<BookOpen className="h-5 w-5" />} title="Methodology">
            <ol className="space-y-3 text-sm leading-6 text-white/58">
              <li><strong className="text-white/80">1. Inventory:</strong> preserve candidate identities without assuming their descriptive seed fields are verified.</li>
              <li><strong className="text-white/80">2. Source review:</strong> prefer official repositories, official documentation, package registries, or reproducible measurements.</li>
              <li><strong className="text-white/80">3. Claim binding:</strong> attach evidence to the specific fields or claims it supports.</li>
              <li><strong className="text-white/80">4. Publication:</strong> include a server in public feeds only after the shared indexability predicate passes.</li>
            </ol>
          </ResearchCard>

          <ResearchCard icon={<Scale className="h-5 w-5" />} title="What this sample can and cannot tell us">
            <div className="space-y-3 text-sm leading-6 text-white/58">
              <p><strong className="text-emerald-200">Can support:</strong> the current MCPserver.in inventory count, publication count, pending-evidence count, and the source-backed facts attached to the reviewed profiles.</p>
              <p><strong className="text-amber-200">Cannot support:</strong> total MCP ecosystem size, India adoption, deployment volume, request volume, regional latency, uptime, market share, customer usage, or comparative vendor performance.</p>
            </div>
          </ResearchCard>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-8">
          <div className="flex items-center gap-3"><FileCheck2 className="h-5 w-5 text-cyan-300" /><h2 className="text-2xl font-black">Primary sources represented in the current published cohort</h2></div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/52">These sources qualify specific server claims. Their presence does not imply endorsement of MCPserver.in or establish ecosystem-wide statistics.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {sources.map((source) => (
              <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-cyan-300/25">
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-300">{source.sourceType.replaceAll("-", " ")}</div>
                <div className="mt-2 font-black">{source.title}</div>
                <div className="mt-2 text-xs text-white/42">Publisher: {source.publisher}</div>
                <div className="mt-4 text-xs font-bold text-violet-300">Open source ↗</div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
          <ResearchCard icon={<ShieldCheck className="h-5 w-5" />} title="Current findings">
            <ul className="space-y-3 text-sm leading-6 text-white/58">
              <li>The production seed contains substantially more candidate identities than publication-qualified profiles.</li>
              <li>Three profiles currently have explicit primary-source evidence in the first Evidence Ledger cohort.</li>
              <li>The remaining tracked entities require source work before their authentication, capabilities, versions, install instructions, or security properties should be treated as public facts.</li>
              <li>Therefore the current ledger is suitable for publication-governance reporting, not for estimating the size or growth rate of the wider MCP ecosystem.</li>
            </ul>
          </ResearchCard>

          <div className="rounded-3xl border border-amber-300/15 bg-amber-400/[0.04] p-7">
            <div className="flex items-center gap-3"><AlertTriangle className="h-5 w-5 text-amber-300" /><h2 className="text-xl font-black">Limitations</h2></div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-white/55">
              <li>Not a census of all MCP servers.</li>
              <li>No production telemetry sample is included.</li>
              <li>No regional latency measurements are included.</li>
              <li>No customer or deployment data is included.</li>
              <li>Evidence freshness can change and requires periodic review.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-violet-300/20 bg-[linear-gradient(120deg,#101b49,#28136a_55%,#07172b)] p-8">
          <h2 className="text-3xl font-black">Research confidence follows the evidence, not the desired headline.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">As more server, client and integration records gain primary-source evidence, this page can expand its findings. Until then, unsupported dimensions remain explicitly unknown.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/servers/" className="rounded-lg bg-white px-4 py-2.5 text-sm font-black text-slate-950">Inspect Evidence Ledger</Link>
            <Link href="/editorial-policy/" className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold">Editorial methodology</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label, confidence }: { value: string; label: string; confidence: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/20 p-5"><div className="text-3xl font-black tracking-tight">{value}</div><div className="mt-2 text-sm font-bold text-white/78">{label}</div><div className="mt-1 text-xs text-white/36">{confidence}</div></div>;
}

function ResearchCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7"><div className="flex items-center gap-3 text-violet-300">{icon}<h2 className="text-2xl font-black text-white">{title}</h2></div><div className="mt-5">{children}</div></article>;
}
