import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationFilter = ({ 
  selectedType, 
  setSelectedType, 
  selectedStatus, 
  setSelectedStatus,
  onReset 
}) => {
  return (
    <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Bộ lọc:
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40 h-9 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100">
            <SelectValue placeholder="Tất cả phân loại" />
          </SelectTrigger>
          <SelectContent className="rounded-xl text-xs dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100">
            <SelectItem value="ALL">Tất cả phân loại</SelectItem>
            <SelectItem value="Tin tức chung">Tin tức chung</SelectItem>
            <SelectItem value="Sự kiện">Sự kiện</SelectItem>
            <SelectItem value="Chính sách">Chính sách</SelectItem>
            <SelectItem value="Khẩn cấp">Khẩn cấp</SelectItem>
            <SelectItem value="Hệ thống">Hệ thống</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-37.5 h-9 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent className="rounded-xl text-xs dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100">
            <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
            <SelectItem value="Đã gửi">Đã gửi</SelectItem>
            <SelectItem value="Nháp">Nháp</SelectItem>
            <SelectItem value="Đang chờ">Đang chờ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onReset}
        className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-800 gap-1.5 h-9 rounded-xl cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
      </Button>
    </div>
  );
};

export default NotificationFilter;