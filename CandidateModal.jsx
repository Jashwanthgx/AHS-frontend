import { useState } from 'react'
import {
  FiX, FiMail, FiPhone, FiMapPin, FiExternalLink,
  FiBriefcase, FiBook, FiCalendar, FiFileText,
  FiCheckCircle, FiAlertCircle, FiCpu, FiEdit3, FiEyeOff
} from 'react-icons/fi'
import { useATS } from '../context/ATSContext'
import ScoreRing from './ScoreRing'
import StatusBadge from './StatusBadge'

const STATUS_OPTIONS = ['Applied', 'Hold', 'Selected', 'Rejected']

export default function CandidateModal({ candidate, onClose }) {
  const { updateCandidateStatus, updateCandidate, blindMode, addInterview } = useATS()
  const [activeTab, setActiveTab] = useState('profile')
  const [notes, setNotes] = useState(candidate.notes || '')
  const [editingNotes, setEditingNotes] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({
    round: '', date: '', time: '', mode: 'Video Call', interviewers: '', notes: ''
  })
  const [showSchedule, setShowSchedule] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleStatusChange = (status) => {
    updateCandidateStatus(candidate.id, status)
  }

  const handleSaveNotes = () => {
    updateCandidate(candidate.id, { notes })
    setEditingNotes(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSchedule = () => {
    if (!scheduleForm.round || !scheduleForm.date || !scheduleForm.time) return
    addInterview({
      candidateId: candidate.id,
      candidateName: candidate.name,
      jobTitle: candidate.jobTitle,
      round: scheduleForm.round,
      date: scheduleForm.date,
      time: scheduleForm.time,
      duration: 60,
      mode: scheduleForm.mode,
      interviewers: scheduleForm.interviewers.split(',').map(s => s.trim()).filter(Boolean),
      meetingLink: '',
      notes: scheduleForm.notes,
    })
    setShowSchedule(false)
    setScheduleForm({ round: '', date: '', time: '', mode: 'Video Call', interviewers: '', notes: '' })
  }

  const maskedName = blindMode ? `Candidate #${candidate.id.split('-')[1]}` : candidate.name
  const maskedEmail = blindMode ? '***@***.com' : candidate.email
  const maskedPhone = blindMode ? '+91 ***** *****' : candidate.phone

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in">

        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-brand-900">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-xl bg-brand-500/20 border-2 border-brand-400/30 flex items-center justify-center text-xl font-bold text-brand-300 flex-shrink-0">
            {blindMode ? <FiEyeOff className="w-6 h-6" /> : maskedName[0]}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-white truncate">{maskedName}</h2>
              {blindMode && (
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Blind Mode
                </span>
              )}
            </div>
            <p className="text-slate-300 text-sm mt-0.5">{candidate.currentRole}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <StatusBadge status={candidate.status} />
              <span className="text-slate-400 text-xs">{candidate.jobTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <ScoreRing score={candidate.aiScore} size={60} />
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-white">
          {['profile', 'skills', 'ai-reasoning', 'notes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'ai-reasoning' ? 'AI Reasoning' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── PROFILE TAB ─────────────────────────────────────────────── */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Contact */}
              <div className="grid grid-cols-2 gap-4">
                <InfoItem icon={<FiMail />} label="Email" value={maskedEmail} />
                <InfoItem icon={<FiPhone />} label="Phone" value={maskedPhone} />
                <InfoItem icon={<FiMapPin />} label="Location" value={candidate.location} />
                <InfoItem icon={<FiBriefcase />} label="Experience" value={candidate.experience} />
                <InfoItem icon={<FiBook />} label="Education" value={candidate.education} />
                <InfoItem icon={<FiCalendar />} label="Applied" value={candidate.appliedDate} />
              </div>

              {/* Status changer */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
                  Update Status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_OPTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className={`px-4 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                        candidate.status === s
                          ? s === 'Selected' ? 'bg-emerald-500 text-white border-emerald-500' :
                            s === 'Hold' ? 'bg-amber-500 text-white border-amber-500' :
                            s === 'Rejected' ? 'bg-red-500 text-white border-red-500' :
                            'bg-brand-500 text-white border-brand-500'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule Interview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Schedule Interview
                  </label>
                  <button
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                  >
                    {showSchedule ? 'Cancel' : '+ Add Interview'}
                  </button>
                </div>
                {showSchedule && (
                  <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                    <div className="grid grid-cols-2 gap-3">
                      <input className="form-input" placeholder="Round (e.g. Technical)" value={scheduleForm.round} onChange={e => setScheduleForm(p => ({...p, round: e.target.value}))} />
                      <select className="form-input" value={scheduleForm.mode} onChange={e => setScheduleForm(p => ({...p, mode: e.target.value}))}>
                        <option>Video Call</option><option>Phone</option><option>In-Person</option>
                      </select>
                      <input type="date" className="form-input" value={scheduleForm.date} onChange={e => setScheduleForm(p => ({...p, date: e.target.value}))} />
                      <input type="time" className="form-input" value={scheduleForm.time} onChange={e => setScheduleForm(p => ({...p, time: e.target.value}))} />
                    </div>
                    <input className="form-input" placeholder="Interviewers (comma-separated)" value={scheduleForm.interviewers} onChange={e => setScheduleForm(p => ({...p, interviewers: e.target.value}))} />
                    <button onClick={handleSchedule} className="btn-primary text-sm">Schedule</button>
                  </div>
                )}
              </div>

              {/* LinkedIn */}
              {!blindMode && candidate.linkedIn && (
                <a
                  href={`https://${candidate.linkedIn}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-brand-600 text-sm hover:underline"
                >
                  <FiExternalLink className="w-4 h-4" /> View LinkedIn Profile
                </a>
              )}
            </div>
          )}

          {/* ── SKILLS TAB ──────────────────────────────────────────────── */}
          {activeTab === 'skills' && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiCheckCircle className="text-emerald-500 w-4 h-4" />
                  <h3 className="font-semibold text-slate-800 text-sm">Matched Skills ({candidate.matchedSkills.length})</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.matchedSkills.map(skill => (
                    <span key={skill} className="skill-chip-matched">{skill}</span>
                  ))}
                  {candidate.matchedSkills.length === 0 && (
                    <p className="text-slate-400 text-sm">No matched skills recorded</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiAlertCircle className="text-red-500 w-4 h-4" />
                  <h3 className="font-semibold text-slate-800 text-sm">Missing Skills ({candidate.missingSkills.length})</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.missingSkills.map(skill => (
                    <span key={skill} className="skill-chip-missing">{skill}</span>
                  ))}
                  {candidate.missingSkills.length === 0 && (
                    <span className="text-emerald-600 text-sm font-medium">✓ All required skills present!</span>
                  )}
                </div>
              </div>

              {/* Match bar */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Overall Skill Match</span>
                  <span className="font-bold text-brand-600">{candidate.aiScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${candidate.aiScore}%`,
                      background: candidate.aiScore >= 85 ? '#10b981' : candidate.aiScore >= 65 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── AI REASONING TAB ────────────────────────────────────────── */}
          {activeTab === 'ai-reasoning' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-brand-50 rounded-xl border border-brand-100">
                <FiCpu className="text-brand-500 w-4 h-4 flex-shrink-0" />
                <p className="text-xs text-brand-700 font-medium">
                  AI-generated analysis based on JD-resume skill matching
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <FiFileText className="w-4 h-4 text-slate-500" /> AI Decision Reasoning
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">{candidate.aiReasoning}</p>
              </div>

              {/* Score breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <ScoreItem label="Skills Match" value={candidate.matchedSkills.length} total={candidate.matchedSkills.length + candidate.missingSkills.length} color="emerald" />
                <ScoreItem label="Missing Skills" value={candidate.missingSkills.length} total={candidate.matchedSkills.length + candidate.missingSkills.length} color="red" invert />
                <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
                  <div className="flex justify-center mb-2">
                    <ScoreRing score={candidate.aiScore} size={52} strokeWidth={4} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">AI Score</p>
                </div>
              </div>

              {/* Verdict */}
              <div className={`p-4 rounded-xl border ${
                candidate.status === 'Selected' ? 'bg-emerald-50 border-emerald-200' :
                candidate.status === 'Rejected' ? 'bg-red-50 border-red-200' :
                'bg-amber-50 border-amber-200'
              }`}>
                <p className={`text-sm font-semibold ${
                  candidate.status === 'Selected' ? 'text-emerald-700' :
                  candidate.status === 'Rejected' ? 'text-red-700' :
                  'text-amber-700'
                }`}>
                  AI Verdict: {
                    candidate.aiScore >= 85 ? 'Strongly Recommend' :
                    candidate.aiScore >= 65 ? 'Consider with Caution' :
                    'Not Recommended'
                  }
                </p>
              </div>
            </div>
          )}

          {/* ── NOTES TAB ───────────────────────────────────────────────── */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Recruiter Notes</h3>
                <button
                  onClick={() => editingNotes ? handleSaveNotes() : setEditingNotes(true)}
                  className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    editingNotes ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <FiEdit3 className="w-3.5 h-3.5" />
                  {editingNotes ? 'Save Notes' : 'Edit'}
                </button>
              </div>
              {saved && <p className="text-emerald-600 text-xs font-medium">Notes saved!</p>}
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                readOnly={!editingNotes}
                placeholder="Add internal notes about this candidate..."
                className={`w-full h-48 p-4 rounded-xl border text-sm resize-none transition-colors ${
                  editingNotes ? 'border-brand-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20' : 'border-slate-100 bg-slate-50'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl">
      <span className="text-slate-400 mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm text-slate-800 font-medium mt-0.5">{value || '—'}</p>
      </div>
    </div>
  )
}

function ScoreItem({ label, value, total, color, invert }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  const display = invert ? (100 - pct) : pct
  const colorMap = { emerald: '#10b981', red: '#ef4444', amber: '#f59e0b' }
  return (
    <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
      <p className="text-2xl font-bold" style={{ color: colorMap[color] }}>{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}
