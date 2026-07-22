import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { FileCheck, GitPullRequest, ShieldAlert } from "lucide-react";
import { getOrganizationSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "Editorial Policy - MCPserver.in",
  description:
    "How MCPserver.in sources, validates, and corrects its technical documentation and MCP server directory listings.",
  alternates: {
    canonical: "/editorial-policy",
    languages: {
      "en-IN": "/editorial-policy",
      "en": "/editorial-policy",
        }
  },
};

export default function EditorialPolicyPage() {
  const breadcrumbSteps = [{ name: "Editorial Policy", href: "/editorial-policy" }];
  const orgSchema = getOrganizationSchema();

  return (
    <div id="editorial-policy-page" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <SchemaJsonLd schema={orgSchema} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbSteps} />

        <div className="mt-6">
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            Editorial Policy
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl">
            How we decide what to publish on MCPserver.in, where our information comes from, and what we do when we get something wrong.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            ["Sourced", "Every technical claim traces to the official MCP spec, a real npm package, or primary regulatory text.", FileCheck],
            ["Corrected", "Errors reported on GitHub are fixed in the codebase directly — not hidden behind a support queue.", GitPullRequest],
            ["No fabrication", "We do not publish invented adoption numbers, uptime percentages, or benchmark results we haven't run.", ShieldAlert],
          ].map(([title, body, Icon]) => (
            <div key={title as string} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <Icon className="h-5 w-5 text-cyan-300" />
              <div className="mt-3 text-sm font-bold text-white">{title as string}</div>
              <div className="mt-1 text-xs leading-relaxed text-gray-400">{body as string}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-8 text-sm text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">What we publish</h2>
            <p>
              Docs, glossary entries, and server-integration guides on this site are written against the real
              interfaces in our own codebase and against primary sources: the official Model Context Protocol
              specification, the npm packages we reference by name and version, and, for India-compliance content,
              the actual text of the DPDP Act and RBI circulars we cite. Code samples are written to compile against
              the package versions stated in the page, not left as untested pseudocode.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">How we review servers</h2>
            <p>
              We check that each listed server has a working repository, clear documentation, and is actively
              maintained. We also test basic functionality to ensure it meets our quality standards. This is a
              practical check, not a formal security audit — always review a server&apos;s source and required
              permissions yourself before connecting it to sensitive data or production systems.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">What we don&apos;t do</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>We don&apos;t invent adoption numbers, star counts, or uptime figures.</li>
              <li>We don&apos;t claim a page was &quot;recently updated&quot; unless its content actually changed.</li>
              <li>We don&apos;t list a server in the directory without checking its real repository and auth model.</li>
              <li>We&apos;re not affiliated with Anthropic, the MCP maintainers, or any cloud provider named in our guides.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Corrections</h2>
            <p>
              If you spot a factual error, a broken link, or an outdated code sample, open an issue or pull request
              against{" "}
              <a
                href="https://github.com/CodesbyFebin/MCP-SERVERS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200"
              >
                our GitHub repository
              </a>
              . Fixes are reviewed against the same sourcing standard as new content before they merge.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Tooling disclosure</h2>
            <p>
              We use AI-assisted tooling as part of our writing and validation workflow, alongside an automated
              schema audit that checks every content entry against its TypeScript interface before it ships. Every
              page is still reviewed for factual accuracy before it goes live.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
