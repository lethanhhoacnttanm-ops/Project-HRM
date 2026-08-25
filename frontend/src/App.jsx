import { Routes, Route, Navigate } from 'react-router-dom';

import { Toaster } from 'sonner';

import { useTheme } from './hooks/usetheme.js';

import AuthLayout from './components/auth/AuthLayout.jsx';
import AdminLayout from './components/layouts/AdminLayout.jsx';
import EmployeeLayout from './components/layouts/EmployeeLayout.jsx'; 

import LoginPage from './pages/auth/LoginPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx';

import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import PendingApprovalPage from './components/auth/PendingApprovalPage.jsx';

import DashboardPage from './pages/admin/DashboardPage.jsx';
import EmployeeListPage from './pages/admin/Employee/EmployeeListPage.jsx';
import ContractListPage from './pages/admin/Contract/ContractListPage.jsx';
import JobPostingPage from './pages/admin/Recruitment/JobPostingPage.jsx';
import CandidateApprovalPage from './pages/admin/Recruitment/CandidateApprovalPage.jsx';
import PromotionPage from './pages/admin/Promotion/PromotionPage.jsx';
import DepartmentPage from './pages/admin/Department/DepartmentPage.jsx';
import TrainingPage from './pages/admin/Training/TrainingPage.jsx';
import AttendancePageAd from './pages/admin/Attendance/AttendancePage.jsx';
import LeavePage from './pages/admin/Leave/LeavePage.jsx';
import PerformancePage from './pages/admin/Performance/PerformancePage.jsx';
import BenefitsPage from './pages/admin/Benefits/BenefitsPage.jsx';
import PayrollPage from './pages/admin/Payroll/PayrollPage.jsx'; 
import AnalyticsPage from './pages/admin/Analytics/AnalyticsPage.jsx';
import NotificationPage from './pages/admin/Notifications/NotificationPage.jsx';
import SupportTicketPage from './pages/admin/Support/SupportTicketPage.jsx';
import SystemConfigPage from './pages/admin/System/SystemConfigPage.jsx';
import SecurityPage from './pages/admin/Security/SecurityPage.jsx'; 

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
  const { theme } = useTheme();                                     
  return (
    <>
      <Toaster position="top-right" richColors closeButton theme={theme} />

      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />
          <Route path="/pending-approval" element={<PendingApprovalPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin-page" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="employees" element={<EmployeeListPage />} />
            <Route path="contracts" element={<ContractListPage />} />
            <Route path="recruitment" element={<JobPostingPage />} />
            <Route path="candidates" element={<CandidateApprovalPage />} />
            <Route path="promotion" element={<PromotionPage />} />
            <Route path="departments" element={<DepartmentPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="attendance" element={<AttendancePageAd />} />
            <Route path="leave" element={<LeavePage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="benefits" element={<BenefitsPage />} />
            <Route path="payroll" element={<PayrollPage />} />
            <Route path="reports" element={<AnalyticsPage />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="support-tickets" element={<SupportTicketPage />} />
            <Route path="system-config" element={<SystemConfigPage />} />
            <Route path="security-settings" element={<SecurityPage />} />
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