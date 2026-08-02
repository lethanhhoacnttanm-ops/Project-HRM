import React from "react";
import { Button } from "@/components/ui/button";

export default function BenefitSupportWidget() {
  return (
    <div className="bg-indigo-700 text-white rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
      <h3 className="font-bold text-sm">Cần hỗ trợ thiết kế gói?</h3>
      <p className="text-xs text-indigo-200 leading-relaxed">
        Liên hệ với đội ngũ tư vấn phúc lợi để tối ưu chi phí và tăng trải nghiệm nhân viên.
      </p>
      <Button className="bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs h-8 rounded-xl px-4 mt-2">
        Gửi yêu cầu
      </Button>
    </div>
  );
}