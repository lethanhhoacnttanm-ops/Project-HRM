import React from "react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "monthly", label: "Bảng lương hàng tháng" },
  { id: "bonus", label: "Quản lý thưởng & hoa hồng" },
  { id: "structure", label: "Cấu hình khung lương" },
];

export default function PayrollTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 w-fit">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-all relative outline-none ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none scale-[1.02] dark:bg-indigo-600"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}