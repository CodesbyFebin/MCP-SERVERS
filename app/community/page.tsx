import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Vote, HelpCircle, Code2, FileText, Users } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import UGCOrchestrator from "../../src/components/ugc/UGCOrchestrator";
import { BarChart3, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Community - Discussions, Polls, Code Sharing & Q&A",
  description: "Join the MCPserver.in community. Share code snippets, ask questions, vote on best practices, and discuss Model Context Protocol implementations.",
};

const communitySections = [
  {
    id: "discussions",
    title: "Latest Discussions",
    description: "Community discussions on MCP servers, clients, and best practices.",
    icon: MessageSquare,
    href: "#discussions",
    ugcElements: ["Comment debate", "Technical discussion"],
    postId: "community-discussions",
    postCategory: "general"
  },
  {
    id: "polls",
    title: "Community Polls",
    description: "Vote on your preferred MCP tools, transports, and deployment strategies.",
    icon: Vote,
    href: "#polls",
    ugcElements: ["Method preference poll", "Voting"],
    postId: "community-polls",
    postCategory: "polls"
  },
  {
    id: "qna",
    title: "Q&A Forum",
    description: "Ask questions and get answers from the MCP community.",
    icon: HelpCircle,
    href: "#qna",
    ugcElements: ["Beginner Q&A forum", "Expert Q&A"],
    postId: "community-qna",
    postCategory: "qna"
  },
  {
    id: "code",
    title: "Code Sharing",
    description: "Share and discover MCP server implementations, configs, and templates.",
    icon: Code2,
    href: "#code",
    ugcElements: ["Code sharing section", "Configuration file sharing"],
    postId: "community-code",
    postCategory: "code"
  },
  {
    id: "stories",
    title: "Success Stories",
    description: "Share how MCP transformed your workflow or business.",
    icon: FileText,
    href: "#stories",
    ugcElements: ["Success stories", "User-submitted tutorials"],
    postId: "community-stories",
    postCategory: "stories"
  },
  {
    id: "benchmarks",
    title: "Benchmarks & Results",
    description: "Share and compare MCP server performance benchmarks.",
    icon: BarChart3,
    href: "#benchmarks",
    ugcElements: ["Performance benchmarks", "Latency results"],
    postId: "community-benchmarks",
    postCategory: "benchmarks"
  }
];

export default function CommunityPage() {
  return (
    <div id="community-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Community", href: "/community" }]} />

        <section className="py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10">
            <Users className="h-6 w-6 text-cyan-200" />
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">MCP Community</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            Join discussions, share code, vote on best practices, and connect with other MCP builders.
          </p>
        </section>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communitySections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                  <section.icon className="h-5 w-5 text-cyan-200" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-cyan-200">{section.title}</h3>
                  <p className="text-[11px] text-white/50">{section.description}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {section.ugcElements.slice(0, 2).map((element) => (
                  <span key={element} className="rounded-md border border-white/8 bg-white/[0.04] px-2 py-1 text-[10px] font-bold text-white/45">
                    {element}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-black text-white">Community Highlights</h2>
          
          {communitySections.map((section) => (
            <div key={section.id} id={section.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-400/20 bg-cyan-500/10">
                  <section.icon className="h-4 w-4 text-cyan-200" />
                </div>
                <h3 className="text-lg font-black text-white">{section.title}</h3>
              </div>
              <p className="text-xs text-white/55 mb-4">{section.description}</p>
              <UGCOrchestrator
                postId={section.postId}
                postCategory={section.postCategory}
                ugcElements={section.ugcElements}
              />
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 to-violet-950/30 p-8 text-center">
          <h3 className="text-xl font-black text-white">Ready to contribute?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/58">
            Share your MCP server implementations, ask questions, and help build the community.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/mcp-server-directory" className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-5 py-2.5 text-xs font-black text-black">
              Browse Servers
            </Link>
            <Link href="/learn" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-black text-white">
              Learn MCP <BookOpen className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
