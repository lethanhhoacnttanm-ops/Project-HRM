import React from 'react';
import { Modal, Button, Tabs, Tag, Input } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const CandidateDetailModal = ({ isOpen, onClose, candidate }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={680}
      centered
      className="rounded-2xl"
      title={<span className="text-lg font-bold text-gray-800">Hồ sơ ứng viên</span>}
    >
      <div className="space-y-4 py-2">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xl">
              <UserOutlined />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-800 text-base">{candidate?.name}</h3>
              <p className="text-xs text-indigo-600 font-semibold">{candidate?.jobTitle}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                <span><MailOutlined /> {candidate?.email}</span>
                <span><PhoneOutlined /> {candidate?.phone}</span>
              </div>
            </div>
          </div>
          <Tag color="purple" className="rounded-lg font-bold">{candidate?.stageName || 'Hồ sơ mới'}</Tag>
        </div>

        <Tabs
          items={[
            {
              key: '1',
              label: 'Đánh giá & Ghi chú phỏng vấn',
              children: (
                <div className="space-y-3 text-xs pt-2">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Nhận xét chuyên môn / Thái độ:</label>
                    <Input.TextArea rows={4} placeholder="Nhập nhận xét phỏng vấn tại đây..." className="rounded-xl text-xs" />
                  </div>
                </div>
              ),
            },
            {
              key: '2',
              label: 'Xem File CV',
              children: (
                <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs">
                  [ Bản xem trước File CV PDF của ứng viên ]
                </div>
              ),
            },
          ]}
        />

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Button
            type="primary"
            danger
            icon={<CloseCircleOutlined />}
            onClick={onClose}
            className="rounded-xl font-bold border-none"
          >
            Từ chối ứng viên
          </Button>

          <div className="flex items-center gap-2">
            <Button onClick={onClose} className="rounded-xl font-bold">Đóng</Button>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 border-none rounded-xl font-bold"
            >
              Phê duyệt / Chuyển vòng tiếp
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CandidateDetailModal;