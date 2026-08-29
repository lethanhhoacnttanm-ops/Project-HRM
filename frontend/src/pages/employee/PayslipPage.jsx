import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Wallet,
  TrendingUp,
  TrendingDown,
  Gift,
  MinusCircle,
  BadgeCheck,
} from 'lucide-react';

import { payrollService } from '@/services/payroll.service';

const formatCurrency = (value) => {
  if (value == null) return '—';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

const formatMonthYear = (monthYear) => {
  if (!monthYear) return '—';
  // Hỗ trợ "2026-08" hoặc "08/2026"
  if (monthYear.includes('-')) {
    const [y, m] = monthYear.split('-');
    return `Tháng ${Number(m)}/${y}`;
  }
  return monthYear;
};

const PayslipPage = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        setLoading(true);
        const res = await payrollService.getMyPayrolls();
        const list = res.data || [];
        setPayrolls(list);
        if (list.length > 0) setSelected(list[0]);
      } catch (error) {
        toast.error('Không thể tải phiếu lương', {
          description: error.customMessage || error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
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
        <h1 className="text-2xl font-bold tracking-tight">Phiếu lương</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem chi tiết bảng lương và các khoản thưởng theo tháng
        </p>
      </div>

      {payrolls.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
          <Wallet className="mx-auto size-12 text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">
            Chưa có phiếu lương nào được phát hành.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Danh sách theo tháng */}
          <div className="space-y-3 lg:col-span-1">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Theo tháng ({payrolls.length})
            </h2>
            {payrolls.map((item) => {
              const isActive = selected?._id === item._id;
              return (
                <button
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-white hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                      {formatMonthYear(item.monthYear)}
                    </p>
                    {item.isLocked && (
                      <span className="text-[10px] rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                        Đã khóa
                      </span>
                    )}
                  </div>
                  <p className="text-primary font-bold text-sm mt-1">
                    {formatCurrency(item.netSalary)}
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
                  <h2 className="text-lg font-bold">
                    {formatMonthYear(selected.monthYear)}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Phiếu lương chi tiết
                  </p>
                </div>
                {selected.isLocked && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <BadgeCheck className="size-3.5" />
                    Đã chốt
                  </span>
                )}
              </div>

              {/* Thực nhận */}
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  Thực nhận
                </p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(selected.netSalary)}
                </p>
              </div>

              {/* Breakdown */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-4 flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <Wallet className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Lương cơ bản</p>
                    <p className="font-semibold">
                      {formatCurrency(selected.baseSalary)}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 flex items-start gap-3">
                  <div className="rounded-lg bg-violet-50 p-2">
                    <TrendingUp className="size-4 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phụ cấp</p>
                    <p className="font-semibold">
                      {formatCurrency(selected.allowance)}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 flex items-start gap-3">
                  <div className="rounded-lg bg-amber-50 p-2">
                    <Gift className="size-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Thưởng
                      {selected.bonusType ? ` (${selected.bonusType})` : ''}
                    </p>
                    <p className="font-semibold text-amber-700">
                      +{formatCurrency(selected.bonus)}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 flex items-start gap-3">
                  <div className="rounded-lg bg-red-50 p-2">
                    <MinusCircle className="size-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Khấu trừ</p>
                    <p className="font-semibold text-red-600">
                      −{formatCurrency(selected.deductions)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Công thức */}
              <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Cách tính</p>
                <p>
                  Thực nhận = Lương cơ bản + Phụ cấp + Thưởng − Khấu trừ
                </p>
                <p className="mt-1 font-mono text-xs">
                  {formatCurrency(selected.baseSalary)} +{' '}
                  {formatCurrency(selected.allowance)} +{' '}
                  {formatCurrency(selected.bonus)} −{' '}
                  {formatCurrency(selected.deductions)} ={' '}
                  <span className="text-primary font-semibold">
                    {formatCurrency(selected.netSalary)}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PayslipPage;