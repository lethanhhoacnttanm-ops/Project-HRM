import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkAuthStatus = async () => {
      try {
        const response = await authService.getMe();
        if (isMounted && response?.success) {
          setUser(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false); 
        }
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        setUser(response.data);
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      const response = await authService.register(formData);
      if (response.success) {
        setUser(response.data); 
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleRegister, handleLogin, handleLogout }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-xs font-bold text-gray-400 animate-pulse">Đang tải dữ liệu...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};