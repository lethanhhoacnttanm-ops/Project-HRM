import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// Layouts
import EmployeeLayout from '../components/layouts/EmployeeLayout';
// import AdminLayout from '../components/layouts/AdminLayout'; // của partner
// import AuthLayout from '../components/auth/AuthLayout'; // nếu partner có

// Auth pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

// Employee pages
import EmployeeDashboard from '../pages/employee/DashboardPage';
import ProfilePage from '../pages/employee/ProfilePage';
import MyContractPage from '../pages/employee/MyContractPage';
import PayslipPage from '../pages/employee/PayslipPage';
import AttendancePage from '../pages/employee/AttendancePage';
import LeaveRequestPage from '../pages/employee/LeaveRequestPage';
import MyBenefitsPage from '../pages/employee/MyBenefitsPage';
import EvaluationPage from '../pages/employee/EvaluationPage';
import TrainingRegisterPage from '../pages/employee/TrainingRegisterPage';
import InternalJobPage from '../pages/employee/InternalJobPage';
import CareerPathPage from '../pages/employee/CareerPathPage';
import PersonalReportPage from '../pages/employee/PersonalReportPage';
import NotificationListPage from '../pages/employee/NotificationListPage';
import SupportRequestPage from '../pages/employee/SupportRequestPage';

import RoleBasedRoute from './RoleBasedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ========== Auth Routes ========== */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* ========== Employee Routes ========== */}
          <Route element={<RoleBasedRoute allowedRoles={['employee']} />}>
            <Route element={<EmployeeLayout />}>
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee/profile" element={<ProfilePage />} />
              <Route path="/employee/my-contract" element={<MyContractPage />} />
              <Route path="/employee/payslip" element={<PayslipPage />} />
              <Route path="/employee/attendance" element={<AttendancePage />} />
              <Route path="/employee/leave-request" element={<LeaveRequestPage />} />
              <Route path="/employee/my-benefits" element={<MyBenefitsPage />} />
              <Route path="/employee/evaluation" element={<EvaluationPage />} />
              <Route path="/employee/training-register" element={<TrainingRegisterPage />} />
              <Route path="/employee/internal-jobs" element={<InternalJobPage />} />
              <Route path="/employee/career-path" element={<CareerPathPage />} />
              <Route path="/employee/personal-report" element={<PersonalReportPage />} />
              <Route path="/employee/notifications" element={<NotificationListPage />} />
              <Route path="/employee/support" element={<SupportRequestPage />} />

              {/* Redirect mặc định khi vào /employee */}
              <Route path="/employee" element={<Navigate to="/employee/dashboard" replace />} />
            </Route>
          </Route>

          {/* ========== Admin Routes (của partner) ========== */}
          {/* Bạn có thể để partner viết phần này, hoặc tạm thời để như sau */}
          {/* 
          <Route element={<RoleBasedRoute allowedRoles={['admin', 'hr']} />}>
            <Route element={<AdminLayout />}>
              ... các route admin
            </Route>
          </Route>
          */}

          {/* Redirect mặc định */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;