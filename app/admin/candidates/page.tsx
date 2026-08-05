import type { Metadata } from "next";
import { routeCandidateBacklog } from "../../../src/data/publishing";

export const metadata: Metadata = {
  title: "Candidate Routes - MCPServer.in Editorial",
  description: "Review candidate routes before publication.",
  robots: { index: false, follow: false },
};

export default function AdminCandidatesPage() {
  const candidates = routeCandidateBacklog;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Candidate Routes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review candidate routes held back from automatic publication.
        </p>
      </div>

      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <div className="space-y-3">
          {candidates.map((contract) => (
            <div key={contract.id} className="rounded-lg border border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{contract.route}</div>
                  <div className="text-xs text-gray-500 mt-1">{contract.pageType}</div>
                </div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-md">{contract.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
