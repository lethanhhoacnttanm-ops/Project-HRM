import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Briefcase,
  MapPin,
  Calendar,
  Layers,
  Send,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { internalJobService } from '@/services/internalJob.service.js';

const stageLabel = {
  new: 'Mới nộp',
  interview: 'Phỏng vấn',
  evaluating: 'Đánh giá',
  offered: 'Đề nghị nhận việc',
  rejected: 'Từ chối',
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('vi-VN');
};

const InternalJobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showApply, setShowApply] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState('jobs'); // jobs | applications

  const [form, setForm] = useState({
    role: '',
    level: '',
    cvFileUrl: '',
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          internalJobService.getOpenJobs(),
          internalJobService.getMyApplications(),
        ]);
        if (!cancelled) {
          const list = jobsRes.data || [];
          setJobs(list);
          setSelected(list[0] || null);
          setApplications(appsRes.data || []);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error('Không thể tải việc làm nội bộ', {
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

  const openApply = (job) => {
    setSelected(job);
    const first = job.positions?.[0];
    setForm({
      role: first?.role || '',
      level: first?.level || '',
      cvFileUrl: '',
    });
    setShowApply(true);
  };

  const onApply = async (e) => {
    e.preventDefault();
    if (!form.role || !form.level) {
      toast.error('Vui lòng chọn vị trí ứng tuyển!');
      return;
    }
    if (!form.cvFileUrl.trim()) {
      toast.error('Vui lòng nhập link CV!');
      return;
    }

    try {
      setSubmitting(true);
      await internalJobService.apply({
        jobId: selected._id,
        role: form.role,
        level: form.level,
        cvFileUrl: form.cvFileUrl.trim(),
      });
      toast.success('Nộp đơn ứng tuyển thành công!');
      setShowApply(false);
      const appsRes = await internalJobService.getMyApplications();
      setApplications(appsRes.data || []);
      setTab('applications');
    } catch (error) {
      toast.error('Nộp đơn thất bại', {
        description: error.customMessage || error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

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
        <h1 className="text-2xl font-bold tracking-tight">Việc làm nội bộ</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Ứng tuyển vào các vị trí công việc nội bộ
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {[
          { key: 'jobs', label: `Đang tuyển (${jobs.length})` },
          { key: 'applications', label: `Đơn của tôi (${applications.length})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Jobs */}
      {tab === 'jobs' && (
        <>
          {jobs.length === 0 ? (
            <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
              <Briefcase className="mx-auto size-12 text-muted-foreground/40" />
              <p className="mt-4 text-muted-foreground">
                Hiện không có vị trí nội bộ nào đang tuyển.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl border bg-white p-5 shadow-sm space-y-3 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-primary">
                        {job.jobCode}
                      </p>
                      <h3 className="font-bold text-base mt-0.5">{job.title}</h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                      Đang tuyển
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {job.location || '—'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      Hạn: {formatDate(job.deadline)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Layers className="size-3.5" />
                      {job.type || 'Toàn thời gian'}
                    </span>
                  </div>

                  {job.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {job.positions?.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Vị trí:{' '}
                      {job.positions
                        .map((p) => `${p.role} (${p.level})`)
                        .join(', ')}
                    </p>
                  )}

                  <Button
                    className="w-full"
                    onClick={() => openApply(job)}
                  >
                    <Send className="size-4" />
                    Ứng tuyển
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Tab: My applications */}
      {tab === 'applications' && (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          {applications.length === 0 ? (
            <div className="p-12 text-center">
              <Briefcase className="mx-auto size-12 text-muted-foreground/40" />
              <p className="mt-4 text-muted-foreground">
                Bạn chưa ứng tuyển vị trí nào.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <p className="font-semibold text-sm">
                      {app.job?.title || 'Vị trí đã ứng tuyển'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {app.appliedPosition?.role} · {app.appliedPosition?.level}
                      <span className="mx-1.5">·</span>
                      Nộp: {formatDate(app.appliedDate || app.createdAt)}
                    </p>
                  </div>
                  <span className="self-start rounded-full border px-2.5 py-0.5 text-[11px] font-medium bg-slate-50 text-slate-700">
                    {stageLabel[app.stage] || app.stage}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal apply đơn giản */}
      {showApply && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={onApply}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl space-y-4"
          >
            <h2 className="text-lg font-bold">Ứng tuyển: {selected.title}</h2>

            <div className="space-y-1.5">
              <Label>Vị trí</Label>
              <select
                value={`${form.role}||${form.level}`}
                onChange={(e) => {
                  const [role, level] = e.target.value.split('||');
                  setForm((p) => ({ ...p, role, level }));
                }}
                className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
                required
              >
                {(selected.positions || []).map((p, idx) => (
                  <option key={idx} value={`${p.role}||${p.level}`}>
                    {p.role} — {p.level} ({p.slots} slot)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cvFileUrl">Link CV (Google Drive, PDF…)</Label>
              <Input
                id="cvFileUrl"
                value={form.cvFileUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, cvFileUrl: e.target.value }))
                }
                placeholder="https://..."
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowApply(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  'Nộp đơn'
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default InternalJobPage;