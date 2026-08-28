import React, { useEffect } from "react";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { Input } from "@/components/ui/input";
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

export default function AttendanceFilter({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  date,
  setDate,
  dataAttendance = [],
  onFilterChange,
}) {
  useEffect(() => {
    if (!dataAttendance || dataAttendance.length === 0) {
      if (onFilterChange) onFilterChange([]);
      return;
    }

    const selectedDate = new Date(date);

    const result = dataAttendance.filter((record) => {
      if (!record.date) return false;
      const recordDate = new Date(record.date);

      return (
        recordDate.getDate() === selectedDate.getDate() &&
        recordDate.getMonth() === selectedDate.getMonth() &&
        recordDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    if (onFilterChange) {
      onFilterChange(result);
    }
  }, [date, dataAttendance, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 p-4 bg-white dark:bg-gray-900 border-b border-slate-100 dark:border-gray-800">
      <Popover>
        <PopoverTrigger render={(
          <Button
            variant="outline"
            className="w-full md:w-auto flex items-center justify-start gap-2 border-slate-200 dark:border-gray-700 text-xs font-semibold text-slate-700 dark:text-gray-300 bg-slate-50/50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-xl px-3.5 py-2 h-9 shadow-none cursor-pointer"
          >
            <CalendarIcon className="w-4 h-4 text-slate-400 dark:text-gray-500" />
            <span>
              {date ? (
                format(date, "'Hôm nay,' dd/MM/yyyy", { locale: vi })
              ) : (
                "Chọn ngày..."
              )}
            </span>
          </Button>
        )}/>

        <PopoverContent className="w-auto p-0 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-xl" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="dark:bg-gray-900 dark:text-gray-100"
          />
        </PopoverContent>
      </Popover>

      <div className="w-full md:w-52">
        <Select
          value={selectedDepartment}
          onValueChange={setSelectedDepartment}
        >
          <SelectTrigger className="w-full border-slate-200 dark:border-gray-700 text-xs font-medium text-slate-700 dark:text-gray-300 bg-slate-50/50 dark:bg-gray-800 rounded-xl h-9 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Chọn phòng ban" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-lg">
            <SelectItem value="all" className="text-xs font-medium dark:text-gray-200 dark:hover:bg-gray-800">
              Tất cả phòng ban
            </SelectItem>
            <SelectItem value="tech" className="text-xs font-medium dark:text-gray-200 dark:hover:bg-gray-800">
              Kỹ thuật & Công nghệ
            </SelectItem>
            <SelectItem value="hr" className="text-xs font-medium dark:text-gray-200 dark:hover:bg-gray-800">
              Nhân sự
            </SelectItem>
            <SelectItem value="marketing" className="text-xs font-medium dark:text-gray-200 dark:hover:bg-gray-800">
              Marketing
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none z-10" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm tên hoặc mã NV..."
          className="pl-10 pr-4 bg-slate-50/50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 rounded-xl text-xs h-9 focus-visible:ring-2 focus-visible:ring-indigo-500 text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 shadow-none"
        />
      </div>
    </div>
  );
}