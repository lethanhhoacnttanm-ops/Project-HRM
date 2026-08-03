import React from "react";
import { Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SalaryStructureView() {
  return (
    <div className="bg-white rounded-b-2xl p-8 text-center space-y-4">
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
        <Sliders className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-slate-800 text-base">Cấu hình dải lương chuẩn theo vị trí</h3>
      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
        Quản lý các mức lương tối thiểu, tối đa và hệ số lương thưởng cho từng cấp bậc nhân sự.
      </p>
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md">
        Thiết lập khung lương mới
      </Button>
    </div>
  );
}