import React from "react";
import { Ticket, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";


export default function TicketStats({ statsData }) {
  const stats = [
    {
      id: 1,
      title: "TỔNG SỐ YÊU CẦU",
      value: statsData?.totalTickets ? statsData.totalTickets.toLocaleString() : "0",
      badge: "Cập nhật mới",
      badgeColor: "text-emerald-600 bg-emerald-50",
      icon: Ticket,
      iconBg: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 2,
      title: "ĐANG XỬ LÝ",
      value: statsData?.inProgressCount ? statsData.inProgressCount.toLocaleString() : "0",
      badge: "Đang xử lý tích cực",
      badgeColor: "text-slate-500 font-medium",
      icon: RefreshCw,
      iconBg: "bg-teal-100 text-teal-600",
    },
    {
      id: 3,
      title: "CẦN PHẢN HỒI",
      value: statsData?.pendingResponseCount ? statsData.pendingResponseCount.toLocaleString() : "0",
      badge: "Cần gấp",
      badgeColor: "text-rose-600 font-bold bg-rose-50",
      icon: AlertCircle,
      iconBg: "bg-rose-100 text-rose-500",
    },
    {
      id: 4,
      title: "ĐÃ HOÀN THÀNH",
      value: statsData?.resolvedCount ? statsData.resolvedCount.toLocaleString() : "0",
      badge: `Tỷ lệ ${statsData?.resolvedRate || 0}%`,
      badgeColor: "text-slate-500 font-medium",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
  ];
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
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  {item.title}
                </p>
                <h3 className="text-2xl font-black text-slate-800 mt-1">
                  {item.value}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}