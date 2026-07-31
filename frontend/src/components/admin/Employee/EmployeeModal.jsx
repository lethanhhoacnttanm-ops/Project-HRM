import React, { useState, useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

const EmployeeModal = ({ isOpen, onClose, mode, data }) => {
  const isView = mode === 'view';
  const isAdd = mode === 'add';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
  });

  useEffect(() => {
    if (data && !isAdd) {
      setFormData({
        name: data.name || '',
        email: data.email || '',
        position: data.position || '',
        department: data.department || '',
      });
    } else {
      setFormData({ name: '', email: '', position: '', department: '' });
    }
  }, [data, mode, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-120 rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            {isView ? 'Hồ sơ tóm tắt' : isAdd ? 'Thêm nhân viên mới' : 'Cập nhật nhân viên'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isView ? 'Xem chi tiết thông tin nhân viên' : 'Nhập thông tin nhân viên'}
          </DialogDescription>
        </DialogHeader>

        {isView ? (
          <div className="space-y-4 py-2 text-sm">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xl shrink-0">
                {data?.name?.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">{data?.name}</h3>
                <p className="text-xs text-gray-500">{data?.position}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-400 block">Email</span>
                <span className="font-semibold text-gray-800 break-all">{data?.email}</span>
              </div>
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-400 block">Phòng ban</span>
                <span className="font-semibold text-indigo-600">{data?.department}</span>
              </div>
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-400 block">Trạng thái</span>
                <span className="font-semibold text-emerald-600">
                  {data?.status === 'active' ? 'Hoạt động' : 'Đang nghỉ'}
                </span>
              </div>
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-400 block">Mã nhân viên</span>
                <span className="font-semibold text-gray-800">NV-{data?.id || '001'}</span>
              </div>
            </div>
          </div>
        ) : (
          /* CHẾ ĐỘ THÊM / SỬA FORM (ADD / EDIT MODE) */
          <form onSubmit={handleSubmit} className="pt-2 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold text-gray-700">
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                required
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl py-2"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="position" className="text-xs font-semibold text-gray-700">
                  Chức vụ
                </Label>
                <Input
                  id="position"
                  placeholder="Backend Developer"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="rounded-xl py-2"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-xs font-semibold text-gray-700">
                  Phòng ban
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(val) => setFormData({ ...formData, department: val })}
                >
                  <SelectTrigger id="department" className="h-10 rounded-xl">
                    <SelectValue placeholder="Chọn phòng ban" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="SmartTeach">SmartTeach</SelectItem>
                    <SelectItem value="CI/CD">CI/CD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                Hủy
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Lưu
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
} ;

export default EmployeeModal;