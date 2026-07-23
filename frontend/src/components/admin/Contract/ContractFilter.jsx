import React from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const ContractFilter = ({ searchTerm, setSearchTerm, contractType, setContractType, status, setStatus }) => {
  return (
    <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-6">
          <Input
            placeholder="Tìm kiếm theo tên, email, phòng ban,..."
            prefix={<SearchOutlined className="text-gray-400 mr-1" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl py-2 bg-gray-50/40 border-gray-200"
          />
        </div>

        <div className="md:col-span-3">
          <Select
            className="w-full h-10"
            value={contractType}
            onChange={setContractType}
            options={[
              { value: 'all', label: 'Loại hợp đồng' },
              { value: 'Fulltime', label: 'Fulltime' },
              { value: 'Parttime', label: 'Parttime' },
            ]}
          />
        </div>

        <div className="md:col-span-3">
          <Select
            className="w-full h-10"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'all', label: 'Trạng thái' },
              { value: 'active', label: 'Hoạt động' },
              { value: 'leave', label: 'Đang nghỉ' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractFilter;