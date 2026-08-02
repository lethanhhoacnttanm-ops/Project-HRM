import React from "react";
import { Info } from "lucide-react";

export default function DistributionWidget() {
  const bars = [
    { label: "Đạt", height: "h-24", color: "bg-emerald-200" },
    { label: "Vượt", height: "h-12", color: "bg-indigo-200" },
    { label: "Cần cải thiện", height: "h-8", color: "bg-rose-200" },
    { label: "N/A", height: "h-6", color: "bg-slate-200" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Thông tin nhanh</h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">
            PHÂN BỐ HIỆU SUẤT
          </p>
        </div>
        <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
      </div>

      <div className="flex items-end justify-between px-4 pt-4 pb-2 border-b border-slate-100 min-h-35">
        {bars.map((bar, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div className={`w-8 ${bar.height} ${bar.color} rounded-t-lg transition-all`} />
            <span className="text-[10px] font-semibold text-slate-500 text-center">
              {bar.label}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3.5">
        <p className="text-xs text-indigo-900 leading-relaxed">
          <strong className="font-bold text-indigo-700">Gợi ý:</strong> 65% đội ngũ hiện đang đạt kỳ vọng. Hãy cân nhắc tăng cường đào tạo cho nhóm "Cần cải thiện".
        </p>
      </div>
    </div>
  );
}