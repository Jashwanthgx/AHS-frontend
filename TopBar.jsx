import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiBell, FiRefreshCw, FiEyeOff, FiEye, FiCpu } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'

export default function TopBar() {
  const { blindMode, setBlindMode, refetchCandidates, apiOnline } = useATS()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refetchCandidates()
    setTimeout(() => setRefreshing(false), 800)
  }

  return (
    <header className="h-[var(--navbar-h)] bg-white border-b border-slate-100 flex items-center justify-between px-6 flex-shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Left: brand echoed */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <FiCpu className="text-brand-600 w-4 h-4" />
          <span className="font-bold text-slate-800 text-sm">AI Recruiter Dashboard</span>
        </div>
        {blindMode && (
          <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg">
            <FiEyeOff className="w-3 h-3" /> Blind Mode
          </span>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-52">
          <FiSearch className="text-slate-400 w-3.5 h-3.5 flex-shrink-0" />
          <input placeholder="Search candidates…" className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder-slate-400" />
        </div>

        {/* Refresh Board */}
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          <FiRefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh Board</span>
        </button>

        {/* Blind mode toggle */}
        <button
          onClick={() => setBlindMode(!blindMode)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
            blindMode
              ? 'bg-amber-50 border-amber-300 text-amber-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {blindMode ? <FiEyeOff className="w-3.5 h-3.5" /> : <FiEye className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{blindMode ? 'Blind On' : 'Blind Off'}</span>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
          <FiBell className="w-4 h-4 text-slate-500" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-brand-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 select-none">
          RC
        </div>
      </div>
    </header>
  )
}
