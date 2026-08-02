import React from "react";
import { Wallet, PieChart, Activity, Clock } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "TỔNG NGÂN SÁCH",
    value: "1.2 tỷ VNĐ",
    icon: Wallet,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    title: "TỶ LỆ THAM GIA",
    value: "94%",
    icon: PieChart,
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    title: "ĐANG HOẠT ĐỘNG",
    value: "12",
    icon: Activity,
    iconBg: "bg-slate-100 text-slate-700",
  },
  {
    id: 4,
    title: "CHỜ DUYỆT",
    value: "08",
    icon: Clock,
    iconBg: "bg-rose-100 text-rose-600",
  },
];

export default function BenefitStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                {item.title}
              </p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">
                {item.value}
              </h3>
            </div>
            <div className={`p-3 rounded-2xl ${item.iconBg}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}