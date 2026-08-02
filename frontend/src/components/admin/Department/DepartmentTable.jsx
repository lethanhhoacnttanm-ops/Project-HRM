import React, { useState } from "react";
import {
  Code2,
  Palette,
  Landmark,
  Megaphone,
  User,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialDepartments = [
  {
    id: 1,
    name: "Engineering & Tech",
    costCenter: "Cost Center: 4022",
    icon: Code2,
    iconBg: "bg-emerald-50 text-emerald-600",
    managerName: "Sarah Mitchell",
    managerRole: "VP of Engineering",
    managerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    isVacant: false,
    members: "245 Thành viên",
    status: true,
  },
  {
    id: 2,
    name: "Design & UX",
    costCenter: "Cost Center: 4025",
    icon: Palette,
    iconBg: "bg-emerald-50 text-emerald-600",
    managerName: "David Chen",
    managerRole: "Creative Director",
    managerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    isVacant: false,
    members: "32 Thành viên",
    status: true,
  },
  {
    id: 3,
    name: "Finance & Payroll",
    costCenter: "Cost Center: 1001",
    icon: Landmark,
    iconBg: "bg-emerald-50 text-emerald-600",
    managerName: "Elena Rodriguez",
    managerRole: "CFO",
    managerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    isVacant: false,
    members: "18 Thành viên",
    status: true,
  },
  {
    id: 4,
    name: "Marketing",
    costCenter: "Cost Center: 2055",
    icon: Megaphone,
    iconBg: "bg-emerald-50 text-emerald-600",
    managerName: "Position Vacant",
    managerRole: "Hiring in progress",
    isVacant: true,
    members: "85 Thành viên",
    status: true,
  },
];

export default function DepartmentTable({ onSelectDepartment }) {
  const [departments, setDepartments] = useState(initialDepartments);

  const toggleStatus = (id) => {
    setDepartments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow className="hover:bg-transparent">
            <TableHead className="py-4 px-6 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
              Tên phòng ban
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
              Trưởng phòng
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
              Nhân sự
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold uppercase text-[11px] tracking-wider">
              Trạng thái
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold uppercase text-[11px] tracking-wider">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {departments.map((row) => {
            const IconComponent = row.icon;
            return (
              <TableRow
                key={row.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${row.iconBg}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        {row.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {row.costCenter}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {row.isVacant ? (
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                    ) : (
                      <img
                        src={row.managerAvatar}
                        alt={row.managerName}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    )}
                    <div>
                      <p
                        className={`font-semibold ${
                          row.isVacant ? "text-rose-600" : "text-slate-800"
                        }`}
                      >
                        {row.managerName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {row.managerRole}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none"
                  >
                    {row.members}
                  </Badge>
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <div className="flex justify-center">
                    <Switch
                      checked={row.status}
                      onCheckedChange={() => toggleStatus(row.id)}
                    />
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl">
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment(row)}
                        className="text-xs font-medium cursor-pointer"
                      >
                        Xem thông tin
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-medium text-rose-600 focus:text-rose-600 cursor-pointer">
                        Xóa phòng ban
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 text-xs text-slate-500">
        <p>Hiển thị 1–4 trong số 12 phòng ban</p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className="h-7 w-7 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs p-0">
            1
          </Button>
          <Button
            variant="ghost"
            className="h-7 w-7 text-slate-600 font-medium text-xs p-0"
          >
            2
          </Button>
          <Button
            variant="ghost"
            className="h-7 w-7 text-slate-600 font-medium text-xs p-0"
          >
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