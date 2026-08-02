import React from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
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

const evaluations = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Product Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    department: "Thiết kế",
    evaluator: "Michael Chen",
    score: "4.8",
    status: "Hoàn thành",
    statusBg: "bg-teal-100 text-teal-700",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Lead Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    department: "Kỹ thuật",
    evaluator: "Sofia Rodriguez",
    score: "4.5",
    status: "Đang thực hiện",
    statusBg: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Marketing Specialist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    department: "Marketing",
    evaluator: "Alex Rivera",
    score: "3.9",
    status: "Chờ duyệt",
    statusBg: "bg-slate-100 text-slate-600",
  },
];

export default function PerformanceTable() {
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
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
              ĐIỂM GẦN NHẤT
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
          {evaluations.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <img
                    src={row.avatar}
                    alt={row.name}
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-[11px] text-slate-400">{row.role}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-600">
                {row.department}
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-600">
                {row.evaluator}
              </TableCell>

              <TableCell className="py-4 px-6">
                <span className="font-bold text-indigo-600 text-sm">{row.score}</span>
                <span className="text-slate-400 text-xs font-medium">/5.0</span>
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
                      Xem phiếu đánh giá
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                      Chỉnh sửa điểm
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 text-xs text-slate-500">
        <p>Đang hiển thị 1-10 trong số 1.200 nhân viên</p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7 text-slate-400 hover:bg-slate-50">
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
            120
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7 text-slate-400 hover:bg-slate-50">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}