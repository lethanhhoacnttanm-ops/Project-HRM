import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EmployeeFilter from '../../../components/admin/Employee/EmployeeFilter.jsx';
import EmployeeTable from '../../../components/admin/Employee/EmployeeTable.jsx';
import EmployeeCard from '../../../components/admin/Employee/EmployeeCard.jsx';
import EmployeeModal from '../../../components/admin/Employee/EmployeeModal.jsx';

const initialEmployees = [
  { id: 1, name: 'Lương Diệu Kiệt', email: 'dieukietbigtech@gmail.com', position: 'Backend Developer', department: 'SmartTeach', status: 'active', avatar: '/person-icon-symbol-design-illustration-vector.jpg' },
  { id: 2, name: 'Lê Thanh Hòa', email: 'hoalebigtech@gmail.com', position: 'Backend Developer', department: 'CI/CD', status: 'leave', avatar: '/person-icon-symbol-design-illustration-vector.jpg' },
  { id: 3, name: 'Lương Diệu Kiệt', email: 'dieukietbigtech@gmail.com', position: 'Backend Developer', department: 'CI/CD', status: 'active', avatar: '/person-icon-symbol-design-illustration-vector.jpg' },
  { id: 4, name: 'Lê Thanh Hòa', email: 'hoalebigtech@gmail.com', position: 'Backend Developer', department: 'CI/CD', status: 'leave', avatar: '/person-icon-symbol-design-illustration-vector.jpg' },
  { id: 5, name: 'Lương Diệu Kiệt', email: 'dieukietbigtech@gmail.com', position: 'Backend Developer', department: 'CI/CD', status: 'active', avatar: '/person-icon-symbol-design-illustration-vector.jpg' },
];

const EmployeeListPage = () => {
  const [employees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('table'); 

  const [modalState, setModalState] = useState({ isOpen: false, mode: 'view', data: null });

  const handleOpenModal = (mode, data = null) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'view', data: null });
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="space-y-6 p-2">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Hồ sơ nhân viên</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Quản lý nhân lực, theo dõi hiệu suất và giám sát các nhiệm vụ của từng bộ phận.
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onOpenModal('add')}
          className="bg-blue-600 hover:bg-blue-700 h-10 px-5 rounded-xl font-semibold border-none shadow-xs cursor-pointer"
        >
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