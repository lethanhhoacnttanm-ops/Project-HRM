import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { User, Check, X, Mail, Phone, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeModal = ({ isOpen, onClose, mode, data, pendingPagination, setPendingPageNumber, pendingPageNumber }) => {
  const isView = mode === 'view';
  const isProcess = mode === 'processRegistry';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
  });

  useEffect(() => {
    if (data && !isProcess) {
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

  const totalPages = pendingPagination?.totalPage || pendingPagination?.totalPages || 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            {isView ? 'Hồ sơ tóm tắt' : isProcess ? 'Các lượt đăng ký gần đây' : 'Lượt đăng ký gần đây'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isView ? 'Xem chi tiết thông tin nhân viên' : 'Xét duyệt thông tin nhân viên'}
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
        ) : (
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
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm rounded-lg"
                            >
                              <Check className="w-4 h-4 mr-1.5" />
                              Duyệt
                            </Button>
                            <Button
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModal;