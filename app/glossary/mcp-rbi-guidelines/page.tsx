import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-rbi-guidelines";
const PATH = `/glossary/${SLUG}`;
const TITLE = "RBI FREE-AI Framework and MCP Tools";
const DESCRIPTION =
  "What the RBI's FREE-AI committee report says (7 Sutras, 6 pillars, 26 recommendations) and practical ways Indian regulated entities can apply its governance themes to MCP tool use.";
const REVIEWED = "2026-09-23";
const KPMG = "https://kpmg.com/in/en/insights/2025/08/rbi-free-ai-committee-report-on-framework-for-responsible-and-ethical-enablement-of-artificial-intelligence.html";
const DVARA = "https://dvararesearch.com/summary-of-the-rbi-free-ai-committee-report/";

const L = "text-blue-600 hover:underline dark:text-blue-400";
const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in${PATH}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      path={PATH}
      section={{ label: "Glossary", href: "/glossary" }}
      title={TITLE}
      h1="RBI Guidelines and MCP"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="The Reserve Bank of India has no MCP-specific rules. Its main AI reference is the August 2025 report of the committee on a Framework for Responsible and Ethical Enablement of AI (FREE-AI), which sets out 7 guiding Sutras and 26 recommendations under six pillars: Infrastructure, Policy, Capacity, Governance, Protection and Assurance. Banks and fintechs connecting AI assistants to systems through MCP can map its governance, audit and incident-reporting themes onto how they run tools."
      sections={[
        {
          id: "report",
          heading: "What the FREE-AI report contains",
          body: (
            <>
              <P>From summaries by <Ext href={KPMG}>KPMG</Ext> and <Ext href={DVARA}>Dvara Research</Ext>:</P>
              <ul className={UL}>
                <li>Released by the RBI in August 2025 as a committee report.</li>
                <li>7 &ldquo;Sutras&rdquo; (guiding principles) emphasising trust, fairness, accountability and sustainability.</li>
                <li>26 recommendations across six pillars: Infrastructure, Policy, Capacity, Governance, Protection and Assurance.</li>
                <li>
                  Recommendations range from AI innovation sandboxes and indigenous financial AI models
                  to governance, audit and incident-reporting mechanisms.
                </li>
              </ul>
              <P>
                Read the report itself, and any RBI directions that follow it, for what applies to your
                institution. This page is not legal or regulatory advice.
              </P>
            </>
          ),
        },
        {
          id: "apply",
          heading: "Applying its themes to MCP (our suggestions)",
          body: (
            <ul className={UL}>
              <li>
                <strong>Inventory:</strong> keep a register of every MCP server connected to AI
                tools, who publishes it, what data it touches, and what it can change.
              </li>
              <li>
                <strong>Governance:</strong> approve new servers like any vendor integration; prefer
                official servers with OAuth over community ones holding credentials.
              </li>
              <li>
                <strong>Audit:</strong> log every tool call with user, tool, arguments summary and
                outcome. See <Link href="/docs/monitoring/observability-best-practices" className={L}>observability</Link>.
              </li>
              <li>
                <strong>Protection:</strong> least-privilege scopes, human approval for money
                movement, and masking of customer data in logs. See{" "}
                <Link href="/glossary/guardrails" className={L}>guardrails</Link>.
              </li>
              <li>
                <strong>Incidents:</strong> treat a wrong or unauthorised tool action as an incident,
                with a way to revoke the server&apos;s access immediately.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        { source: "KPMG India: RBI FREE-AI committee report", url: KPMG, type: "documentation", status: "verified", reviewedAt: REVIEWED, finding: "Seven Sutras; six pillars (Infrastructure, Policy, Capacity, Governance, Protection, Assurance); 26 actionable recommendations including governance, audit and incident reporting.", limitations: "Secondary summary; the RBI's own site could not be fetched automatically on the review date." },
        { source: "Dvara Research: Summary of the RBI FREE-AI Committee Report", url: DVARA, type: "documentation", status: "unverified", reviewedAt: REVIEWED, finding: "Summary of the report.", limitations: "Seen in search results; not read in full." },
        { source: "Application suggestions on this page", url: `https://www.mcpserver.in${PATH}`, type: "editorial", status: "verified", reviewedAt: REVIEWED, finding: "Our mapping of the report's governance themes to MCP operations.", limitations: "Interpretation, not RBI guidance." },
      ]}
      faqs={[
        { question: "Does the RBI regulate MCP?", answer: "Not specifically. Its FREE-AI committee report covers responsible AI use in the financial sector generally." },
        { question: "What is FREE-AI?", answer: "The Framework for Responsible and Ethical Enablement of Artificial Intelligence, set out in an RBI committee report in August 2025." },
        { question: "How many recommendations does it make?", answer: "26, under six strategic pillars, guided by 7 Sutras." },
        { question: "Can a bank connect AI assistants to core systems with MCP?", answer: "Technically yes; whether and how is a governance decision. Use least privilege, human approval and full audit logs." },
        { question: "Is this page legal advice?", answer: "No. Consult the report, RBI directions and your compliance team." },
      ]}
      related={[
        { href: "/glossary/guardrails", label: "Guardrails" },
        { href: "/blog/mcp-role-based-access-control", label: "Role-based access control for MCP" },
        { href: "/blog/hdfc-bank-mcp-india", label: "HDFC MCP: HDFC SKY vs HDFC Bank" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
