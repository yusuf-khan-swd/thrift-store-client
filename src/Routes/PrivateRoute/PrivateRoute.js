import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Loading from '../../Pages/Shared/Loading/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
  }

  if (user) {
    return children;
  }
  else {
    toast.error("Please login first");
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;