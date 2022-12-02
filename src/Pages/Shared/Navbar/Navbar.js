import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import './Navbar.css'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const currentLocation = useLocation().pathname;

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logout!");
      })
      .catch(error => {
        console.log("Logout Error: ", error);
        toast.error(error.message);
      })
  };

  const menuItems = <>
    <li className='mb-1 lg:m-0 lg:mr-1 '><NavLink className={`rounded-lg `} to='/home'>Home</NavLink></li>
    <li className='mb-1 lg:m-0 lg:mr-1 '><NavLink className={`rounded-lg `} to='/blog'>Blog</NavLink></li>
    <li className='mb-1 lg:m-0 lg:mr-1 '><NavLink className={`rounded-lg `} to="/categories">Categories</NavLink></li>
    {
      user?.uid ?
        <>
          <li className='mb-1 lg:m-0 lg:mr-1 '><NavLink className={`rounded-lg `} to="/dashboard">Dashboard</NavLink></li>
          <li className='mb-1 lg:m-0 lg:mr-1 '><button onClick={handleLogOut}>Logout</button></li>
          <li className='mb-1 lg:m-0 lg:mr-1 '><button title={user?.displayName}><FaUser className='text-xl'></FaUser></button></li>
        </>
        :
        <li className='mb-1 lg:m-0 lg:mr-1 '><NavLink className={`rounded-lg `} to="/login">Login</NavLink></li>
    }
  </>

  return (
    <div className='bg-secondary sticky top-0 z-10 font-bold text-slate-200'>
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">Thrift Store</Link>
        </div>
        {
          currentLocation.includes('/dashboard') &&
          <div className='navbar-end'>
            <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
          </div>
        }
        <div className="navbar navbar-end hidden lg:flex w-full">
          <ul className="menu menu-horizontal p-0">
            {menuItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;