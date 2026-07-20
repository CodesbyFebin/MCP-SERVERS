"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Github, Heart, Mail, Twitter } from "lucide-react";
import { BrandMark } from "./ReferenceLanding";

const columns = [
  {
    title: "Platform",
    links: [
      ["MCP Servers", "/mcp-server-directory"],
      ["Integrations", "/integrations"],
      ["Clients", "/clients"],
      ["Pricing", "/pricing"],
      ["Status", "/status"]
    ]
  },
  {
    title: "Resources",
    links: [
      ["Documentation", "/docs"],
      ["API Reference", "/docs"],
      ["SDKs", "/tools/mcp-playground"],
      ["Guides", "/what-is-mcp"],
      ["Learn Hub", "/learn"],
      ["State of MCP 2026", "/state-of-mcp"],
      ["Blog", "/blog"]
    ]
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Careers", "/contact"],
      ["Press Kit", "/about"],
      ["Contact Us", "/contact"],
      ["Partner Program", "/pricing"]
    ]
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Security", "/security"],
      ["Data Processing", "/privacy"],
      ["DPA", "/terms"]
    ]
  }
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Subscription failed.");
        setStatus("error");
      } else {
        setMessage(data.message || "Subscribed!");
        setStatus("success");
        setEmail("");
      }
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  };
  return (
    <footer id="app-footer" className="border-t border-white/10 bg-[#02050d] pt-10 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[1.5fr_repeat(4,1fr)_1.25fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/50">
              A hosted MCP platform for connecting verified servers and integrations to power your AI agents.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Twitter, href: "https://twitter.com/mcpserver_in" },
                { Icon: Mail, href: "mailto:support@mcpserver.in" },
                { Icon: Github, href: "https://github.com/CodesbyFebin/MCP-SERVERS" }
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/70 transition hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-xs font-black text-white">{column.title}</h4>
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

          <div>
            <h4 className="mb-3 text-xs font-black text-white">Newsletter</h4>
            <p className="text-xs leading-relaxed text-white/50">Get the latest updates, tutorials and new integrations.</p>
            <div className="mt-4 flex overflow-hidden rounded-md border border-white/12 bg-white/[0.025]">
              <form onSubmit={handleSubscribe} className="flex w-full min-h-10">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent px-3 text-xs text-white outline-none placeholder:text-white/30"
                  placeholder="Enter your email"
                  autoComplete="email"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="grid w-11 place-items-center border-l border-white/10 text-white/75 disabled:opacity-40"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
            {message && (
              <p className={`mt-2 text-[11px] ${status === "error" ? "text-red-400" : "text-emerald-400"}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© 2026 MCP SERVER. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> in India
            <span className="inline-block h-2.5 w-4 rounded-sm bg-gradient-to-b from-[#FF9933] via-white to-[#128807]" />
          </span>
        </div>
      </div>
    </footer>
  );
}
