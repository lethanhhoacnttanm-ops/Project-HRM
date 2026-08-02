import React from "react";
import { TrendingUp, Clock, CheckCircle2, Award } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Tổng số người thăng tiến",
    value: "142",
    badge: "Tăng 12% so với năm ngoái.",
    icon: TrendingUp,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    title: "Đang chờ phê duyệt",
    value: "28",
    icon: Clock,
    iconBg: "bg-red-100 text-red-500",
  },
  {
    id: 3,
    title: "Đủ điều kiện thăng tiến",
    value: "54",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100 text-emerald-500",
  },
  {
    id: 4,
    title: "Thời gian trung bình thăng chức",
    value: "2,4 năm",
    icon: Award,
    iconBg: "bg-blue-100 text-blue-500",
  },
];

export default function PromotionStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-lg ${item.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              {item.badge && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{item.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{item.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}