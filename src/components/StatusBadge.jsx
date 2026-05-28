const MAP = {
  Selected: 'status-badge-selected',
  Hold:     'status-badge-hold',
  Rejected: 'status-badge-rejected',
  Applied:  'status-badge-applied',
  Active:   'status-badge-selected',
  Paused:   'status-badge-hold',
  Scheduled:'status-badge-applied',
  Completed:'bg-slate-100 text-slate-600 border border-slate-200 font-medium',
  Cancelled:'status-badge-rejected',
}

export default function StatusBadge({ status, className = '' }) {
  const cls = MAP[status] || 'bg-slate-100 text-slate-600 border border-slate-200 font-medium'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${cls} ${className}`}>
      {status}
    </span>
  )
}
