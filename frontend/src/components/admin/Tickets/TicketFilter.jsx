import { Input } from 'antd';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TicketFilter ({ 
  searchText, 
  setSearchText, 
  selectedStatus, 
  setSelectedStatus, 
  selectedPriority, 
  setSelectedPriority 
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-slate-100 bg-white">
      <div className="w-full sm:w-72">
        <Input
          placeholder="Tìm theo mã, tiêu đề, tên nhân viên..."
          prefix={<Search className="size-4 text-slate-400 mr-2" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="rounded-xl text-xs py-2"
          allowClear
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40 rounded-xl text-xs h-9 bg-transparent border-slate-200">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tất cả">Trạng thái: Tất cả</SelectItem>
            <SelectItem value="Mở">Mở</SelectItem>
            <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
            <SelectItem value="Đã giải quyết">Đã giải quyết</SelectItem>
            <SelectItem value="Đóng">Đóng</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-40 rounded-xl text-xs h-9 bg-transparent border-slate-200">
            <SelectValue placeholder="Ưu tiên" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tất cả">Ưu tiên: Tất cả</SelectItem>
            <SelectItem value="Cao">Cao</SelectItem>
            <SelectItem value="Trung bình">Trung bình</SelectItem>
            <SelectItem value="Thấp">Thấp</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};