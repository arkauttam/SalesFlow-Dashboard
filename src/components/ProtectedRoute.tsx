import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}
