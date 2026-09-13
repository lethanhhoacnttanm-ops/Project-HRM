import React, { useState } from "react";
import { Calendar as CalendarIcon, SlidersHorizontal, Search } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LeaveFilter({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedDate,
  setSelectedDate,
}) {

  return (
    <div className="p-4 bg-white border-b border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-10 items-end gap-3">

        <div className="relative w-full md:col-span-6">
          <Label className="block text-[11px] font-semibold text-transparent mb-1 select-none">
            Tìm kiếm 
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm theo tên, email, phòng ban..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-xl py-2 bg-gray-50/50 border-gray-200 dark:border-gray-800 h-9 w-full text-xs"
            />
          </div>
        </div>

        <div className="w-full md:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Loại nghỉ phép
          </label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9 focus:ring-2 focus:ring-indigo-500">
              <SelectValue placeholder="Tất cả loại hình" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs">Tất cả loại hình</SelectItem>
              <SelectItem value="Nghỉ phép năm" className="text-xs">Nghỉ phép năm</SelectItem>
              <SelectItem value="Nghỉ ốm" className="text-xs">Nghỉ ốm</SelectItem>
              <SelectItem value="Nghỉ việc riêng" className="text-xs">Nghỉ việc riêng</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:col-span-2">
        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
          Chọn ngày
        </label>
        <Popover>
          <PopoverTrigger render={(
            <Button
              variant="outline"
              className="w-full border-slate-200 text-xs text-slate-600 bg-slate-50/50 rounded-xl h-9 justify-start font-normal shadow-none px-3"
            >
              <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
              <span className="truncate">{selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Chọn ngày..."}</span>
            </Button>
          )}>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
          </PopoverContent>
        </Popover>
      </div>

      </div>
    </div>
  );
}