import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  DollarOutlined,
  RiseOutlined,
  CustomerServiceOutlined,
  BarChartOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';

const mainNav = [
  { path: '/dashboard', label: 'Tổng quan', icon: <DashboardOutlined /> },
  { path: '/employees', label: 'Nhân sự', icon: <UsergroupAddOutlined /> },
  { path: '/attendance', label: 'Chấm công', icon: <CalendarOutlined /> },
  { path: '/payroll', label: 'Lương thưởng', icon: <DollarOutlined /> },
  { path: '/development', label: 'Phát triển', icon: <RiseOutlined /> },
  { path: '/support', label: 'Hỗ trợ', icon: <CustomerServiceOutlined /> },
];

const systemNav = [
  { path: '/reports', label: 'Báo cáo', icon: <BarChartOutlined /> },
  { path: '/notifications', label: 'Thông báo', icon: <BellOutlined /> },
  { path: '/settings', label: 'Cài đặt', icon: <SettingOutlined /> },
];

const Sidebar = () => {
  const renderNavItem = (item) => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold border-r-4 ${
          isActive
            ? 'bg-indigo-50! text-blue-600! border-blue-600! shadow-xs'
            : 'bg-white-50! text-black-600 hover:bg-indigo-100/80 border-transparent hover:text-blue-600 hover:border-r-blue-600'
        }`
      }
    >
      <span className="text-lg flex items-center">{item.icon}</span>
      <span>{item.label}</span>
    </NavLink>
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="h-16 px-6 flex items-center gap-2.5 border-b border-gray-50">
        <div className="w-60 h-40 flex-1 rounded-lg flex items-center justify-center text-white font-bold">
          <img src='/hrm_system_logo.png' />
        </div>
        <span className="flex-2 text-xl font-extrabold text-blue-600 tracking-tight">HRM System</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {mainNav.map(renderNavItem)}

        <div className="flex items-center my-4 px-2">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-2 text-[11px] text-gray-400 font-medium uppercase tracking-wider">
            Cấu hình & Hệ thống
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {systemNav.map(renderNavItem)}
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <UserOutlined className="text-gray-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-600 leading-tight">Quản trị viên</div>
            <div className="text-[10px] text-gray-400">Trưởng bộ quản trị hệ thống</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;