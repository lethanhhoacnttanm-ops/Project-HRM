import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeHeader from './EmployeeHeader';
import { ConfigProvider, theme as antTheme } from 'antd';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '../../hooks/usetheme.js';

const EmployeeContent = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const { theme: currentTheme } = useTheme();

  return (
    <ConfigProvider 
      theme={{ 
        algorithm: currentTheme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm 
      }}
    >
      <div className={`employee-container ${currentTheme === 'dark' ? 'dark' : ''} flex h-screen overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-300`}>
        <EmployeeSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <EmployeeHeader
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            user={user}
          />

          <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 dark:bg-black transition-colors duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

const EmployeeLayout = () => {
  return (
    <ThemeProvider storageKey="employee_theme">
      <EmployeeContent />
    </ThemeProvider>
  );
};

export default EmployeeLayout;