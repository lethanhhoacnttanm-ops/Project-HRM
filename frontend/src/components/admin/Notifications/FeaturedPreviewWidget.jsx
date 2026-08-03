import React from "react";
import { ExternalLink, BellRing } from "lucide-react";

export default function FeaturedPreviewWidget() {
  return (
    <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-indigo-900 text-sm">Xem trước Nổi bật</h3>
        <ExternalLink className="w-4 h-4 text-indigo-600 cursor-pointer" />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2.5">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
          <BellRing className="w-3.5 h-3.5 text-indigo-600" />
          <span>THÔNG BÁO QUAN TRỌNG</span>
        </div>

        <h4 className="font-bold text-slate-800 text-xs leading-snug">
          Thông báo: Chuyển đổi Số HRM 2024
        </h4>

        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
          Hệ thống HRM sẽ tạm dừng bảo trì từ 22h tối nay đến 4h sáng mai để cập nhật giao diện mới...
        </p>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-slate-400">Đã xem 892/1284</span>
          <button className="font-bold text-indigo-600 hover:underline">Chi tiết</button>
        </div>
      </div>
    </div>
  );
}