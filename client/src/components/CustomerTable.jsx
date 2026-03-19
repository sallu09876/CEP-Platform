import { Pencil, Trash2 } from 'lucide-react';

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });

  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="py-16 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">👥</span>
          </div>
          <p className="text-sm font-medium text-gray-700">No customers yet</p>
          <p className="text-xs text-gray-400 mt-1">Add your first customer to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Name', 'Email', 'Phone', 'Location', 'Created Date', 'Actions'].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{c.name}</td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{c.email}</td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{c.phone || '—'}</td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{c.location || '—'}</td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{formatDate(c.createdAt)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(c)}
                      className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
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
        {customers.map((c) => (
          <div key={c._id} className="px-4 py-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{c.email}</p>
                {c.phone && <p className="text-xs text-gray-400 mt-0.5">{c.phone}</p>}
                {c.location && <p className="text-xs text-gray-400">{c.location}</p>}
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => onEdit(c)} className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg transition">
                  <Pencil size={15} />
                </button>
                <button onClick={() => onDelete(c._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTable;
