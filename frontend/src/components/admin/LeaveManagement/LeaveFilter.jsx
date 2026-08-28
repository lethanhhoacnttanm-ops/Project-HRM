import React, { useState } from "react";
import { Calendar as CalendarIcon, SlidersHorizontal } from "lucide-react";
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

export default function LeaveFilter({
  selectedType,
  setSelectedType,
  selectedDepartment,
  setSelectedDepartment,
}) {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  return (
    <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center gap-3">
      <div className="w-full sm:w-44">
        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
          Loại nghỉ phép
        </label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Tất cả loại hình" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="text-xs">Tất cả loại hình</SelectItem>
            <SelectItem value="annual" className="text-xs">Nghỉ phép năm</SelectItem>
            <SelectItem value="sick" className="text-xs">Nghỉ ốm</SelectItem>
            <SelectItem value="personal" className="text-xs">Nghỉ việc riêng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-44">
        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
          Phòng ban
        </label>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Tất cả phòng ban" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="text-xs">Tất cả phòng ban</SelectItem>
            <SelectItem value="tech" className="text-xs">Kỹ thuật & Công nghệ</SelectItem>
            <SelectItem value="hr" className="text-xs">Nhân sự</SelectItem>
            <SelectItem value="marketing" className="text-xs">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Khoảng thời gian */}
      <div className="w-full sm:w-auto">
        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
          Khoảng thời gian
        </label>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger render={(
              <Button
                variant="outline"
                className="w-32 border-slate-200 text-xs text-slate-600 bg-slate-50/50 rounded-xl h-9 justify-start font-normal shadow-none px-3"
              >
                <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                {fromDate ? format(fromDate, "dd/MM/yyyy") : "mm/dd/yyyy"}
              </Button>
            )}/>
            <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
            </PopoverContent>
          </Popover>

          <span className="text-slate-300">-</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-32 border-slate-200 text-xs text-slate-600 bg-slate-50/50 rounded-xl h-9 justify-start font-normal shadow-none px-3"
              >
                <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                {toDate ? format(toDate, "dd/MM/yyyy") : "mm/dd/yyyy"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 rounded-xl bg-slate-50/50 text-slate-500">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}