import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Star,
  User,
  CheckCircle2,
  Clock,
  Hourglass,
} from 'lucide-react';

import { performanceService } from '@/services/performanceService';

const statusStyle = {
  'Hoàn thành': {
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
  'Đang thực hiện': {
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Clock,
  },
  'Chờ duyệt': {
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Hourglass,
  },
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('vi-VN');
};

const ScoreStars = ({ score }) => {
  const full = Math.floor(score);
  const stars = Array.from({ length: 5 }, (_, i) => i < full);

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((on, i) => (
        <Star
          key={i}
          className={`size-4 ${
            on ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-semibold">{score.toFixed(1)}/5</span>
    </div>
  );
};

const EvaluationPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await performanceService.getMyEvaluations();
        if (!cancelled) {
          const list = res.data || [];
          setItems(list);
          setSelected(list[0] || null);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error('Không thể tải đánh giá hiệu suất', {
            description: error.customMessage || error.message,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Đánh giá hiệu suất
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem chi tiết các đánh giá hiệu suất cá nhân
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
          <Star className="mx-auto size-12 text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">
            Bạn chưa có đánh giá hiệu suất nào.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Danh sách */}
          <div className="space-y-2 lg:col-span-1">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
              Theo kỳ ({items.length})
            </h2>
            {items.map((item) => {
              const style =
                statusStyle[item.status] || statusStyle['Đang thực hiện'];
              const isActive = selected?._id === item._id;

              return (
                <button
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-white hover:bg-muted/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{item.quarter}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Điểm: {item.score}/5
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${style.className}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chi tiết */}
          {selected && (
            <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{selected.quarter}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Cập nhật: {formatDate(selected.updatedAt)}
                  </p>
                </div>
                {(() => {
                  const style =
                    statusStyle[selected.status] ||
                    statusStyle['Đang thực hiện'];
                  const Icon = style.icon;
                  return (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${style.className}`}
                    >
                      <Icon className="size-3.5" />
                      {selected.status}
                    </span>
                  );
                })()}
              </div>

              {/* Điểm */}
              <div className="rounded-xl bg-amber-50/80 border border-amber-100 p-5">
                <p className="text-sm text-muted-foreground mb-2">
                  Điểm đánh giá
                </p>
                <ScoreStars score={Number(selected.score) || 0} />
              </div>

              {/* Người đánh giá */}
              <div className="rounded-lg border p-4 flex items-start gap-3">
                <div className="rounded-lg bg-slate-100 p-2">
                  <User className="size-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Người đánh giá</p>
                  <p className="font-semibold text-sm">
                    {selected.evaluator?.fullName || '—'}
                  </p>
                  {selected.evaluator?.email && (
                    <p className="text-xs text-muted-foreground">
                      {selected.evaluator.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Feedback */}
              <div className="rounded-lg border p-4">
                <p className="text-xs text-muted-foreground mb-2">Nhận xét</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.feedback?.trim()
                    ? selected.feedback
                    : 'Chưa có nhận xét.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluationPage;