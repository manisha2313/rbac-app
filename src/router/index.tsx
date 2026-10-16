import { createBrowserRouter, Navigate } from "react-router";
import { BlankLayout } from "../layouts/BlankLayout";
import Login from "../pages/Login";
import DashBoard from "../pages/DashBoard";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Registration from "../pages/Registration.tsx";
import AppLayout from "../layouts/AppLayout.tsx";
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
        path:"/register",
        element:<Registration />
      },
    ],
  },
  {
    element:  <ProtectedRoute />,
    children:[
      {
        element:<AppLayout />,
        children: [
          {
            element: <DashBoard />,
            path: "/dashboard",
          },
        ],
      },
    ]
  }
]);
