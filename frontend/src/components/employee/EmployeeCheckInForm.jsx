import React, { useState, useEffect, useCallback } from 'react';
import { Form, TimePicker, message } from 'antd';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Clock, Calendar } from "lucide-react";
import shiftService from '@/services/shift.service';
import { attendanceService } from '@/services/attendance.service';

export default function EmployeeCheckInForm({ onSuccess }) {
  const [form] = Form.useForm();
  const [shifts, setShifts] = useState([]);
  const [currentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [selectedShiftValue, setSelectedShiftValue] = useState("");

  const pageSize = 8
  const [pageNumber, setPageNumber] = useState(1)
  const [pagination, setPaginaiton] = useState({ totalShifts: 0, totalPage: 1 })

  const fetchShifts = useCallback(async () => {
    try {
      const res = await shiftService.getAllShift(pageNumber, pageSize);
      if (res && res.success) {
        setShifts(res.dataShift || []);
        setPaginaiton(res.pagination)
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách ca:", error);
    }
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchShifts(pageNumber)
  }, [pageNumber])

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      const checkInTimeStr = values.checkInTime
        ? values.checkInTime.format('h:mm A')
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

      const payload = {
        shift: values.shiftId,
        date: currentDate,
        checkIn: checkInTimeStr,
        checkOut: '--:--',
        totalHours: 'Đang làm',
        status: 'Đúng giờ',
        isCheckInLate: false,
      };

      const response = await attendanceService.checkInAttendance(payload);

      if (response && response.success) {
        message.success("Chấm công vào ca thành công!");
        form.resetFields();
        setSelectedShiftValue("");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Lỗi chấm công:", error);
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi chấm công!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          Chấm công trực tuyến (Check-in)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Vui lòng chọn ca làm việc và xác nhận thời gian vào ca của bạn.
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-4">

        <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" /> Ngày chấm công:
          </span>
          <span className="text-xs font-bold text-slate-800">
            {currentDate.toLocaleDateString('vi-VN')}
          </span>
        </div>

        <Form.Item
          name="shiftId"
          label={<span className="font-semibold text-slate-700 text-xs">Chọn ca làm việc (Bắt buộc)</span>}
          rules={[{ required: true, message: 'Vui lòng chọn ca làm việc trước khi chấm công!' }]}
        >
          <Select
            value={selectedShiftValue}
            onValueChange={(value) => {
              setSelectedShiftValue(value);
              form.setFieldValue('shiftId', value);
            }}
          >
            <SelectTrigger className="w-full rounded-xl h-10 text-xs font-medium border-slate-200">
              {(() => {
                const selectedId = form.getFieldValue('shiftId');

                const selectedShift = shifts.find(s => s._id === selectedId);

                if (selectedShift) {
                  return (
                    <span className="block truncate text-slate-900">
                      {selectedShift.name} ({selectedShift.checkInTime} - {selectedShift.checkOutTime})
                    </span>
                  );
                } else {
                  return (
                    <span className="text-slate-500">
                      -- Chọn ca làm việc của bạn --
                    </span>
                  );
                }
              })()}
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {shifts.map((shift) => (
                <SelectItem key={shift._id} value={shift._id} className="text-xs font-medium cursor-pointer">
                  {shift.name} ({shift.checkInTime} - {shift.checkOutTime})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Form.Item>

        <Form.Item
          name="checkInTime"
          label={<span className="font-semibold text-slate-700 text-xs">Thời gian Check-in (Tùy chọn)</span>}
        >
          <TimePicker use12Hours format="h:mm A" className="w-full rounded-xl h-10" />
        </Form.Item>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-10 text-xs shadow-sm transition-all"
        >
          {loading ? "Đang xử lý..." : "Xác nhận Check-in ngay"}
        </Button>

      </Form>
    </div>
  );
}