import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreVertical, User, Edit, ExternalLink, ArrowBigRight, ArrowBigLeft } from "lucide-react";

const EmployeeTable = ({ employees, onOpenModal, pageNumber, setPageNumber, pagination, pageSize }) => {

  const navigate = useNavigate();

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < pagination.totalPages) setPageNumber(pageNumber + 1);
  };

  const handleGoToPage = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  return (
    <div className="bg-white rounded-2xl border dark:border-gray-800 border-gray-300 shadow-xs overflow-hidden dark:bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Phòng ban</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => {
            const data = employees.filter(item => item._id === emp._id)
            return (
              <TableRow key={emp._id} className="dark:bg-blue-950 dark:hover:bg-blue-900">
                <TableCell className="flex items-center gap-3 cursor-pointer group ">
                  <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 group-hover:border-blue-500 transition-colors">
                    <User />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors dark:text-white">
                      {emp.fullName}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-amber-50/50">{emp.email}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-600 dark:text-amber-50/50">{emp.position || 'Cộng tác'}</TableCell>
                <TableCell>
                  <span className="inline-block bg-indigo-50 text-indigo-600 dark:text-black text-xs font-semibold px-3 py-1 rounded-xl border border-indigo-100">
                    {emp.department || 'Fullstack Developer'}
                  </span>
                </TableCell>
                <TableCell>
                  {emp.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Đang nghỉ
                    </span>
                  )}
                </TableCell>
                <TableCell className={"py-3.5 px-6 text-center"}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                      <MoreVertical className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-52 rounded-xl">
                      <DropdownMenuItem
                        onClick={() => onOpenModal('view', data?.[0])}
                        className="cursor-pointer gap-2"
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        Xem chi tiết
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => navigate(`/admin-page/employees/${emp.id}`)}
                        className="cursor-pointer gap-2 text-slate-700 focus:text-slate-900"
                      >
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                        Đến trang hồ sơ đầy đủ
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onOpenModal('edit', data?.[0])}
                        className="cursor-pointer gap-2"
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                        Chỉnh sửa thông tin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>

            )
          }
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="p-0">
              <div className="p-4  bg-slate-50/30 flex items-center justify-between text-xs text-gray-500 w-full dark:bg-gray-900">
                <span>1 - {pageSize} trên {employees.length} nhân sự</span>

                <div className="flex items-center gap-1">
                  <Button onClick={handlePrevPage} disabled={pageNumber === 1} className="px-2.5 py-1 rounded-lg border text-black border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                    <ArrowBigLeft />
                  </Button>
                  {Array.from({ length: pagination.totalPage }, (_, index) => {
                    const pageNum = index + 1;
                    const isActive = pageNum === pageNumber;

                    return (
                      <Button
                        key={pageNum}
                        onClick={() => handleGoToPage(pageNum)}
                        className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${isActive
                          ? 'bg-blue-600 text-white font-bold border-transparent'
                          : 'border text-black border-gray-200 bg-white hover:bg-gray-50'
                          }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button onClick={handleNextPage} disabled={pageNumber === pagination.totalPage} className="px-2.5 py-1 rounded-lg border text-black border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                    <ArrowBigRight />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default EmployeeTable;