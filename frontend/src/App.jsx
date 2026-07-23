import { Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from './components/layouts/AuthLayout.jsx';
import AdminLayout from './components/layouts/AdminLayout.jsx';

import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx';

import DashboardPage from './pages/admin/DashboardPage.jsx';
import EmployeeListPage from './pages/admin/Employee/EmployeeListPage.jsx';
import ContractListPage from './pages/admin/Contract/ContractListPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
      </Route>

      <Route path="/admin-page" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="employees" element={<EmployeeListPage />} />
        <Route path="contracts" element={<ContractListPage />} />
        {/* <Route path="employees/:id" element={<EmployeeDetailsPage />} />
        <Route path="attendance" element={<div>Chấm công</div>} />
        <Route path="payroll" element={<div>Lương thưởng</div>} />
        <Route path="development" element={<div>Phát triển</div>} />
        <Route path="support" element={<div>Hỗ trợ</div>} />
        <Route path="reports" element={<div>Báo cáo</div>} />
        <Route path="notifications" element={<div>Thông báo</div>} />
        <Route path="settings" element={<div>Cài đặt</div>} /> */}
      </Route>
    </Routes>

  );
}

export default App
