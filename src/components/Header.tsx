"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerNav } from "../data/navigation";
import { Terminal, Star, Menu, X, Sun, Moon, User } from "lucide-react";
import { useState } from "react";
import { useTheme, useAuth } from "./ThemeAndAuthProvider";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const isDark = theme === "dark";

  // Extend header navigations to include dynamic monitoring link
  const navItems = [
    ...headerNav,
    { name: "Monitoring", href: "/mcp-monitoring" }
  ];

  return (
    <header 
      id="app-header" 
      className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-200 ${
        isDark 
          ? "bg-[#050505]/75 border-white/5 text-white" 
          : "bg-white/80 border-slate-200 text-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-4">
            <Link id="logo-link" href="/" className="flex items-center gap-2 hover:opacity-90">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className={`font-sans font-bold tracking-tight text-lg ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                MCP<span className="text-cyan-500">server</span>
              </span>
            </Link>

            {/* Indian Flag Status Badge */}
            <div id="flag-badge" className={`hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs ${
              isDark ? "bg-white/[0.03] border-white/5 text-white/50" : "bg-slate-100 border-slate-200 text-slate-600"
            }`}>
              <span className="inline-block w-3 h-2 bg-gradient-to-b from-[#FF9933] via-white to-[#128807] rounded-sm"></span>
              MCP Infrastructure Platform
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  id={`nav-item-${item.href.replace("/", "") || "home"}`}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-cyan-500 bg-cyan-500/10"
                      : isDark
                        ? "text-white/60 hover:text-cyan-400"
                        : "text-slate-600 hover:text-cyan-600"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Theme Toggle, Star on GitHub, Auth Portal */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-200 ${
                isDark 
                  ? "border-white/10 bg-white/[0.03] text-amber-400 hover:bg-white/10" 
                  : "border-slate-200 bg-slate-50 text-purple-600 hover:bg-slate-100"
              }`}
              title="Toggle color theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="https://github.com/mcpserver-in/mcpserver"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs transition-all duration-200 ${
                isDark
                  ? "border-white/10 bg-white/[0.03] text-white/85 hover:bg-white/10"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Star (12.6k)</span>
            </a>
            
            {/* User Session Action Button */}
            {user ? (
              <Link
                id="profile-btn"
                href="/profile"
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
                  isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                }`}
              >
                <User className="w-3.5 h-3.5 text-cyan-500" />
                <span>{user.name}</span>
              </Link>
            ) : (
              <Link
                id="login-btn"
                href="/login"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-full transition-all duration-200 shadow-md"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger & Theme Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-200 ${
                isDark 
                  ? "border-white/10 bg-white/[0.03] text-amber-400 hover:bg-white/10" 
                  : "border-slate-200 bg-slate-50 text-purple-600 hover:bg-slate-100"
              }`}
            >
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${
                isDark ? "text-white/60 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-menu" className={`lg:hidden border-b px-4 pt-2 pb-4 space-y-1 ${
          isDark ? "bg-[#050505] border-white/5" : "bg-white border-slate-200"
        }`}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide ${
                  isActive
                    ? "text-cyan-500 bg-cyan-500/10"
                    : isDark
                      ? "text-white/60 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            <a
              href="https://github.com/mcpserver-in/mcpserver"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-xs ${
                isDark ? "border-white/10 bg-white/[0.03] text-white" : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Star on GitHub (12.6k)</span>
            </a>

            {user ? (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className={`text-center px-4 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 ${
                  isDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-800"
                }`}
              >
                <User className="w-4 h-4 text-cyan-500" />
                <span>My Profile ({user.name})</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-2 rounded-full bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400"
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
