import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useAccount from '../../hooks/useAccount';
import Loading from '../../Pages/Shared/Loading/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [userType, isAccountLoading] = useAccount(user.email);

  const location = useLocation();

  if (loading || isAccountLoading) {
    return <Loading></Loading>
  }

  if (user && (userType === "admin")) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;