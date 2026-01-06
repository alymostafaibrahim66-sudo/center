import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  if (user.role !== 'admin') {
    return <div className="container card">Admin only: Access denied</div>;
  }
  return children;
};

export default AdminRoute;
