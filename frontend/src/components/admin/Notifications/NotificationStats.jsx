import React from "react";
import { Send, Megaphone, CalendarClock, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";


export default function NotificationStats({ statsData }) {
  const readRateValue = statsData?.readRate ? parseFloat(statsData.readRate) : 0;

  const stats = [
    {
      id: 1,
      title: "Tổng thông báo gửi",
      value: statsData?.totalSent ? statsData.totalSent.toLocaleString() : "0",
      badge: "Cập nhật mới",
      badgeColor: "text-emerald-600 bg-emerald-50",
      icon: Send,
      iconBg: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 2,
      title: "Thông báo đang hoạt động",
      value: statsData?.activeCount ? statsData.activeCount.toLocaleString() : "0",
      subText: "Đang hiển thị",
      icon: Megaphone,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 3,
      title: "Lịch gửi sắp tới",
      value: statsData?.upcomingCount ? statsData.upcomingCount.toLocaleString() : "0",
      badge: "Đang chờ xử lý",
      badgeColor: "text-indigo-600 bg-indigo-50 font-bold",
      icon: CalendarClock,
      iconBg: "bg-slate-100 text-slate-700",
    },
    {
      id: 4,
      title: "Tỷ lệ xem (%)",
      value: statsData?.readRate || "0%",
      icon: Eye,
      iconBg: "bg-teal-100 text-teal-600",
      hasProgress: true,
      progressValue: readRateValue,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.title}</p>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{item.value}</h3>
                </div>
                <div className={`p-2.5 rounded-xl ${item.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {item.badge && (
                <span
                  className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-2 ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}

              {item.subText && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-2">
                  {item.subText}
                </p>
              )}
            </div>

            {item.hasProgress && (
              <div className="mt-3">
                <Progress
                  value={item.progressValue}
                  className="h-1.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-teal-600 dark:[&>div]:bg-teal-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}