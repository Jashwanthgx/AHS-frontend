import { api } from './client'

export const interviewsApi = {
  getAll:     ()           => api.get('/interviews'),
  create:     (data)       => api.post('/interviews', data),
  update:     (id, data)   => api.put(`/interviews/${id}`, data),
  setStatus:  (id, status) => api.patch(`/interviews/${id}/status`, { status }),
  remove:     (id)         => api.delete(`/interviews/${id}`),
}
