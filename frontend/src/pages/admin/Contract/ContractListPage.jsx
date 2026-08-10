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
import dayjs from 'dayjs';

const ContractListPage = () => {
  const [contracts, setContract] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [contractType, setContractType] = useState('Tất cả');
  const [status, setStatus] = useState('Tất cả');

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

  useEffect(() => {
    const fetchAllContract = async () => {
      try {
        const res = await contractService.getallContractEmployee(beginPageNumber, pageSize);
        if (res?.success) {
          setContract(res?.dataContract)
          setbeginPaginationInfo(res?.pagination || { totalContract: 0, totalPage: 1 });
        }

      } catch (error) {
        setContract([])
        toast.error('Thất bại', { description: 'Không thể lấy danh sách các hợp đồng!' });

      }

    }

    fetchAllContract()
  }, [beginPageNumber, pageSize])

  useEffect(() => {
    const fetchPendingEmployees = async () => {
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

    fetchPendingEmployees();
  }, [beginPageNumber, pageSize]);

  const handleOpenModal = (mode, data) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'view', data: null });
  };

  const filteredContracts = contracts.filter((item) => {
    const matchSearch = item?.employee?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || item?.contractCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = contractType === 'Tất cả' || item?.type === contractType;
    const matchStatus = status === 'Tất cả' || item?.status === status;
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

  const totalContract = contracts.length

  const isActiveContract = contracts.filter(item => item.status === "active").length

  const now = dayjs()
  const isExpried = contracts.filter((item) => {
    if (!item?.endDate) return false;

    const endDate = dayjs(item.endDate);

    const daysLeft = endDate.diff(now, "day");

    return daysLeft >= 0 && daysLeft <= 30;

  }).length;

  const waitingForRegis = beginEmployees.length

  const isProbation = contracts.filter(item => item.type === 'Probation').length

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
          <ContractExport contracts={contracts} />

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

      <ContractTopCards isProbation={isProbation} waitingForRegis={waitingForRegis} totalContract={totalContract} isActiveContract={isActiveContract} isExpired={isExpried} />

      <ContractFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        contractType={contractType}
        setContractType={setContractType}
        status={status}
        setStatus={setStatus}
      />

      <ContractTable pagination={beginPaginationInfo} pageSize={pageSize} pageNumber={beginPageNumber} setPageNumber={setBeginPageNumber} contracts={filteredContracts} onOpenModal={handleOpenModal} />

      <ContractBottomCards />

      <ContractModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        dataPending={beginEmployees}
        dataContract={contracts}

        pendingPagination={beginPaginationInfo}
        setPendingPageNumber={setBeginPageNumber}
        pendingPageNumber={beginPageNumber}

        onSubmit={handleCreateContract}

      />
    </div>
  );
};

export default ContractListPage;