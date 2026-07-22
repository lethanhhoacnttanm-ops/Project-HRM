import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default function ForgotPasswordPage() {
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

  const handleRequestRecovery = async (values) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));

      const ok = values.email === "lethanhhoa.cntt.anm@gmail.com";

      if (ok) {
        openNotification(
          'success', 
          'Đã gửi yêu cầu khôi phục về mail của bạn ', 
        );
        navigate("/resetpassword")
      } else {
        openNotification(
          'error', 
          'Mail của bạn không tồn tại'
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
        onFinish={handleRequestRecovery}
        requiredMark={false}
        className="[&_.ant-form-item]:mb-4"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email của bạn !!!' }]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="nhập email vào đây" 
            size="large" 
            autoComplete="email" 
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
          Gửi yêu cầu khôi phục <ArrowRightOutlined />
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