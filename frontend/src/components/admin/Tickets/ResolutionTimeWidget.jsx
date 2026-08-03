import React from "react";
import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ResolutionTimeWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-indigo-600" />
        <h3 className="font-bold text-slate-800 text-sm">Thời gian giải quyết</h3>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-400">Trung bình (giờ)</span>
          <span className="text-slate-800 font-bold">4.2h</span>
        </div>
        <Progress value={60} className="h-2 bg-slate-100 [&>div]:bg-indigo-600" />
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">NHANH NHẤT</p>
          <p className="text-sm font-extrabold text-teal-600 mt-0.5">15m</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">CHẬM NHẤT</p>
          <p className="text-sm font-extrabold text-rose-500 mt-0.5">48h</p>
        </div>
      </div>
    </div>
  );
}