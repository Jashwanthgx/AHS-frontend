import { api } from './client'

export const authApi = {
  login:       (credentials) => api.post('/auth/login', credentials),
  logout:      ()            => api.post('/auth/logout', {}),
  me:          ()            => api.get('/auth/me'),
  guestAccess: ()            => api.post('/auth/guest', {}),
}
