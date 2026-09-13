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
  selectedQuarter,
  setSelectedQuarter,
  dataList = [],
}) {
  const availableQuarters = React.useMemo(() => {
    const quarters = dataList.map((item) => item.quarter).filter(Boolean);
    return [...new Set(quarters)];
  }, [dataList]);
  return (
    <div className="p-4 bg-white border-b border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-10 items-center gap-3">

        <div className="relative w-full md:col-span-6">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tên nhân viên..."
            className="pl-10 bg-slate-50/50 border-slate-200 rounded-xl text-xs h-9 focus-visible:ring-2 focus-visible:ring-indigo-500 text-slate-700 placeholder:text-slate-400 shadow-none w-full"
          />
        </div>

        <div className="w-full md:col-span-4">
          <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9 focus:ring-2 focus:ring-indigo-500">
              <SelectValue placeholder="Chọn quý đánh giá..." />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL" className="text-xs">Tất cả các quý</SelectItem>
              {availableQuarters.map((q) => (
                <SelectItem key={q} value={q} className="text-xs">
                  {q}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
}