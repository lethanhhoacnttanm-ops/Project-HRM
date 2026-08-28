import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Phone,
  Mail,
  Paperclip,
  Eye,
  ArrowRight,
  XCircle,
} from "lucide-react";

const columns = [
  { id: 'new', title: 'Hồ sơ mới', color: 'bg-purple-100 text-purple-700' },
  { id: 'interview', title: 'Phỏng vấn', color: 'bg-blue-100 text-blue-700' },
  { id: 'evaluating', title: 'Đánh giá / Test', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'offered', title: 'Trúng tuyển (Offer)', color: 'bg-emerald-100 text-emerald-700' },
];

const CandidateBoard = ({ candidates , onOpenModal, onUpdateStage, onReject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
      {columns.map((col) => {
        const colCandidates = candidates.filter((c) => c.stage === col.id);

        return (
          <div key={col.id} className="bg-slate-50/70 dark:bg-gray-900/50 p-3 rounded-2xl border border-gray-200 dark:border-gray-800 min-h-125">
            {console.log(candidates)}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className={`px-3 py-1 rounded-xl text-xs font-bold ${col.color}`}>
                {col.title} ({colCandidates.length})
              </span>
            </div>

            <div className="space-y-3">
              {colCandidates.map((can) => {
                const candidateId = can._id || can.id;

                return (
                  <div
                    key={candidateId}
                    onClick={() => onOpenModal(can)}
                    className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {can.fullName}
                        </h4>
                        
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                          {can.appliedPosition?.role} ({can.appliedPosition?.level})
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors outline-none"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end" className="w-48 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg p-1">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenModal(can);
                            }}
                            className="cursor-pointer gap-2 text-xs font-semibold dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5"
                          >
                            <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            Xem chi tiết CV
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onUpdateStage) onUpdateStage(candidateId, col.id);
                            }}
                            className="cursor-pointer gap-2 text-xs font-semibold dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5"
                          >
                            <ArrowRight className="h-4 w-4 text-blue-500" />
                            Chuyển bước tiếp theo
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="dark:bg-gray-800 my-1" />

                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onReject) onReject(candidateId);
                            }}
                            className="cursor-pointer gap-2 text-xs font-semibold text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/50 rounded-lg px-2 py-1.5"
                          >
                            <XCircle className="h-4 w-4" />
                            Từ chối ứng viên
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="text-[11px] text-gray-400 dark:text-gray-500 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{can.email}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 shrink-0" /> {can.phone}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                        Nộp: {can.appliedDate ? new Date(can.appliedDate).toLocaleDateString('vi-VN') : 'N/A'}
                      </span>
                      
                      {can.cvFileUrl ? (
                        <a 
                          href={can.cvFileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Badge variant="secondary" className="rounded-md text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 gap-1 border-0 cursor-pointer">
                            <Paperclip className="h-3 w-3" /> CV
                          </Badge>
                        </a>
                      ) : (
                        <Badge variant="secondary" className="rounded-md text-[10px] font-semibold bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 gap-1 border-0">
                          Không có CV
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CandidateBoard;