"use client";

import dynamic from "next/dynamic";

const P99DashboardClient = dynamic(() => import("./P99DashboardClient"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-8 text-sm font-bold text-white/60">
      Loading dashboard...
    </div>
  ),
});

export default function P99DashboardLoader() {
  return <P99DashboardClient />;
}
