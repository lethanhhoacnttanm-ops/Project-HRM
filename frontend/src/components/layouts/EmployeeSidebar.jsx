import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  Wallet,
  CalendarDays,
  CalendarCheck,
  Gift,
  Star,
  BookOpen,
  Briefcase,
  TrendingUp,
  BarChart3,
  Bell,
  Headphones,
  Menu,
  X,
} from 'lucide-react';

const menuItems = [
  { path: '/employee/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { path: '/employee/profile', label: 'Hồ sơ cá nhân', icon: User },
  { path: '/employee/my-contract', label: 'Hợp đồng của tôi', icon: FileText },
  { path: '/employee/payslip', label: 'Phiếu lương', icon: Wallet },
  { path: '/employee/attendance', label: 'Chấm công', icon: CalendarDays },
  { path: '/employee/leave-request', label: 'Nghỉ phép', icon: CalendarCheck },
  { path: '/employee/my-benefits', label: 'Phúc lợi', icon: Gift },
  { path: '/employee/evaluation', label: 'Đánh giá hiệu suất', icon: Star },
  { path: '/employee/training-register', label: 'Đào tạo', icon: BookOpen },
  { path: '/employee/internal-jobs', label: 'Việc làm nội bộ', icon: Briefcase },
  { path: '/employee/career-path', label: 'Thăng tiến sự nghiệp', icon: TrendingUp },
  { path: '/employee/personal-report', label: 'Báo cáo cá nhân', icon: BarChart3 },
  { path: '/employee/notifications', label: 'Thông báo', icon: Bell },
  { path: '/employee/support', label: 'Hỗ trợ', icon: Headphones },
];

const EmployeeSidebar = ({ collapsed, setCollapsed, user }) => {
  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-blue-600 tracking-tight">
              HRM System
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {user?.fullName?.charAt(0)?.toUpperCase() || 'N'}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user?.fullName || 'Nhân viên'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.position || 'Employee'}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;