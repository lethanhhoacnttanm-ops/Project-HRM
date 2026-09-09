import React from "react";
import { UserCheck, TrendingUp, ClipboardEdit, Award, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PerformanceStats({statsData}) {
  const evaluated = statsData?.evaluatedCount || 0;
  const total = statsData?.totalTargetCount || 1200;
  const progressPercent = total > 0 ? Math.round((evaluated / total) * 100) : 0;

  const stats = [
    {
      id: 1,
      title: "TỔNG SỐ ĐÃ ĐÁNH GIÁ",
      value: evaluated.toLocaleString(),
      total: `/ ${total.toLocaleString()}`,
      icon: UserCheck,
      iconBg: "bg-indigo-100 text-indigo-600",
      progressValue: progressPercent,
    },
    {
      id: 2,
      title: "HIỆU SUẤT TRUNG BÌNH",
      value: statsData?.avgScore || "0.0",
      total: "/ 5.0",
      stars: Math.round(parseFloat(statsData?.avgScore || 0)),
      icon: TrendingUp,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 3,
      title: "ĐANG ĐÁNH GIÁ",
      value: statsData?.inProgressCount || 0,
      badge: "⚡ Đang tập trung",
      badgeBg: "text-emerald-600 font-semibold",
      icon: ClipboardEdit,
      iconBg: "bg-slate-100 text-slate-700",
    },
    {
      id: 4,
      title: "NHÂN VIÊN XUẤT SẮC",
      value: `${statsData?.excellentPercent || 0}%`,
      subText: "Tỷ lệ đạt loại xuất sắc",
      icon: Award,
      iconBg: "bg-indigo-100 text-indigo-600",
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
                <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  {item.title}
                </p>
                <div className={`p-2 rounded-xl ${item.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-black text-slate-800">{item.value}</h3>
                  {item.total && (
                    <span className="text-xs font-semibold text-slate-400">{item.total}</span>
                  )}
                </div>

                {item.stars && (
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.stars
                            ? "fill-emerald-500 text-emerald-500"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {item.badge && (
                  <p className={`text-[11px] mt-1 ${item.badgeBg}`}>{item.badge}</p>
                )}

                {item.subText && (
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    {item.subText}
                  </p>
                )}
              </div>
            </div>

            {item.progressValue !== undefined && (
              <div className="mt-3">
                <Progress
                  value={item.progressValue}
                  className="h-1.5 bg-slate-100 [&>div]:bg-indigo-600"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}