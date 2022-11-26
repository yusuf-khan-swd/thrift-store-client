import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useAccount from '../../hooks/useAccount';
import Loading from '../../Pages/Shared/Loading/Loading';

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [userType, isAccountLoading] = useAccount(user.email);

  const location = useLocation();

  if (loading || isAccountLoading) {
    return <Loading></Loading>
  }

  if (user && (userType === "buyer")) {
    return children;
  }

  toast.error("Please login as buyer");

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default BuyerRoute;