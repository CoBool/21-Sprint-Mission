import { instance } from '../../../lib/axios';

export async function authLogin(email, password) {
  const test = await instance({
    method: 'post',
    url: '/auth/signIn',
    data: {
      email, password
    }
  });

  return test;
}