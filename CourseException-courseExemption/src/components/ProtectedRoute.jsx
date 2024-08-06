// src/components/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const ProtectedRoute = ({ element: Component, path, ...rest }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const hasAccess = user?.resources.some(resource => resource.path === path);

  return (
    <Route
      {...rest}
      path={path}
      element={hasAccess ? <Component /> : <Navigate to="/Error404" replace />}
    />
  );
};

export default ProtectedRoute;


