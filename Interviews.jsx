import { useState } from 'react'
import { FiCalendar, FiClock, FiVideo, FiPhone, FiMapPin, FiPlus, FiX, FiUsers, FiLink } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'
import StatusBadge from '../components/StatusBadge'

const EMPTY = {
  candidateName: '', jobTitle: '', round: '', date: '', time: '',
  duration: '60', mode: 'Video Call', interviewers: '', meetingLink: '', notes: '',
}

const MODE_ICON = { 'Video Call': FiVideo, Phone: FiPhone, 'In-Person': FiMapPin }

export default function Interviews() {
  const { interviews, addInterview, updateInterview, setInterviewStatus, candidates, jobs } = useATS()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [filter, setFilter] = useState('All')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = () => {
    if (!form.candidateName || !form.date || !form.time || !form.round) return
    addInterview({
      ...form,
      duration: parseInt(form.duration),
      interviewers: form.interviewers.split(',').map(s => s.trim()).filter(Boolean),
    })
    setForm(EMPTY)
    setShowForm(false)
  }

  const filtered = filter === 'All' ? interviews : interviews.filter(i => i.status === filter)

  const today = new Date().toISOString().split('T')[0]
  const upcoming = interviews.filter(i => i.date >= today && i.status === 'Scheduled')
  const completed = interviews.filter(i => i.status === 'Completed')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Interviews</h1>
          <p className="section-subtitle">{upcoming.length} upcoming · {completed.length} completed</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <FiPlus className="w-4 h-4" /> Schedule Interview
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Scheduled', value: interviews.filter(i => i.status === 'Scheduled').length, color: '#6366f1' },
          { label: 'Completed', value: interviews.filter(i => i.status === 'Completed').length, color: '#10b981' },
          { label: 'Cancelled', value: interviews.filter(i => i.status === 'Cancelled').length, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
            <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-sm text-slate-500 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['All', 'Scheduled', 'Completed', 'Cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
              filter === f ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Interview cards */}
      <div className="grid gap-4">
        {filtered.map(int => {
          const ModeIcon = MODE_ICON[int.mode] || FiCalendar
          return (
            <div key={int.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                    <ModeIcon className="text-brand-600 w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-slate-900">{int.candidateName}</h3>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{int.round}</span>
                      <StatusBadge status={int.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{int.jobTitle}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1.5"><FiCalendar className="w-3.5 h-3.5" />{int.date}</span>
                      <span className="flex items-center gap-1.5"><FiClock className="w-3.5 h-3.5" />{int.time} · {int.duration} min</span>
                      <span className="flex items-center gap-1.5"><ModeIcon className="w-3.5 h-3.5" />{int.mode}</span>
                      {int.interviewers?.length > 0 && (
                        <span className="flex items-center gap-1.5"><FiUsers className="w-3.5 h-3.5" />{int.interviewers.join(', ')}</span>
                      )}
                    </div>
                    {int.notes && (
                      <p className="text-xs text-slate-400 mt-2 italic">"{int.notes}"</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {int.meetingLink && (
                    <a
                      href={int.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs bg-brand-50 text-brand-600 border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors font-medium"
                    >
                      <FiLink className="w-3.5 h-3.5" /> Join
                    </a>
                  )}
                  {int.status === 'Scheduled' && (
                    <button
                      onClick={() => setInterviewStatus(int.id, "Completed")}
                      className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
                    >
                      Mark Done
                    </button>
                  )}
                  <button
                    onClick={() => setInterviewStatus(int.id, "Cancelled")}
                    className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <FiCalendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No interviews found</p>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Schedule Interview</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700 p-1"><FiX className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Candidate Name *</label>
                  <input className="form-input" value={form.candidateName} onChange={e => set('candidateName', e.target.value)} placeholder="Candidate name" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Job Title</label>
                  <select className="form-input" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)}>
                    <option value="">Select job</option>
                    {jobs.map(j => <option key={j.id} value={j.title}>{j.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Round *</label>
                  <input className="form-input" value={form.round} onChange={e => set('round', e.target.value)} placeholder="e.g. Technical Round 1" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Mode</label>
                  <select className="form-input" value={form.mode} onChange={e => set('mode', e.target.value)}>
                    <option>Video Call</option><option>Phone</option><option>In-Person</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Date *</label>
                  <input type="date" className="form-input" value={form.date} onChange={e => set('date', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Time *</label>
                  <input type="time" className="form-input" value={form.time} onChange={e => set('time', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Duration (min)</label>
                  <input type="number" className="form-input" value={form.duration} onChange={e => set('duration', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Interviewers (comma-separated)</label>
                <input className="form-input" value={form.interviewers} onChange={e => set('interviewers', e.target.value)} placeholder="e.g. John Doe (Lead), Jane Smith (HR)" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Meeting Link</label>
                <input className="form-input" value={form.meetingLink} onChange={e => set('meetingLink', e.target.value)} placeholder="https://meet.google.com/..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Notes</label>
                <textarea className="form-input h-20 resize-none" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Topics to cover, instructions..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleSubmit} className="btn-primary">Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
