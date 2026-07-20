interface MicroBillingDashboardProps {
  serverId: string;
}

export function MicroBillingDashboard({ serverId }: MicroBillingDashboardProps) {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Billing & Usage</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Server Cost</p>
          <p className="text-lg font-semibold text-gray-900">$0.00</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">AI Tokens</p>
          <p className="text-lg font-semibold text-gray-900">0</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Usage History</h4>
        <p className="text-xs text-gray-500">No usage data available yet.</p>
      </div>
    </div>
  );
}