import React, { useState } from "react";
import { Download } from "lucide-react";
import AttendanceStats from "../../../components/admin/Attendance/AttendanceStats.jsx";
import AttendanceTabs from "../../../components/admin/Attendance/AttendanceTabs.jsx";
import DailyAttendanceView from "../../../components/admin/Attendance/views/DailyAttendanceView.jsx";
import ShiftManagementView from "../../../components/admin/Attendance/views/ShiftManagementView.jsx";
import EditRequestsView from "../../../components/admin/Attendance/views/EditRequestsView.jsx";
import AttendanceModal from "../../../components/admin/Attendance/AttendanceModal.jsx";
import { Button } from "@/components/ui/button";

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("daily");
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "export",
  });

  const openModal = (mode) => setModalState({ isOpen: true, mode });
  const closeModal = () => setModalState({ isOpen: false, mode: "export" });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Quản lý Chấm công
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi thời gian làm việc, ca trực và chuyên cần của nhân viên.
          </p>
        </div>

        <Button
          onClick={() => openModal("export")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Xuất báo cáo</span>
        </Button>
      </div>

      <AttendanceStats />

      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
        <AttendanceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "daily" && <DailyAttendanceView />}
        {activeTab === "shifts" && (
          <ShiftManagementView onOpenModal={() => openModal("create_shift")} />
        )}
        {activeTab === "requests" && <EditRequestsView />}
      </div>

      <AttendanceModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
      />
    </div>
  );
}