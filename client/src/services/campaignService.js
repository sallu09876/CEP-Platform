import api from './api';

export const campaignService = {
  getAll: () => api.get('/campaigns'),
  create: (data) => api.post('/campaigns', data),
  send: (id) => api.put(`/campaigns/${id}/send`),
  delete: (id) => api.delete(`/campaigns/${id}`),
};
