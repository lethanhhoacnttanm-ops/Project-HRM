import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';

export default function LoginForm({ form, loading, onFinish, onGoogle }) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      className="[&_.ant-form-item]:mb-4"
    >
      <Form.Item
        name="username"
        label="Tên đăng nhập"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="admin" size="large" autoComplete="username" className="rounded-xl!" />
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
      </Form.Item>
      <Button 
        type="primary" 
        htmlType="submit" 
        block 
        size="large" 
        loading={loading}
        className="rounded-xl! font-semibold! h-11! bg-linear-to-r! from-[#2563eb]! to-[#0ea5e9]! border-none! shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]! hover:brightness-108 transition-all"
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
        onClick={onGoogle} 
        className="rounded-xl! h-11! font-medium! border-[#e2e8f0]! text-[#334155]! flex items-center justify-center gap-2 hover:border-[#2563eb]! hover:text-[#2563eb]! hover:bg-[#eff6ff]!"
      >
        Đăng nhập với Google
      </Button>
    </Form>
  );
}