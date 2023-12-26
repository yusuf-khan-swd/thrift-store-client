import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Loading from "../Pages/Shared/Loading/Loading";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import useAccount from "../hooks/useAccount";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [userType, isAccountLoading] = useAccount(user.email);

  if (isAccountLoading) {
    return <Loading></Loading>;
  }

  const dashboardItems = (
    <>
      {user && (
        <li className="border rounded-lg m-1">
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      {userType === "buyer" && (
        <li className="border rounded-lg m-1">
          <NavLink to="/dashboard/my-orders">My Orders</NavLink>
        </li>
      )}
      {userType === "seller" && (
        <>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/add-product">Add A Product</NavLink>
          </li>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/my-products">My Products</NavLink>
          </li>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/my-buyers">My Buyers</NavLink>
          </li>
        </>
      )}
      {userType === "admin" && (
        <>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/all-sellers">All Sellers</NavLink>
          </li>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/all-buyers">All Buyers</NavLink>
          </li>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/all-admins">All Admins</NavLink>
          </li>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/reported-items">Reported Items</NavLink>
          </li>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/add-category">Add a Category</NavLink>
          </li>
          <li className="border rounded-lg m-1">
            <NavLink to="/dashboard/all-categories">All Categories</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-white lg:bg-transparent text-base-content">
            {dashboardItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
