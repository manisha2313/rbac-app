import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  //define the shape of the context value
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}
interface User {
  username: string | null;
  email: string | null;
  fullName: string | null;
  isActive: boolean;
}
interface AuthProviderProps {
  //create the props for the AuthProvider component
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); //create the context with an undefined default value

export function AuthProvider({ children }: AuthProviderProps) {
  //create the AuthProvider component
  const [token, setToken] = useState<string | null>(() =>
    // initialize the token state(react state) from localStorage
    localStorage.getItem("token"),
  );

  const [user, setUser] = useState<User | null>(() => {
    // initialize the user state(react state) from localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const setAuth = (newToken: string, newUser: User) => {
    //set the token and user in localStorage and update the state
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const clearAuth = () => {
    //clear the token and user from localStorage and update the state(synchronize the react state with localStorage)
    localStorage.removeItem("token"); //
    localStorage.removeItem("user");

    setToken(null); // update the state to null
    setUser(null); // update the state to null
  };

  const value: AuthContextType = {
    // create the context value object
    token,
    user,
    isAuthenticated: Boolean(token),
    setAuth,
    clearAuth,
  };

  return (
    // provide the context value to the children components
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
