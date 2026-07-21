"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { ArrowRight, Search } from "lucide-react";

export interface DocsSearchItem {
  title: string;
  description: string;
  category: string;
  href: string;
}

export default function DocsSearch({ items }: { items: DocsSearchItem[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.3 },
          { name: "category", weight: 0.2 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [items]
  );

  const trimmed = query.trim();
  const results = trimmed.length > 1 ? fuse.search(trimmed).slice(0, 8) : [];

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 transition focus-within:border-cyan-400/40 focus-within:bg-white/[0.06]">
        <Search className="h-4 w-4 shrink-0 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search documentation..."
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          aria-label="Search documentation"
        />
      </div>

      {results.length > 0 && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-[#0a0a12] shadow-2xl shadow-black/50">
          {results.map(({ item }) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setQuery("")}
              className="flex items-start justify-between gap-3 border-b border-white/5 px-4 py-3 transition last:border-b-0 hover:bg-cyan-400/[0.06]"
            >
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-cyan-300">{item.category}</div>
                <div className="truncate text-sm font-bold text-white">{item.title}</div>
                <div className="mt-0.5 line-clamp-1 text-xs text-slate-400">{item.description}</div>
              </div>
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-500" />
            </Link>
          ))}
        </div>
      )}

      {trimmed.length > 1 && results.length === 0 && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border border-white/10 bg-[#0a0a12] px-4 py-3 text-xs text-slate-500">
          No docs match &ldquo;{trimmed}&rdquo;.
        </div>
      )}
    </div>
  );
}
