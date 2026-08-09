import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePicker } from 'antd';
import { DropdownMenuItem, DropdownMenuTrigger, DropdownMenu, DropdownMenuGroup, DropdownMenuContent, DropdownMenuLabel, } from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import dayjs from 'dayjs';

const ContractModal = ({ isOpen, onClose, mode, data, onSubmit, pendingPagination, setPendingPageNumbe, pendingPageNumbe }) => {
  const isView = mode === 'view';
  const isCreate = mode === 'create';
  const isCancel = mode === 'cancel';

  const [selectedValue, setSelectedValue] = useState("Danh sách");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    employee: selectedValue,
    type: '',
    startDate: '',
    endDate: '',
    salary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date ? date.toISOString() : null,
    }));
  };

  const handleTypeContractChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedValue) {
      toast.error("Vui lòng chọn người ký hợp đồng!");
      return;
    }

    if (!formData.startDate) {
      toast.error("Vui lòng chọn ngày bắt đầu!");
      return;
    }

    const payload = { ...formData };

    onSubmit(selectedValue, payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-120 rounded-2xl p-6">
        {console.log(selectedValue)}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            {isCreate ? 'Tạo hợp đồng mới' : isView ? 'Chi tiết hợp đồng' : 'Xác nhận hủy hợp đồng'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isCreate ? 'Tạo hợp đồng mới cho nhân viên' : isView ? 'Xem chi tiết hợp đồng' : 'Xác nhận hủy hợp đồng'}
          </DialogDescription>
        </DialogHeader>

        {isView && (
          <div className="space-y-4 py-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <p>
                <span className="text-gray-400 w-28 inline-block">Mã HĐ:</span>{' '}
                <strong className="text-gray-800">{data?.code}</strong>
              </p>
              <p>
                <span className="text-gray-400 w-28 inline-block">Nhân viên:</span>{' '}
                <strong className="text-gray-800">{data?.name}</strong>
              </p>
              <p>
                <span className="text-gray-400 w-28 inline-block">Email:</span>{' '}
                <strong className="text-gray-800">{data?.email}</strong>
              </p>
              <p>
                <span className="text-gray-400 w-28 inline-block">Loại HĐ:</span>{' '}
                <strong className="text-indigo-600">{data?.type}</strong>
              </p>
              <p>
                <span className="text-gray-400 w-28 inline-block">Thời hạn:</span>{' '}
                <strong className="text-gray-800">
                  {data?.startDate} - {data?.endDate}
                </strong>
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                Đóng
              </Button>
            </div>
          </div>
        )}

        {isCancel && (
          <div className="space-y-4 py-3 text-sm">
            <p className="text-gray-600">
              Bạn có chắc chắn muốn hủy hợp đồng{' '}
              <strong className="text-red-600">{data?.code}</strong> của nhân viên{' '}
              <strong>{data?.name}</strong> không?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                Không
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={onClose}
                className="rounded-xl bg-red-600 hover:bg-red-700"
              >
                Xác nhận hủy
              </Button>
            </div>
          </div>
        )}

        {isCreate && (
          <form onSubmit={handleSubmit} className="pt-3 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold text-gray-700">
                Người ký hợp đồng <span className="text-red-500">*</span>
              </Label>
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger
                  className="w-full"
                  render={
                    <Button className="w-full justify-between font-normal text-slate-700" variant="outline">
                      <span>{data.filter(item => item._id === selectedValue).map(emp => { return emp.fullName })}</span>
                      {isDropdownOpen ? (
                        <ChevronUp className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      )}
                    </Button>
                  }
                />
                <DropdownMenuContent align='start'>
                  <DropdownMenuGroup className="w-full" >
                    <DropdownMenuLabel>Chờ ký</DropdownMenuLabel>
                    {Array.isArray(data) && data.length > 0 ? (
                      data.map((emp) => (
                        <DropdownMenuItem
                          key={emp._id}
                          onClick={() => {
                            setSelectedValue(emp._id);
                          }}
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800">
                              {emp.fullName || emp.fullname}
                            </span>
                            {emp.email && (
                              <span className="text-xs text-slate-500">{emp.email}</span>
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-center text-slate-500 italic">
                        Không có dữ liệu chờ ký
                      </div>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="space-y-1.5"
              >
                <Label htmlFor="endDate" className="text-xs font-semibold text-gray-700">
                  Mức lương cơ bản <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="salary"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Nhập số tiền..."
                  className="text-left font-medium text-emerald-600"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="type" className="text-xs font-semibold text-gray-700 w-full">
                  Loại Hợp Đồng<span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={handleTypeContractChange}
                  required
                >
                  <SelectTrigger id="type-1" className="h-10 text-xs rounded-xl w-full">
                    <SelectValue placeholder="Chọn loại HĐ" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Fulltime" className="text-xs">Toàn thời gian</SelectItem>
                    <SelectItem value="Parttime" className="text-xs">Bán thời gian</SelectItem>
                    <SelectItem value="Probation" className="text-xs">Thử việc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="startDate-1" className="text-xs font-semibold text-gray-700">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  format="DD-MM-YYYY"
                  id="startDate-1"
                  name="startDate"
                  size="large"
                  className="w-full h-10 rounded-xl text-xs block cursor-pointer"
                  value={formData.startDate ? dayjs(formData.startDate) : null}
                  onChange={(date) => handleDateChange('startDate', date)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="endDate-1" className="text-xs font-semibold text-gray-700">
                  Ngày kết thúc
                  {formData.contractType !== 'Fulltime-Indefinite' && <span className="text-red-500"> *</span>}
                </Label>
                <DatePicker
                  format="DD-MM-YYYY"
                  id="endDate-1"
                  name="endDate"
                  size="large"
                  className="w-full h-10 rounded-xl text-xs block cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={formData.endDate ? dayjs(formData.endDate) : null}
                  onChange={(date) => handleDateChange('endDate', date)}
                  disabledDate={(currentDate) => {
                    if (formData.startDate) {
                      return currentDate && currentDate.isBefore(dayjs(formData.startDate), 'day');
                    }
                    return false;
                  }}
                  disabled={formData.contractType === 'Fulltime-Indefinite'}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                Hủy
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Tạo mới
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContractModal;