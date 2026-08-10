import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Ưu tiên 1: Lấy từ localStorage
  // Ưu tiên 2: Lấy từ cài đặt hệ thống (OS)
  // Mặc định: 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) return 'dark';
    
    return 'light';
  });

  // Hiệu ứng chạy mỗi khi state 'theme' thay đổi
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Xóa class cũ, thêm class mới vào thẻ <html>
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Lưu vào localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};