import React from "react";
import { BookOpen, Users2, CheckCircle2, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    id: 1,
    title: "Tổng số khóa học",
    value: "24",
    subText: "Hoạt động",
    badge: "+4 trong tháng này",
    badgeColor: "bg-emerald-50 text-emerald-600",
    icon: BookOpen,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    title: "Đào tạo liên tục",
    value: "156",
    subText: "Nhân sự",
    badge: "78% số người đăng ký",
    badgeColor: "bg-indigo-50 text-indigo-600",
    icon: Users2,
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    title: "Tỷ lệ hoàn thành",
    value: "88%",
    icon: CheckCircle2,
    iconBg: "bg-slate-100 text-slate-700",
    hasProgressLine: true,
  },
  {
    id: 4,
    title: "Ngân sách đã sử dụng",
    value: "9 tỷ VNĐ",
    topRightText: "Ngân sách tối đa: 12 tỷ vnd",
    icon: Wallet,
    iconBg: "bg-indigo-100 text-indigo-600",
    budgetProgress: 75, 
  },
];

export default function TrainingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${item.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {item.badge && (
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.topRightText && (
                  <span className="text-[11px] font-medium text-slate-400 dark:text-gray-500">
                    {item.topRightText}
                  </span>
                )}

                {item.hasProgressLine && (
                  <div className="w-12 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-2" />
                )}
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-slate-500 dark:text-gray-400">{item.title}</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{item.value}</h3>
                  {item.subText && (
                    <span className="text-xs font-medium text-slate-400 dark:text-gray-500">
                      {item.subText}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {item.budgetProgress !== undefined && (
              <div className="mt-3">
                <Progress value={item.budgetProgress} className="h-2 bg-indigo-100 dark:bg-indigo-950/60" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}