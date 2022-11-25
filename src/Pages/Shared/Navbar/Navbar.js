import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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
    <li><Link to='/home'>Home</Link></li>
    <li><Link to='/blog'>Blog</Link></li>
    <li><Link to="/categories">Categories</Link></li>
    {
      user?.uid ?
        <>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><button onClick={handleLogOut}>Logout</button></li>
        </>
        :
        <li><Link to="/login">Login</Link></li>
    }
  </>

  return (
    <div className='bg-white sticky top-0 z-50'>
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
          user?.uid &&
          <div className='navbar-end'>
            <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
          </div>
        }
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {menuItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;