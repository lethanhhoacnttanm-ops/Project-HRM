import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import {
  User,
  MoreVertical,
  Eye,
  XCircle,
  ArrowBigLeft,
  ArrowBigRight
} from "lucide-react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dayjs from 'dayjs';

const ContractTable = ({ contracts, onOpenModal, pageNumber, setPageNumber, pagination, pageSize }) => {

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pageNumber < pagination.totalContract) {
      setPageNumber(prev => prev + 1);
    }
  };

  const getPageNumbers = (totalContract = 1, current = 1) => {
    let pages = [];
    if (totalContract <= 5) {
      for (let i = 1; i <= totalContract; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages = [1, 2, 3, 4, '...', totalContract];
      } else if (current >= totalContract - 2) {
        pages = [1, '...', totalContract - 3, totalContract - 2, totalContract - 1, totalContract];
      } else {
        pages = [1, '...', current - 1, current, current + 1, '...', totalContract];
      }
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden dark:bg-gray-900 dark:border-gray-800">
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse text-xs font-semibold">
          <TableHeader>
            <TableRow className="bg-slate-50/80 border-b border-gray-200 text-gray-700 font-bold dark:bg-gray-800/60 dark:border-gray-800">
              <TableHead className="py-3.5 px-5 text-gray-500 dark:text-gray-400">ID</TableHead>
              <TableHead className="py-3.5 px-5 text-gray-500 dark:text-gray-400">Tên</TableHead>
              <TableHead className="py-3.5 px-5 text-gray-500 dark:text-gray-400">Loại</TableHead>
              <TableHead className="py-3.5 px-5 text-gray-500 dark:text-gray-400">Ngày bắt đầu</TableHead>
              <TableHead className="py-3.5 px-5 text-gray-500 dark:text-gray-400">Ngày kết thúc</TableHead>
              <TableHead className="py-3.5 px-5 text-gray-500 dark:text-gray-400">Trạng thái</TableHead>
              <TableHead className="py-3.5 px-5 text-center text-gray-500 dark:text-gray-400">Thao tác</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {contracts.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors border-gray-100 dark:border-gray-800">
                <TableCell className="py-3.5 px-5 font-bold text-gray-600 dark:text-white">
                  {item.contractCode}
                </TableCell>

                <TableCell className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 dark:text-white">{item?.employee?.fullName}</div>
                      <div className="text-[11px] text-gray-400 dark:text-gray-500 font-normal">{item?.employee?.email}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3.5 px-5">
                  <Badge
                    variant="outline"
                    className={`border-0 px-3 py-1 rounded-xl text-[11px] font-bold ${item.type === 'Fulltime'
                      ? 'bg-green-100 text-green-800 dark:bg-green-950/80 dark:text-green-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300'
                      }`}
                  >
                    {item.type}
                  </Badge>
                </TableCell>

                <TableCell className="py-3.5 px-5 text-gray-600 dark:text-gray-300">
                  {dayjs(item.startDate).format("DD/MM/YY")}
                </TableCell>

                <TableCell className="py-3.5 px-5 text-gray-600 dark:text-gray-300">
                  {dayjs(item.endDate).format("DD/MM/YY")}
                </TableCell>

                <TableCell className="py-3.5 px-5">
                  {item.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-gray-400 dark:text-gray-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Đang nghỉ
                    </span>
                  )}
                </TableCell>

                <TableCell className="py-3.5 px-5 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer outline-none inline-flex items-center justify-center">
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg p-1">
                      <DropdownMenuItem
                        onClick={() => onOpenModal('detail', item)}
                        className="cursor-pointer gap-2 text-xs font-semibold dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5"
                      >
                        <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        Xem chi tiết hợp đồng
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="dark:bg-gray-800 my-1" />

                      <DropdownMenuItem
                        onClick={() => onOpenModal('cancel', item)}
                        className="cursor-pointer gap-2 text-xs font-semibold text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 rounded-lg px-2 py-1.5"
                      >
                        <XCircle className="h-4 w-4" />
                        Hủy hợp đồng
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow className="border-t border-gray-200 dark:border-gray-800 bg-transparent hover:bg-transparent">
              <TableCell colSpan={7} className="p-0">
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-slate-50/30 dark:bg-gray-900 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 w-full">
                  <span>1 - {pageSize} trên {pagination?.totalContract} hợp đồng</span>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevPage}
                      disabled={pageNumber === 1}
                      className={`h-7 w-7 text-slate-400 hover:bg-slate-50 ${pageNumber <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <ArrowBigLeft className="w-4 h-4" />
                    </Button>

                    {getPageNumbers(pagination?.totalContract, pageNumber).map((page, index) => {
                      if (page === '...') {
                        return <span key={index} className="text-slate-400 px-1">...</span>;
                      }

                      const isCurrent = page === pageNumber;

                      return (
                        <Button
                          key={index}
                          onClick={() => setPageNumber(page)}
                          className={`h-7 w-7 font-bold text-xs p-0 shadow-none transition-all ${isCurrent
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-transparent text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          {page}
                        </Button>
                      );
                    })}

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextPage}
                      disabled={!pagination || pageNumber >= pagination.totalPage}
                      className={`h-7 w-7 text-slate-400 hover:bg-slate-50 ${(!pagination || pageNumber >= pagination.totalPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
    </div>
  );
};

export default ContractTable;