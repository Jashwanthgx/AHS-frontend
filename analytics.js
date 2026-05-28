import { api } from './client'

export const analyticsApi = {
  getDashboard:   () => api.get('/analytics/dashboard'),   // stats + mini-charts
  getHiringTrend: () => api.get('/analytics/hiring-trend'),
  getScoreDist:   () => api.get('/analytics/score-distribution'),
  getSkillDemand: () => api.get('/analytics/skill-demand'),
  getPipeline:    () => api.get('/analytics/pipeline'),
}
