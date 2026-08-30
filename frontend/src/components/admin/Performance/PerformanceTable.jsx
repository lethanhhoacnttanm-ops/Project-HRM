import React, { useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight, User, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PerformanceFilter from "../../../components/admin/Performance/PerformanceFilter.jsx";



export default function PerformanceTable({ dataPerformance, pageNumber, setPageNumber, pagination, pageSize }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedQuarter, setSelectedQuarter] = useState("q3_2024");

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pageNumber < pagination.totalPage) {
      setPageNumber(prev => prev + 1);
    }
  };

  const getPageNumbers = (totalPages = 1, current = 1) => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (current >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', current - 1, current, current + 1, '...', totalPages];
      }
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <PerformanceFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedQuarter={selectedQuarter}
        setSelectedQuarter={setSelectedQuarter}
      />
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TÊN NHÂN VIÊN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              PHÒNG BAN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NGƯỜI ĐÁNH GIÁ
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TỰ ĐÁNH GIÁ
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              ĐIỂM CHỐT
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TRẠNG THÁI
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs uppercase">
              THAO TÁC
            </TableHead>
          </TableRow>
          {console.log(dataPerformance)}
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {Array.isArray(dataPerformance) && dataPerformance.length > 0 ? (
            dataPerformance.map((row) => (
              <TableRow key={row._id} className="hover:bg-slate-50/80 transition-colors">

                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {row.employee?.avatarUrl ? (
                      <img
                        src={row.employee?.avatarUrl}
                        alt={row.employee?.fullName}
                        className="w-9 h-9 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-800">{row.employee?.fullName}</p>
                      <p className="text-[11px] text-slate-400">{row.employee?.code}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-slate-600">
                  {row.employee?.department?.name || "Chưa cập nhật"}
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-red-600">
                  {row.evaluator?.fullName || "Chưa cập nhật"}
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-slate-600">
                  {row.selfAssessment ? (
                    <div className="text-[11px] space-y-0.5">
                      <div>Out: <span className="font-bold text-slate-800">{row.selfAssessment.outsourcingScore}</span></div>
                      <div>Train: <span className="font-bold text-slate-800">{row.selfAssessment.trainingScore}</span></div>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Chưa đánh giá</span>
                  )}
                </TableCell>

                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-1.5">
                    {(() => {
                      const avgScore = ((row.outsourcingScore + row.trainingScore) / 2).toFixed(1);
                      return (
                        <span className="font-bold text-indigo-600 text-sm">
                          {avgScore} / 5.0
                        </span>
                      );
                    })()}
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-sm" />
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  {row?.status === 'Draft' && (
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-bold text-[10px] inline-block">
                      Chưa nộp
                    </span>
                  )}
                  {row.status === 'Submitted' && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-bold text-[10px] inline-block">
                      Đã nộp (Chờ duyệt)
                    </span>
                  )}
                  {row.status === 'Approved' && (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-bold text-[10px] inline-block">
                      Đã duyệt
                    </span>
                  )}
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg outline-none">
                      <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-xl">
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                        Xem phiếu chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs  cursor-pointer text-indigo-600 font-semibold">
                        Chỉnh sửa & Duyệt điểm
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

              </TableRow>
            ))) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-slate-400">
                Không có dữ liệu ở trang này.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="bg-white border-t border-slate-100">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={8} className="p-0">
              <div className="flex items-center justify-between px-6 py-4 text-xs text-slate-500">

                <p>
                  Trang <span className="font-bold text-indigo-600">{pageNumber}</span> / <span className="font-bold text-slate-800">{pagination?.totalPage || 1}</span>
                  <span className="text-slate-300 mx-2">|</span>
                  Tổng số: <span className="font-bold text-slate-800">{pagination?.totalPerformance || dataPerformance?.length || 0}</span> đơn
                </p>

                <div className="flex items-center gap-1">

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevPage}
                    disabled={pageNumber <= 1}
                    className={`h-7 w-7 text-slate-400 hover:bg-slate-50 ${pageNumber <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {getPageNumbers(pagination?.totalPage, pageNumber).map((page, index) => {
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

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextPage}
                    disabled={!pagination || pageNumber >= pagination.totalPage}
                    className={`h-7 w-7 text-slate-400 hover:bg-slate-50 ${(!pagination || pageNumber >= pagination.totalPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                </div>

              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}