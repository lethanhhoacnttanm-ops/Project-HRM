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

  const levelTemplates = [
    {
      key: 'Intern',
      label: 'Intern',
      badgeClass: 'bg-slate-500 text-white border-slate-300 [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]',
    },
    {
      key: 'Fresher',
      label: 'Fresher',
      badgeClass: 'bg-blue-500 text-white border-blue-300 [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]',
    },
    {
      key: 'Junior',
      label: 'Junior',
      badgeClass: 'bg-teal-500 text-white border-teal-300 [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]',
    },
    {
      key: 'Middle',
      label: 'Middle',
      badgeClass: 'bg-emerald-600 text-white border-emerald-400 [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]',
    },
    {
      key: 'Senior',
      label: 'Senior',
      badgeClass: 'bg-purple-600 text-white border-purple-400 [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]',
    },
    {
      key: 'Lead',
      label: 'Lead',
      badgeClass: 'bg-rose-600 text-white border-rose-400 [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]',
    },
    {
      key: 'Principal',
      label: 'Principal',
      badgeClass: 'bg-amber-400 text-gray-900 border-amber-200 [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border dark:border-gray-800 border-gray-300 shadow-xs overflow-hidden dark:bg-gray-900">
      <Table>
        <TableHeader className="bg-slate-50/50 dark:bg-gray-800/60">
          <TableRow className="border-b border-gray-200 dark:border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[11px]">Tên</TableHead>
            <TableHead className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[11px]">Vị trí</TableHead>
            <TableHead className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[11px]">Phòng ban</TableHead>
            <TableHead className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[11px]">Cấp bậc</TableHead>
            <TableHead className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[11px]">Trạng thái</TableHead>
            <TableHead className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[11px] text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
          {employees.map((emp) => {
            return (
              <TableRow key={emp._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors border-gray-100 dark:border-gray-800">
                <TableCell className="flex items-center gap-3 cursor-pointer group py-3.5 px-4">
                  <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:border-blue-500 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors dark:text-white">
                      {emp.fullName}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">{emp.email}</div>
                  </div>
                </TableCell>

                <TableCell className="font-medium text-gray-600 dark:text-gray-300 py-3.5 px-4">
                  {emp.position?.name || 'Chưa cập nhật'}
                </TableCell>

                <TableCell className="py-3.5 px-4">
                  <span className="inline-block bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                    {emp.department?.name || 'Chưa cập nhật'}
                  </span>
                </TableCell>

                {(() => {
                  const currentLevel = emp.level || 'Chưa cập nhật';
                  const matchedTemplate = levelTemplates.find((t) => t.key === currentLevel);

                  const badgeStyle = matchedTemplate
                    ? matchedTemplate.badgeClass
                    : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/50';

                  return (
                    <TableCell className="py-3.5 px-4">
                      <span className={`inline-block text-xs font-semibold px-3 py-1  border shadow-sm ${badgeStyle}`}>
                        {currentLevel}
                      </span>
                    </TableCell>
                  );
                })()}

                <TableCell className="py-3.5 px-4">
                  {emp.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Đang nghỉ
                    </span>
                  )}
                </TableCell>

                <TableCell className="py-3.5 px-4 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer outline-none inline-flex items-center justify-center">
                      <MoreVertical className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-52 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg p-1">
                      <DropdownMenuItem
                        onClick={() => onOpenModal('view', emp)}
                        className="cursor-pointer gap-2 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5"
                      >
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        Xem chi tiết
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => navigate(`/admin-page/employees/${emp.id}`)}
                        className="cursor-pointer gap-2 text-slate-700 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5"
                      >
                        <ExternalLink className="h-4 w-4 text-slate-500 dark:text-gray-400" />
                        Đến trang hồ sơ đầy đủ
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="dark:bg-gray-800 my-1" />

                      <DropdownMenuItem
                        onClick={() => onOpenModal('edit', emp)}
                        className="cursor-pointer gap-2 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5"
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                        Chỉnh sửa thông tin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow className="border-t border-gray-200 dark:border-gray-800 bg-transparent hover:bg-transparent">
            <TableCell colSpan={6} className="p-0">
              <div className="p-4 bg-slate-50/30 dark:bg-gray-900 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 w-full">
                <span>1 - {pageSize} trên {employees.length} nhân sự</span>

                <div className="flex items-center gap-1">
                  <Button
                    onClick={handlePrevPage}
                    disabled={pageNumber === 1}
                    className="px-2.5 py-1 rounded-lg border text-black dark:text-gray-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50"
                  >
                    <ArrowBigLeft className="w-4 h-4" />
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
                          : 'border text-black dark:text-gray-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    onClick={handleNextPage}
                    disabled={pageNumber === pagination.totalPage}
                    className="px-2.5 py-1 rounded-lg border text-black dark:text-gray-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50"
                  >
                    <ArrowBigRight className="w-4 h-4" />
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