import Link from "next/link";
import { ServerIntegration } from "../data/servers";
import { ShieldAlert, Cpu, ArrowRight } from "lucide-react";

export interface ServerCardProps {
  key?: any;
  server: ServerIntegration;
}

export default function ServerCard({ server }: ServerCardProps) {
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 p-5 flex flex-col justify-between transition-all duration-300 group shadow-lg hover:shadow-cyan-500/5 backdrop-blur-sm">
      <div>
        {/* Header Category & Auth tag */}
        <div className="flex items-center justify-between gap-2 text-[10px] uppercase font-bold tracking-wider mb-3">
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-white/55">
            {server.category}
          </span>
          <span className="flex items-center gap-1 text-cyan-400">
            <ShieldAlert className="w-3 h-3 text-cyan-450" />
            {server.auth.includes("OAuth") ? "OAuth Safe" : "Secure API"}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base font-display font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-500 shrink-0" />
          {server.name}
        </h4>

        {/* Description */}
        <p className="mt-2.5 text-xs text-white/50 leading-relaxed line-clamp-3">
          {server.description}
        </p>

        {/* Use Cases tags */}
        <div className="mt-4 flex flex-wrap gap-1">
          {server.useCases.slice(0, 2).map((uc, i) => (
            <span key={i} className="text-[10px] bg-white/[0.03] px-2 py-1 rounded text-white/45 border border-white/5 truncate max-w-[150px]">
              • {uc}
            </span>
          ))}
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400">
        <span className="text-white/40 group-hover:text-cyan-400/80 transition-colors">Setup Guide</span>
        <Link
          href={`/servers/${server.slug}`}
          className="inline-flex items-center gap-1 text-white/60 group-hover:text-cyan-400 transition-colors"
        >
          <span>View Integration</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
