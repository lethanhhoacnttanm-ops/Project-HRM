import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Clock, CheckCircle2, ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { courseService } from "@/services/course.service";
import { courseprogressService } from "@/services/courseprogress.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function TrainingRegisterPage() {
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);

  const [dataCourse, setDataCourse] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 6

  const [paginationInfo, setPaginationInfo] = useState({ totalEmp: 0, totalPage: 1 });

  const fetchCourses = useCallback(async () => {
    try {
      const res = await courseService.getAllCourses(pageNumber, pageSize);
      if (res?.success) {
        setDataCourse(res.dataCourse);
        setPaginationInfo(res.pagination || { totalCourse: 0, totalPage: 1 });
        setLoading(false)
      } else {
        setDataCourse([]);
      }
    } catch (error) {
      setDataCourse([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách nhân viên!',
      });
    }
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleEnroll = async (courseId) => {
    try {
      setEnrollingId(courseId);

      const response = await courseprogressService.enrollCourseAPI(courseId)

      if (response?.success) {
        toast.success("Đăng ký tham gia khóa học thành công!");
      }
    } catch (error) {
      console.error("Lỗi tham gia khóa học:", error);
      const errorMsg = error.response?.data?.message || "Có lỗi xảy ra khi tham gia!";
      toast.error(errorMsg);
    } finally {
      setEnrollingId(null);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (paginationInfo && pageNumber < paginationInfo.totalCourse) {
      setPageNumber(prev => prev + 1);
    }
  };

  const getPageNumbers = (totalCourse = 1, current = 1) => {
    let pages = [];
    if (totalCourse <= 5) {
      for (let i = 1; i <= totalCourse; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages = [1, 2, 3, 4, '...', totalCourse];
      } else if (current >= totalCourse - 2) {
        pages = [1, '...', totalCourse - 3, totalCourse - 2, totalCourse - 1, totalCourse];
      } else {
        pages = [1, '...', current - 1, current, current + 1, '...', totalCourse];
      }
    }
    return pages;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Đăng ký Lộ trình Đào tạo</h1>
            <p className="text-xs text-slate-500 font-medium">
              Chọn các khóa học phù hợp với định hướng và năng lực của bạn để bắt đầu học tập.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : dataCourse.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCourse.map((course) => (
              <div
                key={course._id}
                className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full shadow-sm">
                        {course.targetLevel}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
                      <span className="truncate max-w-40">{course.department}</span>
                      <span className="text-slate-400 flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" /> {course.durationHours || 0} giờ
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description || "Chưa có mô tả ngắn cho khóa học này."}
                    </p>

                    <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-600 flex items-center justify-between">
                      <span className="text-slate-400">Vị trí áp dụng:</span>
                      <span className="text-slate-900 font-bold truncate max-w-38">{course.position}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    onClick={() => handleEnroll(course._id || course.id)}
                    disabled={enrollingId === (course._id || course.id)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enrollingId === (course._id || course.id) ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
                        <span>Tham gia khóa học</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-xs mt-6">
            <Button
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trang trước</span>
            </Button>

            <div className="text-xs font-medium text-slate-500">
              {getPageNumbers(paginationInfo?.totalPage, pageNumber).map((page, index) => {
                if (page === '...') {
                  return <span key={index} className="text-slate-400 px-1">...</span>;
                }

                const isCurrent = page === pageNumber;

                return (
                  <Button
                    key={index}
                    onClick={() => setPageNumber(page)}
                    className={`h-7 w-7 font-bold text-xs p-0 shadow-none transition-all ${isCurrent
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              onClick={handleNextPage}
              disabled={!paginationInfo || pageNumber >= paginationInfo.totalPage}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-xs"
            >
              <span>Trang sau</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-500">Hiện tại chưa có khóa học nào trong lộ trình.</p>
        </div>
      )}
    </div>
  );
}

