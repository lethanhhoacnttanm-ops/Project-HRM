import React from "react";
import { Button } from "../../ui/button.jsx";

const tabs = [
  { id: "catalog", label: "Danh mục khóa học" },
  { id: "program", label: "Chương trình đào tạo" },
  { id: "progress", label: "Tiến độ của nhân viên" },
];

export default function TrainingTabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 pt-3">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-indigo-600 border-b-2 border-indigo-600 font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}