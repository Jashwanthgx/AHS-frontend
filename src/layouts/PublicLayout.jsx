import { Outlet, Link, useNavigate } from 'react-router-dom'
import { FiCpu } from 'react-icons/fi'

export default function PublicLayout() {
  const nav = useNavigate()
  return (
    <div className="min-h-screen bg-white">
      {/* TalentNexus top navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-white sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <FiCpu className="text-white w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">TalentNexus</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900 transition-colors">Products</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Solutions</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Resources</a>
          <a href="#" className="hover:text-slate-900 transition-colors">About</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">
            Recruiter Secure Login
          </Link>
          <Link to="/dashboard"
            className="text-sm font-semibold text-slate-600 border border-slate-300 hover:border-slate-400 px-4 py-2 rounded-xl transition-all">
            Guest Dashboard Access
          </Link>
          <Link to="/dashboard"
            className="text-sm font-bold bg-brand-600 text-white px-5 py-2 rounded-xl hover:bg-brand-700 transition-all shadow-sm shadow-brand-500/20">
            Request a Demo
          </Link>
        </div>
      </nav>

      <Outlet />
    </div>
  )
}
