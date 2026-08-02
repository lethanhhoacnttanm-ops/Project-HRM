import React, { useState } from "react";
import { Star, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import PromotionModal from "../PromotionModal";

const initialData = [
  {
    id: 1,
    name: "Marcus Chen",
    email: "marcus.c@hrm.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    currentPos: "Senior Designer",
    proposedPos: "Design Lead",
    department: "Creative Services",
    score: "4.8",
    status: "Tán thành",
    statusColor: "bg-teal-100 text-teal-700",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    email: "elena.r@hrm.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    currentPos: "QA Engineer",
    proposedPos: "Senior QA Lead",
    department: "Product Engineering",
    score: "4.5",
    status: "Đánh giá",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    id: 3,
    name: "David Okoro",
    email: "david.o@hrm.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    currentPos: "Accountant",
    proposedPos: "Finance Manager",
    department: "Administration",
    score: "4.9",
    status: "Chưa giải quyết",
    statusColor: "bg-rose-100 text-rose-600",
  },
];

export default function PromotionTable() {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
    setActiveMenuId(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-b-xl border-t-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="py-3 px-6">Nhân sự</th>
              <th className="py-3 px-4">Hiện tại / Vị trí</th>
              <th className="py-3 px-4">Đề xuất / Vị trí</th>
              <th className="py-3 px-4">Phòng ban</th>
              <th className="py-3 px-4">Quản lý / Điểm số</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {initialData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{row.name}</p>
                      <p className="text-xs text-slate-400">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-slate-600">{row.currentPos}</td>
                <td className="py-4 px-4 font-bold text-indigo-600">{row.proposedPos}</td>
                <td className="py-4 px-4 text-slate-600 max-w-37.5 leading-tight">
                  {row.department}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 font-semibold text-slate-800">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span>{row.score}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${row.statusColor}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === row.id ? null : row.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {activeMenuId === row.id && (
                    <div className="absolute right-6 top-12 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 text-left">
                      <button
                        onClick={() => handleOpenDetail(row)}
                        className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => setActiveMenuId(null)}
                        className="w-full px-4 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
                      >
                        Duyệt đề xuất
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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