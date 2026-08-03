import React, { useState } from "react";
import { Download, CheckCircle } from "lucide-react";

import PayrollStats from "../../../components/admin/Payroll/PayrollStats.jsx";
import PayrollTabs from "../../../components/admin/Payroll/PayrollTabs.jsx";
import MonthlyPayrollView from "../../../components/admin/Payroll/views/MonthlyPayrollView.jsx";
import BonusCommissionView from "../../../components/admin/Payroll/views/BonusCommissionView.jsx";
import SalaryStructureView from "../../../components/admin/Payroll/views/SalaryStructureView.jsx";
import DepartmentCostChart from "../../../components/admin/Payroll/DepartmentCostChart.jsx";
import CostOptimizationCard from "../../../components/admin/Payroll/CostOptimizationCard.jsx";
import ImportantNoticeWidget from "../../../components/admin/Payroll/ImportantNoticeWidget.jsx";
import PayrollModal from "../../../components/admin/Payroll/PayrollModal.jsx";
import { Button } from "@/components/ui/button";

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("monthly");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "lock" });

  const openModal = (mode) => setModalState({ isOpen: true, mode });
  const closeModal = () => setModalState({ isOpen: false, mode: "lock" });

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Quản lý Lương & Thưởng
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi và xử lý bảng lương, thưởng hàng tháng của nhân viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("export")}
            className="flex items-center gap-2 border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Xuất báo cáo (Excel)</span>
          </Button>

          <Button
            onClick={() => openModal("lock")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Chốt bảng lương tháng</span>
          </Button>
        </div>
      </div>

      <PayrollStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <PayrollTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "monthly" && <MonthlyPayrollView />}
            {activeTab === "bonus" && <BonusCommissionView />}
            {activeTab === "structure" && <SalaryStructureView />}
          </div>

          <CostOptimizationCard />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <DepartmentCostChart />
          <ImportantNoticeWidget />
        </div>
      </div>

      <PayrollModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
      />
    </div>
  );
}