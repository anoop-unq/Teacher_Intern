
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle auth failures
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Only redirect if we're not already on the login page
//       if (window.location.pathname !== '/login') {
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = 'https://teacher-intern.onrender.com';


// Create axios instance with proper credentials configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Track authentication check state
let isAuthCheckInProgress = false;

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Mark as auth check if it's a profile request
    if (config.url === '/api/profile') {
      isAuthCheckInProgress = true;
      console.log('🔐 Starting authentication check...');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Reset auth check flag
    if (response.config.url === '/api/profile') {
      isAuthCheckInProgress = false;
      console.log('✅ Authentication check successful');
    }
    return response;
  },
  (error) => {
    // Reset auth check flag on error
    if (error.config?.url === '/api/profile') {
      isAuthCheckInProgress = false;
      console.log('❌ Authentication check failed:', error.response?.status);
    }
    
    if (error.response?.status === 401) {
      console.log('🔑 401 detected. Auth check in progress:', isAuthCheckInProgress);
      
      // CRITICAL: Never redirect during authentication check
      if (isAuthCheckInProgress) {
        console.log('🛑 Not redirecting - authentication check in progress');
        return Promise.reject(error);
      }
      
      // Only redirect for non-auth-check requests
      const currentPath = window.location.pathname;
      const isAuthPage = ['/login', '/register'].includes(currentPath);
      
      if (!isAuthPage) {
        console.log('➡️ Redirecting to login page');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;