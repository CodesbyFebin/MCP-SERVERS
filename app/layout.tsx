import type { Metadata } from "next";
import React from "react";
import "../src/index.css";
import ThemeAndAuthProvider from "../src/components/ThemeAndAuthProvider";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SchemaJsonLd from "../src/components/SchemaJsonLd";
import { getOrganizationSchema, getWebSiteSchema, getWebApplicationSchema } from "../src/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mcpserver.in"),
  title: {
    default: "MCPserver.in — Hosted MCP Platform for AI Agents",
    template: "%s | MCPserver.in"
  },
  description: "Hosted MCP platform for discovering, deploying, securing and monitoring production MCP servers with India-focused edge and compliance controls.",
  keywords: ["MCP server hosting India", "hosted MCP platform", "DPDP compliant AI tools", "MCP servers Mumbai", "MCP servers Bengaluru", "low latency MCP India", "RBI compliant LLM tools", "MCP infrastructure India", "Model Context Protocol hosting"],
  authors: [{ name: "MCPserver.in Engineering" }],
  creator: "MCPserver.in",
  publisher: "MCPserver.in",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "en": "/",
    }
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
    title: "MCPserver.in — Hosted MCP Platform for AI Agents",
    description: "Hosted MCP platform for discovering, deploying, securing and monitoring production MCP servers with India-focused edge and compliance controls.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mcpserver_in",
    creator: "@mcpserver_in"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
              <SchemaJsonLd schema={getWebApplicationSchema()} />
              <SchemaJsonLd schema={getOrganizationSchema()} />
              <SchemaJsonLd schema={getWebSiteSchema()} />
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
