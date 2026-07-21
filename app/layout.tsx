import type { Metadata } from "next";
import React from "react";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../src/index.css";
import ThemeAndAuthProvider from "../src/components/ThemeAndAuthProvider";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SchemaJsonLd from "../src/components/SchemaJsonLd";
import { getOrganizationSchema, getWebSiteSchema, getWebApplicationSchema } from "../src/lib/schema";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mcpserver.in"),
  title: {
    default: "MCPserver.in — Hosted MCP Platform for AI Agents",
    template: "%s | MCPserver.in"
  },
  description: "Discover and deploy MCP servers. Hosted infrastructure for AI agents with India-region hosting and compliance features.",
  keywords: ["MCP server hosting India", "hosted MCP platform", "DPDP compliant AI tools", "MCP servers Mumbai", "MCP servers Bengaluru", "Model Context Protocol hosting"],
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
    description: "Discover and deploy MCP servers. Hosted infrastructure for AI agents with India-region hosting and compliance features.",
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        )}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        )}
      </head>
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
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
