import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export default function LeaveModal({ isOpen, onClose, mode, dataLeave }) {
  if (!dataLeave) return null;
  const isExport = mode === "export";
  const isDetail = mode === "detail"

  const formatDate = (dateStr) => {
    if (!dateStr) return '---';
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy');
    } catch {
      return '---';
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Chờ duyệt':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Đã duyệt':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Từ chối':
        return 'bg-rose-50 text-rose-600 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getModalTitle = () => {
    if (isExport) return 'Xuất file';
    if (isDetail) return 'Chi tiết đơn xin nghỉ việc';
    return 'Thông tin';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-130 rounded-2xl p-6 bg-white shadow-xl border border-slate-200">
        <DialogHeader className="border-b border-slate-100 pb-4">
          <DialogTitle className="text-base font-bold text-slate-800 flex items-center justify-between">
            {getModalTitle()}
            <Badge className={`font-semibold text-xs px-3 py-1 rounded-full border shadow-none ${getStatusBadgeStyle(dataLeave.status)}`}>
              {dataLeave.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {isDetail && dataLeave && (
          <div className="py-4 space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                {dataLeave.employee?.fullName ? dataLeave.employee.fullName.charAt(0) : <User className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {dataLeave.employee?.fullName || 'Không rõ tên'}
                </h4>
                <p className="text-slate-500 font-medium">
                  Mã NV: {dataLeave.employee?.code || '---'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50/60 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Loại nghỉ phép
                </span>
                <p className="font-bold text-slate-700 text-sm">
                  {dataLeave.leaveType || '---'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/60 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Tổng thời gian
                </span>
                <p className="font-bold text-indigo-600 text-sm">
                  {dataLeave.numberOfDays} ngày
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-100 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Từ ngày
                </span>
                <p className="font-semibold text-slate-700">{formatDate(dataLeave.startDate)}</p>
              </div>
              <div className="text-slate-300 font-bold">➔</div>
              <div className="space-y-1 text-right">
                <span className="text-slate-400 font-medium flex items-center gap-1 justify-end">
                  <Calendar className="w-3.5 h-3.5" /> Đến ngày
                </span>
                <p className="font-semibold text-slate-700">{formatDate(dataLeave.endDate)}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-medium">Lý do xin nghỉ</span>
              <p className="text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-100">
                "{dataLeave.reason || 'Không có lý do chi tiết.'}"
              </p>
              {console.log("data", dataLeave.approvedBy?.fullName)}
            </div>

            {dataLeave.approvedBy && (
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    Được duyệt bởi: <strong className="text-slate-700">{dataLeave.approvedBy?.fullName || "Supper Admin"}</strong>
                  </span>
                </div>

                {dataLeave.approvedBy.role === 'ADMIN' && (
                  <span className="bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded text-[10px] uppercase border border-indigo-100">
                    Admin
                  </span>
                )}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-6">
              <Button
                onClick={() => onClose()}
                className="h-8 text-xs px-5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg"
              >
                Đóng
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}