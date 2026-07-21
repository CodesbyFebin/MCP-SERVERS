import { MicroBillingDashboard } from '../../../../src/components/dashboard/MicroBillingDashboard';

export default async function ServerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: serverId } = await params;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Server Detail</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">ID: {serverId}</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
          Online
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Restart Server
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                View Live Logs (SSE)
              </button>
              <button className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition">
                Delete Server
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <MicroBillingDashboard serverId={serverId} />
          
          <div className="mt-6 p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">AI Health Monitor</h3>
            <p className="text-sm text-gray-500 mb-4">
              Our AI continuously monitors your logs for anomalies.
            </p>
            <form action={`/api/v1/servers/${serverId}/analyze`} method="POST">
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm">
                Run AI Incident Analysis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}