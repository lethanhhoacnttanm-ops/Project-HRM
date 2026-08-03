import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SecurityModal({ isOpen, onClose, mode, targetSession }) {
  const isSuccess = mode === "success";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6 text-center">
        {isSuccess ? (
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        ) : (
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="w-6 h-6" />
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-800 text-center">
            {isSuccess
              ? "Cập nhật chính sách thành công!"
              : targetSession
              ? `Thu hồi phiên làm việc của ${targetSession.name}?`
              : "Xác nhận đăng xuất tất cả phiên làm việc?"}
          </DialogTitle>
        </DialogHeader>

        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {isSuccess
            ? "Cấu hình bảo mật hệ thống đã được ghi lại trong Nhật ký hệ thống (Audit Logs)."
            : "Thiết bị này sẽ bị đăng xuất khỏi hệ thống ngay lập tức và người dùng phải đăng nhập lại."}
        </p>

        <div className="mt-5 flex justify-end gap-2">
          {!isSuccess && (
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 rounded-xl"
            >
              Hủy
            </Button>
          )}

          <Button
            onClick={onClose}
            className={`text-xs font-semibold rounded-xl text-white ${
              isSuccess
                ? "w-full bg-indigo-600 hover:bg-indigo-700"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            {isSuccess ? "Đóng" : "Xác nhận thu hồi"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}