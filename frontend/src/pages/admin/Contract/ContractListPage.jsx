import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ContractTopCards, ContractBottomCards } from '../../../components/admin/Contract/ContractTabs.jsx';
import ContractFilter from '../../../components/admin/Contract/ContractFilter.jsx';
import ContractTable from '../../../components/admin/Contract/ContractTable.jsx';
import ContractExport from '../../../components/admin/Contract/ContractExport.jsx';
import ContractModal from '../../../components/admin/Contract/ContractModal.jsx';

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

  const [modalState, setModalState] = useState({ isOpen: false, mode: 'view', data: null });

  const handleOpenModal = (mode, data = null) => {
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
        data={modalState.data}
      />
    </div>
  );
};

export default ContractListPage;