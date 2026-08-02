import React, { useState } from "react";
import { User, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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

const dailyData = [
  {
    id: 1,
    name: "Lê Văn A",
    code: "HRM001",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    date: "24/05/2024",
    shift: "Ca sáng",
    checkIn: "08:00",
    checkOut: "17:05",
    totalHours: "8h 05m",
    status: "Đúng giờ",
    statusBg: "bg-teal-100 text-teal-700",
    isCheckInLate: false,
  },
  {
    id: 2,
    name: "Nguyễn Thị B",
    code: "HRM002",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    date: "24/05/2024",
    shift: "Ca sáng",
    checkIn: "08:15",
    checkOut: "17:00",
    totalHours: "7h 45m",
    status: "Đi muộn",
    statusBg: "bg-rose-100 text-rose-600",
    isCheckInLate: true,
  },
  {
    id: 3,
    name: "Trần Minh C",
    code: "HRM024",
    avatar: null,
    date: "24/05/2024",
    shift: "Ca chiều",
    checkIn: "--:--",
    checkOut: "--:--",
    totalHours: "0h 00m",
    status: "Vắng mặt",
    statusBg: "bg-slate-100 text-slate-500",
    isCheckInLate: false,
  },
];

export default function DailyAttendanceView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  return (
    <div className="bg-white rounded-b-2xl">
      <AttendanceFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
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
          {dailyData.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  {row.avatar ? (
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-[11px] text-slate-400">{row.code}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-600">
                {row.date}
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-600">
                {row.shift}
              </TableCell>

              <TableCell
                className={`py-4 px-6 font-bold ${
                  row.isCheckInLate ? "text-rose-600" : "text-slate-800"
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
          ))}
        </TableBody>
      </Table>

      {/* Phân trang */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 text-xs text-slate-500">
        <p>Hiển thị 1-10 trong số 1,248 bản ghi</p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className="h-7 w-7 bg-indigo-600 text-white font-bold text-xs p-0">
            1
          </Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">
            2
          </Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">
            3
          </Button>
          <span className="text-slate-400 px-1">...</span>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">
            125
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:bg-slate-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}