import React, { createContext, useState } from 'react';
import { authService } from '../services/auth.service.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

 
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
    <AuthContext.Provider value={{ user, loading, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};