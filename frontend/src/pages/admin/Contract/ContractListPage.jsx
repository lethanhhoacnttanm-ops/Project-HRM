import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from "sonner";

import { ContractTopCards, ContractBottomCards } from '../../../components/admin/Contract/ContractTabs.jsx';
import ContractFilter from '../../../components/admin/Contract/ContractFilter.jsx';
import ContractTable from '../../../components/admin/Contract/ContractTable.jsx';
import ContractExport from '../../../components/admin/Contract/ContractExport.jsx';
import ContractModal from '../../../components/admin/Contract/ContractModal.jsx';
import { contractService } from '../../../services/contract.service.js';
import { employeeService } from '../../../services/employee.service.js';

const initialContracts = [
  { id: 1, code: 'HĐ-1222', name: 'Lương Diệu Kiệt', email: 'dieukietbigtech@gmail.com', type: 'Fulltime', startDate: '23-07-2026', endDate: '11-08-2026', status: 'active' },
  { id: 2, code: 'HĐ-1222', name: 'Lê Thanh Hòa', email: 'hoalebigtech@gmail.com', type: 'Parttime', startDate: '23-07-2026', endDate: '11-08-2026', status: 'leave' },
  { id: 3, code: 'HĐ-1222', name: 'Lương Diệu Kiệt', email: 'dieukietbigtech@gmail.com', type: 'Parttime', startDate: '23-07-2026', endDate: '11-08-2026', status: 'active' },
  { id: 4, code: 'HĐ-1222', name: 'Lê Thanh Hòa', email: 'hoalebigtech@gmail.com', type: 'Fulltime', startDate: '23-07-2026', endDate: '11-08-2026', status: 'leave' },
  { id: 5, code: 'HĐ-1222', name: 'Lương Diệu Kiệt', email: 'dieukietbigtech@gmail.com', type: 'Fulltime', startDate: '23-07-2026', endDate: '11-08-2026', status: 'active' },
];

const ContractListPage = () => {
  const [contracts] = useState(initialContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [contractType, setContractType] = useState('all');
  const [status, setStatus] = useState('all');

  const [pageSize] = useState(5);

  const [beginEmployees, setBeginEmployees] = useState([]);
  const [beginPageNumber, setBeginPageNumber] = useState(1);
  const [beginPaginationInfo, setbeginPaginationInfo] = useState({ totalEmp: 0, totalPages: 1 });

  const [modalState, setModalState] = useState({ isOpen: false, mode: 'view', data: null });

  useEffect(() => {
    const fetchPendingEmployees = async () => {
      if (modalState.isOpen && modalState.mode === 'create') {
        try {
          const res = await employeeService.getAllEmployees(beginPageNumber, pageSize, 'NONE', 'pending');
          if (res?.success) {
            setBeginEmployees(res.dataEmp || []);
            setbeginPaginationInfo(res.pagination || { totalEmp: 0, totalPage: 1 });
          }
        } catch (error) {
          toast.error('Thất bại', { description: 'Không thể lấy danh sách chờ duyệt!' });
        }
      }
    };
    fetchPendingEmployees();
  }, [modalState.isOpen, modalState.mode, beginPageNumber, pageSize]);

  const handleOpenModal = (mode, data) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'view', data: null });
  };

  const filteredContracts = contracts.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = contractType === 'all' || item.type === contractType;
    const matchStatus = status === 'all' || item.status === status;
    return matchSearch && matchType && matchStatus;
  });


  const handleCreateContract = async (selectedValue, payload) => {
    try {
      const res = await contractService.createNewContract(selectedValue, payload);
      
      if (res?.success) {
        toast.success(res.message);
      }

      handleCloseModal();
    } catch (error) {
      toast.error('Lỗi', { description: 'Không thể cập nhật thông tin!' });
    }
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quản lý hợp đồng lao động</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Giám sát các vấn đề pháp lý liên quan đến việc làm, theo dõi thời hạn hợp đồng và đảm bảo tuân thủ pháp luật.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ContractExport contracts={filteredContracts} />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal('create')}
            className="bg-blue-600 hover:bg-blue-700 h-10 px-5 rounded-xl font-bold border-none shadow-2xs cursor-pointer"
          >
            Hợp đồng mới
          </Button>
        </div>
      </div>

      <ContractTopCards />

      <ContractFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        contractType={contractType}
        setContractType={setContractType}
        status={status}
        setStatus={setStatus}
      />

      <ContractTable contracts={filteredContracts} onOpenModal={handleOpenModal} />

      <ContractBottomCards />

      <ContractModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        data={beginEmployees}

        pendingPagination={beginPaginationInfo}
        setPendingPageNumber={setBeginPageNumber}
        pendingPageNumber={beginPageNumber}

        onSubmit={handleCreateContract}

      />
    </div>
  );
};

export default ContractListPage;