import { instance } from '../../../lib/axios';

// 일단 1차 테스트 부터 시작.
export async function authMe() {
  const token = sessionStorage.getItem('token');
  const response = await instance({
    method: "GET",
    url: '/users/me',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
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

export async function authSignIn(email, password) {
  const response = await instance({
    method: "POST",
    url: '/auth/signIn',
    data: {
      email,
      password,
    }
  });

  return response.data;
}

export async function authSignUp(email, nickname, password, passwordConfirmation) {
  const response = await instance({
    method: "POST",
    url: '/auth/signUp',
    data: {
      email,
      nickname,
      password,
      passwordConfirmation,
    }
  });

  return response.data;
}