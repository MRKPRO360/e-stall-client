import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Category from "../../Pages/Category/Category/Category/Category";
import DashboardLayout from "../../Layout/DashboardLayout";
import Home from "../../Pages/Home/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import AddAProduct from "../../Pages/Dashboard/AddAProduct/AddAProduct";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import SellerRoute from "../SellerRoute/SellerRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import Payment from "../../Pages/Dashboard/MyOrders/Payment";
import ReportedItem from "../../Pages/Dashboard/ReportedItem/ReportedItem";
import Error from "../../Pages/Shared/Error";
import Blog from "../../Pages/Blog/Blog";
import SellerLayout from "../../Layout/SellerLayout";
import AdminLoayout from "../../Layout/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/category/:id",
        loader: ({ params }) =>
          fetch(
            `https://e-stall-server-mrkpro360.vercel.app/categories/${params.id}`
          ),
        element: <Category />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/sellerDashboard",
    element: <SellerLayout />,
    children: [
      {
        path: "/sellerDashboard/",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/sellerDashboard/addAproduct",
        element: (
          <SellerRoute>
            <AddAProduct />
          </SellerRoute>
        ),
      },
    ],
  },
  {
    path: "/adminDashboard",
    element: <AdminLoayout />,
    children: [
      {
        path: "/adminDashboard/",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/adminDashboard/allBuyers",
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "/adminDashboard/reportedItem",
        element: (
          <AdminRoute>
            <ReportedItem />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
