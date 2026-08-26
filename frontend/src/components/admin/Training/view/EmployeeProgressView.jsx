import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { Award, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

export default function EmployeeProgressView({ 
  dataCourseProgress, 
  pagination, 
  pageSize, 
  pageNumber, 
  setPageNumber,
  onSelectCourseProgress 
}) {
  
  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < pagination.totalPage) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow className="border-b border-slate-200">
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs">
              Employee Name
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs">
              Assigned Course
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs">
              Status
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs w-48">
              Progress
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs">
              Certificate
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {dataCourseProgress && dataCourseProgress.length > 0 ? (
            dataCourseProgress.map((row) => {
              const fullName = row.employeeId?.fullName || "N/A";
              const initials = fullName !== "N/A" ? fullName.charAt(0).toUpperCase() : "U";
              const isCompleted = row.status === "Completed";

              return (
                <TableRow key={row._id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{fullName}</p>
                        <p className="text-[11px] text-slate-400">{row.employeeId?.position || "Nhân viên"}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6 font-semibold text-slate-700">
                    {row.courseId?.title || "Khóa học không xác định"}
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <Badge
                      className={`font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none ${
                        isCompleted 
                          ? "bg-emerald-50 text-emerald-600" 
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      • {row.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Progress value={row.progressPercent || 0} className="h-1.5 flex-1 bg-slate-100" />
                      <span className="font-bold text-slate-700 text-[11px] min-w-8">
                        {row.progressPercent || 0}%
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      <Award
                        className={`w-5 h-5 ${
                          isCompleted ? "text-teal-600" : "text-slate-300"
                        }`}
                      />
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={( 
                        <Button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg outline-none cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </Button> )}
                        >
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl">
                        <DropdownMenuItem onClick={() => onSelectCourseProgress('detail', row)} className="text-xs font-medium cursor-pointer">
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                          Cập nhật tiến độ
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan="6" className="py-16 text-center text-slate-400 font-medium">
                Chưa có dữ liệu tiến độ học tập nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 border-t border-slate-200 text-xs">
        <Button 
          variant="ghost" 
          onClick={handlePrev}
          disabled={pageNumber <= 1}
          className="text-indigo-600 font-bold p-0 hover:bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>

        <div className="text-xs font-medium text-slate-600">
          Trang <span className="text-indigo-600 font-bold text-sm px-1">{pageNumber}</span> / <span className="font-bold text-slate-800">{pagination.totalPage || 1}</span>
        </div>

        <Button 
          variant="ghost" 
          onClick={handleNext}
          disabled={pageNumber >= pagination.totalPage}
          className="text-indigo-600 font-bold p-0 hover:bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
        >
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}