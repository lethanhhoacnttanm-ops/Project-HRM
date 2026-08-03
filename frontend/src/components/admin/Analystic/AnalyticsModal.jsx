import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AnalyticsModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            Xuất báo cáo tổng hợp
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Chọn định dạng xuất
            </label>
            <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>PDF Report (.pdf)</option>
              <option>Excel Workbook (.xlsx)</option>
              <option>PowerPoint Presentation (.pptx)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phạm vi dữ liệu
            </label>
            <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Toàn bộ chỉ số (Nhân sự, Payroll, Performance)</option>
              <option>Chỉ dữ liệu Nhân sự & Biến động</option>
              <option>Chỉ dữ liệu Ngân sách Payroll</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 rounded-xl"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
            >
              Xuất tệp báo cáo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}