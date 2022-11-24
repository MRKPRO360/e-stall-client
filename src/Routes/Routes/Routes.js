import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Category from "../../Pages/Category/Category/Category/Category";
import DashboardLayout from "../../Layout/DashboardLayout";
import Home from "../../Pages/Home/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
        path: "/category/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/categories/${params.id}`),
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
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
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [],
  },
]);

export default router;
