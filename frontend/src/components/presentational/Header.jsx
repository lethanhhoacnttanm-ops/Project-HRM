import React from 'react';
import { Input, Dropdown, Modal } from 'antd';
import { SearchOutlined, BellOutlined, UserOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service.js';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, handleLogout } = useAuth();
  const onLogoutClick = () => {
    Modal.confirm({
      title: 'Xác nhận đăng xuất',
      icon: <ExclamationCircleOutlined className="text-red-500!" />,
      content: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      async onOk() {
        try {
          await handleLogout();
          navigate('/login', { replace: true });
        } catch (error) {
          console.error('Lỗi khi gọi API logout:', error);
        } finally {          
          if (setUser) setUser(null);

          navigate('/login', { replace: true });
        }
      },
    });
  };

  const menuItems = [
    {
      key: 'profile',
      label: (
        <div className="py-1">
          <div className="font-semibold text-gray-800">{user?.name || 'Quản trị viên'}</div>
          <div className="text-xs text-gray-400">{user?.email || 'admin@system.com'}</div>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined className="text-red-500!" />,
      danger: true,
      onClick: onLogoutClick,
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="w-80">
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined className="text-gray-400 mr-1" />}
          className="rounded-full bg-violet-50! border-none! py-1.5 px-4 text-sm focus:bg-white!"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-blue-600 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
          <BellOutlined className="text-lg" />
        </button>

        <div className="h-6 w-px bg-gray-200" />

        <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
          <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-gray-50 transition-colors select-none">
            <div className="text-right">
              <div className="text-sm font-bold text-blue-600 leading-tight">
                {user?.name || 'Quản trị viên'}
              </div>
              <div className="text-[11px] text-gray-400">
                {user?.role === 'ADMIN' ? 'Trưởng bộ quản trị hệ thống' : 'Nhân sự'}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 font-semibold">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <UserOutlined className="text-blue-600 text-base" />
              )}
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;