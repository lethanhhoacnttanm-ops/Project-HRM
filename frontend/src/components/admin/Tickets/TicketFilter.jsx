import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TicketFilter({
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
}) {
  return (
    <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-40">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9">
              <SelectValue placeholder="Trạng thái: Tất cả" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs">Trạng thái: Tất cả</SelectItem>
              <SelectItem value="open" className="text-xs">Mở</SelectItem>
              <SelectItem value="processing" className="text-xs">Đang xử lý</SelectItem>
              <SelectItem value="resolved" className="text-xs">Đã giải quyết</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-40">
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9">
              <SelectValue placeholder="Mức độ: Tất cả" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs">Mức độ: Tất cả</SelectItem>
              <SelectItem value="high" className="text-xs">Cao</SelectItem>
              <SelectItem value="medium" className="text-xs">Trung bình</SelectItem>
              <SelectItem value="low" className="text-xs">Thấp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <span className="text-xs text-slate-400 font-medium">
        Hiển thị 10 trong số 1,284 yêu cầu
      </span>
    </div>
  );
}