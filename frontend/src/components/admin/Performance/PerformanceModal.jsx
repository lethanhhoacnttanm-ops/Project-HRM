import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from 'antd';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";

export default function PerformanceModal({ isOpen, onClose, mode, dataListEmp, onSubmit, data }) {
  const isCreate = mode === "create";
  const isEdit = mode === "edit";
  const isApproved = mode === "approved";
  const isDetails = mode === "details";
  const isReadOnly = isDetails;

  const [form] = Form.useForm();

  const getModalTitle = () => {
    if (isCreate) return 'Tạo chu kỳ mới';
    if (isDetails) return 'Chi tiết phiếu đánh giá';
    if (isEdit) return 'Chỉnh sửa lại phiếu đánh giá';
    if (isApproved) return 'Phê duyệt & Khóa phiếu đánh giá';
    return 'Thông tin';
  };

  useEffect(() => {
    if (isOpen) {
      if (isCreate) {
        form.resetFields();
      } else if (data) {
        form.setFieldsValue({
          employee: data.employee?._id || data.employee,
          quarter: data.quarter,
          outsourcingScore: data.selfAssessment?.outsourcingScore || 0,
          trainingScore: data.selfAssessment?.trainingScore || 0,
          feedback: data.selfAssessment?.feedback || "",
        });
      }
    } else {
      form.resetFields();
    }
  }, [isOpen, data, mode, form]);

  if (!isOpen) return null;

  const getCurrentQuarter = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const currentQ = Math.ceil(month / 3);
    return `Q${currentQ}-${year}`;
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

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6">
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
                  onClick={async () => {
                    try {
                      const values = await form.validateFields();
                      handleFinish(values);
                    } catch (errorInfo) {
                      console.log('Validate Failed:', errorInfo);
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200"
                >
                  Mở chu kỳ toàn công ty
                </Button>
              </div>

            </Form>
          </div>
        )}

        {(isDetails || isEdit) && (
          <div className="py-4 overflow-y-auto flex-1">
            <Form
              form={form}
              layout="vertical"
              onFinish={(values) => {
                onSubmit(data._id, values);
              }}
              className="space-y-4"
            >
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1">
                <p className="text-slate-500 font-medium">Nhân viên được đánh giá:</p>
                <p className="font-bold text-slate-800 text-sm">
                  {data?.employee?.fullName || "N/A"} <span className="text-slate-400 font-normal">({data?.employee?.code || "EMP"})</span>
                </p>
                <p className="text-slate-500 font-medium pt-1">Kỳ đánh giá: <span className="font-semibold text-slate-700">{data?.quarter}</span></p>
              </div>

              <Form.Item
                name="outsourcingScore"
                label={<span className="text-sm font-medium text-slate-700">Điểm Outsourcing (0 - 100)</span>}
                rules={[{ required: true, message: 'Vui lòng nhập điểm outsourcing!' }]}
              >
                <Input
                  type="number"
                  min={0}
                  max={100}
                  disabled={isReadOnly}
                  className="w-full h-10 border-slate-200 rounded-xl"
                  placeholder="Nhập điểm..."
                />
              </Form.Item>

              <Form.Item
                name="trainingScore"
                label={<span className="text-sm font-medium text-slate-700">Điểm Training (0 - 100)</span>}
                rules={[{ required: true, message: 'Vui lòng nhập điểm training!' }]}
              >
                <Input
                  type="number"
                  min={0}
                  max={100}
                  disabled={isReadOnly}
                  className="w-full h-10 border-slate-200 rounded-xl"
                  placeholder="Nhập điểm..."
                />
              </Form.Item>

              <Form.Item
                name="feedback"
                label={<span className="text-sm font-medium text-slate-700">Nhận xét / Phản hồi</span>}
              >
                <Textarea
                  rows={3}
                  disabled={isReadOnly}
                  placeholder="Nhập đánh giá chi tiết..."
                  className="rounded-xl border-slate-200 resize-none p-3"
                />
              </Form.Item>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  {isDetails ? 'Đóng' : 'Hủy bỏ'}
                </Button>

                {isEdit && (
                  <Button
                    type="button"
                    onClick={() => form.submit()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 rounded-xl"
                  >
                    Lưu thay đổi
                  </Button>
                )}
              </div>
            </Form>
          </div>
        )}

        {isApproved && (
          <div className="py-4 overflow-y-auto flex-1 space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <span> Xác nhận phê duyệt phiếu đánh giá</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Bạn đang thực hiện chốt điểm chính thức cho nhân viên <strong className="text-emerald-900">{data?.employee?.fullName}</strong> trong kỳ <strong className="text-emerald-900">{data?.quarter}</strong>. Sau khi duyệt, điểm số sẽ được ghi nhận vào hệ thống tổng kết.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Điểm Outsourcing:</span>
                <span className="font-bold text-slate-800 text-sm">{data?.outsourcingScore || 0} điểm</span>
              </div>
              <div>
                <span className="text-slate-500 block">Điểm Training:</span>
                <span className="font-bold text-slate-800 text-sm">{data?.trainingScore || 0} điểm</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-200">
                <span className="text-slate-500 block">Nhận xét hiện tại:</span>
                <p className="font-medium text-slate-700 italic mt-0.5">"{data?.feedback || 'Không có nhận xét'}"</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy bỏ
              </Button>
              <Button
                type="button"
                onClick={() => onSubmit(data)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200 rounded-xl font-semibold"
              >
                Xác nhận chốt & Duyệt điểm
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}