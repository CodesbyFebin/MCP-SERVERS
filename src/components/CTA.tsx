import Link from "next/link";
import { ArrowRight, BookOpen, Terminal } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta-section" className="relative overflow-hidden bg-[#050508] py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyan-950/10 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-900/40 p-8 backdrop-blur-md sm:p-12">
          <div className="pointer-events-none absolute right-0 top-0 h-[200px] w-[200px] rounded-full bg-cyan-500/5 blur-3xl" />

          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Explore MCP profiles with the evidence attached.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Use the evidence-backed registry to inspect publication state, primary sources, and the claims currently supported for each public MCP server profile.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              id="cta-explore"
              href="/servers/"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 sm:w-auto"
            >
              <Terminal className="h-4 w-4" />
              Browse evidence-reviewed servers
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              id="cta-methodology"
              href="/editorial-policy/"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-800 bg-gray-950 px-6 py-3 text-sm font-semibold text-gray-300 transition-all hover:bg-gray-900 sm:w-auto"
            >
              <BookOpen className="h-4 w-4 text-cyan-400" />
              Read publication methodology
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Inventory is not publication. Unsupported fields remain unknown until evidence is reviewed.
          </p>
        </div>
      </div>
    </section>
  );
}
