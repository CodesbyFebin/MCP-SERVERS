"use client";

import Link from "next/link";
import { footerNav } from "../data/navigation";
import { Terminal, Heart } from "lucide-react";
import { siteConfig } from "../data/site";
import { useTheme } from "./ThemeAndAuthProvider";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer 
      id="app-footer" 
      className={`border-t pt-16 pb-12 text-sm relative z-10 transition-colors duration-200 ${
        isDark 
          ? "bg-black/40 border-white/5 text-white/50" 
          : "bg-slate-100 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Logo & Pitch */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-white" />
              </div>
              <span className={`font-sans font-bold tracking-tight text-base ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                MCP<span className="text-cyan-500">server</span>
              </span>
            </Link>
            <p className={`text-xs max-w-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
              Build, deploy, host, secure, and monitor Model Context Protocol (MCP) servers globally. 
              Our edge network delivers sub-50ms latency across Indian and international developer hubs, 
              connecting AI models directly and securely to local/remote files, databases, and SaaS APIs.
            </p>
            <div className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-slate-500"}`}>
              <p className={`font-semibold mb-1 ${isDark ? "text-gray-400" : "text-slate-700"}`}>
                {siteConfig.company.name}
              </p>
              <p>{siteConfig.company.address}</p>
              <p>Contact: {siteConfig.company.email}</p>
            </div>
          </div>

          {/* Links: Platform */}
          <div>
            <h4 className={`font-semibold mb-4 text-xs tracking-wider uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerNav.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cyan-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/mcp-monitoring" className="hover:text-cyan-500 transition-colors">
                  Server Monitor Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Resources */}
          <div>
            <h4 className={`font-semibold mb-4 text-xs tracking-wider uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerNav.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cyan-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Legal & Corporate */}
          <div>
            <h4 className={`font-semibold mb-4 text-xs tracking-wider uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cyan-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cyan-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/profile" className="hover:text-cyan-500 transition-colors">
                  Developer Profile Hub
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-cyan-500 transition-colors">
                  HTML Site Directory Map
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright block */}
        <div className={`border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? "border-white/5 text-white/30" : "border-slate-200 text-slate-500"
        }`}>
          <div>
            © {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 bg-black/5 px-3 py-1.5 rounded-full border border-white/5 text-gray-400">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            <span>in India</span>
            <span className="inline-block w-4 h-2.5 bg-gradient-to-b from-[#FF9933] via-white to-[#128807] rounded-sm"></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
