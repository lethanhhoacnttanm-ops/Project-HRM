import { NavLink, useNavigate } from 'react-router-dom';
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
  LogOut,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const menuGroups = [
  {
    title: null,
    items: [
      { path: '/employee/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Hồ sơ & Tài khoản',
    items: [
      { path: '/employee/profile', label: 'Hồ sơ cá nhân', icon: User },
    ],
  },
  {
    title: 'Vận hành HR',
    items: [
      { path: '/employee/my-contract', label: 'Hợp đồng của tôi', icon: FileText },
      { path: '/employee/payslip', label: 'Phiếu lương', icon: Wallet },
      { path: '/employee/attendance', label: 'Chấm công', icon: CalendarDays },
      { path: '/employee/leave-request', label: 'Nghỉ phép', icon: CalendarCheck },
    ],
  },
  {
    title: 'Tương tác & Thông tin',
    items: [
      { path: '/employee/notifications', label: 'Thông báo', icon: Bell },
      { path: '/employee/support', label: 'Hỗ trợ', icon: Headphones },
      { path: '/employee/my-benefits', label: 'Phúc lợi', icon: Gift },
      { path: '/employee/evaluation', label: 'Đánh giá hiệu suất', icon: Star },
    ],
  },
  {
    title: 'Phát triển & Cơ hội',
    items: [
      { path: '/employee/training-register', label: 'Đào tạo', icon: BookOpen },
      { path: '/employee/internal-jobs', label: 'Việc làm nội bộ', icon: Briefcase },
      { path: '/employee/career-path', label: 'Thăng tiến sự nghiệp', icon: TrendingUp },
      { path: '/employee/personal-report', label: 'Báo cáo cá nhân', icon: BarChart3 },
    ],
  },
];

const EmployeeSidebar = ({ collapsed, setCollapsed, user }) => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await handleLogout();
      toast.success('Đăng xuất thành công!');
      navigate('/login', { replace: true });
    } catch {
      toast.error('Đăng xuất có lỗi, đã thoát phiên làm việc.');
      navigate('/login', { replace: true });
    }
  };

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
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={groupIndex > 0 ? 'mt-4' : ''}>
            {group.title && !collapsed && (
              <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {group.title}
              </p>
            )}
            {group.title && collapsed && (
              <div className="mx-2 mb-1 border-t border-gray-100" />
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
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
            </div>
          </div>
        ))}
      </nav>

      {/* Logout + User info */}
      <div className="border-t border-gray-100 p-3 space-y-2">
        <button
          onClick={onLogout}
          className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Đăng xuất</span>}
        </button>

        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold shrink-0">
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