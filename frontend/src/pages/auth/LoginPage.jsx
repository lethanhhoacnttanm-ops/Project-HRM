import React, { useState } from 'react';
import { Form, Input, Button, Divider, notification, Checkbox, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, GoogleOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth.js';
import { PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE, COMPANY_EMAIL_REGEX, EMAIL_ERROR_MESSAGE } from '@/utils/validators.js';

const LoginPage = () => {
  const [form] = Form.useForm();
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(false);

  const emailValue = Form.useWatch('email', form) || '';
  const passwordValue = Form.useWatch('password', form) || '';

  const validations = {
    length: passwordValue.length >= 8,
    uppercase: /[A-Z]/.test(passwordValue),
    lowercase: /[a-z]/.test(passwordValue),
    number: /\d/.test(passwordValue),
    special: /[^A-Za-z0-9]/.test(passwordValue),
  };

  const validationEmail = {
    hasDot: /\./.test(emailValue),
    hasRole: /(nhanvien|truongphong|quantrivien)/.test(emailValue),
    hasYear: /\.2026/.test(emailValue),
    hasDomain: /@bigtech\.com$/.test(emailValue),
  };

  const isAllValid = Object.values(validations).every(Boolean);

  const isAllValidEmail = Object.values(validationEmail).every(Boolean);

  const showChecklist = isFocused || passwordValue.length > 0;

  const onFinish = async (values) => {
    try {
      const res = await handleLogin(values);

      const userRole = res?.data?.role;

      notification.success({
        title: 'Đăng nhập thành công!',
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
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();

                  if (COMPANY_EMAIL_REGEX.test(value)) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error(EMAIL_ERROR_MESSAGE));
                },
              },
            ]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="hoten.nhanvien.2026@bigtech.com"
              size="large"
              autoComplete="off"
              className={`rounded-xl! transition-all duration-300 ${isAllValidEmail
                ? 'border-gray-500! bg-gray-50/50! text-gray-700!'
                : ''
                }`}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  if (PASSWORD_REGEX.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(PASSWORD_ERROR_MESSAGE));
                },
              },
            ]}
            validateTrigger={['onChange', 'onBlur']}
            style={{ marginBottom: '12px' }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••"
              size="large"
              autoComplete="new-password"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`rounded-xl! transition-all duration-300 ${isAllValid
                ? 'border-gray-500! bg-gray-50/50! text-gray-700!'
                : ''
                }`}
            />
          </Form.Item>

          {showChecklist && (
            <div className={`bg-gray-50 p-3.5 rounded-xl border ${isAllValid ? 'border-green-400 bg-green-100' : 'border-red-400 bg-red-100'}  text-xs space-y-2 mb-6 transition-all duration-300 animate-fadeIn`}>
              <p className="font-semibold text-gray-700">Mật khẩu yêu cầu:</p>

              <RequirementItem isValid={validations.length} text="Có từ 8 ký tự trở lên" />
              <RequirementItem isValid={validations.uppercase} text="Có chứa chữ cái viết hoa (A-Z)" />
              <RequirementItem isValid={validations.lowercase} text="Có chứa chữ cái viết thường (a-z)" />
              <RequirementItem isValid={validations.number} text="Có chứa chữ số (0-9)" />
              <RequirementItem isValid={validations.special} text="Có chứa ký tự đặc biệt (@$!%*?&)" />
            </div>
          )}

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
    </div>
  );
}

const RequirementItem = ({ isValid, text }) => {
  return (
    <div className={`flex items-center space-x-2 transition-colors duration-200 ${isValid ? 'text-green-600 font-medium' : 'text-gray-400'
      }`}>
      {isValid ? (
        <CheckCircleFilled className="text-green-500 text-sm" />
      ) : (
        <span className="text-red-500 font-bold text-sm w-3.5 text-center">*</span>
      )}
      <span>{text}</span>
    </div>
  );
};

export default LoginPage;