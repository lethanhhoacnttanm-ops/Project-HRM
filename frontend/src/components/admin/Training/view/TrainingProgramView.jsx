import React from "react";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrainingProgramView({ onOpenModal }) {
  return (
    <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-12 my-4 text-center flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-sm">
        <ClipboardList className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-bold text-slate-800">
        Không có lộ trình học tập chủ động nào được xác định.
      </h3>

      <p className="text-xs text-slate-500 max-w-md mt-2 leading-relaxed">
        Phân nhóm các khóa học thành các chương trình có cấu trúc dành riêng cho
        từng vai trò hoặc nhóm đối tượng cụ thể để theo dõi tiến độ chung một cách hiệu quả.
      </p>

      <Button
        onClick={onOpenModal}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all"
      >
        Thiết lập chương trình đầu tiên
      </Button>
    </div>
  );
}