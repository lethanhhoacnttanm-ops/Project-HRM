import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const JobModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={<span className="text-lg font-extrabold text-gray-800">Tạo bài đăng tuyển dụng mới</span>}
      centered
      className="rounded-2xl"
    >
      <Form form={form} layout="vertical" className="pt-3 space-y-3">
        <Form.Item label="Tiêu đề công việc" name="title" rules={[{ required: true, message: 'Nhập tiêu đề' }]}>
          <Input placeholder="Kỹ sư sản phẩm cấp cao" className="rounded-xl py-2 text-xs" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-3">
          <Form.Item label="Phòng ban" name="department" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'Business Analyst', label: 'Business Analyst' },
                { value: 'Thiết kế', label: 'Thiết kế' },
                { value: 'Kỹ thuật', label: 'Kỹ thuật' },
              ]}
              className="h-10 text-xs"
            />
          </Form.Item>

          <Form.Item label="Hình thức" name="type" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'Toàn thời gian', label: 'Toàn thời gian' },
                { value: 'Từ xa', label: 'Từ xa' },
              ]}
              className="h-10 text-xs"
            />
          </Form.Item>
        </div>

        <Form.Item label="Mức lương" name="salary">
          <Input placeholder="10.000 - 15.000 USD" className="rounded-xl py-2 text-xs" />
        </Form.Item>

        <Form.Item label="Mô tả / Yêu cầu chính" name="requirements">
          <Input.TextArea rows={3} placeholder="- Có hơn 5 năm kinh nghiệm..." className="rounded-xl text-xs" />
        </Form.Item>

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose} className="rounded-xl font-bold">Hủy</Button>
          <Button type="primary" onClick={onClose} className="bg-indigo-600 rounded-xl font-bold border-none">
            Đăng tin
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default JobModal;