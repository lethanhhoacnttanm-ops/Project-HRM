import { useState } from 'react';
import { Form, Input, Button, Segmented, DatePicker, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1100));

      openNotification(
        'success',
        'Đăng ký thành công',
        `Tài khoản ${values.username} đã được tạo thành công! Vui lòng đăng nhập.`
      );

      form.resetFields();
      navigate('/login');
    } catch (error) {
      openNotification('error', 'Đăng ký thất bại', 'Có lỗi xảy ra trong quá trình tạo tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleRegister}
        requiredMark={false}
        initialValues={{ gender: 'male' }}
        className="[&_.ant-form-item]:mb-3.5"
      >
        <Form.Item
          name="fullname"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input 
            prefix={<IdcardOutlined />} 
            placeholder="Nguyễn Văn A" 
            size="large" 
            className="rounded-xl!" 
          />
        </Form.Item>

        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="username" 
            size="large" 
            className="rounded-xl!" 
          />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Segmented
              block
              size="large"
              className="rounded-xl! p-1 bg-slate-100"
              options={[
                { label: 'Nam', value: 'male' },
                { label: 'Nữ', value: 'female' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="birthday"
            label="Ngày sinh"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              size="large"
              className="w-full rounded-xl!"
              placeholder="Chọn ngày sinh"
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
          name="confirmpassword"
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
          Đăng ký
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