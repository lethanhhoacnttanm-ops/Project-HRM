import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const ContractFilter = ({
  searchTerm,
  setSearchTerm,
  contractType,
  setContractType,
  status,
  setStatus,
}) => {
  return (
    <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm theo tên, email, phòng ban,..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-xl py-2 bg-gray-50/40 border-gray-200"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <Select value={contractType} onValueChange={setContractType}>
            <SelectTrigger className="w-full h-10 rounded-xl bg-gray-50/40 border-gray-200">
              <SelectValue placeholder="Loại hợp đồng" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="Tất cả">Loại hợp đồng</SelectItem>
              <SelectItem value="Fulltime">Toàn thời gian</SelectItem>
              <SelectItem value="Parttime">Bán thời gian</SelectItem>
              <SelectItem value="Probation">Thử việc</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-3">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full h-10 rounded-xl bg-gray-50/40 border-gray-200">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="Tất cả">Trạng thái</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="expired">Hết hạn</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ContractFilter;