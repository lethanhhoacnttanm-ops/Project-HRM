import React, { useState } from "react";
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
}) {
  const [date, setDate] = useState(new Date(2024, 4, 24));

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 p-4 bg-white border-b border-slate-100">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-auto flex items-center justify-start gap-2 border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50/50 hover:bg-slate-100 rounded-xl px-3.5 py-2 h-9 shadow-none"
          >
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            <span>
              {date ? (
                format(date, "'Hôm nay,' dd/MM/yyyy", { locale: vi })
              ) : (
                "Chọn ngày..."
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="w-full md:w-52">
        <Select
          value={selectedDepartment}
          onValueChange={setSelectedDepartment}
        >
          <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Chọn phòng ban" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="text-xs font-medium">
              Tất cả phòng ban
            </SelectItem>
            <SelectItem value="tech" className="text-xs font-medium">
              Kỹ thuật & Công nghệ
            </SelectItem>
            <SelectItem value="hr" className="text-xs font-medium">
              Nhân sự
            </SelectItem>
            <SelectItem value="marketing" className="text-xs font-medium">
              Marketing
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm tên hoặc mã NV..."
          className="pl-10 pr-4 bg-slate-50/50 border-slate-200 rounded-xl text-xs h-9 focus-visible:ring-2 focus-visible:ring-indigo-500 text-slate-700 placeholder:text-slate-400 shadow-none"
        />
      </div>
    </div>
  );
}