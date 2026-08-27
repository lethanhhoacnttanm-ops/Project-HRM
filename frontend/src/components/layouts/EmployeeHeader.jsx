import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, LogOut, User, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const EmployeeHeader = ({ collapsed, setCollapsed, user }) => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onLogout = async () => {
    try {
      setLoggingOut(true);
      await handleLogout();
      toast.success('Đăng xuất thành công!');
      navigate('/login', { replace: true });
    } catch {
      toast.error('Đăng xuất có lỗi, đã thoát phiên làm việc.');
      navigate('/login', { replace: true });
    } finally {
      setLoggingOut(false);
      setOpenMenu(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 w-64 rounded-full bg-gray-100 border-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/employee/notifications')}
          className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-tight">
                {user?.fullName || 'Nhân viên'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.position || 'Employee'}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {user?.fullName?.charAt(0)?.toUpperCase() || 'N'}
            </div>
            <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg z-50">
              <button
                onClick={() => {
                  setOpenMenu(false);
                  navigate('/employee/profile');
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User size={16} />
                Hồ sơ cá nhân
              </button>

              <div className="my-1 border-t border-gray-100" />

              <button
                onClick={onLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <LogOut size={16} />
                {loggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default EmployeeHeader;