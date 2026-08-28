import React, { useState, useEffect } from "react";
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
import AttendanceFilter from "../AttendanceFilter";
import dayjs from "dayjs";

export default function DailyAttendanceView({ dataAttendance, pagination, pageSize, pageNumber, setPageNumber }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [date, setDate] = useState(new Date());

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
    <div className="bg-white dark:bg-gray-900 rounded-b-2xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <AttendanceFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        dataAttendance={dataAttendance}
        date={date}
        setDate={setDate}
        onFilterChange={setFilteredRecords}
      />

      <Table>
        <TableHeader className="bg-slate-50/80 dark:bg-gray-800/60">
          <TableRow className="border-b border-slate-200 dark:border-gray-800">
            <TableHead className="py-4 px-6 text-slate-500 dark:text-gray-400 font-bold text-xs uppercase">
              NHÂN VIÊN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-gray-400 font-bold text-xs uppercase">
              NGÀY
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-gray-400 font-bold text-xs uppercase">
              CA LÀM VIỆC
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-gray-400 font-bold text-xs uppercase">
              CHECK-IN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-gray-400 font-bold text-xs uppercase">
              CHECK-OUT
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-gray-400 font-bold text-xs uppercase">
              TỔNG GIỜ
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-gray-400 font-bold text-xs uppercase">
              TRẠNG THÁI
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 dark:text-gray-400 font-bold text-xs uppercase">
              THAO TÁC
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-gray-800 text-xs">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((row) => (
              <TableRow key={row._id} className="hover:bg-slate-50/80 dark:hover:bg-gray-800/40 transition-colors">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {row.employee?.avatarUrl ? (
                      <img
                        src={row.employee.avatarUrlr}
                        alt={row.employee?.fullName}
                        className="w-9 h-9 rounded-full object-cover border dark:border-gray-700"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-400 dark:text-gray-500">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-800 dark:text-gray-100">{row.employee?.fullName}</p>
                      <p className="text-[11px] text-slate-400 dark:text-gray-500">{row.employee?.code}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-slate-600 dark:text-gray-400">
                  {dayjs(row.date).format("DD/MM/YYYY")}
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-slate-600 dark:text-gray-400">
                  {row.shift?.name}
                </TableCell>

                <TableCell
                  className={`py-4 px-6 font-bold ${row.isCheckInLate ? "text-rose-600 dark:text-rose-400" : "text-slate-800 dark:text-gray-200"
                    }`}
                >
                  {row.checkIn}
                </TableCell>

                <TableCell className="py-4 px-6 font-bold text-slate-800 dark:text-gray-200">
                  {row.checkOut}
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-slate-600 dark:text-gray-400">
                  {row.totalHours}
                </TableCell>

                <TableCell className="py-4 px-6">
                  <Badge
                    className={`font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none ${row.statusBg}`}
                  >
                    {row.status}
                  </Badge>
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg outline-none cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-lg p-1">
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5">
                        Xem lịch sử chấm công
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5">
                        Chỉnh sửa giờ Check-in/out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-slate-400 dark:text-gray-500">
                Không có dữ liệu chấm công trong ngày này.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="bg-white dark:bg-gray-900 border-t border-slate-100 dark:border-gray-800">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={8} className="p-0">
              <div className="flex items-center justify-between px-6 py-4 text-xs text-slate-500 dark:text-gray-400">
                <p>
                  Trang <span className="font-bold text-indigo-600 dark:text-indigo-400">{pageNumber}</span> / <span className="font-bold text-slate-800 dark:text-gray-200">{pagination?.totalPage || 1}</span>
                  <span className="text-slate-300 dark:text-gray-700 mx-2">|</span>
                  Tổng số: <span className="font-bold text-slate-800 dark:text-gray-200">{pagination?.totalAttendance || 0}</span> bản ghi
                </p>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevPage}
                    disabled={pageNumber <= 1}
                    className={`h-7 w-7 text-slate-400 dark:text-gray-500 bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 cursor-pointer ${pageNumber <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <Button className="h-7 w-7 bg-indigo-600 dark:bg-indigo-600 text-white font-bold text-xs p-0 shadow-none border-0">
                    {pageNumber}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextPage}
                    disabled={!pagination || pageNumber >= pagination.totalPage}
                    className={`h-7 w-7 text-slate-400 dark:text-gray-500 bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 cursor-pointer ${(!pagination || pageNumber >= pagination.totalPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
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