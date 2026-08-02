import React from "react";
import { ArrowRight } from "lucide-react";

export default function ManagementTipWidget() {
  return (
    <div className="bg-indigo-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
      <h3 className="font-bold text-sm">Gợi ý quản lý</h3>
      <p className="text-xs text-indigo-200 leading-relaxed">
        Phòng Kỹ Thuật có tỷ lệ nghỉ phép cao trong tuần tới (15%). Hãy kiểm tra tiến độ dự án.
      </p>
      <button className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-indigo-200 pt-1 transition-colors">
        <span>Xem chi tiết</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}