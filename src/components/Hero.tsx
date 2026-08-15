import Link from "next/link";
import { Terminal, BookOpen, ShieldCheck } from "lucide-react";
import { getEvidenceLedgerStats } from "../data/publishing";

export default function Hero() {
  const stats = getEvidenceLedgerStats();

  return (
    <section id="hero-section" className="relative overflow-hidden bg-transparent pb-16 pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-7xl -translate-x-1/2">
        <div className="absolute left-[20%] top-[-10%] h-[450px] w-[450px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute right-[20%] top-[10%] h-[450px] w-[450px] rounded-full bg-purple-600/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          Evidence Ledger · provenance before publication
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-7xl">
          Discover MCP servers
          <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            backed by evidence.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
          MCPserver.in separates tracked inventory from publication-qualified profiles. Public server facts require traceable evidence; unsupported fields remain unknown.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            id="hero-explore-cta"
            href="/servers/"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-transform hover:scale-[1.02] sm:w-auto"
          >
            <Terminal className="h-4 w-4" />
            Explore evidence-reviewed servers
          </Link>

          <Link
            id="hero-methodology-cta"
            href="/editorial-policy/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            <BookOpen className="h-4 w-4 text-purple-300" />
            Read methodology
          </Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-6 border-t border-white/5 pt-10 md:grid-cols-4">
          <Metric value={stats.totalEntities} label="Known entities" />
          <Metric value={stats.publishedProfiles} label="Evidence-reviewed" />
          <Metric value={stats.needsEvidence} label="Awaiting evidence" />
          <Metric value={stats.syntheticProfilesPublished} label="Synthetic profiles published" />
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-white/40">{label}</div>
    </div>
  );
}
