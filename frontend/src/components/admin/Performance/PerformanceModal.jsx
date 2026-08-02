import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PerformanceModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            Bắt đầu chu kỳ đánh giá mới
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên chu kỳ đánh giá
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Đánh giá Hiệu suất Q4 2024"
              className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                className="w-full border border-slate-200 rounded-xl p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hạn hoàn thành
              </label>
              <input
                type="date"
                className="w-full border border-slate-200 rounded-xl p-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phạm vi áp dụng
            </label>
            <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Toàn bộ công ty</option>
              <option>Khối Kỹ thuật & Công nghệ</option>
              <option>Khối Kinh doanh & Marketing</option>
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
              Khởi tạo chu kỳ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}