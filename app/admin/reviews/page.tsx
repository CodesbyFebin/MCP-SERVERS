import type { Metadata } from "next";
import Link from "next/link";
import { validatePublishingGraph } from "../../../src/data/publishing";

export const metadata: Metadata = {
  title: "Editorial Reviews - MCPServer.in Editorial",
  description: "Review and approve content drafts.",
  robots: { index: false, follow: false },
};

export default function AdminReviewsPage() {
  const validation = validatePublishingGraph()

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Editorial Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and approve content drafts before publication.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Validation Status</div>
          <div className={`mt-2 text-3xl font-black ${validation.ok ? "text-emerald-700" : "text-red-700"}`}>
            {validation.ok ? "PASS" : "FAIL"}
          </div>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Published Servers</div>
          <div className="mt-2 text-3xl font-black text-gray-900">{String(validation.publishedServerCount)}</div>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Candidate Routes</div>
          <div className="mt-2 text-3xl font-black text-gray-900">{String(validation.candidateRouteCount)}</div>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition">Back to Dashboard</Link>
          <Link href="/admin/candidates" className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition">Review Candidates</Link>
          <Link href="/admin/quality" className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition">Quality Failures</Link>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Content Pipeline Status</h2>
        <p className="text-sm text-gray-600">
          The content pipeline generates drafts from entities and evidence. Run <code className="bg-gray-100 px-2 py-1 rounded">npm run content:build</code> to generate new drafts.
        </p>
      </div>
    </div>
  );
}
