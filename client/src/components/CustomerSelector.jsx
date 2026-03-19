const CustomerSelector = ({ customers, selected, onChange }) => {
  const toggle = (id) => {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    );
  };

  const selectAll = () => onChange(customers.map((c) => c._id));
  const clearAll = () => onChange([]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Select All / Clear */}
      {customers.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
          <button
            type="button"
            onClick={selectAll}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-gray-500 hover:text-gray-700 font-medium transition"
          >
            Clear
          </button>
        </div>
      )}

      {/* Customer List */}
      <div className="max-h-52 overflow-y-auto">
        {customers.length === 0 ? (
          <p className="text-sm text-gray-400 px-4 py-6 text-center">No customers found</p>
        ) : (
          customers.map((c) => (
            <label
              key={c._id}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(c._id)}
                onChange={() => toggle(c._id)}
                className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
              />
              <span className="text-sm text-gray-800">{c.name}</span>
              {c.email && (
                <span className="text-xs text-gray-400 ml-auto truncate max-w-[140px]">
                  {c.email}
                </span>
              )}
            </label>
          ))
        )}
      </div>

      {/* Selected Count */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          {selected.length} customer{selected.length !== 1 ? 's' : ''} selected
        </p>
      </div>
    </div>
  );
};

export default CustomerSelector;
