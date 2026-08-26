import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Headphones,
  Plus,
  Clock,
  Loader,
  CheckCircle2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supportService } from '@/services/support.service';

const CATEGORIES = [
  'Công nghệ thông tin',
  'Hành chính & Nhân sự',
  'Lương & Phúc lợi',
];
const PRIORITIES = ['Cao', 'Trung bình', 'Thấp'];

const statusStyle = {
  Mở: {
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Clock,
  },
  'Đang xử lý': {
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Loader,
  },
  'Đã giải quyết': {
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const SupportRequestPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    issue: '',
    category: 'Công nghệ thông tin',
    priority: 'Trung bình',
  });

  // Load danh sách ticket (không setLoading(true) sync trong effect)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await supportService.getMyTickets();
        if (!cancelled) {
          setTickets(res.data || []);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error('Không thể tải yêu cầu hỗ trợ', {
            description: error.customMessage || error.message,
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Refresh list sau khi tạo ticket (không bật full-page loading)
  const refreshTickets = async () => {
    try {
      const res = await supportService.getMyTickets();
      setTickets(res.data || []);
    } catch (error) {
      toast.error('Không thể tải lại danh sách', {
        description: error.customMessage || error.message,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.issue.trim()) {
      toast.error('Vui lòng nhập nội dung vấn đề!');
      return;
    }

    try {
      setSubmitting(true);
      await supportService.createTicket(form);

      toast.success('Gửi yêu cầu hỗ trợ thành công!');

      setForm({
        issue: '',
        category: 'Công nghệ thông tin',
        priority: 'Trung bình',
      });
      setShowForm(false);
      await refreshTickets();
    } catch (error) {
      toast.error('Gửi yêu cầu thất bại', {
        description: error.customMessage || error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Yêu cầu hỗ trợ</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gửi yêu cầu hỗ trợ kỹ thuật hoặc thắc mắc
          </p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="size-4" />
          {showForm ? 'Đóng form' : 'Tạo yêu cầu mới'}
        </Button>
      </div>

      {/* Form tạo ticket */}
      {showForm && (
        <form
          onSubmit={onSubmit}
          className="rounded-xl border bg-white p-6 shadow-sm space-y-4"
        >
          <h2 className="font-semibold text-lg">Tạo yêu cầu hỗ trợ</h2>

          <div className="space-y-1.5">
            <Label>Danh mục</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, category: c }))}
                  className={`h-10 rounded-lg border text-sm font-medium px-2 ${
                    form.category === c
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Mức ưu tiên</Label>
            <div className="grid grid-cols-3 gap-2 max-w-md">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                  className={`h-9 rounded-lg border text-sm font-medium ${
                    form.priority === p
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="issue">Mô tả vấn đề</Label>
            <textarea
              id="issue"
              name="issue"
              value={form.issue}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, issue: e.target.value }))
              }
              rows={4}
              placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
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
                'Gửi yêu cầu'
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Danh sách ticket */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b bg-muted/30">
          <h2 className="font-semibold text-sm">
            Yêu cầu của tôi ({tickets.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center">
            <Headphones className="mx-auto size-12 text-muted-foreground/40" />
            <p className="mt-4 text-muted-foreground">
              Bạn chưa có yêu cầu hỗ trợ nào.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {tickets.map((ticket) => {
              const style = statusStyle[ticket.status] || statusStyle['Mở'];
              const Icon = style.icon;

              return (
                <div
                  key={ticket._id}
                  className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-muted/20"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm">
                        {ticket.ticketCode}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${style.className}`}
                      >
                        <Icon className="size-3" />
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90">{ticket.issue}</p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.category}
                      <span className="mx-1.5">·</span>
                      Ưu tiên: {ticket.priority}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground shrink-0">
                    {formatDate(ticket.createdAt)}
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

export default SupportRequestPage;