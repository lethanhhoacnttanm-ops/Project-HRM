import React, { useState, useEffect } from "react";
import DepartmentStats from "../../../components/admin/Department/DepartmentStats.jsx";
import DepartmentTabView from "../../../components/admin/Department/DepartmentTabView.jsx";
import DepartmentFilter from "../../../components/admin/Department/DepartmentFilter.jsx";
import DepartmentHierarchy from "../../../components/admin/Department/DepartmentHierarchy.jsx";
import DepartmentModal from "../../../components/admin/Department/DepartmentModal.jsx";
import DepartmentTable from "../../../components/admin/Department/DepartmentTable.jsx";

import { employeeService } from '../../../services/employee.service.js';
import { departmentService } from "../../../services/department.service.js";
import { positionService } from "../../../services/position.service.js";

import { toast } from "sonner";


export default function DepartmentPage() {
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [pageNumber] = useState(1);

  const [pageSize] = useState(5);

  const [managerOptions, setManagerOptions] = useState([]);

  const [dataDepartment, setDataDepartment] = useState([])

  const [dataPosition, setDataPosition] = useState([])

  const [dataEmployee, setDataEmployee] = useState([])
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);

  const [modalState, setModalState] = useState({ isOpen: false, mode: 'create', data: null });

  useEffect(() => {
    if (modalState.isOpen && modalState.mode === "create") {
      const fetchManagers = async () => {
        try {

          const res = await employeeService.getAllEmployees(pageNumber, pageSize, 'MANAGER');
          if (res?.success) {
            setManagerOptions(res.dataEmp);
          } else {
            setManagerOptions([]);
          }
        } catch (error) {
          setEmployees([]);
          toast.error('Thất bại', {
            description: error.message || 'Không thể lấy danh sách trưởng phòng!',
          });
        }
      };

      fetchManagers();
    }
  }, []);

  useEffect(() => {
    if (viewMode === "table") {
      const fetchEmployee = async () => {
        try {

          const res = await employeeService.getAllEmployees(pageNumber, pageSize, 'EMPLOYEE');
          if (res?.success) {
            setDataEmployee(res.dataEmp);
          } else {
            setDataEmployee([]);
          }
        } catch (error) {
          setDataEmployee([]);
          toast.error('Thất bại', {
            description: error.message || 'Không thể lấy danh sách nhân viên!',
          });
        }
      };

      fetchEmployee();
    }
  }, []);

  useEffect(() => {
    if (viewMode === "table") {
      const fetchDepartment = async () => {
        try {
          const res = await departmentService.getAllList();
          if (res?.success) {
            setDataDepartment(res?.dataList);
          } else {
            setDataDepartment([]);
          }
        } catch (error) {
          toast.error('Thất bại', {
            description: error.message || 'Không thể lấy danh sách phòng ban!',
          });
        }
      };

      fetchDepartment();
    }
  }, []);

  useEffect(() => {
    if (viewMode === "table") {
      const fetchPosition = async () => {
        try {
          const res = await positionService.getAllList();
          if (res?.success) {
            setDataPosition(res?.dataList);
          } else {
            setDataPosition([]);
          }
        } catch (error) {
          toast.error('Thất bại', {
            description: error.message || 'Không thể lấy danh sách vị trí cho phòng ban!',
          });
        }
      };

      fetchPosition();
    }
  }, []);


  const handleOpenModal = (mode, data) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'create', data: null });
  };

  const handleCreateDepartment = async (formData) => {
    try {
      console.log('Dữ liệu cha nhận được từ con:', formData);

      const res = await departmentService.createDepartment(formData);

      toast.success('Đăng ký thành công!', {
        description: res.message || `Tài khoản nhân viên ${res.data?.fullName} đã được khởi tạo.`,
        position: 'top-right',
        duration: 3000,
      });
      handleCloseModal();

    } catch (error) {
      const responseData = error.response?.data;

      if (responseData?.errors && Array.isArray(responseData.errors)) {
        responseData.errors.forEach(err => {
          toast.error('Dữ liệu không hợp lệ', {
            description: err.message || JSON.stringify(err)
          });
        });
        return;
      }

      const errorMsg = responseData?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      toast.error('Đăng ký thất bại!', {
        description: errorMsg,
      });
    }
  };

  const handleCreatePosition = async (formData) => {
    try {
      console.log('Dữ liệu cha nhận được từ con:', formData);

      const res = await positionService.createPosition(formData);

      toast.success('Tạo mới vị trí thành công!', {
        description: res.message,
        position: 'top-right',
        duration: 3000,
      });
      handleCloseModal();

    } catch (error) {
      const responseData = error.response?.data;

      if (responseData?.errors && Array.isArray(responseData.errors)) {
        responseData.errors.forEach(err => {
          toast.error('Dữ liệu không hợp lệ', {
            description: err.message || JSON.stringify(err)
          });
        });
        return;
      }

      const errorMsg = responseData?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      toast.error('Đăng ký thất bại!', {
        description: errorMsg,
      });
    }
  };

  const handleDepartmentChange = (deptId) => {
    const matched = positionOptions.filter(
      (pos) => pos.departmentId === deptId || pos.departmentId?._id === deptId
    );
    setFilteredPositions(matched);
  };

  const handleSelectPosition = (posId) => {
    console.log("Đang chọn vị trí với ID:", posId);
    const selectedPos = dataPosition?.find(
      (p) => p._id === posId || p.value === posId
    );
    console.log("Vị trí tìm thấy:", selectedPos);

    if (selectedPos && selectedPos.allowedLevels) {
      console.log("Levels tìm thấy:", selectedPos.allowedLevels);
      setLevelOptions(
        selectedPos.allowedLevels.map((lvl) => ({
          value: lvl,
          label: lvl,
        }))
      );
    } else {
      console.log("Không tìm thấy AllowedLevels cho vị trí này!");
      setLevelOptions([]);
    }
  };

  const handleAssignEmployee = async (payload) => {
    try {
      console.log("🚀 Đang gửi payload gán nhân sự:", payload);

      const response = await employeeService.assignEmployee(payload);

      if (response && response.success) {
        toast.success(response.message || "Gán nhân sự vào phòng ban thành công!");

        handleCloseModal();
      }
    } catch (error) {
      console.error("❌ Lỗi khi gán nhân sự:", error);
      toast.error(error?.response?.data?.error || "Gán nhân sự thất bại, vui lòng thử lại!");
    }
  };


  return (
    <div className="space-y-6 p-2">
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
            onOpenAddModal={handleOpenModal}
          />
          <DepartmentTable
            onSelectDepartment={handleOpenModal}
            departments={dataDepartment}
            positions={dataPosition}
          />
        </div>
      ) : (
        <DepartmentHierarchy />
      )}

      <DepartmentModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        managerOptions={managerOptions}

        onSubmit={handleCreateDepartment}
        onSubmitPosition={handleCreatePosition}
        onSubmitLevel={handleSelectPosition}
        onSubmitDepartmentChange={handleDepartmentChange}
        onSubmitEmployee={handleAssignEmployee}

        departments={modalState.data}
        departmentOptions={dataDepartment}
        employeeOptions={dataEmployee}
        positionOptions={dataPosition}
        levelOptions={levelOptions}
      />
    </div>
  );
}