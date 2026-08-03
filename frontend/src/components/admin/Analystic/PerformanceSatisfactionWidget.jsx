import React from "react";
import { MoreVertical } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PerformanceSatisfactionWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">
            Chỉ số Hiệu suất & Hài lòng
          </h3>
          <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer" />
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600">Hiệu suất trung bình</span>
            <span className="text-indigo-600">8.4 / 10</span>
          </div>
          <Progress value={84} className="h-2 bg-slate-100 [&>div]:bg-indigo-600" />
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600">Mức độ hài lòng</span>
            <span className="text-teal-600">4.2 / 5</span>
          </div>
          <Progress value={84} className="h-2 bg-slate-100 [&>div]:bg-teal-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-indigo-50/50 border border-indigo-100 p-3.5 rounded-xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase">MỤC TIÊU QUÝ</p>
          <p className="text-xs font-bold text-indigo-900 mt-1">92% Hoàn thành</p>
        </div>

        <div className="bg-indigo-50/50 border border-indigo-100 p-3.5 rounded-xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase">E-NPS SCORE</p>
          <p className="text-xs font-bold text-indigo-900 mt-1">+68 (Rất tốt)</p>
        </div>
      </div>
    </div>
  );
}