import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedServerProfiles, getPublishedCategorySlugs } from "../../../src/data/publishing";
import { categories } from "../../../src/data/categories";

export const metadata: Metadata = {
  title: "Entity Registry - MCPServer.in Editorial",
  description: "Manage MCP server entities.",
  robots: { index: false, follow: false },
};

export default async function AdminEntitiesPage() {
  const profiles = getPublishedServerProfiles();
  const categorySlugs = getPublishedCategorySlugs();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Entity Registry</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage entities, sources, evidence, and relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Published Servers</div>
          <div className="mt-2 text-3xl font-black text-gray-900">{String(profiles.length)}</div>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Active Categories</div>
          <div className="mt-2 text-3xl font-black text-gray-900">{String(categorySlugs.length)}</div>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="text-xs font-semibold text-gray-500">Total Categories</div>
          <div className="mt-2 text-3xl font-black text-gray-900">{String(categories.length)}</div>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Published Profiles</h2>
        <div className="space-y-3">
          {profiles.map((profile) => (
            <Link
              key={profile.entityId}
              href={`/servers/${profile.server.slug}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:border-blue-400 transition"
            >
              <div>
                <div className="text-sm font-semibold text-gray-900">{profile.server.name}</div>
                <div className="text-xs text-gray-500">{profile.server.category} · {profile.server.auth}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Q: {profile.quality.total}</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">Published</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
