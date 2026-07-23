import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  UserOutlined,
  AppstoreOutlined,
  DownOutlined,
  RightOutlined
} from '@ant-design/icons';

const mainNav = [
  { path: 'dashboard', label: 'Tổng quan', icon: <DashboardOutlined /> },
  {
    label: 'Nhân sự',
    icon: <UsergroupAddOutlined />,
    children: [
      { path: 'employees', label: 'Hồ sơ nhân viên', icon: <UsergroupAddOutlined /> },
      { path: 'contracts', label: 'Hợp đồng lao động', icon: <UsergroupAddOutlined /> },
      { path: 'recruitment', label: 'Tuyển dụng nội bộ', icon: <UsergroupAddOutlined /> },
    ]
  },
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

const SubmenuItem = ({ item }) => {
  const location = useLocation();
  
  const isChildActive = item.children.some(child => location.pathname === child.path);
  const [isOpen, setIsOpen] = useState(isChildActive);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold border-r-4 text-black hover:text-blue-600 ${
          isOpen || isChildActive
            ? 'bg-indigo-50 border-blue-600 shadow-xs text-blue-600'
            : 'bg-white hover:bg-indigo-100/80 border-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg flex items-center">{item.icon}</span>
          <span>{item.label}</span>
        </div>
        <span className="text-xs">
          {isOpen ? <DownOutlined className="text-blue-600" /> : <RightOutlined className="text-gray-400" />}
        </span>
      </button>

      {isOpen && (
        <div className="bg-indigo-50/40 p-2 rounded-2xl border border-indigo-100/80 space-y-1.5 ml-1">
          {item.children.map((sub) => (
            <NavLink
              key={sub.path}
              to={sub.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 text-xs font-semibold ${
                  isActive
                    ? 'bg-indigo-50 text-blue-600 border-r-4 border-blue-600 shadow-2xs font-bold'
                    : 'text-black hover:text-blue-600 hover:bg-indigo-100/50'
                }`
              }
            >
              <span className="text-sm flex items-center">{sub.icon}</span>
              <span>{sub.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const renderNavItem = (item, idx) => {
    if (item.children) {
      return <SubmenuItem key={idx} item={item} />;
    }

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold border-r-4 ${
            isActive
              ? 'bg-indigo-50 text-blue-600 border-blue-600 shadow-xs'
              : 'bg-white text-black hover:bg-indigo-100/80 border-transparent'
          }`
        }
      >
        <span className="text-lg flex items-center">{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    );
  };

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