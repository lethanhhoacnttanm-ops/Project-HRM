import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  CalendarCheck,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { leaveService } from '@/services/leaveService.js';

const LEAVE_TYPES = ['Nghỉ phép năm', 'Nghỉ ốm', 'Nghỉ việc riêng'];

const statusStyle = {
  'Chờ duyệt': {
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Clock,
  },
  'Đã duyệt': {
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
  'Từ chối': {
    className: 'bg-red-50 text-red-600 border-red-200',
    icon: XCircle,
  },
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('vi-VN');
};

const calcDays = (start, end) => {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  if (e < s) return 0;
  return Math.floor((e - s) / (1000 * 60 * 60 * 24)) + 1;
};

const LeaveRequestPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    leaveType: 'Nghỉ phép năm',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await leaveService.getMyLeaves();
      setLeaves(res.data || []);
    } catch (error) {
      toast.error('Không thể tải đơn nghỉ phép', {
        description: error.customMessage || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.startDate || !form.endDate) {
      toast.error('Vui lòng chọn ngày bắt đầu và kết thúc!');
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      toast.error('Ngày kết thúc phải sau ngày bắt đầu!');
      return;
    }

    try {
      setSubmitting(true);
      await leaveService.createLeave(form);
      toast.success('Nộp đơn nghỉ phép thành công!');
      setForm({
        leaveType: 'Nghỉ phép năm',
        startDate: '',
        endDate: '',
        reason: '',
      });
      setShowForm(false);
      fetchLeaves();
    } catch (error) {
      toast.error('Nộp đơn thất bại', {
        description: error.customMessage || error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const previewDays = calcDays(form.startDate, form.endDate);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nghỉ phép</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gửi yêu cầu nghỉ phép và theo dõi trạng thái phê duyệt
          </p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="size-4" />
          {showForm ? 'Đóng form' : 'Nộp đơn mới'}
        </Button>
      </div>

      {/* Form nộp đơn */}
      {showForm && (
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold">Tạo đơn nghỉ phép</h2>

          <div className="space-y-1.5">
            <Label>Loại nghỉ</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {LEAVE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, leaveType: type }))}
                  className={`h-10 rounded-lg border text-sm font-medium transition-all ${
                    form.leaveType === type
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="startDate">Từ ngày</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endDate">Đến ngày</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {previewDays > 0 && (
            <p className="text-sm text-muted-foreground">
              Số ngày nghỉ:{' '}
              <span className="font-semibold text-foreground">
                {previewDays} ngày
              </span>
            </p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="reason">Lý do</Label>
            <textarea
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              placeholder="Nhập lý do nghỉ phép..."
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                'Gửi đơn'
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Danh sách đơn */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-muted/30 px-4 py-3">
          <h2 className="text-sm font-semibold">
            Đơn của tôi ({leaves.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : leaves.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarCheck className="mx-auto size-12 text-muted-foreground/40" />
            <p className="mt-4 text-muted-foreground">
              Bạn chưa có đơn nghỉ phép nào.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {leaves.map((leave) => {
              const style =
                statusStyle[leave.status] || statusStyle['Chờ duyệt'];
              const Icon = style.icon;
              return (
                <div
                  key={leave._id}
                  className="flex flex-col justify-between gap-3 p-4 hover:bg-muted/20 sm:flex-row sm:items-center"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{leave.leaveType}</p>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${style.className}`}
                      >
                        <Icon className="size-3" />
                        {leave.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(leave.startDate)} → {formatDate(leave.endDate)}
                      <span className="mx-1.5">·</span>
                      {leave.numberOfDays} ngày
                    </p>
                    {leave.reason && (
                      <p className="text-xs text-muted-foreground">
                        Lý do: {leave.reason}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 text-xs text-muted-foreground">
                    Nộp: {formatDate(leave.createdAt)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestPage;