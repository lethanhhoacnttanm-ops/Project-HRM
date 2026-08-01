import { Routes, Route, Navigate } from 'react-router-dom';

import { Toaster } from 'sonner';

import AuthLayout from './components/auth/AuthLayout.jsx';
import AdminLayout from './components/layouts/AdminLayout.jsx';
import EmployeeLayout from './components/layouts/EmployeeLayout.jsx'; // thêm

import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx';

import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

import DashboardPage from './pages/admin/DashboardPage.jsx';
import EmployeeListPage from './pages/admin/Employee/EmployeeListPage.jsx';
import ContractListPage from './pages/admin/Contract/ContractListPage.jsx';
import JobPostingPage from './pages/admin/Recruitment/JobPostingPage.jsx';
import CandidateApprovalPage from './pages/admin/Recruitment/CandidateApprovalPage.jsx';

// ========== Employee pages ==========
import EmployeeDashboard from './pages/employee/DashboardPage.jsx';
import ProfilePage from './pages/employee/ProfilePage.jsx';
import MyContractPage from './pages/employee/MyContractPage.jsx';
import PayslipPage from './pages/employee/PayslipPage.jsx';
import AttendancePage from './pages/employee/AttendancePage.jsx';
import LeaveRequestPage from './pages/employee/LeaveRequestPage.jsx';
import MyBenefitsPage from './pages/employee/MyBenefitsPage.jsx';
import EvaluationPage from './pages/employee/EvaluationPage.jsx';
import TrainingRegisterPage from './pages/employee/TrainingRegisterPage.jsx';
import InternalJobPage from './pages/employee/InternalJobPage.jsx';
import CareerPathPage from './pages/employee/CareerPathPage.jsx';
import PersonalReportPage from './pages/employee/PersonalReportPage.jsx';
import NotificationListPage from './pages/employee/NotificationListPage.jsx';
import SupportRequestPage from './pages/employee/SupportRequestPage.jsx';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin-page" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="employees" element={<EmployeeListPage />} />
            <Route path="contracts" element={<ContractListPage />} />
            <Route path="recruitment" element={<JobPostingPage />} />
            <Route path="approval" element={<CandidateApprovalPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['EMPLOYEE']} />}>
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="my-contract" element={<MyContractPage />} />
            <Route path="payslip" element={<PayslipPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="leave-request" element={<LeaveRequestPage />} />
            <Route path="my-benefits" element={<MyBenefitsPage />} />
            <Route path="evaluation" element={<EvaluationPage />} />
            <Route path="training-register" element={<TrainingRegisterPage />} />
            <Route path="internal-jobs" element={<InternalJobPage />} />
            <Route path="career-path" element={<CareerPathPage />} />
            <Route path="personal-report" element={<PersonalReportPage />} />
            <Route path="notifications" element={<NotificationListPage />} />
            <Route path="support" element={<SupportRequestPage />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<div>Bạn không có quyền truy cập!</div>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;