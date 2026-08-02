import React from "react";
import { User, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const registrations = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    department: "Kỹ thuật",
    packageUsed: "Bảo hiểm A+, Ăn trưa",
    date: "12/05/2023",
    status: "Đã duyệt",
    statusBg: "bg-teal-100 text-teal-700",
  },
  {
    id: 2,
    name: "Trần Thị Bích",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    department: "Marketing",
    packageUsed: "Ăn trưa, Gym membership",
    date: "14/05/2023",
    status: "Chờ duyệt",
    statusBg: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    department: "Nhân sự",
    packageUsed: "Bảo hiểm A+, Bảo hiểm NT",
    date: "10/05/2023",
    status: "Đã duyệt",
    statusBg: "bg-teal-100 text-teal-700",
  },
];

export default function RegistrationManageView() {
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NHÂN VIÊN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              PHÒNG BAN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              GÓI SỬ DỤNG
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NGÀY ĐĂNG KÝ
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
          {registrations.map((row) => (
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
                  <span className="font-bold text-slate-800">{row.name}</span>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-600">
                {row.department}
              </TableCell>

              <TableCell className="py-4 px-6 font-semibold text-indigo-600">
                {row.packageUsed}
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-600 font-medium">
                {row.date}
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
                  <DropdownMenuContent align="end" className="w-40 rounded-xl">
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                      Duyệt đơn đăng ký
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-medium text-rose-600 cursor-pointer">
                      Từ chối đơn
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