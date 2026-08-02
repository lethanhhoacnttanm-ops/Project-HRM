import React from "react";

export default function PromotionTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "process", label: "Quy trình thăng tiến" },
    { id: "eligibility", label: "Kiểm tra điều kiện đủ tư cách" },
    { id: "history", label: "Lịch sử thăng tiến" },
  ];

  return (
    <div className="border-b border-slate-200 bg-white px-6 pt-3">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
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