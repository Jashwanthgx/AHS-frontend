import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { jobsApi } from '../api/jobs'
import { candidatesApi } from '../api/candidates'
import { interviewsApi } from '../api/interviews'
import { INITIAL_JOBS, INITIAL_CANDIDATES, INITIAL_INTERVIEWS } from '../data/mockData'

const ATSContext = createContext(null)

// ─── Helper: try API, fall back to mock ──────────────────────────────────────
async function tryApi(apiFn, fallback) {
  try {
    const result = await apiFn()
    return { data: result, fromApi: true }
  } catch {
    return { data: fallback, fromApi: false }
  }
}

export function ATSProvider({ children }) {
  const [jobs, setJobs]               = useState([])
  const [candidates, setCandidates]   = useState([])
  const [interviews, setInterviews]   = useState([])
  const [blindMode, setBlindMode]     = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [apiOnline, setApiOnline]     = useState(false)
  const [loading, setLoading]         = useState(true)
  const [toast, setToast]             = useState(null)
  const toastRef                      = useRef(null)

  // ── Toast ────────────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    clearTimeout(toastRef.current)
    setToast({ message, type })
    toastRef.current = setTimeout(() => setToast(null), 3500)
  }, [])

  // ── Bootstrap: load everything from API or mock ──────────────────────────
  useEffect(() => {
    async function bootstrap() {
      setLoading(true)
      const [jobsRes, candsRes, intsRes] = await Promise.all([
        tryApi(() => jobsApi.getAll(), INITIAL_JOBS),
        tryApi(() => candidatesApi.getAll(), INITIAL_CANDIDATES),
        tryApi(() => interviewsApi.getAll(), INITIAL_INTERVIEWS),
      ])
      setJobs(jobsRes.data || INITIAL_JOBS)
      setCandidates(candsRes.data || INITIAL_CANDIDATES)
      setInterviews(intsRes.data || INITIAL_INTERVIEWS)
      setApiOnline(jobsRes.fromApi)
      setLoading(false)
    }
    bootstrap()
  }, [])

  // ── Jobs ──────────────────────────────────────────────────────────────────
  const addJob = useCallback(async (job) => {
    const newJob = {
      ...job,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantCount: 0,
      status: 'Active',
    }
    try {
      const created = apiOnline ? await jobsApi.create(job) : newJob
      setJobs(prev => [created, ...prev])
      showToast('Job posted successfully!')
      return created
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [apiOnline, showToast])

  const updateJob = useCallback(async (id, updates) => {
    try {
      if (apiOnline) await jobsApi.update(id, updates)
      setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j))
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [apiOnline, showToast])

  const deleteJob = useCallback(async (id) => {
    try {
      if (apiOnline) await jobsApi.remove(id)
      setJobs(prev => prev.filter(j => j.id !== id))
      showToast('Job deleted.')
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [apiOnline, showToast])

  const toggleJobStatus = useCallback(async (id) => {
    const job = jobs.find(j => j.id === id)
    if (!job) return
    const next = job.status === 'Active' ? 'Paused' : 'Active'
    try {
      if (apiOnline) await jobsApi.setStatus(id, next)
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status: next } : j))
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [jobs, apiOnline, showToast])

  // ── Candidates ────────────────────────────────────────────────────────────
  const updateCandidateStatus = useCallback(async (id, status) => {
    try {
      if (apiOnline) await candidatesApi.updateStatus(id, status)
      setCandidates(prev => prev.map(c => c.id === id ? { ...c, status } : c))
      showToast(`Candidate moved to ${status}`)
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [apiOnline, showToast])

  const updateCandidate = useCallback(async (id, updates) => {
    try {
      if (apiOnline && updates.notes !== undefined) {
        await candidatesApi.updateNotes(id, updates.notes)
      }
      setCandidates(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [apiOnline, showToast])

  const refetchCandidates = useCallback(async () => {
    try {
      const data = await candidatesApi.getAll()
      setCandidates(data)
    } catch {}
  }, [])

  // ── Interviews ────────────────────────────────────────────────────────────
  const addInterview = useCallback(async (interview) => {
    const newInt = { ...interview, id: `int-${Date.now()}`, status: 'Scheduled' }
    try {
      const created = apiOnline ? await interviewsApi.create(interview) : newInt
      setInterviews(prev => [created, ...prev])
      showToast('Interview scheduled!')
      return created
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [apiOnline, showToast])

  const updateInterview = useCallback(async (id, updates) => {
    try {
      if (apiOnline) await interviewsApi.update(id, updates)
      setInterviews(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i))
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [apiOnline, showToast])

  const setInterviewStatus = useCallback(async (id, status) => {
    try {
      if (apiOnline) await interviewsApi.setStatus(id, status)
      setInterviews(prev => prev.map(i => i.id === id ? { ...i, status } : i))
      showToast(`Interview ${status.toLowerCase()}.`)
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [apiOnline, showToast])

  // ── Computed stats ────────────────────────────────────────────────────────
  const stats = {
    totalCandidates:    candidates.length,
    selected:           candidates.filter(c => c.status === 'Selected').length,
    rejected:           candidates.filter(c => c.status === 'Rejected').length,
    hold:               candidates.filter(c => c.status === 'Hold').length,
    applied:            candidates.filter(c => c.status === 'Applied').length,
    borderline:         candidates.filter(c => c.status === 'Borderline').length,
    activeJobs:         jobs.filter(j => j.status === 'Active').length,
    totalInterviews:    interviews.length,
    scheduledInterviews:interviews.filter(i => i.status === 'Scheduled').length,
    avgScore:           Math.round(candidates.reduce((s, c) => s + (c.aiScore || 0), 0) / (candidates.length || 1)),
  }

  return (
    <ATSContext.Provider value={{
      jobs, candidates, interviews,
      blindMode, setBlindMode,
      selectedJob, setSelectedJob,
      apiOnline, loading, stats, toast,
      addJob, updateJob, deleteJob, toggleJobStatus,
      updateCandidateStatus, updateCandidate, refetchCandidates,
      addInterview, updateInterview, setInterviewStatus,
      showToast,
    }}>
      {children}
    </ATSContext.Provider>
  )
}

export const useATS = () => {
  const ctx = useContext(ATSContext)
  if (!ctx) throw new Error('useATS must be used within ATSProvider')
  return ctx
}
