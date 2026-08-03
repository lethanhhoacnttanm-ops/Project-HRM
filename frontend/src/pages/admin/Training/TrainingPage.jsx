import React, { useState } from "react";
import { UserCheck, Plus } from "lucide-react";
import TrainingStats from "../../../components/admin/Training/TrainingStats.jsx";
import TrainingTabs from "../../../components/admin/Training/TrainingTabs.jsx";
import CourseCatalogView from "../../../components/admin/Training/view/CourseCatalogView.jsx";
import TrainingProgramView from "../../../components/admin/Training/view/TrainingProgramView.jsx";
import EmployeeProgressView from "../../../components/admin/Training/view/EmployeeProgressView.jsx";
import TrainingModal from "../../../components/admin/Training/TrainingModal.jsx";
import { Button } from "@/components/ui/button";

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("catalog");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "assign" });

  const openModal = (mode) => setModalState({ isOpen: true, mode });
  const closeModal = () => setModalState({ isOpen: false, mode: "assign" });

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Đào tạo & Phát triển
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý việc nâng cao kỹ năng, chứng chỉ và nguồn tài liệu giáo dục cho nhân viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("assign")}
            className="flex items-center gap-2 border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
          >
            <UserCheck className="w-4 h-4 text-slate-500" />
            <span>Phân công đào tạo</span>
          </Button>

          <Button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo khóa học mới</span>
          </Button>
        </div>
      </div>

      <TrainingStats />

      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
        <TrainingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "catalog" && <CourseCatalogView />}
        {activeTab === "program" && (
          <TrainingProgramView onOpenModal={() => openModal("create")} />
        )}
        {activeTab === "progress" && <EmployeeProgressView />}
      </div>

      <TrainingModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
      />
    </div>
  );
}