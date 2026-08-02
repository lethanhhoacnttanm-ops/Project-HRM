import React from "react";
import { Button } from "../../ui/button.jsx";

const tabs = [
  { id: "daily", label: "Bảng chấm công hàng ngày" },
  { id: "shifts", label: "Quản lý ca làm việc" },
  { id: "requests", label: "Yêu cầu chỉnh sửa" },
];

export default function AttendanceTabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 pt-3">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-all relative outline-none ${
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