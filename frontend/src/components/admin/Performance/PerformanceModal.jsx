import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  X,
  Award,
  User,
  Calendar,
  FileText,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { Form } from 'antd';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PerformanceModal({ isOpen, onClose, mode, dataListEmp, onSubmit }) {
  const isCreate = mode === "create"
  const [form] = Form.useForm();

  const getModalTitle = () => {
    if (isCreate) return 'Tạo chu kỳ mới';
    return 'Thông tin';
  };

  useEffect(() => {
    if (isOpen) {
      if (mode === 'create') {
        form.resetFields();
      }
    } else {
      form.resetFields();
    }
  }, [isOpen, mode, form]);

  if (!isOpen) return null;

  const handleFinish = (values) => {
    onSubmit(values);
  };

  const generateRealtimeQuarters = () => {
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear, currentYear + 1];
    let quarters = [];

    years.forEach((year) => {
      quarters.push(`Q1-${year}`);
      quarters.push(`Q2-${year}`);
      quarters.push(`Q3-${year}`);
      quarters.push(`Q4-${year}`);
    });

    return quarters;
  };

  const getCurrentQuarter = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const currentQ = Math.ceil(month / 3);
    return `Q${currentQ}-${year}`;
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>

        {isCreate && (
          <div className="p-6 overflow-y-auto flex-1">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              initialValues={{ quarter: getCurrentQuarter() }} 
              className="space-y-4"
            >

              <Form.Item
                name="quarter"
                label={
                  <Label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Calendar className="w-4 h-4 text-indigo-500" /> Chọn chu kỳ đánh giá mới (Quarter)
                  </Label>
                }
                rules={[{ required: true, message: 'Vui lòng chọn chu kỳ đánh giá!' }]}
              >
                <Select
                  onValueChange={(value) => form.setFieldValue('quarter', value)}
                >
                  <SelectTrigger className="w-full h-10 border-slate-200 focus:ring-indigo-500/20">
                    <SelectValue placeholder="Chọn chu kỳ..." />
                  </SelectTrigger>
                  <SelectContent>
                    {generateRealtimeQuarters().map((q) => (
                      <SelectItem key={q} value={q}>
                        {q} (Năm thực tế)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Form.Item>

              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-700 leading-relaxed font-medium">
                💡 <b>Lưu ý:</b> Khi bấm xác nhận, hệ thống sẽ tự động khởi tạo bảng đánh giá cho <b>tất cả nhân viên</b> trong toàn công ty và gửi thông báo mở kỳ đánh giá mới đến họ.
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="button"
                  onClick={() => form.submit()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200"
                >
                  Mở chu kỳ toàn công ty
                </Button>
              </div>

            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}