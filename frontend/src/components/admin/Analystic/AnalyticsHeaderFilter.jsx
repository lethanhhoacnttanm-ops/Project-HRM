import React from "react";
import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AnalyticsHeaderFilter({
  selectedTime,
  setSelectedTime,
  selectedDepartment,
  setSelectedDepartment,
  onReset,
  onOpenModal,
}) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            THỜI GIAN:
          </span>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="w-36 border-slate-200 text-xs font-semibold text-slate-700 bg-white rounded-xl h-9">
              <SelectValue placeholder="Cả năm 2023" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="2023" className="text-xs font-medium">Cả năm 2023</SelectItem>
              <SelectItem value="2024" className="text-xs font-medium">Cả năm 2024</SelectItem>
              <SelectItem value="q3_2024" className="text-xs font-medium">Quý 3/2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            PHÒNG BAN:
          </span>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-44 border-slate-200 text-xs font-semibold text-slate-700 bg-white rounded-xl h-9">
              <SelectValue placeholder="Tất cả phòng ban" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs font-medium">Tất cả phòng ban</SelectItem>
              <SelectItem value="engineering" className="text-xs font-medium">Engineering</SelectItem>
              <SelectItem value="sales" className="text-xs font-medium">Sales & Marketing</SelectItem>
              <SelectItem value="hr" className="text-xs font-medium">Human Resources</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          onClick={onReset}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 h-9 rounded-xl gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Xóa bộ lọc</span>
        </Button>
      </div>

      <Button
        onClick={onOpenModal}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all gap-2"
      >
        <Download className="w-4 h-4" />
        <span>Xuất báo cáo tổng hợp</span>
      </Button>
    </div>
  );
}