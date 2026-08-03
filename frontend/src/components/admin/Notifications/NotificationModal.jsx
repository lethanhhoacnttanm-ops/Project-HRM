import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function NotificationModal({ isOpen, onClose, mode }) {
  const isExport = mode === "export";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {isExport ? "Xuất báo cáo thông báo" : "Tạo thông báo mới"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          {isExport ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Định dạng tệp
              </label>
              <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white">
                <option>Excel Workbook (.xlsx)</option>
                <option>PDF Document (.pdf)</option>
              </select>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề thông báo
                </label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Loại</label>
                  <select className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white">
                    <option>Hệ thống</option>
                    <option>Lương</option>
                    <option>Hiệu suất</option>
                    <option>Nghỉ phép</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Đối tượng nhận</label>
                  <select className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white">
                    <option>Toàn công ty</option>
                    <option>Khối Văn phòng</option>
                    <option>Phòng Kỹ thuật</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung chi tiết
                </label>
                <textarea
                  rows={3}
                  placeholder="Nhập nội dung thông báo gửi đến nhân viên..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
              {isExport ? "Xuất dữ liệu" : "Gửi thông báo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}