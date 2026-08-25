import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Gift,
  Shield,
  Wallet,
  Heart,
  Users,
} from 'lucide-react';

import { benefitService } from '@/services/benefitService';

const TYPE_FILTERS = ['Tất cả', 'Bảo hiểm', 'Phụ cấp', 'Đãi ngộ'];

const typeConfig = {
  'Bảo hiểm': {
    icon: Shield,
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  'Phụ cấp': {
    icon: Wallet,
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'Đãi ngộ': {
    icon: Heart,
    className: 'bg-pink-50 text-pink-700 border-pink-200',
  },
};

const MyBenefitsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tất cả');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const params = filter === 'Tất cả' ? {} : { type: filter };
        const res = await benefitService.getMyBenefits(params);

        if (!cancelled) {
          const list = res.data || [];
          setItems(list);
          setSelected(list[0] || null);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error('Không thể tải phúc lợi', {
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
  }, [filter]);

  const handleFilterChange = (type) => {
    if (type === filter) return;
    setLoading(true);
    setFilter(type);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Phúc lợi</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem chi tiết các chính sách phúc lợi và quyền lợi cá nhân
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {TYPE_FILTERS.map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              filter === type
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-input text-muted-foreground hover:bg-muted'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
          <Gift className="mx-auto size-12 text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">
            Hiện chưa có chương trình phúc lợi nào đang mở.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Danh sách */}
          <div className="space-y-2 lg:col-span-1">
            {items.map((item) => {
              const cfg = typeConfig[item.type] || typeConfig['Đãi ngộ'];
              const Icon = cfg.icon;
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
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg border p-2 ${cfg.className}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.type}
                      </p>
                    </div>
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
                  <h2 className="text-lg font-bold">{selected.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selected.type}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    (typeConfig[selected.type] || typeConfig['Đãi ngộ'])
                      .className
                  }`}
                >
                  {selected.type}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Ngân sách / Mức hưởng
                  </p>
                  <p className="font-semibold text-primary text-lg">
                    {selected.budget}
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Users className="size-3.5" />
                    Số người tham gia
                  </div>
                  <p className="font-semibold text-lg">
                    {selected.participantsCount ?? 0}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Trạng thái</p>
                <p>
                  Chương trình đang{' '}
                  <span className="font-semibold text-emerald-600">
                    {selected.status}
                  </span>
                  . Liên hệ bộ phận Nhân sự nếu cần đăng ký hoặc biết thêm chi
                  tiết.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBenefitsPage;