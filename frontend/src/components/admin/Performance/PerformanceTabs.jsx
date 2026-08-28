import React from "react";
import { Button } from "../../ui/button.jsx";


export default function PerformanceTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "cycle", label: "Chu kỳ đánh giá" },
    { id: "team", label: "Hiệu suất nhóm" },
    { id: "kpi", label: "KPI cá nhân" },
  ];
  return (
    <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 w-fit">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium bg-white transition-all relative outline-none ${activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-[1.02]"
                : "text-slate-600 hover:text-indigo-600 hover:bg-white/80"
              }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}