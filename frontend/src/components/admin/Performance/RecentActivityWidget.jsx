import React from "react";
import { CheckCircle2, Edit3 } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Đánh giá của Sarah J. Hoàn thành",
    time: "2 giờ trước",
    icon: CheckCircle2,
    iconBg: "bg-indigo-600 text-white",
  },
  {
    id: 2,
    title: "Sofia R. đã bắt đầu đánh giá cho James W.",
    time: "4 giờ trước",
    icon: Edit3,
    iconBg: "bg-emerald-600 text-white",
  },
];

export default function RecentActivityWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800 text-sm">Đánh giá gần đây</h3>
      <div className="space-y-4">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex items-start gap-3">
              <div className={`p-1.5 rounded-full ${act.iconBg} mt-0.5`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">{act.title}</p>
                <span className="text-[11px] text-slate-400">{act.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}