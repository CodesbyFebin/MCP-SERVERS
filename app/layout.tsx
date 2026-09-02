import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { CANONICAL_ORIGIN } from "@/src/seo/breadcrumbs";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: "MCPserver.in — MCP Server Directory, Guides & Evidence",
    template: "%s — MCPserver.in",
  },
  description:
    "Explore Model Context Protocol servers, client setup guides, security guidance, troubleshooting and evidence-backed MCP ecosystem research.",
  openGraph: {
    siteName: "MCPserver.in",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <header className="border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto py-4 flex items-center justify-between">
              <Link
                href="/"
                className="text-2xl font-bold text-slate-900 dark:text-slate-100 no-underline"
              >
                MCPserver.in
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Public authority for MCP server discovery
              </p>
            </div>
          </header>
          <main className="container mx-auto py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
