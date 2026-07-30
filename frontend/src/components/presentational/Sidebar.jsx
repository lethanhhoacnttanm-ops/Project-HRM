import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
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
  RightOutlined,
  SolutionOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  ScheduleOutlined,
  TrophyOutlined,
  HeartOutlined,
  MessageOutlined,
  ToolOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

const items = [
  {
    key: '/admin-page/dashboard',
    icon: <DashboardOutlined />,
    label: 'Tổng quan',
  },
  {
    key: 'sub-personnel',
    icon: <UsergroupAddOutlined />,
    label: 'Nhân sự',
    children: [
      { key: '/admin-page/employees', icon: <SolutionOutlined />, label: 'Hồ sơ nhân viên' },
      { key: '/admin-page/contracts', icon: <FileTextOutlined />, label: 'Hợp đồng lao động' },
      { key: '/admin-page/promotion', icon: <RiseOutlined />, label: 'Thăng tiến' },
      { key: '/admin-page/department', icon: <ApartmentOutlined />, label: 'Phòng ban' }
    ],
  },
  {
    key: 'sub-talent',
    icon: <UserAddOutlined />,
    label: 'Tuyển dụng & Đào tạo',
    children: [
      { key: '/admin-page/recruitment', icon: <UserAddOutlined />, label: 'Tuyển dụng nội bộ' },
      { key: '/admin-page/training', icon: <ScheduleOutlined />, label: 'Khóa học & Đào tạo' },
    ],
  },
  {
    key: 'sub-operations',
    icon: <CalendarOutlined />,
    label: 'Vận hành & Chấm công',
    children: [
      { key: '/admin-page/attendance', icon: <CalendarOutlined />, label: 'Chấm công' },
      { key: '/admin-page/leave-requests', icon: <ScheduleOutlined />, label: 'Quản lý nghỉ phép' },
      { key: '/admin-page/performance', icon: <TrophyOutlined />, label: 'Đánh giá hiệu suất' },
      { key: '/admin-page/benefits', icon: <HeartOutlined />, label: 'Chính sách phúc lợi' },
    ],
  },
  {
    key: 'sub-finance',
    icon: <DollarOutlined />,
    label: 'Lương & Báo cáo',
    children: [
      { key: '/admin-page/payroll', icon: <DollarOutlined />, label: 'Lương & Thưởng' },
      { key: '/admin-page/reports', icon: <BarChartOutlined />, label: 'Báo cáo & Thống kê' },
    ],
  },
  {
    key: 'sub-communication',
    icon: <MessageOutlined />,
    label: 'Truyền thông & Hỗ trợ',
    children: [
      { key: '/admin-page/notifications', icon: <BellOutlined />, label: 'Quản lý thông báo' },
      { key: '/admin-page/support-tickets', icon: <CustomerServiceOutlined />, label: 'Yêu cầu hỗ trợ' },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub-system',
    icon: <SettingOutlined />,
    label: 'Hệ thống & Cấu hình',
    children: [
      { key: '/admin-page/system-config', icon: <ToolOutlined />, label: 'Cấu hình chung' },
      { key: '/admin-page/security-settings', icon: <SafetyCertificateOutlined />, label: 'Quản lý bảo mật' },
    ],
  },
];

const getActiveKeys = (items, pathname) => {
  let selectedKey = pathname;
  let openKey = '';

  items.forEach((item) => {
    if (item.children) {
      const childMatch = item.children.find((child) =>
        pathname.startsWith(child.key)
      );
      if (childMatch) {
        selectedKey = childMatch.key; 
        openKey = item.key;          
      }
    } else if (item.key && pathname.startsWith(item.key) && item.key !== '/') {
      selectedKey = item.key;
    }
  });

  return { selectedKey, openKey };
};


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedKey, openKey } = useMemo(
    () => getActiveKeys(items, location.pathname),
    [location.pathname]
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="h-16 px-6 flex items-center gap-2.5 border-b border-gray-50">
        <div className="w-18 h-8 rounded-lg flex items-center justify-center text-white font-bold">
          <img src='/hrm_system_logo.png' />
        </div>
        <span className="text-xl font-extrabold text-blue-600 tracking-tight">HRM System</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
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