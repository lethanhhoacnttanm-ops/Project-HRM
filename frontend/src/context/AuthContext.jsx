import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authService.getMe();
        if (response?.success) {
          setUser(response.data);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    checkAuthStatus();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      
      setUser(null);
      setIsInitializing(false);
      return;
    }

    try {
      const res = await api.get('/me');
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      if (response?.success) {
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
    } catch (error) {
      console.error('Lỗi API logout:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ setUser ,user, loading, isInitializing, handleLogin, handleLogout }}>
      {isInitializing ? (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-xs font-bold text-gray-400 animate-pulse">Đang tải dữ liệu...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};