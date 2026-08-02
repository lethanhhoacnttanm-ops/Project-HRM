import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TrainingModal({ isOpen, onClose, mode }) {
  const isAssign = mode === "assign";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {isAssign ? "Phân công đào tạo" : "Tạo khóa học mới"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          {isAssign ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chọn nhân sự
                </label>
                <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Jane Doe (Senior Frontend Eng.)</option>
                  <option>Mark Smith (Product Manager)</option>
                  <option>Alice Lo (HR Assistant)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Khóa học chỉ định
                </label>
                <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>GDPR & Bảo mật dữ liệu 2024</option>
                  <option>Effective Team Leadership</option>
                  <option>Advanced AWS Architecture</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên khóa học
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: AI trong Quản trị HR"
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Danh mục
                </label>
                <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Kỹ năng mềm</option>
                  <option>Kỹ thuật</option>
                  <option>Sự tuân thủ</option>
                </select>
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
              {isAssign ? "Xác nhận phân công" : "Tạo khóa học"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}