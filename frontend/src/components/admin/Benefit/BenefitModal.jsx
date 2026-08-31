import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const BenefitModal = ({ isOpen, onClose, mode, onSubmit, loading, data, dataOption, fetchDataEmp }) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && data) {
        form.setFieldsValue({
          title: data.title,
          type: data.type,
          amount: data.amount,
          frequency: data.frequency,
          status: data.status,
          description: data.description,
        });
      } else if (mode === 'create') {
        form.resetFields();
      } else if (mode === 'assign' && data) {
        form.resetFields();
        const existingIds = data.assignedEmployees?.map(emp => emp._id || emp) || [];
        setSelectedRowKeys(existingIds);
        fetchDataEmp();
      }
    }
  }, [isOpen, mode, data, form]);

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = dataOption.map(emp => emp._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleFinish = async () => {
    console.log("Nút đã được click, mode hiện tại là:", mode);
    try {
      if (mode === 'assign') {
        console.log("Danh sách ID nhân sự gửi lên:", selectedIds);
        await onSubmit(selectedIds, mode, data);
      } else {
        const values = await form.validateFields();
        onSubmit(values, mode, data);
      }
    } catch (error) {
      console.error("Lỗi validate hoặc submit:", error);
    }
  };


  const getTitle = () => {
    if (mode === 'create') return 'Tạo chính sách phúc lợi mới';
    if (mode === 'edit') return `Chỉnh sửa: ${data?.title || ''}`;
    if (mode === 'assign') return `Áp dụng nhân sự cho: ${data?.title || ''}`;
    return 'Quản lý phúc lợi';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl rounded-2xl p-6 max-h-[85vh] flex flex-col overflow-hidden bg-white">

        <DialogHeader className="shrink-0 space-y-1 pb-2">
          <DialogTitle className="text-base font-bold text-slate-900">
            {getTitle()}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {mode === 'assign'
              ? 'Tích chọn các nhân sự bên dưới để áp dụng gói phúc lợi này.'
              : 'Thiết lập thông tin gói chính sách phúc lợi cho nhân viên.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-3 my-2">
          {mode === 'assign' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                Đã chọn: <strong className="text-indigo-600">{selectedIds.length}</strong> nhân sự
              </p>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead className="w-12.5 text-center">
                        <Checkbox
                          checked={dataOption.length > 0 && selectedIds.length === dataOption.length}
                          onCheckedChange={(checked) => handleSelectAll(checked)}
                        />
                      </TableHead>
                      <TableHead className="font-bold text-slate-700">Họ và tên</TableHead>
                      <TableHead className="font-bold text-slate-700">Email</TableHead>
                      <TableHead className="font-bold text-slate-700">Phòng ban</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-slate-400">
                          Đang tải danh sách nhân sự...
                        </TableCell>
                      </TableRow>
                    ) : dataOption.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-slate-400">
                          Không tìm thấy nhân sự nào.
                        </TableCell>
                      </TableRow>
                    ) : (
                      dataOption.map((emp) => {
                        const assignedIds = data?.assignedEmployees?.map(item => item._id || item) || [];
                        const isAlreadyAssigned = assignedIds.includes(emp._id);
                        const isSelected = selectedIds.includes(emp._id);

                        return (
                          <TableRow
                            key={emp._id}
                            className={`transition-colors ${isAlreadyAssigned ? 'bg-slate-50 opacity-75' : 'hover:bg-slate-50/50 cursor-pointer'}`}
                            onClick={() => {
                              if (!isAlreadyAssigned) handleToggleSelect(emp._id);
                            }}
                          >
                            <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={isSelected || isAlreadyAssigned}
                                disabled={isAlreadyAssigned}
                                onCheckedChange={() => {
                                  if (!isAlreadyAssigned) handleToggleSelect(emp._id);
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-semibold text-slate-800 flex items-center gap-2 py-3">
                              {emp.fullName}
                              {isAlreadyAssigned && (
                                <span className="text-[10px] bg-indigo-50 text-indigo-600 font-medium px-2 py-0.5 rounded-full">
                                  Đã áp dụng
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-slate-600">{emp.email}</TableCell>
                            <TableCell className="text-slate-600">{emp.department?.name || 'Chưa phân bổ'}</TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <Form form={form} layout="vertical" className="space-y-1">
              <Form.Item name="title" label={<span className="text-xs font-semibold text-slate-700">Tên phúc lợi</span>} rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                <Input placeholder="VD: Phụ cấp ăn trưa..." className="rounded-xl h-10 border-slate-200" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="type" label={<span className="text-xs font-semibold text-slate-700">Loại phúc lợi</span>} rules={[{ required: true, message: 'Chọn loại!' }]}>
                  <Select>
                    <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Bảo hiểm">Bảo hiểm</SelectItem>
                      <SelectItem value="Phụ cấp">Phụ cấp</SelectItem>
                      <SelectItem value="Đãi ngộ">Đãi ngộ</SelectItem>
                    </SelectContent>
                  </Select>
                </Form.Item>

                <Form.Item name="amount" label={<span className="text-xs font-semibold text-slate-700">Mức tiền hỗ trợ (VNĐ)</span>} rules={[{ required: true, message: 'Nhập số tiền!' }]}>
                  <Input type="number" placeholder="VD: 1500000" className="rounded-xl h-10 border-slate-200" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="frequency" label={<span className="text-xs font-semibold text-slate-700">Tần suất chi trả</span>} rules={[{ required: true, message: 'Chọn tần suất!' }]}>
                  <Select>
                    <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <SelectValue placeholder="Chọn tần suất" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Hàng tháng">Hàng tháng</SelectItem>
                      <SelectItem value="Hàng quý">Hàng quý</SelectItem>
                      <SelectItem value="Hàng năm">Hàng năm</SelectItem>
                      <SelectItem value="Một lần">Một lần</SelectItem>
                    </SelectContent>
                  </Select>
                </Form.Item>

                <Form.Item name="status" label={<span className="text-xs font-semibold text-slate-700">Trạng thái</span>}>
                  <Select>
                    <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Đang mở">Đang mở</SelectItem>
                      <SelectItem value="Tạm dừng">Tạm dừng</SelectItem>
                    </SelectContent>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item name="description" label={<span className="text-xs font-semibold text-slate-700">Mô tả chi tiết</span>}>
                <Textarea rows={3} placeholder="Nhập mô tả..." className="rounded-xl border-slate-200 resize-none" />
              </Form.Item>
            </Form>
          )}
        </div>

        <div className="shrink-0 pt-3 border-t border-slate-100 flex items-center justify-end gap-3 mt-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl text-xs font-bold cursor-pointer"
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={handleFinish}
            className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            {loading ? "Đang xử lý..." : (mode === 'assign' ? "Lưu phân bổ" : "Xác nhận")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitModal;