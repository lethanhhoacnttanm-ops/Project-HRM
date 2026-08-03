import React from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SystemConfigModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-800 text-center">
            Cập nhật cấu hình thành công!
          </DialogTitle>
        </DialogHeader>
        <p className="text-xs text-slate-500 mt-1">
          Các thiết lập hệ thống đã được lưu trữ và có hiệu lực ngay lập tức.
        </p>
        <div className="mt-5">
          <Button
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl"
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}