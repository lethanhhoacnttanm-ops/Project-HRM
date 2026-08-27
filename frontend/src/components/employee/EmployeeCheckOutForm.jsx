import React, { useState } from 'react';
import { Form, TimePicker, message } from 'antd';
import { Button } from "@/components/ui/button";
import { Calendar, LogOut } from "lucide-react";
import { attendanceService } from '@/services/attendance.service';

export default function EmployeeCheckOutForm({ activeRecord, onSuccess }) {
  const [form] = Form.useForm();
  const [currentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (values) => {
    try {
      setLoading(true);

      const checkOutTimeStr = values.checkOutTime 
        ? values.checkOutTime.format('h:mm A') 
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

      const payload = {
        checkOut: checkOutTimeStr,
      };

      const response = await attendanceService.checkOut(payload);

      if (response && response.success) {
        message.success("Check-out thành công! Hẹn gặp lại bạn.");
        form.resetFields();
        if (onSuccess) onSuccess(); 
      }
    } catch (error) {
      console.error("Lỗi Check-out:", error);
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi Check-out!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <LogOut className="w-5 h-5 text-rose-600" />
          Kết thúc ca làm việc (Check-out)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Bạn đã vào ca lúc <span className="font-bold text-indigo-600">{activeRecord?.checkIn}</span>. Nhấn xác nhận khi tan ca.
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={handleCheckout} className="space-y-4">
        
        <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-rose-500" /> Ngày hôm nay:
          </span>
          <span className="text-xs font-bold text-slate-800">
            {currentDate.toLocaleDateString('vi-VN')}
          </span>
        </div>

        <Form.Item 
          name="checkOutTime" 
          label={<span className="font-semibold text-slate-700 text-xs">Thời gian Check-out (Tùy chọn)</span>}
        >
          <TimePicker use12Hours format="h:mm A" className="w-full rounded-xl h-10" />
        </Form.Item>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold h-10 text-xs shadow-sm transition-all"
        >
          {loading ? "Đang xử lý..." : "Xác nhận Check-out ngay"}
        </Button>

      </Form>
    </div>
  );
}