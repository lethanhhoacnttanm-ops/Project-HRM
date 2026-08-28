import React from "react";
import { Button } from "../../ui/button.jsx";
import { BookOpen, ClipboardList, BarChart3 } from "lucide-react";

export default function TrainingTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "catalog", label: "Danh mục khóa học", icon: BookOpen },
    { id: "program", label: "Chương trình đào tạo", icon: ClipboardList },
    { id: "progress", label: "Tiến độ của nhân viên", icon: BarChart3 },
  ];
  return (
    <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 dark:bg-gray-800 rounded-2xl border border-slate-200/60 dark:border-gray-700 w-fit">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border-0 ${
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none scale-[1.02] dark:bg-indigo-600"
                : "bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700"
            }`}
          >
            <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
            <span>{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}