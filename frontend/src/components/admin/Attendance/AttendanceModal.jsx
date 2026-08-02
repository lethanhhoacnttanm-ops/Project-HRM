import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AttendanceModal({ isOpen, onClose, mode }) {
  const isExport = mode === "export";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {isExport ? "Xuất báo cáo chấm công" : "Tạo ca làm việc mới"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          {isExport ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Khoảng thời gian
                </label>
                <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Tháng hiện tại (05/2024)</option>
                  <option>Tháng trước (04/2024)</option>
                  <option>Tùy chọn khoảng ngày</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Định dạng tệp
                </label>
                <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Excel (.xlsx)</option>
                  <option>CSV (.csv)</option>
                  <option>PDF Document (.pdf)</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên ca làm việc
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ca Sáng Tăng Cường"
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Check-in
                  </label>
                  <input
                    type="time"
                    className="w-full border border-slate-200 rounded-xl p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Check-out
                  </label>
                  <input
                    type="time"
                    className="w-full border border-slate-200 rounded-xl p-2 text-xs"
                  />
                </div>
              </div>
            </>
          )}

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
              {isExport ? "Tải báo cáo" : "Lưu ca làm việc"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}