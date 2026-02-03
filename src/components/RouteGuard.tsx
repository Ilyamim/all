import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAdminAllowlist } from '../config/adminAllowlist';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/firestore';

interface RouteGuardProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children, roles }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse rounded-full bg-secondary px-6 py-3">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = profile?.role;
  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (role === 'admin') {
    const allowlist = getAdminAllowlist();
    if (!allowlist.includes(user.uid)) {
      return <Navigate to="/" replace />;
    }
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
