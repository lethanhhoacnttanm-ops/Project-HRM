import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const EmployeeModal = ({ isOpen, onClose, mode, data }) => {
  const [form] = Form.useForm();

  const isView = mode === 'view';
  const isAdd = mode === 'add';

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={
        <span className="text-lg font-bold text-gray-800">
          {isView ? 'Hồ sơ tóm tắt' : isAdd ? 'Thêm nhân viên mới' : 'Cập nhật nhân viên'}
        </span>
      }
      centered
      className="rounded-2xl"
    >
      {isView ? (
        <div className="space-y-4 py-4 text-sm">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xl">
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
              <span className="font-semibold text-gray-800">{data?.email}</span>
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
        <Form form={form} layout="vertical" className="pt-4 space-y-3" initialValues={data}>
          <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Nhập họ tên' }]}>
            <Input placeholder="Nguyễn Văn A" className="rounded-xl py-2" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Nhập email' }]}>
            <Input placeholder="example@gmail.com" className="rounded-xl py-2" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item label="Chức vụ" name="position">
              <Input placeholder="Backend Developer" className="rounded-xl py-2" />
            </Form.Item>
            <Form.Item label="Phòng ban" name="department">
              <Select
                options={[
                  { value: 'SmartTeach', label: 'SmartTeach' },
                  { value: 'CI/CD', label: 'CI/CD' },
                ]}
                className="h-10"
              />
            </Form.Item>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={onClose} className="rounded-xl">Hủy</Button>
            <Button type="primary" onClick={onClose} className="bg-blue-600 rounded-xl">
              Lưu
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default EmployeeModal;