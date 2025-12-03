import { useState } from "react";
import { AuthContext } from '../context/AuthContext.js'

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = { token, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}