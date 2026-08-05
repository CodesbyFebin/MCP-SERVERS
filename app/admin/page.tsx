import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial",
  description: "Editorial dashboard for MCPServer.in.",
  robots: { index: false, follow: false },
};

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Editorial Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage content, drafts, and publishing for MCPServer.in.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/content" className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
          <div className="text-xs font-semibold text-gray-500">Content Pipeline</div>
          <div className="mt-2 text-xl font-bold text-gray-900">4 Templates</div>
          <p className="text-xs text-gray-500 mt-1">Generate and manage content drafts</p>
        </Link>
        <Link href="/admin/reviews" className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
          <div className="text-xs font-semibold text-gray-500">Editorial Reviews</div>
          <div className="mt-2 text-xl font-bold text-gray-900">Review Queue</div>
          <p className="text-xs text-gray-500 mt-1">Review and approve drafts</p>
        </Link>
        <Link href="/admin/drafts" className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
          <div className="text-xs font-semibold text-gray-500">Drafts</div>
          <div className="mt-2 text-xl font-bold text-gray-900">0 Drafts</div>
          <p className="text-xs text-gray-500 mt-1">Manage content drafts</p>
        </Link>
        <Link href="/admin/quality" className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
          <div className="text-xs font-semibold text-gray-500">Quality</div>
          <div className="mt-2 text-xl font-bold text-gray-900">0 Failures</div>
          <p className="text-xs text-gray-500 mt-1">Quality gate failures</p>
        </Link>
      </div>
    </div>
  );
}
