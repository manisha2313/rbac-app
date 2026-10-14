import { createBrowserRouter, Navigate } from "react-router";
import { BlankLayout } from "../layouts/BlankLayout";
import Login from "../pages/Login";
import DashBoard from "../pages/DashBoard";

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
        path: "/dashboard",
        element: <DashBoard />,
      },
    ],
  },
]);
