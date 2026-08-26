import React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  Layers, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function CourseCatalogView({  dataCourse = [], pagination, pageSize, pageNumber, setPageNumber }) {

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pageNumber < pagination.totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="space-y-6 my-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Danh mục Khóa học (Udemy Business)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Hiển thị tối đa {pageSize} khóa học mỗi trang theo lộ trình chuẩn.
            </p>
          </div>
        </div>

        {pagination && (
          <div className="text-xs font-semibold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            Trang <span className="text-indigo-600 font-bold">{pageNumber}</span> / <span className="font-bold">{pagination.totalPages || 1}</span> 
            <span className="text-slate-400 mx-2">|</span> 
            Tổng số: <span className="text-slate-900 font-bold">{pagination.totalCourse || 0}</span> khóa học
          </div>
        )}
      </div>

      <div className="relative px-2 sm:px-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevPage}
          disabled={pageNumber <= 1}
          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border-slate-200 text-slate-700 shadow-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          title="Trang trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={!pagination || pageNumber >= pagination.totalPages}
          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border-slate-200 text-slate-700 shadow-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          title="Trang tiếp theo"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {dataCourse && dataCourse.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300">
            {dataCourse.map((course) => (
              <Card key={course._id || course.id} className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between bg-white">
                <div>
                  <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"} 
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-extrabold uppercase bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg">
                        {course.targetLevel}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="p-4 pb-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-indigo-600 uppercase">
                      <span className="truncate max-w-35">{course.department}</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {course.durationHours || 0}h
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug" title={course.title}>
                      {course.title}
                    </h4>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {course.description || "Chưa có mô tả ngắn cho khóa học này."}
                    </p>
                    <div className="mt-3 inline-block bg-slate-50 border border-slate-100 px-2 py-1 rounded-md text-[10px] font-semibold text-slate-600">
                      Vị trí: <span className="text-slate-900">{course.position}</span>
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="p-4 pt-2 border-t border-slate-100">
                  <a 
                    href={course.courseUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold py-2 rounded-xl transition-all shadow-2xs"
                  >
                    <span>Vào học trên Udemy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">Không tìm thấy khóa học nào trong trang này.</p>
          </div>
        )}
      </div>
    </div>
  );
}