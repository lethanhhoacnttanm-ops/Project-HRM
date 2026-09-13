import React, { useEffect, useState } from 'react';
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const EmployeeModal = ({ isOpen, onClose, onDisable, onEnable, onSubmitCreate, mode, data, onSubmit }) => {
  const isView = mode === 'view';
  const isProcess = mode === 'processRegistry';
  const isEdit = mode === "edit"
  const isDisable = mode === "disable"
  const isEnable = mode === "enable";

  const [disableReason, setDisableReason] = useState("");

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
    if (isDisable) return 'Vô hiệu hóa tài khoản';
    if (isEnable) return 'Khôi phục tài khoản';
    return 'Thông tin';
  };

  const handleDisableSubmit = (values) => {
    const employeeId = data?._id;
    const reason = values.reason;

    if (onDisable) {
      onDisable(employeeId, reason);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl rounded-2xl p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {getModalTitle()}
          </DialogDescription>
        </DialogHeader>

        {isView && data ? (
          <div className="space-y-4 py-2 text-sm">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-xl shrink-0">
                {data.avatarUrl || <User />}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base">{data.fullName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{data.position?.name || 'Nhân viên'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-[#141414]">
                <span className="text-gray-400 dark:text-gray-500 block">Email</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 break-all">{data.email}</span>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-[#141414]">
                <span className="text-gray-400 dark:text-gray-500 block">Phòng ban</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {data.department?.name || "Chưa cập nhật"}
                </span>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-[#141414]">
                <span className="text-gray-400 dark:text-gray-500 block">Trạng thái</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {data.status === 'active' ? 'Hoạt động' : 'Đang nghỉ'}
                </span>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-[#141414]">
                <span className="text-gray-400 dark:text-gray-500 block">CCCD / CMND</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{data.identityCard}</span>
              </div>
            </div>
          </div>

        ) : isDisable ? (
          <div className="space-y-4 pt-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 leading-relaxed font-medium">
              Cảnh báo: Hành động này sẽ vô hiệu hóa tài khoản của nhân sự <span className="font-bold">{data?.fullName}</span>. Nhân sự sẽ không thể đăng nhập vào hệ thống.
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Chọn lý do vô hiệu hóa <span className="text-red-500">*</span>
              </label>

              <Select value={disableReason} onValueChange={setDisableReason}>
                <SelectTrigger className="w-full h-10 rounded-xl text-xs font-medium border-slate-200 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder="Chọn lý do vi phạm" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Vi phạm nội quy công ty" className="text-xs font-medium cursor-pointer">
                    Vi phạm nội quy công ty
                  </SelectItem>
                  <SelectItem value="Gian lận chấm công" className="text-xs font-medium cursor-pointer">
                    Gian lận chấm công
                  </SelectItem>
                  <SelectItem value="Nghỉ việc/Đã thôi việc" className="text-xs font-medium cursor-pointer">
                    Nghỉ việc/Đã thôi việc
                  </SelectItem>
                  <SelectItem value="Lý do cá nhân khác" className="text-xs font-medium cursor-pointer">
                    Lý do cá nhân khác
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-6 border-t border-slate-100 dark:border-gray-800">
              <Button type="button" onClick={onClose} className="rounded-xl bg-transparent hover:bg-gray-100 border border-gray-300 text-black dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer">
                Hủy
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (!disableReason) {
                    return;
                  }
                  if (onDisable) onDisable(data?._id, disableReason);
                }}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl border-none cursor-pointer"
              >
                Xác nhận vô hiệu hóa
              </Button>
            </div>
          </div>

        ) : isEnable ? (
          <div className="space-y-4 pt-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 leading-relaxed font-medium">
              Xác nhận khôi phục tài khoản cho nhân sự <span className="font-bold">{data?.fullName}</span>? Tài khoản sẽ chuyển về trạng thái <span className="font-bold text-emerald-600">Active</span> và nhân sự có thể đăng nhập lại bình thường.
            </div>

            <div className="flex justify-end gap-2 pt-6 border-t border-slate-100 dark:border-gray-800">
              <Button type="button" onClick={onClose} className="rounded-xl bg-transparent hover:bg-gray-100 border border-gray-300 text-black dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer">
                Hủy
              </Button>
              <Button type="button" onClick={() => onEnable && onEnable(data?._id)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl border-none cursor-pointer">
                Xác nhận mở khóa
              </Button>
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
                <Input prefix={<User className="text-gray-400 w-4.5 h-4.5" />} placeholder="Nguyễn Văn A" size="large" className="rounded-xl! dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" />
              </Form.Item>

              <Form.Item name="identityCard" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Số CCCD / CMND</span>} rules={[{ required: true, message: 'Vui lòng nhập CCCD!' }]} className="mb-0">
                <Input prefix={<IdCard className="text-gray-400 w-4.5 h-4.5" />} placeholder="Nhập số CCCD" size="large" className="rounded-xl! dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" />
              </Form.Item>

              <Form.Item name="phone" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Số điện thoại</span>} rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]} className="mb-0">
                <Input prefix={<Phone className="text-gray-400 w-4.5 h-4.5" />} placeholder="Số điện thoại" size="large" className="rounded-xl! dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" />
              </Form.Item>

              <Form.Item name="email" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email</span>} rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]} className="mb-0">
                <Input prefix={<Mail className="text-gray-400 w-4.5 h-4.5" />} placeholder="an.nguyen@company.com" size="large" className="rounded-xl! dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" />
              </Form.Item>

              <Form.Item name="dateOfBirth" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Ngày sinh</span>} rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]} className="mb-0">
                <DatePicker format="YYYY-MM-DD" size="large" className="w-full rounded-xl! dark:bg-gray-800 dark:border-gray-700 dark:text-white [&_.ant-picker-input>input]:dark:text-white" placeholder="YYYY-MM-DD" disabledDate={(d) => d && d.isAfter(dayjs())} />
              </Form.Item>

              <Form.Item name="gender" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Giới tính</span>} initialValue="Nam" className="mb-0">
                <Segmented block size="large" className="rounded-xl! p-1 bg-slate-100 dark:bg-[#141414] dark:text-gray-300 [&_.ant-segmented-item-selected]:dark:bg-gray-800 [&_.ant-segmented-item-selected]:dark:text-white" options={[{ label: 'Nam', value: 'Nam' }, { label: 'Nữ', value: 'Nữ' }, { label: 'Khác', value: 'Khác' }]} />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="password" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{isEdit ? 'Mật khẩu mới (Bỏ trống nếu không đổi)' : 'Mật khẩu'}</span>} rules={[{ required: isProcess, message: 'Vui lòng nhập mật khẩu!' }, { min: 6, message: 'Tối thiểu 6 ký tự!' }]} className="mb-0">
                <Input.Password prefix={<Lock className="text-gray-400 w-4.5 h-4.5" />} placeholder="••••••" size="large" autoComplete="new-password" className="rounded-xl! dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" />
              </Form.Item>

              <Form.Item name="confirmPassword" label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Xác nhận mật khẩu</span>} dependencies={['password']} rules={[{ required: isProcess, message: 'Vui lòng xác nhận mật khẩu!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) return Promise.resolve(); return Promise.reject(new Error('Mật khẩu xác nhận không khớp!')); } })]} className="mb-0">
                <Input.Password prefix={<Lock className="text-gray-400 w-4.5 h-4.5" />} placeholder="••••••" size="large" autoComplete="new-password" className="rounded-xl! dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" />
              </Form.Item>
            </div>

            <div className="flex justify-end gap-2 pt-6">
              <Button type="button" onClick={onClose} className="rounded-xl bg-transparent hover:bg-gray-100 border border-gray-300 text-black dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl border-none cursor-pointer">
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