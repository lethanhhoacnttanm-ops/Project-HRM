import React from "react";
import { ArrowRight } from "lucide-react";

export default function AiOptimizationWidget() {
  return (
    <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 shadow-sm space-y-2.5">
      <h3 className="font-bold text-indigo-950 text-xs">Bạn cần tối ưu hóa?</h3>
      <p className="text-xs text-slate-600 leading-relaxed">
        Sử dụng chatbot AI để tự động trả lời các câu hỏi thường gặp (FAQ).
      </p>
      <button className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-1 transition-colors">
        <span>Tìm hiểu thêm</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}   