import React, { useState } from "react";
import { Clock } from "lucide-react";
import TrainingFilter from "../TrainingFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "GDPR & Bảo mật dữ liệu 2024",
    category: "SỰ TUÂN THỦ",
    duration: "2h 30m",
    modules: "4 Modules",
    tag: "Bắt buộc",
    tagBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Effective Team Leadership",
    category: "KỸ NĂNG MỀM",
    duration: "6h 15m",
    modules: "12 Modules",
    tag: "Môn tự chọn",
    tagBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Advanced AWS Architecture",
    category: "KỸ THUẬT",
    duration: "14h 45m",
    modules: "24 Modules",
    tag: "Trình độ cao",
    tagBg: "bg-slate-100 text-slate-600 border-slate-200",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Conflict Resolution 101",
    category: "KỸ NĂNG MỀM",
    duration: "1h 45m",
    modules: "3 Modules",
    tag: "Thiết yếu",
    tagBg: "bg-teal-50 text-teal-600 border-teal-200",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80",
  },
];

export default function CourseCatalogView() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="bg-white rounded-b-2xl">
      <TrainingFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-800 tracking-wider">
                  {course.category}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
                  {course.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-3 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {course.duration} • {course.modules}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-50 mt-2 flex items-center justify-between">
              <Badge
                variant="outline"
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${course.tagBg}`}
              >
                {course.tag}
              </Badge>
              <Button
                variant="link"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 p-0 h-auto"
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}