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

export default function AttendanceModal({ isOpen, onClose, mode, onSubmit }) {
  const [form] = Form.useForm();
  const isExport = mode === "export";
  const isCreate = mode === "create_shift"

  const getModalTitle = () => {
    if (isCreate) return 'Thêm ca làm việc mới';
    if (isExport) return 'Tải về file báo cáo';
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
      </DialogContent>
    </Dialog >
  );
}