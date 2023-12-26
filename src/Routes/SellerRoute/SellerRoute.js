import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Pages/Shared/Loading/Loading";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useAccount from "../../hooks/useAccount";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [userType, isAccountLoading] = useAccount(user.email);

  const location = useLocation();

  if (loading || isAccountLoading) {
    return <Loading />;
  }

  if (user && userType === "seller") {
    return children;
  }

  return (
    <Navigate
      to={user ? "/dashboard" : "/login"}
      state={{ from: location }}
      replace
    />
  );
};

export default SellerRoute;
