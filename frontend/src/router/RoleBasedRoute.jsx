import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RoleBasedRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  // Chưa đăng nhập → về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Có user nhưng role không được phép
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Nếu là employee thì đưa về trang employee
    if (user.role === 'employee') {
      return <Navigate to="/employee/dashboard" replace />;
    }
    // Nếu là admin/hr thì đưa về trang admin
    return <Navigate to="/admin-page/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;