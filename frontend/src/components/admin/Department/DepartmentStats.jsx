import React from "react";
import { Building2, Users, UserX, Award } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Tổng số phòng ban",
    value: "12",
    badge: "+2 this qtr",
    badgeBg: "bg-emerald-50 text-emerald-600",
    icon: Building2,
    iconBg: "bg-indigo-100 text-indigo-600",
    borderColor: "border-indigo-200",
  },
  {
    id: 2,
    title: "Tổng số nhân viên",
    value: "842",
    badge: "Đang hoạt động",
    badgeBg: "bg-slate-100 text-slate-600",
    icon: Users,
    iconBg: "bg-emerald-100 text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    id: 3,
    title: "Nhân viên chưa được phân công",
    value: "14",
    badge: "Cần hành động",
    badgeBg: "bg-rose-50 text-rose-600",
    icon: UserX,
    iconBg: "bg-rose-100 text-rose-500",
    borderColor: "border-rose-200",
  },
  {
    id: 4,
    title: "Các vị trí lãnh đạo còn trống",
    value: "03",
    badge: "Quan trọng",
    badgeBg: "bg-slate-100 text-slate-600",
    icon: Award,
    iconBg: "bg-blue-100 text-blue-600",
    borderColor: "border-slate-200",
  },
];

export default function DepartmentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`p-5 bg-white border ${item.borderColor} rounded-xl shadow-sm flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-lg ${item.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.badgeBg}`}>
                {item.badge}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-slate-500">{item.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{item.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}