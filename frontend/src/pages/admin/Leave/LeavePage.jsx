import React, { useState, useEffect, useCallback } from "react";
import { Download, Plus } from "lucide-react";
import LeaveStats from "../../../components/admin/LeaveManagement/LeaveStats.jsx";
import LeaveFilter from "../../../components/admin/LeaveManagement/LeaveFilter.jsx";
import LeaveTable from "../../../components/admin/LeaveManagement/LeaveTable.jsx";
import QuickApproveWidget from "../../../components/admin/LeaveManagement/QuickApproveWidget.jsx";
import LeaveCalendarWidget from "../../../components/admin/LeaveManagement/LeaveCalendarWidget.jsx";
import ManagementTipWidget from "../../../components/admin/LeaveManagement/ManagementTipWidget.jsx";
import LeaveModal from "../../../components/admin/LeaveManagement/LeaveModal.jsx";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { leaveService } from "@/services/leave.service.js";

export default function LeavePage() {
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create" });

  const [dataLeave, setDataLeave] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [leavePagination, setLeavePagination] = useState({ totalLeave: 0, totalPage: 1 });
  const pageSize = 4

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "create", data: null });

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await leaveService.FindWithPagination(pageNumber, pageSize);
      if (res && res.success) {
        setDataLeave(res.dataLeave || []);

        if (res.pagination) {
          setLeavePagination(res.pagination);
        }
      } else {
        setDataLeave([]);
      }
    } catch (error) {
      setDataLeave([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách đơn xin nghỉ!',
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchLeaves();
  }, [pageNumber, fetchLeaves]);

  const handleUpdateLeaveStatus = async ({ id, status }) => {
    try {
      const res = await leaveService.updateLeaveStatus(id, status);

      if (res && res.success) {
        setDataLeave(prevData =>
          prevData.map(item => (item._id === id ? (res.data || { ...item, status }) : item))
        );

        toast.success('Thành công', { description: 'Đã cập nhật trạng thái đơn!' });
      } else {
        toast.error('Thất bại', { description: res?.message || 'Không thể cập nhật trạng thái!' });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn:", error);
      toast.error('Thất bại', { description: error.customMessage || 'Có lỗi xảy ra!' });
    }
  };


  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Quản lý nghỉ phép
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi và phê duyệt các yêu cầu nghỉ phép của nhân viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("export")}
            className="flex items-center gap-2 border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Xuất báo cáo</span>
          </Button>

          <Button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo yêu cầu mới</span>
          </Button>
        </div>
      </div>

      <LeaveStats />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 space-y-6">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <LeaveFilter
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
            />
            <LeaveTable dataLeave={dataLeave} pageNumber={pageNumber} pageSize={4} pagination={leavePagination} setPageNumber={setPageNumber} onOpenModal={openModal} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <LeaveCalendarWidget />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <QuickApproveWidget dataLeave={dataLeave} onSubmit={handleUpdateLeaveStatus} />
          <ManagementTipWidget />
        </div>
      </div>

      <LeaveModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        dataLeave={modalState.data}
      />
    </div>
  );
}