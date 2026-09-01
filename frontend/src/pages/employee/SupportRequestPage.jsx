import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Form, Input, Select, Button as AntButton } from 'antd';
import { Loader2, PlusCircle, LifeBuoy, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

import {supportService} from '@/services/support.service';

const statusConfig = {
  'Mở': { className: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  'Đang xử lý': { className: 'bg-blue-50 text-blue-700 border-blue-200', icon: Loader2 },
  'Đã giải quyết': { className: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  'Đóng': { className: 'bg-slate-100 text-slate-700 border-slate-200', icon: AlertCircle },
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

const SupportPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const fetchMyTickets = async () => {
    try {
      setLoading(true);
      const res = await supportService.getMyTickets();
      setTickets(res.data || []);
    } catch (error) {
      toast.error('Không thể tải lịch sử hỗ trợ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTickets();
  }, []);

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      await supportService.create(values);
      toast.success('Đã gửi yêu cầu hỗ trợ thành công!');
      form.resetFields();
      fetchMyTickets();
    } catch (error) {
      toast.error('Gửi yêu cầu thất bại', { description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Yêu cầu hỗ trợ kỹ thuật</h1>
        <p className="text-sm text-slate-500 mt-1">Gửi thắc mắc hoặc sự cố gặp phải để được bộ phận IT và Nhân sự hỗ trợ.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
            <PlusCircle className="size-4 text-indigo-600" /> Tạo phiếu hỗ trợ mới
          </h2>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              category: 'Công nghệ thông tin',
              priority: 'Trung bình',
            }}
            className="space-y-3"
          >
            <Form.Item
              name="title"
              label={<span className="text-xs font-semibold text-slate-700">Tiêu đề vấn đề</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
              className="mb-3"
            >
              <Input placeholder="VD: Lỗi không chấm công được..." className="rounded-xl text-xs py-2" />
            </Form.Item>

            <Form.Item
              name="category"
              label={<span className="text-xs font-semibold text-slate-700">Danh mục</span>}
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              className="mb-3"
            >
              <Select
                className="w-full"
                options={[
                  { value: 'Công nghệ thông tin', label: 'Công nghệ thông tin' },
                  { value: 'Hành chính & Nhân sự', label: 'Hành chính & Nhân sự' },
                  { value: 'Lương & Phúc lợi', label: 'Lương & Phúc lợi' },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="priority"
              label={<span className="text-xs font-semibold text-slate-700">Mức độ ưu tiên</span>}
              rules={[{ required: true, message: 'Vui lòng chọn mức độ!' }]}
              className="mb-3"
            >
              <Select
                className="w-full"
                options={[
                  { value: 'Thấp', label: 'Thấp' },
                  { value: 'Trung bình', label: 'Trung bình' },
                  { value: 'Cao', label: 'Cao' },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="text-xs font-semibold text-slate-700">Nội dung chi tiết</span>}
              rules={[{ required: true, message: 'Vui lòng mô tả chi tiết vấn đề!' }]}
              className="mb-4"
            >
              <Input.TextArea rows={4} placeholder="Mô tả cụ thể lỗi hoặc thắc mắc của bạn..." className="rounded-xl text-xs" />
            </Form.Item>

            <AntButton
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 h-9 rounded-xl text-xs font-bold shadow-none"
            >
              Gửi yêu cầu
            </AntButton>
          </Form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <LifeBuoy className="size-4 text-indigo-600" /> Lịch sử yêu cầu hỗ trợ của bạn
          </h2>

          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-indigo-600" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
              Bạn chưa gửi yêu cầu hỗ trợ nào.
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => {
                const cfg = statusConfig[ticket.status] || statusConfig['Mở'];
                const StatusIcon = cfg.icon;

                return (
                  <div key={ticket._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-indigo-600">{ticket.ticketCode}</span>
                          <span className="text-xs text-slate-300">·</span>
                          <span className="text-xs font-bold text-slate-900">{ticket.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Danh mục: <strong className="text-slate-600">{ticket.category}</strong> | Gửi lúc: {formatDate(ticket.createdAt)}
                        </p>
                      </div>

                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${cfg.className}`}>
                        <StatusIcon className="size-3" /> {ticket.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap">
                      {ticket.description}
                    </div>

                    {ticket.adminResponse && (
                      <div className="text-xs bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 space-y-1">
                        <p className="font-bold text-indigo-900">Phản hồi từ Admin ({ticket.resolvedBy?.fullName || 'Hỗ trợ'}):</p>
                        <p className="text-indigo-800">{ticket.adminResponse}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;