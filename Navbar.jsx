import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FiSearch, FiBell, FiEyeOff, FiChevronDown } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'

const CRUMBS = {
  '/':           'Dashboard',
  '/jobs':       'Job Management',
  '/applicants': 'Applicants Pipeline',
  '/interviews': 'Interviews',
  '/analytics':  'Analytics',
  '/settings':   'Settings',
}

export default function Navbar() {
  const location = useLocation()
  const { blindMode, stats } = useATS()
  const [search, setSearch] = useState('')
  const title = CRUMBS[location.pathname] || 'Dashboard'

  return (
    <header
      className="fixed top-0 right-0 z-30 bg-white border-b border-slate-100 flex items-center gap-4 px-6"
      style={{ left: 'var(--sidebar-w)', height: 'var(--navbar-h)' }}
    >
      {/* Page title */}
      <div className="flex-1">
        <h2 className="font-bold text-slate-900 text-base">{title}</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {stats.activeJobs} active jobs · {stats.totalCandidates} total applicants
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-56 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border focus-within:border-brand-200 transition-all">
        <FiSearch className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search candidates..."
          className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Blind mode pill */}
      {blindMode && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-700">
          <FiEyeOff className="w-3.5 h-3.5" />
          Blind Mode ON
        </div>
      )}

      {/* Notifications */}
      <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
        <FiBell className="w-4.5 h-4.5" />
        {stats.applied > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {/* Avatar */}
      <button className="flex items-center gap-2 pl-3 border-l border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-brand-600 text-white text-sm font-bold flex items-center justify-center">R</div>
        <FiChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>
    </header>
  )
}
