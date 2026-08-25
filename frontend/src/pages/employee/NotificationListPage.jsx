import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Bell,
  Megaphone,
  Wallet,
  Star,
  CalendarCheck,
} from 'lucide-react';

import { notificationService } from '@/services/notification.service';

const TYPE_FILTERS = ['Tất cả', 'Hệ thống', 'Lương', 'Hiệu suất', 'Nghỉ phép'];

const typeConfig = {
  'Hệ thống': {
    icon: Megaphone,
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  Lương: {
    icon: Wallet,
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'Hiệu suất': {
    icon: Star,
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  'Nghỉ phép': {
    icon: CalendarCheck,
    className: 'bg-violet-50 text-violet-700 border-violet-200',
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

const NotificationListPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tất cả');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params =
          filter === 'Tất cả' ? {} : { type: filter };
        const res = await notificationService.getMyNotifications(params);
        const list = res.data || [];
        setItems(list);
        setSelected(list[0] || null);
      } catch (error) {
        toast.error('Không thể tải thông báo', {
          description: error.customMessage || error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Thông báo</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem các thông báo từ hệ thống và từ Admin
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {TYPE_FILTERS.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
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
          <Bell className="mx-auto size-12 text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">
            Không có thông báo nào.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* List */}
          <div className="space-y-2 lg:col-span-1">
            {items.map((item) => {
              const cfg = typeConfig[item.type] || typeConfig['Hệ thống'];
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
                    <div
                      className={`rounded-lg border p-2 ${cfg.className}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.type}
                        <span className="mx-1">·</span>
                        {formatDate(item.sendDate || item.createdAt)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          {selected && (
            <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{selected.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selected.type}
                    <span className="mx-1.5">·</span>
                    {formatDate(selected.sendDate || selected.createdAt)}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    (typeConfig[selected.type] || typeConfig['Hệ thống'])
                      .className
                  }`}
                >
                  {selected.type}
                </span>
              </div>

              {selected.subTitle && (
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                  {selected.subTitle}
                </p>
              )}

              <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
                Đối tượng: {selected.recipientGroup || 'Toàn công ty'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationListPage;