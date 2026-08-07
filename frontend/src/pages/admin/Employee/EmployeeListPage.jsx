import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { BellCheck } from "lucide-react";
import dayjs from 'dayjs';

import EmployeeFilter from '../../../components/admin/Employee/EmployeeFilter.jsx';
import EmployeeTable from '../../../components/admin/Employee/EmployeeTable.jsx';
import EmployeeCard from '../../../components/admin/Employee/EmployeeCard.jsx';
import EmployeeModal from '../../../components/admin/Employee/EmployeeModal.jsx';

import { useAuth } from '../../../hooks/useAuth.js';
import { employeeService } from '../../../services/employee.service.js';

const EmployeeListPage = () => {

  const [employees, setEmployees] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize] = useState(5);

  const [paginationInfo, setPaginationInfo] = useState({ totalEmp: 0, totalPage: 1});

  const [beginEmployees, setBeginEmployees] = useState([]);
  const [beginPageNumber, setBeginPageNumber] = useState(1);
  const [beginPaginationInfo, setbeginPaginationInfo] = useState({ totalEmp: 0, totalPages: 1 });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('table');



  const { loading } = useAuth();

  const [modalState, setModalState] = useState({ isOpen: false, mode: 'view', data: null });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await employeeService.getAllEmployees(pageNumber, pageSize, 'EMPLOYEE'); 
        if (res?.success) {
          setEmployees(res.dataEmp);
          setPaginationInfo(res.pagination);
        }
      } catch (error) {
        toast.error('Thất bại', {
          description: error.message || 'Không thể lấy danh sách nhân viên!',
        });
      }
    };

    fetchEmployees();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    const fetchPendingEmployees = async () => {
      if (modalState.isOpen && modalState.mode === 'processRegistry') {
        try {
          const res = await employeeService.getAllEmployees(beginPageNumber, pageSize, 'NONE');
          if (res?.success) {
            setBeginEmployees(res.dataEmp);
            setbeginPaginationInfo(res.pagination);
          }
        } catch (error) {
          toast.error('Thất bại', { description: 'Không thể lấy danh sách chờ duyệt!' });
        }
      }
    };
    fetchPendingEmployees();
  }, [modalState.isOpen, modalState.mode, beginPageNumber, pageSize]);

  const handleOpenModal = (mode, data = null) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'view', data: null });
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });


  const now = dayjs();

  const CountNewEmployee = employees.filter(emp => emp.role === "EMPLOYEE").reduce((count, emp) => {

    const diffInDays = now.diff(dayjs(emp.startDate), "day");

    if (diffInDays >= 0 && diffInDays <= 30) {
      return count + 1;
    }

    return count;
  }, 0)

  const totalEmployee = employees.filter(item => item.role === "EMPLOYEE").length

  const isActiveEmployee = employees.filter(item => item.status === "active" && item.role === "EMPLOYEE").length

  const employeeOnsite = (isActiveEmployee * 100) / totalEmployee


  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Quản lý hồ sơ nhân viên
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Quản lý nhân lực, theo dõi hiệu suất và giám sát các nhiệm vụ của từng bộ phận.
          </p>
        </div>

        <Button
          onClick={() => handleOpenModal('processRegistry')}
          className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-5 rounded-xl font-semibold border-none shadow-xs cursor-pointer gap-1.5"
        >
          <BellCheck  />
          Thông báo đăng ký 
        </Button>
      </div>

      <EmployeeFilter
        newEmployee={CountNewEmployee}
        Employee={totalEmployee}
        activeEmployee={isActiveEmployee}
        onsite={employeeOnsite}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenModal={handleOpenModal}
      />

      {viewMode === 'table' ? (
        <EmployeeTable pagination={paginationInfo} pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} employees={filteredEmployees} onOpenModal={handleOpenModal} />
      ) : (
        <EmployeeCard employees={filteredEmployees} onOpenModal={handleOpenModal} />
      )}

      <EmployeeModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        data={beginEmployees}

        pendingPagination={beginPaginationInfo}
        setPendingPageNumber={setBeginPageNumber}
        pendingPageNumber={beginPageNumber}
      />
    </div>
  );
};

export default EmployeeListPage;