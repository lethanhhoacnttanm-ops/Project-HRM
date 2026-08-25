import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, DollarSign, ArrowRight, Eye, Layers, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const JobCardList = ({ dataJobs, pagination, pageNumber, setPageNumber, onViewDetail, onNavigateApproval, propState }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Khẩn cấp': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300';
      case 'Cao': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300';
      case 'Trung bình': return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const totalPages = pagination?.totalPages || pagination?.pages || 1;

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleOpenModalDetail = (mode, data) => {
     propState({ isOpen: true, mode, data });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {console.log(dataJobs)}
        {dataJobs.map((job) => (
          <div
            key={job._id || job.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`rounded-lg font-bold px-2.5 py-0.5 text-[10px] border ${getPriorityColor(job.priority)}`}
                  >
                    {job.priority || 'Trung bình'}
                  </Badge>
                  {job.client && (
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 truncate max-w-30">
                      @{job.client}
                    </span>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Xem chi tiết đầy đủ dự án"
                >
                  <FileText className="w-4 h-4" />
                </Button>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 tracking-tight line-clamp-1 mb-2">
                {job.title}
              </h3>

              <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-3 border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{job.budget || 'Thỏa thuận'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate">
                    {job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : 'Không thời hạn'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <Layers className="w-3 h-3 text-indigo-500" /> Vị trí định biên:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {job.positions?.map((pos, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium border border-indigo-100 dark:border-indigo-900/50"
                    >
                      {pos.role} <span className="opacity-60">({pos.level} - SL: {pos.slots})</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <Button
                onClick={() => onNavigateApproval ? onNavigateApproval(job._id || job.id) : null}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold h-9 flex-1 shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 border-none"
              >
                <span>Duyệt CV ({job.candidateCount || 0})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              <Button
                variant="outline"
                onClick={() => handleOpenModalDetail("details", job)}
                className="rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 h-9 px-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Chi tiết
              </Button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Trang <strong className="text-slate-800 dark:text-slate-200">{pageNumber}</strong> / {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={pageNumber <= 1}
              className="rounded-xl h-9 px-3 text-xs font-bold border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trang trước</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={pageNumber >= totalPages}
              className="rounded-xl h-9 px-3 text-xs font-bold border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <span>Trang sau</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCardList;