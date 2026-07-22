import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/layouts/AuthLayout.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx';

function App() {

  return (
    <Routes>
      {/* Nhóm Route Auth dùng chung AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        {/* Mặc định vào / thì redirect tới /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Route>

      {/* Nhóm Route Admin dùng AdminLayout (sau khi login) */}
      {/* <Route element={<AdminLayout />}> ... </Route> */}
    </Routes>
  )
}

export default App
