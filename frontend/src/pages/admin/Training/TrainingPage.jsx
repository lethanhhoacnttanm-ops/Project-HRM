import React, { useState, useEffect, useCallback } from "react";
import { UserCheck, Plus } from "lucide-react";
import TrainingStats from "../../../components/admin/Training/TrainingStats.jsx";
import TrainingTabs from "../../../components/admin/Training/TrainingTabs.jsx";
import CourseCatalogView from "../../../components/admin/Training/view/CourseCatalogView.jsx";
import TrainingProgramView from "../../../components/admin/Training/view/TrainingProgramView.jsx";
import EmployeeProgressView from "../../../components/admin/Training/view/EmployeeProgressView.jsx";
import TrainingModal from "../../../components/admin/Training/TrainingModal.jsx";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { courseService } from "@/services/course.service.js";
import { employeeService } from '../../../services/employee.service.js';
import { courseprogressService } from "@/services/courseprogress.service.js";



export default function TrainingPage() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("catalog");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "assign" });

  const [dataCourse, setDataCourse] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);
  const [dataCourseProgress, setDataCourseProgress] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize] = useState(5);

  const [paginationInfo, setPaginationInfo] = useState({ total: 0, totalPage: 1 });

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "assign", data: null });

  const fetchCourses = useCallback(async () => {
    try {
      const res = await courseService.getAllCourses(pageNumber, pageSize);
      if (res?.success) {
        setDataCourse(res.dataCourse);
        setPaginationInfo(res.pagination || { totalCourse: 0, totalPage: 1 });
      } else {
        setDataCourse([]);
      }
    } catch (error) {
      setDataCourse([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách nhân viên!',
      });
    }
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchCourses();
  }, [pageNumber, pageSize, fetchCourses]);

  const fetchCourseProgress = useCallback(async () => {
    try {
      const response = await courseprogressService.getAllCourseProgressAPI(pageNumber, pageSize)

      if (response?.success) {
        setDataCourseProgress(response.data);
        setPaginationInfo(response.pagination || { totalCourse: 0, totalPage: 1 });
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách course progress:", error);
      const errorMsg = error.response?.data?.message || "Không thể tải dữ liệu tiến độ!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourseProgress(pageNumber, pageSize);
  }, [pageNumber, pageSize, fetchCourseProgress]);

  const fetchManagers = useCallback(async () => {
    try {

      const res = await employeeService.getAllEmployees(pageNumber, pageSize, 'MANAGER');
      if (res?.success) {
        setManagerOptions(res.dataEmp);
      } else {
        setManagerOptions([]);
      }
    } catch (error) {
      setManagerOptions([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách trưởng phòng!',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchManagers(pageNumber, pageSize);
  }, [pageNumber, pageSize, fetchManagers]);

  const handleCreateCourse = async (values) => {
    try {
      const response = await courseService.createCourse(values);

      if (response.success) {
        toast.success("Tạo khóa học thành công vào lộ trình!");
      }
    } catch (error) {
      console.error("Lỗi tạo khóa học:", error);
      toast.error(error.message || "Có lỗi xảy ra khi tạo khóa học!");
    }
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Đào tạo & Phát triển
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý việc nâng cao kỹ năng, chứng chỉ và nguồn tài liệu giáo dục cho nhân viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("assign")}
            className="flex items-center gap-2 border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
          >
            <UserCheck className="w-4 h-4 text-slate-500" />
            <span>Phân công đào tạo</span>
          </Button>

          <Button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo khóa học mới</span>
          </Button>
        </div>
      </div>

      <TrainingStats />

      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white p-6 space-y-6">
        <TrainingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "catalog" && <CourseCatalogView dataCourse={dataCourse} pagination={paginationInfo} pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} />}
        {activeTab === "program" && (
          <TrainingProgramView onOpenModal={() => openModal("create")} />
        )}
        {activeTab === "progress" && <EmployeeProgressView dataCourseProgress={dataCourseProgress} pagination={paginationInfo} pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} onSelectCourseProgress={openModal} />}
      </div>

      {modalState.isOpen && (
        <TrainingModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          mode={modalState.mode}
          loading={loading}
          detailsProcessCourse={modalState.data || {}}
          dataCourse={dataCourse}
          dataManager={managerOptions}
          onSubmit={handleCreateCourse}
        />
      )}
    </div>
  );
}