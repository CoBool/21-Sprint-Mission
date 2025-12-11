import { useState } from "react";
import { AuthContext } from '../context/AuthContext.js'

import { authLogin } from "../features/auth/api/authApi.js";

export default function AuthProvider({ children }) {
  // 인증상태
  const [user, setUser] = useState(null);


  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    setUser(null);
  }

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      const { accessToken, refreshToken, user } = response;

      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);

      setUser(user);
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  }

  const logout = () => {
    handleLogout();
  }

  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}