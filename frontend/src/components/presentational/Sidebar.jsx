import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
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

const items = [
  {
    key: '/admin-page/dashboard',
    icon: <DashboardOutlined />,
    label: 'Tổng quan',
  },
  {
    key: 'sub-employees',
    icon: <UsergroupAddOutlined />,
    label: 'Nhân sự',
    children: [
      { key: '/admin-page/employees', label: 'Hồ sơ nhân viên' },
      { key: '/admin-page/contracts', label: 'Hợp đồng lao động' },
      { key: '/admin-page/recruitment', label: 'Tuyển dụng nội bộ' },
      { key: '/admin-page/approval', label: 'Thúc đẩy nhân sự' },
    ],
  },
  {
    key: '/admin-page/attendance',
    icon: <CalendarOutlined />,
    label: 'Chấm công',
  },
  {
    key: '/admin-page/payroll',
    icon: <DollarOutlined />,
    label: 'Lương thưởng',
  },
  {
    type: 'divider',
  },
  {
    key: '/admin-page/reports',
    icon: <BarChartOutlined />,
    label: 'Báo cáo',
  },
  {
    key: '/admin-page/settings',
    icon: <SettingOutlined />,
    label: 'Cài đặt',
  },
];



const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="h-16 px-6 flex items-center gap-2.5 border-b border-gray-50">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
          <AppstoreOutlined className="text-xl" />
        </div>
        <span className="text-xl font-extrabold text-blue-600 tracking-tight">HRM System</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['sub-employees']}
          onClick={({ key }) => {
            if (!key.startsWith('sub-')) {
              navigate(key);
            }
          }}
          items={items}
          className="border-none font-semibold text-blue-600 "
        />
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