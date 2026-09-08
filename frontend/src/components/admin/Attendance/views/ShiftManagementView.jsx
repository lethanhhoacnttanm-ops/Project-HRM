import React from "react";
import { Clock, Users, Plus, MoreVertical } from "lucide-react";
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

export default function ShiftManagementView({ onOpenModal, dataShift, pagination, pageSize, pageNumber, setPageNumber }) {

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
  return (
    <div className="bg-white dark:bg-slate-900 rounded-b-2xl p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
            Danh sách khung ca quy định
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Cấu hình thời gian làm việc chuẩn và gán nhân sự tương ứng.
          </p>
        </div>
        <Button
          onClick={onOpenModal}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm cursor-pointer border-0"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Tạo ca làm việc mới</span>
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-slate-50/80 dark:bg-slate-950/60">
          <TableRow className="border-b border-slate-200 dark:border-slate-800">
            <TableHead className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
              TÊN CA
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
              THỜI GIAN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
              GIỜ NGHỈ GIỮA CA
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
              NHÂN SỰ ÁP DỤNG
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
              TRẠNG THÁI
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
              THAO TÁC
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {dataShift && dataShift.length > 0 ? (
            dataShift.map((shift) => (
              <TableRow key={shift._id || shift.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors dark:border-slate-800">

                <TableCell className="py-4 px-6">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{shift.name}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">{shift.code}</p>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 font-semibold text-indigo-600 dark:text-indigo-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    <span>
                      {shift.time || `${shift.checkInTime} - ${shift.checkOutTime}`}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">
                  {shift.breakTime}
                </TableCell>

                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                    <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{shift.appliedEmployeesCount || 0}</span>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <Badge
                    className={`font-semibold text-[11px] px-2.5 py-0.5 rounded-full border-0 shadow-none ${shift.status === 'Xoay ca'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                      : shift.status === 'Đã hủy'
                        ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      }`}
                  >
                    {shift.status}
                  </Badge>
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg outline-none cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg p-1">
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer dark:text-slate-200 dark:hover:bg-slate-800 rounded-lg px-2 py-1.5">
                        Chỉnh sửa ca
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer dark:text-slate-200 dark:hover:bg-slate-800 rounded-lg px-2 py-1.5">
                        Phân công nhân sự
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow className="dark:border-slate-800">
              <TableCell colSpan={6} className="text-center py-8 text-slate-400 dark:text-slate-500">
                Chưa có ca làm việc nào được tạo.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <TableRow className="hover:bg-transparent dark:border-slate-800">
            <TableCell colSpan={6} className="py-4 px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5 shadow-sm">
                  <span>Trang</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{pageNumber}</span>
                  <span>/</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{pagination?.totalPage || 1}</span>
                  <span className="text-slate-300 dark:text-slate-700 mx-1.5">|</span>
                  <span>Tổng số:</span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    {pagination?.totalShift}
                  </span>
                  <span>bản ghi</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={handlePrevPage}
                    disabled={pageNumber <= 1}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 border cursor-pointer ${pageNumber <= 1
                        ? "bg-slate-50 dark:bg-slate-950 text-slate-300 dark:text-slate-600 border-slate-100 dark:border-slate-800 cursor-not-allowed"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm"
                      }`}
                  >
                    Trang trước
                  </Button>

                  <Button
                    type="button"
                    onClick={handleNextPage}
                    disabled={!pagination || pageNumber >= pagination.totalPage}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 border cursor-pointer ${!pagination || pageNumber >= pagination.totalPage
                        ? "bg-slate-50 dark:bg-slate-950 text-slate-300 dark:text-slate-600 border-slate-100 dark:border-slate-800 cursor-not-allowed"
                        : "bg-indigo-600 dark:bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 shadow-sm"
                      }`}
                  >
                    Trang sau
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