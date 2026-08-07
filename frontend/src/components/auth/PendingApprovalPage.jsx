import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Clock, LogOut, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const PendingApprovalPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    
    setUser(null); 
    
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-lg shadow-lg border-none rounded-2xl">
        
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-amber-500" strokeWidth={2.5} />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Tài khoản đang chờ phê duyệt
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center text-slate-600 space-y-4 pt-4">
          <p>
            Hồ sơ nhân sự của bạn đã được ghi nhận thành công trên hệ thống.
          </p>
          <p>
            Tuy nhiên, để bảo mật dữ liệu, <span className="font-semibold text-slate-900">Quản trị viên (Admin)</span> cần xác minh và cấp quyền truy cập trước khi bạn có thể sử dụng các tính năng.
          </p>
          <p className="italic text-slate-500 text-sm mt-4">
            * Quá trình này thường mất từ 1 - 24 giờ làm việc. Vui lòng quay lại sau!
          </p>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pt-6 pb-8">
          <Button 
            variant="destructive" 
            size="lg" 
            className="w-full sm:w-auto rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto rounded-xl border-slate-300 hover:bg-slate-100"
            onClick={() => window.open('mailto:hr@yourcompany.com')} // Đổi email tương ứng
          >
            <Mail className="w-4 h-4 mr-2" />
            Liên hệ nhân sự
          </Button>
        </CardFooter>
        
      </Card>
    </div>
  );
};

export default PendingApprovalPage;