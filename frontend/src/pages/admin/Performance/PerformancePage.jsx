import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

import PerformanceStats from "../../../components/admin/Performance/PerformanceStats.jsx";
import PerformanceTabs from "../../../components/admin/Performance/PerformanceTabs.jsx";
import PerformanceFilter from "../../../components/admin/Performance/PerformanceFilter.jsx";
import PerformanceTable from "../../../components/admin/Performance/PerformanceTable.jsx";
import RecentActivityWidget from "../../../components/admin/Performance/RecentActivityWidget.jsx";
import DistributionWidget from "../../../components/admin/Performance/DistributionWidget.jsx";
import TopEmployeesWidget from "../../../components/admin/Performance/TopEmployeesWidget.jsx";
import PerformanceModal from "../../../components/admin/Performance/PerformanceModal.jsx";
import { Button } from "@/components/ui/button";

export default function PerformancePage() {
  const [activeTab, setActiveTab] = useState("cycle");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedQuarter, setSelectedQuarter] = useState("q3_2024");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Đánh giá hiệu suất
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi hiệu suất nhân viên, chỉ số KPI và các chu kỳ đánh giá.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Bắt đầu chu kỳ mới</span>
        </Button>
      </div>

      <PerformanceStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <PerformanceTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <PerformanceFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              selectedQuarter={selectedQuarter}
              setSelectedQuarter={setSelectedQuarter}
            />

            <PerformanceTable />
          </div>

          <RecentActivityWidget />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <DistributionWidget />
          <TopEmployeesWidget />
        </div>
      </div>

      <PerformanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}