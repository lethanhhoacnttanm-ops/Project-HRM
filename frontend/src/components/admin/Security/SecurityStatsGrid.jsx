import React from "react";
import { Smartphone, Laptop, ShieldAlert, History } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Tỷ lệ áp dụng MFA",
    value: "85%",
    badge: "+2% vs tháng trước",
    badgeColor: "bg-emerald-50 text-emerald-600",
    icon: Smartphone,
    iconBg: "bg-indigo-100 text-indigo-600",
    progressBar: 85,
  },
  {
    id: 2,
    title: "Phiên hoạt động",
    value: "124",
    subText: "Đang kết nối từ 12 quốc gia",
    icon: Laptop,
    iconBg: "bg-teal-100 text-teal-600",
  },
  {
    id: 3,
    title: "Cảnh báo bảo mật tới hạn",
    value: "0",
    badge: "Cần gấp",
    subText: "✓ Không có rủi ro mới",
    subTextColor: "text-emerald-600 font-semibold",
    icon: ShieldAlert,
    iconBg: "bg-rose-100 text-rose-500",
  },
  {
    id: 4,
    title: "Kiểm tra hệ thống cuối",
    value: "2 giờ trước",
    subText: "Kết quả: Toàn vẹn dữ liệu 100%",
    icon: History,
    iconBg: "bg-slate-100 text-slate-700",
  },
];

export default function SecurityStatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Icon className="w-4 h-4" />
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <p className="text-xs font-medium text-slate-500">{item.title}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-0.5">
                  {item.value}
                </h3>
              </div>
            </div>

            {item.progressBar && (
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${item.progressBar}%` }}
                />
              </div>
            )}

            {item.subText && (
              <p
                className={`text-[11px] mt-2 ${
                  item.subTextColor ? item.subTextColor : "text-slate-400 font-medium"
                }`}
              >
                {item.subText}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}