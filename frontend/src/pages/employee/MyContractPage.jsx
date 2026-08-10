import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  FileText,
  Calendar,
  Wallet,
  BadgeCheck,
  Clock,
  XCircle,
} from 'lucide-react';

import { contractService } from '@/services/contract.service';

const statusConfig = {
  active: {
    label: 'Còn hiệu lực',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: BadgeCheck,
  },
  expired: {
    label: 'Hết hạn',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
    icon: Clock,
  },
  cancelled: {
    label: 'Đã hủy',
    className: 'bg-red-50 text-red-600 border-red-200',
    icon: XCircle,
  },
};

const typeLabel = {
  Fulltime: 'Toàn thời gian',
  Parttime: 'Bán thời gian',
  Probation: 'Thử việc',
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('vi-VN');
};

const formatCurrency = (value) => {
  if (value == null) return '—';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

const MyContractPage = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const res = await contractService.getMyContracts();
        const list = res.data || [];
        setContracts(list);
        if (list.length > 0) {
          setSelected(list[0]);
        }
      } catch (error) {
        toast.error('Không thể tải hợp đồng', {
          description: error.customMessage || error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hợp đồng lao động</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem chi tiết hợp đồng và các điều khoản liên quan
        </p>
      </div>

      {contracts.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
          <FileText className="mx-auto size-12 text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">
            Bạn chưa có hợp đồng lao động nào trong hệ thống.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Danh sách hợp đồng */}
          <div className="space-y-3 lg:col-span-1">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Danh sách ({contracts.length})
            </h2>
            {contracts.map((contract) => {
              const status = statusConfig[contract.status] || statusConfig.active;
              const isActive = selected?._id === contract._id;

              return (
                <button
                  key={contract._id}
                  onClick={() => setSelected(contract)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-white hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">
                        {contract.contractCode}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {typeLabel[contract.type] || contract.type}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(contract.startDate)}
                    {contract.endDate ? ` → ${formatDate(contract.endDate)}` : ' → Không thời hạn'}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Chi tiết */}
          {selected && (
            <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold">{selected.contractCode}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {typeLabel[selected.type] || selected.type}
                  </p>
                </div>
                {(() => {
                  const status = statusConfig[selected.status] || statusConfig.active;
                  const Icon = status.icon;
                  return (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
                    >
                      <Icon className="size-3.5" />
                      {status.label}
                    </span>
                  );
                })()}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium mb-1">
                    <Calendar className="size-3.5" />
                    Ngày bắt đầu
                  </div>
                  <p className="font-semibold">{formatDate(selected.startDate)}</p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium mb-1">
                    <Calendar className="size-3.5" />
                    Ngày kết thúc
                  </div>
                  <p className="font-semibold">
                    {selected.endDate ? formatDate(selected.endDate) : 'Không thời hạn'}
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium mb-1">
                    <Wallet className="size-3.5" />
                    Mức lương theo hợp đồng
                  </div>
                  <p className="text-xl font-bold text-primary">
                    {formatCurrency(selected.salary)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Lưu ý</p>
                <p>
                  Đây là thông tin hợp đồng được quản lý bởi bộ phận Nhân sự.
                  Nếu có sai sót, vui lòng liên hệ Admin hoặc gửi yêu cầu hỗ trợ.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyContractPage;