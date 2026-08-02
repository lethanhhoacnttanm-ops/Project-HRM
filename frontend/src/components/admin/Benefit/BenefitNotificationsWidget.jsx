import React from "react";
import { AlertTriangle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BenefitNotificationsWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">Thông báo & Nhắc nhở</h3>
        <span className="w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
          2
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-slate-800 text-xs">Gói bảo hiểm sức khỏe A sắp hết hạn</h5>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Còn 5 ngày nữa sẽ hết hạn tái ký hợp đồng với nhà cung cấp.
            </p>
          </div>
        </div>

        <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-start gap-3">
          <UserPlus className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-slate-800 text-xs">Nhân viên mới chưa đăng ký</h5>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Có 3 nhân viên mới gia nhập tháng này chưa hoàn thành đăng ký gói phúc lợi.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-1">
        <Button variant="link" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
          Xem tất cả thông báo
        </Button>
      </div>
    </div>
  );
}