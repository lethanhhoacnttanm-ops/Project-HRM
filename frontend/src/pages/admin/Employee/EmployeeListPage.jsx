import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Plus } from "lucide-react";

import EmployeeFilter from '../../../components/admin/Employee/EmployeeFilter.jsx';
import EmployeeTable from '../../../components/admin/Employee/EmployeeTable.jsx';
import EmployeeCard from '../../../components/admin/Employee/EmployeeCard.jsx';
import EmployeeModal from '../../../components/admin/Employee/EmployeeModal.jsx';

import { useAuth } from '../../../hooks/useAuth.js';
import { employeeService } from '../../../services/employee.service.js';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  const { loading } = useAuth();

  const [modalState, setModalState] = useState({ isOpen: false, mode: 'view', data: null });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await employeeService.getAllEmployees();
        if (res?.success) {
          setEmployees(res.data);
        }
      } catch (error) {
        toast.error('Thất bại', {
          description: error.message || 'Không thể lấy danh sách nhân viên!',
        });
      }
    };

    fetchEmployees();
  }, []);

  const handleOpenModal = (mode, data = null) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'view', data: null });
  };

  const filteredEmployees = employees.filter((emp) => {
    const isEmployeeOnly = emp.role !== 'ADMIN';
    const matchSearch =
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    return isEmployeeOnly && matchSearch && matchDept && matchStatus;
  });

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
          onClick={() => handleOpenModal('add')}
          className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-5 rounded-xl font-semibold border-none shadow-xs cursor-pointer gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      <EmployeeFilter
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
        <EmployeeTable employees={filteredEmployees} onOpenModal={handleOpenModal} />
      ) : (
        <EmployeeCard employees={filteredEmployees} onOpenModal={handleOpenModal} />
      )}

      <EmployeeModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        data={modalState.data}
      />
    </div>
  );
};

export default EmployeeListPage;