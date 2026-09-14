import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Download, Plus, CalendarDays } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create" });

  const [dataLeave, setDataLeave] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [dataLeaves, setDataLeaves] = useState([]);
  const [leaveStats, setLeaveStats] = useState({
    todayOnLeave: 0,
    pendingApproval: 0,
    urgentPending: 0,
    avgLeaveDays: 0,
    leavePoolPercent: 84,
  });
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

  const datafilterLeave = useMemo(() => {
    if (!dataLeave) return [];

    return dataLeave.filter((item) => {
      const fullName = item.employee?.fullName?.toLowerCase() || "";
      const email = item.employee?.email?.toLowerCase() || "";
      const department = item.employee?.department?.name?.toLowerCase() || "";
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        department.includes(searchLower);

      const matchesType =
        selectedType === "all" || item.leaveType === selectedType;

      let matchesDate = true;
      if (selectedDate && item.createdAt) {
        const itemDate = new Date(item.createdAt);
        matchesDate =
          itemDate.getDate() === selectedDate.getDate() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear();
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [dataLeave, searchTerm, selectedType, selectedDate]);

  useEffect(() => {
    const fetchLeavesForStats = async () => {
      try {
        const res = await leaveService.getLeavesNoPaging();
        if (res && res.success) {
          const list = res.dataLeaves || [];
          setDataLeaves(list);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const todayCount = list.filter(item => {
            if (item.status !== 'Đã duyệt') return false;

            const start = new Date(item.startDate);
            const end = new Date(item.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);

            return today >= start && today <= end;
          }).length;

          const pendingList = list.filter(item => item.status === 'Chờ duyệt');
          const pendingCount = pendingList.length;

          const urgentCount = pendingList.filter(item => item.isUrgent || item.priority === 'high').length;

          const totalDays = list.reduce((acc, curr) => acc + (curr.numberOfDays || 0), 0);
          const avgDays = list.length > 0 ? (totalDays / list.length).toFixed(1) : 0;

          setLeaveStats({
            todayOnLeave: todayCount,
            pendingApproval: pendingCount,
            urgentPending: urgentCount,
            avgLeaveDays: avgDays,
            leavePoolPercent: 84,
          });
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu thống kê nghỉ phép:", error);
      }
    };

    fetchLeavesForStats();
  }, []);

  const handleUpdateLeaveStatus = async ({ id, status }) => {
    try {
      const res = await leaveService.updateLeaveStatus(id, status);

      const responseData = res.data || res;

      if (responseData && responseData.success) {
        setDataLeave(prevData =>
          prevData.map(item => (item._id === id ? (responseData.data || { ...item, status }) : item))
        );

        toast.success('Thành công', { description: responseData.message || 'Đã cập nhật trạng thái đơn!' });
      } else {
        toast.error('Thất bại', { description: responseData?.message || 'Không thể cập nhật trạng thái!' });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn:", error);
      
      const errorMessage = error.message || error.description || 'Có lỗi xảy ra!';
      toast.error('Thất bại', { description: errorMessage });
    }
  };


  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarDays className="size-6 text-indigo-600" />
            Quản lý nghỉ phép
          </h1>
          <p className="text-xs text-slate-500 mt-1">
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

      <LeaveStats statsData={leaveStats} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 space-y-6">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <LeaveFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <LeaveTable dataLeave={datafilterLeave} pageNumber={pageNumber} pageSize={4} pagination={leavePagination} setPageNumber={setPageNumber} onOpenModal={openModal} />
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