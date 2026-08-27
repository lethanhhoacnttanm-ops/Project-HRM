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
    <div className="bg-white rounded-b-2xl">
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
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NHÂN VIÊN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NGÀY
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              CA LÀM VIỆC
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              CHECK-IN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              CHECK-OUT
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TỔNG GIỜ
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
          {filteredRecords.length > 0 ? (
            filteredRecords.map((row) => (
              <TableRow key={row._id} className="hover:bg-slate-50/80 transition-colors">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {row.employee?.avatarUrl ? (
                      <img
                        src={row.employee.avatarUrlr}
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
                  {dayjs(row.date).format("DD/MM/YYYY")}
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-slate-600">
                  {row.shift?.name}
                </TableCell>

                <TableCell
                  className={`py-4 px-6 font-bold ${row.isCheckInLate ? "text-rose-600" : "text-slate-800"
                    }`}
                >
                  {row.checkIn}
                </TableCell>

                <TableCell className="py-4 px-6 font-bold text-slate-800">
                  {row.checkOut}
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-slate-600">
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
                    <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg outline-none">
                      <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-xl">
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                        Xem lịch sử chấm công
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                        Chỉnh sửa giờ Check-in/out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-slate-400">
                Không có dữ liệu chấm công trong ngày này.
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
                  Tổng số: <span className="font-bold text-slate-800">{pagination?.totalAttendance || 0}</span> bản ghi
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

                  <Button className="h-7 w-7 bg-indigo-600 text-white font-bold text-xs p-0 shadow-none">
                    {pageNumber}
                  </Button>

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