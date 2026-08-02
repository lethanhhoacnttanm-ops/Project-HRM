import React, { useState } from "react";
import DepartmentStats from "../../../components/admin/Department/DepartmentStats.jsx";
import DepartmentTabView from "../../../components/admin/Department/DepartmentTabView.jsx";
import DepartmentFilter from "../../../components/admin/Department/DepartmentFilter.jsx";
import DepartmentTable from "../../../components/admin/Department/DepartmentTable.jsx";
import DepartmentHierarchy from "../../../components/admin/Department/DepartmentHierarchy.jsx";
import DepartmentModal from "../../../components/admin/Department/DepartmentModal.jsx";

export default function DepartmentPage() {
  const [viewMode, setViewMode] = useState("table"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Quản lý phòng ban
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tổ chức và quản lý các phòng ban và cơ cấu đội nhóm trong công ty của bạn.
          </p>
        </div>

        <DepartmentTabView viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <DepartmentStats />

      {viewMode === "table" ? (
        <div className="space-y-4">
          <DepartmentFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
          <DepartmentTable
            onSelectDepartment={(dept) => setSelectedDepartment(dept)}
          />
        </div>
      ) : (
        <DepartmentHierarchy />
      )}

      <DepartmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm phòng ban mới"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên phòng ban
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Engineering & Tech"
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mã chi phí (Cost Center)
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Cost Center: 4022"
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Trưởng phòng
            </label>
            <select className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Sarah Mitchell</option>
              <option>David Chen</option>
              <option>Elena Rodriguez</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Lưu phòng ban
            </button>
          </div>
        </form>
      </DepartmentModal>

      <DepartmentModal
        isOpen={!!selectedDepartment}
        onClose={() => setSelectedDepartment(null)}
        title="Chi tiết phòng ban"
      >
        {selectedDepartment && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="text-slate-500">Tên phòng ban:</p>
              <p className="font-bold text-slate-800 text-sm">{selectedDepartment.name}</p>
            </div>
            <div>
              <p className="text-slate-500">Mã chi phí:</p>
              <p className="font-semibold text-slate-700">{selectedDepartment.costCenter}</p>
            </div>
            <div>
              <p className="text-slate-500">Trưởng phòng:</p>
              <p className="font-semibold text-slate-700">{selectedDepartment.managerName}</p>
            </div>
            <div>
              <p className="text-slate-500">Số lượng thành viên:</p>
              <p className="font-semibold text-indigo-600">{selectedDepartment.members}</p>
            </div>
          </div>
        )}
      </DepartmentModal>
    </div>
  );
}