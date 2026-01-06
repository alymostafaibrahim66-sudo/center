import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// role: the role required to access the route (e.g., 'student')
const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  if (role && user.role !== role) {
    return <div className="container card">Unauthorized: insufficient permissions</div>;
  }
  return children;
};

export default ProtectedRoute;
