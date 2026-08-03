import React from "react";
import { FileText, ArrowRightLeft, ShieldCheck } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Báo cáo Thuế & BHXH",
    desc: "Xem dữ liệu chi tiết cho kỳ nộp tháng 9",
    icon: FileText,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    title: "Lịch sử điều chuyển",
    desc: "Thống kê luôn chuyển nội bộ năm 2023",
    icon: ArrowRightLeft,
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    title: "Kiểm toán dữ liệu",
    desc: "Kiểm tra tính toàn vẹn của hồ sơ nhân sự",
    icon: ShieldCheck,
    iconBg: "bg-slate-100 text-slate-700",
  },
];

export default function QuickReportsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {reports.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-4 bg-indigo-50/40 border border-indigo-100/80 rounded-2xl flex items-center gap-3.5 hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            <div className={`p-3 rounded-xl shrink-0 ${item.iconBg}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">{item.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}