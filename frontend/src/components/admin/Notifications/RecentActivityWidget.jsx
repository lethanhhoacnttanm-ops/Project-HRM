import React from "react";
import { Activity } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Gửi thông báo Hệ thống",
    time: "15 phút trước • Thành công",
    dotColor: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Lập lịch: Đánh giá Quý 3",
    time: "2 giờ trước • Admin A",
    dotColor: "bg-indigo-600",
  },
  {
    id: 3,
    title: "Cập nhật Nháp: Nghỉ lễ",
    time: "Hôm qua • Admin B",
    dotColor: "bg-slate-400",
  },
];

export default function RecentActivityWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-indigo-600" />
        <h3 className="font-bold text-slate-800 text-sm">Hoạt động Gần đây</h3>
      </div>

      <div className="space-y-4 relative pl-2">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3 relative">
            <span className={`w-2.5 h-2.5 rounded-full ${act.dotColor} mt-1 shrink-0`} />
            <div>
              <p className="font-bold text-slate-800 text-xs">{act.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}