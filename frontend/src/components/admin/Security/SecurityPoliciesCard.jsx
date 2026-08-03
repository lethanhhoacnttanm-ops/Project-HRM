import React, { useState } from "react";
import { Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SecurityPoliciesCard({ onSave }) {
  const [policies, setPolicies] = useState({
    passwordExpiration: true,
    mfaAdmin: true,
    ipRestriction: false,
  });

  const togglePolicy = (key) => {
    setPolicies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-100/60">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-800 text-sm">
            Chính sách Bảo mật Hệ thống
          </h3>
        </div>

        <Button
          onClick={onSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-5 h-9 rounded-xl shadow-md transition-all"
        >
          Lưu thay đổi
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-xl flex items-start justify-between gap-3 shadow-none">
          <div>
            <h4 className="font-bold text-slate-800 text-xs">
              Buộc đổi mật khẩu định kỳ
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Yêu cầu người dùng cập nhật mật khẩu mỗi 90 ngày để đảm bảo an toàn.
            </p>
          </div>
          <Switch
            checked={policies.passwordExpiration}
            onCheckedChange={() => togglePolicy("passwordExpiration")}
          />
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-xl flex items-start justify-between gap-3 shadow-none">
          <div>
            <h4 className="font-bold text-slate-800 text-xs">
              Bật MFA cho Quản trị viên
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Bắt buộc xác thực 2 yếu tố cho tất cả các tài khoản có quyền truy cập cao.
            </p>
          </div>
          <Switch
            checked={policies.mfaAdmin}
            onCheckedChange={() => togglePolicy("mfaAdmin")}
          />
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-xl flex items-start justify-between gap-3 shadow-none">
          <div>
            <h4 className="font-bold text-slate-800 text-xs">Giới hạn truy cập IP</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Chỉ cho phép đăng nhập từ danh sách các dải IP văn phòng đã được phê duyệt.
            </p>
          </div>
          <Switch
            checked={policies.ipRestriction}
            onCheckedChange={() => togglePolicy("ipRestriction")}
          />
        </div>
      </div>
    </div>
  );
}