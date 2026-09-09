import React, { useState, useEffect, useCallback } from "react";
import { Download, Calendar } from "lucide-react";
import AttendanceStats from "../../../components/admin/Attendance/AttendanceStats.jsx";
import AttendanceTabs from "../../../components/admin/Attendance/AttendanceTabs.jsx";
import DailyAttendanceView from "../../../components/admin/Attendance/views/DailyAttendanceView.jsx";
import ShiftManagementView from "../../../components/admin/Attendance/views/ShiftManagementView.jsx";
import EditRequestsView from "../../../components/admin/Attendance/views/EditRequestsView.jsx";
import AttendanceModal from "../../../components/admin/Attendance/AttendanceModal.jsx";
import { Button } from "@/components/ui/button";

import shiftService from "@/services/shift.service.js";
import { attendanceService } from "@/services/attendance.service.js";
import { employeeService } from "@/services/employee.service.js";

import { toast } from 'sonner';

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("daily");
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "export",
  });
  const [loading, setLoading] = useState(true)
  const [dataShift, setDataShift] = useState([]);
  const [dataAttendance, setDataAttendance] = useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [shiftPagination, setShiftPagination] = useState({ totalShift: 0, totalPage: 1 });
  const [attendancePage, setAttendancePage] = useState(1);
  const [attendancePagination, setAttendancePagination] = useState({ totalAttendance: 0, totalPage: 1 });
  const pageSize = 4

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "export", data: null });

  const fetchShifts = useCallback(async () => {
    try {
      const res = await shiftService.getAllShift(pageNumber, pageSize);
      console.log("Dữ liệu API trả về:", res);
      if (res && res.success) {
        setDataShift(res.dataShift || []);

        if (res.pagination) {
          setShiftPagination(res.pagination);
        }
      } else {
        setDataShift([]);
      }
    } catch (error) {
      setDataShift([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách ca quản lý!',
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchShifts(pageNumber);
  }, [pageNumber]);

  const fetchAttendance = useCallback(async () => {
    try {
      const res = await attendanceService.FindWithPagination(attendancePage, pageSize);
      if (res && res.success) {
        setDataAttendance(res.dataAttendance || []);

        if (res.pagination) {
          setAttendancePagination(res.pagination);
        }
      } else {
        setDataAttendance([]);
      }
    } catch (error) {
      setDataAttendance([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách chấm công!',
      });
    } finally {
      setLoading(false);
    }
  }, [attendancePage, pageSize]);

  useEffect(() => {
    fetchAttendance(attendancePage);
  }, [attendancePage]);

  useEffect(() => {
    const fetchEmps = async () => {
      try {
        const allListEmpRes = await employeeService.getAllDataEmpForBenefit('EMPLOYEE');
        if (allListEmpRes?.success) {
          setDataEmployee(allListEmpRes.dataEmp || []);
        }
      } catch (error) {
        console.error("Lỗi API nhân viên:", error);
      }
    };

    fetchEmps();
  }, []);

  const handleCreateShiftSubmit = async (values) => {
    try {
      const response = await shiftService.createShift(values);

      if (response.success) {
        toast.success("Tạo ca làm việc thành công!");
        fetchShifts();
      }
    } catch (error) {
      console.error("Lỗi tạo ca:", error);
      toast.error(error.message || "Có lỗi xảy ra khi tạo ca!");
    }
  };
  
  const statsMetrics = {
    totalEmp: dataEmployee.length,
    onTime: dataAttendance.filter((item) => item.status === "Đúng giờ").length,
    onTimeRate: dataAttendance.length > 0 ? Math.round((dataAttendance.filter((item) => item.status === "Đúng giờ").length / dataAttendance.length) * 100) : 0,
    lateOrEarly: dataAttendance.filter((item) => item.status === "Đi muộn" || item.status === "Về sớm").length,
    absent: dataAttendance.filter((item) => item.status === "Vắng mặt").length,
  };
  return (
    <div className="space-y-6 p-6 bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Calendar className="size-6 text-indigo-600 dark:text-indigo-400" />
            Quản lý Chấm công
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Theo dõi thời gian làm việc, ca trực và chuyên cần của nhân viên.
          </p>
        </div>

        <Button
          onClick={() => openModal("export")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all self-start sm:self-auto cursor-pointer border-0"
        >
          <Download className="w-4 h-4" />
          <span>Xuất báo cáo</span>
        </Button>
      </div>

      <AttendanceStats statsData={statsMetrics}/>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm bg-white dark:bg-slate-900 p-6 space-y-6">
        <AttendanceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "daily" && <DailyAttendanceView dataAttendance={dataAttendance} pagination={attendancePagination} pageSize={4} pageNumber={attendancePage} setPageNumber={setAttendancePage} />}
        {activeTab === "shifts" && (
          <ShiftManagementView onOpenModal={() => openModal("create_shift")} dataShift={dataShift} pagination={shiftPagination} pageSize={4} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        )}
        {activeTab === "requests" && <EditRequestsView />}
      </div>

      <AttendanceModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        onSubmit={handleCreateShiftSubmit}
      />
    </div>
  );
}