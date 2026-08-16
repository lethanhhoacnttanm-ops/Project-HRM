import React from "react";
import { Building2, Users, UserX, Award } from "lucide-react";


export default function DepartmentStats({ totalDepartments, totalEmployees, unassignedEmployees, vacantLeadershipPositions }) {
  const stats = [
    {
      id: 1,
      title: "Tổng số phòng ban",
      value: totalDepartments,
      badge: "+2 this qtr",
      badgeBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400",
      icon: Building2,
      iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400",
      borderColor: "border-indigo-200 dark:border-indigo-900/60",
    },
    {
      id: 2,
      title: "Tổng số nhân viên",
      value: totalEmployees,
      badge: "Đang hoạt động",
      badgeBg: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
      icon: Users,
      iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-900/60",
    },
    {
      id: 3,
      title: "Nhân viên chưa được phân công",
      value: unassignedEmployees,
      badge: unassignedEmployees > 0 ? "Cần hành động" : "Tất cả đã phân công",
      badgeBg: unassignedEmployees > 0 
        ? "bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400" 
        : "bg-green-50 text-green-600 dark:bg-green-950/80 dark:text-green-400",
      icon: UserX,
      iconBg: unassignedEmployees > 0 
        ? "bg-rose-100 text-rose-500 dark:bg-rose-900/50 dark:text-rose-400" 
        : "bg-green-100 text-green-500 dark:bg-green-900/50 dark:text-green-400",
      borderColor: unassignedEmployees > 0 
        ? "border-rose-200 dark:border-rose-900/60" 
        : "border-green-200 dark:border-green-900/60",
    },
    {
      id: 4,
      title: "Các vị trí lãnh đạo còn trống",
      value: vacantLeadershipPositions,
      badge: vacantLeadershipPositions > 0 ? "Quan trọng" : "Tất cả đã phân công",
      badgeBg: vacantLeadershipPositions > 0 
        ? "bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400" 
        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
      icon: Award,
      iconBg: vacantLeadershipPositions > 0 
        ? "bg-rose-100 text-rose-500 dark:bg-rose-900/50 dark:text-rose-400" 
        : "bg-blue-100 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400",
      // Đã sửa lại định dạng border chuẩn cho card thứ 4
      borderColor: vacantLeadershipPositions > 0 
        ? "border-rose-200 dark:border-rose-900/60" 
        : "border-slate-200 dark:border-slate-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`p-5 bg-white dark:bg-slate-900 border ${item.borderColor} rounded-xl shadow-sm dark:shadow-slate-900/40 flex flex-col justify-between transition-all duration-200 hover:shadow-md dark:hover:border-slate-700`}
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
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{item.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}