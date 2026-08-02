import React from "react";
import { Clock, Users, Plus, MoreVertical } from "lucide-react";
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

const shiftsData = [
  {
    id: 1,
    name: "Ca Hành Chính (Sáng)",
    code: "SHIFT_AM",
    time: "08:00 - 12:00",
    breakTime: "12:00 - 13:00",
    assignedCount: "850 Nhân sự",
    status: "Đang áp dụng",
    statusBg: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 2,
    name: "Ca Hành Chính (Chiều)",
    code: "SHIFT_PM",
    time: "13:00 - 17:00",
    breakTime: "Không có",
    assignedCount: "850 Nhân sự",
    status: "Đang áp dụng",
    statusBg: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 3,
    name: "Ca Đêm (Tech Support)",
    code: "SHIFT_NIGHT",
    time: "22:00 - 06:00",
    breakTime: "02:00 - 03:00",
    assignedCount: "24 Nhân sự",
    status: "Xoay ca",
    statusBg: "bg-indigo-50 text-indigo-600",
  },
];

export default function ShiftManagementView({ onOpenModal }) {
  return (
    <div className="bg-white rounded-b-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">
            Danh sách khung ca quy định
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Cấu hình thời gian làm việc chuẩn và gán nhân sự tương ứng.
          </p>
        </div>
        <Button
          onClick={onOpenModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Tạo ca làm việc mới</span>
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TÊN CA
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              THỜI GIAN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              GIỜ NGHỈ GIỮA CA
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NHÂN SỰ ÁP DỤNG
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
          {shiftsData.map((shift) => (
            <TableRow key={shift.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6">
                <div>
                  <p className="font-bold text-slate-800">{shift.name}</p>
                  <p className="text-[11px] text-slate-400">{shift.code}</p>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-semibold text-indigo-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{shift.time}</span>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-600 font-medium">
                {shift.breakTime}
              </TableCell>

              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{shift.assignedCount}</span>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge
                  className={`font-semibold text-[11px] px-2.5 py-0.5 rounded-full border-0 shadow-none ${shift.statusBg}`}
                >
                  {shift.status}
                </Badge>
              </TableCell>

              <TableCell className="py-4 px-6 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg outline-none">
                    <MoreVertical className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 rounded-xl">
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                      Chỉnh sửa ca
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                      Phân công nhân sự
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}