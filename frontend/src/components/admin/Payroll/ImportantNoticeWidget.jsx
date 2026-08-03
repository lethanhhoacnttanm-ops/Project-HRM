import React from "react";
import { AlertTriangle, FileCheck, ShieldCheck } from "lucide-react";

export default function ImportantNoticeWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-xs tracking-wider uppercase">
          THÔNG BÁO QUAN TRỌNG
        </h3>
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-slate-800 text-xs">5 nhân viên chưa cập nhật số tài khoản</h5>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Hạn chót cập nhật là 12h ngày mai để kịp thanh toán.
            </p>
          </div>
        </div>

        <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-start gap-3">
          <FileCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-slate-800 text-xs">Bảng lương tháng 5 đang chờ duyệt</h5>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Yêu cầu được gửi bởi Admin HR lúc 09:30 sáng nay.
            </p>
          </div>
        </div>

       
        <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-slate-800 text-xs">Cấu hình bảo hiểm mới</h5>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Đã áp dụng mức đóng bảo hiểm mới từ 01/05/2024.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-1 border-t border-slate-100">
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
          Xem tất cả thông báo
        </button>
      </div>
    </div>
  );
}