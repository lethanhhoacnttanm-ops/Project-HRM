import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-4 px-6 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-2">
      <div>
        <span>2026 HRM System. Vì bạn xứng đáng</span>
      </div>
      <div className="flex items-center gap-6 font-medium">
        <a href="#privacy" className="hover:text-blue-600 transition-colors">Chính sách riêng tư</a>
        <a href="#terms" className="hover:text-blue-600 transition-colors">Điều khoản dịch vụ</a>
        <a href="#support" className="hover:text-blue-600 transition-colors">Trung tâm hỗ trợ</a>
      </div>
    </footer>
  );
};

export default Footer;