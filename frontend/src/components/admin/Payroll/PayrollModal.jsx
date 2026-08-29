import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DollarSign, Award, MinusCircle, FileText, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Form } from 'antd';

export default function PayrollModal({ isOpen, onClose, mode, dataContract, loading, monthYear, onConfirm, onSubmit, dataAdjust }) {
  const isLock = mode === "lock";
  const isAdd = mode === "add_member"
  const isAdjust = mode === "adjust"
  const isView = mode === "view"

  const [form] = Form.useForm();
  const [selectedContractId, setSelectedContractId] = useState(null);


  const getModalTitle = () => {
    if (isLock) return 'Xác nhận chốt bảng lương tháng';
    if (isAdd) return 'Bổ sung nhân sự vào phiếu lương';
    if (isAdjust) return 'Điều chỉnh lương';
    if (isView) return 'Xem chi tiết phiếu lương';
    return 'Thông tin';
  };

  useEffect(() => {
    if (isAdjust && dataAdjust) {
      const timer = setTimeout(() => {
        form.setFieldsValue({
          allowance: dataAdjust.allowance ?? 0,
          bonus: dataAdjust.bonus ?? 0,
          bonusType: dataAdjust.bonusType ?? '',
          deductions: dataAdjust.deductions ?? 0,
          feedback: dataAdjust.feedback ?? '',
        });
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isAdjust, dataAdjust, form]);


  const handleFormSubmit = (values) => {
    const payload = {
      ...values,
      allowance: Number(values.allowance) || 0,
      bonus: Number(values.bonus) || 0,
      deductions: Number(values.deductions) || 0,
      monthYear: monthYear,
    };

    if (onSubmit) {
      const recordId = isAdjust ? dataAdjust?._id : null;
      onSubmit(payload, recordId);
    }

    if (onConfirm) {
      onConfirm(monthYear);
    }
  };

  const handleFormSubmitLockSalary = (e) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(monthYear);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>

        {isView && dataAdjust && (
          <div className="py-2 space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Nhân viên:</span>
                <span className="font-bold text-slate-900">{dataAdjust.employee?.fullName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mã hợp đồng:</span>
                <span className="font-semibold text-indigo-600">{dataAdjust.contract?.contractCode || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trạng thái:</span>
                <span className={`font-semibold ${dataAdjust.isLocked ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {dataAdjust.status || (dataAdjust.isLocked ? 'Đã khóa / Chốt' : 'Đang xử lý')}
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex justify-between py-1 border-b border-dashed border-slate-100">
                <span className="text-slate-600">Lương cơ bản (Base Salary):</span>
                <span className="font-semibold text-slate-900">{dataAdjust.baseSalary?.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-slate-100">
                <span className="text-slate-600">Phụ cấp:</span>
                <span className="font-semibold text-emerald-600">+{dataAdjust.allowance?.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-slate-100">
                <span className="text-slate-600">Thưởng ({dataAdjust.bonusType || 'Khác'}):</span>
                <span className="font-semibold text-emerald-600">+{dataAdjust.bonus?.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-slate-100">
                <span className="text-slate-600">Khấu trừ / Phạt:</span>
                <span className="font-semibold text-rose-600">-{dataAdjust.deductions?.toLocaleString()} đ</span>
              </div>

              <div className="flex justify-between items-center py-2.5 px-3 bg-indigo-50/60 rounded-xl border border-indigo-100 mt-2">
                <span className="font-bold text-indigo-900 text-sm">Tổng thực nhận (Net Salary):</span>
                <span className="font-extrabold text-indigo-600 text-base">
                  {dataAdjust.netSalary?.toLocaleString()} đ
                </span>
              </div>
            </div>

            {dataAdjust.feedback && (
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-amber-900">
                <span className="font-semibold block mb-0.5">Ghi chú của Admin:</span>
                <p className="text-slate-700 italic">{dataAdjust.feedback}</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="rounded-xl text-xs font-semibold h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {isAdjust && (
          <Form
            key={dataAdjust?._id || "adjust-form"}
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            className="pt-3 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="allowance"
                label={<Label className="text-xs font-semibold text-slate-700">Phụ cấp (VNĐ)</Label>}
              >
                <div className="relative flex items-center">
                  <Input type="number" placeholder="0" className="rounded-xl text-xs font-medium pl-8 border-slate-200 h-10" />
                  <span className="absolute left-3 text-slate-400 text-xs">₫</span>
                </div>
              </Form.Item>

              <Form.Item
                name="deductions"
                label={<Label className="text-xs font-semibold text-slate-700">Khấu trừ / Phạt (VNĐ)</Label>}
              >
                <div className="relative flex items-center">
                  <Input type="number" placeholder="0" className="rounded-xl text-xs pl-8 border-slate-200 h-10 text-rose-600 font-bold" />
                  <MinusCircle className="absolute left-2.5 w-4 h-4 text-rose-400" />
                </div>
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="bonus"
                label={<Label className="text-xs font-semibold text-slate-700">Thưởng (VNĐ)</Label>}
              >
                <div className="relative flex items-center">
                  <Input type="number" placeholder="0" className="rounded-xl text-xs pl-8 border-slate-200 h-10 text-emerald-600 font-bold" />
                  <Award className="absolute left-2.5 w-4 h-4 text-emerald-500" />
                </div>
              </Form.Item>

              <Form.Item
                name="bonusType"
                label={<Label className="text-xs font-semibold text-slate-700">Loại / Lý do thưởng</Label>}
              >
                <Input placeholder="VD: Thưởng nóng dự án..." className="rounded-xl text-xs font-medium border-slate-200 h-10" />
              </Form.Item>
            </div>

            <Form.Item
              name="feedback"
              label={<Label className="text-xs font-semibold text-slate-700">Ghi chú / Feedback của Admin</Label>}
            >
              <div className="relative">
                <Input placeholder="Nhập nhận xét hoặc lý do điều chỉnh lương..." className="rounded-xl text-xs font-medium border-slate-200 h-10 pl-8" />
                <MessageSquare className="absolute left-2.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </Form.Item>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl text-xs font-medium h-10 px-4">
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={loading} className="rounded-xl text-xs font-semibold h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </Form>
        )}

        {isAdd && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            className="pt-3 space-y-4"
          >
            <Form.Item
              name="contract"
              label={<Label className="text-xs font-semibold text-slate-700">Hợp đồng áp dụng</Label>}
              rules={[{ required: true, message: 'Vui lòng chọn hợp đồng!' }]}
            >
              <Select
                onValueChange={(val) => { setSelectedContractId(val); form.setFieldsValue({ contract: val }); }}
                value={form.getFieldValue('contract')}
              >
                <SelectTrigger className="w-full h-10 rounded-xl text-xs font-medium border-slate-200">
                  {(() => {
                    const selectedContract = dataContract?.find(c => c._id === selectedContractId);
                    if (selectedContract) {
                      return (
                        <span className="block truncate text-slate-900 font-medium">
                          {selectedContract.contractCode} - {selectedContract.employee?.fullName || 'Nhân viên'} ({selectedContract.salary?.toLocaleString()}đ)
                        </span>
                      );
                    } else {
                      return <span className="text-slate-500">-- Chọn mã hợp đồng của nhân viên --</span>;
                    }
                  })()}
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {dataContract?.map((item) => (
                    <SelectItem key={item._id} value={item._id} className="text-xs font-medium cursor-pointer">
                      <span className="font-bold text-indigo-600">{item.contractCode}</span>
                      <span className="text-slate-600"> - {item.employee?.fullName || 'Chưa rõ tên'}</span>
                      <span className="text-slate-400 text-[11px]"> ({item.salary?.toLocaleString()}đ)</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="allowance"
                label={<Label className="text-xs font-semibold text-slate-700">Phụ cấp (VNĐ)</Label>}
              >
                <Input type="number" placeholder="0" className="rounded-xl text-xs font-medium border-slate-200 h-10" />
              </Form.Item>

              <Form.Item
                name="deductions"
                label={<Label className="text-xs font-semibold text-slate-700">Khấu trừ / Phạt (VNĐ)</Label>}
              >
                <Input type="number" placeholder="0" className="rounded-xl text-xs border-slate-200 h-10 text-rose-600 font-bold" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="bonus"
                label={<Label className="text-xs font-semibold text-slate-700">Thưởng (VNĐ)</Label>}
              >
                <Input type="number" placeholder="0" className="rounded-xl text-xs border-slate-200 h-10 text-emerald-600 font-bold" />
              </Form.Item>

              <Form.Item
                name="bonusType"
                label={<Label className="text-xs font-semibold text-slate-700">Loại / Lý do thưởng</Label>}
              >
                <Input placeholder="VD: Thưởng nóng dự án..." className="rounded-xl text-xs font-medium border-slate-200 h-10" />
              </Form.Item>
            </div>

            <Form.Item
              name="feedback"
              label={<Label className="text-xs font-semibold text-slate-700">Ghi chú / Feedback của Admin</Label>}
            >
              <Input placeholder="Nhập nhận xét hoặc lý do điều chỉnh lương..." className="rounded-xl text-xs font-medium border-slate-200 h-10" />
            </Form.Item>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl text-xs font-medium h-10 px-4">
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={loading} className="rounded-xl text-xs font-semibold h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {loading ? "Đang lưu..." : "Thêm mới"}
              </Button>
            </div>
          </Form>
        )}

        {isLock && (

          <Form className="space-y-4 mt-2" onSubmit={handleFormSubmitLockSalary}>
            {isLock ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed font-medium">
                Lưu ý: Sau khi khóa bảng lương, mọi thông tin chi trả của kỳ lương <span className="font-bold">Tháng {monthYear}</span> sẽ không thể thay đổi. Bạn có chắc chắn muốn tiếp tục?
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">
                  Chọn kỳ lương xuất file
                </Label>
                <Select defaultValue="05/2024">
                  <SelectTrigger className="w-full h-10 rounded-xl text-xs font-medium border-slate-200 bg-white">
                    <SelectValue placeholder="Chọn kỳ lương" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="05/2024" className="text-xs font-medium cursor-pointer">Tháng 05/2024</SelectItem>
                    <SelectItem value="04/2024" className="text-xs font-medium cursor-pointer">Tháng 04/2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="text-xs font-semibold text-slate-600 rounded-xl h-10 px-4 border-slate-200"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                onClick={onClose}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl h-10 px-5 shadow-sm"
              >
                {isLock ? "Khóa bảng lương" : "Xuất file Excel"}
              </Button>
            </div>
          </Form>
        )}

      </DialogContent>
    </Dialog>
  );
}