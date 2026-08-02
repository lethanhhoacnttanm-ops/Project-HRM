import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PerformanceFilter({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  selectedQuarter,
  setSelectedQuarter,
}) {
  return (
    <div className="p-4 bg-white border-b border-slate-100 flex flex-col md:flex-row items-center gap-3">
      <div className="relative w-full md:flex-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo tên nhân viên..."
          className="pl-10 bg-slate-50/50 border-slate-200 rounded-xl text-xs h-9 focus-visible:ring-2 focus-visible:ring-indigo-500 text-slate-700 placeholder:text-slate-400 shadow-none"
        />
      </div>

      <div className="w-full md:w-44">
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Tất cả phòng ban" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="text-xs">Tất cả phòng ban</SelectItem>
            <SelectItem value="design" className="text-xs">Thiết kế</SelectItem>
            <SelectItem value="tech" className="text-xs">Kỹ thuật</SelectItem>
            <SelectItem value="marketing" className="text-xs">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-36">
        <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
          <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Quý 3 2024" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="q3_2024" className="text-xs">Quý 3 2024</SelectItem>
            <SelectItem value="q2_2024" className="text-xs">Quý 2 2024</SelectItem>
            <SelectItem value="q1_2024" className="text-xs">Quý 1 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full md:w-auto border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold text-xs h-9 rounded-xl px-3.5 shadow-none flex items-center gap-2"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Bộ lọc nâng cao</span>
      </Button>
    </div>
  );
}