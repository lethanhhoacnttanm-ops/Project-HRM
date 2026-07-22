import { useState } from 'react';
import { Form, Input, Button, Divider, Segmented, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';

export default function LoginPage() {
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

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));

      const ok = values.username === 'admin' && values.password === '123456';

      if (ok) {
        openNotification(
          'success', 
          'Đăng nhập thành công', 
          `Chào mừng ${values.username} quay lại HRM System!`
        );
      } else {
        openNotification(
          'error', 
          'Đăng nhập thất bại', 
          'Tên đăng nhập hoặc mật khẩu không đúng.'
        );
      }
    } catch (error) {
      openNotification('error', 'Lỗi hệ thống', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    openNotification(
      'info', 
      'Google Sign-In', 
      'Tính năng đăng nhập bằng Google đang được phát triển.'
    );
  };

  return (
    <div className="w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
        requiredMark={false}
        className="[&_.ant-form-item]:mb-4"
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="admin" 
            size="large" 
            autoComplete="username" 
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
            autoComplete="current-password"
            className="rounded-xl!"
          />

          <div className="w-full relative p-2">
            <Link 
              to="/forgotpassword" 
              className="absolute inset-y-0 right-0 text-sm text-[#2563eb] hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </Form.Item>

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
          block 
          size="large" 
          icon={<GoogleOutlined className="text-[#ea4335]! text-lg!" />} 
          onClick={handleGoogle} 
          className="rounded-xl! h-11! font-medium! border-[#e2e8f0]! text-[#334155]! flex items-center justify-center gap-2 hover:border-[#2563eb]! hover:text-[#2563eb]! hover:bg-[#eff6ff]!"
        >
          Đăng nhập với Google
        </Button>
      </Form>

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