import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';

const ContractModal = ({ isOpen, onClose, mode, data }) => {
  const [form] = Form.useForm();

  const isView = mode === 'view';
  const isCreate = mode === 'create';
  const isCancel = mode === 'cancel';

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={
        <span className="text-lg font-bold text-gray-800">
          {isCreate ? 'Tạo hợp đồng mới' : isView ? 'Chi tiết hợp đồng' : 'Xác nhận hủy hợp đồng'}
        </span>
      }
      centered
      className="rounded-2xl"
    >
      {isView && (
        <div className="space-y-4 py-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <p><span className="text-gray-400 w-28 inline-block">Mã HĐ:</span> <strong className="text-gray-800">{data?.code}</strong></p>
            <p><span className="text-gray-400 w-28 inline-block">Nhân viên:</span> <strong className="text-gray-800">{data?.name}</strong></p>
            <p><span className="text-gray-400 w-28 inline-block">Email:</span> <strong className="text-gray-800">{data?.email}</strong></p>
            <p><span className="text-gray-400 w-28 inline-block">Loại HĐ:</span> <strong className="text-indigo-600">{data?.type}</strong></p>
            <p><span className="text-gray-400 w-28 inline-block">Thời hạn:</span> <strong className="text-gray-800">{data?.startDate} - {data?.endDate}</strong></p>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={onClose} className="rounded-xl">Đóng</Button>
          </div>
        </div>
      )}

      {isCancel && (
        <div className="space-y-4 py-3 text-sm">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn hủy hợp đồng <strong className="text-red-600">{data?.code}</strong> của nhân viên <strong>{data?.name}</strong> không?
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={onClose} className="rounded-xl">Không</Button>
            <Button type="primary" danger onClick={onClose} className="rounded-xl">Xác nhận hủy</Button>
          </div>
        </div>
      )}

      {isCreate && (
        <Form form={form} layout="vertical" className="pt-3 space-y-3">
          <Form.Item label="Nhân viên" name="name" rules={[{ required: true, message: 'Nhập tên nhân viên' }]}>
            <Input placeholder="Nguyễn Văn A" className="rounded-xl py-2 text-xs" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item label="Mã HĐ" name="code" rules={[{ required: true }]}>
              <Input placeholder="HĐ-1223" className="rounded-xl py-2 text-xs" />
            </Form.Item>
            <Form.Item label="Loại HĐ" name="type" rules={[{ required: true }]}>
              <Select options={[{ value: 'Fulltime', label: 'Fulltime' }, { value: 'Parttime', label: 'Parttime' }]} className="h-10" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item label="Ngày bắt đầu" name="startDate">
              <DatePicker className="w-full h-10 rounded-xl" />
            </Form.Item>
            <Form.Item label="Ngày kết thúc" name="endDate">
              <DatePicker className="w-full h-10 rounded-xl" />
            </Form.Item>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={onClose} className="rounded-xl">Hủy</Button>
            <Button type="primary" onClick={onClose} className="bg-blue-600 rounded-xl">Tạo mới</Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ContractModal;