import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { Mail, Building, Github, Twitter, Linkedin } from "lucide-react";
import { getOrganizationSchema } from "../../src/lib/schema";
import { siteConfig } from "../../src/data/site";

export const metadata: Metadata = {
  title: "About MCPserver.in - India-first MCP Platform",
  description:
    "Learn about MCPserver.in — an India-first Model Context Protocol integration platform built and maintained by Febin Francis (CodesbyFebin).",
  alternates: {
    canonical: "/about",
    languages: {
      "en-IN": "/about",
      "en": "/about",
        }
  },
};

export default function AboutPage() {
  const breadcrumbSteps = [{ name: "About", href: "/about" }];
  const orgSchema = getOrganizationSchema();

  return (
    <div id="about-page" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <SchemaJsonLd schema={orgSchema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbSteps} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                About MCPserver
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                MCPserver.in is an India-first Model Context Protocol integration and developer resource platform.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
                Our mission is to help developer teams, AI startups, and enterprise engineers build secure connection layers that safely expose data assets and tools to LLM models.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-900/20 border border-gray-900">
              <h3 className="font-bold text-white text-sm mb-3">Founder</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 font-bold text-lg shrink-0">
                  FF
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{siteConfig.founder.name}</div>
                  <div className="text-xs text-cyan-300">{siteConfig.founder.role} · @{siteConfig.founder.handle}</div>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">{siteConfig.founder.bio}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <a
                      href={siteConfig.founder.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-gray-400 hover:text-cyan-300 transition"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.founder.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter/X"
                      className="text-gray-400 hover:text-cyan-300 transition"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.founder.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-gray-400 hover:text-cyan-300 transition"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-900/20 border border-gray-900 space-y-3.5 text-xs text-gray-400">
              <h3 className="font-bold text-white">Platform Information</h3>

              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>Bengaluru, Karnataka, India</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@mcpserver.in</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03]">
              <h2 className="text-lg font-bold text-white mb-4">What We Build</h2>
              <ul className="space-y-3 text-xs text-gray-400">
                <li>Curated MCP server directory with schema validation</li>
                <li>Managed hosting with Mumbai and Bengaluru edge nodes</li>
                <li>DPDP-aligned data controls and audit logging</li>
                <li>Developer tools for testing and benchmarking MCP servers</li>
                <li>Documentation and compliance guides for Indian teams</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
