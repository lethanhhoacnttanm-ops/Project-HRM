import React from 'react';
import { Form, Input, Button, Divider, Segmented, notification, Checkbox, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth.js';

const LoginPage = () => {
  const [form] = Form.useForm();
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await handleLogin(values);

      const userRole = res?.data?.role;

      notification.success({
        message: 'Đăng nhập thành công!',
        description: `Chào mừng ${res.data?.fullName || 'bạn'} quay trở lại hệ thống.`,
        placement: 'topRight',
        duration: 2,
      });

      setTimeout(() => {
      if (userRole === 'ADMIN') {
        navigate('/admin-page/dashboard', { replace: true });
      } else {
        navigate('/employee/dashboard', { replace: true });
      }
    }, 800);

    } catch (error) {
      notification.error({
        title: 'Đăng nhập thất bại!',
        description: error.message,
        placement: 'topRight',
        duration: 3,
      });
    }
  };

  const handleGoogle = () => {
    notification.info({
      title: 'Tính năng đang phát triển',
      description: 'Đăng nhập bằng Google sẽ sớm được hỗ trợ!',
      placement: 'topRight',
    });
  };

  return (
    <div className="w-full">
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="[&_.ant-form-item]:mb-4"
          disabled={loading}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="lethanhhoa@company.com"
              size="large"
              autoComplete="off"
              className="rounded-xl!"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••"
              size="large"
              autoComplete="new-password"
              className="rounded-xl!"
            />
          </Form.Item>

          <div className="flex items-center justify-between w-full relative py-2 mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-xs text-gray-500">Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>

            <Link
              to="/forgotpassword"
              className="text-sm text-[#2563eb] hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="rounded-xl! font-semibold! h-11! bg-linear-to-r! from-[#2563eb]! to-[#0ea5e9]! border-none! shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]! hover:brightness-108 transition-all mt-2"
          >
            Đăng nhập
          </Button>

          <Divider plain style={{ margin: '14px 0', borderColor: 'rgba(148,163,184,0.25)' }}>
            <span className="text-[12px] text-[#94a3b8]">hoặc</span>
          </Divider>

          <Button
            htmlType="button"
            block
            size="large"
            icon={<GoogleOutlined className="text-[#ea4335]! text-lg!" />}
            onClick={handleGoogle}
            className="rounded-xl! h-11! font-medium! border-[#e2e8f0]! text-[#334155]! flex items-center justify-center gap-2 hover:border-[#2563eb]! hover:text-[#2563eb]! hover:bg-[#eff6ff]!"
          >
            Đăng nhập với Google
          </Button>
        </Form>
      </Spin>

      <div className="flex justify-end sm:justify-center mt-4.5 pt-3.5 border-t border-dashed border-[rgba(148,163,184,0.3)]">
        <Segmented
          value="login"
          onChange={(val) => {
            if (val === 'register') {
              navigate('/register');
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

export default LoginPage;