import React from "react";
import { Button } from "@/components/ui/button";

export default function QuickApproveWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800 text-sm">Phê duyệt nhanh</h3>

      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-800 text-sm">Trần Minh Quân</h4>
          <span className="text-xs font-semibold text-slate-500">3 ngày</span>
        </div>
        <p className="text-xs text-slate-500 italic">"Đi du lịch cùng gia đình"</p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold h-8 rounded-lg shadow-sm">
            Duyệt
          </Button>
          <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold h-8 rounded-lg">
            Từ chối
          </Button>
        </div>
      </div>

      <div className="text-center pt-1">
        <p className="text-xs text-slate-400">Bạn còn 7 yêu cầu khác đang chờ...</p>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 mt-1">
          Xem tất cả
        </button>
      </div>
    </div>
  );
}