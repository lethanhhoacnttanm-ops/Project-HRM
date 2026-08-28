import React from "react";
import { Users, CheckCircle2, Clock, UserX } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    id: 1,
    title: "TỔNG NHÂN SỰ",
    value: "1,248",
    subText: "Quy mô toàn công ty",
    icon: Users,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    title: "ĐÚNG GIỜ",
    value: "1,150",
    badge: "+92%",
    badgeColor: "bg-emerald-50 text-emerald-600",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100 text-emerald-600",
    hasProgress: true,
    progressValue: 92,
  },
  {
    id: 3,
    title: "ĐI MUỘN/VỀ SỚM",
    value: "42",
    badge: "↗ 3.4% so với tuần trước",
    badgeColor: "bg-rose-50 text-rose-500",
    icon: Clock,
    iconBg: "bg-rose-100 text-rose-500",
  },
  {
    id: 4,
    title: "VẮNG MẶT",
    value: "56",
    subText: "Không phép: 12",
    icon: UserX,
    iconBg: "bg-slate-100 text-slate-500",
  },
];

export default function AttendanceStats() {
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
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-gray-500 uppercase">
                  {item.title}
                </p>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                  {item.value}
                </h3>
                {item.subText && (
                  <p className="text-xs font-medium text-slate-400 dark:text-gray-500 mt-0.5">
                    {item.subText}
                  </p>
                )}
              </div>
            </div>

            {item.hasProgress && (
              <div className="mt-3">
                <Progress
                  value={item.progressValue}
                  className="h-1.5 bg-slate-100 dark:bg-gray-800 [&>div]:bg-emerald-600 dark:[&>div]:bg-emerald-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}