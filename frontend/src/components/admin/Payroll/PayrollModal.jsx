import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PayrollModal({ isOpen, onClose, mode }) {
  const isLock = mode === "lock";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {isLock ? "Xác nhận chốt bảng lương tháng" : "Xuất báo cáo lương (Excel)"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          {isLock ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
              Lưu ý: Sau khi khóa bảng lương, mọi thông tin chi trả của kỳ lương Tháng 05/2024 sẽ không thể thay đổi. Bạn có chắc chắn muốn tiếp tục?
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chọn kỳ lương xuất file
              </label>
              <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white">
                <option>Tháng 05/2024</option>
                <option>Tháng 04/2024</option>
              </select>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-xs font-semibold text-slate-600 rounded-xl">
              Hủy
            </Button>
            <Button
              type="submit"
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
            >
              {isLock ? "Khóa bảng lương" : "Xuất file Excel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}