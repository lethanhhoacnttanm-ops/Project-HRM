import { Form, Input, Button, Radio, DatePicker } from 'antd';
import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function RegisterForm({ form, loading, onFinish }) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      className="[&_.ant-form-item]:mb-4"
    >
      <Form.Item
        name="fullname"
        label="Họ và tên"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
      >
        <Input prefix={<IdcardOutlined />} placeholder="Nguyễn Văn A" size="large" className="rounded-xl!" />
      </Form.Item>
      <Form.Item
        name="username"
        label="Tên đăng nhập"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="username" size="large" className="rounded-xl!" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="••••••" size="large" autoComplete="new-password" className="rounded-xl!" />
      </Form.Item>
      <Form.Item
        name="confirmpassword"
        label="Xác nhận mật khẩu"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) return Promise.resolve();
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="••••••" size="large" autoComplete="new-password" className="rounded-xl!" />
      </Form.Item>
      
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-0">
        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
        >
          <Radio.Group 
            buttonStyle="solid" 
            className="w-full flex gap-3 [&_.ant-radio-button-wrapper]:flex-1 [&_.ant-radio-button-wrapper]:text-center [&_.ant-radio-button-wrapper]:rounded-xl! [&_.ant-radio-button-wrapper]:border-l [&_.ant-radio-button-wrapper::before]:hidden!"
          >
            <Radio.Button value="male" className="h-10! leading-9!">Nam</Radio.Button>
            <Radio.Button value="female" className="h-10! leading-9!">Nữ</Radio.Button>
          </Radio.Group>
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
            disabledDate={(d) => d && d.isAfter(dayjs())}
          />
        </Form.Item>
      </div>
      
      <Button 
        type="primary" 
        htmlType="submit" 
        block 
        size="large" 
        loading={loading}
        className="rounded-xl! font-semibold! h-11! bg-linear-to-r! from-[#2563eb]! to-[#0ea5e9]! border-none! shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]! hover:brightness-108 transition-all"
      >
        Đăng ký
      </Button>
    </Form>
  );
}