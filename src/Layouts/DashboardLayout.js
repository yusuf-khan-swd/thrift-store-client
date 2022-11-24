import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
  const dashboardItems = <>
    <li className='border rounded-lg m-1'><Link to='/dashboard/my-orders'>My Orders</Link></li>
    <li className='border rounded-lg m-1'><Link to='/dashboard/add-product'>Add A Product</Link></li>
    <li className='border rounded-lg m-1'><Link to='/dashboard/my-products'>My Products</Link></li>
    <li className='border rounded-lg m-1'><Link to='/dashboard/my-buyers'>My Buyers</Link></li>
    <li className='border rounded-lg m-1'><Link to='/dashboard/all-sellers'>All Sellers</Link></li>
    <li className='border rounded-lg m-1'><Link to='/dashboard/all-Buyers'>All Buyers</Link></li>
  </>
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {dashboardItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;