import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LeaveModal({ isOpen, onClose, mode }) {
  const isExport = mode === "export";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {isExport ? "Xuất báo cáo nghỉ phép" : "Tạo yêu cầu nghỉ phép mới"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          {isExport ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Định dạng xuất
                </label>
                <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Excel Document (.xlsx)</option>
                  <option>CSV (.csv)</option>
                  <option>PDF (.pdf)</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Loại nghỉ phép
                </label>
                <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Nghỉ phép năm</option>
                  <option>Nghỉ ốm</option>
                  <option>Nghỉ việc riêng</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Từ ngày</label>
                  <input type="date" className="w-full border border-slate-200 rounded-xl p-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Đến ngày</label>
                  <input type="date" className="w-full border border-slate-200 rounded-xl p-2 text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Lý do nghỉ</label>
                <textarea
                  rows={3}
                  placeholder="Nhập lý do chi tiết..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
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
              {isExport ? "Xuất dữ liệu" : "Gửi yêu cầu"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}