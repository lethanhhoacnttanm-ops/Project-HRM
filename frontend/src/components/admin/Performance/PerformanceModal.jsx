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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>

        {isCreate && dataListEmp && (
          <div className="p-6 overflow-y-auto flex-1">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              initialValues={{ quarter: 'Q3-2026', outsourcingScore: 5, trainingScore: 5 }}
              className="space-y-4"
            >

              <Form.Item
                name="quarter"
                label={
                  <Label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Calendar className="w-4 h-4 text-indigo-500" /> Chu kỳ đánh giá (Quarter)
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
                    <SelectItem value="Q1-2026">Q1 - 2026</SelectItem>
                    <SelectItem value="Q2-2026">Q2 - 2026</SelectItem>
                    <SelectItem value="Q3-2026">Q3 - 2026</SelectItem>
                    <SelectItem value="Q4-2026">Q4 - 2026</SelectItem>
                  </SelectContent>
                </Select>
              </Form.Item>

              <Form.Item
                name="employee"
                label={
                  <Label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <User className="w-4 h-4 text-indigo-500" /> Nhân viên được đánh giá
                  </Label>
                }
                rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
              >
                <Select
                  onValueChange={(value) => form.setFieldValue('employee', value)}
                >
                  <SelectTrigger className="w-full h-10 border-slate-200 focus:ring-indigo-500/20">
                    <SelectValue placeholder="-- Chọn nhân viên cần đánh giá --" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataListEmp.map((emp) => (
                      <SelectItem key={emp._id} value={emp._id}>
                        {emp.fullName} ({emp.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Form.Item>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <Form.Item
                  name="outsourcingScore"
                  label={
                    <Label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <Briefcase className="w-4 h-4 text-indigo-500" /> Điểm Outsource (0 - 5)
                    </Label>
                  }
                  rules={[
                    { required: true, message: 'Nhập điểm outsource!' },
                    { type: 'number', min: 0, max: 5, message: 'Điểm từ 0 đến 5!' }
                  ]}
                >
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="VD: 4.5"
                    className="h-10 border-slate-200 focus-visible:ring-indigo-500/20"
                    onChange={(e) => {
                      const val = e.target.value;
                      form.setFieldValue('outsourcingScore', val === '' ? undefined : parseFloat(val));
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="trainingScore"
                  label={
                    <Label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <BookOpen className="w-4 h-4 text-indigo-500" /> Điểm Đào tạo (0 - 5)
                    </Label>
                  }
                  rules={[
                    { required: true, message: 'Nhập điểm đào tạo!' },
                    { type: 'number', min: 0, max: 5, message: 'Điểm từ 0 đến 5!' }
                  ]}
                >
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="VD: 4.0"
                    className="h-10 border-slate-200 focus-visible:ring-indigo-500/20"
                    onChange={(e) => {
                      const val = e.target.value;
                      form.setFieldValue('trainingScore', val === '' ? undefined : parseFloat(val));
                    }}
                  />
                </Form.Item>

              </div>

              <Form.Item
                name="feedback"
                label={
                  <Label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <FileText className="w-4 h-4 text-indigo-500" /> Nhận xét & Đánh giá (Feedback)
                  </Label>
                }
              >
                <Textarea
                  rows={3}
                  placeholder="Nhập nhận xét chi tiết về hiệu suất làm việc của nhân sự trong quý..."
                  className="border-slate-200 resize-none focus-visible:ring-indigo-500/20"
                  onChange={(e) => form.setFieldValue('feedback', e.target.value)}
                />
              </Form.Item>

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
                  Lưu đánh giá
                </Button>
              </div>

            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}