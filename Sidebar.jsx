import { Link, useLocation } from 'react-router-dom'
import { FiGrid, FiUsers, FiBriefcase, FiCalendar, FiBarChart2, FiSettings, FiCpu, FiWifi, FiWifiOff } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'

const NAV = [
  { path: '/dashboard',  label: 'Dashboard',   icon: FiGrid },
  { path: '/applicants', label: 'Pipeline',     icon: FiUsers },
  { path: '/jobs',       label: 'Jobs',         icon: FiBriefcase },
  { path: '/interviews', label: 'Interviews',   icon: FiCalendar },
  { path: '/analytics',  label: 'Analytics',    icon: FiBarChart2 },
  { path: '/settings',   label: 'Settings',     icon: FiSettings },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const { apiOnline, stats } = useATS()

  const isActive = (path) => pathname === path || (path === '/dashboard' && pathname === '/')

  return (
    <aside className="w-[var(--sidebar-w)] bg-slate-900 flex flex-col h-screen flex-shrink-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <FiCpu className="text-white w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">TalentNexus</p>
            <p className="text-slate-500 text-xs mt-0.5">ATS Platform</p>
          </div>
        </div>
      </div>

      {/* API status */}
      <div className="px-4 py-2.5 mx-3 mt-3 rounded-xl flex items-center gap-2" style={{ background: apiOnline ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)' }}>
        {apiOnline
          ? <FiWifi className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          : <FiWifiOff className="w-3 h-3 text-red-400 flex-shrink-0" />}
        <span className="text-xs font-medium" style={{ color: apiOnline ? '#34d399' : '#f87171' }}>
          {apiOnline ? 'Live API Connected' : 'Demo Mode (No Backend)'}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${isActive(path) ? 'nav-link-active' : 'nav-link-inactive'}`}
          >
            <Icon className="w-4.5 h-4.5 flex-shrink-0" />
            <span>{label}</span>
            {path === '/applicants' && stats.applied > 0 && (
              <span className="ml-auto text-xs font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                {stats.applied}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom info */}
      <div className="px-4 pb-5 space-y-3">
        <div className="bg-white/5 rounded-xl p-3 text-xs text-slate-400 space-y-1">
          <div className="flex justify-between"><span>Active Jobs</span><span className="text-white font-medium">{stats.activeJobs}</span></div>
          <div className="flex justify-between"><span>Avg AI Score</span><span className="text-brand-400 font-medium">{stats.avgScore}%</span></div>
          <div className="flex justify-between"><span>Interviews</span><span className="text-white font-medium">{stats.scheduledInterviews}</span></div>
        </div>
        <div className="text-xs text-slate-600 text-center">TalentNexus v2.0</div>
      </div>
    </aside>
  )
}
