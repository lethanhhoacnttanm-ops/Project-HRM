import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { DatePicker, Segmented } from 'antd';
import dayjs from 'dayjs';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { User, Check, X, Mail, Phone, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeModal = ({ isOpen, onClose, mode, data, pendingPagination, setPendingPageNumber, pendingPageNumber, onSubmit, onApprove }) => {
  const isView = mode === 'view';
  const isProcess = mode === 'processRegistry';
  const isEdit = mode === "edit"

  const [formData, setFormData] = useState({
    fullName: data?.fullName || '',
    email: data?.email || '',
    phone: data?.phone || '',
    identityCard: data?.identityCard || '',
    dateOfBirth: data?.dateOfBirth || null,
    gender: data?.gender || 'Nam',
  });

  useEffect(() => {
    if (data && !isProcess) {
      setFormData({
        fullName: data.fullName || data.fullname || '', 
        email: data.email || '',
        phone: data.phone || '',
        identityCard: data.identityCard || '',
        dateOfBirth: data.dateOfBirth || null,
        gender: data.gender || 'Nam',
      });
    } else {
      setFormData({ fullName: '', email: '', phone: '', identityCard: '', dateOfBirth: null, gender: 'Nam' });
    }
  }, [data, mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date ? date.toISOString() : null,
    }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data || !data._id) {
      return; 
    }
    
    const payload = { ...formData };
    
    onSubmit(data._id, payload); 
  };

  const totalPages = pendingPagination?.totalPage || pendingPagination?.totalPages || 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            {isView ? 'Hồ sơ tóm tắt' : isProcess ? 'Các lượt đăng ký gần đây' : isEdit ? 'Sửa thông tin' : 'Nội dung bị lỗi'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isView ? 'Xem chi tiết thông tin nhân viên' : isProcess ? 'Xét duyệt thông tin nhân viên' : isEdit ? 'Sửa thông tin nhân viên' : "Nội dung bị lỗi"}
          </DialogDescription>
        </DialogHeader>

        {isView ? (
          <div className="space-y-4 py-2 text-sm">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xl shrink-0">
                {data?.avatarUrl || <User />}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">{data?.fullname}</h3>
                <p className="text-xs text-gray-500">{data?.position || 'Manager'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-400 block">Email</span>
                <span className="font-semibold text-gray-800 break-all">{data?.email}</span>
              </div>
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-400 block">Phòng ban</span>
                <span className="font-semibold text-indigo-600">{data?.department || "Fullstack Developer"}</span>
              </div>
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-400 block">Trạng thái</span>
                <span className="font-semibold text-emerald-600">
                  {data?.status === 'active' ? 'Hoạt động' : 'Đang nghỉ'}
                </span>
              </div>
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-400 block">Mã nhân viên</span>
                <span className="font-semibold text-gray-800">{data?.code}</span>
              </div>
            </div>
          </div>
        ) : isProcess ? (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">STT</TableHead>
                  <TableHead>Thông tin</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data.length > 0 ? (
                  data.map((emp, index) => {
                    const itemIndex = (pendingPageNumber - 1) * (pendingPagination?.pageSize || 5) + index + 1;

                    return (
                      <TableRow key={emp._id} className="hover:bg-slate-50 transition-colors group">
                        <TableCell className="font-medium text-slate-500 text-center">
                          {itemIndex}
                        </TableCell>

                        <TableCell className="min-w-75">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full border border-slate-200 shrink-0 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                              <User className="w-6 h-6" strokeWidth={2} />
                            </div>

                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-900 text-base">
                                {emp.fullName}
                              </span>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                <Mail className="w-3.5 h-3.5" />
                                {emp.email}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                                <Phone className="w-3.5 h-3.5" />
                                {emp.phone || 'Chưa cập nhật'}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="min-w-50">
                          <div className="flex flex-col gap-2 pt-1">
                            <div className="text-sm flex items-center gap-2">
                              <span className="text-slate-500 w-18">Phòng ban:</span>
                              <span className="font-medium text-slate-800">
                                {emp.departmentId?.name || <span className="text-amber-600 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Chờ phân bổ</span>}
                              </span>
                            </div>
                            <div className="text-sm flex items-center gap-2">
                              <span className="text-slate-500 w-18">Vị trí:</span>
                              <span className="font-medium text-slate-800">
                                {emp.positionId?.name || '- - -'}
                              </span>
                            </div>
                            <div className="text-sm flex items-center gap-2">
                              <span className="text-slate-500 w-18">Cấp bậc:</span>
                              <span className="font-medium text-slate-800">
                                {emp.level || 'Chưa cấp'}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => onApprove(emp._id)}
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm rounded-lg"
                            >
                              <Check className="w-4 h-4 mr-1.5" />
                              Duyệt
                            </Button>
                            <Button
                              onClick={() => onReject(emp._id)}
                              size="sm"
                              variant="destructive"
                              className="shadow-sm rounded-lg"
                            >
                              <X className="w-4 h-4 mr-1.5" />
                              Từ chối
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                      Không có lượt đăng ký nào chờ duyệt.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t pt-4">
                <p className="text-sm text-slate-500">
                  Đang hiển thị trang {pendingPageNumber} / {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingPageNumber((prev) => Math.max(prev - 1, 1))}
                    disabled={pendingPageNumber === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Trước
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingPageNumber((prev) => Math.min(prev + 1, totalPages))}
                    disabled={pendingPageNumber >= totalPages}
                  >
                    Sau <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Label htmlFor="full-name-1">Tên</Label>
                <Input id="full-name-1" name="fullname" value={formData.fullName} onChange={handleInputChange} />
              </Field>
              <Field>
                <Label htmlFor="email-1">Email</Label>
                <Input id="email-1" name="email" value={formData.email} onChange={handleInputChange} />
              </Field>
              <Field>
                <Label htmlFor="phone-1">Số điện thoại</Label>
                <Input id="phone-1" name="phone" value={formData.phone} onChange={handleInputChange} />
              </Field>
              <Field>
                <Label htmlFor="dob-1">Ngày sinh</Label>
                <DatePicker
                  format="DD-MM-YYYY"
                  size="large"
                  className="w-full rounded-xl!"
                  value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                  onChange={handleDateChange}
                  disabledDate={(d) => d && d.isAfter(dayjs())}
                />
              </Field>
              <Field>
                <Label htmlFor="gender-1">Giới tính</Label>
                <Segmented
                  block
                  size="large"
                  className="rounded-xl! p-1 bg-slate-100"
                  value={formData.gender}
                  onChange={handleGenderChange}
                  options={[
                    { label: 'Nam', value: 'Nam' },
                    { label: 'Nữ', value: 'Nữ' },
                    { label: 'Khác', value: 'Khác' },
                  ]}
                />
              </Field>
              <Field>
                <Label htmlFor="identity-1">CCCD/ CMND</Label>
                <Input id="identity-1" name="identityCard" value={formData.identityCard} onChange={handleInputChange} />
              </Field>
            </FieldGroup>
            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-blue-600 text-white">
                Lưu thay đổi
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModal;