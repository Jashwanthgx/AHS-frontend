import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, AreaChart, Area
} from 'recharts'
import { FiBarChart2, FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'

const SCORE_RANGES = [
  { range: '90–100', label: 'Excellent' },
  { range: '80–89',  label: 'Good' },
  { range: '70–79',  label: 'Average' },
  { range: '60–69',  label: 'Borderline' },
  { range: '<60',    label: 'Poor' },
]

const MONTHLY_HIRE = [
  { month: 'Jan', hires: 4, rejections: 18, interviews: 9 },
  { month: 'Feb', hires: 6, rejections: 22, interviews: 12 },
  { month: 'Mar', hires: 8, rejections: 25, interviews: 15 },
  { month: 'Apr', hires: 5, rejections: 19, interviews: 10 },
  { month: 'May', hires: 11, rejections: 30, interviews: 18 },
  { month: 'Jun', hires: 9, rejections: 27, interviews: 14 },
]

const SKILL_DEMAND = [
  { skill: 'React', demand: 85 },
  { skill: 'Python', demand: 78 },
  { skill: 'TypeScript', demand: 72 },
  { skill: 'Node.js', demand: 65 },
  { skill: 'AWS', demand: 60 },
  { skill: 'Figma', demand: 55 },
  { skill: 'Docker', demand: 52 },
]

const RADAR_DATA = [
  { subject: 'Technical', value: 82 },
  { subject: 'Communication', value: 70 },
  { subject: 'Experience', value: 76 },
  { subject: 'Culture Fit', value: 68 },
  { subject: 'Education', value: 74 },
  { subject: 'AI Score', value: 80 },
]

const PIE_COLORS = ['#6366f1', '#10b981', '#ef4444', '#f59e0b']
const BAR_COLORS = ['#6366f1', '#ef4444', '#10b981']

export default function Analytics() {
  const { candidates, jobs, stats } = useATS()

  // Score distribution
  const scoreDist = SCORE_RANGES.map(({ range, label }) => {
    const [lo, hi] = range === '<60'
      ? [0, 60]
      : range.split('–').map(Number)
    const count = candidates.filter(c => c.aiScore >= lo && c.aiScore < (hi || 101)).length
    return { range, label, count }
  })

  const statusData = [
    { name: 'Applied',  value: stats.applied },
    { name: 'Selected', value: stats.selected },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Hold',     value: stats.hold },
  ]

  const deptData = jobs.map(j => ({
    dept: j.department.split(' ')[0],
    openings: 1,
    applicants: j.applicantCount,
  }))

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Analytics</h1>
        <p className="section-subtitle">Hiring funnel insights and performance metrics</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg AI Score', value: `${stats.avgScore}%`, icon: <FiTarget className="w-4 h-4" />, color: '#6366f1' },
          { label: 'Offer Rate',   value: `${Math.round((stats.selected / (stats.totalCandidates || 1)) * 100)}%`, icon: <FiAward className="w-4 h-4" />, color: '#10b981' },
          { label: 'Active Jobs',  value: stats.activeJobs, icon: <FiBarChart2 className="w-4 h-4" />, color: '#f59e0b' },
          { label: 'Time-to-Fill', value: '18d',   icon: <FiTrendingUp className="w-4 h-4" />, color: '#8b5cf6' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: k.color }}>
                {k.icon}
              </div>
              <p className="text-xs text-slate-500 font-medium">{k.label}</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Hiring Funnel */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Monthly Hiring Funnel</h3>
          <p className="text-xs text-slate-400 mb-4">Hires, rejections, and interviews per month</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_HIRE} barGap={4} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="hires"      name="Hired"      fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="interviews" name="Interviews" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejections" name="Rejected"   fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline Status Pie */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Current Pipeline</h3>
          <p className="text-xs text-slate-400 mb-4">Applicant status breakdown</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="value" paddingAngle={4}>
                  {statusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} formatter={(val) => <span style={{ fontSize: 11, color: '#64748b' }}>{val}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AI Score Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">AI Score Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Candidates by score band</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scoreDist} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="count" name="Candidates" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Demand */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Top Skill Demand</h3>
          <p className="text-xs text-slate-400 mb-4">Most required skills across JDs</p>
          <div className="space-y-3">
            {SKILL_DEMAND.map(s => (
              <div key={s.skill}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">{s.skill}</span>
                  <span className="text-slate-400">{s.demand}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-700"
                    style={{ width: `${s.demand}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Quality Radar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Avg Candidate Quality</h3>
          <p className="text-xs text-slate-400 mb-2">Multi-dimensional assessment</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dept vs Applicants */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-1">Applicants by Department</h3>
        <p className="text-xs text-slate-400 mb-4">Volume of applicants per hiring department</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={deptData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="dept" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 12 }} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="applicants" name="Applicants" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
