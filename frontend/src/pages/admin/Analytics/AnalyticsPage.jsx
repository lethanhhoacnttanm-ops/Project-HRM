import React, { useState } from "react";

import AnalyticsHeaderFilter from "../../../components/admin/Analystic/AnalyticsHeaderFilter.jsx";
import AnalyticsStats from "../../../components/admin/Analystic/AnalyticsStats.jsx";
import WorkforceTrendsChart from "../../../components/admin/Analystic/WorkforceTrendsChart.jsx";
import EmployeeStructureChart from "../../../components/admin/Analystic/EmployeeStructureChart.jsx";
import PayrollDistributionTable from "../../../components/admin/Analystic/PayrollDistributionTable.jsx";
import PerformanceSatisfactionWidget from "../../../components/admin/Analystic/PerformanceSatisfactionWidget.jsx";
import QuickReportsGrid from "../../../components/admin/Analystic/QuickReportsGrid.jsx";
import AnalyticsModal from "../../../components/admin/Analystic/AnalyticsModal.jsx";

export default function AnalyticsPage() {
  const [selectedTime, setSelectedTime] = useState("2023");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetFilters = () => {
    setSelectedTime("2023");
    setSelectedDepartment("all");
  };

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Báo cáo & Thống kê
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Phân tích chuyên sâu về nhân sự, hiệu suất và tài chính để đưa ra quyết định chiến lược hiệu quả.
        </p>
      </div>

      <AnalyticsHeaderFilter
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        onReset={handleResetFilters}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <AnalyticsStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WorkforceTrendsChart />
        </div>
        <div className="lg:col-span-1">
          <EmployeeStructureChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PayrollDistributionTable />
        </div>
        <div className="lg:col-span-1">
          <PerformanceSatisfactionWidget />
        </div>
      </div>

      <QuickReportsGrid />

      <AnalyticsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}