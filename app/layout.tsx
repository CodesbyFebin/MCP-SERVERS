import type { Metadata } from "next";
import React from "react";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../src/index.css";
import ThemeAndAuthProvider from "../src/components/ThemeAndAuthProvider";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SchemaJsonLd from "../src/components/SchemaJsonLd";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const ORIGIN = "https://www.mcpserver.in";

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: {
    default: "MCPserver.in — Evidence-Backed MCP Server Discovery",
    template: "%s | MCPserver.in",
  },
  description: "Discover Model Context Protocol servers, integrations, clients, documentation and research with explicit source provenance and publication status.",
  keywords: ["MCP server", "Model Context Protocol", "MCP server directory", "MCP integrations", "MCP clients", "MCP evidence"],
  authors: [{ name: "MCPserver.in Editorial" }],
  creator: "MCPserver.in",
  publisher: "MCPserver.in",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", en: "/", "x-default": "/" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: `${ORIGIN}/`,
    siteName: "MCPserver.in",
    title: "MCPserver.in — Evidence-Backed MCP Server Discovery",
    description: "A provenance-aware directory and knowledge layer for Model Context Protocol servers, integrations and clients.",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

const globalGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${ORIGIN}/#organization`,
      name: "MCPserver.in",
      url: `${ORIGIN}/`,
      logo: `${ORIGIN}/logo.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      name: "MCPserver.in",
      url: `${ORIGIN}/`,
      publisher: { "@id": `${ORIGIN}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${ORIGIN}/mcp-server-directory/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
          </Script>
        )}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`} strategy="afterInteractive" />
        )}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}',{page_path:window.location.pathname});`}
          </Script>
        )}
      </head>
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}
        <ThemeAndAuthProvider>
          <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#050505] font-sans text-[#e0e0e0]">
            <SchemaJsonLd schema={globalGraph} />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeAndAuthProvider>
      </body>
    </html>
  );
}
