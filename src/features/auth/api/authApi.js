import { instance } from '../../../lib/axios';

// 일단 1차 테스트 부터 시작.
export async function authMe() {
  const response = await instance({
    method: "GET",
    url: '/users/me',
  });

  return response.data;
}

export async function authRefresh(refreshToken) {
  const response = await instance({
    method: "POST",
    url: '/auth/refresh-token',
    data: {
      refreshToken,
    }
  });

  return response.data;
}

export async function authLogin(email, password) {
  const authLogin = await instance({
    method: "POST",
    url: '/auth/signIn',
    data: {
      email,
      password,
    }
  });

  return authLogin.data;
}