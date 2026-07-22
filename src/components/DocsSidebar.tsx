"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import type { DocsCluster, DocsPage } from "../data/docs";
import { getDocsPath } from "../data/docs";

interface DocsSidebarProps {
  clusters: DocsCluster[];
  pages: DocsPage[];
}

function NavTree({ clusters, pages, activePath, onNavigate }: DocsSidebarProps & { activePath: string; onNavigate?: () => void }) {
  const pagesByCluster = useMemo(() => {
    const map = new Map<string, { title: string; href: string }[]>();
    for (const page of pages) {
      const href = getDocsPath(page);
      const list = map.get(page.category) ?? [];
      list.push({ title: page.title, href });
      map.set(page.category, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return map;
  }, [pages]);

  const [openClusters, setOpenClusters] = useState<Set<string>>(() => {
    const activeCluster = clusters.find((cluster) =>
      (pagesByCluster.get(cluster.slug) ?? []).some((p) => p.href === activePath)
    );
    return new Set(activeCluster ? [activeCluster.slug] : []);
  });

  const toggleCluster = (slug: string) => {
    setOpenClusters((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <nav className="space-y-1">
      <Link
        href="/docs"
        onClick={onNavigate}
        className={`block rounded-md px-3 py-2 text-sm font-bold transition ${
          activePath === "/docs" ? "bg-cyan-400/10 text-cyan-200" : "text-white hover:bg-white/[0.04]"
        }`}
      >
        Documentation Home
      </Link>

      {clusters.map((cluster) => {
        const clusterPages = pagesByCluster.get(cluster.slug) ?? [];
        if (clusterPages.length === 0) return null;
        const isOpen = openClusters.has(cluster.slug);

        return (
          <div key={cluster.slug} className="pt-1">
            <button
              type="button"
              onClick={() => toggleCluster(cluster.slug)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-400 hover:text-white"
              aria-expanded={isOpen}
            >
              <span>{cluster.title}</span>
              <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="ml-2 space-y-0.5 border-l border-white/10 pl-3">
                {clusterPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={onNavigate}
                    className={`block rounded-md px-2 py-1.5 text-xs transition ${
                      activePath === page.href
                        ? "bg-cyan-400/10 font-semibold text-cyan-200"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default function DocsSidebar({ clusters, pages }: DocsSidebarProps) {
  const pathname = usePathname();
  const activePath = pathname?.endsWith("/") ? pathname.slice(0, -1) || "/" : pathname ?? "/docs";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <NavTree clusters={clusters} pages={pages} activePath={activePath} />
        </div>
      </aside>

      {/* Mobile toggle */}
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Menu className="h-4 w-4" />
          Browse Documentation
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-[#0a0a12] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Documentation</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <NavTree clusters={clusters} pages={pages} activePath={activePath} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
