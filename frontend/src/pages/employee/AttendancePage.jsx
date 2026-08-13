import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  LogOut,
} from 'lucide-react';

import { attendanceService } from '@/services/attendanceService';

const statusStyle = {
  'Đúng giờ': {
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
  'Đi muộn': {
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: AlertTriangle,
  },
  'Vắng mặt': {
    className: 'bg-red-50 text-red-600 border-red-200',
    icon: XCircle,
  },
  'Về sớm': {
    className: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: LogOut,
  },
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const AttendancePage = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await attendanceService.getMyAttendance({ month, year });
        setRecords(res.data || []);
      } catch (error) {
        toast.error('Không thể tải chấm công', {
          description: error.customMessage || error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  const stats = useMemo(() => {
    const total = records.length;
    const onTime = records.filter((r) => r.status === 'Đúng giờ').length;
    const late = records.filter((r) => r.status === 'Đi muộn').length;
    const absent = records.filter((r) => r.status === 'Vắng mặt').length;
    const earlyLeave = records.filter((r) => r.status === 'Về sớm').length;
    return { total, onTime, late, absent, earlyLeave };
  }, [records]);

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearOptions = [year - 1, year, year + 1];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Chấm công</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Xem lịch sử chấm công và theo dõi giờ làm việc
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          >
            {monthOptions.map((m) => (
              <option key={m} value={m}>
                Tháng {m}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Tổng ngày', value: stats.total, color: 'text-slate-800' },
          { label: 'Đúng giờ', value: stats.onTime, color: 'text-emerald-600' },
          { label: 'Đi muộn', value: stats.late, color: 'text-amber-600' },
          { label: 'Vắng mặt', value: stats.absent, color: 'text-red-600' },
          { label: 'Về sớm', value: stats.earlyLeave, color: 'text-orange-600' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className={`text-2xl font-bold mt-1 ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarDays className="mx-auto size-12 text-muted-foreground/40" />
            <p className="mt-4 text-muted-foreground">
              Không có dữ liệu chấm công trong tháng này.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left">
                  <th className="px-4 py-3 font-medium">Ngày</th>
                  <th className="px-4 py-3 font-medium">Giờ vào</th>
                  <th className="px-4 py-3 font-medium">Giờ ra</th>
                  <th className="px-4 py-3 font-medium">Tổng giờ</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {records.map((row) => {
                  const style =
                    statusStyle[row.status] || statusStyle['Đúng giờ'];
                  const Icon = style.icon;
                  return (
                    <tr
                      key={row._id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-medium">
                        {formatDate(row.date)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5 text-muted-foreground" />
                          {row.checkIn || '--:--'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{row.checkOut || '--:--'}</td>
                      <td className="px-4 py-3">{row.totalHours || '0h 00m'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.className}`}
                        >
                          <Icon className="size-3.5" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;