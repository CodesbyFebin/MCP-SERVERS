import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "indian-railways-mcp-india";
const TITLE = "Indian Railways MCP Servers: PNR, Trains";
const DESCRIPTION =
  "Indian Railways has no official MCP server. Community servers give AI assistants train search, seat availability, fares, PNR and live status. How they work, setup, and caveats.";
const REVIEWED = "2026-09-23";
const RISHI = "https://github.com/RishiMaddheshiya/indian_railway_mcp-server";
const AMITH = "https://github.com/amith-vp/indian-railway-mcp";

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
      h1="Indian Railways MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="Indian Railways and IRCTC have not published an MCP server. Several open-source community servers let an AI assistant search trains between stations, check seat availability and fares, look up PNR status and follow live running status. They get data from unofficial sources, are read-only, and cannot book tickets."
      sections={[
        {
          id: "options",
          heading: "Two community servers compared",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    {["", "RishiMaddheshiya/indian_railway_mcp-server", "amith-vp/indian-railway-mcp"].map((h) => (
                      <th key={h} className="border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  <tr><td className="px-4 py-2 font-medium">Runs</td><td className="px-4 py-2">Locally (Node.js)</td><td className="px-4 py-2">Hosted endpoint, via mcp-remote</td></tr>
                  <tr><td className="px-4 py-2 font-medium">Tools</td><td className="px-4 py-2">Station search, trains between stations, schedule, seat availability, fare, PNR, journey planning</td><td className="px-4 py-2">Train search, seat availability, train info, live status, delay info, live station, station/train codes</td></tr>
                  <tr><td className="px-4 py-2 font-medium">Data sources</td><td className="px-4 py-2">ConfirmTkt and eRail (unofficial, key-free); optional RapidAPI aggregator</td><td className="px-4 py-2">Not stated in the README</td></tr>
                  <tr><td className="px-4 py-2 font-medium">Licence</td><td className="px-4 py-2">MIT</td><td className="px-4 py-2">Not stated</td></tr>
                  <tr><td className="px-4 py-2 font-medium">Booking</td><td className="px-4 py-2">No (&ldquo;cannot book, cancel or pay&rdquo;)</td><td className="px-4 py-2">No booking tools</td></tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "local",
          heading: "Setup: local server",
          body: (
            <>
              <P>
                <Ext href={RISHI}>RishiMaddheshiya/indian_railway_mcp-server</Ext> is TypeScript.
                Clone it, then:
              </P>
              <Code>{`npm install
npm start`}</Code>
              <P>Claude Desktop config from its README (use your absolute path):</P>
              <Code>{`{
  "mcpServers": {
    "irctc": {
      "command": "node",
      "args": ["/absolute/path/to/irctc-mcp/dist/index.js"]
    }
  }
}`}</Code>
              <P>Its tools: <code>search_stations</code>, <code>find_trains_between_stations</code>, <code>get_train_schedule</code>, <code>check_seat_availability</code>, <code>get_fare</code>, <code>get_pnr_status</code>, <code>plan_journey</code>, <code>list_reference_data</code>.</P>
            </>
          ),
        },
        {
          id: "hosted",
          heading: "Setup: hosted server",
          body: (
            <P>
              <Ext href={AMITH}>amith-vp/indian-railway-mcp</Ext> runs at a hosted URL that you
              connect through <code>mcp-remote</code> (<code>npm i -g mcp-remote</code>), using the
              JSON config in its README. No install of the server itself, but your queries go to a
              third party&apos;s server.
            </P>
          ),
        },
        {
          id: "caveats",
          heading: "Caveats",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                The RishiMaddheshiya README states there is &ldquo;no official free public
                API&rdquo; for Indian Railways passenger data, and that the project is not
                affiliated with IRCTC or Indian Railways.
              </li>
              <li>Unofficial sources can be wrong, stale or blocked. The same README says: always verify on IRCTC before booking or travelling.</li>
              <li>A PNR number identifies a passenger booking; don&apos;t paste other people&apos;s PNRs into shared chats.</li>
            </ul>
          ),
        },
        {
          id: "booking",
          heading: "Booking tickets",
          body: (
            <P>
              None of these servers books tickets. See{" "}
              <Link href="/blog/irctc-mcp-india" className="text-blue-600 hover:underline dark:text-blue-400">
                IRCTC MCP: can an AI book train tickets?
              </Link>
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "RishiMaddheshiya/indian_railway_mcp-server README",
          url: RISHI,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Eight read-only tools; data from ConfirmTkt and eRail (unofficial) with optional RapidAPI source; no official free public API; not affiliated with IRCTC or Indian Railways; cannot book, cancel or pay; MIT; Node.js; Claude Desktop config.",
        },
        {
          source: "amith-vp/indian-railway-mcp README",
          url: AMITH,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Hosted server via mcp-remote; eight tools including train search, seat availability, live status and delay info; no booking tools.",
          limitations: "Data source, licence and affiliation not stated in the README.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Indian Railways or IRCTC MCP server?",
          answer: "No official MCP server was found as of the review date. The available servers are community projects.",
        },
        {
          question: "Can I check PNR status with an MCP server?",
          answer: "Yes. RishiMaddheshiya/indian_railway_mcp-server has a get_pnr_status tool.",
        },
        {
          question: "Can these servers book tickets?",
          answer: "No. They are read-only; one README says it cannot book, cancel or pay for tickets.",
        },
        {
          question: "Do they need an API key?",
          answer: "The RishiMaddheshiya server works without one using key-free sources; a RapidAPI key is optional.",
        },
        {
          question: "How accurate is the data?",
          answer: "It comes from unofficial sources. Verify on IRCTC before booking or travelling.",
        },
      ]}
      related={[
        { href: "/blog/irctc-mcp-india", label: "IRCTC MCP and ticket booking" },
        { href: "/blog/makemytrip-mcp-india", label: "MakeMyTrip MCP status" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
