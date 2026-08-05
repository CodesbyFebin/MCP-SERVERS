import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Content Pipeline - MCPServer.in Editorial",
  description: "Content generation pipeline for MCPServer.in.",
  robots: { index: false, follow: false },
};

export default function ContentPipelinePage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Pipeline</h1>
        <p className="text-sm text-gray-500 mt-1">
          Generate, validate, and manage content drafts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Templates</div>
          <div className="mt-2 text-3xl font-black text-gray-900">4</div>
          <p className="text-xs text-gray-500 mt-1">Server profile, tutorial, comparison, collection</p>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Drafts</div>
          <div className="mt-2 text-3xl font-black text-gray-900">0</div>
          <p className="text-xs text-gray-500 mt-1">Content drafts in progress</p>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Published</div>
          <div className="mt-2 text-3xl font-black text-gray-900">76</div>
          <p className="text-xs text-gray-500 mt-1">Server profiles published</p>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/reviews" className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition">Review Drafts</Link>
          <Link href="/admin/drafts" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">Manage Drafts</Link>
          <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition">Back to Dashboard</Link>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Content Pipeline</h2>
        <p className="text-sm text-gray-600">
          The content pipeline generates drafts from entities and evidence. Run the content build script to generate new drafts.
        </p>
      </div>
    </div>
  );
}
