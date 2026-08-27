import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Loader2,
  CalendarDays,
  CalendarCheck,
  Wallet,
  Star,
  FileText,
  User,
  Bell,
  Headphones,
  ArrowRight,
} from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { reportService } from '@/services/report.service.js';

const formatCurrency = (value) => {
  if (value == null) return '—';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

const quickLinks = [
  {
    to: '/employee/leave-request',
    label: 'Nghỉ phép',
    desc: 'Nộp đơn & theo dõi',
    icon: CalendarCheck,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    to: '/employee/payslip',
    label: 'Phiếu lương',
    desc: 'Xem lương thưởng',
    icon: Wallet,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    to: '/employee/attendance',
    label: 'Chấm công',
    desc: 'Lịch sử giờ làm',
    icon: CalendarDays,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    to: '/employee/profile',
    label: 'Hồ sơ',
    desc: 'Cập nhật thông tin',
    icon: User,
    color: 'bg-slate-100 text-slate-600',
  },
  {
    to: '/employee/notifications',
    label: 'Thông báo',
    desc: 'Tin từ hệ thống',
    icon: Bell,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    to: '/employee/support',
    label: 'Hỗ trợ',
    desc: 'Gửi yêu cầu',
    icon: Headphones,
    color: 'bg-rose-50 text-rose-600',
  },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const now = new Date();

    (async () => {
      try {
        const res = await reportService.getMyReport({
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        });
        if (!cancelled) setReport(res.data || null);
      } catch (error) {
        if (!cancelled) {
          // Dashboard vẫn hiện được dù report lỗi
          console.error(error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const att = report?.attendance;
  const leave = report?.leave;
  const payroll = report?.payroll;
  const perf = report?.performance;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl border bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-sm">
        <p className="text-blue-100 text-sm">{greeting}</p>
        <h1 className="text-2xl font-bold mt-1">
          {user?.fullName || report?.employee?.fullName || 'Nhân viên'}
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          {user?.position || report?.employee?.position || 'Employee'}
          {(user?.code || report?.employee?.code) &&
            ` · ${user?.code || report?.employee?.code}`}
        </p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Chấm công tháng này</p>
              <CalendarDays className="size-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold mt-2">{att?.total ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Đúng giờ {att?.onTime ?? 0} · Muộn {att?.late ?? 0}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Nghỉ phép</p>
              <CalendarCheck className="size-4 text-violet-600" />
            </div>
            <p className="text-2xl font-bold mt-2">{leave?.pending ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Đơn chờ duyệt · Đã duyệt {leave?.approvedDays ?? 0} ngày
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Lương gần nhất</p>
              <Wallet className="size-4 text-emerald-600" />
            </div>
            <p className="text-xl font-bold mt-2 text-primary">
              {payroll ? formatCurrency(payroll.netSalary) : '—'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {payroll?.monthYear || 'Chưa có phiếu lương'}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Đánh giá</p>
              <Star className="size-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold mt-2">
              {perf ? `${perf.score}/5` : '—'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {perf?.quarter || 'Chưa có đánh giá'}
            </p>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Truy cập nhanh
          </h2>
          <Link
            to="/employee/personal-report"
            className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:underline"
          >
            Xem báo cáo đầy đủ
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <div className={`rounded-lg p-2.5 ${item.color}`}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground flex items-start gap-3">
        <FileText className="size-5 shrink-0 mt-0.5" />
        <p>
          Đây là trang tổng quan. Chi tiết chấm công, lương, đánh giá và thăng
          tiến xem tại từng mục tương ứng hoặc{' '}
          <Link
            to="/employee/personal-report"
            className="text-primary font-medium hover:underline"
          >
            Báo cáo cá nhân
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;