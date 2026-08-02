import React from "react";

const tabs = [
  { id: "cycle", label: "Chu kỳ đánh giá" },
  { id: "team", label: "Hiệu suất nhóm" },
  { id: "kpi", label: "KPI cá nhân" },
];

export default function PerformanceTabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 pt-3">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-all relative outline-none ${
              activeTab === tab.id
                ? "text-indigo-600 border-b-2 border-indigo-600 font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}