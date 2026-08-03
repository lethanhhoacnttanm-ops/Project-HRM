import React, { useState } from "react";
import { Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SystemPreferencesCard() {
  const [settings, setSettings] = useState({
    mfa: true,
    ess: true,
    syncHolidays: false,
    emailNotify: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 border-b border-indigo-100/60 pb-3">
        <Settings className="w-5 h-5 text-indigo-600" />
        <h3 className="font-bold text-slate-800 text-sm">Tùy chỉnh hệ thống</h3>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-800 text-xs">Xác thực đa yếu tố (MFA)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Yêu cầu bảo mật bổ sung cho quản trị viên.
            </p>
          </div>
          <Switch checked={settings.mfa} onCheckedChange={() => toggleSetting("mfa")} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-800 text-xs">Tự phục vụ nhân viên (ESS)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Cho phép nhân viên tự cập nhật thông tin cá nhân.
            </p>
          </div>
          <Switch checked={settings.ess} onCheckedChange={() => toggleSetting("ess")} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-800 text-xs">Tự động đồng bộ ngày lễ</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Tự cập nhật lịch nghỉ lễ từ chính phủ Việt Nam.
            </p>
          </div>
          <Switch
            checked={settings.syncHolidays}
            onCheckedChange={() => toggleSetting("syncHolidays")}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-800 text-xs">Thông báo qua Email</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Gửi cập nhật hệ thống định kỳ qua email.
            </p>
          </div>
          <Switch
            checked={settings.emailNotify}
            onCheckedChange={() => toggleSetting("emailNotify")}
          />
        </div>
      </div>
    </div>
  );
}