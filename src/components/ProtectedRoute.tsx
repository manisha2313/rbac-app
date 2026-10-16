import Authcontext from "../context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const auth = useContext(Authcontext);

  if (!auth) {
    throw new Error("ProtectedRoute must be used within AuthProvider.");
}
if(!auth.isAuthenticated){
  return <Navigate to="/login" replace />;
}
return <Outlet />;
}

export default ProtectedRoute;
