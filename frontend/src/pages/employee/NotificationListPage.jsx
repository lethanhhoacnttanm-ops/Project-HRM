import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Bell,
  Megaphone,
  Wallet,
  Star,
  CalendarCheck,
  Flag,
  FileText,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

import { notificationService } from '@/services/notification.service.js';

const TYPE_FILTERS = ['Tất cả', 'Tin tức chung', 'Sự kiện', 'Chính sách', 'Khẩn cấp', 'Hệ thống', 'Lương', 'Hiệu suất', 'Nghỉ phép'];

const typeConfig = {
  'Tin tức chung': { icon: Megaphone, className: 'bg-blue-50 text-blue-700 border-blue-200' },
  'Sự kiện': { icon: Star, className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  'Chính sách': { icon: FileText, className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  'Khẩn cấp': { icon: AlertCircle, className: 'bg-rose-50 text-rose-700 border-rose-200' },
  'Hệ thống': { icon: Flag, className: 'bg-slate-50 text-slate-700 border-slate-200' },
  'Lương': { icon: Wallet, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'Hiệu suất': { icon: Star, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  'Nghỉ phép': { icon: CalendarCheck, className: 'bg-violet-50 text-violet-700 border-violet-200' },
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
        const res = await notificationService.getAll();
        const list = res.data || [];

        const filteredList = filter === 'Tất cả'
          ? list
          : list.filter((item) => item.type === filter);

        setItems(filteredList);
        setSelected(filteredList[0] || null);
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

  const handleSelectNotification = async (item) => {
    setSelected(item);
    try {
      const res = await notificationService.markAsRead(item._id);

      if (res && res.success) {
        const updatedItem = res.data;
        setItems((prevItems) =>
          prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i))
        );
        setSelected(updatedItem);
      }
    } catch (error) {
      console.error(" LỖI API GỌI THẤT BẠI:", error.response || error);
    }
  };

  const checkIfRead = (item) => {
    if (!Array.isArray(item.readBy)) return false;
    return item.readBy.length > 0;
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Thông báo nội bộ</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem các thông tin, tin tức sự kiện và chính sách mới từ công ty.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TYPE_FILTERS.map((type) => (
          <Button
            key={type}
            onClick={() => setFilter(type)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${filter === type
              ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm'
              : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
              }`}
          >
            {type}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-indigo-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Bell className="mx-auto size-12 text-slate-300" />
          <p className="mt-4 text-sm font-medium text-slate-600">
            Không có thông báo nào trong danh mục này.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-1 min-w-0 max-h-[70vh] overflow-y-auto pr-1">
            {items.map((item) => {
              const cfg = typeConfig[item.type] || typeConfig['Tin tức chung'];
              const Icon = cfg.icon;
              const isActive = selected?._id === item._id;

              const isRead = Array.isArray(item.readBy) && item.readBy.some((r) => {
                const id = r.employeeId?._id || r.employeeId;
                return id;
              });

              return (
                <div
                  key={item._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectNotification(item)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all cursor-pointer relative overflow-hidden block ${isActive
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-600/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                >
                  {!isRead && (
                    <span className="absolute top-4 right-4 size-2.5 rounded-full bg-rose-500 animate-pulse z-10" />
                  )}

                  <div className="flex items-start gap-3 w-full min-w-0">
                    <div className={`rounded-xl border p-2 shrink-0 ${cfg.className}`}>
                      <Icon className="size-4" />
                    </div>

                    <div className="flex-1 min-w-0 overflow-hidden pr-4">
                      <p className={`text-xs text-slate-900 truncate w-full ${!isRead ? 'font-bold' : 'font-medium'}`}>
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 truncate w-full">
                        {item.subTitle || item.content}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-medium">
                        <span className="text-indigo-600 font-semibold">{item.type}</span>
                        <span>·</span>
                        <span>{formatDate(item.sendDate || item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selected && (
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5 h-fit sticky top-6">
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-900">{selected.title}</h2>
                  {selected.subTitle && (
                    <p className="text-xs font-medium text-slate-500 italic">{selected.subTitle}</p>
                  )}
                  <p className="text-xs text-slate-400 pt-1">
                    Ngày đăng: {formatDate(selected.sendDate || selected.createdAt)}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${(typeConfig[selected.type] || typeConfig['Tin tức chung']).className
                    }`}
                >
                  {selected.type}
                </span>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                {selected.content}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">
                  Đối tượng: <strong className="text-slate-700">{selected.recipientGroup || 'Toàn công ty'}</strong>
                </span>

                {checkIfRead(selected) ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ✓ Đã xác nhận đọc
                  </span>
                ) : (
                  <Button
                    onClick={() => handleSelectNotification(selected)}
                    className="px-4 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all cursor-pointer"
                  >
                    Xác nhận đã đọc
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationListPage;