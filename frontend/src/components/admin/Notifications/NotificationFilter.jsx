import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NotificationFilter({
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
}) {
  const [date, setDate] = useState(null);

  return (
    <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-36">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9">
              <SelectValue placeholder="Tất cả loại" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs">Tất cả loại</SelectItem>
              <SelectItem value="system" className="text-xs">Hệ thống</SelectItem>
              <SelectItem value="payroll" className="text-xs">Lương</SelectItem>
              <SelectItem value="performance" className="text-xs">Hiệu suất</SelectItem>
              <SelectItem value="leave" className="text-xs">Nghỉ phép</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-40">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs">Tất cả trạng thái</SelectItem>
              <SelectItem value="sent" className="text-xs">Đã gửi</SelectItem>
              <SelectItem value="pending" className="text-xs">Đang chờ</SelectItem>
              <SelectItem value="draft" className="text-xs">Nháp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-slate-200 text-xs text-slate-600 bg-slate-50/50 rounded-xl h-9 px-3 font-normal shadow-none"
            >
              <CalendarIcon className="w-3.5 h-3.5 mr-2 text-slate-400" />
              {date ? format(date, "dd/MM/yyyy") : "Chọn khoảng ngày"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>

      <span className="text-xs text-slate-400 font-medium">
        Hiển thị 10 trên 1,284 kết quả
      </span>
    </div>
  );
}