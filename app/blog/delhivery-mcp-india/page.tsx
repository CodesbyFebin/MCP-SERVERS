import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "delhivery-mcp-india";
const TITLE = "Delhivery Maps MCP Server: Tools and Setup";
const DESCRIPTION =
  "Delhivery's official Maps MCP server gives AI agents geocoding, address validation, routing, distance matrices and toll estimates for Indian addresses. Endpoint, tools and setup.";
const REVIEWED = "2026-09-23";
const PORTAL = "https://www.delhivery.com/maps/developer";
const ENDPOINT = "https://gateway-maps-pub-int.delhivery.com/mcp";

const TOOLS: [string, string][] = [
  ["geocode_address", "Address to coordinates"],
  ["reverse_geocode", "Coordinates to address"],
  ["standardize_address", "Clean up and normalise an address"],
  ["validate_address", "Check an address is valid"],
  ["verify_address", "Verify an address"],
  ["auto_suggest", "Address suggestions as you type"],
  ["route", "Route between points"],
  ["compute_distance_matrix", "Distances between many origins and destinations"],
  ["calculate_tolls", "Toll estimate for a route"],
];

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in/blog/${SLUG}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      title={TITLE}
      h1="Delhivery MCP Server (Delhivery Maps)"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Delhivery publishes an official MCP server for Delhivery Maps, its location platform, at ${ENDPOINT}. It gives AI agents nine tools for Indian addresses and logistics: geocoding, reverse geocoding, address standardisation and validation, autosuggest, routing, distance matrices and toll calculation. It is for location intelligence, not for booking or tracking your Delhivery shipments.`}
      sections={[
        {
          id: "tools",
          heading: "The 9 tools",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">Tool</th>
                    <th className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {TOOLS.map(([n, d]) => (
                    <tr key={n}>
                      <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">{n}</td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <P>
                Sign in to the <Ext href={PORTAL}>Delhivery Maps developer portal</Ext>. It shows an
                MCP configuration with a bearer token that, per the portal, is &ldquo;automatically
                generated from your active browser session.&rdquo; The server URL is:
              </P>
              <Code>{ENDPOINT}</Code>
              <P>
                For Claude Desktop, paste the portal&apos;s configuration into{" "}
                <code>claude_desktop_config.json</code>; for Cursor, add it under Settings → MCP.
                Restart the client and the tools appear. Because the token comes from a browser
                session, expect to refresh it when it expires.
              </P>
            </>
          ),
        },
        {
          id: "geonaksha",
          heading: "GeoNaksha",
          body: (
            <P>
              Several of the APIs are powered by GeoNaksha, which Delhivery describes as an LLM that
              &ldquo;understands raw address context and automatically completes missing
              parts&rdquo; and is &ldquo;trained on billions of delivery addresses.&rdquo; That is
              the reason to use it over a generic geocoder: messy Indian addresses with landmarks
              and missing PIN codes.
            </P>
          ),
        },
        {
          id: "uses",
          heading: "Where it helps",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Cleaning up addresses in an order export before dispatch</li>
              <li>Checking serviceability questions that depend on exact location</li>
              <li>Estimating distances and tolls for delivery planning</li>
              <li>Letting a support assistant confirm a customer&apos;s address</li>
            </ul>
          ),
        },
        {
          id: "limits",
          heading: "Limits",
          body: (
            <P>
              The portal says you can test the APIs and run live requests for free; it did not
              show production pricing or rate limits on the page we reviewed. Addresses are
              personal data, so check what you send and to which AI provider.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Delhivery Maps developer portal",
          url: PORTAL,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://gateway-maps-pub-int.delhivery.com/mcp; bearer token generated from the browser session; 9 tools (geocode_address, standardize_address, route, compute_distance_matrix, reverse_geocode, auto_suggest, validate_address, verify_address, calculate_tolls); Claude Desktop and Cursor setup; free testing; GeoNaksha description.",
          limitations: "No pricing or rate limits shown. The per-tool purposes in the table are inferred from the tool names.",
        },
      ]}
      faqs={[
        {
          question: "Does Delhivery have an official MCP server?",
          answer: "Yes, for Delhivery Maps. It exposes location and address tools, not shipment booking or tracking.",
        },
        {
          question: "Can I track a Delhivery parcel with it?",
          answer: "No. None of its nine tools track shipments.",
        },
        {
          question: "How do I authenticate?",
          answer: "With a bearer token shown in the Delhivery Maps developer portal, generated from your signed-in browser session.",
        },
        {
          question: "Is it free?",
          answer: "The portal says you can test the APIs and run live requests for free. Production pricing was not shown.",
        },
        {
          question: "What is GeoNaksha?",
          answer: "Delhivery's LLM for address understanding, which it says is trained on billions of delivery addresses.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-india-ecommerce", label: "MCP for Indian e-commerce" },
        { href: "/blog/swiggy-mcp-india", label: "Swiggy MCP servers" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
