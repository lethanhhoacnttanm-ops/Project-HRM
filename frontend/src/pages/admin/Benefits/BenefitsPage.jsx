import React, { useState } from "react";
import { Download, Plus } from "lucide-react";

import BenefitStats from "../../../components/admin/Benefit/BenefitStats.jsx";
import BenefitTabs from "../../../components/admin/Benefit/BenefitTabs.jsx";
import ProgramListView from "../../../components/admin/Benefit/views/ProgramListView.jsx";
import RegistrationManageView from "../../../components/admin/Benefit/views/RegistrationManageView.jsx";
import BenefitStructureChart from "../../../components/admin/Benefit/BenefitStructureChart.jsx";
import BenefitNotificationsWidget from "../../../components/admin/Benefit/BenefitNotificationsWidget.jsx";
import BenefitSupportWidget from "../../../components/admin/Benefit/BenefitSupportWidget.jsx";
import BenefitModal from "../../../components/admin/Benefit/BenefitModal.jsx";
import { Button } from "@/components/ui/button";

export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState("programs");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create" });

  const openModal = (mode) => setModalState({ isOpen: true, mode });
  const closeModal = () => setModalState({ isOpen: false, mode: "create" });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Chính sách phúc lợi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý các chương trình bảo hiểm, phụ cấp và đãi ngộ nhân viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("export")}
            className="flex items-center gap-2 border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Xuất báo cáo</span>
          </Button>

          <Button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm chương trình mới</span>
          </Button>
        </div>
      </div>

      <BenefitStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-0 rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white self-start">
          <BenefitTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "programs" && <ProgramListView />}
          {activeTab === "registrations" && <RegistrationManageView />}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <BenefitStructureChart />
          <BenefitNotificationsWidget />
          <BenefitSupportWidget />
        </div>
      </div>

      <BenefitModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
      />
    </div>
  );
}