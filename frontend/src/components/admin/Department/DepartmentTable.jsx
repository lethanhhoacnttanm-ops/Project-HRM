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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function DepartmentTable({ onSelectDepartment, departments, allEmployees }) {

  const getEmployeeCountByDept = (deptId, employeesList) => {
    if (!Array.isArray(employeesList) || !deptId) return 0;

    return employeesList.filter(emp => {
      const empDept = emp.departmentId?._id || emp.departmentId || emp.department;
      if (!empDept) return false;

      const extractedId = typeof empDept === 'object' ? empDept._id : empDept;

      return String(extractedId) === String(deptId);
    }).length;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-slate-900/40">
      <Table>
        <TableHeader className="bg-slate-50/80 dark:bg-slate-800/60">
          <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
            {console.log(departments)}
            <TableHead className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider">
              Tên phòng ban
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider">
              Trưởng phòng
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider">
              Nhân sự
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider">
              Trạng thái
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {departments.map((row) => {
            return (
              <TableRow
                key={row?._id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors border-slate-100 dark:border-slate-800"
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${row.iconBg || 'bg-blue-50 dark:bg-blue-950/80'}`}>
                      <Building2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white text-sm">
                        {row.name}
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                        {row.costCenter}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300 font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none"
                  >
                    {row.manager || "Chưa cập nhật"}
                  </Badge>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300 font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none"
                  >
                    {(() => {
                      const count = getEmployeeCountByDept(row._id, allEmployees);
                      return count > 0 ? `${count} nhân sự` : "Chưa có nhân sự";
                    })()}
                  </Badge>
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <div className="flex justify-center">
                    <Badge
                      variant="secondary"
                      className={
                        row.status === "ACTIVE"
                          ? "bg-green-50 text-green-600 dark:bg-green-950/80 dark:text-green-400 font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none"
                      }
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
                        className="h-8 w-8 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    )} />
                    <DropdownMenuContent align="end" className="w-40 rounded-xl space-y-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-1">
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('detail', row)}
                        className="text-xs font-medium cursor-pointer bg-yellow-50 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-400 hover:dark:bg-yellow-900/60 rounded-lg px-2 py-1.5"
                      >
                        Xem thông tin
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('employees', row)}
                        className="text-xs font-medium cursor-pointer bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 hover:dark:bg-orange-900/60 rounded-lg px-2 py-1.5"
                      >
                        Thêm nhân sự
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('manager', row)}
                        className="text-xs font-medium cursor-pointer bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 hover:dark:bg-orange-900/60 rounded-lg px-2 py-1.5"
                      >
                        Bổ nhiệm trưởng phòng
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('position', row)}
                        className="text-xs font-medium cursor-pointer bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400 hover:dark:bg-violet-900/60 rounded-lg px-2 py-1.5"
                      >
                        Thêm vị trí
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSelectDepartment('edit', row)}
                        className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-2 py-1.5"
                      >
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer rounded-lg px-2 py-1.5">
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

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <p>Hiển thị 1–4 trong số 12 phòng ban</p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className="h-7 w-7 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs p-0 border-0">
            1
          </Button>
          <Button
            variant="ghost"
            className="h-7 w-7 text-slate-600 dark:text-slate-300 font-medium text-xs p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            2
          </Button>
          <Button
            variant="ghost"
            className="h-7 w-7 text-slate-600 dark:text-slate-300 font-medium text-xs p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            3
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}