import React from "react";
import { User, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";

export default function LeaveTable({ dataLeave, pageNumber, pageSize, pagination, setPageNumber, onOpenModal }) {
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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Chờ duyệt':
        return 'bg-amber-50 text-amber-600';
      case 'Đã duyệt':
        return 'bg-emerald-50 text-emerald-600';
      case 'Từ chối':
        return 'bg-rose-50 text-rose-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NHÂN VIÊN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              LOẠI NGHĨ
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              BẮT ĐẦU
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              KẾT THÚC
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              SỐ NGÀY
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TRẠNG THÁI
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs uppercase">
              THAO TÁC
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {dataLeave.map((row) => (
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

              <TableCell className="py-4 px-6 font-medium text-slate-700">
                {row.leaveType}
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-600 font-medium">
                {dayjs(row.startDate).format("DD/MM/YYYY")}
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-600 font-medium">
                {dayjs(row.endDate).format("DD/MM/YYYY")}
              </TableCell>

              <TableCell className="py-4 px-6 font-bold text-slate-800">
                {row.numberOfDays} ngày
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge
                  className={`font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none ${getStatusStyle(row.status)}`}
                >
                  {row.status}
                </Badge>
              </TableCell>

              <TableCell className="py-4 px-6 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg outline-none">
                    <MoreVertical className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 rounded-xl">
                    <DropdownMenuItem onClick={() => onOpenModal('detail', row)} className="text-xs font-medium cursor-pointer">
                      Xem chi tiết đơn
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-white border-t border-slate-100">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={8} className="p-0">
              <div className="flex items-center justify-between px-6 py-4 text-xs text-slate-500">

                <p>
                  Trang <span className="font-bold text-indigo-600">{pageNumber}</span> / <span className="font-bold text-slate-800">{pagination?.totalPage || 1}</span>
                  <span className="text-slate-300 mx-2">|</span>
                  Tổng số: <span className="font-bold text-slate-800">{pagination?.totalItems || dataLeave?.length || 0}</span> đơn
                </p>

                <div className="flex items-center gap-1">

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevPage}
                    disabled={pageNumber === 1}
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