import { api } from './client'

// GET  /candidates              → list all candidates (optionally ?job_id=&status=)
// GET  /candidates/:id          → single candidate detail
// PATCH /candidates/:id/status  → update status (Selected/Hold/Rejected/Applied)
// PATCH /candidates/:id/notes   → save recruiter notes
// GET  /candidates/:id/evaluate → trigger AI re-evaluation (returns updated score)

export const candidatesApi = {
  getAll:       (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return api.get(`/candidates${qs ? '?' + qs : ''}`)
  },
  getOne:       (id)           => api.get(`/candidates/${id}`),
  updateStatus: (id, status)   => api.patch(`/candidates/${id}/status`, { status }),
  updateNotes:  (id, notes)    => api.patch(`/candidates/${id}/notes`, { notes }),
  evaluate:     (id)           => api.get(`/candidates/${id}/evaluate`),
  getPipeline:  ()             => api.get('/candidates/pipeline'),   // grouped by status
}
