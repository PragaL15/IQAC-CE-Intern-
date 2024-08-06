// withAuthorization.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuthorization = (WrappedComponent, allowedPaths) => {
  return (props) => {
    const { location } = props;

    if (!allowedPaths.includes(location.pathname)) {
      return <Navigate to="/Error404" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;
