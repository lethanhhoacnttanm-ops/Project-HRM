import React, { useState } from "react";
import {
  Building2,
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


export default function DepartmentTable({ onSelectDepartment, departments, positions }) {

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
          {console.log(departments)}
          {console.log(positions)}
          {departments.map((row) => {
            return (
              <TableRow
                key={row?._id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${row.iconBg}`}>
                      <Building2 className="w-4 h-4 text-blue-500" />
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
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none"
                  >
                    {row.manager || "Lê Thanh Hòa"}
                  </Badge>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none"
                  >
                    {"300 nhân sự"}
                  </Badge>
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <div className="flex justify-center">
                    <Badge
                      variant="secondary"
                      className="bg-green-50  text-green-600 hover:bg-indigo-100 font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none"
                    >
                      {row.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                    </Badge>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={(
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    )} />
                    <DropdownMenuContent align="end" className="w-40 rounded-xl space-y-1">
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('detail', row)}
                        className="text-xs font-medium cursor-pointer bg-yellow-50 text-yellow-700"
                      >
                        Xem thông tin
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('employees', row)}
                        className="text-xs font-medium cursor-pointer bg-orange-50 text-orange-700"
                      >
                        Thêm nhân sự
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('position', row)}
                        className="text-xs font-medium cursor-pointer bg-violet-50 text-violet-700"
                      >
                        Thêm vị trí
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('edit', row)}
                        className="text-xs font-medium cursor-pointer"
                      >
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