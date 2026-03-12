const statusConfig = {
  Active: { label: 'Active', classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  Sent: { label: 'Sent', classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  Pending: { label: 'Pending', classes: 'bg-amber-50 text-amber-700 border border-amber-200' },
  Scheduled: { label: 'Scheduled', classes: 'bg-blue-50 text-blue-700 border border-blue-200' },
  Draft: { label: 'Draft', classes: 'bg-gray-100 text-gray-600 border border-gray-200' },
  Failed: { label: 'Failed', classes: 'bg-red-50 text-red-700 border border-red-200' },
};

const channelConfig = {
  Email: { emoji: '✉️' },
  WhatsApp: { emoji: '💬' },
  SMS: { emoji: '📱' },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig['Draft'];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  );
};

const CampaignTable = ({ campaigns }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Recent Campaigns</h2>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Campaign Name
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Channel
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {campaigns.map((campaign, idx) => {
              const ch = channelConfig[campaign.channel] || {};
              return (
                <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      {ch.emoji && <span>{ch.emoji}</span>}
                      {campaign.channel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={campaign.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {campaign.date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-gray-100 md:hidden">
        {campaigns.map((campaign, idx) => {
          const ch = channelConfig[campaign.channel] || {};
          return (
            <div key={idx} className="px-4 py-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {ch.emoji} {campaign.channel} · {campaign.date}
                  </p>
                </div>
                <StatusBadge status={campaign.status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignTable;
