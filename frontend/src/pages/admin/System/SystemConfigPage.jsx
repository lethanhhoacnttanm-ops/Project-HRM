import React, { useState } from "react";
import { Save } from "lucide-react";

import CompanyInfoCard from "../../../components/admin/System/CompanyInfoCard.jsx";
import LocalizationCard from "../../../components/admin/System/LocalizationCard.jsx";
import SystemPreferencesCard from "../../../components/admin/System/SystemPreferencesCard.jsx";
import SecurityNoticeCard from "../../../components/admin/System/SecurityNoticeCard.jsx";
import SystemConfigModal from "../../../components/admin/System/SystemConfigModal.jsx";
import { Button } from "@/components/ui/button";

export default function SystemConfigPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Cấu hình hệ thống
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Quản lý các thiết lập chung và thông tin cơ bản của tổ chức.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CompanyInfoCard />
          <LocalizationCard />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <SystemPreferencesCard />
          <SecurityNoticeCard />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
        <Button
          variant="outline"
          className="border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold px-5 h-10 rounded-xl"
        >
          Hủy bỏ
        </Button>

        <Button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-5 h-10 rounded-xl shadow-md gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Lưu thay đổi</span>
        </Button>
      </div>

      <SystemConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}