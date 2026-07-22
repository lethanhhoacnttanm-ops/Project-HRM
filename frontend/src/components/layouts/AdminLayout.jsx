import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../presentational/Header';
import Sidebar from '../presentational/Sidebar';
import Footer from '../presentational/Footer';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 bg-violet-50">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;