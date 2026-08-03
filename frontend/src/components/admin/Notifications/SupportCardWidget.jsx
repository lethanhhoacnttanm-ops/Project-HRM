import React from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportCardWidget() {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
      <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400">
        <HelpCircle className="w-5 h-5" />
      </div>

      <h3 className="font-bold text-sm">Cần hỗ trợ?</h3>
      <p className="text-xs text-slate-400 leading-relaxed">
        Bạn đang gặp khó khăn trong việc thiết lập thông báo tự động?
      </p>

      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-9 rounded-xl mt-1">
        Tài liệu Hướng dẫn
      </Button>
    </div>
  );
}