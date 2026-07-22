import React from 'react';
import { Input } from 'antd';
import { SearchOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const Header = () => {
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

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right">
            <div className="text-sm font-bold text-blue-600 leading-tight">Quản trị viên</div>
            <div className="text-[11px] text-gray-400">Trưởng bộ quản trị hệ thống</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <UserOutlined className="text-gray-600 text-lg" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;