import React from "react";
import { Award, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const progressData = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Senior Frontend Eng.",
    initials: "JD",
    avatarBg: "bg-indigo-100 text-indigo-600",
    course: "GDPR Compliance",
    status: "Completed",
    statusBg: "bg-emerald-100 text-emerald-700",
    progress: 100,
    progressBarColor: "bg-emerald-600",
    certificate: true,
  },
  {
    id: 2,
    name: "Mark Smith",
    role: "Product Manager",
    initials: "MS",
    avatarBg: "bg-teal-100 text-teal-700",
    course: "Team Leadership",
    status: "In Progress",
    statusBg: "bg-indigo-100 text-indigo-600",
    progress: 45,
    progressBarColor: "bg-indigo-600",
    certificate: false,
  },
  {
    id: 3,
    name: "Alice Lo",
    role: "HR Assistant",
    initials: "AL",
    avatarBg: "bg-slate-200 text-slate-700",
    course: "Conflict Resolution",
    status: "Overdue",
    statusBg: "bg-rose-100 text-rose-600",
    progress: 12,
    progressBarColor: "bg-rose-500",
    certificate: false,
  },
];

export default function EmployeeProgressView() {
  return (
    <div className="bg-white border border-slate-200 rounded-b-2xl overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs">
              Employee Name
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs">
              Assigned Course
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs">
              Status
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs w-48">
              Progress
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs">
              Certificate
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {progressData.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center ${row.avatarBg}`}
                  >
                    {row.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-[11px] text-slate-400">{row.role}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-semibold text-slate-700">
                {row.course}
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge
                  className={`font-semibold text-[11px] px-2.5 py-0.5 rounded-full border-0 shadow-none ${row.statusBg}`}
                >
                  • {row.status}
                </Badge>
              </TableCell>

              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <Progress value={row.progress} className="h-1.5 flex-1 bg-slate-100" />
                  <span className="font-bold text-slate-700 text-[11px]">
                    {row.progress}%
                  </span>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 text-center">
                <div className="flex justify-center">
                  <Award
                    className={`w-5 h-5 ${
                      row.certificate ? "text-teal-600" : "text-slate-300"
                    }`}
                  />
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg outline-none">
                    <MoreVertical className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 rounded-xl">
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                      Cập nhật tiến độ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 text-xs">
        <Button variant="ghost" className="text-indigo-600 font-bold p-0 hover:bg-transparent">
          Previous
        </Button>
        <div className="flex items-center gap-1">
          <Button className="h-7 w-7 bg-indigo-600 text-white font-bold text-xs p-0">
            1
          </Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">
            2
          </Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">
            3
          </Button>
        </div>
        <Button variant="ghost" className="text-indigo-600 font-bold p-0 hover:bg-transparent">
          Next
        </Button>
      </div>
    </div>
  );
}