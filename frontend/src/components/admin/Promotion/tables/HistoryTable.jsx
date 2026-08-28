import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter
} from "@/components/ui/table";
import { Inbox, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from '@/components/ui/button';
export default function HistoryTable({  dataPromotion, pageSize, pagination, pageNumber, setPageNumber}) {

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pagination?.totalPages && pageNumber < pagination.totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleGoToPage = (targetPage) => {
    setPageNumber(targetPage);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full text-left text-sm">
          <TableHeader className="bg-slate-50 dark:bg-gray-800/60 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-800">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-3 px-6 dark:text-white">Nhân sự</TableHead>
              <TableHead className="py-3 px-4 dark:text-white">Vai trò trước đó</TableHead>
              <TableHead className="py-3 px-4 dark:text-white">Vai trò mới</TableHead>
              <TableHead className="py-3 px-4 dark:text-white">Ngày có hiệu lực</TableHead>
              <TableHead className="py-3 px-4 dark:text-white">Được duyệt bởi</TableHead>
              <TableHead className="py-3 px-4 dark:text-white">Loại</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {Array.isArray(dataPromotion) && dataPromotion.length > 0 ? (
              dataPromotion.map((row) => (
                <TableRow 
                  key={row._id} 
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors"
                >
                  <TableCell className="py-4 px-6">
                    <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:border-blue-500 transition-colors">
                        <User2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{row?.nameEmployee}</p>
                        <p className="text-xs text-slate-400">{row?.emailEmployee}</p>
                      </div>
                  </TableCell>

                  <TableCell className="py-4 px-4 text-slate-600 dark:text-slate-400">
                    {row?.currentLevel} {row?.currentPosition}
                  </TableCell>

                  <TableCell className="py-4 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                    {row?.gradetenure} năm
                  </TableCell>

                  <TableCell className="py-4 px-4 text-slate-600 dark:text-slate-400">
                    {row.effectiveDate}
                  </TableCell>

                  <TableCell className="py-4 px-4 text-slate-600 dark:text-slate-400">
                    {row.approvedBy}
                  </TableCell>

                  <TableCell className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full`}>
                      {row.promotionType}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-36 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                    <Inbox className="w-10 h-10 stroke-1" />
                    <p className="text-sm font-medium">Không có dữ liệu lịch sử thăng tiến nào.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
              <TableRow className="border-t border-gray-200 dark:border-gray-800 bg-transparent hover:bg-transparent">
                <TableCell colSpan={7} className="p-0">
                  <div className="p-4 bg-slate-50/30 dark:bg-gray-900 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 w-full">
                    <span>1 - {pageSize} trên {dataPromotion.length} nhân sự</span>

                    <div className="flex items-center gap-1">
                      <Button
                        onClick={handlePrevPage}
                        disabled={pageNumber === 1}
                        className="px-2.5 py-1 rounded-lg border text-black dark:text-gray-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
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
                        <ChevronRight className="w-4 h-4" />
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
}