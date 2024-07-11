import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppHook';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAppSelector((state) => state.Auth);

  if (!user) {
    return <Navigate to="/landing" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
