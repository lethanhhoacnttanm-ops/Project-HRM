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

import { Building2 } from "lucide-react";

import { toast } from "sonner";


export default function DepartmentPage() {
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 4

  const [managerOptions, setManagerOptions] = useState([]);

  const [dataDepartment, setDataDepartment] = useState([])

  const [dataPosition, setDataPosition] = useState([])

  const [dataEmployee, setDataEmployee] = useState([])
  const [dataAllEmp, setDataAllEmp] = useState([])
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
  }, [modalState.isOpen, modalState.mode, pageNumber, pageSize]);

  useEffect(() => {
    const fetchModalOptions = async () => {
      try {
        const allEmpRes = await employeeService.getAllDataEmp('EMPLOYEE');
        if (allEmpRes?.success) {
          setDataAllEmp(allEmpRes.dataEmp || []);
        }
      } catch (error) {
        console.error("Lỗi API nhân viên:", error);
      }

      try {
        const allListEmpRes = await employeeService.getAllDataEmpForBenefit('EMPLOYEE');
        if (allListEmpRes?.success) {
          setDataEmployee(allListEmpRes.dataEmp || []);
        }
      } catch (error) {
        console.error("Lỗi API nhân viên:", error);
      }

      try {
        const deptRes = await departmentService.getAllList();
        if (deptRes?.success) {
          setDataDepartment(deptRes?.dataList || []);
        }
      } catch (error) {
        console.error("Lỗi API phòng ban:", error);
      }

      try {
        const posRes = await positionService.getAllList();
        if (posRes?.success) {
          setDataPosition(posRes?.dataList || []);
        }
      } catch (error) {
        console.error("Lỗi API vị trí:", error);
      }
    };

    fetchModalOptions();
  }, []);


  const handleOpenModal = (mode, data) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'create', data: null });
  };

  const handleCreateDepartment = async (formData) => {
    try {

      const res = await departmentService.createDepartment(formData);

      if (res && res.success) {
        fetchEmployee()
        fetchDepartment()
      }

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
    const matched = dataPosition.filter(
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

      const response = await employeeService.assignEmployee(payload);

      if (response && response.success) {
        toast.success(response.message || "Gán nhân sự vào phòng ban thành công!");

        handleCloseModal();
      }
    } catch (error) {
      console.error("Lỗi khi gán nhân sự:", error);
      toast.error(error?.response?.data?.error || "Gán nhân sự thất bại, vui lòng thử lại!");
    }
  };

  const handleAddManager = async (payload) => {
    try {
      const response = await departmentService.updateManagerForDepartment(payload);

      if (response && response.success) {
        toast.success(response.message || "Gán trưởng phòng mới vào phòng ban thành công!");

        handleCloseModal();
      }
    } catch (error) {
      console.error("Lỗi khi gán trưởng phòng:", error);
      toast.error(error?.response?.data?.error || "Gán trưởng phòng thất bại, vui lòng thử lại!");
    }
  };

  const filteredDepartment = dataDepartment.filter((item) => {
    const matchSearch = item?.name.toLowerCase().includes(searchTerm.toLowerCase()) || item?.costCenter.toLowerCase().includes(searchTerm.toLowerCase())
    return matchSearch;
  })

  const totalDepartments = Array.isArray(dataDepartment) ? dataDepartment.length : 0;

  const totalEmployees = Array.isArray(dataEmployee) ? dataEmployee.length : 0;

  const unassignedEmployees = Array.isArray(dataAllEmp)
  ? dataAllEmp.filter((emp) => {
      const dept = emp.departmentId || emp.department || emp.dept;
      const pos = emp.positionId || emp.position;

      return !dept && !pos;
    }).length
  : 0;

  const vacantLeadershipPositions = Array.isArray(dataDepartment)
    ? dataDepartment.filter((dept) => dept.manager === null || dept.manager === undefined).length
    : 0;


  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="size-6 text-indigo-600" />
            Quản lý phòng ban
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tổ chức và quản lý các phòng ban và cơ cấu đội nhóm trong công ty của bạn.
          </p>
        </div>

        <DepartmentTabView viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <DepartmentStats
        totalDepartments={totalDepartments}
        totalEmployees={totalEmployees}
        vacantLeadershipPositions={vacantLeadershipPositions}
        unassignedEmployees={unassignedEmployees}
      />

      {viewMode === "table" ? (
        <div className="space-y-4">
          <DepartmentFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenAddModal={handleOpenModal}
          />
          <DepartmentTable
            onSelectDepartment={handleOpenModal}
            departments={filteredDepartment}
            allEmployees={dataEmployee}
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
        onSubmitManager={handleAddManager}

        departments={modalState.data}
        departmentOptions={dataDepartment}
        employeeOptions={dataEmployee}
        dataEmployee={dataAllEmp}
        positionOptions={filteredPositions.length ? filteredPositions : dataPosition}
        levelOptions={levelOptions}

      />
    </div>
  );
}