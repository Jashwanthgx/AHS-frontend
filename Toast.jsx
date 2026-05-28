import { useATS } from '../context/ATSContext'

export default function Toast() {
  const { toast } = useATS()
  if (!toast) return null

  const colors = {
    success: 'bg-emerald-600',
    error:   'bg-red-600',
    warning: 'bg-amber-500',
    info:    'bg-brand-600',
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold animate-fade-in ${colors[toast.type] || colors.info}`}>
      <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}</span>
      {toast.message}
    </div>
  )
}
