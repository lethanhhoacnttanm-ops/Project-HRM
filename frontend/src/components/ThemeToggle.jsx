import { useTheme } from '../hooks/usetheme.js';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-colors"
    >
      {theme === 'light' ? '🌙 Chế độ ban đêm' : '☀️ Chế độ ban ngày'}
    </button>
  );
};

export default ThemeToggle;