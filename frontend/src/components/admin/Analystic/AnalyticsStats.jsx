import React from "react";
import { Users, UserMinus, DollarSign, GraduationCap } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Tổng nhân sự",
    value: "1,248",
    subText: "So với 1,114 tháng trước",
    badge: "+12%",
    badgeBg: "bg-emerald-50 text-emerald-600",
    icon: Users,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    title: "Tỷ lệ nghỉ việc",
    value: "4.8%",
    subText: "32 Tuyển mới / 8 Nghỉ việc",
    badge: "-2.1%",
    badgeBg: "bg-rose-50 text-rose-500",
    icon: UserMinus,
    iconBg: "bg-teal-100 text-teal-600",
  },
  {
    id: 3,
    title: "Lương trung bình",
    value: "24.5M",
    unit: "VNĐ",
    subText: "Tính trên toàn hệ thống",
    badge: "+5%",
    badgeBg: "bg-emerald-50 text-emerald-600",
    icon: DollarSign,
    iconBg: "bg-slate-100 text-slate-700",
  },
  {
    id: 4,
    title: "Hoàn thành đào tạo",
    value: "12.4h",
    subText: "Trung bình mỗi nhân viên",
    badge: "88%",
    badgeBg: "bg-emerald-50 text-emerald-600",
    icon: GraduationCap,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
];

export default function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${item.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${item.badgeBg}`}>
                  {item.badge}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-slate-500">{item.title}</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <h3 className="text-2xl font-black text-slate-800">{item.value}</h3>
                  {item.unit && (
                    <span className="text-xs font-bold text-slate-400">{item.unit}</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-[11px] font-medium text-slate-400 mt-2">
              {item.subText}
            </p>
          </div>
        );
      })}
    </div>
  );
}