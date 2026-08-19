import React, { useState } from "react";
import { Info, Star, Download, Filter, Inbox, User2, ChevronRight, ChevronLeft, MoreVertical, Eye, CheckCircle2, AlertCircle, XCircle, X } from "lucide-react";
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
import { checkPromotionEligibility } from "@/utils/checkPromotionEligibility";


export default function EligibilityTable({ dataPromotion, pageSize, pagination, pageNumber, setPageNumber, onSubmitUpdatePromotion }) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
    setActiveMenuId(null);
  };

  const [surveyedEmployee, setSurveyedEmployee] = useState(null);

  const surveyResult = surveyedEmployee ? checkPromotionEligibility(surveyedEmployee) : null;

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
    <div className="space-y-4">
      {!surveyedEmployee ? (
          <div className="p-4 bg-indigo-50/50 dark:bg-slate-900/40 border border-indigo-100 dark:border-slate-800 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Yêu cầu tối thiểu</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Thời gian công tác &gt; 2 năm • Xếp hạng hiệu suất &gt; 4.0 • Đạt KPI &gt; 90%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto">
            <Button 
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Lọc theo phòng ban</span>
            </Button>
            <Button 
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Danh sách xuất khẩu</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all animate-in fade-in-50 duration-200 ${
          surveyResult.isPassed 
            ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200' 
            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-1.5 rounded-full mt-0.5 shrink-0 ${
              surveyResult.isPassed ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300'
            }`}>
              {surveyResult.isPassed ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold">
                  Kết quả khảo sát: {surveyedEmployee.name}
                </h4>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                  surveyResult.isPassed ? 'bg-blue-200 text-blue-800' : 'bg-rose-200 text-rose-800'
                }`}>
                  {surveyResult.isPassed ? "ĐẠT TIÊU CHUẨN" : "CHƯA ĐẠT"}
                </span>
              </div>
              <p className="text-xs mt-1 opacity-90">
                Vị trí mục tiêu: <span className="font-semibold">{surveyedEmployee.proposedLevel}</span> • 
                Thâm niên thực tế: <span className="font-semibold">{surveyedEmployee.gradetenure} năm</span> (Cần ≥ {surveyResult.requiredTenure}) • 
                Hiệu suất: <span className="font-semibold">{surveyedEmployee.performanceRating} ⭐</span> (Cần ≥ {surveyResult.requiredScore})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            {surveyResult.isPassed && (
              <Button 
                onClick={() => {
                  if (typeof onSubmitUpdatePromotion === 'function') {
                    onSubmitUpdatePromotion(surveyedEmployee._id || surveyedEmployee.id, { status: 'WAITING' });
                  }
                  setSurveyedEmployee(null);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer"
              >
                Duyệt đề xuất
              </Button>
            )}
            {!surveyResult.isPassed && (
              <Button 
                onClick={() => {
                  if (typeof onSubmitUpdatePromotion === 'function') {
                    onSubmitUpdatePromotion(surveyedEmployee._id || surveyedEmployee.id, { status: 'REJECTED' });
                  }
                  setSurveyedEmployee(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Từ chối đề xuất</span>
              </Button>
            )}
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setSurveyedEmployee(null)}
              className="h-8 w-8 hover:bg-black/5 rounded-lg cursor-pointer"
              title="Đóng bảng khảo sát"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm">
            <TableHeader className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-3 px-6">Nhân sự</TableHead>
                <TableHead className="py-3 px-4">Vị trí hiện tại</TableHead>
                <TableHead className="py-3 px-4">Số năm giữ chức</TableHead>
                <TableHead className="py-3 px-4">Hiệu suất</TableHead>
                <TableHead className="py-3 px-4">Trạng thái</TableHead>
                <TableHead className="py-3 px-4 text-right">Actions</TableHead>
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

                    <TableCell className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {row?.gradetenure} năm
                    </TableCell>

                    <TableCell className="py-4 px-4">
                      <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                        <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                        <span>{row?.performanceRating}</span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-500`}>
                        {row.status === "APPROVED_PENDING_EFFECTIVE" ? "Chờ duyệt" : "???"}
                      </span>
                    </TableCell>

                    <TableCell className="py-4 px-4 text-center relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setActiveMenuId(activeMenuId === row.id ? null : row.id)}
                        className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>

                      {activeMenuId === row.id && (
                        <div className="absolute right-8 top-12 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-30 p-1 text-left animate-in fade-in-50 zoom-in-95 duration-150">
                          <Button
                            onClick={() => {
                              setSurveyedEmployee(row);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium bg-white text-slate-700 dark:text-slate-200 hover:bg-red-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-red-700" />
                            <span className=" text-red-700">Khảo sát điều kiện</span>
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-36 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                      <Inbox className="w-10 h-10 stroke-1" />
                      <p className="text-sm font-medium">Không có dữ liệu kiểm tra điều kiện nào.</p>
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
    </div>
  );
}