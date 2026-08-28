import React, { useState } from "react";
import { Save } from "lucide-react";

import CompanyInfoCard from "../../../components/admin/System/CompanyInfoCard.jsx";
import LocalizationCard from "../../../components/admin/System/LocalizationCard.jsx";
import SystemPreferencesCard from "../../../components/admin/System/SystemPreferencesCard.jsx";
import SecurityNoticeCard from "../../../components/admin/System/SecurityNoticeCard.jsx";
import SystemConfigModal from "../../../components/admin/System/SystemConfigModal.jsx";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle.jsx";
import { SunMoon } from "lucide-react";
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
          <div className="dark:bg-gray-950 border bg-indigo-50/60  border-indigo-100 dark:border-gray-800/80 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
                  <SunMoon className="w-5 h-5 transition-transform duration-500 hover:rotate-45" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                    Giao diện hiển thị
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                    Tùy chỉnh chế độ sáng tối cho toàn bộ hệ thống quản trị.
                  </p>
                </div>
              </div>
            </div>

            <ThemeToggle />
          </div>
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