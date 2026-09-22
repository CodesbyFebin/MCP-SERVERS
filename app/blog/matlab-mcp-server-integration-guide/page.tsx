import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "matlab-mcp-server-integration-guide";
const TITLE = "MATLAB MCP Server: Official Setup Guide";
const DESCRIPTION =
  "MathWorks' official MATLAB MCP server lets Claude Code, VS Code and other agents run MATLAB code, run tests and check code style. Requirements, install, config and safety.";
const REVIEWED = "2026-09-23";
const REPO = "https://github.com/matlab/matlab-mcp-server";
const BLOG = "https://blogs.mathworks.com/deep-learning/2025/11/03/releasing-the-matlab-mcp-core-server-on-github/";

const TOOLS: [string, string][] = [
  ["detect_matlab_toolboxes", "Installed MATLAB and toolboxes, with versions"],
  ["check_matlab_code", "Static analysis: style, likely errors, deprecated functions, performance"],
  ["evaluate_matlab_code", "Run a string of MATLAB code and return the output"],
  ["run_matlab_file", "Run a MATLAB script"],
  ["run_matlab_test_file", "Run a MATLAB test script and return results"],
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
      h1="MATLAB MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="MathWorks publishes an official MATLAB MCP server on GitHub (matlab/matlab-mcp-server, first released as the MATLAB MCP Core Server in late 2025). It runs locally over stdio and lets an AI coding agent detect installed toolboxes, check code, evaluate MATLAB code, and run scripts and tests. You need MATLAB R2021a or later on your PATH."
      sections={[
        {
          id: "tools",
          heading: "Tools",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
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
          id: "install",
          heading: "Install",
          body: (
            <>
              <P>
                Install MATLAB R2021a or later and add it to your system PATH. Then download the
                server binary for your platform from the <Ext href={REPO}>releases page</Ext>, or
                build it from source with Go. On Apple Silicon Macs:
              </P>
              <Code>{`curl -L -o ~/Downloads/matlab-mcp-server https://github.com/matlab/matlab-mcp-server/releases/latest/download/matlab-mcp-server-macos-arm64
chmod +x ~/Downloads/matlab-mcp-server`}</Code>
            </>
          ),
        },
        {
          id: "config",
          heading: "Connect a client",
          body: (
            <>
              <P>Claude Code:</P>
              <Code>{`claude mcp add --transport stdio matlab -- /fullpath/to/matlab-mcp-server-binary`}</Code>
              <P>VS Code (<code>.vscode/mcp.json</code>):</P>
              <Code>{`{
    "servers": {
        "matlab": {
            "type": "stdio",
            "command": "C:\\\\fullpath\\\\to\\\\matlab-mcp-server-windows-x64.exe",
            "args": []
        }
    }
}`}</Code>
            </>
          ),
        },
        {
          id: "safety",
          heading: "Safety",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <code>evaluate_matlab_code</code> runs arbitrary code with your permissions,
                including file and system commands. MathWorks advises reviewing every tool call and
                keeping a human in the loop.
              </li>
              <li>The README says a server must not be shared by multiple users.</li>
              <li>Commit your work before letting an agent run scripts that write files.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "matlab/matlab-mcp-server README",
          url: REPO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Official MathWorks server; five tools; MATLAB R2021a+ on PATH; release binaries or Go build; macOS arm64 curl install; Claude Code and VS Code config; not to be shared by multiple users; review tool calls and keep a human in the loop.",
        },
        {
          source: "MathWorks blog: Releasing the MATLAB MCP Core Server on GitHub",
          url: BLOG,
          type: "official",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Announcement of the MATLAB MCP Core Server release on GitHub (November 2025).",
          limitations: "Seen in search summary; not read in full.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official MATLAB MCP server?",
          answer: "Yes. MathWorks publishes it on GitHub at matlab/matlab-mcp-server.",
        },
        {
          question: "Which MATLAB versions are supported?",
          answer: "R2021a or later, installed and on the system PATH.",
        },
        {
          question: "Can it run my test suite?",
          answer: "Yes. run_matlab_test_file executes a MATLAB test script and returns the results.",
        },
        {
          question: "Does it need a MATLAB licence?",
          answer: "It drives your installed MATLAB, so you need a working MATLAB installation and licence.",
        },
        {
          question: "Is it safe to let an agent run MATLAB code?",
          answer: "Only with review. It runs code with your permissions; MathWorks recommends checking each tool call.",
        },
      ]}
      related={[
        { href: "/sdk/java", label: "MCP Java SDK" },
        { href: "/troubleshooting/claude-desktop-mcp-not-working", label: "Fix Claude Desktop MCP problems" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
