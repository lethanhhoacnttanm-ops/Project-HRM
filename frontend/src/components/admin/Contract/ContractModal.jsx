import React, { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContractModal = ({ isOpen, onClose, mode, data, onSubmit }) => {
  const isView = mode === 'view';
  const isCreate = mode === 'create';
  const isCancel = mode === 'cancel';

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        code: '',
        type: '',
        startDate: '',
        endDate: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-120 rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            {isCreate
              ? 'Tạo hợp đồng mới'
              : isView
              ? 'Chi tiết hợp đồng'
              : 'Xác nhận hủy hợp đồng'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isCreate
              ? 'Tạo hợp đồng mới cho nhân viên'
              : isView
              ? 'Xem chi tiết hợp đồng'
              : 'Xác nhận hủy hợp đồng'}
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
                Nhân viên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                required
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl py-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="code" className="text-xs font-semibold text-gray-700">
                  Mã HĐ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  required
                  placeholder="HĐ-1223"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="rounded-xl py-2 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="type" className="text-xs font-semibold text-gray-700">
                  Loại HĐ <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(val) => setFormData({ ...formData, type: val })}
                  required
                >
                  <SelectTrigger id="type" className="h-10 text-xs rounded-xl">
                    <SelectValue placeholder="Chọn loại HĐ" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Fulltime" className="text-xs">Fulltime</SelectItem>
                    <SelectItem value="Parttime" className="text-xs">Parttime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="startDate" className="text-xs font-semibold text-gray-700">
                  Ngày bắt đầu
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full h-10 rounded-xl text-xs block cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="endDate" className="text-xs font-semibold text-gray-700">
                  Ngày kết thúc
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full h-10 rounded-xl text-xs block cursor-pointer"
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