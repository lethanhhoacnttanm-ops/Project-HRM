import { Typography } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

export default function AuthLayout() {
  const location = useLocation();

  const getSubTitle = () => {
    if (location.pathname.includes('register')) return 'Tạo tài khoản mới';
    if (location.pathname.includes('forgotpassword')) return 'Nhập email của bạn để nhận hướng dẫn khôi phục';
    if (location.pathname.includes('resetpassword')) return 'Tạo mật khẩu mới cho tài khoản của bạn';
    return 'Đăng nhập để quản lý nhân sự';
  };

  const getTitle = () => {
    if (location.pathname.includes('register')) return 'HRM System';
    if (location.pathname.includes('forgotpassword')) return 'Quên mật khẩu';
    if (location.pathname.includes('resetpassword')) return 'Đặt lại mật khẩu';
    return 'HRM System';
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-[#1e3a8a] via-[#2563eb] to-[#0ea5e9] bg-size-[200%_200%] animate-[gradientShift_18s_ease_infinite]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-28 saturate-110"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.05),rgba(0,0,0,0.35))]" />

      <div className="relative z-10 w-full max-w-115 md:max-w-105 px-5 sm:px-4 py-6 mx-auto">
        <div className="relative bg-[rgba(255,255,255,0.97)] rounded-[18px] sm:rounded-2xl px-8 py-9 pb-7 sm:px-6 sm:py-7 sm:pb-5 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.55),0_8px_24px_-8px_rgba(37,99,235,0.25)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.6)] isolate">

          <span
            className="absolute -inset-0.5 rounded-[20px] p-0.5 pointer-events-none opacity-90 animate-[beam-rotate_4s_linear_infinite]"
            style={{
              background: 'conic-gradient(from var(--beam-angle, 0deg), transparent 0deg, #fa541c 20deg, #ec4899 45deg, #a855f7 70deg, #3b82f6 95deg, transparent 120deg)',
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
            aria-hidden
          />

          <style dangerouslySetInnerHTML={{
            __html: `
            @property --beam-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
            @keyframes beam-rotate { to { --beam-angle: 360deg; } }
            @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
          `}} />

          <div className="text-center mb-5.5">
            <div className="w-16 h-16 sm:w-14 sm:h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center bg-white border border-slate-100 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.08)] overflow-hidden">
              <img
                src="/hrm_system_logo.png"
                alt="Logo"
                className="w-full h-full object-contain scale-[1.5]"
              />
            </div>
            <Title level={3} className="m-0! font-bold! text-[#0f172a]! sm:text-[20px]! tracking-tight">
              {getTitle()}
            </Title>
            <Text type="secondary" className="block mt-1 text-[13px]">
              {getSubTitle()}
            </Text>
          </div>

          <Outlet />

        </div>
      </div>
    </div>
  );
}