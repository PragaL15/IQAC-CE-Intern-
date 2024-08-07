// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();

  return auth?.roles?.find(role => allowedRoles?.includes(role))
    ? <Outlet />
    : <Navigate to="/" />;
};

export default ProtectedRoute;
