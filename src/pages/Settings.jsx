import { useState } from 'react'
import { FiSave, FiEyeOff, FiEye, FiCpu, FiBell, FiUser, FiLock, FiMail } from 'react-icons/fi'
import { useATS } from '../context/ATSContext'

export default function Settings() {
  const { blindMode, setBlindMode } = useATS()
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Recruiter Admin',
    email: 'recruiter@talentai.in',
    company: 'TalentAI',
    role: 'Senior Recruiter',
    timezone: 'Asia/Kolkata',
  })
  const [aiSettings, setAiSettings] = useState({
    minScore: 60,
    autoReject: false,
    autoHold: false,
    weightSkills: 70,
    weightExp: 30,
  })
  const [notif, setNotif] = useState({
    newApplicant: true,
    scoreUpdate: true,
    interviewReminder: true,
    weeklyReport: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-3xl animate-fade-in">
      <div>
        <h1 className="section-title">Settings</h1>
        <p className="section-subtitle">Configure your recruiter preferences and AI parameters</p>
      </div>

      {/* Profile */}
      <Section title="Recruiter Profile" icon={<FiUser />}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name" value={profile.name} onChange={v => setProfile(p => ({...p, name: v}))} />
          <Field label="Email" type="email" value={profile.email} onChange={v => setProfile(p => ({...p, email: v}))} />
          <Field label="Company" value={profile.company} onChange={v => setProfile(p => ({...p, company: v}))} />
          <Field label="Role" value={profile.role} onChange={v => setProfile(p => ({...p, role: v}))} />
          <div className="col-span-2">
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Timezone</label>
            <select className="form-input" value={profile.timezone} onChange={e => setProfile(p => ({...p, timezone: e.target.value}))}>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
            </select>
          </div>
        </div>
      </Section>

      {/* AI Config */}
      <Section title="AI Evaluation Settings" icon={<FiCpu />}>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                Minimum AI Score to Advance: <span className="text-brand-600">{aiSettings.minScore}%</span>
              </label>
              <input
                type="range" min={40} max={95} step={5}
                value={aiSettings.minScore}
                onChange={e => setAiSettings(p => ({...p, minScore: +e.target.value}))}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>40%</span><span>95%</span></div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                Skills vs Experience Weight: Skills {aiSettings.weightSkills}% / Exp {aiSettings.weightExp}%
              </label>
              <input
                type="range" min={30} max={90} step={10}
                value={aiSettings.weightSkills}
                onChange={e => setAiSettings(p => ({...p, weightSkills: +e.target.value, weightExp: 100 - +e.target.value}))}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>Skills focus</span><span>Exp focus</span></div>
            </div>
          </div>

          <div className="space-y-3">
            <Toggle
              label="Auto-reject candidates below minimum score"
              description="Candidates scoring below the threshold will be automatically marked as Rejected"
              checked={aiSettings.autoReject}
              onChange={v => setAiSettings(p => ({...p, autoReject: v}))}
            />
            <Toggle
              label="Auto-hold borderline candidates"
              description="Candidates in the 60–75% range will be automatically moved to Hold for manual review"
              checked={aiSettings.autoHold}
              onChange={v => setAiSettings(p => ({...p, autoHold: v}))}
            />
          </div>
        </div>
      </Section>

      {/* Blind Mode */}
      <Section title="Blind Screening" icon={<FiEyeOff />}>
        <Toggle
          label="Enable Blind Screening Mode"
          description="Hides candidate names, emails, photos, and personal identifiers to reduce unconscious bias in the hiring process. Data is restored when disabled."
          checked={blindMode}
          onChange={setBlindMode}
          accent
        />
      </Section>

      {/* Notifications */}
      <Section title="Notifications" icon={<FiBell />}>
        <div className="space-y-3">
          <Toggle label="New applicant alert" description="Notify when a candidate applies for any active job" checked={notif.newApplicant} onChange={v => setNotif(p => ({...p, newApplicant: v}))} />
          <Toggle label="AI score update" description="Notify when AI re-evaluates a candidate" checked={notif.scoreUpdate} onChange={v => setNotif(p => ({...p, scoreUpdate: v}))} />
          <Toggle label="Interview reminder" description="Send reminders 1 hour before scheduled interviews" checked={notif.interviewReminder} onChange={v => setNotif(p => ({...p, interviewReminder: v}))} />
          <Toggle label="Weekly hiring report" description="Receive a weekly summary of pipeline activity" checked={notif.weeklyReport} onChange={v => setNotif(p => ({...p, weeklyReport: v}))} />
        </div>
      </Section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <FiSave className="w-4 h-4" /> Save Settings
        </button>
        {saved && (
          <span className="text-emerald-600 text-sm font-medium animate-fade-in">
            ✓ Settings saved successfully
          </span>
        )}
      </div>
    </div>
  )
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <span className="text-brand-600">{icon}</span>
        <h2 className="font-bold text-slate-800 text-sm">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600 mb-1.5 block">{label}</label>
      <input type={type} className="form-input" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

function Toggle({ label, description, checked, onChange, accent }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 mt-0.5 ${
          checked ? (accent ? 'bg-amber-400' : 'bg-brand-600') : 'bg-slate-300'
        }`}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}
