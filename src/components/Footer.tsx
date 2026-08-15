"use client";

import Link from "next/link";
import { Github, Heart, Mail } from "lucide-react";
import { BrandMark } from "./ReferenceLanding";

const columns = [
  {
    title: "Discover",
    links: [
      ["Evidence Ledger", "/servers/"],
      ["Directory", "/mcp-server-directory/"],
      ["Integrations", "/integrations/"],
      ["Clients", "/clients/"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Documentation", "/docs/"],
      ["What is MCP?", "/what-is-mcp/"],
      ["Learning Hub", "/learn/"],
      ["State of MCP", "/state-of-mcp/"],
    ],
  },
  {
    title: "Trust",
    links: [
      ["Editorial Policy", "/editorial-policy/"],
      ["Security", "/security/"],
      ["About", "/about/"],
      ["Contact", "/contact/"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy/"],
      ["Terms", "/terms/"],
    ],
  },
];

export default function Footer() {
  return (
    <footer id="app-footer" className="border-t border-white/10 bg-[#02050d] pt-10 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/50">
              A provenance-aware Model Context Protocol discovery and knowledge platform. Tracked inventory is kept separate from evidence-reviewed publication.
            </p>
            <div className="mt-5 flex gap-2">
              <a href="mailto:support@mcpserver.in" aria-label="Email MCPserver.in" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/70 transition hover:text-white">
                <Mail className="h-3.5 w-3.5" />
              </a>
              <a href="https://github.com/CodesbyFebin/MCP-SERVERS" target="_blank" rel="noopener noreferrer" aria-label="View MCPserver.in source on GitHub" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/70 transition hover:text-white">
                <Github className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-black text-white">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-xs text-white/50 transition hover:text-violet-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <span>© 2026 MCPserver.in. Evidence state may change as sources are reviewed.</span>
          <span className="inline-flex items-center gap-1.5">
            Built with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> in India
          </span>
        </div>
      </div>
    </footer>
  );
}
