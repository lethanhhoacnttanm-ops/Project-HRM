import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeHeader from './EmployeeHeader';

const EmployeeLayout = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
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

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;