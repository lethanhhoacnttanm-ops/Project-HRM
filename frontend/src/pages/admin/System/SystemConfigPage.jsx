import React, { useState, useEffect } from "react";
import { Save, SunMoon, Building2, Wrench } from "lucide-react";
import { toast } from "sonner"; 

import CompanyInfoCard from "../../../components/admin/System/CompanyInfoCard.jsx";
import SystemConfigModal from "../../../components/admin/System/SystemConfigModal.jsx";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle.jsx";
import { systemConfigService } from "@/services/systemConfig.service.js"; 

export default function SystemConfigPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    companyName: 'Công ty Cổ phần Giải pháp Công nghệ Việt',
    taxCode: '0123456789',
    address: 'Tầng 12, Tòa nhà Innovation, Khu Công nghệ cao, Quận 9, TP. HCM',
    email: 'contact@vn-techsolutions.vn',
    phone: '+84 28 1234 5678',
    logoUrl: '',
    language: 'vi',
    timezone: 'gmt7',
    dateFormat: 'ddmmyyyy',
    timeFormat: '24h',
    mfaEnabled: true,
    essEnabled: true,
    syncHolidays: false,
    emailNotification: true,
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const res = await systemConfigService.getConfig();
      if (res.success && res.data) {
        setFormData(res.data);
      }
    } catch (error) {
      console.error('Lỗi tải cấu hình:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await systemConfigService.updateConfig(formData);
      if (res.success) {
        toast.success(res.message || 'Lưu cấu hình hệ thống thành công!');
      }
    } catch (error) {
      console.error('Lỗi lưu cấu hình:', error);
      toast.error('Lưu thay đổi thất bại, vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-xs text-slate-500">Đang tải cấu hình hệ thống...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <Wrench className="size-6 text-indigo-600 dark:text-indigo-400" />
          Cấu hình hệ thống
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Quản lý các thiết lập chung và thông tin cơ bản của tổ chức.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <CompanyInfoCard formData={formData} onChange={handleChange} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-50/60 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5 transition-all">
            <div className="flex items-center justify-between pb-4 border-b border-indigo-100/60 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner shrink-0">
                  <SunMoon className="w-5 h-5 transition-transform duration-500 hover:rotate-45" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                    Giao diện hiển thị
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Tùy chỉnh chế độ sáng tối cho toàn bộ hệ thống quản trị.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-end gap-3">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold text-xs px-5 h-10 rounded-xl shadow-md gap-2 cursor-pointer transition-all"
        >
          <Save className={`w-4 h-4 ${saving ? 'animate-spin' : ''}`} />
          <span>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
        </Button>
      </div>

      <SystemConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}