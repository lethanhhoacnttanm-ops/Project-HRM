  import React from 'react';
import { Search, Table, LayoutGrid } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const EmployeeFilter = ({
  newEmployee,
  Employee,
  activeEmployee,
  onsite,
  onleave,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs dark:bg-gray-900">
          <p className="text-xs text-gray-500 font-semibold">Tổng số nhân sự</p>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-1 dark:text-amber-50/50">{Employee}</h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-2"> {newEmployee} Nhân sự mới trong tháng qua</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs dark:bg-gray-900">
          <p className="text-xs text-gray-500 font-semibold">Đang hoạt động</p>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-1 dark:text-amber-50/50">{activeEmployee}</h3>
          <p className="text-[11px] text-gray-400 font-medium mt-2">{onsite}% trên công ty</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs dark:bg-gray-900">
          <p className="text-xs text-gray-500 font-semibold">Đang nghỉ phép</p>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-1 dark:text-amber-50/50">50</h3>
          <p className="text-[11px] text-red-500 font-medium mt-2">Tuần nghỉ cao điểm</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-4 dark:bg-gray-900 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm theo tên, email, phòng ban..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-xl py-2 bg-gray-50/50 border-gray-200 dark:border-gray-800"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full h-10 rounded-xl bg-gray-50/50 border-gray-200 dark:border-gray-800">
                <SelectValue placeholder="Chọn phòng ban" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả phòng ban</SelectItem>
                <SelectItem value="SmartTeach">SmartTeach</SelectItem>
                <SelectItem value="CI/CD">CI/CD</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3 flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl ">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStatus('all')}
              className={`flex-1 h-auto py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${selectedStatus === 'all'
                ? 'bg-white text-gray-800 shadow-xs hover:bg-white'
                : 'text-gray-500 hover:bg-transparent hover:text-gray-700'
                }`}
            >
              Tất cả
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStatus('active')}
              className={`flex-1 h-auto py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${selectedStatus === 'active'
                ? 'bg-emerald-500 text-white shadow-xs hover:bg-emerald-600'
                : 'text-gray-500 hover:bg-transparent hover:text-gray-700'
                }`}
            >
              Hoạt động
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStatus('leave')}
              className={`flex-1 h-auto py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${selectedStatus === 'leave'
                ? 'bg-gray-400 text-white shadow-xs hover:bg-gray-500'
                : 'text-gray-500 hover:bg-transparent hover:text-gray-700'
                }`}
            >
              Đang nghỉ
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-50 dark:border-gray-900 text-xs font-semibold">
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => setViewMode('table')}
          className={`h-auto p-0 flex items-center gap-1.5 text-xs cursor-pointer hover:no-underline ${viewMode === 'table'
              ? 'text-blue-600 font-bold underline underline-offset-4'
              : 'text-gray-400 hover:text-gray-600'
            }`}
        >
          <Table className="h-4 w-4" /> Xem dạng bảng
        </Button>

        <span className="text-gray-200">|</span>

        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => setViewMode('card')}
          className={`h-auto p-0 flex items-center gap-1.5 text-xs cursor-pointer hover:no-underline ${viewMode === 'card'
              ? 'text-blue-600 font-bold underline underline-offset-4'
              : 'text-gray-400 hover:text-gray-600'
            }`}
        >
          <LayoutGrid className="h-4 w-4" /> Xem dạng thẻ
        </Button>
      </div>
    </div>
  );
};

export default EmployeeFilter;