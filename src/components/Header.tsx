"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { headerNav } from "../data/navigation";
import { BrandMark } from "./ReferenceLanding";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header id="app-header" className="sticky top-0 z-50 border-b border-white/10 bg-[#02050d]/90 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[70px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-5">
            <BrandMark />
            <Link href="/servers/" className="hidden items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/[0.05] px-3 py-1.5 text-[11px] font-bold text-cyan-100 md:inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.8)]" />
              Evidence-led MCP directory
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {headerNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-md px-3 py-2 text-xs font-bold transition ${
                    active ? "bg-violet-500/15 text-white" : "text-white/68 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.name}
                  {active && <span className="absolute inset-x-3 -bottom-[15px] h-px bg-violet-400 shadow-[0_0_16px_2px_rgba(167,139,250,0.9)]" />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="https://github.com/CodesbyFebin/MCP-SERVERS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/15 bg-white/[0.025] px-3 text-xs font-bold text-white transition hover:bg-white/[0.06]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <Link href="/servers/" className="inline-flex min-h-10 items-center rounded-md bg-gradient-to-r from-blue-500 to-violet-600 px-4 text-xs font-black text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition hover:brightness-110">
              Evidence Ledger
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.03] text-white lg:hidden"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="border-t border-white/10 bg-[#02050d] px-4 py-4 lg:hidden">
          <div className="space-y-1">
            {headerNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-md px-3 py-3 text-sm font-bold ${active ? "bg-violet-500/15 text-white" : "text-white/68 hover:bg-white/[0.04] hover:text-white"}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 border-t border-white/10 pt-4">
            <a href="https://github.com/CodesbyFebin/MCP-SERVERS" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.025] text-xs font-bold text-white">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <Link href="/servers/" onClick={() => setIsOpen(false)} className="inline-flex min-h-10 items-center justify-center rounded-md bg-violet-600 text-xs font-black text-white">
              Evidence Ledger
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
