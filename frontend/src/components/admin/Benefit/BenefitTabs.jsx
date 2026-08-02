import React from "react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "programs", label: "Danh sách chương trình" },
  { id: "registrations", label: "Quản lý đăng ký" },
];

export default function BenefitTabs({ activeTab, setActiveTab }) {
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