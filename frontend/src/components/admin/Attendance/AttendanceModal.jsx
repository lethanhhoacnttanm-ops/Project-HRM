import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2 } from 'lucide-react'
import { Input } from "@/components/ui/input";
import { generateShiftCode } from '@/utils/shiftUtils';
import { Form, TimePicker } from 'antd';

export default function AttendanceModal({ isOpen, onClose, mode, onSubmit, data }) {
  const [form] = Form.useForm();
  const isExport = mode === "export";
  const isCreate = mode === "create_shift"
  const isDetails = mode === "details"

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getModalTitle = () => {
    if (isCreate) return 'Thêm ca làm việc mới';
    if (isExport) return 'Tải về file báo cáo';
    if (isDetails) return 'Chi tiết phiếu chấm công'
    return 'Thông tin';
  };

  const handleFinish = (values) => {
    const shiftName = values.name;

    const shiftCode = generateShiftCode(shiftName);

    const checkInTime = values.checkInTime.format('h:mm A');
    const checkOutTime = values.checkOutTime.format('h:mm A');

    const breakTimeStr = values.breakTime || '0 phút';

    const payload = {
      name: shiftName,
      code: shiftCode,
      checkInTime,
      checkOutTime,
      breakTime: breakTimeStr,
    };

    onSubmit(payload);

    form.resetFields();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-2xl rounded-2xl p-6 dark:bg-[#1f1f1f] dark:border-gray-700">
        <DialogHeader className="border-b pb-4 mb-4 border-gray-100 dark:border-gray-700">
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {getModalTitle()}
          </DialogDescription>
        </DialogHeader>

        {isCreate && (
          <Form form={form} initialValues={{ name: "", timeRange: null, breakTime: "" }} layout="vertical" onFinish={handleFinish} className="space-y-4 pt-2">

            <Form.Item
              name="name"
              label={<span className="font-semibold text-slate-700">Tên ca làm việc</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tên ca làm việc!' }]}
            >
              <Input placeholder="Ví dụ: Ca sáng hành chính, Ca tech support..." className="rounded-xl" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="checkInTime"
                label={<span className="font-semibold text-slate-700">Giờ bắt đầu (Check-in)</span>}
                rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu!' }]}
              >
                <TimePicker use12Hours format="h:mm A" className="w-full rounded-xl" />
              </Form.Item>

              <Form.Item
                name="checkOutTime"
                label={<span className="font-semibold text-slate-700">Giờ kết thúc (Check-out)</span>}
                rules={[{ required: true, message: 'Vui lòng chọn giờ kết thúc!' }]}
              >
                <TimePicker use12Hours format="h:mm A" className="w-full rounded-xl" />
              </Form.Item>
            </div>

            <Form.Item
              name="breakTime"
              label={<span className="font-semibold text-slate-700">Thời gian nghỉ (Breaktime)</span>}
            >
              <Input placeholder="Ví dụ: 60 phút..." className="rounded-xl" />
            </Form.Item>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                Hủy
              </Button>
              <Button type="submit" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                Xác nhận tạo ca
              </Button>
            </div>

          </Form>
        )}

        {isExport && (
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
          </>
        )}

        {isDetails && data ? (
          <div className="space-y-4 pt-2 text-xs">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px] font-medium">Ngày chấm công</span>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mt-0.5">
                  {formatDate ? formatDate(data.date) : new Date(data.date).toLocaleDateString('vi-VN')}
                </h3>
              </div>
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${data.status === 'Đúng giờ'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900'
                  : data.status === 'Đi muộn'
                    ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900'
                    : 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900'
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${data.status === 'Đúng giờ' ? 'bg-emerald-500' : data.status === 'Đi muộn' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></span>
                  {data.status || 'Chưa cập nhật'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-center">
                <span className="text-slate-400 dark:text-slate-500 block mb-1">Giờ vào</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {data.checkIn || '--:--'}
                </span>
              </div>

              <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-center">
                <span className="text-slate-400 dark:text-slate-500 block mb-1">Giờ ra</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {data.checkOut || '--:--'}
                </span>
              </div>

              <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-center">
                <span className="text-slate-400 dark:text-slate-500 block mb-1">Tổng giờ</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {data.totalHours || '0h 00m'}
                </span>
              </div>
            </div>

            <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 space-y-2.5">
              <div className="flex justify-between items-center py-1 border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Trạng thái đi muộn:</span>
                <span className={`font-semibold ${data.isCheckInLate ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {data.isCheckInLate ? 'Có đi muộn' : 'Không (Đúng giờ)'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 dark:text-slate-400">Yêu cầu chỉnh sửa (Edit Request):</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {data.editRequest?.requestStatus === "None" ? 'Không có' : 'Đã có yêu cầu cập nhật'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl h-10 cursor-pointer"
              >
                Đóng
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog >
  );
}