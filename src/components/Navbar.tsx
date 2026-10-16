import rbcLogo from "../assets/rbc-logo.svg";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
function Navbar() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error(
      "AuthContext is undefined. Make sure you are using the AuthProvider.",
    );
  }
  const navigate = useNavigate();
  const logOut = () => {
    auth.clearAuth();
    navigate("/login");
  };
  return (
    <div className="flex justify-between h-16 items-center border-b bg-white px-6 shadow-s">
      <div>
        <img src={rbcLogo} alt="RBC Logo" width={30} />
      </div>
      <div className="flex justify-between gap-2">
        <p>
          Welcome back{" "}
          <span className="text-lg font-semibold text-amber-300 m-2">
           {auth.user?.fullName || auth.user?.username || "User"}
          </span>
        </p>
      <div>
        <button
          onClick={logOut}
          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
