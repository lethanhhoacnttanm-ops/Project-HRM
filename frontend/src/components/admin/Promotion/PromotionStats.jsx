import React from "react";
import { TrendingUp, Clock, CheckCircle2, Award } from "lucide-react";

export default function PromotionStats({ dataPromotion, loading }) {

  const totalPromoted = dataPromotion.filter(p => p.status === 'COMPLETED').length;

  const pendingApproval = dataPromotion.filter(p => p.status === 'PENDING_REVIEW' || p.status === 'WAITING').length;

  const effectivePendingCount = dataPromotion.filter(p => p.status === 'APPROVED_PENDING_EFFECTIVE').length;

  const calculateAvgTime = () => {
    if (dataPromotion.length === 0) return "0 năm";
    const totalTenure = dataPromotion.reduce((acc, curr) => acc + (curr.gradetenure || 0), 0);
    const avg = totalTenure / dataPromotion.length;
    return `${avg.toFixed(1).replace('.', ',')} năm`;
  };

  const stats = [
    {
      id: 1,
      title: "Tổng số người thăng tiến",
      value: loading ? "..." : totalPromoted.toString(),
      badge: "Tăng 12% so với năm ngoái.",
      icon: TrendingUp,
      iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400",
    },
    {
      id: 2,
      title: "Đang chờ phê duyệt",
      value: loading ? "..." : pendingApproval.toString(),
      icon: Clock,
      iconBg: "bg-red-100 text-red-500 dark:bg-red-950/60 dark:text-red-400",
    },
    {
      id: 3,
      title: "Chờ có hiệu lực",
      value: loading ? "..." : effectivePendingCount.toString(),
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-400",
    },
    {
      id: 4,
      title: "Thời gian trung bình thăng chức",
      value: loading ? "..." : calculateAvgTime(),
      icon: Award,
      iconBg: "bg-blue-100 text-blue-500 dark:bg-blue-950/60 dark:text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl shadow-sm dark:shadow-slate-900/40 flex flex-col justify-between transition-all duration-200 hover:shadow-md dark:hover:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-lg ${item.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              {item.badge && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500 dark:text-gray-400">{item.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{item.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}