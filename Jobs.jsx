import { useState } from 'react'
import { FiBriefcase, FiPlus, FiX, FiMapPin, FiClock, FiUsers, FiCalendar, FiEdit2, FiTrash2, FiPause, FiPlay } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'
import { DEPARTMENTS, JOB_TYPES, EXPERIENCE_LEVELS, SKILLS_POOL } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'

const EMPTY_FORM = {
  title: '', department: '', location: '', type: 'Full-time',
  experience: '', salary: '', description: '', deadline: '',
  requiredSkills: [], niceToHave: [],
}

export default function Jobs() {
  const { jobs, addJob, updateJob, deleteJob, toggleJobStatus } = useATS()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [skillInput, setSkillInput] = useState('')
  const [niceInput, setNiceInput] = useState('')
  const [errors, setErrors] = useState({})
  const [filter, setFilter] = useState('All')
  const [viewJob, setViewJob] = useState(null)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const addSkill = (list, setList, value) => {
    const s = value.trim()
    if (s && !form[list].includes(s)) {
      set(list, [...form[list], s])
    }
    setList('')
  }

  const removeSkill = (list, skill) => {
    set(list, form[list].filter(s => s !== skill))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Required'
    if (!form.department) e.department = 'Required'
    if (!form.location.trim()) e.location = 'Required'
    if (!form.experience) e.experience = 'Required'
    if (!form.description.trim()) e.description = 'Required'
    if (form.requiredSkills.length === 0) e.requiredSkills = 'Add at least one skill'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    addJob(form)
    setForm(EMPTY_FORM)
    setShowForm(false)
    setErrors({})
  }

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.status === filter)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Job Management</h1>
          <p className="section-subtitle">{jobs.length} total positions · {jobs.filter(j=>j.status==='Active').length} active</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <FiPlus className="w-4 h-4" /> Create Job
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['All', 'Active', 'Paused'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
              filter === f ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="grid gap-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                  <FiBriefcase className="text-brand-600 w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 flex-wrap text-xs text-slate-500">
                    <span className="flex items-center gap-1"><FiBriefcase className="w-3 h-3" />{job.department}</span>
                    <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{job.experience}</span>
                    <span className="flex items-center gap-1"><FiUsers className="w-3 h-3" />{job.applicantCount} applicants</span>
                    {job.deadline && <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" />Deadline {job.deadline}</span>}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.requiredSkills.slice(0, 4).map(s => (
                      <span key={s} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                    {job.requiredSkills.length > 4 && (
                      <span className="text-xs text-slate-400">+{job.requiredSkills.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-bold text-slate-700">{job.salary}</span>
                <button
                  onClick={() => toggleJobStatus(job.id)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
                  title={job.status === 'Active' ? 'Pause Job' : 'Activate Job'}
                >
                  {job.status === 'Active' ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setViewJob(viewJob?.id === job.id ? null : job)}
                  className="p-2 rounded-lg hover:bg-brand-50 transition-colors text-brand-600"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-400"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded description */}
            {viewJob?.id === job.id && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{job.description}</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-slate-700 mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.map(s => <span key={s} className="skill-chip-matched">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 mb-2">Nice to Have</p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.niceToHave?.map(s => <span key={s} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <FiBriefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No jobs found</p>
          </div>
        )}
      </div>

      {/* Create Job Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-900">Create New Job</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Job Title *</label>
                  <input className={`form-input ${errors.title ? 'border-red-300' : ''}`} value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Senior Frontend Engineer" />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Department *</label>
                  <select className={`form-input ${errors.department ? 'border-red-300' : ''}`} value={form.department} onChange={e => set('department', e.target.value)}>
                    <option value="">Select department</option>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Location *</label>
                  <input className={`form-input ${errors.location ? 'border-red-300' : ''}`} value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Remote / Hyderabad" />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Job Type</label>
                  <select className="form-input" value={form.type} onChange={e => set('type', e.target.value)}>
                    {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Experience Required *</label>
                  <select className={`form-input ${errors.experience ? 'border-red-300' : ''}`} value={form.experience} onChange={e => set('experience', e.target.value)}>
                    <option value="">Select experience</option>
                    {EXPERIENCE_LEVELS.map(e => <option key={e}>{e}</option>)}
                  </select>
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Salary Range</label>
                  <input className="form-input" value={form.salary} onChange={e => set('salary', e.target.value)} placeholder="e.g. ₹15L – ₹25L" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Application Deadline</label>
                <input type="date" className="form-input" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Job Description *</label>
                <textarea
                  className={`form-input h-28 resize-none ${errors.description ? 'border-red-300' : ''}`}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Describe the role, responsibilities, and team..."
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Required Skills */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Required Skills *</label>
                <div className="flex gap-2 mb-2">
                  <input
                    list="skills-list"
                    className={`form-input flex-1 ${errors.requiredSkills ? 'border-red-300' : ''}`}
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill('requiredSkills', setSkillInput, skillInput))}
                    placeholder="Type and press Enter or click Add"
                  />
                  <datalist id="skills-list">{SKILLS_POOL.map(s => <option key={s} value={s} />)}</datalist>
                  <button onClick={() => addSkill('requiredSkills', setSkillInput, skillInput)} className="btn-secondary px-4">Add</button>
                </div>
                {errors.requiredSkills && <p className="text-red-500 text-xs mb-1">{errors.requiredSkills}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {form.requiredSkills.map(s => (
                    <span key={s} className="flex items-center gap-1 skill-chip-matched">
                      {s} <button onClick={() => removeSkill('requiredSkills', s)} className="text-emerald-500 hover:text-emerald-700"><FiX className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Nice to Have */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Nice to Have Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    list="skills-list"
                    className="form-input flex-1"
                    value={niceInput}
                    onChange={e => setNiceInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill('niceToHave', setNiceInput, niceInput))}
                    placeholder="Add bonus skills..."
                  />
                  <button onClick={() => addSkill('niceToHave', setNiceInput, niceInput)} className="btn-secondary px-4">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.niceToHave.map(s => (
                    <span key={s} className="flex items-center gap-1 bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full">
                      {s} <button onClick={() => removeSkill('niceToHave', s)} className="hover:text-red-500"><FiX className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-100 sticky bottom-0 bg-white">
              <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                <FiPlus className="w-4 h-4" /> Create Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
