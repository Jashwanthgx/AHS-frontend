import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FiUsers, FiBriefcase, FiCheckCircle, FiCalendar, FiArrowUpRight, FiArrowDownRight, FiCpu, FiWifi, FiWifiOff } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'
import StatusBadge from '../components/StatusBadge'
import ScoreRing from '../components/ScoreRing'
import CandidateModal from '../components/CandidateModal'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg text-xs">
      <p className="font-semibold text-slate-700 mb-1.5">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span>{p.name}:</span>
          <span className="font-semibold text-slate-800">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { stats, candidates, jobs, apiOnline } = useATS()
  const [viewCandidate, setViewCandidate] = useState(null)

  const topCandidates = [...candidates].sort((a, b) => b.aiScore - a.aiScore).slice(0, 6)
  const recentActivity = [...candidates].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)).slice(0, 6)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const trendData = months.map((month, i) => ({
    month,
    applicants: 20 + i * 8 + Math.floor(Math.random() * 5),
    selected: 4 + i * 2 + Math.floor(Math.random() * 3),
  }))

  const statItems = [
    {
      label: 'Total Applicants',
      value: stats.totalCandidates,
      sub: 'across all positions',
      trend: 12,
      icon: FiUsers,
    },
    {
      label: 'Selected',
      value: stats.selected,
      sub: 'offer stage',
      trend: 8,
      icon: FiCheckCircle,
    },
    {
      label: 'Interviews Scheduled',
      value: stats.scheduledInterviews,
      sub: 'upcoming sessions',
      trend: 5,
      icon: FiCalendar,
    },
    {
      label: 'Open Positions',
      value: jobs.length,
      sub: 'actively hiring',
      trend: -1,
      icon: FiBriefcase,
    },
  ]

  return (
    <div className="dashboard-root animate-fade-in">

      {/* ── Header ── */}
      <div className="dash-header">
        <div>
          <div className="dash-eyebrow">
            <FiCpu size={13} />
            <span>TalentNexus · AI-Powered ATS</span>
          </div>
          <h1 className="dash-title">Good morning, Recruiter.</h1>
          <p className="dash-sub">
            <span className="dash-sub-em">{stats.applied}</span> applicants pending review ·{' '}
            <span className="dash-sub-em">{stats.scheduledInterviews}</span> interviews this week
          </p>
        </div>
        <div className={`api-badge ${apiOnline ? 'api-badge--online' : 'api-badge--offline'}`}>
          {apiOnline ? <FiWifi size={12} /> : <FiWifiOff size={12} />}
          {apiOnline ? 'Live' : 'Demo'}
        </div>
      </div>

      {/* ── KPI row ── */}
      <div className="kpi-grid">
        {statItems.map(s => (
          <div key={s.label} className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">{s.label}</span>
              <s.icon size={14} className="kpi-icon" />
            </div>
            <p className="kpi-value">{s.value}</p>
            <div className="kpi-bottom">
              <span className="kpi-sub">{s.sub}</span>
              <span className={`kpi-trend ${s.trend >= 0 ? 'kpi-trend--up' : 'kpi-trend--down'}`}>
                {s.trend >= 0 ? <FiArrowUpRight size={11} /> : <FiArrowDownRight size={11} />}
                {Math.abs(s.trend)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="main-grid">

        {/* Trend chart — spans 2 cols */}
        <div className="card card--wide">
          <div className="card-head">
            <div>
              <h3 className="card-title">Application Trend</h3>
              <p className="card-caption">Monthly applications vs. offers extended</p>
            </div>
            <div className="legend-row">
              <span className="legend-dot" style={{ background: '#1e293b' }} />
              <span className="legend-label">Applicants</span>
              <span className="legend-dot" style={{ background: '#94a3b8' }} />
              <span className="legend-label">Selected</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="applicants" stroke="#1e293b" strokeWidth={1.5} fill="url(#gA)" name="Applicants" dot={false} activeDot={{ r: 3, fill: '#1e293b' }} />
              <Area type="monotone" dataKey="selected" stroke="#94a3b8" strokeWidth={1.5} fill="url(#gS)" name="Selected" dot={false} activeDot={{ r: 3, fill: '#94a3b8' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline summary — text-based, no pie */}
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">Pipeline</h3>
          </div>
          <div className="pipeline-list">
            {[
              { label: 'Applied',    value: stats.applied,     pct: Math.round(stats.applied / Math.max(stats.totalCandidates, 1) * 100) },
              { label: 'On Hold',    value: stats.hold,        pct: Math.round(stats.hold / Math.max(stats.totalCandidates, 1) * 100) },
              { label: 'Borderline', value: stats.borderline,  pct: Math.round(stats.borderline / Math.max(stats.totalCandidates, 1) * 100) },
              { label: 'Selected',   value: stats.selected,    pct: Math.round(stats.selected / Math.max(stats.totalCandidates, 1) * 100) },
              { label: 'Rejected',   value: stats.rejected,    pct: Math.round(stats.rejected / Math.max(stats.totalCandidates, 1) * 100) },
            ].map(row => (
              <div key={row.label} className="pl-row">
                <div className="pl-meta">
                  <span className="pl-label">{row.label}</span>
                  <span className="pl-value">{row.value}</span>
                </div>
                <div className="pl-bar-track">
                  <div className="pl-bar-fill" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom grid ── */}
      <div className="bottom-grid">

        {/* Top candidates table */}
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">Top Candidates</h3>
            <span className="card-badge">by AI score</span>
          </div>
          <div className="cand-list">
            {topCandidates.map((c, i) => (
              <div key={c.id} className="cand-row" onClick={() => setViewCandidate(c)}>
                <span className="cand-rank">{String(i + 1).padStart(2, '0')}</span>
                <div className="cand-info">
                  <p className="cand-name">{c.name}</p>
                  <p className="cand-role">{c.jobTitle}</p>
                </div>
                <StatusBadge status={c.status} />
                <ScoreRing score={c.aiScore} size={38} strokeWidth={3} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent applications */}
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">Recent Applications</h3>
            <span className="card-badge">latest</span>
          </div>
          <table className="rec-table">
            <thead>
              <tr>
                {['Candidate', 'Position', 'Date', 'Score', 'Status'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentActivity.map(c => (
                <tr key={c.id} onClick={() => setViewCandidate(c)} className="rec-row">
                  <td>
                    <div className="rec-avatar-wrap">
                      <div className="rec-avatar">{c.name?.[0]}</div>
                      <span className="rec-name">{c.name}</span>
                    </div>
                  </td>
                  <td className="rec-pos">{c.jobTitle}</td>
                  <td className="rec-date">{c.appliedDate}</td>
                  <td><ScoreRing score={c.aiScore} size={34} strokeWidth={3} /></td>
                  <td><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {viewCandidate && <CandidateModal candidate={viewCandidate} onClose={() => setViewCandidate(null)} />}
    </div>
  )
}
