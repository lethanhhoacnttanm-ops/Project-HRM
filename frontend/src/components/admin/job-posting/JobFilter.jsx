import React from 'react';
import {Input} from '@/components/ui/input';
import {Select} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const JobFilter = ({ searchTerm, setSearchTerm, department, setDepartment, contractType, setContractType }) => {
  return (
    <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-6">
          <Input
            placeholder="Tìm kiếm công việc, phòng ban..."
            prefix={<Search className="text-gray-400 mr-1" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl py-2 bg-gray-50/50 border-gray-200 text-xs"
          />
        </div>

        <div className="md:col-span-2">
          <Select
            className="w-full h-10 text-xs"
            value={department}
            onChange={setDepartment}
            options={[
              { value: 'all', label: 'Phòng ban' },
              { value: 'Business Analyst', label: 'Business Analyst' },
              { value: 'Thiết kế', label: 'Thiết kế' },
              { value: 'Kỹ thuật', label: 'Kỹ thuật' },
            ]}
          />
        </div>

        <div className="md:col-span-2">
          <Select
            className="w-full h-10 text-xs"
            value={contractType}
            onChange={setContractType}
            options={[
              { value: 'all', label: 'Loại hợp đồng' },
              { value: 'Toàn thời gian', label: 'Toàn thời gian' },
              { value: 'Bán thời gian', label: 'Bán thời gian' },
              { value: 'Từ xa', label: 'Từ xa' },
            ]}
          />
        </div>

        <div className="md:col-span-2">
          <Button
            type="text"
            icon={<Filter className="text-lg" />}
            className="w-full h-10 bg-white hover:bg-blue-600 hover:text-white border-none! text-blue-600 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
          >
            Lọc nhiều hơn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;