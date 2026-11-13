import { createBrowserRouter, Navigate } from "react-router";
import { BlankLayout } from "../layouts/BlankLayout";
import Login from "../pages/Login";
import DashBoard from "../pages/DashBoard";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Registration from "../pages/Registration.tsx";
import AppLayout from "../layouts/AppLayout.tsx";
import Users from "../pages/Users.tsx";
import Roles from "../pages/Roles.tsx";
import Permission from "../pages/Permission.tsx";
import User from "../pages/UserDetails.tsx";
import Test from "../pages/test.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <BlankLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            element: <DashBoard />,
            path: "/dashboard",
          },
          {
            element: <Permission />,
            path: "/permission",
          },
          {
            element: <Roles />,
            path: "/roles",
          },
          {
            element: <Users />,
            path: "/users",
          },
          {
            element: <User />,
            path: "/user/:id",
          },
          {
            element: <Test />,
            path: "/test",
          }
        ],
      },
    ],
  },
]);
