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

const CandidateBoard = ({ candidates = [], onOpenModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
      {columns.map((col) => {
        const colCandidates = candidates.filter((c) => c.stage === col.id);

        return (
          <div key={col.id} className="bg-slate-50/70 p-3 rounded-2xl border border-gray-200 min-h-125">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className={`px-3 py-1 rounded-xl text-xs font-bold ${col.color}`}>
                {col.title} ({colCandidates.length})
              </span>
            </div>

            <div className="space-y-3">
              {colCandidates.map((can) => (
                <div
                  key={can.id}
                  onClick={() => onOpenModal(can)}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm hover:text-indigo-600 transition-colors">
                        {can.name}
                      </h4>
                      <p className="text-xs text-indigo-600 font-semibold">{can.jobTitle}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors outline-none"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      
                      <DropdownMenuContent align="end" className="w-48 rounded-xl">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenModal(can);
                          }}
                          className="cursor-pointer gap-2 text-xs font-semibold"
                        >
                          <Eye className="h-4 w-4 text-gray-500" />
                          Xem chi tiết CV
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-pointer gap-2 text-xs font-semibold"
                        >
                          <ArrowRight className="h-4 w-4 text-blue-500" />
                          Chuyển bước tiếp theo
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-pointer gap-2 text-xs font-semibold text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          <XCircle className="h-4 w-4" />
                          Từ chối ứng viên
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="text-[11px] text-gray-400 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> {can.email}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> {can.phone}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-gray-400 font-medium">Nộp: {can.appliedDate}</span>
                    <Badge variant="secondary" className="rounded-md text-[10px] font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 gap-1 border-0">
                      <Paperclip className="h-3 w-3" /> CV
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CandidateBoard;