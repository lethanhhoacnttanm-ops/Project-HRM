import React, { useState } from "react";
import { SlidersHorizontal, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const auditLogs = [
  {
    id: 1,
    user: "Hoàng Nam (Admin)",
    action: "Thay đổi mức lương: #EMP002",
    time: "20/05/2024 14:30:12",
    status: "Thành công",
    statusBg: "bg-teal-100 text-teal-700",
    ip: "118.70.12.241",
  },
  {
    id: 2,
    user: "Lê Thị Mai",
    action: "Xuất dữ liệu Nhân sự (Excel)",
    time: "20/05/2024 11:15:45",
    status: "Thành công",
    statusBg: "bg-teal-100 text-teal-700",
    ip: "103.1.23.45",
  },
  {
    id: 3,
    user: "Ẩn danh",
    action: "Đăng nhập sai mật khẩu (3 lần)",
    time: "20/05/2024 09:02:10",
    status: "Thất bại",
    statusBg: "bg-rose-100 text-rose-600",
    ip: "45.112.3.1",
  },
];

export default function AuditLogsTable() {
  const [selectedAction, setSelectedAction] = useState("all");
  const [date, setDate] = useState(null);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-3">
      <div className="p-5 pb-1">
        <h3 className="font-bold text-slate-800 text-sm">
          Nhật ký Hệ thống (Audit Logs)
        </h3>
      </div>

      <div className="px-5 pb-3 flex flex-wrap items-center gap-3">
        <div className="w-44">
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-medium text-slate-700 bg-slate-50/50 rounded-xl h-9">
              <SelectValue placeholder="Tất cả hành động" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs">Tất cả hành động</SelectItem>
              <SelectItem value="salary" className="text-xs">Thay đổi mức lương</SelectItem>
              <SelectItem value="export" className="text-xs">Xuất dữ liệu</SelectItem>
              <SelectItem value="auth" className="text-xs">Đăng nhập</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-slate-200 text-xs text-slate-600 bg-slate-50/50 rounded-xl h-9 px-3 font-normal shadow-none"
            >
              <CalendarIcon className="w-3.5 h-3.5 mr-2 text-slate-400" />
              {date ? format(date, "dd/MM/yyyy") : "mm/dd/yyyy"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          className="border-slate-200 text-slate-700 bg-slate-50/50 hover:bg-slate-100 font-semibold text-xs h-9 rounded-xl px-3.5 shadow-none gap-1.5"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span>Lọc</span>
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              NGƯỜI DÙNG
            </TableHead>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              HÀNH ĐỘNG
            </TableHead>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              THỜI GIAN
            </TableHead>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              TRẠNG THÁI
            </TableHead>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              IP TRUY CẬP
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {auditLogs.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6 font-bold text-slate-800">
                {row.user}
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-700">
                {row.action}
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-500 font-medium">
                {row.time}
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge
                  className={`font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none ${row.statusBg}`}
                >
                  • {row.status}
                </Badge>
              </TableCell>

              <TableCell className="py-4 px-6 font-mono text-slate-600">
                {row.ip}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 text-xs text-slate-500">
        <p>Hiển thị 10 của 1,240 bản ghi</p>
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