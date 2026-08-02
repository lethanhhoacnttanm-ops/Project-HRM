import React from "react";
import { UserX, Clock, CalendarDays, Umbrella } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    id: 1,
    title: "Đang nghỉ hôm nay",
    value: "12",
    badge: "↗ +2%",
    badgeBg: "bg-emerald-50 text-emerald-600",
    icon: UserX,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    title: "Yêu cầu chờ duyệt",
    value: "08",
    badge: "3 Khẩn cấp",
    badgeBg: "bg-rose-50 text-rose-600 font-bold",
    icon: Clock,
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    id: 3,
    title: "Thời gian nghỉ TB",
    value: "2.4",
    subText: "ngày",
    topRightText: "Tháng này",
    icon: CalendarDays,
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 4,
    title: "Quỹ nghỉ phép năm",
    value: "84%",
    icon: Umbrella,
    iconBg: "bg-teal-100 text-teal-600",
    hasProgress: true,
    progressValue: 84,
  },
];

export default function LeaveStats() {
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
                {item.badge && (
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                )}
                {item.topRightText && (
                  <span className="text-[11px] font-medium text-slate-400">
                    {item.topRightText}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-slate-500">{item.title}</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <h3 className="text-2xl font-extrabold text-slate-800">{item.value}</h3>
                  {item.subText && (
                    <span className="text-xs text-slate-400 font-medium">{item.subText}</span>
                  )}
                </div>
              </div>
            </div>

            {item.hasProgress && (
              <div className="mt-3">
                <Progress value={item.progressValue} className="h-1.5 bg-slate-100 [&>div]:bg-teal-600" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}