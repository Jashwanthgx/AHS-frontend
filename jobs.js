import { api } from './client'

// GET  /jobs              → list all jobs
// POST /jobs              → create job
// PUT  /jobs/:id          → update job
// DELETE /jobs/:id        → delete job
// PATCH /jobs/:id/status  → toggle Active/Paused

export const jobsApi = {
  getAll:       ()           => api.get('/jobs'),
  create:       (data)       => api.post('/jobs', data),
  update:       (id, data)   => api.put(`/jobs/${id}`, data),
  remove:       (id)         => api.delete(`/jobs/${id}`),
  setStatus:    (id, status) => api.patch(`/jobs/${id}/status`, { status }),
  getApplicants:(id)         => api.get(`/jobs/${id}/applicants`),
}
