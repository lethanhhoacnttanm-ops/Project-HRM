import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles = ['ADMIN'] }) => {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;