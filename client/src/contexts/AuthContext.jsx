// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { authService } from '../services/auth';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;
    
//     const checkAuth = async () => {
//       try {
//         const response = await authService.getProfile();
//         if (isMounted && response.data) {
//           setUser(response.data);
//         }
//       } catch (error) {
//         if (isMounted) {
//           setUser(null);
//           // Don't set error here - it's normal for unauthorized users
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     checkAuth();

//     // Cleanup function to prevent state updates on unmounted component
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const login = async (credentials) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await authService.login(credentials);
//       const userData = response.data;
      
//       setUser(userData);
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Login failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (userData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await authService.register(userData);
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Registration failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       setLoading(true);
//       await authService.logout();
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Even if logout API fails, we still clear local state
//     } finally {
//       setUser(null);
//       setLoading(false);
//     }
//   };

//   const value = {
//     user,
//     login,
//     register,
//     logout,
//     loading,
//     error,
//     clearError: () => setError(null)
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';
import { cookieUtils } from '../utils/cookies';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      // Check if we have an auth cookie before making the request
      const hasAuthCookie = cookieUtils.exists('token');
      
      if (!hasAuthCookie) {
        // No token cookie, definitely not authenticated
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await authService.getProfile();
        if (isMounted && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
          // Clear invalid token cookie
          cookieUtils.remove('token');
          
          // Don't log 401 errors as they are expected for unauthenticated users
          if (error.response?.status !== 401) {
            console.error('Auth check error:', error);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Only check auth if we're not on login/register pages
    const currentPath = window.location.pathname;
    const isAuthPage = ['/login', '/register', '/'].includes(currentPath);
    
    if (!isAuthPage) {
      checkAuth();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      const userData = response.data;
      
      setUser(userData);
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      cookieUtils.remove('token');
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

