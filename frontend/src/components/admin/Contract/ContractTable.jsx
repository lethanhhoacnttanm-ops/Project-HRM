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

const ContractTable = ({ contracts, onOpenModal, pageNumber, setPageNumber, pagination, pageSize  }) => {

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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse text-xs font-semibold">
          <TableHeader>
            <TableRow className="bg-slate-50/80 border-b border-gray-200 text-gray-700 font-exTableRowabold">
             {console.log(contracts)}
              <TableHead className="py-3.5 px-5">ID</TableHead>
              <TableHead className="py-3.5 px-5">Tên</TableHead>
              <TableHead className="py-3.5 px-5">Loại</TableHead>
              <TableHead className="py-3.5 px-5">Ngày bắt đầu</TableHead>
              <TableHead className="py-3.5 px-5">Ngày kết thúc</TableHead>
              <TableHead className="py-3.5 px-5">Trạng thái</TableHead>
              <TableHead className="py-3.5 px-5 text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {contracts.map((item) => (
              <TableRow key={item._id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="py-3.5 px-5 font-bold text-gray-600">{item.contractCode}</TableCell>

                <TableCell className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{item?.employee?.fullName}</div>
                      <div className="text-[11px] text-gray-400 font-normal">{item?.employee?.email}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3.5 px-5">
                  <Badge
                    variant="outline"
                    className={`border-0 px-3 py-1 rounded-xl text-[11px] font-bold ${
                      item.type === 'Fulltime'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {item.type}
                  </Badge>
                </TableCell>

                <TableCell className="py-3.5 px-5 text-gray-600">{dayjs(item.startDate).format("DD/MM/YY")}</TableCell>
                <TableCell className="py-3.5 px-5 text-gray-600">{dayjs(item.endDate).format("DD/MM/YY")}</TableCell>

                <TableCell className="py-3.5 px-5">
                  {item.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-gray-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Đang nghỉ
                    </span>
                  )}
                </TableCell>

                <TableCell className="py-3.5 px-5 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align="end" className="w-48 rounded-xl">
                      <DropdownMenuItem
                        onClick={() => onOpenModal('detail', item)}
                        className="cursor-pointer gap-2 text-xs font-semibold"
                      >
                        <Eye className="h-4 w-4 text-gray-500" />
                        Xem chi tiết hợp đồng
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onOpenModal('cancel', item)}
                        className="cursor-pointer gap-2 text-xs font-semibold text-red-600 focus:text-red-600 focus:bg-red-50"
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
          <TableRow>
            <TableCell colSpan={7} className="p-0">
              <div className="p-4 border-t border-gray-100 bg-slate-50/30 flex items-center justify-between text-xs text-gray-500 w-full">
                <span>1 - {pageSize} trên {contracts.length} hợp đồng</span>

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
    </div>
  );
};

export default ContractTable;