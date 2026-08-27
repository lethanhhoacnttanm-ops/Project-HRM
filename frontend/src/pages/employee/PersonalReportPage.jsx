import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  CalendarDays,
  CalendarCheck,
  Wallet,
  Star,
  TrendingUp,
  User,
} from 'lucide-react';

import { reportService } from '@/services/report.service.js';

const formatCurrency = (value) => {
  if (value == null) return '—';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

const promotionStatusLabel = {
  PENDING_REVIEW: 'Chờ duyệt',
  APPROVED_PENDING_EFFECTIVE: 'Đã duyệt – chờ hiệu lực',
  WAITING: 'Đang chờ',
  COMPLETED: 'Hoàn thành',
  REJECTED: 'Từ chối',
};

const PersonalReportPage = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await reportService.getMyReport({ month, year });
        if (!cancelled) {
          setReport(res.data || null);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error('Không thể tải báo cáo cá nhân', {
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
  }, [month, year]);

  const handlePeriodChange = (type, value) => {
    setLoading(true);
    if (type === 'month') setMonth(Number(value));
    if (type === 'year') setYear(Number(value));
  };

  if (loading && !report) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  const att = report?.attendance;
  const leave = report?.leave;
  const payroll = report?.payroll;
  const perf = report?.performance;
  const promo = report?.promotion;
  const emp = report?.employee;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Báo cáo cá nhân
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Tổng hợp hiệu suất và hoạt động của bạn
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={month}
            onChange={(e) => handlePeriodChange('month', e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                Tháng {m}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => handlePeriodChange('year', e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          >
            {[year - 1, year, year + 1].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      )}

      {/* Employee info */}
      {emp && (
        <div className="rounded-xl border bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
            {emp.fullName?.charAt(0)?.toUpperCase() || 'N'}
          </div>
          <div>
            <p className="font-semibold text-lg">{emp.fullName}</p>
            <p className="text-sm text-muted-foreground">
              {emp.code && `${emp.code} · `}
              {emp.position || 'Nhân viên'}
              {emp.email && ` · ${emp.email}`}
            </p>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Attendance */}
        <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CalendarDays className="size-4 text-blue-600" />
            Chấm công T{att?.month}/{att?.year}
          </div>
          <p className="text-3xl font-bold">{att?.total ?? 0}</p>
          <p className="text-xs text-muted-foreground">Ngày có dữ liệu</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <span className="text-emerald-600">Đúng giờ: {att?.onTime ?? 0}</span>
            <span className="text-amber-600">Muộn: {att?.late ?? 0}</span>
            <span className="text-red-600">Vắng: {att?.absent ?? 0}</span>
            <span className="text-orange-600">Về sớm: {att?.earlyLeave ?? 0}</span>
          </div>
        </div>

        {/* Leave */}
        <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CalendarCheck className="size-4 text-violet-600" />
            Nghỉ phép
          </div>
          <p className="text-3xl font-bold">{leave?.approvedDays ?? 0}</p>
          <p className="text-xs text-muted-foreground">Ngày đã được duyệt</p>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p>Tổng đơn: {leave?.totalRequests ?? 0}</p>
            <p>Chờ duyệt: {leave?.pending ?? 0}</p>
            <p>Đã duyệt: {leave?.approved ?? 0}</p>
          </div>
        </div>

        {/* Payroll */}
        <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Wallet className="size-4 text-emerald-600" />
            Lương gần nhất
          </div>
          {payroll ? (
            <>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(payroll.netSalary)}
              </p>
              <p className="text-xs text-muted-foreground">
                Kỳ: {payroll.monthYear}
              </p>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>Cơ bản: {formatCurrency(payroll.baseSalary)}</p>
                <p>Thưởng: {formatCurrency(payroll.bonus)}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Chưa có phiếu lương</p>
          )}
        </div>

        {/* Performance */}
        <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Star className="size-4 text-amber-500" />
            Đánh giá
          </div>
          {perf ? (
            <>
              <p className="text-3xl font-bold">{perf.score}/5</p>
              <p className="text-xs text-muted-foreground">{perf.quarter}</p>
              <p className="text-xs text-muted-foreground">
                Trạng thái: {perf.status}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Chưa có đánh giá</p>
          )}
        </div>
      </div>

      {/* Promotion + Feedback */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="size-4 text-primary" />
            Thăng tiến
          </div>
          {promo ? (
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Vị trí: </span>
                {promo.currentPosition || '—'}
              </p>
              <p className="font-semibold">
                {promo.currentLevel} → {promo.proposedLevel}
              </p>
              <p className="text-xs text-muted-foreground">
                {promotionStatusLabel[promo.status] || promo.status}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Chưa có đề xuất thăng tiến
            </p>
          )}
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <User className="size-4 text-slate-600" />
            Nhận xét gần nhất
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {perf?.feedback?.trim()
              ? perf.feedback
              : 'Chưa có nhận xét từ đánh giá hiệu suất.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalReportPage;