export default function StatsCard({ title, value, subtitle, icon, color = '#6366f1', trend }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold mt-1.5 text-slate-900">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-1 ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this week
            </p>
          )}
        </div>
        {icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: color, boxShadow: `0 4px 12px ${color}30` }}
          >
            {icon}
          </div>
        )}
      </div>
      {/* Bottom accent */}
      <div className="mt-4 h-1 w-12 rounded-full" style={{ backgroundColor: color, opacity: 0.3 }} />
    </div>
  )
}
