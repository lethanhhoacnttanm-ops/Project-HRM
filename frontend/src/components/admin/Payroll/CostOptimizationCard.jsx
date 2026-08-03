import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CostOptimizationCard() {
  return (
    <div className="bg-linear-to-r from-indigo-700 to-indigo-600 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-35 relative overflow-hidden">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-200" />
          <h3 className="font-bold text-lg">Tối ưu chi phí</h3>
        </div>
        <p className="text-xs text-indigo-100 mt-2 leading-relaxed max-w-lg">
          Hệ thống gợi ý tối ưu 5% chi phí bảo hiểm thông qua các điều khoản mới.
        </p>
      </div>

      <Button className="bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs h-9 rounded-xl px-4 w-fit mt-4">
        Tìm hiểu thêm
      </Button>
    </div>
  );
}