import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tabs, Tag } from 'antd';
import { ArrowLeftOutlined, UserOutlined, MailOutlined, PhoneOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/admin-page/employees')}
        className="rounded-xl border-gray-200 text-gray-600 font-semibold cursor-pointer"
      >
        Quay lại danh sách
      </Button>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 text-3xl font-bold">
            <UserOutlined />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-gray-900">Lương Diệu Kiệt</h1>
              <Tag color="green" className="rounded-md font-semibold">Đang hoạt động</Tag>
            </div>
            <p className="text-sm text-gray-500 mt-1 font-medium">Backend Developer • Mã NV: NV-{id || '001'}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
              <span className="flex items-center gap-1"><MailOutlined /> dieukietbigtech@gmail.com</span>
              <span className="flex items-center gap-1"><PhoneOutlined /> 0901 234 567</span>
            </div>
          </div>
        </div>

        <Button type="primary" className="bg-blue-600 rounded-xl h-10 px-5 font-semibold">
          Chỉnh sửa hồ sơ
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Thông tin cá nhân',
              children: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-sm">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 border-b pb-2">Thông tin cơ bản</h4>
                    <p><span className="text-gray-400 w-32 inline-block">Ngày sinh:</span> 26/01/2004</p>
                    <p><span className="text-gray-400 w-32 inline-block">Giới tính:</span> Nam</p>
                    <p><span className="text-gray-400 w-32 inline-block">CCCD/CMND:</span> 079204001234</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 border-b pb-2">Công tác</h4>
                    <p><span className="text-gray-400 w-32 inline-block">Phòng ban:</span> SmartTeach</p>
                    <p><span className="text-gray-400 w-32 inline-block">Ngày vào làm:</span> 01/10/2025</p>
                    <p><span className="text-gray-400 w-32 inline-block">Loại hợp đồng:</span> Chính thức</p>
                  </div>
                </div>
              ),
            },
            { key: '2', label: 'Hợp đồng & Lương', children: <div className="py-6 text-gray-400">Thông tin Hợp đồng & Lương thưởng...</div> },
            { key: '3', label: 'Lịch sử chấm công', children: <div className="py-6 text-gray-400">Bảng ghi chép Chấm công chi tiết...</div> },
          ]}
        />
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;