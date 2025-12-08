import { useState, useEffect } from "react";
import { AuthContext } from '../context/AuthContext.js'
import { instance } from "../lib/axios.js";

import { authMe, authRefresh, authLogin } from "../features/auth/api/authApi.js";

export default function AuthProvider({ children }) {
  // 초기 인증 상태 (기본값 NULL) 초기에는 알 수 없음.
  const [user, setUser] = useState(null);

  // 인증 상태 확인 여부 로딩
  const [loading, setLoading] = useState(true);

  /**
   * HTTP Only 쿠키는 JS에서 읽을 수 없어서,
   * 앱이 처음 로드 혹은 새로고침될 때 서버에 인증된 사용자인지 확인하는
   * 엔드포인트 (url : "/users/me") 요청을 보내서 확인하는 방식.
   * 서버는 요청에 따라 포함된 쿠키를 확인하여 사용자 정보 반환.
   * 
   * 는 권한이 없어서 실패.
   * 세션스토리지로 전환해서 일단 토큰 저장하는 방식으로 처리.
   */

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    delete instance.defaults.headers.common['Authorization'];
    setUser(null);
  }

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = sessionStorage.getItem('token');

      if ( storedToken ) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const response = await authMe();
          setUser(response);
        } catch (error) {
          console.error("토큰 만료 또는 오류:", error);
          handleLogout();
        }
      }

      setLoading(false);
    }

    initAuth();

    const interceptor = instance.interceptors.response.use((response) => response, async (error) => {
      const originalRequest = error.config;
      
      if ( error.response.status === 401 && !originalRequest._retry ) {
        console.log('401 에러 발생');
        originalRequest._retry = true;

        try {
          const refreshToken = sessionStorage.getItem('refreshToken');

          if ( !refreshToken ) {
            throw new Error('리프레시 토큰이 없습니다.');
          }

          const response = await authRefresh(refreshToken);
          const { accessToken } = response;
          sessionStorage.setItem('token', accessToken);
          instance.headers['Authorization'] = `Bearer ${accessToken}`;

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("리프레시 토큰 갱신 실패:", refreshError);
          handleLogout();
          return Promise.reject(refreshError);
        }
      }
    });

    return () => {
      instance.interceptors.response.eject(interceptor);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      const { accessToken, refreshToken, user } = response;

      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

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
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}