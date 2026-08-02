import React from "react";
import { PlusCircle, Utensils, Award, HeartHandshake, MoreVertical } from "lucide-react";
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

const programs = [
  {
    id: 1,
    title: "Chăm sóc sức khỏe A+",
    type: "Bảo hiểm",
    budget: "450tr VNĐ",
    participants: "124 NV",
    status: "Đang mở",
    statusBg: "bg-teal-100 text-teal-700",
    icon: PlusCircle,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    title: "Phụ cấp ăn trưa",
    type: "Phụ cấp",
    budget: "320tr VNĐ",
    participants: "450 NV",
    status: "Đang mở",
    statusBg: "bg-teal-100 text-teal-700",
    icon: Utensils,
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    title: "Thưởng hiệu suất năm",
    type: "Đãi ngộ",
    budget: "1.5 tỷ VNĐ",
    participants: "85 NV",
    status: "Tạm dừng",
    statusBg: "bg-slate-100 text-slate-500",
    icon: Award,
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    id: 4,
    title: "Bảo hiểm nhân thọ Group",
    type: "Bảo hiểm",
    budget: "280tr VNĐ",
    participants: "42 NV",
    status: "Đang mở",
    statusBg: "bg-teal-100 text-teal-700",
    icon: HeartHandshake,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
];

export default function ProgramListView() {
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TÊN CHƯƠNG TRÌNH
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              LOẠI
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NGÂN SÁCH
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              THAM GIA
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
          {programs.map((row) => {
            const IconComponent = row.icon;
            return (
              <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${row.iconBg}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">
                      {row.title}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 font-medium text-slate-600">
                  {row.type}
                </TableCell>

                <TableCell className="py-4 px-6 font-bold text-slate-800">
                  {row.budget}
                </TableCell>

                <TableCell className="py-4 px-6 font-semibold text-indigo-600">
                  {row.participants}
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
                        Xem chi tiết gói
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                        Chỉnh sửa ngân sách
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}