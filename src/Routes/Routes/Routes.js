import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Main from "../../Layouts/Main";
import AddACategory from "../../Pages/Dashboard/AdminDashboard/AddACategory/AddACategory";
import AllBuyers from "../../Pages/Dashboard/AdminDashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AdminDashboard/AllSellers/AllSellers";
import ReportedItems from "../../Pages/Dashboard/AdminDashboard/ReportedItems/ReportedItems";
import MyOrders from "../../Pages/Dashboard/BuyerDashboard/MyOrders/MyOrders";
import AddAProduct from "../../Pages/Dashboard/SellerDashboard/AddAProduct/AddAProduct";
import MyBuyers from "../../Pages/Dashboard/SellerDashboard/MyBuyers/MyBuyers";
import MyProducts from "../../Pages/Dashboard/SellerDashboard/MyProducts/MyProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Logins/Login";
import Register from "../../Pages/Logins/Register";
import Blog from "../../Pages/Others/Blog/Blog";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: '/dashboard/my-orders',
        element: <MyOrders></MyOrders>
      },
      {
        path: '/dashboard/add-product',
        element: <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
      },
      {
        path: '/dashboard/my-products',
        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
      },
      {
        path: '/dashboard/my-buyers',
        element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>
      },
      {
        path: '/dashboard/all-sellers',
        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
      },
      {
        path: '/dashboard/all-buyers',
        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
      },
      {
        path: '/dashboard/reported-items',
        element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
      },
      {
        path: '/dashboard/add-category',
        element: <AdminRoute><AddACategory></AddACategory></AdminRoute>
      },
    ],
  }
]);

export default routes;