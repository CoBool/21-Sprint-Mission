import { useState, useEffect } from "react";
import { AuthContext } from '../context/AuthContext.js'

import { authSignIn, authSignUp, authMe } from "../features/auth/api/authApi.js";

export default function AuthProvider({ children }) {
  // 인증상태
  const [user, setUser] = useState(null);

  const setSessionStorage = (accessToken, refreshToken) => {
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    setUser(null);
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token');
      if ( token ) {
        try {
          const response = await authMe();
          setUser(response);
        } catch {
          handleLogout();
        }
      }
    }
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authSignIn(email, password);
      const { accessToken, refreshToken, user } = response;

      setSessionStorage(accessToken, refreshToken);

      setUser(user);
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  }

  const signup = async (email, nickname, password, passwordConfirmation) => {
    try {
      const response = await authSignUp(email, nickname, password, passwordConfirmation);
      const { accessToken, refreshToken, user } = response;

      setSessionStorage(accessToken, refreshToken);
      setUser(user);
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  }

  const logout = () => {
    handleLogout();
  }

  const value = {
    user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}