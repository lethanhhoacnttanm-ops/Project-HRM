import { useState } from 'react';
import { Form, Input, Button, Segmented, DatePicker, notification, Select, Spin } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { UserOutlined, LockOutlined, IdcardOutlined, MailOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAuth } from '../../hooks/useAuth.js';

const RegisterPage = () => {
  const [form] = Form.useForm();
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();


  const onFinish = async (values) => {
     try {
      const formattedData = {
        ...values,
        dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
      };

      const res = await handleRegister(formattedData);

      notification.success({
        title: 'Đăng ký thành công!',
        description: res.message || `Tài khoản nhân viên ${res.data?.fullName} đã được khởi tạo.`,
        placement: 'topRight',
        duration: 3,
      });

      
      navigate('/login', { replace: true });
     

    } catch (error) {
      console.log("Lỗi ở đây ", error)
      notification.error({
        title: 'Đăng ký thất bại!',
        description: error.message || 'Có lỗi xảy ra trong quá trình đăng ký, vui lòng thử lại.',
        placement: 'topRight',
        duration: 4,
      });
    } 
  };

  return (
    <div className="w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="[&_.ant-form-item]:mb-3.5"
      >
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Nguyễn Văn A" 
            size="large" 
            className="rounded-xl!" 
          />
        </Form.Item>

        <Form.Item
          name="identityCard"
          label="Số CCCD / CMND"
          rules={[{ required: true, message: 'Vui lòng nhập CCCD!' }]}
        >
          <Input 
            prefix={<IdcardOutlined />} 
            placeholder="Nhập số CCCD" 
            size="large" 
            className="rounded-xl!" 
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email của bạn!' },
            { type: 'email', message: 'Email không đúng định dạng!' }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="an.nguyen@company.com" 
            size="large" 
            className="rounded-xl!" 
          />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item
            name="gender"
            label="Giới tính"
            initialValue="Nam"
          >
            <Segmented
              block
              size="large"
              className="rounded-xl! p-1 bg-slate-100"
              options={[
                { label: 'Nam', value: 'male' },
                { label: 'Nữ', value: 'female' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="birthday"
            label="Ngày sinh"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              size="large"
              className="w-full rounded-xl!"
              placeholder="YYYY-MM-DD"
              disabledDate={(d) => d && d.isAfter(dayjs())}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="••••••" 
            size="large" 
            autoComplete="new-password" 
            className="rounded-xl!" 
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="••••••" 
            size="large" 
            autoComplete="new-password" 
            className="rounded-xl!" 
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
          className="rounded-xl! font-semibold! h-11! bg-linear-to-r! from-[#2563eb]! to-[#0ea5e9]! border-none! shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]! hover:brightness-108 transition-all mt-2"
        >
          Đăng ký tài khoản
        </Button>
      </Form>

      <div className="flex justify-end sm:justify-center mt-4.5 pt-3.5 border-t border-dashed border-[rgba(148,163,184,0.3)]">
        <Segmented
          value="register"
          onChange={(val) => {
            if (val === 'login') {
              navigate('/login');
            }
          }}
          block
          size="large"
          className="rounded-2xl! font-medium bg-gray-100"
          options={[
            { label: 'Đăng nhập', value: 'login' },
            { label: 'Đăng ký', value: 'register' },
          ]}
        />
      </div>
    </div>
  );
}

export default RegisterPage