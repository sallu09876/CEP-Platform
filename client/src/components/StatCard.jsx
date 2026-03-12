const StatCard = ({ title, value, trend, trendLabel, icon: Icon, iconBg }) => {
  const isPositive = trendLabel && !trendLabel.toLowerCase().includes('running');
  const isRunning = trendLabel && trendLabel.toLowerCase().includes('running');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start justify-between hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </p>
        {trendLabel && (
          <p
            className={`text-xs font-medium mt-1 ${
              isRunning
                ? 'text-emerald-600'
                : isPositive
                ? 'text-emerald-600'
                : 'text-red-500'
            }`}
          >
            {!isRunning && trend ? `${trend} ` : ''}
            {trendLabel}
          </p>
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
      >
        <Icon size={22} className="text-white" />
      </div>
    </div>
  );
};

export default StatCard;
