import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../presentational/Header';
import Sidebar from '../presentational/Sidebar';
import Footer from '../presentational/Footer';
import { ConfigProvider, theme as antTheme } from 'antd';
import { useTheme } from '../../hooks/usetheme.js';

const AdminLayout = () => {
  const { theme } = useTheme();
  return (
    <ConfigProvider theme={{ algorithm: theme === 'dark' ? antTheme.darkAlgorithm : theme.defaultAlgorithm }}>
      <div className="flex min-h-screen bg-white">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header />

          <main className="flex-1 p-6 bg-violet-50 dark:bg-black transition-colors duration-300 ">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdminLayout;