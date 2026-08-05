import type { Metadata } from "next";
import Link from "next/link";
import { validatePublishingGraph } from "../../../src/data/publishing";

export const metadata: Metadata = {
  title: "Quality Failures - MCPServer.in Editorial",
  description: "Review quality failures and validation errors.",
  robots: { index: false, follow: false },
};

export default function AdminQualityPage() {
  const validation = validatePublishingGraph();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quality Failures</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review validation errors and warnings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-red-200 rounded-xl bg-red-50 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-red-900">Errors ({validation.errors.length})</h2>
          <div className="space-y-2">
            {validation.errors.length === 0 && (
              <p className="text-xs text-red-800">No errors.</p>
            )}
            {validation.errors.map((error, idx) => (
              <div key={idx} className="text-xs text-red-800 bg-white/60 rounded-md px-3 py-2 border border-red-100">
                {error}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border border-amber-200 rounded-xl bg-amber-50 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-amber-900">Warnings ({validation.warnings.length})</h2>
          <div className="space-y-2">
            {validation.warnings.length === 0 && (
              <p className="text-xs text-amber-800">No warnings.</p>
            )}
            {validation.warnings.map((warning, idx) => (
              <div key={idx} className="text-xs text-amber-800 bg-white/60 rounded-md px-3 py-2 border border-amber-100">
                {warning}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition">Back to Dashboard</Link>
          <Link href="/admin/candidates" className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition">Review Candidates</Link>
        </div>
      </div>
    </div>
  );
}
