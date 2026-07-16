import type { Metadata } from "next";
import React from "react";
import "../src/index.css";
import ThemeAndAuthProvider from "../src/components/ThemeAndAuthProvider";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mcpserver.in"),

  title: {
    default: "MCPserver.in — Discover, Build and Deploy MCP Servers",
    template: "%s | MCPserver.in"
  },

  description:
    "Discover, build, test, deploy, secure and monitor MCP servers for AI agents, developers, startups and enterprises.",

  alternates: {
    canonical: "/"
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico"
  },

  openGraph: {
    type: "website",
    url: "https://www.mcpserver.in",
    siteName: "MCPserver.in",
    title: "MCPserver.in — MCP Infrastructure for AI Agents",
    description:
      "Discover, build, deploy and manage production MCP servers."
  },

  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <ThemeAndAuthProvider>
          <div className="flex flex-col min-h-screen bg-[#050505] text-[#e0e0e0] font-sans relative overflow-x-hidden transition-colors duration-200">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[400px] bg-cyan-950/20 rounded-full blur-[120px] pointer-events-none z-0 dark:opacity-100 opacity-30"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[400px] bg-purple-950/20 rounded-full blur-[120px] pointer-events-none z-0 dark:opacity-100 opacity-30"></div>
            <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
            
            {/* Main Content wrapper */}
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeAndAuthProvider>
      </body>
    </html>
  );
}
