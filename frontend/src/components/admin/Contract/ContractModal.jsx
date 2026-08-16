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

const ContractModal = ({ isOpen, onClose, mode, dataPending, dataContract, onSubmit, pendingPagination, setPendingPageNumbe, pendingPageNumbe }) => {
  const isDetail = mode === 'detail';
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
      <DialogContent className="sm:max-w-120 rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800 dark:text-white">
            {isCreate ? 'Tạo hợp đồng mới' : isDetail ? 'Chi tiết hợp đồng' : 'Xác nhận hủy hợp đồng'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isCreate ? 'Tạo hợp đồng mới cho nhân viên' : isDetail ? 'Xem chi tiết hợp đồng' : 'Xác nhận hủy hợp đồng'}
          </DialogDescription>
        </DialogHeader>

        {isDetail && (
          <div className="space-y-4 py-3 text-xs">
            <div key={dataContract?._id} className="p-3 bg-slate-50 dark:bg-gray-800/60 border border-slate-100 dark:border-gray-800 rounded-xl space-y-2">
              <p>
                <span className="text-gray-400 dark:text-gray-500 w-28 inline-block">Mã HĐ:</span>{' '}
                <strong className="text-gray-800 dark:text-gray-200">{dataContract?.contractCode}</strong>
              </p>
              <p>
                <span className="text-gray-400 dark:text-gray-500 w-28 inline-block">Nhân viên:</span>{' '}
                <strong className="text-gray-800 dark:text-gray-200">{dataContract?.employee?.fullName}</strong>
              </p>
              <p>
                <span className="text-gray-400 dark:text-gray-500 w-28 inline-block">Email:</span>{' '}
                <strong className="text-gray-800 dark:text-gray-200">{dataContract?.employee?.email}</strong>
              </p>
              <p>
                <span className="text-gray-400 dark:text-gray-500 w-28 inline-block">Loại HĐ:</span>{' '}
                <strong className="text-indigo-600 dark:text-indigo-400">{dataContract?.type}</strong>
              </p>
              <p>
                <span className="text-gray-400 dark:text-gray-500 w-28 inline-block">Thời hạn:</span>{' '}
                <strong className="text-gray-800 dark:text-gray-200">
                  {dayjs(dataContract?.startDate).format('DD/MM/YYYY')} - {dayjs(dataContract?.endDate).format('DD/MM/YYYY')}
                </strong>
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                Đóng
              </Button>
            </div>
          </div>
        )}

        {isCancel && (
          <div className="space-y-4 py-3 text-sm">
            <p className="text-gray-600 dark:text-gray-300">
              Bạn có chắc chắn muốn hủy hợp đồng{' '}
              <strong className="text-gray-900 dark:text-white">{dataContract?.contractCode}</strong> của nhân viên{' '}
              <strong className="text-gray-900 dark:text-white">{dataContract?.employee?.fullName}</strong> không?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                Không
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={onClose}
                className="rounded-xl text-white bg-red-600 hover:bg-red-700 cursor-pointer border-0"
              >
                Xác nhận hủy
              </Button>
            </div>
          </div>
        )}

        {isCreate && (
          <form onSubmit={handleSubmit} className="pt-3 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Người ký hợp đồng <span className="text-red-500">*</span>
              </Label>
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger
                  className="w-full"
                  render={
                    <Button className="w-full justify-between font-normal text-slate-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700" variant="outline">
                      <span>{dataPending.filter(item => item._id === selectedValue).map(emp => { return emp.fullName })[0] || "Chọn nhân viên chờ ký"}</span>
                      {isDropdownOpen ? (
                        <ChevronUp className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      )}
                    </Button>
                  }
                />
                <DropdownMenuContent align='start' className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg p-1 rounded-xl">
                  <DropdownMenuGroup className="w-full">
                    <DropdownMenuLabel className="text-gray-500 dark:text-gray-400">Chờ ký</DropdownMenuLabel>
                    {Array.isArray(dataPending) && dataPending.length > 0 ? (
                      dataPending.map((emp) => (
                        <DropdownMenuItem
                          key={emp._id}
                          onClick={() => {
                            setSelectedValue(emp._id);
                          }}
                          className="cursor-pointer dark:hover:bg-gray-800 rounded-lg px-2 py-1.5"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800 dark:text-gray-200">
                              {emp.fullName}
                            </span>
                            {emp.email && (
                              <span className="text-xs text-slate-500 dark:text-gray-400">{emp.email}</span>
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-center text-slate-500 dark:text-gray-400 italic">
                        Không có dữ liệu chờ ký
                      </div>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="salary" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Mức lương cơ bản <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="salary"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Nhập số tiền..."
                  className="text-left font-medium text-emerald-600 dark:text-emerald-400 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="type" className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-full">
                  Loại Hợp Đồng<span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={handleTypeContractChange}
                  required
                >
                  <SelectTrigger id="type-1" className="h-10 text-xs rounded-xl w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                    <SelectValue placeholder="Chọn loại HĐ" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <SelectItem value="Fulltime" className="text-xs dark:text-gray-200 dark:hover:bg-gray-800">Toàn thời gian</SelectItem>
                    <SelectItem value="Parttime" className="text-xs dark:text-gray-200 dark:hover:bg-gray-800">Bán thời gian</SelectItem>
                    <SelectItem value="Probation" className="text-xs dark:text-gray-200 dark:hover:bg-gray-800">Thử việc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="startDate-1" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  format="DD-MM-YYYY"
                  id="startDate-1"
                  name="startDate"
                  size="large"
                  className="w-full h-10 rounded-xl text-xs block cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={formData.startDate ? dayjs(formData.startDate) : null}
                  onChange={(date) => handleDateChange('startDate', date)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="endDate-1" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Ngày kết thúc
                  {formData.contractType !== 'Fulltime-Indefinite' && <span className="text-red-500"> *</span>}
                </Label>
                <DatePicker
                  format="DD-MM-YYYY"
                  id="endDate-1"
                  name="endDate"
                  size="large"
                  className="w-full h-10 rounded-xl text-xs block cursor-pointer disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer border-0"
              >
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