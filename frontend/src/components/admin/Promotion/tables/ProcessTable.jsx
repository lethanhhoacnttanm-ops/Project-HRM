import React, { useState } from "react";
import { Star, MoreVertical, ChevronLeft, ChevronRight, User2, Inbox, FileQuestion } from "lucide-react";
import PromotionModal from "../PromotionModal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'

export default function PromotionTable({ dataPromotion, pageSize, pagination, pageNumber, setPageNumber, onSubmitUpdatePromotion }) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
    setActiveMenuId(null);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < pagination.totalPages) setPageNumber(pageNumber + 1);
  };

  const handleGoToPage = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  const handleCheckAndNextStep = async (row) => {
    try {
      let nextStatus = 'APPROVED_PENDING_EFFECTIVE';
      if (row.status === 'PENDING_REVIEW') {
        nextStatus = 'APPROVED_PENDING_EFFECTIVE';
      } else if (row.status === 'APPROVED_PENDING_EFFECTIVE') {
        nextStatus = 'WAITING';
      } else if (row.status === 'WAITING') {
        nextStatus = 'COMPLETED';
      }

      const payload = {
        status: nextStatus,
      };

      if (typeof onSubmitUpdatePromotion === 'function') {
        onSubmitUpdatePromotion(row._id || row.id, payload);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error(error.toast || "Không thể cập nhật trạng thái lúc này!");
    }
  };

  return (
    <div className="bg-white rounded-2xl border dark:border-gray-800 border-gray-300 shadow-xs overflow-hidden dark:bg-gray-900">
      <Table className="w-full text-left text-sm">
        <TableHeader className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-medium">
          <TableRow className="border-b border-slate-200 dark:border-slate-800">
            <TableHead className="py-3 px-6">Nhân sự</TableHead>
            <TableHead className="py-3 px-4">Hiện tại / Vị trí</TableHead>
            <TableHead className="py-3 px-4">Đề xuất / Vị trí</TableHead>
            <TableHead className="py-3 px-4">Phòng ban</TableHead>
            <TableHead className="py-3 px-4">Quản lý / Điểm số</TableHead>
            <TableHead className="py-3 px-4">Trạng thái</TableHead>
            <TableHead className="py-3 px-4 text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
          {Array.isArray(dataPromotion) && dataPromotion.length > 0 ? (
            dataPromotion.map((row) => (
              <TableRow
                key={row._id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors"
              >
                <TableCell className="flex items-center gap-3 cursor-pointer group py-3.5 px-4">
                  <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:border-blue-500 transition-colors">
                    <User2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{row?.nameEmployee}</p>
                    <p className="text-xs text-slate-400">{row?.emailEmployee}</p>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-4 font-medium text-slate-600 dark:text-slate-400">
                  {row?.currentLevel} {row?.currentPosition}
                </TableCell>

                <TableCell className="py-4 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                  {row?.proposedLevel} {row?.currentPosition}
                </TableCell>

                <TableCell className="py-4 px-4 text-slate-600 dark:text-slate-400 max-w-37.5 leading-tight">
                  {row?.currentDepartment}
                </TableCell>

                <TableCell className="py-4 px-4">
                  <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span>{row?.performanceRating}</span>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gray-400 text-white`}>
                    {row.status === "PENDING_REVIEW" ? "Chờ kiểm tra" : "???"}
                  </span>
                </TableCell>

                <TableCell className="py-4 px-4 text-center relative">
                  <Button
                    onClick={() => handleCheckAndNextStep(row)}
                    className="p-1.5 text-white bg-blue-600 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Kiểm tra
                  </Button>

                  {/* {activeMenuId === row.id && (
                  <div className="absolute right-6 top-12 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-20 py-1 text-left">
                    <button
                      onClick={() => handleOpenDetail(row)}
                      className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => setActiveMenuId(null)}
                      className="w-full px-4 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-left"
                    >
                      Duyệt đề xuất
                    </button>
                  </div>
                )} */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-36 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                  <Inbox className="w-10 h-10 stroke-1" />
                  <p className="text-sm font-medium">Không có dữ liệu đề xuất nào.</p>
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

      <PromotionModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Chi tiết đề xuất thăng tiến"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <img src={selectedUser.avatar} className="w-12 h-12 rounded-full" />
              <div>
                <h4 className="font-bold text-slate-800">{selectedUser.name}</h4>
                <p className="text-xs text-slate-500">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Vị trí hiện tại:</span>
                <p className="font-semibold text-slate-700">{selectedUser.currentPos}</p>
              </div>
              <div>
                <span className="text-slate-400">Vị trí đề xuất:</span>
                <p className="font-semibold text-indigo-600">{selectedUser.proposedPos}</p>
              </div>
              <div>
                <span className="text-slate-400">Phòng ban:</span>
                <p className="font-semibold text-slate-700">{selectedUser.department}</p>
              </div>
              <div>
                <span className="text-slate-400">Điểm đánh giá:</span>
                <p className="font-semibold text-emerald-600">★ {selectedUser.score}</p>
              </div>
            </div>
          </div>
        )}
      </PromotionModal>
    </div>
  );
}