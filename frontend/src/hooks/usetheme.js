import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme phải được sử dụng bên trong ThemeProvider');
  }
  
  return context;
};