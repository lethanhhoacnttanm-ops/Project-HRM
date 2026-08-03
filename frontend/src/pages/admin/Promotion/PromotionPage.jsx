import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import PromotionStats from "../../../components/admin/Promotion/PromotionStats.jsx";
import PromotionTabs from "../../../components/admin/Promotion/PromotionTabs.jsx";
import PromotionTable from "../../../components/admin/Promotion/PromotionTable.jsx";
import PromotionModal from "../../../components/admin/Promotion/PromotionModal.jsx";
import DepartmentDistribution from "../../../components/admin/Promotion/DepartmentDistribution.jsx";
import PerformanceInsightCard from "../../../components/admin/Promotion/PerformanceInsightCard.jsx";

export default function PromotionPage() {
  const [activeTab, setActiveTab] = useState("process");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Tiến độ thăng tiến
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tổ chức và quản lý các phòng ban và cơ cấu đội nhóm trong công ty của bạn.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Tạo đề xuất thăng tiến</span>
        </button>
      </div>

      <PromotionStats />

      <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <PromotionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <PromotionTable  activeTab={activeTab} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DepartmentDistribution />
        </div>
        <div className="lg:col-span-1">
          <PerformanceInsightCard />
        </div>
      </div>

      <PromotionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Tạo đề xuất thăng tiến mới"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Chọn nhân sự
            </label>
            <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Marcus Chen</option>
              <option>Elena Rodriguez</option>
              <option>David Okoro</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vị trí thăng tiến đề xuất
            </label>
            <input
              type="text"
              placeholder="Nhập vị trí mới..."
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Gửi đề xuất
            </button>
          </div>
        </form>
      </PromotionModal>
    </div>
  );
}