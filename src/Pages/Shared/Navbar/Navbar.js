import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/android-chrome-192x192.png";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const currentLocation = useLocation().pathname;

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logout!");
      })
      .catch((error) => {
        console.log("Logout Error: ", error);
        toast.error(error.message);
      });
  };

  const menuItems = (
    <>
      <li className="mb-1 lg:m-0 lg:mr-1">
        <NavLink className={`rounded-lg`} to="/home">
          Home
        </NavLink>
      </li>
      <li className="mb-1 lg:m-0 lg:mr-1">
        <NavLink className={`rounded-lg`} to="/categories">
          Categories
        </NavLink>
      </li>
      <li className="mb-1 lg:m-0 lg:mr-1">
        <NavLink className={`rounded-lg`} to={`/category/${"all-products"}`}>
          All Products
        </NavLink>
      </li>
      <li className="mb-1 lg:m-0 lg:mr-1">
        <NavLink className={`rounded-lg`} to="/blog">
          Blog
        </NavLink>
      </li>
      {!user?.uid && (
        <li className="mb-1 lg:m-0 lg:mr-1">
          <NavLink className={`rounded-lg`} to="/login">
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-[#222] text-white">
        <div className="navbar container mx-auto p-0">
          <div className="navbar-start w-full lg:w-1/2">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-slate-800"
              >
                {menuItems}
              </ul>
            </div>
            <Link
              to="/"
              className="btn btn-ghost capitalize text-xl lg:text-2xl rounded-lg"
            >
              <img src={logo} className="w-9 rounded-full mr-2" alt="" />
              Thrift Store
            </Link>
          </div>
          <div className="lg:hidden">
            {currentLocation.includes("/dashboard") && (
              <div className="navbar-end">
                <label
                  htmlFor="dashboard-drawer"
                  tabIndex={0}
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
              </div>
            )}
          </div>
          <div className="navbar navbar-start hidden lg:flex w-3/4">
            <ul className="menu menu-horizontal p-0">{menuItems}</ul>
          </div>
          {user?.uid && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <ul className="w-10 rounded-full">
                  <li className="rounded-lg" title={`${user?.email}`}>
                    <FaUser className="text-xl"></FaUser>
                  </li>
                </ul>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact bg-base-100 dropdown-content mt-3 p-2 shadow rounded-box w-52 text-slate-800"
              >
                <li className="mb-1 lg:m-0 lg:mr-1">
                  <NavLink className={`rounded-lg`} to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="mb-1 lg:m-0 lg:mr-1">
                  <button className="rounded-lg" onClick={handleLogOut}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
