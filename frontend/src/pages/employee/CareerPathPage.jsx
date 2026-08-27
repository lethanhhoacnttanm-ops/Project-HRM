import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  TrendingUp,
  ArrowRight,
  Star,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Hourglass,
} from 'lucide-react';

import { promotionService } from '@/services/promotion.service.js';

const statusConfig = {
  PENDING_REVIEW: {
    label: 'Chờ duyệt',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Clock,
  },
  APPROVED_PENDING_EFFECTIVE: {
    label: 'Đã duyệt – chờ hiệu lực',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Hourglass,
  },
  WAITING: {
    label: 'Đang chờ',
    className: 'bg-slate-50 text-slate-600 border-slate-200',
    icon: Clock,
  },
  COMPLETED: {
    label: 'Hoàn thành',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
  REJECTED: {
    label: 'Từ chối',
    className: 'bg-red-50 text-red-600 border-red-200',
    icon: XCircle,
  },
};

const typeLabel = {
  Vertical: 'Thăng tiến dọc',
  Lateral: 'Chuyển ngang',
  'Merit-based': 'Theo thành tích',
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('vi-VN');
};

const CareerPathPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await promotionService.getMyPromotions();
        if (!cancelled) {
          const list = res.data || [];
          setItems(list);
          setSelected(list[0] || null);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error('Không thể tải thông tin thăng tiến', {
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
          Thăng tiến sự nghiệp
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem lộ trình thăng tiến và các đề xuất liên quan đến bạn
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
          <TrendingUp className="mx-auto size-12 text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">
            Bạn chưa có đề xuất thăng tiến nào trong hệ thống.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Danh sách */}
          <div className="space-y-2 lg:col-span-1">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
              Đề xuất ({items.length})
            </h2>
            {items.map((item) => {
              const cfg =
                statusConfig[item.status] || statusConfig.PENDING_REVIEW;
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
                      <p className="font-semibold text-sm">
                        {item.currentLevel} → {item.proposedLevel}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.currentPosition}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${cfg.className}`}
                    >
                      {cfg.label}
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
                  <h2 className="text-lg font-bold">
                    {selected.currentPosition}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {selected.currentDepartment}
                  </p>
                </div>
                {(() => {
                  const cfg =
                    statusConfig[selected.status] ||
                    statusConfig.PENDING_REVIEW;
                  const Icon = cfg.icon;
                  return (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${cfg.className}`}
                    >
                      <Icon className="size-3.5" />
                      {cfg.label}
                    </span>
                  );
                })()}
              </div>

              {/* Level path */}
              <div className="flex items-center justify-center gap-3 rounded-xl bg-slate-50 border p-5">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Cấp hiện tại
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {selected.currentLevel}
                  </p>
                </div>
                <ArrowRight className="size-5 text-primary shrink-0" />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Cấp đề xuất
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {selected.proposedLevel}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Star className="size-3.5" />
                    Điểm hiệu suất
                  </div>
                  <p className="font-semibold">
                    {selected.performanceRating ?? '—'}/5
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <TrendingUp className="size-3.5" />
                    Loại thăng tiến
                  </div>
                  <p className="font-semibold">
                    {typeLabel[selected.promotionType] ||
                      selected.promotionType}
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Clock className="size-3.5" />
                    Thời gian giữ grade (năm)
                  </div>
                  <p className="font-semibold">
                    {selected.gradetenure ?? '—'}
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Calendar className="size-3.5" />
                    Ngày hiệu lực
                  </div>
                  <p className="font-semibold">
                    {formatDate(selected.effectiveDate)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                <p>
                  Đề xuất được tạo bởi bộ phận Nhân sự. Trạng thái cập nhật khi
                  Admin phê duyệt. Nếu có thắc mắc, hãy gửi yêu cầu hỗ trợ.
                </p>
                <p className="text-xs mt-2">
                  Tạo lúc: {formatDate(selected.createdAt)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CareerPathPage;