import React, { createContext, useState, useContext } from "react";
import  {jwtDecode}  from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    console.log("token");
    const decodedUser = jwtDecode(token);
    console.log(decodedUser)
    sessionStorage.setItem("userId", decodedUser.sub);
    sessionStorage.setItem("userRole", JSON.stringify(decodedUser.roles));
    sessionStorage.setItem("token", token);

    setUser(decodedUser);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};