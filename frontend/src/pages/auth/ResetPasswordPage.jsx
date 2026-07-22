import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default function ResetPasswordPage() {
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

  const handleSubmitNewPassword = async (values) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));

      const ok = values.password === values.confirmpassword;

      if (ok) {
        openNotification(
          'success', 
          'Khôi phục mật khẩu thành công', 
        );
        navigate("/login")
      } else {
        openNotification(
          'error', 
          'Mật khẩu không trùng khớp'
        );
      }
    } catch (error) {
      openNotification('error', 'Lỗi hệ thống', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitNewPassword}
        requiredMark={false}
        className="[&_.ant-form-item]:mb-4"
      >
        <Form.Item
          name="password"
          label="Mật khẩu mới"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••"
            size="large"
            autoComplete="current-password"
            className="rounded-xl!"
          />
        </Form.Item>
        
        <Form.Item
          name="confirmpassword"
          label="Xác nhận mật khẩu mới"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••"
            size="large"
            autoComplete="confirm-password"
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
          Cập nhật mật khẩu <ArrowRightOutlined />
        </Button>
        <div
          className="mt-5 rounded-xl! h-11! font-medium! border-[#e2e8f0]! text-[#334155]! flex items-center justify-center gap-2 hover:border-[#2563eb]! hover:text-[#2563eb]! hover:bg-[#eff6ff]!"
        >
          <Link 
              to="/login" 
              className="text-sm text-[#2563eb] hover:underline"
            >
              <ArrowLeftOutlined /> Quay lại trang đăng nhập
            </Link>
        </div>
      </Form>
    </div>
  );
}