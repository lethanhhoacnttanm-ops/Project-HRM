import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TicketModal({ isOpen, onClose, mode }) {
  const isFilter = mode === "filter";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {isFilter ? "Bộ lọc dữ liệu nâng cao" : "Tạo yêu cầu hỗ trợ mới"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          {isFilter ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phòng ban yêu cầu
              </label>
              <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white">
                <option>Tất cả phòng ban</option>
                <option>Kỹ thuật</option>
                <option>Nhân sự</option>
              </select>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vấn đề cần hỗ trợ
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Lỗi không điểm danh được..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Loại yêu cầu</label>
                  <select className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white">
                    <option>Công nghệ thông tin</option>
                    <option>Hành chính & Nhân sự</option>
                    <option>Lương & Phúc lợi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mức độ ưu tiên</label>
                  <select className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white">
                    <option>Thấp</option>
                    <option>Trung bình</option>
                    <option>Cao</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mô tả chi tiết</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả sự cố bạn gặp phải..."
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
              {isFilter ? "Áp dụng lọc" : "Gửi yêu cầu"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}