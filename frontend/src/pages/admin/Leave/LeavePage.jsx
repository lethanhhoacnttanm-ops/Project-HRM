import React, { useState } from "react";
import { Download, Plus } from "lucide-react";
import LeaveStats from "../../../components/admin/LeaveManagement/LeaveStats.jsx";
import LeaveFilter from "../../../components/admin/LeaveManagement/LeaveFilter.jsx";
import LeaveTable from "../../../components/admin/LeaveManagement/LeaveTable.jsx";
import QuickApproveWidget from "../../../components/admin/LeaveManagement/QuickApproveWidget.jsx";
import LeaveCalendarWidget from "../../../components/admin/LeaveManagement/LeaveCalendarWidget.jsx";
import ManagementTipWidget from "../../../components/admin/LeaveManagement/ManagementTipWidget.jsx";
import LeaveModal from "../../../components/admin/LeaveManagement/LeaveModal.jsx";
import { Button } from "@/components/ui/button";

export default function LeavePage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create" });

  const openModal = (mode) => setModalState({ isOpen: true, mode });
  const closeModal = () => setModalState({ isOpen: false, mode: "create" });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Quản lý nghỉ phép
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi và phê duyệt các yêu cầu nghỉ phép của nhân viên.
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
            <span>Tạo yêu cầu mới</span>
          </Button>
        </div>
      </div>

      <LeaveStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-0 rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white self-start">
          <LeaveFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
          <LeaveTable />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <QuickApproveWidget />
          <LeaveCalendarWidget />
          <ManagementTipWidget />
        </div>
      </div>

      <LeaveModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
      />
    </div>
  );
}