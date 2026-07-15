import Link from "next/link";
import { Link2, ArrowUpRight } from "lucide-react";
import { RelatedLink } from "../lib/internalLinks";

export interface RelatedPagesProps {
  links: RelatedLink[];
}

export default function RelatedPages({ links }: RelatedPagesProps) {
  return (
    <div className="p-6 rounded-xl bg-gray-900/20 border border-gray-900 mt-8">
      <h4 className="text-sm font-sans font-semibold text-white mb-4 flex items-center gap-2">
        <Link2 className="w-4 h-4 text-cyan-400" />
        Recommended Reading & Resources
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="p-3.5 rounded-lg bg-gray-950/40 border border-gray-900 hover:border-cyan-500/30 hover:bg-cyan-950/10 text-xs text-gray-300 hover:text-white transition-all flex items-center justify-between gap-3 group"
          >
            <span className="truncate pr-1">{link.title}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
