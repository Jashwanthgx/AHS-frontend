import { useState, useCallback } from 'react'
import { FiUsers, FiEyeOff, FiSearch, FiRefreshCw, FiFilter } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'
import StatusBadge from '../components/StatusBadge'
import ScoreRing from '../components/ScoreRing'
import CandidateModal from '../components/CandidateModal'

// Columns matching the screenshot exactly
const COLUMNS = [
  { id: 'Applied',    label: 'PENDING',      color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' },
  { id: 'Hold',       label: 'REVIEW/HOLD',  color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  { id: 'Borderline', label: 'BORDERLINE',   color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
  { id: 'Selected',   label: 'SELECTED',     color: '#10b981', bg: '#f0fdf4', border: '#a7f3d0' },
  { id: 'Rejected',   label: 'REJECTED',     color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
]

export default function Applicants() {
  const { candidates, updateCandidateStatus, blindMode, jobs, refetchCandidates } = useATS()
  const [search, setSearch]           = useState('')
  const [jobFilter, setJobFilter]     = useState('All')
  const [viewCandidate, setViewCandidate] = useState(null)
  const [dragId, setDragId]           = useState(null)
  const [refreshing, setRefreshing]   = useState(false)

  const filtered = candidates.filter(c => {
    const q = search.toLowerCase()
    const nameMatch = blindMode
      ? true
      : c.name?.toLowerCase().includes(q) || c.jobTitle?.toLowerCase().includes(q)
    const jobMatch = jobFilter === 'All' || c.jobId === jobFilter
    return nameMatch && jobMatch
  })

  const byStatus = (status) => filtered.filter(c => c.status === status)

  const onDragStart = (e, id) => {
    setDragId(id)
    e.dataTransfer.effectAllowed = 'move'
  }
  const onDragOver  = (e) => e.preventDefault()
  const onDrop      = (e, status) => {
    e.preventDefault()
    if (dragId) { updateCandidateStatus(dragId, status); setDragId(null) }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await refetchCandidates()
    setTimeout(() => setRefreshing(false), 800)
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header matching screenshot */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline</h1>
          <p className="text-sm text-slate-500 mt-0.5">Review AI-evaluated candidates.</p>
        </div>
        <div className="flex items-center gap-3">
          {blindMode && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-700">
              <FiEyeOff className="w-3.5 h-3.5" /> Blind Screening Active
            </div>
          )}
          <button onClick={handleRefresh} disabled={refreshing}
            className="flex items-center gap-1.5 text-xs font-semibold border border-slate-200 bg-white px-3 py-2 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-60">
            <FiRefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Board
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-2 flex-1 max-w-xs">
          <FiSearch className="w-3.5 h-3.5 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={blindMode ? 'Blind mode active…' : 'Search candidates…'}
            disabled={blindMode}
            className="bg-transparent text-sm outline-none w-full placeholder-slate-400"
          />
        </div>
        <select value={jobFilter} onChange={e => setJobFilter(e.target.value)}
          className="form-input w-auto text-sm">
          <option value="All">All Positions</option>
          {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
        <div className="flex items-center gap-1 text-xs text-slate-400 bg-white border border-slate-200 px-3 py-2 rounded-xl">
          <FiFilter className="w-3.5 h-3.5" />
          <span>{filtered.length} candidates</span>
        </div>
      </div>

      {/* Pipeline board — 5 columns matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 min-h-[500px]">
        {COLUMNS.map(col => {
          const cards = byStatus(col.id)
          return (
            <div
              key={col.id}
              className="rounded-2xl border flex flex-col min-h-[400px]"
              style={{ background: col.bg, borderColor: col.border }}
              onDragOver={onDragOver}
              onDrop={e => onDrop(e, col.id)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: col.border }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: col.color }}>
                  {col.label}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: col.color }}>
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
                {cards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-slate-300 text-xs">
                    <FiUsers className="w-6 h-6 mb-1.5 opacity-40" />
                    No candidates
                  </div>
                ) : (
                  cards.map(c => (
                    <CandidateCard
                      key={c.id}
                      candidate={c}
                      blindMode={blindMode}
                      colColor={col.color}
                      onView={() => setViewCandidate(c)}
                      onDragStart={onDragStart}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {viewCandidate && (
        <CandidateModal candidate={viewCandidate} onClose={() => setViewCandidate(null)} />
      )}
    </div>
  )
}

function CandidateCard({ candidate: c, blindMode, colColor, onView, onDragStart }) {
  const displayName = blindMode ? `Candidate #${c.id?.split('-')[1] || '???'}` : c.name

  return (
    <div
      className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5 cursor-grab active:cursor-grabbing hover:shadow-md transition-all animate-fade-in group"
      draggable
      onDragStart={e => onDragStart(e, c.id)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: colColor }}>
            {blindMode ? '?' : (c.name?.[0] || '?')}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{displayName}</p>
            <p className="text-xs text-slate-400 truncate">{blindMode ? 'Role Hidden' : (c.currentRole || c.jobTitle)}</p>
          </div>
        </div>
        <ScoreRing score={c.aiScore} size={36} strokeWidth={3} />
      </div>

      <p className="text-xs text-slate-500 mb-2.5 truncate">{c.jobTitle}</p>

      {/* Status badge + skills */}
      <div className="flex flex-wrap gap-1 mb-2.5">
        {c.matchedSkills?.slice(0, 2).map(s => (
          <span key={s} className="skill-chip-matched">{s}</span>
        ))}
        {c.missingSkills?.slice(0, 1).map(s => (
          <span key={s} className="skill-chip-missing">{s}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge status={c.status} />
        <button onClick={onView} className="text-xs font-semibold text-brand-600 hover:text-brand-700 opacity-0 group-hover:opacity-100 transition-opacity">
          View →
        </button>
      </div>
    </div>
  )
}
