import React from "react";
import { Info } from "lucide-react";

export default function SecurityNoticeCard() {
  return (
    <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 shadow-sm flex items-start gap-3">
      <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
      <div>
        <h4 className="font-bold text-indigo-950 text-xs">Lưu ý bảo mật</h4>
        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
          Mọi thay đổi trong phần cấu hình hệ thống sẽ được ghi lại trong nhật ký hoạt động (Audit Logs) để truy vết sau này.
        </p>
      </div>
    </div>
  );
}