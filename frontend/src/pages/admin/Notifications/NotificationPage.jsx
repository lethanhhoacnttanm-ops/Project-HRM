import React, { useState } from "react";
import { Download, Plus } from "lucide-react";

import NotificationStats from "../../../components/admin/Notifications/NotificationStats.jsx";
import NotificationFilter from "../../../components/admin/Notifications/NotificationFilter.jsx";
import NotificationTable from "../../../components/admin/Notifications/NotificationTable.jsx";
import RecentActivityWidget from "../../../components/admin/Notifications/RecentActivityWidget.jsx";
import FeaturedPreviewWidget from "../../../components/admin/Notifications/FeaturedPreviewWidget.jsx";
import SupportCardWidget from "../../../components/admin/Notifications/SupportCardWidget.jsx";
import NotificationModal from "../../../components/admin/Notifications/NotificationModal.jsx";
import { Button } from "@/components/ui/button";

export default function NotificationPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create" });

  const openModal = (mode) => setModalState({ isOpen: true, mode });
  const closeModal = () => setModalState({ isOpen: false, mode: "create" });

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Quản lý Thông báo
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Lập lịch và quản lý các thông báo nội bộ cho toàn bộ nhân viên trong tổ chức.
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
            <span>Tạo thông báo mới</span>
          </Button>
        </div>
      </div>

      <NotificationStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-0 rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white self-start">
          <NotificationFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <NotificationTable />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <RecentActivityWidget />
          <FeaturedPreviewWidget />
          <SupportCardWidget />
        </div>
      </div>

      <NotificationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
      />
    </div>
  );
}