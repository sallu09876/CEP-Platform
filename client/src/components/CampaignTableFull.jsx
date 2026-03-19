import { Eye, Send, Trash2 } from 'lucide-react';

const statusConfig = {
  Sent: 'bg-emerald-500',
  Draft: 'bg-amber-400',
};

const channelEmoji = { Email: '✉️', WhatsApp: '💬', SMS: '📱' };

const CampaignTableFull = ({ campaigns, onSend, onDelete }) => {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (campaigns.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <span className="text-xl">📢</span>
        </div>
        <p className="text-sm font-medium text-gray-700">No campaigns yet</p>
        <p className="text-xs text-gray-400 mt-1">Create your first campaign</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Desktop */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Campaign Title', 'Channel', 'Status', 'Created Date', 'Actions'].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {campaigns.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-gray-900">{c.title}</td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {channelEmoji[c.channel]} {c.channel}
                </td>
                <td className="px-5 py-4">
                  {/* Pill badge matching the design screenshots */}
                  <span
                    className={`inline-block w-12 h-6 rounded-full ${statusConfig[c.status] || 'bg-gray-400'}`}
                  />
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{formatDate(c.createdAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {/* View - UI only */}
                    <button className="p-1.5 text-indigo-400 hover:bg-indigo-50 rounded-lg transition" title="View">
                      <Eye size={15} />
                    </button>
                    {/* Send - only show for Draft */}
                    {c.status === 'Draft' && (
                      <button
                        onClick={() => onSend(c._id)}
                        className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition"
                        title="Send Campaign"
                      >
                        <Send size={15} />
                      </button>
                    )}
                    {/* Delete */}
                    <button
                      onClick={() => onDelete(c._id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-gray-100 md:hidden">
        {campaigns.map((c) => (
          <div key={c._id} className="px-4 py-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{c.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {channelEmoji[c.channel]} {c.channel} · {formatDate(c.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 text-indigo-400 hover:bg-indigo-50 rounded-lg transition">
                  <Eye size={14} />
                </button>
                {c.status === 'Draft' && (
                  <button onClick={() => onSend(c._id)} className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition">
                    <Send size={14} />
                  </button>
                )}
                <button onClick={() => onDelete(c._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignTableFull;
