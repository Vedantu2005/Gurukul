import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const hasToken = localStorage.getItem('adminToken');
  
  if (!isLoggedIn && !hasToken) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;