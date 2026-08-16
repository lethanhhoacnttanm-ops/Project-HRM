import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import dayjs from 'dayjs';
import { Form, Segmented, DatePicker, Input } from 'antd';
import { User, Lock, IdCard, Mail, Phone } from 'lucide-react';

const EmployeeModal = ({ isOpen, onClose, onSubmitCreate, mode, data, onSubmit }) => {
  const isView = mode === 'view';
  const isProcess = mode === 'processRegistry';
  const isEdit = mode === "edit"

  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      if (!isView) {
        if (isEdit && data) {
          form.setFieldsValue({
            fullName: data.fullName || data.fullname || '',
            email: data.email || '',
            phone: data.phone || '',
            identityCard: data.identityCard || '',
            gender: data.gender || 'Nam',
            dateOfBirth: data.dateOfBirth ? dayjs(data.dateOfBirth) : null,
          });
        } else {
          form.resetFields();
        }
      }
    }
  }, [isOpen, mode, data, form, isView, isEdit]);

  const handleFinish = (values) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null,
    };

    if (isProcess) {
      onSubmitCreate(payload);
    } else if (isEdit && data?._id) {
      if (!payload.password) {
        delete payload.password;
        delete payload.confirmPassword;
      }
      onSubmit(data._id, payload);
    }
  };

  const getModalTitle = () => {
    if (isView) return 'Hồ sơ nhân sự';
    if (isProcess) return 'Thêm nhân sự mới';
    if (isEdit) return 'Chỉnh sửa thông tin';
    return 'Thông tin';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800 dark:text-amber-50/50">
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {getModalTitle()}
          </DialogDescription>
        </DialogHeader>

        {isView && data ? (
          <div className="space-y-4 py-2 text-sm">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-xl shrink-0">
                {data.avatarUrl || <User />}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base">{data.fullName || data.fullname}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{data.position || 'Nhân viên'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl dark:bg-[#141414]">
                <span className="text-gray-400 block">Email</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 break-all">{data.email}</span>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl dark:bg-[#141414]">
                <span className="text-gray-400 block">Phòng ban</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{data.department || "Chưa cập nhật"}</span>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl dark:bg-[#141414]">
                <span className="text-gray-400 block">Trạng thái</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {data.status === 'active' ? 'Hoạt động' : 'Đang nghỉ'}
                </span>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl dark:bg-[#141414]">
                <span className="text-gray-400 block">CCCD / CMND</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{data.identityCard}</span>
              </div>
            </div>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="pt-3 space-y-4"
            requiredMark={false}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="fullName" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Họ & Tên</span>} rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]} className="mb-0">
                <Input prefix={<User className="text-gray-400 w-4.5 h-4.5" />} placeholder="Nguyễn Văn A" size="large" className="rounded-xl!" />
              </Form.Item>

              <Form.Item name="identityCard" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Số CCCD / CMND</span>} rules={[{ required: true, message: 'Vui lòng nhập CCCD!' }]} className="mb-0">
                <Input prefix={<IdCard className="text-gray-400 w-4.5 h-4.5" />} placeholder="Nhập số CCCD" size="large" className="rounded-xl!" />
              </Form.Item>

              <Form.Item name="phone" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Số điện thoại</span>} rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]} className="mb-0">
                <Input prefix={<Phone className="text-gray-400 w-4.5 h-4.5" />} placeholder="Số điện thoại" size="large" className="rounded-xl!" />
              </Form.Item>

              <Form.Item name="email" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email</span>} rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]} className="mb-0">
                <Input prefix={<Mail className="text-gray-400 w-4.5 h-4.5" />} placeholder="an.nguyen@company.com" size="large" className="rounded-xl!" />
              </Form.Item>

              <Form.Item name="dateOfBirth" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Ngày sinh</span>} rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]} className="mb-0">
                <DatePicker format="YYYY-MM-DD" size="large" className="w-full rounded-xl!" placeholder="YYYY-MM-DD" disabledDate={(d) => d && d.isAfter(dayjs())} />
              </Form.Item>

              <Form.Item name="gender" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Giới tính</span>} initialValue="Nam" className="mb-0">
                <Segmented block size="large" className="rounded-xl! p-1 bg-slate-100 dark:bg-[#141414] dark:text-gray-300" options={[{ label: 'Nam', value: 'Nam' }, { label: 'Nữ', value: 'Nữ' }, { label: 'Khác', value: 'Khác' }]} />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="password" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{isEdit ? 'Mật khẩu mới (Bỏ trống nếu không đổi)' : 'Mật khẩu'}</span>} rules={[{ required: isProcess, message: 'Vui lòng nhập mật khẩu!' }, { min: 6, message: 'Tối thiểu 6 ký tự!' }]} className="mb-0">
                <Input.Password prefix={<Lock className="text-gray-400 w-4.5 h-4.5" />} placeholder="••••••" size="large" autoComplete="new-password" className="rounded-xl!" />
              </Form.Item>

              <Form.Item name="confirmPassword" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Xác nhận mật khẩu</span>} dependencies={['password']} rules={[{ required: isProcess, message: 'Vui lòng xác nhận mật khẩu!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) return Promise.resolve(); return Promise.reject(new Error('Mật khẩu xác nhận không khớp!')); } })]} className="mb-0">
                <Input.Password prefix={<Lock className="text-gray-400 w-4.5 h-4.5" />} placeholder="••••••" size="large" autoComplete="new-password" className="rounded-xl!" />
              </Form.Item>
            </div>

            <div className="flex justify-end gap-2 pt-6">
              <Button type="button" onClick={onClose} className="rounded-xl bg-transparent hover:bg-gray-300 border-gray-300 text-black dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400">
                Hủy
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl border-none">
                {isEdit ? 'Lưu thay đổi' : 'Tạo mới'}
              </Button>
            </div>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModal;