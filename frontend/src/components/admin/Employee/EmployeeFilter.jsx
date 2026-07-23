import React from 'react';
import { Input, Select, Button } from 'antd';
import { SearchOutlined, PlusOutlined, TableOutlined, AppstoreOutlined } from '@ant-design/icons';

const EmployeeFilter = ({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
  viewMode,
  setViewMode,
  onOpenModal,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold">Tổng số nhân sự</p>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-1">300</h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-2">~12% Nhân sự mới</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold">Đang hoạt động</p>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-1">150</h3>
          <p className="text-[11px] text-gray-400 font-medium mt-2">50% trên công ty</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold">Đang nghỉ phép</p>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-1">50</h3>
          <p className="text-[11px] text-red-500 font-medium mt-2">Tuần nghỉ cao điểm</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold">Vị trí tuyển dụng</p>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-1">5</h3>
          <p className="text-[11px] text-blue-600 font-medium mt-2">Đang phỏng vấn 2</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6">
            <Input
              placeholder="Tìm kiếm theo tên, email, phòng ban..."
              prefix={<SearchOutlined className="text-gray-400 mr-1" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl py-2 bg-gray-50/50 border-gray-200"
            />
          </div>

          <div className="md:col-span-3">
            <Select
              className="w-full h-10"
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              options={[
                { value: 'all', label: 'Tất cả phòng ban' },
                { value: 'SmartTeach', label: 'SmartTeach' },
                { value: 'CI/CD', label: 'CI/CD' },
                { value: 'Frontend', label: 'Frontend' },
              ]}
            />
          </div>

          <div className="md:col-span-3 flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedStatus === 'all' ? 'bg-white text-gray-800 shadow-2xs' : 'text-gray-500'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedStatus('active')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedStatus === 'active' ? 'bg-emerald-500 text-white shadow-2xs' : 'text-gray-500'
              }`}
            >
              Hoạt động
            </button>
            <button
              onClick={() => setSelectedStatus('leave')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedStatus === 'leave' ? 'bg-gray-400 text-white shadow-2xs' : 'text-gray-500'
              }`}
            >
              Đang nghỉ
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-50 text-xs font-semibold">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'table' ? 'text-blue-600 font-bold underline underline-offset-4' : 'text-gray-400'
            }`}
          >
            <TableOutlined /> Xem dạng bảng
          </button>
          <span className="text-gray-200">|</span>
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'card' ? 'text-blue-600 font-bold underline underline-offset-4' : 'text-gray-400'
            }`}
          >
            <AppstoreOutlined /> Xem dạng thẻ
          </button>
        </div>
    </div>
  );
};

export default EmployeeFilter;