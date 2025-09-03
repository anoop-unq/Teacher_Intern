import api from './api';

export const authService = {
  login: (credentials) => api.post('/api/login', credentials),
  register: (userData) => api.post('/api/register', userData),
  logout: () => api.post('/api/logout'),
  getProfile: () => api.get('/api/profile'),
};
