import React from "react";
import { Wallet, Gift, ReceiptCent, CheckCircle2 } from "lucide-react";

export default function PayrollStats({ statsData }) {
  const stats = [
    {
      id: 1,
      title: "Tổng chi lương tháng",
      value: statsData?.totalSalary || "0 VNĐ",
      badge: "Cập nhật mới",
      badgeBg: "bg-emerald-50 text-emerald-600",
      icon: Wallet,
      iconBg: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 2,
      title: "Tổng tiền thưởng",
      value: statsData?.totalBonus || "0 VNĐ",
      icon: Gift,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 3,
      title: "Thuế & Bảo hiểm",
      value: statsData?.totalDeductions || "0 VNĐ",
      icon: ReceiptCent,
      iconBg: "bg-rose-100 text-rose-500",
    },
    {
      id: 4,
      title: "Trạng thái thanh toán",
      value: statsData?.paymentStatusRate || "0% Đã chi",
      circleBadge: statsData?.paymentStatusRate ? statsData.paymentStatusRate.split(" ")[0] : "0%",
      icon: CheckCircle2,
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
            className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.title}</p>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{item.value}</h3>
            </div>

            <div className="flex items-center gap-2">
              {item.circleBadge && (
                <div className="w-10 h-10 rounded-full border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-extrabold">
                  {item.circleBadge}
                </div>
              )}
              {!item.circleBadge && (
                <div className={`p-3 rounded-2xl ${item.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}